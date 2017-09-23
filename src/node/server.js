var multer = require("multer");
var express = require('express');
var app = require('express')();
var server = require('http').createServer();
var socket = require("socket.io");
var io = socket(server);
var bodyParser = require('body-parser');
//引入mysql的第三方模块
var mysql = require('mysql');
var fs = require("fs");

var connection = mysql.createConnection({
    hostname:'localhost',
    user:'philly',
    password:'123456',
    database:'goods'
});
connection.connect();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); 

var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function(req, file, cb) {
        cb(null, '../img')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function(req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        //给图片加上时间戳格式防止重名名
        //比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
        var urlimg = file.fieldname + parseInt(Math.random()*100)+ Date.now() + "." + fileFormat[fileFormat.length - 1];
        cb(null,urlimg);        
    }
});
var upload = multer({
    storage: storage
});
app.post('/upload', upload.single('file'), function(req, res, next) {
    res.append("Access-Control-Allow-Origin","*");
    var url = 'http://localhost:10086/img/'+req.file.filename;
    res.send(url);
})
app.post('/crimg', upload.any(), function(req, res, next) {
    res.append("Access-Control-Allow-Origin","*");
    var url = 'http://localhost:10086/img/'+req.files[0].filename;
    res.send(url);
})
app.post('/getdetail',function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var id = req.body.id;
    var sqlyj = `select * from goodslist where goodid =${id}`;
    connection.query(sqlyj,function(error, results, fields){
        if(error) throw error;
        console.log('The solution is: ', results);
        res.send(JSON.stringify({
            status: 1,
            results
        }))
    })
})
app.post('/setgoods',function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var good = JSON.parse(req.body.good);
    var sqlyj = `update goodslist set goodtitle='${good.title}',price=${good.price},sale=${good.sale},inventory='${good.inventory}',color='${good.color}',size='${good.size}',imgurls=${good.imgqty},type='${good.type}',descrption='${good.descrption}',point='${good.point}' where goodid='${good['id']}'`;
    connection.query(sqlyj,function(error, results, fields){
        if(error) throw error;
        res.send(JSON.stringify({
            status: 1,
        }))
    })
    var imgurls = good.imgurls;
    var max = imgurls.length;
    imgurls.forEach(function(item,idx){
        var path1arr = item.split('/');
        var path1 = "../img/"+path1arr[path1arr.length-1];
        console.log(path1);
        
        var copysrc = '../img/copy'+ (idx+1) +'.jpg';
        fs.writeFileSync(copysrc, fs.readFileSync(path1)); 
    })
    for(var i=1;i<=max;i++){
        var path2 = "../img/"+good.id+'link('+i+').jpg';
        var copysrc = '../img/copy'+ i +'.jpg';
        fs.renameSync(copysrc,path2,function(err){  
            if(err){  
                console.error(err);  
                return;  
            } 
            console.log('重命名成功');
        });
    }        
})
app.post('/addgoods',function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    var good = JSON.parse(req.body.good);
    var sqlyj = `insert into goodslist (goodtitle,price,sale,inventory,color,size,imgurls,type,descrption,point,goodid) values('${good.title}',${good.price},${good.sale},'${good.inventory}','${good.color}','${good.size}',${good.imgqty},'${good.type}','${good.descrption}','${good.point}','${good['id']}')`;
    console.log(sqlyj);
    connection.query(sqlyj,function(error, results, fields){
        if(error) throw error;
        res.send(JSON.stringify({
            status: 1,
        }))
    })
    var imgurls = good.imgurls;
    imgurls.forEach(function(item,idx){
        var path1arr = item.split('/');
        var path1 = "../img/"+path1arr[path1arr.length-1];
        console.log(path1);
        var path2 = "../img/"+good.id+'link('+(idx+1)+').jpg';
        console.log(path2);
        fs.rename(path1,path2,function(err){  
            if(err){  
                console.error(err);  
                return;  
            }  
            console.log('重命名成功');  
        });
    })
})
// 查询数据库中所有商品  
app.post("/jw_select",function(req,res){
    res.append("Access-Control-Allow-Origin", "*")
    var sql;
    // console.log(req.body)
    var pageNo=req.body.pageNo;
    var qty=req.body.qty;
    var type=req.body.type;
    // console.log(type)
        // 判断传过来的分类来查询数据库
    if(type=="所有类别"){
        sql='SELECT * FROM goodslist ';
    }else{
        sql=`SELECT * FROM goodslist where type='${type}'`
    }
    connection.query(sql, function(error, results, fields) {
        if(error) throw error;
            // console.log(results.length)
            var total=results.length;
            var result=results.splice(qty*(pageNo-1),qty)
            // console.log(result)
            res.send(JSON.stringify({
                total:total,
                status: 1,
                result
            }))
    });
})
 // 查询种类
app.post("/jw_selecttype",function(req,res){
    // console.log(req.body)
    res.append("Access-Control-Allow-Origin", "*")
    connection.query('select distinct type from goodslist ', function(error, results, fields) {
        if(error) throw error;
            // console.log(results.length)
            var total=results.length;
            res.send(JSON.stringify({
                results
            }))
    });
})
    // 删除
app.post("/jw_delete",function(req,res){
    res.append("Access-Control-Allow-Origin", "*")
    var id=req.body.id*1;
    // console.log(id)
    connection.query(`delete FROM goodslist where id = '${id}'`, function(error, results, fields) {
                    if(error) throw error;
                    // console.log('The solution is: ', results);
                    res.send(JSON.stringify({
                        status: 1,
                        results
                    }))
                });
})
// 在某一条件下的满足下 查询数据库中所有商品
// SELECT * FROM goodslist where type="men" AND goodtitle like "%男士%" or goodid like "男士"
// 搜索框
app.post("/jw_search",function(req,res){
    res.append("Access-Control-Allow-Origin","*")
    console.log(req.body)
    var jw_sql_s;
    var search_val=req.body.search_val;
    var pageNo=req.body.pageNo;
    var qty=req.body.qty;
    var type=req.body.type; 
    if(search_val==""){
        return false
    }
    else if(type=="所有类别"){
        jw_sql_s=`SELECT * FROM goodslist  where goodid like "${search_val}" or id like "${search_val}" or goodtitle like "%${search_val}%" or size like "%${search_val}%" or color like "%${search_val}%"`;
    }else{
        jw_sql_s=`SELECT * FROM goodslist where type='${type}' and (goodid like "${search_val}" or id like "${search_val}" or goodtitle like "%${search_val}%" or size like "%${search_val}%" or color like "%${search_val}%")`;
    }
    console.log(type)
    connection.query(jw_sql_s, function(error, results, fields) {
        if(error) throw error;
            // console.log(results.length)
            var total=results.length;
            var result=results.splice(qty*(pageNo-1),qty)
            console.log(result)
            res.send(JSON.stringify({
                total:total,
                status: 1,
                result
            }))
        });
})


// 获取最大id值
app.post("/jw_id",function(req,res){
    res.append("Access-Control-Allow-Origin", "*")
    connection.query(`select id from goodslist order by id DESC limit 0,1`,function(erro,results,fields){
        console.log(results)
        res.send(results)
    })

})


// 徐啸的
// 
// 上传头像
app.post('/chuan',upload.any(),function(req,res,next){
    res.append("Access-Control-Allow-Origin","*");
    connection.query(`insert into userlist (imgurl) values ("${req.files[0].filename}")`, function(error, results, fields) {
 
    });
    res.send(req.files[0].filename);
})

// 修改用户个人信息
app.get('/getAccount', function(req, res) {
   
    res.setHeader("Access-Control-Allow-Origin", "*");
    
connection.query(`update userlist set nicheng='${req.query.nicheng}',xingbie='${req.query.xingbie}',imgurl='${req.query.imgurl}' where name='${req.query.username}'`, function(error, results, fields) {
       
        res.send();
    });
    
})


// 上传收货地址
app.post('/dizhi', function(req, res) {
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    
connection.query(`update userlist set user='${req.body.user}',phone='${req.body.phone}',dizhi='${req.body.dizhi}',youbian='${req.body.youbian}' where name='${req.body.username}'`, function(error, results, fields) {

        res.send();
    });
    
})


// 获取用户所有信息
app.get('/get',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    
    connection.query(`SELECT * FROM userlist where name='${req.query.username}'`, function(error, results, fields) {
                    if(error) throw error;
                    
                    res.end(JSON.stringify({
                        status: 1,
                        results
                    }))
                });
})

// 添加地理位置到数据库
app.post("/adds", function(req, res) {
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    // console.log(req.body);
    connection.query(`update userlist set province='${req.body.province}',city='${req.body.city}',district='${req.body.district}' where name='${req.body.username}'`, function(error, results, fields) {
                    res.send()
                });
})

server.listen(3001);
var user = [];
//连接
io.on('connection',function(socket){

    socket.on('name',function(data){
 
        for(var i=0;i<user.length;i++){
            if(user[i].name == data.name){
                user[i].id = socket.id;
                break;
            }
        }
        if(i==user.length){
            user.push({
                name:data.name,
                id:socket.id,
            });
        }
        user.forEach(function(item){
            if(item.name == 'admin'){
                if(item.id){
                    io.sockets.sockets[item.id].emit('id',{
                        name:data.name,
                        id:socket.id,
                        value:data.value,
                    });   
                }   
            }
            
        });

    })

    //接收
    socket.on('receive',function(data){
       
        if(data.name == 'admin'){
            io.sockets.sockets[data.id].emit('send',{
                name:data.name,
                value:data.value,
                time:data.time,

            });
        }else{
            //发送
            io.emit('send',{
                name:data.name,
                id:socket.id,
                value:data.value,
                time:data.time,

            });
        }
        
    })    
});


app.listen(12345);
console.log("开启服务器")