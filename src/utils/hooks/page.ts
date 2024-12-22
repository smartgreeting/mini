/*
 * @Author: lihuan
 * @Date: 2024-12-15 14:12:10
 * @LastEditors: lihuan
 * @LastEditTime: 2024-12-16 20:33:33
 * @Email: 17719495105@163.com
 */

import { getCurrentInstance } from "@tarojs/runtime";

export function useScope() {
  return getCurrentInstance().page;
}


