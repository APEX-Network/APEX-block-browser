
<template>
  <div class="TransactionsInfo">
    <apex-title :title="title" class="title"/>
    <apex-back-ground class="bg"/>
    <div class="data-table transactions-details">
      <ul class="table-ul">
        <li class="row">
          <span class="col">
            TxHash:
            <span class="clol col-lg-8">{{transactionInfoData.txHash}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            Status:
            <span class="clol col-lg-8">{{transactionInfoData.txStatus}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            Block Height:
            <span class="clol col-lg-8 changewidth">
              <router-link
                to
                @click.native="setHeightValue(transactionInfoData.blockHeight)"
              >{{transactionInfoData.blockHeight}}</router-link>
              <span>{{transactionInfoData.heightDiff}} Block Confirmations</span>
            </span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            TimeStamp:
            <span class="clol col-lg-8">{{transactionInfoData.timeStamp}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            Type:
            <span class="clol col-lg-8">{{transactionInfoData.type}}</span>
          </span>
        </li>
        <li class="row" v-if="transactionInfoData.nonce !== null">
          <span class="col">
            Nonce:
            <span class="clol col-lg-8">{{transactionInfoData.nonce}}</span>
          </span>
        </li>
        <li class="row" v-if="transactionInfoData.from !== ''">
          <span class="col">
            From:
            <span class="clol col-lg-8">
              <router-link
                to="/transactions/TransactionsInfo/AccountInfo"
                @click.native="setToValue"
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
            To:
            <span class="clol col-lg-8">
              <router-link
                to="/transactions/TransactionsInfo/AccountInfo"
                @click.native="setToValue"
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
            Value:
            <span class="clol col-lg-8">{{transactionInfoData.amount}}</span>
          </span>
        </li>
        <li class="row" v-if="transactionInfoData.gasLimit !== null">
          <span class="col">
            Gas Limit:
            <span class="clol col-lg-8">{{transactionInfoData.gasLimit}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            Gas Price:
            <span class="clol col-lg-8">{{transactionInfoData.gasPrice}}</span>
          </span>
        </li>
        <li class="row" v-if="transactionInfoData.gasUsed !== null ">
          <span class="col">
            Gas Used:
            <span class="clol col-lg-8">{{transactionInfoData.gasUsed}}</span>
          </span>
        </li>
        <!-- <li class="row" v-if="transactionInfoData.fee !== null ">
          <span class="col">
            Transaction Fee:
            <span class="clol col-lg-8">{{transactionInfoData.fee}}</span>
          </span>
        </li>-->
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
        heightDiff: null
      },
      clickValue: {
        type: "height",
        value: null
      },
      Hash: null,
      flag: null,
      fAddress: null,
      tAddress: null
    };
  },
  created() {},
  mounted() {
    window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
    this.getClickValue();
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
      this.Hash = this.$route.query.clickValue;
      sessionStorage.setItem("refresh", this.Hash);
      this.getTransactionsInfo();
      // Bus.$on("txHash", data => {
      //   this.Hash = data;
      //   sessionStorage.setItem("refresh", data);
      //   this.getTransactionsInfo();
      //   return;
      // });
      this.flag = sessionStorage.getItem("flag");
      if (this.Hash == null && this.flag == 1) {
        this.Hash = sessionStorage.getItem("refresh");
        this.getTransactionsInfo();
        return;
      }
    },
    setHeightValue(data) {
      this.clickValue.type = "height";
      this.clickValue.value = data;
      // Bus.$emit("clickValue", JSON.stringify(this.clickValue));
        this.$router.push({
          path: "/blocks/BlocksInfo",
          query: {
            clickValue: this.clickValue.value
          }
        });
    },
    setToValue(e) {
      Bus.$emit("accountValue", e.target.innerHTML);
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
            this.transactionInfoData.heightDiff =
              res.newBlockHeight - res.refBlockHeight;
            this.transactionInfoData.timeStamp = util.utilMethods.toUTCtime(
              res.refBlockTime,
              serverTime
            );
            this.transactionInfoData.from = res.from;
            this.transactionInfoData.nonce = res.nonce;
            this.transactionInfoData.to = res.to;
            this.transactionInfoData.amount = res.amount;
            this.transactionInfoData.gasLimit = res.gasLimit;
            this.transactionInfoData.gasPrice = res.gasPrice;
            this.transactionInfoData.gasUsed = res.gasUsed;
            this.transactionInfoData.fee = res.fee;
            this.transactionInfoData.type = res.type;
          })
          .catch(function(response) {});
      }
    },
    offListener() {
      Bus.$off("clickValue");
      Bus.$off("accountValue");
    },
    beforeunloadHandler(e) {
      this.flag = 1;
      sessionStorage.setItem("flag", this.flag);
    }
  },
  beforeDestroy() {
    sessionStorage.setItem("flag", null);
    this.offListener();
  },
  destroyed() {
    window.removeEventListener("beforeunload", e =>
      this.beforeunloadHandler(e)
    );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.TransactionsInfo {
  width: 100%;
  height: 100%;
  .bg {
    background: url(./../../assets/images/shared/yunshi.png) 68% 89% no-repeat;
  }
  .data-table {
    .table-ul {
      li {
        span {
          span {
            float: right;
            a {
              // width: 50%;
            }
            span {
              padding-right: 46%;
            }
          }
        }
      }
    }
  }
}
</style>
