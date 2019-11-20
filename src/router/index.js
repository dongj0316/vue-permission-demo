import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登陆'
    },
    component: Login
  }
]

/**
 * visible: 为false时不显示当前菜单，但显示子菜单
 * hidden: 为true时当前菜单和子菜单都不显示
 * requireOps: 路由控制的操作码
 *             1. Array 多个操作码
 *             2. String 单个操作码
 *             3. 以上2个类型以外的值将被忽略，表示路由没有权限控制
 */

export const permissionRoutes = [
  {
    visible: false,
    path: '/',
    name: 'basic',
    redirect: '/index',
    meta: {
      title: '通用页面'
    },
    component: Layout,
    children: [
      {
        path: '/index',
        name: 'index',
        meta: {
          title: '首页'
        },
        component: Index
      }
    ]
  },
  {
    hidden: true,
    path: '/error',
    name: 'error',
    meta: {
      title: '错误页面'
    },
    component: Layout,
    children: [
      {
        path: '404',
        name: '404',
        meta: {
          title: '404'
        },
        component: {
          render (h) {
            return h('div', '页面不存在或没有权限')
          }
        }
      }
    ]
  },
  {
    path: '/module1',
    name: 'module1',
    meta: {
      title: '模块1'
    },
    component: Layout,
    children: [
      {
        path: '1',
        name: 'module1-1',
        meta: {
          title: '模块1-1',
          requireOps: ['module1-1-get']
        },
        component: () => import(/* webpackChunkName: "module1-1" */ '../views/module1-1.vue')
      },
      {
        path: '2',
        name: 'module1-2',
        meta: {
          title: '模块1-2',
          requireOps: ['module1-2-get']
        },
        component: () => import(/* webpackChunkName: "module1-2" */ '../views/module1-2.vue')
      }
    ]
  },

  {
    visible: false,
    path: '/module2',
    name: 'module2',
    meta: {
      title: '模块2'
    },
    component: Layout,
    children: [
      {
        path: '1',
        name: 'module2-1',
        meta: {
          title: '模块2-1',
          requireOps: 'module2-1-get'
        },
        component: () => import(/* webpackChunkName: "module1-1" */ '../views/module2-1.vue')
      }
    ]
  },

  {
    // visible: false,
    path: '/module3',
    name: 'module3',
    meta: {
      title: '模块3'
    },
    component: Layout,
    children: [
      {
        path: '1',
        name: 'module3-1',
        meta: {
          title: '模块3-1'
        },
        component: () => import(/* webpackChunkName: "module1-1" */ '../views/module3-1.vue')
      },
      {
        path: '2',
        name: 'module3-2',
        meta: {
          title: '模块3-2',
          requireOps: 'module3-2-get'
        },
        component: () => import(/* webpackChunkName: "module1-1" */ '../views/module3-2.vue')
      }
    ]
  },

  {
    path: '/nested',
    name: 'nested',
    meta: {
      title: '嵌套'
    },
    component: Layout,
    children: [
      {
        path: '1',
        name: 'nested-1',
        meta: {
          title: '嵌套-1',
          requireOps: 'nested-1-get'
        },
        component: () => import(/* webpackChunkName: "nested" */ '../views/nested'),
        children: [
          {
            path: '1',
            name: 'nested-1-1',
            meta: {
              title: '嵌套-1-1',
              requireOps: 'nested-1-1-get'
            },
            component: () => import(/* webpackChunkName: "nested-1" */ '../views/nested/nested-1')
          },
          {
            path: '2',
            name: 'nested-1-2',
            meta: {
              title: '嵌套-1-2',
              requireOps: 'nested-1-2-get'
            },
            component: () => import(/* webpackChunkName: "nested-2" */ '../views/nested/nested-2')
          }
        ]
      }
    ]
  },

  {
    hidden: true,
    path: '*',
    redirect: '/error/404'
  }
]

// 副本
export const permissionRoutesCopy = JSON.parse(JSON.stringify(permissionRoutes))

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

const routerMethods = ['push', 'replace']

routerMethods.forEach(method => {
  const originalCall = VueRouter.prototype[method]
  VueRouter.prototype[method] = function(location, onResolve, onReject) {
    if (onResolve || onReject) {
      return originalCall.call(this, location, onResolve, onReject)
    }
    return originalCall.call(this, location).catch(console.log)
  }
})

export default router
