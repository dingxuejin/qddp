<template>
  <div class="right-container centerbox">
    <Right />
  </div>
</template>
<script>
import Right from './index.vue'
export default {
  components: { Right }
}
</script>

<style lang="scss" scoped>
.right-container {
  width: 2900px;
  height: 3240px;
  padding-right: 80px;
  font-family: SimHei;
  transform-origin: 0% 0%;
  color: #fff;
  // background: url("../../../assets/rightbg.png") no-repeat center center;
  // background-size: 100% 100%;
  box-sizing: border-box;
}
</style>
