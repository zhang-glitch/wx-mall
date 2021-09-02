
import request from '../../http/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [],
    currentIndex: 0,
    // 每次切换标题，使滚动条在顶部
    scrollTop: 0
  },

  // 点击items
  handleClick(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index,
      scrollTop: 0
    })
  },

  async getCategoryList () {
    const data = await request({
      url: '/categories',
      method: 'get'
    })
    // 缓存数据
    wx.setStorageSync("categoryList", {timeout: new Date().getTime(), data})
    return data
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let categoryList = [];
    const categoryListCache = wx.getStorageSync('categoryList');
    // 当有缓存，且缓存没有超过5min，取缓存中的数据
    if(categoryListCache && new Date().getTime() - categoryListCache.timeout < 1000 * 60 * 5) {
      categoryList = categoryListCache.data
    }else {
      categoryList = await this.getCategoryList()
    }
    this.setData({
      categoryList
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