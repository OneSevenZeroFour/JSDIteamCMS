require(['config'],function(){   
    require(['jquery'],function(){
        //加载公共头部和尾部html
        $('#header').load('/html/header.html');
        $('#footer').load('/html/footer.html');
        require(['common','base'],function(com){
            //获取商品数据，初始化生成详情页
            //获取链入参数确定是注册或者登录
            var goodid = location.search.slice(1).split('=')[1];
            $.ajax({
                url:'../api/goodsdetail.php',
                data:{goodid:goodid},
                success:function(res){
                    var resobj = JSON.parse(res);
                    var gooddetail=resobj['data'][0];
                    var type=gooddetail['type'];
                    // 头部初始化
                    var obj2={women:'女士',men:'男士',beauty:'美妆',house:'家居',baby:'婴童',outsea:'海外'};
                    var obj3={women:'SERGIO ROSSI',men:'VERSACE COLLECTION & VERSACE',beauty:'LOUIS VUITTON',house:'MASADA & HARIO',baby:'ORANGE TOYS',outsea:'MOROCCAOIL & LEONOR GREYL'};
                    var linktext = obj2[type];
                    var linkval = '/html/'+type+'.html';
                    $('.mainTop .typelink').text(linktext).attr('href',linkval);
                    var textval = obj3[type];
                    var linkval2 = '/html/goodslist.html?type='+type;
                    $('.typetext').text(textval).attr('href',linkval2);

                    // 商品信息初始化
                    $('.detailRight h2').text(textval);
                    $('.detailRight .title').text(gooddetail['goodtitle']);
                    $('.detailRight .sale').text('￥'+gooddetail['sale']);
                    $('.detailRight .price del').text('￥'+gooddetail['price']);
                    $('.detailRight .goodzk').text(gooddetail['rabate']);
                    
                    // 判断有没有颜色选项，没有则不显示颜色框
                    if(gooddetail['color']!=null&&gooddetail['color']!=''){
                        var mainImgUrl = '/img/'+goodid+'link(1).jpg';
                        $('.detailRight .colorbox img').attr('src',mainImgUrl).attr('title',gooddetail['color']);
                        $('.detailRight .colorbox span').text(gooddetail['color']);
                    }else{
                        $('.detailRight .colorbox').hide();
                    }
                    // 尺码hover事件
                    //鼠标移动到尺码位子显示细节栏目并定位
                    //先判断有没有尺码，没有则不显示尺码
                    if(gooddetail['size']!=null&&gooddetail['size']!=''){
                        var sizearr=gooddetail['size'].split('-');
                        var sizes=sizearr.map(function(itm){
                            return `<span>${itm}</span>`
                        }).join('');
                        $('.detailRight .sizebox .size').html(sizes);
                        var $sizeSpan = $('.detailRight .sizebox .size span');
                        $('.detailRight .sizebox .contentcover').hide();
                        $sizeSpan.hover(function(){
                            $(this).addClass('active').siblings().removeClass('active');
                            var $contentcover = $(this).parent().siblings('.contentcover');
                            var margettop = $(this).position().top+$(this).outerHeight()+10;
                            var margetleft = $(this).position().left-$(this).outerWidth()/2;
                            $contentcover.show().css({left:margetleft,top:margettop}).find('.sizeshow b').text($(this).text());
                        },function(){
                            $(this).removeClass('active');
                            var $contentcover = $(this).parent().siblings('.contentcover');
                            $contentcover.hide();
                        })
                        $sizeSpan.click(function(){
                            if($(this).hasClass('selected')){
                                $(this).removeClass('selected').siblings().removeClass('selected');
                            }else{
                                $(this).addClass('selected').siblings().removeClass('selected');
                            }                            
                        })
                    }else{
                        $('.detailRight .sizebox').hide();
                    }                  
                    // 绑定数量改变事件
                    // 先判断数字的值在什么范围
                    function testqty(){
                        var nowqty = Number($('.detailRight .qtybox .qtychange span').text());
                        var totalqty = Number(gooddetail['inventory']);
                        var $qtyadd = $('.detailRight .qtybox .qtychange .qtyadd');
                        var $qtyles = $('.detailRight .qtybox .qtychange .qtyles');
                        var $lock = $('.detailRight .qtybox .qtychange b');
                        if(nowqty<=1){
                            $qtyles.addClass('disab').attr('disabled',true);
                            $lock.text("");
                        }else if(nowqty>=totalqty){
                            $qtyadd.addClass('disab').attr('disabled',true);
                            $lock.text("商品库存不足");
                        }else{
                            $qtyles.removeClass('disab').attr('disabled',false);
                            $qtyadd.removeClass('disab').attr('disabled',false);
                            $lock.text("");
                        }
                    }
                    testqty();
                    $('.detailRight .qtybox .qtychange button').click(function(){
                        var nowqty = Number($('.detailRight .qtybox .qtychange span').text());
                        if($(this).hasClass('qtyadd')){
                            $('.detailRight .qtybox .qtychange span').text(nowqty+1);
                        }else if($(this).hasClass('qtyles')){
                            $('.detailRight .qtybox .qtychange span').text(nowqty-1);
                        }
                        testqty();
                    })                   
                    // 商品信息初始化
                    $('.allmsg .msglist li:nth-child(1)').text(gooddetail['goodtitle']);
                    $('.allmsg .msglist li:nth-child(2)').text(gooddetail['goodid']);
                    $('.allmsg .msglist li:nth-child(3)').text(obj2[gooddetail['type']]);
                    $('.allmsg .msglist li:nth-child(5)').text(gooddetail['color']);
                    $('.allmsg .msglist li:nth-child(6)').text(gooddetail['size']);
                    // 主图及小图显示
                    // 绑定事件
                    var mainImgUrl = '/img/'+goodid+'link(1).jpg';
                    $('.mainImg').attr('src',mainImgUrl);
                    $('.allmsg .msgmainImg').attr('src',mainImgUrl);
                    var goodtitle =  gooddetail['goodtitle']+'-商品代码：'+goodid;
                    $('.mainTop .goodtitle').text(goodtitle);
                    var imgqty = gooddetail['imgurls'];
                    var imgs='';
                    for(var i=1;i<=imgqty;i++){
                        if(i==1){
                            imgs += '<img src="/img/'+goodid+'link('+i+').jpg" class="active"/>';
                        }else{
                            imgs += '<img src="/img/'+goodid+'link('+i+').jpg"/>';
                        }                                   
                    }
                    $('.detail .imgsbox').html(imgs);
                    $('.detailmsg .goodsshowPic').html(gooddetail['descrption']);
                    $('.point').text(gooddetail['point']);
                    $('.detailmsg .goodsshowPic').html(imgs);

                    function changeimg(){
                        var mainImgurl = $('.mainImg').attr('src');
                        var firstImgurl = $('.detail .imgsbox img:first-child').attr('src');
                        var lastImgurl = $('.detail .imgsbox img:last-child').attr('src');
                        if($('.detail .imgsbox img').length==1){
                            $('.detail i').hide();
                        }else if($('.detail .imgsbox img').length>1&&mainImgurl==firstImgurl){
                            $('.detail .prevbtn').hide().siblings('.nextbtn').show();
                        }else if($('.detail .imgsbox img').length>1&&mainImgurl==lastImgurl){
                            $('.detail .prevbtn').show().siblings('.nextbtn').hide();
                        }else{
                            $('.detail i').show();
                        }
                    }
                    changeimg();
                    //左右按钮切换主图
                    $('.detail i').click(function(){
                        var idx = $('.mainImg').attr('src').split('(')[1].slice(0,1);
                        if($(this).hasClass('prevbtn')){
                            var margetidx = Number(idx)-1;
                        }else if($(this).hasClass('nextbtn')){
                            var margetidx = Number(idx)+1;
                        }
                        var imgurl = '/img/'+goodid+'link('+margetidx+').jpg';
                        $('.imgsbox img').eq(margetidx-1).addClass('active').siblings('img').removeClass('active');
                        $('.mainImg').attr('src',imgurl);
                        $('.zoomImg').attr('src',imgurl);
                        changeimg();
                    })
                    // 给小图绑定hover事件
                    $('.detail .imgsbox img').hover(function(){
                        $(this).addClass('active').siblings('img').removeClass('active');
                        $('.mainImg').attr('src',$(this).attr('src'));
                        changeimg();
                    },function(){})
                    //放大镜
                    //图片路径复制
                    $('.zoom').hide();
                    $('.cover').hide();
                    $('.mainbox').mousemove(function(event){
                        $('.zoom').show();
                        $('.cover').show();
                        //设置大图路径
                        $('.zoomImg').attr('src',$('.mainImg').attr('src'));
                        var left=event.pageX-$('.mainbox').offset().left-90;
                        var top=event.pageY-$('.mainbox').offset().top-120;
                                              
                        if(left<0){
                            left = 0;
                        }else if(left > $('.mainbox').width()-180){
                            left = $('.mainbox').width()-180;
                        }

                        if(top<0){
                            top = 0;
                        }else if(top > $('.mainbox').height()-240){
                            top = $('.mainbox').height()-240;
                        }
                        $('.cover').css({left:left,top:top}); 
                        $('.zoomImg').css({left:-left*2,top:-top*2});
                    })

                    $('.mainbox').mouseleave(function(){
                        $('.zoom').hide();
                        $('.cover').hide();
                    })
                    //nav导航
                    var obj1={women:1,men:2,beauty:3,house:4,baby:5,outsea:6};                   
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
                    //生成更多列表
                    var moregoods=resobj['more'];
                    var morelist=moregoods.map(function(item){
                        var mainImgurl = '/img/'+item.goodid+'link(1).jpg';
                        var zk = item.rabate*10;
                        return `<li>
                            <a href="/html/goodsdetail.html?id=${item.goodid}" target="_blank">
                                <img src="${mainImgurl}" title="${item.goodtitle}"/>
                                <p>${obj3[type]}</p>
                                <p>${item.goodtitle}</p>
                                <span class="sale">￥${item.sale}</span><del><span class="price">￥${item.price}</span></del><span class="goodzk">${zk+'% OFF'}</span>
                            </a>
                        </li>`
                    }).join('');
                    $('.moregoods ul').html(morelist);
                }
            })
            //获取当前时间写入出库时间
            var now = new Date();
            var year = now.getFullYear();
            var month = (now.getMonth()+1)<10?'0'+(now.getMonth()+1):(now.getMonth()+1);
            var day = now.getDate()<10?'0'+now.getDate():now.getDate();
            var outtime = year+'年'+month+'月'+day+'日';
            $('.outtime span').text(outtime);
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
                    $('.detailRight .lasttime').hide();
                }

                // 转成倒计时格式
                var secLeft = offset%60;
                var minLeft = Math.floor(offset/60)%60;
                var hourLeft = Math.floor(offset/60/24)%60;
                var dayLeft = Math.floor(offset/60/60/24);

                var minLeft = minLeft<10?'0'+minLeft:minLeft;
                var hourLeft = hourLeft<10?'0'+hourLeft:hourLeft;
                var secLeft = secLeft<10?'0'+secLeft:secLeft;

                //写入倒计时模块
                $('.detailRight .lasttime .DD b').text(dayLeft);
                $('.detailRight .lasttime .HH b').text(hourLeft);
                $('.detailRight .lasttime .MM b').text(minLeft);
                $('.detailRight .lasttime .SS b').text(secLeft);
            },1000);

            //购物车和立即购买点击后检测用户是否为登录状态,没有登录则跳转到登录页面,并记录当前页面，用户登录成功则直接返回

            function getcarajax(usename){
                $.ajax({
                    url:'../api/carlist.php',
                    data:{usename:usename},
                    success:function(res){
                        com.Cookie.set('prcarlist',res,'','/');
                    }
                })
            }

        })
    })
})