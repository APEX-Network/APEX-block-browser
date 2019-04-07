<template>
  <div class="newWallet">
    <apex-title :title="title"/>
    <apex-back-ground/>
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
        <img src="./../../../assets/images/eye.png" @click="displayFirstPwd">
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
          <img src="./../../../assets/images/eye.png" @click="displaySecondPwd">
        </div>
        <div class="epd">Enter Password differ</div>
        <div class="agreePolicy">
          <img src="./../../../assets/images/checkbox.png">
          <span>
            I Agree to the
            <span>Service and Privacy Policy</span>
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

// import DBOperator from './../../../utils/myIndexDB';

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
      secondInput: null
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
    // prevInput(ev) {
    //   if (ev.keyCode == 13) {
    //     this.produceSign();
    //   }
    // },
    // coverFirstPwd() {
    //   this.firstPwdCover = this.$refs.firstPwdCover;
    //   this.firstPwdCover.onkeyup = function(e) {
    //     console.log(e);
    //     this.firstPwdCover.value = e.key.replace(/./, "*");
    //   };
    // },
    // coverSecondPwd() {
    //   this.secondPwdCover = this.$refs.secondPwdCover;
    //   this.secondPwdCover.onkeyup = function(e) {
    //     console.log(e);
    //     this.secondPwdCover.value = e.key.replace(/./, "*");
    //   };
    // },
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
        console.log(signParams.privKey);
        Bus.$emit("privKey", signParams.privKey);
        // let signature = util.utilMethods.Sign(signParams);
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
      this.$refs.firstPwd.type = "text";
    },
    displaySecondPwd() {
      this.$refs.secondPwd.type = "text";
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
  background: url(./../../../assets/images/shared/yunshi.png) 25% 35% no-repeat;
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
        margin-top: 15px;
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
          margin-top: 6px;
          position: relative;
          cursor: pointer;
        }
      }
    }
    .create {
      color: #f26522;
      border: 1px solid #f26522;
      margin-top: 30px;
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