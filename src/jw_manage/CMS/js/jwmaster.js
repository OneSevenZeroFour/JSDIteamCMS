/* 
* @Author: Marte
* @Date:   2017-09-20 12:09:12
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-20 22:18:42
*/

var express=require("express");

var app=express();

var mysql=require("mysql");
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
}));


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'goods'
});
connection.connect();
// 查询数据库中所有商品   
app.post("/select",function(req,res){
    res.append("Access-Control-Allow-Origin", "*")
    var sql;
    console.log(req.body)
    var pageNo=req.body.pageNo;
    var qty=req.body.qty;
    var type=req.body.type;
    console.log(type)
    connection.query('SELECT * FROM goodslist ', function(error, results, fields) {
        if(error) throw error;
            console.log(results.length)
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
 // 查询种类
app.post("/selecttype",function(req,res){
    console.log(req.body)
    res.append("Access-Control-Allow-Origin", "*")
    connection.query('select distinct type from goodslist ', function(error, results, fields) {
        if(error) throw error;
            console.log(results.length)
            var total=results.length;
            res.send(JSON.stringify({
                results
            }))
    });
})

app.post("/select_type",function(req,res){
    res.append("Access-Control-Allow-Origin", "*")
    var pageNo=req.body.pageNo;
    var qty=req.body.qty;
    var type=req.body.type;
    connection.query(`SELECT * FROM goodslist where type='${type}'`, function(error, results, fields) {
        if(error) throw error;
            console.log(results.length)
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
app.listen("2222")
console.log("开启服务器成功")