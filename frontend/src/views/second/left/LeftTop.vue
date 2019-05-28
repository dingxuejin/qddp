<template>
  <div style="width:100%;height:100%;">
    <transition name='opacity1'>
      <div class="echart-container"
           key="1"
           v-if="status==='left1'">
        <!-- 光伏社会效应 -->
        <PhotovoltaicSocialEffect :gfshxy='newGfshxy'/>
      </div>

      <div class="echart-container"
           key="2"
           v-else>
        <!-- 光伏总量统计 -->
        <PhotovoltaicStatistics :gfzlzs='newGfzlzs'/>
      </div>
    </transition>
  </div>

</template>
<script>
import { mapState } from 'vuex'
// 光伏社会效应
import PhotovoltaicSocialEffect from '@/components/PhotovoltaicSocialEffect.vue'
// 光伏总量统计
import PhotovoltaicStatistics from '@/components/PhotovoltaicStatistics.vue'
export default {
  components: {
    PhotovoltaicSocialEffect,
    PhotovoltaicStatistics
  },
  data () {
    return {
      status: 'left1'
    }
  },
  computed: {
    ...mapState('SecondLeft', ['gfzlzs', 'gfshxy']),
    newGfzlzs () {
      let gfzlzs = {

        ljjrsl: 0,
        ljzjrl: 0,
        ydzgfh: 0,
        ydzjrl: 0,
        ljydl: 0,
        ljfdl: 0

      }
      if (this.gfzlzs && this.gfzlzs.length > 0) {
        gfzlzs.ljjrsl = this.gfzlzs[0].LJJRSL
        gfzlzs.ljzjrl = this.gfzlzs[0].LJZJRL
        gfzlzs.ydzgfh = this.gfzlzs[0].QWYDZGFH
        gfzlzs.ydzjrl = this.gfzlzs[0].QWYDGFZJRL
        gfzlzs.ljydl = this.gfzlzs[0].QWNDLJYDL
        gfzlzs.ljfdl = this.gfzlzs[0].QWNDLJFDL
      }
      return gfzlzs
    },
    newGfshxy () {
      let gfshxy = {
        no2: 0,
        so2: 0,
        co2: 0,
        c: 0
      }
      if (this.gfshxy && this.gfshxy.length > 0) {
        gfshxy.no2 = this.gfshxy[0].NO2
        gfshxy.so2 = this.gfshxy[0].SO2
        gfshxy.co2 = this.gfshxy[0].CO2
        gfshxy.c = this.gfshxy[0].JYBZM
      }
      return gfshxy
    }
  },
  methods: {
    change (val) {
      this.status = val
    }
  }
}
</script>
<style lang="scss" scoped>
.echart-container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  .echarts {
    width: 100%;
    height: 100%;
  }
}
</style>
