export default ({ $axios, redirect }) => {
  $axios.onResponse((rsp) => {
    return rsp
  })
}
