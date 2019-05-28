<template>
  <transition name='opacity1'>
    <div class="echart-container">
      <div class="statisticsInfoWrap">
        <div class="item"
             v-for="(o,i) in newStatisticsInfo"
             :key="i">
          <Cube :width="o.width"
                :height="o.height"
                :iconname="o.iconname"
                :iconColor="o.iconColor"
                :iconSize="o.iconSize"
                :textname="o.textname"
                :nameSize="o.nameSize"
                :number="o.number"
                :numSize="o.numSize"
                :numColor="o.numColor"
                :danwei="o.danwei"
                :danweiSize="o.danweiSize" />
          <div class="borderStyle"
               v-if="i!=4"></div>
        </div>
      </div>
      <div class="barWrap">
        <Bar :aDate="newOption" />
      </div>

    </div>
  </transition>

</template>
<script>
import { mapState } from 'vuex'
import Cube from '../../../components/cube'
import Bar from '@/components/Bar'
export default {
  components: { Bar, Cube },
  data () {
    return {
      // status: 'left1',
      // 投诉工单统计数据
      statisticsInfo: [
        {
          width: 240,
          height: 390,
          iconname: 'icon-fuwu',
          iconColor: '#C936C6',
          iconSize: 63,
          textname: '服务投诉',
          nameSize: 57,
          number: 0,
          numSize: 99,
          numColor: '#C936C6',
          danwei: '个',
          danweiSize: 57
        },
        {
          width: 240,
          height: 390,
          iconname: 'icon-yingye',
          iconColor: '#23E7AD',
          iconSize: 63,
          textname: '营业投诉',
          nameSize: 57,
          number: 0,
          numSize: 99,
          numColor: '#23E7AD',
          danwei: '个',
          danweiSize: 57
        },
        {
          width: 240,
          height: 390,
          iconname: 'icon-gongdiansuo',
          iconColor: '#1491F9',
          iconSize: 63,
          textname: '供电质量',
          nameSize: 57,
          number: 0,
          numSize: 99,
          numColor: '#1595FF',
          danwei: '个',
          danweiSize: 57
        },
        {
          width: 240,
          height: 390,
          iconname: 'icon-songdian',
          iconColor: '#F2765D',
          iconSize: 63,
          textname: '停送电投诉',
          nameSize: 57,
          number: 0,
          numSize: 99,
          numColor: '#F2765D',
          danwei: '个',
          danweiSize: 57
        },
        {
          width: 240,
          height: 390,
          iconname: 'icon-jianshe-',
          iconColor: '#FFDE00',
          iconSize: 63,
          textname: '电网建设',
          nameSize: 57,
          number: 0,
          numSize: 99,
          numColor: '#FFDE00',
          danwei: '个',
          danweiSize: 57
        }
      ]
    }
  },
  computed: {
    ...mapState('SecondRight', ['tsgdqy', 'tsgdlx']),
    newOption () {
      let data = [
        {
          dress: '直供',
          value: 754
        },
        {
          dress: '黄岛',
          value: 340
        },
        {
          dress: '即墨',
          value: 244
        },
        {
          dress: '平度',
          value: 315
        },
        {
          dress: '莱西',
          value: 162
        },
        {
          dress: '胶州',
          value: 150
        }
      ]
      if (this.tsgdqy && this.tsgdqy.length > 0) {
        data = this.tsgdqy.map(item => {
          return {
            dress: item.ORG_NAME,
            value: item.GDSL
          }
        })
      }
      return data
    },
    newStatisticsInfo () {
      let statisticsInfo = this.statisticsInfo
      if (this.tsgdlx && this.tsgdlx.length > 0) {
        let obj = {}
        this.tsgdlx.forEach(item => {
          obj[item.TSLX] = item.GDSL
        })
        statisticsInfo[0].number = obj['服务投诉']
        statisticsInfo[1].number = obj['营业投诉']
        statisticsInfo[2].number = obj['供电质量']
        statisticsInfo[3].number = obj['停送电投诉']
        statisticsInfo[4].number = obj['电网建设']
      }
      return statisticsInfo
    }
  },
  methods: {
    // change (val) {
    //   this.status = val
    // }
  }
}
</script>

<style lang="scss" scoped>
.echart-container {
  width: 100%;
  height: 100%;
  .statisticsInfoWrap {
    padding:0 30px;
    height: 390px;
    display: flex;
    justify-content: center;
    align-items: center;
    .item {
      width: 520px;
      height: 390px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-right: 4px;
      .borderStyle {
        width: 2px;
        height: 100%;
        position: absolute;
        right: -5px;
        top: 0;
        background: linear-gradient(
          to bottom,
          #071934 0%,
          #1592fa 50%,
          #071934 100%
        );
      }
    }
  }
  .barWrap {
    width: 100%;
    height: calc(100% - 390px);
    .echarts {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
