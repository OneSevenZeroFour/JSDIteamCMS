require(['config'],function(){
    require(['jquery'],function(){
        //加载公共头部和尾部html
        $('#header').load('header.html');
        $('#footer').load('footer.html');
        require(['base'],function(){
            var $choice = $('#mains .choice');
            
            $choice.hide();
            //获取链入参数确定是通过哪种类型的商品访问
            var type = location.search.slice(1).split('=')[1];
            var obj1={women:1,men:2,beauty:3,house:4,baby:5,outsea:6};
            var obj2={women:'女士',men:'男士',beauty:'美妆',house:'家居',baby:'婴童',outsea:'海外'};
            var obj3={women:'SERGIO ROSSI',men:'VERSACE COLLECTION & VERSACE',beauty:'LOUIS VUITTON',house:'MASADA & HARIO',baby:'ORANGE TOYS',outsea:'MOROCCAOIL & LEONOR GREYL'};
            //nav导航
            if(type!=''){
                var normalidx = obj1[type];
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
            }
            // 内容头部导航按钮路径及内容设置
            var linktext = obj2[type];
            var linkval = '/html/'+type+'.html';
            $('.mainTop .typelink').text(linktext).attr('href',linkval);
            var textval = obj3[type];
            $('.typetext').text(textval);
            var titletext = textval+'   '+linktext+'全场狂欢，最低折扣持续刷新，最低';
            $('#mains h2 .title').text(titletext);

            $('.postage').height($('.postagelist').outerHeight());
            //倒计时设置
            //指定结束时间，精确到秒
            var endTime = '2017/9/16 12:00:00';
            var end = Date.parse(endTime);

            // 2）每隔一秒拿当前时间和结束时间进行比较，计算差值
            var timer = setInterval(function(){
                var now = Date.now();

                // 计算差值
                var offset = Math.floor((end - now)/1000);

                // 到达指定时间后
                // * 停止定时器
                // * 隐藏倒计时
                if(offset <= 0){
                    clearInterval(timer);
                    $('.top_right').hide();
                }

                // 转成倒计时格式
                var secLeft = offset%60;
                var minLeft = Math.floor(offset/60)%60;
                var hourLeft = Math.floor(offset/60/24)%60;
                var dayLeft = Math.floor(offset/60/60/24);

                var timetext = dayLeft+'天'+hourLeft+'时'+minLeft+'分'+secLeft+'秒';
                $('.top_right .lastTime').text(timetext);
            },1000);
            // 种类选择
            // 选择后生成li显示到上面
            var $typeli = $('.selectlist ul li');
            $typeli.click(function(){
                if($(this).hasClass('selected')){
                    return;
                }
                $choice.show();
                $(this).addClass('selected');
                var lispan = $('<span/>').text($(this).text());
                var libtn = $('<span/>').html("&times").addClass('btn');
                var $topli = $('<li/>').text('种类 :').append(lispan).append(libtn);
                $topli.data('parent',this);                
                var $toul = $('#mains .choice .choicelist');              
                $toul.append($topli);
                $choice.height($toul.height()); 
                //上面已选择的点击删除  
                var $choiceli = $('#mains .choice ul li');             
                $choiceli.click(function(){
                    $($(this).data('parent')).removeClass('selected');
                    $(this).remove();
                    if($('#mains .choice ul li').length==0){
                        $choice.hide();
                    }             
                })
                $('#mains .choice .clearall').click(function(){
                    $typeli.removeClass('selected');
                    $('#mains .choice ul li').remove();
                    $choice.hide();
                })      
            })
            
            // 排序栏
            $('.defaultSort').click(function(){
                $(this).addClass('selected');
                $('.priceSort').removeClass('selected up down');
            })
            $('.priceSort').click(function(){
                $('.defaultSort').removeClass('selected');
                if($(this).hasClass('up')){
                    $(this).removeClass('up').addClass('down');
                }else if($(this).hasClass('down')){
                    $(this).removeClass('down').addClass('up');
                }else{
                    $(this).addClass('up');
                }
            })
            //商品信息初始化
            var $onlyqty = $('#mains .goodslist li .onlyqty');
            $onlyqty.hide();
            var $contentcover = $('#mains .goodslist li .contentcover');
            $contentcover.hide();
            //尺码
            var $sizeSpan = $('#mains .goodslist li .top span');
            $sizeSpan.hover(function(){
                var margettop = $(this).position().top+$(this).outerHeight()+5;
                var margetleft = $(this).position().left-$(this).outerWidth()/2-40;
                $contentcover.show().css({left:margetleft,top:margettop}).find('.size').text($(this).text());
            },function(){
                $contentcover.hide();
            })
            //小图hover显示在主图
            var $mainImg = $('#mains .goodslist li .mainImg');
            var $mainImgsrc = $mainImg.attr('src');
            var $imglist = $('#mains .goodslist li .imgslist img');
            $imglist.hover(function(){
                $mainImg.attr('src',$(this).attr('src'));
            })
            var $showimgs = $('#mains .goodslist li .showimgs');
            $showimgs.hide();
            //商品hover效果
            var $goodslistli = $('#mains .goodslist li');
            $goodslistli.on('mouseenter','.mainImg',function(){
                $showimgs.show();
            }).on('mouseleave',function(){
                $showimgs.hide();
                $mainImg.attr('src',$mainImgsrc);
            })
            

        })
    })
})