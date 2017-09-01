require(['config'],function(){
    require(['jqurey'],function(){
        //加载公共头部html
        $('#header').load('html/header.html');
        require(['common','base'],function(com){
            var $imgs = $('#mains ul.clearfixed li .imgBox');
            $imgs.hover(function(){
                $(this).find('img').stop().animate({width:'340px',height:'212px',left:'-10px',top:'-10px'},700);
                $(this).find('.shade').stop().show();
            },function(){
                $(this).find('img').stop().animate({width:'320px',height:'192px',left:0,top:0},700);
                $(this).find('.shade').stop().hide();
            })           
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
                $('#mains').css({top:marget});
                $('.headNav').removeClass('fixTop');
                $('.headLogo').css({'margin-bottom':'0'});
            }else if($(document).scrollTop()>=200){
                $('.headNav').addClass('fixTop');
                $('.headLogo').css({'margin-bottom':'42px'});
                $('#mains').css({top:'170px'});
            }
        })     
    })
})
