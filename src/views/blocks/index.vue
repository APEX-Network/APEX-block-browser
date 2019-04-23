<template>
  <div class="Blocks">
    <apex-title :title="title" class="title"/>
    <apex-back-ground class="bg"/>
    <div class="data-table">
      <ul class="table-ul">
        <li class="row">
          <span class="col">Height</span>
          <span class="col col-lg-6">Hash</span>
          <span class="col">Age</span>
          <!-- <span class="col">Txn</span> -->
          <span class="col">Miner</span>
        </li>
        <li v-for="(item,index) in dataList" :key="index" class="row">
          <span class="col height">
            <router-link to="/blocks/BlocksInfo" @click.native="setHeightValue">{{item.height}}</router-link>
            <!-- {{item.height}} -->
          </span>
          <span class="col col-lg-6">
            <router-link to="/blocks/BlocksInfo" @click.native="setHashValue">{{item.blockHash}}</router-link>
          </span>
          <span class="col">{{item.timeStamp}}</span>
          <!-- <span class="col txn">{{item.txNum}}</span> -->
          <!-- <span class="col">{{item.producer}}</span> -->
          <span class="col">
            <router-link
              to="/producer/ProducerInfo"
              @click.native="setMinerByValue"
            >{{item.producer}}</router-link>
          </span>
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
// import Pagination from "@/components/public/Pagination.vue";
import ApexBackGround from "@/components/public/ApexBackGround.vue";
import ApexTitle from "@/components/public/ApexTitle.vue";
import Bus from "./../../utils/bus";
import util from "./../../utils/utils";

export default {
  name: "blocks",
  components: {
    // Pagination,
    ApexBackGround,
    ApexTitle
  },
  data() {
    return {
      title: "Blocks",
      dataList: [],
      secondTime: null,
      start: 0,
      allBlockUrl: "/api/v1.0/blocks/blockList",
      params: {
        start: "0",
        pageSize: "10"
      },
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
      serverDate: null
    };
  },
  mounted() {
    this.getInstance();
    this.getBlocks();
    const timer = setInterval(() => {
      this.getBlocks();
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
    getBlocks() {
      if (!!this.params) {
        this.$axios
          .post(this.allBlockUrl, this.params)
          .then(response => {
            let res = response.data.data;
            let serverTime = response.headers.date;
            let time;
            for (let i = 0; i < res.length; i++) {
              const item = res[i];
              time = util.utilMethods.listUTCtime(item.timeStamp, serverTime);
              item.timeStamp = time;
            }
            this.dataList = res;
          })
          .catch(function(err) {
            if (err.response) {
              console.log(err.response);
            }
          });
      }
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
            let res = response.data.data;
            let serverTime = response.headers.date;
            let time;
            for (let i = 0; i < res.length; i++) {
              const item = res[i];
              time = util.utilMethods.listUTCtime(item.timeStamp, serverTime);
              item.timeStamp = time;
            }
            this.dataList = res;
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
          let res = response.data.data;
          let serverTime = response.headers.date;
          let time;
          for (let i = 0; i < res.length; i++) {
            const item = res[i];
            time = util.utilMethods.listUTCtime(item.timeStamp, serverTime);
            item.timeStamp = time;
          }
          this.dataList = res;
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
          let res = response.data.data;
          let serverTime = response.headers.date;
          let time;
          for (let i = 0; i < res.length; i++) {
            const item = res[i];
            time = util.utilMethods.listUTCtime(item.timeStamp, serverTime);
            item.timeStamp = time;
          }
          this.dataList = res;
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
            let res = response.data.data;
            let serverTime = response.headers.date;
            let time;
            for (let i = 0; i < res.length; i++) {
              const item = res[i];
              time = util.utilMethods.listUTCtime(item.timeStamp, serverTime);
              item.timeStamp = time;
            }
            this.dataList = res;
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
    }
  },
  beforeDestroy() {
    this.offListener();
  }
};
</script>
<style scoped lang="less">
@import "./../../assets/css/layout";
.Blocks {
  width: 100%;
  height: 100%;
  .bg {
    background: url(./../../assets/images/shared/yunshi.png) 55% 67% no-repeat;
  }
  .data-table {
    height: 93%;
    .table-ul {
      & > li {
        & > span {
          a:hover {
            color: #f26522;
          }
        }
      }
    }
    .apex-pagination {
      width: 100%;
      height: 50px;
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
