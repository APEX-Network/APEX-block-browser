<template>
  <div class="apex-title">
    <p class="apex-title">{{ title }}</p>
  </div>
</template>
<script>
export default {
  name: "ApexTitle",
  props: ["title"],
  data() {
    return {};
  }
};
</script>
<style scoped lang="less">
.apex-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-indent: 30px;
  box-sizing: border-box;
  // background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px 4px 0px 0px;
}
</style>
