<template>
  <div class="BlocksInfo">
    <!-- <apex-back-ground /> -->
    <div class="data-table">
      <ul class="table-ul">
        <li class="row title">Blocks Information</li>
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
              <span @click="setClickValue(minedBy)">{{minedBy}}</span>
            </span>
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
import util from "@/utils/utils";
const Base58check = require("base58check");

export default {
  name: "BlocksInfo",
  components: {
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
      },
      txNum: null
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
          id: data,
          txNum: this.txNum
        }
      });
    },
    getClickValue() {
      this.result.value = this.$route.query.id;
      if (this.result.value !== null) {
        try {
          let valueLength = this.result.value.length;
          if (valueLength == 64) {
            this.result.type = "hash";
          } else {
            this.result.type = "height";
          }
        } catch (error) {
          this.result.type = "height";
        }
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
                this.txNum = res.txNum;
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
                  this.txNum = res.txNum;
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
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.BlocksInfo {
  width: 100%;
  height: 100.6%;
  padding-right: 20px;
  padding-left: 25px;
  padding-top: 44px;
  .data-table {
    background: #000;
    height: 100%;
    width: 100%;
    border-radius: 4px !important;
    .table-ul {
      .title {
        padding-left: 18px;
        height: 50px;
        line-height: 50px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.07);
      }
      li {
        span {
          span {
            margin-right: 10%;
            float: right;
            span {
              cursor: pointer;
              color: #56c4fd;
              float: left;
            }
          }
          .transactions {
            cursor: pointer;
            color: #56c4fd;
          }
        }
      }
    }
  }
}
</style>
