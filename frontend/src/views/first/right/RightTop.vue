<template>
  <transition name="opacity1">
    <div class="echart-container">
      <transition name="opacity1">
        <div class="echart-container"
             v-if="show">
          <workOrderSituation :handlingTnformationData='gdclqkData' />
        </div>
      </transition>
      <transition name="opacity1">
        <div class="echart-container"
             v-if="!show">
          <timeArrival :timelinessRatioData.sync='timelinessRatioData' />
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
import { mapState } from 'vuex'
import workOrderSituation from '@/components/workOrderSituation'
import timeArrival from '@/components/timeArrival'
export default {
  components: { workOrderSituation, timeArrival },
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapState('FirstRight', ['scfx_jsl', 'gdclqk']),
    gdclqkData () {
      let gdclqk = this.gdclqk
      if (gdclqk && gdclqk.length > 0) {
        let total = {
          place: '总计',
          repairs: 0,
          complete: 0,
          averageTime: 0,
          longTime: 0
          // powerRecover: '100%'
        }
        let data = gdclqk.map(item => {
          total.repairs += item.BXZS
          total.complete += item.WCSL
          total.averageTime += item.AVG_DDXCSJ
          total.longTime += item.MAX_DDXCSJ
          return {
            place: item.NAME,
            repairs: item.BXZS,
            complete: item.WCSL,
            averageTime: item.AVG_DDXCSJ,
            longTime: item.MAX_DDXCSJ
          // powerRecover: item
          }
        })
        data.push(total)
        return data
      } else {
        return [
          {
            averageTime: 13.45,
            complete: 31,
            longTime: 31.47,
            place: '城市',
            repairs: 31
          },
          {
            averageTime: 13.18,
            complete: 18,
            longTime: 22.63,
            place: '农村',
            repairs: 18
          },
          {
            averageTime: 0,
            complete: 0,
            longTime: 0,
            place: '特殊边远山区',
            repairs: 0
          },
          {
            averageTime: 26.63,
            complete: 49,
            longTime: 54,
            place: '总计',
            repairs: 49
          }
        ]
      }
    },
    timelinessRatioData () {
      let data = [
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
      if (this.scfx_jsl) {
        if (this.scfx_jsl[0]) {
          data[0].timeliness = this.scfx_jsl[0].AVG_DDXCJSL
          data[0].overtime = this.scfx_jsl[0].CSGD
        }
        if (this.scfx_jsl[1]) {
          data[1].timeliness = this.scfx_jsl[1].AVG_DDXCJSL
          data[1].overtime = this.scfx_jsl[1].CSGD
        }
        if (this.scfx_jsl[2]) {
          data[2].timeliness = this.scfx_jsl[2].AVG_DDXCJSL
          data[2].overtime = this.scfx_jsl[2].CSGD
        }
      }
      return data
    }
  },

  methods: {
    change (val) {
      this.show = !this.show
    }
  }
}
</script>

<style lang="scss" scoped>
.echart-container {
  width: 100%;
  height: 100%;
}
</style>
