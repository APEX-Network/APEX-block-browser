<template>
  <div class="transactions apex-modul fr">
    <p class="apex-title">
      Transactions
      <span>
        <router-link to="/transactions">ALL</router-link>
      </span>
    </p>
    <ul class="apex-list">
      <vue-scroll :ops="ops">
        <li v-for="(item,index) in transactions" :key="index">
          <div class="bottom">
            <router-link
              to="/transactions/TransactionsInfo"
              @click.native="setClickValue"
            >{{item.txHash}}</router-link>
            <span>{{item.refBlockTime}}</span>
          </div>
        </li>
      </vue-scroll>
    </ul>
  </div>
</template>

<script>
import Pagination from "@/components/public/Pagination.vue";
import Bus from "./../../utils/bus";
import util from "./../../utils/utils";
export default {
  name: "HomeTransactionsList",
  components: {
    Pagination
  },
   data() {
    return {
      title: "Transactions",
      transactions: [],
      clickValue: null,
      transaction_list_url: "/api/v1.0/transactions/transactionList",
      parmas: {
        start: "0",
        pageSize: "20"
      }
    };
  },
  created() {
  },
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
    getAllTransactions() {
      this.$axios
        .post(this.transaction_list_url, this.parmas)
        .then(response => {
          let res = response.data.data;
          let minu;
          for (let i = 0; i < res.length; i++) {
            const item = res[i];
            minu = util.utilMethods.getSec(item.refBlockTime);
            item.refBlockTime = minu;
          }
          this.transactions = res;
        })
        .catch(function(err) {
          if (err.response) {
          }
        });
    },
    setClickValue(e) {
      Bus.$emit("txHash", e.target.innerHTML);
    }
  }
};
</script>

<style scoped lang="less">
.apex-modul {
  .apex-title {
    height: 43px;
    span {
      a {
        color: #f26522;
      }
    }
    span:hover {
      box-shadow: 2px 2px 8px 2px #f26522;
    }
  }
}
</style>
