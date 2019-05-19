
<template>
  <div class="TransactionsInfo">
    <apex-back-ground/>
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
            <span
              class="clol col-lg-8 changewidth"
              @click="setHeightValue(transactionInfoData.blockHeight)"
            >{{transactionInfoData.blockHeight}}{{transactionInfoData.Status}}</span>
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
            <span
              class="clol col-lg-8"
              :class="objectClass"
              @click="isClick && goParentTx(transactionInfoData.nonce)"
            >{{transactionInfoData.nonce}}</span>
          </span>
        </li>
        <li class="row" v-if="transactionInfoData.from !== ''">
          <span class="col">
            {{From}}
            <span class="clol col-lg-8">
              <i @click="setToValue(transactionInfoData.from)">{{transactionInfoData.from}}</i>
              <img ref="fromAddress" @click="Copy(1)" src="./../../assets/images/copy.png" alt>
            </span>
          </span>
        </li>
        <li class="row" v-if="transactionInfoData.to !== ''">
          <span class="col">
            {{address}}
            <span class="clol col-lg-8">
              <i @click="setToValue(transactionInfoData.to)">{{transactionInfoData.to}}</i>
              <img ref="toAddress" @click="Copy(2)" src="./../../assets/images/copy.png" alt>
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
import util from "@/utils/utils";
export default {
  name: "TransactionsInfo",
  components: {
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
      gUsed: null,
      objectClass: {
        noTxId: true,
        TxId: false
      },
      isClick: false
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
            this.transactionInfoData.to = res.to;
            this.transactionInfoData.gasLimit = res.gasLimit;
            this.transactionInfoData.gasPrice = res.gasPrice;
            this.transactionInfoData.gasUsed = res.gasUsed;
            this.transactionInfoData.fee = res.fee;
            this.transactionInfoData.type = res.type;
            this.objectClass.noTxId = true;
            this.objectClass.TxId = false;
            this.isClick = false;
            //矿工交易
            if (res.type == "Miner") {
              this.transactionInfoData.type = res.type;
              this.address = "To:";
              this.transactionInfoData.to = res.to;
              this.value = "Value:";
              this.transactionInfoData.amount = res.amount;
            }
            //正常交易
            if (res.type == "Transfer" && res.data == "") {
              this.transactionInfoData.type = res.type;
              this.address = "To:";
              this.transactionInfoData.to = res.to;
              this.value = "Value:";
              this.transactionInfoData.amount = res.amount;
              this.From = "From:";
              this.transactionInfoData.nonce = res.nonce;
              this.Nonce = "Nonce:";
            }

            //提案交易,不需要解析data
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
              this.transactionInfoData.nonce = res.nonce;
              this.Nonce = "Nonce:";
            }
            //投票交易和第一笔赎回交易,data解析不出来时需要捕获异常
            try {
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

                this.transactionInfoData.nonce = res.nonce;
                this.Nonce = "Nonce:";
                this.address = "Support node:";
                this.From = "Voter:";
              }
            } catch (error) {
              this.transactionInfoData.type = res.type;
              this.transactionInfoData.to = res.to;
              this.transactionInfoData.amount = res.amount;
              this.value = "Value:";
              this.From = "From:";
              this.address = "To";
              this.transactionInfoData.nonce = res.nonce;
              this.Nonce = "Nonce:";
            }
            //第二笔赎回交易,data解析不出来时需要捕获异常
            try {
              if (
                res.type == "Refund" &&
                res.from == "AP1xWDozWvuVah1W86DKtcWzdw1LqMYokMU"
              ) {
                this.objectClass.noTxId = false;
                this.objectClass.TxId = true;
                this.isClick = true;
                this.transactionInfoData.type = res.type;
                this.Nonce = "Parent Tx:";
                this.transactionInfoData.nonce = res.data;
                this.From = "From:";
                this.transactionInfoData.from = res.from;
                this.address = "Voter:";
                this.transactionInfoData.to = res.to;
                this.value = "Refund amount:";
                this.transactionInfoData.amount = res.amount;
              }
            } catch (error) {}
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
    },
    goParentTx(data) {
      this.$router.push({
        path: "/transactions/TransactionsInfo",
        query: {
          id: data
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.TransactionsInfo {
  width: 100%;
  height: 100%;
  .bg {
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
          .noTxId {
            color: #ebebeb;
          }
          .TxId {
            color: #f26522;
            cursor: pointer;
          }
          .changewidth {
            cursor: pointer;
            color: #f26522;
          }
          span {
            float: right;
            span {
              padding-right: 82%;
            }
            i {
              cursor: pointer;
              color: #f26522;
            }
            img {
              cursor: pointer;
              padding-left: 10px;
              padding-top: 10px;
              position: absolute;
            }
          }
        }
      }
    }
  }
}
</style>
