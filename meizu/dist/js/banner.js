//实现轮播图效果
//遵从AMD规范，编写轮播图模块

define(["jquery"], function($){
    var timer = null;
    var iNow = 0; //表示当前显示的图片的下标
    var aBtns = null;
    var oUl = null;

    function handleClick(){
        //给页面上有的按钮添加点击
        aBtns = $("#play").find(".bannerbtn span");
        oUl = $("#play").find(".mainbanner");
        aBtns.click(function(){
            iNow = $(this).index();
           
            tab();
            console.log(iNow)
        })
    }

    // function handleHover(){
    //     $("#play").mouseenter(function(){
    //         clearInterval(timer);
    //     }).mouseleave(function(){
    //         timer = setInterval(function(){
    //             iNow++;
    //             tab();
    //         }, 2000);
    //     })
    // }

    // timer = setInterval(function(){
    //     iNow++;
    //     tab();
    // }, 2000);

    // //切换按钮的样式，运动到对应的图片
    function tab(){
       
        aBtns.removeClass("banneractive").eq(iNow).addClass("banneractive");
        
        if(iNow == aBtns.size()){
            aBtns.eq(0).addClass("banneractive");
        }

        oUl.animate({left: -iNow * 1240}, 500, function(){
            //当我们滚动到最后一张图片的时候，直接切回第一张图片
            if(iNow == aBtns.size()){
                iNow = 0;
                oUl.css("left", 0);
            }
           
        });
    }

    return {
        handleClick: handleClick,
        //handleHover: handleHover
    }
})