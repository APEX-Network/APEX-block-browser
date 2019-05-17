<template>
  <div class="keyStore">
    <p class="title">{{title}}</p>
    <apex-back-ground class="bg"/>
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
          <img src="./../../../assets/images/hiddeneye.jpg" @click="displayPwd" ref="hiddenPwd">
        </div>
      </div>
      <div class="create">
        <router-link to @click.native="keyStoreWallet">CONTNUE</router-link>
      </div>
    </div>
  </div>
</template>

<script>
const ApexTitle = () => import("@/components/public/ApexTitle");
const ApexBackGround = () => import("@/components/public/ApexBackGround");
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
      hiddenpwd: null
    };
  },

  components: {
    ApexBackGround,
    ApexTitle
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.hiddenpwd = this.$refs.hiddenPwd;
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
        this.hiddenpwd.src = require("../../../assets/images/hiddeneye.jpg");
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
          this.$router.push("/wallet");
        }
      } catch (error) {
        console.log("密码输入错误");
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
        border: 1px solid #f26522;
        width: 370px;
        height: 30px;
        position: absolute;
        color: aliceblue;
      }
      input:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
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
          box-shadow: 2px 2px 8px 2px #f26522;
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
    .create {
      color: #f26522;
      border: 1px solid #f26522;
      margin-top: 60px;
      text-align: center;
      height: 30px;
      width: 160px;
      line-height: 30px;
      z-index: 1;
      a {
        color: #f26522;
      }
    }
    .create:hover {
      box-shadow: 2px 2px 8px 2px #f26522;
    }
  }
}
</style>