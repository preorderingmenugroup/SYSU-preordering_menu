var app = getApp()

Page({
  data: {
    temp: [{

    }],
    idNum: 0,
    // 商品列表
    items: []
  },


  onLoad: function () {
    const db = wx.cloud.database()
    var menu = []
    var that = this;

    var restruId;
    //查询RestaurantId
    db.collection('Restaurant').where({
      OwenId: app.globalData.userInfor.openid
    }).get({
      success: res => {
        restruId = res.data[0].RestaurantId;
        //查询该店铺的菜品信息
        db.collection('MenuItem').where({
          RestaurantId: restruId
        }).get({
          success: function (res) {
            console.log(res.data.length)
            // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
            for (var i = 0; i < res.data.length; i++) {
              menu.push(res.data[i])
            }
            that.setData({ items: menu });  //为什么必须把this换成that，直接调用this就不行?
            console.log(that.data.items)
          }
        })
      },
      fail: function(rese){
        console.log("查询餐馆信息失败")
      }
    })
    /*
    db.collection('MenuItem').add({
      data: {
        ItemDescription: "好吃",
        MenuItemName: "宫保鸡丁",
        Price: 15
      },
      success: function(res) {
        console.log(res)
      }
    })*/

    /*var addFood = JSON.parse(options.addFood)
    var model = {
      id: 0,
      title: '',
      price: 0,
      active: false,
      describe: '',
      imageUrl: ''
    }
    var num = this.data.items.length
    model.id = num+1
    model.title = addFood.title
    model.price = addFood.price
    model.active = addFood.active
    model.describe = addFood.describe
    model.imageUrl = addFood.imageUrl
    var items = this.data.items
    items.push(model)
    this.setData({
      items: items 
    })
    console.log(this.data.items.length)
    console.log(this.data.items)*/
  },

  onReady: function () {
  },


  deleteFood: function (e) {
    var index = e.currentTarget.dataset.index  //类型问题，为什么wxml那里改成data-index就好了
    var that = this
    const db = wx.cloud.database()
    db.collection('MenuItem').doc(this.data.items[index]._id).remove({
      success: function(res){
        that.data.items.splice(index, 1)
        that.setData({
          items: that.data.items,
        })
        wx.showToast({
          title: '删除成功',
          icon:'success'
        })
      },
      fail: console.error
    })
    //删除本地数据
    
  },


  addFood: function (e) {
    wx.navigateTo({
      url: "../addFood/addFood"
    })
  }
})