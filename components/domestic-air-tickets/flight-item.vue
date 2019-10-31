<template>
  <div class="flight-item">
    <div class="flight-info" @click="showSeats=!showSeats">
      <div class="flight-id">
        {{ flight.airline_name }}&nbsp;{{ flight.flight_no }}
      </div>
      <div class="depart-info">
        <div class="time">
          {{ flight.dep_time }}
        </div>
        <div class="location">
          <span>{{ flight.org_airport_name }}</span>
          <span>{{ flight.org_airport_quay }}</span>
        </div>
      </div>
      <div class="duration">
        {{ duration }}
      </div>
      <div class="dest-info">
        <div class="time">
          {{ flight.arr_time }}
        </div>
        <div class="location">
          <span>{{ flight.dst_airport_name }}</span>
          <span>{{ flight.dst_airport_quay }}</span>
        </div>
      </div>
      <div class="ticket-price">
        <div class="price-container">
          &yen;&nbsp;<span>{{ flight.base_price*0.5 }}</span>起
        </div>
      </div>
    </div>
    <div v-if="showSeats" class="seats-info">
      <div class="title">
        低价推荐
      </div>
      <div class="seats-content">
        <div v-for="(seat,index) in flight.seat_infos" :key="index" class="seat-item">
          <div class="seat-type">
            <span>{{ seat.name }}</span>&nbsp;|
            &nbsp;{{ seat.supplierName }}
          </div>
          <div class="seat-purchase">
            <span class="price">&yen;&nbsp;{{ seat.par_price }}</span>
            <div class="pick-seat">
              <el-button type="warning" size="mini">
                选定
              </el-button>
              <span>剩余：{{ seat.discount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    flight: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showSeats: false
    }
  },
  computed: {
    duration () {
      const depTime = this.flight.dep_time.split(':')
      const depHour = depTime[0] - 0
      const depMinute = depTime[1] - 0
      const arrTime = this.flight.arr_time.split(':')
      const arrHour = arrTime[0] - 0
      const arrMinute = arrTime[1] - 0
      let duraHour = arrHour - depHour
      let duraMinute = arrMinute - depMinute
      if (duraHour < 0) {
        duraHour += 24
      }
      if (duraMinute < 0) {
        duraMinute += 60
        duraHour--
      }
      return duraHour + '时' + duraMinute + '分'
    }
  }
}
</script>

<style lang="less" scoped>
*{
  box-sizing: border-box;
}
.flight-item{
  width: 100%;
  border: solid 1px #dddddd;
  margin-bottom: 10px;
  .flight-info{
    position: relative;
    width: 100%;
    height: 82px;
    display: flex;
    cursor: pointer;
    .flight-id{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
    }
    .depart-info
    ,.dest-info{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .time{
        font-size: 24px;
      }
      .location{
        display: flex;
        justify-content: center;
        font-size: 12px;
        color: #999999;
      }
    }
    .duration{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #999999;
      border-bottom: solid 1px #eeeeee;
      padding-bottom: 10px;
      font-size: 14px;
    }
    .ticket-price{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      span{
        font-size: 24px;
        color: #ffa500;
        padding-right: 2px;
      }
    }
  }
  .seats-info{
    display: flex;
    justify-content: space-between;
    border-top: solid 1px #eeeeee;
    background-color: #f6f6f6;
    .title{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 20px;
      font-size: 14px;
    }
    .seats-content{
      width: 586px;
      margin-right: 20px;
      .seat-item{
        width: 100%;
        height: 74px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: solid 1px #eeeeee;
        &:last-child{
          border-bottom: none;
        }
        .seat-type{
          font-size: 12px;
          span{
            color: #008000;
          }
        }
        .seat-purchase{
          width: 192px;
          display: flex;
          justify-content: space-between;
          .price{
            font-size: 20px;
            color: #ffa500;
          }
          .pick-seat{
            width: 73px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .el-button{
              width: 100%;
            }
            span{
              color: #666666;
              font-size: 14px;
              padding-top: 6px;
            }
          }
        }
      }
    }
  }
}
</style>
