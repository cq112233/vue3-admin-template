<template>
  <!-- elementPlus 自带 -->
  <ElSvgIcon
    :elSvgName='props.meta.elIcon'
    v-if="props.meta.elIcon"
  />

  <!-- SvgIcon svg图片 -->
  <SvgIcon
    :icon-class='props.meta.svgIcon'
    className="nav-icon"
    v-else-if="props.meta.svgIcon"
  />
  <!-- 图片icon -->
  <img
    :src='props.meta.iconUrl'
    className="nav-icon"
    v-else-if="props.meta.iconUrl"
  />
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  meta: {
    type: Object,
    default: null
  }
})
</script>

<style lang="scss" scoped>
img {
  width: 1em;
  height: 1em;
  margin-left: -2px; //el-svg-icon has some margin
  font-size: 20px !important;
  text-align: left !important;
}
</style>
