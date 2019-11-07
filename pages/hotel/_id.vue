<template>
  <div class="hotel-detail">
    <div class="detail-container">
      <div id="map-container" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hotelDetails: {},
      center: [],
      scenes: []
    }
  },
  watch: {
    center: {
      handler (newVal) {
        if (newVal) {
          this.getSurrounds()
        }
      },
      deep: true
    },
    scenes: {
      handler (newVal) {
        if (newVal) {
          this.loadMap()
        }
      },
      deep: true
    }
  },
  mounted () {
    this.getHotelDetails()
  },
  methods: {
    getHotelDetails () {
      this.$axios.get('/hotels', {
        params: { id: this.$route.params.id }
      })
        .then((rsp) => {
          this.hotelDetails = { ...rsp.data.data[0] }
          this.center = [rsp.data.data[0].location.longitude, rsp.data.data[0].location.latitude]
        })
    },
    getSurrounds () {
      const _this = this
      this.$axios.get('https://restapi.amap.com/v3/place/text', {
        params: {
          key: '8b12da645e8c16d573d4b3d902a5104f',
          keywords: '',
          types: '风景名胜',
          city: _this.hotelDetails.city.name,
          offset: 10,
          output: 'json',
          page: 1,
          location: `${_this.center[0]},${_this.center[1]}`
        }
      })
        .then((rsp) => {
          this.scenes = rsp.data.pois.map((element, index) => {
            return {
              title: element.name,
              position: element.location.split(','),
              iconTheme: 'numv2',
              iconStyle: `blue-${index + 1}`
            }
          })
        })
    },
    loadMap () {
      const _this = this
      window.onLoad = function () {
        let center = _this.center
        let zoom = 7
        // calculate the center and zoom dynamically according to the hotels' positions
        if (_this.scenes.length) {
          const lngList = _this.scenes.map((element) => {
            return element.position[0]
          })
          const latList = _this.scenes.map((element) => {
            return element.position[1]
          })
          const maxLng = Math.max.apply(null, lngList)
          const maxLat = Math.max.apply(null, latList)
          const minLng = Math.min.apply(null, lngList)
          const minLat = Math.min.apply(null, latList)
          const distance = AMap.GeometryUtil.distance([maxLng, maxLat], [minLng, minLat])
          const nowDivLine = Math.sqrt(650 * 650 + 360 * 360)
          const nowScale = distance / nowDivLine
          zoom = 16 - Math.ceil(Math.log(nowScale) / Math.log(2))
          center = [(maxLng + minLng) / 2, (maxLat + minLat) / 2]
        }
        const map = new AMap.Map('map-container', {
          zoom,
          center
        })
        initAMapUI()
        AMapUI.loadUI(['overlay/AwesomeMarker'], function (AwesomeMarker) {
          const centerMarker = new AwesomeMarker({
            position: center,
            title: _this.hotelDetails.name,
            awesomeIcon: '',
            iconLabel: {
              style: {
                color: '#333'
              }
            },
            iconStyle: 'orange'
          })
          map.add(centerMarker)
        })
        if (_this.scenes.length) {
          AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
            const scenesList = _this.scenes.map((element) => {
              const sMarker = new SimpleMarker(element)
              sMarker.on('mouseover', function () {
                map.setCenter(element.position)
              })
              return sMarker
            })
            map.add(scenesList)
          })
        }
      }
      const url = 'https://webapi.amap.com/maps?v=1.4.15&key=9df17808d052637121f298edcf593907&callback=onLoad'
      const uiurl = 'https://webapi.amap.com/ui/1.0/main-async.js'
      const jsapi = document.createElement('script')
      const uiapi = document.createElement('script')
      jsapi.charset = 'utf-8'
      uiapi.charset = 'utf-8'
      jsapi.src = url
      uiapi.src = uiurl
      document.head.appendChild(jsapi)
      document.head.appendChild(uiapi)
    }
  }
}
</script>

<style lang="less" scoped>
*{
  box-sizing: border-box;
}
.hotel-detail{
  width: 100%;
  .detail-container{
    width: 1000px !important;
    margin: 0 auto;
    #map-container{
      width: 650px;
      height: 360px;
      margin: 20px 0;
    }
  }
}
</style>
