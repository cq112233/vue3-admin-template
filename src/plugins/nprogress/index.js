import NProgress from 'nprogress'
import router from '@/router'
import 'nprogress/nprogress.css' // nprogress 进度条
NProgress.configure({
  showSpinner: false
}) // 不显示转圈

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})
