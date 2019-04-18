<template>
  <div class="AccountInfo">
    <apex-title :title="title" class="title"/>
    <apex-back-ground class="bg"/>
    <div class="data-table transactions-details">
      <ul class="table-ul">
        <li class="row">
          <span class="col">Address</span>
          <span class="col col-lg-8" ref="address">
            <i>
              {{accountTransaction_param.address}}
              <img
                @click="Copy(index)"
                style="cursor: pointer; padding-left: 10px;"
                src="./../../assets/images/copy.png"
                alt
              >
            </i>
          </span>
        </li>
        <li class="row">
          <span class="col">Balance</span>
          <span class="col col-lg-8">{{Balance}} CPX</span>
        </li>
      </ul>
    </div>
    <div class="apex-box">
      <div class="apex-title">
        <p>Transactions</p>
      </div>
      <div class="data-table transactions-table">
        <ul class="table-ul">
          <li v-for="(list,index) in transactions" :key="index" class="row">
            <span class="col col-lg-10">
              <div class="bottom">
                <router-link
                  to="/transactions/TransactionsInfo"
                  @click.native="setRefBlockHash"
                >{{list.txHash}}</router-link>
              </div>
            </span>
            <span class="col">{{ list.refBlockTime }}</span>
          </li>
        </ul>
        <!-- <Pagination/> -->
        <div class="apex-pagination">
          <div class="pagination-content">
            <a class="first" @click="getFirst()">First</a>
            <img
              ref="left"
              class="prev"
              @click="getPrevious()"
              src="../../assets/images/shared/leftWhiteArrow.png"
              alt
            >
            <span class="list-number">{{pageNumber}}</span>
            <img
              ref="right"
              class="next"
              @click="isClick && getNext()"
              src="../../assets/images/shared/rightArrow.png"
              alt
            >
            <a class="last" @click="isClick && getLast()">Last</a>
          </div>
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
  name: "AccountInfo",
  components: {
    // Pagination,
    ApexTitle,
    ApexBackGround
  },
  created() {},
  data() {
    return {
      title: "AccountInfo Information",
      accountInfo_url: "/api/v1.0/accounts/account",
      accountTransaction_url: "/api/v1.0/transactions/account/transactionList",
      start: 0,
      accountTransaction_param: {
        start: 0,
        pageSize: 6,
        address: null
      },
      totalPage: null,
      pageNumber: "1-10",
      arrow: {
        leftArrow: null,
        rightArrow: null
      },
      accountInfo: null,
      transactions: [],
      refBlockTime: null,
      Balance: 0,
      flag: null,
      isClick: true,
      count: null,
      point: null
    };
  },
  mounted() {
    this.getInstance();
    window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
    this.getClickValue();
    this.getAccountTransactionInfo();
    const timer = setInterval(() => {
      this.getAccountInfo();
      this.getAccountTransactionInfo();
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
    Copy(index) {
      let getCopyText = this.accountTransaction_param.address;
      this.doCopy(getCopyText);
    },
    doCopy(val) {
      this.$copyText(val).then(
        function(e) {
          alert("拷贝成功!");
        },
        function(e) {}
      );
    },
    getClickValue() {
      Bus.$on("accountValue", data => {
        this.accountTransaction_param.address = data;
        sessionStorage.setItem("refresh", data);
        this.getAccountInfo();
        this.getAccountTransactionInfo();
        return;
      });
      this.flag = sessionStorage.getItem("flag");
      if (this.accountTransaction_param.address == null && this.flag == 1) {
        this.accountTransaction_param.address = sessionStorage.getItem(
          "refresh"
        );
        this.getAccountInfo();
        this.getAccountTransactionInfo();
        return;
      }
    },
    getAccountInfo() {
      if (this.accountTransaction_param.address !== null) {
        this.$axios
          .post(this.accountInfo_url, {
            address: this.accountTransaction_param.address
          })
          .then(response => {
            let res = response.data.data;
            let result = res.balance.toString().indexOf(".");
            if (result > -1) {
              let pointLength = res.balance.toString().split(".")[1].length;
              if (pointLength > 8) {
                this.Balance =
                  res.balance.toString().split(".")[0] +
                  "." +
                  res.balance
                    .toString()
                    .split(".")[1]
                    .substring(0, 8);
              }
              if (pointLength <= 8) {
                this.Balance = res.balance;
              }
            }
            if (result == -1) {
              this.Balance = res.balance;
            }
          })
          .catch(function(err) {
            if (err.response) {
              console.log(err.response);
            }
          });
      }
    },
    getAccountTransactionInfo() {
      if (this.accountTransaction_param.address !== null) {
        this.$axios
          .post(this.accountTransaction_url, this.accountTransaction_param)
          .then(response => {
            let res = response.data.data.transactions;
            this.count = response.data.data.count;
            this.totalPage =
              this.count / this.accountTransaction_param.pageSize;
            if (this.totalPage >= 10) {
              this.totalPage = 10;
            }
            if (this.totalPage < 10) {
              this.point = this.totalPage.toString().indexOf(".");
              if (this.point > -1) {
                this.totalPage =
                  Number(this.count.toString().split(".")[0]) + 1;
                console.log(this.totalPage);
              }
              if (this.point == -1) {
                this.totalPage = this.count;
              }

              if (this.totalPage == 1) {
                this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
              }
            }
            this.pageNumber = "1-" + this.totalPage;
            this.transactions = res;
            if (this.transactions.length == 0) {
              this.accountTransaction_param.start = this.start - 1;
              this.$axios
                .post(
                  this.accountTransaction_url,
                  this.accountTransaction_param
                )
                .then(response => {
                  let res = response.data.data;
                  this.transactions = res;
                  let time;
                  for (let i = 0; i < this.transactions.length; i++) {
                    let element = this.transactions[i];
                    time = util.utilMethods.Ftime(element.refBlockTime);
                    element.refBlockTime = time;
                  }
                })
                .catch(function(err) {
                  if (err.response) {
                    console.log(err.response);
                  }
                });
            }
            let time;
            for (let i = 0; i < this.transactions.length; i++) {
              let element = this.transactions[i];
              time = util.utilMethods.Ftime(element.refBlockTime);
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
    getFirst() {
      if (this.accountTransaction_param.address !== null) {
        this.isClick = true;
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftWhiteArrow.png");
        this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
        this.pageNumber = "1-" + this.totalPage;
        this.start = 0;
        this.accountTransaction_param.start = "0";
        this.$axios
          .post(this.accountTransaction_url, this.accountTransaction_param)
          .then(response => {
            let res = response.data.data.transactions;
            this.transactions = res;
            let time;
            for (let i = 0; i < this.transactions.length; i++) {
              let element = this.transactions[i];
              time = util.utilMethods.Ftime(element.refBlockTime);
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
    getLast() {
      this.isClick = true;
      this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
      this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
      this.start = this.totalPage - 1;
      this.pageNumber = this.totalPage + "-" + this.totalPage;
      this.accountTransaction_param.start = this.totalPage - 1;
      if (this.accountTransaction_param.address !== null) {
        this.$axios
          .post(this.accountTransaction_url, this.accountTransaction_param)
          .then(response => {
            let res = response.data.data.transactions;
            this.transactions = res;
            let time;
            for (let i = 0; i < this.transactions.length; i++) {
              let element = this.transactions[i];
              time = util.utilMethods.Ftime(element.refBlockTime);
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
    getNext() {
      if (this.start < this.totalPage) {
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
        this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
        this.start++;
        this.pageNumber = this.start + 1 + "-" + this.totalPage;
        this.accountTransaction_param.start = this.start;
        if (this.accountTransaction_param.address !== null) {
          this.$axios
            .post(this.accountTransaction_url, this.accountTransaction_param)
            .then(response => {
              let res = response.data.data.transactions;
              this.transactions = res;
              let time;
              for (let i = 0; i < this.transactions.length; i++) {
                let element = this.transactions[i];
                time = util.utilMethods.Ftime(element.refBlockTime);
                element.refBlockTime = time;
              }
            })
            .catch(function(err) {
              if (err.response) {
                console.log(err.response);
              }
            });
        }
        if (this.start == this.totalPage - 1) {
          this.isClick = false;
          this.start = this.totalPage - 1;
          this.pageNumber = this.totalPage + "-" + this.totalPage;
          this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
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
        this.pageNumber = this.start + 1 + "-" + this.totalPage;
        this.accountTransaction_param.start = this.start;
        if (this.accountTransaction_param.start == 0) {
          this.arrow.leftArrow.src = require("../../assets/images/shared/leftWhiteArrow.png");
          // this.pageNumber = "1-" + this.totalPage;
        }
        if (this.accountTransaction_param.address !== null) {
          this.$axios
            .post(this.accountTransaction_url, this.accountTransaction_param)
            .then(response => {
              let res = response.data.data.transactions;
              this.transactions = res;
              let time;
              for (let i = 0; i < this.transactions.length; i++) {
                let element = this.transactions[i];
                time = util.utilMethods.toUTCtime(element.refBlockTime);
                element.refBlockTime = time;
              }
            })
            .catch(function(err) {
              if (err.response) {
                console.log(err.response);
              }
            });
        }
      }
    },
    setRefBlockHash(e) {
      Bus.$emit("txHash", e.target.innerHTML);
    },
    offListener() {
      Bus.$off("txHash");
    },
    beforeunloadHandler(e) {
      this.flag = 1;
      sessionStorage.setItem("flag", this.flag);
    }
  },
  beforeDestroy() {
    sessionStorage.setItem("refresh", null);
    sessionStorage.setItem("flag", null);
    this.offListener();
  },
  destroyed() {
    window.removeEventListener("beforeunload", e =>
      this.beforeunloadHandler(e)
    );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "./../../assets/css/layout";
.AccountInfo {
  width: 100%;
  height: 100%;
  .bg {
    background: url(./../../assets/images/shared/yunshi.png) 50% 65% no-repeat;
  }
  .apex-box {
    // background-color: rgba(255, 255, 255, 0.1);
    padding-top: 80px;
    .apex-title {
      padding-left: 30px;
    }
    .data-table {
      // background-color: rgba(255, 255, 255, 0.1);
      width: 100%;
      padding: 0px 12px 0px;
      box-sizing: border-box;
      overflow-y: auto;
      .table-ul {
        width: 100%;
        max-width: 100%;
        margin-top: 20px;
        border-top: #0000 2px solid;
        & > li {
          &.row {
            margin: 0;
            color: #ebebeb;
            height: 40px;
            line-height: 40px;
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
              background: url(./../../assets/images/shared/icon-fix.png) left
                5px no-repeat;
              a {
                // max-width: 300px;
                // overflow: hidden;
                // white-space: nowrap;
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
}
</style>
