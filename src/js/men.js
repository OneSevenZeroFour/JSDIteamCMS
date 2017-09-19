require(['config'],function(){   
    require(['jquery'],function(){
        //加载公共头部和尾部html
        $('#header').load('/html/header.html');
        $('#footer').load('/html/footer.html');
        $('.neweventlist').load('/html/public.html');
        require(['base','public'],function(){
            //nav导航
            var normalidx = 2;
            $('.menu_link').removeClass('active').eq(normalidx).addClass('active');
            $('.navList>li').eq(normalidx).siblings('li').hover(function(){
                var idx=$(this).index();
                $('.menu_link').removeClass('active').eq(idx).addClass('active');
                $('.menu_link').eq(normalidx).addClass('active');
                if(idx!=0){
                    $('.navmenu').hide().eq(idx-1).show();
                }                      
            },function(){
                var idx=$(this).index();
                $('.menu_link').eq(idx).removeClass('active');
                if(idx!=0){
                    $('.navmenu').eq(idx-1).stop().hide();
                }             
            })
            $('.navList>li').eq(normalidx).hover(function(){
                var idx=$(this).index();
                $('.menu_link').removeClass('active').eq(idx).addClass('active');
                if(idx!=0){
                    $('.navmenu').hide().eq(idx-1).show();
                } 
            },function(){
                var idx=$(this).index();
                if(idx!=0){
                    $('.navmenu').eq(idx-1).stop().hide();
                } 
            })
        })
    })
})