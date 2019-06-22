//作者：吉阁尔
//index.js
//获取应用实例

const app = getApp()
// 右侧每一类的 bar 的高度（固定）
const RIGHT_BAR_HEIGHT = 41;
// 右侧每个子类的高度（固定）
const RIGHT_ITEM_HEIGHT = 122;
// 左侧每个类的高度（固定）
const LEFT_ITEM_HEIGHT = 41;     
Page({
  data: {
    //左边当前选定的按钮
    currentLeftSelected: null,
    
    //左边按钮联动右边的，用于scroll-into-view中查找的id
    itemScrollId: null,
    
    //西面两个是右边控制左边的两个变量，第一个是左边距离顶部的距离，第二个是右边每一种类距离顶部的距离
    itemLeftToTop: 0,

    eachrightScrollToTop:[],
    id1add: 0,
    id2add: 0,
    id3add: 0,
    id4add: 0,
    id5add: 0,
    id6add: 0,
    id7add:0,
    
    tabIndex: 0,
    // 统计商品数量和价格
    
    orderCount: {
      num: 0,
      money: 0
    },
    
    bottomFlag: false,
    // 提交的订单
    orders: true,
    schoolid:"",
    resid:"",
    menus: [
      {
        id: "id1",
        name: "面食",
        categroy: []
      },
      {
        id: "id2",
        name: "盖浇饭",
        categroy: []
      },
      {
        id: "id3",
        name: "热菜",
        categroy: []
      },
      {
        id: "id4",
        name: "凉菜",
        categroy: []
      },
      {
        id: "id5",
        name: "主食",
        categroy: []
      },
      {
        id: "id6",
        name: "甜点",
        categroy: []
      },
      {
        id: "id7",
        name: "饮料",
        categroy: []
      }
    ]


  },
  

  onLoad: function () {

    let that = this;
    let menus = that.data.menus;
    that.setData({
      menus:menus,
      currentLeftSelected: menus[0].id,
      eachrightScrollToTop: this.get_eachItemToTop()
    });
    
    wx.getSystemInfo({
      success: function (res) {
        var asideheight = res.windowHeight
        var asideheight1=0;
        that.setData({
          asideheight: asideheight,
          asideheight1:asideheight+80
        })
      },
      fail: () => { console.log("无法获取显示器高度，请检查网络连接") }
    });
  const db = wx.cloud.database();
    
    
    db.collection('Restaurant').where({
      SchoolId: app.globalData.userInfor.school
    }).get({
      success:res=>{
        console.log(res.data)
        this.setData({
          
          resid:res.data[0].RestaurantId
          
        })
        console.log(this.data.resid);
        
        //进行对应学校的菜品查询
        db.collection('MenuItem').where({
          RestaurantId: this.data.resid
        }).get({
          success: res => {
            console.log(res.data);
            console.log('menuitem查询成功');
            console.log(res.data[0].Class);
            console.log(res.data.length);
            var tempList1 = [];
            var tempList2 = [];
            var tempList3 = [];
            var tempList4 = [];
            var tempList5 = [];
            var tempList6 = [];
            var tempList7 = [];
            for (var a = 0; a < (res.data.length); a++) {

              if ((res.data[a].Class) == "面食") {
                console.log(this.data.id1add);
                console.log(that.data.id1add);
                var MenuItemName = res.data[a].MenuItemName;
                console.log(MenuItemName)
                var Price = res.data[a].Price;
                console.log(Price);
                var Photo = res.data[a].Photo;
                console.log(Photo);
                var MenuItemId = res.data[a].MenuItemId;
                console.log(MenuItemId);
                let tempCat = {
                  categroy_id: this.data.id1add,
                  categroy_name: MenuItemName,
                  price: Price,
                  num: 0,
                  url: Photo,
                  menuitemid: MenuItemId,
                  Class: "面食"
                }
                console.log(tempCat)
                tempList1.push(tempCat)
                this.data.id1add++
              }
              else if ((res.data[a].Class) == "盖浇饭") {
                console.log(this.data.id2add);
                console.log(that.data.id2add);
                var MenuItemName = res.data[a].MenuItemName;
                console.log(MenuItemName)
                var Price = res.data[a].Price;
                console.log(Price);
                var Photo = res.data[a].Photo;
                console.log(Photo);

                let tempCat = {
                  categroy_id: this.data.id1add,
                  categroy_name: MenuItemName,
                  price: Price,
                  num: 0,
                  url: Photo,
                  menuitemid: MenuItemId,
                  Class: "盖浇饭"
                }
                console.log(tempCat)
                tempList2.push(tempCat)
                this.data.id2add++
              }
              else if ((res.data[a].Class) == "热菜") {
                console.log(this.data.id3add);
                console.log(that.data.id3add);
                var MenuItemName = res.data[a].MenuItemName;
                console.log(MenuItemName)
                var Price = res.data[a].Price;
                console.log(Price);
                var Photo = res.data[a].Photo;
                console.log(Photo);

                let tempCat = {
                  categroy_id: this.data.id1add,
                  categroy_name: MenuItemName,
                  price: Price,
                  num: 0,
                  url: Photo,
                  menuitemid: MenuItemId,
                  Class: "热菜"
                }
                console.log(tempCat)
                tempList3.push(tempCat)
                this.data.id3add++
              }
              else if ((res.data[a].Class) == "凉菜") {
                console.log(this.data.id4add);
                console.log(that.data.id4add);
                var MenuItemName = res.data[a].MenuItemName;
                console.log(MenuItemName)
                var Price = res.data[a].Price;
                console.log(Price);
                var Photo = res.data[a].Photo;
                console.log(Photo);

                let tempCat = {
                  categroy_id: this.data.id1add,
                  categroy_name: MenuItemName,
                  price: Price,
                  num: 0,
                  url: Photo,
                  menuitemid: MenuItemId,
                  Class: "凉菜"
                }
                console.log(tempCat)
                tempList4.push(tempCat)
                this.data.id4add++
              }
              else if ((res.data[a].Class) == "主食") {
                console.log(this.data.id5add);
                console.log(that.data.id5add);
                var MenuItemName = res.data[a].MenuItemName;
                console.log(MenuItemName)
                var Price = res.data[a].Price;
                console.log(Price);
                var Photo = res.data[a].Photo;
                console.log(Photo);

                let tempCat = {
                  categroy_id: this.data.id1add,
                  categroy_name: MenuItemName,
                  price: Price,
                  num: 0,
                  url: Photo,
                  menuitemid: MenuItemId,
                  Class: "主食"
                }
                console.log(tempCat)
                tempList5.push(tempCat)
                this.data.id5add++
              }
              else if ((res.data[a].Class) == "甜点") {
                console.log(this.data.id6add);
                console.log(that.data.id6add);
                var MenuItemName = res.data[a].MenuItemName;
                console.log(MenuItemName)
                var Price = res.data[a].Price;
                console.log(Price);
                var Photo = res.data[a].Photo;
                console.log(Photo);

                let tempCat = {
                  categroy_id: this.data.id1add,
                  categroy_name: MenuItemName,
                  price: Price,
                  num: 0,
                  url: Photo,
                  menuitemid: MenuItemId,
                  Class: "甜点"
                }
                console.log(tempCat)
                tempList6.push(tempCat)
                this.data.id6add++
              }
              else if (res.data[a].Class == "饮料") {
                console.log(this.data.id7add);
                console.log(that.data.id7add);
                var MenuItemName = res.data[a].MenuItemName;
                console.log(MenuItemName)
                var Price = res.data[a].Price;
                console.log(Price);
                var Photo = res.data[a].Photo;
                console.log(Photo);

                let tempCat = {
                  categroy_id: this.data.id1add,
                  categroy_name: MenuItemName,
                  price: Price,
                  num: 0,
                  url: Photo,
                  menuitemid: MenuItemId,
                  Class: "饮料"
                }
                console.log(tempCat)
                tempList7.push(tempCat)
                this.data.id7add++
              }

              else {
                console.log("获取菜单失败");
              }
            }
            this.setData({
              "menus[0].categroy": tempList1,
              "menus[1].categroy": tempList2,
              "menus[2].categroy": tempList3,
              "menus[3].categroy": tempList4,
              "menus[4].categroy": tempList5,
              "menus[5].categroy": tempList6,
              "menus[6].categroy": tempList7,
            })
            console.log(this.data.menus);
          }
        });

      }
    })
    

  },
  //左边菜品类点击效果
  tabMenu: function (e) {
    this.setData({
      currentLeftSelected: e.target.id || e.target.dataset.id,
      itemScrollId: e.target.id || e.target.dataset.id 
    });
    console.log(e);
  },
  
  // 下拉刷新
  onPullDownRefresh: function () {
    setTimeout(()=>{
      wx.showToast({
        title: '成功加载数据',
        icon: 'success',
        duration: 500
      });
      wx.stopPullDownRefresh()
    }, 500);
  },
  
  get_eachItemToTop: function () {
    var obj = {};
    var totop = 0;
    var menus_ex = {};
    var that = this;
    menus_ex= that.data.menus;
    console.log(menus_ex);
    for(let i=1;i<menus_ex.length;i++){
      totop += (RIGHT_BAR_HEIGHT + menus_ex[i - 1].categroy.length * RIGHT_ITEM_HEIGHT);
      obj[menus_ex[i] ? menus_ex[i].id : 'last'] = totop;  
    }
    return obj;
  },
  
  right: function (e) {
      for (let i = 0; i < this.data.menus.length; i++) {
       let left = this.data.eachrightScrollToTop[this.data.menus[i].id]
       let right = this.data.eachrightScrollToTop[this.data.menus[i + 1] ? this.data.menus[i + 1].id : 'last']
       if (e.detail.scrollTop < right && e.detail.scrollTop >= left) {
       this.setData({
         currentLeftSelected: this.data.menus[i].id,
         itemLeftToTop: LEFT_ITEM_HEIGHT * i
            })
          }
        }
   
    },

  

  // 点击去购物车结账
  card: function() {
    let that = this;
    // 判断是否有选中商品
    if (that.data.orderCount.num !== 0) {
      // 跳转到购物车订单也
      
      wx.navigateTo({
        url: '../order/order'
      });
    } else {
      
      wx.showToast({
        title: '您未选中任何商品',
        icon: 'none',
        duration: 2000
      })
    }
  },
  
  
  // 点击对应菜单减少按钮
  del: function (event) {
    let that = this;
    let index = event.target.dataset.index;
    let parentindex = event.target.dataset.parentindex;
    console.log(event.target.dataset);
    console.log(event.target.dataset.parentindex);
    let param = that.data.menus[parentindex].categroy[index];
    console.log(param);
    let subOrders = []; // 购物单列表存储数据
    if(param.num>0){
      param.num--;
    } 
    else{
      param.num =0;
    }
    that.data.menus[parentindex].categroy.splice(index, 1, param);
    that.setData({
      menus: this.data.menus
    });
    for (let i = 0; i < (this.data.menus.length); i++)
      this.data.menus[i].categroy.forEach(item => {

        if (item.num !== 0) {
          subOrders.push(item);
        }
      });


    console.log(subOrders);

    wx.setStorage({
      key: "orders",
      data: subOrders
    });
    let money = 0;
    let num = 0;
    // 将已经确定总价格和数量求和
    for (let i = 0; i < (this.data.menus.length); i++)
      this.data.menus[i].categroy.forEach(item => {
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
    // 将选中的商品存储在本地
  },
  // 点击对应菜单添加按钮
  add: function (event) {
    
    let that = this;
    let index = event.target.dataset.index;
    let parentindex = event.target.dataset.parentindex;
    console.log(event.target.dataset);
    console.log(event.target.dataset.parentindex);
    let param = that.data.menus[parentindex].categroy[index];
    console.log(param);
    let subOrders = []; // 购物单列表存储数据
    param.num++;
    console.log(that.data.menus[parentindex].categroy);
    that.data.menus[parentindex].categroy.splice(index, 1, param);
    that.setData({
      menus: this.data.menus
    });
    console.log(this.data.menus);
    
    for(let i=0;i<(this.data.menus.length);i++)
      this.data.menus[i].categroy.forEach(item => {

        if (item.num !== 0) {
          subOrders.push(item);
        }
          });
    
    
    console.log(subOrders);
    
    wx.setStorage({
      key: "orders",
      data: subOrders
    });
    let money = 0;
    let num = 0;
    // 将已经确定总价格和数量求和
    for (let i = 0; i < (this.data.menus.length); i++)
      this.data.menus[i].categroy.forEach(item => {
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
    // 将选中的商品存储在本地
    
  },
  
  
  //跳转用户个人页面
  getin:  function(event){
    wx.navigateTo({
      url: '../sidebar/sidebar',
    }) 
  },

  
  onPullDownRefresh: function (event) {
    let that = this;
    let menus = that.data.menus;
    that.setData({
      menus: menus,
      currentLeftSelected: menus[0].id,
      eachrightScrollToTop: this.get_eachItemToTop()
    });

    wx.getSystemInfo({
      success: function (res) {
        var asideheight = res.windowHeight
        var asideheight1 = 0;
        that.setData({
          asideheight: asideheight,
          asideheight1: asideheight + 80
        })
      },
      fail: () => { console.log("无法获取显示器高度，请检查网络连接") }
    });
    const db = wx.cloud.database();


    db.collection('Restaurant').where({
      SchoolId: app.globalData.userInfor.school
    }).get({
      success: res => {
        this.setData({
          resid: res.data[0].RestaurantId

        })
        console.log(this.data.resid);

        //进行对应学校的菜品查询
        db.collection('MenuItem').where({
          RestaurantId: this.data.resid
        }).get({
          success: res => {
            console.log(res.data);
            console.log('menuitem查询成功');
            console.log(res.data[0].Class);
            console.log(res.data.length);
            var tempList1 = [];
            var tempList2 = [];
            var tempList3 = [];
            var tempList4 = [];
            var tempList5 = [];
            var tempList6 = [];
            var tempList7 = [];
            for (var a = 0; a < (res.data.length); a++) {

              if ((res.data[a].Class) == "面食") {
                console.log(this.data.id1add);
                console.log(that.data.id1add);
                var MenuItemName = res.data[a].MenuItemName;
                console.log(MenuItemName)
                var Price = res.data[a].Price;
                console.log(Price);
                var Photo = res.data[a].Photo;
                console.log(Photo);
                var MenuItemId = res.data[a].MenuItemId;
                console.log(MenuItemId);
                let tempCat = {
                  categroy_id: this.data.id1add,
                  categroy_name: MenuItemName,
                  price: Price,
                  num: 0,
                  url: Photo,
                  menuitemid: MenuItemId,
                  Class: "面食"
                }
                console.log(tempCat)
                tempList1.push(tempCat)
                this.data.id1add++
              }
              else if ((res.data[a].Class) == "盖浇饭") {
                console.log(this.data.id2add);
                console.log(that.data.id2add);
                var MenuItemName = res.data[a].MenuItemName;
                console.log(MenuItemName)
                var Price = res.data[a].Price;
                console.log(Price);
                var Photo = res.data[a].Photo;
                console.log(Photo);

                let tempCat = {
                  categroy_id: this.data.id1add,
                  categroy_name: MenuItemName,
                  price: Price,
                  num: 0,
                  url: Photo,
                  menuitemid: MenuItemId,
                  Class: "盖浇饭"
                }
                console.log(tempCat)
                tempList2.push(tempCat)
                this.data.id2add++
              }
              else if ((res.data[a].Class) == "热菜") {
                console.log(this.data.id3add);
                console.log(that.data.id3add);
                var MenuItemName = res.data[a].MenuItemName;
                console.log(MenuItemName)
                var Price = res.data[a].Price;
                console.log(Price);
                var Photo = res.data[a].Photo;
                console.log(Photo);

                let tempCat = {
                  categroy_id: this.data.id1add,
                  categroy_name: MenuItemName,
                  price: Price,
                  num: 0,
                  url: Photo,
                  menuitemid: MenuItemId,
                  Class: "热菜"
                }
                console.log(tempCat)
                tempList3.push(tempCat)
                this.data.id3add++
              }
              else if ((res.data[a].Class) == "凉菜") {
                console.log(this.data.id4add);
                console.log(that.data.id4add);
                var MenuItemName = res.data[a].MenuItemName;
                console.log(MenuItemName)
                var Price = res.data[a].Price;
                console.log(Price);
                var Photo = res.data[a].Photo;
                console.log(Photo);

                let tempCat = {
                  categroy_id: this.data.id1add,
                  categroy_name: MenuItemName,
                  price: Price,
                  num: 0,
                  url: Photo,
                  menuitemid: MenuItemId,
                  Class: "凉菜"
                }
                console.log(tempCat)
                tempList4.push(tempCat)
                this.data.id4add++
              }
              else if ((res.data[a].Class) == "主食") {
                console.log(this.data.id5add);
                console.log(that.data.id5add);
                var MenuItemName = res.data[a].MenuItemName;
                console.log(MenuItemName)
                var Price = res.data[a].Price;
                console.log(Price);
                var Photo = res.data[a].Photo;
                console.log(Photo);

                let tempCat = {
                  categroy_id: this.data.id1add,
                  categroy_name: MenuItemName,
                  price: Price,
                  num: 0,
                  url: Photo,
                  menuitemid: MenuItemId,
                  Class: "主食"
                }
                console.log(tempCat)
                tempList5.push(tempCat)
                this.data.id5add++
              }
              else if ((res.data[a].Class) == "甜点") {
                console.log(this.data.id6add);
                console.log(that.data.id6add);
                var MenuItemName = res.data[a].MenuItemName;
                console.log(MenuItemName)
                var Price = res.data[a].Price;
                console.log(Price);
                var Photo = res.data[a].Photo;
                console.log(Photo);

                let tempCat = {
                  categroy_id: this.data.id1add,
                  categroy_name: MenuItemName,
                  price: Price,
                  num: 0,
                  url: Photo,
                  menuitemid: MenuItemId,
                  Class: "甜点"
                }
                console.log(tempCat)
                tempList6.push(tempCat)
                this.data.id6add++
              }
              else if (res.data[a].Class == "饮料") {
                console.log(this.data.id7add);
                console.log(that.data.id7add);
                var MenuItemName = res.data[a].MenuItemName;
                console.log(MenuItemName)
                var Price = res.data[a].Price;
                console.log(Price);
                var Photo = res.data[a].Photo;
                console.log(Photo);

                let tempCat = {
                  categroy_id: this.data.id1add,
                  categroy_name: MenuItemName,
                  price: Price,
                  num: 0,
                  url: Photo,
                  menuitemid: MenuItemId,
                  Class: "饮料"
                }
                console.log(tempCat)
                tempList7.push(tempCat)
                this.data.id7add++
              }

              else {
                console.log("获取菜单失败");
              }
            }
            this.setData({
              "menus[0].categroy": tempList1,
              "menus[1].categroy": tempList2,
              "menus[2].categroy": tempList3,
              "menus[3].categroy": tempList4,
              "menus[4].categroy": tempList5,
              "menus[5].categroy": tempList6,
              "menus[6].categroy": tempList7,
            })
            console.log(this.data.menus);
          }
        });

      }
    })



  }
})