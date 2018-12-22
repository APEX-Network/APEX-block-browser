<template>
  <div class="min-height">
    <div class="main">
       <div class="uchain-box">
        <div class="uchain-title">
          <p>Transactions Information</p>
        </div>
        <div class="data-table transactions-details">
          <ul class="table-ul" >
            <li v-for="(value, key ,index ) in details" :key="index"  :class="['row', {'li-inputdata': key === 'Input Data' }]">
              <span class="col">{{key}} :</span>
              <span class="col col-lg-8" v-if="(key === 'From') || (key === 'To') ">
                <router-link to='/home/transactions/account_detail'>{{value}}</router-link>
              </span> 
              <span class="col col-lg-8" v-else-if="key === 'Block Height'">
                <router-link to="/home/blocks/details">{{value}}</router-link>
              </span>
              <span v-else-if="key === 'Input Data'"  :class="['col col-lg-8', {'span-inputdata': key === 'Input Data' }]">
                <i></i>{{value}}
              </span>
              <span class="col col-lg-8"  v-else>{{value}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/public/Pagination.vue";
export default {
  name: "transactions",
  components: {
    Pagination
  },
  data() {
    return {
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
          'Block Height': "6353170",
          'Age': 18,
          'Txn': 20,
          'TimeStamp':'55 mins ago (Sep-18-2018 07:33:22 AM +UTC)',
          'Transactions': '61 transactions  in this block',
          'From': '0x3591fcb0ae47862ffdef0e00a42786d03629ffbae12390ae7c0e1e5468c0d65e',
          'To' : '0x25c9bb623bfe86a15127b95365256533042a84a993e5db1e315f50a03290e44b',
          'Mined By': '0xea674fdde714fd979de3edf0f56aa9716b898ec8  in 3 secs',
          'Size' :'17996 bytes',
          'Gas Used' :'7,992,394',
          'Nonce' : '0x6e1e6ce40242e82d',
          "Input Data" : '0px'
        }
    };
  },
  methods:{

  }
};
</script>

<style scoped lang="less">

.transactions-details{
  padding-bottom: 50px;
  .table-ul{
    & >li{
      span{
        line-height: 36px;
        height: 36px;
        &:last-of-type{
          padding-left: 0;
        }
      }
      
      &:first-of-type {
          span {
              color: #666666;
              font-family: "Regular";
          }
      }
      &.li-inputdata{
        padding: 8px 0;
        .span-inputdata{
          box-sizing: border-box;
          background: #f9f9f9;
          height: 88px;
          i{
            display: inline-block;
            width: 15px;
          }
        }
      }
    }
  }
}
</style>
