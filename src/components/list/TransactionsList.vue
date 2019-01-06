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
              <router-link to="/transactions/TransactionsInfo" @click.native="setClickValue">{{item.txHash}}</router-link>
              <span>{{item.refBlockTime}}</span>
            </div>
          </li>
        </vue-scroll>
      </ul>
    </div>
</template>

<script>
import Pagination from "@/components/public/Pagination.vue";
export default {
  name: "transactionsList",
  components: {
    Pagination
  },
  data() {
    return {
      ops: {},
      transactions: [],
      clickValue: null
    };
  },
  mounted() {
    this.getTransactionsList();
  },
  methods: {
    setClickValue(e) {
      this.clickValue = e.target.innerHTML;
      this.$router.push({
            name: 'TransactionsInfo',
            params: { 
                clickValue: this.clickValue
            }
        })
        /**
         * 通过query传值,通过path匹配路由，参数会显示在url后面。
         * 通过params传值,通过name匹配路由,参数不会显示在url后面。
         */
        // this.$router.push({
        //     path: '/TransactionsInfo',
        //     query: { 
        //         clickValue: this.clickValue
        //     }
        // })
    },
    getTransactionsList() {
      this.$axios
        .post("/api/v1.0/transactions/transactionList", {
          start: "0",
          pageSize: "2"
        })
        .then(response => {
          console.log(response.data);
          this.transactions = response.data.data;
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
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
