
const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1';

export default function request({url, method, data={}}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method,
      data,
      header: {
        // cookie: wx.getStorageSync('cookies') || ''
      },
      success: (res) => {
        const {data} = res;
        if(data.meta.status === 200) {
          resolve(res.data.message)
        }
      },
      fail: err => {
        reject(err)
      }
    })
  })
}