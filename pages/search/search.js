// pages/search/search.js
let message = require("../../component/message/message")
let douban = require("../../common/script/fetch")
let config = require("../../common/script/config")

Page({
  data: {
    searchType: "keyword",
    hotKeyword: config.hotKeyword,
    hotTag: config.hotTag
  },
  changeSearchType: function() {
    let types = ["默认", "类型"]
    let searchType = ["keyword", "tag"]
    let that = this
    wx.showActionSheet({
      itemList: types,
      success: function(res) {
        if(!res.cancel) {
          that.setData({
            searchType: searchType[res.tabIndex]
          })
        }
      }
    })
  },
  search: function(e) {
    let that = this
    let keyword = e.detail.value.keyword
    if(keyword == "") {
      message.show.call(that, {
        content: "请输入内容",
        icon: "null",
        duration: 1500
      })
      return false
    } else {
      let searchUrl = that.data.searchType == "keyword" ? config.apiList.search.byKeyword : config.apiList.search.byTag
      wx.redirectTo({
        url: "../searchResult/searchResult?url=" + encodeURIComponent(searchUrl) + "&keyword=" + keyword 
      })
    }
  },
  searchByKeyword: function(e) {
    let that = this
    let keyword = e.currentTarget.dataset.keyword
    wx.redirectTo({
      url: "../searchResult/searchResult?url=" + encodeURIComponent(config.apiList.search.byKeyword) + "&keyword=" + keyword
    })
  },
  searchByTag: function(e) {
    let that = this
    let keyword = e.currentTarget.dataset.keyword
    wx.redirectTo({
      url: "../searchResult/searchResult?url=" + encodeURIComponent(config.apiList.search.byTag) + "&keyword=" + keyword
    }) 
  }
})