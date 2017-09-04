require(['config'],function(){
    require(['jquery'],function(){
        // 品牌活动列表图片hover事件
        var $imgs = $('#main ul.clearfixed li .imgBox');
        $imgs.hover(function(){
            $(this).find('img').stop().animate({width:'340px',height:'212px',left:'-10px',top:'-10px'},700);
            $(this).find('.shade').stop().show();
        },function(){
            $(this).find('img').stop().animate({width:'320px',height:'192px',left:0,top:0},700);
            $(this).find('.shade').stop().hide();
        })
        //底部每日活动更新
        //获取当前星期几
        //创建tab标签页，根据当前时间决定写入顺序
        function weekinput(){
            var weeks=['周日','周一','周二','周三','周四','周五','周六'];
            var now = new Date();
            var week = now.getDay();
            var idx = week+2;
            for(var i=0;i<5;i++){
                if(idx>6){
                    idx = week-5;
                }
                $('.weeklist').append($('<span/>').text(weeks[idx]));
                idx++;
            }
        }
        weekinput();
        //每日活动显示根据星期几决定显示哪一天的活动板块
        //星期tab点击切换事件
        //避免出现加在过程中div消失会造成父元素没有高度，决定显示那一天的活动板块之后把高度给到父级盒子，避免出现样式问题
        function weektab(){
            var now = new Date();
            var week = now.getDay();
            //星期运算，根据不同情况决定计算公式
            var idx = (week+1)>6?(week+1-7):(week+1); 
            $('.weekevent').eq(idx).show().siblings('.weekevent').hide();
            $('.weekevents').height($('.weekevent').eq(idx).height());
            $('.weeklist span').click(function(){
                var idx = $(this).index();
                //星期运算，根据不同情况决定计算公式
                var eventidx = (idx+1+week)>6?(idx+1+week-7):(idx+1+week);
                $('.weekevent').eq(eventidx).show().siblings('.weekevent').hide();
                var left = idx*90 + 'px';
                $('.borderline').css({left:left});
                $('.weekevents').height($('.weekevent').eq(eventidx).height());
            })
        }
        weektab();
        //每日活动hover事件
        //遮罩出现与消失
        $('.weekevents li').hover(function(){
            $(this).find('.eventcover').stop().fadeIn('slow');
        },function(){
            $(this).find('.eventcover').stop().fadeOut('slow');
        })
    })
})