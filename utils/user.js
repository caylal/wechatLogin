/**检查微信会话是否过期 */
const checkSession = () => {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success: () => {
        resolve(true);
      },
      fail: () => {
        reject(false);
      }
    })
  })
}
/**检查用户是否登录 */
const checkLogin = () => {
  return new Promise((resolve, reject) => {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      checkSession().then(() => {
        resolve(true)
      }).catch(() => reject(false))
    }else{
      reject(false)
    }
  })
}
/**获取用户信息 */
const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      withCredentials: true,
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    })
  })
}

module.exports = { 
  checkLogin: checkLogin,
  getUserInfo: getUserInfo
}