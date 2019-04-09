<template>
  <div class="transactions">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="data-table transactions-table">
      <ul class="table-ul">
        <li v-for="(list,index) in transactions" :key="index" class="row">
          <span class="col col-lg-10">
            <div class="bottom">
              <router-link
                to="/transactions/TransactionsInfo"
                @click.native="setClickValue"
              >{{list.txHash}}</router-link>
            </div>
          </span>
          <span class="col">{{list.refBlockTime }}</span>
        </li>
      </ul>
      <Pagination/>
    </div>
  </div>
</template>

<script>
import ApexTitle from "@/components/public/ApexTitle.vue";
import ApexBackGround from "@/components/public/ApexBackGround.vue";
import Pagination from "@/components/public/Pagination.vue";
import Bus from "./../../utils/bus";
import util from "./../../utils/utils";

export default {
  name: "Transactions",
  components: {
    Pagination,
    ApexTitle,
    ApexBackGround
  },
  data() {
    return {
      title: "Transactions",
      transactions: [],
      clickValue: null,
      transaction_list_url: "/api/v1.0/transactions/transactionList",
      parmas: {
        start: "0",
        pageSize: "11"
      }
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
    setClickValue(e) {      
      if (e.target.innerHTML !== null) {
        Bus.$emit("txHash", e.target.innerHTML);
      }
    },
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
    offListener() {
      Bus.$off("txHash");
    }
  },
  beforeDestroy() {
    this.offListener();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "./../../assets/css/layout";
.transactions {
  width: 100%;
  height: 100%;
  background: url(./../../assets/images/shared/yunshi.png) 50% 65% no-repeat;
  .data-table {
    width: 100%;
    padding: 0px 12px 0px;
    box-sizing: border-box;
    overflow-y: auto;
    .table-ul {
      width: 100%;
      max-width: 100%;
      & > li {
        &.row {
          margin: 0;
          color: #ebebeb;
          height: 40px;
        }
        & > span {
          line-height: 35px;
          height: 35px;
          box-sizing: border-box;
          padding: 0 8px 0 0px;
          vertical-align: middle;
          overflow: hidden;
          white-space: nowrap;
          .bottom {
            margin-left: 20px;
            padding-left: 40px;
            box-sizing: border-box;
            font-family: "Regular";
            background: url(./../../assets/images/shared/icon-fix.png) left 5px
              no-repeat;
            a {
              // max-width: 300px;
              // overflow: hidden;
              // white-space: nowrap;
              color: #f26522;
              // margin-top: 5px;
            }
          }
        }
        &:first-of-type {
          span {
            color: #ebebeb;
            font-family: "Semibold";
          }
        }
      }
    }
  }
}
</style>
