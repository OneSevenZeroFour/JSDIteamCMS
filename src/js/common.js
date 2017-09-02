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
            var arr_char = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');

            var res = '';
            for(var i=0;i<4;i++){
                // 获取随机索引值
                var idx = parseInt(Math.random()*arr_char.length);

                // 根据索引值获取字符，并拼接
                res += arr_char[idx];
            }

            return res;
        }    
    }
})