<template>
  <div class="BlocksInfo">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="data-table">
      <ul class="table-ul">
        <li class="row">
          <span class="col">
            Height:
            <span class="clol col-lg-8">{{height}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            TimeStamp:
            <span class="clol col-lg-8">{{timeStamp}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            Transactions:
            <span class="clol col-lg-8">{{transactions}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            Hash:
            <span class="clol col-lg-8">{{blockHash}}</span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            Parent Hash:
            <span class="clol col-lg-8">
              <router-link to="/blocks/BlocksInfo" @click.native="getParentBlock">{{parentHash}}</router-link>
            </span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            Mined By:
            <span class="clol col-lg-8">
              <router-link to="/producer/ProducerInfo" @click.native="setClickValue">{{minedBy}}</router-link>
            </span>
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
import Bus from "./../../utils/bus";
import util from "./../../utils/utils";

export default {
  name: "BlocksInfo",
  components: {
    Pagination,
    ApexTitle,
    ApexBackGround
  },
  data() {
    return {
      title: "Blocks Information",
      url: {
        blockHash_url: "/api/v1.0/blocks/blockHash/",
        blockHeight_url: "/api/v1.0/blocks/blockHeight/"
      },
      height: null,
      timeStamp: null,
      transactions: null,
      blockHash: null,
      parentHash: null,
      minedBy: null,
      result: null
    };
  },
  mounted() {
    this.getClickValue();
  },
  methods: {
    getClickValue() {
      Bus.$on("clickValue", data => {
        this.result = JSON.parse(data);
        this.getBlocksInfo();
      });
    },
    setClickValue(e) {
      Bus.$emit("minerBy", e.target.innerHTML);
    },
    getBlocksInfo() {
      if (!!this.result) {
        let type = this.result.type;
        let params = this.result.value;
        switch (type) {
          case "hash":
            this.$axios
              .get(this.url.blockHash_url + params)
              .then(response => {
                let res = response.data.data;
                this.height = res.height;
                this.blockHash = res.blockHash;
                this.timeStamp = util.utilMethods.tierAllTime(res.timeStamp);
                this.transactions =
                  res.txNum + " " + "transactions in this block";
                this.parentHash = res.prevBlock;
                this.minedBy = res.producer;
                this.nonce = res.txNum;
              })
              .catch(function(response) {
                console.log(response);
              });
            break;
          case "height":
            this.$axios
              .get(this.url.blockHeight_url + params)
              .then(response => {
                let res = response.data.data;
                if (res !== "NotFound") {
                  this.height = res.height;
                  this.blockHash = res.blockHash;
                  this.timeStamp = util.utilMethods.tierAllTime(res.timeStamp);
                  this.transactions =
                    res.txNum + " " + "transactions in this block";
                  this.parentHash = res.prevBlock;
                  this.minedBy = res.producer;
                  this.nonce = res.txNum;
                }
              })
              .catch(function(response) {
                console.log(response);
              });
            break;
        }
      }
    },
    getParentBlock(e) {
      if (!!this.parentHash) {
        this.$axios
          .get(this.url.blockHash_url + this.parentHash)
          .then(response => {
            let res = response.data.data;
            this.height = res.height;
            this.timeStamp = util.utilMethods.tierAllTime(res.timeStamp);
            this.transactions = res.txNum + " " + "transactions in this block";
            this.blockHash = res.blockHash;
            this.parentHash = res.prevBlock;
            this.minedBy = res.producer;
          })
          .catch(function(response) {
            console.log(response);
          });
      }
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "./../../assets/css/layout";

.BlocksInfo {
  width: 100%;
  height: 100%;
  background: url(./../../assets/images/shared/yunshi.png) 40% 45% no-repeat;
  .data-table {
    .table-ul {
      li {
        span {
          span {
            margin-right: 10%;
            float: right;
          }
        }
      }
    }
  }
}
</style>
