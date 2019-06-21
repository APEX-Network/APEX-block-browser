<template>
  <div class="transactions">
    <!-- <apex-back-ground /> -->
    <div class="data-table transactions-table">
      <ul class="table-ul">
        <li class="row title">Transactions</li>
        <li v-for="(list,index) in transactions" :key="index" class="row">
          <span class="col col-lg-10">
            <div class="bottom">
              <span @click="setClickValue(list.txHash)">{{list.txHash}}</span>
            </div>
          </span>
          <span class="col time">{{list.refBlockTime }}</span>
        </li>
      </ul>
      <div class="apex-pagination">
        <div class="pagination-content">
          <a class="first" @click="getFirst">First</a>
          <img
            ref="left"
            class="prev"
            @click="getPrevious"
            src="../../assets/images/shared/leftWhiteArrow.png"
            alt
          >
          <span class="list-number">{{pageNumber}}</span>
          <img
            ref="right"
            class="next"
            @click="isClick &&  getNext()"
            src="../../assets/images/shared/rightArrow.png"
            alt
          >
          <a class="last" @click="getLast">Last</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const ApexTitle = r => require.ensure([], () => r(require("@/components/public/ApexTitle")), 'titleAndBackground');
const ApexBackGround = r => require.ensure([], () => r(require("@/components/public/ApexBackGround")), 'titleAndBackground');
import util from "@/utils/utils";

export default {
  name: "Transactions",
  components: {
    ApexTitle,
    ApexBackGround
  },
  data() {
    return {
      title: "Transactions",
      transactions: [],
      clickValue: null,
      transaction_list_url: "/api/v1.0/transactions/transactionList",
      start: 0,
      params: {
        start: "0",
        pageSize: "10"
      },
      pageNumber: "1-10",
      arrow: {
        leftArrow: null,
        rightArrow: null
      },
      isClick: true
    };
  },
  created() {},
  mounted() {
    this.getInstance();
    this.getAllTransactions(this.start);
    const timer = setInterval(() => {
      this.getAllTransactions(this.start);
    }, 1500);
    const timer2 = setInterval(() => {
      clearInterval(timer);
    }, 60000);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer, timer2);
    });
  },
  methods: {
    getInstance() {
      this.arrow.leftArrow = this.$refs.left;
      this.arrow.rightArrow = this.$refs.right;
    },
    setClickValue(data) {
      if (data !== null) {
        this.$router.push({
          path: "/transactions/TransactionsInfo",
          query: {
            id: data
          }
        });
      }
    },
     getAllTransactions(start) {
       this.params.start = start;
       this.$axios
        .post(this.transaction_list_url, this.params)
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
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    },
    getNext() {
      if (this.start < 9) {
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
        this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
        this.start++;
        this.pageNumber = this.start + 1 + "-10";
        this.getAllTransactions(this.start);
        if (this.start == 9) {
          this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
          this.isClick = false;
          return;
        }
      }
    },
    getPrevious() {
      this.isClick = true;
      if (this.start > 0) {
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
        this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
        this.start--;
        this.pageNumber = this.start + "-10";
        this.getAllTransactions(this.start);
        if (this.start == 0) {
          this.arrow.leftArrow.src = require("../../assets/images/shared/leftWhiteArrow.png");
          this.pageNumber = "1-10";
          return;
        }
      }
    },
    getFirst() {
      this.isClick = true;
      this.arrow.leftArrow.src = require("../../assets/images/shared/leftWhiteArrow.png");
      this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
      this.start = 0;
      this.pageNumber = "1-10";
      this.getAllTransactions(this.start);
      return;
    },
    getLast() {
      this.isClick = true;
      this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
      this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
      this.start = 9;
      this.pageNumber = this.start + 1 + "-10";
      this.getAllTransactions(this.start);
      return;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.transactions {
  width: 100%;
  height: 100%;
  padding-right: 30px;
  padding-left: 30px;
  padding-top: 45px;
  .data-table {
    background: #000;
    height: 100%;
    width: 100%;
    padding: 0px 12px 0px;
    box-sizing: border-box;
    overflow-y: auto;
    .table-ul {
      width: 100%;
      padding-top: 20px;
      max-width: 100%;
      .title {
        padding-left: 18px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.07);
      }
      & > li {
        .time {
          padding-left: 60px;
        }
        &.row {
          margin: 0;
          color: #ebebeb;
          height: 50px;
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
            padding-left: 19px;
            box-sizing: border-box;
            span {
              color: #56c4fd;
              cursor: pointer;
            }
          }
        }
      }
    }
    .apex-pagination {
      position: fixed;
      bottom: 39px;
      width: 90%;
      height: 50px;
      padding: 20px 35px 0 35px;
      box-sizing: border-box;
      text-align: right;
      font-size: 12px;
      .pagination-content {
        .prev {
          cursor: pointer;
          padding-right: 8px;
          padding-left: 8px;
        }
        .next {
          cursor: pointer;
          padding-right: 8px;
          padding-left: 8px;
        }
        a {
          display: inline-block;
          padding: 9px 0;
          margin: 0 4px;
          cursor: pointer;
          font-family: "Semibold";
          vertical-align: middle;
          &.list-number {
            cursor: initial;
          }
          &.first,
          &.last {
            transition: all 0.3s;
            &:hover {
              color: #56c4fd;
            }
          }
        }
      }
    }
  }
}
</style>
