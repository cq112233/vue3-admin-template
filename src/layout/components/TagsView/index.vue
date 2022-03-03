<template>
  <div
    id="tags-view-container"
    class="tags-view-container"
  >
    <LeftMenu />
    <Tags />
    <RightMenu />
  </div>
</template>

<script setup>
import Tags from './components/tags.vue'
import LeftMenu from './components/LeftMenu.vue'
import RightMenu from './components/RightMenu.vue'
</script>

<style lang="scss" scoped>
.tags-view-container {
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 5px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}
</style>
