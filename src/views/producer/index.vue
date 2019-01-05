<template>
  <div class="producer">
    <apex-title :title="title"/>
    <apex-back-ground />
    <div class="data-table">
          <ul class="table-ul">
            <li class="row">
              <span class="col">Rank</span>
              <span class="col col-lg-6">Minter</span>
              <span class="col">Block</span>
            </li>
            <li v-for="(item,index) in producer" :key="index" class="row">
              <span class="col">{{item.Rank}}</span>
              <span class="col col-lg-6">
                <router-link to="/producer/ProducerInfo" @click.native.self="getMiner">{{item.Miner}}</router-link>
              </span>
              <span class="col">{{item.Blocks}}</span>
            </li>
          </ul>
          <Pagination />
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
    // this.getProducerList();
  },
  data() {
    return {
      title: "Producer",
      // producer: []
      producer: [
        {
          Rank: "1",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,458"
        },
        {
          Rank: "2",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,457"
        },
       {
          Rank: "3",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,456"
        },
        {
          Rank: "4",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,455"
        },
        {
          Rank: "5",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,454"
        },{
          Rank: "6",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,453"
        },{
          Rank: "7",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,456"
        },{
          Rank: "8",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,452"
        },
        {
          Rank: "9",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,451"
        },{
          Rank: "10",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,450"
        }
      ]
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
          let res = response.data.data;
          // this.producer = res;
          console.log(this.producer)
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
    getMiner(e) {
      let clickTarget = e.target.text;
      console.log(clickTarget);
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
