// pages/goodsList/goodsList.js
import request from '../../http/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabBarList: ["综合", "销量", "价格"],
    tabBarData: []
  },

  // 接口要的参数
  queryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPages:1,

  async getTabBarData(params) {
    const data = await request({
      url: '/goods/search',
      method: 'get',
      data:params
    })
    // 获取 总条数
    const total=data.total;
    // 计算总页数
    this.totalPages=Math.ceil(total/this.queryParams.pagesize);
    
    this.setData({
      tabBarData: [...this.data.tabBarData, ...data.goods]
    })
  },

  // 处理子组件传递的事件
  changeIndex(e) {
    if(e.detail === 0) {
      this.getTabBarData(this.queryParams)
    }else {
      this.setData({
        tabBarData: []
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid || '';
    this.queryParams.query = options.query || '';
    this.getTabBarData(this.queryParams);
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
    // 1 重置数组
    this.setData({
      tabBarData: []
    })
    // 2 重置页码
    this.queryParams.pagenum=1;
    // 3 发送请求
    this.getTabBarData(this.queryParams);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.totalPages > this.queryParams.pagenum) {
      this.queryParams.pagenum = this.queryParams.pagenum++;
      this.getTabBarData(this.queryParams);
    }else {
      wx.showToast({ title: '没有下一页数据' });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})