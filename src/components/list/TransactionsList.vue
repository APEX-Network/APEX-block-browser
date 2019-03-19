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
            <span>{{item.refBlockTime}} seconds ago</span>
          </div>
        </li>
      </vue-scroll>
    </ul>
  </div>
</template>

<script>
import Pagination from "@/components/public/Pagination.vue";
import Bus from './../../utils/bus';
import util from './../../utils/utils';
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
      transaction_list_url: "/api/v1.0/transactions/transactionList",
      params: {
        start: "0",
        pageSize: "2"
      }
    };
  },
  mounted() {
    this.getTransactionsList();
  },
  methods: {
    setClickValue(e) {
       Bus.$emit('txHash', e.target.innerHTML);      
    },
    getTransactionsList() {
      if (!!this.params) {
        this.$axios
        .post(this.transaction_list_url, this.params)
        .then(response => {
          let res = response.data.data;
          let seconds;
          for (let i = 0; i < res.length; i++) {
            const item = res[i];
            seconds = util.utilMethods.getSec(item.refBlockTime);
            item.refBlockTime = seconds;
          }
          this.transactions = res;
        })
        .catch(function(err) {
          if (err.response) {
          }
        });
      }
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
