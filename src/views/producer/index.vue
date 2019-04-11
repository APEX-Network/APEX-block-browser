<template>
  <div class="producer">
    <apex-title :title="title" class="title"/>
    <!-- <apex-back-ground/> -->
    <div class="data-table">
      <ul class="table-ul">
        <li class="row">
          <span class="col">Rank</span>
          <span class="col col-lg-8">Account</span>
          <span class="col">Votes</span>
          <span class="col">Blocks</span>
        </li>
        <li v-for="(item,index) in producer" :key="index" class="row">
          <span class="col">{{item.Rank}}</span>
          <span class="col col-lg-8">
            <router-link
              to="/producer/ProducerInfo"
              @click.native.self="setClickValue"
            >{{item.address}}</router-link>
          </span>
          <span class="col">{{item.votes}}</span>
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
// import ApexBackGround from "@/components/public/ApexBackGround.vue";
import Pagination from "@/components/public/Pagination.vue";
import Bus from "./../../utils/bus";
import utils from "./../../utils/utils";
export default {
  name: "Producer",
  components: {
    PublicNav,
    PublicFooter,
    ApexTitle,
    // ApexBackGround,
    Pagination
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
      }
    };
  },
  mounted() {
    this.getProducerList();
    // const timer = setInterval(() => {
    //   this.getProducerList();
    // }, 1500);
    // this.$once("hook:beforeDestroy", () => {
    //   clearInterval(timer);
    // });
  },
  methods: {
    getProducerList() {
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
    },
    setClickValue(e) {
      Bus.$emit("minerBy", e.target.innerHTML);
    },
    offListener() {
      Bus.$off("minerBy");
    }
  },
  beforeDestroy() {
    this.offListener();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "./../../assets/css/layout";
.producer {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1) !important;
  background: url(./../../assets/images/shared/yunshi.png) 75% 93% no-repeat;
  .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-indent: 30px;
    box-sizing: border-box;
    border-radius: 0px 0px 4px 4px;
    border-bottom: 2px solid #000;
  }
  .data-table {
    height: 93%;
  }
}
</style>
