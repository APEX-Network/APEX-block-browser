<template>
  <div>
    <vue-scroll :ops="ops"/>
    <div id="app">
      <publicnav />
      <div class="main-box">
        <router-view :key="key"></router-view>
      </div>
      <publicfooter/>
    </div>
    <vue-scroll/>
  </div>
</template>

<script>
import publicnav from "@/components/publicnav/index.vue";
import publicfooter from "@/components/publicfooter/index.vue";
import db from "@/utils/myDatabase";
import Bus from "@/utils/bus";

export default {
  name: "App",
  components: {
    publicnav,
    publicfooter
  },
  data() {
    return {
      ops: {},
      walletUrl: null,
      APAddress: [],
      getAllAddress: null
    };
  },
  created() {
    // this.checkDB();
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + new Date()
        : this.$route + new Date();
    }
  },
  mounted() {
    // this.checkDB();
  },
  methods: {
    checkDB() {
      try {
        this.getAllAddress = db.APKStore.where("APAddress")
        .above(0)
        .toArray(APKStore => {
          APKStore.forEach(v => {
            this.APAddress.push(v.APAddress);
          });
          setTimeout(() => {
            if (this.APAddress.length == 0) {
              this.walletUrl = "/emptyWallet";
              sessionStorage.setItem("walletUrl", this.walletUrl);
            }
            if (this.APAddress.length !== 0) {
              this.walletUrl = "/wallet";
              sessionStorage.setItem("walletUrl", this.walletUrl);
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
    offListener() {
      // Bus.$off("walletUrl");
    }
  },
  beforeDestroy() {
    this.offListener();
  }
};
</script>



