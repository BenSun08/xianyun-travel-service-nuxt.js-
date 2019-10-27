<template>
  <div class="login-form">
    <div class="form-container">
      <el-form :model="loginForm">
        <el-form-item>
          <el-input v-model="loginForm.username" placeholder="用户名/手机" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.password" placeholder="密码" />
        </el-form-item>
        <div class="forget-pwd">
          <nuxt-link to="#">
            忘记密码
          </nuxt-link>
        </div>
        <el-form-item>
          <el-button type="primary" @click="loginHandler">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    loginHandler () {

    }
  }
}
</script>

<style lang="less">
*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
.login-form{
  background-color: #ffffff;
  padding-top: 20px;
  .form-container{
    width: 350px;
    margin: 0 auto;
    .el-form{
      .forget-pwd{
        font-size: 12px;
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
        a{
          color: #409eff;
        }
      }
      .el-button{
        width: 100%;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
