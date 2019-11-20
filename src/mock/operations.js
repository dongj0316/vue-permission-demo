const operations = [
  // module1-1
  {
    url: '...',
    type: 'get',
    name: '模块1-1-get',
    routeName: 'module1-1',
    opcode: 'module1-1-get'
  },
  {
    url: '...',
    type: 'put',
    name: '模块1-1-put',
    routeName: 'module1-1',
    opcode: 'module1-1-put'
  },
  {
    url: '...',
    type: 'delete',
    name: '模块1-1-delete',
    routeName: 'module1-1',
    opcode: 'module1-1-delete'
  },
  {
    url: '...',
    type: 'post',
    name: '模块1-1-post',
    routeName: 'module1-1',
    opcode: 'module1-1-post'
  },

  // module1-2
  {
    url: '...',
    type: 'get',
    name: '模块1-2-get',
    routeName: 'module1-2',
    opcode: 'module1-2-get'
  },
  {
    url: '...',
    type: 'put',
    name: '模块1-2-put',
    routeName: 'module1-2',
    opcode: 'module1-2-put'
  },
  {
    url: '...',
    type: 'delete',
    name: '模块1-2-delete',
    routeName: 'module1-2',
    opcode: 'module1-2-delete'
  },
  {
    url: '...',
    type: 'post',
    name: '模块1-2-post',
    routeName: 'module1-2',
    opcode: 'module1-2-post'
  },

  // module2-1
  {
    url: '...',
    type: 'get',
    name: '模块2-1-get',
    routeName: 'module2-1',
    opcode: 'module2-1-get'
  },
  {
    url: '...',
    type: 'put',
    name: '模块2-1-put',
    routeName: 'module2-1',
    opcode: 'module2-1-put'
  },
  {
    url: '...',
    type: 'delete',
    name: '模块2-1-delete',
    routeName: 'module2-1',
    opcode: 'module2-1-delete'
  },
  {
    url: '...',
    type: 'post',
    name: '模块2-1-post',
    routeName: 'module2-1',
    opcode: 'module2-1-post'
  },

  // module3-2
  {
    url: '...',
    type: 'get',
    name: '模块3-2-get',
    routeName: 'module3-2',
    opcode: 'module3-2-get'
  },
  {
    url: '...',
    type: 'put',
    name: '模块3-2-put',
    routeName: 'module3-2',
    opcode: 'module3-2-put'
  },
  {
    url: '...',
    type: 'delete',
    name: '模块3-2-delete',
    routeName: 'module3-2',
    opcode: 'module3-2-delete'
  },
  {
    url: '...',
    type: 'post',
    name: '模块3-2-post',
    routeName: 'module3-2',
    opcode: 'module3-2-post'
  },

  // nested-1
  {
    url: '...',
    type: 'get',
    name: '嵌套-1-get',
    routeName: 'nested-1',
    opcode: 'nested-1-get'
  },
  {
    url: '...',
    type: 'put',
    name: '嵌套-1-put',
    routeName: 'nested-1',
    opcode: 'nested-1-put'
  },
  {
    url: '...',
    type: 'delete',
    name: '嵌套-1-delete',
    routeName: 'nested-1',
    opcode: 'nested-1-delete'
  },
  {
    url: '...',
    type: 'post',
    name: '嵌套-1-post',
    routeName: 'nested-1',
    opcode: 'nested-1-post'
  },

  // nested-1-1
  {
    url: '...',
    type: 'get',
    name: '嵌套-1-1-get',
    routeName: 'nested-1-1',
    opcode: 'nested-1-1-get'
  },
  {
    url: '...',
    type: 'put',
    name: '嵌套-1-1-put',
    routeName: 'nested-1-1',
    opcode: 'nested-1-1-put'
  },
  {
    url: '...',
    type: 'delete',
    name: '嵌套-1-1-delete',
    routeName: 'nested-1-1',
    opcode: 'nested-1-1-delete'
  },
  {
    url: '...',
    type: 'post',
    name: '嵌套-1-1-post',
    routeName: 'nested-1-1',
    opcode: 'nested-1-1-post'
  },

  // nested-1-2
  {
    url: '...',
    type: 'get',
    name: '嵌套-1-2-get',
    routeName: 'nested-1-2',
    opcode: 'nested-1-2-get'
  },
  {
    url: '...',
    type: 'put',
    name: '嵌套-1-2-put',
    routeName: 'nested-1-2',
    opcode: 'nested-1-2-put'
  },
  {
    url: '...',
    type: 'delete',
    name: '嵌套-1-2-delete',
    routeName: 'nested-1-2',
    opcode: 'nested-1-2-delete'
  },
  {
    url: '...',
    type: 'post',
    name: '嵌套-1-2-post',
    routeName: 'nested-1-2',
    opcode: 'nested-1-2-post'
  },
]

const KEY = 'sdfkjwen'

export const getLocalOp = () => {
  const localOp = sessionStorage.getItem(KEY)
  if (!localOp) {
    return operations
  }

  try {
    const result = JSON.parse(localOp)
    return result
  } catch (e) {
    return operations
  }
}

export const setLocalOp = op => {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(op))
    return true
  } catch (e) {
    return false
  }
}

export const removeLocalOp = () => {
  sessionStorage.removeItem(KEY)
}

export default operations