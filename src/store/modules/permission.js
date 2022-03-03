import router, { constantRoutes } from '@/router'
import asyncRoutes from '@/router/asyncRoutes'
// const settings = {
//   permissionMode: 'roles'
// }

function hasPermission (permissionMap, route) {
  if (route.meta && route.meta.hiddenCode) {
    return !permissionMap.includes(route.meta.hiddenCode)
  } else {
    return true
  }
}

// 过滤动态路由
export function filterAsyncRoutes (routes, permissionMap) {
  const res = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(permissionMap, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permissionMap)
      }
      res.push(tmp)
    }
  })
  return res
}
export default {
  namespaced: true,
  state: () => ({
    routes: [], // 将过滤后的异步路由和静态路由集合
    addRoutes: [] // 过滤后的异步路由
  }),
  mutations: {
    // 添加动态路由
    addRoutes: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    // 根据条件过滤出路由
    generateRoutes ({ commit, rootState }) {
      return new Promise((resolve) => {
        const accessedRoutes = filterAsyncRoutes(asyncRoutes, rootState.user.permission)
        commit('addRoutes', accessedRoutes)
        accessedRoutes.forEach(item => {
          router.addRoute(item)
        })
        resolve(accessedRoutes)
      })
    }
  },
  getters: { }
}
