<template>
  <div class="ProducerInfo">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="data-table">
      <ul class="table-ul">
        <li v-for="(value, key ,index ) in producerInfo" :key="index" class="row">
          <span class="col">{{key}} :</span>
          <span class="col col-lg-8" v-if="key === 'Website'">
            <router-link to="/home">{{value}}</router-link>
          </span>
          <span class="col col-lg-8" v-else>{{value}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ApexTitle from "@/components/public/ApexTitle.vue";
import ApexBackGround from "@/components/public/ApexBackGround.vue";
import Pagination from "@/components/public/Pagination.vue";

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
      minerBy: null,
      producerInfo: {
        Miner: null,
        Area: null,
        CurrentRank: null,
        Website: null,
        Description: null
      }
    };
  },
  created() {
    this.getClickValue();
  },
  mounted() {
    this.getProduceInfo();
  },
  methods: {
    getClickValue() {
      this.minerBy = sessionStorage.getItem("clickValue");
      // console.log(this.minerBy);
    },
    getProduceInfo() {
      if (this.minerBy) {
        this.$axios
          .get("/api/v1.0/minerInfo/" + this.minerBy)
          .then(response => {
            let res = response.data.data;
            this.producerInfo.Miner = res.address;
            this.producerInfo.Area = res.zone;
            this.producerInfo.CurrentRank = res.rank;
            this.producerInfo.Website = res.nodeUrl;
            this.producerInfo.Description = res.describe;
            // console.log(res);
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
}
</style>
