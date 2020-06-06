define([
    'jquery',
    'jquery-cookie'
    
], function($) {
   function login (){

    var btn = $("#login"),
        userInput =$("#account"),
        pwdInput = $("#password")
        btn.click(function(e){
            var username = userInput.val(),
                pwd = pwdInput.val()
               
            $.ajax({
                type: "post", //请求方式
                url: "./php/register.php",
                data: {      //请求的参数
                    username,
                    pwd,
                },
                success: function(resp){ 
                    var resp = JSON.parse(resp)
                    
                    if(resp.code ===1){
                        $.cookie("username",`${username}`)
                        alert(`${resp.msg},登陆成功，即将跳转首页`)
                        location.href='./index.html'
                    }else{
                        alert(resp.msg)
                    }
                },
                error: function(err){   //下载失败以后，执行的回调函数
                    console.log(err)
                }
            })
              //阻止form的默认提交
        if(e.preventDefault){
            e.preventDefault()
        }else{
            return false
            } 
        })
  
   }
   return{
      login:login
   }
    
});