layui.define(['jquery', 'contextMenu', 'layim'], function (exports) {
    var contextMenu = layui.contextMenu,
        $ = layui.jquery,
        layim = layui.layim;
    var ext = {
        init: function () {//定义右键操作
            $(".layim-list-friend >li > ul > li").contextMenu({
                width: 110, // width
                itemHeight: 25, // 菜单项height
                bgColor: "#fff", // 背景颜色
                color: "#333", // 字体颜色
                fontSize: 12, // 字体大小
                hoverBgColor: "#009bdd", // hover背景颜色
                hoverColor: "#fff", // hover背景颜色
                target: function (ele) { // 当前元素
                    // console.log(ele);
                    var className = $(ele).attr('class');
                    var uid = className.substr(0, className.indexOf(' '));
                    if(uid != ''){
                        if (uid.indexOf('layim-friend') != -1) {
                            uid = uid.replace('layim-friend', '');
                        } else if (uid.indexOf('layim-group') != -1) {
                            uid = uid.replace('layim-group', '');
                        }
                    }else{
                        if (className.indexOf('layim-friend') != -1) {
                            uid = className.replace('layim-friend', '');
                        } else if (uid.indexOf('layim-group') != -1) {
                            uid = className.replace('layim-group', '');
                        }
                    }

                    $(".ul-context-menu>li").attr("data-id", uid);
                },
                menu: [
                    //     { // 菜单项
                    //     text: "查看资料",
                    //     icon: "",
                    //     callback: function(ele) {
                    //         console.log(ele[0].dataset.id);
                    //     }
                    // },
                    /* {
                         text: "聊天记录",
                         icon: "",
                         callback: function(ele) {
                             alert("聊天记录");
                         }
                     },*/
                    {
                        text: "删除好友",
                        icon: "",
                        callback: function (ele) {
                            var cache = layui.layim.cache();
                            var mine = cache.mine;
                            $.post($('#ctx').val() + '/dljyzx/im/delFriend/',
                                {
                                    senderid: mine.id
                                    , receiverId: ele[0].dataset.id
                                    , text: mine.id + '删除' + ele[0].dataset.id
                                    , code: '06'
                                    ,headImgUrl:'删除.jpg'
                                }, function (data) {
                                data = eval('('+data+')');
                                    if (data.code == '06') {
                                        parent.layim.removeList({
                                            type: 'friend' //或者group
                                            , id: ele[0].dataset.id //好友或者群组ID
                                        });
                                    }else if(data.code == '00'){
                                        parent.layui.layim.removeList({
                                            type: 'friend' //或者group
                                            , id: ele[0].dataset.id //好友或者群组ID
                                        });
                                    }
                                }
                            );
                        }
                    }
                ]
            });

            $(".layim-list-group > li").contextMenu({
                 width: 110, // width
                 itemHeight: 25, // 菜单项height
                 bgColor: "#fff", // 背景颜色
                 color: "#333", // 字体颜色
                 fontSize: 12, // 字体大小
                 hoverBgColor: "#009bdd", // hover背景颜色
                 hoverColor: "#fff", // hover背景颜色
                 target: function(ele) { // 当前元素
                     // console.log(ele);
                     var className = $(ele).attr('class');
                     var uid = className.substr(0, className.indexOf(' '));
                     if(uid != ''){
                         if (uid.indexOf('layim-friend') != -1) {
                             uid = uid.replace('layim-friend', '');
                         } else if (uid.indexOf('layim-group') != -1) {
                             uid = uid.replace('layim-group', '');
                         }
                     }else{
                         if (className.indexOf('layim-friend') != -1) {
                             uid = className.replace('layim-friend', '');
                         } else if (uid.indexOf('layim-group') != -1) {
                             uid = className.replace('layim-group', '');
                         }
                     }

                     $(".ul-context-menu>li").attr("data-id", uid);
                 },
                 menu: [
                     //     { // 菜单项
                     //     text: "查看资料",
                     //     icon: "",
                     //     callback: function(ele) {
                     //         console.log(ele[0].dataset.id);
                     //     }
                     // },
                     // {
                     //     text: "修改名称",
                     //     icon: "",
                     //     callback: function(ele) {
                     //         alert("暂未开放");
                     //     }
                     // },
                     {
                         text: "删除群组",
                         icon: "",
                         callback: function (ele) {
                             var cache = layui.layim.cache();
                             var mine = cache.mine;
                             $.post($('#ctx').val() + '/dljyzx/im/delGroup/',
                                 {
                                     senderid: mine.id
                                     , groupId: ele[0].dataset.id
                                     , text: mine.id + '删除' + ele[0].dataset.id
                                     , code: '16'
                                     ,headImgUrl:'删除.jpg'
                                 }, function (data) {
                                     data = eval('('+data+')');
                                     if (data.code == '06') {
                                         parent.layim.removeList({
                                             type: 'group' //或者group
                                             , id: ele[0].dataset.id //好友或者群组ID
                                         });
                                         parent.deleteData(ele[0].dataset.id,'groupsLog');
                                     }else if(data.code == '00'){
                                         parent.layui.layim.removeList({
                                             type: 'group' //或者group
                                             , id: ele[0].dataset.id //好友或者群组ID
                                         });
                                         parent.deleteData(ele[0].dataset.id,'groupsLog');
                                     }
                                 }
                             );
                         }
                     }
                 ]
             });
        }
    }
    exports('ext', ext);
}); 