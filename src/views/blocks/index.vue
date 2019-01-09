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
          <span class="col">Txn</span>
          <span class="col">Miner</span>
        </li>
        <li v-for="(item,index) in dataList" :key="index" class="row">
          <span class="col height">
            <!-- <router-link to="/blocks/BlocksInfo" @click.native="setClickValue">{{item.height}}</router-link> -->
            {{item.height}}
          </span>
          <span class="col col-lg-6">
            <router-link to="/blocks/BlocksInfo" @click.native="setClickValue">{{item.blockHash}}</router-link>
          </span>
          <span class="col">{{item.timeStamp}}</span>
          <span class="col txn">{{item.txNum}}</span>
          <span class="col">{{item.producer}}</span>
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

export default {
  name: "blocks",
  components: {
    Pagination,
    ApexBackGround,
    ApexTitle
  },
  mounted() {
    this.getFirstBlocks();
  },
  data() {
    return {
      title: "Blocks",
      dataList: null,
      secondTime: null,
      start: 1
    };
  },
  methods: {
    getFirstBlocks() {
      console.log(this.start);
      this.$axios
        .post("/api/v1.0/blocks/blockList", {
          start: "0",
          pageSize: "10"
        })
        .then(response => {
          let res = response.data.data;
          this.dataList = res;
          // console.log(res);
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    },
    setClickValue(e) {
      let clickValue = {
        type: "hash",
        value: e.target.innerHTML
      };
      sessionStorage.setItem("clickValue", JSON.stringify(clickValue));
    },
    getNextBlocks() {
      console.log("next");
      this.nextPage = this.start++;
      this.$axios
        .post("/api/v1.0/blocks/blockList", {
          start: this.nextPage,
          pageSize: "10"
        })
        .then(response => {
          let res = response.data.data;
          this.dataList = res;
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
      if (this.nextPage >= 10) {
        this.$axios
          .post("/api/v1.0/blocks/blockList", {
            start: "10",
            pageSize: "10"
          })
          .then(response => {
            let res = response.data.data;
            this.dataList = null;
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
      this.$axios
        .post("/api/v1.0/blocks/blockList", {
          start: this.previousPage,
          pageSize: "10"
        })
        .then(response => {
          let res = response.data.data;
          this.dataList = res;
          console.log(dataList);
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
      if (this.previousPage <= 0) {
        this.$axios
          .post("/api/v1.0/blocks/blockList", {
            start: "0",
            pageSize: "10"
          })
          .then(response => {
            let res = response.data.data;
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
    .table-ul {
      .row {
        .height {
          color: #f26522;
        }
      }
    }
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
