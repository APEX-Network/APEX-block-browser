<template>
  <div class="BlocksInfo">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="data-table">
      <ul class="table-ul">
        <li v-for="(value, key ,index ) in blocksInfo" :key="index" class="row">
          <span class="col">{{key}} :</span>
          <span class="col col-lg-8" v-if="key === 'producer'">
            <router-link to="/producer">{{value}}</router-link>
          </span>
          <span class="col col-lg-8" v-else-if="key === 'producerSig'">
            <router-link to="/producer/ProducerInfo">{{value}}</router-link>
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
// import eventBus from "../../utils/eventBus";
// 页面传值可以通过四种方法1.sessionStorage/localStorage;2.引入eventBus;
// 3.路由传值；4.vuex进行状态管理；

export default {
  name: "BlocksInfo",
  components: {
    Pagination,
    ApexTitle,
    ApexBackGround
  },
  created() {
    this.getClickValue();
  },
  data() {
    return {
      title: "Blocks Information",
      blocksInfo: null,
      blockHash: null
    };
  },
  mounted() {
    this.getBlocksInfo();
  },
  methods: {
    getClickValue() {
      this.blockHash = sessionStorage.getItem("clickValue");
    },
    getBlocksInfo() {
          if (this.blockHash) {
          this.$axios
            .get("/api/v1.0/blocks/blockHash/" + this.blockHash)
            .then(response => {
              this.blocksInfo = response.data.data;   
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

.BlocksInfo {
  width: 100%;
  height: 100%;
  background: url(./../../assets/images/shared/yunshi.png) 40% 45% no-repeat;
}
</style>
