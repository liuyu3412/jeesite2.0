var path = window.location.href.substring(0, (window.location.href.indexOf('/', window.location.href.indexOf('/') + 3)));
/**
 * 增加附件
 */
function addFile(filetype) {
    isFreshFlag = "1";
    // 当前窗口弹出
    top.$(".jbox-body").remove();
    var participantid = $("#participantid").val();
    var url =path +  "/Pmos/pmosFileUplode?participantid="
        + participantid + "&filetype=" + filetype;
    // 全局弹出
    top.$.jBox("iframe:" + url, {
        id: "regFileUplode",
        title: "附件信息",
        width: 478,
        height: 280,
        iframeScrolling: 'no',
        buttons: {},
        closed: function () {
            initFileGrid();
        },
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        }

    });
}

function initFileGrid() {
    var downName = "下载查看";
    //加载附件地址
    var url = path +  "/Pmos/getPmosFileList";
    var participantid = $("#participantid").val();
    var participanttype = $("#participanttype").val();
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        dataType: "json",
        data: {
            "participantid": participantid
        },
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var guid = data[i].guid;
                if (data[i].affixtype == 18) {
                    var guid_18 = guid;
                    $("#up_18").unbind("click");
                    $("#up_18").hide();
                    $("#del_18").unbind("click").bind("click", function () {
                        delFile(guid_18);
                    });
                    $("#down_18").text(downName).removeAttr("onclick").click(
                        function () {
                            downLoadFile(guid_18);
                        });
                    document.getElementById("del_18").style.display = "";
                    document.getElementById("down_18").style.display = "";
                    id_18 = true;
                } else if (data[i].affixtype == 0) {
                    var guid_0 = guid;
                    $("#up_0").unbind("click");
                    $("#up_0").hide();
                    $("#del_0").unbind("click").bind("click", function () {
                        delFile(guid_0);
                    });
                    $("#down_0").text(downName).bind("click", function () {
                        downLoadFile(guid_0);
                    });
                    document.getElementById("del_0").style.display = "";
                    document.getElementById("down_0").style.display = "";
                    id_0 = true;
                } else if (data[i].affixtype == 16) {
                    var guid_16 = guid;
                    $("#up_16").unbind("click");
                    $("#up_16").hide();
                    $("#del_16").unbind("click").bind("click", function () {
                        delFile(guid_16);
                    });
                    $("#down_16").text(downName).bind("click", function () {
                        downLoadFile(guid_16);
                    });
                    document.getElementById("del_16").style.display = "";
                    document.getElementById("down_16").style.display = "";
                    id_16 = true;
                } else if (data[i].affixtype == 10) {
                    var guid_10 = guid;
                    $("#up_10").unbind("click");
                    $("#up_10").hide();
                    $("#del_10").unbind("click").bind("click", function () {
                        delFile(guid_10);
                    });
                    $("#down_10").text(downName).bind("click", function () {
                        downLoadFile(guid_10);
                    });
                    document.getElementById("del_10").style.display = "";
                    document.getElementById("down_10").style.display = "";
                    id_10 = true;
                }
            }
        }
    });
}

/**
 * 删除附件
 */
function delFile(guid) {
    var id = "";
    jBox.confirm('确认窗口', '确定删除该条记录?', function (isOk) {
        if (!isOk) {
            return;
        }
        var url = path +  "/Pmos/deletePmosFile";
        get(url, {
            guid: guid
        }, function (data) {
            id = data.resultValue;
            if (id == "isNo") {
                $.messager.alert('消息', "该附件不属于该售电公司附件！");
                return
            }
            $("#up_18").unbind().bind("click", function () {
                addFile(18);
            }).text("上传附件");
            document.getElementById("up_18").style.display = "";
            document.getElementById("del_18").style.display = "none";
            document.getElementById("down_18").style.display = "none";
            $("#down_18").unbind();

            $("#up_0").unbind().bind("click", function () {
                addFile(0);
            }).text("上传附件");
            document.getElementById("up_0").style.display = "";
            document.getElementById("del_0").style.display = "none";
            document.getElementById("down_0").style.display = "none";
            $("#down_0").unbind();

            $("#up_16").unbind().bind("click", function () {
                addFile(16);
            }).text("上传附件");
            document.getElementById("up_16").style.display = "";
            document.getElementById("del_16").style.display = "none";
            document.getElementById("down_16").style.display = "none";
            $("#down_16").unbind();

            $("#up_10").unbind().bind("click", function () {
                addFile(10);
            }).text("上传附件");
            document.getElementById("up_10").style.display = "";
            document.getElementById("del_10").style.display = "none";
            document.getElementById("down_10").style.display = "none";
            $("#down_10").unbind();

            id_18 = false;
            id_0 = false;
            id_16 = false;
            id_10 = false;
            initFileGrid();
            top.$.jBox.info('消息', "删除成功！");
        });
    });
}

/**
 * 下载附件
 */
function downLoadFile(guids) {
    var sourceguid = guids;
    var url = "downLoadFile?sourceGuid=" + guids;
    //打开下载窗口
    window.open(url, "_parent");
}

/**
 * 保存数据
 * @returns {Boolean}
 */
function savedatefunction() {
    var participanttype = $("#participanttype").val();
    if (participanttype == '-1') {
        top.$.jBox.info('请选择主体类型', '提示');
        return;
    }
    //表单校验
    var url = "";
    var isValidated = $('#form').form('validate');
    if (isValidated == false) {
        return false;
    }
    if ($('#form').valid()) {
        var totalPercent = 0;
        var flag = true;
        var geogrregionIdId = $('input[name=geogrregionid]').val();
        if (!geogrregionIdId) {
            top.$.jBox.info('地理区域不能为空', '提示');
            return;
        }
    }
    if ($('#form').valid()) {
        //获取form中数据
        var formData = new FormData($("#form")[0]);
       $.ajax({
            url: path + "/Pmos/addRenewableInfo?checkcode=" + checkCode,
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
                        isNewRecord = 1;
                    } else {
                        top.$.jBox.alert("保存信息失败!", "消息");
                    }
                }
            }
        })
    }
}

//统一社会信用代码唯一验证
function creditCodeVali(){
    var participanttype = $("#participanttype").val();
    $.ajax({
        url: path + "/Pmos/checkPmosCreditcode",
        type: "POST",
        data: {
            creditcode: $("#creditcode").val(),
            participanttype: participanttype
        },
        success: function (rc) {
            if (rc) {
                if (rc.msg.length > 0) {
                    top.$.jBox.alert("统一社会信用代码不能重复,请重新输入!", "消息");
                    $("#creditcode").val("");
                }
            }
        }
    })
};

$(document).ready(function(){
    $("#creditcode").change(function(){
        var participanttype = $("#participanttype").val();
        $.ajax({
            url:path +  "/Pmos/checkPmosCreditcode",
            type: "POST",
            data: {
                creditcode: $("#creditcode").val(),
                participanttype: participanttype
            },
            success: function (rc) {
                if (rc) {
                    if (rc.msg.length > 0) {
                        top.$.jBox.alert("统一社会信用代码不能重复,请重新输入!", "消息");
                        $("#creditcode").val("");
                    }
                }
            }
        })
    });
});
function init() {

    initFileGrid();
}