console.log("加载完成");
require.config({
    paths : {
        "jquery" : "jquery-1.11.3",
        "jquery-cookie" : "jquery.cookie",
        "goodsCart": "goodsCart"
    },
    shim: {
        "jquery-cookie" : ["jquery"],
    }
})

require(["goodsCart"], function (goodsCart) {
    goodsCart.download();
    goodsCart.cartHover();
    goodsCart.addCart();
    goodsCart.loadCarData();
    goodsCart.checkFunc();
    goodsCart.changeCars();
})