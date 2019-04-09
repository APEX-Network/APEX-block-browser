<template>
  <div class="transactions apex-modul fr">
    <p class="apex-title">
      Transactions
      <router-link to="/transactions/TransactionsInfo/AccountInfo" @click.native="goAccountInfo">
        <span>ALL</span>
      </router-link>
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
import { setTimeout } from "timers";
export default {
  name: "transactionsList",
  components: {
    Pagination
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
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.accountTransaction_param.address = sessionStorage.getItem(
        "apAddress"
      );
    });
    this.getTransactionsList();
    const timer = setInterval(() => {
      this.getTransactionsList();
    }, 1500);
    this.$once("hook:beforeDestroy", () => {
      // sessionStorage.setItem("apAddress", null)
      clearInterval(timer);
    });
  },
  methods: {
    setClickValue(e) {
      Bus.$emit("txHash", e.target.innerHTML);
    },
    goAccountInfo() {
      Bus.$emit("accountValue", sessionStorage.getItem("apAddress"));
    },
    getTransactionsList() {
      if (!!this.accountTransaction_param) {
        this.$axios
          .post(this.accountTransaction_url, this.accountTransaction_param)
          .then(response => {
            let res = response.data.data;
            this.transactions = res;
            let time;
            for (let i = 0; i < this.transactions.length; i++) {
              let element = this.transactions[i];
              time = util.utilMethods.getSec(element.refBlockTime);
              element.refBlockTime = time;
            }
          })
          .catch(function(err) {
            if (err.response) {
              console.log(err.response);
            }
          });
      }
    },
    offListener() {
      Bus.$off("txHash");
      Bus.$off("accountValue");
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
