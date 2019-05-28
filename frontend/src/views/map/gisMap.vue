<template>
  <div id="map">
    <iframe :src="mapUrl" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mapUrl: window.VUE_APP_gisURL + '/dyfxyj/fxyj_main/gisMain/index.jsp'
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
#map {
  width: 5306px;
  height: 2986px;
}
</style>
