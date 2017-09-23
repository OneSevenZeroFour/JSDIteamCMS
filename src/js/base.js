require(['config'],function(){
    require(['common','jquery','socket'],function(com,$,io){    
        //头部手机版二维码
        $('.top_right span').eq(1).hover(function(){
            $('.topCode').stop().fadeIn('slow');
        },function(){
            $('.topCode').stop().fadeOut('slow');        
        })
        //头部默认读取cookie并验证
        var nameIn = com.Cookie.get('prusername');
        if(nameIn==='admin'){
            $('.xu_dz').html('后台管理')
            $('.xu_dz').on('click',function(){
                window.location.href ='/CMS/admin-table.html'
            })
        }
        
        //判断是否有写入的特定用户名
        if(nameIn==''){
            $('.top_left').show();
            $('.top_leftlogin').hide();
            $('.carList .carqty').text('');
            $('.carList .cartotal').text('0');
            $('.covercarlist').text('您还没有登录');
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
            $('.covercarlist').text('购物袋暂时没有商品');
            getcarlistmsg();
            if($('.qingdan').length==1){
                cartlistgetmsg();
            }     
        }

        
        // 获取地理位置。并写入cookie,然后从cookie中读取写入引入了base的页面;
        
        
        var  xu_location =com.Cookie.get('xu_location');
        if(xu_location===''){
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
            console.log(r.point);
                var geoc = new BMap.Geocoder();                     
                var pt = r.point;
                geoc.getLocation(pt, function(rs){
                    var addComp = rs.addressComponents;
                    console.log(addComp.city)
                    var now = new Date();
                    document.cookie = 'xu_location='+addComp.city+';path=/'+';expires='+now.toString();       
                    $('#header .top_left').find('a')[2].innerHTML=addComp.city;
                     $('.xu_dz').html(addComp.city);
                });       
            },{enableHighAccuracy: true})
            // var now = new Date();
            // document.cookie = 'xu_location='+xu_location+';path=/'+';expires='+now.toString(); 

        }
        if(nameIn!=='admin'){
            $('#header .top_left').find('a')[2].innerHTML=xu_location;
            $('.xu_dz').html(xu_location);
            console.log(xu_location)
        }
        

        


        var obj3={women:'SERGIO ROSSI',men:'VERSACE COLLECTION & VERSACE',beauty:'LOUIS VUITTON',house:'MASADA & HARIO',baby:'ORANGE TOYS',outsea:'MOROCCAOIL & LEONOR GREYL'};
        // 读取用户购物车并写入购物车页面
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
                        console.log(carlistarr);
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
                                    var $li2p = $('<p/>').text('颜色:').append($('<span/>').text(gooddetail['color']));
                                    $li2p.append($('<span/>').text(eachlist[1]));
                                    $li2.append($li2p);
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
                                    if(eachlist[2]>=gooddetail['inventory']){
                                        $li4.find('.cartaddbtn').addClass('disuse').attr('disabled',true);
                                        $li4.find('.warning').text('库存紧张');
                                    }
                                    $ul.append($li4);
                                    var youhui = Number(gooddetail['price'])-Number(gooddetail['sale']);
                                    var $li5 = $('<li/>').text('￥'+youhui*Number(eachlist[2]));
                                    $ul.append($li5);
                                    var $li6 = $('<li/>').text('￥'+Number(gooddetail['sale'])*Number(eachlist[2]));
                                    $ul.append($li6);
                                    var $li7 = $('<li/>');
                                    $li7.append($('<span/>').addClass('removecart').text('删除'));
                                    $ul.append($li7);
                                    var $box = $('<div/>').addClass('lesbox');
                                    $box.append($('<p/>').text('您确定要删除该商品吗？'));
                                    $box.append($('<span/>').addClass('noles').text('取消'));
                                    $box.append($('<span/>').addClass('yesles').text('确定'));
                                    $box.hide();
                                    $ul.append($box);
                                    $ul.data('goodid',gooddetail['goodid']);
                                    $ul.data('kucun',gooddetail['inventory']);
                                    $ul.data('youhui',youhui);
                                    $ul.data('sale',gooddetail['sale']);

                                    $ul.data('totaleg',carlistarr.length);
                                    $('.qingdan').append($ul);
                                    if($('.allcheck').hasClass('selected')){
                                        $('.checkbtn').addClass('selected');
                                    }

                                    // 绑定事件
                                    $li7.find('.removecart').click(function(){
                                        $(this).parent().siblings('.lesbox').show();
                                    })
                                    $ul.find('.lesbox .noles').click(function(){
                                        $(this).parent().hide();
                                    })
                                    $ul.find('.lesbox .yesles').click(function(){
                                        $(this).parents('ul').remove();
                                        cartqdles();
                                    })
                                    $li1.find('.checkbtn').click(function(){                                       
                                        if($(this).hasClass('selected')){
                                            $(this).removeClass('selected');
                                            $('.allcheck').removeClass('selected');
                                            if($('.checkbtn.selected').length==0){
                                                $('.cartfoot div:nth-child(4)').removeClass('selected');
                                                $('.cartfoot div:nth-child(2) span').text('0');
                                                $('.cartfoot div:last-child span').text('0.00');
                                                $('.cartfoot div:nth-child(4)').removeClass('selected');
                                            }else{
                                                var total = $(this).parent().siblings('li:nth-child(6)').text().slice(1);
                                                var attopay = $('.cartfoot div:last-child span').text().slice(1);
                                                var nowtotal = Number(attopay)-Number(total);
                                                $('.cartfoot div:last-child span').text('￥'+nowtotal);
                                                $('.cartfoot div:nth-child(2) span').text($('.checkbtn.selected').length);
                                            }
                                        }else{
                                            $(this).addClass('selected');
                                            var totaleg = $(this).parents('ul').data('totaleg');
                                            if($('.checkbtn.selected').length==totaleg){
                                                $('.allcheck').addClass('selected');

                                                $('.cartfoot div:nth-child(2) span').text($('.checkbtn').length-2);
                                                $('.cartfoot div:last-child span').text($('.headNav .carList .cartotal').text());
                                            }else{
                                                var total = $(this).parent().siblings('li:nth-child(6)').text().slice(1);
                                                var attopay = $('.cartfoot div:last-child span').text().slice(1);
                                                console.log(total,attopay);
                                                var nowtotal = Number(attopay)+Number(total);
                                                $('.cartfoot div:last-child span').text('￥'+nowtotal);
                                                $('.cartfoot div:nth-child(2) span').text($('.checkbtn.selected').length);
                                            }
                                            $('.cartfoot div:nth-child(4)').addClass('selected');                                         
                                        }
                                    })
                                    $li4.find('button').click(function(){
                                        var qty = Number($li4.find('.cartqty').text());
                                        if($(this).hasClass('cartlesbtn')){
                                            $(this).siblings('.cartqty').text(qty-1);
                                            var sale = $(this).parents('ul').data('sale');
                                            var kucun = $(this).parents('ul').data('kucun');
                                            var youhui =$(this).parents('ul').data('youhui');
                                            $(this).parents('li').siblings('li:nth-child(5)').text('￥'+(qty-1)*youhui);
                                            $(this).parents('li').siblings('li:nth-child(6)').text('￥'+(qty-1)*sale);
                                            cartqdles1();
                                            $(this).siblings('.warning').text('');
                                            if(qty<=2){
                                                $(this).addClass('disuse').attr('disabled',true)
                                            }else{
                                                $(this).removeClass('disuse').attr('disabled',false);
                                                $(this).siblings('.cartaddbtn').removeClass('disuse').attr('disabled',false);
                                            }
                                        }else if($(this).hasClass('cartaddbtn')){
                                            $(this).siblings('.cartqty').text(qty+1);
                                            var sale = $(this).parents('ul').data('sale');
                                            var kucun = $(this).parents('ul').data('kucun');
                                            var youhui =$(this).parents('ul').data('youhui');
                                            $(this).parents('li').siblings('li:nth-child(5)').text('￥'+(qty+1)*youhui);
                                            $(this).parents('li').siblings('li:nth-child(6)').text('￥'+(qty+1)*sale);
                                            cartqdles1();
                                            if(qty>=kucun-1){
                                                $(this).addClass('disuse').attr('disabled',true);
                                                $(this).siblings('.warning').text('库存紧张');
                                            }else{
                                                $(this).removeClass('disuse').attr('disabled',false);
                                                $(this).siblings('.cartlesbtn').removeClass('disuse').attr('disabled',false);
                                            }
                                        }
                                    })

                                }
                            })
                        })
                    }                  
                }
            })
        }
        if($('.clearqd').length==1){
            $('.clearqd .yesclear').click(function(){
                carlistchangeajax('clear');
                $('.listtable ul').html('');
                $('.qingdan').html('您的购物车还没有商品，快去选购吧！');
                $('.clearqd').hide();
                $('.allcheck').removeClass('selected');
                $('.cartfoot div:nth-child(2) span').text('0');
                $('.cartfoot div:last-child span').text('0.00');
                $('.cartfoot div:nth-child(4)').removeClass('selected');
            })
        }
        // 读取用户购物车并写入导航栏
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
                                                if($('.checkbtn.selected').length>0){
                                                    $('.cartfoot div:nth-child(2) span').text($('.checkbtn.selected').length);
                                                    var totalbtn = $('.qingdan .checkbtn.selected').length;
                                                    var totaltopay3 = 0;
                                                    for(var i=0;i<totalbtn;i++){
                                                        var thistopay3 = $('.qingdan .checkbtn.selected').eq(i).parent('li').siblings('li:nth-child(6)').text().slice(1);
                                                        totaltopay3+=Number(thistopay3);
                                                        if(i==totalbtn-1){
                                                            $('.cartfoot div:last-child span').text('￥'+totaltopay3);
                                                        }
                                                    }                                                   
                                                }
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
                            var oldto = goodslist[i].split('/');
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
        //删除事件作用于头部购物车
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
        //删除事件作用于购物车页面
        function cartqdles(){
            if($('.qingdan ul').length==0){
                carlistchangeajax('clear');
                $('.listtable ul').html('');
                $('.qingdan').html('您的购物车还没有商品，快去选购吧！');
                $('.clearqd').hide();
                $('.allcheck').removeClass('selected');
                $('.cartfoot div:nth-child(2) span').text('0');
                $('.cartfoot div:last-child span').text('0.00');
                $('.cartfoot div:nth-child(4)').removeClass('selected');
            }else{
                var totaltopay1 = 0;
                var carlistmsg1 = '';
                for(var i=0;i<$('.qingdan ul').length;i++){
                    var $ul = $('.qingdan ul').eq(i);
                    var goodid = $ul.data('goodid');
                    var goodsize = $ul.find('li:nth-child(2) p span:last-child').text();
                    var qty = $ul.find('li:nth-child(4) .cartqty').text();
                    var addmsg = goodid+'/'+goodsize+'/'+qty;
                    carlistmsg1=carlistmsg1+addmsg+'-';
                    totaltopay1+=Number($('.qingdan ul').eq(i).find('li:nth-child(6)').text().slice(1));
                    if(i==$('.qingdan ul').length-1){                      
                        carlistchangeajax(carlistmsg1.slice(0,-1));
                    }                    
                }
            }
        }
        function cartqdles1(){
            if($('.qingdan ul').length==0){
                carlistchangeajax('clear');
                $('.listtable ul').html('');
                $('.qingdan').html('您的购物车还没有商品，快去选购吧！');
                $('.clearqd').hide();
                $('.allcheck').removeClass('selected');
                $('.cartfoot div:nth-child(2) span').text('0');
                $('.cartfoot div:last-child span').text('0.00');
                $('.cartfoot div:nth-child(4)').removeClass('selected');
            }else{
                var totaltopay1 = 0;
                var carlistmsg1 = '';
                for(var i=0;i<$('.qingdan ul').length;i++){
                    var $ul = $('.qingdan ul').eq(i);
                    var goodid = $ul.data('goodid');
                    var goodsize = $ul.find('li:nth-child(2) p span:last-child').text();
                    var qty = $ul.find('li:nth-child(4) .cartqty').text();
                    var addmsg = goodid+'/'+goodsize+'/'+qty;
                    carlistmsg1=carlistmsg1+addmsg+'-';
                    totaltopay1+=Number($('.qingdan ul').eq(i).find('li:nth-child(6)').text().slice(1));
                    if(i==$('.qingdan ul').length-1){                       
                        carlistchangeajax(carlistmsg1.slice(0,-1),'only');
                    }                    
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
        function carlistchangeajax(carlistmsg,only){
            $.ajax({
                url:"../api/carlist.php",
                data:{usename:nameIn,carlistmsg:carlistmsg},
                success:function(){
                    getcarlistmsg();
                    if($('.clearqd').length==1&&only!='only'){                       
                        cartlistgetmsg();
                    }
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
        
      
        //--------------LY 聊天窗口------------------------------  
        var Chat = {
            ele:$('.headTop'),
            btn:$('.fr>span').eq(0).find('a'),
            
            //初始化
            init:function(name){
                //跟后端连接
                var socket = io("http://localhost:3001");
                //生成结构
                var LY_chat = $('<div/>');
                LY_chat.addClass('LY_chat');

                if(name == 'admin'){
                    
                    LY_chat.html(`
                            <div class="LY_chat_head"><h5>消息管理</h5><span>&times;</span></div>
                            <ol></ol>
                        `)
                    socket.on('id',data=>{

                        //找出相同的name
                        //重置id
                        var LY_name = LY_chat.find('ol').children();
                        for(var j=0;j<LY_name.length;j++){
                            console.log(LY_name.eq(j).find('h4').html())
                            if(data.name == LY_name.eq(j).find('h4').html()){
                                LY_name.eq(j).attr('data-id',data.id);
                                break;
                            }
                        }
                        //找出管理员
                        if(data.name != 'admin' && j==LY_name.length){
                            $li = $('<li/>');
                            $li.attr('data-id',data.id);
                            $li.html (`
                                    <h4>${data.name}</h4>
                                    <span>&times;</span>
                                    <ul class="LY_kefu"></ul>
                                    <form>
                                        <input type="text"/>
                                        <a href="##" id="LY_chat_send">回复</a>
                                    </form>          
                                `
                            )
                            LY_chat.find('ol').append($li)                        
                        }
                                                                
                    });


                    for(var i=0;i<LY_chat.children().children().length;i++){
                            
                        if(LY_chat.children().children().eq(i).find('h4').html() == 'admin'){
                            LY_chat.children().children().eq(i).remove();
                        }
                    }

                    //绑定点击事件删除
                    LY_chat.find('ol').on('click','span',function(){
                        $(this).parent().remove();
                    })

                    //绑定点击隐藏
                    LY_chat.find('.LY_chat_head>span').on('click',()=>{
                        this.hide();
                    });

                    //绑定点击拖动
                    LY_chat.find('.LY_chat_head').on('mousedown',e=>{
                        //记录鼠标按下时的位置
                        var ox = e.clientX - LY_chat.offset().left;
                        var oy = e.clientY - LY_chat.offset().top;
                        this.drag(ox,oy);
                        
                        e.preventDefault();
                        
                    })
                }else{
                    LY_chat.html('');
                    LY_chat.html(`
                        <div class="LY_chat_head"><h5>${name}</h5><span>&times;</span></div>
                        <ul class="LY_yonghu"></ul>
                        <div class="LY_icon">
                            <div class="iconfont icon-smile"></div>
                            <div class="iconfont icon-pic"></div>
                            <div class="iconfont icon-remind"></div>
                            <div class="iconfont icon-video"></div>
                        </div>
                        <textarea></textarea>
                        <div class="LY_chat_btn">
                            <a href="##">发送</a>
                        </div>
                    `);
                }
               
                this.ele.children().append(LY_chat);
                var arr = ['晕','奋斗','亲亲','害羞','惊讶','发呆','流泪','酷','睡觉','冷汗'];
                //生成表情包
                var $ul = $('<ol>/');
                for(var i=0;i<arr.length;i++){
                    var $li = $('<li/>');
                    $li.html(`
                            <a href="##" title="${arr[i]}"><img src="/img/icon/img/${i}.png"></a>
                        `);
                    $ul.append($li);
                }
                LY_chat.find('.icon-smile').append($ul);

                //绑定鼠标移入事件
                var kaiguan = false;
                LY_chat.on('click','.icon-smile',function(){
                    if(kaiguan){
                        $(this).children().hide(); 
                        kaiguan = false;
                    }else{
                        $(this).children().show(); 
                        kaiguan = true;
                    }
                   
                }); 
                //事件委托发送表情
                LY_chat.on('click','.icon-smile>ol>li>a',function(){
                     //获取当前时间
                    var now = new Date()
                    var data = now.toLocaleDateString();
                    var s = now.getHours();
                    var f = now.getMinutes();
                    var m = now.getSeconds();
                    var time = data+' '+s+':'+f+':'+m;

                    var values = $(this).children().clone(true);
                    var value = `<img src="${values[0].src}"/>`;
                    socket.emit('receive',{
                        name:name,
                        time:time,
                        value:value,
                    })
                })

                //绑定点击显示
                this.btn.on('click',()=>{

                     this.show(name);
                });

                //绑定点击隐藏
                LY_chat.find('.LY_chat_head>span').on('click',()=>{
                    this.hide();
                });

                //绑定点击拖动
                LY_chat.find('.LY_chat_head').on('mousedown',e=>{
                    //记录鼠标按下时的位置
                    var ox = e.clientX - LY_chat.offset().left;
                    var oy = e.clientY - LY_chat.offset().top;
                    this.drag(ox,oy);
                    
                    e.preventDefault();
                    
                })

                //绑定鼠标弹起事件
                $(document).on('mouseup',function(){
                    document.onmousemove = null;
                });

                //获取id
                socket.emit('name',{name:name});

                //绑定点击发送消息
                LY_chat.on('click','.LY_chat_btn>a',()=>{

                    //获取当前时间
                    var now = new Date()
                    var data = now.toLocaleDateString();
                    var s = now.getHours();
                    var f = now.getMinutes();
                    var m = now.getSeconds();
                    var time = data+' '+s+':'+f+':'+m;
                    //获取输入框的值
                    var values = this.LY_chat.find('textarea').val();
                    socket.emit('name',{
                        name:name,
                        value:values,
                    })

                    
                    this.send(name,'','',time);
                    
                })

                //管理员回复
                LY_chat[0].onclick = e=>{
                    var target = e.target;

                    if(target.id == 'LY_chat_send'){
                        //获取当前时间
                        var now = new Date()
                        var data = now.toLocaleDateString();
                        var s = now.getHours();
                        var f = now.getMinutes();
                        var m = now.getSeconds();
                        var time = data+' '+s+':'+f+':'+m;

                        //获取数据
                        var id = target.parentNode.parentNode.dataset.id;
                        var values = target.previousElementSibling.value;
                        
                        //生成结构         
                        var $li = $('<li/>');      
                        $li.addClass('LY_left');
                        $li.html(`
                                <a>${values}</a>
                                 <p>${time}</p>
                            `);           
        
                        //写入当前
                        target.parentNode.previousElementSibling.appendChild($li[0]);
                        target.parentNode.previousElementSibling.scrollTop = target.parentNode.previousElementSibling.scrollHeight;                  
                        this.send(name,id,values,time);
                        //清除/焦点
                        target.previousElementSibling.value = '';
                        target.previousElementSibling.focus();
                    }
                }
                    
                
                
                this.LY_chat = LY_chat; 
                this.socket = socket;
                return this;

            },

            //显示
            show:function(name){
                this.LY_chat.show().animate({width:600,height:500});
                if(name != 'admin'){
                    //输入框获取焦点
                    this.LY_chat.find('textarea')[0].focus();
                }
                

                return this;

            },

            //隐藏
            hide:function(){

                this.LY_chat.animate({width:0,height:0},()=>{
                    this.LY_chat.hide();
                });

                 return this;
            },

            //拖动
            drag:function(ox,oy){
                document.onmousemove = evt=>{

                    var left = evt.clientX-ox;
                    var top = evt.clientY-oy;

                    this.LY_chat.css({left:left,top:top,'margin-left':0,'margin-top':0});

                }

                 return this;
            },

            //发送消息


            send:function(name,id,values,time){

                if(name == 'admin'){
                    
                    this.socket.emit('receive',{
                            name:name,
                            id:id,
                            value:values,
                            time:time,
                    });
                }else{
                    //获取输入框的值
                    var $value = this.LY_chat.find('textarea').val();
                    console.log(time);
                    //发送
                    this.socket.emit('receive',{
                            name:name,
                            value:$value,
                            time:time,
                     });

                     //清空输入框
                     this.LY_chat.find('textarea').val('').focus();
                }
                 

                  return this;
            },

            //接收消息
            receive:function(nameIn){

                this.socket.on('send',data=>{
                    console.log(data)
                    if(nameIn == 'admin'){
                       //生成结构         
                        var $li = $('<li/>');      
                        $li.addClass('LY_right');
                        $li.html(`
                                <a>${data.value}</a>
                                 <p>${data.time}</p>
                            `);
                   
                        var $name = this.LY_chat.find('ol').children();
                        for(var i=0;i<$name.length;i++){
                            if(data.name == $name.eq(i).find('h4').html()){
                                $name.eq(i).find('ul').append($li);
                               $name.eq(i).find('ul')[0].scrollTop = $name.eq(i).find('ul')[0].scrollHeight;
                            }
                        }
                        this.show(nameIn);   

                    }else{
                        //生成结构         
                        var $li = $('<li/>');
                        if(data.name == nameIn){   
                            $li.addClass('LY_left');
                            $li.html(`
                                    <b>我:</b>
                                    <a>${data.value}</a>
                                    <p>${data.time}</p>
                                `);
                        }else if(data.name == 'admin'){
                            $li.addClass('LY_right');
                            $li.html(`
                                    <b>客服:</b>
                                    <a>${data.value}</a>
                                     <p>${data.time}</p>
                                `);
                        }
                        this.LY_chat.find('ul').append($li)
                        this.LY_chat.find('ul')[0].scrollTop = this.LY_chat.find('ul')[0].scrollHeight; 
                    }
                   


                    
                });
                

                 return this;
            }
        }

        if(nameIn !== ''){
            if(nameIn == 'admin'){
                $('.top_right').children().eq(0).find('a').html('消息管理中心');
           }
            Chat.init(nameIn).receive(nameIn);
        }else{
            $('.top_right').children().eq(0).find('a').click(function(){
                var href = location.href;
                com.Cookie.set('hoshref',href,'','/');
                var typelink = location.search.slice(1).split('=')[1];
                com.Cookie.set('typelink',typelink,'','/');
                window.location.href="/html/user.html?type=login";
            })            
        }

    })
})