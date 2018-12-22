<template>
  <div class="transactions">
    <p class="transactions-title">Transactions</p>
    <apex-back-ground />
    <div class="data-table">
          <ul class="table-ul">
            <li v-for="(list,index) in transactions" :key="index" class="row">
              <span class="col col-lg-10">
                <router-link to='/home/transactions/details'>{{list.code}}</router-link>
              </span>
              <span class="col">{{list.time }}</span>
            </li>
          </ul>
          <Pagination />
        </div>
  </div>
</template>

<script>
import PublicNav from "@/components/publicnav/index.vue";
import PublicFooter from "@/components/publicfooter/index.vue";
import ApexBackGround from "@/components/public/ApexBackGround.vue";
import Pagination from "@/components/public/Pagination.vue";

export default {
  name: "Transactions",
  components: {
    PublicNav,
    PublicFooter,
    ApexBackGround,
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
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd55",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd55",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd55",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd55",
          time: "1 minute ago"
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.transactions {
  width: 100%;
  height: 100%;
}
.transactions-title {
  width: 100%;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  padding: 0px 45px 0px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
.data-table {
    width: 100%;
    padding: 0px 35px 0px;
    box-sizing: border-box;
    overflow-y: auto;
    .table-ul {
        width: 100%;
        max-width: 100%;
        border-top: #0000 5px solid;
        &>li {
            &.row{
                margin: 0;
                color: #333333;
                height: 35px;
            }
            border-bottom: #333333 1px solid;
            &>span {
                line-height: 35px;
                height: 35px;
                box-sizing: border-box;
                padding: 0 8px 0 20px;
                vertical-align: middle;
                color: #ebebeb;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                a {
                    color: #ebebeb;
                    font-family: "SemiBold";
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
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
</style>
