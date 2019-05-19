<template>
  <div class="producer">
    <apex-back-ground />
    <div class="data-table">
      <ul class="table-ul">
        <li class="row title">Producer</li>
        <li class="row">
          <span class="col">Rank</span>
          <span class="col col-lg-8">Account</span>
          <span class="col">Votes</span>
          <span class="col">Blocks</span>
        </li>
        <li v-for="(item,index) in producer" :key="index" class="row">
          <span class="col">{{item.Rank}}</span>
          <span class="col col-lg-8 addr"  @click="setClickValue(item.addr)">
          {{item.addr}}
          </span>
          <span class="col">{{item.votes}}</span>
          <span class="col">{{item.blockCount}}</span>
        </li>
      </ul>
      <div class="apex-pagination">
        <div class="pagination-content">
          <a class="first" @click="isClick && getFirst()">First</a>
          <img
            ref="left"
            class="prev"
            @click="isClick && getPrevious()"
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
const PublicNav = r => require.ensure([], () => r(require("@/components/publicnav/index")), 'Producer');
const PublicFooter = r => require.ensure([], () => r(require("@/components/publicfooter/index")), 'Producer');
const ApexTitle = r => require.ensure([], () => r(require("@/components/public/ApexTitle")), 'titleAndBackground');
const ApexBackGround = r => require.ensure([], () => r(require("@/components/public/ApexBackGround")), 'titleAndBackground');

import Bus from "@/utils/bus";
import utils from "@/utils/utils";
export default {
  name: "Producer",
  components: {
    PublicNav,
    PublicFooter,
    ApexTitle,
    ApexBackGround
  },
  created() {},
  data() {
    return {
      title: "Producer",
      producer: [],
      Rank: 1,
      minerBy: null,
      minerBy_url: "/api/v1.0/minerInfo/minerList",
      params: {
        start: "0",
        pageSize: "10"
      },
      start: 0,
      pageNumber: null,
      arrow: {
        leftArrow: null,
        rightArrow: null
      },
      isClick: true,
      totalPage: null,
      point: null,
      count: null
    };
  },
  mounted() {
    this.getInstance();
    this.getProducerList();
    const timer = setInterval(() => {
      this.getProducerList();
    }, 1500);
    const timer2 = setInterval(() => {
      clearInterval(timer);
    }, 60000);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer,timer2);
    });
  },
  methods: {
    getInstance() {
      this.arrow.leftArrow = this.$refs.left;
      this.arrow.rightArrow = this.$refs.right;
    },
    getProducerList() {
      this.$axios
        .post(this.minerBy_url, this.params)
        .then(response => {
          this.producer = [];
          this.Rank = 1;
          this.producer = response.data.data;
          this.count = this.producer.length / this.params.pageSize;
          if (this.count >= 10) {
            this.totalPage = 10;
            this.pageNumber = "1-" + this.totalPage;
          }
          if (this.count < 10) {
            this.point = this.count.toString().indexOf(".");
            if (this.point > -1) {
              this.totalPage = parseInt(this.count.toString().split(".")[0]) + 1;
            }
            if (this.point == -1) {
              this.totalPage = this.count;
            }
            this.pageNumber = "1-" + this.totalPage;
            if (this.totalPage == 1) {
              this.isClick = false;
              this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
            }
          }
          for (let i = 0; i < this.producer.length; i++) {
            this.producer[i]["Rank"] = this.Rank++;
          }
          localStorage.setItem("producer", JSON.stringify(this.producer));
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    },
    getNext() {
      this.Rank = 1;
      if (this.start < 10) {
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
        this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
        this.start++;
        this.pageNumber = this.start + 1 + "-" + this.totalPage;
        console.log(this.pageNumber);
        this.params.start = this.start;
        this.$axios
          .post(this.minerBy_url, this.params)
          .then(response => {
            this.producer = response.data.data;
            for (let i = 0; i < this.producer.length; i++) {
              this.producer[i]["Rank"] = this.Rank++;
            }
          })
          .catch(function(err) {
            if (err.response) {
              console.log(err.response);
            }
          });
        if (this.start == 10) {
          this.pageNumber = this.start + "-" + this.totalPage;
          this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
          this.isClick = false;
          return;
        }
      }
    },
    getPrevious() {
      this.Rank = 1;
      this.isClick = true;
      if (this.start > 0) {
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
        this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
        this.start--;
        this.pageNumber = this.start + "-" + this.totalPage;
        this.params.start = this.start;
        this.$axios
          .post(this.minerBy_url, this.params)
          .then(response => {
            this.producer = response.data.data;
            for (let i = 0; i < this.producer.length; i++) {
              this.producer[i]["Rank"] = this.Rank++;
            }
          })
          .catch(function(err) {
            if (err.response) {
              console.log(err.response);
            }
          });
        if (this.start == 0) {
          this.arrow.leftArrow.src = require("../../assets/images/shared/leftWhiteArrow.png");
          this.pageNumber = "1-" + this.totalPage;
          return;
        }
      }
    },
    getFirst() {
      this.Rank = 1;
      this.isClick = true;
      this.arrow.leftArrow.src = require("../../assets/images/shared/leftWhiteArrow.png");
      this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
      this.start = 0;
      this.pageNumber = "1-" + this.totalPage;
      this.params.start = this.start;
      this.$axios
        .post(this.minerBy_url, this.params)
        .then(response => {
          this.producer = response.data.data;
          for (let i = 0; i < this.producer.length; i++) {
            this.producer[i]["Rank"] = this.Rank++;
          }
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
      return;
    },
    getLast() {
      this.isClick = true;
      this.Rank = 1;
      this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
      this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
      this.start = this.totalPage - 1;
      this.pageNumber = this.totalPage + "-" + this.totalPage;
      this.params.start = this.start;
      this.$axios
        .post(this.minerBy_url, this.params)
        .then(response => {
          this.producer = response.data.data;
          for (let i = 0; i < this.producer.length; i++) {
            this.producer[i]["Rank"] = this.Rank++;
          }
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
      return;
    },
    setClickValue(data) {
      this.$router.push({
        path: "/producer/ProducerInfo",
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
.producer {
  width: 100%;
  height: 100%;
  .data-table {
    .table-ul {
      .title {
        padding-left: 18px;
        padding-top: 10px;
        border-bottom: 2px solid #000;
      }
      li {
        .addr {
          cursor: pointer;
          color: #f26522;
        }
      }
    }
    .apex-pagination {
      width: 100%;
      height: 40px;
      padding: 10px 35px;
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
