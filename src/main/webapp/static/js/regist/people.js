var pageSize = 10;// 每页显示的条数
// 市场成员id
var readOnly = "false";
var show = "";
var more = "";
var participantid = "";
var pk = "pk";
function init() {
    // 加载表头
    initParams();
    /*initLoadGrid();*/
    readOnlyInput();
    // 进度条控制
    // 加载数据

    // 初始化 按钮 只读
    //initButtons();

    var processFlag = $('input[name=processFlag]').val();//流程页面进入的标识
    if (processFlag) {
        $('#addG').remove();
        $('#deleteG').remove();
        $('#editG').remove();
        $('#view').show();
    }

}

function initParams() {
    // 获取参数信息
    var Params = window.location.search;
    //
    if (Params != null && Params.length > 0) {
        // 分割参数
        var ppp = Params.split("&");
        // 循环遍历
        if (localStorage.getItem("participantId")) {
            participantid = localStorage.getItem("participantId");
        }
        for (i = 0; i < ppp.length; i++) {
            // 市场成员id

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
    $.ajax({
        url: "/pmos/rest/regist/loadStatus",
        type: "POST",
        async: false,
        dataType: "json",
        data: {},
        success: function (data) {
            // 只读设置
            if (data.resultValue.items[0].readOnly == "true") {
                readOnly = "true";
            }
        }

    });
}

/**
 * 加载表头
 */
function initLoadGrid() {
    $.ajax({
        url: "peopleInfo",
        type: "post",
        dataType: "json",
        data: {
            "participantid": participantid,
        },
        success: function (rc) {
            if (rc) {
                $("#cyryTable tbody").html("");
                var str = "";
                for (var i = 0; i < rc.length; i++) {
                    str += "<tr>";
                    str += "<td><input type=\"checkbox\" class=\"checkValue\" value=\"" + rc[i][0] + "\" /></td>";
                    str += "<td style=\"min-width: 306px;\">" + rc[i][1] + "</td>";
                    if (rc[i][2] == "0") {
                        str += "<td>男</td>";
                    } else {
                        str += "<td>女</td>";
                    }
                    str += "<td style=\"min-width: 306px;\">" + rc[i][3] + "</td>";
                    str += "<td style=\"min-width: 306px;\">" + rc[i][4] + "</td>";
                    str += "<td style=\"min-width: 306px;\">" + rc[i][5] + "</td>";
                    str += "<td style=\"min-width: 306px;\">" + rc[i][6] + "</td>";
                    str += "<td style=\"min-width: 306px;\">" + rc[i][7] + "</td>";
                    str += "<td style=\"min-width: 306px;\">" + rc[i][8] + "</td>";
                    str += "<td style=\"min-width: 306px;\">" + rc[i][9] + "</td>";
                    str += "<td style=\"min-width: 306px;\">" + rc[i][10] + "</td>";
                    str += "<td style=\"min-width: 306px;\">" + rc[i][11] + "</td>";
                    str += "<td style=\"min-width: 306px;\">" + rc[i][12] + "</td>";
                    $.ajax({
                        url: "getFileListPeople",
                        type: "POST",
                        async: false,
                        dataType: "json",
                        data: {
                            "participantid": rc[i][0]
                        },
                        success: function (data) {
                            if (data) {
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].affixtype == 20) {
                                        str += "<td><a href='javascript:void(0);' onclick='downLoadFile(\"" + data[i].guid + "\")'  class='link'>下载</a></td>";
                                    } else if (data[i].affixtype == 30) {
                                        str += "<td><a href='javascript:void(0);' onclick='downLoadFile(\"" + data[i].guid + "\")' class='link'>下载</a></td>";
                                    }
                                }
                            }
                        }

                    });

                    str += "</tr>";
                }
                $("#cyryTable tbody").append(str);
            }
        }
    });
}

function downLoadFile(sourceGuid) {
    //下载附件地址（公共方法）
    var url = "downLoadFile?sourceGuid="
        + sourceGuid;
    //打开下载窗口
    window.open(url, "_parent");
}


/**
 * 当处于查看的时候只读状态
 */
function readOnlyInput() {
    if (more == "more") {
        $("#cyryTable").datagrid('hideColumn', 'ck');
        $("#cyryTable").datagrid('hideColumn', 'caozuos');
        document.getElementById("deleteG").style.display = "none";
        document.getElementById("addG").style.display = "none";
        document.getElementById("editG").style.display = "none";
    }
    if (readOnly == "true") {
        document.getElementById("deleteG").style.display = "none";
        document.getElementById("addG").style.display = "none";
        document.getElementById("editG").style.display = "none";
    }

}
/*// 加载数据
 function loadGridData(pageNum) {
 // 访问
 var url =  "/pmos/rest/peopleInfo";
 $.ajax({
 url :  "/pmos/rest/regist/peopleInfo",
 type : "post",
 dataType : "json",
 data : {
 "pageNum" : pageNum,
 "pageSize" : pageSize,
 "participantid":participantid,
 "more":more
 },
 success : function(rc) {
 $("#cyryTable").datagrid('loadData', rc.resultValue.items);
 var r=rc.resultValue.items.personsex;
 var itemCount =rc.resultValue.itemCount;
 $('#pagebar').zpagebar({
 curPage: pageNum,
 total: itemCount,
 funName: 'loadGridData'
 });
 },
 error : function(event, request, settings) {
 top.$.messager.alert('消息', '数据已加载，请勿频繁操作!');
 }
 });
 }*/

function getIDS() {
    var rows = $("#yddyTable").datagrid('getSelections');
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
 * 编辑按钮
 *
 */
function editG() {
    var registFlag = $('input[name=registFlag]').val();//做为注册用户登陆的标识
    var processFlag = $('input[name=processFlag]').val();//流程页面的标识
    var officialFlag = $('input[name=officialFlag]').val();//正式用户登陆的标识
    var participantId = $('input[name=participantId]').val();
    var arr = [];
    $("#cyryTable tbody td").each(function () {
        var flag = $(this).find("input").attr("checked");
        if (flag) {
            arr.push($(this).find("input").val());
        }
    });
    if (arr.length <= 0) {
        top.$.jBox.alert('请至少选择一条数据!', "消息");
        return;
    }
    if (arr.length > 1) {
        top.$.jBox.alert('请选择一条数据!', "消息");
        return;
    }
    var url = "peopleInfoDetail?guid=" + arr[0] + "&peopleType=1";
    if (registFlag) {
        url = top.ctx + "/dljyzx/baRegSeller/peopleInfoDetail?guid=" + arr[0] + "&peopleType=1&registFlag=registFlag&processFlag=" + processFlag+"&officialFlag="+officialFlag+"&participantId="+participantId;
    }
    top.$.jBox('iframe:' + url, {
        id: 'DetailInfo',
        title: "从业人员配置信息",
        width: 950,
        height: 450,
        buttons: {},
        closed: function () {
            window.location.reload();
        },
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        }
    });
};

/**
 * 查看
 *
 */
function viewG() {
    var registFlag = $('input[name=registFlag]').val();//做为注册用户登陆的标识
    var processFlag = $('input[name=processFlag]').val();//流程页面的标识
    var arr = [];
    $("#cyryTable tbody td").each(function () {
        var flag = $(this).find("input").attr("checked");
        if (flag) {
            arr.push($(this).find("input").val());
        }
    });
    if (arr.length <= 0) {
        top.$.jBox.alert('请至少选择一条数据!', "消息");
        return;
    }
    if (arr.length > 1) {
        top.$.jBox.alert('一次只能查看一条记录!', "消息");
        return;
    }
    var  url = top.ctx + "/dljyzx/baRegSeller/peopleInfoDetail?guid=" + arr[0]+"&viewFlag=viewFlag";
    top.$.jBox('iframe:' + url, {
        id: 'DetailInfo',
        title: "从业人员配置信息",
        width: 950,
        height: 450,
        buttons: {},
        closed: function () {
            // window.location.reload();
        },
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        }
    });
}
/**
 * 用电单元的新建
 */
function add() {
    var registFlag = $('input[name=registFlag]').val();//做为注册用户登陆的标识
    var participantId = $('input[name=participantId]').val();//做为注册用户登陆的标识
    var officialFlag = $('input[name=officialFlag]').val();//做为注册用户登陆的标识
    var sign = $('input[name=sign]').val();//加密后的市场成员id 用于防篡改
    var url = "dgsPage?type=4" + "&peopleType=0";
    if (registFlag) {
        url = top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/sellerIndex?type=4" + "&peopleType=0&registFlag=" + registFlag
    }
    if(officialFlag){
        url+="&officialFlag=officialFlag"
    }
    if(registFlag||officialFlag){
        url+="&participantId="+participantId;
    }
    if(officialFlag||registFlag){
       url+="&sign="+sign
    }

    // 全局弹出
    top.$.jBox("iframe:" + url, {
        id: 'DetailInfo',
        title: "从业人员配置信息",
        width: 900,
        height: 450,
        buttons: {},
        closed: function () {
            if (localStorage.getItem("addPeopleFlag") != "success") {
                var guid = localStorage.getItem("addPeopleGuid");
                $.post("deletePeople", {guid: guid}, function (data) {
                    if (data) {
                        localStorage.removeItem("addPeopleFlag");
                        localStorage.removeItem("addPeopleGuid");
                        window.location.reload();
                    }
                });
            } else {
                localStorage.removeItem("addPeopleFlag");
                localStorage.removeItem("addPeopleGuid");
                window.location.reload();
            }

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
function showFile(guid, affixno) {
    var attid = "";
    $.ajax({
        url: "/pmos/rest/regist/getattids",
        type: "POST",
        async: false,
        dataType: "json",
        data: {
            "guid": guid,
            "affixno": affixno
        },
        success: function (data) {
            if (data.successful) {
                attid = data.resultValue;
                //设置类型
            }
        },
        error: function () {
            $.messager.alert('消息', "获取guid失败！");
        }

    });
    if (attid == "" || attid == null) {
        /*$.messager.alert('消息', "此附件不存在或已被删除！");*/
        return
    } else {
        var url = "/pmos/previewPDF/pagesign.html?id=" + attid;
        top.$.jBox("iframe:" + url, {
            id: 'DetailInfo3',
            title: '',
            width: 900,
            height: 500,
            buttons: {},
            closed: function () {
            },
            loaded: function (h) {
                $(".jbox-content", top.document).css("overflow-y", "hidden");
            }
        });
        //openPDF(attid,'');
        //window.open("../sbs/PDF.jsp?attid="+attid);
    }

}