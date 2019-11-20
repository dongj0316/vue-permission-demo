import Vue from 'vue'
import App from './App.vue'
import router, { permissionRoutes } from './router'
import store from './store'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import { PermissionControl } from './store/permission'
import { getOperations } from './apis'
import { removeLocalOp } from './mock/operations' // 模拟代码

Vue.use(ElementUI)
Vue.component('PermissionControl', PermissionControl)

router.beforeEach((to, from, next) => {
  if (!store.state.token) {
    if (to.path !== '/login') {
      return next('/login')
    }
    return next()
  }

  if (to.path === '/login') {
    return next('/index')
  }

  if (store.state.permission.operations) {
    next()
  } else {
    return store.dispatch('permission/addRoutes', {
      getOperations,
      router,
      permissionRoutes
    }).then(() => {
      next({ ...to, replace: true })
    }).catch(err => {
      console.log(err)
      ElementUI.MessageBox.confirm('跳转失败，是否刷新重试?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.location.reload()
      }).catch(() => {
        removeLocalOp() // 模拟代码

        store.dispatch('logout').then(() => {
          if (router.currentRoute.path !== '/login') {
            next({ path: '/login', replace: true })
          } else {
            next(false)
          }
        })
      })
    })
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
