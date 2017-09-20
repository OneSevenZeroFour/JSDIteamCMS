//引入
var ioFunc = require("socket.io");
var sql = require("mysql");

var http = require("http");
//创建一个服务器
var server = require('http').createServer(); 
var io = ioFunc(server);

//连接
io.on('connection',function(socket){

	//接收
	socket.on('receive',function(data){
		console.log(data)

		//发送
		io.emit('send',data);
	})
	
});

server.listen(1111);
