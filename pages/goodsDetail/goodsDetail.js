
import request from '../../http/request'
import {showToast} from '../../utils/asyncUtils'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    isCollect: false,
  },
  addCartData: {},

  // 获取页面详细信息
  async getGoodsDetail(id) {
    const data = await request({
      url: '/goods/detail',
      method: 'get',
      data: {
        goods_id: id
      }
    })
    // console.log(data)
    this.addCartData = {
      goods_id: data.goods_id,
      goods_name: data.goods_name,
      goods_price: data.goods_price,
      goods_small_logo: data.goods_small_logo
    }
    return {
      goods_id: data.goods_id,
      goods_name: data.goods_name,
      goods_introduce: data.goods_introduce,
      pics: data.pics,
      goods_price: data.goods_price
    }
  },

  // 点击收藏
  async handleCollect() {
    const collectList = wx.getStorageSync('collectList') || []
    const index = collectList.findIndex(item => item.goods_id === this.addCartData.goods_id)

    if(index !== -1) {
      // 已经有了该项
      collectList.splice(index, 1)
      await showToast({
        title: "取消收藏"
      })
      // 修改收藏的图标
      this.setData({
        isCollect: false
      })
    }else {
      collectList.push(this.addCartData)
      await showToast({
        title: "收藏成功"
      })
      // 修改收藏的图标
      this.setData({
        isCollect: true
      })
    }
    wx.setStorageSync('collectList', collectList)
    
  },

  // 预览图片
  previwePic(e) {
    const urls = this.data.goodsDetail.pics.map(item => item.pics_mid);
    wx.previewImage({
      urls,
      current: e.currentTarget.dataset.url
    })
  },

  // 加入购物车,将数据存入本地
  addCart() {
    // 1. 判断本地是否有购物车数据
    const carts = wx.getStorageSync('carts') || [];
      // 有，判断是否有该条商品
      const index = carts.findIndex(item => item.goods_id === this.addCartData.goods_id)
      if(index === -1) {
        // 第一次添加
        carts.push({...this.addCartData, num: 1})
      }else {
        // 再次添加
        carts[index].num++;
      }
      wx.setStorageSync('carts', carts)

      wx.showToast({
        title: '添加成功',
        icon: 'success',
        mask: true
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const goodsDetail = await this.getGoodsDetail(options.id)
    this.setData({
      goodsDetail
    })

    // 当首次进入时，来判断收藏按钮
    const collectList = wx.getStorageSync('collectList') || []
    const isHas = collectList.find(item => item.goods_id === this.addCartData.goods_id)
    if(isHas) {
      this.setData({
        isCollect: true
      })
    }
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