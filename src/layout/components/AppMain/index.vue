<template>
  <div class='appMain'>
    <router-view v-slot="{ Component }">
      <!-- 有动画效果 -->
      <transition
        v-if="appConfig.mainNeedAnimation"
        mode="out-in"
        name="fade-transform"
      >
        <keep-alive :include="cachedViews">
          <component
            :is="Component"
            :key="key"
          />
        </keep-alive>
      </transition>
      <!-- 无动画 -->
      <keep-alive
        :include="cacheViews"
        v-else
      >
        <component
          :is="Component"
          :key="key"
        />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import appConfig from '*/app.config.js'
const store = useStore()
const route = useRoute()
let oldRoute = {}
/**
@description 计算属性 根据组件name 来进行缓存
@params
*/
const key = computed(() => {
  // 是否移除旧的缓存对象
  if (oldRoute.name) {
    if (oldRoute.meta.leaveRmKeepAlivee && oldRoute.meta.keepAlive) {
      store.commit('app/M_DEL_CACHED_VIEW', oldRoute.name)
    }
  }
  // 添加新的缓存对象
  if (route.name) {
    if (route.meta.keepAlive) {
      store.commit('app/M_ADD_CACHED_VIEW', route.name)
    }
  }
  // 替换之前旧的缓存对象
  oldRoute = JSON.parse(JSON.stringify({ name: route.name, meta: route.meta }))
  return route.path
})
// 缓存的路由集合
const cacheViews = computed(() => {
  return store.state.app.cachedViews
})

</script>

<style lang="scss" scoped>
.appMain {
  padding: $appMainPadding;
}
</style>
