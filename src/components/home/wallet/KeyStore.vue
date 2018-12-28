<template>
  <div class="keyStore">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="flex-container">
      <div class="text">
        <p>Import wallet address by keystore.</p>
      </div>
      <div class="enterpwd">
        <input type="text" placeholder="Paste or type keystore">
        <div class="repatpwd">
          <input type="text" placeholder="Enter the password corresponding to this keystore">
          <img src="./../../../assets/images/eye.png">
        </div>
      </div>
      <div class="create">
        <router-link to="/wallet">CONTNUE</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ApexTitle from "@/components/public/ApexTitle";
import ApexBackGround from "@/components/public/ApexBackGround";

export default {
  name: "KeyStore",
  props: [""],
  data() {
    return {
      title: "OpenWallet"
    };
  },

  components: {
    ApexBackGround,
    ApexTitle
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

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
      }
      .repatpwd {
        margin: 45px 100px 0 0;
        input {
          margin-left: 30px;
          margin-top: 25px;
          width: 370px;
          height: 30px;
        }
        img {
          z-index: 1000;
          margin-left: 370px;
          margin-top: 33px;
          position: relative;
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
  }
}
</style>