<template>
  <div class="downloadKey">
    <apex-title :title="title"/>
    <apex-back-ground/>
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
      <!-- <div class="create1">
        <router-link to="/wallet/NewWallet/CreatedKeystore">DOWNLOAD ENCRYPTED KEY</router-link>
      </div>-->
      <div class="create2">
        <router-link to="/wallet" @click.native="getAddress">CONTINUE</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ApexTitle from "@/components/public/ApexTitle";
import ApexBackGround from "@/components/public/ApexBackGround";
import Bus from './../../../utils/bus';

export default {
  name: "DownloadKey",
  props: [""],
  data() {
    return {
      title: "NewWallet",
      address: null,
      apAddress: null
    };
  },

  components: {
    ApexBackGround,
    ApexTitle
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.getlastAddress();
  },

  methods: {
    getlastAddress() {
      Bus.$on("apAddress", data => {
        this.apAddress = data;
      });
    },
    getAddress() {
      Bus.$emit("apAddress", this.apAddress);
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
@import "./../../../assets/css/layout";
.downloadKey {
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
        margin: 30px 0px 0px 215px;
      }
    }
    .create1 {
      color: #f26522;
      border: 1px solid #f26522;
      margin-top: 50px;
      text-align: center;
      height: 30px;
      width: 220px;
      line-height: 30px;
      z-index: 1;
      a {
        color: #f26522;
      }
      a:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
    }
    .create2 {
      color: #f26522;
      border: 1px solid #f26522;
      margin-top: 30px;
      text-align: center;
      height: 30px;
      width: 220px;
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