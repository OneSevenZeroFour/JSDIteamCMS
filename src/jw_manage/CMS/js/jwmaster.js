/* 
* @Author: Marte
* @Date:   2017-09-20 12:09:12
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-21 18:52:44
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

app.listen("2222")
console.log("开启服务器成功")