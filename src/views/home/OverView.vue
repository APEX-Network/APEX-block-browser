<template>
      <div class="overview apex-modul fl">
        <p class="apex-title">Overview</p>
        <ul class="clearboth">
          <li>
            <p>Last Block</p>
            <p>1935566</p>
          </li>
          <li>
            <p>Max TPS</p>
            <p>463</p>
          </li>
          <li>
            <p>Daily TX</p>
            <p>1544945</p>
          </li>
          <li>
            <p>Daily Active Account</p>
            <p>46</p>
          </li>
        </ul>
      </div>
</template>
<script>

export default {
  name: "overview",
  components: {   
  },
  data() {
    return {
    };
  },
  created: function() {},
  mounted() { 
  },
  methods: {
  },
  computed: {}
};
</script>
<style scoped lang="less">
@import "./../../assets/css/layout";
.home {
  width: 100%;
  height: 100%;
  .bottom-modul,
  .top-modul {
    height: 49%;
    margin-bottom: 2%;
    .apex-modul {
      .apex-title {
        height: 43px;
        span:hover {
          box-shadow: 2px 2px 8px 2px #f26522;
        }
      }
    }
  }
}
</style>
