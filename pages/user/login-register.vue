<template>
  <div class="container">
    <el-carousel :interval="3000" arrow="always">
      <el-carousel-item v-for="(image, index) in images" :key="index">
        <img :src="image.url" alt="">
      </el-carousel-item>
    </el-carousel>
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
      ]
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
}
</style>
