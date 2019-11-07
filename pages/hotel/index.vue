<template>
  <div class="hotel">
    <div class="hotel-container">
      <hotels-header
        :markers="markersList"
        @citychange="hotelsFilter.cityId=$event;
                     getFilteredHotels()"
      />
      <hotels-filter
        @filter="hotelsFilter[$event.key] = [...$event.value]
                 getFilteredHotels()"
        @priceslide="hotelsFilter.price_lt=$event;
                     getFilteredHotels()"
      />
      <div v-if="hotelsList.length" class="hotels-list">
        <hotel-item
          v-for="(hotel,index) in hotelsList"
          :key="index"
          :hotel="hotel"
        />
      </div>
      <div v-else class="no-match" style="height: 320px; display: flex; justify-content: center;">
        暂无符合条件的酒店
      </div>
      <div v-if="hotelsList.length" class="paginator">
        <el-pagination
          layout="prev, pager, next"
          prev-text="< 上一页"
          next-text="下一页 >"
          :total="hotelsList.length"
        />
      </div>
    </div>
  </div>
</template>

<script>
import hotelsHeader from '@/components/hotel/hotels-header.vue'
import hotelsFilter from '@/components/hotel/hotels-filter.vue'
import hotelItem from '@/components/hotel/hotel-item.vue'

export default {
  components: {
    hotelsHeader,
    hotelsFilter,
    hotelItem
  },
  data () {
    return {
      hotelsList: [],
      hotelsFilter: {
        cityId: 74,
        price_lt: 4000,
        hotellevel_in: [],
        hoteltype_in: [],
        hotelasset_in: [],
        hotelbrand_in: []
      },
      markersList: []
    }
  },
  mounted () {
    this.getFilteredHotels()
  },
  methods: {
    getFilteredHotels () {
      // construct the query stirng with the fitler parameters
      let queryStr = '?city=' + this.hotelsFilter.cityId
      queryStr += `&price_lt=${this.hotelsFilter.price_lt}`
      for (const key in this.hotelsFilter) {
        if (this.hotelsFilter[key].length) {
          this.hotelsFilter[key].forEach((element) => {
            queryStr += `&${key}=${element}`
          })
        }
      }
      this.$axios.get(`/hotels${queryStr}`)
        .then((rsp) => {
          this.hotelsList = [...rsp.data.data]
          this.constructMarkersList()
        })
    },
    // construct the markers of the hotels laying on the map
    constructMarkersList () {
      this.markersList = this.hotelsList.map((element, index) => {
        return {
          title: element.name,
          position: [element.location.longitude, element.location.latitude],
          iconTheme: 'numv2',
          iconStyle: `blue-${index + 1}`
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
*{
  box-sizing: border-box;
}
.hotel{
  .hotel-container{
    width: 1000px;
    margin: 0 auto;
    .hotels-list{
      margin-bottom: -12px;
    }
    .paginator{
      display: flex;
      justify-content: flex-end;
      padding-bottom: 38px;
      /deep/.el-pagination{
        li.number{
          font-weight: normal;
          padding: 0;
          min-width: 19px;
        }
        .btn-prev{
          border: solid 1px #dcdfe6;
          border-radius: 3px;
          padding-left: 20px;
          color: #606266;
          &:hover{
            color: #409eff;
            border: solid 1px #c6e2ff;
            background-color: #ecf5ff;
          }
        }
        .btn-next{
          border: solid 1px #dcdfe6;
          border-radius: 3px;
          padding-right: 20px;
          color: #606266;
          &:hover{
            color: #409eff;
            border: solid 1px #c6e2ff;
            background-color: #ecf5ff;
          }
        }
      }
    }
  }
}
</style>
