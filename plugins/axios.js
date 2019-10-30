export default ({ $axios, redirect }) => {
  $axios.defaults.baseURL = 'http://127.0.0.1:1337/'
  $axios.onResponse((rsp) => {
    return rsp
  })
}
