import { createStore } from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
export default createStore({
  modules: {
    app,
    user,
    permission,
    tagsView
  }
})
