<template>
  <div class="BlocksInfo">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="data-table">
        <ul class="table-ul">
          <li class="row">
          <span class="col">
            Height:
            <span class="clol col-lg-8">
              {{height}}
            </span>
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
              <router-link
                to="/blocks/BlocksInfo"
                @click.native="getParentBlock"
              >{{parentHash}}</router-link>
            </span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            Mined By:
            <span class="clol col-lg-8">
              <router-link to="/producer/ProducerInfo"
                @click.native="setClickValue"
              >{{minedBy}}</router-link>
            </span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            Nonce:
            <span class="clol col-lg-8">{{nonce}}</span>
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
      height: null,
      timeStamp: null,
      transactions: null,
      blockHash: null,
      parentHash: null,
      minedBy: null,
      nonce: null
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
              let res = response.data.data;
              this.height = res.height;
              this.timeStamp = res.timeStamp;
              this.transactions = res.id;
              this.parentHash = res.prevBlock;
              this.minedBy = res.producer;
              this.nonce = res.txNum;
              console.log(res);   
            })
            .catch(function(response) {
              console.log(response);
            });
          }
    },
    getParentBlock(e) {
      let parentHash = e.target.innerHTML;
      if (parentHash) {
        this.$axios
            .get("/api/v1.0/blocks/blockHash/" + parentHash)
            .then(response => {
              let res = response.data.data;
              this.height = res.height;
              this.timeStamp = res.timeStamp;
              this.transactions = res.id;
              this.blockHash = res.blockHash;
              this.parentHash = res.prevBlock;
              this.minedBy = res.producer;
              this.nonce = res.txNum;
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
