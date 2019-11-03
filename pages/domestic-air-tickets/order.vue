<template>
  <div class="order">
    <div v-if="loaded" class="order-container">
      <div class="order-form">
        <order-form :insurances="seatInfo.insurances" @users-num-change="usersNum=$event" />
      </div>
      <div class="ticket-info">
        <div class="info-head">
          <div class="head-head">
            <span>{{ seatInfo.dep_date }}</span>
            <span>
              {{ seatInfo.org_city_name }} - {{ seatInfo.dst_city_name }}
            </span>
          </div>
          <div class="head-body">
            <div class="depart-info">
              <span class="time">{{ seatInfo.dep_time }}</span>
              <span class="location">{{ seatInfo.org_airport_name+seatInfo.org_airport_quay }}</span>
            </div>
            <div class="duration">
              <span>--&nbsp;{{ duration }}&nbsp;--</span>
              <span>{{ seatInfo.airline_name+seatInfo.flight_no }}</span>
            </div>
            <div class="dest-info">
              <span class="time">{{ seatInfo.arr_time }}</span>
              <span class="location">{{ seatInfo.dst_airport_name }}{{ seatInfo.dst_airport_quay }}</span>
            </div>
          </div>
        </div>
        <div class="info-table">
          <div class="table-head table-item">
            <span>订单总价</span>
            <span>金额</span>
            <span>数量</span>
          </div>
          <div class="adult-ticket table-item">
            <span>成人机票</span>
            <span>&yen;{{ seatInfo.base_price }}</span>
            <span>&nbsp;&nbsp;x{{ usersNum }}</span>
          </div>
          <div class="construct-fuel table-item">
            <span>机建+燃油</span>
            <span>&yen;{{ seatInfo.airport_tax_audlet }}/人/单程</span>
            <span>&nbsp;&nbsp;x{{ usersNum }}</span>
          </div>
          <div class="total-price">
            <span>应付金额：</span>
            <span>&yen;{{ totalPrice }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDuration } from '@/utils/utils.js'
import orderForm from '@/components/domestic-air-tickets/order-form.vue'

export default {
  components: {
    orderForm
  },
  data () {
    return {
      loaded: false,
      seatInfo: {},
      usersNum: 2
    }
  },
  computed: {
    duration () {
      return getDuration(this.seatInfo.dep_time, this.seatInfo.arr_time)
    },
    totalPrice () {
      return (this.seatInfo.base_price + this.seatInfo.airport_tax_audlet) * this.usersNum
    }
  },
  watch: {
    seatInfo: {
      handler (newVal, oldVal) {
        if (newVal) {
          this.loaded = true
        }
      },
      deep: true
    }
  },
  mounted () {
    this.$axios.get(`/airs/${this.$route.query.id}`, {
      params: { seat_xid: this.$route.query.seat_xid }
    })
      .then((rsp) => {
        this.seatInfo = { ...rsp.data }
      })
  }
}
</script>

<style lang="less" scoped>
*{
  box-sizing: border-box;
}
.order{
  padding-top: 20px;
  .order-container{
    width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .order-form{
      width: 590px;
    }
    .ticket-info{
      width: 352px;
      height: fit-content;
      border: solid 1px #dddddd;
      margin-bottom: 20px;
      .info-head{
        padding: 10px;
        border-bottom: dashed 1px #dddddd;
        .head-head{
          display: flex;
          justify-content: space-between;
          padding-bottom: 10px;
        }
        .head-body{
          display: flex;
          justify-content: space-between;
          align-items: center;
          >div{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .time{
              font-size: 22px;
              padding-bottom: 6px;
            }
            .location
            ,&.duration{
              font-size: 12px;
              color: #999999;
              padding-bottom: 6px;
            }
          }
        }
      }
      .info-table{
        .table-item{
          display: flex;
          justify-content: space-between;
          padding: 10px;
          border-bottom: dashed 1px #dddddd;
          font-size: 14px;
          color: #666666;
        }
        .total-price{
          padding: 10px;
          display: flex;
          justify-content: space-between;
          span{
            &:first-child{
              font-size: 14px;
              color: #666666;
            }
            &:last-child{
              font-size: 30px;
              color: #ffa500;
            }
          }
        }
      }
    }
  }
}
</style>
