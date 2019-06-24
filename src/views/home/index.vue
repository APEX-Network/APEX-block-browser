<template>
  <div class="home clearboth">
    <div class="top-modul clearboth">
      <over-view/>
      <live-tps/>
    </div>
    <div class="bottom-modul clearboth">
      <blocks-list/>
      <home-transactions-list/>
    </div>
  </div>
</template>
<script>
const LiveTps = r =>
  require.ensure([], () => r(require("@/views/home/LiveTps")), "Home");
const OverView = r =>
  require.ensure([], () => r(require("@/views/home/OverView")), "Home");
const BlocksList = r =>
  require.ensure([], () => r(require("@/components/list/BlocksList")), "Home");
const HomeTransactionsList = r =>
  require.ensure([], () => r(require("./HomeTransactionsList")), "Home");

export default {
  name: "home",
  components: {
    LiveTps,
    OverView,
    BlocksList,
    HomeTransactionsList
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {}
};
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  .bottom-modul,
  .top-modul {
    padding-top: 45px;
    padding-right: 20px;
    padding-bottom: 15px;
    padding-left: 27px;
  }
  .bottom-modul {
    padding-top: 10px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-left: 27px;
  }
}
</style>
