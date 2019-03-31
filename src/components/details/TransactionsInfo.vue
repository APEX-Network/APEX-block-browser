
<template>
  <div class="TransactionsInfo">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="data-table transactions-details">
      <ul class="table-ul">
        <li class="row">
          <span class="col">
            TxHash:
            <span class="clo col-lg-8">{{transactionInfoData.txHash}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            TxReceipt Status:
            <span class="clol col-lg-8">{{transactionInfoData.txReceiptStatus}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            Block Height:
            <span class="clol col-lg-8">
              <router-link
                to="/blocks/BlocksInfo"
                @click.native="setHeightValue"
              >{{transactionInfoData.blockHeight}}</router-link>
            </span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            TimeStamp:
            <span class="clol col-lg-8">{{transactionInfoData.timeStamp}}</span>
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
            </span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            To:
            <span class="clol col-lg-8">
              <router-link
                to="/transactions/TransactionsInfo/AccountInfo"
                @click.native="setToValue"
              >{{transactionInfoData.to}}</router-link>
            </span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            Value:
            <span class="clol col-lg-8">{{transactionInfoData.amount}}</span>
          </span>
        </li>
        <li class="row" v-if="gasLimit !== null">
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
        <li class="row" v-if="transactionInfoData.fee !== null ">
          <span class="col">
            Transaction Fee:
            <span class="clol col-lg-8">{{transactionInfoData.fee}}</span>
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
        txReceiptStatus: null,
        from: null,
        to: null,
        amount: null,
        gasLimit: null,
        gasPrice: null,
        gasUsed: null,
        fee: null
      },
      clickValue: {
        type: "height",
        value: null
      },
      Hash: null
    };
  },
  created() {},
  mounted() {
    this.getClickValue();
    // setTimeout(() => {
    //   this.getTransactionsInfo();
    // });
  },
  methods: {
    getClickValue() {
      Bus.$on("txHash", data => {
        this.Hash = data;
        this.getTransactionsInfo();
      });
      // this.Hash = JSON.parse(sessionStorage.getItem("txHash"));
      // this.getTransactionsInfo();
    },
    setHeightValue(e) {
      this.clickValue.type = "height";
      this.clickValue.value = e.target.innerHTML;
      Bus.$emit("clickValue", JSON.stringify(this.clickValue));
    },
    setToValue(e) {
      Bus.$emit("accountValue", e.target.innerHTML);
    },
    getTransactionsInfo() {
      this.$axios
        .get(this.transactions_url + this.Hash)
        .then(response => {
          let res = response.data.data;
          this.transactionInfoData.txHash = res.txHash;
          this.transactionInfoData.txReceiptStatus = res.confirmed;
          this.transactionInfoData.blockHeight = res.refBlockHeight;
          this.transactionInfoData.timeStamp = util.utilMethods.tierAllTime(
            res.refBlockTime
          );
          this.transactionInfoData.from = res.from;
          this.transactionInfoData.to = res.to;
          this.transactionInfoData.amount = res.amount;
          this.transactionInfoData.gasLimit = res.gasLimit;
          this.transactionInfoData.gasPrice = res.gasPrice;
          this.transactionInfoData.gasUsed = res.gasUsed;
          this.transactionInfoData.fee = res.fee;
        })
        .catch(function(response) {});
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "./../../assets/css/layout";
.TransactionsInfo {
  width: 100%;
  height: 100%;
  background: url(./../../assets/images/shared/yunshi.png) 50% 65% no-repeat;
  .data-table {
    .table-ul {
      li {
        span {
          span {
            float: right;
          }
        }
      }
    }
  }
}
</style>
