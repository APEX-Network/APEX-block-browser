<template>
  <div class="TxFBlock">
    <p class="bheight" @click="setHeightValue(blockHeight)">{{blockHeight}}</p>
    <apex-back-ground/>
    <div class="data-table">
      <ul class="table-ul">
        <li class="row title">{{title}}</li>
        <li class="row">
          <span class="col index">Tx index</span>
          <span class="col col-lg-6 txHash">TX Hash</span>
          <span class="col fromtitle">From</span>
          <span class="col totitle">To</span>
          <span class="col amount">Amount</span>
        </li>
        <li v-for="(item,index) in dataList" :key="index" class="row">
          <span class="col height">{{item.index}}</span>
          <span class="col col-lg-6 ttxHash" @click="setHashValue(item.txHash)">{{item.txHash}}</span>
          <span
            class="col"
            :class="objectClass"
            @click="setMinerByValue(item.from)"
          >{{getaddress(item.from)}}</span>
          <span class="col to" @click="setMinerByValue(item.to)">{{getaddress(item.to)}}</span>
          <span class="col amount">{{item.amount}} CPX</span>
        </li>
      </ul>
      <div class="apex-pagination">
        <div class="pagination-content">
          <a class="first" @click="isClick && getFirst()">First</a>
          <img
            ref="left"
            class="prev"
            @click="isClick && getPrevious() "
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
      pageNumber: null,
      arrow: {
        leftArrow: null,
        rightArrow: null
      },
      isClick: true,
      serverDate: null,
      blockHeight: null,
      index: 0,
      count: null,
      clickValue: {
        type: "height",
        value: null
      },
      objectClass: {
        from: true,
        emptyFrom: false
      },
      pageArr: null
    };
  },
  mounted() {
    this.getInstance();
    this.blockHeight = this.$route.query.id;
    this.getTxFBlock(this.blockHeight);
  },
  methods: {
    getaddress(address) {
      let x = address.slice(0, 8);
      let y = address.slice(-8);
      if (this.blockHeight == "0") {
        return !address ? "Genesis" : x + "..." + y;
      }
      return !address ? "Miner Reward" : x + "..." + y;
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
          for (let i = 0; i < this.totalNumber.length; i++) {
            const element = this.totalNumber[i];
            element["index"] = this.index++;
          }
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
          if (this.totalNumber.length >= 10) {
            this.pageArr = util.utilMethods.cutArray(this.totalNumber, 10);
            this.dataList = this.pageArr[0];
          } else {
            this.dataList = this.totalNumber;
          }
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
    setHeightValue(data) {
      this.$router.push({
        path: "/blocks/BlocksInfo",
        query: {
          id: data
        }
      });
    },
    setHashValue(data) {
      this.$router.push({
        path: "/transactions/TransactionsInfo",
        query: {
          id: data
        }
      });
    },
    setMinerByValue(data) {
      if (data !== "") {
        this.$router.push({
          path: "/transactions/TransactionsInfo/AccountInfo",
          query: {
            id: data
          }
        });
      }
    },
    getNext() {
      if (this.start < this.totalPage - 1) {
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
        this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
        this.start++;
        this.pageNumber = this.start + 1 + "-" + this.totalPage;
        this.dataList = this.pageArr[this.start];
        for (let i = 0; i < this.dataList.length; i++) {
          const element = this.dataList[i];
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
        if (this.start == this.totalPage - 1) {
          this.pageNumber = this.start + 1 + "-" + this.totalPage;
          this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
          return;
        }
      }
    },
    getLast() {
      this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
      this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
      this.start = this.totalPage - 1;
      this.pageNumber = this.totalPage + "-" + this.totalPage;
      this.dataList = this.pageArr[this.start];
      for (let i = 0; i < this.dataList.length; i++) {
        const element = this.dataList[i];
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
    },
    getFirst() {
      this.arrow.leftArrow.src = require("../../assets/images/shared/leftWhiteArrow.png");
      this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
      this.start = 0;
      this.pageNumber = this.start + 1 + "-" + this.totalPage;
      this.dataList = this.pageArr[0];
      for (let i = 0; i < this.dataList.length; i++) {
        const element = this.dataList[i];
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
    },
    getPrevious() {
      if (this.start > 0) {
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
        this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
        this.start--;
        this.pageNumber = this.start + 1 + "-" + this.totalPage;
        this.dataList = [];
        this.dataList = this.pageArr[this.start];
        for (let i = 0; i < this.dataList.length; i++) {
          const element = this.dataList[i];
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
        if (this.start == 0) {
          this.arrow.leftArrow.src = require("../../assets/images/shared/leftWhiteArrow.png");
          this.pageNumber = this.start + 1 + "-" + this.totalPage;
          return;
        }
      }
    }
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
    cursor: pointer;
    color: #f26522;
  }
  .data-table {
    height: 100%;
    .table-ul {
      .title {
        padding-left: 18px;
        padding-top: 10px;
        border-bottom: 2px solid #000;
      }
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
        .ttxHash {
          max-width: 250px;
          cursor: pointer;
          color: #f26522;
        }
        .from {
          max-width: 250px;
          padding-left: 62px;
          cursor: pointer;
          color: #f26522;
        }
        .fromtitle {
          max-width: 250px;
          padding-left: 62px;
        }
        .emptyFrom {
          max-width: 250px;
          padding-left: 80px;
          color: #ebebeb;
          cursor: default;
        }
        .to {
          max-width: 250px;
          padding-left: 35px;
          cursor: pointer;
          color: #f26522;
        }
        .totitle {
          max-width: 250px;
          padding-left: 35px;
        }
        .amount {
          padding-left: 14px;
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
