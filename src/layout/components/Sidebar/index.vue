<template>
  <div
    id="Sidebar"
    class="reset-menu-style"
  >
    <el-aside
      :width="themeVar.sideBarWidth"
      style="background-color: rgb(238, 241, 246)"
    >
      <el-scrollbar>
        <el-menu
          :collapse="!isCollapse"
          mode="vertical"
          :default-active="activeMenu"
          :unique-opened="false"
          :background-color='themeVar.menuBg'
          :text-color="themeVar.menuText"
          :active-text-color="themeVar.menuActiveText"
          :collapse-transition="false"
        >
          <sidebar-item
            v-for="route in routes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </el-menu>
      </el-scrollbar>
    </el-aside>
  </div>
</template>

<script setup>
import SidebarItem from './components/SidebarItem.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const store = useStore()
const route = useRoute()
const routes = computed(() => {
  return store.state.permission.routes
})
// 折叠
const isCollapse = computed(() => {
  return store.state.app.sidebar.opened
})
// 主题变量
const themeVar = computed(() => {
  return store.state.app.themeVar
})
// 当前的选中的路径
const activeMenu = computed(() => {
  const { meta, fullPath } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return fullPath
})
</script>

<style lang="scss">
.el-aside {
  height: 100%;
  background: $menuBg;
  .el-menu {
    border-right: none;
  }
  .el-scrollbar {
    background: $menuBg;
  }
  .el-menu--collapse {
    width: $sideBarMinWidth !important;
  }
}

.el-submenu__title:hover,
.el-menu-item:hover {
  background-color: $menuHover !important;
}
.el-sub-menu .el-menu-item.is-active {
  background-color: $subMenuBg!important;
  border-left: 4px solid $subMenuBorderLeft!important;
}
</style>
