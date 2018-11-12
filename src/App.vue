<template>
  <div id="app">
    <publicnav></publicnav>
      <router-view></router-view>
    <publicfooter></publicfooter>
  </div>
</template>

<script>
import publicnav from "@/components/publicnav/index.vue";
import publicfooter from "@/components/publicfooter/index.vue";

export default {
  name: "App",
  components: {
    publicnav,
    publicfooter
  }
};
</script>