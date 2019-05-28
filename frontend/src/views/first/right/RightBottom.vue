<template>
  <transition name='opacity1'>
    <div class="echart-container">
      <div class="betweenbox title">
        <div>
          故障停电
        </div>
        <div>
          计划停电
        </div>
      </div>
      <div>
        <div class="betweenbox inner-container">
          <div class="inner-left">
            <div class="startbox">
              <span class="iconfont icon-transformer-area spanicon green"></span>
              <span>影响台区</span>
            </div>
            <div class="centerbox">
              <span class="number green">
                <countTo :startVal='0'
                         :endVal='newGztd.YXTQ'
                         :duration='3000'></countTo>
              </span>
              <span>个</span>
            </div>
          </div>
          <div class="inner-center">

          </div>
          <div class="inner-right">
            <div class="startbox margintop">
              <span class="iconfont icon-transformer-area spanicon blue"></span>
              <span>影响台区</span>
            </div>
            <div class="centerbox">
              <span class="number blue">
                <countTo :startVal='0'
                         :endVal='newJhtd.YXTQ'
                         :duration='3000'></countTo>
              </span>
              <span>个</span>
            </div>
          </div>
        </div>
        <div class="betweenbox inner-container">
          <div class="inner-left">
            <div class="startbox">
              <span class="iconfont icon-gaoya spanicon green"></span>
              <span>影响低压用户</span>
            </div>
            <div class="centerbox">
              <span class="number green">
                <countTo :startVal='0'
                         :endVal='newGztd.YXDYYH'
                         :duration='3000'></countTo>
              </span>
              <span>户</span>
            </div>
          </div>
          <div class="inner-center">

          </div>
          <div class="inner-right">
            <div class="startbox margintop">
              <span class="iconfont icon-gaoya spanicon blue"></span>
              <span>影响低压用户</span>
            </div>
            <div class="centerbox">
              <span class="number blue">
                <countTo :startVal='0'
                         :endVal='newJhtd.YXDYYH'
                         :duration='3000'></countTo>
              </span>
              <span>户</span>
            </div>
          </div>
        </div>
        <div class="betweenbox inner-container">
          <div class="inner-left">
            <div class="startbox">
              <span class="iconfont icon-diya spanicon green"></span>
              <span>影响重要用户</span>
            </div>
            <div class="centerbox">
              <span class="number green">
                <countTo :startVal='0'
                       :endVal='newGztd.YXGYYH'
                         :duration='3000'></countTo>
              </span>
              <span>户</span>
            </div>
          </div>
          <div class="inner-center">

          </div>
          <div class="inner-right">
            <div class="startbox margintop">
              <span class="iconfont icon-diya spanicon blue"></span>
              <span>影响重要用户</span>
            </div>
            <div class="centerbox">
              <span class="number blue">
                <countTo :startVal='0'
                      :endVal='newJhtd.YXGYYH'
                         :duration='3000'></countTo>
              </span>
              <span>户</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('FirstRight', ['jhtd', 'gztd']),
    newJhtd () {
      let jhtd = this.jhtd
      if (jhtd && jhtd.length > 0) {
        return jhtd[0]
      } else {
        return {
          YXTQ: 0,
          YXDYYH: 0,
          YXGYYH: 0
        }
      }
    },
    newGztd () {
      let gztd = this.gztd
      if (gztd && gztd.length > 0) {
        return gztd[0]
      } else {
        return {
          YXTQ: 0,
          YXDYYH: 0,
          YXGYYH: 0
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.echart-container {
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
      width: calc(50% - 2px);
      height: 100%;
      padding: 0px 10px;
      .spanicon {
        font-size: 80px;
        margin: 0px 4px;
      }
      .number {
        font-family: digitfont;
        font-size: 100px;
        padding: 0px 20px;
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
      width: 4px;
      height: 100%;
      background: linear-gradient(to bottom, #031a46, #0c579b, #031a46);
    }
  }
  .title {
    width: 100%;
    > div {
      width: 50%;
      text-align: center;
      font-size: 90px;
      line-height: 120px;
    }
  }
}
</style>
