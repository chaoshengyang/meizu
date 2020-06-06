
console.log('加载成功')
/*
    配置我们要引入的模块路径
*/
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        // "jquery-cookie": "jquery.cookie",
        "banner": "banner",
        "nav":"nav",
        "shoplist":"shoplist",
        "index":"index"
    },
    // shim: {
    //     //jquery.cookie 是依赖于 jquery开发
    //     //设置依赖关系
    //     "jquery-cookie": ["jquery"],
    //     //某一个模块，不遵从AMD   声明define
    //     // "parabola": {
    //     //     exports: "_" //和普通的函数一样去使用
    //     // }
    // }
})


//使用轮播图模块，实现轮播效果
require(["banner","nav","shoplist","index","jquery"], function(banner,nav,shoplist,index,$){
    banner.handleClick(); //实现点击按钮，完成图片的切换
    //banner.handleHover(); //自动轮播和添加banner图的移入移出效果
    nav. topNavdownload()
    nav.topNavTab()
    nav.sideNavTab()

    shoplist. Shopdownload()
    shoplist.ShopTab()
    shoplist.recTab()

    index.  maindownload()

})