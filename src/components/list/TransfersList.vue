<template>
  <div class="block apex-modul fl">
    <p class="apex-title">
      Transfers
      <router-link to="/transactions">
        <span>ALL</span>
      </router-link>
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
</template>

<script>
export default {
  name: "TransfersList",
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
      ]
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='less' scoped>
.bottom-modul {
  .apex-modul {
    .apex-title {
      a {
        display: inline;
        span {
          color: #f26522;
        }
      }
      span:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
    }
  }
}
</style>