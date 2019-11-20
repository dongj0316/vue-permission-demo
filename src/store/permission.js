const routeMap = (routes, cb) => routes.map(route => {
  if (route.children && route.children.length > 0) {
    route.children = routeMap(route.children, cb)
  }
  return cb(route)
})
const hasRequireOps = ops => Array.isArray(ops) || typeof ops === 'string'
const normalizeRequireOps = ops => hasRequireOps(ops)
  ? [].concat(...[ops])
  : null
const normalizeRouteMeta = route => {
  const meta = route.meta = {
    ...(route.meta || {})
  }
  meta.requireOps = normalizeRequireOps(meta.requireOps)
  return route
}

let operations = null
export const hasOp = opcode => operations
  ? operations.some(op => op.opcode === opcode)
  : false

const filterPermissionRoutes = (routes, cb) => {
  // 可能父路由没有设置requireOps 需要根据子路由确定父路由的requireOps
  routes.forEach(route => {
    if (route.children) {
      route.children = filterPermissionRoutes(route.children, cb)
      
      if (!route.meta.requireOps) {
        const hasNoPermission = route.children.some(child => child.meta.requireOps === null)
        // 如果子路由中存在不需要权限控制的路由，则跳过
        if (!hasNoPermission) {
          route.meta.requireOps = [].concat(...route.children.map(child => child.meta.requireOps))
        }
      }
    }
  })

  return cb(routes)
}

// 权限状态管理模块
export const permission = {
  namespaced: true,
  state: {
    operations: null,
    permissionRoutes: null,
    permissionRoutesCopy: null
  },
  mutations: {
    SET_OPERATIONS (state, ops) {
      state.operations = ops
      operations = ops
    },
    SET_PERMISSION_ROUTES (state, permissionRoutes) {
      state.permissionRoutes = permissionRoutes
    },
    SET_PERMISSION_ROUTES_COPY (state, permissionRoutesCopy) {
      state.permissionRoutesCopy = permissionRoutesCopy
    }
  },
  actions: {
    addRoutes ({ commit }, { getOperations, router, permissionRoutes }) {
      // 规范一下meta
      permissionRoutes = routeMap(permissionRoutes, normalizeRouteMeta)
      // 保存副本，可能在可视化时要用到
      commit('SET_PERMISSION_ROUTES_COPY', JSON.parse(JSON.stringify(permissionRoutes)))

      return getOperations().then(operations => {
        commit('SET_OPERATIONS', operations)
      }).then(() => {
        const proutes = filterPermissionRoutes(permissionRoutes, routes => routes.filter(route => {
          const requireOps = route.meta.requireOps
    
          if (requireOps) {
            return requireOps.some(hasOp)
          }
    
          return true
        }))
    
        commit('SET_PERMISSION_ROUTES', proutes)
        router.addRoutes(proutes)
      })
    }
  }
}

// 权限控制组件
export const PermissionControl = {
  functional: true,
  render (h, { data, children }) {
    const attrs = data.attrs || {}

    // 如果是root，直接透传
    if (attrs.root !== undefined) {
      return h('div', data, children)
    }

    if (!attrs.opcode) {
      return h('span', {
        style: {
          color: 'red',
          fontSize: '30px'
        }
      }, '请配置操作码')
    }

    const opcodes = attrs.opcode.split(',')

    if (opcodes.some(hasOp)) {
      return children
    }

    return null
  }
}

// 权限菜单组件
export const PermissionMenuTree = {
  name: 'MenuTree',
  props: {
    routes: {
      type: Array,
      required: true
    },
    collapse: Boolean
  },
  render (h) {
    const createMenuTree = (routes, parentPath = '') => routes.map(route => {
      // hidden: 为true时当前菜单和子菜单都不显示
      if (route.hidden === true) {
        return null
      }

      // 子路径处理
      const fullPath = route.path.charAt(0) === '/' ? route.path : `${parentPath}/${route.path}`

      // visible: 为false时不显示当前菜单，但显示子菜单
      if (route.visible === false) {
        return createMenuTree(route.children, fullPath)
      }

      const title = route.meta.title
      const props = {
        index: fullPath,
        key: route.path
      }

      if (!route.children || route.children.length === 0) {
        return h(
          'el-menu-item',
          { props },
          [h('span', title)]
        )
      }

      return h(
        'el-submenu',
        { props },
        [
          h('span', { slot: 'title' }, title),
          ...createMenuTree(route.children, fullPath)
        ]
      )
    })

    return h(
      'el-menu',
      {
        props: {
          collapse: this.collapse,
          router: true,
          defaultActive: this.$route.path
        }
      },
      createMenuTree(this.routes)
    )
  }
}