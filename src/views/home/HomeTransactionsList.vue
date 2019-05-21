<template>
  <div class="transactions apex-modul fr">
    <p class="apex-title">
      Transactions
      <router-link to="/transactions">
        <span>ALL</span>
      </router-link>
    </p>
    <ul class="apex-list">
      <vue-scroll :ops="ops">
        <li ref="tList" v-for="(item,index) in transactions" :key="index">
          <div class="bottom">
            <span class="hash" @click="setClickValue(item.txHash)">{{item.txHash}}</span>
            <span>{{item.refBlockTime}}</span>
          </div>
        </li>
      </vue-scroll>
    </ul>
  </div>
</template>

<script>
import util from "@/utils/utils";
export default {
  name: "HomeTransactionsList",
  components: {},
  data() {
    return {
      transactions: [],
      ops: {},
      clickValue: null,
      transaction_list_url: "/api/v1.0/transactions/transactionList",
      parmas: {
        start: "0",
        pageSize: "10"
      },
      time: 500
    };
  },
  created() {},
  mounted() {
    this.getAllTransactions();
    const timer = setInterval(() => {
      this.getAllTransactions();
    }, 1500);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
  methods: {
    changeColor() {
      this.newTransaction = this.$refs.tList;
      this.newTransaction[0].style.opacity = "0";
      if (!!this.transactions) {
        setTimeout(() => {
          this.newTransaction[0].style.opacity = "1";
          this.newTransaction[0].style.transition = "opacity 0.5s linear";
        }, this.time);
      }
    },
    getAllTransactions() {
      this.$axios
        .post(this.transaction_list_url, this.parmas)
        .then(response => {
          this.transactions = [];
          let res = response.data.data;
          let serverTime = response.headers.date;
          let time;
          for (let i = 0; i < res.length; i++) {
            const item = res[i];
            time = util.utilMethods.listUTCtime(item.refBlockTime, serverTime);
            item.refBlockTime = time;
          }
          this.transactions = res;
          if (this.transactions !== []) {
            this.changeColor();
          }
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err);
          }
        });
    },
    setClickValue(data) {
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

<style scoped lang="less">
.apex-modul {
  .apex-title {
    height: 43px;
    a {
      display: inline;
      span {
        color: #f26522;
      }
    }
    span:hover {
      box-shadow: 2px 2px 8px 2px #f26522;
    }
  }
}
</style>
