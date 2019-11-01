<template>
  <div class="flights">
    <div class="flights-container">
      <div class="flights-main">
        <flights-header
          :info="info"
          :options="options"
          :filter="filter"
          @cancel="cancelFilter"
          @filter="filterHandler"
        />
        <div class="flights-table-head">
          <span>航空信息</span>
          <span>起飞时间</span>
          <span>到达时间</span>
          <span>价格</span>
        </div>
        <div v-if="filteredFlights.length===0" class="no-flight">
          <span>暂无航班信息！</span>
        </div>
        <div v-else class="flights-list">
          <div class="flights-table-body">
            <flight-item v-for="(flight,index) in pagedFlights" :key="index" :flight="flight" />
          </div>
          <div class="paginator">
            <el-pagination
              :current-page.sync="pagination.pageIndex"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pagination.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="filteredFlights.length"
              @size-change="pagination.pageSize=$event"
            />
          </div>
        </div>
      </div>
      <div class="flights-side">
        <div class="web-advert">
          <div class="authentication">
            <div class="ari-assoc">
              <i class="el-icon-success" style="color: #409eff" />
              <span>航协认证</span>
            </div>
            <div class="out-door">
              <i class="el-icon-check" style="color: #4f8000" />
              <span>出行保证</span>
            </div>
            <div class="phone-call">
              <i class="el-icon-phone" style="color: #409eff" />
              <span>7x24</span>
            </div>
          </div>
          <div class="hot-line">
            免费客服电话：4006345678转2
          </div>
        </div>
        <div class="history-search">
          <div class="history-title">
            历史查询
          </div>
          <div class="history-content">
            <div v-for="(history, index) in historyList" :key="index" class="history-item">
              <div class="item-info">
                <div class="air-route">
                  {{ history.departCity }}&nbsp;-&nbsp;{{ history.destCity }}
                </div>
                <div class="depart-date">
                  {{ history.departDate }}
                </div>
              </div>
              <div class="btn-container">
                <div
                  class="btn-select"
                  @click="$router.push({
                            path: '/domestic-air-tickets/flights',
                            query: history
                          })
                          reload()"
                >
                  选择
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flightsHeader from '@/components/domestic-air-tickets/flights-header.vue'
import flightItem from '@/components/domestic-air-tickets/flight-item.vue'

export default {
  inject: ['reload'],
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
      filteredFlights: [],
      filterOptions: {
        org_airport_name: '',
        dep_time: '',
        airline_name: '',
        plane_size: ''
      },
      pagination: {
        pageSize: 10,
        pageIndex: 1
      },
      historyList: []
    }
  },
  computed: {
    pagedFlights () {
      const pageStart = (this.pagination.pageIndex - 1) * this.pagination.pageSize
      const pageEnd = this.pagination.pageIndex * this.pagination.pageSize
      const pagedFlights = this.filteredFlights.slice(pageStart, pageEnd)
      return pagedFlights
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getAirTicketsList(this.$route.query)
      this.getHistoryList()
    },
    getAirTicketsList (params) {
      this.$axios.get('/airs', { params })
        .then((rsp) => {
          const { flights, info, options } = rsp.data
          this.flights = [...flights]
          this.info = { ...info }
          this.options = { ...options }
          this.options.size = ['大', '中', '小']
          this.options.flightTimes = this.options.flightTimes.map((element) => {
            return `${element.from}:00 - ${element.to}:00`
          })
          this.flights = this.flights.map((element) => {
            const depTime = element.dep_time.split(':')
            let depHour = depTime[0] - 0
            const depMinute = depTime[1] - 0
            if (depMinute > 0) { depHour++ }
            return {
              ...element,
              round_dep_time: depHour
            }
          })
          this.filteredFlights = [...this.flights]
        })
    },
    getHistoryList () {
      const historyList = JSON.parse(localStorage.getItem('xy-flights-history')) || []
      let historySet = []
      const hash = {}
      if (historyList.length > 0) {
        historySet = historyList.reduce((acc, cur) => {
          const hashKey = cur.departCity + cur.destCity + cur.departDate
          if (!hash[hashKey]) {
            hash[hashKey] = true
            acc.push(cur)
          }
          return acc
        }, [])
      }
      localStorage.setItem('xy-flights-history', JSON.stringify(historySet))
      this.historyList = historySet
    },
    filterHandler (filter) {
      this.filterOptions[filter.select] = filter.option
      this.filteredFlights = [...this.flights]
      for (const key in this.filterOptions) {
        if (this.filterOptions[key]) {
          this.filteredFlights = this.filteredFlights.filter((element) => {
            if (key === 'dep_time') {
              const duration = this.filterOptions[key].split('-')
              const depHour = duration[0].split(':')[0]
              const arrHour = duration[1].split(':')[0]
              return element.round_dep_time >= depHour && element.round_dep_time <= arrHour
            } else {
              return element[key] === this.filterOptions[key]
            }
          })
        }
      }
    },
    cancelFilter () {
      this.filteredFlights = [...this.flights]
      for (const key in this.filterOptions) {
        this.filterOptions[key] = ''
      }
    },
    selectHistory () {
      this.$router.push(`/domestic-air-tickets/flights?${history.queryStr}`)
      // this.init()
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
    display: flex;
    justify-content: space-between;
    .flights-main{
      width: 745px;
      .flights-table-head{
        width: 100%;
        height: 38px;
        background-color: #f6f6f6;
        border: solid 1px #dddddd;
        margin-bottom: 10px;
        display: flex;
        span{
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #666666;
          font-size: 12px;
        }
      }
      .no-flight{
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 20px;
        span{
          color: #999999;
          font-size: 14px;
        }
      }
      .paginator{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 20px;
      }
    }
    .flights-side{
      width: 240px;
      .web-advert{
        width: 100%;
        border: solid 1px #dddddd;
        margin-bottom: 10px;
        .authentication{
          display: flex;
          >div{
            padding: 10px 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            i{
              font-size: 46px;
              padding-bottom: 2px;
            }
            span{
              font-size: 12px;
            }
          }
        }
        .hot-line{
          font-size: 14px;
          background-color: #f6f6f6;
          padding: 6px 10px;
        }
      }
      .history-search{
        border: solid 1px #dddddd;
        padding: 10px;
        .history-title{
          border-bottom: solid 1px #eeeeee;
          padding-bottom: 10px;
        }
        .history-content{
          .history-item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            .item-info{
              .air-route{
                font-size: 14px;
                padding-bottom: 6px;
              }
              .depart-date{
                font-size: 12px;
                color: #666666;
              }
            }
            .btn-container{
              width: 44px;
              .btn-select{
                width: 100%;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 12px;
                background-color: #ffa500;
                border-radius: 5px;
                color: #ffffff;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>
