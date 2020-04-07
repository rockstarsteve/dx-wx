// pages/join/join.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    times: 2
  },

  onLike: function (event) {
    console.log(this.data.times)
    this.setData({
      times: ++this.data.times
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("生命周期函数--监听页面加载")
    wx.request({
      url: 'http://localhost:8083/api/user/getUser',
      success: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("生命周期函数--监听页面初次渲染完成")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("生命周期函数--监听页面显示")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("生命周期函数--监听页面隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("生命周期函数--监听页面卸载")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("页面相关事件处理函数--监听用户下拉动作")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("页面上拉触底事件的处理函数")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("页面上拉触底事件的处理函数")
  }
})
