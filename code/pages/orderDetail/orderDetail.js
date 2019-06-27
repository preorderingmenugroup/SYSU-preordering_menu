/*
 * 作者：利庆升
 */

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

    const db = wx.cloud.database()

    db.collection('Reservation').doc(prevPage.data.detailOrderStamp).get()

//    wx.cloud.callFunction({
//      name: 'getOneReservation',
//      data: {
//        resvid: prevPage.data.detailOrderStamp
//      }
//    })
      .then(res => {
        var totalOrdArr_ = res.data

        console.log(totalOrdArr_)

        if (totalOrdArr_.length === 0) {
          console.log('no order')
        }
        else {

          const db = wx.cloud.database()

          db.collection('Restaurant').where({
            RestaurantId: totalOrdArr_.RestaurantId,
          }).get()

            //wx.cloud.callFunction({
            //  name: 'getRestaurant',
            //  data: {
            //    resid: totalOrdArr_.RestaurantId
            //  }
            //})
              .then(res => {
                console.log(res.data)

                totalOrdArr_.dineAddress = res.data[0].Address
                totalOrdArr_.logo = res.data[0].GatePhoto
                totalOrdArr_.name = res.data[0].RestaurantName

                //console.log(totalOrdArr_)
                this.setData({

                  hasData: true,
                  totalOrd: totalOrdArr_

                })



              })
              .catch(err => { console.log(err) })

          db.collection('ReservationItem').where({
            ReservationId: totalOrdArr_.ReservationId
          }).get()


            //wx.cloud.callFunction({
            //  name: 'getReservationItem',
            //  data: {
            //    resvid: totalOrdArr_.ReservationId
            //  }
            //})
              .then(res => {
                console.log(res.data)

                totalOrdArr_.items = res.data
                totalOrdArr_.items.sort(function (a, b) { return a.ReservationItemId - b.ReservationItemId });
                //console.log(totalOrdArr_)

                totalOrdArr_.num = 0

                totalOrdArr_.items.forEach(oneItem => {

                  totalOrdArr_.num += oneItem.Count


                  db.collection('MenuItem').where({
                    MenuItemId: oneItem.MenuItemId
                  }).get()
                  //wx.cloud.callFunction({
                  //  name: 'getMenuItem',
                  //  data: {
                  //    menuitmid: oneItem.MenuItemId
                  //  }
                  //})
                    .then(res => {

                      oneItem.name = res.data[0].MenuItemName
                      oneItem.img = res.data[0].Photo

                      console.log(totalOrdArr_)

                      this.setData({
                        hasData: true,
                        totalOrd: totalOrdArr_
                      })

                    })
                    .catch(err => { console.log(err) })


                });

                //this.setData({
                //  hasData: true,
                //  totalOrd: totalOrdArr_
                //})


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

  onToCancel: function (e) {
    wx.showModal({
      title: '提示',
      content: '确定取消该订单？',
      success: res => {
        if (res.confirm) {
          console.log('cancel')
          var pages = getCurrentPages()
          var prevPage = pages[pages.length - 2]

          //prevPage.data.detailOrderStamp

          console.log('resvid is: ' + prevPage.data.detailOrderStamp)

          wx.cloud.callFunction({
            name: 'updateStatus',
            data: {
              resvid: prevPage.data.detailOrderStamp,
              status: 3
            }
          })
            .then(res => {
              console.log(res.result)
              var that = this
              that.data.totalOrd.Status = 3
              wx.showToast({
                title: '取消成功',
                icon: 'none',
                duration: 1000
              })
              that.setData({
                totalOrd: that.data.totalOrd
              })
            })
            .catch(err => { console.log(err) })
        }
        else {
          console.log('no cancel')
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  onToDine: function (e) {
    wx.showModal({
      title: '提示',
      content: '确定已经就餐？',
      success: res => {
        if (res.confirm) {
          console.log('dine')
          var pages = getCurrentPages()
          var prevPage = pages[pages.length - 2]

          //prevPage.data.detailOrderStamp

          console.log('resvid is: ' + prevPage.data.detailOrderStamp)

          wx.cloud.callFunction({
            name: 'updateStatus',
            data: {
              resvid: prevPage.data.detailOrderStamp,
              status: 2
            }
          })
            .then(res => {
              console.log(res.result)
              var that = this
              that.data.totalOrd.Status = 2
              wx.showToast({
                title: '您已就餐',
                icon: 'none',
                duration: 1000
              })
              that.setData({
                totalOrd: that.data.totalOrd
              })
            })
            .catch(err => { console.log(err) })
        }
        else {
          console.log('no dine')
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  onToComment: function () {
    wx.showToast({
      title: '评价功能不可用^_^',
      icon: 'none',
      duration: 1500
    })
  },

  onToOrder: function () {
    wx.reLaunch({ url: '../index/index' })
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
