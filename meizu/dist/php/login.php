<?php

mysql_connect('localhost', 'root', '');
// 选择数据库
mysql_select_db('nz2004');
// 这两句用来设置编码，复制过来用就行
mysql_query("set charset 'utf8'");
mysql_query("set character set 'utf8'");
//设计接口
$name = $_POST['username'];//username是前端传来的数据
$pwd = $_POST['pwd'];
//查询数据库里是否有这个用户
$sql = "select * from user where name='$name' and pwd='$pwd'";
$res = mysql_query($sql);//res是资源类型
//不需要查到资源里的信息，用长度来判断
if(mysql_num_rows($res)>0){
    //登陆成功
    echo json_encode(array(
        //code是自定义，这里定义1是成功，0是失败
        "code" => 1,
        "msg"  => "登录成功"
    ));
}else {
    echo json_encode(array(
        "code" => 0,
        "msg"  => "用户名或密码错误"
    ));    
}


?>