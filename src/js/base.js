require(['config'],function(){
    require(['jqurey'],function(){
        //头部手机版二维码
        $('.top_right span').eq(1).hover(function(){
            $('.topCode').stop().fadeIn('slow');
        },function(){
            $('.topCode').stop().fadeOut('slow');        
        })
        //nav导航
        $('.navList>li').hover(function(){
            var idx=$(this).index();
            if(idx==0){
                return;
            }else{
                $('.menu_link').removeClass('active').eq(idx-1).addClass('active');
                $('.navmenu').hide().eq(idx-1).show();
            }           
        },function(){
            var idx=$(this).index();
            if(idx==0){
                return;
            }else{
                $('.menu_link').eq(idx-1).removeClass('active');
                $('.navmenu').eq(idx-1).stop().hide();             
            }    
        })
        $(window).scroll(function(){
            if($(document).scrollTop()>=200){
                $('.headNav').addClass('fixTop');
                $('.headLogo').css({'margin-bottom':'42px'});
            }else{
                $('.headNav').removeClass('fixTop');
                $('.headLogo').css({'margin-bottom':'0'});
            }
        })
    })
})