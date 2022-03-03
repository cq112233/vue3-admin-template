// import setting from '@/settings'

const state = {
  visitedViews: [] // 访问过的路由集合
}
const mutations = {
  // 添加路由
  ADD_VISITED_VIEW: (state, view) => {
    // 判断之前的是否存在
    if (state.visitedViews.some((v) => v.path === view.path)) return
    // 数量限制  大于 10 个 最后一个替换
    if (state.visitedViews.length >= 10) {
      state.visitedViews.pop()
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
      )
    } else {
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
      )
    }
  },
  // 删除路由
  DEL_VISITED_VIEW: (state, view) => {
    // 迭代器
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  // 删除其他的(除了固定和自身)
  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedViews = state.visitedViews.filter((v) => {
      return v.meta.affix || v.path === view.path
    })
  },
  // 删除全部的(除了固定)
  DEL_ALL_VISITED_VIEWS: (state) => {
    state.visitedViews = state.visitedViews.filter((tag) => tag.meta.affix)
  },
  // 更新路由集
  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}

const actions = {
  // 添加路由
  addView ({ dispatch }, view) {
    dispatch('addVisitedView', view)
  },
  // 添加路由
  addVisitedView ({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  // 删除路由
  delView ({ dispatch, state }, view) {
    return new Promise((resolve) => {
      dispatch('delVisitedView', view)
      resolve({
        visitedViews: [...state.visitedViews]
      })
    })
  },
  // 删除路由
  delVisitedView ({ commit, state }, view) {
    return new Promise((resolve) => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  // 删除其他
  delOthersViews ({ dispatch, state }, view) {
    return new Promise((resolve) => {
      dispatch('delOthersVisitedViews', view)
      resolve({
        visitedViews: [...state.visitedViews]
      })
    })
  },
  // 删除其他
  delOthersVisitedViews ({ commit, state }, view) {
    return new Promise((resolve) => {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  // 删除全部
  delAllViews ({ dispatch, state }, view) {
    return new Promise((resolve) => {
      dispatch('delAllVisitedViews', view)
      resolve({
        visitedViews: [...state.visitedViews]
      })
    })
  },
  // 删除全部
  delAllVisitedViews ({ commit, state }) {
    return new Promise((resolve) => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },

  updateVisitedView ({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
