<template>
  <div class="privateKey">
    <apex-title :title="title" class="title"/>
    <apex-back-ground class="bg"/>
    <div class="flex-container">
      <div class="text">
        <p>Import wallet address by private key.</p>
      </div>
      <div class="enterpwd">
        <input
          spellcheck="false"
          ref="privKey"
          type="text"
          v-model="inputPrivKey"
          @change="getprivKey"
          placeholder="please paste your private key"
          autocomplete="new-password"
          readonly
          onfocus="this.removeAttribute('readonly');"
        >
        <div class="repatpwd">
          <input
            spellcheck="false"
            type="password"
            ref="pwd"
            v-model="firstPwd"
            @change="getPwd"
            placeholder="please set you password"
            onKeyUp="value=value.replace(/[\W]/g,'')"
            autocomplete="new-password"
            readonly
            onfocus="this.removeAttribute('readonly');"
          >
          <img src="./../../../assets/images/hiddeneye.jpg" @click="displayPwd" ref="hiddenpwd">
        </div>
      </div>
      <div class="create">
        <router-link to @click.native="privKeyAddress">ENCRYPT</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ApexTitle from "@/components/public/ApexTitle";
import ApexBackGround from "@/components/public/ApexBackGround";
import util from "./../../../utils/utils";
import Bus from "./../../../utils/bus";
import db from "./../../../utils/myDatabase";
const Base58check = require("base58check");

export default {
  name: "PrivateKey",
  props: [""],
  data() {
    return {
      title: "OpenWallet",
      privKey: null,
      pwd: null,
      keyStore: null,
      privKeyStore: null,
      hiddenpwd: null,
      firstClick: 1,
      inputPrivKey: null,
      firstPwd: null
    };
  },

  components: {
    ApexBackGround,
    ApexTitle
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.hiddenpwd = this.$refs.hiddenpwd;
    Bus.$on("keyStore", data => {
      this.keyStore = data;
    });
  },

  methods: {
    getprivKey() {
      this.inputPrivKey = this.$refs.privKey.value;
      let privLength = this.inputPrivKey.length;
      let firstByte = this.inputPrivKey.slice(0, 1);
      if (
        (firstByte == "K" && privLength == 52) ||
        (firstByte == "L" && privLength == 52)
      ) {
        let decode_privKey_Hex = Base58check.decode(
          this.inputPrivKey
        ).data.toString("hex");
        let decode_privKey = decode_privKey_Hex.substring(
          0,
          decode_privKey_Hex.length - 2
        );
        this.privKey = decode_privKey;
      } else {
        // this.$refs.privKey.value = null;
      }
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
    privKeyAddress() {
      if (this.privKey !== null && this.pwd !== null) {
        let url = "/wallet";
        setTimeout(() => {
          sessionStorage.setItem("walletUrl", url);
        });
        Bus.$emit("privKey", this.privKey);
        let userPrivKey = this.privKey;
        let key = this.pwd;
        let keyStoreParams = {
          data: this.privKey,
          key: this.pwd,
          iv: null
        };
        this.walletAddress = util.utilMethods.privKeyWallet(userPrivKey, key);
        this.privKeyStore = util.utilMethods.produce_KeyStore(keyStoreParams);
        db.APKStore.put({
          APAddress: this.walletAddress,
          KStore: this.privKeyStore
        });
        Bus.$emit("apAddress", this.walletAddress);
        sessionStorage.setItem("apAddress", this.walletAddress);
        this.$router.push("/wallet");
      }
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
.privateKey {
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
      margin-right: 50px;
      p {
        color: rgba(255, 255, 255, 0.7);
      }
    }
    .enterpwd {
      height: 100px;
      width: 375px;
      margin-top: 80px;
      input {
        margin-left: 0px;
        background: rgba(255, 255, 255, 0.001);
        border: 1px solid #f26522;
        width: 456px;
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
          margin-left: 0px;
          margin-top: 25px;
          width: 456px;
          height: 30px;
          color: aliceblue;
        }
        input:hover {
          box-shadow: 2px 2px 8px 2px #f26522;
        }
        img {
          z-index: 1000;
          margin-left: 428px;
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
      margin-left: 80px;
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