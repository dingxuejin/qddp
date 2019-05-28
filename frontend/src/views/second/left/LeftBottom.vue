<template>
  <div style="width:100%;height:100%;">
    <transition name='opacity1'>
      <div class="echart-container"
           key="1">
        <DistributedPhotovoltaic :fbsgf='newGffltj' />
      </div>
    </transition>
  </div>

</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import echarts from "echarts";
//分布式光伏分类统计
import DistributedPhotovoltaic from "@/components/DistributedPhotovoltaicClassificationStatistics.vue";
export default {
  components: {
    DistributedPhotovoltaic
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("SecondLeft", ["gffltj"]),
    newGffltj() {
      let gffltj = this.gffltj;
      let fbsgf = {
        bw: [
          {
            value: 3,
            total: 12
          },
          {
            value: 5,
            total: 32
          },
          {
            value: 30,
            total: 120
          }
        ],
        zj: [
          {
            value: 3,
            total: 12
          },
          {
            value: 5,
            total: 32
          },
          {
            value: 30,
            total: 120
          }
        ]
      };
      if (gffltj && gffltj.length > 0) {
        let obj = {};
        gffltj.forEach(val => {
          obj[val.DYDJ] = val;
        });
        fbsgf.bw[0].value=(obj['01'].BWSLZB*100).toFixed(2)
        fbsgf.bw[0].total=obj['01'].BWSL
        fbsgf.bw[1].value=(obj['02'].BWSLZB*100).toFixed(2)
        fbsgf.bw[1].total=obj['02'].BWSL
        fbsgf.bw[2].value=(obj['03'].BWSLZB*100).toFixed(2)
        fbsgf.bw[2].total=obj['03'].BWSL
        fbsgf.zj[0].value=(obj['01'].ZJRLZB*100).toFixed(2)
        fbsgf.zj[0].total=obj['01'].ZJRL
        fbsgf.zj[1].value=(obj['02'].ZJRLZB*100).toFixed(2)
        fbsgf.zj[1].total=obj['02'].ZJRL
        fbsgf.zj[2].value=(obj['03'].ZJRLZB*100).toFixed(2)
        fbsgf.zj[2].total=obj['03'].ZJRL
      }
      return fbsgf;
    }
  },
  methods: {
    change(val) {
      this.status = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.echart-container {
  width: 100%;
  height: 100%;
}
</style>
