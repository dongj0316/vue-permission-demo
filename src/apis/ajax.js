import axios from 'axios'
import { hasOp } from '../store/permission'

const ajax = axios.create(/* config */)

export default {
  post (url, data, opcode, config = {}) {
    if (opcode && !hasOp(opcode)) {
      return Promise.reject(new Error('没有操作权限'))
    }
    return ajax.post(url, data, { /* config */ ...config }).then(({ data }) => data)
  },
  put (url, data, opcode, config = {}) {
    if (opcode && !hasOp(opcode)) {
      return Promise.reject(new Error('没有操作权限'))
    }
    return ajax.put(url, data, { /* config */ ...config }).then(({ data }) => data)
  },
  get (url, opcode, config = {}) {
    if (opcode && !hasOp(opcode)) {
      return Promise.reject(new Error('没有操作权限'))
    }
    return ajax.get(url, { /* config */ ...config }).then(({ data }) => data)
  },
  delete (url, opcode, config = {}) {
    if (opcode && !hasOp(opcode)) {
      return Promise.reject(new Error('没有操作权限'))
    }
    return ajax.delete(url, { /* config */ ...config }).then(({ data }) => data)
  }
}