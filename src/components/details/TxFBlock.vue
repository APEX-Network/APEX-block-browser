<template>
  <div class="TxFBlock">
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
            <router-link to="/blocks/BlocksInfo" @click.native="setHashValue">{{item.txHash}}</router-link>
          </span>
          <span class="col from">
            <router-link to="/producer/ProducerInfo" @click.native="setMinerByValue">{{item.from}}</router-link>
          </span>
          <span class="col to">
            <router-link to="/producer/ProducerInfo" @click.native="setMinerByValue">{{item.to}}</router-link>
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
      title: "Transactions For Block    " + 76415,
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
      empthData: null
    };
  },
  mounted() {
    this.getInstance();
    window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
    Bus.$on("bHeight", data => {
    //   this.empthData = data;
      sessionStorage.setItem("refresh", data);
      this.getTxFBlock(data);
      this.title = "Transactions For Block    " + data;
      return;
    });
    this.flag = sessionStorage.getItem("flag");
    if (this.flag == 1) {
      let refreshdata = sessionStorage.getItem("refresh");
      this.getTxFBlock(refreshdata);
      return;
    }
  },
  methods: {
    getInstance() {
      this.arrow.leftArrow = this.$refs.left;
      this.arrow.rightArrow = this.$refs.right;
    },
    getTxFBlock(data) {
      this.$axios
        .get(this.blockHeight_url + data)
        .then(response => {
          let res = response.data.data.txs;
          this.dataList = res;
          for (let i = 0; i < this.dataList.length; i++) {
            const element = this.dataList[i];
            let amount = element.amount;
            let faddress = element.from;
            let taddress = element.to;
            let result = amount.toString().indexOf(".");
            let x = faddress.slice(0, 8);
            let y = faddress.slice(-8);
            element["from"] = !element.from ? "Miner Reward" : x + "..." + y;
            let a = taddress.slice(0, 8);
            let b = taddress.slice(-8);
            element["to"] = a + "..." + b;
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
    setHashValue(e) {
      this.clickValue.type = "hash";
      this.clickValue.value = e.target.innerHTML;
      Bus.$emit("clickValue", JSON.stringify(this.clickValue));
    },
    setMinerByValue(e) {
      Bus.$emit("minerBy", e.target.innerHTML);
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
              let x = faddress.slice(0, 8);
              let y = faddress.slice(-8);
              element["from"] = !element.from ? "Miner Reward" : x + "..." + y;
              let a = taddress.slice(0, 8);
              let b = taddress.slice(-8);
              element["to"] = a + "..." + b;
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
            let x = faddress.slice(0, 8);
            let y = faddress.slice(-8);
            element["from"] = !element.from ? "Miner Reward" : x + "..." + y;
            let a = taddress.slice(0, 8);
            let b = taddress.slice(-8);
            element["to"] = a + "..." + b;
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
            let x = faddress.slice(0, 8);
            let y = faddress.slice(-8);
            element["from"] = !element.from ? "Miner Reward" : x + "..." + y;
            let a = taddress.slice(0, 8);
            let b = taddress.slice(-8);
            element["to"] = a + "..." + b;
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
              let x = faddress.slice(0, 8);
              let y = faddress.slice(-8);
              element["from"] = !element.from ? "Miner Reward" : x + "..." + y;
              let a = taddress.slice(0, 8);
              let b = taddress.slice(-8);
              element["to"] = a + "..." + b;
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
      Bus.$off("minerBy");
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
        }
        .txHash {
          max-width: 250px;
        }
        .from {
          max-width: 250px;
        }
        .to {
          max-width: 250px;
        }
        .amount {
          max-width: 100px;
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
