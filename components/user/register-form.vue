<template>
  <div class="register-form">
    <div class="form-container">
      <el-form ref="registerForm" :model="registerForm" :rules="registerRules">
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" placeholder="用户名/手机" />
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input v-model="registerForm.captcha" placeholder="验证码">
            <el-button slot="append" class="btn-send-code" @click="sendValidCode">
              发送验证码
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input v-model="registerForm.nickname" placeholder="你的名字" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" type="password" placeholder="密码" />
        </el-form-item>
        <el-form-item prop="password2">
          <el-input v-model="registerForm.password2" type="password" placeholder="确认密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-register" @click="registerHandler">
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const validPwd2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次密码输入不匹配'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        captcha: '',
        nickname: '',
        password: '',
        password2: ''
      },
      registerRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '请输入合法手机号码', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 4, max: 16, message: '昵称长度为4~16位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度为6~16位', trigger: 'blur' }
        ],
        password2: [
          { validator: validPwd2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    registerHandler () {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          const { password2, ...data } = this.registerForm
          this.$axios.post('/accounts/register', data)
            .then((rsp) => {
              this.$message.success('用户注册成功')
              setTimeout(() => {
                this.$emit('tolog')
              }, 1000)
            })
        } else {
          this.$message.error('提交错误')
          return false
        }
      })
    },
    sendValidCode () {
      this.$axios.post('/captchas', { tel: this.registerForm.username })
        .then((rsp) => {
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
.register-form{
  background-color: #ffffff;
  padding-top: 20px;
  .form-container{
    width: 350px;
    margin: 0 auto;
    .el-form{
      .btn-register{
        width: 100%;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
