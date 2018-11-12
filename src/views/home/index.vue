<template>
  <div class="min-height">
    <div class="main">
      <div class="chart" id="echartContainer" style="width:1100px;height:300px;"></div>
      <div class="summary clearboth">
        <div class="uchain-card" v-for="item in summary" :key="item.number">
          <div><i :class="item.icon"></i></div>
          <div class="summary-title">{{item.title}}</div>
          <div class="summary-number">{{item.number}}</div>
        </div>
      </div>
      <div class="tab">
        <div class="clearboth">
          <div class="tab-top fl">
            <span :class="{ active: isAct === 0}" @click="active(0)">Blocks</span>
            <span :class="{ active: isAct === 1}" @click="active(1)">Transactions</span>
          </div>
          <span class="fr viewall" @click="goList"> View All</span>
        </div>

        <div class="data-table blocks-table" v-show="!isShow">
          <ul class="table-ul">
            <li class="row">
              <span class="col">Height</span>
              <span class="col">Age</span>
              <span class="col">Txn</span>
              <span class="col">Miner</span>
              <span class="col">GasUsed</span>
            </li>
            <li v-for="(list,index) in blocks" :key="index" class="row">
              <span class="col">
                <router-link to='/home/blocks/details'>{{list.height}}</router-link>
              </span>
              <span class="col">{{list.age}}</span>
              <span class="col">{{list.txn }}</span>
              <span class="col">{{list.miner}}</span>
              <span class="col">{{list.gasused}}</span>
            </li>
          </ul>
          <Pagination />
        </div>
        <div class="data-table transactions-table" v-show="isShow">
          <ul class="table-ul">
            <li v-for="(list,index) in transactions" :key="index" class="row">
              <span class="col col-lg-10">
                <router-link to='/home/transactions/details'>{{list.code}}</router-link>
              </span>
              <span class="col">{{list.time }}</span>
            </li>
          </ul>
          <Pagination />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import Pagination from "@/components/public/Pagination.vue";
export default {
  name: "home",
  components: {
    Pagination
  },
  data() {
    return {
      summary: [
        {
          title: "Block Height",
          number: "867,854",
          icon: "icon-a"
        },
        {
          title: "Irreversible Block",
          number: "867,532",
          icon: "icon-b"
        },
        {
          title: "Account",
          number: "301,870",
          icon: "icon-c"
        }
      ],
      isActive: 0,
      show: 0,
      blocks: [
        {
          height: 6353170,
          age: "13 secs ago",
          txn: 61,
          miner:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          gasused: 7992394
        },
        {
          height: 6353170,
          age: "13 secs ago",
          txn: 61,
          miner:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd26",
          gasused: 7992394
        },
        {
          height: 6353170,
          age: "13 secs ago",
          txn: 61,
          miner:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd27",
          gasused: 7992394
        },
        {
          height: 6353170,
          age: "13 secs ago",
          txn: 61,
          miner:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd28",
          gasused: 7992394
        },
        {
          height: 6353170,
          age: "13 secs ago",
          txn: 61,
          miner:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd29",
          gasused: 7992394
        }
      ],
      transactions: [
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd15",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd35",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd45",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd55",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd65",
          time: "1 minute ago"
        }
      ]
    };
  },
  created: function() {},
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("echartContainer"));
    // 绘制图表
    myChart.setOption({
      title: {
        text: "Live TPS",
        x: "center",
        align: "center",
        top: 0,
      },
      color: ["#1AC8FF"],
      grid: {
        left: 20,
        right: 20,
        top: 40,
        bottom: 20,
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: [
          "10:08:00",
          "10:08:10",
          "10:08:20",
          "10:08:30",
          "10:08:40",
          "10:08:50",
          "10:09:00",
          "10:09:10",
          "10:09:20"
        ],
        axisLine: {
          show: true,
          lineStyle: {
            color: "#999"
          }
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#999"
          }
        },
        splitLine: {
          show: false
        }      
      },
      tooltip: {
        show: true,
        trigger: "axis",
        padding :  [10, 15],
        backgroundColor :'rgba(161,161,161,0.1)',
        axisPointer: {
          type: "line",
        },
        textStyle:{
          color: '#218cfe'
        }
      },
      series: [
        {
          name: "",
          data: [100, 111, 102, 123, 105, 133, 155, 146, 129, 120],
          type: "line",
          smooth: true,
          showSymbol: false,
          symbol: 'circle',     //设定为实心点
          symbolSize: 6,
          itemStyle:{
            color: '#ff0000',
          },
          lineStyle:{
            color: '#1AC8FF'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#6CD8FC"
              },
              {
                offset: 0.6,
                color: "rgb(255,255,255)"
              },
              {
                offset: 1,
                color: "rgb(255,255,255)"
              }
            ])
          }
        }
      ]
    });
  },
  methods: {
    active(num) {
      this.isActive = num;
      this.show = num;
    },
    goList() {
      if (this.isActive == 1) {
        this.$router.push({ path: "/home/transactions" });
      } else {
        this.$router.push({ path: "/home/blocks" });
      }
    }
  },
  computed: {
    isAct: function() {
      return this.isActive;
    },
    isShow: function() {
      return this.show;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.chart {
  background: #fff;
  padding-top: 20px;
  box-sizing: border-box;
}
.summary {
  margin: 0 auto;
  padding: 50px 0;
  background: #fff;
  position: relative;
  display: flex;
  .uchain-card {
    flex: 1;
    text-align: center;
    .icon-a {
      display: block;
      width: 37px;
      height: 37px;
      margin: 0 auto;
      background: url(../../assets/images/home/icon-fix.png);
    }
    .icon-b {
      display: block;
      width: 37px;
      height: 37px;
      margin: 0 auto;
      background: url(../../assets/images/home/icon-fix.png);
      background-position-y: -69px;
    }
    .icon-c {
      display: block;
      width: 37px;
      height: 37px;
      margin: 0 auto;
      background: url(../../assets/images/home/icon-fix.png);
      background-position-y: -131px;
    }
    .icon-d {
      display: block;
      width: 37px;
      height: 37px;
      margin: 0 auto;
      background: url(../../assets/images/home/icon-fix.png);
      background-position-y: -189px;
    }
    .summary-title {
      font-size: 14px;
      line-height: 2em;
      color: #999999;
    }
    .summary-number {
      font-size: 24px;
      color: #202020;
    }
  }
}
.tab {
  width: 1100px;
  margin: 20px auto;
  background: #fff;
  position: relative;
  .tab-top {
    height: 32px;
    font-size: 0;
    span {
      display: inline-block;
      width: 124px;
      line-height: 32px;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s;
      &.active,
      &:hover {
        color: #fff;
        background: #00c1ff;
      }
    }
  }
  .viewall {
    line-height: 32px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
    color: #00c1ff;
    padding-right: 30px;
  }
}
.data-table {
  padding-top: 0;
}
.blocks-table {
  li {
    span {
      &:last-of-type {
        margin-left: 50px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
