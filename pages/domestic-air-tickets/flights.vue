<template>
  <div class="flights">
    <div class="flights-container">
      <div class="flights-main">
        <flights-header
          :info="info"
          :options="options"
          :filter="filter"
          @filter="filterHandler"
        />
        <div class="flights-table-head">
          <span>航空信息</span>
          <span>起飞时间</span>
          <span>到达时间</span>
          <span>价格</span>
        </div>
        <div class="flights-table-body">
          <flight-item v-for="(flight,index) in flights" :key="index" :flight="flight" />
        </div>
        <!-- <el-pagination
          :current-page.sync="currentPage2"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="10"
          layout="sizes, prev, pager, next"
          :total="100"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        /> -->
      </div>
      <div class="flights-side" />
    </div>
  </div>
</template>

<script>
import flightsHeader from '@/components/domestic-air-tickets/flights-header.vue'
import flightItem from '@/components/domestic-air-tickets/flight-item.vue'

export default {
  components: {
    flightsHeader,
    flightItem
  },
  data () {
    return {
      flights: [],
      info: {},
      options: {},
      filter: { airport: '', flightTimes: '', compony: '', size: '' },
      filteredFlights: []
    }
  },
  mounted () {
    this.getAirTicketsList(this.$route.query)
  },
  methods: {
    getAirTicketsList (params) {
      this.$axios.get('/airs', { params })
        .then((rsp) => {
          const { flights, info, options } = rsp.data
          this.flights = flights
          this.info = info
          this.options = options
          this.options.size = ['大', '中', '小']
          this.options.flightTimes = this.options.flightTimes.map((element) => {
            return `${element.from}:00 - ${element.to}:00`
          })
          console.log(this.flights)
        })
    },
    filterHandler (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="less" scoped>
*{
  box-sizing: border-box;
}
.flights{
  width: 100%;
  .flights-container{
    padding-top: 20px;
    width: 1000px;
    margin: 0 auto;
    .flights-main{
      width: 745px;
      .flights-table-head{
        width: 100%;
        height: 38px;
        background-color: #f6f6f6;
        border: solid 1px #dddddd;
        margin-bottom: 10px;
        display: flex;
      }
      span{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #666666;
        font-size: 12px;
      }
    }
  }
}
</style>
