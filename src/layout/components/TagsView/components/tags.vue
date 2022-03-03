<template>
  <div class="tags">
    <div
      class="left"
      @click="scrollTags('left')"
      v-if="isShowControl"
    >
      <ElSvgIcon elSvgName='ArrowLeft' />
    </div>
    <div class="tags-view-wrapper">
      <!-- 路由导航 -->
      <router-link
        v-for="tag in visitedViews"
        ref="refTag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <!-- 固定的不显示 -->
        <Close
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        ></Close>
      </router-link>
    </div>
    <div
      class="right"
      @click="scrollTags('right')"
      v-if="isShowControl"
    >
      <ElSvgIcon elSvgName='ArrowRight' />
    </div>

    <!-- 鼠标右击显示面板 -->
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <!-- 带角标为不可以关闭 不显示 -->
      <li
        v-if="!isAffix(selectedTag)"
        @click="closeSelectedTag(selectedTag)"
      >关闭当前页面</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭全部</li>
    </ul>
  </div>

</template>

<script setup>
import path from 'path'
import { Close } from '@element-plus/icons-vue'
import { onMounted, getCurrentInstance, watch, toRefs, reactive, computed, nextTick, ref } from 'vue'
// 获取store和router
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const $router = useRouter()
const $route = useRoute()
const state = reactive({
  visible: false,
  top: 0,
  left: 0,
  selectedTag: {},
  affixTags: []
})
const activeMenu = ref(false)
const isShowControl = ref(false)
// 访问过的路由集合
const visitedViews = computed(() => {
  return store.state.tagsView.visitedViews
})
// 路由集合
const routes = computed(() => {
  return store.state.permission.routes
})

// 监听路由路径变化添加路由
watch(
  () => $route.path,
  (newVal) => {
    // activeMenu.value = newVal
    addTags()
    computedTag()
    goActiveTag()
  }
)
// 显示右键面板
watch(
  () => state.visible,
  (value) => {
    if (value) {
      document.body.addEventListener('click', closeMenu)
    } else {
      document.body.removeEventListener('click', closeMenu)
    }
  }
)

// 初始化
onMounted(() => {
  initTags()
  addTags()
  setTimeout(() => {
    computedTag()
  }, 1000)
})

// 是否是当前路由
const isActive = (route) => {
  return route.path === $route.path
}
// 是否有固定
const isAffix = (tag) => {
  return tag.meta && tag.meta.affix
}

// 过滤出固定路由函数
const filterAffixTags = (routes, basePath = '/') => {
  let tags = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

// 带角标的route 代表固定不可以关闭
const initTags = () => {
  const affixTags = (state.affixTags = filterAffixTags(routes.value))
  for (const tag of affixTags) {
    if (tag.name) {
      store.dispatch('tagsView/addVisitedView', tag)
    }
  }
}

// 添加路由标签
const addTags = () => {
  const { name } = $route
  activeMenu.value = $route
  console.log(name)
  if (name && name !== 'login') {
    store.dispatch('tagsView/addView', $route)
  }
  return false
}
// 刷新当前页面
const refreshSelectedTag = (view) => {
  const { fullPath } = view
  nextTick(() => {
    $router.replace({
      path: '/redirect' + fullPath
    })
  })
}
// 关闭当前页面
const closeSelectedTag = (view) => {
  store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view)
    }
  })
}
// 关闭其他
const closeOthersTags = () => {
  // 可有可无
  $router.push(state.selectedTag)
  store.dispatch('tagsView/delOthersViews', state.selectedTag)
}
// 关闭全部
const closeAllTags = (view) => {
  store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
    // 判断当前的选中的路由是否是固定的
    if (state.affixTags.some((tag) => tag.path === view.path)) {
      return
    }
    // 重定向到最后一个
    toLastView(visitedViews, view)
  })
}

// 最后一个tag标签
const toLastView = (visitedViews, view) => {
  const latestView = visitedViews.slice(-1)[0]
  // 存在固定标签
  if (latestView) {
    $router.push(latestView.fullPath)
  } else {
    // 如果是Dashboard 就重新刷新
    if (view.name === 'Dashboard') {
      $router.replace({ path: '/redirect' + view.fullPath })
    } else {
      $router.push('/')
    }
  }
}
// 获取右键控制面板位置
const proxy = getCurrentInstance().proxy
console.log(proxy)
const openMenu = (tag, e) => {
  const menuMinWidth = 105 // 最小宽度
  const offsetLeft = proxy.$el.getBoundingClientRect().left // 元素最左侧
  const offsetWidth = proxy.$el.offsetWidth // 宽度
  const maxLeft = offsetWidth - menuMinWidth // 最大左侧
  const left = e.clientX - offsetLeft + 15
  if (left > maxLeft) {
    state.left = maxLeft
  } else {
    state.left = left
  }
  state.top = e.clientY - 80
  state.visible = true
  // 选择的当前路由
  state.selectedTag = tag
}
// 关闭菜单
const closeMenu = () => {
  state.visible = false
}
// export to page use
const { visible, top, left, selectedTag } = toRefs(state)

// 更新tag
const computedTag = () => {
  nextTick(() => {
    const wrap = document.querySelector('.tags-view-wrapper')
    let tagItem = document.querySelectorAll('.tags-view-item') || []
    tagItem = Array.from(tagItem) || []
    // tag
    const wrapWidth = wrap ? wrap.getBoundingClientRect().width : 0
    console.log(wrapWidth, wrap.getBoundingClientRect().width, 'wrapWidth')
    // 总共 tag标签宽度
    const tagItemWidth = tagItem
      .map((v) => v.getBoundingClientRect().width + 10)
      .reduce((pre, cur) => cur + pre, 0)
    if (tagItemWidth >= wrapWidth - 50) {
      isShowControl.value = true
    }
  })
}
// 滚动
const scrollTags = (direction) => {
  nextTick(() => {
    scrollActionAnimate(200, direction)
  })
}
// 滚动条动画
const scrollActionAnimate = (distance, direction) => {
  let hasScroll = 0
  let timer = null
  clearInterval(timer)
  timer = setInterval(() => {
    const wrap = document.querySelector('.tags-view-wrapper')
    hasScroll += 2
    if (direction === 'left') {
      wrap.scrollLeft = wrap.scrollLeft - 2
    } else {
      wrap.scrollLeft = wrap.scrollLeft + 2
    }
    if (hasScroll >= distance) {
      clearInterval(timer)
    }
  }, 0.5)
}
const goActiveTag = () => {
  nextTick(() => {
    // 获取当前激活的tag的index
    let index = -1
    visitedViews.value.forEach((v, k) => {
      if (v === activeMenu.value.name) {
        index = k
      }
    })
    // 获取当前tag之前的所有tag长度并且滚动
    let totalWidth = 0
    let tags = document.querySelectorAll('.tags-view-item') || []
    const wrap = document.querySelector('.tags-view-wrapper')
    const wrapWidth = wrap ? wrap.getBoundingClientRect().width : 0
    if (isShowControl.value) {
      tags = Array.from(tags)
      tags.forEach((v, k) => {
        if (k <= index) {
          const tagWidth = v.getBoundingClientRect().width
          totalWidth += tagWidth + 10
        }
      })
      const scrollWidth = totalWidth - wrapWidth + wrapWidth / 2
      wrap.scrollLeft = scrollWidth
    }
  })
}
</script>
<style lang="scss" scoped>
.tags {
  flex: 1;
  display: flex;
  .left,
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    overflow: hidden;
    width: 26px;
    height: 26px;
    line-height: 26px;
    cursor: pointer;
    text-align: center;
    box-shadow: -4px 0 3px -1px #ccc;
    z-index: 2;
  }
  // 路由标签
  .tags-view-wrapper {
    width: 0px;
    padding: 0 5px;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    transition: all 1s;
    &::-webkit-scrollbar {
      display: none;
    }
    .tags-view-item {
      display: flex;
      position: relative;
      cursor: pointer;
      height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-right: 10px;
      box-sizing: border-box;
      flex-shrink: 0;
      transition: all 0.1s;
      overflow: hidden;
      align-items: center;
      .el-icon-close {
        border-radius: 6px;
        width: 12px;
        height: 12px;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        vertical-align: -2px;
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  // 右键控制面板
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
