<template>
  <div class="keyStore">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="flex-container">
      <div class="text">
        <p>Import wallet address by keystore.</p>
      </div>
      <div class="enterpwd">
        <input
          ref="keyStore"
          v-model="keyStore"
          @change="getkeyStore"
          placeholder="Paste or type keystore"
        >
        <div class="repatpwd">
          <input
            type="password"
            ref="pwd"
            v-model="pwd"
            @change="getPwd"
            placeholder="Enter the password corresponding to this keystore"
          >
          <img src="./../../../assets/images/eye.png" @click="displayPwd">
        </div>
      </div>
      <div class="create">
        <router-link to="/wallet" @click.native="keyStoreWallet">CONTNUE</router-link>
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

export default {
  name: "KeyStore",
  props: [""],
  data() {
    return {
      title: "OpenWallet",
      walletAddress: null,
      keyStore: null,
      pwd: null
    };
  },

  components: {
    ApexBackGround,
    ApexTitle
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    getkeyStore() {
      this.keyStore = this.$refs.keyStore.value;
      console.log(this.keyStore);
    },
    getPwd() {
      this.pwd = this.$refs.pwd.value;
      console.log(this.pwd);
    },
    displayPwd() {
      this.$refs.pwd.type = "text";
    },
    keyStoreWallet() {
      //获取用户导入的key文件
      console.log("用户导入的keyStore文件:" + this.keyStore);
      let downKeyStore = this.keyStore;
      let key = this.pwd;
      this.walletAddress = util.utilMethods.keyStoreWallet(downKeyStore, key);
      Bus.$emit("apAddress", this.walletAddress);
      db.APKStore.put({
        APAddress: this.walletAddress,
        KStore: this.keyStore
      });
      console.log(
        "通过用户导入的keyStore文件解密出正确的钱包地址====" +
          this.walletAddress
      );
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
@import "./../../../assets/css/layout";
.keyStore {
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
      p {
        color: rgba(255, 255, 255, 0.7);
      }
    }
    .enterpwd {
      margin-top: 80px;
      margin-left: 35px;
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
      margin-right: 25px;
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