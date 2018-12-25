<template>
  <div class="home clearboth">
    <div class="top-modul clearboth">
      <div class="overview apex-modul wallet-modul">
        <p class="apex-title">Wallet</p>
      </div>
    </div>
    <div class="bottom-modul clearboth">
      <div class="block apex-modul fl">
        <p class="apex-title">Transfers <span>
            <router-link to="/transactions">ALL</router-link>
          </span></p>
        <ul class="apex-list">
          <vue-scroll :ops="ops">
            <li
              v-for="(item,index) in blocks"
              :key="index"
            >
              <div>
                <div class="top">
                  <p>Block {{item.height}}</p>
                  <span>{{item.size}} Bytes</span>
                </div>
                <div class="bottom">
                <router-link to="/transactions/TransactionsInfo">{{item.hash}}</router-link>
                  <span>{{item.age}}</span>
                </div>
              </div>
            </li>
          </vue-scroll>
        </ul>
      </div>
      <div class="transactions apex-modul fr">
        <p class="apex-title">Transactions<span>
            <router-link to="/transactions">ALL</router-link>
          </span></p>
        <ul class="apex-list">
          <vue-scroll :ops="ops">
            <li
              v-for="(item,index) in transactions"
              :key="index"
            >
              <div class="bottom">
                <router-link to="/transactions/TransactionsInfo">{{item.code}}</router-link>
                <span>{{item.time}}</span>
              </div>
            </li>
          </vue-scroll>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      ops: {},
      blocks: [
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
        },
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
        },
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
        },
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
        },
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
        },
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
        },
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
        },
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
        },
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
        },
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
        },
        {
          height: 6353170,
          age: "13 secs ago",
          size: 61,
          hash:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25"
        }
      ],
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
      ]
    };
  },
  created: function() {},
  methods: {},
  computed: {}
};
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  background: url(./../../assets/images/shared/yunshi.png) 25% 35% no-repeat;
  .bottom-modul,
  .top-modul {
    height: 49%;
  }
  .top-modul {
    margin-bottom: 2%;
  }
  .wallet-modul {
    width: 100%;
  }
}
</style>
