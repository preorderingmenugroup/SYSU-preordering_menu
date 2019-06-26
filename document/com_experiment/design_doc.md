# 项目设计文档  

## 开发环境选择  

### 可选择项：
- 移动端（android or ios）
    - 淘汰理由：虽然采用移动端开发具有最完备的功能，流畅度也最高，但考虑到微信内自带的支付方式，并且移动端相比小程序还需要进行应用的安装，
    在方便性上稍逊一筹  
- web  
    - web应用也不用安装，但web的流畅度不佳，且用户的浏览器之间存在兼容性问题，所以最终选择了小程序作为开发的框架
- 小程序  
    - 系统架构设计

    ![小程序框架](https://preorderingmenugroup.github.io/SYSU-preordering_menu/blob/master/document/com_experiment/structure.png)
    基本架构：
    小程序前端采用微信小程序来实现，商家端和客户端都包含在同一系统中，但商家的功能进入需要进行审核并拥有权限才可以进入，从而实现商家端和用户端的共存，后端则使用了微信小程序开发工具里的云开发进行实现，内涵数据库和云函数。而在商家端审核方面则在web端实现一个审核界面，并可以将审核结果返回云开发数据库中。
    - 模块划分：
        - 前端
            - 语言介绍：
                - 由于小程序的前端采用wxml,wxss，js来进行编写，故直接按照这三者来开发：
                - wxml：WXML（WeiXin Markup Language）是框架设计的一套标签语言，结合基础组件、事件系统，可以构建出页面的结构。
                要完整了解 WXML 语法，请参考[WXML 语法参考](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/)。
                - html与wxml：两者差异比较大，如果之前没有接触过Android开发，可能会觉得有些头疼。事实上，WXML更像是Android开发中的界面XML描述文件，适合于程序界面的构建；而HTML则倾向于文章的展示（这与HTML的历史有关），以及互联网页面的构建。
                - wxss：WXSS (WeiXin Style Sheets)是一套样式语言，用于描述 WXML 的组件样式。WXSS 用来决定 WXML 的组件应该怎么显示。为了适应广大的前端开发者，WXSS 具有 CSS 大部分特性。同时为了更适合开发微信小程序，WXSS 对 CSS 进行了扩充以及修改。
                - js：小程序的JS文件与前端开发使用的JS几乎没有区别，只是小程序的JS新增了微信的一些API接口，并去除了一些不必要的功能（如DOM）。
                - 前端结构
                - ![前端图片](https://preorderingmenugroup.github.io/SYSU-preordering_menu/blob/master/document/com_experiment/qiaduan_sturt.png)
            - 功能：实现界面的默认样式，弹窗，按钮等基本组件的放置
            具体各页面的功能，可查看文档[6.2用例图](https://github.com/preorderingmenugroup/SYSU-preordering_menu/tree/master/document/6_2_UsecasesAndActivityPic)。

        - 后端
            - 数据库的使用
                微信小程序具有配套的云数据库开发体系，只需在需要使用的js页面中进行如下操作，即可对数据库进行增删改查。
                通过以下语句获得数据库的调用  
                `const db = wx.cloud.database()`  
                [数据库的增删改查则可查阅微信开发者文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-client-api/database/)
            - 云函数的创建
            - 人工审核server端的搭建和实现 
        - 测试
    
