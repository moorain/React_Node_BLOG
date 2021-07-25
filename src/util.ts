import { request } from "umi";

interface IOptions {

}

const urlPipe = (url) => {
  console.log(process.env.ENV, 'process.env.ENV')
  return `/api/${url}`
}

export const requestFunc = (url: string, options?: IOptions) => {
  return request(urlPipe(url), options)
}