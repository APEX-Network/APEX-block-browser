<template>
  <div class="AccountInfo">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="data-table transactions-details">
      <ul class="table-ul">
        <li class="row">
          <span class="col">Address</span>
          <span class="col col-lg-8" ref="address">
            {{accountTransaction_param.address}}
            <i @click="Copy(index)"></i>
          </span>
        </li>
        <li class="row">
          <span class="col">Balance</span>
          <span class="col col-lg-8">{{Balance}} CPX</span>
        </li>
      </ul>
    </div>
    <div class="uchain-box">
      <div class="apex-title">
        <p>Transactions</p>
      </div>
      <div class="data-table transactions-table">
        <ul class="table-ul">
          <li v-for="(list,index) in transactions" :key="index" class="row">
            <span class="col col-lg-10">
              <div class="bottom">
                <router-link
                  to="/transactions/TransactionsInfo"
                  @click.native="setRefBlockHash"
                >{{list.txHash}}</router-link>
              </div>
            </span>
            <span class="col">{{ list.refBlockTime }}</span>
          </li>
        </ul>
        <Pagination/>
      </div>
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
  name: "AccountInfo",
  components: {
    Pagination,
    ApexTitle,
    ApexBackGround
  },
  created() {},
  data() {
    return {
      title: "AccountInfo Information",
      accountInfo_url: "/api/v1.0/accounts/account",
      accountTransaction_url: "/api/v1.0/transactions/account/transactionList",
      accountTransaction_param: {
        start: 0,
        pageSize: 7,
        address: null
      },
      accountInfo: null,
      transactions: [],
      refBlockTime: null,
      Balance: null
    };
  },
  mounted() {
    this.getClickValue();
    setTimeout(() => {
      this.getAccountInfo();
      this.getAccountTransactionInfo();
    });
    const timer = setInterval(() => {
      this.getAccountInfo();
      this.getAccountTransactionInfo();
    }, 1500);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
  methods: {
    Copy(index) {
      let getCopyText = this.details.Address;
      this.doCopy(getCopyText);
    },
    doCopy(val) {
      this.$copyText(val).then(
        function(e) {
          // console.log(e)
        },
        function(e) {
          // console.log(e)
        }
      );
    },
    getClickValue() {
      Bus.$on("accountValue", data => {
        this.accountTransaction_param.address = data;
        console.log(this.accountTransaction_param.address);
      });
    },
    getAccountInfo() {
      this.$axios
        .post(this.accountInfo_url, {
          address: this.accountTransaction_param.address
        })
        .then(response => {
          let res = response.data.data;
          this.Balance = res.balance;
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    },
    getAccountTransactionInfo() {
      this.$axios
        .post(this.accountTransaction_url, this.accountTransaction_param)
        .then(response => {
          let res = response.data.data;
          this.transactions = res;
          let time;
          for (let i = 0; i < this.transactions.length; i++) {
            let element = this.transactions[i];
            time = util.utilMethods.getSec(element.refBlockTime);
            element.refBlockTime = time;
          }
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    },
    setRefBlockHash(e) {
      Bus.$emit("txHash", e.target.innerHTML);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "./../../assets/css/layout";
.AccountInfo {
  width: 100%;
  height: 100%;
  background: url(./../../assets/images/shared/yunshi.png) 50% 65% no-repeat;
  .uchain-box {
    padding-top: 90px;
    .apex-title {
      padding-left: 30px;
    }
    .data-table {
      width: 100%;
      padding: 0px 12px 0px;
      box-sizing: border-box;
      overflow-y: auto;
      .table-ul {
        width: 100%;
        max-width: 100%;
        margin-top: 20px;
        border-top: #0000 1px solid;
        & > li {
          &.row {
            margin: 0;
            color: #ebebeb;
            height: 40px;
          }
          border-bottom: #333333 1px solid;
          & > span {
            line-height: 35px;
            height: 35px;
            box-sizing: border-box;
            padding: 0 8px 0 0px;
            vertical-align: middle;
            color: #ebebeb;
            overflow: hidden;
            white-space: nowrap;
            .bottom {
              margin-left: 20px;
              padding-left: 40px;
              box-sizing: border-box;
              font-family: "Regular";
              background: url(./../../assets/images/shared/icon-fix.png) left
                5px no-repeat;
              a {
                max-width: 300px;
                overflow: hidden;
                white-space: nowrap;
                color: #f26522;
                margin-top: 5px;
              }
            }
          }
          &:first-of-type {
            span {
              color: #ebebeb;
              font-family: "Semibold";
            }
          }
        }
      }
    }
  }
}
</style>
