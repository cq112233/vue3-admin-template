<template>

  <!-- <draggable
    class="menuContain"
    v-model="myArray"
    item-key="id"
    tag="transition-group"
    :component-data="{ tag: 'section', name: 'flip-list', type: 'transition' }"
    @end="sendEndApi"
  >
    <template #item="{ element }">
      <div class="menu">
        <div class="label">{{ element.name }}</div>
      </div>
    </template>
  </draggable> -->
  <router-view/>
</template>
<script setup>
//  引入组件
// import customMixin from '@/utils/mixin'
// import draggable from 'vuedraggable'
// const { ref } = customMixin()
// const myArray = ref([
//   { name: 'Apples', id: 1 },
//   { name: 'Bananas', id: 2 },
//   { name: 'xxxx', id: 3 }
// ])
// const sendEndApi = (val) => {
//   console.log(val)
// }
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}
.menuContain {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
  background-color: #fff;
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
  // .operate-menu {
  //   width: 188px;
  //   height: 250px;
  //   border-right: 2px solid #efefef;
  //   border-bottom: 2px solid #efefef;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   cursor: pointer;
  //   color: #999;
  // }
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
