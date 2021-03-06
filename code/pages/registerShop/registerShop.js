var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    address: "",
    description: "",
    shop: "",
    index: "",
    school: "",
    owner: "",
    tempEnvironmentPhoto: "",
    tempGatePhoto: "",
    tempIdCardBackPhoto: "",
    tempIdCardFrontPhoto: "",
    tempProductionLicence: "",
    phone: "",
    key: false,
    schoolIndex: 0,
    schoolList: ["面食", "盖浇饭", "热菜", "凉菜", "主食", "甜点", "饮料"]
  },

  selectSch: function (e) {
    this.setData({
      schoolIndex: e.detail.value
    })
    this.setData({
      school: app.globalData.School.SchoolName[this.data.schoolIndex],
      index: app.globalData.School.SchoolId[this.data.schoolIndex]
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

  upEnvironmentPhoto: function () {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.data.tempEnvironmentPhoto = res.tempFilePaths
        that.setData({
          EnvironmentPhoto: res.tempFilePaths
        })
      }
    })
  },

  upGatePhoto: function () {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.data.tempGatePhoto = res.tempFilePaths
        that.setData({
          GatePhoto: res.tempFilePaths
        })
      }
    })
  },

  upIdCardBackPhoto: function () {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.data.tempIdCardBackPhoto = res.tempFilePaths
        that.setData({
          IdCardBackPhoto: res.tempFilePaths
        })
      }
    })
  },

  upIdCardFrontPhoto: function () {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.data.tempIdCardFrontPhoto = res.tempFilePaths
        that.setData({
          IdCardFrontPhoto: res.tempFilePaths
        })
      }
    })
  },

  upProductionLicence: function () {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.data.tempProductionLicence = res.tempFilePaths
        that.setData({
          ProductionLicence: res.tempFilePaths
        })
      }
    })
  }, 

  bindToIndex: function (e) {
    var that = this
    var data = e.detail.value
    const db = wx.cloud.database()

    db.collection('Restaurant').where({
      SchoolId: that.data.index
    }).get({
      success: res => {
        if (res.data.length > 0)
        {
          that.setData({
            key: true
          })
        } else {
          that.setData({
            key: false
          })
        }

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
        } else if (this.data.school == "") {
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
        } else if (this.data.key) {
          wx.showToast({
            title: '该学校已注册店铺',
            icon: 'none',
            duration: 1000
          })
        } else if (that.data.tempEnvironmentPhoto.length == 0 || that.data.tempGatePhoto.length == 0 || that.data.tempIdCardBackPhoto.length == 0 || that.data.tempIdCardFrontPhoto.length == 0 || that.data.tempProductionLicence.length == 0) {
          wx.showToast({
            title: '未添加所需的图片',
            icon: "none"
          })
        } else {

          const db = wx.cloud.database()

          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          for (var i = 0; i < 18; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          }

          db.collection('Restaurant').add({
            data: {
              Address: this.data.address,
              Description: this.data.description,
              OwenId: app.globalData.userInfor.openid,
              RestaurantId: text,
              RestaurantName: this.data.shop,
              SchoolId: this.data.index,
              TelephoneNumber: this.data.phone,
              isReviewed: false
            },


            success: res => {

              if (1)//如果环境图片是新图片
              {
                const filePath = that.data.tempEnvironmentPhoto[0]
                // 上传图片
                var timestamp = Date.parse(new Date());
                var document = app.globalData.userInfor.userName + '/';
                const cloudPath = 'registerShop/' + document + '1' + app.globalData.userInfor.openid + timestamp + filePath.match(/\.[^.]+?$/)[0]
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
                    app.globalData.restaurantInfor.EnvironmentPhoto = res.fileID
                    //更新数据库中的图片路径
                    console.log("EnvironmentPhoto", res.fileID)
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
              }

              if (1) {
                const filePath = that.data.tempGatePhoto[0]
                // 上传图片
                var timestamp = Date.parse(new Date());
                var document = app.globalData.userInfor.userName + '/';
                const cloudPath = 'registerShop/' + document + '2' + app.globalData.userInfor.openid + timestamp + filePath.match(/\.[^.]+?$/)[0]
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
              }

              if (1) {
                const filePath = that.data.tempIdCardBackPhoto[0]
                // 上传图片
                var timestamp = Date.parse(new Date());
                var document = app.globalData.userInfor.userName + '/';
                const cloudPath = 'registerShop/' + document + '3' + app.globalData.userInfor.openid + timestamp + filePath.match(/\.[^.]+?$/)[0]
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
              }

              if (1) {
                const filePath = that.data.tempIdCardFrontPhoto[0]
                // 上传图片
                var timestamp = Date.parse(new Date());
                var document = app.globalData.userInfor.userName + '/';
                const cloudPath = 'registerShop/' + document + '4' + app.globalData.userInfor.openid + timestamp + filePath.match(/\.[^.]+?$/)[0]
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
              }

              if (1) {
                const filePath = that.data.tempProductionLicence[0]
                // 上传图片
                var timestamp = Date.parse(new Date());
                var document = app.globalData.userInfor.userName + '/';
                const cloudPath = 'registerShop/' + document + '5' + app.globalData.userInfor.openid + timestamp + filePath.match(/\.[^.]+?$/)[0]
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

                    //更新数据库中的图片路径
                    console.log("ProductionLicence ", res.fileID)
                    db.collection('Restaurant').doc(that.data.dbRestaurantInfoId).update({
                      data: {
                        ProductionLicence: res.fileID,
                      },
                      success: res => {
                        console.log("ProductionLicence更新success")
                      },
                      fail: res => {
                        console.log("ProductionLicence更新失败")
                      }
                    })
                  },
                })
              }

              db.collection('User').where({
                UserId: app.globalData.userInfor.openid
              }).get({
                success: res => {
                  console.log('用户查询成功')
                  db.collection('User').doc(res.data[0]._id).update({
                    data: {
                      isOwner: true,
                    },
                    success: res => {
                      console.log("success")
                    },
                    fail: res => {
                      console.log("failed")
                    }
                  })
                },
                fail: res => {
                  console.log('用户查询失败')
                }
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
              //wx.navigateTo({
              //  url: '../sidebar/sidebar',
              //})
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
      fail: res => {
        console.log('failed')
      }
    })

  },



  //这个云函数最终会将所有学校的Id以及name分别对应的放在 
  //app.globalData.School.SchoolId和app.globalData.School.SchoolName 中
  getSchools: function () {
    wx.cloud.callFunction({
      name: 'getSchool',
      success: function (res) {
        console.log('查询学校', res)
        var schoolId = []
        var schoolName = []
        var data = res.result.data
        for (var counter = 0; counter < data.length; counter++) {
          schoolId.push(data[counter].SchoolId)
          schoolName.push(data[counter].SchoolName)
        }
        app.globalData.School.SchoolId = schoolId
        app.globalData.School.SchoolName = schoolName

        console.log("schoolId从数据库", app.globalData.School.SchoolId)
        console.log(app.globalData.School.SchoolName)
      },
      fail: console.error
    })

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSchools()
    this.setData({
      schoolList: app.globalData.School.SchoolName
    })
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
    this.getSchools()
    this.setData({
      schoolList: app.globalData.School.SchoolName
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})