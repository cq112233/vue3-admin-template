<template>
  <div class='dashboard'>
    {{$t('message.Home')}}
      <el-button type='primary' v-if="!permissionMap['about2.x']">主题色</el-button>
      <el-button type='primary' size='small'>主题色</el-button>
    <SlickList
      axis="x"
      v-model:list="fruits"
      :distance='5'
      class="menuContain"
      helperClass="menu-dragging"
    >
      <SlickItem
        v-for="(fruit, i) in fruits"
        :key="fruit"
        :index="i"
      >
        <div class="menu">
          <div class="label"> {{ fruit }}</div>
          <!-- <i
              :class="icons[iconStyl(item.url)]"
              style="font-size: 50px !important; color: #555"
            /> -->
        </div>
      </SlickItem>
    </SlickList>
  </div>
</template>

<script setup>
import { TradingStatus } from '@/enums'
//  引入组件
import customMixin from '@/mixin.js'
import { SlickList, SlickItem } from 'vue-slicksort'
console.log(TradingStatus)
const { onActivated, onMounted, ref, store, computed } = customMixin()

onActivated(() => {
  console.log('激活')
})
onMounted(() => {
  console.log('创建')
})
const fruits = ref(['Apples', 'Bananas', 'xxxx'])
const permissionMap = computed(() => {
  return store.state.permission.permissionMap
})
</script>

<script>
export default {
  name: 'dashboard'
}
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 20px;
}
.flip-list-move {
  transition: transform 2s;
}

.no-move {
  transition: transform 0s;
}
.menu {
  width: 188px;
  height: 250px;
  padding: 60px 0;
  cursor: pointer;
  text-align: center;
  border-right: 2px solid #efefef;
  border-bottom: 2px solid #efefef;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  box-sizing: border-box;
  .label {
    margin-bottom: 40px;
  }
}
.menuContain {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
  background-color: #fff;

}
.menu-dragging {
  width: 188px;
  height: 250px;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  text-align: center;
  border: 2px solid #efefef;
  font-size: 20px;
  box-sizing: border-box;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  .label {
    margin-bottom: 40px;
  }
}
</style>
