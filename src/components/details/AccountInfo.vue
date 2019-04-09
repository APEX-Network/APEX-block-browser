<template>
  <div class="AccountInfo">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="data-table transactions-details">
      <ul class="table-ul">
        <li class="row">
          <span class="col">Address</span>
          <span class="col col-lg-8" ref="address">
            <i>
              {{accountTransaction_param.address}}
              <img
                @click="Copy(index)"
                style="cursor: pointer; padding-left: 10px;"
                src="./../../assets/images/copy.png"
                alt
              >
            </i>
          </span>
        </li>
        <li class="row">
          <span class="col">Balance</span>
          <span class="col col-lg-8">{{Balance}} CPX</span>
        </li>
      </ul>
    </div>
    <div class="apex-box">
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
        pageSize: 6,
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
    const timer = setInterval(() => {
      this.getAccountTransactionInfo();
    }, 1500);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
  methods: {
    Copy(index) {
      let getCopyText = this.accountTransaction_param.address;
      this.doCopy(getCopyText);
    },
    doCopy(val) {
      this.$copyText(val).then(
        function(e) {
          alert("拷贝成功!");
        },
        function(e) {}
      );
    },
    getClickValue() {
      Bus.$on("accountValue", data => {
        this.accountTransaction_param.address = data;
        sessionStorage.setItem("refresh", data);
        this.getAccountInfo();
        this.getAccountTransactionInfo();
      });
      if (this.accountTransaction_param.address == null) {
        this.accountTransaction_param.address = sessionStorage.getItem(
          "refresh"
        );
        this.getAccountInfo();
        this.getAccountTransactionInfo();
      }
    },
    getAccountInfo() {
      this.$axios
        .post(this.accountInfo_url, {
          address: this.accountTransaction_param.address
        })
        .then(response => {
          let res = response.data.data;
          let result = res.toString().indexOf(".");
          if (result == -1) {
            let pointLength = res.balance.toString().split(".")[1].length;
            if (pointLength > 8) {
              this.Balance = Number(res.balance).toFixed(8);
            } else {
              this.Balance = Number(res.balance);
            }
          }
          if (result !== -1) {
            this.Balance = Number(res.balance);
          }
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
    },
    offListener() {
      Bus.$off("txHash");
    }
  },
  beforeDestroy() {
    sessionStorage.setItem("refresh", null);
    this.offListener();
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
  .apex-box {
    padding-top: 80px;
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
        border-top: #0000 2px solid;
        & > li {
          &.row {
            margin: 0;
            color: #ebebeb;
            height: 40px;
            line-height: 40px;
          }
          & > span {
            line-height: 35px;
            height: 35px;
            box-sizing: border-box;
            padding: 0 8px 0 0px;
            vertical-align: middle;
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
                // max-width: 300px;
                // overflow: hidden;
                // white-space: nowrap;
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
