<?php
    //接收传来的数据
    $type=isset($_GET['type'])?$_GET['type']:"women";

    $sortIn=isset($_GET['sortIn'])?$_GET['sortIn']:"default";
    $pageNo=isset($_GET['pageNo'])?$_GET['pageNo']: 1;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 16;

    $conn = new mysqli('localhost','root','','goods');
    // 检测连接
    if ($conn->connect_error) {
        die("连接失败: " . $conn->connect_error);
    }
    $sql = "select * from goodslist where type='$type'";
    $startIdx = $qty*($pageNo-1);
    if($sortIn=='default'){       
        $sql .= " limit $startIdx,$qty";        
    }else if($sortIn=='up'){
        $sql.="order by sale ASC limit $startIdx,$qty";
    }else if($sortIn=='down'){
        $sql.="order by sale DESC limit $startIdx,$qty";
    }

    $conn->set_charset('utf8');
    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);

    //转换数据
    $res=array(
        'pageNo'=>$pageNo,
        'qty'=>$qty,
        'total'=>$conn->query("select count(*) from goodslist where type='$type'")->fetch_row()[0],
        'data'=>$row,
        'status'=>200,
        'msg'=>'success',
        'lowzk'=>$conn->query("select min(rabate) from goodslist where type='$type'")->fetch_row()[0],
        'sort'=>$sortIn
        );

    //把结果输出到前台（得到json字符串）
    echo json_encode($res,JSON_UNESCAPED_UNICODE);

    $conn->close(); 
    
?>