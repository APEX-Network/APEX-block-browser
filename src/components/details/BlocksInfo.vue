<template>
  <div class="BlocksInfo">
    <apex-title :title="title" class="title"/>
    <apex-back-ground class="bg"/>
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
            <span
              class="clol col-lg-8 transactions"
              @click="goTxBlock(height)"
            >{{transactions}}</span>
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
              <span @click="getParentBlock(parentHash)">{{parentHash}}</span>
            </span>
          </span>
        </li>
        <li class="row">
          <span class="col">
            Mined By:
            <span class="clol col-lg-8">
              <router-link to @click.native="setClickValue(minedBy)">{{minedBy}}</router-link>
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
// import Pagination from "@/components/public/Pagination.vue";
import Bus from "@/utils/bus";
import util from "@/utils/utils";
const Base58check = require("base58check");

export default {
  name: "BlocksInfo",
  components: {
    // Pagination,
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
      result: {
        type: null,
        value: null
      }
    };
  },
  created() {},
  mounted() {
    this.getClickValue();
  },
  methods: {
    goTxBlock(data) {
      this.$router.push({
        path: "/blocks/BlocksInfo/TxFBlock",
        query: {
          id: data
        }
      });
    },
    getClickValue() {
      this.result.value = this.$route.query.id; 
      if (this.result.value !== null) {
        try {
          Base58check.encode(this.result.value);
          this.result.type = "hash";
        } catch (error) {
          this.result.type = "height";
        }
        // let paramsType = typeof this.result.value;
        // console.log(paramsType);
        // console.log(this.result.value);
        // //刷新有问题
        // switch (paramsType) {
        //   case "number":
        //     this.result.type = "height";
        //     break;
        //   case "string":
        //     this.result.type = "hash";
        //     break;
        //   default:
        //     break;
        // }
        this.getBlocksInfo();
        return;
      }
    },
    setClickValue(data) {
      if (this.height !== 0 && this.height !== null) {
        this.$router.push({
        path: "/producer/ProducerInfo",
        query: {
          id: data
        }
      });

      }
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
                let serverTime = response.headers.date;
                this.height = res.height;
                this.blockHash = res.blockHash;
                this.timeStamp = util.utilMethods.toUTCtime(
                  res.timeStamp,
                  serverTime
                );
                this.transactions =
                  res.txNum + "   " + "transactions in this block";
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
                let serverTime = response.headers.date;
                if (res !== "NotFound" && res.txNum !== null) {
                  this.height = res.height;
                  this.blockHash = res.blockHash;
                  this.timeStamp = util.utilMethods.toUTCtime(
                    res.timeStamp,
                    serverTime
                  );
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
    getParentBlock(data) {
      if (this.height == 0) {
        return;
      }
      if (!!this.parentHash) {
        this.$router.push({
          query: {
            id: data
          }
        });
        this.$axios
          .get(this.url.blockHash_url + this.parentHash)
          .then(response => {
            let res = response.data.data;
            let serverTime = response.headers.date;
            this.height = res.height;
            this.timeStamp = util.utilMethods.toUTCtime(
              res.timeStamp,
              serverTime
            );
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.BlocksInfo {
  width: 100%;
  height: 100%;
  .bg {
    background: url(./../../assets/images/shared/yunshi.png) 55% 67% no-repeat;
  }
  .data-table {
    .table-ul {
      li {
        span {
          span {
            margin-right: 10%;
            float: right;
            span {
              cursor: pointer;
              color: #f26522;
              float: left;
            }
          }
          .transactions {
            cursor: pointer;
            color: #f26522;
          }
        }
      }
    }
  }
}
</style>
