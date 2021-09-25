import { request, history } from "umi";
import { message } from 'antd'

interface IOptions {
  data?: any,
  method?: 'post' | 'get' | 'GET' | 'POST'
}

export function setLocalStorage(key: string, value: string, days: number) {
  // 设置过期原则
  if (!value) {
    localStorage.removeItem(key)
  } else {
    var Days = days || 1; // 默认保留1天
    var exp = new Date();
    localStorage[key] = JSON.stringify({
      value,
      expires: exp.getTime() + Days * 24 * 60 * 60 * 1000
    })
  }
}

export function getLocalStorage(key: string) {
  try {
    let item = JSON.parse(localStorage[key])
    if (!item || item.expires < Date.now()) {
      return false
    } else {
      return item.value
    }
  } catch (e) {
    return localStorage[key]
  } finally { }
}

function getCookie(filed: string) {
  let c_start, c_end;
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(filed + "=");
    if (c_start != -1) {
      c_start = c_start + filed.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}
export const urlPipe = (url: string) => {
  let currentUrl = url;
  const csrfToken = getCookie('csrfToken')
  if (window.location.href.indexOf('localhost') > -1) {
    currentUrl = `/api${url}`
  }
  if (currentUrl.indexOf('?') > -1) {
    currentUrl = `${currentUrl}&_csrf=${csrfToken || ''}`
  } else {
    currentUrl = `${currentUrl}?_csrf=${csrfToken || ''}`
  }
  return currentUrl;
}

const errorHandler = (res: any) => {
  const status = res?.response?.status;
  if (status === 401) {
    message.error('未登录或登录超时，请重新登录！');
    history.push(`/login?back=${window.location.href}`)
  }
}

export const requestFunc = (url: string, options?: IOptions) => {
  return new Promise((resolve, reject) => {
    const myOptions = {
      ...options,
      throwOnError: false,
      headers: {
        'Authorization': `Bearer ${getLocalStorage('token')}`
      },
      // skipErrorHandler: true,
      errorHandler,
    }

    request(urlPipe(url), myOptions).then((res: any) => {
      if (res?.isSuccess) {
        resolve(res)
      } else {
        if (res?.code === 401) {
          message.error('未登录或登录超时，请重新登录！');
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

export function getDate(date: any) {
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

