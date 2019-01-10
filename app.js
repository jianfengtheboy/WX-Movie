//app.js
let config = require('common/script/config');
App({
  globalData: {
    userInfo: null
  },
  onLaunch: function () {
    //获取用户信息
    this.getUserInfo()
    //初始化缓存
    this.initStorage()
  },
  getUserInfo: function(cb) {
    let that = this
    wx.login({
      success: function() {
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userInfo = res.userInfo
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })
      }
    })
  },
  getCity: function(cb) {

  },
  initStorage: function() {
    
  }
})