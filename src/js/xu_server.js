

var express =require("express");
var multer = require("multer");
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
})); 


app.use(express.static('html'));
// var imgurl ='';
// 引入模块和插件
var peizi = multer.diskStorage({
// 配置上传文件存放的信息
    destination:function(req, file, cb) {
        cb(null, './mulu')
    },
    // 设置上传文件存放的目录
    filename:function(req,file,cb){
        var houzui  = file.originalname.split('.');
        cb(null,file.fieldname+'-'+Date.now()+'.'+houzui[houzui.length-1])
        // imgurl+=file.fieldname+'-'+Date.now()+'.'+houzui[houzui.length-1];
    }
    // 拼接文件名和文件后缀名，因为可能有几个.，所以区最后一个点后面的,加上时间,保证不会重名
})

//往multer去配置这个存放文件的信息
var upload =multer({
    storage:peizi
})

// 数据库
var mysql = require('mysql');

//配置连接的参数
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'goods'
});
//执行连接
connection.connect();

app.post('/chuan',upload.any(),function(req,res,next){
    res.append("Access-Control-Allow-Origin","*");
    // console.log(req.files[0].filename);
    connection.query(`insert into userlist (imgurl) values ("${req.files[0].filename}")`, function(error, results, fields) {
        // res.append("Access-Control-Allow-Origin","*")
        console.log('The solution is: ', results); 
    });
    res.send(req.files[0].filename);
})


app.get('/getAccount', function(req, res) {
    //用fs读写文件，实现爬虫，实现读写数据库，api接口等
    //获取post请求的参数 监听req的流
    // res.append("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Origin", "*");
    // console.log(req.query);
    
connection.query(`update userlist set nicheng='${req.query.nicheng}',xingbie='${req.query.xingbie}',imgurl='${req.query.imgurl}' where name='${req.query.username}'`, function(error, results, fields) {
        // res.append("Access-Control-Allow-Origin","*")
        // if(error) throw error;
        // console.log('The solution is: ', results);
        // res.send(JSON.stringify({
        //     results
        // }));
        res.send();
    });
    
})

app.post('/dizhi', function(req, res) {
    //用fs读写文件，实现爬虫，实现读写数据库，api接口等
    //获取post请求的参数 监听req的流
    // res.append("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    
connection.query(`update userlist set user='${req.body.user}',phone='${req.body.phone}',dizhi='${req.body.dizhi}',youbian='${req.body.youbian}' where name='${req.body.username}'`, function(error, results, fields) {
        // res.append("Access-Control-Allow-Origin","*")
        // if(error) throw error;
        // console.log('The solution is: ', results);
        // res.send(JSON.stringify({
        //     results
        // }));
        res.send();
    });
    
})

app.get('/get',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    // console.log(req.query)
    connection.query(`SELECT * FROM userlist where name='${req.query.username}'`, function(error, results, fields) {
                    if(error) throw error;
                    // console.log('The solution is: ', results);
                    res.end(JSON.stringify({
                        status: 1,
                        results
                    }))
                    // 输出结果到前台
                });
})

app.post("/adds", function(req, res) {
    //用fs读写文件，实现爬虫，实现读写数据库，api接口等
    //获取post请求的参数 监听req的流
    res.setHeader("Access-Control-Allow-Origin", "*");
    // console.log(req.body);
    connection.query(`update userlist set province='${req.body.province}',city='${req.body.city}',district='${req.body.district}' where name='${req.body.username}'`, function(error, results, fields) {
                    res.send()
                });

    
})
app.listen(12345);

console.log('服务器开启成功');



// var express = require("express");
// var multer = require("multer")
// //配置上传文件存放的信息
// var storage = multer.diskStorage({
//     //设置上传文件存放的目录
//     destination: function(req, file, cb) {
//         cb(null, './uploads')
//     },
//     //设置上传后文件的名字
//     filename: function(req, file, cb) {
//         //拼接文件名和文件后缀
//         var fileFormat = file.originalname.split(".");
//         cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1])
//     }
// })
// //往multer去配置这个存放文件的信息
// var upload = multer({
//     storage: storage
// })

// //初始化第一个express应用程序
// var app = express();
// //获取前端发送的get请求，并响应结果
// app.get("/select", function(req, res) {
//     res.send("hello")
// })

// //单文件上传
// app.post('/profile', upload.any(), function(req, res, next) {
//     // req.file is the `avatar` file 
//     // req.body will hold the text fields, if there were any 
// })

// //监听端口，并打开服务器
// app.listen(12345);
// console.log("开启服务器")