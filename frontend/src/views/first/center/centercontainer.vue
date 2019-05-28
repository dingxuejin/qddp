<template>
  <div class="center-con centerbox">
    <Center />
  </div>
</template>
<script>
import Center from './index.vue'
export default {
  components: { Center }
}
</script>

<style lang="scss" scoped>
.center-con {
  width: 5720px;
  height: 3240px;
  padding: 40px 0px;
  // background: url("../../../assets/centerbg.png") no-repeat center center;
  // background-size: 100% 100%;
  color: #fff;
  box-sizing: border-box;
}
</style>
