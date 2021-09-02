// pages/index.js'
import request from '../../http/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    catItemsList: [],
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async getBannerList () {
    const bannerList = await request({
      url: '/home/swiperdata',
      method: 'get'
    })
    return bannerList
  },
  async getCatItemsList () {
    const catItemsList = await request({
      url: '/home/catitems',
      method: 'get'
    })
    return catItemsList
  },
  async getFloorList () {
    const floorList = await request({
      url: '/home/floordata',
      method: 'get'
    })
    for(let index in floorList) {
      floorList[index].product_list_min_img = floorList[index].product_list.slice(1)
    }
    return floorList
  },
  onLoad: async function (options) {
    const bannerList = await this.getBannerList()
    const catItemsList = await this.getCatItemsList()
    const floorList = await this.getFloorList()
    this.setData({
      bannerList,
      catItemsList,
      floorList
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