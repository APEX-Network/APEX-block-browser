
<template>
  <div class="TransactionsInfo">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="data-table transactions-details">
      <ul class="table-ul">
        <!-- <li
          v-for="(value, key ,index ) in transactionsInfo"
          :key="index"
          :class="['row', {'li-inputdata': key === 'Input Data' }]"
        >
          <span class="col">{{key}} :</span>
          <span class="col col-lg-8" v-if="(key === 'From') || (key === 'To') ">
            <router-link
              to="/transactions/TransactionsInfo/AccountInfo"
              @click.native="setClickValue"
            >{{value}}</router-link>
          </span>
          <span class="col col-lg-8" v-else-if="key === 'nonce'">
            <router-link to="/blocks/BlocksInfo">{{value}}</router-link>
          </span>
          <span
            v-else-if="key === 'Input Data'"
            :class="['col col-lg-8', {'span-inputdata': key === 'Input Data' }]"
          >
            <i></i>
            {{value}}
          </span>
          <span class="col col-lg-8" v-else>{{value}}</span>
        </li>
        </ul>-->
        <li :class="['row', {'li-inputdata': key === 'Input Data' }]">
          <span class="col">
            TxHash:
            <span>{{txHash}}</span>
          </span>
        </li>
        <li :class="['row', {'li-inputdata': key === 'Input Data' }]">
          <span class="col">
            TxReceipt Status:
            <span class="success">Success</span>
          </span>
        </li>
        <li :class="['row', {'li-inputdata': key === 'Input Data' }]">
          <span class="col">
            Block Height:
            <span>{{txHash}}</span>
          </span>
        </li>
        <li :class="['row', {'li-inputdata': key === 'Input Data' }]">
          <span class="col">
            Block Hash:
            <span>{{txHash}}</span>
          </span>
        </li>
        <li :class="['row', {'li-inputdata': key === 'Input Data' }]">
          <span class="col">
            TimeStamp:
            <span>{{txHash}}</span>
          </span>
        </li>
        <li :class="['row', {'li-inputdata': key === 'Input Data' }]">
          <span class="col">
            From:
            <span>{{txHash}}</span>
          </span>
        </li>
        <li :class="['row', {'li-inputdata': key === 'Input Data' }]">
          <span class="col">
            To:
            <span>{{txHash}}</span>
          </span>
        </li>
        <li :class="['row', {'li-inputdata': key === 'Input Data' }]">
          <span class="col">
            Value:
            <span>{{txHash}}</span>
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
  name: "TransactionsInfo",
  components: {
    Pagination,
    ApexTitle,
    ApexBackGround
  },
  data() {
    return {
      title: "Transactions Information",
      transactionsInfo: null,
      txHash: null,
      clickValue: null
      // transactionsInfo: {
      //   TxHash:
      //     "0x6e1e6ce40242e82ddsfsdfsdfsafasfsadsdfsdfsdfsadfsdaffsdfsdfsfasd",
      //   "TxReceipt Status": "Success",
      //   "Block Height": "6353170(1 block confirmation)",
      //   // 'Block Hash': '0x6e1e6ce40242e82ddsfsdfsdfsafasfsadsdfsdfsdfsadfsdaffsdfsdfsfasd',
      //   TimeStamp: "55 mins ago (Sep-18-2018 07:33:22 AM +UTC)",
      //   From: "UCgDinSCgoU5DaA6PfwQKzm5kXEVtkQjbKR",
      //   To: "UCZS7ZNZK3a8zYkzcJVc3bd17JhJ2SFJu7a",
      //   Value: "0x6e1e6 CPX"
      // }
    };
  },
  created() {
    this.getClickValue();
  },
  mounted() {
    this.getTransactionsInfo();
  },
  methods: {
    getClickValue() {
      this.txHash = this.$route.params.clickValue;
      // this.txHash = this.$route.query.clickValue;
      console.log("路由传参" + this.txHash);
    },
    setClickValue(e) {
      this.clickValue = e.target.innerHTML;
      this.$router.push({
        name: "AccountInfo",
        params: {
          clickValue: this.clickValue
        }
      });
    },
    getTransactionsInfo() {
      if (this.txHash) {
        this.$axios
          .get("/api/v1.0/transactions/" + this.txHash)
          .then(response => {
            console.log(response);
            this.transactionsInfo = response.data.data;
          })
          .catch(function(response) {
            console.log(response);
          });
      }
    }
  },
  watch: {
    $route: "getClickValue"
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "./../../assets/css/layout";
.TransactionsInfo {
  width: 100%;
  height: 100%;
  background: url(./../../assets/images/shared/yunshi.png) 50% 65% no-repeat;
  .data-table {
    .table-ul {
      li {
        span {
          .success {
              margin-right:52.5%;
              float: right;
            }
          span {
            margin-right: 10%;
            float: right;
            a {
              margin-left: 33%;
            }
          }
        }
      }
    }
  }
}
</style>
