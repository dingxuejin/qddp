<template>
  <div class="sides-container betweenbox">

    <div class="sides-inner centerbox">
      <transition name='fade3'
                  appear
                  @after-enter="showTop=true">
        <div class="sides-transition">
          <div class="inner-top">
            <!-- <Caption v-if="showTop"
                     leftCaption1='平均终端接单时长'
                     rightCaption1='到达现场及时率'
                     leftCaption2='终端回单率'
                     rightCaption2='工单处理情况统计'
                     @updateData='updateDataTop' /> -->
            <Caption v-if="showTop"
                     :leftCaption1='t_leftCaption1'
                     :rightCaption1='t_rightCaption1'
                     :rightCaption2='t_rightCaption2'
                     @updateData='updateDataTop' />
          </div>
          <div class="inner-bottom betweenbox"
               v-if="showTop">
            <div class="bottom-sides">
              <LeftTop ref="leftTop" />
            </div>
            <div class="bottom-sides"
                 style="padding:20px; boxSizing: border-box;">
              <RightTop ref="rightTop" />
            </div>
          </div>

        </div>
      </transition>
    </div>

    <div class="sides-inner centerbox">
      <transition name='fade4'
                  appear
                  @after-enter="showBottom=true">
        <div class="sides-transition">
          <div class="inner-top">
            <Caption v-if="showBottom"
                     :leftCaption1='b_leftCaption1'
                     :rightCaption1='b_rightCaption1'
                     :leftCaption2='b_leftCaption2'
                     @updateData='updateDataBottom' />
          </div>
          <div class="inner-bottom betweenbox"
               v-if="showBottom">
            <div class="bottom-sides">
              <LeftBottom ref="leftBottom" />
            </div>
            <div class="bottom-sides">
              <RightBottom />
            </div>
          </div>

        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import LeftTop from "./LeftTop";
import LeftBottom from "./LeftBottom";
import RightTop from "./RightTop";
import RightBottom from "./RightBottom";
import Caption from "../../../components/caption";
export default {
  components: {
    LeftTop,
    LeftBottom,
    RightTop,
    RightBottom,
    Caption
  },
  data() {
    return {
      t_leftCaption1: window.VUE_APP_Fir_L_5,
      t_rightCaption1: window.VUE_APP_Fir_L_6_1,
      t_rightCaption2: window.VUE_APP_Fir_L_6_2,
      b_leftCaption1: window.VUE_APP_Fir_L_7_1,
      b_leftCaption2: window.VUE_APP_Fir_L_7_2,
      b_rightCaption1: window.VUE_APP_Fir_L_8,
      showTop: false,
      showBottom: false
    };
  },
  methods: {
    updateDataTop(val) {
      if (val === "left1" || val === "left2") {
        this.$refs.leftTop.change(val);
      }
      if (val === "right1" || val === "right2") {
        this.$refs.rightTop.change(val);
      }
    },
    updateDataBottom(val) {
      if (val === "left1" || val === "left2") {
        this.$refs.leftBottom.change(val);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.sides-container {
  width: 2802px;
  height: 3187px;
  flex-wrap: wrap;
  .sides-inner {
    width: 2802px;
    height: 1597px;
    background: url("../../../assets/top.png") no-repeat center top,
      url("../../../assets/bottom.png") no-repeat center bottom,
      url("../../../assets/left.png") no-repeat left center,
      url("../../../assets/right.png") no-repeat right center;
    background-color: rgba(03, 11, 26, 0.8);
    .sides-transition {
      width: 2748px;
      height: 1540px;
      box-shadow: 0px 0px 30px #999 inset;
      .inner-top {
        box-sizing: border-box;
        width: 100%;
        height: 210px;
        padding-top: 15px;
      }
      .inner-bottom {
        width: 100%;
        height: calc(100% - 210px);
        .bottom-sides {
          width: calc(50% - 90px);
          height: 100%;
        }
      }
    }
  }
}
</style>
