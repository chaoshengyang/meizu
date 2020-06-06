<?php
mysql_connect('localhost', 'root', '');
// 选择数据库
mysql_select_db('nz2004');
// 这两句用来设置编码，复制过来用就行
mysql_query("set charset 'utf8'");
mysql_query("set character set 'utf8'");
//设计接口
$name = $_POST['username'];
$pwd = $_POST['pwd'];

$sql = "insert into user (name,pwd) values ('$name','$pwd')";
$res = mysql_query($sql);//插入语句，$res是布尔值

if($res){
    //插入成功
    echo json_encode(array(
        //code是自定义，这里定义1是成功，0是失败
        "code" => 1,
        "msg"  => "注册成功"
    ));
} else {
    echo json_encode(array(
        "code" => 0,
        "msg"  => "网络错误，请重试"
    ));    
}



?>