<template>
<div class="background">
  <div class="home clearboth">
    <div class="bottom-modul clearboth">
      <div class="block apex-modul block-modul">
      </div>
    </div>
  </div>
</div>
</template>
<script>

export default {
  name: "BackGround"
};
</script>
<style scoped lang="less">
.background {
  position: absolute;
  top: 20px;
  left: 52%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  width: 1170px;
  height: calc( 100vh - 130px);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 40px 45px;
}
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
</style>
