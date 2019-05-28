<template>
  <transition name="animation"
              appear
              @after-enter="afterEnter">
              <div class="animation-container">
    <slot v-if="show" />
              </div>

  </transition>
</template>
<script>
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    afterEnter () {
      this.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
.animation-container{
    width:100%;
    height: 100%;
}
.animation-enter-active {
  animation: myfirst 1.5s;
}
@keyframes myfirst {
  0% {
    width: 0px;
    height: 0px;
  }
  30% {
    width: 0px;
    height: 100%;
  }
  100% {
    width: 100%;
  }
}
</style>
