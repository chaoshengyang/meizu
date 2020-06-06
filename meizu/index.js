define([
    'jquery'
   ], function($) {
    
    //发送ajax请求下载顶部数据
    function  maindownload(){
        $.ajax({
            url:"./data/index.json",
            success:function(res){
                var phone = res.phone
               $(` <li class="big">
               <div class="goods-box">
                   <a href="./shopDesc.html?product_id=17">
                       <img src="${phone[0].img}" alt="" class="img-big">
                       <span class="goods-info goods-info-firstrow">
                           <span class="goods-name">${phone[0].title}</span>
                           <span class="goods-desc">${phone[0].desc}</span>
                           <span class="goods-price">
                               <i>￥</i>
                               ${phone[0].price}
                           </span>
                       </span>
                       <span class="product-sign red">${phone[0].sign}</span>
                   </a>
               </div>

           </li>`).appendTo("#main-phoneList")
                
             $(`<li class="big big2">
             <div class="goods-box">
                 <a href="./shopDesc.html?product_id=17pro">
                     <img src="${phone[1].img}" alt="" class="img-big">
                     <span class="goods-info goods-info-firstrow">
                         <span class="goods-name">${phone[1].title}</span>
                         <span class="goods-desc">${phone[1].desc}</span>
                         <span class="goods-price">
                             <i>￥</i>
                             ${phone[1].price}
                         </span>
                     </span>
                     <span class="product-sign red">${phone[1].sign}</span>
                 </a>
             </div>
         </li>`).appendTo("#main-phoneList")  
         for(var i = 2;i<phone.length;i++){
            $(` <li ${i==phone.length-1?'class="last"':''}>
            <div class="goods-box">
                <a href="">
                    <img src="${phone[i].img}" alt="" class="img-small">
                    <span class="goods-info">
                        <span class="goods-name">${phone[i].title}</span>
                        <span class="goods-desc">${phone[i].desc}</span>
                        <span class="goods-price">
                            <i>￥</i>
                            ${phone[i].price}
                        </span>
                    </span>
                    <span class="product-sign red">${phone[i].sign}</span>
                </a>
            </div>
        </li>
         `).appendTo("#main-phoneList")
         }
         $(".last").find(".product-sign").remove()

         //耳机部分
         var ear = res.ear
         for(var i = 0;i<ear.length;i++){
            $(`<li>
            <div class="goods-box">
                <a href="">
                    <img src="${ear[i].img}" alt="" class="${ear[i].class1}">
                    <span class="${ear[i].class2}">
                        <span class="goods-name">${ear[i].title}</span>
                        <span class="goods-desc">${ear[i].desc}</span>
                        <span class="goods-price">
                            <i>￥</i>
                            ${ear[i].price}
                        </span>
                    </span>
        
                </a>
            </div>
   
        </li>`).appendTo("#main-earList")
         }
        
               
              
            },
            error: function (msg) {
				console.log(msg);
			}
        })
       
    }



    return {
        maindownload: maindownload

        
    }   
});