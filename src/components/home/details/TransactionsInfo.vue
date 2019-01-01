<template>
  <div class="TransactionsInfo">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="data-table transactions-details">
      <ul class="table-ul">
        <li
          v-for="(value, key ,index ) in produceerInfo"
          :key="index"
          :class="['row', {'li-inputdata': key === 'Input Data' }]"
        >
          <span class="col">{{key}} :</span>
          <span class="col col-lg-8" v-if="(key === 'rrom') || (key === 'to') ">
            <router-link to="/transactions/TransactionsInfo/AccountInfo">{{value}}</router-link>
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
  mounted () {
     this.axios.get('/api/v1.0/transactions/2b59cb1a1ffaef43392d27f0ab2dac8fb8cee2082629f9145f427d2c128ee766')
    .then(response => {
        console.log(response.data)
        this.produceerInfo = response.data.data
        // this.txHashs = response.data.data.txHashs
        // console.log(this.txHashs)
    })
    .catch(function (response){
	    console.log(response);//发生错误时执行的代码
  })
  },
  data() {
    return {
      title: "Transactions Information",
      produceerInfo: null
      // produceerInfo: {
      //     'TxHash': '0x6e1e6ce40242e82ddsfsdfsdfsafasfsadsdfsdfsdfsadfsdaffsdfsdfsfasd',
      //     'TxReceipt Status': 'Success',
      //     'Block Height': "6353170(1 block confirmation)",
      //     'TimeStamp':'55 mins ago (Sep-18-2018 07:33:22 AM +UTC)',
      //     'From': '0x3591fcb0ae47862ffd',
      //     'To' : '0x25c9bb623bfe86a1512',
      //     'Value' : '0x6e1e6 CPX',
      // }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "./../../../assets/css/layout";
.TransactionsInfo {
  width: 100%;
  height: 100%;
  background: url(./../../../assets/images/shared/yunshi.png) 50% 65% no-repeat;
}
</style>
