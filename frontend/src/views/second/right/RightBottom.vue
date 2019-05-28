<template>
  <transition name='opacity1'>
    <div class="echart-container"
         key="1"
         v-if="status==='right1'">
      <div class="threeDPieWrap">
        <Bar :aDate="newBarData" />
        <!-- <ThreeDPie :piedata="newPieData" /> -->
      </div>
      <!-- <div class="statisticsInfoWrap">
        <div class="title">
          <div>工单类型</div>
          <div>电压等级</div>
        </div>
        <div class="statisticsInfo">
          <div class="item"
               v-for="(o,i) in newYkgdlx"
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
                 v-if="i!=1&&i!=4"></div>
          </div>
        </div>
      </div> -->
    </div>

    <!-- <div class="echart-container"
         key="2"
         v-else>
      <div class="barWrap">
        <Bar :aDate="barData" />
      </div>
    </div> -->
  </transition>

</template>
<script>
import { mapState } from 'vuex'
// import ThreeDPie from '../../../components/3DPie'
// import Cube from '../../../components/cube'
import Bar from '@/components/Bar'
export default {
  components: {
    // ThreeDPie,
    // Cube,
    Bar
  },
  data () {
    return {
      status: 'right1',
      pieData: [
        {
          name: '工单总数',
          total: '0',
          data: [['在途工单', 0], ['处理完成', 0]]
        }
      ],
      // 统计数据
      statisticsInfo: [
        {
          width: 240,
          height: 390,
          iconname: 'icon-add',
          iconColor: '#23E7AD',
          iconSize: 63,
          textname: '新增',
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
          iconname: 'icon-kuorong',
          iconColor: '#1595FF',
          iconSize: 63,
          textname: '扩容',
          nameSize: 57,
          number: 0,
          numSize: 99,
          numColor: '#1595FF',
          danwei: '个',
          danweiSize: 57
        },
        {
          width: 200,
          height: 390,
          iconname: 'icon-PD_110KV_ICO',
          iconColor: '#FFDE00',
          iconSize: 63,
          textname: '110kV',
          nameSize: 57,
          number: 0,
          numSize: 99,
          numColor: '#FFDE00',
          danwei: '个',
          danweiSize: 57
        },
        {
          width: 200,
          height: 390,
          iconname: 'icon-PD_35KV_ICO',
          iconColor: '#C936C6',
          iconSize: 63,
          textname: '35kV',
          nameSize: 57,
          number: 0,
          numSize: 99,
          numColor: '#C936C6',
          danwei: '个',
          danweiSize: 57
        },
        {
          width: 200,
          height: 390,
          iconname: 'icon-PD_10KV_ICO',
          iconColor: '#F2765D',
          iconSize: 63,
          textname: '10kV',
          nameSize: 57,
          number: 0,
          numSize: 99,
          numColor: '#F2765D',
          danwei: '个',
          danweiSize: 57
        }
      ]
    }
  },
  computed: {
    ...mapState('SecondRight', ['ykgdlx', 'ykdydj', 'ykgdzt', 'ykgdqy']),
    newYkgdlx () {
      let statisticsInfo = this.statisticsInfo
      if (this.ykgdlx && this.ykgdlx.length > 0) {
        if (this.ykgdlx[0]) {
          statisticsInfo[0].number = this.ykgdlx[0].GDSL
        }
        if (this.ykgdlx[1]) {
          statisticsInfo[1].number = this.ykgdlx[1].GDSL
        }
      }
      if (this.ykdydj && this.ykdydj.length > 0) {
        let newData = {}
        this.ykdydj.forEach(item => {
          newData[item.DYDJ] = item.GDSL
        })
        if (newData['110kV']) {
          statisticsInfo[2].number = newData['110kV']
        }
        if (newData['35kV']) {
          statisticsInfo[3].number = newData['35kV']
        }
        if (newData['10kV']) {
          statisticsInfo[4].number = newData['10kV']
        }
      }
      return statisticsInfo
    },
    newBarData () {
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
      if (this.ykgdqy && this.ykgdqy.length > 0) {
        data = this.ykgdqy.map(item => {
          return {
            dress: item.ORG_NAME,
            value: item.GDSL
          }
        })
      }
      return data
    },
    // newPieData () {
    //   let pieData = this.pieData
    //   let total = 0
    //   try {
    //     let data = this.ykgdqy.map(item => {
    //       total += item.GDSL
    //       return [item.ORG_NAME, item.GDSL]
    //     })
    //     pieData = [
    //       {
    //         data,
    //         name: '工单总数',
    //         total
    //       }
    //     ]
    //   } catch (err) {
    //     pieData = [
    //       {
    //         data: [
    //           ['青岛', 39],
    //           ['黄岛', 25]
    //         ],
    //         name: '工单总数',
    //         total: 64
    //       }
    //     ]
    //   }
    //   return pieData
    // },
    barData () {
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
      if (this.ykgdqy && this.ykgdqy.length > 0) {
        data = this.ykgdqy.map(item => {
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
  .threeDPieWrap {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    // height: 700px;
    // padding: 20px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .statisticsInfoWrap {
    width: 94%;
    height: 420px;
    padding: 80px 0px 0px;
    .title {
      width: 100%;
      height: 80px;
      line-height: 80px;
      div {
        width: 50%;
        font-size: 72px;
        font-weight: 300;
        text-align: center;
        color: rgba(255, 255, 255, 1);
        float: left;
      }
    }
    .statisticsInfo {
      margin-top: 60px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .item {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-right: 0px;
        .borderStyle {
          width: 6px;
          height: 100%;
          position: absolute;
          right: -12px;
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
  }
  .barWrap {
    width: 100%;
    height: 100%;
    .echarts {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
