/*
 * @Author: lihuan
 * @Date: 2024-10-19 11:30:37
 * @LastEditors: lihuan
 * @LastEditTime: 2024-12-15 14:01:39
 * @Email: 17719495105@163.com
 */

import { ProxyTaro } from "../proxyTaro";

const fs = ProxyTaro.getFileSystemManager();

export const readFile = (tempFilePath: string, writefilePath: string, index: number) => {
  const encoding = 'binary';
  return new Promise<{ errMsg?: string, value?: boolean | Record<string, any> }>((resolve) => {
    fs.readFile({
      filePath: tempFilePath,
      encoding,
      success: (res) => {
        fs.appendFile({
          filePath: writefilePath,
          encoding: encoding,
          data: res.data,
          success() {
            console.log(`第 ${index + 1} 块已拼接`);
            resolve({})
          },
          fail(err) {
            console.error(`拼接第 ${index + 1} 块失败：`, err);
            resolve({
              errMsg: `appendFile ${err.errMsg}`,
            })
          },
        });
      },
      fail(err) {
        console.error(`读取第 ${index + 1} 块失败：`, err);
        resolve({
          errMsg: `readFile ${err.errMsg}`,
        })
      },
    });
  })
}
export const getchunkSizeByNetworkType = async (size: number) => new Promise<number>((resolve) => {
  ProxyTaro.getNetworkType({
    success: (res) => {
      let networkTypeMap = {
        wifi: 5,
        '2g': 1,
        '3g': 1,
        '4g': 2,
        '5g': 5,
        'none': 1,
      }
      if (size > 50) {
        networkTypeMap = {
          ...networkTypeMap,
          wifi: 15,
          '4g': 5,
          '5g': 10,
        }
      }
      const networkType = res.networkType
      resolve(
        networkTypeMap[networkType]
      )
    },
    fail: () => {
      resolve(1)
    },
  })

})


  export async function createGroup<T = any>(list: T[], size: number) {
    const newList = [...(list || [])];
    const len = newList.length;
    if (!size || len <= size) {
      return [newList];
    }
    const groups: T[][] = [];
    while (newList.length > 0) {
      groups.push(newList.splice(0, size));
    }
    return groups;
  }
