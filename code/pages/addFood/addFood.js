var app = getApp();
Page({  
    data: {  
      tempFilePaths: "",
      hasImage: 0,
      name: "",
      describe: "",
      countNum: 0,
      price: 0,
      food: {
        title: "",
        price: 12,
        active: false,
        describe: "",
        imageUrl: ""
      },
      categorys: ["面食", "盖浇饭", "热菜", "凉菜", "主食", "甜点", "饮料"],
      cateIndex:0
    }, 
    
    onLoad: function () {
        const db = wx.cloud.database()
        var that = this
        db.collection('MenuItem').get({
            success: function(res) {
                var num = res.data.length+1
                that.setData({countNum:num});  //为什么必须把this换成that，直接调用this就不行?
            }
        })
    },  

    chooseImage: function () {
      var _this = this;  
      wx.chooseImage({  
        count: 1, // 默认9  
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success: function (res) {  
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
          _this.setData({
            tempFilePaths:res.tempFilePaths[0],
            hasImage: 1 
          })  
        }
      })  
    },

    inputDescribe: function(e) {
        this.setData({
            describe: e.detail.value
        })
    },

    inputFood: function(e) {
        this.setData({
            name: e.detail.value
        })
    },

    inputPrice: function(e) {
        this.setData({
            price: e.detail.value
        })
    },
  bindCategrayPicker(e) {
    console.log('Categirypicker发送选择改变，携带值为', e.detail.value)
    this.setData({
      cateIndex: e.detail.value
    })
  },
  
  addImageSuccess: function() {
      wx.showLoading({
        title: '正在创建菜品',
      })
      var that = this;
        var model = {
            MenuItemName: "",
            Price: 0,
            active: false,
            ItemDescription: "",
            ImageUrl: "",
            countNum: 0
        }
        model.MenuItemName = this.data.name
        model.Price =  parseFloat(this.data.price)
        model.ItemDescription = this.data.describe

        this.setData({
            food: model,
        })
        var addFood = JSON.stringify(this.data.food)

        //添加数据
        const db = wx.cloud.database()
        console.log(this.data.countNum)
        model.countNum = this.data.countNum
      
       
        var restruId;
        //查询RestaurantId
        db.collection('Restaurant').where({
          OwenId: app.globalData.userInfor.openid
        }).get({
          success: res => {
            
            restruId = res.data[0].RestaurantId;
            console.log("查询餐馆Id成功", restruId)
            //等到图片上传成功
            const filePath = that.data.tempFilePaths
            var date = new Date();
            var timestamp = date.getTime();
            const cloudPath = 'menuItem/' + app.globalData.userInfor.openid + timestamp + filePath.match(/\.[^.]+?$/)[0]
            wx.cloud.uploadFile({
              cloudPath,
              filePath,
              success: res => {
                console.log('[上传图片] 成功：', res)
              },
              fail: e => {
                console.error('[上传] 失败：', e)
                wx.showToast({
                  icon: 'none',
                  title: '上传失败',
                })
              },
              complete: res => {
                console.log('[上传图片] 完成：', res)
                model.ImageUrl = res.fileID
                date = new Date();//获取时间戳
                timestamp = date.getTime();
                db.collection('MenuItem').add({

                  data: {
                    ItemDescription: model.ItemDescription,
                    MenuItemName: model.MenuItemName,
                    Price: model.Price,
                    RestaurantId: restruId,
                    MenuItemId: timestamp,
                    Photo: model.ImageUrl,
                    Class: that.data.categorys[that.data.cateIndex]
                  },
                  success: function (res) {
                    console.log("添加数据成功", res)
                    wx.hideLoading();
                    wx.navigateBack({
                      
                    })
                  },
                  fail: console.error

                })
              },
            })
              
            },
            fail: res => {
              console.log("查询餐馆Id失败")
            },
            

        
        })
    },


  })