
var pageSize = 10;// 每页显示的条数
// 市场成员id
var readOnly = "false";
var show = "";
var more = "";
var participantid = "";
var sum = 0;
function init() {
    var processFlag=$('input[name=processFlag]').val();
    if (localStorage.getItem("participantId")) {
        participantid = localStorage.getItem("participantId");
    }
    $('input[name=participantid]').val(participantid);
    // 加载表头
    initParams();
    initLoadGrid();
    readOnlyInput();
    // 进度条控制
    // 加载数据

    // 初始化 按钮 只读
    //initButtons();
    // 加载数据
    //流程页面进入的标识
    if(processFlag){
        $('.biaotis').remove();
    }
    participantid=$('input[name=participantid]').val();

}

function initParams() {
    // 获取参数信息
    var Params = window.location.search;
    //
    if (Params != null && Params.length > 0) {
        // 分割参数
        var ppp = Params.split("&");
        // 循环遍历
        for (i = 0; i < ppp.length; i++) {
            if (ppp[i].indexOf("show") != -1) {
                show = ppp[i].substring(ppp[i].indexOf("show") + 5, ppp[i].length);
            }
            if (ppp[i].indexOf("more") != -1) {
                more = ppp[i].substring(ppp[i].indexOf("more") + 5, ppp[i].length);
            }
        }
        // 设置隐藏框 市场成员id
        //$("#participantid").val(participantid);
    }
    /**
     * 加载是否只读信息
     */
    /*$.ajax({
     url :"/pmos/rest/regist/loadStatus",
     type : "POST",
     async : false,
     dataType :"json",
     data:{
     },
     success : function(data){
     // 只读设置
     if(data.resultValue.items[0].readOnly=="true"){
     readOnly="true";
     }
     }

     });*/
}


/**
 * 当处于查看的时候只读状态
 */
function readOnlyInput() {
    if (more == "more") {
        $("#gudongTable").datagrid('hideColumn', 'ck');
        document.getElementById("deleteG").style.display = "none";
        document.getElementById("addG").style.display = "none";
    }
    if (readOnly == "true") {
        document.getElementById("deleteG").style.display = "none";
        document.getElementById("addG").style.display = "none";
    }

}
/**
 * 加载表头
 */
function initLoadGrid() {
    var registFlag = $('input[name=registFlag]').val();
    var officialFlag = $('input[name=officialFlag]').val();//生效的售电公司的标识
    var processFlag = $('input[name=processFlag]').val();//流程页面的标识
    var url = "";
    if (registFlag||officialFlag||processFlag) {
        url = top.ctx + "/dljyzx/baRegSeller/queryBaGengroup?officialFlag="+officialFlag+"&processFlag="+processFlag
        $.ajax({
            url: url,
            type: "post",
            dataType: "json",
            data: {
                "participantid": $('input[name=participantId]').val(),
            },
            success: function (rc) {
                if (rc) {
                    $("#gudongTable tbody").html("");
                    var str = "";
                    sum = 0;
                    for (var i = 0; i < rc.length; i++) {
                        str += "<tr>";
                        str += "<td><input type=\"checkbox\" class=\"checkValue\" value=\"" + rc[i].guid + "\" /></td>";
                        str += "<td>" + rc[i].owernname + "</td>";
                        str += "<td>" + rc[i].owernbit + "</td>";
                        sum += parseInt(rc[i].owernbit);
                        str += "</tr>";
                    }
                    $("#gudongTable tbody").append(str);
                }
            }
        });
    } else {
        url = "findbaGengroup"
        $.ajax({
            url: url,
            type: "post",
            dataType: "json",
            data: {
                "participantid": $('input[name=participantid]').val(),
            },
            success: function (rc) {
                if (rc) {
                    $("#gudongTable tbody").html("");
                    var str = "";
                    sum = 0;
                    for (var i = 0; i < rc.length; i++) {
                        str += "<tr>";
                        str += "<td><input type=\"checkbox\" class=\"checkValue\" value=\"" + rc[i][0] + "\" /></td>";
                        str += "<td>" + rc[i][1] + "</td>";
                        str += "<td>" + rc[i][2] + "</td>";
                        sum += parseInt(rc[i][2]);
                        str += "</tr>";
                    }
                    $("#gudongTable tbody").append(str);
                }
            }
        });
    }

}


function getIDS() {
    var rows = $("#gudongTable").datagrid('getSelections');
    var ids = [];
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (row.jydyId) {
            ids.push(row.jydyId)
        }
    }
    return ids;
}

/**
 * 删除按钮
 * @returns
 */
function deleteG() {
    var arr = [];
    $("#gudongTable tbody td").each(function () {
        var flag = $(this).find("input").attr("checked");
        if (flag) {
            arr.push($(this).find("input").val());
        }
    });
    if (arr.length <= 0) {
        top.$.jBox.alert('请至少选择一条数据!', "消息");
        return;
    }
    top.$.jBox.confirm('确定删除吗？', '', function (v, h, f) {
        if (v === 'ok') {
            var url = "dgsPage?type=2&sum=" + sum;
            var flag = 0;
            var registFlag = $('input[name=registFlag]').val();
            var officialFlag = $('input[name=officialFlag]').val();
            if (registFlag) {
                url = top.ctx + "/dljyzx/baRegSeller/deleteOwern";
                $.post(url, {guid: arr.toString(),officialFlag:officialFlag}, function (data) {
                    if (data.num > 0) {
                        initLoadGrid();
                        top.$.jBox.alert('删除成功!', "消息");
                    } else {
                        top.$.jBox.alert('删除失败!', "消息");
                    }
                });
            } else {
                url = "deleteGgudong";
                top.$.jBox.alert('删除成功!', "消息");
                for (var i = 0; i < arr.length; i++) {
                    $.post(url, {guid: arr[i]}, function (data) {
                        if (data) {
                            initLoadGrid();
                        }
                    });
                }
            }


        }
        return true;
    });

}
/**
 * 编辑按钮
 *
 */
function edit() {
    // 选择数据进行
    var items = $("#gudongTable").datagrid('getSelections');
    if (items.length <= 0) {
        $.messager.alert('消息', "请选择一条数据编辑");
        return;
    }
    var url = "../index/registElectricUnitDetailInfo.jsp?" + "guid="
        + items[0].guid
        + "&dataStatus=" + items[0].dataStatus;
    top.$.jBox('iframe:' + url, {
        id: 'viewJzBox',
        title: "查看机组",
        width: 950,
        height: 450,
        buttons: {}
    });
}
/**
 * 用电单元的新建
 */
function add() {
    var registFlag = $('input[name=registFlag]').val();
    var officialFlag = $('input[name=officialFlag]').val();//生效的售电公司的标识
    var participantId = $('input[name=participantId]').val();//市场人员ID
    var url = "dgsPage?type=2&sum=" + sum;
    if (registFlag||officialFlag) {
        url = top.ctx + "/dljyzx/baRegSeller/addGudong?type=2&sum=" + sum+"&participantId="+participantId+"&officialFlag="+officialFlag;
    }

    // 全局弹出
    top.$.jBox("iframe:" + url, {
        id: 'DetailInfo',
        title: "新增股东信息",
        width: 450,
        height: 250,
        buttons: {},
        closed: function () {
        	initLoadGrid();
        },
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        }
    });
}

function initButtons() {
    if (show == "s") {
        $("#title").css('display', 'none');
    }
    if (readOnly == "true") {
        document.getElementById("editG").style.display = "none";
        document.getElementById("deleteG").style.display = "none";
        document.getElementById("over").style.display = "none";
        // window.parent.document.getElementById("editS").style.display="none";

    }
}
