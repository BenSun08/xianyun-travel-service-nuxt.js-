import { Message } from 'element-ui'

export default ({ $axios, redirect }) => {
  $axios.defaults.baseURL = 'http://127.0.0.1:1337/'
  $axios.onRequest((config) => {
  // Do something before request is sent
    if (config.url === '/airorders') {
      const userInfo = JSON.parse(localStorage.getItem('xy-user-profile')) || {}
      if (userInfo.token) {
        config.headers.Authorization = 'Bearer ' + userInfo.token
      } else {
        Message.error('请先登录')
        setTimeout(() => {
          location.href = '/user/login-register'
        }, 1000)
      }
    }
    return config
  })
  $axios.onResponse((rsp) => {
    return rsp
  })
}
