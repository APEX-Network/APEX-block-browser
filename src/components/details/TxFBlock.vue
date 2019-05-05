<template>
  <div class="TxFBlock">
    <p class="bheight">
      <router-link to="/blocks/BlocksInfo" @click.native="setHeightValue">{{blockHeight}}</router-link>
    </p>
    <apex-title :title="title" class="title"/>
    <apex-back-ground class="bg"/>
    <div class="data-table">
      <ul class="table-ul">
        <li class="row">
          <span class="col index">Tx index</span>
          <span class="col col-lg-6 txHash">TX Hash</span>
          <span class="col from">From</span>
          <span class="col to">To</span>
          <span class="col amount">Amount</span>
        </li>
        <li v-for="(item,index) in dataList" :key="index" class="row">
          <span class="col height">{{item.index}}</span>
          <span class="col col-lg-6 txHash">
            <router-link to @click.native="setHashValue(item.txHash)">{{item.txHash}}</router-link>
          </span>
          <span class="col" :class="objectClass">
            <router-link to @click.native="setMinerByValue(item.from)">{{getaddress(item.from)}}</router-link>
          </span>
          <span class="col to">
            <router-link to @click.native="setMinerByValue(item.to)">{{getaddress(item.to)}}</router-link>
          </span>
          <span class="col amount">{{item.amount}} CPX</span>
        </li>
      </ul>
      <div class="apex-pagination">
        <div class="pagination-content">
          <a class="first" @click="getFirst">First</a>
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
          <a class="last" @click="getLast">Last</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ApexBackGround from "@/components/public/ApexBackGround.vue";
import ApexTitle from "@/components/public/ApexTitle.vue";
import Bus from "./../../utils/bus";
import util from "./../../utils/utils";

export default {
  name: "TxFBlock",
  components: {
    ApexBackGround,
    ApexTitle
  },
  data() {
    return {
      title: "Transactions For Block    ",
      dataList: [],
      start: 0,
      blockHeight_url: "/api/v1.0/blocks/blockHeight/",
      clickValue: {
        type: "height",
        value: null
      },
      pageNumber: "1-10",
      arrow: {
        leftArrow: null,
        rightArrow: null
      },
      isClick: true,
      serverDate: null,
      blockHeight: null,
      index: 0,
      flag: null,
      count: null,
      clickValue: {
        type: "height",
        value: null
      },
      objectClass: {
        from: true,
        emptyFrom: false
      }
    };
  },
  mounted() {
    this.getInstance();
    window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
    // Bus.$on("bHeight", data => {
    //   sessionStorage.setItem("refresh", data);
    //   this.getTxFBlock(data);
    //   this.blockHeight = data;
    //   this.clickValue.value = this.blockHeight;
    //   return;
    // });
    this.blockHeight = this.$route.query.clickValue;
    this.clickValue.value = this.blockHeight;
    this.getTxFBlock(this.blockHeight);
    sessionStorage.setItem("refresh", this.blockHeight);
    this.flag = sessionStorage.getItem("flag");
    if (this.flag == 1) {
      let refreshdata = sessionStorage.getItem("refresh");
      this.blockHeight = refreshdata;
      this.getTxFBlock(refreshdata);
      return;
    }
  },
  methods: {
    getaddress(address) {
      let x = address.slice(0, 8);
      let y = address.slice(-8);
      return !address ? "Miner Reward" : x + "..." + y;
    },
    setHeightValue() {
      Bus.$emit("clickValue", this.clickValue);
    },
    getInstance() {
      this.arrow.leftArrow = this.$refs.left;
      this.arrow.rightArrow = this.$refs.right;
    },
    getTxFBlock(data) {
      this.$axios
        .get(this.blockHeight_url + data)
        .then(response => {
          let res = response.data.data.txs;
          this.totalNumber = res;
          this.count = res.length;
          if (this.count == 0) {
            this.noTransactions = "There are no matching entries";
            this.pageNumber = "1-1";
            this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
            return;
          }
          this.totalPage = this.count / 10;
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
          this.dataList = this.totalNumber.slice(0, 10);
          for (let i = 0; i < this.dataList.length; i++) {
            const element = this.dataList[i];
            let amount = element.amount;
            let faddress = element.from;
            let taddress = element.to;
            if (faddress == "") {
              this.objectClass.emptyFrom = true;
              this.objectClass.from = false;
            }
            if (faddress !== "") {
              this.objectClass.emptyFrom = false;
              this.objectClass.from = true;
            }
            this.getaddress(faddress);
            this.getaddress(taddress);
            let result = amount.toString().indexOf(".");
            element["index"] = this.index++;
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
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    setHeightValue(e) {
      this.clickValue.type = "height";
      this.clickValue.value = e.target.innerHTML;
      Bus.$emit("clickValue", JSON.stringify(this.clickValue));
    },
    setHashValue(txHash) {
      this.$router.push("/transactions/TransactionsInfo");
      setTimeout(() => {
        Bus.$emit("txHash", txHash);
      });
    },
    setMinerByValue(data) {
      if (data !== "") {
        this.$router.push("/transactions/TransactionsInfo/AccountInfo");
        setTimeout(() => {
          Bus.$emit("accountValue", data);
        });
      }
    },
    getNext() {
      if (this.start < 10) {
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
        this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
        this.start++;
        this.pageNumber = this.start + 1 + "-10";
        this.params.start = this.start;
        this.$axios
          .post(this.allBlockUrl, this.params)
          .then(response => {
            let res = response.data.data.txs;
            this.dataList = res;
            for (let i = 0; i < this.dataList.length; i++) {
              const element = this.dataList[i];
              let amount = element.amount;
              let faddress = element.from;
              let taddress = element.to;
              let result = amount.toString().indexOf(".");
              this.getaddress(faddress);
              this.getaddress(taddress);
              element["index"] = this.index++;
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
          })
          .catch(function(err) {
            if (err.response) {
              console.log(err.response);
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
    getLast() {
      this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
      this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
      this.start = 10;
      this.pageNumber = this.start + "-10";
      this.params.start = this.start;
      this.$axios
        .post(this.allBlockUrl, this.params)
        .then(response => {
          let res = response.data.data.txs;
          this.dataList = res;
          for (let i = 0; i < this.dataList.length; i++) {
            const element = this.dataList[i];
            let amount = element.amount;
            let faddress = element.from;
            let taddress = element.to;
            let result = amount.toString().indexOf(".");
            this.getaddress(faddress);
            this.getaddress(taddress);
            element["index"] = this.index++;
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
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    },
    getFirst() {
      this.arrow.leftArrow.src = require("../../assets/images/shared/leftWhiteArrow.png");
      this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
      this.start = 0;
      this.pageNumber = this.start + 1 + "-10";
      this.params.start = this.start;
      this.$axios
        .post(this.allBlockUrl, this.params)
        .then(response => {
          let res = response.data.data.txs;
          this.dataList = res;
          for (let i = 0; i < this.dataList.length; i++) {
            const element = this.dataList[i];
            let amount = element.amount;
            let faddress = element.from;
            let taddress = element.to;
            let result = amount.toString().indexOf(".");
            this.getaddress(faddress);
            this.getaddress(taddress);
            element["index"] = this.index++;
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
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
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
          .post(this.allBlockUrl, this.params)
          .then(response => {
            let res = response.data.data.txs;
            this.dataList = res;
            for (let i = 0; i < this.dataList.length; i++) {
              const element = this.dataList[i];
              let amount = element.amount;
              let faddress = element.from;
              let taddress = element.to;
              let result = amount.toString().indexOf(".");
              this.getaddress(faddress);
              this.getaddress(taddress);
              element["index"] = this.index++;
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
          })
          .catch(function(err) {
            if (err.response) {
              console.log(err.response);
            }
          });
        if (this.start == 0) {
          this.arrow.leftArrow.src = require("../../assets/images/shared/leftWhiteArrow.png");
          this.pageNumber = this.start + 1 + "-10";
          return;
        }
      }
    },
    offListener() {
      Bus.$off("clickValue");
      Bus.$off("accountValue");
      Bus.$off("txFHeight");
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
<style scoped lang="less">
.TxFBlock {
  width: 100%;
  height: 100%;
  .bheight {
    position: absolute;
    padding-top: 11px;
    padding-left: 180px;
    a {
      cursor: pointer;
      color: #f26522;
    }
  }
  /deep/ .title {
    .apex-title {
      p {
        cursor: pointer;
        color: #f26522;
      }
    }
  }
  .bg {
    background: url(./../../assets/images/shared/yunshi.png) 55% 67% no-repeat;
  }
  .data-table {
    height: 93%;
    .table-ul {
      & > li {
        .index {
          max-width: 82px;
        }
        .height {
          max-width: 82px;
          padding-left: 36px;
        }
        .txHash {
          max-width: 250px;
        }
        .from {
          max-width: 250px;
          padding-left: 80px;
        }
        .emptyFrom {
          max-width: 250px;
          padding-left: 80px;
          a {
            color: #ebebeb;
            cursor: default;
          }
        }
        .to {
          max-width: 250px;
          padding-left: 55px;
        }
        .amount {
          padding-left: 5%;
          max-width: 165px;
        }
        & > span {
          a:hover {
            color: #f26522;
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
</style>
