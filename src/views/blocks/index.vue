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
            <router-link to="/blocks/BlocksInfo">{{item.height}}</router-link>
          </span>
          <span class="col col-lg-6">
            <router-link to="/blocks/BlocksInfo" @click.native="setClickValue">{{item.blockHash}}</router-link>
          </span>
          <span class="col"></span>
          <span class="col txn">{{item.txNum}}</span>
          <span class="col">{{item.producer}}</span>
        </li>
      </ul>
      <Pagination/>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/public/Pagination.vue";
import ApexBackGround from "@/components/public/ApexBackGround.vue";
import ApexTitle from "@/components/public/ApexTitle.vue";
// import eventBus from "../../utils/eventBus"

export default {
  name: "blocks",
  components: {
    Pagination,
    ApexBackGround,
    ApexTitle
  },
  mounted() {
    this.getAllBlocks();
  },
  data() {
    return {
      title: "Blocks",
      dataList: null,
      time: []
    };
  },
  methods: {
    getAllBlocks() {
      this.$axios
        .post("/api/v1.0/blocks/blockList", {
          start: "0",
          pageSize: "10"
        })
        .then(response => {
          let res = response.data.data;
          this.dataList = res;
          // console.log(this.dataList)
          for (let i = 0; i < res.length; i++) {
            this.timeStamp = res[i].timeStamp;
            let result = +new Date();
            let ti = (result - this.timeStamp) / 1000;
            this.time = ti.toFixed(1);
            let x = this.time - Math.floor(this.time);
            // console.log(x);
          }
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    },
    setClickValue(e) {
      sessionStorage.setItem('clickValue', e.target.innerHTML);
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
  }
}
</style>
