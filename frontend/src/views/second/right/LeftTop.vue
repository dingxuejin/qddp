<template>
  <transition name="opacity1">
    <div class="echart-container">
      <!-- <div class="statisticsInfoWrap">
        <div class="item"
             v-for="(o,i) in statisticsInfoComputed"
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
               v-if="i==1"></div>
        </div>
      </div> -->
      <div class="barWrap" v-if="status==='left2'">
        <Bar :aDate="newRxgdqy" />
      </div>
      <div class="xx-container" v-else>
        <!-- <Bar :aDate="newRxgdqy" /> -->
        <Rxlx  :rxgdlx='rxgdlx'/>
      </div>

    </div>
  </transition>

</template>
<script>
import { mapState } from 'vuex'
// import Cube from '../../../components/cube'
import Rxlx from '../../../components/Rxlx'
import Bar from '@/components/Bar'
export default {
  components: {
    Bar,
    Rxlx
    // Cube
  },
  data () {
    return {
      status: 'left1',
      // 12345热线工单统计数据
      statisticsInfo: [
        {
          width: 300,
          height: 420,
          textname: '工单总数',
          nameSize: 63,
          number: 0,
          numSize: 99,
          numColor: '#FFDE00',
          danwei: '个',
          danweiSize: 57
        },
        {
          width: 300,
          height: 420,
          iconname: 'icon-consult',
          iconColor: '#23E7AD',
          iconSize: 63,
          textname: '咨询',
          nameSize: 63,
          number: 0,
          numSize: 99,
          numColor: '#23E7AD',
          danwei: '个',
          danweiSize: 57
        },
        {
          width: 300,
          height: 420,
          iconname: 'icon-suqiu',
          iconColor: '#1491F9',
          iconSize: 63,
          textname: '诉求',
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
    ...mapState('SecondRight', ['rxgdlxData', 'rxgdqy']),
    rxgdlx () {
      let rxgdlxData = this.rxgdlxData
      if (rxgdlxData && rxgdlxData[0]) {
        rxgdlxData = rxgdlxData[0]
      } else {
        rxgdlxData = {}
      }
      rxgdlxData.TOTAL = rxgdlxData.GDFW + rxgdlxData.TSDWT + rxgdlxData.DWJS +
      rxgdlxData.YHXX + rxgdlxData.YDYCHS + rxgdlxData.YDYW + rxgdlxData.GDZL + rxgdlxData.FWQD + rxgdlxData.YDXXBG + rxgdlxData.DFCHS + rxgdlxData.YDFWXQ
      return rxgdlxData
    },
    statisticsInfoComputed () {
      let statisticsInfo = this.statisticsInfo
      let data = this.rxgdlxData
      if (data && data.length === 2) {
        let opp = {}
        data.forEach(item => {
          opp[item.LDLB] = item.GDSL
        })
        statisticsInfo[0].number = data[0].GDSL + data[1].GDSL
        statisticsInfo[1].number = opp['咨询']
        statisticsInfo[2].number = opp['诉求']
      }
      return statisticsInfo
    },
    newRxgdqy () {
      let rxgdqy = this.rxgdqy
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
          dress: '李沧',
          value: 25
        }
      ]
      if (rxgdqy && rxgdqy.length > 0) {
        data = rxgdqy.map(item => {
          return {
            dress: item.ORG_NAME,
            value: item.GDSL
          }
        })
      }
      return data
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
  width: 100%;
  height: 100%;
  // .statisticsInfoWrap {
  //   width: 80%;
  //   height: 300px;
  //   margin-left: 10%;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   .item {
  //     width: 520px;
  //     height: 300px;
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  //     position: relative;
  //     margin-right: 4px;
  //     .borderStyle {
  //       width: 6px;
  //       height: 100%;
  //       position: absolute;
  //       right: -5px;
  //       top: 0;
  //       background: linear-gradient(
  //         to bottom,
  //         #071934 0%,
  //         #1592fa 50%,
  //         #071934 100%
  //       );
  //     }
  //   }
  // }
  .barWrap {
    width: 100%;
    height: 100%;
    // height: calc(100% - 300px);
    .echarts {
      width: 100%;
      height: 100%;
    }
  }
  .xx-container{
       width: 100%;
    height: 100%;
  }
}
</style>
