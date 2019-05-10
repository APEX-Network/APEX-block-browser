<template>
  <div class="overview apex-modul wallet-modul">
    <p class="apex-title">Wallet</p>
    <div class="clearboth">
      <div class="wallet-flex-container fl">
        <div class="clearboth">
          <div class="flex-item1 fl">Address</div>
          <Select2
            class="flex-item2 fl"
            autocomplete="new-password"
            readonly
            onfocus="this.removeAttribute('readonly');"
            v-model="currentAddress"
            :options="APAddress"
            @change="myChangeEvent($event)"
            @select="mySelectEvent($event)"
          />
          <img
            @click="Copy()"
            ref="copy"
            style=" margin-top: 10px;cursor: pointer;margin-left: 12px;"
            src="../../../assets/images/copy.png"
            alt
          >
        </div>
        <div class="btn-box btn-box-left">
          <router-link to="/wallet/NewWallet">NEW WALLET</router-link>
          <router-link to="/wallet/OpenWallet">IMPORT WALLET</router-link>
          <!-- @click.native="modifyAddress('abc')" -->
        </div>
      </div>
      <div class="wallet-flex-container fl">
        <div class="cpx-number">CPX: <span v-tip="CPX">{{CPX}}</span></div>
        <div class="btn-box">
          <router-link
            to="/wallet/Transfer"
            @click.native="sendAddress"
          >TRANSFER</router-link>
          <router-link
            to="/wallet/VotingSupport"
            @click.native="sendAddress"
          >VOTE</router-link>
          <router-link
            to="/wallet/RefundVote"
            @click.native="sendAddress"
          >REFUND</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
// import { mapActions, mapGetters } from "vuex";
import Bus from "./../../../utils/bus";
import db from "./../../../utils/myDatabase";
import $ from "jquery";

export default {
  name: "walletpage",
  props: ["address", "privKey"],
  data() {
    return {
      APAddress: [],
      getAllAddress: null,
      accountInfo_url: "/api/v1.0/accounts/account",
      CPX: 0,
      copyImg: null,
      currentAddress: this.address,
      currentPrivKey: this.privKey
    };
  },

  components: {},

  beforeMount() {},

  mounted() {
    this.getInstances();
    // this.currentAddress = sessionStorage.getItem("apAddress");
    this.currentAddress = localStorage.getItem("apAddress");
    setTimeout(() => {
      if (this.currentAddress !== null) {
        this.getCPX(this.currentAddress);
      }
    });
    const timer = setInterval(() => {
      this.currentAddress = localStorage.getItem("apAddress");
      if (this.currentAddress !== null) {
        this.getCPX(this.currentAddress);
      }
    }, 1500);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
    this.getAllAddress = db.APKStore.where("APAddress")
      .above(0)
      .toArray(APKStore => {
        APKStore.forEach(v => {
          this.APAddress.push(v.APAddress);
        });
      });
  },

  methods: {
    Copy(index) {
      this.copyImg.src = require("../../../assets/images/copied.png");
      let getCopyText = this.currentAddress;
      this.doCopy(getCopyText);
    },
    doCopy(val) {
      this.$copyText(val).then(
        function(e) {},
        function(e) {
          // console.log(e)
        }
      );
    },
    getInstances() {
      this.copyImg = this.$refs.copy;
    },
    myChangeEvent(val) {
      this.currentAddress = val;
      this.copyImg.src = require("../../../assets/images/copy.png");
      localStorage.setItem("apAddress", this.currentAddress);
    },
    mySelectEvent({ id, text }) {
      // console.log({ id, text });
    },
    sendAddress() {
      Bus.$emit("apAddress", this.currentAddress);
      setTimeout(() => {
        Bus.$emit("privKey", this.currentPrivKey);
      });
    },
    getCPX(currentAddress) {
      this.$axios
        .post(this.accountInfo_url, {
          address: currentAddress
        })
        .then(response => {
          let res = response.data.data;
          if (res == null) {
            this.CPX = 0;
            return;
          }
          if (res !== null) {
            let result = res.balance.toString().indexOf(".");
            if (result > -1) {
              let pointLength = res.balance.toString().split(".")[1].length;
              if (pointLength > 8) {
                this.CPX =
                  res.balance.toString().split(".")[0] +
                  "." +
                  res.balance
                    .toString()
                    .split(".")[1]
                    .substring(0, 8);
              }
              if (pointLength <= 8) {
                this.CPX = res.balance;
              }
            }
            if (result == -1) {
              this.CPX = res.balance;
            }
          }
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    },
    offListener() {
      Bus.$off("apAddress");
      Bus.$off("privKey");
    }
  },
  beforeDestroy() {
    this.offListener();
  },
  computed: {},

  watch: {}
};
</script>
<style lang='less' scoped>
  .wallet-modul {
  width: 100%;
  .apex-title {
    height: 43px;
  }
}

.wallet-flex-container {
  width: 50%;
  padding: 60px 0 0 30px;
  .cpx-number {
    height: 35px;
    line-height: 35px;
    text-align: left;
    font-size: 22px;
  }
  .btn-box {
    margin-top: 60px;
    a {
      display: inline-block;
      height: 30px;
      // font-size: 18px;
      margin-right: 30px;
      color: #f26522;
      line-height: 30px;
      text-align: center;
      border: 1px solid #f26522;
      padding: 0 30px;
      &:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
    }
    &.btn-box-left {
      a {
        &:first-of-type {
          margin-left: 80px;
        }
      }
    }
  }
  .flex-item1 {
    width: 80px;
  }

  .flex-item2 {
    width: 340px !important;
    height: 35px !important;
    border: 1px solid #f26522;
  }
  .flex-item2:hover {
    box-shadow: 2px 2px 8px 2px #f26522;
  }
}

.flex-container3 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 30%;
  .flex-item1 {
    width: 110px;
    height: 30px;
    margin-left: 940px;
    margin-top: 20px;
    color: #f26522;
    line-height: 30px;
    text-align: center;
    border: 1px solid #f26522;
  }
}
@media screen and(max-width:1366px) {
  .wallet-modul {
    .flex-container2 {
      .flex-item3 {
        margin-left: 20%;
      }
    }
  }
}
</style>