var participanttype = "";
//var participantid="";
var participantidsdgs = "";
//控制只读状态
var readOnly = false;
//控制展示页面
var show = "";
var attid = "";
// var guid="";
//控制是否上传附件
var id329 = false;
var id30 = false;
var id31 = false;
var id16 = false;
var id11 = false;
var para_val = "";
var id14 = false;
var id123 = false;
var id20 = false
var id21 = false;
var id217 = false;
var id29 = false;
var id23 = false;
var id156 = false;
var id110 = false;
var id118 = false;
var id219 = false;
var id226 = false;
var id227 = false;
var id232 = false;
var id233 = false;
var id234 = false;
var id235 = false;
var id236 = false;
var id137 = false;
var id337 = false;
//记录有没有保存
var saved = false;
//判断保存还是修改
var isNewRecord = 0;
var checkCode = "";
var sell = "";
var sum = 0;
//记录上传附件的个数
function init() {
    checkCode = $("#checkCode").val();
    //初始化参数
    /*Loaduindustrytype();*/
    initParams();
    initpartid();
    //初始化状态  获取readOnly
    //initStatus();
    //日期的验证
    getParticipantCode();
    /*datevildate();*/
    /*LoadmarketName();*/
    //设置只读跟按钮的隐藏    判断是不是需要只读 /隐藏一些按钮
    //readOnlyInput();
    //加载数据
    //loadFormData();
    //loadFormDataAll();  //同时：获取participanttype
    //初始化附件信息
    initFileGrid();
    //按钮设置
    buttonSet();
    /*loadFormData();*/
    //初始化页面进度条
    //initspaner();
    //隐藏附件
    //displayFuJin();
}
function checkField(value) {
    $("#aliasname").val(value);
}
function excData(data) {
    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        if (d["hasChildren"] == true) {
            d.state = "closed";
        } else {
            d.state = "open";
        }
    }
    return data;
}

//其他附件上传
function addOtherFile(status) {
    window.parent.window.isFreshFlag = "1";
    var participantid = $("#isparticipantId").val();
    var sign = $("input[name=sign]").val();
    top.$.jBox('iframe:' + 'UserFileUp', {
        id: null,
        border: 5, /* 窗口的外边框像素大小,必须是0以上的整数 */
        opacity: 0.5, /* 窗口隔离层的透明度,如果设置为0,则不显示隔离层 */
        timeout: 0, /* 窗口显示多少毫秒后自动关闭,如果设置为0,则不自动关闭 */
        showType: 'fade', /* 窗口显示的类型,可选值有:show、fade、slide */
        showSpeed: 'fast', /* 窗口显示的速度,可选值有:'slow'、'fast'、表示毫秒的整数 */
        showIcon: true, /* 是否显示窗口标题的图标，true显示，false不显示，或自定义的CSS样式类名（以为图标为背景） */
        showClose: true, /* 是否显示窗口右上角的关闭按钮 */
        draggable: true, /* 是否可以拖动窗口 */
        dragLimit: true, /* 在可以拖动窗口的情况下，是否限制在可视范围 */
        dragClone: false, /* 在可以拖动窗口的情况下，鼠标按下时窗口是否克隆窗口 */
        persistent: true, /* 在显示隔离层的情况下，点击隔离层时，是否坚持窗口不关闭 */
        showScrolling: false, /* 是否显示浏览的滚动条 */
        ajaxData: {status: status, participantid: participantid, dataStatus: '10', allStatus: false, sign: sign}, /*
         * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
         * "id=1"
         */
        iframeScrolling: 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */
        title: '附件信息', /* 窗口的标题 */
        width: 1000, /* 窗口的宽度，值为'auto'或表示像素的整数 */
        height: 650, /* 窗口的高度，值为'auto'或表示像素的整数 */
        bottomText: '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */
        //buttons : {
        //	'确定' : 'ok'
        //}, /* 窗口的按钮 */
        buttonsFocus: 0, /* 表示第几个按钮为默认按钮，索引从0开始 */
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        },
        closed: function () {  /* 窗口关闭后执行的函数 */
            $(obj).parent().parent().attr("class", 'true');
            //window.setTimeout(function () {jBox.tip(message, 'messager'); }, 2000);
        }
    });
}

/**
 * 加载行业分类下拉树
 */
function Loaduindustrytype() {
    $.ajax({
        url: "../../pmos/rest/regist/tree",
        type: "GET",
        async: false,
        dataType: "json",
        data: {},
        success: function (data) {
            var datar = data.resultValue.nodes;
            $('#uindustrytype').combotree('loadData', excData(datar));
            $('#uindustrytype').combotree({
                onSelect: function (record) {
                },
                onChange: function (data) {
                },
                onBeforeExpand: function (node) {
                    var getChildren = $('#uindustrytype').combotree("tree").tree('getChildren', node.target);
                    if (getChildren != null && getChildren.length > 0) {
                        return true;
                    }
                    $.ajax({
                        url: "../../pmos/rest/regist/tree/" + node.id + "?params={\"itemType\":\"baMarketingsegmentcode\"}",
                        type: "GET",
                        async: false,
                        dataType: "json",
                        data: {},
                        success: function (data) {
                            var datar = data.resultValue.nodes;
                            //$('#uindustrytype').combotree('loadData', excData(datar));
                            //$('#uindustrytype').combotree("tree").tree({data:excData(datar)});
                            $('#uindustrytype').combotree("tree").tree('append', {
                                parent: node.target,
                                data: excData(datar)
                            });
//							$('#uindustrytype').combotree("tree").tree('expand', node.target);
                        }
                    });
                    //$('#uindustrytype').combotree("tree").tree("options").url = "../../ETradePublicUtils/rest/industryTypeTree/tree/" + node.id;
                }
            });
        },
        error: function () {
            $.messager.alert('消息', "加载行业分类下拉树失败！");
        }

    });
}
/**
 * 时间验证
 * @returns
 */
function datevildate() {
    $("#endeffectivedate").combo({
        onChange: function () {
            var starteffectivedate = $("#starteffectivedate").combo('getValue');
            var endeffectivedate = $("#endeffectivedate").combo('getValue');
            if (endeffectivedate != "" && endeffectivedate < starteffectivedate) {
                $.messager.alert('提示', '退市日期应大于入市日期');
                return;
            }
        }
    });
    $("#starteffectivedate").combo({
        onChange: function () {
            var starteffectivedate = $("#starteffectivedate").combo('getValue');
            var endeffectivedate = $("#endeffectivedate").combo('getValue');
            if (endeffectivedate != ""
                && endeffectivedate != null && endeffectivedate != undefined) {
                if (endeffectivedate < starteffectivedate) {
                    $.messager.alert('提示', '入市日期应小于退市日期');
                    return;
                }
            }

        }
    });
    $("#expirationdate").combo({
        onChange: function () {
            var dateofissue = $("#dateofissue").combo('getValue');
            var expirationdate = $("#expirationdate").combo('getValue');
            if (expirationdate < dateofissue) {
                $.messager.alert('提示', '许可证失效日期应大于生效日期');
                return;
            }
        }
    });
    $("#dateofissue").combo({
        onChange: function () {
            var dateofissue = $("#dateofissue").combo('getValue');
            var expirationdate = $("#expirationdate").combo('getValue');
            if (expirationdate != ""
                && expirationdate != null && expirationdate != undefined) {
                if (expirationdate < dateofissue) {
                    $.messager.alert('提示', '许可证生效日期应小于失生效日期');
                    return;
                }
            }


        }
    });
}

/**
 * 获取 地址栏传过来的参
 */
function initParams() {
    var Params = window.location.search;
    if (Params != null && Params.length > 0) {
        var ppp = Params.split("&");
        for (i = 0; i < ppp.length; i++) {
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

    /*	if(participanttype=="6"&&show="show"){
     $.ajax({
     url :"/pmos/rest/regist/getpartid",
     type : "POST",
     async : false,
     dataType :"json",
     data:{
     "participantid" : participantid
     },
     success : function(data){
     if(data.successful){
     participantid = data.resultValue;
     //设置类型
     }
     },
     error:function (){
     $.messager.alert('消息', "获取partid失败！");
     }

     });
     }*/
}
/**
 * 模板下载
 */

function downLoad(id) {
    var url = "downcommitment";
    //打开下载窗口
    window.open(url, "_parent");
}

function initpartid() {
    if (participanttype == "6" && show == "show") {
        $.ajax({
            url: "/pmos/rest/regist/getpartid",
            type: "POST",
            async: false,
            dataType: "json",
            data: {},
            success: function (data) {
                if (data.successful) {
                    participantid = data.resultValue;
                    //设置类型
                }
            },
            error: function () {
                top.$.messager.alert('消息', "获取partid失败！");
            }

        });
    }
}

function businessCodeVali() {
    var businesscodeVali = $("#businesscodeVali").val();
    var businesscode = $("#businesscode").val();
    var participanttype = $("#participanttype").val()
    if (!saved) {
        $.ajax({
            url: "checkBusinesscode",
            type: "POST",
            data: {
                businesscode: $("#businesscode").val(),
                participanttype: participanttype
            },
            success: function (rc) {
                if (rc) {
                    if (rc.msg.length > 0) {
                        top.$.jBox.alert("统一社会信用代码不能重复,请重新输入!", "消息");
                        $("#businesscode").val("");
                    }
                }
            }
        })
    }
}

function findGudongPer() {
    //股东信息是否为百分百
    var url = "findbaGengroup";
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        async: false,
        data: {
            "participantid": $("#participantid").val(),
        },
        success: function (rc) {
            if (rc) {
                $("#gudongTable tbody").html("");
                sum = 0;
                if (rc.length > 0) {
                    for (var i = 0; i < rc.length; i++) {
                        sum += parseInt(rc[i][2]);
                    }
                }
            }
        }
    });
}

/**
 * 保存数据
 * @returns {Boolean}
 */
function savedatefunction() {
    findGudongPer();

    var isHasPeople = true;
    //判断是否有常用联系人
    $("#resultTable tbody tr").each(function () {
        if ($(this).find("td:eq(5)").html() == "是") {
            $("#linkman").val($(this).find("td:eq(0)").html());
            $("#officephone").val($(this).find("td:eq(4)").html());
            $("#telephone").val($(this).find("td:eq(2)").html());
            $("#faxphone").val($(this).find("td:eq(3)").html());
            $("#email").val($(this).find("td:eq(6)").html());
            $("#position").val($(this).find("td:eq(1)").html());
            isHasPeople = false;
        }
    });


    if (isHasPeople) {
        top.$.jBox.alert("必须有一个常用的企业联系人！", '消息');
        return false;
    }

    var participanttype = $("#participanttype").val();
    if (participanttype == '-1') {
        top.$.jBox.info('请选择市场成员类型', '提示');
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
    var pType = $("#participanttype").val();
    if (pType == "6") {
        if (sum != 100) {
            top.$.jBox.alert("股东股权信息必须为百分之百！", '消息');
            return false;
        }
    }
    //电厂验证股东
    if (pType == "2") {
        var totalPercent = 0;
        var nullFlag = false;
        var numFlag = false;
        $("input[name='sharePercent']").each(function () {
            //判断是否为空
            if (!$(this).val()) {
                nullFlag = true;
                return
            } else {
                if (isNaN(parseFloat($(this).val()))) {
                    numFlag = true;
                    return;
                } else {
                    totalPercent += parseFloat($(this).val());
                }
            }
        });
        if (numFlag) {
            top.jBox.alert('所占股权只能输入数字!');
            return;
        }
        if (nullFlag) {
            top.jBox.alert('请输入所占股权');
            return;
        }
        if (!flag) {
            top.jBox.alert('请输入数字');
            return;
        }
        if (totalPercent > 100) {
            flag = false;
            top.jBox.alert("股权信息总和不能大于100!");
            return;
        }

        if (totalPercent != 100) {
            flag = false;
            top.jBox.alert("股权信息总和必须等于100!");
            return;
        }
        //保存股权信息
        var groupRelationList = [];
        var groupRelationFlag = false;
        $(".percentTr").each(function (i, o) {
            var json = {};
            var guid = $(o).find('input[name=groupGuid]').val();//股权主键ID
            var gengroupid = $(o).find('select[name=gengroupid]').val();//发电集团ID
            var sharePercent = $(o).find('input[name=sharePercent]').val();//股权
            var sourceguid = $(o).find('input[name=sourceguid]').val();//源id
            if (guid) {
                json.guid = guid;
            }
            json.gengroupid = gengroupid;
            json.sharePercent = sharePercent;
            if (sourceguid && sourceguid != 'undefined') {
                json.sourceguid = sourceguid;
            } else {
                json.sourceguid = "";
            }
            groupRelationList.push(json);
        })
        for (var i = 0; i < groupRelationList.length; i++) {
            for (var j = groupRelationList.length - 1; j > i; j--) {
                if (groupRelationList[i].gengroupid == groupRelationList[j].gengroupid) {
                    top.jBox.alert("股权信息中不能有重复的发电集团!");
                    groupRelationFlag = true;
                    return;
                }
            }
        }
        if (groupRelationList.length == 0) {
            top.jBox.alert("请添加股权信息!");
            return;
        } else {
            if (groupRelationFlag) {
                top.jBox.alert("股权信息中不能有重复的发电集团!");
                return;
            }
        }
        //保存股东信息
        $.ajax({
            url: "baRegGengroup?checkcode=" + checkCode,
            type: "post",
            async: false,
            data: {
                json: JSON.stringify(groupRelationList),
                participantid: $("#participantid").val()
            },
            success: function (data) {

            }
        });

    }
    if ($('#form').valid()) {
        // 验证信息
        getParticipantCode();
        if (pType == "6") {
            var tradebelong = $("#tradebelong").val();//所属行业
            if (!tradebelong) {
                top.$.jBox.alert("所属行业不能为空!", "消息");
                return;
            }
            var enterprisetype = $("#enterprisetype").val();//企业性质
            if (!enterprisetype) {
                top.$.jBox.alert("企业性质不能为空!", "消息");
                return;
            }
            //获取form中数据
            var formData = new FormData($("#form")[0]);
            $.ajax({
                url: "addSellerInfo?checkcode=" + checkCode,
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
        } else {
            //获取form中数据
            var formData = new FormData($("#form")[0]);
            $.ajax({
                url: "addPowerPlantsInfo?checkcode=" + checkCode,
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

        $.ajax({
            url: "addAcceptMarketInfo",
            type: "POST",
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (rc) {
                if (rc) {

                }
            }
        })

    }
}

function savebaregmakrt() {
    //$("#participantid").val(participantidsdgs);
    var data = $('#form').getFormData();
    url = "../../pmos/rest/regist/saveInfosdgsmk";
    post(url, data, function (rc) {
        if (rc.successful) {
            saved = true;
            //participantidsdgs=rc.resultValue;
            //savebaregmakrt();
            // $("#participantid").val(participantidsdgs);
            top.$.messager.alert('消息', "保存成功！");

        } else {
            top.$.messager.alert('消息', '保存方法异常！');
        }
    });
}

function addFile(filetype) {
    isFreshFlag = "1";
    // 当前窗口弹出
    top.$(".jbox-body").remove();
    var participantid = $("#participantid").val();
    var url = "regFileUplode?participantid="
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
    var url = "getFileList";
    var participantid = $("#participantid").val();
    var participanttype = $("#participanttype").val();
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
                if (participanttype == "0" || participanttype == "3") {
                    if (data[i].affixtype == 29) {
                        var guid329 = guid;
                        $("#id3_29").unbind("click");
                        $("#id3_29").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid329);
                            }
                        );
                        $("#id329").unbind("click").bind("click", function () {
                            delFile(guid329);
                        });
                        $("#ids329").bind("click", function () {
                            downLoadFile(guid329);
                        });
                        document.getElementById("id329").style.display = "";
                        document.getElementById("ids329").style.display = "";
                        id329 = true;
                    } else if (data[i].affixtype == 0) {
                        var guid30 = guid;
                        $("#id3_0").unbind("click");
                        $("#id3_0").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid30);
                            }
                        );
                        $("#id30").unbind("click").bind("click", function () {
                            delFile(guid30);
                        });
                        $("#ids30").bind("click", function () {
                            downLoadFile(guid30);
                        });
                        document.getElementById("id30").style.display = "";
                        document.getElementById("ids30").style.display = "";
                        id30 = true;
                    } else if (data[i].affixtype == 44) {
                        var guid31 = guid;
                        $("#id3_1").unbind("click");
                        $("#id3_1").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid31);
                            }
                        );
                        $("#id31").unbind("click").bind("click", function () {
                            delFile(guid31);
                        });
                        $("#ids31").bind("click", function () {
                            downLoadFile(guid31);
                        });
                        document.getElementById("id31").style.display = "";
                        document.getElementById("ids31").style.display = "";
                        id31 = true;
                    } else if (data[i].affixtype == 37) {
                        var guid337 = guid;
                        $("#id3_37").unbind("click");
                        $("#id3_37").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid337);
                            }
                        );
                        $("#id337").unbind("click").bind("click", function () {
                            delFile(guid337);
                        });
                        $("#ids337").bind("click", function () {
                            downLoadFile(guid337);
                        });
                        document.getElementById("id337").style.display = "";
                        document.getElementById("ids337").style.display = "";
                        id337 = true;
                    }
                } else if (participanttype == "2") {
                    if (data[i].affixtype == 6) {
                        var guid16 = guid;
                        var affixtype16 = data[i].affixtype;
                        $("#id1_6").unbind("click");
                        $("#id1_6").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid16);
                            }
                        );
                        $("#ids16").bind("click", function () {
                            downLoadFile(guid16);
                        });
                        $("#id16").unbind("click").bind("click", function () {
                            delFile(guid16);
                        });
                        $("#idss16").unbind("click").bind("click", function () {
                            LoadFile(affixtype16);
                        });
                        document.getElementById("id16").style.display = "";
                        document.getElementById("ids16").style.display = "";
                        document.getElementById("id1_6").style.display = "";
                        id16 = true;
                    } else if (data[i].affixtype == 56) {
                        var guid156 = guid;
                        var affixtype156 = data[i].affixtype;
                        $("#id1_56").unbind("click");
                        $("#id1_56").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid156);
                            }
                        );
                        $("#ids156").bind("click", function () {
                            downLoadFile(guid156);
                        });
                        $("#id156").unbind("click").bind("click", function () {
                            delFile(guid156);
                        });
                        $("#idss156").unbind("click").bind("click", function () {
                            LoadFile(affixtype156);
                        });
                        document.getElementById("id156").style.display = "";
                        document.getElementById("ids156").style.display = "";
                        document.getElementById("id1_56").style.display = "";
                        id156 = true;
                    } else if (data[i].affixtype == 10) {
                        var guid110 = guid;
                        var affixtype110 = data[i].affixtype;
                        $("#id1_10").unbind("click");
                        $("#id1_10").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid110);
                            }
                        );
                        $("#ids110").bind("click", function () {
                            downLoadFile(guid110);
                        });
                        $("#id110").unbind("click").bind("click", function () {
                            delFile(guid110);
                        });
                        $("#idss110").unbind("click").bind("click", function () {
                            LoadFile(affixtype110);
                        });
                        document.getElementById("id110").style.display = "";
                        document.getElementById("ids110").style.display = "";
                        document.getElementById("id1_10").style.display = "";
                        id110 = true;
                    } else if (data[i].affixtype == 18) {
                        var guid118 = guid;
                        var affixtype118 = data[i].affixtype;
                        $("#id1_18").unbind("click");
                        $("#id1_18").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid118);
                            }
                        );
                        $("#ids118").bind("click", function () {
                            downLoadFile(guid118);
                        });
                        $("#id118").unbind("click").bind("click", function () {
                            delFile(guid118);
                        });
                        $("#idss118").unbind("click").bind("click", function () {
                            LoadFile(affixtype118);
                        });
                        document.getElementById("id118").style.display = "";
                        document.getElementById("ids118").style.display = "";
                        document.getElementById("id1_18").style.display = "";
                        id118 = true;
                    } else if (data[i].affixtype == 1) {
                        var guid11 = guid;
                        var affixtype1 = data[i].affixtype;
                        $("#id1_1").unbind("click");
                        $("#id1_1").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid11);
                            }
                        );
                        $("#ids11").bind("click", function () {
                            downLoadFile(guid11);
                        });
                        $("#id11").unbind("click").bind("click", function () {
                            delFile(guid11);
                        });
                        $("#idss11").unbind("click").bind("click", function () {
                            LoadFile(affixtype11);
                        });
                        document.getElementById("id11").style.display = "";
                        document.getElementById("ids11").style.display = "";
                        document.getElementById("id1_1").style.display = "";
                        id11 = true;
                    } else if (data[i].affixtype == 37) {
                        var guid137 = guid;
                        var affixtype137 = data[i].affixtype;
                        $("#id1_37").unbind("click");
                        $("#id1_37").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid137);
                            }
                        );
                        $("#ids137").bind("click", function () {
                            downLoadFile(guid137);
                        });
                        $("#id137").unbind("click").bind("click", function () {
                            delFile(guid137);
                        });
                        $("#idss137").unbind("click").bind("click", function () {
                            LoadFile(affixtype137);
                        });
                        document.getElementById("id137").style.display = "";
                        document.getElementById("ids137").style.display = "";
                        document.getElementById("id1_37").style.display = "";
                        id137 = true;
                    } else if (data[i].affixtype == 4) {
                        var guid14 = guid;
                        var affixtype4 = data[i].affixtype;
                        $("#id1_4").unbind("click");
                        $("#id1_4").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid14);
                            }
                        );
                        $("#ids14").bind("click", function () {
                            downLoadFile(guid14);
                        });
                        $("#id14").unbind("click").bind("click", function () {
                            delFile(guid14);
                        });
                        $("#idss14").unbind("click").bind("click", function () {
                            LoadFile(affixtype137);
                        });
                        document.getElementById("id14").style.display = "";
                        document.getElementById("ids14").style.display = "";
                        document.getElementById("id1_4").style.display = "";
                        id14 = true;
                    }
                    /*		else if(data[i].affixtype==23){
                     var guid123=guid;
                     var affixtype123=data[i].affixtype;
                     $("#id1_3").unbind("click");
                     $("#id1_3").text(" ").removeAttr("onclick").click(
                     function(){
                     showFile(guid123);
                     }
                     );
                     $("#ids13").bind("click",function(){
                     downLoadFile(guid123);
                     });
                     $("#id13").unbind("click").bind("click",function(){
                     delFile(guid123);
                     });
                     $("#idss13").unbind("click").bind("click",function(){
                     LoadFile(affixtype123);
                     });
                     document.getElementById("id13").style.display="";
                     document.getElementById("ids13").style.display="";
                     document.getElementById("id1_3").style.display="";
                     id123=true;
                     }*/
                    else {

                    }

                } else if (participanttype == "6") {
                    if (data[i].affixtype == 1) {
                        var guid21 = guid;
                        $("#id2_1").unbind("click");
                        $("#id2_1").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid21);
                            }
                        );
                        $("#ids21").text(downName).removeAttr("onclick").click(
                            function () {
                                downLoadFile(guid21);
                            });
                        $("#id21").unbind("click").bind("click", function () {
                            delFile(guid21);
                        });
                        document.getElementById("ids21").style.display = "";
                        document.getElementById("id21").style.display = "";
                        if (para_val == "95412") {
                            document.getElementById("id2_1").style.display = "none";
                        }
                        id21 = true;
                    } else if (data[i].affixtype == 23) {
                        var guid23 = guid;
                        $("#id2_3").unbind("click");
                        $("#id2_3").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid23);
                            }
                        );
                        $("#ids23").text(downName).bind("click", function () {
                            downLoadFile(guid23);
                        });
                        $("#id23").unbind("click").bind("click", function () {
                            delFile(guid23);
                        });
                        document.getElementById("ids23").style.display = "";
                        document.getElementById("id23").style.display = "";
                        if (para_val == "95412") {
                            document.getElementById("id2_3").style.display = "none";
                        }
                        id23 = true;
                    } else if (data[i].affixtype == 0) {
                        var guid20 = guid;
                        $("#id2_0").unbind("click");
                        $("#id2_0").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid20);
                            }
                        );
                        $("#ids20").text(downName).bind("click", function () {
                            downLoadFile(guid20);
                        });
                        $("#id20").unbind("click").bind("click", function () {
                            delFile(guid20);
                        });
                        document.getElementById("ids20").style.display = "";
                        document.getElementById("id20").style.display = "";
                        if (para_val == "95412") {
                            document.getElementById("id2_0").style.display = "none";
                        }
                        id20 = true;
                    } else if (data[i].affixtype == 19) {
                        var guid219 = guid;
                        $("#id2_19").unbind("click");
                        $("#id2_19").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid219);
                            }
                        );
                        $("#ids219").text(downName).bind("click", function () {
                            downLoadFile(guid219);
                        });
                        $("#id219").unbind("click").bind("click", function () {
                            delFile(guid219);
                        });
                        document.getElementById("ids219").style.display = "";
                        document.getElementById("id219").style.display = "";
                        if (para_val == "95412") {
                            document.getElementById("id2_19").style.display = "none";
                        }
                        id219 = true;
                    } else if (data[i].affixtype == 26) {
                        var guid226 = guid;
                        $("#id2_26").unbind("click");
                        $("#id2_26").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid226);
                            }
                        );
                        $("#ids226").text(downName).bind("click", function () {
                            downLoadFile(guid226);
                        });
                        $("#id226").unbind("click").bind("click", function () {
                            delFile(guid226);
                        });
                        document.getElementById("ids226").style.display = "";
                        document.getElementById("id226").style.display = "";
                        if (para_val == "95412") {
                            document.getElementById("id2_26").style.display = "none";
                        }
                        id226 = true;
                    } else if (data[i].affixtype == 27) {
                        var guid227 = guid;
                        $("#id2_27").unbind("click");
                        $("#id2_27").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid227);
                            }
                        );
                        $("#ids227").text(downName).bind("click", function () {
                            downLoadFile(guid227);
                        });
                        $("#id227").unbind("click").bind("click", function () {
                            delFile(guid227);
                        });
                        document.getElementById("ids227").style.display = "";
                        document.getElementById("id227").style.display = "";
                        if (para_val == "95412") {
                            document.getElementById("id2_27").style.display = "none";
                        }
                        id227 = true;
                    } else if (data[i].affixtype == 17) {
                        var guid217 = guid;
                        $("#id2_17").unbind("click");
                        $("#id2_17").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid217);
                            }
                        );
                        $("#ids217").text(downName).bind("click", function () {
                            downLoadFile(guid217);
                        });
                        $("#id217").unbind("click").bind("click", function () {
                            delFile(guid217);
                        });
                        document.getElementById("ids217").style.display = "";
                        document.getElementById("id217").style.display = "";
                        if (para_val == "95412") {
                            document.getElementById("id2_17").style.display = "none";
                        }
                        id217 = true;
                    } else if (data[i].affixtype == 9) {
                        var guid29 = guid;
                        $("#id2_9").unbind("click");
                        $("#id2_9").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid29);
                            }
                        );
                        $("#ids29").text(downName).bind("click", function () {
                            downLoadFile(guid29);
                        });
                        $("#id29").unbind("click").bind("click", function () {
                            delFile(guid29);
                        });
                        document.getElementById("ids29").style.display = "";
                        document.getElementById("id29").style.display = "";
                        if (para_val == "95412") {
                            document.getElementById("id2_9").style.display = "none";
                        }
                        id29 = true;
                    } else if (data[i].affixtype == 32) {
                        var guid232 = guid;
                        $("#id2_32").unbind("click");
                        $("#id2_32").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid232);
                            }
                        );
                        $("#ids232").text(downName).bind("click", function () {
                            downLoadFile(guid232);
                        });
                        $("#id232").unbind("click").bind("click", function () {
                            delFile(guid232);
                        });
                        document.getElementById("ids232").style.display = "";
                        document.getElementById("id232").style.display = "";
                        if (para_val == "95412") {
                            document.getElementById("id2_32").style.display = "none";
                        }
                        id232 = true;
                    } else if (data[i].affixtype == 33) {
                        var guid233 = guid;
                        $("#id2_33").unbind("click");
                        $("#id2_33").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid233);
                            }
                        );
                        $("#ids233").text(downName).bind("click", function () {
                            downLoadFile(guid233);
                        });
                        $("#id233").unbind("click").bind("click", function () {
                            delFile(guid233);
                        });
                        document.getElementById("ids233").style.display = "";
                        document.getElementById("id233").style.display = "";
                        if (para_val == "95412") {
                            document.getElementById("id2_33").style.display = "none";
                        }
                        id233 = true;
                    } else if (data[i].affixtype == 34) {
                        var guid234 = guid;
                        $("#id2_34").unbind("click");
                        $("#id2_34").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid234);
                            }
                        );
                        $("#ids234").text(downName).bind("click", function () {
                            downLoadFile(guid234);
                        });
                        $("#id234").unbind("click").bind("click", function () {
                            delFile(guid234);
                        });
                        document.getElementById("ids234").style.display = "";
                        document.getElementById("id234").style.display = "";
                        if (para_val == "95412") {
                            document.getElementById("id2_34").style.display = "none";
                        }
                        id234 = true;
                    } else if (data[i].affixtype == 35) {
                        var guid235 = guid;
                        $("#id2_35").unbind("click");
                        $("#id2_35").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid235);
                            }
                        );
                        $("#ids235").text(downName).bind("click", function () {
                            downLoadFile(guid235);
                        });
                        $("#id235").unbind("click").bind("click", function () {
                            delFile(guid235);
                        });
                        document.getElementById("ids235").style.display = "";
                        document.getElementById("id235").style.display = "";
                        if (para_val == "95412") {
                            document.getElementById("id2_35").style.display = "none";
                        }
                        id235 = true;
                    } else if (data[i].affixtype == 36) {
                        var guid236 = guid;
                        $("#id2_36").unbind("click");
                        $("#id2_36").text(" ").removeAttr("onclick").click(
                            function () {
                                showFile(guid236);
                            }
                        );
                        $("#ids236").text(downName).bind("click", function () {
                            downLoadFile(guid236);
                        });
                        $("#id236").unbind("click").bind("click", function () {
                            delFile(guid236);
                        });
                        document.getElementById("ids236").style.display = "";
                        document.getElementById("id236").style.display = "";
                        if (para_val == "95412") {
                            document.getElementById("id2_36").style.display = "none";
                        }
                        id236 = true;
                    } else {

                    }

                } else {
                    //特殊情况 不做处理
                }

            }
        }

    });
}
/**
 * 当处于查看的时候只读状态
 */
/*function readOnlyInput(){

 //所有的input 设置为只读
 $(".all input").each(function(){
 $(this).attr("readonly", true);
 })
 $("#companyType").combo("hideIcon");
 $('#geogrregionid').combo("hideIcon");
 $('#state').combo("hideIcon");
 $('#starteffectivedate').combo("hideIcon");
 $('#endeffectivedate').combo("hideIcon");
 $('#dateofissue').combo("hideIcon");
 $('#expirationdate').combo("hideIcon");
 $('#uindustrytype').combo("hideIcon");
 $('#uelectricitytype').combo("hideIcon");
 $('#uifapprovetransprice').combo("hideIcon");
 $('#rating').combo("hideIcon");
 $('#dfdc').combo("hideIcon");
 $('#gdj').combo("hideIcon");
 document.getElementById("save").style.display="none";
 document.getElementById("removeFile").style.display="none";
 document.getElementById("addFile").style.display="none";
 document.getElementById("over").style.display="none";

 }*/
/**
 * 按钮设置
 */
function buttonSet() {
    if (show == "show") {
        $("#title").css('display', 'none');
        if (participanttype == "2" || participanttype == "0") {
            document.getElementById("next").style.display = "none";
        }
        /*if(participanttype=="6"){
         $('#managerid').combo("hideIcon");
         }*/
    }
    /*if(participanttype=="2"||participanttype=="0"){
     //隐藏完成按钮
     document.getElementById("over").style.display="none";
     loadFormData();
     }else {
     //隐藏下一步按钮
     document.getElementById("next").style.display="none";
     }*/
}

/**
 * 加载数据
 */
function loadFormData() {
    //清空数据
    $.ajax({
        url: "loadFormData",
        type: "POST",
        async: false,
        dataType: "json",
        data: {
            "participanttype": participanttype
        },
        success: function (datar) {
            if (datar.successful) {
                var data = datar.resultValue.items[0];
                //设置类型
                participanttype = data.participanttype;
                participantid = data.participantid;
                $("#participantid").val(participantid);
                $("#participanttype").val(participanttype);
                //日期设置
                if (data.selltype == "02") {
                    document.getElementById("dlyw").style.display = "none";
                    document.getElementById("licen").style.display = "none";
                    document.getElementById("licen1").style.display = "none";
                    document.getElementById("ykz").style.display = "none";
                    document.getElementById("energy").style.display = "none";
                    $('#licencecode').validatebox({required: false});
                    $('#dateofissue').validatebox({required: false});
                    $('#expirationdate').validatebox({required: false});
                    id21 = true;

                }
                data.starteffectivedate = data.starteffectivedate == null ? null
                    : data.starteffectivedate.substr(0, 10);
                data.endeffectivedate = data.endeffectivedate == null ? null
                    : data.endeffectivedate.substr(0, 10);
                data.dateofissue = data.dateofissue == null ? null : data.dateofissue
                    .substr(0, 10);
                data.expirationdate = data.expirationdate == null ? null
                    : data.expirationdate.substr(0, 10);
                data.founddate = data.founddate == null ? null
                    : data.founddate.substr(0, 10);
                if (participanttype == "6") {
                    if (data.managerid != null) {
                        data.managerid = data.managerid.split(",");
                    }

                }


                //wrapComboTree($('#form'), datar.resultValue.dicts);

                //数据加载
                $('#form').form('load', data);

            }
        }
    });
}
function loadFormDatasdgs() {
    //清空数据
    $.ajax({
        url: "/pmos/rest/regist/loadFormDatasdgs",
        type: "POST",
        async: false,
        dataType: "json",
        data: {
            "participanttype": participanttype
        },
        success: function (datar) {
            if (datar.successful) {
                var data = datar.resultValue.items[0];
                //设置类型
                participanttype = data.participanttype;
                participantid = data.participantid;
                $("#participantid").val(participantid);
                $("#participanttype").val(participanttype);
                //日期设置
                if (data.selltype == "02") {
                    document.getElementById("dlyw").style.display = "none";
                    document.getElementById("licen").style.display = "none";
                    document.getElementById("licen1").style.display = "none";
                    $('#licencecode').validatebox({required: false});

                }
                data.starteffectivedate = data.starteffectivedate == null ? null
                    : data.starteffectivedate.substr(0, 10);
                data.endeffectivedate = data.endeffectivedate == null ? null
                    : data.endeffectivedate.substr(0, 10);
                data.dateofissue = data.dateofissue == null ? null : data.dateofissue
                    .substr(0, 10);
                data.expirationdate = data.expirationdate == null ? null
                    : data.expirationdate.substr(0, 10);
                data.founddate = data.founddate == null ? null
                    : data.founddate.substr(0, 10);
                //下拉树设置text
                //由于下拉树二次刷新显示value 将下拉树暂时改为文本框 展示其值，加载数据字典
                var f = $('#form').form({
                    onLoadSuccess: function (data) {
                        wrapComboTree($('#form'), datar.resultValue.dicts);
                        //$('#managerid'), datar.resultValue.dicts;
                        //$('#attribution'), datar.resultValue.dicts;
                        var dict = datar.resultValue.dicts;
                        //在查看页面的时候是在只读的状态下进行设置文本value
                        if (readOnly) {
                            for (var i = 0; i < dict.length; i++) {
                                if (dict[i].name == "geogrregionid") {
                                    if (data.geogrregionid == dict[i].values[0].value) {
                                        $("#geogrregionid").val(dict[i].values[0].text);
                                    }
                                }

                                if (dict[i].name == "gdj") {
                                    if (data.gdj == dict[i].values[0].value) {
                                        $("#gdj2").val(dict[i].values[0].text);
                                    }
                                }
                            }
                        }
                    }
                });
                //wrapComboTree($('#form'), datar.resultValue.dicts);
                //数据加载
                data.managerid = data.managerid.split(",");
                $('#form').form('load', data);

            }
        }
    });
}
function loadFormDataAll() {
    if (participanttype == "6" && show == "show") {
        loadFormDatasdgs();
    }
    else {
        loadFormData();
    }
}
/**
 * 增加附件
 */

/*
 function delFile() {
 var item = $('#fileTable').datagrid('getSelected');
 //选择的元素为空的话 返回
 if (item == null) {
 $.messager.
 ('消息', "请选择一条记录进行删除操作！");
 return;
 }
 //确认框
 $.messager.confirm('确认窗口', '确定删除该条记录?', function(isOk) {
 if (isOk=="cancel") {
 return;
 }
 var url =  "../../pmos/rest/baMarketparticipantInfo/deleteFile";
 get(url, {
 guid : item.guid
 }, function() {
 //重新加载附件表
 $('#fileTable').datagrid('load', {
 participantid : participantid
 });
 })
 });
 }
 /
 **
 * 删除附件
 */
function delFile(guid) {
    top.$.jBox.confirm('确定删除该条记录?', '确认窗口', function (isOk) {
        if (isOk == "cancel") {
            return;
        }
        var url = "deleteFile";
        $.ajax({
            url: url,
            type: "POST",
            data: {"guid": guid},
            dataType: "json",
            success: function (rc) {
                top.$.jBox.alert("删除成功！", '消息');
                if (participanttype == "2") {

                    id16 = false;
                    id11 = false;
                    id123 = false;
                    id110 = false;
                    id118 = false;
                    id156 = false;
                    id14 = false;
                }
                else if (participanttype == "0" || participanttype == "3") {
                    id329 = false;
                    id30 = false;
                    id31 = false;
                }
                else if (participanttype == "6") {

                    id23 = false;
                    id20 = false;
                    id21 = false;
                    id219 = false;
                    id226 = false;
                    id236 = false;
                    id227 = false;
                    id29 = false;
                    id217 = false;
                }

                LoadFile();
            }
        })
    });
}

/**
 * 下载附件
 */


function downLoadFile(guid) {
    //下载附件地址（公共方法）
    var sourceguid = guid;
    var url = "downLoadFile?sourceGuid="
        + guid;
    //打开下载窗口
    window.open(url, "_parent");
}

/**
 * 注册完成
 */
function over() {
    if (!saved) {
        top.$.messager.alert('消息', "请先保存信息！");
        return false;
    }
    if (participanttype == "2" && id11 == false) {
        top.$.messager.alert('消息', "请先上传附件全部信息！");
        return false;
    }
    else if (participanttype == "2" && id16 == false ||
        participanttype == "2" && id156 == false ||
        participanttype == "2" && id110 == false &&
        participanttype == "2" && id118 == false) {
        top.$.messager.alert('消息', "请先上传附件全部信息！");
        return false;
    }

    else if (participanttype == "0" && id329 == false || participanttype == "0" && id30 == false && id31 == false) {
        top.$.messager.alert('消息', "请先上传附件全部信息！");
        return false;
    }

    /*else if(participanttype=="6"&&id21==false&&sell!="02"||participanttype=="6"&&id23==false
     ||participanttype=="6"&&id20==false||participanttype=="6"&&id219==false
     ||participanttype=="6"&&id226==false
     ||participanttype=="6"&&id227==false||participanttype=="6"&&id29==false
     ||participanttype=="6"&&id217==false){

     $.messager.alert('消息', "请先上传附件全部信息！");
     return false;
     }*/ else {
        //特殊情况 不做处理
    }
    //表单校验
    var isValidated = $('#form').form('validate');
    if (isValidated == false) {
        top.$.messager.alert('消息', "请先保存信息！");
        return false;
    }
    $.ajax({
        url: "/pmos/rest/regist/registOver",
        type: "POST",
        dataType: "json",
        data: {},
        success: function (data) {
            if (data.successful) {
                top.$.messager.alert('提示', "您的注册申请已提交，请等待交易中心审批，您可登录系统查看已提交的信息和审批状态!", "info",
                    function () {
                        //注册入口
                        window.location.href = "/pmos/index/login.jsp";
                    }
                );
            }
        },
        error: function () {
            top.$.messager.alert('消息', "注册失败！");
        }
    });
}
/**
 * 获取市场成员编码
 */
function getParticipantCode() {
    $.ajax({
        url: "getParticipantCode",
        type: "POST",
        async: false,
        dataType: "json",
        data: {},
        success: function (data) {
            if (data.data) {
                var participantcode = data.data;
                //设置类型
                $("#participantcode").val(participantcode);
            }
        },
        error: function () {
            top.$.messager.alert('消息', "获取市场成员编码失败！");
        }

    });

}

/**
 * 获取当前登录场景名字
 */
function getmarketname() {
    $.ajax({
        url: "/pmos/rest/regist/getmarketid",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var marketName = data[0].text;
            if (marketName != "总部") {
                $('#managerid').combobox("loadData", data);
                var s2 = document.getElementById("managerid");
                //s2.removeAttr('multiple');
                //$('#managerid').attr("multiple",false);
            }
            else {
                LoadManagerid();
            }

        },
        error: function () {
            top.$.messager.alert('消息', "获取当前登录场景名字失败！");
        }

    });

}
function LoadManagerid() {
    $.ajax({
        url: "../rest/regist/market",
        type: "get",
        dataType: "json",
        success: function (data) {
            $('#managerid').combobox("loadData", data);
            //$('#managerid').attr('multiple',true);
            //document.getElementById("managerid").hasOwnProperty("multiple");
            //$('#fDispatchlType').combobox("loadData", data.resultValue.items);
            //document.getElementById("managerid").multiple=true;
        },
        error: function (event, request, settings) {
            top.$.messager.alert('消息', '操作失败');
        }
    });
}
/**
 * 判断是不是售电公司
 */
function LoadmarketName() {
    if (participanttype == "6") {
        /*getmarketname();*/
        //根据售电公司类型隐藏业务许可证编号
        selltype();
    }
    else {

    }
}
/**
 *
 * 根据售电公司类型隐藏业务许可证编号
 */
/*function selltype(){
 $("#selltype").combobox({
 onSelect: function(){
 sell = $("#selltype").combobox('getValue');
 if(sell=="02"){
 document.getElementById("dlyw").style.display="none";
 document.getElementById("licen").style.display="none";
 document.getElementById("licen1").style.display="none";
 document.getElementById("ykz").style.display="none";
 document.getElementById("energy").style.display="none";
 $("#licencecode").val("");
 $('#licencecode').validatebox({ required : false});
 $('#dateofissue').easyui-datebox({ required : false});
 $('#expirationdate').easyui-datebox({ required : false});
 var s2=document.getElementById("licencecode");
 s2.removeAttr('required');
 }
 else{
 document.getElementById("licen").style.display="";
 document.getElementById("licen1").style.display="";
 document.getElementById("dlyw").style.display="";
 document.getElementById("ykz").style.display="";
 document.getElementById("energy").style.display="";
 $('#licencecode').validatebox({ required : true});
 $('#dateofissue').validatebox({ required : true});
 $('#expirationdate').validatebox({ required : true});
 }

 }
 });
 }*/
/**
 * 下一步
 */
function next() {
    var participanttype = $("#participanttype").val();
    if (participanttype == '-1') {
        top.$.jBox.info('请选择市场成员类型', '提示');
        return;
    }

    var participantid = $("#participantid").val();
    if (!saved) {
        top.$.jBox.alert("请先保存信息！", '消息');
        return false;
    }
    if ((participanttype == "0" || participanttype == "3") && id329 == false) {
        top.$.jBox.alert("请先上传电力用户信用承诺书！", '消息');
        return false;
    } else if ((participanttype == "0" || participanttype == "3") && id30 == false) {
        top.$.jBox.alert("请先上传工商营业执照！", '消息');
        return false;
    } else if ((participanttype == "0" || participanttype == "3") && id31 == false) {
        top.$.jBox.alert("请先上传电费发票核查联！", '消息');
        return false;
    } else if (participanttype == "2" && id14 == false) {
        top.$.jBox.alert("请先上传建设核准文件附件信息！", '消息');
        return false;
    } else if (participanttype == "2" && id118 == false) {
        top.$.jBox.alert("请先上传营业执照（三证合一）！", '消息');
        return false;
    } else if (participanttype == "2" && id156 == false) {
        top.$.jBox.alert("请先上传合同文本！", '消息');
        return false;
    } else {
        //特殊情况 不做处理
    }
    if (participanttype == "6") {
        if (!id23) {
            top.$.jBox.alert("请先上传信用承诺书！", '消息');
            return false;
        }
        if (!id20) {
            top.$.jBox.alert("请先上传工商营业执照！", '消息');
            return false;
        }
        if (!id219) {
            top.$.jBox.alert("请先上传资产总额证明！", '消息');
            return false;
        }
        if (!id227) {
            top.$.jBox.alert("请先上传场所信息！", '消息');
            return false;
        }
        if (!id29) {
            top.$.jBox.alert("请先上传银行开户许可证！", '消息');
            return false;
        }
        if (!id217) {
            top.$.jBox.alert("请先上传企业法人代表身份证扫描件！", '消息');
            return false;
        }
        if (!id226) {
            top.$.jBox.alert("请先上传信用中国公示材料！", '消息');
            return false;
        }
        if (!id232) {
            top.$.jBox.alert("请先上传公司章程！", '消息');
            return false;
        }
        if($("#selltype").val()=="01"){
            if (!id21) {
                top.$.jBox.alert("请先上传电力业务许可证！", '消息');
                return false;
            }
        }

        if (!id236) {
            top.$.jBox.alert("请先上传技术信息支持系统等证明！", '消息');
            return false;
        }
    }
    var participantid = $("#participantid").val();
    var participantName = $("#participantname").val();
    var admin = $("#ctx").val();
    if (participanttype == "2") {
        top.jBox.confirm('是否光伏企业！', '', function (v, h, f) {
            if (v == 'ok') {
                // if (!id16) {
                //     top.$.jBox.alert("请先上传电价批复文件！", '消息');
                //     return true;
                // }

            }
            var isremittedValue = $("#isremitted").val();
            if (isremittedValue == 0) {
                if (!id11) {
                    top.$.jBox.alert("请先上传电力业务许可证！", '消息');
                    return true;
                }
            }
            //发电企业 注册发电组
            window.location.href = admin + "/dljyzx/baRegGenerator/baRegGeneratorInfosRegist?type=regist&participantid=" + participantid + "&participantName=" + participantName;
            return true;

        }, {
            buttons: {"是": 'ok', '否': ''}
        });

    } else if (participanttype == "0" || participanttype == "3") {
        //用户 注册用电单元
        window.location.href = admin + "/dljyzx/baMktaadmin/toRegist?type=regist&participantid=" + participantid + "&participantname=" + participantName;
    }
    else if (participanttype == "6") {
        var sellType = $("#selltype").val();
        var arr = [];
        $.ajax({
            url: "peopleInfo",
            type: "post",
            dataType: "json",
            async: false,
            data: {
                "participantid": participantid,
            },
            success: function (rc) {
                if (rc) {
                    for (var i = 0; i < rc.length; i++) {
                        arr.push(rc[i][6]);
                    }

                }
            }
        });

        if (sellType == "01") {
            if (arr.length < 20) {
                top.$.jBox.alert("有配网运营权的售电公司从业人员必须为20人以上！", '消息');
                return;
            }
        } else {
            if (arr.length < 10) {
                top.$.jBox.alert("无配网运营权的售电公司从业人员必须为10人以上！", '消息');
                return;
            }
        }
        var highCount = 0;
        var middleCount = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == "高级") {
                highCount++;
            } else if (arr[i] == "中级") {
                middleCount++;
            }
        }

        if (sellType == "01") {
            var temp = 0;
            if (highCount >= 2) {
                temp = 7 - highCount;
                if (temp > middleCount) {
                    top.$.jBox.alert("有配网运营权的售电公司从业人员应至少包含2个高级职称、5个中级职称！", '消息');
                    return;
                }
            } else {
                top.$.jBox.alert("有配网运营权的售电公司从业人员应至少包含2个高级职称、5个中级职称！", '消息');
                return;
            }
        } else {
            var temp = 0;
            if (highCount >= 1) {
                temp = 4 - highCount;
                if (temp > middleCount) {
                    top.$.jBox.alert("无配网运营权的售电公司从业人员应至少包含1个高级职称、3个中级职称！", '消息');
                    return;
                }
            } else {
                top.$.jBox.alert("无配网运营权的售电公司从业人员应至少包含1个高级职称、3个中级职称！", '消息');
                return;
            }
        }
        window.location.href = "registAccountSale?sellType=" + sellType;
    }

    else {

    }

}
/**
 * 加载流程图
 */
/*function initspaner(){
 if(participanttype=="0"){
 document.getElementById("title").style.backgroundImage="url(images/registTitle/dlyh2.png)";
 }else if(participanttype=="2"){
 document.getElementById("title").style.backgroundImage="url(images/registTitle/fdqy2.png)";
 }else if(participanttype=="6"){
 document.getElementById("title").style.backgroundImage="url(images/registTitle/sdgs2.png)";
 }else{
 //特殊情况 不做处理
 }
 }*/
///**
// * 隐藏附件
// */
//function displayFuJin(){
//	if(participanttype=="0"){
//		document.getElementById("dlyh").style.display="block";
//	}else if(participanttype=="2"){
//		document.getElementById("fdqy").style.display="block";
//	}else if(participanttype=="6"){
//		document.getElementById("sdgs").style.display="block";
//
//	}else{
//		//特殊情况 不做处理
//	}
//}
/**
 * 附件删除后重新加载
 */
function LoadFile() {
    if (participanttype == "0" || participanttype == "3") {
        $("#id3_29").unbind().bind("click", function () {
            addFile(29);
        }).text("上传附件");
        $("#id3_0").unbind().bind("click", function () {
            addFile(0);
        }).text("上传附件");
        $("#id3_1").unbind().bind("click", function () {
            addFile(44);
        }).text("上传附件");
        $("#id3_37").unbind().bind("click", function () {
            addFile(37);
        }).text("上传附件");
        document.getElementById("id329").style.display = "none";
        document.getElementById("ids329").style.display = "none";
        document.getElementById("id30").style.display = "none";
        document.getElementById("ids30").style.display = "none";
        document.getElementById("id31").style.display = "none";
        document.getElementById("ids31").style.display = "none";
        /*		document.getElementById("id337").style.display="none";
         document.getElementById("ids337").style.display="none";*/
    } else if (participanttype == "2") {
        $("#id1_0").unbind().bind("click", function () {
            addFile(0);
        }).text("上传附件");
        $("#id1_4").unbind().bind("click", function () {
            addFile(4);
        }).text("上传附件");
        $("#id1_1").unbind().bind("click", function () {
            addFile(1);
        }).text("上传附件");
        $("#id1_6").unbind().bind("click", function () {
            addFile(6);
        }).text("上传附件");
        $("#id1_10").unbind().bind("click", function () {
            addFile(10);
        }).text("上传附件");
        $("#id1_18").unbind().bind("click", function () {
            addFile(18);
        }).text("上传附件");
        $("#id1_37").unbind().bind("click", function () {
            addFile(37);
        }).text("上传附件");
        $("#id1_56").unbind().bind("click", function () {
            addFile(56);
        }).text("上传附件");
        document.getElementById("id11").style.display = "none";
        document.getElementById("ids11").style.display = "none";
        //document.getElementById("id1_1").style.display="none";
        /* document.getElementById("id13").style.display="none";
         document.getElementById("ids13").style.display="none";*/
        //document.getElementById("id1_3").style.display="none";
        document.getElementById("id16").style.display = "none";
        document.getElementById("ids16").style.display = "none";
        //document.getElementById("id1_0").style.display="none";
        // document.getElementById("id110").style.display = "none";
        // document.getElementById("ids110").style.display = "none";
        document.getElementById("id156").style.display = "none";
        document.getElementById("ids156").style.display = "none";
        document.getElementById("id118").style.display = "none";
        document.getElementById("ids118").style.display = "none";
        // document.getElementById("id137").style.display = "none";
        // document.getElementById("ids137").style.display = "none";
        document.getElementById("id14").style.display = "none";
        document.getElementById("ids14").style.display = "none";
    } else if (participanttype == "6") {
        $("#id2_1").unbind().bind("click", function () {
            addFile(1);
        }).text("上传附件");
        $("#id2_3").unbind().bind("click", function () {
            addFile(23);
        }).text("上传附件");
        $("#id2_0").unbind().bind("click", function () {
            addFile(0);
        }).text("上传附件");
        $("#id2_19").unbind().bind("click", function () {
            addFile(19);
        }).text("上传附件");
        $("#id2_26").unbind().bind("click", function () {
            addFile(26);
        }).text("上传附件");
        $("#id2_27").unbind().bind("click", function () {
            addFile(27);
        }).text("上传附件");
        $("#id2_17").unbind().bind("click", function () {
            addFile(17);
        }).text("上传附件");
        $("#id2_9").unbind().bind("click", function () {
            addFile(9);
        }).text("上传附件");
        $("#id2_32").unbind().bind("click", function () {
            addFile(32);
        }).text("上传附件");
        $("#id2_33").unbind().bind("click", function () {
            addFile(33);
        }).text("上传附件");
        $("#id2_34").unbind().bind("click", function () {
            addFile(34);
        }).text("上传附件");
        $("#id2_35").unbind().bind("click", function () {
            addFile(35);
        }).text("上传附件");
        $("#id2_36").unbind().bind("click", function () {
            addFile(36);
        }).text("上传附件");
        document.getElementById("id21").style.display = "none";
        document.getElementById("ids21").style.display = "none";
        //document.getElementById("id2_1").style.display="none";
        document.getElementById("id23").style.display = "none";
        document.getElementById("ids23").style.display = "none";
        document.getElementById("id20").style.display = "none";
        document.getElementById("ids20").style.display = "none";
        document.getElementById("id219").style.display = "none";
        document.getElementById("ids219").style.display = "none";
        document.getElementById("id226").style.display = "none";
        document.getElementById("ids226").style.display = "none";
        document.getElementById("id227").style.display = "none";
        document.getElementById("ids227").style.display = "none";
        document.getElementById("id217").style.display = "none";
        document.getElementById("ids217").style.display = "none";
        document.getElementById("id29").style.display = "none";
        document.getElementById("ids29").style.display = "none";
        document.getElementById("id232").style.display = "none";
        document.getElementById("ids232").style.display = "none";
        document.getElementById("id233").style.display = "none";
        document.getElementById("ids233").style.display = "none";
        document.getElementById("id234").style.display = "none";
        document.getElementById("ids234").style.display = "none";
        document.getElementById("id235").style.display = "none";
        document.getElementById("ids235").style.display = "none";
        document.getElementById("id236").style.display = "none";
        document.getElementById("ids236").style.display = "none";
        //document.getElementById("id2_3").style.display="none";
    }
    else {

    }
    initFileGrid();
}
/**
 * 从业人员配置
 */
function peoples() {
    var particid = localStorage.getItem("participantId");
    var url = "peopleInfoList?participantid="
        + particid;
// 全局弹出
    top.$.jBox("iframe:" + url, {
        title: "从业人员配置信息",
        width: 1200,
        height: 530,
        iframeScrolling: 'no',
        buttons: {},
        closed: function () {
        }

    });
}
/**
 * 股东信息
 */
function gudong() {
    var particid = $("#participantid").val();
    var url = "dgsPage?type=1&participantid="
        + particid;
// 全局弹出
    top.$.jBox("iframe:" + url, {
        title: "股东信息",
        width: 850,
        height: 400,
        iframeScrolling: 'no',
        buttons: {},
        closed: function () {
        },
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        }

    });
}
/**
 * 供电范围
 */
function energy() {
    var particid = $("#participantid").val();
    var url = "baRegSellerList?participantid=" + particid;

// 全局弹出
    top.$.jBox("iframe:" + url, {
        title: "供电范围信息",
        width: 850,
        height: 600,
        iframeScrolling: 'no',
        buttons: {},
        closed: function () {
        },
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        }

    });
}
/**
 * 附件
 * @param attid
 */
function showFile(guid) {
    $.ajax({
        url: "/pmos/rest/regist/getattid",
        type: "POST",
        async: false,
        dataType: "json",
        data: {
            "guid": guid
        },
        success: function (data) {
            if (data.successful) {
                attid = data.resultValue;
                //设置类型
            }
        },
        error: function () {
            top.$.messager.alert('消息', "获取guid失败！");
        }

    });
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
    //window.open("../sbs/PDF.jsp?attid="+attid);

// window.open("../sbs/PDF.jsp?attid=4028814940a8f3940140a98dde33001c");
    /*	var sourceguid=guid;
     var url =  "../../ETradePublicUtils/rest/fileDownUtils/downFileOutnet?guid="
     +guid + "&&sourceguid=" +sourceguid;
     //打开下载窗口
     window.open(url, "_parent");*/
}