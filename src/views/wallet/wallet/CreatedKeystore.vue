<template>
  <div class="createdKeystore">
    <p class="title">{{title}}</p>
    <div class="flex-container">
      <div class="text">
        <p class="p1">
          <span>Do not lose it!</span>
          <span>It cannot be recovered if you lose it.</span>
        </p>
        <p class="p2">
          <span>Do not share it!</span>
          <span>Your funds will be stolen if you use this file on a malicious phishing site.</span>
        </p>
        <p class="p3">
          <span>Make a backup!</span>
          <span>Secure it like the millions of dollars it may one day be worth.</span>
        </p>
        <div>Save Your Keystore File</div>
      </div>
      <div class="create1" @click="downloadKeyStore">DOWNLOAD ENCRYPTED KEY</div>
      <div class="create2" @click="getAddress" ref="changeClass">CONTINUE</div>
    </div>
  </div>
</template>

<script>
import Bus from "@/utils/bus";
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
  name: "CreatedKeystore",
  props: [""],
  data() {
    return {
      title: "NewWallet",
      address: null,
      apAddress: null,
      privKey: null,
      keyStore: null,
      create2Change: null
    };
  },

  components: {
    ApexBackGround,
    ApexTitle
  },
  mounted() {
    this.create2Change = this.$refs.changeClass;
    this.getKeyStoreAndlastAddress();
  },

  methods: {
    getKeyStoreAndlastAddress() {
      Bus.$on("apAddress", data => {
        this.apAddress = data;
      });
      Bus.$on("privKey", data => {
        this.privKey = data;
      });
      Bus.$on("keyStore", data => {
        this.keyStore = data;
      });
    },
    getAddress() {
      setTimeout(() => {
        Bus.$emit("apAddress", this.apAddress);
        Bus.$emit("privKey", this.privKey);
      }, 510);
      setTimeout(() => {
        this.$router.push("/wallet/NewWallet/CreatedKeystore/SavePrivKey");
      });
    },
    downloadKeyStore() {
      let link = document.createElement("a");
      link.download = "keyStore.txt";
      link.style.display = "none";
      let blob = new Blob([this.keyStore]);
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.create2Change.className = "createContinue";
    },
    offListener() {
      Bus.$off("apAddress");
      Bus.$off("privKey");
    }
  },
  beforeDestroy() {
    this.offListener();
  },
  watch: {}
};
</script>
<style lang='less' scoped>
.createdKeystore {
  width: 100%;
  height: 100%;
  padding-right: 20px;
  padding-left: 23px;
  padding-top: 44px;
  .title {
    padding-left: 18px;
    padding-left: 23px;
    padding-top: 10px;
    padding-bottom: 9px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.07);
    background-color: #000 !important;
  }
  .flex-container {
    height: 95%;
    background: #000;
    display: flex;
    width: 100%;
    flex-direction: column;
    .text {
      margin-top: 80px;
      p {
        span:nth-child(1) {
          font-size: 20px;
        }
        span:nth-child(2) {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.7);
        }
      }
      .p1 {
        margin-left: 150px;
      }
      .p2 {
        margin-left: 30px;
      }
      .p3 {
        margin-left: 50px;
      }
      div {
        font-size: 20px;
        margin: 30px 0px 0px 200px;
      }
    }
    .create1 {
      color: #56c4fd;
      border: 1px solid #56c4fd;
      margin-top: 50px;
      text-align: center;
      height: 30px;
      width: 220px;
      line-height: 30px;
      z-index: 1;
      cursor: pointer;
    }
    .create1:hover {
      box-shadow: 2px 2px 8px 2px #56c4fd;
    }
    .create2 {
      color: #999999;
      border: 1px solid #999999;
      margin-top: 30px;
      margin-bottom: 180px;
      text-align: center;
      height: 30px;
      width: 220px;
      line-height: 30px;
      z-index: 1;
      cursor: pointer;
    }
    .createContinue {
      color: #56c4fd;
      border: 1px solid #56c4fd;
      margin-top: 30px;
      margin-bottom: 180px;
      text-align: center;
      height: 30px;
      width: 220px;
      line-height: 30px;
      z-index: 1;
      cursor: pointer;
    }
    .createContinue:hover {
      box-shadow: 2px 2px 8px 2px #56c4fd;
    }
    .create2:hover {
      box-shadow: 2px 2px 8px 2px #999999;
    }
  }
}
</style>