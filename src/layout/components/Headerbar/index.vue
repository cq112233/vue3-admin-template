<template>
  <div class="header">
    <section>
      <span>
        CQ专用账号
      </span>
      <span>
        服务管理平台
      </span>
    </section>
    <section class="display-row-center">
      <ScreenFull />
      <span>
        当前管理员
      </span>
      <span>
        cq
      </span>
      <img
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi-1.wzsky.net%2F2020%2F10%2F4%2F9aa8e2d5-e1a5-4453-aebf-8523b98bbefc.jpg&refer=http%3A%2F%2Fi-1.wzsky.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647070252&t=71d24a15cfc4c4dc0c4f1ec1f46e278e"
        alt=""
      >

      <el-dropdown
        trigger="click"
        @command='command'
        popper-class="lang-dropdown"
      >
        <span class="el-dropdown-link">
          当前语言:{{ lang }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              :command='item.lang'
              v-for="(item,index) of languages"
              :key="index"
              :divided='index >=1'
              :class="{active:store.state.app.lang === item.lang}"
            >
              {{ item.text }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
const store = useStore()
const i18n = useI18n()
const languages = ref([
  {
    id: 1,
    lang: 'zhCn',
    text: '中文'
  },
  {
    id: 2,
    lang: 'en',
    text: '英文'
  }
])
const command = (val) => {
  i18n.locale.value = val
  store.commit('app/set_lang', val)
}
const lang = computed(() => {
  let data = ''
  switch (store.state.app.lang) {
    case 'en':
      data = '英语'
      break
    case 'zhCn':
      data = '中文'
      break
    default:
      break
  }
  return data
})
setTimeout(() => {
  document.documentElement.style.setProperty('--qz-color-primary', 'red')
  document.documentElement.style.setProperty('--qz-color-warning', 'blue')
}, 3000)

setTimeout(() => {
  document.documentElement.style.setProperty('--qz-color-primary', 'green')
}, 5000)

console.log()
</script>

<style lang="scss">
.lang-dropdown {
  .active {
    color: $langDropdownActiveColor;
  }
}
</style>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: $headerbarHeight;
  padding: 0 30px;
  border-bottom: 1px solid #ccc;
  background: #fff;
  section > span {
    color:var(--qz-color-primary) ;
  }
}
img {
  width: 45px;
  height: 45px;
  margin-left: 20px;
}
</style>
