<template>
  <div class="login-form">
    <div class="form-container">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名/手机" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="密码" />
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
        username: '18300000000',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginHandler () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$axios.post('/accounts/login', this.loginForm)
            .then((rsp) => {
              this.$message.success('登录成功, 正在跳转至首页...')
              const userProfile = { ...rsp.data.user, token: rsp.data.token }
              this.$store.commit('saveUserProfile', userProfile)
              setTimeout(() => {
                this.$router.push('/')
              }, 1000)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
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
