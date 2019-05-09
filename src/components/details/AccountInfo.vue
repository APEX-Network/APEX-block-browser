<template>
  <div class="AccountInfo">
    <!-- <apex-title :title="title" class="title"/> -->
    <apex-back-ground class="bg"/>
    <div class="data-table transactions-details">
      <ul class="table-ul">
                <li class="row title">{{title}}</li>

        <li class="row">
          <span class="col">Address</span>
          <span class="col col-lg-8 adressCPX" ref="address">
            <i>
              {{accountTransaction_param.address}}
              <img
                ref="img"
                @click="Copy()"
                style="cursor: pointer; padding-left: 10px;"
                src="./../../assets/images/copy.png"
                alt
              >
            </i>
          </span>
        </li>
        <li class="row">
          <span class="col">Balance</span>
          <span class="col col-lg-8 adressCPX">{{Balance}} CPX</span>
        </li>
      </ul>
    </div>
    <div class="apex-box">
      <div class="apex-title">
        <p>Transactions</p>
      </div>
      <div class="data-table transactions-table">
        <ul class="table-ul">
          <li class="row">
            <span class="col tHash">TX hash</span>
            <span class="col col-lg-6 from">From</span>
            <span class="col to">To</span>
            <span class="col amount">Amount</span>
          </li>
          <!-- <li class="row">
            <span class="col col-lg-10" v-if="count == 0">{{noTransactions}}</span>
          </li>-->
          <li v-for="(list,index) in transactions" :key="index" class="row">
            <span class="col ttHash">
              <div class="bottom">
                <router-link
                  to
                  @click.native="setTxHash(list.txHash)"
                >{{list.txHash}}</router-link>
              </div>
            </span>
            <span
              class="col"
              :class="objectClass"
              @click="currentAccountInfo(list.from)"
            >{{getaddress(list.from)}}</span>
            <span class="col to" @click="currentAccountInfo(list.to)">{{getaddress(list.to)}}</span>
            <span class="col amount">
              {{list.amount}} CPX
            </span>
          </li>
        </ul>
        <!-- <Pagination/> -->
        <div class="apex-pagination">
          <div class="pagination-content">
            <a class="first" @click=" getFirst()">First</a>
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
      pageNumber: null,
      arrow: {
        leftArrow: null,
        rightArrow: null
      },
      accountInfo: null,
      transactions: [],
      refBlockTime: null,
      Balance: 0,
      isClick: true,
      count: null,
      point: null,
      switchImg: null,
      Type: null,
      noTransactions: null,
      objectClass: {
        from: true,
        emptyFrom: false
      }
    };
  },
  mounted() {
    this.getInstance();
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
    currentAccountInfo(data) {
      if (data !== "") {
        this.accountTransaction_param.address = data;
        this.getAccountInfo();
        this.getAccountTransactionInfo();
      }
    },
    getaddress(address) {
      // !address ? this.objectClass.emptyFrom = true : this.objectClass.emptyFrom = false;
      let x = address.slice(0, 8);
      let y = address.slice(-8);
      return !address ? "Miner Reward" : x + "..." + y;
    },
    getInstance() {
      this.switchImg = this.$refs.img;
      this.arrow.leftArrow = this.$refs.left;
      this.arrow.rightArrow = this.$refs.right;
    },
    Copy(index) {
      let getCopyText = this.accountTransaction_param.address;
      this.switchImg.src = require("./../../assets/images/copied.png");
      this.doCopy(getCopyText);
    },
    doCopy(val) {
      this.$copyText(val).then(function(e) {}, function(e) {});
    },
    getClickValue() {
      this.accountTransaction_param.address = this.$route.query.id;
      this.getAccountInfo();
      this.getAccountTransactionInfo();
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
        this.accountTransaction_param.start = this.start;
        this.$axios
          .post(this.accountTransaction_url, this.accountTransaction_param)
          .then(response => {
            let res = response.data.data.transactions;
            let serverTime = response.headers.date;
            this.transactions = [];
            this.transactions = res;
            for (let i = 0; i < this.transactions.length; i++) {
              const element = this.transactions[i];
              let amount = element.amount;
              let faddress = element.from;
              let taddress = element.to;
              let result = amount.toString().indexOf(".");
              if (faddress == "") {
                this.objectClass.emptyFrom = true;
                this.objectClass.from = false;
              }
              this.getaddress(faddress);
              this.getaddress(taddress);
              if (result > -1) {
                let pointLength = amount.toString().split(".")[1].length;
                if (pointLength > 2) {
                  element["amount"] =
                    amount.toString().split(".")[0] +
                    "." +
                    amount
                      .toString()
                      .split(".")[1]
                      .substring(0, 2);
                }
                if (pointLength <= 2) {
                  element["amount"] = amount;
                }
              }
              if (result == -1) {
                element["amount"] = amount;
              }
            }
            this.count = response.data.data.count;
            if (this.count == 0) {
              this.noTransactions = "There are no matching entries";
              this.pageNumber = "1-1";
              this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
              return;
            }
            this.totalPage =
              this.count / this.accountTransaction_param.pageSize;
            if (this.totalPage >= 100) {
              this.totalPage = 100;
            }
            if (this.totalPage < 100) {
              this.point = this.totalPage.toString().indexOf(".");
              if (this.point > -1) {
                this.totalPage =
                  parseInt(this.totalPage.toString().split(".")[0]) + 1;
              }
              if (this.point == -1) {
                this.totalPage = this.totalPage;
              }

              if (this.totalPage == 1) {
                this.isClick = false;
                this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
              }
            }
            this.pageNumber = this.start + 1 + "-" + this.totalPage;
          })
          .catch(function(err) {
            if (err.response) {
              console.log(err.response);
            }
          });
      }
    },
    getFirst() {
      if (this.accountTransaction_param.address !== null && this.count !== 0) {
        this.isClick = true;
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftWhiteArrow.png");
        if (this.totalPage !== 1) {
          this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
        }
        this.start = 0;
        this.pageNumber = this.start + 1 + "-" + this.totalPage;
        this.accountTransaction_param.start = this.start;
        this.$axios
          .post(this.accountTransaction_url, this.accountTransaction_param)
          .then(response => {
            let res = response.data.data.transactions;
            let serverTime = response.headers.date;
            this.transactions = [];
            this.transactions = res;
            for (let i = 0; i < this.transactions.length; i++) {
              const element = this.transactions[i];
              let amount = element.amount;
              let faddress = element.from;
              let taddress = element.to;
              let result = amount.toString().indexOf(".");
              this.getaddress(faddress);
              this.getaddress(taddress);
              if (result > -1) {
                let pointLength = amount.toString().split(".")[1].length;
                if (pointLength > 2) {
                  element["amount"] =
                    amount.toString().split(".")[0] +
                    "." +
                    amount
                      .toString()
                      .split(".")[1]
                      .substring(0, 2);
                }
                if (pointLength <= 2) {
                  element["amount"] = amount;
                }
              }
              if (result == -1) {
                element["amount"] = amount;
              }
            }
            let time;
            for (let i = 0; i < this.transactions.length; i++) {
              let element = this.transactions[i];
              time = util.utilMethods.listUTCtime(
                element.refBlockTime,
                serverTime
              );
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
      if (this.count !== 0) {
        this.isClick = true;
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
        this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
        this.start = this.totalPage - 1;
        this.pageNumber = this.totalPage + "-" + this.totalPage;
        this.accountTransaction_param.start = this.start;
        if (this.accountTransaction_param.address !== null) {
          this.$axios
            .post(this.accountTransaction_url, this.accountTransaction_param)
            .then(response => {
              let res = response.data.data.transactions;
              let serverTime = response.headers.date;
              this.transactions = [];
              this.transactions = res;
              for (let i = 0; i < this.transactions.length; i++) {
                const element = this.transactions[i];
                let amount = element.amount;
                let faddress = element.from;
                let taddress = element.to;
                let result = amount.toString().indexOf(".");
                this.getaddress(faddress);
                this.getaddress(taddress);
                if (result > -1) {
                  let pointLength = amount.toString().split(".")[1].length;
                  if (pointLength > 2) {
                    element["amount"] =
                      amount.toString().split(".")[0] +
                      "." +
                      amount
                        .toString()
                        .split(".")[1]
                        .substring(0, 2);
                  }
                  if (pointLength <= 2) {
                    element["amount"] = amount;
                  }
                }
                if (result == -1) {
                  element["amount"] = amount;
                }
              }
              let time;
              for (let i = 0; i < this.transactions.length; i++) {
                let element = this.transactions[i];
                time = util.utilMethods.listUTCtime(
                  element.refBlockTime,
                  serverTime
                );
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
    getNext() {
      if (this.count !== 0) {
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
                let serverTime = response.headers.date;
                this.transactions = [];
                this.transactions = res;
                for (let i = 0; i < this.transactions.length; i++) {
                  const element = this.transactions[i];
                  let amount = element.amount;
                  let faddress = element.from;
                  let taddress = element.to;
                  let result = amount.toString().indexOf(".");
                  this.getaddress(faddress);
                  this.getaddress(taddress);
                  if (result > -1) {
                    let pointLength = amount.toString().split(".")[1].length;
                    if (pointLength > 2) {
                      element["amount"] =
                        amount.toString().split(".")[0] +
                        "." +
                        amount
                          .toString()
                          .split(".")[1]
                          .substring(0, 2);
                    }
                    if (pointLength <= 2) {
                      element["amount"] = amount;
                    }
                  }
                  if (result == -1) {
                    element["amount"] = amount;
                  }
                }
                let time;
                for (let i = 0; i < this.transactions.length; i++) {
                  let element = this.transactions[i];
                  time = util.utilMethods.listUTCtime(
                    element.refBlockTime,
                    serverTime
                  );
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
      }
    },
    getPrevious() {
      if (this.count !== 0) {
        this.isClick = true;
        if (this.start > 0) {
          this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
          this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
          this.start--;
          this.pageNumber = this.start + 1 + "-" + this.totalPage;
          this.accountTransaction_param.start = this.start;
          if (this.accountTransaction_param.start == 0) {
            this.arrow.leftArrow.src = require("../../assets/images/shared/leftWhiteArrow.png");
          }
          if (this.accountTransaction_param.address !== null) {
            this.$axios
              .post(this.accountTransaction_url, this.accountTransaction_param)
              .then(response => {
                let res = response.data.data.transactions;
                let serverTime = response.headers.date;
                this.transactions = [];
                this.transactions = res;
                for (let i = 0; i < this.transactions.length; i++) {
                  const element = this.transactions[i];
                  let amount = element.amount;
                  let faddress = element.from;
                  let taddress = element.to;
                  let result = amount.toString().indexOf(".");
                  this.getaddress(faddress);
                  this.getaddress(taddress);
                  if (result > -1) {
                    let pointLength = amount.toString().split(".")[1].length;
                    if (pointLength > 2) {
                      element["amount"] =
                        amount.toString().split(".")[0] +
                        "." +
                        amount
                          .toString()
                          .split(".")[1]
                          .substring(0, 2);
                    }
                    if (pointLength <= 2) {
                      element["amount"] = amount;
                    }
                  }
                  if (result == -1) {
                    element["amount"] = amount;
                  }
                }
                let time;
                for (let i = 0; i < this.transactions.length; i++) {
                  let element = this.transactions[i];
                  time = util.utilMethods.listUTCtime(
                    element.refBlockTime,
                    serverTime
                  );
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
      }
    },
    setTxHash(data) {
      this.$router.push({
        path: "/transactions/TransactionsInfo",
        query: {
          id: data
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.AccountInfo {
  width: 100%;
  height: 100%;
  .transactions-details {
    padding-top: 30px;
    .table-ul {
      .title {
        padding-left: 18px;
        border-bottom: 2px solid #000;
      }
      .adressCPX {
        .row {
          padding: 0 8px 0 69px;
        }
      }
    }
  }
  .bg {
    // background: url(./../../assets/images/shared/yunshi.png) 50% 65% no-repeat;
  }
  .apex-box {
    .apex-title {
      padding-left: 30px;
      padding-top: 25px;
    }
    .data-table {
      width: 100%;
      padding: 0px 0px 0px 12px;
      box-sizing: border-box;
      overflow-y: auto;
      .table-ul {
        width: 100%;
        max-width: 100%;
        border-top: #0000 2px solid;
        & > li {
          .ttHash {
            max-width: 335px;
          }
          .tHash {
            padding-left: 20px;
            max-width: 335px;
          }
          .from {
            padding-left: 20px;
            max-width: 232px;
            color: #f26522;
            cursor: pointer;
          }
          .emptyFrom {
            padding-left: 20px;
            max-width: 232px;
            color: #ebebeb;
            cursor: default;
          }
          .to {
            max-width: 232px;
            padding-left: 50px;
            color: #f26522;
            cursor: pointer;
          }
          .amount {
            max-width: 200px;
            padding-left: 90px;

            a {
              color: #ebebeb;
            }
          }
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
                overflow: hidden;
                white-space: nowrap;
                max-width: 232px;
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
        height: 40px;
        padding: 0px 35px;
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
