
/**
@description  响应式左边导航栏状态控制
*/

import { onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
import store from '@/store'
const { body } = document
const WIDTH = 992
export default function () {
  const isMobile = () => {
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }
  const action = () => {
    const isPhone = isMobile()
    if (isPhone) {
      store.commit('app/M_sidebar_opened', false)
    } else {
      store.commit('app/M_sidebar_opened', true)
    }
  }
  const resizeHandler = () => {
    if (!document.hidden) {
      action()
    }
  }
  onBeforeMount(() => {
    window.addEventListener('resize', resizeHandler)
  })
  onMounted(() => {
    action()
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler)
  })
}
