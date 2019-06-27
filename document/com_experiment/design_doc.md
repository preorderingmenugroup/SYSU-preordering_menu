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

    ![小程序框架](https://github.com/preorderingmenugroup/SYSU-preordering_menu/blob/master/document/com_experiment/structure.png?raw=true)
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
                - ![前端图片](https://github.com/preorderingmenugroup/SYSU-preordering_menu/blob/master/document/com_experiment/qiaduan_sturt.png?raw=true)
            - 功能：实现界面的默认样式，弹窗，按钮等基本组件的放置
            具体各页面的功能，可查看文档[6.2用例图](https://github.com/preorderingmenugroup/SYSU-preordering_menu/tree/master/document/6_2_UsecasesAndActivityPic)。

        - 后端
            - 数据库的使用
                微信小程序具有配套的云数据库开发体系，只需在需要使用的js页面中进行如下操作，即可对数据库进行增删改查。
                通过以下语句获得数据库的调用  
                `const db = wx.cloud.database()`  
                [数据库的增删改查则可查阅微信开发者文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-client-api/database/)
            - 云函数的创建
                - 云函数即在云端（服务器端）运行的函数。在物理设计上，一个云函数可由多个文件组成，占用一定量的 CPU 内存等计算资源；各云函数完全独立；可分别部署在不同的地区。开发者无需购买、搭建服务器，只需编写函数代码并部署到云端即可在小程序端调用，同时云函数之间也可互相调用。
                - 一个云函数的写法与一个在本地定义的 JavaScript 方法无异，代码运行在云端 Node.js 中。当云函数被小程序端调用时，定义的代码会被放在 Node.js 运行环境中执行。我们可以如在 Node.js 环境中使用 JavaScript 一样在云函数中进行网络请求等操作，而且我们还可以通过云函数后端 SDK 搭配使用多种服务，比如使用云函数 SDK 中提供的数据库和存储 API 进行数据库和存储的操作，这部分可参考数据库和存储后端 API 文档。
                - 云函数在本项目中起到的最主要作用就是方便了对后端的操作，在云端创建了云函数之后，其对应的功能只需调用简单的语句即可实现，对开发提供了极大的便捷
                - 创建的云函数：
                - ![云函数]()
            - 人工审核server端的搭建和实现 
                - 后端采用nodejs+express框架实现
                - 前端使用vue+elementui搭建
                - 服务通过pm2部署到服务器
                - 该server端主要是对想要入驻的学校进行审核和对已入驻学校创建店铺进行审核，在需要审核的信息以json格式上传至服务器，审核端对其拉下来进行处理后，进行人工审核，未来还可以将这部分更改为机器识别，进一步缩小人员的成本
        - 测试
            - [测试文档]()
    
