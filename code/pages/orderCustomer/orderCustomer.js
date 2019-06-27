/*
 * 作者：利庆升
 */

const app = getApp();
Page({
  data: {
    orderStatus: ['待接单', '待发餐', '已完成', '已取消'],
    hasData: false,
    totalOrd: {}
  },

  queryDB: function () {
    /*
        const dbt = wx.cloud.database()
    
        dbt.collection('User').where({
          _openid: 'ow8DE5Bvq59TSYGPwkQMxTSHsMPo',
        }).get().then(res => {
          // res.data 包含该记录的数据
          console.log(res.errMsg)
        })
          .catch(console.error)
    
    */

    /*
        wx.cloud.callFunction({
          name: 'getRestaurant',
          data: {
            schoolid: res.result.data[0].SchoolId
          }
        })
          .then(res => {
            console.log(res.result.data[0].RestaurantId)
          })
          .catch(err => { console.log(err) })
    */

    //var totalOrd = []

    this.setData({
      hasData: false,
      totalOrd: []
    })

    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]

    //prevPage.data.detailOrderStamp

    console.log('resvid is: ' + prevPage.data.detailOrderStamp)

    wx.cloud.callFunction({
      name: 'getRestaurant',
    })
      .then(res => {
        console.log(res.result.data[0].RestaurantId)

        const db = wx.cloud.database()

        db.collection('Reservation').doc(prevPage.data.detailOrderStamp).get()

        //wx.cloud.callFunction({
        //  name: 'getAllReservation',
        //  data: {
        //    resid: res.result.data[0].RestaurantId
        //  }
        //})
          .then(ord => {
            var totalOrdArr_ = ord.data

            console.log(totalOrdArr_)

            if (totalOrdArr_.length === 0) {
              console.log('no order')
            }
            else {

              const db = wx.cloud.database()

              db.collection('User').where({
                _openid: totalOrdArr_._openid
              }).get()


                //wx.cloud.callFunction({
                //  name: 'getRestaurant',
                //  data: {
                //    resid: totalItem.RestaurantId
                //  }
                //})
                .then(user => {
                  console.log(user.data)

                  totalOrdArr_.dineAddress = res.result.data[0].Address
                  totalOrdArr_.logo = user.data[0].ProfileImage
                  totalOrdArr_.name = user.data[0].UserName

                  //console.log(totalItem)
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
                //    resvid: totalItem.ReservationId
                //  }
                //})
                .then(itm => {
                  console.log(itm.data)

                  totalOrdArr_.items = itm.data
                  totalOrdArr_.items.sort(function (a, b) { return a.ReservationItemId - b.ReservationItemId });
                  //console.log(totalItem)

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
                      .then(menu => {

                        oneItem.name = menu.data[0].MenuItemName
                        oneItem.img = menu.data[0].Photo

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


      })
      .catch(err => { console.log(err) })







    /*
        wx.cloud.callFunction({
          name: 'getMe'
        }).then(res => {
            wx.cloud.callFunction({
              name: 'getRestaurant',
              data: {
                schoolid: res.result.data[0].SchoolId
              }
            })
              .then(res => {
                console.log(res.result.data[0].RestaurantId)
    
                wx.cloud.callFunction({
                  name: 'getMenus',
                  data: {
                    resid: res.result.data[0].RestaurantId
                  }
                })
                  .then(res => {
                    console.log(res.result.data)
                  })
                  .catch(err => { console.log(err) })
    
              })
              .catch(err => { console.log(err) })
          })
          .catch(err =>{ console.log(err)})
    */

    /*
    
        var totalOrd = []
    
        this.setData({
          hasData: false,
          totalOrd: totalOrd
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
    
    
    */


  },

  onToReceive: function (e) {
    wx.showModal({
      title: '提示',
      content: '确定接受该订单？',
      success: res => {
        if (res.confirm) {
          console.log('receive')


          wx.cloud.callFunction({
            name: 'updateStatus',
            data: {
              resvid: e.currentTarget.dataset.orderid,
              status: 1
            }
          })
            .then(res => {
              console.log(res.result)
              var that = this
              that.data.totalOrd.Status = 1
              wx.showToast({
                title: '接单成功',
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

  onToReject: function (e) {
    wx.showModal({
      title: '提示',
      content: '确定拒绝该订单？',
      success: res => {
        if (res.confirm) {
          console.log('cancel')


          wx.cloud.callFunction({
            name: 'updateStatus',
            data: {
              resvid: e.currentTarget.dataset.orderid,
              status: 3
            }
          })
            .then(res => {
              console.log(res.result)
              var that = this
              that.data.totalOrd.Status = 3
              wx.showToast({
                title: '拒接成功',
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

  onToGive: function (e) {
    wx.showModal({
      title: '提示',
      content: '确定已经发餐？',
      success: res => {
        if (res.confirm) {
          console.log('give')


          wx.cloud.callFunction({
            name: 'updateStatus',
            data: {
              resvid: e.currentTarget.dataset.orderid,
              status: 2
            }
          })
            .then(res => {
              console.log(res.result)
              var that = this
              that.data.totalOrd.Status = 2
              wx.showToast({
                title: '您已发餐',
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
  /*
    onToOrder: function () {
      wx.reLaunch({ url: '../index/index' })
    },
  */
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
    this.queryDB()
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
