<template>
  <div class="sides-container betweenbox">

    <div class="sides-inner centerbox">
      <transition name='fade1'
                  appear
                  @after-enter="showTop=true">
        <div class="sides-transition">
          <div class="inner-top">
            <Caption v-if="showTop"
                     :leftCaption1='t_leftCaption1'
                     :rightCaption1='t_rightCaption1' />
          </div>
          <div class="inner-bottom betweenbox"
               v-if="showTop">
            <div class="bottom-sides">
              <LeftTop />
            </div>
            <div class="bottom-sides">
              <RightTop />
            </div>
          </div>

        </div>
      </transition>
    </div>

    <div class="sides-inner centerbox">
      <transition name='fade2'
                  appear
                  @after-enter="showBottom=true">
        <div class="sides-transition">
          <div class="inner-top">
            <Caption v-if="showBottom"
                     :leftCaption1='b_leftCaption1'
                     :rightCaption1='b_rightCaption1'
                     :leftCaption2='b_leftCaption2'
                     :rightCaption2='b_rightCaption2'
                     @updateData='updateDataBottom' />
          </div>
          <div class="inner-bottom betweenbox"
               v-if="showBottom">
            <div class="bottom-sides">
              <LeftBottom ref="leftBottom" />
            </div>
            <div class="bottom-sides">
              <RightBottom ref="rightBottom" />
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
      t_leftCaption1: window.VUE_APP_Fir_L_1,
      t_rightCaption1: window.VUE_APP_Fir_L_2,
      b_leftCaption1: window.VUE_APP_Fir_L_3_1,
      b_leftCaption2: window.VUE_APP_Fir_L_3_2,
      b_rightCaption1: window.VUE_APP_Fir_L_4_1,
      b_rightCaption2: window.VUE_APP_Fir_L_4_2,
      showTop: false,
      showBottom: false
    };
  },
  methods: {
    updateDataBottom(val) {
      if (val === "left1" || val === "left2") {
        this.$refs.leftBottom.change(val);
      } else if (val === "right1" || val === "right2") {
        this.$refs.rightBottom.change(val);
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
          width: calc(50% - 25px);
          height: 100%;
        }
      }
    }
  }
}
</style>
