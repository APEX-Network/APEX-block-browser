<template>
  <div class="hello">
      <p class="apex-title">Producer</p>
    <back-ground />
  </div>
</template>

<script>
import PublicNav from "@/components/publicnav/index.vue";
import PublicFooter from "@/components/publicfooter/index.vue";
import BackGround from "@/components/public/BackGround.vue";

export default {
  name: "producer",
  components: {
    PublicNav,
    PublicFooter,
    BackGround
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
