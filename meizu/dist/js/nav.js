define([
    'jquery'
   ], function($) {
    
    //发送ajax请求下载顶部数据
    function topNavdownload(){
        $.ajax({
            url:"./data/nav.json",
            success:function(res){
                //console.log(res)
                //取出数据中的topNav，是个数组
                var topNav= res.topNav
                //console.log(topNav)
                var NavStr = ''
                NavStr = topNav.reduce((html,item)=>{
                   html+= `<li class="nav-item"><a href="./shoplist.html">${item.title}</a></li>`
                   //不要忘了把结果return出去
					return html
                },'')
               $(".layout-header .layout-header-nav").html(NavStr)
               
               
              
            },
            error: function (msg) {
				console.log(msg);
			}
        })
        //把顶部导航隐藏数据下载
        topNav()
        //侧边导航栏数据下载
        sideNavdownload()
    }


    //顶部导航隐藏内容
    function topNav(){
           $.ajax({
            url:"./data/nav.json",
            success:function(res){
                //console.log(res)
                //取出数据中的topNav，是个数组
                var topNav= res.topNav
                // console.log(topNav)
                for(var i = 0;i<topNav.length;i++){
                    //创建jQuery节点
                    var nodeUl =$(`<ul style="display:${i==0?"block":"none"}"></ul>`) 
                    nodeUl.appendTo(".navdata .main")

                    //只有前几个有下拉菜单
                    if(topNav[i].child){
                       
                        
                         //如果有child这个数组，就添加
                         var childArr = topNav[i].child
                        // console.log(childArr)
                        for(var j = 0;j<childArr.length;j++){
                            $(` <li>
                            <a href="">
                                <img src="${childArr[j].img}" alt="">
                                <span>${childArr[j].name}</span>
                                <p>${childArr[j].price}</p>
                            </a>
                        </li>`).appendTo(nodeUl)
                        //最后一个修改下样式
                        if(i==topNav.length-1){
                           
                            nodeUl.css({
                                "padding-left":0,
                               
                                
                            })
                            nodeUl.find("li").css({
                                 width: "1240px",
                                height:350,
                                "padding-left":0,

                                
                            }).find("a").css({
                                width: "100%",
                                height: "100%",
                            })
                            nodeUl.find("img").css({
                                width: "100%",
                                height: "100%",
                              
                            })
                        }
                        }
                    }
                   
                   
                }
              
              
            },
            error: function (msg) {
				console.log(msg);
			}
        })
    }

    //顶部导航移入移出效果
    function topNavTab(){
        //通过事件委托来实现
        
        $(".layout-header .layout-header-nav").on("mouseenter",".nav-item",function(){
            //顶部的样式
            $(this).addClass("layout-header-nav-active")
            // $(".layout-header-nav-active").css(" background-color","red")
            //导航部分的下标
            var index = $(this).index()
            
            //只有顶部下标0~3有对应的下拉菜单
            if(index>=0&&index<=3||index==9){
                $("#navdata").css("display","block").removeClass("slideup").addClass("slidedown")
                $("#navdata .main").find("ul").eq(index).css("display","block").siblings("ul").css("display","none")
                
            }
            if(index>3&&index<9){
                $("#navdata").css("display","none").removeClass("slidedown").addClass("slideup")
            }
           
            
            
        })
        //顶部的样式
        $(".layout-header .layout-header-nav").on("mouseleave",".nav-item",function(){
            $(this).removeClass("layout-header-nav-active")
            
        })
        //给整个导航添加移出，这样可以移动到下拉菜单里
        $(".layout-header").on("mouseleave",function(){
           
            $("#navdata").css("display","none").removeClass("slidedown").addClass("slideup")
          
        })
    }


    //侧边导航栏加载数据
    function sideNavdownload(){
        $.ajax({
            url:"./data/nav.json",
            success:function(res){
                //console.log(res)
                //取出数据中的topNav，是个数组
                var sideNav= res.sideNav
                //console.log(topNav)
               
                
                for(var i = 0;i<sideNav.length;i++){
                   var  NavStr =$( ` 
                    <li class="sideitem"><a href="#">${sideNav[i].title} <img src="${sideNav[i].rightimg}" alt=""><div class="catalogdata children-col-3"></div></a></li>`
                    )
                    NavStr.appendTo("#play .catalogList")
                     //取出当前选项的子节点
                    //因为这里数据一列是3个，一共是8个数据所以就确定宽度了
                    //如果不确定宽度，根据数据的子节点数量来计算宽度。添加对应的class名
                    // var childArr = sideNav[index].child
                   //var col = Math.ceil(childArr.length)/3
                  //NavStr.find("div.catalogdata").addClass("children-col-"+col)
                  
                    var childArr = sideNav[i].child
                //      console.log(childArr)
                     
                   for(var j = 0;j<childArr.length;j++){
                      
                       //每3个创建一个ul
                    //    $(`<ul class="children-list"></ul>`).appendTo(NavStr.find("div.catalogdata"))
                      
                       if(j%3==0){
                       
                         var newUl = $(`<ul class="children-list"></ul>`).appendTo(NavStr.find("div.catalogdata"))
                       }
                       $(`  <li>
                       <object><a href="#inner">
                           <img src="${childArr[j].img}" alt="" class="children-list-img">
                           <span>${childArr[j].name}</span>
                            
                       </a></object>
                   </li>`).appendTo(newUl)
                   }
                 

                }     
              
            },
            error: function (msg) {
				console.log(msg);
			}
        })
       
    }
    //侧边导航栏移入移出效果
    function sideNavTab(){
      //通过事件委托来实现
      $("#catalogList").on("mouseenter",".sideitem",function(){
        $(this).addClass("catalogdata-active")
      })
      $("#catalogList").on("mouseleave",".sideitem",function(){
        $(this).removeClass("catalogdata-active")
    })
    }
    

    return {
        topNavdownload:topNavdownload,
        topNavTab:topNavTab,
        sideNavTab:sideNavTab

        
    }   
});