
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
              <router-link to="/blocks/BlocksInfo" @click.native="setClickValue">{{blockHeight}}</router-link>
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
                @click.native="setClickValue"
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
                @click.native="setClickValue"
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
      fee: null

    };
  },
  created() {
    this.getClickValue();
    this.getTransactionsInfo();
  },
  mounted() {
  },
  methods: {
    getClickValue() {
      // this.txHash = sessionStorage.getItem("clickValue");
      this.txHash = this.$route.params.clickValue;
      console.log(this.txHash);
      
    },
    setClickValue(e) {
      let clickValue = {
        type: "height",
        value: e.target.innerHTML
      };
      sessionStorage.setItem("clickValue", JSON.stringify(clickValue));
    },
    getTransactionsInfo() {
      if (this.txHash) {
        this.$axios
          .get("/api/v1.0/transactions/" + this.txHash)
          .then(response => {
            let res = response.data.data;
            console.log(res);
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
          .catch(function(response) {
            console.log(response);
          });
      }
    }
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
