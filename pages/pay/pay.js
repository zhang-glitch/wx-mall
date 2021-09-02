// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    payGoodsList: [],
    totalPrice: 0,
    isPay: false
  },

  // 支付
  handlePay() {
    const token = wx.getStorageSync('token');
    if(!token) {
      wx.navigateTo({
        url: '/pages/auth/auth'
      })
    }else {
      this.setData({
        isPay: true
      })
    }
  },

  // 关闭modal
  handleModal() {
    this.setData({
      isPay: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const address = wx.getStorageSync('address')
    const payGoodsList = wx.getStorageSync('payGoodsList');
    const totalPrice = wx.getStorageSync('totalPrice')
    this.setData({
      address,
      payGoodsList,
      totalPrice
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})