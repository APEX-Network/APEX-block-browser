<template>
  <div class="ProducerInfo">
    <apex-title :title="title" class="title"/>
    <apex-back-ground class="bg"/>
    <div class="data-table">
      <ul class="table-ul">
        <!-- <li v-for="(value, key ,index ) in producerInfo" :key="index" class="row">
          <span class="col">{{key}} :</span>
          <span class="col col-lg-8" v-if="key === 'webSite'">
            <router-link to="/home">{{value}}</router-link>
          </span>
          <span class="col col-lg-8" v-else>{{value}}</span>
        </li>-->
        <li class="row">
          <span class="col">
            Miner:
            <span class="clo col-lg-8">{{producerInfo.Miner}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col" v-if="producerInfo.Name !== ''">
            Name:
            <span class="clo col-lg-8">{{producerInfo.Name}}</span>
          </span>
        </li>

        <li class="row" v-if="producerInfo.Area !== ''">
          <span class="col">
            Area:
            <span class="clo col-lg-8">{{producerInfo.Area}}</span>
          </span>
        </li>
        <li class="row" v-if="producerInfo.MAddress !== ''">
          <span class="col">
            Mailing Address:
            <span class="clo col-lg-8">{{producerInfo.MAddress}}</span>
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
            <span class="clo col-lg-8">
              <router-link to @click.native="gotHome">{{producerInfo.Website}}</router-link>
            </span>
          </span>
        </li>
        <li class="row" v-if="producerInfo.Description !== ''">
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
// import Pagination from "@/components/public/Pagination.vue";
import Bus from "./../../utils/bus";

export default {
  name: "ProducerInfo",
  components: {
    // Pagination,
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
        block: null,
        MAddress: null,
        Name: null,
        flag: null
      },
      producer: []
    };
  },
  created() {},
  mounted() {
    // window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
    this.getClickValue();
    this.producer = JSON.parse(sessionStorage.getItem("producer"));
  },
  methods: {
    gotHome() {
      window.location.href = "https://www.apexnetwork.io/";
    },
    getClickValue() {
      this.minerBy = this.$route.query.id;
      // Bus.$on("minerBy", data => {
      //   this.minerBy = data;
      //   sessionStorage.setItem("refresh", data);
        this.getProduceInfo();
      //   return;
      // });
      // this.flag = sessionStorage.getItem("flag");
      // if (this.minerBy == null && this.flag == 1) {
      //   this.minerBy = sessionStorage.getItem("refresh");
      //   this.getProduceInfo();
      //   return;
      // }
    },
    getProduceInfo() {
      if (this.minerBy !== null) {
        this.$axios
          .get(this.minerBy_url + this.minerBy)
          .then(response => {
            let res = response.data.data;
            this.producerInfo.Miner = res.addr;
            this.producerInfo.Name = res.name;
            this.producerInfo.Area = res.zone;
            this.producerInfo.MAddress = res.address;
            this.producerInfo.block = res.blockCount;
            this.producerInfo.Website = res.webSite;
            this.producerInfo.Description = res.describe;
            for (let i = 0; i < this.producer.length; i++) {
              let item = this.producer[i];
              if (item.addr == this.minerBy) {
                this.producerInfo.CurrentRank = item.Rank;
              }
            }
          })
          .catch(function(response) {
            console.log(response);
          });
      }
    },
    beforeunloadHandler(e) {
      this.flag = 1;
      sessionStorage.setItem("flag", this.flag);
    }
  },
  beforeDestroy() {
    sessionStorage.setItem("refresh", null);
    sessionStorage.setItem("flag", null);
  },
  destroyed() {
    window.removeEventListener("beforeunload", e =>
      this.beforeunloadHandler(e)
    );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.ProducerInfo {
  width: 100%;
  height: 100%;
  .bg {
    background: url(./../../assets/images/shared/yunshi.png) 75% 93% no-repeat;
  }
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
