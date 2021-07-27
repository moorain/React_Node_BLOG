import { request, history } from "umi";
import { message } from 'antd'
interface IOptions {

}

export const urlPipe = (url) => {
  // return `${url}`
  return `/api${url}`
}

export const requestFunc = (url: string, options?: IOptions) => {
  return new Promise((resolve, reject) => {
    request(urlPipe(url), options).then((res) => {
      if (res?.isSuccess) {
        resolve(res)
      } else {
        if (res?.code === 401) {
          message.error('登录信息过期，请重新登录！');
          console.log(window.location.href)
          history.push(`/login?back=${window.location.href}`)
        }
      }
    })
  })

}