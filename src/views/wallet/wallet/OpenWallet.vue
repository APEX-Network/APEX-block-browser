<template>
  <div class="openWallet">
    <apex-title :title="title" class="title"/>
    <apex-back-ground class="bg"/>
    <div class="flex-container">
      <div class="text">
        <p>How would like to access your wallet?</p>
      </div>
      <div class="privateKey">
        <router-link to @click.native="goPrivKey">PRIVATE KEY</router-link>
      </div>
      <div class="keyStore">
        <router-link to @click.native="goKeyStore">KEYSTOER</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ApexTitle from "@/components/public/ApexTitle";
import ApexBackGround from "@/components/public/ApexBackGround";

export default {
  name: "OpenWallet",
  props: [""],
  data() {
    return {
      title: "ImportWallet",
      walletUrl: null
    };
  },

  components: {
    ApexBackGround,
    ApexTitle
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.walletUrl = sessionStorage.getItem("walletUrl", this.walletUrl);
  },

  methods: {
    goPrivKey() {
      switch (this.walletUrl) {
        case "/wallet":
          this.$router.push("/wallet/OpenWallet/PrivateKey");
          break;
        case "/emptyWallet":
          this.$router.push("/emptyWallet/OpenWallet/PrivateKey");
          break;
        default:
          break;
      }
    },
    goKeyStore() {
      switch (this.walletUrl) {
        case "/wallet":
          this.$router.push("/wallet/OpenWallet/KeyStore");
          break;
        case "/emptyWallet":
          this.$router.push("/emptyWallet/OpenWallet/KeyStore");
          break;
        default:
          break;
      }
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
.openWallet {
  width: 100%;
  height: 100%;
  .bg {
    background: url(./../../../assets/images/shared/yunshi.png) 34% 58%
      no-repeat;
  }
  .flex-container {
    display: flex;
    height: auto;
    width: 60%;
    margin-left: 20%;
    flex-direction: column;
    .text {
      margin-top: 80px;
      p:nth-child(1) {
        color: rgba(255, 255, 255, 0.8);
      }
      p:nth-child(2) {
        color: rgba(255, 255, 255, 0.7);
        text-indent: 40px;
        padding-top: 2px;
      }
      p:nth-child(3) {
        padding-top: 2px;
      }
      p:nth-child(4) {
        padding-top: 2px;
        text-indent: 80px;
      }
    }
    .privateKey {
      color: #f26522;
      border: 1px solid #f26522;
      margin-top: 100px;
      text-align: center;
      height: 30px;
      width: 160px;
      line-height: 30px;
      z-index: 1;
      a {
        color: #f26522;
      }
      a:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
    }
    .keyStore {
      color: #f26522;
      border: 1px solid #f26522;
      margin-top: 30px;
      text-align: center;
      height: 30px;
      width: 160px;
      line-height: 30px;
      z-index: 1;
      a {
        color: #f26522;
      }
      a:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
    }
  }
}
</style>