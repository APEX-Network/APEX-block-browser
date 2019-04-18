<template>
  <div class="newWallet">
    <apex-title :title="title" class="title"/>
    <apex-back-ground class="bg"/>
    <div class="flex-container">
      <div class="text">
        <p>Password is Used To Encrypt Private Key And Authorize Transaction</p>
        <p>So It's Very Important To Set A Invulnerable Password.</p>
        <p>APEX Wallet Neither Store Your Password Nor Retrieve Them For You.</p>
        <p>Please Keep It In A Safe Place.</p>
      </div>
      <div class="enterpwd">
        <span>Enter Password</span>
        <input
          spellcheck="false"
          type="password"
          ref="firstPwd"
          @keyup.enter="nextInput($event)"
          v-model="firstPwd"
          @change="getPwd"
        >
        <!-- <input type="text" ref="firstPwdCover" v-model="firstPwdCover" @change="coverFirstPwd"> -->
        <img src="../../../assets/images/hiddeneye.jpg" @click="displayFirstPwd" ref="firstEye">
        <div class="repatpwd">
          <span>Repeat Password</span>
          <input
            spellcheck="false"
            type="password"
            ref="secondPwd"
            @keyup.enter="prevInput($event)"
            v-model="secondPwd"
            @change="getPwd"
          >
          <!-- <input type="text" ref="secondPwdCover" v-model="secondPwdCover" @change="coverSecondPwd"> -->
          <img src="../../../assets/images/hiddeneye.jpg" @click="displaySecondPwd" ref="secondEye">
        </div>
        <div class="epd">Enter Password differ</div>
        <div class="agreePolicy">
          <img
            src="./../../../assets/images/nocheckbox.jpg"
            @click="changeCheckBox"
            ref="nocheckbox"
          >
          <span>
            I Agree to the
            <span
              style="
            cursor: pointer;
            "
              @click="privacyPolicy"
            >Service and Privacy Policy</span>
          </span>
        </div>
      </div>
      <div class="create" @click="produceSign">
        <router-link to="/wallet/NewWallet/CreatedKeystore">CREATE</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ApexTitle from "@/components/public/ApexTitle";
import ApexBackGround from "@/components/public/ApexBackGround";
import util from "../../../utils/utils";
import ECPair from "bitcoinjs-lib/src/ecpair";
import Bus from "./../../../utils/bus";
import db from "./../../../utils/myDatabase";

export default {
  name: "NewWallet",
  props: [""],
  data() {
    return {
      title: "NewWallet",
      apAddress: null,
      firstPwd: null,
      firstPwdCover: null,
      secondPwd: null,
      secondPwdCover: null,
      keyStore: null,
      firstInput: null,
      secondInput: null,
      nocheckbox: null,
      firstEye: null,
      secondEye: null,
      firstClick: 1
    };
  },

  components: {
    ApexBackGround,
    ApexTitle
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.firstInput = this.$refs.firstPwd;
    this.secondInput = this.$refs.secondPwd;
    this.nocheckbox = this.$refs.nocheckbox;
    this.firstEye = this.$refs.firstEye;
    this.secondEye = this.$refs.secondEye;
  },

  methods: {
    getPwd() {
      this.first = this.$refs.firstPwd.value;
      this.second = this.$refs.secondPwd.value;
    },
    nextInput(ev) {
      if (ev.keyCode == 13) {
        this.secondInput.focus();
      }
    },
    produceSign() {
      if (this.firstPwd != null && this.secondPwd != null) {
        if (this.first != this.second) {
          alert("两次密码输入不正确,请重新输入!");
          this.$router.push("/wallet/NewWallet");
          return;
        }
        let ap = "0548";
        let signParams = {
          privKey: ECPair.makeRandom().privateKey.toString("hex")
        };
        Bus.$emit("privKey", signParams.privKey);
        this.apAddress = util.utilMethods.produce_address(
          signParams.privKey,
          ap
        );
        Bus.$emit("apAddress", this.apAddress);
        sessionStorage.setItem("apAddress", this.apAddress);
        let keyStoreParams = {
          data: signParams.privKey,
          key: this.secondPwd,
          iv: null
        };
        this.keyStore = util.utilMethods.produce_KeyStore(keyStoreParams);
        Bus.$emit("keyStore", this.keyStore);
        db.APKStore.put({
          APAddress: this.apAddress,
          KStore: this.keyStore
        });
      }
      if (this.firstPwd == null || this.secondPwd == null) {
        alert("请输入密码!");
        this.$router.push("/wallet/NewWallet");
        return;
      }
    },
    displayFirstPwd() {
      this.firstClick++;
      if (this.firstClick % 2 == 0 && this.firstPwd !== null) {
        this.$refs.firstPwd.type = "text";
        this.firstEye.src = require("../../../assets/images/eye.png");
      }
      if (this.firstClick % 2 == 1 && this.firstPwd !== null) {
        this.$refs.firstPwd.type = "password";
        this.firstEye.src = require("../../../assets/images/hiddeneye.jpg");
      }
    },
    displaySecondPwd() {
      this.firstClick++;
      if (this.firstClick % 2 == 0 && this.secondPwd !== null) {
        this.$refs.secondPwd.type = "text";
        this.secondEye.src = require("../../../assets/images/eye.png");
      }
      if (this.firstClick % 2 == 1 && this.secondPwd !== null) {
        this.$refs.secondPwd.type = "password";
        this.secondEye.src = require("../../../assets/images/hiddeneye.jpg");
      }
    },
    privacyPolicy() {
      this.$router.push("/home");
    },
    changeCheckBox() {
      this.firstClick++;
      if (this.firstClick % 2 == 0) {
        this.nocheckbox.src = require("../../../assets/images/nocheckbox.jpg");
      }
      if (this.firstClick % 2 == 1) {
        this.nocheckbox.src = require("../../../assets/images/checkbox.png");
      }
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
@import "./../../../assets/css/layout";
.newWallet {
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
        color: rgba(255, 255, 255, 0.7);
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
    .enterpwd {
      margin-top: 40px;
      margin-left: 35px;
      input {
        margin-left: 30px;
        background: rgba(255, 255, 255, 0.001);
        border: 1px solid #f26522;
        width: 250px;
        height: 30px;
        position: absolute;
        color: aliceblue;
      }
      input:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
      img {
        z-index: 1000;
        margin-left: 256px;
        position: relative;
        margin-top: 6px;
        cursor: pointer;
      }
      .epd {
        margin-left: 130px;
        margin-top: 16px;
        color: #f26522;
        visibility: hidden;
      }
      .agreePolicy {
        margin-top: 10px;
        img {
          margin-left: 132px;
          margin-right: 10px;
          margin-top: 0px;
          cursor: pointer;
        }
        span {
          margin-right: 5px;
          span {
            color: #f26522;
          }
        }
      }
      .repatpwd {
        margin: 45px 100px 0 0;
        input {
          margin-left: 20px;
          width: 251px;
          color: antiquewhite;
        }
        input:hover {
          box-shadow: 2px 2px 8px 2px #f26522;
        }
        img {
          z-index: 1000;
          margin-left: 246px;
          margin-top: 8px;
          position: absolute;
          cursor: pointer;
        }
      }
    }
    .create {
      color: #f26522;
      border: 1px solid #f26522;
      margin-top: 30px;
      margin-left: 60px;
      text-align: center;
      height: 30px;
      width: 120px;
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