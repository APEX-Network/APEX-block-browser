<template>
  <div class="ProducerInfo">
    <apex-title :title="title"/>
    <apex-back-ground />
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
import ApexBackGround from "@/components/public/ApexBackGround.vue"
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
      producerInfo: {
        'Miner' : '0x6e1e6ce40242e82d',
        'Area':'Shanghai China',
        'Current Rank': '1',
        'Website': 'htt://apex.com',
        'Description' : 'No',
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "./../../../assets/css/layout";
.ProducerInfo {
  width: 100%;
  height: 100%;
  background: url(./../../../assets/images/shared/yunshi.png) 75% 95% no-repeat;
}
</style>
