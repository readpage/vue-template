import { isEmpty, isNull } from 'undraw-ui'
import axios from './axios'

interface ParamApi {
  url: string
  method: string
  params?: any
  data?: any
}

export interface ReqApi {
  url?: string
  params?: any
  data?: any
}

export interface ResApi<T = any> {
  code: number
  data: T
  msg: string
}

/**
 * @param url
 * @param method
 * @returns
 */
export function apiAxios<T = any>(url: string, method = 'get') {
  return (data?: string | object) => {
    let param: ParamApi = { url: url, method: method }
    if (typeof data == 'string') {
      param.url += data
    } else if (typeof data == 'object') {
      let temp = data as any
      if (!isEmpty(temp.url)) {
        param.url += temp.url
        delete temp.url
      }
      if (method == 'get') {
        param.params = data
      } else {
        param.data = data
      }
    }

    return axios(param as any).then(res => {
      return res.data as ResApi<T>
    })
  }
}
