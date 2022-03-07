
/**
@description mixin 配置 常用的 hook
*/
import totalUtils from './utils'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import { provide, inject, defineAsyncComponent, toRaw, useAttrs, useSlots, defineExpose, useCssModule, markRaw, computed, toRefs, toRef, ref, defineEmits, reactive, defineProps, onMounted, onUnmounted, watch, watchEffect, getCurrentInstance, onActivated, nextTick } from 'vue'
import { useStore } from 'vuex'

function customMixin () {
  const that = getCurrentInstance()
  const store = useStore()
  const router = useRouter()
  const route = useRoute()
  const app = computed(() => {
    return store.state.app
  })
  const themeColors = computed(() => {
    return themeColors
  })
  const themeColor = computed(() => {
    return app.value.themeColor
  })
  return {
    ...totalUtils,
    provide,
    inject,
    reactive, // 对象响应式
    onBeforeRouteLeave, // 路由离开钩子
    ref, // 基本数据响应式
    toRefs, // 响应式数据对象 引用
    toRef, /// 响应式数据单个 引用
    toRaw, // 将响应式对象 还原成原始对象 只处理reactive
    markRaw, // 标记为原始的
    watch, // 侦听器
    watchEffect, // 自动侦听器
    defineEmits, // 发布事件
    defineProps, // prop
    defineExpose, // vue3 中不能通过 ref获取实例上的数据
    onMounted,
    onActivated,
    onUnmounted,
    defineAsyncComponent,
    store,
    router,
    route,
    app,
    computed,
    useAttrs,
    useSlots,
    useCssModule,
    themeColors,
    themeColor,
    that, // 当前实例
    nextTick
  }
}

// 按需注册
export default customMixin
