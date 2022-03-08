import router, { constantRoutes } from '@/router'
import asyncRoutes from '@/router/asyncRoutes'
// const settings = {
//   permissionMode: 'roles'
// }

function hasPermission (permissionMap, route) {
  // if (route.meta && route.meta.hiddenCode) {
  //   return !permissionMap.includes(route.meta.hiddenCode)
  // } else {
  //   return true
  // }

  if (route) {
    return permissionMap[route.name] === undefined ? true : !permissionMap[route.name]
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

// 拍平  路由名:true 显示
export function getPermissionMap (permission, permissionMap = {}) {
  permission.forEach((item, index) => {
    permissionMap[item.code] = item.hidden
    if (item.children) {
      getPermissionMap(item.children, permissionMap)
    }
  })
  return permissionMap
}

export default {
  namespaced: true,
  state: () => ({
    routes: [], // 将过滤后的异步路由和静态路由集合
    addRoutes: [], // 过滤后的异步路由
    permissionMap: null // 权限源地图
  }),
  mutations: {
    // 添加动态路由
    addRoutes: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    addPermissionMap: (state, permissionMap) => {
      state.permissionMap = permissionMap
    }
  },
  actions: {
    // 根据条件过滤出路由
    generateRoutes ({ commit, rootState }) {
      return new Promise((resolve) => {
        // const accessedRoutes = filterAsyncRoutes(asyncRoutes, rootState.user.permission)
        const permissionMap = getPermissionMap(rootState.user.userInfo.permissionList)
        const accessedRoutes = filterAsyncRoutes(asyncRoutes, permissionMap)
        commit('addPermissionMap', permissionMap)
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
