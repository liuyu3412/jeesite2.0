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

/**
 * 编辑按钮
 *
 */
function editG() {
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
        top.$.jBox.alert('请选择一条数据!', "消息");
        return;
    }
    var url = "peopleInfoDetail?guid=" + arr[0] + "&peopleType=1";
    if (registFlag) {
        url = top.ctx + "/dljyzx/baRegSeller/peopleInfoDetail?guid=" + arr[0] + "&peopleType=1&registFlag=registFlag&processFlag=" + processFlag;
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
    var url = "dgsPage?type=4" + "&peopleType=0";
    if (registFlag) {
        url = top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/sellerIndex?type=4" + "&peopleType=0&registFlag=" + registFlag;
    }
    if(officialFlag){
        url+="&officialFlag=officialFlag&participantId="+participantId
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

