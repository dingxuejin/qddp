<template>
  <div class="cube colbox"
       :style="`width:${width}px;max-height:${height}px;`">
    <div class="cube-top rowbox">
      <i class="iconfont"
         :class="iconname"
         :style="`color:${iconColor};fontSize:${iconSize}px;`"></i>
      <div :style="`fontSize:${nameSize}px;`"
           class="textname">&nbsp;{{textname}}</div>
    </div>
    <div class="cube-bottom rowbox">
      <div class="number"
           :style="`fontSize:${numSize}px;color:${numColor};`">
             <countTo :startVal='0'
                     :endVal='number'
                     :duration='3000'></countTo>

          </div>
      <div class="danwei"
           :style="`fontSize:${danweiSize}px;`">{{danwei}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    // 左上图标
    iconname: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: '#23E7AD'
    },
    iconSize: {
      type: Number,
      default: 22
    },
    // 右上文本
    textname: {
      type: String,
      default: ''
    },
    nameSize: {
      type: Number,
      default: 21
    },
    // 左下数字
    number: {
      type: Number,
      default: 10
    },
    numSize: {
      type: Number,
      default: 33
    },
    numColor: {
      type: String,
      default: '#23E7AD'
    },
    // 右下单位
    danwei: {
      type: String,
      default: '个'
    },
    danweiSize: {
      type: Number,
      default: 19
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.cube {
  margin: 0 auto;
  .cube-bottom{
    width:100%;
     margin-top:10px;
    .number {
      width:80%;
      font-family: 'digitfont';
      text-align: right;
    }
    .danwei{
      width:20%;
      padding-top:10px;
      margin-left:5px;
      text-align: left;
    }
  }
}
</style>
