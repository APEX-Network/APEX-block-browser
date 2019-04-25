<template>
  <div class="overview apex-modul wallet-modul">
    <p class="apex-title">Wallet</p>
    <div class="clearboth">
      <div class="wallet-flex-container fl">
        <div class="clearboth">
          <div class="flex-item1 fl">Address</div>
          <Select2
          ref="select2"
            class="flex-item2 fl"
           autocomplete="new-password"
            placeholder="Please create or import your wallet"
            v-model="address"
            :options="APAddress"
            :settings="{ settingOption: value, settingOption: value }"
            @change="myChangeEvent($event)"
            @select="mySelectEvent($event)"
          />
        </div>
        <div class="btn-box btn-box-left">
          <router-link to="/wallet/NewWallet">NEW WALLET</router-link>
          <router-link to="/wallet/OpenWallet">IMPORT WALLET</router-link>
          <!-- @click.native="modifyAddress('abc')" -->
        </div>
      </div>
      <div class="wallet-flex-container fl">
        <div class="cpx-number">CPX: {{CPX}}</div>
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
    <!-- <div class="flex-container3">
      <div class="flex-item1">CLOSE WALLET</div>
    </div>-->
</template>

<script>
import Vue from "vue";
// import { mapActions, mapGetters } from "vuex";
import Bus from "./../../../utils/bus";
import db from "./../../../utils/myDatabase";

export default {
  name: "walletpage",
  props: ["address", "privKey"],
  data() {
    return {
      APAddress: [],
      getAllAddress: null,
      accountInfo_url: "/api/v1.0/accounts/account",
      CPX: 0,
      selected: null
    };
  },

  components: {},

  beforeMount() {},

  mounted() {
    this.selected = this.$refs.select2;
    this.address = sessionStorage.getItem("apAddress");
    setTimeout(() => {
      if (this.address !== null) {
        this.getCPX(this.address);
      }
    });
    const timer = setInterval(() => {
      this.address = sessionStorage.getItem("apAddress");
      if (this.address !== null) {
        this.getCPX(this.address);
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
      // if (this.APAddress.length == 0) {
      //   sessionStorage.setItem("apAddress", null)
      // }
  },

  methods: {
    myChangeEvent(val) {
      this.address = val;
      sessionStorage.setItem("apAddress", this.address);
    },
    mySelectEvent({ id, text }) {
      // console.log({ id, text });
    },
    sendAddress() {
      Bus.$emit("apAddress", this.address);
      setTimeout(() => {
        Bus.$emit("privKey", this.privKey);
      });
    },
    getCPX(address) {
      this.$axios
        .post(this.accountInfo_url, {
          address: address
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
    margin-top:60px;
    a {
      display: inline-block;
      height: 30px;
      // font-size: 18px;
      margin-right:30px;
      color: #f26522;
      line-height: 30px;
      text-align: center;
      border: 1px solid #f26522;
      padding: 0 30px;
      &:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
    }
    &.btn-box-left{
      a{
        &:first-of-type{
          margin-left: 80px;
        }
      }
    }
  }
  .flex-item1 {
    width:80px;
  }

  .flex-item2 {
    width: 340px !important;
    height: 35px !important;
    border: 1px solid #f26522;
    /deep/ .form-control:focus {
      border: 1px solid #f26522;
    }
    /deep/ .select2-container--focus {
      outline: none;
    }
    /deep/ .select2-container--open {
      /deep/ .select2-selection--single {
        outline: none;
        /deep/ .select2-selection__arrow {
          /deep/ b {
            left: 0;
            margin-left: 0;
            display: inline-block;
            content: " ";
            height: 14px;
            width: 14px;
            border-width: 2px 0px 0px 2px;
            border-color: #f26522;
            border-style: solid;
            transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
            transform-origin: center;
            transition: transform 0.3s;
            position: absolute;
            top: 75%;
            right: 8px;
            margin-top: -12px;
          }
        }
      }
    }

    /deep/.select2-selection--single {
      outline: none;
      line-height: 30px;
      background-color: transparent;
      border: 0px solid;
      border-radius: 0px;
      line-height: 33px;
      height: 33px;
      /deep/ .select2-selection__rendered {
        color: #fff;
        line-height: 35px;
      }
      /deep/ .select2-selection__arrow {
        height: 33px;
        position: absolute;
        top: 1px;
        right: 1px;
        width: 22px;
        /deep/ b {
          left: 0;
          margin-left: 0px;
          display: inline-block;
          content: " ";
          height: 14px;
          width: 14px;
          border-width: 0 2px 2px 0;
          border-color: #f26522;
          border-style: solid;
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          transform-origin: center;
          transition: transform 0.3s;
          position: absolute;
          top: 75%;
          right: 8px;
          margin-top: -20px;
        }
      }
    }
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