// 处理首页导航部分 声明模块的时候也要遵循模块化

define(["jquery"],function($) {
    function download() {
        $.ajax({
            type: "get",
            url:"../data/nav.json",
            success: function (result) {
                // console.log(result);
                var bannerArr = result.banner;
                for (var i = 0; i< bannerArr.length;i++) {
                    $(`<a href="${bannerArr[i].url}">
                    <img class="swiper-lazy swiper-lazy-loaded" src="../images/banner/${bannerArr[i].img}" alt="">
                </a>`).appendTo("#J_homeSwiper .swiper-slide");
                    var node = $(`<a href="#" class='swiper-pagination-bullet'></a>`);
                    if (i == 0) {
                        node.addClass("swiper-pagination-bullet-active")
                    };
                    node.appendTo("#J_homeSwiper .swiper-pagination");
                }
            },
            error : function (msg) {
                console.log(msg);
            }
        })
    }

    // 实现轮播图的轮播效果
    function banner() {
        var iNow = 0; // 记录当前轮播图的下标
        var aBtns = null;
        var aImgs = null;

        var timer = setInterval(function () {
            iNow++;
            tab();
            
        },2000)

        function tab() {
            if(!aImgs) {
                aImgs = $("#J_homeSwiper .swiper-slide").find("a");
            }
            if(!aBtns) {
                aBtns = $("#J_homeSwiper .swiper-pagination").find("a");
            }
            if (iNow == aBtns.size()) {
                iNow = 0;
            }
            if (iNow < 0) {
                iNow = aBtns.size() - 1;
            }
            aImgs.hide().css("opacity",0.2)
            .eq(iNow).show().stop().animate({opacity:1},500);
            aBtns.removeClass("swiper-pagination-bullet-active")
            .eq(iNow).addClass("swiper-pagination-bullet-active");
        }

        $("#J_homeSwiper,.swiper-button-prev,.swiper-button-next")
        .mouseenter(function () {
            clearInterval(timer);
        })
        .mouseleave(function () {
            timer= setInterval(function () {
                iNow++;
                tab();
            },2000)
        })

        // 点击小圆圈, 切换对应的图片,[注]因为小圆圈是异步加载出来的, 所以要用事件委托来绑定事件
        $("#J_homeSwiper .swiper-pagination").on("click","a",function() {
            // console.log($(this).index());
            iNow = $(this).index();
            tab();
            return false;
        })

        // 点击左右箭头,切换对应图片
        $(".swiper-button-prev,.swiper-button-next").on("click",function () {
            if (this.className == "swiper-button-prev"){
                iNow--;
            } else {
                iNow++;
            }
            tab();
            return false;
        })
    }

    // 加载侧边栏数据
    function  leftNavDownload() {
        $.ajax({
            url: "../data/nav.json",
            success: function (result) {
                var leftNavArr = result.sideNav;
                for (var i = 0;i< leftNavArr.length;i++) {
                    var node = $(`<li class = 'category-item'>
                    <a href="/index.html" class = 'title'>
                        ${leftNavArr[i].title}
                        <em class = 'iconfont-arrow-right-big'></em>
                    </a>
                    <div class="children clearfix">
                        
                    </div>
                </li>`);
                node.appendTo("#J_categoryList");
                // 取出当前这个选项对应的子节点
                var childsArr = leftNavArr[i].child;
                // 一共有多少列
                var col = Math.ceil(childsArr.length / 6);
                // 计算一共多少列, 设置对应的class样式
                node.find("div.children").addClass("children-col-" + col);
                // 通过循环,创建右侧上面的每一个数据
                for (var j =0;j<childsArr.length;j++) {
                    if (j % 6 == 0) {
                        var newUl = $(`<ul class="children-list children-list-col children-list-col-${parseInt(j / 6)}">
                    </ul>`)
                    newUl.appendTo(node.find("div.children"));
                    }
                    $(`<li>
                    <a href="http://www.mi.com/redminote8pro"
                        data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2"
                        class="link clearfix" data-stat-id="d678e8386e9cb0fb"
                        onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                        <img src="${childsArr[j].img}"
                            width="40" height="40" alt="" class="thumb">
                        <span class="text">${childsArr[j].title}</span>
                    </a>
                </li>`).appendTo(newUl);
                }
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    // 侧边栏移入移出切换效果 选项卡切换效果
    function leftNavTab() {
        // 异步加载的节点 需要事件委托添加移入移出事件
        $("#J_categoryList").on("mouseenter",".category-item",function() {
            $(this).addClass("category-item-active");
        })
        .on("mouseleave",".category-item", function () {
            $(this).removeClass("category-item-active");
        })
    }

    // 顶部导航数据加载
    function topNavDownload() {
        $.ajax({
            url:"../data/nav.json",
            success: function (result) {
                var topNavArr = result.topNav;
                topNavArr.push({
                    title:"服务"
                },{
                    title: "社区"
                })
                for (var i = 0; i< topNavArr.length;i++) {
                    $(`<li date-index="${i}" class="nav-item">
                    <a href="javascript:coid(0);" class="link">
                        <span class="text">${topNavArr[i].title}</span>
                    </a>
                </li>`).appendTo(".header-nav .nav-list");
                
                var node = $(`<ul class="children-list clearfix" style="display: ${i==0? "block": "none"}">
            </ul>`);
                node.appendTo("#J_navMenu .container");

                if (topNavArr[i].childs) {
                    var childsArr = topNavArr[i].childs;
                    for (var j =0; j < childsArr.length;j++) {
                        $(`<li>
                        <a href="#">
                        <div class="figure figure-thumb">
                            <img src="${childsArr[j].img}" alt="">
                        </div>
                        <div class="title">${childsArr[j].a}</div>
                        <p class="price">${childsArr[j].i}</p>
                        </a>
                        </li>`).appendTo("#J_navMenu .container .children-list")
                    }
                }
            
            }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    function topNavTab() {
        // 还是事件委托嗷
        $(".header-nav .nav-list").on("mouseenter",".nav-item",function () {
            $(this).addClass("nav-item-active");
            if ($(this).index() <= 7) {
                $("#J_navMenu .container ul").eq($(this).index() - 1).css("display","block").siblings("ul").css("display","none");
                $("#J_navMenu").removeClass("slide-up").addClass("slide-down");
            } else {
                $("#J_navMenu").removeClass("slide-down").addClass("slide-up");
            }
        }).on("mouseleave",".nav-item",function () {
            $(this).removeClass("nav-item-active");
        })

        $(".header").on("mouseleave",function () {
            $("#J_navMenu").removeClass("slide-down").addClass("slide-up");
        })
    }

    // 搜索框
    function searcTab() {
        $("#search").focus(function () {
            $("#J_keywordList").removeClass("hide").addClass("show")
        }).blur(function () {
            $("#J_keywordList").removeClass("show").addClass("hide")
        })
    }

    // 给商品列表页侧边栏添加移入移出效果
    function allGoodsTab() {
        $(".header-nav .nav-list").on("mouseenter",".nav-category", function () {
            $(this).addClass("nav-category-active").find(".site-category").css("display","block");
        }).on("mouseleave",".nav-category", function () {
            $(this).removeClass("nav-category-active").find(".site-category").css("display","none");
        })

    }

    return {
        download : download,
        banner: banner,
        leftNavDownload: leftNavDownload,
        leftNavTab: leftNavTab,
        topNavDownload: topNavDownload,
        topNavTab: topNavTab,
        searcTab: searcTab,
        allGoodsTab: allGoodsTab
    }
})