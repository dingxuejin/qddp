<template>
  <!-- 光伏总量统计  -->
  <div class="echart-container-main">
    <div class="betweenbox inner-container">
      <div class="inner-left">
        <div class="startbox">
          <span class="iconfont icon-join spanicon green"></span>
          <span>累积接入数量</span>
        </div>
        <div class="centerbox">
          <span class="number green">
            <countTo :startVal='0'
                     :endVal='gfzlzs.ljjrsl||0'
                      :decimals='2'
                     :duration='3000'></countTo>
          </span>
          <span>个</span>
        </div>
      </div>
      <div class="inner-center">

      </div>
      <div class="inner-right">
        <div class="startbox margintop">
          <span class="iconfont icon-zhuangjirongliang spanicon blue"></span>
          <span>累积装机容量</span>
        </div>
        <div class="centerbox">
          <span class="number blue">
            <countTo :startVal='0'
                     :endVal='gfzlzs.ljzjrl||0'
                      :decimals='2'
                     :duration='3000'></countTo>
          </span>
          <span>MW</span>
        </div>
      </div>
    </div>
    <div class="betweenbox inner-container">
      <div class="inner-left">
        <div class="startbox">
          <span class="iconfont icon-fuhe spanicon green"></span>
          <span>月度最高负荷</span>
        </div>
        <div class="centerbox">
          <span class="number green">
            <countTo :startVal='0'
                     :endVal='gfzlzs.ydzgfh||0'
                      :decimals='2'
                     :duration='3000'></countTo>
          </span>
          <span>MW</span>
        </div>
      </div>
      <div class="inner-center">

      </div>
      <div class="inner-right">
        <div class="startbox margintop">
          <span class="iconfont icon-rongliang spanicon blue"></span>
          <span>月度装机容量</span>
        </div>
        <div class="centerbox">
          <span class="number blue">
            <countTo :startVal='0'
                     :endVal='gfzlzs.ydzjrl||0'
                      :decimals='2'
                     :duration='3000'></countTo>
          </span>
          <span>MW</span>
        </div>
      </div>
    </div>
    <div class="betweenbox inner-container">
      <div class="inner-left">
        <div class="startbox">
          <span class="iconfont icon-dian spanicon green"></span>
          <span>年度累积用电量</span>
        </div>
        <div class="centerbox">
          <span class="number green">
            <countTo :startVal='0'
                     :endVal='gfzlzs.ljydl||0'
                      :decimals='2'
                     :duration='3000'></countTo>
          </span>
          <span>亿kWh</span>
        </div>
      </div>
      <div class="inner-center">

      </div>
      <div class="inner-right">
        <div class="startbox margintop">
          <span class="iconfont icon-fadianliang spanicon blue"></span>
          <span>年度累积发电量</span>
        </div>
        <div class="centerbox">
          <span class="number blue">
            <countTo :startVal='0'
             :decimals='2'
                     :endVal='gfzlzs.ljfdl||0'
                     :duration='3000'></countTo>
          </span>
          <span>亿kWh</span>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
export default {
  props: {
    gfzlzs: {
      type: Object,
      default () {
        return {
          ljjrsl: 0,
          ljzjrl: 0,
          ydzgfh: 0,
          ydzjrl: 0,
          ljydl: 0,
          ljfdl: 0
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.echart-container-main {
  width: 100%;
  height: 100%;
  .inner-container {
    padding: 30px 0px;
    box-sizing: border-box;
    width: 100%;
    height: 33.33%;
    font-size: 72px;
    .inner-left,
    .inner-right {
      > div {
        padding: 20px 0px;
      }
      width: calc(50% - 6px);
      height: 100%;
      padding: 0px 10px;
      .spanicon {
        font-size: 90px;
        margin: 0px 4px;
      }
      .number {
        font-family: digitfont;
        font-size: 100px;
        padding: 0px 6px;
      }
      .green {
        color: #23e7ad;
      }
      .blue {
        color: #1595ff;
      }
    }
    .inner-center {
      border-radius: 50%;
      width: 12px;
      height: 100%;
      background: linear-gradient(to bottom, #031a46, #0c579b, #031a46);
    }
  }
}
</style>
