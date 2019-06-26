<template>
  <div class="TxFBlock">
    <!-- <div>
      <transition name="fade">
        <loading v-if="isLoading"></loading>
      </transition>
    </div>-->
    <p class="bheight" @click="setHeightValue(blockHeight)">{{blockHeight}}</p>
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
      <footer class="apex-pagination">
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
      </footer>
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
import Loading from "@/components/loading";

export default {
  name: "TxFBlock",
  components: {
    ApexBackGround,
    ApexTitle,
    Loading
  },
  data() {
    return {
      isLoading: true,
      title: "Transactions For Block    ",
      dataList: [],
      start: 0,
      blockHeight_url: "/api/v1.0/blocks/blockHeight/transactions",
      params: {
        height: null,
        start: 0,
        pageSize: 10
      },
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
      pageArr: null,
      totalNumber: []
    };
  },
  mounted() {
    this.getInstance();
    this.blockHeight = this.$route.query.id;
    this.count = this.$route.query.txNum;
    this.getTxFBlock(this.blockHeight, this.start, this.index);
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
    getTxFBlock(data, start, index) {
      this.params.height = data;
      this.params.start = start;
      this.$axios
        .post(this.blockHeight_url, this.params)
        .then(response => {
          this.totalNumber = [];
          this.isLoading = false;
          let res = response.data.data;
          this.totalNumber = res;
          for (let i = 0; i < this.totalNumber.length; i++) {
            let element = this.totalNumber[i];
            element["index"] = index++;
          }
          if (this.count == 0) {
            this.noTransactions = "There are no matching entries";
            this.pageNumber = "1-1";
            this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
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
          this.dataList = this.totalNumber;
          for (let i = 0; i < this.dataList.length; i++) {
            let element = this.dataList[i];
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
        this.totalNumber.length = 0;
        this.isLoading = true;
        this.index = this.start * 10;
        this.getTxFBlock(this.blockHeight, this.start, this.index);
        if (this.start == this.totalPage - 1) {
          this.pageNumber = this.start + 1 + "-" + this.totalPage;
          this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
        }
      }
    },
    getLast() {
      this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
      this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
      this.start = this.totalPage - 1;
      this.pageNumber = this.totalPage + "-" + this.totalPage;
      this.index = (this.totalPage - 1) * 10;
      this.totalNumber.length = 0;
      this.isLoading = true;
      this.getTxFBlock(this.blockHeight, this.start, this.index);
    },
    getFirst() {
      this.arrow.leftArrow.src = require("../../assets/images/shared/leftWhiteArrow.png");
      this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
      if (this.start > 0) {
        this.start = 0;
        this.pageNumber = this.start + 1 + "-" + this.totalPage;
        this.index = 0;
        this.totalNumber.length = 0;
        this.isLoading = true;
        this.getTxFBlock(this.blockHeight, this.start, this.index);
      }
    },
    getPrevious() {
      if (this.start > 0) {
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
        this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
        this.start--;
        this.pageNumber = this.start + 1 + "-" + this.totalPage;
        this.index = this.start * 10;
        this.totalNumber.length = 0;
        this.isLoading = true;
        this.getTxFBlock(this.blockHeight, this.start, this.index);
        if (this.start == 0) {
          this.arrow.leftArrow.src = require("../../assets/images/shared/leftWhiteArrow.png");
        }
      }
    }
  }
};
</script>
<style scoped lang="less">
.TxFBlock {
  width: 100%;
  height: 100.6%;
  padding-right: 20px;
  padding-left: 25px;
  padding-top: 44px;
  .bheight {
    position: absolute;
    padding-top: 11px;
    padding-left: 180px;
    cursor: pointer;
    color: #56c4fd;
  }
  .data-table {
    padding: 0px;
    height: 100%;
    background: #000;
    border-radius: 4px;
    .table-ul {
      .title {
        padding-left: 18px;
        padding-top: 10px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.07);
      }
      & > li {
        &.row {
          margin: 0;
          color: #ebebeb;
          height: 50px;
        }
        .index {
          max-width: 82px;
        }
        .height {
          max-width: 82px;
          padding-left: 36px;
        }
        .txHash {
          padding-left: 7%;
          max-width: 500px;
        }
        .ttxHash {
          padding-left: 7%;
          max-width: 480px;
          cursor: pointer;
          color: #56c4fd;
        }
        .from {
          max-width: 279px;
          padding-left: 7%;
          cursor: pointer;
          color: #56c4fd;
        }
        .fromtitle {
          max-width: 250px;
          padding-left: 5.5%;
        }
        .emptyFrom {
          max-width: 250px;
          padding-left: 7%;
          color: #ebebeb;
          cursor: default;
        }
        .to {
          max-width: 250px;
          padding-left: 6%;
          cursor: pointer;
          color: #56c4fd;
        }
        .totitle {
          max-width: 250px;
          padding-left: 6.5%;
        }
        .amount {
          padding-left: 7%;
          max-width: 200px;
        }
        & > span {
          a:hover {
            color: #56c4fd;
          }
        }
      }
    }
    .apex-pagination {
      position: fixed;
      bottom: 30px;
      width: 91%;
      height: 50px;
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
              color: #56c4fd;
            }
          }
        }
      }
    }
  }
}
</style>
