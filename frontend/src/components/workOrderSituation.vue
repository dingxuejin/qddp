<template>
  <!-- 工单处理情况  1页面右边的右上 轮播2-->
  <transition name="opacity1">
    <div class="echart-container">
      <table class="table">
        <thead>
          <tr>
            <th>区域<br />类型</th>
            <th>报修<br />总数</th>
            <th>完成<br />数量</th>
            <th>平均到达<br />现场时间<br />（分钟）</th>
            <th>最长到达<br />现场时间<br />（分钟）</th>
            <!-- <th>恢复供电及时数</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in handlingTnformationData"
              :key="index">
            <td>{{item.place}}</td>
            <td>{{item.repairs.toFixed(2)}}</td>
            <td>{{item.complete.toFixed(2)}}</td>
            <td>{{item.averageTime.toFixed(2)}}</td>
            <td>{{item.longTime.toFixed(2)}}</td>
            <!-- <td>{{item.powerRecover.toFixed(2)}}</td> -->
          </tr>
        </tbody>
      </table>
      <!-- <v-chart  /> -->
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    // 工单处理情况
    return {}
  },
  props: {
    handlingTnformationData: {
      type: Array,
      default: () => {
        return [
          {
            place: '城市',
            repairs: 657,
            complete: 652,
            averageTime: 13.29,
            longTime: 39.62,
            powerRecover: '100%'
          },
          {
            place: '农村',
            repairs: 37,
            complete: 36,
            averageTime: 16.87,
            longTime: 39.25,
            powerRecover: '100%'
          },
          {
            place: '偏远山区',
            repairs: 0,
            complete: 0,
            averageTime: 0.0,
            longTime: 0.0,
            powerRecover: '0.00%'
          },
          {
            place: '总计',
            repairs: 694,
            complete: 688,
            averageTime: 13.47,
            longTime: 39.62,
            powerRecover: '100%'
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.echart-container {
  width: 98%;
  height: 100%;
  padding: 50px 20px 50px 0px;
  box-sizing: border-box;
  table {
    font-family: "digitfont";
    width: 100%;
    height: 100%;
    align-items: center;
    vertical-align: middle;
    text-align: center;
    border: 1px solid #0a467e;
    border-collapse: collapse;
    border-spacing: 0;
    thead {
      width: 100%;
      height: 250px;
       background: rgba(0, 97, 80, 0.6);

      border-bottom: 1px solid #0a467e;
      tr {
        th {
          margin: 0;
          padding: 0;
          font-size: 60px;
          line-height: 90px;
        }
      }
    }
    tbody {
      background: rgba(81, 94, 107, 0.6);
      tr {
        td {
          padding:4px 10px;
          width: 120px;
          margin: 0;
          padding: 0;
          color: #f9ff00;
          font-size: 60px;
          border-top: 2px solid #4069af;
        }
        td:first-child {
          color: #fff;
           background: rgba(36, 45, 89, 0.6);
        }
      }
    }
  }
}
</style>
