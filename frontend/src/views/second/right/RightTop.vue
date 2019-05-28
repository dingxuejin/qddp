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
               v-if="i!=2"></div>
        </div>
      </div>
      <div class="barWrap">
        <Bar :aDate="newClwgdqy" />
      </div>
    </div>
  </transition>

</template>
<script>
import Cube from '../../../components/cube'
import Bar from '@/components/Bar'
import { mapState } from 'vuex'
export default {
  components: {
    Cube,
    Bar
  },
  data () {
    return {
      // 车联网工单统计数据
      statisticsInfo: [
        {
          width: 390,
          height: 300,
          iconname: 'icon-dianhua',
          iconColor: '#1491F9',
          iconSize: 63,
          textname: '95598工单',
          nameSize: 63,
          number: 0,
          numSize: 99,
          numColor: '#1595FF',
          danwei: '个',
          danweiSize: 57
        },
        {
          width: 390,
          height: 300,
          iconname: 'icon-lixian',
          iconColor: '#23E7AD',
          iconSize: 63,
          textname: '离线工单',
          nameSize: 63,
          number: 0,
          numSize: 99,
          numColor: '#23E7AD',
          danwei: '个',
          danweiSize: 57
        },
        {
          width: 390,
          height: 300,
          iconname: 'icon-guzhang',
          iconColor: '#1491F9',
          iconSize: 63,
          textname: '故障工单',
          nameSize: 63,
          number: 0,
          numSize: 99,
          numColor: '#1595FF',
          danwei: '个',
          danweiSize: 57
        }
      ]
    }
  },
  computed: {
    ...mapState('SecondRight', ['clwgdlx', 'clwgdqy']),
    newStatisticsInfo () {
      let statisticsInfo = this.statisticsInfo
      if (this.clwgdlx && this.clwgdlx.length >= 3) {
        statisticsInfo[0].number = this.clwgdlx[0].GDSL
        statisticsInfo[1].number = this.clwgdlx[1].GDSL
        statisticsInfo[2].number = this.clwgdlx[2].GDSL
      }
      return statisticsInfo
    },
    newClwgdqy () {
      let data = [
        {
          dress: '市南',
          value: 54
        },
        {
          dress: '市北',
          value: 34
        },
        {
          dress: '崂山',
          value: 24
        },
        {
          dress: '城阳',
          value: 14
        },
        {
          dress: '李沧+',
          value: 25
        }
      ]
      if (this.clwgdqy && this.clwgdqy.length > 0) {
        data = this.clwgdqy.map(item => {
          return {
            dress: item.ORG_NAME,
            value: item.GDSL
          }
        })
      }
      return data
    }
  }

}
</script>

<style lang="scss" scoped>
.echart-container {
  width: 100%;
  height: 100%;
  .statisticsInfoWrap {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    .item {
      width: 33%;
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .borderStyle {
        width: 2px;
        height: 100%;
        position: absolute;
        right: 4px;
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
    height: calc(100% - 300px);
    .echarts {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
