var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    index: "",
    address: "",
    description: "",
    shop: "",
    school: "",
    imageUrl: [

    ],
    owner: "",
    phone: "",
  },

  selectSch: function () {
    var that = this
    wx.showActionSheet({
      itemList: ['中山大学', '清华大学', '北京大学'],
      success: function (res) {
        var sch = ""
        switch (res.tapIndex) {
          case 0: that.data.school = "中山大学"; index = 1; break;
          case 1: that.data.school = "清华大学"; index = 2; break;
          case 2: that.data.school = "北京大学"; index = 3; break;
          default: that.data.school = "中山大学"; index = 1; break;
        }
        that.setData({
          school: that.data.school
        })
      }
    })
  },

  inputAddress: function (e) {
    this.setData({
      address: e.detail.value
    })
  },

  inputDescription: function (e) {
    this.setData({
      description: e.detail.value
    })
  },

  inputOwner: function (e) {
    this.setData({
      owner: e.detail.value
    })
  },

  inputShop: function (e) {
    this.setData({
      shop: e.detail.value
    })
  },

  inputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  bindToIndex: function (e) {
    var that = this
    var data = e.detail.value
    if (this.data.address == "") {
      console.log('未填写地址')
      wx.showToast({
        title: '未填写地址',
        icon: "none"
      })
    } else if (this.data.description == "") {
      console.log('未填写店铺描述')
      wx.showToast({
        title: '未填写店铺描述',
        icon: "none"
      })
    } else if (this.data.owner == "") {
      wx.showToast({
        title: '未填写联系人姓名',
        icon: "none"
      })
    } else if (this.data.shop == "") {
      wx.showToast({
        title: '未填写店铺名',
        icon: "none"
      })
    } else if (this.data.school.name == "店铺属于哪个学校") {
      wx.showToast({
        title: '未填写所属学校',
        icon: "none"
      })
    } else if (this.data.phoneNum == "") {
      wx.showToast({
        title: '未填写联系电话',
        icon: "none"
      })
    } else if (this.data.phone.length != 11) {
      wx.showToast({
        title: '请输入正确的电话号码',
        icon: "none"
      })
    } else {

      const db = wx.cloud.database()

      var schoolId = app.globalData.School.SchoolId[index]
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }


      db.collection('Restaurant').add({
        data: {
          Address: this.data.address,
          Description: this.data.discription,
          OwenId: app.globalData.userInfor.openid,
          RestruantId: text,
          RestaurantName: this.data.shop,
          SchoolId: schoolId,
          TelephoneNumber: this.data.phone,
          isReviewed: false,
        },
        success: res => {
          console.log("其它数据更新结果", res.data)

          var filePath1 = that.imgupload1.data.image[0]
          // 上传图片
          var timestamp = Date.parse(new Date());
          const cloudPath1 = 'RestaurantInfoImage/' + app.globalData.userInfor.openid + timestamp + filePath.match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath1,
            filePath1,
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
              app.globalData.restaurantInfor.EnvironmentPhoto = res.fileID
              //更新数据库中的图片路径
              console.log("EnvironmentPhoto ", res.fileID)
              db.collection('Restaurant').doc(that.data.dbRestaurantInfoId).update({
                data: {
                  EnvironmentPhoto: res.fileID,
                },
                success: res => {
                  console.log("EnvironmentPhoto更新success")
                },
                fail: res => {
                  console.log("EnvironmentPhoto更新失败")
                }
              })
            },
          })

          var filePath2 = that.imgupload2.data.image[0]
          // 上传图片
          var timestamp = Date.parse(new Date());
          const cloudPath2 = 'RestaurantInfoImage/' + app.globalData.userInfor.openid + timestamp + filePath.match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath2,
            filePath2,
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
              app.globalData.restaurantInfor.GatePhoto = res.fileID
              //更新数据库中的图片路径
              console.log("GatePhoto ", res.fileID)
              db.collection('Restaurant').doc(that.data.dbRestaurantInfoId).update({
                data: {
                  GatePhoto: res.fileID,
                },
                success: res => {
                  console.log("GatePhoto更新success")
                },
                fail: res => {
                  console.log("GatePhoto更新失败")
                }
              })
            },
          })

          var filePath3 = that.imgupload3.data.image[0]
          // 上传图片
          var timestamp = Date.parse(new Date());
          const cloudPath3 = 'RestaurantInfoImage/' + app.globalData.userInfor.openid + timestamp + filePath.match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath3,
            filePath3,
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
              app.globalData.restaurantInfor.IdCardBackPhoto = res.fileID
              //更新数据库中的图片路径
              console.log("IdCardBackPhoto ", res.fileID)
              db.collection('Restaurant').doc(that.data.dbRestaurantInfoId).update({
                data: {
                  IdCardBackPhoto: res.fileID,
                },
                success: res => {
                  console.log("IdCardBackPhoto更新success")
                },
                fail: res => {
                  console.log("IdCardBackPhoto更新失败")
                }
              })
            },
          })

          var filePath4 = that.imgupload4.data.image[0]
          // 上传图片
          var timestamp = Date.parse(new Date());
          const cloudPath4 = 'RestaurantInfoImage/' + app.globalData.userInfor.openid + timestamp + filePath.match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath4,
            filePath4,
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
              app.globalData.restaurantInfor.IdCardFrontPhoto = res.fileID
              //更新数据库中的图片路径
              console.log("IdCardFrontPhoto ", res.fileID)
              db.collection('Restaurant').doc(that.data.dbRestaurantInfoId).update({
                data: {
                  IdCardFrontPhoto: res.fileID,
                },
                success: res => {
                  console.log("IdCardFrontPhoto更新success")
                },
                fail: res => {
                  console.log("IdCardFrontPhoto更新失败")
                }
              })
            },
          })

          var filePath5 = that.imgupload5.data.image[0]
          // 上传图片
          var timestamp = Date.parse(new Date());
          const cloudPath5 = 'RestaurantInfoImage/' + app.globalData.userInfor.openid + timestamp + filePath.match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath5,
            filePath5,
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
              app.globalData.restaurantInfor.ProductionLicnece = res.fileID
              //更新数据库中的图片路径
              console.log("ProductionLicnece ", res.fileID)
              db.collection('Restaurant').doc(that.data.dbRestaurantInfoId).update({
                data: {
                  ProductionLicnece: res.fileID,
                },
                success: res => {
                  console.log("ProductionLicnece更新success")
                },
                fail: res => {
                  console.log("ProductionLicnece更新失败")
                }
              })
            },
          })


          // 在返回结果中会包含新创建的记录的 _id
          this.setData({
            counterId: res._id,
            count: 1
          })
          wx.showToast({
            title: '创建店铺成功',
          })
          console.log('创建店铺成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '创建店铺失败'
          })
          console.error('失败：', err)
        }

      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取imgupload组件
    this.imgupload1 = this.selectComponent("#imgupload1");
    this.imgupload2 = this.selectComponent("#imgupload2");
    this.imgupload3 = this.selectComponent("#imgupload3");
    this.imgupload4 = this.selectComponent("#imgupload4");
    this.imgupload5 = this.selectComponent("#imgupload5");
    var that = this

    success: res => {
      if (res.data) {
        console.log(res.data)
        that.imgupload.setData({
          image: res.data.imageUrl
        })
        that.setData({
          imageUrl: res.data.imageUrl,
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.imgupload1 = this.selectComponent("#imgupload1");
    this.imgupload2 = this.selectComponent("#imgupload2");
    this.imgupload3 = this.selectComponent("#imgupload3");
    this.imgupload4 = this.selectComponent("#imgupload4");
    this.imgupload5 = this.selectComponent("#imgupload5");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})