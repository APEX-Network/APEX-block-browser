<template>
  <div class="AccountInfo">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="data-table transactions-details">
      <ul class="table-ul">
        <li v-for="(value, key ,index ) in accountInfo" :key="index" class="row">
          <span class="col">{{key}} :</span>
          <span class="col col-lg-8" v-if="key === 'Address'" ref="address">
            {{value}}
            <i @click="Copy(index)"></i>
          </span>
          <span class="col col-lg-8" v-else>{{value}}</span>
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
                <router-link to="/transactions/TransactionsInfo">{{list.code}}</router-link>
              </div>
            </span>
            <span class="col">{{list.time }}</span>
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

export default {
  name: "AccountInfo",
  components: {
    Pagination,
    ApexTitle,
    ApexBackGround
  },
  data() {
    return {
      title: "AccountInfo Information",
      accountInfo: null,
      transactions: []
    };
  },
  mounted() {
    this.getAccountInfo();
  },
  methods: {
    Copy(index) {
      let getCopyText = this.details.Address;
      this.doCopy(getCopyText);
    },
    doCopy(val) {
      this.$copyText(val).then(
        function(e) {
          // alert('Copied')
          // console.log(e)
        },
        function(e) {
          // alert('Can not copy')
          // console.log(e)
        }
      );
    },
    getAccountInfo() {
      this.$axios
        .post("/api/v1.0/accounts/account", {
          address: "AP3BQP7LvRknVwKR7aZHqcWHF684gPM8hBj"
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "./../../../assets/css/layout";
.AccountInfo {
  width: 100%;
  height: 100%;
  background: url(./../../../assets/images/shared/yunshi.png) 50% 65% no-repeat;
  .uchain-box {
    padding-top: 95px;
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
              background: url(./../../../assets/images/shared/icon-fix.png) left
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
