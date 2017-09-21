//引入
var ioFunc = require("socket.io");
// var sql = require("mysql");

var http = require("http");
//创建一个服务器
var server = require('http').createServer(); 
var io = ioFunc(server);

var user = [];
//连接
io.on('connection',function(socket){

	socket.on('name',function(data){
		
		user.push({
			name:data,
			id:socket.id,
		});

		user.forEach(function(item){
			if(item.name == '346692921@qq.com'){
				io.sockets.sockets[item.id].emit('id',user);
			}
		})
	})
	//接收
	socket.on('receive',function(data){
	

		if(data.name == '346692921@qq.com'){
			io.sockets.sockets[data.id].emit('send',{
				name:data.name,
				value:data.value,
			});
		}else{
			//发送
			io.emit('send',{
				name:data.name,
				id:socket.id,
				value:data.value,
			});
		}
		
	})
	
});

server.listen(1111);
