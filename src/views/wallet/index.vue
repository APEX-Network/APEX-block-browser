<template>
  <div class="home clearboth">
    <div class="top-modul clearboth">
      <div class="overview apex-modul wallet-modul">
        <p class="apex-title">Wallet</p>
        <div class="flex-container1">
          <div class="flex-item1">Address</div>
          <input class="flex-item2" />
          <div class="flex-item3">CPX: 145.0125</div>
        </div>
        <div class="flex-container2">
          <div class="flex-item1">
            <router-link to="/wallet/NewWallet">NEW WALLET</router-link>
          </div>
          <div class="flex-item2">
            <router-link to="/wallet/OpenWallet">OPEN WALLET</router-link>
          </div>
          <div class="flex-item3">
            <router-link to="/wallet/Transfer">TRANSFER</router-link>
          </div>
        </div>
        <div class="flex-container3">
          <div class="flex-item1">CLOSE WALLET</div>
        </div>
      </div>
    </div>
    <div class="bottom-modul clearboth">
      <div class="block apex-modul fl">
        <p class="apex-title">
          Transfers
          <span>
            <router-link to="/transactions">ALL</router-link>
          </span>
        </p>
        <ul class="apex-list">
          <vue-scroll :ops="ops">
            <li v-for="(item,index) in blocks" :key="index">
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
        <p class="apex-title">
          Transactions
          <span>
            <router-link to="/transactions">ALL</router-link>
          </span>
        </p>
        <ul class="apex-list">
          <vue-scroll :ops="ops">
            <li v-for="(item,index) in transactions" :key="index">
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
    margin-bottom: 2%;
  }
  .bottom-modul {
    .apex-modul {
      .apex-title {
        span {
          a {
              color: #f26522;
          }
        }
        span:hover {
              box-shadow: 2px 2px 8px 2px #f26522;
          }
      }
    }
  }
  .wallet-modul {
    width: 100%;
    .apex-title {
      height: 43px;
    }
  }
  .flex-container1 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height: 30%;
    .flex-item1 {
      width: 120px;
      height: 0px;
      font-size: 18px;
      margin: 50px 0 0 30px;
    }
    .flex-item2 {
      width: 300px;
      height: 33px;
      margin: 50px 0px 0px 0px;
      line-height: 33px;
      color: aliceblue;
      background-color: rgba(255, 255, 255, 0);
      border: 1px solid #f26522;
    }
    .flex-item2:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
    }
    .flex-item3 {
      width: 220px;
      height: 35px;
      margin: 50px 0 0 95px;
      line-height: 35px;
      text-align: center;
      font-size: 22px;
    }
  }
  .flex-container2 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height: 30%;
    .flex-item1 {
      width: 135px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      border: 1px solid #f26522;
      margin: 40px 10px 0px 150px;
      a {
        color: #f26522;
      }
      a:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
    }
    .flex-item2 {
      width: 135px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      border: 1px solid #f26522;
      margin: 40px 0px 0px 19px;
      a {
        color: #f26522;
      }
      a:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
    }
    .flex-item3 {
      width: 120px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      border: 1px solid #f26522;
      margin: 40px 20px 0px 136px;
      a {
        color: #f26522;
      }
      a:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
    }
  }
  .flex-container3 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height: 30%;
    .flex-item1 {
      width: 110px;
      height: 30px;
      margin-left: 940px;
      margin-top: 20px;
      color: #f26522;
      line-height: 30px;
      text-align: center;
      border: 1px solid #f26522;
    }
  }
}
</style>
