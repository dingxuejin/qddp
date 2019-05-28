<template>
  <transition name="opacity1"
              appear>
    <div class="echart-container">
      <!-- 齿轮 -->
      <div class="echart-container-top rowbox">
        <!-- <img src="../../../assets/chilun.gif"> -->
        <div class="decoArrow">
          <div class="limg"
               :class="{limgActive:status%4===1}"></div>
          <div class="rimg"
               :class="{rimgActive:status%4===3}"></div>
        </div>
        <div class="echart-container-top-item item1">
          <div class="number totalnumber">
            <div>
              <countTo :startVal='0'
                       :endVal='topData.ASGDSL'
                       :duration='3000'></countTo>
            </div>
          </div>
          <div class="name totalname">
            <div style="color:#E27113">总数</div>
          </div>
          <img src="../../../assets/firstlftpcentericon.png">
        </div>
        <div class="echart-container-top-item item2">
          <div class="number">
            <div>
              <countTo :startVal='0'
                       :endVal='topData.DPD'
                       :duration='3000'></countTo>

            </div>
          </div>
          <div class="name">
            <div>待派单</div>
          </div>
        </div>
        <div class="echart-container-top-item item3">
          <div class="number">
            <div>
              <countTo :startVal='0'
                       :endVal='topData.QXZ'
                       :duration='3000'></countTo>
            </div>
          </div>
          <div class="name">
            <div>抢修中</div>
          </div>
        </div>
        <div class="echart-container-top-item item4">
          <div class="number">
            <div>
              <countTo :startVal='0'
                       :endVal='topData.DSH'
                       :duration='3000'></countTo>
            </div>
          </div>
          <div class="name">
            <div>待审核</div>
          </div>
        </div>
        <div class="echart-container-top-item item5">
          <div class="number">
            <div>
              <countTo :startVal='0'
                       :endVal='topData.YWC'
                       :duration='3000'></countTo>
            </div>
          </div>
          <div class="name">
            <div>已完成</div>
          </div>
        </div>
      </div>
      <!-- 故障 -->
      <div class="echart-container-bottom rowbox">
        <div v-for="(item,index) in botData"
             :key="index"
             class="echart-container-bottom-item rowbox">
          <div class="number rowbox">
            <div class="nameIconWrap">
              <div class="iconWrap iconfont"><span :class="item.icon"></span></div>
            </div>
            <div class="name">{{item.name}}：</div>
            <div class="num">
              <countTo :startVal='0'
                       :endVal='item.number'
                       :duration='3000'></countTo>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      status: 0,
      time: null,
      malfunctionData: [
        {
          name: '高压故障',
          number: 0,
          icon: 'icon-ziyuan4'
        },
        {
          name: '客户内部',
          number: 51,
          icon: 'icon-ziyuan2'
        },
        {
          name: '低压故障',
          number: 16,
          icon: 'icon-ziyuan'
        },
        {
          name: '非电力',
          number: 4,
          icon: 'icon-ziyuan3'
        },
        {
          name: '电能质量',
          number: 2,
          icon: 'icon-ziyuan1'
        },
        {
          name: '计量故障',
          number: 3,
          icon: 'icon-ziyuan5'
        }
      ]
    }
  },
  computed: {
    ...mapState('FirstLeft', ['drgdsl', 'drgdfl']),
    topData () {
      if (this.drgdsl && this.drgdsl.length > 0) {
        return this.drgdsl[0]
      } else {
        return {
          'ASGDSL': 0,
          'DPD': 0,
          'QXZ': 0,
          'DSH': 0,
          'YWC': 0
        }
      }
    },
    botData () {
      let data = JSON.parse(JSON.stringify(this.malfunctionData))
      if (this.drgdfl && this.drgdfl.length > 0) {
        let botData = {}
        this.drgdfl.forEach(item => {
          botData[item.GDFL] = item.GDSL
        })
        data[0].number = botData['高压故障'] || 0
        data[1].number = botData['客户内部故障'] || 0
        data[2].number = botData['低压故障'] || 0
        data[3].number = botData['非电力故障'] || 0
        data[4].number = botData['电能质量故障'] || 0
        data[5].number = botData['计量故障'] || 0
        return data
      } else {
        data[0].number = 0
        data[1].number = 0
        data[2].number = 0
        data[3].number = 0
        data[4].number = 0
        data[5].number = 0
        return data
      }
    }
  },
  mounted () {
    if (this.time) {
      clearInterval(this.time)
      this.time = null
    }
    this.time = setInterval(() => {
      this.status++
    }, 2000)
  },
  destroyed () {
    if (this.time) {
      clearInterval(this.time)
      this.time = null
    }
  }
}
</script>

<style lang="scss" scoped>
.echart-container {
  width: 100%;
  height: 100%;
  .echart-container-top {
    width: 900px;
    height: 900px;
    margin: 0 auto;
    position: relative;
    // img {
    //   position: absolute;
    //   top: 0px;
    //   left: 0px;
    //   width: 300px;
    //   height: 300px;
    // }
    .decoArrow {
      width: 900px;
      height: 900px;
      position: absolute;
      .limg,
      .rimg {
        width: 480px;
        height: 80%;
        position: absolute;
        top: 30px;
      }
      .limg {
        left: -72px;
        background: url("../../../assets/firstlftpllicon.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
      .rimg {
        right: -72px;
        background: url("../../../assets/firstlftprlicon.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
      .limgActive {
        left: -72px;
        background: url("../../../assets/firstlftplhicon.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
      .rimgActive {
        right: -72px;
        background: url("../../../assets/firstlftprhicon.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
    }
  }

  &-top {
    width: 100%;
    height: 60%;
    &-item {
      position: absolute;
      width: 180px;
      height: 180px;
      .name {
        text-align: center;
        border-top: 3px solid #157efb;
        font-size: 36px;
        padding: 2px 4px;
      }
      .number {
        font-size: 72px;
        text-align: center;
        font-family: digitfont;
        color: #fbf040;
      }
      .totalname {
        font-size: 54px;
      }
      .totalnumber {
        font-size: 84px;
      }
    }
    .item1 {
      top: 300px;
      left: 360px;
      padding: 0;
      z-index: 0;
      img {
        width: 180%;
        height: 150%;
        position: absolute;
        left: -40%;
        top: -20%;
        z-index: -1;
      }
    }
    .item2 {
      top: 144px;
      left: 40px;
    }
    .item3 {
      top: 144px;
      left: 682px;
    }
    .item4 {
      top: 500px;
      left: 55px;
    }
    .item5 {
      top: 500px;
      left: 664px;
    }
  }
  &-bottom {
    width: 100%;
    margin: 20px auto 0px;
    height: calc(100% - 960px);
    display: flex;
    flex-wrap: wrap;
    &-item {
      width: 31%;
      height: 40%;
      margin-left: 2%;
      .number {
        width: 441px;
        height: 111px;
        font-size: 72px;
        font-family: digitfont;
        color: #fbf040;
        background: linear-gradient(
          to right,
          rgba(34, 183, 84, 1),
          rgba(19, 138, 128, 0)
        );
        border-top-left-radius: 55.5px;
        border-bottom-left-radius: 55.5px;
        position: relative;
        .nameIconWrap {
          width: 135px;
          height: 135px;
          font-size: 36px;
          text-align: center;
          background: rgba(34, 183, 84, 1);
          border-radius: 50%;
          color: #fff;
          position: absolute;
          top: -15px;
          left: -6px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 5px;
          box-sizing: border-box;
          background: radial-gradient(#000 45%, rgba(34, 183, 84, 1) 70%);
          .iconWrap {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              color: #4af97c;
              font-size: 48px;
            }
          }
        }
        .name {
          width: 180px;
          height: 111px;
          line-height: 111px;
          font-size: 36px;
          text-align: center;
          color: #fff;
          position: absolute;
          left: 135px;
        }
        .num {
          width: 129px;
          height: 111px;
          line-height: 111px;
          text-align: center;
          position: absolute;
          right: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
