/* 
* @Author: Marte
* @Date:   2017-09-20 10:30:21
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-21 21:11:12
*/

require(['config'],function(){   
    require(['jquery'],function(){


        $('#header').load('/html/header.html');
        $('#footer').load('/html/footer.html');
        // 引入头尾部
        // 进入页面加载数据
        require(['base'],function(){


        var username;
        var cookies=document.cookie.split('; ')
                console.log(cookies)
                cookies.forEach(function(item){
                    var res =item.split('=')
                    if(res[0]==='prusername'){
                        username =res[1]
                        console.log(username);
                    }
                })

        var imgurl;
        console.log(username)
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


                // if(username !==''){
                //     // $('#header .top_left').find('img').hide();
                //     // $('#header .top_left').find('a')[0].style.display='none';
                //     // $('#header .top_left').find('a')[1].onmouseover=function(){
                //     //     $('.ledgerlist')[0].style.display="block";
                //     //     console.log($('.ledgerlist'))
                //     // }
                // }

              

            }
        })

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
        
        
        var imgurl;
        $('.baocun').on('click',function(){
            $('.bj').hide();
            $('.bianji').show();
            $('.touxiang3').hide();
            $("._nicheng").hide();
            $('.nicheng').show();
            $('.xb').show();
            $('._xb').hide();

            var nicheng = $('._nicheng').val();
            console.log(nicheng);
            var xingbie = $('.active').html();
            console.log(xingbie)
            console.log(imgurl);
            $.ajax({
                url: 'http://localhost:12345/getAccount',
                type: 'get',
                data:{username:username,nicheng:nicheng,xingbie:xingbie,imgurl:imgurl},
                // processData: false,
                // contentType: false,
                success: function(data) {
                    
                }
            })
        
        })

        $('#file').on('change',function(){
                $.ajax({
                    url: 'http://localhost:12345/chuan',
                    type: 'POST',
                    cache: false, //不必须
                    data: new FormData($('#uploadForm')[0]),
                    processData: false,
                    contentType: false,
                    success: function(data) {
                        imgurl ='/js/mulu/'+data;
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


        // 页面加载开始定位地理位置，并上传到数据库
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
                    type:'POST',
                    data:{username:username,province:addComp.province,city:addComp.city,district:addComp.district},
                    success:function(data){
                        
                        console.log(data);
                        // $('.qy').find('div')[1].innerHTML = data.province;
                             
                    }
                })
                $('.xu_dz').html(addComp.city+addComp.district);
            });       
        },{enableHighAccuracy: true})
             
    // 点击切换界面
    $('.adds').on('click',function(){
        $('.right_3').hide();
        $('.right_adds').show();
        $(this).css('background','#eee');
        $('.account').css('background','#fff');
    })
    $('.account').on('click',function(){
        $('.right_3').show();
        $('.right_adds').hide();
        $(this).css('background','#eee');
        $('.adds').css('background','#fff');
    })


    // 新增收货地址
    $('.xinzheng').on('click',function(){
        var user = $('.ren').val()
        var phone = $('.phone').val();
        var dizhi = $('.dizhi').val();
        var youbian = $('.youzheng').val();
        $.ajax({
                    url:'http://localhost:12345/dizhi',
                    type:'POST',
                    data:{username:username,user:user,phone:phone,dizhi:dizhi,youbian:youbian},
                    success:function(data){

                             
                    }
        })
    })

        })
    })
})