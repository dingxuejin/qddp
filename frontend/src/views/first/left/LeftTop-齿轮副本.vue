<template>
  <transition name="opacity1"
              appear>
    <div class="echart-container">
      <!-- 齿轮 -->
      <div class="echart-container-top rowbox">
        <img src="../../../assets/chilun.gif">
        <div class="echart-container-top-item item1">
          <div class="number totalnumber">
            <div>
              <countTo :startVal='0'
                       :endVal='76'
                       :duration='3000'></countTo>
            </div>
          </div>
          <div class="name totalname">
            <div>总数</div>
          </div>
        </div>
        <div class="echart-container-top-item item2">
          <div class="number">
            <div>
              <countTo :startVal='0'
                       :endVal='26'
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
                       :endVal='6'
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
                       :endVal='10'
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
                       :endVal='20'
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
        <div v-for="(item,index) in malfunctionData"
             :key="index"
             class="echart-container-bottom-item rowbox">
          <div class="number rowbox">
            <div class="name">
              <div>{{item.name}}</div>
            </div>
            <span>
              <countTo :startVal='0'
                       :endVal='item.number'
                       :duration='3000'></countTo>
            </span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      malfunctionData: [
        {
          name: '高压故障',
          number: 0
        },
        {
          name: '客户内部',
          number: 51
        },
        {
          name: '低压故障',
          number: 16
        },
        {
          name: '非电力',
          number: 4
        },
        {
          name: '电能质量',
          number: 2
        },
        {
          name: '计量故障',
          number: 3
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.echart-container {
  width: 100%;
  height: 100%;
  .echart-container-top {
    width: 300px;
    height: 300px;
    margin: 0 auto;
    position: relative;
    img {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 300px;
      height: 300px;
    }
  }

  &-top {
    width: 100%;
    height: 60%;
    &-item {
      position: absolute;
      width: 60px;
      height: 60px;
      .name {
        text-align: center;
        border-top: 1px solid #157EFB;
        font-size: 12px;
        padding: 2px 4px;
      }
      .number {
        font-size: 24px;
        text-align: center;
        font-family: digitfont;
        color: #fbf040;
      }
      .totalname {
        font-size: 18px;
      }
      .totalnumber {
        font-size: 28px;
      }
    }
    .item1 {
      top: 120px;
      left: 120px;
    }
    .item2 {
      top: 48px;
      left: 26px;
    }
    .item3 {
      top: 48px;
      left: 214px;
    }
    .item4 {
      top: 190px;
      left: 26px;
    }
    .item5 {
      top: 190px;
      left: 208px;
    }
  }
  &-bottom {
    width: 100%;
    margin: 20px auto 0px;
    height: calc(100% - 320px);
    display: flex;
    flex-wrap: wrap;
    &-item {
      width: 31%;
      height: 40%;
      margin-left: 2%;

      .number {
        width: 147px;
        height: 37px;
        font-size: 24px;
        font-family: digitfont;
        color: #fbf040;
        background: linear-gradient(
          to right,
          rgba(19, 138, 128, 1),
          rgba(19, 138, 128, 0)
        );
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        .name {
          width: 37px;
          height: 37px;
          font-size: 12px;
          text-align: center;
          background: #134d80;
          border-radius: 50%;
          color: #fff;
          div {
            margin: 5px 1px;
          }
        }
        span {
          margin-left: 15px;
          line-height: 37px;
        }
      }
    }
  }
}
</style>
