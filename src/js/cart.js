require(['config'],function(){   
    require(['jquery'],function(){
        //加载公共头部和尾部html
        $('#header').load('/html/header.html');
        $('#footer').load('/html/footer.html');
        $('.clearqd').hide();
        require(['common','base'],function(com){
            //nav导航
            $('.navList>li').hover(function(){
                var idx=$(this).index();
                $('.menu_link').removeClass('active').eq(idx).addClass('active');
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
            // tab标签点击切换
            $('.tabdiv').eq(0).show().siblings('.tabdiv').hide();
            $('.tab li').eq(0).addClass('selected');
            $('.tab li').click(function(){
                var idx = $(this).index();
                $(this).addClass('selected').siblings('li').removeClass('selected');
                $('.tabdiv').eq(idx).show().siblings('.tabdiv').hide();
            })

            

            
            // 绑定事件
            // 全选按钮选择
            $('.allcheck').click(function(){
                if($(this).hasClass('selected')){
                    $('.checkbtn').removeClass('selected');
                    $('.cartfoot div:nth-child(2) span').text('0');
                    $('.cartfoot div:last-child span').text('0.00');
                    $('.cartfoot div:nth-child(4)').removeClass('selected');
                }else{
                    $('.checkbtn').addClass('selected');
                    $('.cartfoot div:nth-child(2) span').text($('.checkbtn').length-2);
                    $('.cartfoot div:last-child span').text($('.headNav .carList .cartotal').text());
                    $('.cartfoot div:nth-child(4)').addClass('selected');
                }
            })
            
            $('.cartfoot div:nth-child(3) span').click(function(){
                if($('.allcheck').hasClass('selected')){
                    $('.clearqd').show().css({width:$(document).width(),height:$(document).height(),'background-color':'rgba(0,0,0,.1)'});
                    $('.clearqdbox').css({opacity:1});

                }
            })
            $('.clearqd .closeclear').click(function(){
                $('.clearqd').hide();
            })
            $('.clearqd .noclear').click(function(){
                $('.clearqd').hide();
            })
            $(window).scroll(function(){
                if($(document).scrollTop()>=600){
                    footscroll();
                    $('.headNav').addClass('fixTop');
                    $('.headLogo').css({'margin-bottom':'42px'});
                }else if($(document).scrollTop()>=200&&$(document).scrollTop()<750){
                    $('.headNav').addClass('fixTop');
                    $('.headLogo').css({'margin-bottom':'42px'});
                }else{
                    $('.headNav').removeClass('fixTop');
                    $('.headLogo').css({'margin-bottom':'0'});
                }
            })
            function footscroll(){
                $(window).scroll(function(){
                if($(document).scrollTop()>=600){
                    $('.cartfoot').removeClass('fixfoot');
                    $('.headNav').addClass('fixTop');
                    $('.headLogo').css({'margin-bottom':'42px'});
                    $('#footer').css({'margin-top':'0'});
                }else if($(document).scrollTop()>=200&&$(document).scrollTop()<750){
                    $('.cartfoot').addClass('fixfoot');
                    $('#footer').css({'margin-top':'98px'});
                    $('.headNav').addClass('fixTop');
                    $('.headLogo').css({'margin-bottom':'42px'});
                }else{
                    $('.cartfoot').addClass('fixfoot');
                    $('#footer').css({'margin-top':'98px'});
                    $('.headNav').removeClass('fixTop');
                    $('.headLogo').css({'margin-bottom':'0'});
                }
            })
            }
        })
    })
})