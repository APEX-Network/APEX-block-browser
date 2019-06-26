<template>
  <div class="keyStore">
    <p class="title">{{title}}</p>
    <div class="flex-container">
      <div class="text">
        <p>Import wallet address by keystore.</p>
      </div>
      <div class="enterpwd">
        <input
          spellcheck="false"
          ref="keyStore"
          v-model="keyStore"
          @change="getkeyStore"
          placeholder="Paste or type keystore"
          autocomplete="new-password"
          readonly
          onfocus="this.removeAttribute('readonly');"
        >
        <div class="repatpwd">
          <input
            spellcheck="false"
            type="password"
            autocomplete="new-password"
            ref="pwd"
            v-model="pwd"
            @change="getPwd"
            placeholder="Enter the password corresponding to this keystore"
            onKeyUp="value=value.replace(/[\W]/g,'')"
            readonly
            onfocus="this.removeAttribute('readonly');"
          >
          <img src="./../../../assets/images/hiddeneye.png" @click="displayPwd" ref="hiddenPwd">
        </div>
        <div ref="checkKeyStore" class="checkKeyStore">Import failed</div>
      </div>
      <div class="create" @click="keyStoreWallet">CONTNUE</div>
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
import util from "@/utils/utils";
import Bus from "@/utils/bus";
import db from "@/utils/myDatabase";

export default {
  name: "KeyStore",
  props: [""],
  data() {
    return {
      title: "OpenWallet",
      walletAddress: null,
      keyStore: null,
      pwd: null,
      firstClick: 1,
      hiddenpwd: null,
      checkKeyStore: null
    };
  },

  components: {
    ApexBackGround,
    ApexTitle
  },

  mounted() {
    this.hiddenpwd = this.$refs.hiddenPwd;
    this.checkKeyStore = this.$refs.checkKeyStore;
  },

  methods: {
    getkeyStore() {
      this.keyStore = this.$refs.keyStore.value;
    },
    getPwd() {
      this.pwd = this.$refs.pwd.value;
    },
    displayPwd() {
      this.firstClick++;
      if (this.firstClick % 2 == 0 && this.pwd !== null) {
        this.$refs.pwd.type = "text";
        this.hiddenpwd.src = require("../../../assets/images/eye.png");
      }
      if (this.firstClick % 2 == 1 && this.pwd !== null) {
        this.$refs.pwd.type = "password";
        this.hiddenpwd.src = require("../../../assets/images/hiddeneye.png");
      }
    },
    keyStoreWallet() {
      try {
        if (this.keyStore !== null && this.pwd !== null) {
          let downKeyStore = this.keyStore;
          let key = this.pwd;
          this.walletAddress = util.utilMethods.keyStoreWallet(
            downKeyStore,
            key
          );
          Bus.$emit("apAddress", this.walletAddress);
          localStorage.setItem("apAddress", this.walletAddress);
          db.APKStore.put({
            APAddress: this.walletAddress,
            KStore: this.keyStore
          });
          this.checkKeyStore.style.visibility = "hidden";
          this.$router.push("/wallet");
        }
      } catch (error) {
        this.checkKeyStore.style.visibility = "visible";
      }
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
.keyStore {
  width: 100%;
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
    border-radius: 4px 4px 0 0;
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
      p {
        color: rgba(255, 255, 255, 0.7);
      }
    }
    .enterpwd {
      margin-top: 80px;
      height: 100px;
      width: 406px;
      input {
        margin-left: 30px;
        background: rgba(255, 255, 255, 0.001);
        border: 1px solid #56c4fd;
        width: 370px;
        height: 30px;
        position: absolute;
        color: aliceblue;
      }
      input:hover {
        box-shadow: 2px 2px 8px 2px #56c4fd;
      }
      .repatpwd {
        margin: 45px 100px 0 0;
        input {
          margin-left: 30px;
          margin-top: 25px;
          width: 370px;
          height: 30px;
          position: absolute;
          color: aliceblue;
        }
        input:hover {
          box-shadow: 2px 2px 8px 2px #56c4fd;
        }
        img {
          z-index: 1000;
          margin-left: 370px;
          margin-top: 33px;
          position: relative;
          cursor: pointer;
        }
      }
    }
    .checkKeyStore {
      color: #56c4fd;
      position: relative;
      top: 20px;
      left: 30px;
      visibility: hidden;
    }
    .create {
      cursor: pointer;
      color: #56c4fd;
      border: 1px solid #56c4fd;
      margin-top: 60px;
      margin-bottom: 150px;
      text-align: center;
      height: 30px;
      width: 160px;
      line-height: 30px;
      z-index: 1;
    }
    .create:hover {
      box-shadow: 2px 2px 8px 2px #56c4fd;
    }
  }
}
</style>