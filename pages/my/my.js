// pages/my/my.js
let config = require("../../common/script/config.js");
let app = getApp();

Page({
  data: {
    gridList: [
      { enName: 'favorite', zhName: '收藏' },
      { enName: 'history', zhName: '浏览记录' },
      { enName: 'shake', zhName: '摇一摇' },
      { enName: 'gallery', zhName: '相册' },
      { enName: 'setting', zhName: '设置' }
    ],
    skin: ''
  },
  onLoad: function (cb) {
    let that = this
    // 检测是否存在用户信息
    if (app.globalData.userInfo != null) {
      that.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      app.getUserInfo()
    }
    typeof cb == 'function' && cb()
  },
  onShow: function () {
    let that = this
    wx.getStorage({
      key: 'skin',
      success: function(res) {
        if (res.data == "") {
          that.setData({
            skin: config.skinList[0].imgUrl
          })
        }
      }
    })
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})