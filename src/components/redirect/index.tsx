/*
 * @Author: lihuan
 * @Date: 2024-07-18 22:48:00
 * @LastEditors: lihuan
 * @LastEditTime: 2024-07-19 21:34:29
 * @Email: 17719495105@163.com
 */
import { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"
interface IProps {
  path?: string
}
const Redirect: FC<IProps> = (props) => {
  const { path = '/' } = props
  const navigate = useNavigate()
  useEffect(() => {
    navigate(path)
  }, [])
  return <></>
}

export default Redirect
