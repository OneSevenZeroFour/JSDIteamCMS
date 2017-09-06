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
            
            
            // 商品生成
            // 传入类型到后台获取数据
            function getgoods(type,Sort,pageNo,qty){
                var sortIn = Sort?Sort:'default';
                var pageNo = pageNo?pageNo:1;
                var qty = qty?qty:16;
                // 传入数据到后台获取指定类型商品
                $.ajax({
                    url:"../api/goodslist.php",
                    data:{type:type,sortIn:sortIn,pageNo:pageNo,qty:qty},
                    success:function(res){
                        var resobj = JSON.parse(res);
                        var goodsobj = resobj.data;
                        if(resobj['status']==200&&resobj['msg']=='success'){
                            // 初始化
                            // 该类的最低折扣
                            var lowzk = resobj['lowzk']+'折起';
                            $('#mains h2 span:last-child').text(lowzk);
                            //生成底部页码
                            var totals = resobj['total'];                           
                            var pageNo = resobj['pageNo'];
                            var qty = resobj['qty'];                           
                            $('.searchRight .totals').text(totals);
                            var totalpages = Math.ceil(totals/qty);
                            $('.searchfoot .pagebox').html('');
                            for(var i=1;i<=totalpages;i++){
                                var $page = $('<span/>').text(i);
                                $('.searchfoot .pagebox').append($page);
                            }
                            $('.searchfoot .pagebox span').eq(pageNo-1).addClass('selected');
                            $('.searchfoot .pagetotal').text("共"+totalpages+"页,到第");
                            var spanpage = pageNo+'/'+totalpages;
                            if(pageNo==1&&totalpages==1){
                                $('.searchRight button').attr('disabled',true);
                                $('.searchfoot button').attr('disabled',true);
                            }else if(pageNo==1&&totalpages>1){
                                $('.searchRight .prevpage').attr('disabled',true).removeClass('selected').siblings('.nextpage').attr('disabled',false).addClass('selected');
                                $('.searchfoot .prevpageto').attr('disabled',true).removeClass('selected').siblings('.nextpageto').attr('disabled',false).addClass('selected');
                            }else if(pageNo>1&&totalpages!=pageNo){
                                $('.searchRight button').attr('disabled',false);
                                $('.searchfoot button').attr('disabled',false);
                            }else if(pageNo>1&&totalpages==pageNo){
                                $('.searchRight .nextpage').attr('disabled',true).removeClass('selected').siblings('.prevpage').attr('disabled',false).addClass('selected');
                                $('.searchfoot .nextpageto').attr('disabled',true).removeClass('selected').siblings('.prevpageto').attr('disabled',false).addClass('selected');
                            }
                            //页码点击事件
                            $('.searchfoot .pagebox span').click(function(){
                                // 获取排序方式
                                if($('.defaultSort').hasClass('selected')){
                                    var sort = 'default';
                                }else if($('.priceSort').hasClass('up')){
                                    var sort = 'up';
                                }else if($('.priceSort').hasClass('down')){
                                    var sort = 'down';
                                }
                                var pageNo=Number($(this).text());
                                getgoods(type,sort,pageNo);
                                document.body.scrollTop=500;
                            })
                            $('.searchRight .atpage').text(spanpage);
                            var goodshtml=goodsobj.map(function(item){
                                if(item.inventory<20){
                                    var liclass = 'onlyelse';
                                }else{
                                    var liclass='';
                                }
                                var mainImgurl = '/img/'+item.goodid+'link(1).jpg';
                                var imgs='';
                                for(var i=1;i<=item.imgurls;i++){
                                    if(i==1){
                                        imgs += '<img src="/img/'+item.goodid+'link('+i+').jpg" class="active"/>';
                                    }else{
                                        imgs += '<img src="/img/'+item.goodid+'link('+i+').jpg"/>';
                                    }                                   
                                }
                                if(item.size!=null&&item.size!=''){
                                    var sizearr=item.size.split('-');
                                    var sizes=sizearr.map(function(itm){
                                        return `<span>
                                            ${itm}
                                        </span>
                                        `
                                    }).join('');
                                    var liclass2='';
                                }else{
                                    var sizes='';
                                    var liclass2=' nosize';
                                }
                                
                                return `<li data-id="${item.goodid}" class="${liclass}${liclass2}">
                                <a href="/html/goodsdetail.html?id=${item.goodid}">
                                    <div class="protect">
                                        <p class="onlyqty">仅剩<span>${item.inventory}</span>件</p>
                                        <p class="hotgood">买手推荐</p>
                                    </div>
                                    <img src="${mainImgurl}" class="mainImg" title="${item.goodtitle}"/>
                                    <p>${obj3[type]}</p>
                                    <p>${item.goodtitle}</p>
                                    <span class="sale">￥${item.sale}</span><del><span class="price">￥${item.price}</span></del>
                                    <div class="showimgs">
                                        <div class="top clearfixed">
                                            ${sizes}
                                            <div class="contentcover">
                                                <b>规则/型号:</b>
                                                <p class="size"></p>
                                                <p>[详请参考尺寸测量信息]</p>
                                            </div>
                                        </div>
                                        <div class="imgslist">
                                            ${imgs}
                                        </div>
                                    </div>
                                </a>
                                </li>`
                            }).join('');
                            $('#mains .goodslist ul').html(goodshtml);
                            // 商品信息初始化
                            var $contentcover = $('#mains .goodslist li .contentcover');
                            $contentcover.hide();
                            var $showimgs = $('#mains .goodslist li .showimgs');
                            $showimgs.hide();
                            $('#mains .goodslist li.onlyelse .protect').find('.onlyqty').show().siblings().hide();
                            $('#mains .goodslist li').not('.onlyelse').find('.hotgood').show().siblings().hide();
                            $('#mains .goodslist li.nosize .top').hide();
                            //鼠标移动到主图位子显示尺码和小图
                            $('#mains .goodslist li').on('mouseenter','.mainImg',function(){
                                var $liparent = $(this).parents('li');
                                $liparent.find('.showimgs').show();
                            }).on('mouseleave',function(){
                                var mainImgurl = $(this).find('.imglist img:first-child').attr('src');
                                $(this).find('.showimgs').hide();
                            })
                            //鼠标移动到尺码位子显示细节栏目并定位
                            var $sizeSpan = $('#mains .goodslist li .top span');
                            $sizeSpan.hover(function(){
                                var $contentcover = $(this).siblings('.contentcover');
                                var margettop = $(this).position().top+$(this).outerHeight()+5;
                                var margetleft = $(this).position().left-$(this).outerWidth()/2-40;
                                $contentcover.show().css({left:margetleft,top:margettop}).find('.size').text($(this).text());
                            },function(){
                                var $contentcover = $(this).siblings('.contentcover');
                                $contentcover.hide();
                            })
                            //鼠标移到小图上显示在主图
                            var $imglist = $('#mains .goodslist li .imgslist img');
                            $imglist.hover(function(){
                                var $mainImg = $(this).parents('li').find('.mainImg');
                                $mainImg.attr('src',$(this).attr('src'));
                            },function(){
                                // var $mainImg = $(this).parents('li').find('.mainImg');
                                // var $firstImgurl = $(this).parent().find('img:first-child').attr('src');
                                // $mainImg.attr('src',$firstImgurl);
                            })
                        }
                    }
                })
            }
            getgoods(type);

            // 排序栏
            // 初始化
            $('.defaultSort').addClass('selected');
            $('.priceSort').removeClass('up down');
            $('.defaultSort').click(function(){
                $(this).addClass('selected');
                $('.priceSort').removeClass('up down');
                getgoods(type,'default');
                document.body.scrollTop=500;
            })
            $('.priceSort').click(function(){
                $('.defaultSort').removeClass('selected');
                if($(this).hasClass('up')){
                    $(this).removeClass('up').addClass('down');
                    getgoods(type,'down');
                    document.body.scrollTop=500;
                }else if($(this).hasClass('down')){
                    $(this).removeClass('down').addClass('up');
                    getgoods(type,'up');
                    document.body.scrollTop=500;
                }else{
                    $(this).addClass('up');
                    getgoods(type,'up');   
                    document.body.scrollTop=500;                
                }
            })
            // 搜索栏右侧页码翻页
            $('.searchRight button').click(function(){
                //获取当前页码
                var pageNo = $('.searchRight .atpage').text().split('/')[0];
                // 获取排序方式
                if($('.defaultSort').hasClass('selected')){
                    var sort = 'default';
                }else if($('.priceSort').hasClass('up')){
                    var sort = 'up';
                }else if($('.priceSort').hasClass('down')){
                    var sort = 'down';
                }
                if($(this).hasClass('prevpage')){
                    pageNo=Number(pageNo)-1;
                    getgoods(type,sort,pageNo);
                    document.body.scrollTop=500;
                }else if($(this).hasClass('nextpage')){
                    pageNo=Number(pageNo)+1;
                    getgoods(type,sort,pageNo);
                    document.body.scrollTop=500;
                }
            })
            //底部搜索栏点击事件
            $('.searchfoot button').click(function(){
                //获取当前页码
                var pageNo = $('.searchRight .atpage').text().split('/')[0];
                // 获取排序方式
                if($('.defaultSort').hasClass('selected')){
                    var sort = 'default';
                }else if($('.priceSort').hasClass('up')){
                    var sort = 'up';
                }else if($('.priceSort').hasClass('down')){
                    var sort = 'down';
                }
                if($(this).hasClass('prevpageto')){
                    pageNo=Number(pageNo)-1;
                    getgoods(type,sort,pageNo);
                    document.body.scrollTop=500;
                }else if($(this).hasClass('nextpageto')){
                    pageNo=Number(pageNo)+1;
                    getgoods(type,sort,pageNo);
                    document.body.scrollTop=500;
                }
            })
            // input点击清空非数字
            $('.searchfoot input').click(function(){
                var value = $('.searchfoot input').val();
                if(value/1!=0){
                    $('.searchfoot input').val('');
                }
            })
            //确定按钮点击事件
            $('.searchfoot .pagebtnspan').click(function(){
                //获取当前页码
                var total = $('.searchRight .atpage').text().split('/')[1];
                var nowpage = $('.searchRight .atpage').text().split('/')[0];
                var pageNo = $('.searchfoot input').val();

                if(pageNo==''){
                    var pageNoto=1;
                }else if(pageNo%1==0&&pageNo>total){
                    var pageNoto=total;
                }else if(pageNo%1==0&&pageNo<=total){
                    var pageNoto=pageNo;
                }else{
                    $('.searchfoot input').val('不合法');
                    return;
                }
                // 获取排序方式
                if($('.defaultSort').hasClass('selected')){
                    var sort = 'default';
                }else if($('.priceSort').hasClass('up')){
                    var sort = 'up';
                }else if($('.priceSort').hasClass('down')){
                    var sort = 'down';
                }
                getgoods(type,sort,pageNoto);
                document.body.scrollTop=500;
                $('.searchfoot input').val(pageNoto);
            })
            $(window).scroll(function(){
                if($(document).scrollTop()<610){
                    $('.goodssearch').removeClass('totop');
                    $('.selectlist').css({'margin-bottom':'0'});
                }else{
                    $('.goodssearch').addClass('totop');
                    $('.selectlist').css({'margin-bottom':'65px'});
                }
            })
        })
    })
})