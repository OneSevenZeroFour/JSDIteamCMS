<?php
    //接收传来的数据
    $goodid=isset($_GET['goodid'])?$_GET['goodid']:"001";
    $id=intval($goodid)+1;
    $endid=$id+3;

    $conn = new mysqli('localhost','root','','goods');
    // 检测连接
    if ($conn->connect_error) {
        die("连接失败: " . $conn->connect_error);
    }
    $sql="select * from goodslist where goodid='$goodid'";

    $conn->set_charset('utf8');
    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);

    $sql1="select * from goodslist where id between '$id'and '$endid'";
    $result1 = $conn->query($sql1);
    $more = $result1->fetch_all(MYSQLI_ASSOC);

    $res=array(
        'data'=>$row,
        'more'=>$more,
        'status'=>200,
        'msg'=>'success'
    );
    
    // 把结果输出到前台（得到json字符串）
    echo json_encode($res,JSON_UNESCAPED_UNICODE);

    $conn->close();
?>