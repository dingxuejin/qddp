<template>
  <div class="first-container betweenbox">
    <!-- 左边部分 -->
    <div>
      <left v-if="pageIndex===1" />
      <secondLeft v-if="pageIndex===2" />
    </div>
    <div>
      <!-- 中间部分 -->
      <center />
    </div>
    <div>
      <!-- 右边部分 -->
      <right v-if="pageIndex===1" />
      <secondRight v-if="pageIndex===2" />
    </div>
    <div class="centerbox reload-container"
         v-if='isReload!==0'>
      <div>
        <span>{{isReload}}秒后优化页面内存</span>
      </div>
    </div>
  </div>

</template>
<script>
import { mapState, mapMutations } from 'vuex'
import left from './first/left/leftcontainer.vue'
import secondLeft from './second/left/leftcontainer.vue'
import center from './first/center/centercontainer.vue'
import right from './first/right/rightcontainer.vue'
import secondRight from './second/right/rightcontainer.vue'
export default {
  components: {
    left,
    secondLeft,
    center,
    right,
    secondRight
  },
  data () {
    return {
      changeIndex: 0,
      isReload: 0
    }
  },
  computed: {
    ...mapState('Page', ['pageIndex'])
  },
  mounted () {
    this.changePage()
  },
  destroyed () {
    clearInterval(this.time)
    this.time = null
  },
  methods: {
    ...mapMutations('Page', ['setPageIndex']),
    changePage () {
      if (this.time) {
        clearInterval(this.time)
        this.time = null
      }
      this.time = setInterval(() => {
        this.changeIndex += 1
        if (this.changeIndex % 20 === 0) {
          // 所有页面重新刷新防止内存溢出累加
          this.changeIndex = 0
          this.isReload = 5
          let time = setInterval(() => {
            if (this.isReload <= 0) {
              clearInterval(time)
              time = null
              window.location.reload()
            } else {
              this.isReload--
            }
          }, 1000)
        } else {
          this.setPageIndex()
        }
      }, window.VUE_APP_pageTime)
    }
  }
}
</script>

<style lang="scss" scoped>
.first-container {
  position: relative;
  font-family: SimHei;
  transform-origin: 0% 0%;
  width: 11520px;
  height: 3240px;
  color: #fff;
  background: #000;
  box-sizing: border-box;
  .reload-container {
    position: absolute;
    z-index: 2;
    top: 0px;
    left: 0px;
    width:100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    font-size: 90px;
    align-items: flex-end;
    padding:200px;
    box-sizing: border-box;
  }
}
</style>
