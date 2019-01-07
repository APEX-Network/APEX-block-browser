<template>
  <div class="transactions">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="data-table transactions-table">
      <ul class="table-ul">
        <li v-for="(list,index) in transactions" :key="index" class="row">
          <span class="col col-lg-10">
            <div class="bottom">
              <router-link to="/transactions/TransactionsInfo" @click.native="setClickValue">{{list.txHash}}</router-link>
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

export default {
  name: "Transactions",
  components: {
    Pagination,
    ApexTitle,
    ApexBackGround
  },
  mounted() {
    this.getAllTransactions();
  },
  data() {
    return {
      title: "Transactions",
      transactions: [],
      clickValue: null
    };
  },
  methods: {
    getAllTransactions() {
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
    },
    setClickValue(e) {
      this.clickValue = e.target.innerHTML;
      this.$router.push({
            name: 'TransactionsInfo',
            params: { 
                clickValue: this.clickValue
            }
        })
        // this.$router.push({
        //     path: '/TransactionsInfo',
        //     query: { 
        //         clickValue: this.clickValue
        //     }
        // })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
      border-top: #0000 1px solid;
      & > li {
        &.row {
          margin: 0;
          color: #ebebeb;
          height: 40px;
        }
        border-bottom: #333333 1px solid;
        & > span {
          line-height: 35px;
          height: 35px;
          box-sizing: border-box;
          padding: 0 8px 0 0px;
          vertical-align: middle;
          color: #ebebeb;
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
              max-width: 300px;
              overflow: hidden;
              white-space: nowrap;
              color: #f26522;
              margin-top: 5px;
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
