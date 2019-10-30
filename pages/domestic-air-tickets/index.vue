<template>
  <div class="domestic-air-tickets">
    <div class="air-container">
      <div class="domestic-air">
        <div class="domestic-title">
          <i class="el-icon-location" />
          <span>国内机票</span>
        </div>
        <div class="domestic-content">
          <div class="domestic-search">
            <div class="single-round">
              <span>单程</span>
              <span>往返</span>
            </div>
            <div class="search-content">
              <div class="search-container">
                <el-form label-position="right" label-width="100px" :model="flights2Search">
                  <el-form-item label="出发城市">
                    <el-input v-model="flights2Search.departCity" placeholder="请搜索出发城市" />
                  </el-form-item>
                  <el-form-item label="到达城市">
                    <el-input v-model="flights2Search.destCity" placeholder="请搜索到达城市" />
                  </el-form-item>
                  <el-form-item label="出发时间">
                    <el-date-picker v-model="flights2Search.departDate" type="date" style="width:100%" placeholder="2019-10-30" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" style="width:100%" @click="searchHandler">
                      <i class="el-icon-search" />
                      搜索
                    </el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="advertisement">
            <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt="">
          </div>
        </div>
      </div>
      <div class="advert-bar">
        <span class="text"><i class="el-icon-success" style="color: #409eff" />&nbsp;100%航协认证</span>
        <span class="seperate" />
        <span class="text"><i class="el-icon-check" style="color: #4f8000" />&nbsp;出行保证</span>
        <span class="seperate" />
        <span class="text"><i class="el-icon-phone" style="color: #409eff" />&nbsp;7x24小时服务</span>
      </div>
      <div class="bargain-air">
        <div class="bargain-title">
          <i class="el-icon-location-outline" />
          <span>特价机票</span>
        </div>
        <div class="bargain-content">
          <div v-for="index in 4" :key="index" class="bargain-item">
            <img :src="bargainImages[index-1]" alt="">
            <div class="description">
              <span>广州-上海</span>
              <span>&yen;699</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      flights2Search: {
        departCity: '',
        destCity: '',
        departDate: ''
      },
      bargainImages: [
        'https://imgsrc.baidu.com/baike/pic/item/a71ea8d3fd1f41340d8f3dec281f95cad0c85ee3.jpg',
        'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=d4e2f29522381f309a198aab99004c67/6a63f6246b600c33cd891e65104c510fd8f9a1af.jpg',
        'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=9154c841bcfd5266a32b3b169b199799/3812b31bb051f8199687c7e0d0b44aed2f73e7fe.jpg',
        'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=a1b035c61a38534388cf8023a312b01f/9c16fdfaaf51f3de20157fce9eeef01f3b2979f1.jpg'
      ]
    }
  },
  methods: {
    searchHandler () {

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
.domestic-air-tickets{
  .air-container{
    width: 1000px;
    margin: 0 auto;
    .domestic-air{
      margin-bottom: 20px;
      .domestic-title{
        padding: 14px 0;
        color: #ffa500;
        font-size: 20px;
      }
      .domestic-content{
        display: flex;
        justify-content: space-between;
        .domestic-search{
          width: 360px;
          border: solid 1px #dddddd;
          border-top: none;
          .single-round{
            width: 100%;
            height: 45px;
            display: flex;
            >span{
              width: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              &:first-child{
                border-top: solid 3px #ffa500;
              }
              &:last-child{
                border-top: solid 3px #eeeeee;
                background-color: #eeeeee;
              }
            }
          }
          .search-content{
            // padding-bottom: 16px;
            .search-container{
              width: 310px;
              padding-top: 16px;
            }
          }
        }
      }
    }
    .advert-bar{
      width: 100%;
      height: 58px;
      border: solid 1px #dddddd;
      background-color: #f5f5f5;
      // margin-bottom: 20px;
      display: flex;
      align-items: center;
      span.text{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        i{
          font-size: 32px;
        }
      }
      span.seperate{
        width: 0;
        height: 36px;
        border-left: solid 1px #dddddd;
      }
    }
    .bargain-air{
      margin-bottom: 50px;
      .bargain-title{
        font-size: 20px;
        color: #409eff;
        padding: 10px 0;
      }
      .bargain-content{
        width: 100%;
        border: solid 1px #dddddd;
        padding: 20px 20px 20px 0;
        display: flex;
        .bargain-item{
          position: relative;
          border: solid 1px #e7e7e7;
          margin-left: 20px;
          img{
            width: 223px;
            height: 138px;
          }
          .description{
            position: absolute;
            left: 0;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 30px;
            background-color: rgba(0, 0, 0, 0.5);
            span{
              padding: 0 12px;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
}
</style>
