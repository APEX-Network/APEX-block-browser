
<template>
  <div class="TransactionsInfo">
    <apex-back-ground class="bg"/>
    <div class="data-table transactions-details">
      <ul class="table-ul">
        <li class="row title">TransactionsInfo</li>
        <li class="row">
          <span class="col">
            {{TxHash}}
            <span class="clol col-lg-8">{{transactionInfoData.txHash}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            {{Status}}
            <span class="clol col-lg-8">{{transactionInfoData.txStatus}}</span>
          </span>
        </li>
        <li class="row" v-if="transactionInfoData.blockHeight !== -1">
          <span class="col">
            {{bHeight}}
            <span class="clol col-lg-8 changewidth">
              <router-link
                to
                @click.native="setHeightValue(transactionInfoData.blockHeight)"
              >{{transactionInfoData.blockHeight}}{{transactionInfoData.Status}}</router-link>
              <!-- <span>{{transactionInfoData.Status}}</span> -->
            </span>
          </span>
        </li>
        <li class="row" v-if="resTime !== null">
          <span class="col">
            {{TimeStamp}}
            <span class="clol col-lg-8">{{transactionInfoData.timeStamp}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            {{Type}}
            <span class="clol col-lg-8">{{transactionInfoData.type}}</span>
          </span>
        </li>
        <li class="row" v-if="transactionInfoData.nonce !== null">
          <span class="col">
            {{Nonce}}
            <span class="clol col-lg-8">{{transactionInfoData.nonce}}</span>
          </span>
        </li>
        <li class="row" v-if="transactionInfoData.from !== ''">
          <span class="col">
            {{From}}
            <span class="clol col-lg-8">
              <router-link
                to
                @click.native="setToValue(transactionInfoData.from)"
              >{{transactionInfoData.from}}</router-link>
              <img
                ref="fromAddress"
                @click="Copy(1)"
                style="cursor: pointer; padding-left: 10px;padding-top: 10px;
    position: absolute;"
                src="./../../assets/images/copy.png"
                alt
              >
            </span>
          </span>
        </li>
        <li class="row" v-if="transactionInfoData.to !== ''">
          <span class="col">
            {{address}}
            <span class="clol col-lg-8">
              <router-link
                to
                @click.native="setToValue(transactionInfoData.to)"
              >{{transactionInfoData.to}}</router-link>
              <img
                ref="toAddress"
                @click="Copy(2)"
                style="cursor: pointer; padding-left: 10px;padding-top: 10px;
    position: absolute;"
                src="./../../assets/images/copy.png"
                alt
              >
            </span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            {{value}}
            <span class="clol col-lg-8">{{transactionInfoData.amount}}</span>
          </span>
        </li>
        <li class="row" v-if="transactionInfoData.gasLimit !== null">
          <span class="col">
            {{gLimit}}
            <span class="clol col-lg-8">{{transactionInfoData.gasLimit}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            {{gPrice}}
            <span class="clol col-lg-8">{{transactionInfoData.gasPrice}}</span>
          </span>
        </li>
        <li class="row" v-if="transactionInfoData.gasUsed !== null ">
          <span class="col">
            {{gUsed}}
            <span class="clol col-lg-8">{{transactionInfoData.gasUsed}}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ApexTitle from "@/components/public/ApexTitle.vue";
import ApexBackGround from "@/components/public/ApexBackGround.vue";
import Pagination from "@/components/public/Pagination.vue";
import Bus from "./../../utils/bus";
import util from "./../../utils/utils";
export default {
  name: "TransactionsInfo",
  components: {
    Pagination,
    ApexTitle,
    ApexBackGround
  },
  data() {
    return {
      title: "Transactions Information",
      transactions_url: "/api/v1.0/transactions/",
      transactionInfoData: {
        txHash: null,
        blockHeight: null,
        timeStamp: null,
        txStatus: null,
        from: null,
        to: null,
        amount: null,
        gasLimit: null,
        gasPrice: null,
        gasUsed: null,
        fee: null,
        nonce: null,
        type: null,
        newBlockHeight: null,
        Status: null
      },
      clickValue: {
        type: "height",
        value: null
      },
      resTime: null,
      Hash: null,
      fAddress: null,
      tAddress: null,
      timer: null,
      timer2: null,
      decodeData: null,
      address: null,
      value: null,
      TxHash: null,
      Status: null,
      bHeight: null,
      TimeStamp: null,
      Type: null,
      Nonce: null,
      From: null,
      gLimit: null,
      gPrice: null,
      gUsed: null
    };
  },
  created() {},
  mounted() {
    this.getClickValue();
    this.timer = setInterval(() => {
      this.getTransactionsInfo();
    }, 1500);
    if (this.transactionInfoData.blockHeight == "-1") {
      this.timer2 = setInterval(() => {
        this.getTransactionsInfo();
      }, 1500);
    }
    this.$once("hook:beforeDestroy", () => {
      clearInterval(this.timer, this.timer2);
    });
  },
  methods: {
    getInstances() {
      this.fAddress = this.$refs.fromAddress;
      this.tAddress = this.$refs.toAddress;
    },
    Copy(index) {
      this.getInstances();
      if (index == 1) {
        this.fAddress.src = require("./../../assets/images/copied.png");
        let getCopyText = this.transactionInfoData.from;
        this.doCopy(getCopyText);
        return;
      }
      if (index == 2) {
        this.tAddress.src = require("./../../assets/images/copied.png");
        let getCopyText = this.transactionInfoData.to;
        this.doCopy(getCopyText);
        return;
      }
    },
    doCopy(val) {
      this.$copyText(val).then(() => {});
    },
    getClickValue() {
      this.Hash = this.$route.query.id;
      this.getTransactionsInfo();
    },
    setHeightValue(data) {
      this.$router.push({
        path: "/blocks/BlocksInfo",
        query: {
          id: data
        }
      });
    },
    setToValue(data) {
      this.$router.push({
        path: "/transactions/TransactionsInfo/AccountInfo",
        query: {
          id: data
        }
      });
    },
    getTransactionsInfo() {
      if (this.Hash !== null) {
        this.$axios
          .get(this.transactions_url + this.Hash)
          .then(response => {
            let serverTime = response.headers.date;
            let res = response.data.data;
            this.transactionInfoData.txHash = res.txHash;
            this.transactionInfoData.txStatus = res.status;
            this.transactionInfoData.newBlockHeight = res.newBlockHeight;
            this.transactionInfoData.blockHeight = res.refBlockHeight;
            this.resTime = res.refBlockTime;
            !!res.confirmed
              ? (this.transactionInfoData.Status = "(Confirmed)")
              : (this.transactionInfoData.Status = "(Unconfirmed)");
            if (!!res.confirmed) {
              clearInterval(this.timer);
            }
            this.transactionInfoData.timeStamp = util.utilMethods.toUTCtime(
              res.refBlockTime,
              serverTime
            );
            this.transactionInfoData.from = res.from;
            this.transactionInfoData.nonce = res.nonce;
            this.transactionInfoData.to = res.to;
            this.transactionInfoData.gasLimit = res.gasLimit;
            this.transactionInfoData.gasPrice = res.gasPrice;
            this.transactionInfoData.gasUsed = res.gasUsed;
            this.transactionInfoData.fee = res.fee;
            this.transactionInfoData.type = res.type;
            if (res.type == "Miner") {
              this.transactionInfoData.type = res.type;
              this.address = "To:";
              this.transactionInfoData.to = res.to;
              this.value = "Value:";
              this.transactionInfoData.amount = res.amount;
              this.Nonce = "Nonce:";
            }
            if (
              res.type == "Transfer" &&
              res.to !== "AP1xWDozWvuVah1W86DKtcWzdw1LqMYokMU"
            ) {
              this.transactionInfoData.type = res.type;
              this.address = "To:";
              this.transactionInfoData.to = res.to;
              this.value = "Value:";
              this.transactionInfoData.amount = res.amount;
              this.From = "From:";
              this.Nonce = "Nonce:";
            }

            if (
              res.type == "Call" &&
              res.to !== "AP1xWDozWvuVah1W86DKtcWzdw1LqMYokMU"
            ) {
              this.transactionInfoData.type = res.type;
              this.transactionInfoData.to = res.to;
              this.transactionInfoData.amount = res.amount;
              this.value = "Value:";
              this.From = "From:";
              this.address = "To";
              this.Nonce = "Nonce:";
            }

            if (
              res.type == "Call" &&
              res.to == "AP1xWDozWvuVah1W86DKtcWzdw1LqMYokMU"
            ) {
              this.decodeData = util.utilMethods.decodeTransactionsData(
                res.data
              );
              this.transactionInfoData.type = this.decodeData.type;
              this.transactionInfoData.to = this.decodeData.address;
              let key = this.decodeData.type;
              switch (key) {
                case "Vote":
                  this.value = "Voting amount:";
                  this.transactionInfoData.amount = this.decodeData.amount;
                  break;
                case "Redemption vote":
                  this.value = "Refund amount:";
                  this.transactionInfoData.amount = this.decodeData.amount;
                  break;

                default:
                  break;
              }
              this.Nonce = "Nonce:";
              this.address = "Support node:";
              this.From = "Voter:";
            }
            // if (
            //   res.type == "Call" &&
            //   res.from == "AP1xWDozWvuVah1W86DKtcWzdw1LqMYokMU"
            // ) {
            //   this.decodeData = util.utilMethods.decodeTransactionsData(
            //     res.data
            //   );
            //   this.transactionInfoData.type = this.decodeData.type;
            //   this.transactionInfoData.to = this.decodeData.address;
            //   let key = this.decodeData.type;
            //   switch (key) {
            //     case "Vote":
            //       this.value = "Voting amount:";
            //       this.transactionInfoData.amount = this.decodeData.amount;
            //       break;
            //     case "Redemption vote":
            //       this.value = "Refund amount:";
            //       this.transactionInfoData.amount = this.decodeData.amount;
            //       break;

            //     default:
            //       break;
            //   }
            //   this.Nonce = "Parent Tx:";
            //   this.address = "Support node:";
            //   this.From = "Voter:";
            // }
            this.TxHash = "TxHash:";
            this.Status = "Status:";
            this.bHeight = "Block Height:";
            this.TimeStamp = "TimeStamp:";
            this.Type = "Type:";
            this.gLimit = "Gas Limit:";
            this.gPrice = "Gas Price:";
            this.gUsed = "Gas Used:";
          })
          .catch(function(response) {});
      }
    }
  }
  // beforeDestroy() {
  //   sessionStorage.setItem("flag", null);
  //   this.offListener();
  // },
  // destroyed() {
  //   window.removeEventListener("beforeunload", e =>
  //     this.beforeunloadHandler(e)
  //   );
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.TransactionsInfo {
  width: 100%;
  height: 100%;
  .bg {
    // background: url(./../../assets/images/shared/yunshi.png) 68% 89% no-repeat;
    height: calc(100% - 72px);
  }
  .data-table {
    .table-ul {
      .title {
        padding-left: 18px;
        padding-top: 10px;
        border-bottom: 2px solid #000;
      }
      li {
        span {
          span {
            float: right;
            a {
              // width: 50%;
            }
            span {
              padding-right: 82%;
            }
          }
        }
      }
    }
  }
}
</style>
