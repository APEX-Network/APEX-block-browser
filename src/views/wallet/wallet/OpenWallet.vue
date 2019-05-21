<template>
  <div class="openWallet">
    <p class="title">{{title}}</p>
    <apex-back-ground class="bg"/>
    <div class="flex-container">
      <div class="text">
        <p>How would like to access your wallet?</p>
      </div>
      <div class="privateKey" @click="goPrivKey">PRIVATE KEY</div>
      <div class="keyStore" @click="goKeyStore">KEYSTORE</div>
    </div>
  </div>
</template>

<script>
const ApexTitle = r =>
  require.ensure(
    [],
    () => r(require("@/components/public/ApexTitle")),
    "titleAndBackground"
  );
const ApexBackGround = r =>
  require.ensure(
    [],
    () => r(require("@/components/public/ApexBackGround")),
    "titleAndBackground"
  );

export default {
  name: "OpenWallet",
  props: [""],
  data() {
    return {
      title: "ImportWallet"
    };
  },

  components: {
    ApexBackGround,
    ApexTitle
  },
  methods: {
    goPrivKey() {
      this.$router.push("/wallet/OpenWallet/PrivateKey");
    },
    goKeyStore() {
      this.$router.push("/wallet/OpenWallet/KeyStore");
    }
  }
};
</script>
<style lang='less' scoped>
.openWallet {
  width: 100%;
  height: 100%;
  .title {
    padding-left: 18px;
    padding-left: 23px;
    padding-top: 10px;
    padding-bottom: 9px;
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
  .bg {
    height: calc(100% - 113px);
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
      cursor: pointer;
      color: #f26522;
      border: 1px solid #f26522;
      margin-top: 100px;
      text-align: center;
      height: 30px;
      width: 160px;
      line-height: 30px;
      z-index: 1;
    }
    .privateKey:hover {
      box-shadow: 2px 2px 8px 2px #f26522;
    }
    .keyStore {
      cursor: pointer;
      color: #f26522;
      border: 1px solid #f26522;
      margin-top: 30px;
      text-align: center;
      height: 30px;
      width: 160px;
      line-height: 30px;
      z-index: 1;
    }
    .keyStore:hover {
      box-shadow: 2px 2px 8px 2px #f26522;
    }
  }
}
</style>