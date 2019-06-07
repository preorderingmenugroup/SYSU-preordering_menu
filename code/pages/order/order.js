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
    restaurantid:''
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
    let str = '选中' + that.data.orderCount.num + '件商品，共' + that.data.orderCount.money + '元，是否要支付？'
    wx.showModal({
      title: '提示',
      content: str,
      success: function (res) {
        // 至少选中一个商品才能支付
        if (that.data.orderCount.num !== 0){
          if (res.confirm){
            
            const db = wx.cloud.database();
              db.collection('User').where({
                UserId: app.globalData.userInfor.openid
              }).get({
                success:res=>{
                  that.data.userid = app.globalData.userInfor.openid
                },
                fail:res=>{
                  consolr.log('fail_in_getuserinfor')
                }
              }),
              
                /*db.collection('Restaurant').where({
                  
                }).get({
                  success: res => {
                    that.data.restaurantid = app.globalData.userInfor.openid
                    
                  },
                  fail: res => {
                    console.log('fail_in_getreserantinfor')
                  }
                }),*/

                db.collection('Reservation').add({
                  data: {
                    ReserveTime: "2019-12-21",
                    CreatTime: "2019-12-21",
                    ReservationId: "11111",
                    UserId: "ow8DE5Bvq59TSYGPwkQMxTSHsMPo",
                    RestaurantId: "123131231",
                    TotalPrice: that.data.orderCount.money
                  },
                  success: res=> {
                    console.log('创建订单成功')
                      
                  },
                  fail: res=>{
                    console.log('make_new_reservation_failed')
                  }
                }),
                db.collection('ReservationItem').add({
                  data: {
                    ResvertionItemId: "",
                    ReservationId: "11111",
                    MenuItemId: "",
                    count: that.data.orderCount.num,
                    TotalPrice: that.data.orderCount.money
                  },
                  success:res=>{
                    console.log('创建订单详情成功')
                  },
                  fail:res=>{
                    console.log('创建订单详情失败')
                  }
                }),
                
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
    // 取出订单传过来的数据
    wx.getStorage({
      key: 'orders',
      success: function (res) {
        that.setData({
          items: res.data
        });
        // 价格统计汇总
        let money = 0;
        let num = res.data.length;
        res.data.forEach(item => {
          money += (item.price*item.num); // 总价格求和
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
  pass_rev_id:function(){
    var rev_id=this.data.reservationid;
    wx.setStorage({
      key: 'pay',
      data: 'rev_id',
    })
  },
  
  
})