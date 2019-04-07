<template>
  <div class="producer">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="data-table">
      <ul class="table-ul">
        <li class="row">
          <span class="col">Rank</span>
          <span class="col col-lg-6">Account</span>
          <span class="col">Votes</span>
          <span class="col">Blocks</span>
        </li>
        <li v-for="(item,index) in producer" :key="index" class="row">
          <span class="col">{{item.Rank}}</span>
          <span class="col col-lg-6">
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
import ApexBackGround from "@/components/public/ApexBackGround.vue";
import Pagination from "@/components/public/Pagination.vue";
import Bus from "./../../utils/bus";
import utils from "./../../utils/utils";
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
            this.producer[i]['Rank'] = this.Rank++;
          }
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
      //   let producer = [
      //     {
      //         "address": "APHLU98wbCvujZc1N8ddthDNEUhJaxki2sz",
      //         "name": "创略科技",
      //         "blockCount": 0,
      //         "votes": -1,
      //         "zone": "china"
      //     },
      //     {
      //         "address": "AP8g6hZiepX4Vdvd2TS8HtoZmw8cxFioiPq",
      //         "name": "创略科技",
      //         "blockCount": 0,
      //         "votes": 0,
      //         "zone": "中国"
      //     },
      //     {
      //         "address": "AP8hKwPm8X37YnsDn47KHF7JzvRVUuMD7YH",
      //         "name": "",
      //         "blockCount": 8505,
      //         "votes": 0,
      //         "zone": ""
      //     },
      //     {
      //         "address": "APCb4FchfFUrqPjYc2LLrUbKjw6pt7pdF56",
      //         "name": "",
      //         "blockCount": 8504,
      //         "votes": 1,
      //         "zone": ""
      //     },
      //     {
      //         "address": "AP3CFsBWwVMsF2Kq39nZ4XBYZcoR1HQhKru",
      //         "name": "",
      //         "blockCount": 8506,
      //         "votes": 4,
      //         "zone": ""
      //     },
      //     {
      //         "address": "APMMCd8qWPm9QRzgspFXEBn8zGGuwrYYAJs",
      //         "name": "",
      //         "blockCount": 8505,
      //         "votes": 5,
      //         "zone": ""
      //     },
      //     {
      //         "address": "APLUskGEPT6s272kA9PVLqLVBWF6M4kZHAT",
      //         "name": "",
      //         "blockCount": 8504,
      //         "votes": 6,
      //         "zone": ""
      //     }
      // ];
      // this.producer = producer.reverse();
    },
    setClickValue(e) {
      Bus.$emit("minerBy", e.target.innerHTML);
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
