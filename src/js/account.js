/* 
* @Author: Marte
* @Date:   2017-09-20 10:30:21
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-23 15:16:00
*/

require(['config'],function(){   
    require(['jquery'],function(){


        $('#header').load('/html/header.html');
        $('#footer').load('/html/footer.html');
        // 引入头尾部
        // 进入页面加载数据
        require(['base'],function(){

        // 获取cookie里的账户名
        var username='';
        var cookies=document.cookie.split('; ')
                console.log(cookies)
                cookies.forEach(function(item){
                    var res =item.split('=')
                    console.log(res);
                    if(res[0]==='prusername'){
                        username =res[1]
                        console.log(username);
                    }
                })

        // 加载页面到时候，通过判断用户名请求数据库数据,
        //声明头像,便于接受修改后的头像;
        var imgurl;
        console.log(username)
        if(username !==''){
            console.log(666)
            $.ajax({
                url:'http://localhost:12345/get',
                type:'get',
                data:{username:username},
                success:function(data){
                    var res = JSON.parse(data).results[0];
                    console.log(res);
                  $('.right .touxiang2').find('img').attr('src',res.imgurl);
                  $('.left .touxiang2').find('img').attr('src',res.imgurl);
                  $('.left_1').find('p').html(res.nicheng);
                  $('.nicheng').html(res.nicheng);
                  $('._nicheng').val(res.nicheng);
                  $('.xb').html(res.xingbie);
                  if(res.xingbie==='女'){
                    $('.nan').removeClass('active').css({'background':'#ccc','color':'#000'});
                    $('.nv').addClass('active').css({'background':'#000','color':'#fff'});
                    console.log(res.province);
                    }
                    $('.sheng').html(res.province);
                    $('.shi').html(res.city);
                    $('.qu').html(res.district);

                    $('#header .top_left').find('a')[2].innerHTML= res.city+res.district;
                    
                    $('#header .top_left').find('a')[1].innerHTML = username;
                    
                    imgurl = $('.right .touxiang2').find('img').attr('src');

                    $('.addslist ul').append(`
                            <li>
                                <h3 class="ren">${res.user}</h3>
                                <p class="phone">${res.phone}</p>
                                <p class="ssq">${res.province+res.city+res.district}</p>
                                <p class="dizhi">${res.dizhi}</p>
                                <p class="youzheng">${res.youbian}</p>
                            </li>
                        `)
                    // console.log($('.ren').html());
                    if(res.user===''){
                        $('.addslist').hide();
                    }
                }
            })

        }
        
        // 点击编辑进去编辑状态
        $('#content .bianji').on('click',function(){
            $('.bj').show();
            $(this).hide();
            $('.touxiang3').show();
            $("._nicheng").show();
            $('.nicheng').hide();
            $('.xb').hide();
            $('._xb').show();
        })

        // 选择男女
        $('.nan').on('click',function(){
            $(this).addClass('active').css({'background':'#000','color':'#fff'});
            $('.nv').removeClass('active').css({'background':'#ccc','color':'#000'});
        })
        $('.nv').on('click',function(){
            $(this).addClass('active').css({'background':'#000','color':'#fff'});
            $('.nan').removeClass('active').css({'background':'#ccc','color':'#000'});
        })

        // 点击上传头像，先保存起来，点击保存的时候上传到数据库
        // 点击保存，上传数据到数据库
        // var imgurl;
        $('.baocun').on('click',function(){
            $('.bj').hide();
            $('.bianji').show();
            $('.touxiang3').hide();
            $("._nicheng").hide();
            $('.nicheng').show();
            $('.xb').show();
            $('._xb').hide();

            var nicheng = $('._nicheng').val();
            // console.log(nicheng);
            var xingbie = $('.active').html();
            // console.log(xingbie)
            // console.log(imgurl);
            $.ajax({
                url: 'http://localhost:12345/getAccount',
                type: 'get',
                // 发送修改后的用户信息到数据库
                data:{username:username,nicheng:nicheng,xingbie:xingbie,imgurl:imgurl},
                // processData: false,
                // contentType: false,
                success: function(data) {
                    // 保存后,刷新页面
                    window.location.reload();
                }
            })
        
        })

        // 图片上传，图片存入/mulu,上传路径到数据库
        $('#file').on('change',function(){
                $.ajax({
                    url: 'http://localhost:12345/chuan',
                    type: 'POST',
                    cache: false, //不必须
                    data: new FormData($('#uploadForm')[0]),
                    processData: false,
                    contentType: false,
                    success: function(data) {
                        imgurl ='/img/'+data;
                        $('.right .touxiang2').find('img').attr('src',imgurl);
                    }
                })
        })
        
        // 点击取消，回到展示状态
        $('.quxiao').on('click',function(){
            $('.bj').hide();
            $('.bianji').show();
            $('.touxiang3').hide();
            $("._nicheng").hide();
            $('.nicheng').show();
            $('.xb').show();
            $('._xb').hide();

        })


        

        // 页面加载开始定位地理位置
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
        console.log(r.point);
            var geoc = new BMap.Geocoder();                     
            var pt = r.point;
            geoc.getLocation(pt, function(rs){
                var addComp = rs.addressComponents;
                
                console.log(addComp)
                $.ajax({
                    url:'http://localhost:12345/adds',
                    type:'post',
                    data:{username:username,province:addComp.province,city:addComp.city,district:addComp.district},
                    success:function(){

                    }
                })
                
            });       
        },{enableHighAccuracy: true})
        

        // // 获取cookie里的地址
        // var xu_cookies=document.cookie.split('; ')
        //         console.log(cookies)
        //         xu_cookies.forEach(function(item){
        //             var res =item.split('=')
        //             console.log(res);
        //             if(res[0]==='xu_location'){
        //                 xu_location =res[1]
        //                 console.log(xu_location);
        //                 // 写入HTML
        //                 $('#header .top_left').find('a')[2].innerHTML=xu_location;
        //                 $('.xu_dz').html(xu_location);
        //             }
        //         })
                    
    // 点击切换界面
    $('.adds').on('click',function(){
        $('.right_3').hide();
        $('.right_adds').show();
        $(this).css('background','#eee');
        $('.account').css('background','#fff');
        $('.shdz').css('background','#eee');
        $('.zhxx').css('background','#fff');
        $('.addslist ul').show();
        // console.log($('.ren').html())
        // if($('.ren').html()=== ''){
        //             $('.addslist').hide();
        //         }
    })

    $('.account').on('click',function(){

        $('.right_3').show();
        $('.right_adds').hide();
        $(this).css('background','#eee');
        $('.adds').css('background','#fff');
        $('.shdz').css('background','#fff');
        $('.zhxx').css('background','#eee');
    })

    // 新增收货地址
    $('.xinzheng').on('click',function(){

        var user = $('.ren').val()
        var phone = $('.phone').val();
        var dizhi = $('.dizhi').val();
        var youbian = $('.youzheng').val();
        if(user !== '' && phone !=='' && dizhi !== '' &&youbian !==''){
            $('.addslist').show();
            $('.addslist ul').append(`
                <li>
                    <h3 class="ren">${user}</h3>
                    <p class="phone">${phone}</p>
                    
                    
                    <p class="dizhi">${dizhi}</p>
                    <p class="youzheng">${youbian}</p>
                </li>
            `)

            $.ajax({
                        url:'http://localhost:12345/dizhi',
                        type:'POST',
                        data:{username:username,user:user,phone:phone,dizhi:dizhi,youbian:youbian},
                        success:function(data){             
                                 
                        }
            })
        }
        if(user ===''){
            alert('收件人不能为空')
        }else if(phone===''){
            alert('手机号不能为空')
        }else if(dizhi ===''){
            alert('地址不能为空')
        }else if(youbian ===''){
            alert('邮编不能为空')
        }


        
    })


    

        })
    })
})