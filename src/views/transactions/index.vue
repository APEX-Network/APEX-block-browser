<template>
  <div class="transactions">
    <apex-title :title="title" class="title"/>
    <!-- <apex-back-ground/> -->
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
      <!-- <Pagination ref="pagInation" /> -->
      <div class="apex-pagination">
        <div class="pagination-content">
          <a class="first" @click="getPrevious">First</a>
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
            @click="getNext"
            src="../../assets/images/shared/rightArrow.png"
            alt
          >
          <a class="last" @click="getNext">Last</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApexTitle from "@/components/public/ApexTitle.vue";
// import ApexBackGround from "@/components/public/ApexBackGround.vue";
// import Pagination from "@/components/public/Pagination.vue";
import Bus from "./../../utils/bus";
import util from "./../../utils/utils";

export default {
  name: "Transactions",
  components: {
    // Pagination,
    ApexTitle
    // ApexBackGround
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
        pageSize: "11"
      },
      pageNumber: "1-10",
      arrow: {
        leftArrow: null,
        rightArrow: null
      }
    };
  },
  created() {},
  mounted() {
    this.getInstance();
    this.getAllTransactions();
    const timer = setInterval(() => {
      this.getAllTransactions();
    }, 1500);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
  methods: {
    getInstance() {
      this.arrow.leftArrow = this.$refs.left;
      this.arrow.rightArrow = this.$refs.right;
    },
    setClickValue(e) {
      if (e.target.innerHTML !== null) {
        Bus.$emit("txHash", e.target.innerHTML);
      }
    },
    getAllTransactions() {
      this.$axios
        .post(this.transaction_list_url, this.params)
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
    getNext() {
      if (this.start < 10) {
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
        this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
        this.start++;
        this.pageNumber = this.start + "/10";
        this.params.start = this.start;
        this.$axios
          .post(this.transaction_list_url, this.params)
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
        if (this.start == 10) {
          this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
          return;
        }
      }
    },
    getPrevious() {
      if (this.start > 0) {
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
        this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
        this.start--;
        this.pageNumber = this.start + "/10";
        this.params.start = this.start;
        this.$axios
          .post(this.transaction_list_url, this.params)
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
        if (this.start == 0) {
          this.arrow.leftArrow.src = require("../../assets/images/shared/leftWhiteArrow.png");
          this.pageNumber = "1-10";
          return;
        }
      }
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
  background-color: rgba(255, 255, 255, 0.1) !important;
  background: url(./../../assets/images/shared/yunshi.png) 68% 89% no-repeat;
  .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-indent: 30px;
    box-sizing: border-box;
    border-radius: 0px 0px 4px 4px;
    border-bottom: 2px solid #000;
  }
  .data-table {
    height: 93%;
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
      padding: 10px 35px;
      box-sizing: border-box;
      text-align: right;
      font-size: 12px;
      .pagination-content {
        .prev {
          cursor: pointer;
          padding-left: 5px;
        }
        .next {
          cursor: pointer;
          padding-right: 5px;
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
