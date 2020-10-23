console.log("加载成功");

require.config({
    paths : {
        "jquery": "jquery-1.11.3",
        "jquery-cookie" : "jquery.cookie",
        "nav" : "nav",
        "goodsDesc" : "goodsDesc"
    },
    shim : {
        "jquery-cookie" : ["jquery"] 
    }

})

require(["nav", "goodsDesc"], function (nav,goodsDesc) {
    nav.topNavDownload();
    nav.topNavTab();
    nav.leftNavDownload();
    nav.leftNavTab();
    nav.allGoodsTab();
    nav.searcTab();

    goodsDesc.download();
})