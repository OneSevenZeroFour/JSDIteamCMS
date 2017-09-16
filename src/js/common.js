require.config({
    urlArgs:'v='+Math.random()*10000,
    paths:{
        'jquery':'../lib/jquery-3.2.1'
    }
})
define(['jquery'],function(){
    return {
        randomNumber:function(min,max){
            return parseInt(Math.random()*(max-min+1))+min;
        },
        randomColor:function(){

            // 利用封装好的函数
            var r = this.randomNumber(0,255);
            var g = this.randomNumber(0,255);
            var b = this.randomNumber(0,255);


            var res = 'rgb(' + r + ',' + g + ',' + b + ')';

            return res;
        },
        vCode:function(){
            var arr_char = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

            var res = '';
            for(var i=0;i<4;i++){
                // 获取随机索引值
                var idx = parseInt(Math.random()*arr_char.length);

                // 根据索引值获取字符，并拼接
                res += arr_char[idx];
            }

            return res;
        },
        Cookie:{
            /**
             * [设置cookie]
             * @param {String} name    [cookie名]
             * @param {String} val     [cookie值]
             * @param {[Date]} expires [有效期]
             * @param {[String]} path    [cookie路径]
             */
            set:function(name,val,expires,path){
                // document.cookie = 'cartlist=1234;expires=' + now
                var cookieStr = name + '=' + val;

                // 有效期
                if(expires){
                    cookieStr += ';expires=' + expires.toUTCString();
                }

                // 设置路径
                if(path){
                    cookieStr += ';path=' + path;
                }

                // 写入
                document.cookie = cookieStr;
            },
            get:function(name){
                // 先获取所有cookie
                var cookie = document.cookie;
                if(cookie.length === 0){
                    return '';
                }

                // 拆分成数组
                cookie = cookie.split('; ');

                // 遍历cookie，找到想要的cookie值
                var res = '';
                cookie.forEach(function(item){
                    var arr = item.split('=');

                    if(arr[0] === name){
                        res = arr[1];
                    }
                });

                return  res;
            },
            remove:function(name){
                // 利用设置过期时间达到删除的效果。
                var now = new Date();
                now.setDate(now.getDate()-100);

                // document.cookie = name +'=xxx;expires=' + now.toUTCString();
                this.set(name,null,now,'/');
            }
        }  
    }
})