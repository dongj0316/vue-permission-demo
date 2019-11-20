import ajax from './ajax'
import { getLocalOp } from '../mock/operations'

export const getOperations = () => new Promise((resolve, reject) => {
  const n = Math.random()

  if (n > .1) {
    resolve(getLocalOp())
  } else {
    reject(new Error('模拟失败'))
  }
})

// 请求示例
export const getList = () =>  ajax.get('/', 'module1-1-get')