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
        <li  ref="tList" v-for="(item,index) in transactions" :key="index">
          <div class="bottom">
            <router-link
              to
              @click.native="setClickValue(item.txHash)"
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
      ops: {},
      clickValue: null,
      transaction_list_url: "/api/v1.0/transactions/transactionList",
      parmas: {
        start: "0",
        pageSize: "20"
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
      this.newTransaction[1].style.opacity = "0";
      this.newTransaction[2].style.opacity = "0";
      this.newTransaction[3].style.opacity = "0";
      this.newTransaction[4].style.opacity = "0";
      this.newTransaction[5].style.opacity = "0";
      this.newTransaction[6].style.opacity = "0";
      this.newTransaction[7].style.opacity = "0";
      this.newTransaction[8].style.opacity = "0";
      this.newTransaction[9].style.opacity = "0";
      setTimeout(() => {
        this.newTransaction[0].style.opacity = "1";
        this.newTransaction[0].style.transition = "opacity 0.5s linear";
        this.newTransaction[1].style.opacity = "1";
        this.newTransaction[1].style.transition = "opacity 0.2s linear";
        this.newTransaction[2].style.opacity = "1";
        this.newTransaction[2].style.transition = "opacity 0.3s linear";
        this.newTransaction[3].style.opacity = "1";
        this.newTransaction[3].style.transition = "opacity 0.4s linear";
        this.newTransaction[4].style.opacity = "1";
        this.newTransaction[4].style.transition = "opacity 0.5s linear";
        this.newTransaction[5].style.opacity = "1";
        this.newTransaction[5].style.transition = "opacity 0.6s linear";
        this.newTransaction[6].style.opacity = "1";
        this.newTransaction[6].style.transition = "opacity 0.7s linear";
        this.newTransaction[7].style.opacity = "1";
        this.newTransaction[7].style.transition = "opacity 0.8s linear";
        this.newTransaction[8].style.opacity = "1";
        this.newTransaction[8].style.transition = "opacity 0.9s linear";
        this.newTransaction[9].style.opacity = "1";
        this.newTransaction[9].style.transition = "opacity 1s linear";
      }, this.time);
    },
    getAllTransactions() {
      this.$axios
        .post(this.transaction_list_url, this.parmas)
        .then(response => {
          this.transactions = [];
          let res = response.data.data;
          let serverTime = response.headers.date;
          // this.time = new Date().getSeconds() - new Date(serverTime).getSeconds();

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
      // Bus.$emit("txHash", e.target.innerHTML);
       this.$router.push({
          path: "/transactions/TransactionsInfo",
          query: {
            id: data
          }
        });
    },
    offListener() {
      Bus.$off("txHash");
    }
  },
  beforeDestroy() {
    this.offListener();
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
