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
          case 0: that.data.school = "中山大学"; that.data.index = 1; break;
          case 1: that.data.school = "清华大学"; that.data.index = 2; break;
          case 2: that.data.school = "北京大学"; that.data.index = 3; break;
          default: that.data.school = "中山大学"; that.data.index = 1; break;
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

      var schoolId = app.globalData.School.SchoolId[that.data.index]
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 18; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }



      db.collection('Restaurant').add({
        data: {
          Address: this.data.address,
          EnvironmentPhoto: "cloud://cloud-database-5hfz6.636c-cloud-database-5hfz6/ResigsterShop/ow8DE5F6fD_7REKVbg_XMi1M1isA1560855646000.jpg",
          GatePhoto: "cloud://cloud-database-5hfz6.636c-cloud-database-5hfz6/ResigsterShop/ow8DE5F6fD_7REKVbg_XMi1M1isA1560855656000.jpg",
          IdCardBackPhoto: "cloud://cloud-database-5hfz6.636c-cloud-database-5hfz6/ResigsterShop/ow8DE5F6fD_7REKVbg_XMi1M1isA1560855669000.jpg",
          IdCardFrontPhoto: "",
          ProductionLicence: "",
          Description: this.data.discription,
          OwenId: app.globalData.userInfor.openid,
          RestruantId: text,
          RestaurantName: this.data.shop,
          SchoolId: "21413243134213412",
          TelephoneNumber: this.data.phone,
          isReviewed: false,
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
          wx.navigateTo({
            url: '../restaurantCenter/restaurantCenter',
          })
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