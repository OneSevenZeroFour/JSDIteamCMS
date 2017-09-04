require(['config'],function(){
    require(['jquery'],function(){
        //加载公共头部和尾部html
        $('#header').load('/html/header.html');
        $('#footer').load('/html/footer.html');

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
        //会优先加载公共Js，然后再加载当前js，要在加载公共JS之前优先导入公共的头部尾部html页面，以免加载完头部尾部没有动画效果
        require(['common','base'],function(com){
            //nav导航
            var normalidx = 0;
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
            //头部注册登录页面路径设置
            var $headlink = $('#header .headTop .top_left span a');
            $headlink.eq(0).attr('href','/html/user.html?type=register');
            $headlink.eq(1).attr('href','/html/user.html?type=login');
            //获取当前时间大图轮换
            var now = new Date();
            var idx = now.getDay();
            if(idx==0||idx==4){
                var linkurl = '/html/men.html';
            }else{
                var linkurl = '/html/women.html';
            }
            var bannerurl = 'img/banner'+idx+'.jpg';
            $('#banner').find('img').attr('src',bannerurl);
            $('.bannerLink').attr('href',linkurl);
            // 品牌活动列表图片hover事件
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
            //根据滚动事件，大图下方商品向上迎合移动
            //导航栏吸顶
            //右下侧二维码，二维码下方返回顶部按钮出现消失
            $(window).scroll(function(){
                if($(document).scrollTop()<200){
                    var marget = 480-$(document).scrollTop()*1.5;
                    $('#mains').css({top:marget,'margin-bottom':marget});
                    $('.headNav').removeClass('fixTop');
                    $('.headLogo').css({'margin-bottom':'0'});
                    $('.toTop').hide();
                    $('#returnTop').css({bottom:'80px'});
                }else if($(document).scrollTop()>=200){
                    $('.headNav').addClass('fixTop');
                    $('.headLogo').css({'margin-bottom':'42px'});
                    $('#mains').css({top:'170px','margin-bottom':'170px'});
                    $('.toTop').show();
                    $('#returnTop').css({bottom:'51px'});
                }
            })
            //返回顶部
            $('.toTop').click(function(){
                $('body,html').animate({scrollTop:0},1500);
            })
            //返回顶部过程中如果客户滑动滚轮取消body，html动画
            $(document).on('mousewheel',function(){
                $('body,html').stop(true,false);
            })
        })
        //给每一个类型活动图片绑定链接
        // 女士活动
        $('.womenlist ul li a').attr('href','/html/goodslist.html?type=women');
        $('.womenlist .Inlink a').attr('href','/html/women.html');
        $('.womenlist .lastlink a').attr('href','/html/women.html');
        //男士
        $('.menlist ul li a').attr('href','/html/goodslist.html?type=men');
        $('.menlist .Inlink a').attr('href','/html/men.html');
        $('.menlist .lastlink a').attr('href','/html/men.html');
        //美妆
        $('.beautylist ul li a').attr('href','/html/goodslist.html?type=beauty');
        $('.beautylist .Inlink a').attr('href','/html/beauty.html');
        $('.beautylist .lastlink a').attr('href','/html/beauty.html');
        //家居
        $('.houselist ul li a').attr('href','/html/goodslist.html?type=house');
        $('.houselist .Inlink a').attr('href','/html/house.html');
        $('.houselist .lastlink a').attr('href','/html/house.html');
        //婴童
        $('.babylist ul li a').attr('href','/html/goodslist.html?type=baby');
        $('.babylist .Inlink a').attr('href','/html/baby.html');
        $('.babylist .lastlink a').attr('href','/html/baby.html');
        //海外
        $('.oversealist ul li a').attr('href','/html/goodslist.html?type=outsea');
        $('.oversealist .lastlink a').attr('href','/html/outsea.html');
        
    })
})
