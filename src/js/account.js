/* 
* @Author: Marte
* @Date:   2017-09-20 10:30:21
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-20 21:11:08
*/

require(['config'],function(){   
    require(['jquery'],function(){

        $('#header').load('/html/header.html');
        $('#footer').load('/html/footer.html');
        // 引入头尾部
        // 
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

            $.ajax({
                url: 'http://localhost:12345/getAccount',
                type: 'POST',
                data:{nicheng:'1',xingbie:2},
                processData: false,
                contentType: false,
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
                        console.log(data);
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

             


    })
})