const app = getApp();

Page({  
    data: {  
      tempFilePaths: "",
      hasImage: 0,
      name: "",
      describe: "",
      countNum: 0,
      price: 0,
      openid: "ow8DE5Bvq59TSYGPwkQMxTSHsMPo",
      food: {
        title: "",
        price: 12,
        active: false,
        describe: "",
        imageUrl: ""
      }
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
  /*chooseImage: function (name) {
    var that = this
    //让用户选择或拍摄一张照片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        //选择完成会先返回一个临时地址保存备用
        const tempFilePaths = res.tempFilePaths
        //将照片上传至云端需要刚才存储的临时地址
        wx.cloud.uploadFile({
          cloudPath: 'menuItem/as.jpg',
          filePath: tempFilePaths[0],
          success(res) {
            //上传成功后会返回永久地址
            console.log(res.fileID)
          }
        })
        that.setData({
          tempFilePaths: res.tempFilePaths[0],
          hasImage: 1
        })  
      }
    })
  },*/

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

    getOpenid: function() {  
        let that = this;  //获取openid不需要授权
        wx.login({   
            success: function(res) {    //请求自己后台获取用户openid
                wx.request({     
                    url: 'https://30paotui.com/user/wechat',
                    data: {
                        appid: '你的小程序appid',      
                        secret: '你的小程序secret',      
                        code: res.code
                },    
                success: function(response) {
                    var openid = response.data.openid;      
                    console.log('请求获取openid:' + openid);      //可以把openid存到本地，方便以后调用
                    wx.setStorageSync('openid', openid);
                    that.setData({
                        openid: "获取到的openid：" + openid
                    })
                }
                })
            }
        })
    },

    addImageSuccess: function() {
        var model = {
            MenuItemName: "",
            Price: 0,
            active: false,
            ItemDescription: "",
            ImageUrl: "",
            countNum: "",
            MenuItemId: "",
            RestaurantId: "",
            num: 0,
        }

        model.MenuItemName = this.data.name
        model.Price = this.data.price
        model.ItemDescription = this.data.describe
        model.ImageUrl = this.data.tempFilePaths
        model.num = this.data.countNum

        this.setData({
            food: model,
        })
        var addFood = JSON.stringify(this.data.food)
        var preNum = "ow8DE5Bvq59TSYGPwkQMxTSHsMPo00000000"
        var strNum = this.data.countNum.toString()
        if (this.data.countNum < 10) {
            preNum += "0"
        }
        strNum = preNum+strNum
        //添加数据
        console.log(strNum)
        model.countNum = strNum

        const db = wx.cloud.database()
        //const db = wx.cloud.database()
        console.log("我的openid",this.data.openid)

        //使用正则表达式获取图片后缀
        let suffix = /\.[^\.]+$/.exec(this.data.tempFilePaths)[0];
    
        wx.cloud.uploadFile({
            cloudPath: "canteen/Maester/food/"+model.countNum+suffix,   //使用MenuItemId作为云路径+图片后缀
            filePath: this.data.tempFilePaths, // 文件路径
            success: res => {
              // get resource ID
              console.log(res.fileID)
              model.ImageUrl = res.fileID
              db.collection('Restaurant').where({
                OwenId: this.data.openid//app.globalData.userInfor.openid
              }).get({
                success: function (res) {
                  console.log('店铺查询成功: ', res)
                  db.collection('MenuItem').add({
                    data: {
                      ItemDescription: model.ItemDescription,
                      MenuItemName: model.MenuItemName,
                      MenuItemId: model.countNum,
                      Price: model.Price,
                      RestaurantId: res.data[0].RestaurantId,
                      Photo: model.ImageUrl,
                      Class: "hh",
                      id: model.num,
                    },
                    success: function (res) {
                      console.log("新建菜品成功", res)
                    }

                  })
                }
              })

            },
            fail: err => {
              // handle error
              console.log(err)
            }
        })

        wx.showToast({
            title: '正在添加中',
            icon: 'success',
            duration: 5000,
        })
        //使用setTimeout可以防止数据库没有写入完成就已经跳转回商家页面的情况
        let that = this
        setTimeout(function(){
            that.jumpToMerchant();
        },5000)
    },

    jumpToMerchant: function() {
        wx.navigateTo({
            url: "../merchant/merchant"
        })
    }


  })