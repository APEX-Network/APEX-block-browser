<template>

  <div>
    <div class="error">
    <img src="./../../assets/images/error.png" alt>
  </div>
     <!-- <div @click="backHome" class="back-home">
    <router-link to="/home">BACK HOME</router-link>
  </div> -->
  </div>
</template>

<script>
export default {
  name: "",
  props: [""],
  data() {
    return {};
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    backHome() {
      alert("返回主页面");
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
.error {
  width: 100%;
  height: 100vh;
  position: relative;
}
.back-home {
   width: 100%;
  height: 760px;
  position: relative;
}
</style>