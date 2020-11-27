<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>消息盒子</title>

    <link rel="stylesheet" href="../../../layui.css?v=1">
    <style>
        .layim-msgbox {
            margin: 15px;
        }

        .layim-msgbox li {
            position: relative;
            margin-bottom: 10px;
            padding: 0 130px 10px 60px;
            padding-bottom: 10px;
            line-height: 22px;
            border-bottom: 1px dotted #e2e2e2;
        }

        .layim-msgbox .layim-msgbox-tips {
            margin: 0;
            padding: 10px 0;
            border: none;
            text-align: center;
            color: #999;
        }

        .layim-msgbox .layim-msgbox-system {
            padding: 0 10px 10px 10px;
        }

        .layim-msgbox li p span {
            padding-left: 5px;
            color: #999;
        }

        .layim-msgbox li p em {
            font-style: normal;
            color: #FF5722;
        }

        .layim-msgbox-avatar {
            position: absolute;
            left: 0;
            top: 0;
            width: 50px;
            height: 50px;
        }

        .layim-msgbox-user {
            padding-top: 5px;
        }

        .layim-msgbox-content {
            margin-top: 3px;
        }

        .layim-msgbox .layui-btn-small {
            padding: 0 15px;
            margin-left: 5px;
        }

        .layim-msgbox-btn {
            position: absolute;
            right: 0;
            top: 12px;
            color: #999;
        }
    </style>
</head>
<body>
<input type="hidden" id="socket" value="${fns:getSocket()}"/>
<input type="hidden" id="ctxStatic" value="${ctxStatic}"/>
<ul class="layim-msgbox" id="LAY_view"></ul>

<textarea title="消息模版" id="LAY_tpl" style="display:none;">
{{# layui.each(d.data, function(index, item){
  if(item.from){ }}
    <li data-uid="{{ item.from }}" data-fromGroup="{{ item.from_group }}" data-index="{{ index }}"
        data-groupName="{{item.group_name}}"
        data-groupFriend="{{item.group_friend}}"
        data-groupId="{{ item.group_id }}">
      <%--<a href="/u/{{ item.from }}/" target="_blank">--%>
      <a target="_blank">
        <img src="{{ item.user.avatar }}" class="layui-circle layim-msgbox-avatar">
      </a>
      <p class="layim-msgbox-user">
        <%--<a href="/u/{{ item.from }}/" target="_blank">{{ item.user.username||'' }}</a>--%>
      <a target="_blank">{{ item.user.username||'' }}</a>
        <span>{{ item.time }}</span>
      </p>
      <p class="layim-msgbox-content">
        {{ item.content }} 
        <span>{{ item.remark ? '附言: '+item.remark : '' }}</span>
      </p>
      <p class="layim-msgbox-btn">
          {{# if(item.status === 0) { }}
        <button class="layui-btn layui-btn-small" data-type="agree">同意</button>
        <button class="layui-btn layui-btn-small layui-btn-primary" data-type="refuse">拒绝</button>
          {{# } else if(item.status === 1){ }}
          已同意
          {{# } else { }}
           已拒绝
          {{# }}}
      </p>
    </li>
  {{# } else { }}
    <li class="layim-msgbox-system">
      <p><em>系统：</em>{{ item.content }}<span>{{ item.time }}</span></p>
    </li>
  {{# }
}); }}
</textarea>

<script src="${ctxStatic}/jquery/jquery-1.8.3.min.js" type="text/javascript"></script>
<script src="../../../../layui.js?v=1"></script>
<script>
    //config的设置是全局的
    layui.config({
        base: $("#ctxStatic").val() + '/js/layim-v3.7.6/' //假设这是你存放拓展模块的根目录
    }).extend({ //设定模块别名
        ext: 'socket' //如果 mymod.js 是在根目录，也可以不用设定别名
    });

    layui.use(['layim', 'flow', 'ext'], function () {
        var layim = layui.layim
            , layer = layui.layer
            , laytpl = layui.laytpl
            , $ = layui.jquery
            , flow = layui.flow;
        var cache = {}; //用于临时记录请求到的数据
        var localData = layui.data($('#socket').val())[$('#socket').val()]; //获取当前用户本地数据
        layui.data('count' + $('#socket').val(), {key: 'count' + $('#socket').val(), value: 0});//页面打开 清除计数器
        //请求消息
        var renderMsg = function (page, callback) {
            if (typeof(localData) != "undefined") {
                if (typeof (localData.spread0) != 'undefined' && localData.spread0 == 'true') {
                    localData = [];
                }
            } else {
                localData = [];
            }
            var res = {
                "code": 0,
                "pages": 1,
                "data": localData
            }
            //记录来源用户信息
            layui.each(res.data, function (index, item) {
                cache[item.from] = item.user;

            });

            callback && callback(res.data, 1);
            /**
             * 数据过多清除部分数据
             */

            if (localData.length > 40) {
                layui.data($('#socket').val(), {key: $('#socket').val(), value: localData.slice(0, 20)});
            }
            // });
        };

        //消息信息流
        flow.load({
            elem: '#LAY_view' //流加载容器
            , isAuto: false
            // , end: '<li class="layim-msgbox-tips">暂无更多新消息</li>'
            , done: function (page, next) { //加载下一页
                renderMsg(page, function (data, pages) {
                    var html = laytpl(LAY_tpl.value).render({
                        data: data
                        , page: page
                    });
                    next(html, page < pages);
                });
            }
        });

        //打开页面即把消息标记为已读

        // $.post('/message/read', {
        //   type: 1
        // });

        //操作
        var active = {
            //同意
            agree: function (othis) {
                debugger;
                var li = othis.parents('li')
                    , uid = li.data('uid')
                    , from_group = li.data('fromgroup')
                    , groupId = li.data("groupid")
                    , groupFriend = li.data("groupfriend")
                    , localIndex = li.data("index")
                    , groupName = li.data("groupname")
                    , user = cache[uid];
                if (groupId != null && groupId != 0) {
                    parent.layer.open({
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
                        content: '<div style="padding: 50px; line-height: 0px; background-color: #393D49; color: #fff; font-weight: 300;">是否同意加入['+groupName+']群组？</div>'
                        ,yes: function (group, index) {
                            //实际部署时，请开启下述注释，并改成你的接口地址
                            var mine = parent.layui.layim.cache().mine;
                            $.post('${ctx}/dljyzx/im/addGroupConfirm', {
                                receiverId: user.id //对方用户ID
                                , senderid: $('#socket').val()
                                , type: 1
                                , senderName: user.username
                                , headImgUrl: mine.avatar
                                , text: ''
                                , groupName: groupName
                                , checkCode: user.checkCode
                                // , from_group: from_group //对方设定的好友分组
                                // , group: group //我设定的好友分组
                                , groupId: groupId
                            }, function (res) {
                                var mesData = eval('(' + res + ')');
                                if (mesData.code != '00') {
                                    return layer.msg(mesData.text);
                                }
                                if (groupFriend != 1) {
                                    //将好友追加到主面板
                                    parent.layui.layim.addList({
                                        type: 'friend'
                                        , avatar: user.avatar //好友头像
                                        , username: user.username //好友昵称
                                        , groupid: group //所在的分组id
                                        , id: user.id //好友ID
                                        , sign: user.sign //好友签名
                                    });
                                }
                                parent.layer.close(group);
                                parent.layui.ext.init(); //更新右键点击事件
                                othis.parent().html('已同意');
                                var indexLocal = localData[localIndex];
                                indexLocal["status"] = 1;
                                localData[localIndex] = indexLocal;
                                //向localStorage同步数据
                                layui.data($('#socket').val(), {key: $('#socket').val(), value: localData});
                            });
                        }
                    });
                } else {
                    //选择分组
                    parent.layui.layim.setFriendGroup({
                        type: 'friend'
                        , username: user.username
                        , avatar: user.avatar
                        , group: parent.layui.layim.cache().friend //获取好友分组数据
                        , submit: function (group, index) {
                            //实际部署时，请开启下述注释，并改成你的接口地址
                            var mine = parent.layui.layim.cache().mine;
                            $.post('${ctx}/dljyzx/im/addFriendConfirm', {
                                receiverId: user.id //对方用户ID
                                , senderid: $('#socket').val()
                                , type: 1
                                , senderName: user.username
                                , headImgUrl: mine.avatar
                                , text: ''
                                , checkCode: user.checkCode
                                , from_group: from_group //对方设定的好友分组
                                , group: group //我设定的好友分组
                                , groupId: groupId
                            }, function (res) {
                                var mesData = eval('(' + res + ')');
                                if (mesData.code != '00') {
                                    return layer.msg(mesData.text);
                                }
                                if (groupFriend != 1) {
                                    //将好友追加到主面板
                                    parent.layui.layim.addList({
                                        type: 'friend'
                                        , avatar: user.avatar //好友头像
                                        , username: user.username //好友昵称
                                        , groupid: group //所在的分组id
                                        , id: user.id //好友ID
                                        , sign: user.sign //好友签名
                                    });
                                }
                                parent.layer.close(index);
                                parent.layui.ext.init(); //更新右键点击事件
                                othis.parent().html('已同意');
                                var indexLocal = localData[localIndex];
                                indexLocal["status"] = 1;
                                localData[localIndex] = indexLocal;
                                //向localStorage同步数据
                                layui.data($('#socket').val(), {key: $('#socket').val(), value: localData});
                            });
                        }
                    });
                }
            }

            //拒绝
            , refuse: function (othis) {
                var li = othis.parents('li')
                    , uid = li.data('uid')
                    , from_group = li.data('fromgroup')
                    , groupId = li.data("groupid")
                    , groupFriend = li.data("groupfriend")
                    , localIndex = li.data("index")
                    , groupName = li.data("groupname")
                    , user = cache[uid];

                layer.confirm('确定拒绝吗？', function (index) {
                    var url;
                    if (groupId != null && groupId != 0) {
                        url = '${ctx}/dljyzx/im/addGroupConfirm';
                    } else {
                        url = '${ctx}/dljyzx/im/addFriendConfirm';
                    }
                    $.post(url, {
                        receiverId: user.id //对方用户ID
                        , senderid: $('#socket').val()
                        , type: 2
                        , senderName: user.username
                        , headImgUrl: user.avatar
                        , text: ''
                        , groupName: groupName
                        , checkCode: user.checkCode
                        // , from_group: from_group //对方设定的好友分组
                        // , group: group //我设定的好友分组
                    }, function (res) {
                        var mesData = eval('(' + res + ')');
                        if (mesData.code != '00') {
                            return layer.msg(mesData.msg);
                        }
                        layer.close(index);
                        othis.parent().html('<em>已拒绝</em>');
                        var indexLocal = localData[localIndex];
                        indexLocal["status"] = 2;
                        localData[localIndex] = indexLocal;
                        //向localStorage同步数据
                        layui.data($('#socket').val(), {key: $('#socket').val(), value: localData});
                    });
                });
            }
        };

        $('body').on('click', '.layui-btn', function () {
            var othis = $(this), type = othis.data('type');
            active[type] ? active[type].call(this, othis) : '';
            layui.ext.init(); //更新右键点击事件
        });
    });
</script>
</body>
</html>
