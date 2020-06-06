

console.log('加载成功')
/*
    配置我们要引入的模块路径
*/
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "nav":"nav",
        "desc":"desc"
    },
    shim: {
        //jquery.cookie 是依赖于 jquery开发
        //设置依赖关系
        "jquery-cookie": ["jquery"],
       
       
    }
})


//使用轮播图模块，实现轮播效果
require(["nav","desc","jquery"], function(nav,desc,$){
   
    nav. topNavdownload()
    nav.topNavTab()
    nav.sideNavTab()

    desc.download()
    desc.colorTab()
    desc.imgTab()
    desc.selectTab()
    desc.shopcart()
    

   

})