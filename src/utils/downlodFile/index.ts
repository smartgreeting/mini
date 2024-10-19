import Taro, { Events } from '@tarojs/taro';
import { getchunkSizeByNetworkType, readFile, createGroup } from './utils';
type chunkItem = { start: number; end: number; index: number, tempFilePath?: string, errMsg?: string };
// const mp4URL = 'https://osscdn-kbad.kuaidihelp.com/tbk/sptq/91fb9627aafaef6dc911ace3f2e24348.mp4'; //10
const mp4URL = 'https://osscdn-kbad.kuaidihelp.com/tbk/sptq/3e7b08803fb3c5ce4a23d1bbdfe3b137.mp4' // 73.4
const FINALVIDEO = 'final-video-';
const fs = Taro.getFileSystemManager();
const events = new Events()
const EVENTNAME = '__events-appendFiles__'
interface IFileDownload {
  sufffix?: string;
  groupSize?: number;
}
export class FileDownload {
  // 已下载切片
  #filesChunks: chunkItem[] = [];
  #sufffix: string
  #groupSize: number
  constructor(props: IFileDownload = {}) {
    const { sufffix = 'mp4', groupSize = 5 } = props
    this.#sufffix = sufffix
    this.#groupSize = groupSize
  }
  /**
   * 删除临时文件
   */
  #clearFile() {
    fs.readdir({
      dirPath: `${Taro.env.USER_DATA_PATH}`,
      success: (res) => {
        console.log('readdir', res);
        res.files.forEach((item) => {
          if (item.startsWith(FINALVIDEO)) {
            fs.unlink({
              filePath: `${Taro.env.USER_DATA_PATH}/${item}`,
            });
          }
        });
      },
      fail(res) {
        console.error(res);
      },
    });
  }
  /**
   * 创建文件
   * @param filePath 写入文件路径
   */
  async #createFile(filePath: string) {
    this.#clearFile();
    // 创建一个空文件
    fs.writeFile({
      filePath,
      data: '', // 写入空内容，确保文件存在
      success() {
        console.log('文件创建成功');
      },
      fail(err) {
        console.error('文件创建失败：', err);
      },
    });
  }
  /**
   *  追加切片到文件中 要保证写入顺序
   * @param filePath 写入文件路径
   * @param callback 追加完成后执行
   */
  async #appendFiles(filePath: string, callback: (params: { filePath: string, errMsg: string }) => void) {
    // flag 保证在写的过程中不会被events再次触发
    let flag = true
    let i = 0
    const errMsgs = new Set<string>()
    events.on(EVENTNAME, async (totalLen: number) => {
      if (flag) {
        const item = this.#filesChunks.shift();
        //  要保证写入顺序 递归写入
        const runChunkItem = async (item?: chunkItem) => {
          if (i == totalLen) {
            callback({ filePath, errMsg: [...errMsgs].join(',') })
            console.log('appendFiles 合并完成')
          }
          if (item) {
            flag = false;
            i++
            const { errMsg } = await readFile(item.tempFilePath!, filePath, item.index)
            if (errMsg) {
              errMsgs.add(errMsg)
            }
            // 递归
            const n = this.#filesChunks.shift()
            runChunkItem(n)
          } else {
            flag = true
          }
        }
        await runChunkItem(item)
      }


    })

  }
  /**
   *
   * @param size 要下载的文件总大小 MB
   * @returns
   */
  async #createChunks(size: number) {
    const cs = await getchunkSizeByNetworkType(size) || 1
    const chunkSize = 1 * 1024 * 1024; // 每块1MB
    const totalSize = 74 * 1024 * 1024; // 假设文件大小为100MB
    const chunks: chunkItem[] = [];
    for (let start = 0; start < totalSize; start += chunkSize) {
      const end = Math.min(start + chunkSize - 1, totalSize - 1);
      chunks.push({ start, end, index: chunks.length });
    }
    return chunks
  }

  /**
   * 并发下载切片
   * @param chunks
   * @param url
   * @returns
   */
  async #request(chunks: chunkItem[], url: string) {
    return Promise.all<chunkItem>(
      chunks.map(
        (chunk) =>
          new Promise((resolve) => {
            Taro.downloadFile({
              url,
              header: {
                Range: `bytes=${chunk.start}-${chunk.end}`,
              },
              success: (res) => {
                if (res.statusCode === 206) {
                  console.log(chunk.index, 'downloadFiles');
                  // HTTP 206 表示分块下载成功
                  resolve({
                    index: chunk.index,
                    tempFilePath: res.tempFilePath,
                    start: chunk.start,
                    end: chunk.end,
                  });
                }
              },
              fail(err) {
                console.log(`第 ${chunk.index + 1} 块下载失败：${err.errMsg}`)
                resolve({
                  index: chunk.index,
                  errMsg: `第 ${chunk.index + 1} 块下载失败：${err.errMsg}`,
                  start: chunk.start,
                  end: chunk.end,
                });
              },
            }).catch((err) => {
              console.log(err, 'downloadFile');
              resolve({
                index: chunk.index,
                errMsg: `downloadFile ${err.errMsg}`,
                start: chunk.start,
                end: chunk.end,
              });
            });
          }),
      ),
    );
  }
  /**
   *
   * @param url
   * @param size MB
   */
  async run(url: string, size: number) {
    return new Promise<{ filePath: string, errMsg?: string }>(async (resolve) => {
      // 创建文件路径
      const filePath = `${Taro.env.USER_DATA_PATH}/${FINALVIDEO}${new Date().getTime()}.${this.#sufffix}`;
      await this.#createFile(filePath);
      // 提前执行 为了订阅事件
      this.#appendFiles(filePath, resolve)

      const chunks = await this.#createChunks(size);
      const chunksGroups = await createGroup<chunkItem>(chunks, this.#groupSize);
      for (let i = 0, len = chunksGroups.length; i < len; i++) {
        const res = await this.#request(chunksGroups[i], mp4URL)
        // 边下边写
        this.#filesChunks.push(...res)
        events.trigger(EVENTNAME, chunks.length)
      }
    })
  }
}




