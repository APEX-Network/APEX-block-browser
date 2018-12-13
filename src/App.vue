<template>
  <div id="app">
    <publicnav />
    <div class="main-box">
      <router-view></router-view>
    </div>
    <publicfooter />
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
