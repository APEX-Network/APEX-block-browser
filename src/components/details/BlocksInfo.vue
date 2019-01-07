<template>
  <div class="BlocksInfo">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="data-table">
        <ul class="table-ul">
          <li :class="['row']">
          <span class="col">
            Height:
            <span class="bHeight">
              {{height}}
            </span>
          </span>
        </li>
        <li :class="['row']">
          <span class="col">
            TimeStamp:
            <span class="timeStamp">{{timeStamp}}</span>
          </span>
        </li>
        <li :class="['row']">
          <span class="col">
            Transactions:
            <span class="transactions">{{transactions}}</span>
          </span>
        </li>
        <li :class="['row']">
          <span class="col">
            Hash:
            <span class="hash">{{blockHash}}</span>
          </span>
        </li>
        <li :class="['row']">
          <span class="col">
            Parent Hash:
            <span class="parentHash">
              <router-link
                to="/blocks/BlocksInfo"
                @click.native="setClickValue"
              >{{parentHash}}</router-link>
            </span>
          </span>
        </li>
        <li :class="['row']">
          <span class="col">
            Mined By:
            <span class="mindedBy">
              <router-link to="/producer/ProducerInfo"
                @click.native="setClickValue"
              >{{minedBy}}</router-link>
            </span>
          </span>
        </li>
        <li :class="['row']">
          <span class="col">
            Nonce:
            <span class="nonce">{{nonce}}</span>
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
              // this.blockHash = res.blockHash;
              this.parentHash = res.prevBlock;
              this.minedBy = res.producer;
              this.nonce = res.txNum;
              console.log(res);   
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
          .bHeight {
            margin-right: 59.5%;
          }
          .timeStamp {
            margin-right: 54.6%;
          }
          .transactions {
            margin-right: 47%;
          }
          .hash {
            margin-right: 15.6%;
          }
          .parentHash {
            margin-right: 17.5%;
          }
          .mindedBy {
            margin-right: 15.5%;
          }
          .nonce {
            margin-right: 63.5%;
          }
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
