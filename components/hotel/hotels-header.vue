<template>
  <div class="hotels-header">
    <div class="hotels-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>南京市酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search-form">
      <el-form :inline="true" :model="hotelsForm">
        <el-form-item>
          <el-autocomplete
            v-model="hotelsForm.destCity"
            placeholder="目的地"
            :fetch-suggestions="querySearchAsync"
          />
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="hotelsForm.checkInRange"
            type="daterange"
            range-separator="-"
            start-placeholder="入店日期"
            end-placeholder="离店日期"
          />
        </el-form-item>
        <el-form-item>
          <people-input />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchHotels">
            查看价格
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="city-details">
      <div class="city-info">
        <div class="city-regions">
          <div class="label">
            区域：
          </div>
          <div class="content" :class="{ 'show-regions': showRegions }">
            <p>
              <a class="all-regions" href="javascript:;">全部</a>
              <a
                v-for="(region,index) in cityInfo.regionsList"
                :key="index"
                href="javascrpit:;"
              >
                {{ region.name }}
              </a>
            </p>
            <div class="show-hidden">
              <a href="javascript:;" @click="showRegions=!showRegions">
                <i class="el-icon-d-arrow-right" />
                <span>等{{ cityInfo.regionsList.length }}个区域</span>
              </a>
            </div>
          </div>
        </div>
        <div class="city-strategies">
          <div class="label">
            攻略：
          </div>
          <div class="content">
            <div class="text" style="color: #666666;">
              北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。
            </div>
          </div>
        </div>
        <div class="average-price">
          <div class="label">
            均价
            <el-tooltip effect="dark" content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="top-start">
              <el-badge value="?" type="info" size="mini">
                <span>&nbsp;&nbsp;</span>
              </el-badge>
            </el-tooltip>
            :
          </div>
          <div class="content">
            <el-tooltip
              v-for="(budget,index) in budgets"
              :key="index"
              content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
              placement="bottom-start"
            >
              <div class="budget">
                <i v-for="crown in crowns[index]" :key="crown" class="iconfont iconhuangguan" />
                <span>&yen;{{ budget }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="city-location">
        <div id="map-container" />
      </div>
    </div>
  </div>
</template>

<script>
import { AMapManager } from 'vue-amap'
import peopleInput from '@/components/hotel/people-input.vue'

export default {
  components: {
    peopleInput
  },
  data () {
    return {
      hotelsForm: {
        destCity: '南京市',
        checkInrange: [new Date(2019, 10, 8), new Date(2019, 12, 20)],
        people: ''
      },
      cityInfo: {
        regionsList: []
      },
      showRegions: false,
      budgets: ['332', '521', '768'],
      crowns: [3, 4, 5],
      hotelsMap: {
        center: [121.59996, 31.197646],
        amapManager: new AMapManager(),
        zoom: 12,
        events: {
          init (o) {
            const marker = new AMap.Marker({
              position: [121.59996, 31.197646]
            })
            marker.setMap(o)
          }
        }
      }
    }
  },
  mounted () {
    this.searchHotels()
    window.onLoad = function () {
      const map = new AMap.Map('map-container', {
        zoom: 12,
        center: [116.39, 39.9]
      })
      const toolbar = new AMap.ToolBar()
      map.addControl(toolbar)
    }
    const url = 'https://webapi.amap.com/maps?v=1.4.15&key=9df17808d052637121f298edcf593907&callback=onLoad&plugin=AMap.ToolBar'
    const jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  },
  methods: {
    querySearchAsync (queryStr, callback) {
      if (queryStr.trim()) {
        this.$axios.get('/airs/city', {
          params: { name: queryStr }
        })
          .then((rsp) => {
            const citiesList = [...rsp.data.data]
            const selectList = citiesList.map((element) => {
              return {
                value: element.name,
                code: element.sort
              }
            })
            callback(selectList)
          })
      }
    },
    searchHotels () {
      this.$axios.get('/cities', {
        params: { name: this.hotelsForm.destCity }
      })
        .then((rsp) => {
          this.cityInfo.regionsList = [...rsp.data.data[0].scenics]
          const cityId = rsp.data.data[0].id
          this.$router.push({ path: '/hotel', query: { cityId } })
        })
    }
  }
}
</script>

<style lang="less" scoped>
*{
  box-sizing: border-box;
}
.hotels-header{
  .hotels-breadcrumb{
    padding-top: 20px;
  }
  .search-form{
    padding-top: 20px;

  }
  .city-details{
    display: flex;
    justify-content: space-between;
    margin-right: -10px;
    .city-info{
      width: 580px;
      >div{
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        .label{
          font-size: 14px;
          color: #666666;
        }
        .content{
          width: 510px;
          font-size: 14px;
          &.show-regions{
            p{
              overflow: visible;
              height: fit-content;
            }
            .show-hidden{
              a{
                i{
                  transform: rotate(-90deg)
                }

              }
            }
          }
          p{
            height: 42px;
            overflow: hidden;
            a{
              // color: #666666;
              // margin-right: 16px;
              // &.all-regions{
              //   background-color: #eeeeee;
              //   color: #999999;
              // }
              &:link{
                color: #666666;
              }
              &:visited{
                background-color: #eeeeee;
                color: #999999;
              }
              &:hover{
                color: #0099ff;
                text-decoration: underline;
              }
              &:active{
                background-color: #eeeeee;
                color: #999999;
              }
            }
          }
          .show-hidden{
            a{
              i{
                transform: rotate(90deg);
                color: #ff9900;
              }
              span{
                color: #666666;
              }
            }
          }
        }
        &.average-price{
          .label{
            /deep/sup.el-badge__content{
              width: 14px;
              height: 14px;
              background-color: #cccccc;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .content{
            display: flex;
            .budget{
              margin-right: 40px;
              i{
                color: #ff9900;
              }
              span{
                margin-left: 6px;
                color: #666666;
              }
            }
          }
        }
      }
    }
    .city-location{
      margin-bottom: 20px;
      width: 420px;
      height: 260px;
      #map-container{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
