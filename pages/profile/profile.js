import {getUserProfile} from '../../utils/asyncUtils'

Page({
  data: {
    userInfo:{},
    // 被收藏的商品的数量
    collectNums:0
  },
  async handleGetUserInfo() {
    const {userInfo} = await getUserProfile({
      desc: '用于完善会员资料'
    })
    wx.setStorageSync('userInfo', userInfo)
  },
  onShow(){
    const userInfo=wx.getStorageSync("userInfo");
    const collectList=wx.getStorageSync("collectList")||[];
    console.log(collectList.length)
    this.setData({userInfo,collectNums:collectList.length});
      
  }
})