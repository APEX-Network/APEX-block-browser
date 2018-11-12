<template>
  <div class="min-height">
    <div class="main">
      <div class="uchain-box">
        <div class="uchain-title">
          <p>Block Information</p>
        </div>
        <div class="data-table">
          <ul class="table-ul" >
            <li v-for="(value, key ,index ) in details" :key="index"  class="row">
              <span class="col">{{key}} :</span>
              <span class="col col-lg-8" v-if="key === 'Parent Hash'">
                <router-link to="/home/blocks/details">{{value}}</router-link>
              </span>
              <span class="col col-lg-8" v-else>{{value}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "BlocksDetails",
  components: {
  
  },
  data() {
    return {
      details:       
       {
          'Height': "6353170",
          'Age': 18,
          'Txn': 20,
          'TimeStamp':'55 mins ago (Sep-18-2018 07:33:22 AM +UTC)',
          'Transactions': '61 transactions  in this block',
          'Hash': '0x3591fcb0ae47862ffdef0e00a42786d03629ffbae12390ae7c0e1e5468c0d65e',
          'Parent Hash' : '0x25c9bb623bfe86a15127b95365256533042a84a993e5db1e315f50a03290e44b',
          'Mined By': '0xea674fdde714fd979de3edf0f56aa9716b898ec8  in 3 secs',
          'Size' :'17996 bytes',
          'Gas Used' :'7,992,394',
          'Nonce' : '0x6e1e6ce40242e82d'
        
        }
         
    };
  }
};
</script>

<style scoped lang="less">
.data-table{
  padding-bottom: 50px;
  .table-ul{
    & >li{
      span{
        line-height: 36px;
        height: 36px;
        &:last-of-type{
          padding-left: 0
        }
      }
      &:first-of-type {
          span {
              color: #666666;
              font-family: "Regular";
          }
      }
    }
  }
}

</style>
