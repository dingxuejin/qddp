<template>
  <div class="left-container centerbox">
      <Left />
  </div>
</template>
<script>
import Left from './index.vue'
export default {
  components: { Left }
}
</script>

<style lang="scss" scoped>
.left-container {
  width: 2900px;
  height: 3240px;
  padding-left: 80px;
  font-family: SimHei;
  transform-origin: 0% 0%;
  color: #fff;
  //    background: url('../../../assets/leftbg.png') no-repeat center center;
  // background-size: 100% 100%;
  box-sizing: border-box;
}
</style>
