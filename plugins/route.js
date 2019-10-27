export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    console.log('Just skip')
    next()
  })
}
