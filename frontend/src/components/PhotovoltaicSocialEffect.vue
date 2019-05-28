<template>
  <!-- 光伏社会效应 -->
  <div style="width:100%;height:100%;">
    <div class="right-container rowbox">
      <div class="right-item coal  colbox">
        <i class="iconfont icon-mei icon centerbox">
        </i>
        <p>节约标准煤</p>
        <p class="detail">

          <span class="number">
            <countTo :startVal='0'
                     :decimals='3'
                     :endVal='gfshxy.c||0'
                     :duration='3000'></countTo>
          </span>千吨</p>
      </div>
      <div class="right-item co2 colbox">
        <i class="iconfont icon2 icon centerbox">
          <img src="../assets/co2.png"
               alt=""
               srcset="">
        </i>
        <p>二氧化碳减排</p>
        <p class="detail">

          <span class="number">
            <countTo :startVal='0'
                     :decimals='2'
                          :endVal='gfshxy.co2||0'
                     :duration='3000'></countTo>
          </span>千吨</p>
      </div>
      <div class="right-item so2 colbox">
        <i class="iconfont icon-ziyuan7 icon3 icon centerbox">
        </i>
        <p>二氧化硫减排</p>
        <p class="detail">
          <span class="number">
            <countTo :decimals='3'
                     :startVal='0'
                        :endVal='gfshxy.so2||0'
                     :duration='3000'></countTo>
          </span>千吨</p>
      </div>
      <div class="right-item no2 colbox">
        <i class="iconfont icon-ziyuan6 icon4 icon centerbox">
        </i>
        <p>氧化氮减排</p>
        <p class="detail">
          <span class="number">
            <countTo :startVal='0'
                     :decimals='3'
                         :endVal='gfshxy.no2||0'
                     :duration='3000'></countTo>
          </span>千吨</p>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  props: {
    gfshxy: {
      type: Object,
      default () {
        return {
          no2: 0,
          so2: 0,
          co2: 0,
          c: 0
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.right-container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .right-item {
    width: calc(50% - 10px);
    height: 50%;
    justify-content: center;
    align-items: center;
    font-size: 51px;
    .icon {
      width: 240px;
      height: 240px;
      font-size: 90px;
      border-radius: 50%;
      box-shadow: 0 0 130px #23e7ad inset;
    }
    p {
      margin-top: 5%;
    }
    .detail {
      .number {
        font-family: digitfont;
        color: #23e7ad;
        font-size: 120px;
        font-weight: 600;
      }
      color: #fff;
    }
  }

  .coal {
    color: #23e7ad;
    .icon-mei{
      font-size: 150px;
    }
  }
  .co2 {
    color: #1595ff;
    .icon2 {
      box-shadow: 0 0 130px #1595ff inset;
    }
    .detail {
      .number {
        color: #1595ff;
      }
    }
  }
  .so2 {
    color: #f2765d;
    .icon3 {
      box-shadow: 0 0 130px #f2765d inset;
    }
    .detail {
      .number {
        color: #f2765d;
      }
    }
  }
  .no2 {
    color: #ffde00;
    .icon4 {
      box-shadow: 0 0 130px #ffde00 inset;
    }
    .detail {
      .number {
        color: #ffde00;
      }
    }
  }
}
</style>
