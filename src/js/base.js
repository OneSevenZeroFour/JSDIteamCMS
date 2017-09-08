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
            $('.carList .carqty').text('');
            $('.carList .cartotal').text('0');
            $('.listtable .covercarlist').css({'z-index':1000});
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
            getcarlistmsg();           
        }
        // 读取用户购物车并写入
        function getcarlistmsg(){
            $.ajax({
                url:'../api/carlist.php',
                data:{usename:nameIn},
                success:function(res1){
                    if(res1==''||res1==null){
                        $('.listtable .covercarlist').css({'z-index':1000,'opacity':1});
                        $('.carList .carqty').text('');
                        $('.carList .cartotal').text('0');
                        return;
                    }else{
                        $('.listtable .covercarlist').css({'z-index':-1000,'opacity':0});
                        $('.listtable ul').html('');
                        var carlistarr = res1.split('-');
                        $('.carList .carqty').text(carlistarr.length);
                        var $lis = carlistarr.length;
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
                                    // 生成li并写入购物车
                                    var $li = $('<li/>');
                                    var $imglink = $('<a/>').append($('<img/>').attr('src',mainImg));
                                    $imglink.attr('href',imglinkto).addClass('imglink');
                                    $li.append($imglink);
                                    var $liLeft = $('<div/>').addClass('liLeft');
                                    var $p1 = $('<p/>').append($('<a/>').text(gooddetail['goodtitle']).attr('href',imglinkto));
                                    $liLeft.append($p1);
                                    var $p2 = $('<p/>').text(eachlist[1]);
                                    $liLeft.append($p2);
                                    var $p3 = $('<p/>').append($('<span/>').text(eachlist[2]).addClass('listqty'));
                                    $p3.append($('<span/>').text('x'));
                                    $p3.append($('<span/>').text(gooddetail['sale']).addClass('listsale'));
                                    $liLeft.append($p3);
                                    $liLeft.append($('<span/>').text("删除").addClass('removebtn'));
                                    $li.append($liLeft);
                                    $('.listtable ul').append($li);
                                    var pricetopay = eachlist[2]*gooddetail['sale'];
                                    $li.data('total',pricetopay);
                                    $li.data('goodid',gooddetail['goodid']);
                                    $li.data('goodcolor',gooddetail['color']);
                                    if($('.listtable ul li').length == carlistarr.length){
                                        var totaltopay = 0;
                                        for(var i=0;i<carlistarr.length;i++){
                                            totaltopay+=Number($('.listtable ul li').eq(i).data('total'));
                                            if(i==carlistarr.length-1){
                                                $('.carlisttotal span').text(totaltopay);
                                                $('.carList .cartotal').text('￥'+totaltopay);
                                            }                                       
                                        }
                                        $('.listtable ul li .removebtn').click(function(){
                                            $(this).parents('li').remove();
                                            carlistless();
                                        })
                                    }
                                }
                            })
                        })
                    }                  
                }
            })
        }
        //只读取用户购物车,判断添加的商品是否有重复
        function onlyreadmsg(carlistmsg){
            $.ajax({
                url:'../api/carlist.php',
                data:{usename:nameIn},
                success:function(res){
                    if(res==''||res==null){
                        carlistchangeajax(carlistmsg);
                    }else{
                        var goodslist = res.split('-');
                        for(var i=0;i<goodslist.length;i++){
                            var into = carlistmsg.split('/');
                            console.log(into);                           
                            var oldto = goodslist[i].split('/');
                            console.log(oldto);
                            if(into[0]==oldto[0]&&into[1]==oldto[1]){
                                var thisgood = goodslist[i].split('/');
                                var qty=Number(res.split('-')[i].split('/')[2])+Number(carlistmsg.split('/')[2]);
                                thisgood[2]=qty;
                                goodslist[i]=thisgood.join('/');
                                var endcaelist = goodslist.join('-');                          break;
                            }
                        }
                        if(i==goodslist.length){
                            var endcaelist = res+'-'+carlistmsg;
                        }
                        carlistchangeajax(endcaelist);
                    }
                }
            })
            $('.carList .listtable').stop(true,true).fadeIn(1000);
        }
        //读取当前数据并实时更新
        //并拼成特殊数据发送后台处理
        //删除事件
        function carlistless(){
            if($('.listtable ul li').length==0){
                $('.listtable .covercarlist').css({'z-index':1000,'opacity':1});
                $('.carList .carqty').text('');
                $('.carList .cartotal').text('0');
                carlistchangeajax('clear');
            }else{
                $('.listtable .covercarlist').css({'z-index':-1000,'opacity':0});
                var totaltopay = 0;
                var carlistmsg = '';
                for(var i=0;i<$('.listtable ul li').length;i++){
                    var $li = $('.listtable ul li').eq(i);
                    var goodid = $li.data('goodid');
                    var goodsize = $li.find('.liLeft p:nth-child(2)').text();
                    var qty = $li.find('.liLeft p:nth-child(3) span:first-child').text();
                    var addmsg = goodid+'/'+goodsize+'/'+qty;
                    carlistmsg=carlistmsg+addmsg+'-';
                    totaltopay+=Number($('.listtable ul li').eq(i).data('total'));
                    if(i==$('.listtable ul li').length-1){
                        $('.carlisttotal span').text(totaltopay);
                        $('.carList .cartotal').text('￥'+totaltopay);
                        carlistchangeajax(carlistmsg.slice(0,-1));
                    }
                    $('.carList .carqty').text($('.listtable ul li').length);
                }

            }           
        }
        //添加事件
        function carlistadd(){
            //获取数据拼接成数据
            var goodid = location.search.slice(1).split('=')[1];
            if($('.sizebox .size span.selected').length==0&&$('.sizebox .size span').length!=0){
                $('.sizebox p:first-child span').text('请选择尺码');
                return;
            }else if($('.sizebox .size span').length==0){
                var size = '';
            }else{
                var size = $('.sizebox .size span.selected').text();
            }            
            var qty = $('.qtybox .qtychange span').text();
            var msg = goodid+'/'+size+'/'+qty;
            console.log(msg);
            onlyreadmsg(msg);
        }
        if($('.tocarlist').length==1){
            $('.tocarlist').click(function(){
                var nameIn = com.Cookie.get('prusername');
                if(nameIn==''){
                    // 当前页面路径
                    var href = location.href;
                    com.Cookie.set('hoshref',href,'','/');
                    var typelink = location.search.slice(1).split('=')[1];
                    com.Cookie.set('typelink',typelink,'','/');
                    window.location.href="/html/user.html?type=login";
                }else{
                    carlistadd();
                }
                
            })
        }
        function carlistchangeajax(carlistmsg){
            $.ajax({
                url:"../api/carlist.php",
                data:{usename:nameIn,carlistmsg:carlistmsg},
                success:function(){
                    getcarlistmsg();
                }
            })
        }
        // 购物车绑定事件
        $('.carList .listtable').stop().hide();
        $('.carList').on('mouseenter','.carqty',function(event){
            $('.carList .listtable').stop().show('slow');
        })
        $('.carList').on('mouseleave',function(){
            $('.carList .listtable').stop().hide('slow');
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

        //头部登录注册点击记录当前页面
        //登录注册成功后跳回
        $('.headTop .top_left a').click(function(){
            // 当前页面路径
            var href = location.href;
            com.Cookie.set('hoshref',href,'','/');
            var typelink = location.search.slice(1).split('=')[1];
            com.Cookie.set('typelink',typelink,'','/');
        })
        // 结算和购物车点击跳转，先判断用户是否登录，不登陆则跳到登录页面，登录则跳到购物车页面
        $('.carList .carqty').click(function(){
            var nameIn = com.Cookie.get('prusername');
                if(nameIn==''){
                    // 当前页面路径
                    var href = location.href;
                    com.Cookie.set('hoshref',href,'','/');
                    var typelink = location.search.slice(1).split('=')[1];
                    com.Cookie.set('typelink',typelink,'','/');
                    window.location.href="/html/user.html?type=login";
                }else{
                    window.location.href="/html/cart.html";
                }
        })
        $('.carList .listtable .paybtn').click(function(){
            var nameIn = com.Cookie.get('prusername');
            if(nameIn==''){
                // 当前页面路径
                var href = location.href;
                com.Cookie.set('hoshref',href,'','/');
                var typelink = location.search.slice(1).split('=')[1];
                com.Cookie.set('typelink',typelink,'','/');
                window.location.href="/html/user.html?type=login";
            }else{
                window.location.href="/html/cart.html";
            }
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