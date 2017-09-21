var multer = require("multer");
var express = require('express');
var app = require('express')();
var server = require('http').createServer(app);
var socket = require("socket.io");
var io = socket(server);
var bodyParser = require('body-parser');
//引入mysql的第三方模块
var mysql = require('mysql');

var connection = mysql.createConnection({
    hostname:'localhost',
    user:'philly',
    password:'123456',
    database:'goods'
});
connection.connect();

var app = express();

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
app.listen(12345);
console.log("开启服务器")