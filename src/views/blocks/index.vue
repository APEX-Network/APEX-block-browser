<template>
  <div class="home clearboth">
    <div class="bottom-modul clearboth">
      <div class="block apex-modul block-modul">
        <p class="apex-title">Blocks</p>
        <div class="data-table">
          <ul class="table-ul">
            <li class="row">
              <span class="col">Height</span>
              <span class="col col-lg-6">Hash Code</span>
              <span class="col">Age</span>
              <span class="col">Txn</span>
              <span class="col">Miner</span>
            </li>
            <li v-for="(item,index) in dataLIst" :key="index" class="row">
              <span class="col">{{item.height}}</span>
              <span class="col col-lg-6">
                <router-link to="/home/blocks/details">{{item.hashCode}}</router-link>
              </span>
              <span class="col">{{item.age}}</span>
              <span class="col">{{item.txn}}</span>
              <span class="col">{{item.miner}}</span>
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
  name: "blocks",
  components: {
    Pagination
  },
  data() {
    return {
      dataLIst: [
        {
          height: "6353170",
          hashCode:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          age: 18,
          txn: 20,
          miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7"
        },
        {
          height: "6353170",
          hashCode:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          age: 18,
          txn: 20,
          miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7"
        },
        {
          height: "6353170",
          hashCode:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          age: 18,
          txn: 20,
          miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7"
        },
        {
          height: "6353170",
          hashCode:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          age: 18,
          txn: 20,
          miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7"
        },
        {
          height: "6353170",
          hashCode:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          age: 18,
          txn: 20,
          miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7"
        },
        {
          height: "6353170",
          hashCode:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          age: 18,
          txn: 20,
          miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7"
        },
        {
          height: "6353170",
          hashCode:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          age: 18,
          txn: 20,
          miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7"
        },
        {
          height: "6353170",
          hashCode:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          age: 18,
          txn: 20,
          miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7"
        }
      ]
    };
  }
};
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  .bottom-modul,
  .top-modul {
    height: 100%;
  }
  .top-modul {
    margin-bottom: 2%;
  }
  .block-modul {
    width: 100%;
  }
}
// 列表公用样式
.data-table {
    width: 100%;
    padding: 20px 30px 0;
    box-sizing: border-box;
    overflow-y: auto;
    .table-ul {
        width: 100%;
        max-width: 100%;
        border-top: #333333 1px solid;
        &>li {
            &.row{
                margin: 0;
                color: #ebebeb;
            }
            border-bottom: #333333 1px solid;
            &>span {
                line-height: 40px;
                height: 40px;
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
                    color: #333333;
                    font-family: "Semibold";
                }
            }
        }
    }
}
</style>
