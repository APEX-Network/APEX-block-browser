<template>
  <div id="app">
    <div class="main-box">
      <!-- <publicnav></publicnav> -->
      <router-view></router-view>
      <!-- <publicfooter></publicfooter> -->
    </div>
  </div>
</template>

<script>
// import publicnav from "@/components/publicnav/index.vue";
// import publicfooter from "@/components/publicfooter/index.vue";

export default {
  name: "App",
  components: {
    // publicnav,
    // publicfooter
  }
};
</script>
