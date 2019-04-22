<template>
  <div id="app">
    <publicnav/>
    <div class="main-box">
      <router-view :key="key"></router-view>
    </div>
    <publicfooter/>
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
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + new Date()
        : this.$route + new Date();
    }
  }
};
</script>



