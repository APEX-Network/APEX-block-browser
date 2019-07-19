<template>
  <div class="producer">
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
          <span class="col col-lg-8 addr" @click="setClickValue(item.addr)">{{item.addr}}</span>
          <span class="col">{{item.votes}}</span>
          <span class="col">{{item.blockCount}}</span>
        </li>
      </ul>
      <div class="apex-pagination">
        <div class="pagination-content">
          <a class="first" @click="getFirst()">First</a>
          <img
            ref="left"
            class="prev"
            @click="isPrevious && getPrevious()"
            src="../../assets/images/shared/leftWhiteArrow.png"
            alt
          />
          <span class="list-number">{{pageNumber}}</span>
          <img
            ref="right"
            class="next"
            @click="isNext && getNext()"
            src="../../assets/images/shared/rightArrow.png"
            alt
          />
          <a class="last" @click="getLast()">Last</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/utils/utils";
const PublicNav = r =>
  require.ensure(
    [],
    () => r(require("@/components/publicnav/index")),
    "Producer"
  );
const PublicFooter = r =>
  require.ensure(
    [],
    () => r(require("@/components/publicfooter/index")),
    "Producer"
  );
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
      start: 1,
      pageNumber: null,
      arrow: {
        leftArrow: null,
        rightArrow: null
      },
      isNext: true,
      isPrevious: false,
      totalPage: null,
      point: null,
      count: []
    };
  },
  mounted() {
    this.getInstance();
    this.getProducerList();
    // const timer = setInterval(() => {
    //   this.getProducerList();
    // }, 1500);
    // const timer2 = setInterval(() => {
    //   clearInterval(timer);
    // }, 60000);
    // this.$once("hook:beforeDestroy", () => {
    //   clearInterval(timer, timer2);
    // });
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
          this.count = [];
          this.producer = [];
          this.Rank = 1;
          let res = response.data.data;
          for (let i = 0; i < res.length; i++) {
            const element = res[i];
            res[i]["Rank"] = this.Rank++;
            let amount = res[i].votes;
            let result = amount.toString().indexOf(".");
            if (result > -1) {
              let pointLength = amount.toString().split(".")[1].length;
              if (pointLength > 2) {
                element["votes"] =
                  amount.toString().split(".")[0] +
                  "." +
                  amount
                    .toString()
                    .split(".")[1]
                    .substring(0, 2);
              }
              if (pointLength <= 2) {
                element["votes"] = amount;
              }
            }
            if (result == -1) {
              element["votes"] = amount;
            }
          }
          this.count = util.utilMethods.cutArray(res, 10);
          localStorage.setItem("producer", JSON.stringify(res));
          this.producer = this.count[0];
          if (this.count.length >= 10) {
            this.totalPage = 10;
            this.pageNumber = "1-" + this.totalPage;
          }
          if (this.count.length < 10) {
            this.pageNumber = "1-" + this.count.length;
            if (this.totalPage == 1) {
              this.isNext = false;
              this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
            }
          }
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    },
    getNext() {
      if (this.start < 10 && this.isClick == true && this.count.length > 1) {
        this.isPrevious = true;
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
        this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
        this.start++;
        this.pageNumber = this.start + "-" + this.count.length;
        this.producer = this.count[this.start - 1];
        if (this.start == this.count.length) {
          this.pageNumber = this.start + "-" + this.count.length;
          this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
          this.isNext = false;
          return;
        }
      }
    },
    getPrevious() {
      if (this.start > 0) {
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
        this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
        this.start--;
        this.pageNumber = this.start + "-" + this.count.length;
        this.producer = this.count[this.start - 1];
        if (this.start == 1) {
          this.arrow.leftArrow.src = require("../../assets/images/shared/leftWhiteArrow.png");
          this.pageNumber = "1-" + this.count.length;
          this.isPrevious = false;
          this.isNext = true;
          return;
        }
      }
    },
    getFirst() {
      if (this.count.length > 1) {
        this.isNext = true;
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftWhiteArrow.png");
        this.arrow.rightArrow.src = require("../../assets/images/shared/rightArrow.png");
        this.start = 1;
        this.pageNumber = this.start + "-" + this.count.length;
        this.producer = this.count[this.start - 1];
      } else {
        return;
      }
    },
    getLast() {
      if (this.count.length > 1) {
        this.isNext = true;
        this.isPrevious = true;
        this.arrow.leftArrow.src = require("../../assets/images/shared/leftArrow.png");
        this.arrow.rightArrow.src = require("../../assets/images/shared/rightWhiteArrow.png");
        this.start = this.count.length;
        this.pageNumber = this.start + "-" + this.count.length;
        this.producer = this.count[this.start - 1];
      } else {
        return;
      }
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
  height: 100.6%;
  padding-right: 20px;
  padding-left: 25px;
  padding-top: 44px;
  width: 100%;
  .data-table {
    background: #000;
    height: 100%;
    border-radius: 4px 4px 4px 4px;
    .table-ul {
      .title {
        padding-left: 18px;
        height: 50px;
        line-height: 50px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.07);
      }
      li {
        margin: 0;
        color: #ebebeb;
        height: 50px;
        .addr {
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
              color: #56c4fd;
            }
          }
        }
      }
    }
  }
}
</style>
