
<template>
  <div class="TransactionsInfo">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="data-table transactions-details">
      <ul class="table-ul">
        <li class="row">
          <span class="col">
            TxHash:
            <span class="clo col-lg-8">{{txHash}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            TxReceipt Status:
            <span class="clol col-lg-8">{{txReceiptStatus}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            Block Height:
            <span class="clol col-lg-8">
              <router-link to="/blocks/BlocksInfo" @click.native="setHeightValue">{{blockHeight}}</router-link>
            </span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            TimeStamp:
            <span class="clol col-lg-8">{{timeStamp}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            From:
            <span class="clol col-lg-8">
              <router-link
                to="/transactions/TransactionsInfo/AccountInfo"
                @click.native="setToValue"
              >{{from}}</router-link>
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
              >{{to}}</router-link>
            </span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            Value:
            <span class="clol col-lg-8">{{amount}}</span>
          </span>
        </li>
        <li class="row" v-if="gasLimit !== null">
          <span class="col">
            Gas Limit:
            <span class="clol col-lg-8">{{gasLimit}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            Gas Price:
            <span class="clol col-lg-8">{{gasPrice}}</span>
          </span>
        </li>
        <li class="row" v-if="gasUsed !== null">
          <span class="col">
            Gas Used:
            <span class="clol col-lg-8">{{gasUsed}}</span>
          </span>
        </li>
        <li class="row" v-if="fee !== null">
          <span class="col">
            Transaction Fee:
            <span class="clol col-lg-8">{{fee}}</span>
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
      clickValue: null,
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
      fee: null,
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
    setTimeout(() => {
      this.getTransactionsInfo();
    });
  },
  methods: {
    getClickValue() {
      Bus.$on("txHash", data => {
        this.Hash = data;
      });
    },
    setHeightValue(e) {
      this.clickValue.type = "height";
      this.clickValue.value = e.target.innerHTML;
      Bus.$emit('clickValue', JSON.stringify(this.clickValue));      
    },
    setToValue(e) {
      Bus.$emit("accountValue", e.target.innerHTML);
    },
    getTransactionsInfo() {
      this.$axios
        .get(this.transactions_url + this.Hash)
        .then(response => {
          let res = response.data.data;
          this.txHash = res.txHash;
          this.txReceiptStatus = res.confirmed;
          this.blockHeight = res.refBlockHeight;
          this.timeStamp = res.refBlockTime;
          this.from = res.from;
          this.to = res.to;
          this.amount = res.amount;
          this.gasLimit = res.gasLimit;
          this.gasPrice = res.gasPrice;
          this.gasUsed = res.gasUsed;
          this.fee = res.fee;
        })
        .catch(function(response) {});
    }
},
  watch: {
    // $route: "getClickValue"
  }
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
