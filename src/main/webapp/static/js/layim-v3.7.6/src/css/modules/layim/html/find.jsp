<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp" %>
<html>
<head>
    <meta charset="utf-8">
    <title>查找</title>
    <meta name="decorator" content="blank"/>
    <link rel="stylesheet" href="${ctxStatic}/js/layim-v3.7.6/src/css/layui.css">
</head>

<body>
<div class="top">
    <div class="fl tab sel" id = "friends">找人</div>
    <div class="fl tab sel" id = "groups">找群</div>
    <ul class="fl tab tabActive" id="buffer" data-type="friends"></ul>
</div>
<div class="site-demo-button">
    <input type="hidden" id="ctxStatic" value="${ctxStatic}"/>
    <input type="hidden" id="ctx" value="${ctx}"/>
    <input type="hidden" id="socket" value="${fns:getSocket()}"/>

        <div class="layui-inline" style="width: 78%;">
            <input type="text" id="friendName" name="friendName" placeholder="请输入" autocomplete="off" class="layui-input"
                    style="display: block;
                    width: 100%;
                    padding-left: 10px;
                    font-family: inherit;
                    font-size: inherit;
                    font-style: inherit;
                    font-weight: inherit;
                    outline: 0;
                    border-radius: 2px;
                    height: 38px;
                    margin-bottom: 0px;
                    font-size: 100%;">
        </div>
        <div class="layui-input-inline layui-btn-container" style="width: 10%;">
            <button class="layui-btn layui-btn-normal" data-type="selectFriends" style="margin-bottom: 0px;">查  询</button>
        </div>
    <table class="layui-hide" id="findFriends" lay-filter="findFriends"></table>
</div>
<style type="text/css">
    .top{
        left: 0;
        top: 0;
        height: 44px;
        line-height: 44px;
        width: 100%;
        background: #fff;
        color: #666;
        font-size: 16px;
        text-align: center;
        z-index: 10000;
    }
    .fl{
        float: left;
    }
    .tab{
        width: 50%;
    }

    .tabActive {
        border-bottom: 2px solid #169bd5;
        color: #169bd5;
        box-sizing: border-box;
    }
    .sel{
        cursor:pointer;
    }
</style>
<script src="${ctxStatic}/js/layim-v3.7.6/src/layui.js"></script>
<script>
    layui.use(['layim', 'laypage', 'table'], function () {
        var reg = new RegExp("\n","g");
        var layim = layui.layim
            , layer = layui.layer
            , laytpl = layui.laytpl
            , $ = layui.jquery
            , table = layui.table
            , laypage = layui.laypage;

        $('.sel').on('click',function(){
            if($(this).attr('id') == 'friends'){
                $("#buffer").animate({marginLeft:'0px'});
                $("#buffer").attr('data-type','friends');
            }else{
                $("#buffer").animate({marginLeft:'50%'});
                $("#buffer").attr('data-type','groups');
            }
            reload();
        });
        //绑定click点击事件
        $('.site-demo-button .layui-btn').on('click', function(){
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
        table.render({
            elem: '#findFriends'
            , url: $("#buffer").attr('data-type') == 'friends' ? '${ctx}/findFriend/im/find' : '${ctx}/findGroup/im/find'
            , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            , page: true //开启分页
            ,id: 'imFindFriend'
            // ,where:{token: 'sasasas', id: 123}//接口的其它参数
            , request: {
                pageName: 'pageNo' //页码的参数名称，默认：page
                , limitName: 'pageSize' //每页数据量的参数名，默认：limit
            }
            , response: {
                // statusName: 'status' //数据状态的字段名称，默认：code
                // ,statusCode: 200 //成功的状态码，默认：0
                // ,msgName: 'hint' //状态信息的字段名称，默认：msg
                // ,countName: 'total' //数据总数的字段名称，默认：count
                dataName: 'fdata' //数据列表的字段名称，默认：data
            }
            , cols: [[
                {field: 'id', width: 80, title: 'ID', display: 'none', event: 'id'}
                , {field: 'headImgUrl', width: '30%',display: 'none',  title: $("#buffer").attr('data-type') == 'friends' ? '好友头像' : '群头像', event: 'headImgUrl'/*, templet:'<div><img src="{{ d.headImgUrl}}"></div>',style:'height:138px;width:169px;line-height:48px!important;'*/}
                , {field: 'name', width: '100%', title:  $("#buffer").attr('data-type') == 'friends' ? '好友名称' : '群名称', sort: true, event: 'name'}
            ]]
            , done: function (res, pageNo, count) {
                //如果是异步请求数据方式，res即为你接口返回的信息。
                //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                $("[data-field='id']").css('display', 'none');
                $("[data-field='headImgUrl']").css('display', 'none');
            }
        });


        table.on('sort(findFriends)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
            $("[data-field='id']").css('display', 'none');
            $("[data-field='headImgUrl']").css('display', 'none');
            // console.log(obj.field); //当前排序的字段名
            // console.log(obj.type); //当前排序类型：desc（降序）、asc（升序）、null（空对象，默认排序）
            // console.log(this); //当前排序的 th 对象
            //
            // //尽管我们的 table 自带排序功能，但并没有请求服务端。
            // //有些时候，你可能需要根据当前排序的字段，重新向服务端发送请求，从而实现服务端排序，如：
            // table.reload('idTest', {
            //     initSort: obj //记录初始排序，如果不设的话，将无法标记表头的排序状态。 layui 2.1.1 新增参数
            //     ,where: { //请求参数（注意：这里面的参数可任意定义，并非下面固定的格式）
            //         field: obj.field //排序字段
            //         ,order: obj.type //排序方式
            //     }
            // });
        });


        table.on('tool(findFriends)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var buffer_type = $("#buffer").attr('data-type');
            //实际使用时数据由动态获得
            if(buffer_type == 'friends'){

                layim.add({
                    type: 'friend'
                    ,username: data.name
                    ,avatar: data.headImgUrl
                    ,submit: function(group, remark, index){
                        debugger;
                        var maxLength = 50;
                        var mine = parent.layui.layim.cache().mine;
                        //判断字符长度
                        if(remark.replace(/\s/g, '') !== ''){
                            if (remark.length > maxLength) {
                                return layer.msg('内容最长不能超过' + maxLength + '个字符')
                            }
                        }
                        //通知对方
                        $.post('${ctx}/dljyzx/im/addFriend/', {senderid: $('#socket').val(),receiverId: data.id,text: remark.replace(reg," "),headImgUrl: mine.avatar}, function(res){
                            debugger;
                            if(res.code != '00'){
                                // return layer.msg(res.msg);
                            }
                            layer.msg('好友申请已发送，请等待对方确认', {
                                icon: 1
                                ,shade: 0.5
                            }, function(){
                                layer.close(index);
                            });
                        });
                    }
                });
            }else{
                layim.add({
                    type: 'group'
                    ,username: data.name
                    ,avatar: data.headImgUrl
                    ,submit: function(group, remark, index){
                        debugger;
                        var maxLength = 50;
                        var mine = parent.layui.layim.cache().mine;
                        //判断字符长度
                        if(remark.replace(/\s/g, '') !== ''){
                            if (remark.length > maxLength) {
                                return layer.msg('内容最长不能超过' + maxLength + '个字符')
                            }
                        }
                        //通知对方
                        $.post('${ctx}/dljyzx/im/addGroup/', {senderid: $('#socket').val(),groupId:data.id,receiverId: data.userId,text: remark.replace("\n","\r"),headImgUrl: mine.avatar}, function(res){
                            if(res.code != '00'){
                                // return layer.msg(res.msg);
                            }
                            layer.msg('申请已发送，请等待管理员确认', {
                                icon: 1
                                ,shade: 0.5
                            }, function(){
                                layer.close(index);
                            });
                        });
                    }
                });
            }
        });
        //面板外的操作
        $ = layui.jquery, active = {
            //自定义绑定事件 与上述//绑定click点击事件一对，给该div提供绑定接口
            selectFriends: function(){
                reload();
            }
        }


        var reload = function(){
            var friendName = $('#friendName');
            table.reload('imFindFriend', {
                url: $("#buffer").attr('data-type') == 'friends' ? '${ctx}/findFriend/im/find' : '${ctx}/findGroup/im/find'
                , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                , page: true //开启分页
                ,id: 'imFindFriend'
                // ,where:{token: 'sasasas', id: 123}//接口的其它参数
                , request: {
                    pageName: 'pageNo' //页码的参数名称，默认：page
                    , limitName: 'pageSize' //每页数据量的参数名，默认：limit
                }
                , response: {
                    // statusName: 'status' //数据状态的字段名称，默认：code
                    // ,statusCode: 200 //成功的状态码，默认：0
                    // ,msgName: 'hint' //状态信息的字段名称，默认：msg
                    // ,countName: 'total' //数据总数的字段名称，默认：count
                    dataName: 'fdata' //数据列表的字段名称，默认：data
                }
                , cols: [[
                    {field: 'id', width: 80, title: 'ID', display: 'none', event: 'id'}
                    , {field: 'headImgUrl', width: '30%',display: 'none',  title: $("#buffer").attr('data-type') == 'friends' ? '好友头像' : '群头像', event: 'headImgUrl'/*, templet:'<div><img src="{{ d.headImgUrl}}"></div>',style:'height:138px;width:169px;line-height:48px!important;'*/}
                    , {field: 'name', width: '100%', title:  $("#buffer").attr('data-type') == 'friends' ? '好友名称' : '群名称', sort: true, event: 'name'}
                ]]
                ,where: {
                    friendName: friendName.val()
                }
            });
        }
    });
</script>
</body>
</html>
