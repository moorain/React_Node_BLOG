import { request, history } from "umi";
import { message } from 'antd'
interface IOptions {
  data?: any,
  method?: 'post' | 'get' | 'GET' | 'POST'
}

export const urlPipe = (url: string) => {
  if (window.location.href.indexOf('localhost') > -1) {
    return `/api${url}`
  }
  return `/${url}`
}

export const requestFunc = (url: string, options?: IOptions) => {
  return new Promise((resolve, reject) => {
    request(urlPipe(url), options).then((res: { data?: any, isSuccess: boolean, code?: any }) => {
      console.log(res, 'res')
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

export function getQueryVariable(variable: string) {
  let res = null;
  try {
    const query = window.location.href.split('?')[1]
    const querys = query.split('&');
    querys.forEach((str) => {
      const param = str.split('=');
      if (param?.[0] === variable) {
        res = param?.[1]
      }
    })
  } catch (err) {
    res = null;
  }

  return res;
}



export function getDate(date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  var second = date.getSeconds();
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};