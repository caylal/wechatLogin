//app.js

import user from 'utils/user.js'
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    user.checkLogin().then(res => {
      console.log('app login')
      this.globalData.userInfo = wx.getStorageSync('userInfo');
      this.globalData.token = wx.getStorageSync('token');
    }).catch(() => {
      wx.navigateTo({
        url: "/pages/authorize/index"
      }) 
    });
    
  },
  globalData: {
    userInfo: null,
    token:''
  }
})