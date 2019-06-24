const app = getApp();
Page({
  data: {
    orderStatus: ['待接单', '待就餐', '已完成', '已取消'],
    hasData: false,
    /*
    thisOrder: {
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
    },
    */

    totalOrd: {}
  },

  queryDB: function () {


    this.setData({
      hasData: false,
      totalOrd: {}
    })


    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]

    //prevPage.data.detailOrderStamp

    console.log('resvid is: ' + prevPage.data.detailOrderStamp)

    wx.cloud.callFunction({
      name: 'getOneReservation',
      data: {
        resvid: prevPage.data.detailOrderStamp
      }
    })
      .then(res => {
        var totalOrdArr_ = res.result.data

        console.log(totalOrdArr_)

        if (totalOrdArr_.length === 0) {
          console.log('no order')
        }
        else {

            wx.cloud.callFunction({
              name: 'getRestaurant',
              data: {
                resid: totalOrdArr_[0].RestaurantId
              }
            })
              .then(res => {
                console.log(res.result.data)

                totalOrdArr_[0].dineAddress = res.result.data[0].Address
                totalOrdArr_[0].logo = res.result.data[0].GatePhoto
                totalOrdArr_[0].name = res.result.data[0].RestaurantName

                //console.log(totalOrdArr_[0])
                this.setData({

                  hasData: true,
                  totalOrd: totalOrdArr_[0]

                })



              })
              .catch(err => { console.log(err) })


            wx.cloud.callFunction({
              name: 'getReservationItem',
              data: {
                resvid: totalOrdArr_[0].ReservationId
              }
            })
              .then(res => {
                console.log(res.result.data)

                totalOrdArr_[0].items = res.result.data
                totalOrdArr_[0].items.sort(function (a, b) { return a.ReservationItemId - b.ReservationItemId });
                //console.log(totalOrdArr_[0])

                totalOrdArr_[0].num = 0

                totalOrdArr_[0].items.forEach(oneItem => {

                  totalOrdArr_[0].num += oneItem.Count

                  wx.cloud.callFunction({
                    name: 'getMenuItem',
                    data: {
                      menuitmid: oneItem.MenuItemId
                    }
                  })
                    .then(res => {

                      oneItem.name = res.result.data[0].MenuItemName
                      oneItem.img = res.result.data[0].Photo

                      console.log(totalOrdArr_[0])

                      this.setData({
                        hasData: true,
                        totalOrd: totalOrdArr_[0]
                      })

                    })
                    .catch(err => { console.log(err) })


                });

                this.setData({
                  hasData: true,
                  totalOrd: totalOrdArr_[0]
                })


              })
              .catch(err => { console.log(err) })




        }

      })
      .catch(err => { console.log(err) })




/*
    var thisOrder = {
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

    this.setData({
      hasData: false,
      thisOrder: thisOrder
    })

    const dbr = wx.cloud.database()
    dbr.collection('Restaurant').get({
      success: res => {
        var restaurantArr = res.data

        const dbm = wx.cloud.database()
        dbm.collection('MenuItem').get({
          success: res => {
            var menuArr = res.data

            var pages = getCurrentPages()
            var prevPage = pages[pages.length - 2]

            const db1 = wx.cloud.database()
            db1.collection('Reservation').where({
              UserId: app.globalData.userInfor.openid,
              ReservationId: prevPage.data.detailOrderStamp
            }).get({
              success: res => {
                var totalOrdArr = res.data

                console.log(totalOrdArr)

                if (totalOrdArr.length === 0) {
                  console.log('no order')
                }
                else {

                  const db2 = wx.cloud.database()
                  db2.collection('ReservationItem').where({
                    ReservationId: totalOrdArr[0].ReservationId
                  }).get({
                    success: res => {
                      var totalOrdItmArr = res.data

                      console.log(totalOrdItmArr)

                      this.data.thisOrder.orderTime = totalOrdArr[0].CreatTime.toString().substring(0, 24)
                      this.data.thisOrder.orderId = totalOrdArr[0].ReservationId
                      this.data.thisOrder.dineTime = totalOrdArr[0].ReserveTime.toString().substring(0, 24)
                      this.data.thisOrder.status = totalOrdArr[0].Status
                      this.data.thisOrder.price = totalOrdArr[0].TotalPrice

                      var thisRestaurant = restaurantArr.find(o => o.RestaurantId === totalOrdArr[0].RestaurantId)
                      this.data.thisOrder.dineAddress = thisRestaurant.Address
                      this.data.thisOrder.logo = thisRestaurant.GatePhoto
                      this.data.thisOrder.name = thisRestaurant.RestaurantName

                      for (var u = 0; u < totalOrdItmArr.length; u++) {
                        var foodOne = {
                          img: "",
                          name: "",
                          num: 0,
                          price: 0
                        };

                        foodOne.num = totalOrdItmArr[u].Count
                        this.data.thisOrder.num += totalOrdItmArr[u].Count

                        var thisMenu = menuArr.find(o => o.MenuItemId === totalOrdItmArr[u].MenuItemId)
                        foodOne.img = thisMenu.Photo
                        foodOne.name = thisMenu.MenuItemName
                        foodOne.price = thisMenu.Price

                        this.data.thisOrder.food.push(foodOne)

                      }

                      console.log(this.data.thisOrder)

                      var that = this;

                      that.setData({
                        hasData: true,
                        thisOrder: that.data.thisOrder
                      })

                    },
                    fail: res => {
                      console.log('failed')
                    }
                  })

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

*/

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
