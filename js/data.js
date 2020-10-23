define(["jquery"], function ($) {
    function download() {
        $.ajax({
            url: "../data/data.json",
            success: function (result) {
                // console.log(result);
                var firstObj = result[0];
                var node = $(` <div class='home-banner-box'>
                <a href="#">
                    <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1a2f39c9fe0804ace1d3707574c7c86f.jpg?thumb=1&w=1226&h=120&f=webp&q=90"
                        alt="" />
                </a>
            </div>
            <div class="home-brick-box home-brick-row-2-box xm-plain-box">
                <div class='box-hd'>
                    <h2 class='title'>${firstObj.title}</h2>
                    <div class="more">
                        <a href="#" class='more-link'>
                            查看全部
                            <i class='iconfont iconfont-arrow-right-big'></i>
                        </a>
                    </div>
                </div>
                <div class='hox-bd clearfix'>
                    <div class='row'>
                        <div class='span4'>
                            <ul class='brick-promo-list clearfix'>
                                <li class='brick-item brick-item-l'>
                                    <a href="#">
                                        <img src="${firstObj.img}"
                                            alt="" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class='span16'>
                            <ul class='brick-list clearfix'>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>`);
            node.appendTo(".page-main .container");

            for (var i =0; i< firstObj.childs.length; i++) {
                $(`<li class='brick-item brick-item-m brick-item-m-2'>
                <a href="#">
                    <div class='figure figure-img'>
                        <img width="160" height="160"
                            src="${firstObj.childs[i].img}"
                            alt="" />
                    </div>
                    <h3 class='title'>
                    ${firstObj.childs[i].title}
                    </h3>
                    <p class='desc'>${firstObj.childs[i].desc}</p>
                    <p class='price'>
                        <span class='num'>${firstObj.childs[i].price}</span>
                        元
                        <span>起</span>
                        ${firstObj.childs[i].del == 0 ? "" : "<del>" + firstObj.childs[i].del + "元</del>"}
                    </p>
                </a>
            </li>`).appendTo(".brick-list");
            }

            for (var i = 1 ;i< result.length; i++) {
                var node2 = $(`<div class='home-banner-box'>
                <a href="#">
                    <img src="${result[i].topImg}"
                        alt="" />
                </a>
            </div>
            <div class='home-brick-box home-brick-row-2-box xm-plain-box'>
                <div class='box-hd clearfix'>
                    <h2 class='title'>${result[i].title}</h2>
                    <div class='more'>
                        <ul class='tab-list'>
                            <li class='tab-active'>
                                热门
                            </li>
                            <li>
                            ${result[i].subTitle}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class='box-bd'>
                    <div class='row'>
                        <div class='span4'>
                            <ul class='brick-promo-list clearfix'>
                                <li class='brick-item  brick-item-m'>
                                    <a href="#">
                                        <img src="${result[i].leftChilds[0]}"
                                            alt="" />
                                    </a>
                                </li>
                                <li class='brick-item  brick-item-m'>
                                    <a href="#">
                                        <img src="${result[i].leftChilds[1]}"
                                            alt="" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class='span16'>
                            <ul class="brick-list clearfix">
                            </ul>
                            <ul class="brick-list clearfix hide">
                            </ul>
                        </div>
                    </div>
                </div>
            </div>`);
            node2.appendTo(".page-main .container");

            var hotChilds = result[i].hotChilds;
            for (var j = 0;j < hotChilds.length;j++) {
                var node3 = null;
                if (j == hotChilds.length - 1) {
                    node3 = $(`<div>
                    <li class='brick-item brick-item-s'>
                        <a href="#">
                            <div class='figure figure-img'>
                                <img width="80" height="80"
                                    src="${hotChilds[j].img}"
                                    alt="" />
                            </div>
                            <h3 class='title'> ${hotChilds[j].title} </h3>
                            <p class='price'>
                                <span class='num'>${hotChilds[j].price}</span>元
                                <span>起</span>
                            </p>
                        </a>
                    </li>
                </div>
                <li class='brick-item brick-item-s'>
                    <a href="#">
                        <div class='figure figure-more'>
                            <i class='iconfont iconfont-circle-arrow-right'></i>
                        </div>
                        <div class='more'>
                            浏览更多
                            <small>热门</small>
                        </div>
                    </a>
                </li>`)
                } else {
                    node3 = $(`<div>
                    <li class='brick-item brick-item-m brick-item-m-2'>
                        <a href="#">
                            <div class='figure figure-img'>
                                <img width="160" height="160"
                                    src="${hotChilds[j].img}"
                                    alt="" />
                            </div>
                            <h3 class='title'>${hotChilds[j].title}</h3>
                            <p class='desc'>${hotChilds[j].desc}</p>
                            <p class='price'>
                                <span class='num'>${hotChilds[j].price}</span>元
                                <del>
                                    <span class='num'>${hotChilds[j].del == 0 ? "" : result[i].hotChilds[j].del + "元"}</span>
                                </del>
                            </p>
                        </a>
                    </li>
                </div>`);
                }
                node3.appendTo(node2.find(".span16 .brick-list").eq(0));
            } 

            var childs = result[i].childs;
            for (var k = 0; k < childs.length;k++) {
                var node4 = null;
                if (k == childs.length - 1) {
                    node4 = $(`<div>
                    <li class='brick-item brick-item-s'>
                        <a href="#">
                            <div class='figure figure-img'>
                                <img width="80" height="80"
                                    src="${childs[k].img}"
                                    alt="" />
                            </div>
                            <h3 class='title'> ${childs[k].title} </h3>
                            <p class='price'>
                                <span class='num'>${childs[k].price}</span>元
                                <span>起</span>
                            </p>
                        </a>
                    </li>
                </div>
                <li class='brick-item brick-item-s'>
                    <a href="#">
                        <div class='figure figure-more'>
                            <i class='iconfont iconfont-circle-arrow-right'></i>
                        </div>
                        <div class='more'>
                            浏览更多
                            <small>${result[i].subTitle}</small>
                        </div>
                    </a>
                </li>`)
                } else {
                    node4 = $(`<div>
                    <li class='brick-item brick-item-m brick-item-m-2'>
                        <a href="#">
                            <div class='figure figure-img'>
                                <img width="160" height="160"
                                    src="${childs[k].img}"
                                    alt="" />
                            </div>
                            <h3 class='title'>${childs[k].title}</h3>
                            <p class='desc'>${childs[k].desc}</p>
                            <p class='price'>
                                <span class='num'>${childs[k].price}</span>元
                                <del>
                                    <span class='num'>${childs[k].del == 0 ? "" : result[i].childs[k].del + "元"}</span>
                                </del>
                            </p>
                        </a>
                    </li>
                </div>`);
                }
                node4.appendTo(node2.find(".span16 .brick-list").eq(1));
            }

            }

            

            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    function dataTab() {
        $(".page-main .container").on("mouseenter", ".more .tab-list li", function () {
            $(this).addClass("tab-active").siblings("li").removeClass("tab-active");
            $(this).parents(".home-brick-box").find(".box-bd .span16 ul").eq($(this).index()).removeClass("hide").siblings("ul").addClass("hide");
        })
    }

    return  {
        download : download,
        dataTab: dataTab
    }
})