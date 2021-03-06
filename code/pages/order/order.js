//order.js
//获取应用实例
var utils = require('../../utils/util.js');
//获取当前时间需引用utils文件

const app = getApp();

Page({
  data: {
    // 统计商品数量和价格
    orderCount: {
      num: 0,
      money: 0
    },
    bottomFlag: false,
    // 提交的订单
    orders: true,
    items: [],
    userid:'',
    restaurantid:'',
    time: "",
    getfoodtime:"",
    timestamp:"",
    menuitemid:"",
    schoolid:"",
    resid:""
  },
  // 点击对应菜单添加按钮
  del: function (event) {
    let that = this;
    let id = event.target.dataset.id;
    let index = event.target.dataset.index;
    let param = this.data.items[index];
    if(param.num > 0){
      param.num--; // 每点一次减少1
    } else {
      param.num = 0; // 最低为0
    }
    // 改变添加按钮的状态
    this.data.items.splice(index, 1, param);
    that.setData({
      items: this.data.items
    });
    let money = 0;
    let num = 0;
    // 将已经确定总价格和数量求和
    this.data.items.forEach(item => {
      money += item.price * item.num;
      num += item.num;
    });
    let orderCount = {
      num,
      money
    }
    // 设置显示对应的总数和全部价钱
    this.setData({
      orderCount
    });
  },
  // 点击对应菜单添加按钮
  add: function(event) {
    let that = this;
    let id = event.target.dataset.id;
    let index = event.target.dataset.index;
    let param = this.data.items[index];
    let subOrders = []; // 购物单列表存储数据
    param.num++; // 每点一次增加1
    // 改变添加按钮的状态
    console.log(param);
    this.data.items.splice(index, 1, param);
    that.setData({
      items: this.data.items
    });
    let money = 0;
    let num = 0;
    // 将已经确定总价格和数量求和
    this.data.items.forEach(item => {
      money += item.price*item.num;
      num += item.num; 
    });
    let orderCount = {
      num,
      money
    }
    // 设置显示对应的总数和全部价钱
    this.setData({
      orderCount
    });
  },
  // 点击结账按钮
  pay: function() {
    let that = this;
    var itemnum = that.data.items.length;
    console.log(itemnum);
    let str = '选中' + that.data.orderCount.num + '件商品，共' + that.data.orderCount.money + '元，是否要支付？'
    wx.showModal({
      title: '提示',
      content: str,
      success: function (res) {
        // 至少选中一个商品才能支付
        if (that.data.orderCount.num !== 0){
          if (res.confirm){
            that.setData({
              time: utils.formatTime(new Date()),
              getfoodtime: utils.getfood_Time(new Date()),
              timestamp: utils.getfood_timestamp(new Date())
            })
            
            const db = wx.cloud.database();
            console.log(that.data.userid);
            console.log(that.data.time);
            console.log(that.data.getfoodtime);
            console.log(that.data.timestamp);
            
            var time = new Date();
            var timestamp = time.getTime();

            /*db.collection('User').where({
              _openid: app.globalData.userInfor.openid
            }).get({
              success: res => {
                that.setData({
                  schoolid:res.data[0].SchoolId
                })
                console.log(that.data.schoolid);
              }
            })*/

            db.collection('Restaurant').where({
              SchoolId: app.globalData.userInfor.school
            }).get({
              success: res => {
                console.log(res.data)
                that.setData({
                  
                  resid:res.data[0].RestaurantId
                }),
                console.log(that.data.resid);
                db.collection('Reservation').add({
                  data: {
                    ReserveTime: that.data.getfoodtime,
                    CreatTime: that.data.time,
                    ReservationId: timestamp,
                    UserId: that.data.userid,
                    RestaurantId: that.data.resid,
                    TotalPrice: that.data.orderCount.money,
                    Status: 0
                  },
                  success: res => {
                    console.log('创建订单成功')

                    that.setData({
                      detailOrderStamp: res._id
                    })


                    for (var a = 0; a < itemnum; a++) {

                      db.collection('ReservationItem').add({
                        data: {
                          ReservationItemId: timestamp + a,
                          ReservationId: timestamp,
                          MenuItemId: that.data.items[a].menuitemid,
                          Count: that.data.items[a].num,
                          TotalPrice: (that.data.items[a].num) * (that.data.items[a].price)
                        },

                        success: res => {
                          console.log('创建订单详情成功')

                        },

                        fail: res => {
                          console.log('创建订单详情失败')
                        }
                      })
                    }

                  },
                  fail: res => {
                    console.log('make_new_reservation_failed')
                  }
                })
              },
              fail:res=> {
                console.log("查询失败")
              }
            })
              
               /* for(var a = 0;a<itemnum;a++){
                  var time = new Date();
                  var timestamp = time.getTime();
            db.collection('ReservationItem').add({
              data: {
                ReservationItemId: timestamp+a,
                ReservationId: timestamp,
                MenuItemId: that.data.items[a].menuitemid,
                Count: that.data.items[a].num,
                TotalPrice: (that.data.items[a].num) * (that.data.items[a].price)
              },

              success: res => {
                console.log('创建订单详情成功')

              },

              fail: res => {
                console.log('创建订单详情失败')
              }
            })
                } */
                /* db.collection('Reservation').add({
                   data: {
                     ReserveTime: that.data.getfoodtime,
                     CreatTime: that.data.time,
                     ReservationId: timestamp,
                     UserId: that.data.userid,
                     RestaurantId: that.data.resid,
                     TotalPrice: that.data.orderCount.money
                   },
                   success: res => {
                     console.log('创建订单成功')

                     for (var a = 0; a < itemnum; a++) {
                    
                       db.collection('ReservationItem').add({
                         data: {
                           ReservationItemId: timestamp + a,
                           ReservationId: timestamp,
                           MenuItemId: that.data.items[a].menuitemid,
                           Count: that.data.items[a].num,
                           TotalPrice: (that.data.items[a].num) * (that.data.items[a].price)
                         },

                         success: res => {
                           console.log('创建订单详情成功')

                         },

                         fail: res => {
                           console.log('创建订单详情失败')
                         }
                       })
                     } 
                     
                   },
                   fail: res => {
                     console.log('make_new_reservation_failed')
                   }
                 }),*/
                
                wx.navigateTo({
                  url: '../pay/pay',
                })
          } 
          else if (res.cancel) {
            console.log('用户点击取消')
          }
         else {
          wx.showToast({
            title: '您未选中任何商品',
            icon: 'none',
            duration: 2000
          })
        }
        }
      }
    })
  },
  onLoad: function() {
    let that = this;
    var date = new Date();
    that.data.userid = app.globalData.userInfor.openid;
    that.data.time = utils.formatTime(new Date());

    console.log(that.data.time);
    // 取出订单传过来的数据
    wx.getStorage({
      key: 'orders',
      success: function (res) {
        console.log(res.data);
        that.setData({
          
          items: res.data
        });
        console.log(res.data);
        

        
        // 价格统计汇总
        let money = 0;
        let num = 0;
        res.data.forEach(item => {
          money += (item.price*item.num); // 总价格求和
        });
        res.data.forEach(item => {
          num += item.num; // 总件数求和
        });
        let orderCount = {
          num,
          money
        }
        // 设置显示对应的总数和全部价钱
        that.setData({
          orderCount
        });
      }
    })
    

  },
  
  
  
})