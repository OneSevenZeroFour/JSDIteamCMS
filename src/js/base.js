require(['config'],function(){
    require(['common','jquery'],function(com){
        //头部手机版二维码
        $('.top_right span').eq(1).hover(function(){
            $('.topCode').stop().fadeIn('slow');
        },function(){
            $('.topCode').stop().fadeOut('slow');        
        })
        //头部默认读取cookie并验证
        var nameIn = com.Cookie.get('prusername');
        //判断是否有写入的特定用户名
        if(nameIn==''){
            $('.top_left').show();
            $('.top_leftlogin').hide();
        }else if(nameIn!=''){
            $('.top_left').hide();
            $('.top_leftlogin').show();
            $('.ledgerlist').hide();
            $('.nameIn').text(nameIn);
            $('.top_leftlogin .ledger').hover(function(){
                $('.ledgerlist').show();
            },function(){
                $('.ledgerlist').hide();
            })
            $('.out a').click(function(){
                com.Cookie.remove('prusername');
                window.location.reload();
            })
        }
        $(window).scroll(function(){
            if($(document).scrollTop()>=200){
                $('.headNav').addClass('fixTop');
                $('.headLogo').css({'margin-bottom':'42px'});
            }else{
                $('.headNav').removeClass('fixTop');
                $('.headLogo').css({'margin-bottom':'0'});
            }
        })

        //头部登录注册点击记录当前页面
        //登录注册成功后跳回
        $('.headTop .top_left a').click(function(){
            // 当前页面路径
            var href = location.href;
            com.Cookie.set('hoshref',href,'','/');
            var typelink = location.search.slice(1).split('=')[1];
            com.Cookie.set('typelink',typelink,'','/');
        })

        //底部每个li图片位置
        var $spans = $('#footer ul li a span');
        var $links = $('#footer ul li');
        for(var i=0;i<$spans.length;i++){
            $spans.eq(i).css({'background-position':'-220px -'+i*40+'px'});
        }
        $links.hover(function(){
            var idx = $(this).index();
            $(this).find('span').css({'background-position':'-280px -'+idx*40+'px'});
        },function(){
            var idx = $(this).index();
            $(this).find('span').css({'background-position':'-220px -'+idx*40+'px'});
        })
        // 设置路径
        // nav导航栏路径设置
        // 女士
        $('.navList>li').eq(1).find('.navmenu div:first-child').find('a').attr('href','/html/women.html');
        $('.navList>li').eq(1).find('.navmenu div:last-child').find('a').attr('href','/html/goodslist.html?type=women');
        //男士
        $('.navList>li').eq(2).find('.navmenu div:first-child').find('a').attr('href','/html/men.html');
        $('.navList>li').eq(2).find('.navmenu div:last-child').find('a').attr('href','/html/goodslist.html?type=men');
        // 美妆
        $('.navList>li').eq(3).find('.navmenu div:first-child').find('a').attr('href','/html/beauty.html');
        $('.navList>li').eq(3).find('.navmenu div:last-child').find('a').attr('href','/html/goodslist.html?type=beauty');
        //家居
        $('.navList>li').eq(4).find('.navmenu div:first-child').find('a').attr('href','/html/house.html');
        $('.navList>li').eq(4).find('.navmenu div:last-child').find('a').attr('href','/html/goodslist.html?type=house');
        //婴童
        $('.navList>li').eq(5).find('.navmenu div:first-child').find('a').attr('href','/html/baby.html');
        $('.navList>li').eq(5).find('.navmenu div:last-child').find('a').attr('href','/html/goodslist.html?type=baby');
        //海外
        $('.navList>li').eq(6).find('.navmenu div:first-child').find('a').attr('href','/html/outsea.html');
        //列表页路径设置
        
    })
})