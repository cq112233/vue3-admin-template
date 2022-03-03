import { createI18n } from 'vue-i18n'
import messages from './language/index'
import store from '@/store' // 引入vue-i18n组件
console.log(messages, 'messages')
const i18n = createI18n({
  fallbackLocale: 'en',
  globalInjection: true,
  legacy: false, // you must specify 'legacy: false' option
  locale: store.state.app.lang,
  messages
})

export default i18n
