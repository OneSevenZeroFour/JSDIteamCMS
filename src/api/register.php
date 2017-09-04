<?php
    //接收传来的数据
    $username=isset($_GET['username'])?$_GET['username']:"";
    //用户输入后验证
    $username1=isset($_GET['username1'])?$_GET['username1']:"";
    $password=isset($_GET['password'])?$_GET['password']:"";

    //密码加密
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
    if($username!=''){
        //最开始没有数据则直接录入
        //有数据就先判断再录入
        if(count($row)==0){
            $sql = "INSERT INTO `userlist` (name,password)
            values('$username','$jmpassword')";
            if($conn->query($sql) === true){
                echo "yes";
            }else{
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        }else{
            $sql = 'select name from userlist';
            $conn->set_charset('utf8');
            $result = $conn->query($sql);
            $row = $result->fetch_all(MYSQLI_ASSOC);
            for($i=0;$i<count($row);$i++){
                if($row[$i]['name']===$username){
                    echo "no";
                    break;
                }
            }
            if($i==count($row)){
                $sql = "INSERT INTO `userlist` (name,password)
                values('$username','$jmpassword')";
                if($conn->query($sql) === true){
                    echo "yes";
                }else{
                    echo "Error: " . $sql . "<br>" . $conn->error;
                }
            }
        }
    }
    if($username1!=''){
        if(count($row)==0){
            echo "yes";
        }else{
            $sql = 'select name from userlist';
            $conn->set_charset('utf8');
            $result = $conn->query($sql);
            $row = $result->fetch_all(MYSQLI_ASSOC);
            for($i=0;$i<count($row);$i++){
                if($row[$i]['name']===$username1){
                    echo "no";
                    break;
                }
            }
            if($i==count($row)){
                echo "yes";
            }
        }
    }    
?>