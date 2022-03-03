<template>
  <div class='rightMenu'>
    <i
      class="iconfont icon-tuichu2 pointer"
      @click="logout"
    ></i>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { } from '@/apis'
const store = useStore()
const router = useRouter()
function logout () {
  store.dispatch('user/fedLogOut').then(() => {
    router.replace({ path: '/login' })
  })
}
</script>
<script>
export default {
  name: 'rightMenu'
}
</script>

<style lang="scss" scoped>
</style>
