
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/reset-style.scss' // 初始化样式
import '@/permission' // 路由权限
import '@/plugins/nprogress' // 路由进度条
import '@/plugins/themeVar' // 主题变量
import i18n from '@/plugins/i18n/index.js' // 国际化
import './assets/svg' // 导入svg
import installGlobalComponents from '@/components/global' // 全局组件
const app = createApp(App) // 创建app实例
installGlobalComponents(app) // 注册全局组件
app.use(router)
router.isReady().then(() => {
  app.use(store).use(i18n).mount('#app')
})
