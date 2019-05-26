<template>
  <div class="loading">
  </div>
</template>

<script>
export default {
  name: "Loading" // 定义的组件名称 使用时写法：loading
};
</script>

<style scoped>
.loading {
  position: fixed;
  left: 80;
  top: 35;
  background: url("~@/assets/img/loading-ripple.svg") center center no-repeat;
  width: 92%;
  height: 88%;
  z-index: 1;
}
</style>