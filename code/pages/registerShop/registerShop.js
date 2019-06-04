var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "",
    description: "",
    owner: "",
    shop: "",
    school: {
      name: "店铺属于哪个学校",
      code: ""
    },
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
          case 0: that.data.school.name = "中山大学"; that.data.school.code = "zhongshandaxue"; break;
          case 1: that.data.school.name = "清华大学"; that.data.school.code = "qinghuadaxue"; break;
          case 2: that.data.school.name = "北京大学"; that.data.school.code = "zhongshandaxue"; break;
          default: that.data.school.name = "中山大学"; that.data.school.code = "中山大学"; break;
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

  inputImage1: function (e) {
    this.setData({
      imgupload1: e.detail.value
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
      db.collection('Restaurant').add({
        data: {
          Address: this.data.address,
          Description: this.data.discription,
          OwenId: this.data.owner,
          RestaurantName: this.data.shop,
          School: this.data.school,
          SchoolId: 21413243134213412,

          owner: "",
          TelephoneNumber: this.data.phone,
        },
        success: res => {
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
    this.imgupload = this.selectComponent("#imgupload");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var isNpu = app.globalData.isNPU
    console.log(isNpu)
    if (isNpu == '502') {
      wx.showToast({
        title: '微信登陆过期',
        icon: "icon",
        success: function () {
          wx.switchTab({
            url: '../index/index',
          })
        }
      })
    } else if (isNpu == '401') {
      wx.showToast({
        title: '请求失败',
        icon: 'none',
        success: function () {
          wx.switchTab({
            url: '../index/index',
          })
        }
      })
    } else if (isNpu == '300' || app.globalData.login == '401') {
      wx.showToast({
        title: '网络开小差了',
        icon: 'loading',
        mask: true,
        success: function () {
          wx.switchTab({
            url: '../index/index',
          })
        }
      })
    }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})