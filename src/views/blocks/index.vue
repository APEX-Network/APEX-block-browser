<template>
  <div class="Blocks">
    <!-- <div>
      <transition name="fade">
        <loading v-if="isLoading"></loading>
      </transition>
    </div>-->
    <!-- <apex-back-ground/> -->
    <div class="data-table">
      <ul class="table-ul">
        <li class="row title">Blocks</li>
        <li class="row">
          <span class="col tHeight">Height</span>
          <span class="col col-lg-6">Hash</span>
          <span class="col age">Age</span>
          <span class="col">Miner</span>
        </li>
        <li v-for="(item,index) in dataList" :key="index" class="row">
          <span class="col height" @click="setHeightValue(item.height)">{{item.height}}</span>
          <span class="col col-lg-6 hash" @click="setHashValue(item.blockHash)">{{item.blockHash}}</span>
          <span class="col age">{{item.timeStamp}}</span>
          <span class="col producer" @click="setMinerByValue(item.producer)">{{item.producer}}</span>
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
import Bus from "@/utils/bus";
import util from "@/utils/utils";
import Loading from "@/components/loading";

export default {
  name: "blocks",
  components: {
    ApexBackGround,
    ApexTitle,
    Loading
  },
  data() {
    return {
      isLoading: true,
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
    this.getBlocks(this.start);
    const timer = setInterval(() => {
      this.getBlocks(this.start);
    }, 1500);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer, timer2);
    });
    const timer2 = setInterval(() => {
      clearInterval(timer);
    }, 60000);
  },
  methods: {
    getInstance() {
      this.arrow.leftArrow = this.$refs.left;
      this.arrow.rightArrow = this.$refs.right;
    },
    getBlocks(start) {
      if (!!this.params) {
        this.params.start = start;
        this.$axios
          .post(this.allBlockUrl, this.params)
          .then(response => {
            this.dataList = [];
            let res = response.data.data;
            this.isLoading = false;
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
        path: "/blocks/BlocksInfo",
        query: {
          id: data
        }
      });
    },
    setMinerByValue(data) {
      this.$router.push({
        path: "/producer/ProducerInfo",
        query: {
          id: data
        }
      });
    },
    getNext() {
      if (this.start < 9) {
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
        this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
        this.start++;
        this.pageNumber = this.start + 1 + "-10";
        this.dataList = [];
        this.isLoading = true;
        this.getBlocks(this.start);
        if (this.start == 9) {
          this.pageNumber = this.start + 1 + "-10";
          this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
          this.isClick = false;
          return;
        }
      }
    },
    getLast() {
      this.isClick = true;
      this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
      this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
      this.start = 9;
      this.pageNumber = this.start + 1 + "-10";
      this.dataList = [];
      this.isLoading = true;
      this.getBlocks(this.start);
    },
    getFirst() {
      this.isClick = true;
      this.arrow.leftArrow.src = require("../../assets/images/shared/leftWhiteArrow.png");
      this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
      this.start = 0;
      this.pageNumber = this.start + 1 + "-10";
      this.dataList = [];
      this.isLoading = true;
      this.getBlocks(this.start);
    },
    getPrevious() {
      this.isClick = true;
      if (this.start > 0) {
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
        this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
        this.start--;
        this.pageNumber = this.start + "-10";
        this.dataList = [];
        this.isLoading = true;
        this.getBlocks(this.start);
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
.Blocks {
  width: 100%;
  height: 100%;
  padding-right: 30px;
  padding-left: 30px;
  padding-top: 45px;
  .data-table {
    height: 100%;
    background: #000;
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
        .producer {
          cursor: pointer;
          color: #e1e1e1;
        }
        .height {
          cursor: pointer;
          color: #56c4fd;
          max-width: 126px;
        }
        .tHeight {
          max-width: 126px;
        }
        .age {
          padding-left: 85px;
        }
        .hash {
          cursor: pointer;
          color: #56c4fd;
        }
      }
    }
    .apex-pagination {
      position: fixed;
      bottom: 39px;
      width: 90%;
      height: 40px;
      padding: 0px 35px;
      box-sizing: border-box;
      text-align: right;
      font-size: 12px;
      .pagination-content {
        padding-top: 12px;
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
