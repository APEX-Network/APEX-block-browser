<template>
  <div class="privateKey">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="flex-container">
      <div class="text">
        <p>Import wallet address by private key.</p>
      </div>
      <div class="enterpwd">
        <input
          spellcheck="false"
          ref="privKey"
          type="text"
          v-model="privKey"
          @change="getprivKey"
          placeholder="please paste your private key"
        >
        <div class="repatpwd">
          <input
            spellcheck="false"
            type="password"
            ref="pwd"
            v-model="firstPwd"
            @change="getPwd"
            placeholder="please set you password"
          >
          <img src="./../../../assets/images/eye.png" @click="displayPwd">
        </div>
      </div>
      <div class="create">
        <router-link to="/wallet" @click.native="privKeyAddress">ENCRYPT</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ApexTitle from "@/components/public/ApexTitle";
import ApexBackGround from "@/components/public/ApexBackGround";
import util from "./../../../utils/utils";
import Bus from "./../../../utils/bus";
import db from './../../../utils/myDatabase';

export default {
  name: "PrivateKey",
  props: [""],
  data() {
    return {
      title: "OpenWallet",
      privKey: null,
      pwd: null,
      keyStore: null
    };
  },

  components: {
    ApexBackGround,
    ApexTitle
  },

  computed: {},

  beforeMount() {},

  mounted() {
    Bus.$on("keyStore", data => {
      this.keyStore = data;
    });
  },

  methods: {
    getprivKey() {
      this.privKey = this.$refs.privKey.value;
    },
    getPwd() {
      this.pwd = this.$refs.pwd.value;
    },
    displayPwd() {
      this.$refs.pwd.type = "text";
    },
    privKeyAddress() {
      Bus.$emit("privKey", this.privKey);
      let userPrivKey = this.privKey;
      let key = this.pwd;
      this.walletAddress = util.utilMethods.privKeyWallet(userPrivKey, key);
      Bus.$emit("apAddress", this.walletAddress);
      sessionStorage.setItem("apAddress", this.walletAddress);
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
@import "./../../../assets/css/layout";
.privateKey {
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
      margin-right: 50px;
      p {
        color: rgba(255, 255, 255, 0.7);
      }
    }
    .enterpwd {
      margin-top: 80px;
      margin-left: 35px;
      input {
        margin-left: 0px;
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
          margin-left: 0px;
          margin-top: 25px;
          width: 370px;
          height: 30px;
          color: aliceblue;
        }
        input:hover {
          box-shadow: 2px 2px 8px 2px #f26522;
        }
        img {
          z-index: 1000;
          margin-left: 340px;
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
      margin-right: 25px;
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