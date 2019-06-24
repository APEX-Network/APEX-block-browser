<template>
  <div class="ProducerInfo">
    <div class="data-table">
      <ul class="table-ul">
        <li class="row title">ProducerInfo</li>
        <li class="row">
          <span class="col">
            {{Miner}}
            <span class="clo col-lg-8">{{producerInfo.Miner}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col" v-if="producerInfo.Name !== ''">
            {{Name}}
            <span class="clo col-lg-8">{{producerInfo.Name}}</span>
          </span>
        </li>

        <li class="row" v-if="producerInfo.Area !== ''">
          <span class="col">
            {{Area}}
            <span class="clo col-lg-8">{{producerInfo.Area}}</span>
          </span>
        </li>
        <li class="row" v-if="producerInfo.MAddress !== ''">
          <span class="col">
            {{mAddress}}
            <span class="clo col-lg-8">{{producerInfo.MAddress}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            {{CurrentRank}}
            <span class="clo col-lg-8">{{producerInfo.CurrentRank}}</span>
          </span>
        </li>
        <li class="row" v-if="producerInfo.Website !== ''">
          <span class="col">
            {{Website}}
            <span class="clo col-lg-8 goHome" @click="gotHome">{{producerInfo.Website}}</span>
          </span>
        </li>
        <li class="row" v-if="producerInfo.Description !== ''">
          <span class="col">
            {{Description}}
            <span class="clo col-lg-8">{{producerInfo.Description}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            {{Block}}
            <span class="clo col-lg-8">{{producerInfo.block}}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const ApexTitle = r =>
  require.ensure(
    [],
    () => r(require("@/components/public/ApexTitle")),
    "titleAndBackground"
  );
const ApexBackGround = r =>
  require.ensure(
    [],
    () => r(require("@/components/public/ApexBackGround")),
    "titleAndBackground"
  );

export default {
  name: "ProducerInfo",
  components: {
    ApexTitle,
    ApexBackGround
  },
  data() {
    return {
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
        Name: null
      },
      producer: [],
      Miner: null,
      Name: null,
      Area: null,
      mAddress: null,
      CurrentRank: null,
      Website: null,
      Description: null,
      Block: null
    };
  },
  created() {},
  mounted() {
    this.getClickValue();
    this.producer = JSON.parse(localStorage.getItem("producer"));
  },
  methods: {
    gotHome() {
      window.location.href = "https://www.apexnetwork.io/";
    },
    getClickValue() {
      this.minerBy = this.$route.query.id;
      this.getProduceInfo();
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
            this.Miner = "Miner:";
            this.Name = "Name:";
            this.Area = "Area:";
            this.mAddress = "Mailing Address:";
            this.CurrentRank = "CurrentRank:";
            this.Website = "Website:";
            this.Description = "Description:";
            this.Block = "Block:";
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
.ProducerInfo {
  width: 100%;
  height: 101%;
  padding-right: 20px;
  padding-left: 26px;
  padding-top: 44px;
  .data-table {
    background: #000;
    background: #000;
    height: 100%;
    width: 100%;
    .table-ul {
      .title {
        padding-left: 18px;
        padding-top: 10px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.07);
      }
      li {
        span {
          .goHome {
            cursor: pointer;
            color: #f26522;
          }
          span {
            float: right;
          }
        }
      }
    }
  }
}
</style>
