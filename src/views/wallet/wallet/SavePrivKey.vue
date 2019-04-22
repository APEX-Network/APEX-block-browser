<template>
  <div class="SavePrivKey">
    <apex-title :title="title" class="title"/>
    <apex-back-ground class="bg"/>
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
        <div>Save Your Private Key</div>
        <p class="p3">
          <span class="s1">Private Key</span>
          <i class="privkey">
            {{privKey}}
            <img
              @click="Copy(index)"
              style="cursor: pointer; padding-left: 10px;float: right; padding-bottom: 6px;"
              src="./../../../assets/images/copy.png"
              alt
            >
          </i>
          <span ref="copyed" class="s2">Copy Successed</span>
        </p>
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
import Bus from "./../../../utils/bus";
const ECPair = require("bitcoinjs-lib/src/ecpair");

export default {
  name: "SavePrivKey",
  props: [""],
  data() {
    return {
      title: "SavePrivKey",
      address: null,
      apAddress: null,
      privKey: null,
      tip: null
    };
  },

  components: {
    ApexBackGround,
    ApexTitle
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.getInstances();
    this.getlastAddress();
  },

  methods: {
    getInstances() {
      this.tip = this.$refs.copyed;
    },
    getlastAddress() {
      Bus.$on("apAddress", data => {
        this.apAddress = data;
      });
      Bus.$on("privKey", data => {
        let privKeyToBuffer = Buffer.from(data, "hex");
        let privKeyToWif = ECPair.fromPrivateKey(privKeyToBuffer).toWIF();
        this.privKey = privKeyToWif;
      });
    },
    getAddress() {
      Bus.$emit("apAddress", this.apAddress);
    },
    Copy(index) {
      let getCopyText = this.privKey;
      this.doCopy(getCopyText);
      this.privKey = null;
      this.tip.style.visibility = "visible";
    },
    doCopy(val) {
      this.$copyText(val).then(
        function(e) {},
        function(e) {
          // console.log(e)
        }
      );
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
@import "./../../../assets/css/layout";
.SavePrivKey {
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
        .s1 {
          color: #f26522;
        }
        .s2 {
          float: right;
          padding-right: 10px;
          font-size: 15px;
          padding-top: 37px;
          color: #f26522;
          visibility: hidden;
        }
        .privkey {
          min-width: 453px;
          padding-left: 10px;
          position: absolute;
          padding-top: 8px;
          border-bottom: 1px solid #ffffff;
        }
      }
      div {
        font-size: 20px;
        margin: 30px 0px 30px 200px;
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
  }
}
</style>