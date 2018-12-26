<template>
  <div class="openWallet">
    <apex-title :title="title"/>
    <apex-back-ground />
  </div>
</template>

<script>
import ApexTitle from '@/components/public/ApexTitle'
import ApexBackGround from '@/components/public/ApexBackGround'

  export default {
    name:'OpenWallet',
    props:[''],
    data () {
      return {
        title: 'Open Wallet'
      };
    },

    components: {
      ApexBackGround,
      ApexTitle
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='less' scoped>
@import './../../../assets/css/layout';
.openWallet {
  width: 100%;
  height: 100%;
  background: url(./../../../assets/images/shared/yunshi.png) 25% 35% no-repeat;
}
</style>