<template>
  <div class="SavePrivKey">
    <p class="title">{{title}}</p>
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
              ref="img"
              @click=" privKey !== null && Copy()"
              src="./../../../assets/images/copy.png"
              alt
            >
          </i>
          <span ref="copyed" class="s2">Copy Successed</span>
        </p>
      </div>
      <div class="create2" @click="getAddress">CONTINUE</div>
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
import Bus from "@/utils/bus";
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
      tip: null,
      switchImg: null
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
      this.switchImg = this.$refs.img;
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
      setTimeout(() => {
        Bus.$emit("apAddress", this.apAddress);
        this.$router.push("/wallet");
      });
    },
    Copy(index) {
      this.switchImg.src = require("../../../assets/images/copied.png");
      let getCopyText = this.privKey;
      this.doCopy(getCopyText);
      this.privKey = null;
      this.tip.style.visibility = "visible";
    },
    doCopy(val) {
      this.$copyText(val).then();
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
.SavePrivKey {
  width: 100%;
  height: 100%;
  padding-right: 20px;
  padding-left: 23px;
  padding-top: 44px;
  .title {
    border-radius: 4px 4px 0 0;
    padding-left: 18px;
    padding-left: 23px;
    height: 50px;
    line-height: 50px;
    padding-bottom: 9px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.07);
    background-color: #000 !important;
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
          color: #56c4fd;
        }
        .s2 {
          float: right;
          padding-right: 10px;
          font-size: 15px;
          padding-top: 37px;
          color: #56c4fd;
          visibility: hidden;
        }
        .privkey {
          min-width: 453px;
          padding-left: 10px;
          position: absolute;
          padding-top: 8px;
          border-bottom: 1px solid #ffffff;
          img {
            cursor: pointer;
            padding-left: 10px;
            float: right;
            padding-bottom: 6px;
          }
        }
      }
      div {
        font-size: 20px;
        margin: 30px 0px 30px 200px;
      }
    }
    .create1 {
      color: #56c4fd;
      border: 1px solid #56c4fd;
      margin-top: 50px;
      text-align: center;
      height: 30px;
      width: 220px;
      line-height: 30px;
      z-index: 1;
      a {
        color: #56c4fd;
      }
      a:hover {
        box-shadow: 2px 2px 8px 2px #56c4fd;
      }
    }
    .create2 {
      color: #56c4fd;
      border: 1px solid #56c4fd;
      margin-top: 50px;
      margin-bottom: 150px;
      text-align: center;
      height: 30px;
      width: 220px;
      line-height: 30px;
      z-index: 1;
      cursor: pointer;
    }
    .create2:hover {
      box-shadow: 2px 2px 8px 2px #56c4fd;
    }
  }
}
</style>