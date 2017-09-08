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

            var obj3={women:'SERGIO ROSSI',men:'VERSACE COLLECTION & VERSACE',beauty:'LOUIS VUITTON',house:'MASADA & HARIO',baby:'ORANGE TOYS',outsea:'MOROCCAOIL & LEONOR GREYL'};
            // 读取用户购物车并写入
            //头部默认读取cookie并验证
            var nameIn = com.Cookie.get('prusername');
            //判断是否有写入的特定用户名
            if(nameIn==''){
            }else if(nameIn!=''){
                cartlistgetmsg();
            }
            function cartlistgetmsg(){
                $.ajax({
                    url:'../api/carlist.php',
                    data:{usename:nameIn},
                    success:function(res1){
                        if(res1==''||res1==null){
                            $('.qingdan').html('您的购物车还没有商品，快去选购吧！');
                            return;
                        }else{
                            $('.qingdan').html('');
                            var carlistarr = res1.split('-');
                            carlistarr.forEach(function(item){
                                var eachlist = item.split('/');
                                $.ajax({
                                    url:'../api/goodsdetail.php',
                                    data:{goodid:eachlist[0]},
                                    success:function(res){
                                        var resobj = JSON.parse(res);
                                        var gooddetail=resobj['data'][0];
                                        var mainImg = '/img/'+gooddetail['goodid']+'link(1).jpg';
                                        var imglinkto = '/html/goodsdetail.html?id='+gooddetail['goodid'];
                                        // 生成ul并写入购物车清单
                                        var $ul = $('<ul/>');
                                        $ul.addClass('sevenli').addClass('clearfixed');
                                        var $li1 = $('<li/>');
                                        $li1.append($('<i/>').addClass('checkbtn'));
                                        var $img = $('<a/>').attr('href',imglinkto).append($('<img/>').attr('src',mainImg));
                                        $li1.append($img);
                                        $ul.append($li1);
                                        var $li2 = $('<li/>');
                                        var $atext = obj3[gooddetail['type']];
                                        $li2.append($('<a/>').attr('href',imglinkto).text($atext));
                                        $li2.append($('<a/>').attr('href',imglinkto).text(gooddetail['goodtitle']));
                                        $li2.append($('<p/>').text('颜色:').append($('<span/>').text(gooddetail['color'])));
                                        $ul.append($li2);
                                        var $li3 = $('<li/>').text('￥'+gooddetail['sale']);
                                        $ul.append($li3);
                                        var $li4 = $('<li/>');
                                        if(eachlist[2]<=1){
                                            $li4.append($('<button/>').addClass('cartlesbtn').addClass('disuse').attr('disabled',true).text('-'));
                                        }else{
                                            $li4.append($('<button/>').addClass('cartlesbtn').text('-'));
                                        }                                       
                                        $li4.append($('<span/>').addClass('cartqty').text(eachlist[2]));
                                        if(eachlist[2]>=gooddetail['inventory']){
                                            $li4.append($('<button/>').addClass('cartaddbtn').addClass('disuse').attr('disabled',true).text('+'));
                                        }else{
                                            $li4.append($('<button/>').addClass('cartaddbtn').text('+'));
                                        }                                       
                                        $li4.append($('<span/>').addClass('warning'));
                                        $ul.append($li4);
                                        var youhui = Number(gooddetail['price'])-Number(gooddetail['sale']);
                                        var $li5 = $('<li/>').text('￥'+youhui*Number(eachlist[2]));
                                        $ul.append($li5);
                                        var $li6 = $('<li/>').text('￥'+Number(gooddetail['sale'])*Number(eachlist[2]));
                                        $ul.append($li6);
                                        var $li7 = $('<li/>');
                                        $li7.append($('<span/>').addClass('removecart').text('删除'));
                                        $ul.append($li7);
                                        $('.qingdan').append($ul);

                                        //绑定事件
                                        // $li1.find('.checkbtn')
                                        
                                    }
                                })
                            })
                        }                  
                    }
                })
            }
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
                    $('.closeclear').css({opacity:1});

                }
            })
            $('.clearqd .closeclear').click(function(){
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