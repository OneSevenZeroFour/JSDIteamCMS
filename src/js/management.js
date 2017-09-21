require(['config'],function(){   
    require(['jquery'],function(){
        require(['common','../wangEditor-3.0.9/release/wangEditor.min.js'],function(com,E){
            $(".price input").on("input",function(){
                var val = '￥'+$(this).val();
                $(this).siblings('.showprice').text(val);
            })
            $(".sale input").on("input",function(){
                var val = '￥'+$(this).val();
                $(this).siblings('.showsale').text(val);
            })
            
            $('.size button').click(function(){
                var rel = $(this).siblings('input').val();
                if(rel==''){
                    $(this).siblings('input').val('未输入')
                }else{
                    var $span = $('<span/>').text(rel).addClass('selected');
                    $('.showsize').append($span);
                    $(this).siblings('input').val('');
                    $span.click(function(){
                        if($(this).hasClass('selected')){
                            $(this).removeClass('selected');
                        }else{
                            $(this).addClass('selected');
                        }
                    })
                }

            })
            $('.inventory input').on("blur",function(){
                var val = $(this).val();
                if(isNaN(val)){
                    $(this).val("请输入数字")
                }
            })
            $('.imgs .delbtn').click(function(){
                $(this).siblings('img').remove();
            })
            $('.imgfilebtn').click(function(){
                var formData = new FormData();
                var upfiles = $('#imgfile')[0].files;
                console.log(upfiles);
                if(upfiles.length<=0){
                    $('.imgwaring').text('请选择一张图片');
                    return;
                }else if($('.imgbox img').length>=4){
                    $('.imgwaring').text('图片已到上限');
                }else{
                    $('.imgwaring').text('');
                    formData.append('file', upfiles[0]);
                    $.ajax({
                        type:'POST',
                        url:'http://localhost:12345/upload',
                        cache: false, //不必须
                        data: formData,
                        processData: false,
                        contentType: false,
                        success:function(data){
                            $('#imgfile').val('');
                            console.log(data);
                            for(var i=0;i<4;i++){
                                if($('.imgbox li').eq(i).find('img').length==0){
                                    console.log(i);
                                    $('.imgbox li').eq(i).append($('<img/>').attr('src',data));
                                    break;
                                }
                            }
                        }
                    })
                }
                
            })
            var editor = new E('#editor');   editor.create();            
            $('#crimg').change(function(){
                var formData = new FormData();
                var upfiles = $('#crimg')[0].files[0];
                formData.append('file', upfiles);
                console.log(upfiles);
                $.ajax({
                    type:'POST',
                    url:'http://localhost:12345/crimg',
                    cache: false, //不必须
                    data: formData,
                    processData: false,
                    contentType: false,
                    success:function(data){
                        console.log(data);
                        $('#crimg').val('');
                        var img = document.createElement('img');
                        $(img).attr('src',data);
                        editor.txt.append(img);
                        editor.txt.append(img);

                    }
                })
            })
            var typeto = location.search.slice(1).split('=')[0];
            var id = location.search.slice(1).split('=')[1];
            if(typeto=='maxid'){
                 var newid=id;
            }else if(typeto=="id"){
                console.log(666);
                $.ajax({
                    type:'POST',
                    url:"http://localhost:12345/getdetail",
                    data:{
                        id:id
                    },
                    success:function(res){
                        console.log(res);
                        var goods = JSON.parse(res).results;
                        console.log(goods[0]);
                        writein(goods[0],id);
                    }
                })
            }         
            function writein(res,id){
                var title = res.goodtitle;
                $('.title input').val(title);
                var point = res.point;
                $('.intro textarea').val(point);
                var price = res.price;
                $('.price input').val(price);
                $('.showprice').text("￥"+price);
                var sale = res.sale;
                $('.sale input').val(sale);
                $('.showsale').text("￥"+sale);
                var size = res.size;
                if(size!=''&&size!=null){
                    var sizearr=size.split('-');
                        var sizes=sizearr.map(function(itm){
                            return `<span>${itm}</span>`
                        }).join('');
                        $('.showsize').html(sizes);
                        $('.showsize span').addClass('selected');
                        $('.showsize span').click(function(){
                            if($(this).hasClass('selected')){
                                $(this).removeClass('selected');
                            }else{
                                $(this).addClass('selected');
                            }
                        })
                }
                var color = res.color;
                $('.color input').val(color);
                var inventory = res.inventory;
                $('.inventory input').val(inventory);
                var imgurls = res.imgurls;
                for(var i=1;i<=imgurls;i++){
                    var src = "http://localhost:10086/img/"+id+'link('+i+').jpg';
                    var $img = $('<img/>').attr('src',src);
                    $('.imgs li').eq(i-1).append($img);
                }
            }
        })
    })
})

