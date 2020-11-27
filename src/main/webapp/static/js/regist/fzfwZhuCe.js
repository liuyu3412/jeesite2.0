//控制是否上传附件
var id423 = false;
var id40 = false;
//控制展示页面
var show = "";
var participanttype = "";
var saved = false;
var path = window.location.href.substring(0, (window.location.href.indexOf('/', window.location.href.indexOf('/') + 3)));

window.parent.document.getElementById('left').style.height = "1200px";
window.parent.document.getElementById('jerichotabiframe_0').style.height = "1200px";

function initFileGridfuZhu() {
    var downName = "下载查看";
    //加载附件地址
    var url = "/homePage/fuZhuFileList";
    var participantid = $("#isparticipantId").val();
    //
    $.ajax({
        url: path + url,
        type: "POST",
        async: false,
        dataType: "json",
        data: {
            "participantid": participantid

        },
        success: function (data) {
            //只读设置
            for (var i = 0; i < data.length; i++) {
                debugger;
                var guid = data[i].guid;
                //上传附件的个数
                if (data[i].affixtype == 23) {
                    var guid423 = guid;
                    $("#id4_23").unbind("click");
                    $("#id4_23").text(" ").removeAttr("onclick").click(
                        function () {
                            showFile(guid423);
                        }
                    );
                    $("#id423").unbind("click").bind("click", function () {
                        delFile(guid423);
                    });
                    $("#ids423").bind("click", function () {
                        downLoadFile(guid423);
                    });
                    if ($('#isReg').val() != "false") {
                        document.getElementById("id423").style.display = "";
                    }
                    document.getElementById("ids423").style.display = "";
                    id423 = true;
                } else if (data[i].affixtype == 0) {
                    var guid40 = guid;
                    $("#id4_0").unbind("click");
                    $("#id4_0").text(" ").removeAttr("onclick").click(
                        function () {
                            showFile(guid40);
                        }
                    );
                    $("#id40").unbind("click").bind("click", function () {
                        delFile(guid40);
                    });
                    $("#ids40").bind("click", function () {
                        downLoadFile(guid40);
                    });
                    if ($('#isReg').val() != "false") {
                        document.getElementById("id40").style.display = "";
                    }
                    document.getElementById("ids40").style.display = "";
                    id40 = true;
                }


            }
        }
    });
}

function init() {
    initFileGridfuZhu()
    initParams();
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
        var url = "/homePage/fuZhuFiledelete";
        $.ajax({
            url: path + url,
            type: "POST",
            data: {"guid": guid},
            dataType: "json",
            success: function (rc) {
                top.$.jBox.alert("删除成功！", '消息');
                id423 = false;
                id40 = false;
                LoadFile();
            }
        })
    });
}

function downLoadFile(guid) {
    //下载附件地址（公共方法）
    var path = window.location.href.substring(0, (window.location.href.indexOf('/', window.location.href.indexOf('/') + 3)));
    var url = path + "/fuZhuFuWu/downLoadFile?guid="
        + guid + "&isChuNeng=2";
    //打开下载窗口
    window.open(url, "_parent");
}

function LoadFile() {
    $("#id4_23").unbind().bind("click", function () {
        addFile(23);
    }).text("上传附件");
    $("#id4_0").unbind().bind("click", function () {
        addFile(0);
    }).text("上传附件");
    document.getElementById("id423").style.display = "none";
    document.getElementById("ids423").style.display = "none";
    document.getElementById("id40").style.display = "none";
    document.getElementById("ids40").style.display = "none";
    initFileGridfuZhu();
}

function savedatefunction() {
    var isValidated = $("#inputForm").form('validate');// 验证
    if (isValidated == false) {
        return;
    }

    if (!$('#founddate').val()) {
        top.$.jBox.alert("成立日期不可为空!", "消息");
        return;
    }

    var formData = new FormData($("#form")[0]);
    formData.append("ancillaryid", $("#participantid").val())
    $.ajax({
        url: path + "/homePage/addfuZhuFuWu",
        type: "POST",
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (rc) {
            if (rc) {
                if (rc.flag == "success") {
                    top.$.jBox.alert("保存信息成功!", "消息");
                    saved = true;
                } else {
                    top.$.jBox.alert("保存信息失败!", "消息");
                }
            }
        },
        error: function (rc) {
            top.$.jBox.alert("请填写完整!", "消息");
        }
    })
}

function next() {
    if (!saved) {
        top.$.jBox.alert("请先保存信息！", '消息');
        return false;
    }
    if (id423 == false) {
        top.$.jBox.alert("请先上传信用承诺书！", '消息');
        return false;
    } else if (id40 == false) {
        top.$.jBox.alert("请先上传营业执照！", '消息');
        return false;
    }
    window.location.href = "/fuZhuFuWu/chuNengList?type=regist&participantid=" + $("#participantid").val() + "&cNType=" + $("#ancillarytype").val()+"&jobNum=" + $("#bohuiNum").val();
}

function addFile(filetype) {
    var ctxPath = $("#ctxPath").val();
    // 当前窗口弹出
    // top.$(".jbox-body").remove();
    var participantid = $("#participantid").val();
    var url = ctxPath + "/homePage/regFileUplode?participantid="
        + participantid + "&filetype=" + filetype + "&isFzfw=" + 1;
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


function tijiaofunction(guid, ancillaryid) {
    var isValidated = $("#inputForm").form('validate');// 验证
    if (isValidated == false) {
        return;
    }

    if (!$('#founddate').val()) {
        top.$.jBox.alert("成立日期不可为空!", "消息");
        return;
    }

    var formData = new FormData($("#form")[0]);
    formData.append("ancillaryid", $("#participantid").val())


    var url = 'boHuiAdd';
    $.ajax({
        url: url,
        type: "POST",
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (rc) {
            if (rc) {
                if (rc.flag == "success") {
                    top.$.jBox.alert("提交成功!", "消息");
                    if (rc.guid){
                        $('#guid').val(rc.guid)
                        $('#myGDNum').val(rc.jobNum)
                    }
                    saved = true;
                } else {
                    top.$.jBox.alert("提交失败!", "消息");
                }
            }
        },
        error: function (rc) {
            top.$.jBox.alert("请填写完整!", "消息");
        }
    })
}