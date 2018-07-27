//index.js
//获取应用实例
import util from '../../utils/util.js'
import user from '../../utils/user.js'
const app = getApp()

Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {}
  },
  
  onLoad: function () {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          user.getUserInfo().then(res => {
            console.log(res.userInfo)
            wx.setStorageSync('userInfo', res.userInfo)
          })
          
        }
        else{
          wx.navigateTo({
            url: "/pages/authorize/index"
          })
        }
      }
    })
  },
  loginByWechat(){
  
  },
  goToIndex(){
    let that = this
    let token = wx.getStorageSync('userInfo')
    //检查是否登录
    user.checkLogin().then(res => {
      console.log('已登录')// 处理登录后的操作
      that.setData({
        userInfo: wx.getStorageSync('userInfo')
      })
    }).catch(() => {
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    })
  },
  onShow: function () {
   
    
  },
  onReady: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  }
})
