
import request from '../../http/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryValue: '',
    searchList: []
  },

  // 搜索数据
  async getSearchList(queryValue) {
    const data = await request({
      url: '/goods/qsearch',
      method: 'get',
      data: {
        query: queryValue
      }
    })
    return data
  },
  
    
  timer: null,

  handleSearch(e) {
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        const searchList = await this.getSearchList(e.detail.value)
        this.setData({
          searchList,
          queryValue: e.detail.value
        })
      }, 300)
      if(!e.detail.value) {
        this.setData({
          searchList: [],
          queryValue: ''
        })
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    
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