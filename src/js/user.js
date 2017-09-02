require(['config'],function(){
    require(['jquery'],function(){
        require(['common'],function(com){
            //获取链入参数确定是注册或者登录
            var type = location.search.slice(1).split('=')[1];
            //用户登录页面
            function userLogin(){
                $('.login').show();
                $('.register').hide();
                //免登陆按钮
                var $loginmdl=$('.login .last .loginmdl');
                $loginmdl.click(function(){console.log(this);
                    $(this).toggleClass('active');
                })
            }
            //用户注册页面
            function userRegister(){
                $('.login').hide();
                $('.register').show();
                //是否发送邮件按钮
                var $getemail = $('.register .getemail i');
                $getemail.click(function(){
                    $(this).toggleClass('active');
                })
                //生成验证码
                $('.register .vCodeshow').text(com.vCode()).css({color:com.randomColor(),'text-align':'center','line-height':'28px'});
                $('.register .vCodeshow').click(function(){
                    $(this).text(com.vCode()).css({color:com.randomColor()});;
                })
                //验证是否是手机号或者邮箱
                var nametype;
                $('#username').blur(function(){
                    var username = $('#username').val();
                    console.log(username);
                    var reg1 =/^1[34578]\d{9}$/;
                    var reg2 =/^[\w\-\.]+@[\da-z\-]+(\.[a-z]{2,}){1,2}$/i;
                    if(reg1.test(username)){
                        nametype = 'phone';
                        $('#username').siblings('.test').text('');
                        $('.vCodeLi').hide().siblings('.phoneCodeLi').show();
                    }else if(reg2.test(username)){
                        nametype = 'email';
                        $('#username').siblings('.test').text('');
                        $('.phoneCodeLi').hide().siblings('.vCodeLi').show();
                    }else{
                        $('#username').siblings('.test').text('请输入正确的手机号或者邮箱');
                    }
                })
                //验证密码是否符合规范
                //设置输入框上限
                $('#password').attr({maxlength:"19"});
                $('#password').on('input',function(){
                    var password = $('#password').val();
                    var reg1 = /^[^><\s]{6,19}$/;
                    if(password.length<6){
                        $('#password').siblings('.test').text('密码长度不能少于6位');
                    }else if(password.length>=6 && reg1.test(password)){
                        $('#password').siblings('.test').text('');
                    }else{
                        $('#password').siblings('.test').text('密码不能包含非法字符');
                        return;
                    }
                    //根据输入的值判断密码强度
                    //纯数字
                    var reg2 = /\d+/;
                    //字母
                    var reg3 = /[a-zA-Z]+/;
                    //特殊字符
                    var reg4 = /[~!@#\$%^&*\(\)\{\};,.\?\/'"_\-]/;
                    var arrReg = [reg2,reg3,reg4];
                    var num=0;
                    $('.passwordQD span').eq(num).addClass('qd').siblings().removeClass('qd');
                    for(var i=0;i<3;i++){
                        if(arrReg[i].test(password)) num++;
                    }
                    //判断密码强弱
                    if(password.length>=6){
                        if(num==1){
                            $('#password').siblings('.test').text('密码较弱建议设置多种组合的密码');
                            $('.passwordQD span').eq(0).addClass('qd').siblings().removeClass('qd');
                        }else if(num==2){
                            $('#password').siblings('.test').text('');
                            $('.passwordQD span').eq(2).removeClass('qd').siblings().addClass('qd');
                        }else if(num==3){
                            $('#password').siblings('.test').text('');
                            $('.passwordQD span').addClass('qd');
                        }
                    }
                })
                //注册按钮点击注册
            }
            // 根据传来的参数决定显示注册页面还是登录页面
            if(type=='login'){
                userLogin();
            }else if(type=='register'){
                userRegister();
            }
            
            //底部图片hover事件
            var $spans = $('#footer ul li a span');
            var $links = $('#footer ul li');
            for(var i=0;i<$spans.length;i++){
                $spans.eq(i).css({'background-position':'-370px -'+i*40+'px'});
            }
            $links.hover(function(){
                var idx = $(this).index();
                $(this).find('span').css({'background-position':'-430px -'+idx*40+'px'});
            },function(){
                var idx = $(this).index();
                $(this).find('span').css({'background-position':'-370px -'+idx*40+'px'});
            })

        })
    })  
})