<template>
  <transition name='opacity1'>
    <div class="echart-container">
      <div class="betweenbox inner-container">
        <div class="inner-left">
          <div class="startbox">
            <span class="iconfont icon-join spanicon green"></span>
            <span>累积接入数量</span>
          </div>
          <div class="centerbox">
            <span class="number green">
              <countTo :startVal='0'
                       :decimals='3'
                       :endVal='0.926'
                       :duration='3000'></countTo>
            </span>
            <span>个</span>
          </div>
        </div>
        <div class="inner-center">

        </div>
        <div class="inner-right">
          <div class="startbox margintop">
            <span class="iconfont icon-zhuangjirongliang spanicon blue"></span>
            <span>累积装机容量</span>
          </div>
          <div class="centerbox">
            <span class="number blue">
              <countTo :startVal='0'
                       :decimals='3'
                       :endVal='0.926'
                       :duration='3000'></countTo>
            </span>
            <span>个</span>
          </div>
        </div>
      </div>
      <div class="betweenbox inner-container">
        <div class="inner-left">
          <div class="startbox">
            <span class="iconfont icon-fuhe spanicon green"></span>
            <span>月度最高负荷</span>
          </div>
          <div class="centerbox">
            <span class="number green">
              <countTo :startVal='0'
                       :decimals='3'
                       :endVal='0.926'
                       :duration='3000'></countTo>
            </span>
            <span>MW</span>
          </div>
        </div>
        <div class="inner-center">

        </div>
        <div class="inner-right">
          <div class="startbox margintop">
            <span class="iconfont icon-rongliang spanicon blue"></span>
            <span>月度装机容量</span>
          </div>
          <div class="centerbox">
            <span class="number blue">
              <countTo :startVal='0'
                       :decimals='3'
                       :endVal='0.926'
                       :duration='3000'></countTo>
            </span>
            <span>MW</span>
          </div>
        </div>
      </div>
      <div class="betweenbox inner-container">
        <div class="inner-left">
          <div class="startbox">
            <span class="iconfont icon-dian spanicon green"></span>
            <span>累积用电量</span>
          </div>
          <div class="centerbox">
            <span class="number green">
              <countTo :startVal='0'
                       :decimals='3'
                       :endVal='0.926'
                       :duration='3000'></countTo>
            </span>
            <span>kV</span>
          </div>
        </div>
        <div class="inner-center">

        </div>
        <div class="inner-right">
          <div class="startbox margintop">
            <span class="iconfont icon-fadianliang spanicon blue"></span>
            <span>累积发电量</span>
          </div>
          <div class="centerbox">
            <span class="number blue">
              <countTo :startVal='0'
                       :decimals='3'
                       :endVal='0.926'
                       :duration='3000'></countTo>
            </span>
            <span>kV</span>
          </div>
        </div>
      </div>

    </div>
  </transition>

</template>

<style lang="scss" scoped>
.echart-container {
  width: 100%;
  height: 100%;
  .inner-container{
    padding:10px 0px;
    box-sizing: border-box;
    width:100%;
    height:33.33%;
    font-size: 24px;
    .inner-left,.inner-right{
      >div{
        padding:6px 0px;
      }
      width:calc(50% - 2px);
      height: 100%;
          padding:0px 10px;
      .spanicon{
        font-size: 28px;
        margin:0px 4px;
      }
      .number{
        font-family: digitfont;
        font-size: 38px;
        padding:0px 6px;
      }
        .green {
    color: #23e7ad;
  }
  .blue {
    color: #1595ff;
  }
    }
    .inner-center{
      border-radius: 50%;
      width:4px;
      height: 100%;
      background: linear-gradient(to bottom,#031A46,#0C579B,#031A46);
    }
  }

}
</style>
