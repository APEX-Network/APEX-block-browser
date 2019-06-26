<template>
  <div class="privateKey">
    <p class="title">{{title}}</p>
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
        <div ref="checkPriv" class="checkPriv">Please enter the correct privKey</div>
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
          <img src="./../../../assets/images/hiddeneye.png" @click="displayPwd" ref="hiddenpwd">
        </div>
      </div>
      <div class="create" @click="isClick && privKeyAddress()">ENCRYPT</div>
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
      firstPwd: null,
      checkPriv: null,
      isClick: false
    };
  },

  components: {
    ApexBackGround,
    ApexTitle
  },
  mounted() {
    this.hiddenpwd = this.$refs.hiddenpwd;
    this.checkPriv = this.$refs.checkPriv;
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
        try {
          let decode_privKey_Hex = Base58check.decode(
            this.inputPrivKey
          ).data.toString("hex");
          let decode_privKey = decode_privKey_Hex.substring(
            0,
            decode_privKey_Hex.length - 2
          );
          this.privKey = decode_privKey;
          this.checkPriv.style.visibility = "hidden";
          this.isClick = true;
        } catch (error) {
          this.$refs.privKey.value = null;
          this.checkPriv.style.visibility = "visible";
          this.isClick = false;
        }
      } else {
        this.$refs.privKey.value = null;
        this.checkPriv.style.visibility = "visible";
        this.isClick = false;
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
        this.hiddenpwd.src = require("../../../assets/images/hiddeneye.png");
      }
    },
    privKeyAddress() {
      if (this.privKey !== null && this.pwd !== null) {
        Bus.$emit("privKey", this.privKey);
        let userPrivKey = this.privKey;
        let key = this.pwd;
        let keyStoreParams = {
          data: this.privKey,
          key: this.pwd,
          iv: null
        };
        this.walletAddress = util.utilMethods.produce_address(userPrivKey, key);
        this.privKeyStore = util.utilMethods.produce_KeyStore(keyStoreParams);
        db.APKStore.put({
          APAddress: this.walletAddress,
          KStore: this.privKeyStore
        });
        Bus.$emit("apAddress", this.walletAddress);
        localStorage.setItem("apAddress", this.walletAddress);
        this.$router.push("/wallet");
      }
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
.privateKey {
  height: 100%;
  padding-right: 20px;
  padding-left: 25px;
  padding-top: 44px;
  .title {
    padding-left: 25px;
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
        border: 1px solid #56c4fd;
        width: 456px;
        height: 30px;
        position: absolute;
        color: aliceblue;
      }
      input:hover {
        box-shadow: 2px 2px 8px 2px #56c4fd;
      }
      .checkPriv {
        color: #56c4fd;
        position: relative;
        top: 35px;
        visibility: hidden;
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
          box-shadow: 2px 2px 8px 2px #56c4fd;
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
      cursor: pointer;
      color: #56c4fd;
      border: 1px solid #56c4fd;
      margin-top: 60px;
      margin-left: 80px;
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