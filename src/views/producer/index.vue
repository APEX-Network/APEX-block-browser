<template>
  <div class="producer">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="data-table">
      <ul class="table-ul">
        <li class="row">
          <span class="col">Rank</span>
          <span class="col col-lg-6">Minter</span>
          <span class="col">Block</span>
        </li>
        <li v-for="(item,index) in producer" :key="index" class="row">
          <span class="col">{{item.rank}}</span>
          <span class="col col-lg-6">
            <router-link to="/producer/ProducerInfo" @click.native.self="setClickValue">{{item.address}}</router-link>
          </span>
          <span class="col">{{item.blockCount}}</span>
        </li>
      </ul>
      <Pagination/>
    </div>
  </div>
</template>

<script>
import PublicNav from "@/components/publicnav/index.vue";
import PublicFooter from "@/components/publicfooter/index.vue";
import ApexTitle from "@/components/public/ApexTitle.vue";
import ApexBackGround from "@/components/public/ApexBackGround.vue";
import Pagination from "@/components/public/Pagination.vue";

export default {
  name: "Producer",
  components: {
    PublicNav,
    PublicFooter,
    ApexTitle,
    ApexBackGround,
    Pagination
  },
  created() {},
  mounted() {
    this.getProducerList();
  },
  data() {
    return {
      title: "Producer",
      producer: [],
      minerBy: null
    };
  },
  methods: {
    getProducerList() {
      this.$axios
        .post("/api/v1.0/minerInfo/minerList", {
          start: "0",
          pageSize: "10"
        })
        .then(response => {
          this.producer = response.data.data;
          // console.log(this.producer);
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    },
    setClickValue(e) {
      sessionStorage.setItem("clickValue", e.target.innerHTML);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "./../../assets/css/layout";
.producer {
  width: 100%;
  height: 100%;
  background: url(./../../assets/images/shared/yunshi.png) 75% 95% no-repeat;
}
</style>
