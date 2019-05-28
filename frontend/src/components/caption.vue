<template>
  <div class="caption centerbox">
    <transition name="capbgleft"
                mode="out-in"
                appear>
      <span v-if="textShowLeft1"
            :key="1"
            class="textleft">{{leftCaption1}}</span>
      <span v-if="textShowLeft2"
            :key="2"
            class="textleft">{{leftCaption2}}</span>
      <span v-if="textShowLeft3"
            :key="3"
            class="textleft">{{leftCaption3}}</span>
    </transition>
    <!-- <transition name="capbgleft"
                appear
                @after-enter="textShowLeft1=true">
      <img v-if="bgShow"
           src="../assets/captionleft.png"
           class="captionleft"
           alt=""
           srcset="">
    </transition> -->
    <transition name="capcenter"
                appear
                @after-enter="textShowLeft1=true;textShowRight1=true;">
      <img src="../assets/captioncenter.gif"
           class="captioncenter"
           alt=""
           srcset="">
    </transition>
    <!-- <transition name="capbgright"
                appear
                @after-enter="textShowRight1=true">
      <img v-if="bgShow"
           src="../assets/captionright.png"
           class="captionright"
           alt=""
           srcset="">
    </transition> -->
    <transition name="capbgright"
                mode="out-in"
                appear>
      <span v-if="textShowRight1"
            :key="4"
            class="textright">{{rightCaption1}}</span>
      <span v-if="textShowRight2"
            :key="5"
            class="textright">{{rightCaption2}}</span>
      <span v-if="textShowRight3"
            :key="6"
            class="textright">{{rightCaption3}}</span>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    leftCaption1: {
      type: String,
      default: '左标题'
    },
    // 轮播替换左标题
    leftCaption2: {
      type: String,
      default: ''
    },
    leftCaption3: {
      type: String,
      default: ''
    },
    rightCaption1: {
      type: String,
      default: '右标题'
    },
    rightCaption2: {
      type: String,
      default: ''
    },
    rightCaption3: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      bgShow: false,
      textShowLeft1: false,
      textShowLeft2: false,
      textShowLeft3: false,
      textShowRight1: false,
      textShowRight2: false,
      textShowRight3: false
    }
  },
  mounted () {
    this.changeLeftText()
  },
  destroyed () {
    if (this.time1) {
      clearInterval(this.time1)
      this.time1 = null
    }
    if (this.time2) {
      clearInterval(this.time2)
      this.time2 = null
    }
  },
  methods: {
    changeLeftText () {
      if (this.leftCaption2 || this.leftCaption3) {
        let random = Math.random() * 3000 + window.VUE_APP_captionTime
        if (this.time1) {
          clearInterval(this.time1)
          this.time1 = null
        }
        this.time1 = setInterval(() => {
          if (this.textShowLeft1 && this.leftCaption2) {
            this.textShowLeft1 = false
            this.textShowLeft3 = false
            this.textShowLeft2 = true
            this.$emit('updateData', 'left2')
          } else if (this.textShowLeft2 && this.leftCaption3) {
            this.textShowLeft1 = false
            this.textShowLeft2 = false
            this.textShowLeft3 = true
            this.$emit('updateData', 'left3')
          } else {
            this.textShowLeft1 = true
            this.textShowLeft2 = false
            this.textShowLeft3 = false
            this.$emit('updateData', 'left1')
          }
        }, random)
      }
      if (this.rightCaption2 || this.rightCaption3) {
        let random = Math.random() * 3000 + window.VUE_APP_captionTime
        if (this.time2) {
          clearInterval(this.time2)
          this.time2 = null
        }
        this.time2 = setInterval(() => {
          if (this.textShowRight1 && this.rightCaption2) {
            this.textShowRight1 = false
            this.textShowRight2 = true
            this.textShowRight3 = false
            this.$emit('updateData', 'right2')
          } else if (this.textShowRight2 && this.rightCaption3) {
            this.textShowRight1 = false
            this.textShowRight2 = false
            this.textShowRight3 = true
            this.$emit('updateData', 'right3')
          } else {
            this.textShowRight3 = false
            this.textShowRight2 = false
            this.textShowRight1 = true
            this.$emit('updateData', 'right1')
          }
        }, random)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.caption {
  width: 100%;
  height: 100%;
  font-size: 72px;
  overflow: hidden;
  // .captioncenter {
    // width: 270px;
    // height: 44px;
  // }
  .captionleft,
  .captionright {
    position: relative;
  }
  .captionleft {
    right: -55px;
  }
  .captionright {
    left: -55px;
  }
  .textright,
  .textleft {
    display: inline-block;
    width: 1200px;
    min-width:  1200px;
    max-width:  1200px;
    height: 102px;
    line-height: 102px;
    text-align: center;
    position: relative;
    color: #00ffff;
    white-space: nowrap;
  }
  .textleft {
    right: -240px;
    background:  url("../assets/captionleft.png") no-repeat
      center center;
  }
  .textright {
    left:  -240px;
    background:  url("../assets/captionright.png") no-repeat
      center center;
  }
}
.capcenter-enter-active {
  animation: mycenter 500ms;
}
@keyframes mycenter {
  0% {
    height: 0px;
  }
  100% {
    height: 34px;
  }
}
.capbgleft-enter-active {
  animation: capbgleft 500ms;
}
.capbgleft-leave-active {
  animation: capbgleftleave 500ms;
}
@keyframes capbgleft {
  0% {
    transform: translateX(-1500px);
  }
  40% {
    transform: translateX(-20px);
  }
  70% {
    transform: translateX(-50px);
  }
  100% {
    transform: translateX(0px);
  }
}
@keyframes capbgleftleave {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-1500px);
  }
}
.capbgright-enter-active {
  animation: capbgright 500ms alternate;
}
.capbgright-leave-active {
  animation: capbgrightLeave 500ms;
}
@keyframes capbgright {
  0% {
    transform: translateX(1500px);
  }
  50% {
    transform: translateX(20px);
  }
  80% {
    transform: translateX(50px);
  }
  100% {
    transform: translateX(0px);
  }
}
@keyframes capbgrightLeave {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(1500px);
  }
}
</style>
