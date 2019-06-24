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
          <router-link to="/wallet/OpenWallet" class="Iwallet">IMPORT WALLET</router-link>
        </div>
      </div>
      <div class="wallet-flex-container fl">
        <div class="cpx-number">CPX Available:</div>
        <span class="alignRight">{{CPX}}</span>

        <div class="cpx-number">Staked:</div>
        <span class="alignRight">{{staked}}</span>

        <div class="cpx-number">Refunding:</div>
        <span class="alignRight">{{refund}}</span>

        <div class="btn-box">
          <router-link to="/wallet/Transfer" @click.native="sendAddress">TRANSFER</router-link>
          <router-link to="/wallet/VotingSupport" @click.native="sendAddress">VOTE</router-link>
          <router-link to="/wallet/RefundVote" @click.native="sendAddress">REFUND</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "@/utils/bus";
import db from "@/utils/myDatabase";
import util from "@/utils/utils";

export default {
  name: "walletpage",
  props: ["address", "privKey"],
  data() {
    return {
      APAddress: [],
      getAllAddress: null,
      accountInfo_url: "/api/v1.0/accounts/account",
      voter_url: "/api/v1.0/vote/getVote",
      voter_params: { address: null },
      CPX: 0,
      copyImg: null,
      currentAddress: this.address,
      currentPrivKey: this.privKey,
      refundAmount: [],
      refund: 0,
      staked: 0
    };
  },

  components: {},

  beforeMount() {},

  mounted() {
    this.getInstances();
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
    getVoter(address) {
      if (address !== null) {
        this.$axios
          .post(this.voter_url, {
            address: address
          })
          .then(response => {
            this.refundAmount = [];
            let res = response.data.data;
            this.refund = res.pendingVote;
            let address_amount = res.target;
            let amount;
            for (let i = 0; i < address_amount.length; i++) {
              let item = address_amount[i];
              amount = item.split("-")[1].replace(/\s/gi, "");
              this.refundAmount.push(Number(amount));
            }
            this.staked = util.utilMethods.sum(this.refundAmount);
          })
          .catch(function(err) {
            if (err.response) {
              console.log(err.response);
            }
          });
      }
    },
    Copy(index) {
      this.copyImg.src = require("../../../assets/images/copied.png");
      let getCopyText = this.currentAddress;
      this.doCopy(getCopyText);
    },
    doCopy(val) {
      this.$copyText(val).then();
    },
    getInstances() {
      this.copyImg = this.$refs.copy;
    },
    myChangeEvent(val) {
      this.currentAddress = val;
      this.copyImg.src = require("../../../assets/images/copy.png");
      localStorage.setItem("apAddress", this.currentAddress);
    },
    mySelectEvent({ id, text }) {},
    sendAddress() {
      Bus.$emit("apAddress", this.currentAddress);
      setTimeout(() => {
        Bus.$emit("privKey", this.currentPrivKey);
      });
    },
    getCPX(currentAddress) {
      this.getVoter(this.currentAddress);
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
    height: 50px;
    line-height: 50px;
  }
}

.wallet-flex-container {
  width: 50%;
  padding: 35px 0 0 30px;
  .cpx-number {
    height: 35px;
    line-height: 35px;
    font-size: 15px;
  }
  .alignRight {
    padding-left: 14%;
    margin-top: -29px;
    position: fixed;
  }

  .btn-box {
    margin-top: 20px;
    a {
      display: inline-block;
      height: 30px;
      margin-right: 30px;
      color: #56c4fd;
      line-height: 30px;
      text-align: center;
      border: 1px solid #56c4fd;
      width: 120px;
      &:hover {
        box-shadow: 2px 2px 8px 2px #56c4fd;
      }
    }
    &.btn-box-left {
      margin-top: 85px;
      a {
        &:first-of-type {
          margin-left: 80px;
        }
      }
      .Iwallet {
        margin-left: 65px;
      }
    }
  }
  .flex-item1 {
    width: 80px;
  }

  .flex-item2 {
    width: 340px !important;
    height: 35px !important;
    border: 1px solid #56c4fd;
  }
  .flex-item2:hover {
    box-shadow: 2px 2px 8px 2px #56c4fd;
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
    color: #56c4fd;
    line-height: 30px;
    text-align: center;
    border: 1px solid #56c4fd;
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
