require(['config'],function(){   
    require(['jquery'],function(){
        //加载公共头部和尾部html
        $('#header').load('/html/header.html');
        $('#footer').load('/html/footer.html');
        require(['base'],function(){
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
                    // 主图及小图显示
                    // 绑定事件
                    var mainImgUrl = '/img/'+goodid+'link(1).jpg';
                    $('.mainImg').attr('src',mainImgUrl);
                    var goodtitle =  gooddetail['goodtitle'];
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
                    // 初始化设置
                    $('.detail .prevbtn').hide().siblings('.nextbtn').show();
                    //左右按钮切换主图
                    $('.detail i').click(function(){
                        var idx = $('.mainImg').attr('src').split('(')[1].slice(0,1);
                        if($(this).hasClass('prevbtn')){
                            var margetidx = Number(idx)-1;
                        }else if($(this).hasClass('nextbtn')){
                            var margetidx = Number(idx)+1;
                        }
                        var imgurl = '/img/'+goodid+'link('+margetidx+').jpg';
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
                }
            })
            
        })
    })
})