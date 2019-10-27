<template>
  <div class="register-form">
    <div class="form-container">
      <el-form :model="registerForm" :rules="registerRules">
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" placeholder="用户名/手机" />
        </el-form-item>
        <el-form-item prop="validCode">
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
          <el-input v-model="registerForm.password" placeholder="密码" />
        </el-form-item>
        <el-form-item prop="password2">
          <el-input v-model="registerForm.password2" placeholder="确认密码" />
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
        validCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
          // { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '请输入合法手机号码', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
          // { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '请输入合法手', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
          // { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '请输入合法手', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请再次输入密码', trigger: 'blur' }
          // { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '请输入合法手', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    registerHandler () {

    },
    sendValidCode () {

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
