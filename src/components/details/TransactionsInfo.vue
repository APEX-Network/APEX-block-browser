
<template>
  <div class="TransactionsInfo">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="data-table transactions-details">
      <ul class="table-ul">
        <li :class="['row']">
          <span class="col">
            TxHash:
            <span>{{txHash}}</span>
          </span>
        </li>
        <li :class="['row']">
          <span class="col">
            TxReceipt Status:
            <span class="success">{{txReceiptStatus}}</span>
          </span>
        </li>
        <li :class="['row']">
          <span class="col">
            Block Height:
            <span class="bHeight">
              <router-link to="/blocks/BlocksInfo">{{blockHeight}}</router-link>
            </span>
          </span>
        </li>
        <li :class="['row']">
          <span class="col">
            TimeStamp:
            <span class="timeStamp">{{timeStamp}}</span>
          </span>
        </li>
        <li :class="['row']">
          <span class="col">
            From:
            <span class="from">
              <router-link
                to="/transactions/TransactionsInfo/AccountInfo"
                @click.native="setClickValue"
              >{{from}}</router-link>
            </span>
          </span>
        </li>
        <li :class="['row']">
          <span class="col">
            To:
            <span class="to">
              <router-link
                to="/transactions/TransactionsInfo/AccountInfo"
                @click.native="setClickValue"
              >{{to}}</router-link>
            </span>
          </span>
        </li>
        <li :class="['row']">
          <span class="col">
            Value:
            <span class="value">{{amount}}</span>
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
      amount: null
    };
  },
  created() {
    this.getClickValue();
  },
  mounted() {
    this.getTransactionsInfo();
  },
  methods: {
    getClickValue() {
      // this.txHash = this.$route.params.clickValue;
      // this.txHash = this.$route.query.clickValue;
      // console.log("路由传参" + this.txHash);
     this.txHash = sessionStorage.getItem("clickValue");
    },
    setClickValue(e) {
      this.clickValue = e.target.innerHTML;
      this.$router.push({
        name: "AccountInfo",
        params: {
          clickValue: this.clickValue
        }
      });
    },
    getTransactionsInfo() {
      if (this.txHash) {
        this.$axios
          .get("/api/v1.0/transactions/" + this.txHash)
          .then(response => {
            console.log(response);
            let res = response.data.data;
            this.txReceiptStatus = res.confirmed;
            this.blockHeight = res.data;
            this.timeStamp = res.refBlockTime;
            this.from = res.from;
            this.to = res.to;
            this.amount = res.amount;
          })
          .catch(function(response) {
            console.log(response);
          });
      }
    }
  },
  watch: {
    $route: "getClickValue"
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
          .success {
            margin-right: 54.5%;
            float: right;
          }
          .bHeight {
            margin-right: 26%;
            float: right;
          }
          .timeStamp {
            margin-right: 47.5%;
            float: right;
          }
          .from {
            margin-right: 38%;
            float: right;
          }
          .to {
            margin-right: 39.9%;
            float: right;
          }
          .value {
            margin-right: 45%;
            float: right;
          }
          span {
            margin-right: 10%;
            float: right;
            a {
              margin-left: 33%;
            }
          }
        }
      }
    }
  }
}
</style>
