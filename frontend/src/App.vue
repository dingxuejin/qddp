<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
import * as api from '@/api/axios.js'
export default {
  data () {
    return {
      params: { dataFlag: '0', orgNo: '37402' },
      mapParams: { orgNo: '37402' },
      tokenStr: ''
    }
  },
  mounted () {
    this.fetchTB()
    this.fetchMap()
    if (this.fetchTime) {
      clearInterval(this.fetchTime)
      this.fetchTime = null
    }
    this.fetchTime = setInterval(() => {
      this.fetchTB()
    }, window.VUE_APP_dataTime)
    api.fetch
      .post('/dyfxyj/fxyj_index/rest/main/getToken')
      .then(result => {
        this.tokenStr = result.resultValue.items[0].token
        this.socketInit()
      })
      .catch(err => {
        console.log(err, '没有获取到token')
      })
  },
  destroyed () {
    clearInterval(this.fetchTime)
    this.fetchTime = null
  },
  methods: {
    ...mapMutations('Map', [
      'setOptions',
      'setTsOptions',
      'setShowMap',
      'setArea'
    ]),
    ...mapActions('FirstLeft', [
      'fetchGdtbqs',
      'fetchDrgd24dfb',
      'fetchDdrqxhj',
      'fetchDrgdsl',
      'fetchDrgdfl',
      'fetchScfx_gzpcsc'
    ]),
    ...mapActions('Map', ['fetchXxkxx']),
    ...mapActions('FirstRight', [
      'fetchCf',
      'fetchGdyy',
      'fetchScfx_hdl',
      'fetchScfx_jsl',
      'fetchGztd',
      'fetchJhtd',
      'fetchGdclqk'
    ]),
    ...mapActions('SecondLeft', [
      'fetchGfzlzs',
      'fetchGfqxfb',
      'fetchGfshxy',
      'fetchGfyzzqs',
      'fetchGffltj'
    ]),
    ...mapActions('SecondRight', [
      'fetchRxgdlx',
      'fetchYkgdlx',
      'fetchRxgdqy',
      'fetchClwgdqy',
      'fetchYkdydj',
      'fetchYkgdqy',
      'fetchYkgdzt',
      'fetchClwgdlx',
      'fetchtTsgdqy',
      'fetchTsgdlx'
    ]),
    // 获取图表信息
    fetchTB () {
      let params = this.params
      // 工单同比趋势
      this.fetchGdtbqs(this.change1(params))
      // 当日工单24小时分布
      this.fetchDrgd24dfb(this.change1(params))
      // 重复工单频次
      this.fetchCf(this.change1(params))
      // 工单原因分析
      this.fetchGdyy(this.change1(params))
      // 当日工单数量
      this.fetchDrgdsl(this.change1(params))
      // 当日工单分类
      this.fetchDrgdfl(this.change1(params))
      // 平均故障处理总时长，轮播平均故障排除时长
      this.fetchScfx_gzpcsc(this.change2(params))
      //  平均终端接单时长，轮播终端回单率
      this.fetchScfx_hdl(this.change2(params))
      // 到达现场时长、到达现场及时率
      this.fetchScfx_jsl(this.change1(params))
      // 工单处理情况统计
      this.fetchGdclqk(this.change1(params))
      // 故障停电
      this.fetchGztd(this.change1(params))
      // 计划停电
      this.fetchJhtd(this.change1(params))
      // 光伏-总量展示
      this.fetchGfzlzs(this.change1(params))
      // 光伏-社会效应
      this.fetchGfshxy(this.change1(params))
      // 光伏-按月增长趋势
      this.fetchGfyzzqs(this.change1(params))
      // 光伏-按区域增长趋势
      this.fetchGfqxfb(this.change1(params))
      // 车联网工单区域分布
      this.fetchClwgdqy(this.change3(params))
      // 车联网工单类型统计
      this.fetchClwgdlx(this.change1(params))
      // 12345热线工单
      this.fetchRxgdlx(this.change1(params))
      // 12345工单区域统计
      this.fetchRxgdqy(this.change3(params))
      // 光伏分类统计
      this.fetchGffltj(this.change1(params))
      // 投诉工单区域趋势
      this.fetchtTsgdqy(this.change4(params))
      // 投诉工单类型
      this.fetchTsgdlx(this.change1(params))
      // 业旷工单类型
      this.fetchYkgdlx(
        {
          dataFlag: '1'
        }
      )
      // 业旷电压等级
      this.fetchYkdydj(
        {
          dataFlag: '1'
        }
      )
      // 业旷工单状态
      // this.fetchYkgdzt(this.change1(params))
      // 业旷工单区域
      this.fetchYkgdqy({
        dataFlag: '3',
        orgNo: '37402'
      })
      // 当日工单环节
      this.fetchDdrqxhj(this.change1(params))
    },
    // 获取地图信息
    fetchMap () {
      let params = this.mapParams
      // 地图信息
      this.fetchXxkxx(params)
      // 设置地图抢修工单参数
      this.setOptions(params)
      // 设置地图投诉工单参数
      this.setTsOptions(params)
    },
    fetchAll (params = { dataFlag: '0', orgNo: '37402' }) {
      console.log('socket返回的数据222', params)

      // 地图跳转
      if (params.dataFlag === 'open') {
        this.mapParams = params
        this.fetchMap()
        this.setShowMap('maptalks')
        let timeout = setTimeout(() => {
          this.setArea(params.orgNo)
          clearTimeout(timeout)
        }, 1000)
      } else {
        this.params = params
        this.fetchTB()
      }
    },
    change1 (params) {
      // 1:发0  传1 + 37402     2:发1 + 37402 传0+37402      3:发1 + org.no！==37402  传 4+  org.no
      if (params.dataFlag === '0') {
        return {
          dataFlag: '1',
          orgNo: '37402'
        }
      }
      if (params.dataFlag === '1' && params.orgNo === '37402') {
        return {
          dataFlag: '0',
          orgNo: '37402'
        }
      }
      if (params.dataFlag === '1' && params.orgNo !== '37402') {
        return {
          dataFlag: '4',
          orgNo: params.orgNo
        }
      }
      return params
    },
    change2 (params) {
      //  1:发0  传2 + 37402     2:发1 + 37402 传 0+37402      3:发1 + org.no！==37402  传 5+  org.no
      if (params.dataFlag === '0') {
        return {
          dataFlag: '2',
          orgNo: '37402'
        }
      }
      if (params.dataFlag === '1' && params.orgNo === '37402') {
        return {
          dataFlag: '0',
          orgNo: '37402'
        }
      }
      if (params.dataFlag === '1' && params.orgNo !== '37402') {
        return {
          dataFlag: '5',
          orgNo: params.orgNo
        }
      }
      return params
    },
    change3 (params) {
      //  1:发0  传3 + 37402     其他   传 0+37402
      if (params.dataFlag === '0') {
        return {
          dataFlag: '3',
          orgNo: '37402'
        }
      } else {
        return {
          dataFlag: '0',
          orgNo: '37402'
        }
      }
    },
    change4 (params) {
      // 传 0+37402
      return {
        dataFlag: '0',
        orgNo: '37402'
      }
    },
    // socket连接
    socketInit () {
      let that = this
      console.log(this.tokenStr)
      window.$.controlCenter.init(
        window.VUE_APP_socketUrl,
        this.tokenStr,
        'B',
        '00',
        null,
        null,
        [
          {
            name: 'DATA',
            fun: function (data) {
              console.log('socket触发', data)
              let JSONData = JSON.parse(data)
              let params = {
                orgNo: JSONData.ORGNO,
                dataFlag: JSONData.TYPE
              }
              console.log('socket返回的数据111', params)
              that.fetchAll(params)
            }
          }
        ],
        function (para) {
          console.log(para)
        }
      )
    }
  }
}
</script>

<style scoped>
#app{
  background: #fff;
}
</style>
