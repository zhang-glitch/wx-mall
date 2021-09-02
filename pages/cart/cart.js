
import {getSetting, openSetting, chooseAddress, showModal, showToast} from '../../utils/asyncUtils'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAddAddress: true,
    goodsList: [],
    address: {},
    allSelect: false,
    totalPrice: 0
  },

  // 添加收货地址
  async addAddress() {
    try {
      const scope = await getSetting();
      if(!scope.authSetting["scope.address"]) {
        await openSetting();
      }
      const address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error)
    }
  },
  
  // 增加商品数量
  async handleCount(e) {
    const id = e.currentTarget.id;
    const index = e.currentTarget.dataset.index;
    let num = this.data.goodsList[index].num;
    if(id === 'down') {
      if(num > 1) {
        num--;
        this.data.goodsList[index].num = num;
      }else {
        // 删除该商品
        const isConfirm = await showModal({
          content: '确定要移除该商品吗？'
        })
        if (isConfirm.confirm) {
          this.data.goodsList.splice(index, 1);
        }
      }
    }else {
      num++;
      this.data.goodsList[index].num = num;
    }
    
    wx.setStorageSync('carts', this.data.goodsList);
    const goodsList = wx.getStorageSync('carts');
    this.setData({
      goodsList
    })
    this.handleTotalPrice()
  },

  // 选中商品
  handleCheck(e) {
    const index = e.currentTarget.dataset.id;
    this.data.goodsList[index].checked = !this.data.goodsList[index].checked;
    // 如果有一个没有选中，就将全选设置为false
    if(!this.data.goodsList[index].checked) {
      this.setData({
        allSelect: false
      })
    }
    wx.setStorageSync('carts', this.data.goodsList);
    this.handleTotalPrice()
  },

  // 确定全选
  handleAllSelect(e) {
    this.setData({
      allSelect: !this.data.allSelect
    })
    // 取反
    this.data.goodsList.forEach(item => {
      item.checked = this.data.allSelect;
    });
    wx.setStorageSync('carts', this.data.goodsList);
    const goodsList = wx.getStorageSync('carts');
    this.setData({
      goodsList
    })
    this.handleTotalPrice()
  },

  // 计算总价钱
  handleTotalPrice() {
    let _totalPrice = 0;
    this.data.goodsList.forEach((item) => {
      if(item.checked) {
        _totalPrice += item.goods_price * item.num
      }
    })

    this.setData({
      totalPrice: _totalPrice
    })
  },

  // 结算
  async handlePay() {
    // 先判断购物车是否有选中的商品
    const goods = this.data.goodsList;
    const isSelect = goods.find(item => item.checked)
    if(!goods.length) {
      // 购物车没有商品
      await showToast({
        title: "请添加购买的商品"
      })
      return;
    } 
    if(!isSelect) {
      // 购物车没有选中商品
      await showToast({
        title: "请选择购买的商品"
      })
      return;
    }
    // 没有添加收货地址
    if(this.data.isAddAddress) {
      await showToast({
        title: "请添加收货地址"
      })
      return;
    }
    // 验证成功将总价钱缓存在本地,且将选中的商品也存入本地
    wx.setStorageSync('totalPrice', this.data.totalPrice)
    const payGoodsList = [];
    this.data.goodsList.forEach((item) => {
      if(item.checked) {
        payGoodsList.push(item)
      }
    })
    wx.setStorageSync('payGoodsList', payGoodsList)
    // 验证成功，跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/pay'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    // 如果在load中调用的话，可能数据没有显示。
    // 获取本地的商品
    const goodsList = wx.getStorageSync('carts') || [];
    // every当数组为空数组时，他返回的是true.
    const isTure = goodsList.length ? goodsList.every(item => item.checked) : false;
    // 计算总价钱
    // const totalPrice = goodsList.reduce(
    //   (pre, next) => (pre?.goods_price * pre?.num) + (next?.goods_price * next?.num))
    
    this.setData({
      goodsList,
      allSelect: isTure,
    })
    // 获取总价钱
    this.handleTotalPrice()
    // 获取本地缓存的收获地址
    const _address = wx.getStorageSync('address') || {};
    if(_address.all) {
      this.setData({
        address: {
          all: _address.all,
          telNumber: _address.telNumber
        },
        isAddAddress: false
      })
    }else {
      this.setData({
        isAddAddress: true
      })
    }
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