// app.js
App({
  onLaunch() {
    console.log("1")
    // wx.navigateTo({
    //   url: 'pages/demo/dem',
    // })
  },
  onShow() {
    console.log("show")
  },
  onHide() {
    console.log("hide")
  },
  onPageNotFound() {
    console.log('not found')
  }
})
