define(["jquery","jquery-cookie"], function ($) {
    // 加载以及加入购物车的商品
    /* 
        cookie 中只存储了 商品的id和数量
        加载数据, 必须使用商品的具体信息, 从数据源中获取
        goodsCartList.json
        goodsList.json
        [注]要找出加入到购物车的商品的数据(详情数据)
        new Promise处理量词按照顺序加载的数据
    */
   function loadCarData() {
        // 清空
        $("#J_cartListBody .item-table").empty();

       new Promise(function (resolve, reject) {
           $.ajax({
               url: "../data/goodsCarList.json",
               success : function (result) {
                   resolve(result.data);
               },
               error : function (msg) {
                   reject(msg);
               }
           })
       }).then(function (arr1) {
            // console.log(arr1);
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url : "../data/goodsList2.json",
                    success: function (result){
                        var newArr = arr1.concat(result);
                        resolve(newArr);
                    },
                    error: function (msg) {
                        reject(msg);
                    }
                })
            })
       }).then(function (arr) {
            // console.log(arr);
            // arr 是所有商品的信息, 需要在页面上加载加入了购物车的数据
            // 通过已经加入了购物车中的商品的id 找出详细的数据
            // 1. 在购物车中将所有的数据拿到
            var cookieStr = $.cookie("goods");
            if (cookieStr) {
                var cookieArr = JSON.parse(cookieStr);
                var newArr = [];
                for (var i = 0; i < cookieArr.length;i++) {
                    for (var j = 0; j < arr.length; j++) {
                        if (arr[j].product_id == cookieArr[i].id || arr[j].goodsid == cookieArr[i].id) {
                            // 注意要将商品的数量记录下来
                            arr[j].num = cookieArr[i].num;
                            // 设置一下id便于后面插入操作
                            arr[j].id = arr[j].product_id ? arr[j].product_id : arr[j].goodsid;
                            newArr.push(arr[j]);
                        }
                    }
                }
            }
            for (var i = 0; i< newArr.length;i++) {
               var node =  $(`<div class="item-row clearfix" id="${newArr[i].id}"> 
            <div class="col col-check">  
                <i class="iconfont icon-checkbox icon-checkbox-selected J_itemCheckbox" data-itemid="2192300031_0_buy" data-status="1">√</i>  
            </div> 
            <div class="col col-img">  
                <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                    <img alt="" src="${newArr[i].image}" width="80" height="80"> 
                </a>  
            </div> 
            <div class="col col-name">  
                <div class="tags">   
                </div>     
                <div class="tags">  
                </div>   
                <h3 class="name">  
                    <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                    ${newArr[i].name}
                    </a>  
                </h3>        
            </div> 
            <div class="col col-price"> 
            ${newArr[i].price}元 
                <p class="pre-info">  </p> 
            </div> 
            <div class="col col-num">  
                <div class="change-goods-num clearfix J_changeGoodsNum"> 
                    <a href="javascript:void(0)" class="J_minus">
                        <i class="iconfont"></i>
                    </a> 
                    <input tyep="text" name="2192300031_0_buy" value="${newArr[i].num}" data-num="1" data-buylimit="20" autocomplete="off" class="goods-num J_goodsNum" "=""> 
                    <a href="javascript:void(0)" class="J_plus"><i class="iconfont"></i></a>   
                </div>  
            </div> 
            <div class="col col-total"> 
            ${(newArr[i].price * newArr[i].num).toFixed(2)}元 
                <p class="pre-info">  </p> 
            </div> 
            <div class="col col-action"> 
                <a id="${newArr[i].id}" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods"><i class="iconfont"></i></a> 
            </div> 
            </div>`);
            node.appendTo("#J_cartListBody .item-table")
            }
            goodsSum();
       })
   }

    // 加载推荐购买模块
    function download () {
        goodsSum();
        $.ajax({
            type: "get",
            url:"../data/goodsCarList.json",
            success: function (result) {
                // console.log(result);
                var dataArr = result.data;
                for (var i = 0; i < dataArr.length; i++) {
                    $(`<li class="J_xm-recommend-list span4">    
                <dl> 
                    <dt> 
                        <a href="//item.mi.com/${dataArr[i].commodityid}.html"> 
                            <img src="${dataArr[i].image}" srcset="//i1.mifile.cn/a1/pms_1551867177.2478190!280x280.jpg  2x" alt="小米净水器1A（厨下式）"> 
                        </a> 
                    </dt> 
                    <dd class="xm-recommend-name"> 
                        <a href="//item.mi.com/${dataArr[i].commodityid}.html"> 
                        ${dataArr[i].name} 
                        </a> 
                    </dd> 
                    <dd class="xm-recommend-price">${dataArr[i].price}元</dd> 
                    <dd class="xm-recommend-tips">${dataArr[i].comments}人好评    
                        <a href="#" class="btn btn-small btn-line-primary j_xm-recommend-btn" style="display: none;" id="${dataArr[i].goodsid}">加入购物车</a>  
                    </dd> 
                    <dd class="xm-recommend-notice">

                    </dd> 
                </dl>  
                </li>`).appendTo("#J_miRecommendBox .row");
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    // 添加至购物车操作
    function addCart() {
        goodsSum();
        $("#J_miRecommendBox .row").on("click", ".J_xm-recommend-list .xm-recommend-tips a", function () {
            var id = $(this).attr("id");
            // console.log(id);
            if (!$.cookie("goods")) {
                var cookieArr = [{
                    id: id,
                    num: 1
                }];
            } else {
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                var same = false;
                for (var i = 0; i< cookieArr.length;i++) {
                    if (cookieArr[i].id == id) {
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }
                }
                if (!same) {
                    cookieArr.push({
                        id : id,
                        num: 1
                    })
                } 
            }
            var cookieStr = JSON.stringify(cookieArr);
            $.cookie("goods",cookieStr, {
                expires : 7
            });
            // console.log($.cookie("goods"));
            loadCarData();
            goodsSum();
            return false;
        })
    }

    // 移入移出操作
    function cartHover() {
        $("#J_miRecommendBox .row").on("mouseenter",".J_xm-recommend-list", function () {
            $(this).find(".xm-recommend-tips a").css("display","block");
        } ).on("mouseleave",".J_xm-recommend-list",function () {
            $(this).find(".xm-recommend-tips a").css("display","none");
        })
    }

    // 全选按钮和单选按钮添加点击事件
    function checkFunc() {
        $("#J_cartBox .list-head .col-check").find("i").click(function () {
            // 获取每一个单选商品的框
            var allChecks = $(".list-body .item-box .item-table").find(".item-row .col-check i");
            // console.log(allChecks);
            if($(this).hasClass("icon-checkbox-selected")) {
                $(this).add(allChecks).removeClass("icon-checkbox-selected");
            }else {
                $(this).add(allChecks).addClass("icon-checkbox-selected")
            }
            goodsSum();
        })

        $(".list-body .item-box .item-table").on("click",".item-row .col-check i", function() {
            // console.log(11);
            if ($(this).hasClass("icon-checkbox-selected")) {
                $(this).removeClass("icon-checkbox-selected");
                $("#J_cartBox .list-head .col-check").find("i").removeClass("icon-checkbox-selected");

            } else {
                $(this).addClass("icon-checkbox-selected");
                var allChecks = $(".list-body .item-box .item-table").find(".item-row .col-check i");
                var flag = true;
                for (var i = 0; i< allChecks.length;i++) {
                    if (!$(allChecks[i]).hasClass("icon-checkbox-selected")) {
                        flag = false;
                        break;
                    }
                }
                if (flag) { 
                    $("#J_cartBox .list-head .col-check").find("i").addClass("icon-checkbox-selected");
                }
            }
            goodsSum();
        })
    }

    // 计算商品总数 和 已经选择的商品总数
    function goodsSum() {
        var allList = $("#J_cartListBody").find(".item-row");
        var Allsum = 0;
        var selectSum = 0;
        var totalCount = 0;
        allList.each(function (index, item) {
            if ($(item).find(".col-check i").hasClass("icon-checkbox-selected")){
                selectSum += parseInt($(item).find(".col-num input").val());
                totalCount += parseFloat($(item).find(".col-num input").val()) * parseFloat($(item).find(".col-price").html().trim());
            }
            Allsum += parseInt($(item).find(".col-num input").val());
        })
        $("#J_cartTotalNum").html(Allsum);
        $("#J_selTotalNum").html(selectSum);
        totalCount = totalCount.toFixed(2);
        $("#J_cartTotalPrice").html(totalCount);
    }
    
    // 给页面上的商品添加增加 减少 删除 事件
    function changeCars() {
        $("#J_cartListBody").on ("click",".del", function () {
            var id = $(this).attr("id");
            $(this).closest(".item-row").remove();
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            for (var i = 0; i< cookieArr.length; i++) {
                if (cookieArr[i].id == id) {
                    cookieArr.splice(i,1);
                    break;
                }
            }
            if (cookieArr.length == 0) {
                $.cookie("goods", null);
            } else {
                cookieStr = JSON.stringify(cookieArr);
                $.cookie("goods",cookieStr,{
                    expires : 7
                })
            }
            goodsSum();
        })

        $("#J_cartListBody").on("click", ".J_minus, .J_plus", function () {
            var id = $(this).closest(".item-row").attr("id");
            // console.log(id);
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            var goodsNum = $(this).siblings("input").val();
            if ($(this).hasClass("J_minus")) {
                for (var i = 0; i < cookieArr.length;i++) {
                    if (cookieArr[i].id == id) {
                        if (goodsNum == 1) {
                            alert("商品数量为1, 不能再减啦~");
                            break;
                        } else {
                            cookieArr[i].num--;
                            $(this).siblings("input").val(cookieArr[i].num);
                        }
                    }
                }
            }

            if ($(this).hasClass("J_plus")) {
                for (var i = 0; i< cookieArr.length;i++) {
                    if (cookieArr[i].id == id) {
                        cookieArr[i].num++;
                        $(this).siblings("input").val(cookieArr[i].num);
                    }
                }
            }

            cookieStr = JSON.stringify(cookieArr);
            $.cookie("goods",cookieStr,{
                expires : 7
            })
            var price = parseFloat($(this).closest(".col-num").siblings(".col-price").html().trim()) * parseInt($(this).siblings("input").val());
            $(this).closest(".col-num").siblings(".col-total").html(`${price.toFixed(2)}元 
            <p class="pre-info">  </p> `)
            goodsSum();
        })

        $("#J_cartListBody").on("blur", "input", function () {
            var id = $(this).closest(".item-row").attr("id");
            // console.log(id);
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            var num = $(this).val();

            for (var i = 0; i< cookieArr.length;i++) {
                if (cookieArr[i].id == id) {
                   var _this = i; 
                   var orginNum =  cookieArr[i].num;
                   break;
                }
            }
            if (num != parseInt(num) || num < 0) {
                $(this).val(orginNum);
                alert("请输入正确的数量");
            } else {
                cookieArr[_this].num = num;
                cookieStr = JSON.stringify(cookieArr);
                $.cookie("goods",cookieStr,{
                    expires : 7
                })
                var price = parseFloat($(this).closest(".col-num").siblings(".col-price").html().trim()) * num;
                $(this).closest(".col-num").siblings(".col-total").html(`${price.toFixed(2)}元 
                <p class="pre-info">  </p> `)
                goodsSum();
            }
        })

        
        
    }
    

    return {
        download: download,
        cartHover: cartHover,
        addCart: addCart,
        loadCarData :loadCarData,
        checkFunc: checkFunc,
        changeCars:changeCars
    }
})