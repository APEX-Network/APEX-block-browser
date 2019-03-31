<template>
  <div class="Blocks">
    <apex-title :title="title"/>
    <apex-back-ground/>
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
            <router-link to="/producer/ProducerInfo" @click.native="setMinerByValue">{{item.producer}}</router-link>
          </span>
        </li>
      </ul>
      <div class="uchain-pagination">
        <div class="pagination-content">
          <span class="first">First</span>
          <span class="prev" @click="getPreviousBlocks"></span>
          <span class="list-number">1-10</span>
          <span class="next" @click="getNextBlocks"></span>
          <span class="last">Last</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/public/Pagination.vue";
import ApexBackGround from "@/components/public/ApexBackGround.vue";
import ApexTitle from "@/components/public/ApexTitle.vue";
import Bus from "./../../utils/bus";
import util from "./../../utils/utils";

export default {
  name: "blocks",
  components: {
    Pagination,
    ApexBackGround,
    ApexTitle
  },
  data() {
    return {
      title: "Blocks",
      dataList: null,
      secondTime: null,
      start: 1,
      allBlockUrl: "/api/v1.0/blocks/blockList",
      params: {
        start: "0",
        pageSize: "10"
      },
      clickValue: {
        type: "height",
        value: null
      }
    };
  },
  mounted() {
    this.getFirstBlocks();
    const timer = setInterval(() => {
      this.getFirstBlocks();
    }, 1500);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
  methods: {
    getFirstBlocks() {
      if (!!this.params) {
        this.$axios
          .post(this.allBlockUrl, this.params)
          .then(response => {
            // let res = response.data.data;
            // this.dataList = res;
            let res = response.data.data;
            let seconds;
            for (let i = 0; i < res.length; i++) {
              const item = res[i];
              seconds = util.utilMethods.getSec(item.timeStamp);
              item.timeStamp = seconds;
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
    getNextBlocks() {
      this.nextPage = this.start++;
      this.params.start = this.nextPage;
      this.$axios
        .post(this.allBlockUrl, this.params)
        .then(response => {
          let res = response.data.data;
          let seconds;
          for (let i = 0; i < res.length; i++) {
            const item = res[i];
            seconds = util.utilMethods.getSec(item.timeStamp);
            item.timeStamp = seconds;
          }
          this.dataList = res;
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
      if (this.nextPage >= 10) {
        this.params.start = "10";
        this.$axios
          .post(this.allBlockUrl, this.params)
          .then(response => {
            this.dataList = null;
            let res = response.data.data;
            let seconds;
            for (let i = 0; i < res.length; i++) {
              const item = res[i];
              seconds = util.utilMethods.getSeconds(item.timeStamp);
              item.timeStamp = seconds;
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
    getPreviousBlocks() {
      console.log("previous");
      this.previousPage = this.start--;
      this.params.start = this.previousPage;
      this.$axios
        .post(this.allBlockUrl, this.params)
        .then(response => {
          let res = response.data.data;
          let seconds;
          for (let i = 0; i < res.length; i++) {
            const item = res[i];
            seconds = util.utilMethods.getSeconds(item.timeStamp);
            item.timeStamp = seconds;
          }
          this.dataList = res;
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
      if (this.previousPage <= 0) {
        this.$axios
          .post(this.allBlockUrl, this.params)
          .then(response => {
            let res = response.data.data;
            let seconds;
            for (let i = 0; i < res.length; i++) {
              const item = res[i];
              seconds = util.utilMethods.getSeconds(item.timeStamp);
              item.timeStamp = seconds;
            }
            this.dataList = res;
          })
          .catch(function(err) {
            if (err.response) {
              console.log(err.response);
            }
          });
      }
    }
  }
};
</script>
<style scoped lang="less">
@import "./../../assets/css/layout";
.Blocks {
  width: 100%;
  height: 100%;
  background: url(./../../assets/images/shared/yunshi.png) 40% 45% no-repeat;
  .data-table {
    // .table-ul {
    //   .row {
    //     .height {
    //       color: #f26522;
    //     }
    //   }
    // }
    .uchain-pagination {
      width: 100%;
      height: 50px;
      padding: 10px 35px;
      box-sizing: border-box;
      text-align: right;
      font-size: 12px;
      color: #333333;
      span {
        display: inline-block;
        padding: 9px 0;
        margin: 0 4px;
        cursor: pointer;
        font-family: "Semibold";
        vertical-align: middle;
        &.list-number {
          cursor: initial;
        }
        &.prev,
        &.next {
          padding: 9px;
          background: url("../../assets/images/shared/page.png") no-repeat
            center 2px;
          color: #f26522;

          &:hover {
            background-position: center -34px;
            color: #f26522;
          }
        }
        &.next {
          transform: rotate(-180deg);
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
</style>
