<?php
    //接收传来的数据
    $username=isset($_GET['username'])?$_GET['username']:"";
    $password=isset($_GET['password'])?$_GET['password']:"";

    $jmpassword = md5($password);

    $conn = new mysqli('localhost','root','','user');
    // 检测连接
    if ($conn->connect_error) {
        die("连接失败: " . $conn->connect_error);
    }
    $sql = 'select * from userlist';
    $conn->set_charset('utf8');
    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);

    if(count($row)==0){
        echo "no";
    }else{
        for($i=0;$i<count($row);$i++){
            if($row[$i]['name']==$username&&$row[$i]['password']==$jmpassword){
                echo "yes";
                break;
            }
        }
        if($i==count($row)){
            echo "no";
        }
    }
?>