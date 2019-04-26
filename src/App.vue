<template>
<div>
<!-- <vue-scroll :ops="ops"> -->
  <div id="app">
    <publicnav />
    <div class="main-box">
      <router-view :key="key"></router-view>
    </div>
    <publicfooter/>
  </div>
  <vue-scroll>
</div>
</template>

<script>
import publicnav from "@/components/publicnav/index.vue";
import publicfooter from "@/components/publicfooter/index.vue";
import db from './../src/utils/myDatabase';
import Bus from './../src/utils/bus';

export default {
  name: "App",
  components: {
    publicnav,
    publicfooter
  },
   data() {
    return {
      walletUrl: null,
      APAddress: [],
      getAllAddress: null
    };
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + new Date()
        : this.$route + new Date();
    }
  },
  mounted() {
    this.checkDB();
  },
  methods: {
     checkDB() {
      this.getAllAddress = db.APKStore.where("APAddress")
        .above(0)
        .toArray(APKStore => {
          APKStore.forEach(v => {
            this.APAddress.push(v.APAddress);
          });
          if (this.APAddress.length == 0) {
          this.walletUrl = "/emptyWallet";
          setTimeout(() => {
             Bus.$emit("walletUrl", this.walletUrl);
                console.log(this.APAddress.length);
                console.log(this.walletUrl);            
          }, );
        }
        if (this.APAddress.length != 0) {
          this.walletUrl = "/wallet";
          setTimeout(() => {
              Bus.$emit("walletUrl", this.walletUrl);
                 console.log(this.APAddress.length);
                 console.log(this.walletUrl);            
          }, );
          }
        });
    },
    offListener() {
      Bus.$off("walletUrl");
    }
  },
  beforeDestroy() {
    this.offListener();
  }
};
</script>



