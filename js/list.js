console.log("加载完成");

// 引入当前页面需要用的模块
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",

        // 需要用到首页导航部分的js模块
        "nav" : "nav",

        "goodsList" : "goodsList"
    },

    shim:{
        // 设置依赖关系
        "jquery-cookie":["jquery"]
    }
})

require(["nav","goodsList"], function (nav,goodsList) {
    nav.topNavDownload();
    nav.topNavTab();
    nav.leftNavDownload();
    nav.leftNavTab();
    nav.searcTab();
    nav.allGoodsTab();
    
    goodsList.download();
    goodsList.listTab();
})