<template>
  <div class="openWallet">
    <p class="title">{{title}}</p>
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
  height: 100%;
  padding-right: 20px;
  padding-left: 23px;
  padding-top: 44px;
  .title {
    padding-left: 18px;
    padding-left: 23px;
    height: 50px;
    line-height: 50px;
    padding-bottom: 9px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.07);
    background-color: #000 !important;
    border-radius: 4px 4px 0px 0px;
  }

  .flex-container {
    border-radius: 0 0 4px 4px;
    height: 93%;
    background: #000;
    display: flex;
    width: 100%;
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
      color: #56c4fd;
      border: 1px solid #56c4fd;
      margin-top: 100px;
      text-align: center;
      height: 30px;
      width: 160px;
      line-height: 30px;
      z-index: 1;
    }
    .privateKey:hover {
      box-shadow: 2px 2px 8px 2px #56c4fd;
    }
    .keyStore {
      cursor: pointer;
      color: #56c4fd;
      border: 1px solid #56c4fd;
      margin-top: 30px;
      margin-bottom: 256px;
      text-align: center;
      height: 30px;
      width: 160px;
      line-height: 30px;
      z-index: 1;
    }
    .keyStore:hover {
      box-shadow: 2px 2px 8px 2px #56c4fd;
    }
  }
}
</style>