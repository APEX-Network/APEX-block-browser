<template>
  <div class="transactions">
    <apex-title :title="title" class="title"/>
    <apex-back-ground class="bg"/>
    <div class="data-table transactions-table">
      <ul class="table-ul">
        <li v-for="(list,index) in transactions" :key="index" class="row">
          <span class="col col-lg-10">
            <div class="bottom">
              <router-link to @click.native="setClickValue(list.txHash)">{{list.txHash}}</router-link>
            </div>
          </span>
          <span class="col time">{{list.refBlockTime }}</span>
        </li>
      </ul>
      <!-- <Pagination ref="pagInation" /> -->
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
import ApexTitle from "@/components/public/ApexTitle.vue";
import ApexBackGround from "@/components/public/ApexBackGround.vue";
// import Pagination from "@/components/public/Pagination.vue";
import Bus from "./../../utils/bus";
import util from "./../../utils/utils";

export default {
  name: "Transactions",
  components: {
    // Pagination,
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
    this.getAllTransactions();
    const timer = setInterval(() => {
      this.getAllTransactions();
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
        // Bus.$emit("txHash", e.target.innerHTML);
      }
    },
    getAllTransactions() {
      this.$axios
        .post(this.transaction_list_url, this.params)
        .then(response => {
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
          }
        });
    },
    getNext() {
      if (this.start < 10) {
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
        this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
        this.start++;
        this.pageNumber = this.start + 1 + "-10";
        this.params.start = this.start;
        this.$axios
          .post(this.transaction_list_url, this.params)
          .then(response => {
            let res = response.data.data;
            let serverTime = response.headers.date;
            let time;
            for (let i = 0; i < res.length; i++) {
              const item = res[i];
              time = util.utilMethods.listUTCtime(
                item.refBlockTime,
                serverTime
              );
              item.refBlockTime = time;
            }
            this.transactions = res;
          })
          .catch(function(err) {
            if (err.response) {
            }
          });
        if (this.start == 10) {
          this.pageNumber = this.start + "-10";
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
        this.params.start = this.start;
        this.$axios
          .post(this.transaction_list_url, this.params)
          .then(response => {
            let res = response.data.data;
            let serverTime = response.headers.date;
            let time;
            for (let i = 0; i < res.length; i++) {
              const item = res[i];
              time = util.utilMethods.listUTCtime(
                item.refBlockTime,
                serverTime
              );
              item.refBlockTime = time;
            }
            this.transactions = res;
          })
          .catch(function(err) {
            if (err.response) {
            }
          });
        if (this.start == 0) {
          this.arrow.leftArrow.src = require("../../assets/images/shared/leftWhiteArrow.png");
          this.pageNumber = "1-10";
          return;
        }
      }
    },
    getFirst() {
      this.arrow.leftArrow.src = require("../../assets/images/shared/leftWhiteArrow.png");
      this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
      this.start = 0;
      this.pageNumber = "1-10";
      this.params.start = this.start;
      this.$axios
        .post(this.transaction_list_url, this.params)
        .then(response => {
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
          }
        });
      return;
    },
    getLast() {
      this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
      this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
      this.start = 10;
      this.pageNumber = this.start + "-10";
      this.params.start = this.start;
      this.$axios
        .post(this.transaction_list_url, this.params)
        .then(response => {
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
          }
        });
      return;
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
.transactions {
  width: 100%;
  height: 100%;
  .bg {
    background: url(./../../assets/images/shared/yunshi.png) 68% 89% no-repeat;
  }
  .data-table {
    height: 93%;
    width: 100%;
    padding: 0px 12px 0px;
    box-sizing: border-box;
    overflow-y: auto;
    .table-ul {
      width: 100%;
      padding-top: 20px;
      max-width: 100%;
      & > li {
        .time {
          padding-left: 60px;
        }
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
    .apex-pagination {
      width: 100%;
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
              color: #f26522;
            }
          }
        }
      }
    }
  }
}
</style>
