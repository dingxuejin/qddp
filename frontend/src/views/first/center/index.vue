<template>
  <div class="center-container centerbox"
       @click.stop="changePage">
    <!-- <div class="centerbox center-caption"
         @click="toSecond"> -->
    <!-- <img src="../../../assets/logo.png" style="width:120px;height:120px;" alt="" srcset=""> -->
    <!-- <canvas id="canvas" width="1800" height="130"></canvas> -->
    <!-- <span class="captionText">
        供电服务指挥系统
      </span>
    </div> -->
    <div class="center-map centerbox"
         @click.stop="stop=false">
      <Map v-show="showMap==='maptalks'" />
      <gis-map v-show="showMap==='gis'" />
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import gisMap from '../../map/gisMap.vue'
import Map from '../../map/Map'
export default {
  components: {
    Map,
    gisMap
  },
  data () {
    return {
      stop: false
    }
  },
  computed: {
    ...mapState('Map', ['showMap'])
  },

  mounted () {
    // this.drawCaption()
  },
  methods: {
    ...mapMutations('Page', ['setPageIndex']),
    changePage () {
      this.setPageIndex()
    },
    toSecond () {
      this.setPageIndex()
    }
    // drawCaption () {
    //   let canvas = document.getElementById('canvas')
    //   let ctx = canvas.getContext('2d')
    //   let gradient = ctx.createLinearGradient(0, 0, 0, 130)
    //   ctx.shadowColor = 'rgba(0,0,0,0.9)'
    //   ctx.shadowOffsetX = 2
    //   ctx.shadowOffsetY = 2
    //   ctx.shadowBlur = 2
    //   gradient.addColorStop(0, '#1FCD67')
    //   gradient.addColorStop(1, '#53E1BD')
    //   ctx.font = '135px Microsoft YaHei'
    //   ctx.fillStyle = gradient
    //   ctx.fillText('供电服务指挥中心可视化监控', 0, 115)
    //   ctx.restore()
    // }
  }
}
</script>

<style lang="scss" scoped>
.center-container {
  cursor: pointer;
  width: 5615px;
  height: 3198px;
  background: url("../../../assets/mapcontainer.png") center center no-repeat;
  // .center-caption {
  //   overflow: hidden;
  //   width: 100%;
  //   height: calc(100% - 2986px);
  //   font-size: 135px;
  //   color: #56e2c0;
  //   // padding-top:35px;
  //   box-sizing: border-box;
  //   align-items: flex-start;
  //   // background: url('../../../assets/captionbg.png') no-repeat center center;
  //   img {
  //     margin: 0px 16px;
  //   }
  //   .captionText {
  //     color: #fff;
  //     --color1: #fff;
  //     --color2: lime;
  //     --color3: green;
  //     --color4: mediumblue;
  //     font-family: Kumar One Outline;
  //     --interval: 1s;
  //     display: block;
  //     text-shadow: 0 0 10px var(--color1), 0 0 20px var(--color2),
  //       0 0 40px var(--color3), 0 0 80px var(--color4);
  //     will-change: filter, color;
  //     filter: saturate(60%);
  //     animation: flicker steps(100) var(--interval) 1s infinite;
  //   }
  // }
  .center-map {
    cursor: default;
    width: 5555px;
    height: 3144px;
    // width: 5306px;
    // height: 2986px;
    box-shadow: 0px 0px 30px #999 inset;
    background-color: rgba(03, 11, 26, 0.8);
  }
  // @keyframes flicker {
  //   50% {
  //     color: white;
  //     filter: saturate(200%) hue-rotate(20deg);
  //   }
  // }
}
</style>
