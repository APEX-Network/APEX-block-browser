<template>
  <div class="deleteWallet">
    <apex-title :title="title"/>
    <apex-back-ground />
  </div>
</template>

<script>
import ApexTitle from '@/components/public/ApexTitle'
import ApexBackGround from '@/components/public/ApexBackGround'

  export default {
    name:'DeleteWallet',
    props:[''],
    data () {
      return {
        title: 'New Wallet'
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
.deleteWallet {
  width: 100%;
  height: 100%;
  background: url(./../../../assets/images/shared/yunshi.png) 25% 35% no-repeat;
}
</style>