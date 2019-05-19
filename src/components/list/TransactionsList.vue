<template>
  <div class="transactions apex-modul fl">
    <p class="apex-title">
      Transactions
      <router-link to @click.native="goAccountInfo">
        <span>ALL</span>
      </router-link>
    </p>
    <ul class="apex-list">
      <vue-scroll :ops="ops">
        <li  v-for="(item,index) in transactions" :key="index">
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
  name: "transactionsList",
  components: {
  },
  data() {
    return {
      ops: {},
      transactions: [],
      clickValue: null,
      accountTransaction_url: "/api/v1.0/transactions/account/transactionList",
      accountTransaction_param: {
        start: 0,
        pageSize: 10,
        address: null
      },
      newTransaction: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.accountTransaction_param.address = localStorage.getItem("apAddress");
      this.getTransactionsList();
    });
    const timer = setInterval(() => {
      this.accountTransaction_param.address = localStorage.getItem("apAddress");
      this.getTransactionsList();
    }, 1500);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
  methods: {
    setClickValue(data) {
      this.$router.push({
        path: "/transactions/TransactionsInfo",
        query: {
          id: data
        }
      });
    },
    goAccountInfo() {
      let accountValue = localStorage.getItem("apAddress");
      this.$router.push({
        path: "/transactions/TransactionsInfo/AccountInfo",
        query: {
          id: accountValue
        }
      });
    },
    getTransactionsList() {
      if (this.accountTransaction_param.address !== null) {
        this.$axios
          .post(this.accountTransaction_url, this.accountTransaction_param)
          .then(response => {
            let res = response.data.data.transactions;
            let serverTime = response.headers.date;
            this.transactions = [];
            for (let i = 0; i < res.length; i++) {
              const element = res[i];
              if (element.type !== "Transfer") {
                this.transactions.push(element);
              }
            }
            let time;
            for (let i = 0; i < this.transactions.length; i++) {
              let element = this.transactions[i];
              time = util.utilMethods.listUTCtime(
                element.refBlockTime,
                serverTime
              );
              element.refBlockTime = time;
            }
          })
          .catch(function(err) {
            if (err.response) {
              console.log(err.response);
            }
          });
      }
    }
  },
  beforeDestroy() {
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
