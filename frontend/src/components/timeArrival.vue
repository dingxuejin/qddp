<template>
  <!-- 到达现场及时率  1页面右边的右上 轮播1-->
  <transition name="opacity1">
    <div class="echart-container centerbox">
      <img src="../assets/ddxcjsl.gif"
           alt=""
           srcset="">

      <div class="echart-container-item item1">
        <div class="centerbox">
         <i class="iconfont icon-chengshi icon" ></i>
        </div>
        <div class="place centerbox">城市</div>
      </div>
      <div class="echart-container-item item2">
        <div class="centerbox">
           <i class="iconfont icon-nongcun icon" ></i>
        </div>
        <div class="place centerbox">农村</div>
      </div>
      <div class="echart-container-item item3">
        <div class="centerbox">
           <i class="iconfont icon-teshupianyuanshanqu icon" ></i>
        </div>
        <div class="place centerbox">偏远山区</div>
      </div>
      <div class="echart-container-right-item item4">
        <div class="text">
          <span> 及时率</span>
          <span>
            <countTo :startVal='0'
                     :endVal='timelinessRatioData[0].timeliness'
                     :duration='3000'></countTo>
            %
          </span>
        </div>
        <div class="text">
          <span>超时工单</span>
          <span>
            <countTo :startVal='0'
                     :endVal='timelinessRatioData[0].overtime'
                     :duration='3000'></countTo>
          </span>
        </div>
      </div>
      <div class="echart-container-right-item item5">
        <div class="text">
          <span> 及时率</span>
          <span>
            <countTo :startVal='0'
                    :endVal='timelinessRatioData[1].timeliness'
                     :duration='3000'></countTo>%
          </span>
        </div>
        <div class="text">
          <span>超时工单</span>
          <span>
            <countTo :startVal='0'
                     :endVal='timelinessRatioData[1].overtime'
                     :duration='3000'></countTo>
          </span>
        </div>
      </div>
      <div class="echart-container-right-item item6">
        <div class="text">
          <span> 及时率</span>
          <span>
            <countTo :startVal='0'
                    :endVal='timelinessRatioData[2].timeliness'
                     :duration='3000'></countTo>%
          </span>
        </div>
        <div class="text">
          <span>超时工单</span>
          <span>
            <countTo :startVal='0'
                    :endVal='timelinessRatioData[2].overtime'
                     :duration='3000'></countTo>
          </span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    timelinessRatioData: {
      type: Array,
      default: () => {
        return [
          {
            place: '城市',
            timeliness: 99,
            overtime: 2
          },
          {
            place: '农村',
            timeliness: 100,
            overtime: 0
          },
          {
            place: '特殊偏远山区',
            timeliness: 100,
            overtime: 0
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.echart-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  img {
    padding-top: 5%;
    width: 100%;
  }
  &-item {
    width: 270px;
    position: absolute;
    .icon {
           font-size: 60px;
           color:#01B56F;
    }
    .place {
      color: #20fafc;
      padding: 4px 0px;
      font-size: 48px;
    }
  }
  .item1 {
    top: 24%;
    left: -1%;
  }
  .item2 {
    top: 48%;
    left: -1%;
  }
  .item3 {
    top: 72%;
    left: -1%;
  }
  .item4 {
    top: 24%;
    right: 0px;
  }
  .item5 {
    top: 48%;
    right:0px;
  }
  .item6 {
    top: 72%;
    right:0px;
  }
  &-right {
    &-item {
      position: absolute;
      width: 335px;
      .text {
        >span {
          box-sizing: border-box;
          font-family: digitfont;
          font-size: 48px;
        }
        >span:nth-child(1) {
          text-align: right;
           color: #fff;
        }
        >span:nth-child(2) {
          padding-left:30px;
          text-align: left;
           color: #fbf040;
        }
      }
    }
  }
}
</style>
