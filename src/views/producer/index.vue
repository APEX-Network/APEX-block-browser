<template>
  <div class="producer">
    <apex-title :title="title"/>
    <apex-back-ground />
    <div class="data-table">
          <ul class="table-ul">
            <li class="row">
              <span class="col">Rank</span>
              <span class="col col-lg-6">Minter</span>
              <span class="col">Block</span>
            </li>
            <li v-for="(item,index) in producer" :key="index" class="row">
              <span class="col">{{item.Rank}}</span>
              <span class="col col-lg-6">
                <router-link to="/home/blocks/details">{{item.Miner}}</router-link>
              </span>
              <span class="col">{{item.Blocks}}</span>
            </li>
          </ul>
          <Pagination />
        </div>
  </div>
</template>

<script>
import PublicNav from "@/components/publicnav/index.vue";
import PublicFooter from "@/components/publicfooter/index.vue";
import ApexTitle from "@/components/public/ApexTitle.vue";
import ApexBackGround from "@/components/public/ApexBackGround.vue";
import Pagination from "@/components/public/Pagination.vue";


export default {
  name: "Producer",
  components: {
    PublicNav,
    PublicFooter,
    ApexTitle,
    ApexBackGround,
    Pagination
  },
  data() {
    return {
      title: "Producer",
      producer: [
        {
          Rank: "1",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,458"
        },
        {
          Rank: "2",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,457"
        },
       {
          Rank: "3",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,456"
        },
        {
          Rank: "4",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,455"
        },
        {
          Rank: "5",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,454"
        },{
          Rank: "6",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,453"
        },{
          Rank: "7",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,456"
        },{
          Rank: "8",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,452"
        },
        {
          Rank: "9",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,451"
        },{
          Rank: "10",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,450"
        },
        {
          Rank: "11",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,449"
        },
        {
          Rank: "12",
          Miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7",
          Blocks: "123,448"
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.producer {
  width: 100%;
  height: 100%;
}
// .producer-title {
//   width: 100%;
//   height: 35px;
//   line-height: 35px;
//   font-size: 14px;
//   padding: 0px 45px 0px;
//   box-sizing: border-box;
//   background: rgba(255, 255, 255, 0.1);
//   border-radius: 4px;
// }
.data-table {
    width: 100%;
    padding: 0px 12px 0px;
    box-sizing: border-box;
    overflow-y: auto;
    .table-ul {
        width: 100%;
        max-width: 100%;
        border-top: #0000 1px solid;
        &>li {
            &.row{
                margin: 0;
                color: #333333;
                height: 35px;
            }
            border-bottom: #333333 1px solid;
            &>span {
                line-height: 35px;
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
                    color: #ebebeb;
                    font-family: "Semibold";
                }
            }
        }
    }
}
</style>
