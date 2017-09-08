<?php
    //接收传来的数据
    $usename=isset($_GET['usename'])?$_GET['usename']:"346692921@qq.com";
    $carlistmsg=isset($_GET['carlistmsg'])?$_GET['carlistmsg']:"";


    $conn = new mysqli('localhost','root','','user');
    // 检测连接
    if ($conn->connect_error) {
        die("连接失败: " . $conn->connect_error);
    }
    if($carlistmsg==''){
        $sql = "select carlist from userlist where name='$usename'";

        $conn->set_charset('utf8');
        $result = $conn->query($sql);
        $row = $result->fetch_all(MYSQLI_ASSOC);

        $res = $row[0]['carlist'];
        echo $res;
    }else if($carlistmsg!=''&&$carlistmsg!='clear'){
        $sql = "update userlist set carlist='$carlistmsg' where name='$usename'";
        $result = $conn->query($sql);
    }if($carlistmsg=='clear'){
        $sql = "update userlist set carlist='' where name='$usename'";
        $result = $conn->query($sql);
    }

    //关闭连接
    $conn->close();
    
?>