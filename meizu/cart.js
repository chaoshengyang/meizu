define([
    'jquery',
    'jquery-cookie'
], function($) {
   function download(){
       $.ajax({
          url:"./data/desc.json",
          success:function(res){
            //取出cookie，用cookie中的商品id与后台商品数据id匹配
            //id相同的取出商品具体信息
            console.log(res)
            var cookieStr = $.cookie("goods")
           
            
            if(cookieStr){
                var cookieArr = JSON.parse(cookieStr)
                console.log(cookieArr)
                var goodsArr = []
                //遍历后台数据找商品的具体信息
                for(var i = 0;i<cookieArr.length;i++){
                    for(var j = 0;j<res.length;j++){
                        if(cookieArr[i].id==res[j].product_id){
                            //因为后台数据中没有商品数量，要把cookie中存的商品数量存到后台
                            res[j].num = cookieArr[i].num
                            //把这条数据插入到一个新数组里
                            goodsArr.push(res[j])
                        }
                    }
                }
                console.log(goodsArr)
                //通过循环，把商品信息渲染到页面上
                for(var i = 0;i<goodsArr.length;i++){
                    $(`<table class="shopList-body" id="${goodsArr[i].product_id}">
                    <tr class="cart-buy-more">
                        <td class="cart-product-buy">
                            <div class="buy-more-tag">
                                <span>加价购</span>
                            </div>
                            <span class="buy-tips">另加29元起，即可换购超值商品</span>
                            <a href="" class="add-shop">立即加购 ></a>
                        </td>
                    </tr>
                    <tr class="cart-product">
                        <td class="cart-col-select">
                            <div class="mz-checkbox" id="select"></div>
                            <a href="javascript:;" class="cart-product-link"><img src="${goodsArr[i].img[0]}" alt="" class="cart-product-img"></a>
                            <a href="" class="cart-product-link cart-product-info">
                                <p class="cart-product-name">${goodsArr[i].title}</p>
                                <p class="cart-product-desc">全网通公开版 湖光绿 8+128GB</p>
                            </a>
                        </td>
                        <td class="cart-col-price">
                            <p>
                            ￥<i>${goodsArr[i].price }</i>
                            </p>
                        </td>
                        <td class="cart-col-number cart-number">
                            <button class="numsub">-</button>
                            <div class="cart-num">
                                <input type="text" value="${goodsArr[i].num}" class="num-input">
                            </div>
                            <button class="numadd">+</button>
                        </td>
                        <td class="cart-col-total">
                            <span>￥<i>${(goodsArr[i].price *goodsArr[i].num).toFixed(2)}</i></span>
                        </td>
                        <td class="cart-col-ctrl" id="cart-col-ctrl"><span>x<span></td>
                    </tr>
                </table>`).appendTo(".shopList-li")
                }
             }
          },
          error:function(msg){
              console.log(msg)

          }
       })
       isCheckAll()
       $(".cart #select-all").removeClass("selectNow")
       $(".cart #select-all").html( 
           ""
        )
   }

   //全选和复选效果
   function selectall(){
       //全选效果
       $(".cart #select-all").click(function(){
           //找到所有的单选框
           var allChecks = $(".cart-col-select .mz-checkbox")
           //var mzCheck = $(".cart-select-all .mz-checkbox")
           if($(this).hasClass("selectNow")){
            $(this).add(".cart #select-all").add(allChecks).removeClass("selectNow")
            $(this).add(".cart #select-all").add(allChecks).html('')

           }else{
            $(this).add(".cart #select-all").add(allChecks).addClass("selectNow")
            $(this).add(".cart #select-all").add(allChecks).html( 
                "<i>✔</i>"
             )
        
           }  
           isCheckAll()
       })
      
       //给每个复选框添加点击效果
       $(".shopList-li").on("click",".shopList-body #select",function(){
           
        if($(this).hasClass("selectNow")){
            $(this).removeClass("selectNow")
            $(this).html('')

           }else{
            $(this).addClass("selectNow")
            $(this).html( 
                "<i>✔</i>"
             )
           } 
           isCheckAll()
       })

   }
   //判断复选框是否是全部选择并修改数量
   //每个商品点击的时候计算一次。全选按钮点击的时候计算一次。页面加载的时候计算一次
   function isCheckAll(){
    var allChecks = $(".cart-product")
    var isAll = true//复选框是否都选中
    var total = 0   //计算总价
    var count = 0 //计算商品数量
    var totalCount = 0 //记录选中商品的总数
    allChecks.each(function(index,item){
        if(!$(item).find("#select").hasClass("selectNow")){
            //如果没有复选框被选中了
            isAll = false
        }else{
            //有被选中的,计算价格和数量。这里的两个值是计算每个商品的总价和数量
            //trim()是去掉空格  val()获取input的value属性
            //total += parseFloat($(item).find(".cart-col-price p").html().trim())*parseFloat($(item).find(".num-input").val())
            
            total +=parseFloat($(item).find(".cart-col-total i").html())
           
            count+=parseInt($(item).find(".num-input").val())
            //console.log(total)
        }
        //加在购物车里的数量一共有几件
        totalCount+=parseInt($(item).find(".num-input").val())
    })
    //把数量设置上
    $("#totalCount").html(totalCount)
    $("#totalSelectedCount").html(count)
    $("#totalPrice").html("￥"+total)
    //判断是否全选
    if(isAll){
        $(".cart #select-all").addClass("selectNow")
        $(".cart #select-all").html( 
            "<i>✔</i>"
         )
    }else{
        $(".cart #select-all").removeClass("selectNow")
        $(".cart #select-all").html( 
            ""
         )
    }

   }
   //给页面上的商品添加删除或者数量增减
   function changeCarts(){
    $(".shopList-li").on("click","#cart-col-ctrl span",function(){
       //remove方法可以直接在页面上把这个节点删除。
        var id = $(this).parents(".shopList-body").remove().attr("id")
        //但也要从cookie中把这条数据删了
        var cookieStr = $.cookie("goods")
        
        var cookieArr = JSON.parse(cookieStr)
        //console.log(cookieArr)
            for(var i = 0;i<cookieArr.length;i++){
                    if(cookieArr[i].id==id){
                       cookieArr.splice(i,1)
                       break
                    }
                 }
                 //如果cookie中的数据全部删了，就删除该cookie。否则就存回去
                cookieArr.length == 0?$.cookie("goods",null):$.cookie("goods",JSON.stringify(cookieArr))
    })

    //- +操作
    $(".shopList-li").on("click",".numsub,.numadd",function(){
    
         var id = $(this).parents(".shopList-body").attr("id")
         var cookieStr = $.cookie("goods")
        
         var cookieArr = JSON.parse(cookieStr)
         //console.log(cookieArr)
        
     
             for(var i = 0;i<cookieArr.length;i++){
                //找到当前点击的该条数据
                if(cookieArr[i].id==id){
                    if(this.className =="numsub"){
                          
                        //数量-1
                         cookieArr[i].num ==1 ? alert("数量已经到1了，不能再少了") : cookieArr[i].num--;
                         //console.log( cookieArr[i].num)
                        
                    }else{
                        cookieArr[i].num ==5 ?alert("最多限购5个，不能再多了") : cookieArr[i].num++;
                        //console.log(cookieArr[i].num)
                       
                     }
                     $(this).siblings(".cart-num").find(".num-input").val(cookieArr[i].num) 
                     //取出单价
                     var price = $(this).closest(".cart-number").siblings(".cart-col-price").find("i").html()
                     //console.log(price)
                     //重新计算小计
                     $(this).closest(".cart-number").siblings(".cart-col-total").find("i").html((price*cookieArr[i].num).toFixed(2))
                     break;
                        //更新页面上的数量
                     
                      } 
                    
                 }
                 //一定要记得存回去才能生效！！！
                 $.cookie("goods",JSON.stringify(cookieArr))
                 
                 //重新计算一次总价
                 isCheckAll()
                                      
             })
   }

   return{
       download:download,
       selectall:selectall,
       changeCarts:changeCarts

   }
    
});