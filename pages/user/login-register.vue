<template>
  <div class="container">
    <el-carousel :interval="3000" arrow="always">
      <el-carousel-item v-for="(image, index) in images" :key="index">
        <img :src="image.url" alt="">
      </el-carousel-item>
    </el-carousel>
    <div class="login-register-form">
      <div class="form-selection">
        <div class="login" :class="{active: isLogin}" @click="isLogin=true">
          <span>登录</span>
        </div>
        <div class="register" :class="{active: !isLogin}" @click="isLogin=false">
          <span>注册</span>
        </div>
      </div>
      <div class="form-body">
        <login-form v-if="isLogin" />
        <register-form v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import loginForm from '@/components/user/login-form.vue'
import registerForm from '@/components/user/register-form.vue'
export default {
  components: {
    loginForm,
    registerForm
  },
  data () {
    return {
      images: [
        { url: 'http://157.122.54.189:9095/assets/images/th01.jfif' },
        { url: 'http://157.122.54.189:9095/assets/images/th02.jfif' },
        { url: 'http://157.122.54.189:9095/assets/images/th03.jfif' },
        { url: 'http://157.122.54.189:9095/assets/images/th04.jfif' }
      ],
      isLogin: true
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
  .login-register-form{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 400px;
    z-index: 999;
    .form-selection{
      width: 100%;
      height: 50px;
      display: flex;
      >div{
        flex: 1;
        color: #666666;
        background-color: #eeeeee;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-top: solid 2px #eeeeee;
      }
      .active{
        font-weight: bold;
        background-color: #ffffff;
        color: #ffa500;
        border-top: solid 2px #ffa500;
      }
    }
  }
}
</style>
