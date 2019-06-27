//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    networkType: 'none',
    timeOutId:0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //从缓存中读取用户信息
    wx.getStorage({
      key: 'userInfor',
      success: res => {
        console.log("inStorage:", res.data)
        app.globalData.userInfor = res.data
        this.getStorageSuccessCallback()
      },
      fail: res => {
        console.log("notInStorage")
      }
    })
    //判断用户是否已注册,如果已经注册直接跳转
  },
  toastTimeOut: function () {
    wx.showToast({
      title: '网络连接超时',
      icon: 'none',
      duration: 2000
    })
  }
  ,
  onStartTap: function () {
    wx.showLoading({
      title: '加载中',
    })
    this.timeOutId = setTimeout(this.toastTimeOut, 30000)
  },
  getStorageSuccessCallback: function (){
    const db = wx.cloud.database()
    console.log(app.globalData.userInfor.openid)
    console.log("ow8DE5NIfEgGswi5U01M7R6PJQnI" == app.globalData.userInfor.openid)
    db.collection('User').where({
      UserId: app.globalData.userInfor.openid
    }).get({
      success: res => {
        if (res.data.length != 0) {
          console.log(res.data)
          wx.redirectTo({
            url: '../index/index',
          })
        }
        else {
          console.log('getuserInforFailed')
        }
      }
    })
    wx.getNetworkType({
      success: res => {
        this.setData({
          networkType: res.networkType
        })
        console.log(this.data.networkType)
        if (this.data.networkType == 'none') {
          wx.showToast({
            title: '无网络连接',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  getUserInfo: function (e) {
    console.log('userinfo:',e)
    app.globalData.userInfo = e.detail.userInfo
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
    
    if (this.data.hasUserInfo) {
      console.log(this.data.userInfo)
      app.globalData.userInfor.profileImage = this.data.userInfo.avatarUrl
      app.globalData.userInfor.gendPicIndex = this.data.userInfo.gender
      app.globalData.userInfor.userName = this.data.userInfo.nickName
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.userInfor.openid = res.result.openid
          console.log(res.result)
          //对数据进行缓存
          wx.setStorage({
            key: 'userInfor',
            data: app.globalData.userInfor,
          })
          const db = wx.cloud.database()
          db.collection('User').where({
            UserId: app.globalData.userInfor.openid
          }).get({
            success: res => {
              if (res.data.length != 0) {
                console.log(res.data)
                clearTimeout(this.timeOutId)
                wx.redirectTo({
                  url: '../index/index',
                })
              }
              else {
                clearTimeout(this.timeOutId)
                wx.redirectTo({
                  url: '../user_create/user_create',
                })
              }
            }
          })
          
        }
      })
    }
    else {
      wx.showToast({
        title: "获取用户信息失败",
        icon: 'none',
        duration: 2000
      })
    }
  }

})
