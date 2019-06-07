const app = getApp();
Page({
  data: {
    navBar: ['全部', '待接单', '已完成', '已取消'],
    currTab: 0,
    orderStatus: ['待接单', '已完成', '已取消']
  },

  onNavTap: function (e) {
    this.setData({
      currTab: e.currentTarget.dataset.navidx
    })
  },

  queryDB: function () {
    const db = wx.cloud.database()
    db.collection('User').where({
      UserId: app.globalData.userInfor.openid
    }).get({
      success: res => {
        this.setData({
          totalOrder: res.data[0].totalOrder,
          waitOrder: res.data[0].waitOrder,
          finishOrder: res.data[0].finishOrder,
          cancelOrder: res.data[0].cancelOrder
        })
      },
      fail: res => {
        console.log('failed')
      }
    })
  },

  onOrderDetail: function (e) {
    this.setData({
      detailOrderStamp: e.currentTarget.dataset.orderid
    })
    wx.navigateTo({ url: '../orderCustomer/orderCustomer' })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.queryDB()
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {
    this.queryDB()
    wx.stopPullDownRefresh()
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})
