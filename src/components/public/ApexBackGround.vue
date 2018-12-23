<template>
<div class="apex-background">
  <div class="home clearboth">
    <div class="bottom-modul clearboth">
      <div class="block apex-modul back-ground">
      </div>
    </div>
  </div>
</div>
</template>
<script>

export default {
  name: "ApexBackGround"
};
</script>
<style scoped lang="less">
.apex-background {
  position: absolute;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  width: 1170px;
  height: calc( 100vh - 234px);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 2px 45px;
}
.home {
  width: 100%;
  height: 100%;
  .bottom-modul,
  .top-modul {
    height: 100%;
  }
  .back-ground {
    width: 100%;
  }
}
</style>
