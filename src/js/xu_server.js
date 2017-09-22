

var express =require("express");
var multer = require("multer");
var app = express();
// 初始化第一个express应用程序
var bodyParser = require('body-parser')
// 引入bodyParser post请求才能获取数据

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
})); 


app.use(express.static('html'));
// 引入模块和插件

// 图片上传，图片存入
var peizi = multer.diskStorage({
// 配置上传文件存放的信息
    destination:function(req, file, cb) {
        cb(null, './mulu')
    },
    // 设置上传文件存放的目录
    filename:function(req,file,cb){
        var houzui  = file.originalname.split('.');
        cb(null,file.fieldname+'-'+Date.now()+'.'+houzui[houzui.length-1])
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
    connection.query(`insert into userlist (imgurl) values ("${req.files[0].filename}")`, function(error, results, fields) {
    });
    res.send(req.files[0].filename);
})


app.get('/getAccount', function(req, res) {
   
    res.setHeader("Access-Control-Allow-Origin", "*");
    
connection.query(`update userlist set nicheng='${req.query.nicheng}',xingbie='${req.query.xingbie}',imgurl='${req.query.imgurl}' where name='${req.query.username}'`, function(error, results, fields) {
       
        res.send();
    });
    
})

app.post('/dizhi', function(req, res) {
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    
connection.query(`update userlist set user='${req.body.user}',phone='${req.body.phone}',dizhi='${req.body.dizhi}',youbian='${req.body.youbian}' where name='${req.body.username}'`, function(error, results, fields) {

        res.send();
    });
    
})

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

app.post("/adds", function(req, res) {
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    // console.log(req.body);
    connection.query(`update userlist set province='${req.body.province}',city='${req.body.city}',district='${req.body.district}' where name='${req.body.username}'`, function(error, results, fields) {
                    res.send()
                });
})
app.listen(12345);

console.log('服务器开启成功');



