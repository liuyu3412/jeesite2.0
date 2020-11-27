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
<%--<div class="top">--%>
<%--<div class="fl tab sel" id = "friends">找人</div>--%>
<%--<div class="fl tab sel" id = "groups">找群</div>--%>
<%--<ul class="fl tab tabActive" id="buffer" data-type="friends"></ul>--%>
<%--</div>--%>
<div class="site-demo-button">
    <input type="hidden" id="ctxStatic" value="${ctxStatic}"/>
    <input type="hidden" id="ctx" value="${ctx}"/>
    <input type="hidden" id="socket" value="${fns:getSocket()}"/>
    <div class="layui-inline" style="width: 78%;">
        <input type="text" id="groupName" name="groupName" placeholder="群名称" autocomplete="off" class="layui-input"
               onkeyup="if(this.value.length>20){ this.value=this.value.substring(0,20);$(this).css('borderColor','rgb(230, 230, 230)');layer.msg('输入文字默认不超过20个字符', {icon: 1});}"
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
        <button class="layui-btn layui-btn-normal" data-type="addGroup" style="margin-bottom: 0px;">创 建</button>
    </div>
    <table class="layui-hide" id="findFriends" lay-filter="findFriends"></table>
</div>
<style type="text/css">
    .top {
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

    .fl {
        float: left;
    }

    .tab {
        width: 50%;
    }

    .tabActive {
        border-bottom: 2px solid #169bd5;
        color: #169bd5;
        box-sizing: border-box;
    }

    .sel {
        cursor: pointer;
    }
</style>
<script src="${ctxStatic}/js/layim-v3.7.6/src/layui.js"></script>
<script>
    // 数据库数据结果
    var db;
    // 打开数据库
    var DBOpenRequest = window.indexedDB.open('chatLog');
    // 数据库打开成功后
    DBOpenRequest.onsuccess = function (event) {
        console.log("打开数据库成功")
        // 存储数据结果
        // db = DBOpenRequest.result;
        db = event.target.result;
        // 做其他事情...
    };

    // 数据库打开失败后
    DBOpenRequest.onerror = function (event) {
        console.log("打开数据库失败")
        // 存储数据结果
        // db = DBOpenRequest.result;
        db = event.target.result;
        // 做其他事情...
    };

    // 添加数据，重复添加会更新原有数据
    var putData = function (data, log) {
        db.transaction(log, "readwrite").objectStore(log).put(data);
    }

    //删除某一条记录
    var deleteData = function (key, log) {
        db.transaction(log, "readwrite").objectStore(log).delete(key);
    }

    //更新某个一条记录
    var edit = function (id, data, log) {
        var objectStoreRequest = db.transaction(log, "readwrite").objectStore(log).get(id);
        // 获取成功后替换当前数据
        objectStoreRequest.onsuccess = function (event) {
            // 当前数据
            var myRecord = objectStoreRequest.result;
            if (log == 'friends') {
                myRecord.friends.push(data);
            } else {
                myRecord.groups.push(data);
            }
            var objectStore = db.transaction(log, "readwrite").objectStore(log);
            // 更新数据库存储数据
            objectStore.put(myRecord);
        };
    };

    //查询某条数据相关信息
    var select = function (id, log, callback) {
        var objectStoreRequest = db.transaction(log, "readwrite").objectStore(log).get(id);
        // 获取成功后替换当前数据
        objectStoreRequest.onsuccess = function (event) {

            // 当前数据
            callback(objectStoreRequest.result.friends);
        };
    };


    layui.use(['layim', 'laypage', 'table'], function () {
        var layim = layui.layim
            , layer = layui.layer
            , laytpl = layui.laytpl
            , laypage = layui.laypage;
        //面板外的操作
        var $ = layui.jquery, active = {
            addGroup: function () {
                var mydate = new Date();
                var groupId = "cms" + mydate.getDay() + mydate.getHours() + mydate.getMinutes() + mydate.getSeconds() + mydate.getMilliseconds() + Math.round(Math.random() * 10000);
                if ($('#groupName').val().length > 0) {
                    $.post($('#ctx').val() + '/dljyzx/im/addGroups/',
                        {
                            senderid: $('#socket').val()
                            , name: $('#groupName').val()
                            , groupId: groupId
                        }, function (data) {
                            //示范一个公告层
                            layer.open({
                                type: 1
                                ,
                                title: false //不显示标题栏
                                ,
                                closeBtn: false
                                ,
                                area: '400px;'
                                ,
                                shade: 0.8
                                ,
                                id: 'LAY_layuipro' //设定一个id，防止重复弹出
                                ,
                                btn: ['确认', '取消']
                                ,
                                btnAlign: 'c'
                                ,
                                moveType: 1 //拖拽模式，0或者1
                                ,
                                content: '<div style="padding: 50px; line-height: 0px; background-color: #393D49; color: #fff; font-weight: 300;">是否确认创建[' + $('#groupName').val() + ']？</div>'
                                , yes: function (index, layero) {
                                    data = eval('(' + data + ')');
                                    //增加一个群组
                                    parent.layui.layim.addList({
                                        type: 'group'
                                        , avatar: $('#ctxStatic').val() + "/images/imDefault/weixin.jpg"
                                        , groupname: $('#groupName').val()
                                        , id: groupId
                                        , members: 0
                                    });
                                    parent.layui.ext.init();
                                    putData({
                                        groupId: groupId,
                                        sysAdminId: $('#socket').val(),
                                        friends: {
                                            friendsGroupId: $('#socket').val(),
                                            groupname: $('#groupName').val(),
                                            headImgUrl: $('#ctxStatic').val() + "/images/imDefault/weixin.jpg",
                                            id: groupId
                                        }
                                    }, "groupsLog");
                                    layer.msg('[' + $('#groupName').val() + ']群已创建成功', {
                                        icon: 1
                                        , shade: 0.5
                                    }, function () {
                                        layer.close(index);
                                    });
                                }
                            });

                        }
                    );
                }else{
                    layer.msg('群名不能为空 ^_^!', {
                        icon: 1
                        , shade: 0.5
                    }, function () {
                        layer.close(index);
                    });
                }
            }
        };

        // $('.sel').on('click',function(){
        //     if($(this).attr('id') == 'friends'){
        //         $("#buffer").animate({marginLeft:'0px'});
        //         $("#buffer").attr('data-type','friends');
        //     }else{
        //         $("#buffer").animate({marginLeft:'50%'});
        //         $("#buffer").attr('data-type','groups');
        //     }
        // });
        //绑定click点击事件
        $('.site-demo-button .layui-btn').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
    });
</script>
</body>
</html>
