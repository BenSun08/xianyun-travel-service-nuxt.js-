<template>
  <div class="container">
    <el-carousel :interval="3000" arrow="always">
      <el-carousel-item v-for="(image, index) in images" :key="index">
        <img :src="image.url" alt="">
      </el-carousel-item>
    </el-carousel>
    <div class="search-block">
      <div class="type-selection">
        <a
          v-for="(service, index) in services"
          :key="index"
          class="type"
          :class="{active: index===currentService}"
          href="javascript:;"
          @click="currentService=index"
        >
          <span>{{ service.name }}</span>
        </a>
      </div>
      <div class="search-input">
        <input id="" type="text" name="" :placeholder="services[currentService].placeholder">
        <i class="el-icon-search" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      images: [
        { url: 'http://157.122.54.189:9095/assets/images/th01.jfif' },
        { url: 'http://157.122.54.189:9095/assets/images/th02.jfif' },
        { url: 'http://157.122.54.189:9095/assets/images/th03.jfif' },
        { url: 'http://157.122.54.189:9095/assets/images/th04.jfif' }
      ],
      services: [
        {
          name: '攻略',
          placeholder: '搜索城市'
        },
        {
          name: '酒店',
          placeholder: '请输入城市搜索酒店'
        },
        {
          name: '机票',
          placeholder: '请输入出发地'
        }
      ],
      currentService: 0
    }
  }
}
</script>

<style lang="less">
*{
  box-sizing: border-box;
}
.container{
  position: relative;
  height: 700px;
  .el-carousel{
    height: 100%;
    .el-carousel__container{
      height: 100%;
      .el-carousel__item{
        height: 700px;
      }
    }
  }
  .search-block{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 552px;
    z-index: 999;
    .type-selection{
      display: flex;
      a.type{
        width: 90px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        background-color: rgba(0,0,0,0.3);
        border: solid 1px rgba(100, 100, 100, 0.3);
        border-bottom: none;
      }
      .active{
        color: #000000 !important;
        background-color: #eeeeee !important;
      }
    }
    .search-input{
      height: 46px;
      display: flex;
      border-radius: 4px;
      border-top-left-radius: 0;
      background-color: #ffffff;
      input{
        flex: 1;
        border: none;
        outline: none;
        border-radius: 4px;
        font-size: 18px;
        text-indent: 1em;
      }
      i{
        width: 46px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        font-size: 20px;
        font-weight: bold;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
}
</style>
