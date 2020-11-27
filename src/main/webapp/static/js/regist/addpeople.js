var guid = "";
var show = "";
var readOnly = "";
var pkvalpart = "";
var participantid = "";
var id110 = false;
var id210 = false;
var id310 = false;
var id410 = false;
var pk = "";
var downName = "下载查看";
var isFlag = false;
var isHaveGszc = true;

function changeGszc() {
    var professortitle = $("#professortitle").val();
    if (professortitle == "无技术等级") {
        $("#gszcBook").hide();
        $("#zsbh").hide();
        isHaveGszc = false;
    } else {
        $("#gszcBook").show();
        $("#zsbh").show();
        isHaveGszc = true;
    }
}


function init() {
    guid = $("#addGuid").val();
    if (localStorage.getItem("participantId")) {
        $("#participantid").val(localStorage.getItem("participantId"));
    }
    if (pk != "pk") {
        loadpkval();
    } else {
        participantid = guid;
    }
    initFileGrid();
    readOnlyInput();
    var processFlag=$('input[nameprocessFlag]').val();//流程页面的标识只能查看
    if(processFlag){
        $('#peopleTable').find('input').each(function (i,o) {
            $(o).attr("readonly","readonly");
        });

        $('professortitle').attr("disabled","disabled");
        $('personsex').attr("disabled","disabled");
        $('#12').remove();
        $('#22').remove();
        $('#32').remove();
        $('#42').remove();

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
        for (i = 0; i < ppp.length; i++) {
            if (ppp[i].indexOf("show") != -1) {
                show = ppp[i].substring(ppp[i].indexOf("show") + 5, ppp[i].length);
            }
            if (ppp[i].indexOf("guid") != -1) {
                guid = ppp[i].substring(ppp[i].indexOf("guid") + 5, ppp[i].length);
            }
            if (ppp[i].indexOf("readOnly") != -1) {
                readOnly = ppp[i].substring(ppp[i].indexOf("readOnly") + 9, ppp[i].length);
            }
            if (ppp[i].indexOf("pk") != -1) {
                pk = ppp[i].substring(ppp[i].indexOf("pk") + 3, ppp[i].length);
            }
        }
        // 设置隐藏框 市场成员id
        $("#participantid").val(participantid);
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
    if (readOnly == "true") {
        //所有的input 设置为只读
        $(".formTable input").each(function () {
            $(this).attr("readonly", true);
        })
        $("#personsex").combo("hideIcon");
        $("#professortitle").combo("hideIcon");

        document.getElementById("saveBtn").style.display = "none";
        document.getElementById("12").style.display = "none";
        document.getElementById("13").style.display = "none";
        document.getElementById("22").style.display = "none";
        document.getElementById("23").style.display = "none";
        if (para_val == "95412") {
            document.getElementById("32").style.display = "none";
            document.getElementById("42").style.display = "none";
            document.getElementById("13").style.display = "";
            document.getElementById("23").style.display = "";
            if (id210 == false) {
                $("#21").text("未上传");
                $("#21").removeAttr("onclick");
                $("#21").unbind("click");
            }
            if (id110 == false) {
                $("#11").text("未上传");
                $("#11").removeAttr("onclick");
                $("#11").unbind("click");
                document.getElementById("13").style.display = "none";
            }
            if (id310 == false) {
                $("#31").text("未上传");
                $("#31").removeAttr("onclick");
                $("#31").unbind("click");
            }
            if (id410 == false) {
                $("#41").text("未上传");
                $("#41").removeAttr("onclick");
                $("#41").unbind("click");
            }
        }
    }
    else {

    }

}
/**
 * 保存
 */
function save() {
    var ss = false;
    initParams();
    var isValidated = $("#peopleForm").form('validate');// 验证
    if (isValidated == false) {
        return;
    }

    if (isHaveGszc) {
        var cernumber=$("#cernumber").val();
        if (id110 == false) {
            top.$.jBox.alert('请先上传公示职称证书', '提示');
            ss == true;
            return;
        }
        if (!cernumber) {
            top.$.jBox.alert('职称证书编号不能为空', '提示');
            ss == true;
            return;
        }
    }
    if (ss == true) {
        return;
    }
    if (id210 == false) {
        top.$.jBox.alert('请先上传社保证明', '提示');
        ss == true;
        return;
    }

    if (id310 == false) {
        top.$.jBox.alert('请先上传身份证', '提示');
        ss == true;
        return;
    }

    if (id410 == false) {
        top.$.jBox.alert('请先上传学历证', '提示');
        ss == true;
        return;
    }


    var formData = new FormData($("#peopleForm")[0]);
    var registFlag=$('input[name=registFlag]').val();//注册用户登陆后的标识
    var officialFlag=$('input[name=officialFlag]').val();//注册用户登陆后的标识

    $.ajax({
        url: "savepeople",
        type: "POST",
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (rc) {
            if (rc) {
                if (rc.flag == "success") {
                    isFlag = true;
                    localStorage.setItem("addPeopleFlag", "success");
                }
            }
        }
    });
    if (isFlag) {
        top.$.jBox.alert("操作成功!", "提示");

        top.$.jBox.close("DetailInfo");
    }
}

/**
 * 保存成功后更新附件ba_reg_partaffixinfo的participantid
 */
function fujinupdate(guid) {
    participantid = pkvalpart;
    $.ajax({
        url: "/pmos/rest/regist/fujinupdate",
        type: "POST",
        async: false,
        dataType: "json",
        data: {
            "guid": guid,
            "participantid": participantid
        },
        success: function (data) {
            if (data.successful) {
                //设置类型
            }
        },
        error: function () {
            $.messager.alert('消息', "更新pkval失败！");
        }

    });
}

/*function loadForm() {
 if(guid==null||guid==""){
 }else{
 $.ajax({
 url :  "/pmos/rest/regist/loadpeopleInfo?guid="
 + guid,
 type : "post",
 dataType : "json",
 success : function(rc) {
 //获取返回结果 --就一个值
 var data = rc.resultValue.items[0];
 //日期格式化
 //表单加载数据tradeCode
 $('#peopleForm').form('load', data);
 //加载树的信息  电价行业类别 （树）。可能存在问题！！！！！！
 //wrapComboTree($('#peopleForm'), rc.resultValue.dicts);
 },
 error : function(event, request, settings) {
 top.$.messager.alert('消息', '数据已加载，请勿频繁操作!');
 }
 });
 }


 }*/
function loadpkval() {
    /*pkvalpart=getGuid();*/
    /*$.ajax({
     url :"/pmos/rest/regist/loadpkvals",
     type : "POST",
     async : false,
     dataType :"json",
     data:{},
     success : function(data){
     if(data.successful){
     pkvalpart = data.resultValue.items[0];
     //alert(pkvalpart);
     //设置类型
     }
     },
     error:function (){
     $.messager.alert('消息', "创建participantid失败！");
     }

     });*/
}

/**
 * 增加附件
 */
function addFile(filetype) {
    var pkVal = "";
    if ($("#addGuid").val()) {
        pkVal = $("#addGuid").val();
    }
    var isValidated = $("#peopleForm").form('validate');// 验证
    if (isValidated == false) {
        return;
    }
    var proAge = $("#professionage").val();
    var age = $("#personege").val();
    if (parseInt(age) < parseInt(proAge)) {
        top.$.jBox.alert("从业年限不能大于年龄!", "消息");
        return;
    }
    isFreshFlag = "1";
    // 当前窗口弹出
    var registFlag = $('input[name=registFlag]').val();
    var participantid = $("#participantid").val();
    var url = "regFileUplodePeople?participantid="
        + participantid + "&filetype=" + filetype + "&pkVal=" + pkVal;
    if (registFlag) {
        url = top.ctx + "/dljyzx/baRegSeller/regisSellerUpload?participantid="
            + participantid + "&filetype=" + filetype + "&pkVal=" + pkVal;
    }

    // 全局弹出
    top.$.jBox("iframe:" + url, {
        id: "regFileUplode",
        title: "附件信息",
        width: 478,
        height: 280,
        iframeScrolling: 'no',
        buttons: {},
        closed: function () {
            if (localStorage.getItem("successFileUp")) {
                localStorage.setItem("addPeopleGuid", $("#addGuid").val());
                localStorage.removeItem("successFileUp");
                initFileGrid();
                var formData = new FormData($("#peopleForm")[0]);
                var url = "savepeople";
                if (registFlag) {
                    url = top.ctx + "/dljyzx/baRegSeller/savepeople";
                }
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
                                isFlag = true;
                            }
                        }
                    }
                });
            }
        },
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        }
    });
}
function initFileGrid() {
    var participantid = $("#participantid").val();
    //alert(participantid);
    //加载附件地址
    var url = "getFileListPeople";
    //
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        dataType: "json",
        data: {
            "participantid": guid
        },

        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var sourceGuid = data[i].guid;
                //上传附件的个数
                if (data[i].affixtype == 20) {
                    var guid20 = sourceGuid;
                    $("#11").unbind("click");
                    $("#11").text("预览").removeAttr("onclick").click(
                        function () {
                            showFile(guid20, 20);
                        }
                    );
                    $("#12").unbind("click").bind("click", function () {
                        delFile(guid20);
                    });
                    $("#13").text(downName).bind("click", function () {
                        downLoadFile(guid20);
                    });
                    document.getElementById("12").style.display = "";
                    document.getElementById("13").style.display = "";
                    document.getElementById("11").style.display = "none";
                    id110 = true;
                } else if (data[i].affixtype == 30) {
                    var guid30 = sourceGuid;
                    $("#21").unbind("click");
                    $("#21").text("预览").removeAttr("onclick").click(
                        function () {
                            showFile(guid30, 30);
                        }
                    );
                    $("#22").unbind("click").bind("click", function () {
                        delFile(guid30);
                    });
                    $("#23").text(downName).bind("click", function () {
                        downLoadFile(guid30);
                    });
                    document.getElementById("22").style.display = "";
                    document.getElementById("23").style.display = "";
                    document.getElementById("21").style.display = "none";
                    id210 = true;
                }
                else if (data[i].affixtype == 40) {
                    var guid40 = sourceGuid;
                    $("#31").unbind("click");
                    $("#31").text("预览").removeAttr("onclick").click(
                        function () {
                            showFile(guid40, 40);
                        }
                    );
                    $("#32").unbind("click").bind("click", function () {
                        delFile(guid40);
                    });
                    $("#33").bind("click", function () {
                        downLoadFile(guid40);
                    });
                    document.getElementById("32").style.display = "";
                    document.getElementById("33").style.display = "";
                    document.getElementById("31").style.display = "none";
                    id310 = true;
                }
                else if (data[i].affixtype == 41) {
                    var guid41 = sourceGuid;
                    $("#41").unbind("click");
                    $("#41").text("预览").removeAttr("onclick").click(
                        function () {
                            showFile(guid41, 41);
                        }
                    );
                    $("#42").unbind("click").bind("click", function () {
                        delFile(guid41);
                    });
                    $("#43").bind("click", function () {
                        downLoadFile(guid41);
                    });
                    document.getElementById("42").style.display = "";
                    document.getElementById("43").style.display = "";
                    document.getElementById("41").style.display = "none";
                    id410 = true;
                }

            }
            var viewFlag=$('input[name=viewFlag]').val();
            //流程查看页面
            if(viewFlag){
                $('#12').remove();
                $('#22').remove();
                $('#32').remove();
                $('#42').remove();
            }
        }

    });
}
function showFile(guid, affixno) {
    var attid = "";
    $.ajax({
        url: "getattid",
        type: "POST",
        async: false,
        dataType: "json",
        data: {
            "guid": guid,
            "affixno": affixno
        },
        success: function (data) {
            if (data.attid) {
                attid = data.attid;
                //设置类型
            }
        },
        error: function () {
            $.messager.alert('消息', "获取guid失败！");
        }

    });

    if (attid == "" || attid == null || attid == undefined) {
        $.messager.alert('消息', "此附件不存在或已被删除！");
        return
    }
    else {
        var url = "/pmos/previewPDF/pagesign.html?id=" + attid;
        top.$.jBox("iframe:" + url, {
            id: 'DetailInfo3',
            title: '',
            width: 900,
            height: 500,
            buttons: {},
            closed: function () {
            }
        });

        //openPDF(attid,'');
    }
    //window.open("../sbs/PDF.jsp?attid="+attid);


}
function delFile(guid) {
    top.$.jBox.confirm('确定删除该条记录?', '确认窗口', function (isOk) {
        if (isOk == "ok") {
            var url = "deleteFile";
            $.ajax({
                url: url,
                type: "POST",
                data: {"guid": guid},
                dataType: "json",
                success: function (rc) {
                    top.$.jBox.alert("删除成功！", '消息');
                    LoadFile();
                    initFileGrid();
                        /*id23 = false;
                        id20 = false;
                        id21 = false;
                        id219 = false;
                        id226 = false;
                        id227 = false;
                        id29 = false;
                        id217 = false;*/


                }
            })
        }

    });
}
/**
 * 下载附件
 */


function downLoadFile(sourceGuid) {
    //下载附件地址（公共方法）
    var sourceguid = guid;
    var url = "downLoadFile?sourceGuid="
        + sourceGuid;
    //打开下载窗口
    window.open(url, "_parent");
}
function LoadFile() {
    $("#11").unbind().bind("click", function () {
        addFile(20);
    }).text("上传附件");
    $("#21").unbind().bind("click", function () {
        addFile(30);
    }).text("上传附件");
        $("#31").unbind().bind("click", function () {
            addFile(40);
        }).text("上传附件");
        $("#41").unbind().bind("click", function () {
            addFile(41);
        }).text("上传附件");
        $("#31").removeAttr("onclick");
        $("#41").removeAttr("onclick");
        document.getElementById("32").style.display = "none";
        document.getElementById("33").style.display = "none";
        document.getElementById("42").style.display = "none";
        document.getElementById("43").style.display = "none";
        document.getElementById("31").style.display = "";
        document.getElementById("41").style.display = "";
        id310 = false;
        id410 = false;
    $("#11").removeAttr("onclick");
    $("#21").removeAttr("onclick");
    document.getElementById("12").style.display = "none";
    document.getElementById("13").style.display = "none";
    document.getElementById("22").style.display = "none";
    document.getElementById("23").style.display = "none";
    document.getElementById("11").style.display = "";
    document.getElementById("21").style.display = "";
    id110 = false;
    id210 = false;
    initFileGrid();
}
