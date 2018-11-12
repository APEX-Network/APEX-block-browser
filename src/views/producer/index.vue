<template>
  <div class="hello">
    <p>producer</p>
  </div>
</template>

<script>
import publicnav from "@/components/publicnav/index.vue";
import publicfooter from "@/components/publicfooter/index.vue";

export default {
  name: "producer",
  components: {
    publicnav,
    publicfooter
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
