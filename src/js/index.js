require(['config'],function(){
    require(['jqurey'],function(){
        //加载公共头部html
        $('#header').load('html/header.html');
        $('#footer').load('html/footer.html');
        //底部活动更新
        //tab标签星期根据实时时间获取
        //获取当前星期几
        function weekinput(){
            var weeks=['周日','周一','周二','周三','周四','周五','周六'];
            var now = new Date();
            var week = now.getDay();
            var idx = week+2;
            for(var i=0;i<4;i++){
                if(idx>6){
                    idx = week-5;
                }
                $('.weeklist').append($('<span/>').text(weeks[idx]));
                idx++;
            }
        }
        weekinput();
        //每日活动显示根据星期几决定显示哪一个活动板块
        //星期tab点击切换事件
        function weektab(){
            var now = new Date();
            var week = now.getDay();
            $('.weekevent').eq(week+1).show().siblings('.weekevent').hide();
            $('.weekevents').height($('.weekevent').eq(week+1).height());
            $('.weeklist span').click(function(){
                var idx = $(this).index();
                var eventidx = (idx+1+week)>6?(idx+1+week-7):(idx+1+week);
                $('.weekevent').eq(eventidx).show().siblings('.weekevent').hide();
                var left = idx*90 + 'px';
                $('.borderline').css({left:left});
                $('.weekevents').height($('.weekevent').eq(eventidx).height());
            })

        }
        weektab();
        //每日活动hover事件
        $('.weekevents li').hover(function(){
            $(this).find('.eventcover').stop().fadeIn('slow');
        },function(){
            $(this).find('.eventcover').stop().fadeOut('slow');
        })
        require(['common','base'],function(com){
            //获取当前时间大图轮换
            var now = new Date();
            var day = now.getDate();
            if(day%2===0){
                $('#banner').find('img').attr('src',"img/20170830114615621.jpg");
            }else{
                $('#banner').find('img').attr('src',"img/20170831145033772.jpg");
            }

            var $imgs = $('#mains ul.clearfixed li .imgBox');
            $imgs.hover(function(){
                $(this).find('img').stop().animate({width:'340px',height:'212px',left:'-10px',top:'-10px'},700);
                $(this).find('.shade').stop().show();
            },function(){
                $(this).find('img').stop().animate({width:'320px',height:'192px',left:0,top:0},700);
                $(this).find('.shade').stop().hide();
            })
            //轮播图
            function carousel(){
                var idx=0;
                var timer;
                $('.crsImg').eq(idx).show().siblings('.crsImg').hide();
                $('.pagebtn').eq(idx).addClass('active').siblings('.pagebtn').removeClass('active');
                function autoplay(){
                    timer=setInterval(function(){
                        idx++;
                        showPic();                   
                    },3000);
                }
                autoplay();
                function showPic(){
                    if(idx>=$('.crsImg').length){
                        idx=0;
                    }else if(idx<0){
                        idx=$('.crsImg').length-1;
                    }
                    $('.crsImg').stop().eq(idx).fadeIn('slow').siblings('.crsImg').fadeOut('slow');
                    $('.pagebtn').stop().eq(idx).addClass('active').siblings('.pagebtn').removeClass('active');
                }
                $('.carousel').mouseenter(function(){
                    clearInterval(timer);
                    $('.crsbtn').show();
                })
                $('.carousel').mouseleave(function(){
                    autoplay();
                    $('.crsbtn').hide();
                })
                //左右按钮切换
                $('.crsbtn').click(function(){
                    if($(this).hasClass('prev')){
                        idx--;
                        showPic();
                    }else if($(this).hasClass('next')){
                        idx++;
                        showPic();
                    }
                })
                //页码移入移出
                $('.pagebtn').hover(function(){
                    idx=$(this).index();
                    showPic();
                })
            }
            carousel();
            $(window).scroll(function(){
                if($(document).scrollTop()<200){
                    var marget = 470-$(document).scrollTop()*1.5;
                    $('#mains').css({top:marget,'margin-bottom':marget});
                    $('.headNav').removeClass('fixTop');
                    $('.headLogo').css({'margin-bottom':'0'});
                }else if($(document).scrollTop()>=200){
                    $('.headNav').addClass('fixTop');
                    $('.headLogo').css({'margin-bottom':'42px'});
                    $('#mains').css({top:'170px','margin-bottom':'170px'});
                }
            })
        })

    })
})
