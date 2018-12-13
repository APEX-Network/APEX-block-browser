<template>
  <div class="home clearboth">
    <div class="top-modul clearboth">
      <div class="overview apex-modul fl">
        <p class="apex-title">Overview</p>
        <ul class="clearboth">
          <li>
            <p>Last Block</p>
            <p>1935566</p>
          </li>
          <li>
            <p>Max TPS</p>
            <p>463</p>
          </li>
          <li>
            <p>Daily TX</p>
            <p>1544945</p>
          </li>
          <li>
            <p>Daily Active Account</p>
            <p>46</p>
          </li>
        </ul>
      </div>
      <div class="tps apex-modul fr">
        <p class="apex-title">Live TPS</p>
        <div class="chart-box">
          <div class="chart" id="echartContainer" style="width:100%;"></div>
        </div>
      </div>
    </div>
    <div class="bottom-modul clearboth">
      <div class="block apex-modul fl">
        <p class="apex-title">Blocks <span>ALL</span></p>
        <ul class="apex-list">
          <vue-scroll :ops="ops">
            <li
              v-for="(item,index) in blocks"
              :key="index"
            >
              <div>
                <div class="top">
                  <p>Block {{item.height}}</p>
                  <span>{{item.size}} Bytes</span>
                </div>
                <div class="bottom">
                  <a href="javascript:;">{{item.hash}}</a>
                  <span>{{item.age}}</span>
                </div>
              </div>
            </li>
          </vue-scroll>
        </ul>
      </div>
      <div class="transactions apex-modul fr">
        <p class="apex-title">Transactions<span>ALL</span></p>
        <ul class="apex-list">
          <vue-scroll :ops="ops">
            <li
              v-for="(item,index) in transactions"
              :key="index"
            >
              <div class="bottom">
                <a href="javascript:;">{{item.code}}</a>
                <span>{{item.time}}</span>
              </div>
            </li>
          </vue-scroll>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "home",
  components: {},
  data() {
    return {
      ops: {},
      blocks: [
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
        },
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
        },
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
        },
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
        },
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
        },
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
        },
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
        },
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
        },
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
        },
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
        },
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
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
      color: ["#1AC8FF"],
      grid: {
        left: 10,
        right: 30,
        top: 40,
        bottom: 10,
        containLabel: true
      },
      xAxis: {
        type: "category",
        boundaryGap :false,
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
        padding :  [8, 10],
        backgroundColor :'rgba(161,161,161,0.1)',
        axisPointer: {
          type: "line",
        },
        textStyle:{
          color: '#ffffff',
          fontSize: '14px',
        },
        formatter: function (params, ticket, callback) {
          return 'TPS '+ params[0].value;
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
            color: 'rgba(242, 101, 34, .8)',
          },
          lineStyle:{
            color: '#f26522'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(255,255,255,.2)"
              },
              {
                offset: 1,
                color: "rgb(255,255,255,0)"
              }
             
            ])
          }
        }
      ]
    });
  },
  methods: {},
  computed: {}
};
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  .bottom-modul,
  .top-modul {
    height: 49%;
  }
  .top-modul {
    margin-bottom: 2%;
  }
  .tps{
    .chart-box{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      // height: 100%;
      .chart{
        height:300px;
      }
    }
  }
}
@media screen and(max-width:1366px) {
  .home{
    .tps{
      .chart-box{
        .chart{
          height: 190px;
        }
      }
    }
  }
}
</style>
