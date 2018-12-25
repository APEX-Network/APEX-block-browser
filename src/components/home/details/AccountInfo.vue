<template>
  <div class="AccountInfo">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="data-table transactions-details">
      <ul class="table-ul">
        <li v-for="(value, key ,index ) in details" :key="index" class="row">
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
              <router-link to="/transactions/TransactionsInfo">{{list.code}}</router-link>
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
      transactions: [
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd15",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd35",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd45",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd55",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd65",
          time: "1 minute ago"
        }
      ],
      details:
        {
          'Address' : 'AP8AP8iUQsnpbT73LkpBS8oNzSRGJAvBoVE',
          "Balance" : '5.36123375 UCN'
        }
    };
  },
  methods:{
    Copy(index){
      let getCopyText = this.details.Address;  
      this.doCopy(getCopyText)
    },
    doCopy(val) {
        this.$copyText(val).then(function (e) {
          // alert('Copied')
          // console.log(e)
        }, function (e) {
          // alert('Can not copy')
          // console.log(e)
        })
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
  .uchain-box{
    padding-top: 95px;
}
}


</style>
