let config = require('./config.js');
let message = require('../../component/message/message.js')

//获取电影列表
function fetchFilms(url, start, count, cb, fail_cb) {
  let that = this;
  message.hide.call(that)
  if (that.data.hasMore) {
    wx.request({
      url: url,
      data: {
        city: config.city,
        start: start,
        count: config.count
      },
      method: 'GET',
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function(res) {
        if (res.data.subjects.length ===0) {
          that.setData({
            hasMore: false
          })
        } else {
          that.setData({
            films: that.data.films.concat(res.data.subjects),
            start: that.data.start + res.data.subjects.length,
            showLoading: false
          })
        }
        wx.stopPullDownRefresh()
        typeof cb == 'function' && cb(res.data)
      },
      fail: function() {
        that.setData({
          showLoading: false
        })
        message.show.call(that, {
          content: '网络开小差了',
          icon: 'offline',
          duration: 3000
        })
        wx.stopPullDownRefresh()
        typeof fail_cb == 'function' && fail_cb()
      }
    })
  }
}

//获取电影详情
function fetchFilmDetail(url, id, cb) {
  let that = this
  message.hide.call(that)
  wx.request({
    url: url + id,
    method : 'GET',
    header : {
      "Content-Type": "application/json,application/json"
    },
    success: function(res) {
      that.setData({
        filmDetail: res.data,
        showLoading: false,
        showContent: true
      })
      wx.setNavigationBarTitle({
        title: res.data.title
      })
      wx.stopPullDownRefresh()
      typeof cb == 'function' && cb(res.data)
    },
    fail: function() {
      that.setData({
        showLoading: false
      })
      message.hide.call(that, {
        content: '网络开小差了',
        icon: 'offline',
        duration: 3000
      })
    }
  })
}

//获取任务详情
