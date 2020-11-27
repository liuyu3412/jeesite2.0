//config的设置是全局的
layui.config({
    base: $("#ctxStatic").val() + '/js/layim-v3.7.6/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
    ext: 'socket' //如果 mymod.js 是在根目录，也可以不用设定别名
});

// 数据库数据结果d
var db;
// 打开数据库
var DBOpenRequest = window.indexedDB.open('chatLog');
// 数据库打开成功后
DBOpenRequest.onsuccess = function(event) {
    console.log("打开数据库成功")
    // 存储数据结果
    // db = DBOpenRequest.result;
    db = event.target.result;
    // 做其他事情...
};

// 数据库打开失败后
DBOpenRequest.onerror = function(event) {
    console.log("打开数据库失败")
    // 存储数据结果
    // db = DBOpenRequest.result;
    db = event.target.result;
    // 做其他事情...
};

// 数据库升级了
// 下面事情执行于：数据库首次创建版本，或者window.indexedDB.open传递的新版本（版本数值要比现在的高）
DBOpenRequest.onupgradeneeded = function(event) {
    // 通常对主键，字段等进行重定义，具体参见demo
    var db = event.target.result;
    if(!db.objectStoreNames.contains("friendsLog")){
        // 创建一个数据库存储对象
        var friends = db.createObjectStore('friendsLog', {
            keyPath: 'friendId'
        });
        friends.createIndex('friendId', 'friendId');
    }else{
        return "friendsLog同名存储空间已经存在！"
    }

    if(!db.objectStoreNames.contains("groupsLog")){

        // 创建一个数据库存储对象
        var groups = db.createObjectStore('groupsLog', {
            keyPath: 'groupId'
        });
        groups.createIndex('groupId', 'groupId');
    }else{
        return "groupsLog同名存储空间已经存在！"
    }

    if(!db.objectStoreNames.contains("groupFriends")){
        // 创建一个数据库存储对象
        var groupFriends = db.createObjectStore('groupFriends', {
            keyPath: 'friendsId'
        });
        // 定义存储对象的数据项
        groupFriends.createIndex('friendsId', 'friendsId');
    }else{
        return "friendsList同名存储空间已经存在！"
    }

};

// 添加数据，重复添加会更新原有数据
var putData =  function(data,log){
    db.transaction(log, "readwrite").objectStore(log).put(data);
}
//删除某一条记录
var deleteData = function(key,log) {
    db.transaction(log, "readwrite").objectStore(log).delete(key);
}

//更新某个一条记录
var edit = function(id,data,log) {
    var objectStoreRequest = db.transaction(log, "readwrite").objectStore(log).get(id);
    // 获取成功后替换当前数据
    objectStoreRequest.onsuccess = function(event) {
        // 当前数据
        var myRecord = objectStoreRequest.result;
        if(log == 'friends'){
            myRecord.friends.push(data);
        }else{
            myRecord.groups.push(data);
        }
        var objectStore = db.transaction(log, "readwrite").objectStore(log);
        // 更新数据库存储数据
        objectStore.put(myRecord);
    };
};
//查询某条数据相关信息
var select = function(id,log,callback) {
    var objectStoreRequest = db.transaction(log, "readwrite").objectStore(log).get(id);
    // 获取成功后替换当前数据
    objectStoreRequest.onsuccess = function(event) {

        // 当前数据
        callback(objectStoreRequest.result.friends);
    };
};

var msgMesssage = 0;
var socket = "";
var GroupFriends = function () {
    // localStorage.removeItem('groupFriends');
    $.post($('#ctx').val() + '/dljyzx/im/myGroupsFriends/', {}, function (data) {
        for(var i = 0;i<data.length;i++){
            putData(data[i],'groupFriends');
        }
    });
}
var groupsList = function () {
    $.post($('#ctx').val() + '/dljyzx/im/groupsList/', {}, function (data) {
        for(var i = 0;i<data.length;i++){
            putData(data[i],'groupsLog');
        }
    });
}
layui.use(['layim', 'ext'], function (layim) {
    //初始化群员信息
    GroupFriends();
    //初始化群
    groupsList();
    // 新建一个事务并打开存储对象，添加到数据对象中
    // putData(newItem);
    // deleteData('cms5151386111040','groupsLog');
    // edit('108101',{avatar:"//res.layui.com/images/fly/avatar/00.jpg"
    //     ,content:"1122"
    //     ,id:"108101"
    //     ,mine:true
    //     ,timestamp:1529984169781
    //     ,type:"friend"
    //     ,username:"纸飞机"})
    //基础配置
    layim.config({

        //初始化接口
        init: {
            url: $('#ctx').val() + '/dljyzx/im/initList'
            , data: {}
        }

        //查看群员接口
        , members: {
            url: $('#ctx').val() + '/dljyzx/im/members'
            , data: {'id': $(this)}
        }

        //上传图片接口
        , uploadImage: {
            url: $('#imUpdateFilePath').val() + 'im/uploadFile' //（返回的数据格式见下文）
            , type: 'post' //默认post
        }

        //上传文件接口
        , uploadFile: {

            url: $('#imUpdateFilePath').val() + 'im/uploadFile' //（返回的数据格式见下文）
            , type: 'post' //默认post
            , enctype: 'multipart/form-data'
            , done: function (res) {
                //上传完毕回调
                console.log(res);
            }
            , error: function () {
                //请求异常回调
            }
        }

        , isAudio: false //开启聊天工具栏音频
        , isVideo: false //开启聊天工具栏视频


        //,brief: true //是否简约模式（若开启则不显示主面板）
        , title: 'IM即时通讯' //自定义主面板最小化时的标题
        // ,right: '100px' //主面板相对浏览器右侧距离
        // ,minRight: '90px' //聊天面板最小化时相对浏览器右侧距离
        , initSkin: '2.jpg' //1-5 设置初始背景
        //,skin: ['aaa.jpg'] //新增皮肤
        // ,isfriend: false //是否开启好友
        // ,isgroup: false //是否开启群组
        //,min: true //是否始终最小化主面板，默认false
        , notice: true //是否开启桌面消息提醒，默认false
        // , voice: true //声音提醒，默认开启，声音文件为：default.mp3
        , copyright: true
        // ,maxLength: 50
        , msgbox: layui.cache.dir + 'css/modules/layim/html/msgbox.jsp' //消息盒子页面地址，若不开启，剔除该项即可
        , find: layui.cache.dir + 'css/modules/layim/html/find.jsp' //发现页面地址，若不开启，剔除该项即可
        , groupfind: layui.cache.dir + 'css/modules/layim/html/groupfind.jsp' //发现页面地址，若不开启，剔除该项即可
        // ,chatLog: layui.cache.dir + 'css/modules/layim/html/chatlog.jsp' //聊天记录页面地址，若不开启，剔除该项即可


    });
    //监听在线状态的切换事件
    layim.on('online', function (data) {
        var mine = layim.cache().mine;
        if (data == 'hide') {
            layim.setFriendStatus(mine.id, 'offline');
            socket.close();
            layer.msg('隐身', {
                icon: 1
            });

        } else {
            layim.setFriendStatus(mine.id, 'online');
            socket = new WebSocket($('#imWebSocket').val() + '/im/' + $('#socket').val() + "/" + $('#socketDate').val());
            //重新二次加载
            layimInit(socket);
            layer.msg('在线', {
                icon: 1
            });
        }
    });

    //监听签名修改
    layim.on('sign', function (value) {
        console.log(value);
    });


    //建立WebSocket通讯
    //注意：如果你要兼容ie8+，建议你采用 socket.io 的版本。下面是以原生WS为例

    //监听layim建立就绪
    layim.on('ready', function (res) {
        layui.ext.init(); //更新右键点击事件
        socket = new WebSocket($('#imWebSocket').val() + '/im/' + $('#socket').val() + "/" + $('#socketDate').val());
        layimInit(socket);
        socket.onclose = function (res) {
            var message = eval('(' + res.data + ')');
        };
    });


    var layimInit = function(socket){
        //默认第一次情况点亮记录
        localStorage.removeItem('history');
        //监听添加列表的socket事件，假设你服务端emit的事件名为：addList
        socket.onmessage = function (res) {
            var reg = new RegExp("/n","g");
            var cache = layui.layim.cache();
            var mine = cache.mine;
            var message = eval('(' + res.data + ')');
            var localData = layui.data($('#socket').val())[$('#socket').val()]; //获取当前用户本地数据
            var localCount = layui.data("count" + $('#socket').val())["count" + $('#socket').val()]; //获取当前用户本地数据
            var array;
            if (typeof(localData) != "undefined") {
                if (typeof (localData.spread0) != 'undefined' && localData.spread0 == 'true') {
                    array = [];
                } else {
                    array = localData;
                }
            } else {
                array = [];
            }
            //判断消息盒子来的次数
            if (typeof(localCount) == "undefined") {
                localCount = 0;
            }
            if (typeof(message) != "undefined") {
                //添加好友，拒绝好友，添加好友成功，3种消息类型
                if (message.code == '02' || message.code == '03' || message.code == '04' || message.code == '12' || message.code == '13'|| message.code == '14') {
                    localCount++;
                    layui.data("count" + $('#socket').val(), {key: 'count' + $('#socket').val(), value: localCount});
                    var sysMsg;
                    if (message.code == '02') {
                        sysMsg = {
                            "id": message.id,
                            "content": "申请添加你为好友",
                            "uid": message.id,
                            "from": message.id,
                            "from_group": 0,
                            "group_name":'',
                            "group_id": 0,
                            "group_friend":0,
                            "status": 0,
                            "type": 1,
                            "remark": message.text.replace(reg,'\n'),
                            "href": null,
                            "read": 1,
                            "time": '',
                            "user": {
                                "id": message.senderId,
                                "avatar": message.headImgUrl,
                                "username": message.name,
                                "sign": null,
                                "checkCode": message.checkCode
                            }
                        }
                        array.splice(0, 0, sysMsg);
                        //向localStorage同步数据
                        layui.data($('#socket').val(), {key: $('#socket').val(), value: array});
                    }else if (message.code == '12') {
                        select(message.groupId,'groupsLog',function(res) {
                            sysMsg = {
                                "id": message.id,
                                "content": "申请加入 "+res.groupname,
                                "uid": message.id,
                                "from": message.id,
                                "from_group": 0,
                                "group_name":res.groupname,
                                "group_id": res.id,//群组id
                                "group_friend":1,//是否是添加群里的好友 1是 0否
                                "status": 0,
                                "type": 1,
                                "remark": message.text.replace(reg,'\n'),
                                "href": null,
                                "read": 1,
                                "time": '',
                                "user": {
                                    "id": message.senderId,
                                    "avatar": message.headImgUrl,
                                    "username": message.name,
                                    "sign": null,
                                    "checkCode": message.checkCode
                                }
                            }
                            array.splice(0, 0, sysMsg);
                            //向localStorage同步数据
                            layui.data($('#socket').val(), {key: $('#socket').val(), value: array});
                        });
                    } else if (message.code == '03') {
                        sysMsg = {
                            "id": message.id,
                            "content": message.name + " 拒绝了你的好友申请",
                            "uid": message.id,
                            "from": null,
                            "from_group": null,
                            "group_id": null,
                            "group_friend":0,
                            "type": 1,
                            "status": 0,
                            "remark": null,
                            "href": null,
                            "read": 1,
                            "time": "",
                            "user": {
                                "id": null,
                                "checkCode": message.checkCode
                            }
                        }
                        array.splice(0, 0, sysMsg);
                        //向localStorage同步数据
                        layui.data($('#socket').val(), {key: $('#socket').val(), value: array});
                    }else if (message.code == '13') {
                        sysMsg = {
                            "id": message.id,
                            "content": message.name + " 拒绝了你的群申请",
                            "uid": message.id,
                            "from": null,
                            "from_group": null,
                            "group_id": null,
                            "group_friend": 0,
                            "type": 1,
                            "status": 0,
                            "remark": null,
                            "href": null,
                            "read": 1,
                            "time": "",
                            "user": {
                                "id": null,
                                "checkCode": message.checkCode
                            }
                        }
                        array.splice(0, 0, sysMsg);
                        //向localStorage同步数据
                        layui.data($('#socket').val(), {key: $('#socket').val(), value: array});
                    } else if (message.code == '04') {
                        sysMsg = {
                            "id": message.id,
                            "content": message.name + " 已经同意你的好友申请",
                            "uid": message.id,
                            "from": null,
                            "from_group": null,
                            "group_name":'',
                            "group_id": null,
                            "group_friend":0,
                            "type": 1,
                            "status": 0,
                            "remark": null,
                            "href": null,
                            "read": 1,
                            "time": "",
                            "user": {
                                "id": null,
                                "checkCode": message.checkCode
                            }
                        }
                        layim.addList({
                            type: 'friend'
                            , avatar: message.headImgUrl
                            , username: message.name
                            , groupid: 1
                            , id: message.senderId
                            , remark: ""
                        });
                        layui.ext.init();
                        array.splice(0, 0, sysMsg);
                        //向localStorage同步数据
                        layui.data($('#socket').val(), {key: $('#socket').val(), value: array});
                    }else if (message.code == '14') {
                        sysMsg = {
                            "id": message.id,
                            "content": message.name + " 已经同意你的群申请",
                            "uid": message.id,
                            "from": null,
                            "from_group": null,
                            "group_name":'',
                            "group_id": null,
                            "group_friend":0,
                            "type": 1,
                            "status": 0,
                            "remark": null,
                            "href": null,
                            "read": 1,
                            "time": "",
                            "user": {
                                "id": null,
                                "checkCode": message.checkCode
                            }
                        }
                        //增加一个群组
                        layim.addList({
                            type: 'group'
                            ,avatar: $('#ctxStatic').val() + "/images/imDefault/weixin.jpg"
                            ,groupname: message.name
                            ,id: message.groupId
                            ,members: 0
                        });
                        layui.ext.init();
                        array.splice(0, 0, sysMsg);
                        //向localStorage同步数据
                        layui.data($('#socket').val(), {key: $('#socket').val(), value: array});
                    }
                    layim.msgbox(localCount); //模拟消息盒子有新消息，实际使用时，一般是动态获得
                } else if (message.code == '01') {//用户状态消息，是否在线
                    /**
                     * 聊天历史记录点亮用户
                     * */
                    var historyCache = layui.data("history"); //获取当前用户本地数据
                    delete historyCache[message.senderId];
                    if (message.text != '1' && message.text != '2') {
                        layim.setFriendStatus(message.senderId, 'offline');
                        var historyList = historyCache;
                        layui.data('history', {
                            key: message.senderId
                            , value: 'offline'
                        });
                    } else {
                        layim.setFriendStatus(message.senderId, 'online');
                        var historyList = historyCache;
                        layui.data('history', {
                            key: message.senderId
                            , value: 'online'
                        });
                    }
                    console.log(message);
                } else if (message.code == '06') {//用户删除状态
                    layim.removeList({
                        type: 'friend' //或者group
                        , id: message.senderId //好友或者群组ID
                    });

                } else if (message.code == '26') {//用户删除状态
                    layim.removeList({
                        type: 'group' //或者group
                        , id: message.groupId //好友或者群组ID
                    });

                } else if (message.code == '05') {
                    var friend = $('.layim-friend' + message.senderId + " ")[0].children;
                    layim.getMessage({
                        username: friend[1].innerText
                        , avatar: friend[0].src
                        , id: message.senderId
                        , type: "friend"
                        , mine: false //是否我发送的消息，如果为true，则会显示在右方
                        , fromid: message.senderId //消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
                        , content: message.text.replace(reg,'\n')
                    });
                } else if (message.code == '07' && message.text != '@_@delete@Groups@_@') {
                    var historyCache = layui.data("groupFriends"); //获取群员消息
                    if (historyCache != null) {
                        select(message.senderId,'groupFriends',function(res){
                            layim.getMessage({
                                username: res.name
                                , avatar: res.headImgUrl
                                , id: message.groupId
                                , type: "group"
                                , mine: false //是否我发送的消息，如果为true，则会显示在右方
                                , fromid: message.senderId //消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
                                , content: message.text.replace(reg,'\n')
                            });
                        });
                    }
                } else if (message.code == '07' && message.text == '@_@delete@Groups@_@') {
                    var historyCache = layui.data("groupFriends"); //获取群员消息
                    if (historyCache != null) {
                        layim.removeList({
                            type: 'group' //或者group
                            , id: message.groupId //好友或者群组ID
                        });
                    }
                }
            }
        };
    }


    //监听发送消息
    layim.on('sendMessage', function (data) {
        var mine = data.mine; //包含我发送的消息及我的信息
        var To = data.to;   //对方的信息
        //监听到上述消息后，就可以轻松地发送ajax了，如：
        if (To.type === 'friend') {
            $.post($('#ctx').val() + '/dljyzx/im/sendMsg/',
                {
                    senderid: mine.id
                    , receiverId: To.id
                    , text: mine.content
                    , code: '05'
                }, function (data) {
                    var msg = data;
                    if (data.code == '00') {
                        layim.getMessage({
                            username: mine.name
                            , avatar: mine.avatar
                            , id: mine.id
                            , type: "friend"
                            , content: mine.content
                        });
                    }
                });
        } else if (To.type === 'group') {
            $.post($('#ctx').val() + '/dljyzx/im/sendMsg/',
                {
                    senderid: mine.id
                    , receiverId: To.id
                    , text: mine.content
                    , groupId: To.id
                    , code: '07'
                }, function (data) {
                    var msg = data;
                    if (data.code == '00') {
                        layim.getMessage({
                            username: mine.name
                            , avatar: mine.avatar
                            , id: mine.id
                            , type: "group"
                            , content: mine.content
                        });
                    }
                });
        }

    });

    //监听查看群员
    layim.on('members', function (data) {
        console.log(data);
    });

    //监听聊天窗口的切换
    layim.on('chatChange', function (res) {
        var type = res.data.type;
        console.log(res.data.id)
        if (type === 'friend') {
            //模拟标注好友状态
        } else if (type === 'group') {
            //模拟系统消息
            // layim.getMessage({
            //     system: true
            //     , id: res.data.id
            //     , type: "group"
            //     , content: '模拟群员' + (Math.random() * 100 | 0) + '加入群聊'
            // });
        }
    });
});

