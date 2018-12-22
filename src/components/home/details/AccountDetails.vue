<template>
  <div class="min-height">
    <div class="main">
       <div class="uchain-box">
        <div class="uchain-title">
          <p>Account Information</p>
        </div>
        <div class="data-table transactions-details">
          <ul class="table-ul" >
            <li v-for="(value, key ,index ) in details" :key="index" class="row">
              <span class="col">{{key}} :</span>
              <span class="col col-lg-8" v-if="key === 'Address'" ref="address">{{value}} <i @click="Copy(index)"></i></span>
              <span class="col col-lg-8" v-else>{{value}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="uchain-box">
        <div class="uchain-title">
          <p>Transactions</p>
        </div>
        <div class="data-table transactions-table">
           <ul class="table-ul">
            <li v-for="(list,index) in transactions" :key="index" class="row">
              <span class="col col-lg-10">
                <router-link to="/home/transactions/details">{{list.code}}</router-link>
              </span>
              <span class="col">{{list.time }}</span>
            </li>
          </ul>
          <Pagination />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/public/Pagination.vue";
export default {
  name: "AccountDetails",
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

<style scoped lang="less">
.uchain-box{
  margin-bottom: 50px;
}
.transactions-details{
  padding-bottom: 20px;
  .table-ul{
    & >li{
      span{
        line-height: 36px;
        height: 36px;
        &:last-of-type{
          padding-left: 0;
          i{
            position: relative;
            left: 5px;
            top: 5px;
            display: inline-block;
            width: 20px;
            height: 20px; 
            cursor: pointer;
            background: url('../../../assets/images/shared/icon-fix.png') 0px -351px no-repeat ;
          }
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
          
        }
      }
    }
  }
}
</style>
