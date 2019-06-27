- 由于后端使用的是小程序云开发，所以api设计主要体现在云函数上面。

  - getSchool获取所有学校

    parameter: none

    return:

    {

    “SchoolId":string

    "SchoolName":string

    }

  - login登录

    parameter:none

    return:

    {

       event,

    ​    "openid": string

    ​    "appid":string

    ​    "unionid": string

    }

  - getUser获取所有用户

    parameter:none

    return:

    {

    ​	"UserName":string

    ​	"ProfileImage":string

    ​	"StudentId":string

    ​	"SchoolId":string

    ​	"UserTelephone":string

    ​	"Gender":string

    ​	"isOwner":boolean

    ​	"_openId":string

    }

  - getRestaurant获取openid对应的餐馆

    parameter：openid

    return:openId为传进来的参数的Restaurant

    {

    ​	"Address":string

    ​	"Description":string

    ​	"EnvironmentPhoto":string

    ​	"GatePhoto":string

    ​	"IdCardBackPhoto":string

    ​	"IdCardFrontPhoto":string

    ​	"OwenId":string

    ​	"ProductionLicence":string

    ​	"RestaurantId":string

    ​	"RestaurantName":string

    ​	"SchoolId":string

    ​	"TelephoneNumber":string

    ​	'IsReviewed':boolean

    }

  - getReservation获取openid对应的订单

    parameter:openId

    return:

    {

    ​	"CreatTime":string

    ​	"ReservationId":string

    ​	"Reservetime":string

    ​	"RestaurantId":string

    ​	"status":number

    ​	"TotalPrice":number

    ​	"UserId":string

    }

    