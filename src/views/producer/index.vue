<template>
  <div class="hello">
    <apex-background />
  </div>
</template>

<script>
import PublicNav from "@/components/publicnav/index.vue";
import PublicFooter from "@/components/publicfooter/index.vue";
import ApexBackGround from "@/components/public/ApexBackGround.vue";

export default {
  name: "producer",
  components: {
    PublicNav,
    PublicFooter,
    ApexBackGround
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
