import router from './router'
import store from './store'
import { setTitle } from '@/utils/appUtils.js'
import config from '../app.config.js'
import { ElMessage } from 'element-plus'
const { isPermission, routerWhiteLists } = config// 进度条样式
router.beforeEach(async (to, from, next) => {
  // 是否存在token 登入
  if (store.state.user.tokens) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 获取用户信息
      if (!store.state.user.userInfo) {
        try {
          // 拉取用户信息  一般有 admin
          await store.dispatch('user/getUserInfo')
          // 开启权限控制
          if (isPermission) {
            // 用户权限菜单
            await store.dispatch('user/getPermission')
            // 过滤动态路由
            await store.dispatch('permission/generateRoutes')
            return next({ ...to })
          }
          return next({ ...to })
        } catch (error) {
          // 错误退出登入，重新登入
          store.dispatch('user/logout')
          ElMessage.warning(error.message || '获取用户信息失败,请重新登入')
          next(`/login?redirect=${to.path}`)
          location.reload() // 刷新页面
        }
      } else {
        next()
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      if (routerWhiteLists.indexOf(to.path) >= 0) {
        next()
      } else {
        next(`/login?redirect=${to.path}`)
      }
    }
  }
})
router.afterEach((to) => {
  // 设置title
  setTitle(to)
})
