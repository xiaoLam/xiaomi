define(["jquery"], function ($) {
    function download() {
        $.ajax({
            type : "get",
            url: "../data/goodsList2.json",
            success: function (result) {
                var node = $(`<div data-v-61428f58 class = 'section'>
                <div data-v-61428f58 class = 'components-list-box'>
                    <div data-v-a2d6c756 class="channel-product-imgText">
                        <div data-v-a2d6c756 class = 'channel-product-top'>
                            <div data-v-a2d6c756 class = 'product-cell shadow product_with_tag product_tag_1'>
                                <div data-v-a2d6c756 class = 'figure'>
                                    <a href="goodsDesc.html?product_id=${result[0].product_id}">
                                        <img data-v-a2d6c756 style = 'background-color: rgb(178, 184, 205);' src="${result[0].image}" alt=""/>
                                    </a>
                                </div>
                                <div data-v-a2d6c756 class = 'content'>
                                    <h3 data-v-a2d6c756 class = 'title'>
                                        <a data-v-a2d6c756 href="goodsDesc.html?product_id=${result[0].product_id}">
                                        ${result[0].name}
                                        </a>
                                    </h3>
                                    <p data-v-a2d6c756 class = 'desc'>${result[0].desc}</p>
                                    <p data-v-a2d6c756 class = 'price'>
                                        <strong data-v-a2d6c756>${result[0].price}</strong>元
                                        <span data-v-a2d6c756>起</span>
                                        <del data-v-a2d6c756>${result[0].del}元</del>
                                    </p>
                                    <p data-v-a2d6c756 class = 'link'>
                                        <a data-v-a2d6c756 href="#">立即购买</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div data-v-61428f58 class = 'section'>
                <div data-v-61428f58 class = 'components-list-box'>
                    <div data-v-4a0c734d class = 'channel-line' style = 'background-color: rgb(245, 245, 245); height: 14px;'></div>
                </div>
            </div>`);
            node.appendTo(".app-body");
            for (var i =1 ; i < result.length;i+=2) {
                var node2 = $(`<div data-v-61428f58 class = 'section'>
                <div data-v-61428f58 class = 'components-list-box'>
                    <div data-v-45ef62b1 class = 'channel-product channel-product-two4'>
                        <div data-v-45ef62b1 class = 'row'>
                            <div data-v-45ef62b1 class = 'span10 product-cell shadow'>
                                <div data-v-45ef62b1 class = 'figure'>
                                    <a data-v-45ef62b1 href="goodsDesc.html?product_id=${result[i].product_id}" class = 'exposure'>
                                        <img data-v-45ef62b1 style = 'background-color: rgb(189, 193, 217);' src="${result[i].image}" alt=""/>
                                    </a>
                                </div>
                                <h3 data-v-45ef62b1 class = 'title'>
                                    <a data-v-45ef62b1 href="goodsDesc.html?product_id=${result[i].product_id}">${result[i].name}</a>
                                </h3>
                                <p data-v-45ef62b1 class = 'desc'>${result[i].desc}</p>
                                <p data-v-45ef62b1 class = 'price'>
                                    <strong data-v-45ef62b1>${result[i].price}</strong>元
                                    <span data-v-45ef62b1>起</span>
                                    <del data-v-45ef62b1>${result[i].del}元</del>
                                </p>
                            </div>
                            <div data-v-45ef62b1 class = 'span10 product-cell shadow'>
                                <div data-v-45ef62b1 class = 'figure'>
                                    <a data-v-45ef62b1 href="goodsDesc.html?product_id=${result[i+1].product_id}" class = 'exposure'>
                                        <img data-v-45ef62b1 style = 'background-color: rgb(189, 193, 217);' src="${result[i+1].image}" alt=""/>
                                    </a>
                                </div>
                                <h3 data-v-45ef62b1 class = 'title'>
                                    <a data-v-45ef62b1 href="goodsDesc.html?product_id=${result[i+1].product_id}">${result[i+1].name}</a>
                                </h3>
                                <p data-v-45ef62b1 class = 'desc'>${result[i+1].desc}</p>
                                <p data-v-45ef62b1 class = 'price'>
                                    <strong data-v-45ef62b1>${result[i+1].price}</strong>元
                                    <span data-v-45ef62b1>起</span>
                                    <del data-v-45ef62b1>${result[i+1].del}元</del>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`);
            node2.appendTo(".app-body");
            }

            },
            error : function (msg) {
                console.log(msg);
            }
        })
    }

    function listTab() {
        var oDiv = $(".swiper-container .swiper-wrapper ");
        var aBtns = $(".swiper-pagination .swiper-pagination-bullet");
        var iNow = 0;
        var timer = null;
        aBtns.on("click", function () {
            iNow = $(this).index();
            tab();
            return false;
        })

        $(".swiper-button-prev").on("click", function () {
            iNow--;
            if (iNow < 0) {
                oDiv.css("left",`${-2 * 2560}px`);
                iNow = aBtns.size()- 1;
            }
            tab();
        })
        $(".swiper-button-next").on ("click", function () {
            iNow++;
            tab();
        })

        timer = setInterval(function () {
            iNow++;
            tab();
        },4000)

        $(".swiper-container").on("mouseenter",function () {
            clearInterval(timer);
        }).on("mouseleave",function () {
            timer = setInterval(function () {
                iNow++;
                tab();
            },4000)
        })
        function tab() {
            aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");
            if (iNow == aBtns.size()) {
                aBtns.eq(0).addClass("swiper-pagination-bullet-active");
            }
            oDiv.stop(true, true).animate({ //记得加节流器
                left :  -iNow * 2560, 
            },1000,function () {
                if (iNow == aBtns.size()){
                    oDiv.css("left","0");
                    iNow = 0;
                }
            })
        }
    }
    return {
        download : download,
        listTab : listTab,
    }
})