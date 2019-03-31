<template>
  <div class="ProducerInfo">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="data-table">
      <ul class="table-ul">
        <!-- <li v-for="(value, key ,index ) in producerInfo" :key="index" class="row">
          <span class="col">{{key}} :</span>
          <span class="col col-lg-8" v-if="key === 'webSite'">
            <router-link to="/home">{{value}}</router-link>
          </span>
          <span class="col col-lg-8" v-else>{{value}}</span>
        </li> -->
        <li class="row">
          <span class="col">
            Miner:
            <span class="clo col-lg-8">{{producerInfo.Miner}}</span>
          </span>
        </li>
         <li class="row" v-if="producerInfo.Area !== ''"> 
          <span class="col">
            Area:
            <span class="clo col-lg-8">{{producerInfo.Area}}</span>
          </span>
        </li>
         <li class="row">
          <span class="col">
            CurrentRank:
            <span class="clo col-lg-8">{{producerInfo.CurrentRank}}</span>
          </span>
        </li>
         <li class="row" v-if="producerInfo.Website !== ''">
          <span class="col">
            Website:
            <router-link to="/home">{{producerInfo.Website}}</router-link>
          </span>
        </li>
         <li class="row" v-if="producerInfo.Description !== null">
          <span class="col">
            Description:
            <span class="clo col-lg-8">{{producerInfo.Description}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            Block:
            <span class="clo col-lg-8">{{producerInfo.block}}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ApexTitle from "@/components/public/ApexTitle.vue";
import ApexBackGround from "@/components/public/ApexBackGround.vue";
import Pagination from "@/components/public/Pagination.vue";
import Bus from './../../utils/bus'

export default {
  name: "ProducerInfo",
  components: {
    Pagination,
    ApexTitle,
    ApexBackGround
  },
  data() {
    return {
      title: "Producer Information",
      minerBy_url: "/api/v1.0/minerInfo/",
      minerBy: null,
      producerInfo: {
        Miner: null,
        Area: null,
        CurrentRank: null,
        Website: null,
        Description: null,
        block: null
      }
    };
  },
  created() {},
  mounted() {
    this.getClickValue();
    setTimeout(() => {
      this.getProduceInfo();
    });
  },
  methods: {
    getClickValue() {
      Bus.$on("minerBy", data => {
        this.minerBy = data;        
      });
    },
    getProduceInfo() {
      if (!!this.minerBy) {
        this.$axios
          .get(this.minerBy_url + this.minerBy)
          .then(response => {
            let res = response.data.data;
            this.producerInfo.Miner = res.address;
            this.producerInfo.Area = res.zone;
            this.producerInfo.CurrentRank = res.votes;
            this.producerInfo.block = res.blockCount;
            this.producerInfo.Website = res.webSite;
            this.producerInfo.Description = res.describe;
          })
          .catch(function(response) {
            console.log(response);
          });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "./../../assets/css/layout";
.ProducerInfo {
 width: 100%;
  height: 100%;
  background: url(./../../assets/images/shared/yunshi.png) 75% 95% no-repeat;
  .data-table {
    .table-ul {
      li {
        span {
          span {
            float: right;
          }
        }
      }
    }
  }
}
</style>
