define(["jquery"],function($) {
    function download() {
        $.ajax({
            url: "../data/slide.json",
            success: function (result) {
                var slideArr = result.data.list.list;
                // console.log(slideArr);
                for (var i = 0; i< slideArr.length;i++) {
                    $(`<li class = 'swiper-slide rainbow-item-3' style = 'width: 234px; margin-right: 14px;'>
                            <a href="#" target = "_blank">
                                <div class = 'content'>
                                    <div class = 'thumb'>
                                        <img width="160" height="160" src="${slideArr[i].pc_img}" alt=""/>
                                    </div>
                                    <h3 class = 'title'>${slideArr[i].goods_name}</h3>
                                    <p class = 'desc'>${slideArr[i].desc}</p>
                                    <p class = 'price'>
                                        <span>${slideArr[i].seckill_Price}</span>元
                                        <del>${slideArr[i].goods_price}元</del>
                                    </p>
                                </div>
                            </a>
                        </li>`
                    ).appendTo($("#J_flashSaleList .swiper-wrapper"))
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    // 商品列表滚动
    function sildeTab() {
        var aSpans = $(".swiper-controls").find("span");
        var iNow = 0;
        var count =Math.floor(26 / 4);
        aSpans.on("click",function () {
            if ($(this).attr("class") == "swiper-flashsale-prev") {
                iNow--;
                tab();
            } else {
                iNow++;
                tab();
            }
        })

        var timer = setInterval(function () {
            iNow++;
            tab();
        },4000)

        function tab() {
            iNow = iNow < 0 ? 0 : iNow;
            iNow = iNow > count ? 0 : iNow;
            iNow == 0 ? aSpans.eq(0).addClass("swiper-button-disabled") : aSpans.eq(0).removeClass("swiper-button-disabled");
            iNow == count ? aSpans.eq(1).addClass("swiper-button-disabled") : aSpans.eq(1).removeClass("swiper-button-disabled");
            if (iNow == count) {
                $(".swiper-wrapper").css("transform",`translate3d(-${996 * iNow - 496}px, 0px, 0px)`);
            } else {
                $(".swiper-wrapper").css("transform",`translate3d(-${996 * iNow}px, 0px, 0px)`);
            }
        }

        $(".swiper-wrapper, .swiper-controls").on("mouseenter", function () {
            clearInterval(timer);
        }).on("mouseleave", function () {
            timer = setInterval(function () {
                iNow++;
                tab();
            },4000)
        })
    }
    return {
        download: download,
        sildeTab: sildeTab
    }
})