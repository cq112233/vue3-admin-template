<template>
  <router-view/>
</template>
<script setup>
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
