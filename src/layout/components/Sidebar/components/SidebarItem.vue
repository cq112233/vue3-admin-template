<template>
  <template v-if="!item.hidden">
    <!-- 路由子元素只有小于一个 -->
    <template v-if="showSidebarItem(item.children, item)">
      <router-link
        :to="resolvePath(onlyOneChild.path)"
        v-if="onlyOneChild.meta"
      >
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <IconItem :meta="onlyOneChild.meta || item.meta" />
          <template #title>{{ onlyOneChild.meta&&onlyOneChild.meta.title }}</template>
        </el-menu-item>
      </router-link>
    </template>
    <!-- 子元素有两个 -->
    <el-sub-menu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template
        v-if="item.meta"
        #title
      >
        <IconItem :meta="item.meta" />
        <span>{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      ></sidebar-item>
    </el-sub-menu>
  </template>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import IconItem from './IconItem.vue'
import path from 'path'
const props = defineProps({
  // 每一个router Item
  item: {
    type: Object,
    required: true
  },
  // 用于判断是不是子Item,设置响应的样式
  isNest: {
    type: Boolean,
    default: false
  },
  // 基础路径，用于拼接
  basePath: {
    type: String,
    default: ''
  }
})
// 显示sidebarItem 的情况
const onlyOneChild = ref(null)
const showSidebarItem = (children = [], parent) => {
  // 显示的子元素
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false
    } else {
      onlyOneChild.value = item
      return true
    }
  })
  // 就一个子元素并且父节点就总显示
  if (showingChildren.length === 1 && !parent.alwaysShow) {
    return true
  }
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noChildren: true }
    return true
  }
  // 多个子元素
  return false
}

// 生成唯一标识
const resolvePath = (routePath) => {
  return path.resolve(props.basePath, routePath)
}
</script>
