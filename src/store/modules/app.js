export default {
  namespaced: true,
  state: () => ({
    sidebar: {
      opened: true
    },
    cachedViews: [], // 缓存路由集合
    themeVar: {}, // 主题变量
    lang: 'en' // 语言
  }),
  mutations: {
    // 语言切换
    set_lang: (state, payload) => {
      state.lang = payload
    },
    // 全局主题变量
    set_theme_var: (state, payload) => {
      state.themeVar = payload
    },
    // 添加缓存路由
    M_ADD_CACHED_VIEW: (state, view) => {
      if (state.cachedViews.includes(view)) return
      state.cachedViews.push(view)
    },
    // 删除缓存路由
    M_DEL_CACHED_VIEW: (state, view) => {
      const index = state.cachedViews.indexOf(view)
      index > -1 && state.cachedViews.splice(index, 1)
    },
    // 自动
    M_sidebar_opened (state, payload) {
      state.sidebar.opened = payload
    },
    // 手动
    M_toggleSideBar (state, payload) {
      state.sidebar.opened = !state.sidebar.opened
    }
  },
  actions: { },
  getters: { }
}
