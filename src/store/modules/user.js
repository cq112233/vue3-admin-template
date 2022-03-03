
import {
  login,
  getUserInfo,
  getPermission
} from '@/apis'
import { setLocalStore, removeLocalStore, getLocalStore } from '@/utils/localStoreUtils'

// 获取加密token
function getTokens () {
  try {
    return (getLocalStore('TOKENS') && JSON.parse(window.atob(getLocalStore('TOKENS')))) || null
  } catch (error) {
    return null
  }
}

export default {
  namespaced: true,
  state: () => ({
    tokens: getTokens(), // type { accessToken:String,refreshToken:String }
    userInfo: null
  }),
  mutations: {
    login (state, payload) {
      state.tokens = payload
      setLocalStore('TOKENS', window.btoa(JSON.stringify(payload)))
    },
    // 清除用户所有状态
    fedLogOut (state) {
      state.tokens = null
      state.userInfo = null
      removeLocalStore('TOKENS')
    },
    // 用户信息
    setUserInfo (state, payload) {
      state.userInfo = payload
    },
    // 权限信息
    setPermission (state, payload) {
      state.permission = payload
    }

  },
  actions: {
    // 用户信息
    getUserInfo ({
      commit
    }) {
      return new Promise((resolve) => {
        getUserInfo({}).then(
          (res) => {
            console.log(res)
            commit('setUserInfo', res.data)
            resolve(res)
          }
        )
      })
    },
    // 用户权限列表
    getPermission (ctx) {
      const { commit } = ctx
      return new Promise((resolve) => {
        getPermission().then(
          async (res) => {
            // 第一步 存储动态路由
            commit('setPermission', res)
            // await dispatch('permission/setFromAllRoutes', state.permission.hiddenPaths, { root: true })
            resolve()
          }
        )
      })
    },
    // 登录 获取tokens
    login ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        login(payload).then(res => {
          commit('login', res.data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 前端退出
    fedLogOut (store, payload) {
      const { commit, dispatch } = store
      console.log(store)
      return new Promise((resolve, reject) => {
        dispatch('tagsView/delAllViews', {}, { root: true })
        commit('fedLogOut')
        resolve()
      })
    }
  },
  getters: {}
}
