define([
    'jquery',
    'jquery-cookie'
    
], function($) {
    


    function download(){
        //找到详情页加载商品的id
        //location.search返回地址栏?之后的内容
        var product_id =  valueByname(location.search, "product_id")
        console.log(product_id)
        // 通过商品id找到商品的信息
        $.ajax({
            type:"get",
            
            url:"./data/desc.json",
            success:function(res){
                var goodsMsg = res.find(item=>item.product_id ==product_id)
                var node1 = $(`
                <img src="${goodsMsg.img1[0]}"  class="Img" alt="">
                        `).appendTo(".img-left .img-left-a")

                        //三种颜色对应的四张图片
                var List1 = goodsMsg.img1,
                    List2 = goodsMsg.img2,
                    List3 = goodsMsg.img3

                
                
                 for(var j = 0;j<List1.length;j++){
                         //大图下方的小图
                           var str = $(`
                         <li src="${List1[j]}" class="img-List-li img-List-li-${j}" data-color0="${List1[j]}" data-color1="${List2[j]}" data-color2="${List3[j]}"><a href="javascript:;"><img src="${List1[j]}" alt="" class="data-img-${j}"></a></li>
                           ` )
                          str.appendTo($(".info-left").find(".img-List"))
                                          
                        }
                //手机名和描述
                $(`<h1>${goodsMsg.title} </h1>
                <p>
                ${goodsMsg.desc}
               </p> `).appendTo(".info-right .info-header")
               //手机价格
               $(`  <div class="info-price">
               <em>￥</em><span> ${goodsMsg.price}</span>
           </div>`).appendTo(".info-right .info-sell")

           //手机颜色和对应图 三个内容   花呗分期
           var colorList = goodsMsg.color,
               imgList = goodsMsg.img,
               huabei = goodsMsg.huabei
           for(var i = 0;i<colorList.length;i++){
               $(`
               <a href="javascript:;" class="color ${i==0?"active":''}"><img src="${imgList[i]}" alt="" >${colorList[i]}</a> 
                 `).appendTo(".color-item .info-set-color")


              $(`<a href="javascript:;" class="hbfenqi ${i==0?"active":''}">
              <span>${huabei[i].money}</span>
             <p>${huabei[i].time}</p>
             </a>`).appendTo(".info-huabeiList")
           }
          
           //内存容量 两个内容
           var RAMarr = goodsMsg.RAM
           for(var k = 0;k<RAMarr.length;k++){
               $(` <a href="javascript:;" class="${k==0?"active":''} RAM">${RAMarr[k]}</a>`).appendTo(".info-set-RAM")
           
           }

                $(`<a href="javascript:;" class="addshop" id="${goodsMsg.product_id}">加入购物车</a>`).appendTo(".info-buy-action") 
                
            },
            error:function(msg){
                console.log(msg)
            }
        })
       

    }

    //获取地址栏的id   ?name=value1&name=value2
    function valueByname(search,name){
        var start = search.indexOf(name+'=')
        //如果不存在name= 返回的是-1
        if(start ==-1){
            return null
        }else{
            //从start开始找找结束位置& 
            var end = search.indexOf("&",start)
            //如果没有&结束，就只有一个参数，结束位置是value后面那个位置
            if(end ==-1){
                end = search.length
            }
            //提取键值对 substring获取两个下标之间的内容
            var str = search.substring(start,end)
            //现在查找到的 =value&,如果只有一个属性就是=value
            //因为地址栏只有一个参数id，所以查找到的是=value
            //split把字符串转成数组，并通过 = 切成=和value
            var arr = str.split("=")
            return arr[1]
        }
    }

    
  

    //颜色切换
    function colorTab(){
        var parentnode = $(".info-set").find($("dl[data-property='颜色分类']"))
        parentnode.on("click",".info-set-color .color",function(){
            var index = $(this).index()
           console.log($(this).index())
           var url0 = $(".img-List .img-List-li-0").attr(`data-color${index}`)
           var url1 = $(".img-List .img-List-li-1").attr(`data-color${index}`)
           var url2 = $(".img-List .img-List-li-2").attr(`data-color${index}`)
           var url3 = $(".img-List .img-List-li-3").attr(`data-color${index}`)
           //console.log(url0,url1,url2,url3)
           var arr = [url0,url1,url2,url3]
          for(var i =0;i<4;i++){
            $(`.img-List .img-List-li-${i}`).attr("src",`${arr[i]}`)
            $(`.img-List .img-List-li-${i}`).find(`.data-img-${i}`).attr("src",`${arr[i]}`)
            $(".img-List-li").parents(".info-left").find(".Img").attr("src",`${arr[0]}`)
          }
          $(".img-List-li").removeClass("current");
          $(".img-List-li-0").addClass("current");
           
          $(".info-set-color .color").removeClass("active");
          $(this).addClass("active");
           
        })
       
    }
    //大图切换
    function imgTab(){
        $(".img-List").on("click",".img-List-li",function(){
        $(".img-List-li").removeClass("current");
        $(this).addClass("current");
        //获取li的src属性
        var imgsrc =  $(this).attr("src");
        //console.log(imgsrc)
        //赋值给上面大图的src
       
        $(this).parents(".info-left").find(".Img").attr("src",`${imgsrc}`)
        })
    }
    
    //手机型号切换
    function selectTab(){

        //选择手机型号的时候跳转样式修改不成功
      $(".info-sibling-dd").on("click",".phone-title",function(){
        $(".info-sibling-dd .phone-title").removeClass("active");
        $(this).addClass("active");
      })
      $(".info-set-RAM").on("click",".RAM",function(){
        $(".info-set-RAM .RAM").removeClass("active");
        $(this).addClass("active");
      })
      $(".set-package").on("click",".package",function(){
        $(".set-package .package").removeClass("active");
        $(this).addClass("active");
      })
      $(".info-huabeiList").on("click",".hbfenqi",function(){
        $(".info-huabeiList .hbfenqi").removeClass("active");
        $(this).addClass("active");
      })   
     
    }

    //点击加入购物车存cookie
    function shopcart(){
        $(".info-buy-action").on("click",".addshop",function(){
          //在加入购物车标签那里添加了商品id
            //获取当前加入购物车的商品id
            var id = this.id
            //console.log(id)
            //cookie取名为goods
            var first = $.cookie("goods") ==null?true:false
            //取出颜色
          //  var color = $(".color").filter(".active").text()
          //  //console.log(color)
          //  var RAM = $(".RAM").filter(".active").text()
           //console.log(RAM)
           
            if(first){
              //能进来判断说明cookie没存储过。就存储cookie
              //var cookieArr = [{id:id,num:1,color:color,RAM:RAM}]
              var cookieArr = [{id:id,num:1}]
              $.cookie("goods",JSON.stringify(cookieArr),{
                expires:7 
              })
            }else{
              //如果已经添加过cookie,判断该商品是否添加过
              //通过一个标志位去判断。默认没添加过
              var same = false
              //取出cookie
              var cookieStr = $.cookie("goods")
              //解析成数组。因为cookie只能存字符串，取出来的是字符串
              var cookieArr = JSON.parse(cookieStr)
              //遍历这个数组里的商品，有没有当前点击的这个商品。通过id去判断
              for(var i = 0;i<cookieArr.length;i++){
                if(cookieArr[i].id == id) {
                  //如果找到了，说明之前添加过该商品
                  cookieArr[i].num++;
                  
                  // cookieArr[i].color = color
                  // cookieArr[i].RAM = RAM
                  same = true;
                  break

                }
              }
              //如果循环结束的时候,same还是false。说明没添加过该商品
              if(!same){
                // var obj = {id:id,num:1,color:color,RAM:RAM}
                var obj = {id:id,num:1}
                cookieArr.push(obj)
              }
              //最后把更新后的cookie存回去
              $.cookie("goods",JSON.stringify(cookieArr),{
                expires:7
              })

            }
            console.log($.cookie("goods"))
            alert("添加商品成功")
        })
    }
    return {
        
        
        download:download,
        colorTab: colorTab,
        imgTab:imgTab,
        selectTab:selectTab,
        shopcart:shopcart
    }
    
});