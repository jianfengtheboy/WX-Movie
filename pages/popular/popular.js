// pages/popular/popular.js
let douban = require("../../common/script/fetch")
let config = require("../../common/script/config")
let app = getApp()

Page({
  data: {
    films: [],
    hasMore: true,
    showLoading: true,
    start: 0,
    bannerList: config.bannerList
  },
  onLoad: function (options) {
    let that = this
    wx.showNavigationBarLoading()
    app.getCity(function() {
      wx.hideNavigationBarLoading()
      wx.setNavigationBarTitle({
        title: '正在热映' + config.city,
      })
      douban.fetchFilms.call(that, config.apiList.popular, that.data.start)
    })
  },
  onPullDownRefresh: function () {
    let that = this
    that.setData({
      films: [],
      hasMore: true,
      showLoading: true,
      start: 0
    })
    this.onLoad()
  },
  onReachBottom: function () {
    let that = this
    if (!that.data.showLoading) {
      douban.fetchFilms.call(that, config.apiList.popular, that.data.start)
    }
  },
  viewFilmDetail(e) {
    let data = e.currentTarget.datasetwx.navigateTo({
      url: "../filmDetail/filmDetail?id=" + data.id
    })
  },
  viewFilmByTag(e) {

  },
  viewBannerDetail(e) {

  },
  viewSearch() {
    
  }
})