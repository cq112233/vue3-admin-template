
<template>
  <div class='leftMenu'>
    <Hamburger
      :is-active="opened"
      class="hamburger-container pointer"
      @toggleClick="toggleSideBar"
    />
  </div>
</template>

<script setup>
import Hamburger from './hamburger.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const opened = computed(() => {
  return store.state.app.sidebar.opened
})
const toggleSideBar = () => {
  store.commit('app/M_toggleSideBar')
}

</script>
<style lang="scss" scoped>
</style>
