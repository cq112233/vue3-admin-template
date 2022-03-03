<template>
  <div
    :class="classObj"
    class="layout-wrapper"
  >
    <!-- 头部 -->
    <Headerbar />
    <!-- 中间部分 -->
    <el-container class="layout-container">
      <!-- 左侧导航栏 -->
      <Sidebar class="sidebar-container" />
      <el-container class="main-container">
        <el-main>
          <!-- 浏览标记 -->
          <TagsView />
          <!-- 主要内容 -->
          <AppMain class="appmain" />
          <!-- 回到顶部 -->
          <el-backtop
            target=".appmain"
            :right='50'
            :bottom='100'
            v-if="appConfig.isNeedBacktop"
          >
          </el-backtop>
        </el-main>
      </el-container>
    </el-container>
    <!-- 底部 -->
    <el-footer>
      Hangzhou Qizhi Internet Technology Co., Ltd
    </el-footer>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { Sidebar, Headerbar, AppMain, TagsView } from './components'
import appConfig from '*/app.config.js'
import { computed } from 'vue'
import { useStore } from 'vuex'
import ResizeHook from './hook/useResizeHandler'
const store = useStore()
// 控制sidebar展开
// eslint-disable-next-line no-unused-vars
// sidebar 是否展开
const opened = computed(() => {
  return store.state.app.sidebar.opened
})
const classObj = computed(() => {
  return {
    closeSidebar: !opened.value,
    hideSidebar: false
  }
})
ResizeHook()
</script>

<style lang="scss" scoped>
.main-container {
  height: calc(100vh - $headerbarHeight - $footerHeight);
  transition: margin-left 0.28s;
  position: relative;
}
.sidebar-container {
  height: calc(100vh - $headerbarHeight - $footerHeight);
  transition: width 0.28s;
  width: $sideBarWidth !important;
  background-color: #000;
  // overflow: hidden;
}
.closeSidebar {
  .sidebar-container {
    width: $sideBarMinWidth !important;
  }
}
.el-main {
  display: flex;
  flex-direction: column;
  height: calc(100vh - $headerbarHeight - $footerHeight);
  padding: 0;
  .appMain {
    flex: 1;
    background: #ebeef5;
    overflow-y: scroll;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.el-footer {
  height: $footerHeight;
  border-top: 1px solid #ccc;
  line-height: 40px;
  text-align: center;
}
</style>
