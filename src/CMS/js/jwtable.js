/* 
* @Author: Marte
* @Date:   2017-09-21 19:20:32
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-22 21:10:13
*/

require.config({
    paths:{
        "jquery":"jquery",
        "amazeui.min":'../assets/js/amazeui.min',
    }
})
require(["jquery","amazeui.min"],function($){
    function je(data,ele){
        var list = JSON.parse(data);
        var total=list.total;
          // console.log(list)
        var html = list.result.map(function(item){
            // console.log(item)
            return `
                <tr>
                    <td><input type="checkbox" /></td>
                    <td class="table-id jw_goods">${item.id}</td>
                    <td class="table-author jw_goods">${item.goodid}</td>
                    <td class="table-title jw_goods">${item.goodtitle}</td>
                    <td class="table-type jw_goods">${item.type}</td>
                    <td class="am-hide-sm-only jw_goods">${item.price}</td>
                    <td class="am-hide-sm-only jw_goods">${item.rabate}</td>
                    <td class="am-hide-sm-only jw_goods">${item.sale}</td>
                    <td class="am-hide-sm-only jw_goods">${item.color}</td>
                    <td class="am-hide-sm-only jw_goods">${item.inventory}</td>
                    <td class="jw_goods">
                      <div class="am-btn-toolbar">
                        <div class="am-btn-group am-btn-group-xs">
                          <button class="am-btn am-btn-default am-btn-xs am-text-secondary jw_bjbtn" data-goodid="${item.goodid}"><span class="am-icon-pencil-square-o"></span> 编辑</button>
                          <button class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only jw_sc" data-guid="${item.id}"><span class="am-icon-trash-o"></span> 删除</button>
                        </div>
                      </div>
                    </td>
                </tr> 
            `
        }).join("")
        
        // console.log(html)
        $(ele).html("");
        $(ele).html(html);
        $(".totalnumber").html(total)
    }
     // 获取种类  
    $.ajax({
        type:"POST",
        url:"http://localhost:12345/jw_selecttype",
        success:function(data){
            var arr_type=JSON.parse(data).results;

            console.log(arr_type)
           var html_op=arr_type.map(function(item){
                return `
                      <option value="${item.type}">${item.type}</option>
                `
            })
           $("#jw_types").append(html_op)
        }
    }) 
  // 获取分类值()
    var val_sel_op;
    var maxid;
    var search_val;
    var options=$("#jw_types option:selected");
    val_sel_op=options.text()
    search_val=$('#myInput').val();
      console.log(val_sel_op)
    var jw_types=document.querySelector("#jw_types")
      // 点击页码
    var pageNo=1;
    var qty=20;
    var datas;
    var posts;
    if(search_val!=""){
          datas={pageNo:pageNo,qty:qty,type:val_sel_op,search_val:search_val};
          posts='jw_search';
        }else{
          datas={pageNo:pageNo,qty:qty,type:val_sel_op};
          posts='jw_select';
        }
    $.ajax({
            type:"POST",
            data:datas, 
            url:"http://localhost:12345/"+posts,
            success:function(data){
            // allid=JSON.parse(data).total;
            // console.log(allid)
            je(data,"#list")
            // 页码
            $('.page').html("");
            var list = JSON.parse(data);
            var total=list.total;
            $(".totalnumber").html(total)
            for(var i=1;i<=Math.ceil(total/qty);i++){
                $('<li class="fl"></li>').append($("<span></span>").text(i)).appendTo($('.page'));     
            }
            $(".page li").eq(0).addClass('active');
            }
    })   
    // 获取最大id的请求
    $.ajax({
        type:"POST",
        url:"http://localhost:12345/jw_id",
        success:function(data){
            // console.log(888)
            maxid=data[0].id
            
        }
    })
       // 筛选改变时发送请求
    jw_types.onchange=function(){
        var options=$("#jw_types option:selected");
        val_sel_op=options.text();
        search_val=$('#myInput').val();
        var datas;
        var posts;
        // console.log(val_sel_op)
        if(search_val!=""){
          datas={pageNo:pageNo,qty:qty,type:val_sel_op,search_val:search_val};
          posts='jw_search';
        }else{
          datas={pageNo:pageNo,qty:qty,type:val_sel_op};
          posts='jw_select';
        }
        $.ajax({
            type:"POST",
            data:datas, 
            url:"http://localhost:12345/"+posts,
            success:function(data){
            // console.log(data)
                je(data,"#list")
          // 页码
                $('.page').html("");
                var list = JSON.parse(data);
                var total=list.total;
                $(".totalnumber").html(total)
                for(var i=1;i<=Math.ceil(total/qty);i++){
                    $('<li class="fl"></li>').append($("<span></span>").text(i)).appendTo($('.page'));     
                }
              $(".page li").eq(0).addClass('active');
            }

        })
    }
      // 点击页码发送请求
    $(".page").on("click","li span",function(){
        pageNo=$(this).text()*1;
        // options=$("#jw_types option:selected");
        // val_sel_op=options.text();
        // search_val=$('#myInput').val();
        console.log(pageNo,qty);
        var datas;
        var posts;
        console.log(search_val)
        if(search_val!=""){
          datas={pageNo:pageNo,qty:qty,type:val_sel_op,search_val:search_val};
          posts='jw_search';
        }else{
          datas={pageNo:pageNo,qty:qty,type:val_sel_op};
          posts='jw_select';
        }
        $.ajax({
          type:"POST",
          data:datas, 
          url:"http://localhost:12345/"+posts,
          success:function(data){
            je(data,"#list")
            $(".page li").eq(pageNo-1).addClass('active').siblings().removeClass('active') 
          }
        })
        var scrollTop = $(".admin-content").scrollTop();
        // console.log(scrollTop)
            $('.admin-content').stop().animate({'scrollTop':0},400); 
    })
    //下一页
   
    $(".am-pagination").on("click",".jw_nextpage",function(){
        if(pageNo>=$(".page li").length){
            return false
        }
        pageNo=$(".active").text();
        console.log(pageNo)
        pageNo++;
        var datas;
        var posts;
        console.log(search_val)
        if(search_val!=""){
          datas={pageNo:pageNo,qty:qty,type:val_sel_op,search_val:search_val};
          posts='jw_search';
        }else{
          datas={pageNo:pageNo,qty:qty,type:val_sel_op};
          posts='jw_select';
        }
        $.ajax({
          type:"POST",
          data:datas, 
          url:"http://localhost:12345/"+posts,
          success:function(data){
            je(data,"#list")
            $(".page li").eq(pageNo-1).addClass('active').siblings().removeClass('active') 
          }
        })
        var scrollTop = $(".admin-content").scrollTop();
        // console.log(scrollTop)
            $('.admin-content').stop().animate({'scrollTop':0},400); 
    })

    //上一页
    $(".am-pagination").on("click",".jw_prepage",function(){
        if(pageNo==1){
            return false
        }
        pageNo=$(".active").text();
        console.log(pageNo)
        pageNo--;
        var datas;
        var posts;
        console.log(search_val)
        if(search_val!=""){
          datas={pageNo:pageNo,qty:qty,type:val_sel_op,search_val:search_val};
          posts='jw_search';
        }else{
          datas={pageNo:pageNo,qty:qty,type:val_sel_op};
          posts='jw_select';
        }
        $.ajax({
          type:"POST",
          data:datas, 
          url:"http://localhost:12345/"+posts,
          success:function(data){
            je(data,"#list")
            $(".page li").eq(pageNo-1).addClass('active').siblings().removeClass('active') 
          }
        })
        var scrollTop = $(".admin-content").scrollTop();
        // console.log(scrollTop)
            $('.admin-content').stop().animate({'scrollTop':0},400); 
    })
      // 删除按钮
    $('#list').on("click",".jw_sc",function(){
        console.log(9999)
        var id=$(this).attr('data-guid');
        $(this).closest("tr").remove()
        console.log($(this))
        console.log(id)
            $.ajax({
            type:"POST",
            url:"http://localhost:12345/jw_delete",
            data: {
                id:id,
              },
        success:function(data){

            // $("totalnumber").html(total)
        }
        })        
    })
      // 编辑按钮 
    $("#list").on("click",".jw_bjbtn",function(){
        // console.log(666)
        var goodid=$(this).attr('data-goodid');
        console.log(goodid)
        window.location.href = `/html/management.html?id=${goodid}`;
    })
      // 新增按钮
    $(".jw_add").on("click",function(){
        window.location.href = `/html/management.html?maxid=${maxid}`;
    })
      // 模糊搜索
    $('.jw_search').click(function(){
        var options=$("#jw_types option:selected");
        search_val=$('#myInput').val();
        console.log(search_val)
        val_sel_op=options.text()
        $.ajax({
            type:"POST",
            data:{pageNo:1,qty:qty,type:val_sel_op,search_val:search_val}, 
            url:"http://localhost:12345/jw_search",
            success:function(data){
            je(data,"#list")
          // 页码
            $('.page').html("");
            var list = JSON.parse(data);
            var total=list.total;
            $(".totalnumber").html(total)
            for(var i=1;i<=Math.ceil(total/qty);i++){
                $('<li class="fl"></li>').append($("<span></span>").text(i)).appendTo($('.page'));     
            }
            $(".page li").eq(0).addClass('active');
            }
        })
        
    })

})
