//控制是否上传附件
var id5101 = false;
var id50 = false;
var id5102 = false;
var id5103 = false;
//控制展示页面
var show = "";
var participanttype = "";
var saved = false;
var path = window.location.href.substring(0, (window.location.href.indexOf('/', window.location.href.indexOf('/') + 3)));


function initFileGridfuZhu() {
    var downName = "下载查看";
    //加载附件地址
    var url = path + "/fuZhuFuWu/getChuNengAffix";
    var participantid = $("#storageId").val();
    var cNType = $("#cNType").val();
    //
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        dataType: "json",
        data: {
            "participantid": participantid

        },
        success: function (data) {
            //只读设置
            for (var i = 0; i < data.length; i++) {
                var guid = data[i].guid;
                //上传附件的个数
                if (data[i].affixtype == 101) {
                    var guid5101 = guid;
                    $("#id5_101").unbind("click");
                    $("#id5_101").text(" ").removeAttr("onclick").click(
                        function () {
                            showFile(guid5101);
                        }
                    );
                    $("#id5101").unbind("click").bind("click", function () {
                        delFile(guid5101);
                    });
                    $("#ids5101").bind("click", function () {
                        downLoadFile(guid5101);
                    });
                    if ($('#isDis').val() != 1) {
                        document.getElementById("id5101").style.display = "";
                    }
                    document.getElementById("ids5101").style.display = "";
                    id5101 = true;
                } else if (data[i].affixtype == 0 && cNType == 2) {
                    var guid50 = guid;
                    $("#id5_0").unbind("click");
                    $("#id5_0").text(" ").removeAttr("onclick").click(
                        function () {
                            showFile(guid50);
                        }
                    );
                    $("#id50").unbind("click").bind("click", function () {
                        delFile(guid50);
                    });
                    $("#ids50").bind("click", function () {
                        downLoadFile(guid50);
                    });
                    if ($('#isDis').val() != 1) {
                        document.getElementById("id50").style.display = "";
                    }
                    document.getElementById("ids50").style.display = "";
                    id50 = true;
                } else if (data[i].affixtype == 102) {
                    var guid5102 = guid;
                    $("#id5_102").unbind("click");
                    $("#id5_102").text(" ").removeAttr("onclick").click(
                        function () {
                            showFile(guid5102);
                        }
                    );
                    $("#id5102").unbind("click").bind("click", function () {
                        delFile(guid5102);
                    });
                    $("#ids5102").bind("click", function () {
                        downLoadFile(guid5102);
                    });
                    if ($('#isDis').val() != 1) {
                        document.getElementById("id5102").style.display = "";
                    }
                    document.getElementById("ids5102").style.display = "";
                    id5102 = true;
                } else if (data[i].affixtype == 103 && cNType == 2) {
                    var guid5103 = guid;
                    $("#id5_103").unbind("click");
                    $("#id5_103").text(" ").removeAttr("onclick").click(
                        function () {
                            showFile(guid5103);
                        }
                    );
                    $("#id5103").unbind("click").bind("click", function () {
                        delFile(guid5103);
                    });
                    $("#ids5103").bind("click", function () {
                        downLoadFile(guid5103);
                    });
                    if ($('#isDis').val() != 1) {
                        document.getElementById("id5103").style.display = "";
                    }
                    document.getElementById("ids5103").style.display = "";
                    id5103 = true;
                }


            }
        }
    });
}

$(document).ready(function () {
    initFileGridfuZhu();
    initParams();
})

function downLoadFile(guid) {
    debugger;
    //下载附件地址（公共方法）
    var url = "downLoadFile?guid="
        + guid + "&isChuNeng=1";
    //打开下载窗口
    window.open(url, "_parent");
}

function initParams() {
    var Params = window.location.search;
    if (Params != null && Params.length > 0) {
        var ppp = Params.split("&");
        for (var i = 0; i < ppp.length; i++) {
            if (ppp[i].indexOf("show") != -1) {
                show = ppp[i].substring(ppp[i].indexOf("show") + 5, ppp[i].length);
            }
        }
        //设置隐藏框  市场成员id
    }
    participanttype = $("#participanttype").val();
    if (localStorage.getItem("participantId")) {
        $("#participantid").val(localStorage.getItem("participantId"));
    }
}


/**
 * 删除附件
 * @param guid
 */
function delFile(guid) {
    top.$.jBox.confirm('确定删除该条记录?', '确认窗口', function (isOk) {
        if (isOk == "cancel") {
            return;
        }
        var url = path + "/fuZhuFuWu/deleteChuNengAffix";
        $.ajax({
            url: url,
            type: "POST",
            data: {"guid": guid},
            dataType: "json",
            success: function (rc) {
                top.$.jBox.alert("删除成功！", '消息');
                id5101 = false;
                id50 = false;
                LoadFile();
            }
        })
    });
}

function LoadFile() {
    var cNType = $("#cNType").val();
    $("#id5_101").unbind().bind("click", function () {
        addFile(101);
    }).text("上传附件");
    $("#id5_102").unbind().bind("click", function () {
        addFile(102);
    }).text("上传附件");
    document.getElementById("id5101").style.display = "none";
    document.getElementById("ids5101").style.display = "none";
    document.getElementById("id5102").style.display = "none";
    document.getElementById("ids5102").style.display = "none";
    if (cNType == 2) {
        $("#id5_0").unbind().bind("click", function () {
            addFile(0);
        }).text("上传附件");
        $("#id5_103").unbind().bind("click", function () {
            addFile(103);
        }).text("上传附件");
        document.getElementById("id50").style.display = "none";
        document.getElementById("ids50").style.display = "none";
        document.getElementById("id5103").style.display = "none";
        document.getElementById("ids5103").style.display = "none";
    }
    initFileGridfuZhu();
}

function next() {
    if (!saved) {
        top.$.jBox.alert("请先保存信息！", '消息');
        return false;
    }
    if (id5101 == false) {
        top.$.jBox.alert("请先上传信用承诺书！", '消息');
        return false;
    } else if (id50 == false) {
        top.$.jBox.alert("请先上传营业执照！", '消息');
        return false;
    }
    window.location.href = "/fuZhuFuWu/chuNengList?type=regist&participantid=" + $("#participantid").val();
}

function addFile(filetype) {
    debugger;
    var ctxPath = $("#ctxPath").val();
    // 当前窗口弹出
    top.$(".jbox-body").remove();
    var participantid = $("#storageId").val();
    var path = window.location.href.substring(0, (window.location.href.indexOf('/', window.location.href.indexOf('/') + 3)));
    var url = path + "/homePage/regFileUplode?participantid="
        + participantid + "&filetype=" + filetype + "&isFzfw=" + 2;
    // 全局弹出
    top.$.jBox("iframe:" + url, {
        id: "regFileUplode",
        title: "附件信息",
        width: 478,
        height: 280,
        iframeScrolling: 'no',
        buttons: {},
        closed: function () {
            initFileGridfuZhu();
        },
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        }
    });
}