<template>
  <div class="AccountInfo">
    <div class="data-table transactions-details">
      <ul class="table-ul">
        <li class="row title">{{title}}</li>
        <li class="row">
          <span class="col">Address:</span>
          <span class="col col-lg-8 adressCPX" ref="address">
            <p>
              {{accountTransaction_param.address}}
              <img
                ref="img"
                @click="Copy()"
                src="./../../assets/images/copy.png"
                alt
              >
            </p>
          </span>
        </li>
        <li class="row">
          <span class="col">CPX Available:</span>
          <span class="col col-lg-8 adressCPX">{{Balance}} CPX</span>
        </li>
        <li class="row">
          <span class="col">Staked:</span>
          <span class="col col-lg-8 adressCPX">{{staked}} CPX</span>
        </li>
        <li class="row">
          <span class="col">Refunding:</span>
          <span class="col col-lg-8 adressCPX">{{refund}} CPX</span>
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
          <span class="col noTx" v-if="count == 0">{{noTransactions}}</span>
          <li v-for="(list,index) in transactions" :key="index" class="row" v-show="count !== 0">
            <span class="col ttHash">
              <div class="bottom">
                <span class="col col-lg-6" @click="setTxHash(list.txHash)">{{list.txHash}}</span>
              </div>
            </span>
            <span
              class="col"
              :class="objectClass"
              @click="currentAccountInfo(list.from)"
            >{{getaddress(list.from)}}</span>
            <span class="col to" @click="currentAccountInfo(list.to)">{{getaddress(list.to)}}</span>
            <span class="col amount">{{list.amount}} CPX</span>
          </li>
        </ul>
        <div class="apex-pagination" v-if="count !== 0">
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
const ApexTitle = r =>
  require.ensure(
    [],
    () => r(require("@/components/public/ApexTitle")),
    "titleAndBackground"
  );
const ApexBackGround = r =>
  require.ensure(
    [],
    () => r(require("@/components/public/ApexBackGround")),
    "titleAndBackground"
  );
import util from "@/utils/utils";

export default {
  name: "AccountInfo",
  components: {
    ApexTitle,
    ApexBackGround
  },
  created() {},
  data() {
    return {
      title: "AccountInfo Information",
      accountInfo_url: "/api/v1.0/accounts/account",
      accountTransaction_url: "/api/v1.0/transactions/account/transactionList",
      voter_url: "/api/v1.0/vote/getVote",
      voter_params: { address: null },
      start: 0,
      accountTransaction_param: {
        start: 0,
        pageSize: 5,
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
      },
      noData: null,
      refundAmount: [],
      refund: 0,
      staked: 0
    };
  },
  mounted() {
    this.getInstance();
    this.getClickValue();
    this.getAccountTransactionInfo(this.start);
    const timer = setInterval(() => {
      this.getAccountInfo();
      this.getAccountTransactionInfo(this.start);
    }, 1500);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
  methods: {
    getVoter(address) {
      if (address !== null) {
        this.$axios
          .post(this.voter_url, {
            address: address
          })
          .then(response => {
            this.refundAmount = [];
            let res = response.data.data;
            this.refund = res.pendingVote;
            let address_amount = res.target;
            let amount;
            for (let i = 0; i < address_amount.length; i++) {
              let item = address_amount[i];
              amount = item.split("-")[1].replace(/\s/gi, "");
              this.refundAmount.push(Number(amount));
            }
            this.staked = util.utilMethods.sum(this.refundAmount);
          })
          .catch(function(err) {
            if (err.response) {
              console.log(err.response);
            }
          });
      }
    },
    currentAccountInfo(data) {
      if (data !== "") {
        this.accountTransaction_param.address = data;
        this.getAccountInfo();
        this.getAccountTransactionInfo(this.start);
        this.getVoter(this.accountTransaction_param.address);
      }
    },
    getaddress(address) {
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
      this.getAccountTransactionInfo(this.start);
      this.getVoter(this.accountTransaction_param.address);
    },
    getAccountInfo() {
      if (this.accountTransaction_param.address !== null) {
        this.$axios
          .post(this.accountInfo_url, {
            address: this.accountTransaction_param.address
          })
          .then(response => {
            let res = response.data.data;
            this.noData = res;
            if (this.noData == null) {
              this.count = 0;
            }
            if (!!res) {
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
            }
          })
          .catch(function(err) {
            if (err.response) {
              console.log(err.response);
            }
          });
      }
    },
    getAccountTransactionInfo(start) {
      if (this.accountTransaction_param.address !== null) {
        this.accountTransaction_param.start = start;
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
              this.noTransactions = "There are no transactions";
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
            this.pageNumber = start + 1 + "-" + this.totalPage;
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
        this.transactions = [];
        this.getAccountTransactionInfo(this.start);
      }
    },
    getLast() {
      if (this.count !== 0) {
        this.isClick = true;
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
        this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
        this.start = this.totalPage - 1;
        this.pageNumber = this.totalPage + "-" + this.totalPage;
        // this.accountTransaction_param.start = this.start;
        this.transactions = [];
        if (this.accountTransaction_param.address !== null) {
          this.getAccountTransactionInfo(this.start);
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
          // this.accountTransaction_param.start = this.start;
          this.transactions = [];
          this.getAccountTransactionInfo(this.start);
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
          // this.accountTransaction_param.start = this.start;
          this.transactions = [];
          this.getAccountTransactionInfo(this.start);
          if (this.accountTransaction_param.start == 0) {
            this.arrow.leftArrow.src = require("../../assets/images/shared/leftWhiteArrow.png");
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
  padding-right: 30px;
  padding-left: 30px;
  padding-top: 45px;
  .transactions-details {
    background: #000;
    padding-top: 17px;
    .table-ul {
      .title {
        padding-left: 18px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.07);
      }
      .adressCPX {
        .row {
          padding: 0 8px 0 69px;
        }
        img {
          cursor: pointer;
          padding-left: 10px;
        }
      }
    }
  }
  .apex-box {
    background: #000;
    height: calc(~"100% - 215px");
    .apex-title {
      padding-left: 30px;
      padding-top: 25px;
    }
    .data-table {
      width: 100%;
      padding: 0px 0px 0px 0px;
      box-sizing: border-box;
      overflow-y: auto;
      .table-ul {
        width: 100%;
        max-width: 100%;
        border-top: #0000 2px solid;
        & > li {
          .noTx {
            padding-left: 20px;
          }
          .ttHash {
            max-width: 335px;
          }
          .tHash {
            padding-left: 30px;
            max-width: 335px;
          }
          .from {
            padding-left: 10%;
            max-width: 232px;
            color: #56c4fd;
            cursor: pointer;
          }
          .emptyFrom {
            padding-left: 10%;
            max-width: 232px;
            color: #ebebeb;
            cursor: default;
          }
          .to {
            max-width: 232px;
            padding-left: 7%;
            color: #56c4fd;
            cursor: pointer;
          }
          .amount {
            padding-left: 10%;
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
              box-sizing: border-box;
              font-family: "Regular";
              span {
                overflow: hidden;
                white-space: nowrap;
                max-width: 250px;
                color: #56c4fd;
                cursor: pointer;
                text-overflow: ellipsis;
                display: inline-block;
                padding-left: 37px;
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
        position: fixed;
        bottom: 40px;
        width: 92%;
        height: 40px;
        padding: 0px 35px;
        box-sizing: border-box;
        text-align: right;
        font-size: 12px;
        .pagination-content {
          padding-top: 11px;
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
}
</style>
