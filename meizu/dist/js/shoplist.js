define([
    "jquery"
], function ($) {
    function Shopdownload() {
       
        $.ajax({
            url: "./data/shoplist.json",
            success: function (res) {
                // console.log(res)
                //取出数据中的phoneList，是个数组
                var phoneList = res.phoneList
                //console.log(phoneList)
                
               
                
                for(var i = 0;i<phoneList.length;i++){
                    var item = $(`
                    <li class="phoneitem">
     
                                     <a href="http://localhost:8888/shopDesc.html?product_id=${phoneList[i].product_id}" class="itemphone">
                                         <img src="${phoneList[i].imgs[0]}" alt="" class="itemimg">
                                         <ul class="item-side">
                                           
                                         </ul>
                                         <span class="goods-info">
                                             <span class="goods-name">${phoneList[i].title}</span>
                                             <span class="goods-desc">${phoneList[i].desc}</span>
                                             <span class="goods-price">
                                                 <i>￥</i>${phoneList[i].price}
     
                                             </span>
                                         </span>
     
                                     </a>
     
                                 </li>
                    `)
                    item.appendTo(".phonecontent-main .phonelist")
                    var btnsArr = res.phoneList[i].btns
                    var imgsArr = res.phoneList[i].imgs
                    // console.log(btnsArr)
                    // console.log(imgsArr)
                    for(var j = 0;j<btnsArr.length;j++){
                        //把创建的li添加到对应的ul里，就要用find来找到当前创建的ul
                        $(`<li class="item-side-li" src = "${imgsArr[j]}"><img src="${btnsArr[j]}" alt=""></li>`).appendTo(item.find(".item-side"))
                    }
                   


                //外层循环    
                }
           
                //推荐部分的数据下载
                recdownload()
                
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    //商品列表点击按钮切换商品图片
    function ShopTab() {
        //因为按钮是后添加的 要用事件委托
           $(".phonelist").on("click",".item-side-li",function(e){
            $(".item-side-li").removeClass("item-side-active");
            //阻止点击a标签触发跳转
            e.preventDefault();
            $(this).addClass("item-side-active");
            var imgsrc =  $(this).attr("src");
             //console.log(imgsrc)
            
              $(this).parents(".itemphone").find(".itemimg").attr("src",`${imgsrc}` );


           })
       
    }

    //推荐部分数据下载
    function recdownload(){
        $.ajax({
            url:"./data/recommend.json",
            success:function(res){
                var recList = res.recList
                //console.log(recList)
                for(var i = 0;i<recList.length;i++){
                    //要写成jQuery对象
                    var recStr =$( `   <li class="rec-item">
                    <a href="" class="rec-a">
                        <img src="${recList[i].img}" alt="">
                        <div class="rec-info">
                            <h4 class="rec-name">${recList[i].title}</h4>
                            <p class="rec-desc">
                                <i>￥</i>${recList[i].price}
                            </p>
                        </div>
                       
                    </a>
                </li>`)
                recStr.appendTo(".recommend .recommend-warp")
                }
            },

            error: function (msg) {
                console.log(msg);
            }
        })
    }

    function recTab(){
        //事件委托实现推荐部分的移动
        var recbtns = $(".recommend .rec-btns").find("li a")
        recbtns.click(function(e){
            //阻止点击a标签触发跳转
            e.preventDefault();
            console.log($(this).parent("li").index())
            recbtns.removeClass("rec-active")
            $(this).addClass("rec-active")
            var iNow = $(this).parent("li").index()
            //一共9组数据，每3个一组
           if(iNow==0){
        
                $(".recommend-warp").css({
                    transform: `translate3d(0px, 0px, 0px)`,
                    // transition-duration中间带-的，去掉，把后面的字母大写
                    transitionDuration:" 1s"

                })
           }else if(iNow ==1){
            $(".recommend-warp").css({
                transform: `translate3d(-930px, 0px, 0px)`,
                // transition-duration中间带-的，去掉，把后面的字母大写
                transitionDuration:" 1s"

            })
           }else{
            $(".recommend-warp").css({
                transform: `translate3d(-1240px, 0px, 0px)`,
                // transition-duration中间带-的，去掉，把后面的字母大写
                transitionDuration:" 1s"

            })
           }
           
          
        })
    }
    return {
        Shopdownload: Shopdownload,
        ShopTab: ShopTab,
        recTab:recTab
        
    }

});