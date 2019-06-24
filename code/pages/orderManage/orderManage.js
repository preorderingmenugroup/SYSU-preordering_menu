const app = getApp();
Page({
  data: {
    navBar: ['待接单', '待就餐', '已完成', '已取消'],
    currTab: 0,
    orderStatus: ['待接单', '待就餐', '已完成', '已取消'],
    detailOrderStamp: 0,
    hasData: false,
    totalOrd: []
  },

  onNavTap: function (e) {
    this.setData({
      currTab: e.currentTarget.dataset.navidx
    })
  },

  queryDB: function () {



    wx.cloud.callFunction({
      // 云函数名称
      name: 'getMenus',
      // 传给云函数的参数
      data: {
        a: 1,
        b: 2,
      },
    })
      .then(res => {
        console.log(res.result) // 3
      })
      .catch(console.error)




    var totalOrd = []

    this.setData({
      hasData: false,
      totalOrd: totalOrd
    })

    const db = wx.cloud.database()
    db.collection('User').where({
      UserId: app.globalData.userInfor.openid
    }).get({
      success: res => {
        console.log(res.data[0].SchoolId)

        db.collection('User').where({
          UserId: app.globalData.userInfor.openid
        }).get({
          success: res => {
            console.log(res.data[0].SchoolId)




          },
          fail: res => {
            console.log('failed')
          }
        })


      },
      fail: res => {
        console.log('failed')
      }
    })




    const dbr = wx.cloud.database()
    dbr.collection('Restaurant').get({
      success: res => {
        var restaurantArr = res.data

        const dbm = wx.cloud.database()
        dbm.collection('MenuItem').get({
          success: res => {
            var menuArr = res.data

            const db1 = wx.cloud.database()
            db1.collection('Reservation').where({
              UserId: app.globalData.userInfor.UserId
            }).get({
              success: res => {
                var totalOrdArr = res.data
                totalOrdArr.sort(function (a, b) { return a.ReservationId - b.ReservationId });

                console.log(totalOrdArr)

                if (totalOrdArr.length === 0) {
                  console.log('no order')
                }
                else {

                  var totalOrdItmArr = []

                  for (var i = 0; i < totalOrdArr.length; i++) {
                    const db2 = wx.cloud.database()
                    db2.collection('ReservationItem').where({
                      ReservationId: totalOrdArr[i].ReservationId
                    }).get({
                      success: res => {
                        totalOrdItmArr.push(res.data)
                        if (totalOrdItmArr.length === totalOrdArr.length) {
                          totalOrdItmArr.sort(function (a, b) { return a[0].ReservationId - b[0].ReservationId });
                          console.log(totalOrdItmArr)

                          for (var j = 0; j < totalOrdArr.length; j++) {
                            var orderOne = {
                              dineAddress: "",
                              dineTime: "",
                              food: [],
                              logo: "",
                              name: "",
                              num: 0,
                              orderId: "",
                              orderTime: "",
                              price: 0,
                              status: 0
                            };

                            orderOne.orderTime = totalOrdArr[j].CreatTime.toString().substring(0, 24)
                            orderOne.orderId = totalOrdArr[j].ReservationId
                            orderOne.dineTime = totalOrdArr[j].ReserveTime.toString().substring(0, 24)
                            orderOne.status = totalOrdArr[j].Status
                            orderOne.price = totalOrdArr[j].TotalPrice

                            var thisRestaurant = restaurantArr.find(o => o.RestaurantId === totalOrdArr[j].RestaurantId)
                            orderOne.dineAddress = thisRestaurant.Address
                            orderOne.logo = thisRestaurant.GatePhoto
                            orderOne.name = thisRestaurant.RestaurantName

                            for (var u = 0; u < totalOrdItmArr[j].length; u++) {
                              var foodOne = {
                                img: "",
                                name: "",
                                num: 0,
                                price: 0
                              };

                              foodOne.num = totalOrdItmArr[j][u].Count
                              orderOne.num += totalOrdItmArr[j][u].Count

                              var thisMenu = menuArr.find(o => o.MenuItemId === totalOrdItmArr[j][u].MenuItemId)
                              foodOne.img = thisMenu.Photo
                              foodOne.name = thisMenu.MenuItemName
                              foodOne.price = thisMenu.Price

                              orderOne.food.push(foodOne)

                            }

                            this.data.totalOrd.push(orderOne)
                          }

                          console.log(this.data.totalOrd)

                          var that = this;

                          that.setData({
                            hasData: true,
                            totalOrd: that.data.totalOrd
                          })

                        }
                      },
                      fail: res => {
                        console.log('failed')
                      }
                    })
                  }

                }
              },
              fail: res => {
                console.log('failed')
              }
            })


          },
          fail: res => {
            console.log('failed')
          }
        })

      },
      fail: res => {
        console.log('failed')
      }
    })

  },

  onOrderDetail: function (e) {
    this.data.detailOrderStamp = e.currentTarget.dataset.orderid
    wx.navigateTo({ url: '../orderDetail/orderDetail' })
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
