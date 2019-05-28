<template>
  <div class="rx-container betweenbox">
    <div class="rx-inner betweenbox">
      <div class="centerbox">
        <div class="centerbox">
          <span>工单总数</span>

        </div>
        <div class="centerbox">
          <span class="number ye">
            <countTo :startVal='0'
                     :endVal='rxgdlx.TOTAL'
                     :duration='3000'></countTo>
          </span>

        </div>
      </div>
      <div class="hr-first"></div>
      <div>
        <div class="centerbox">
          <i class="iconfont icon-gongdian iconsize bl"></i>
          <span>供电服务</span>
        </div>
        <div class="centerbox">
          <span class="number  bl">
            <countTo :startVal='0'
                     :endVal='rxgdlx.GDFW||0'
                     :duration='3000'></countTo>
          </span>
          <span>个</span>

        </div>
      </div>
      <div class="hr"></div>
      <div>
        <div class="centerbox">
          <i class="iconfont icon-power_on iconsize re"></i>
          <span>停送电问题</span>
        </div>
        <div class="centerbox">
          <span class="number  re">
            <countTo :startVal='0'
                    :endVal='rxgdlx.TSDWT||0'
                     :duration='3000'></countTo>
          </span>
          <span>个</span>

        </div>
      </div>
    </div>
    <div class="rx-inner betweenbox">
      <div>
        <div class="centerbox">
          <i class="iconfont icon-jianshe iconsize gr"></i>
          <span>电网建设</span>
        </div>
        <div class="centerbox">
          <span class="number  gr">
            <countTo :startVal='0'
                    :endVal='rxgdlx.DWJS||0'
                     :duration='3000'></countTo>
          </span>
          <span>个</span>

        </div>
      </div>
      <div class="hr"></div>
      <div>
        <div class="centerbox">
          <i class="iconfont icon-yonghuxinxi iconsize bl"></i>
          <span>用户信息</span>
        </div>
        <div class="centerbox">
          <span class="number  bl">
            <countTo :startVal='0'
                 :endVal='rxgdlx.YHXX||0'
                     :duration='3000'></countTo>
          </span>
          <span>个</span>

        </div>
      </div>
      <div class="hr"></div>
      <div>
        <div class="centerbox">
          <i class="iconfont icon-heshi iconsize re"></i>
          <span>用电异常核实</span>
        </div>
        <div class="centerbox">
          <span class="number  re">
            <countTo :startVal='0'
                    :endVal='rxgdlx.YDYCHS||0'
                     :duration='3000'></countTo>
          </span>
          <span>个</span>

        </div>
      </div>
    </div>
    <div class="rx-inner betweenbox">
      <div>
        <div class="centerbox">
          <i class="iconfont icon-zhiliang iconsize gr"></i>
          <span>供电质量</span>
        </div>
        <div class="centerbox">
          <span class="number  gr">
            <countTo :startVal='0'
                   :endVal='rxgdlx.GDZL||0'
                     :duration='3000'></countTo>
          </span>
          <span>个</span>

        </div>
      </div>
      <div class="hr"></div>
      <div>
        <div class="centerbox">
          <i class="iconfont icon-qudao iconsize bl"></i>
          <span>服务渠道</span>
        </div>
        <div class="centerbox">
          <span class="number  bl">
            <countTo :startVal='0'
                    :endVal='rxgdlx.FWQD||0'
                     :duration='3000'></countTo>
          </span>
          <span>个</span>

        </div>
      </div>
      <div class="hr"></div>
      <div>
        <div class="centerbox">
          <i class="iconfont icon-biangeng iconsize re"></i>
          <span>用电信息变更</span>
        </div>
        <div class="centerbox">
          <span class="number  re">
            <countTo :startVal='0'
                  :endVal='rxgdlx.YDXXBG||0'
                     :duration='3000'></countTo>
          </span>
          <span>个</span>

        </div>
      </div>
    </div>
    <div class="rx-inner betweenbox">
      <div>
        <div class="centerbox">
          <i class="iconfont icon-yewu iconsize gr"></i>
          <span>用电业务</span>
        </div>
        <div class="centerbox">
          <span class="number  gr">
            <countTo :startVal='0'
                   :endVal='rxgdlx.YDYW||0'
                     :duration='3000'></countTo>
          </span>
          <span>个</span>

        </div>
      </div>
      <div class="hr"></div>
      <div>
        <div class="centerbox">
          <i class="iconfont icon-dianfeiheshou iconsize bl"></i>
          <span>电费抄核收</span>
        </div>
        <div class="centerbox">
          <span class="number  bl">
            <countTo :startVal='0'
                   :endVal='rxgdlx.DFCHS||0'
                     :duration='3000'></countTo>
          </span>
          <span>个</span>

        </div>
      </div>
      <div class="hr"></div>
      <div>
        <div class="centerbox">
          <i class="iconfont icon-yewuliuchengxuqiufenxi iconsize re"></i>
          <span>用电服务需求</span>
        </div>
        <div class="centerbox">
          <span class="number  re">
            <countTo :startVal='0'
                    :endVal='rxgdlx.YDFWXQ||0'
                     :duration='3000'></countTo>
          </span>
          <span>个</span>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    rxgdlx: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rx-container {
    box-sizing: border-box;
    padding:20px;
  width: 100%;
  height: 100%;
  font-size: 58px;
  flex-wrap: wrap;
  .rx-inner {
    width: 100%;
    height: 22%;
    > div {
      width: 33%;
      height: 100%;
      flex-wrap: wrap;
      > div {
        width: 100%;
        height: 50%;
        .iconsize {
          font-size: 48px;
          margin: 0px 10px;
        }
      }
    }
    .hr {
      width: 6px;
      height: 90%;
      border-radius: 50%;
      background: linear-gradient(
        to bottom,
        rgba(6, 51, 101, 0.1),
        rgba(35, 155, 233, 0.9),
        rgba(6, 51, 101, 0.1)
      );
    }
    .number {
      font-family: digitfont;
      margin: 0px 10px;
      font-size: 99px;
    }
    .hr-first {
      width: 6px;
      height: 90%;
    }
    .ye {
      color: #feff00;
    }
    .re {
      color: #f2765d;
    }
    .bl {
      color: #1494f8;
    }
    .gr {
      color: #23e9ae;
    }
  }
}
</style>
