<template>
  <div class="body-container">
    <vue-scroll :ops="ops"/>
    <div id="app">
      <publicnav/>
      <div class="main-box">
        <router-view :key="key"></router-view>
      </div>
      <publicfooter/>
    </div>
    <vue-scroll/>
  </div>
</template>

<script>
const publicnav = r =>
  require.ensure(
    [],
    () => r(require("@/components/publicnav/index.vue")),
    "App"
  );
const publicfooter = r =>
  require.ensure(
    [],
    () => r(require("@/components/publicfooter/index.vue")),
    "App"
  );
import db from "@/utils/myDatabase";
import util from "@/utils/utils";

export default {
  name: "App",
  components: {
    publicnav,
    publicfooter
  },
  data() {
    return {
      ops: {},
      APAddress: [],
      getAllAddress: null,
      minerBy_url: "/api/v1.0/minerInfo/minerList",
      params: {
        start: "0",
        pageSize: "10"
      },
      producer: [],
      Rank: 0
    };
  },
  created() {},
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + new Date()
        : this.$route + new Date();
    }
  },
  mounted() {
    this.getProducerList();
  },
  methods: {
    getProducerList() {
      this.$axios
        .post(this.minerBy_url, this.params)
        .then(response => {
          this.producer = [];
          this.Rank = 1;
          this.producer = JSON.parse(
            JSON.stringify(response.data.data, (key, value) => {
              if (
                key == "address" ||
                key == "blockCount" ||
                key == "describe" ||
                key == "name" ||
                key == "votes" ||
                key == "webSite" ||
                key == "zone"
              ) {
                return undefined;
              } else {
                return value;
              }
            })
          );
          for (let i = 0; i < this.producer.length; i++) {
            this.producer[i]["Rank"] = this.Rank++;
          }
          localStorage.setItem("producer", JSON.stringify(this.producer));
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    }
  }
};
</script>
<style scoped lang="less">
 .body-container {
   width: 100%;
 }
</style>



