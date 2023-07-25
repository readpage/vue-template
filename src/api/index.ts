import { apiAxios } from './src/requests'

export interface PageApi<T = any> {
  total: number
  list: T[]
}

const AUser = {
  page: apiAxios<PageApi>('/user/page'),
  update: apiAxios('/user/update', 'put')
}

export { AUser }
export * from './src/requests'
