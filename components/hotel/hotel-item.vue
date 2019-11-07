<template>
  <div v-if="Object.keys(hotel).length" class="hotel-item">
    <a :href="`/hotel/${hotel.id}`" class="hotel-cover">
      <img :src="hotel.photos" alt="">
    </a>
    <div class="hotel-info">
      <h3>{{ hotel.name }}</h3>
      <p class="basic-info">
        <span>{{ hotel.alias }}</span>
        <span v-if="hotel.hotellevel">
          <i v-for="index in hotel.hotellevel.id" :key="index" class="iconfont iconhuangguan" />
        </span>
        <span>{{ hotel.hoteltype.name }}</span>
      </p>
      <div class="hotel-remarks">
        <div class="rate">
          <el-rate
            v-model="hotel.stars"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          />
        </div>
        <div class="remark">
          <span>{{ hotel.all_remarks }}</span>
          条评价
        </div>
        <div class="strategy">
          <span>{{ hotel.price }}</span>
          篇游记
        </div>
      </div>
      <div class="hotel-address">
        <span>
          <i class="el-icon-location" />
          位于:{{ hotel.address }}
        </span>
      </div>
    </div>
    <div class="retailers">
      <a
        v-for="(retailer,index) in hotel.products"
        :key="index"
        href="https://hotels.ctrip.com/hotel/694679.html"
        class="retalier-link"
      >
        <span>{{ retailer.name }}</span>
        <span><i>&yen;&nbsp;{{ retailer.price }}</i>起&nbsp;></span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hotel: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="less" scoped>
*{
  box-sizing: border-box;
}
img{
  display: block;
}
.hotel-item{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 30px;
  border-bottom: solid 1px #eeeeee;
  margin-bottom: 30px;
  a.hotel-cover{
    img{
      width: 320px;
      height: 210px;
    }
  }
  .hotel-info{
    width: 364px;
    h3{
      font-weight: normal;
      font-size: 24px;
    }
    p.basic-info{
      span{
        color: #999999;
        i{
          color: #ff9900;
        }
      }
    }
    .hotel-remarks{
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      >div{
        span{
          color: #ff9900;
        }
      }
    }
    .hotel-address{
      font-size: 14px;
      color: #666666;
    }
  }
  .retailers{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 235px;
    margin-top: 18px;
    a{
      width: 100%;
      display: flex;
      justify-content: space-between;
      border-bottom: solid 1px #ebeef5;
      padding: 14px 34px 14px 10px;
      span{
        color: #606266;
        font-size: 14px;
        i{
          font-style: normal;
          font-size: 16px;
          color: #ff9900;
        }
      }
      &:hover{
        background-color: #f5f7fa;
      }
    }
  }
}
</style>
