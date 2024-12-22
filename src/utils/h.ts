/*
 * @Author: lihuan
 * @Date: 2024-12-19 21:39:58
 * @LastEditors: lihuan
 * @LastEditTime: 2024-12-19 21:49:31
 * @Email: 17719495105@163.com
 */
import { ReactNode, createElement } from "react";

interface IProps {

}
export const h = (type:any, props: IProps = {}, ...children: ReactNode[]) => {
  return createElement(type, props, children)
}
