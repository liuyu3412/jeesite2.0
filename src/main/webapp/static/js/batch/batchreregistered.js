var pageStart = true;
var controlareaidlist = "";
var geogrregionidlist = "";
//批量注册帮助文档
$(function () {
    if ($('#message').val()) {
        jBox.tip($('#message').val(), 'success');
    }
    $('#mainTable').editableTableWidget().numericInputExample().find('td:first').focus();
    $('#mainTable').editableTableWidget({editor: $('<textarea>')});
    window.prettyPrint && prettyPrint();
});

function help() {
    top.$.jBox('iframe:' + $('#ctx').val() + '/electricity.balance/sePdcSetPro/help', {
        id: null,
        top: '3%',
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
        ajaxData: {}, /*
								 * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
								 * "id=1"
								 */
        iframeScrolling: 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */

        title: '批量注册帮助文档', /* 窗口的标题 */
        width: 1100, /* 窗口的宽度，值为'auto'或表示像素的整数 */
        height: 700, /* 窗口的高度，值为'auto'或表示像素的整数 */
        //bottomText : '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */
        //buttonsFocus : 0, /* 表示第几个按钮为默认按钮，索引从0开始 */
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        }, closed: function () {  /* 窗口关闭后执行的函数 */
        }
    });
}



$(".mktype").mouseover(function () {
    fakhBlock($(this).find('input').val());
}).mouseout(function () {
    fakhRemove($(this).find('input').val());
});

function fakhBlock(obj) {
    if (obj == 1) {
        $("#blockDiv1").css('display', 'block');
    } else if (obj == 3) {
        $("#blockDiv2").css('display', 'block');
    } else {
        $("#blockDiv3").css('display', 'block');
    }
}

function fakhRemove(obj) {
    if (obj == 1) {
        $("#blockDiv1").css('display', 'none');
    } else if (obj == 3) {
        $("#blockDiv2").css('display', 'none');
    } else {
        $("#blockDiv3").css('display', 'none');
    }
}

function page(n, s) {
    arrayList();
    $("#pageNo").val(n);
    $("#pageSize").val(s);
    if ($.trim($('#arrayList').val()) != '') {
        jboxSubmitPage();
        return false;
    } else {
        if (pageStart == false) {
            jboxSubmitPage();
            return;
        } else {
            // 模拟等待完成操作
            jBox.tip("Loading...", 'loading');
            $('#message').val("")
            $('#searchForm').attr('action', $('#ctx').val() + '/regmarket/participant/initialization');
            $("#searchForm").submit();
        }
    }
}

//jboxSubmitPage 翻页判断数据是否有变化提示
function jboxSubmitPage() {
    $('#message').val("")
    $('#searchForm').attr('action', $('#ctx').val() + '/regmarket/participant/initialization');
    var submit = function (v, h, f) {
        if (v == true) {
            // 模拟等待完成操作
            jBox.tip("Loading...", 'loading');
            $("#searchForm").submit();
        }
        return true;
    };
    jBox.confirm("请确认选中项数据是否已处理完成？<br/><span style='color:red;'>如未处理，将导致填写数据丢失！</span>", "确认窗口", submit, {
        id: 'hahaha',
        showScrolling: false,
        buttons: {'已处理': true, '返回': false}
    });
    return false;
}


//导出Excel
function excelSubmit() {
    var submit = function (v, h, f) {
        if (v == true) {
            jBox.tip("正在导出，请稍等！", "success", {id: null, top: '15%'});
            $('#searchForm').attr('action', $('#ctx').val() + '/regmarket/participant/exportExcel');
            $('#searchForm').submit();
        }
        return true;
    };
    jBox.confirm("是否确认导出？", "确认窗口", submit, {
        id: null,
        top: '5%',
        showScrolling: false,
        buttons: {'是': true, '否': false}
    });
};

//查询
function selectSubmit() {
    $('#message').val("")
    $('#searchForm').attr('action', $('#ctx').val() + '/regmarket/participant/initialization');
    $('#searchForm').submit();
};

//保存
function save() {

    if ($("input[class='checkboxList'][type='checkbox']:checked").length > 0) {
        arrayList(2);
        if (booleanStart == false) {
            jBox.tip("请将数据填写正确！", "messager", {id: null, top: '15%'});
        } else {
            // 模拟等待完成操作
            jBox.tip("Loading...", 'loading');
            $('#searchForm').attr('action', $('#ctx').val() + '/regmarket/participant/save')
            $('#searchForm').submit();
        }
    } else {
        jBox.tip("请至少选择一条需要保存的信息！", "messager", {id: null, top: '15%'});
    }
};

//提交
function saveSubmit() {
    if ($("input[class='checkboxList'][type='checkbox']:checked").length > 0) {
        arrayList(2);
        if (booleanStart == false) {
            jBox.tip("请将数据填写正确！", "messager", {id: null, top: '15%'});
        } else {
            var submit = function (v, h, f) {
                if (v == true) {
                    // 模拟等待完成操作
                    jBox.tip("Loading...", 'loading');
                    $('#searchForm').attr('action', $('#ctx').val() + '/regmarket/participant/saveSubmit')
                    $('#searchForm').submit();
                }
                return true;
            };
            jBox.confirm("是否确认提交？", "确认窗口", submit, {
                id: null,
                top: '5%',
                showScrolling: false,
                buttons: {'是': true, '否': false}
            });
        }
    } else {
        jBox.tip("请至少选择一条需要保存的信息！", "messager", {id: null, top: '15%'});
    }
}

//所有选中项
function arrayList(start) {
    booleanStart = true;
    var arrayList = new Array();
    $("input[class='checkboxList'][type='checkbox']:checked").each(function () {
        if ($(this).parent().parent().attr('id') == "false") {
            booleanStart = false;
            if (start == 2) {
                return;
            }
        }
        var oBuffer = new Array();
        var $td = $(this).parent().parent().find("td");
        var $pid = $.trim($td.eq(0).find('span').eq(0).find('input').val());
        var $pname = $.trim($td.eq(1).text());
        var $geogrregionid = $.trim($td.eq(2).val());
        if($geogrregionid==''){
            $geogrregionid = $.trim($td.eq(2).text());
        }
        var $gdj = $.trim($td.eq(3).val());
        if($gdj==''){
            $gdj = $.trim($td.eq(3).text());
        }

        oBuffer += $pid + "~";
        oBuffer += $pname + "~";
        oBuffer += $geogrregionid + "~";
        oBuffer += $gdj+ "~";
        for (var i=4;i<($td.length);i++) {
            if(i!=6&&i!=7&&i!=8&&i!=9){
                if($.trim($td.eq(i).text())==''){
                    oBuffer += '待补充'+ "~";
                }else {
                    oBuffer += $.trim($td.eq(i).text())+ "~";
                }

            }
        }
        arrayList.push(encodeUnicode(oBuffer));
    });
    $('#arrayList').val(arrayList);
}

function StringBuffer() {
    this.__strings__ = new Array();
}


function encodeUnicode(str) {
    var res = [];
    for ( var i=0; i<str.length; i++ ) {
        res[i] = ( "00" + str.charCodeAt(i).toString(16) ).slice(-4);
    }
    return "\\u" + res.join("\\u");
}

StringBuffer.prototype.append = function (str) {
    this.__strings__.push(str);
    return this;    //方便链式操作
}
StringBuffer.prototype.toString = function () {
    return this.__strings__.join("");
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


//导入帮助文档
function csv() {
    var submit = function (v, h, f) {
        if (v == true) {
            var seqnum = $('input[name="seqnum"]').val();
            top.$.jBox('iframe:' + $('#ctx').val() + '/regmarket/participant/Importcsv?seqnum=' + seqnum, {
                top: '3%',
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
                buttons: {'关闭': 1}, ajaxData: {}, /*
                                         * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
                                         * "id=1"
                                         */
                iframeScrolling: 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */

                title: '导入csv帮助文档', /* 窗口的标题 */
                width: 1200, /* 窗口的宽度，值为'auto'或表示像素的整数 */
                height: 600, /* 窗口的高度，值为'auto'或表示像素的整数 */
                //bottomText : '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */
                //buttonsFocus : 0, /* 表示第几个按钮为默认按钮，索引从0开始 */
                loaded: function (h) {
                    $(".jbox-content", top.document).css("overflow-y", "hidden");
                }, closed: function () {  /* 窗口关闭后执行的函数 */

                }
            });
        }
    };

    jBox.confirm("是否使用导入注册?", "确认窗口", submit, {
        id: null,
        top: '5%',
        showScrolling: false,
        buttons: {'是': true, '否': false}
    });
}

$("input[type='checkbox'][class='ckList']").click(function(){
    if ($(this).is(':checked') == true) {
        $("input[type='checkbox'][class='checkboxList']").attr('checked', 'true');
    } else {
        $("input[type='checkbox'][class='checkboxList']").removeAttr('checked');
    }

});


$(".selectd2").on('focus', function (e) {
    $(this).parent().append(geogrregionidlist);
    $(this).hide();
    $(".sel_BizPlan").focus();
});
function geogrregionid(geo){
    $(geo).parent('.geogrregionid').val($(geo).val());
}

$(function(){
    var ctx =$("#ctx").val();
    geogrregionidlist = "<select class='sel_BizPlan' onchange='geogrregionid(this)' style='width:130px; '>";
    $.ajax({
        url: ctx+"/dljyzx/baRegGenerator/jsareaTreeData2",
        type: "get",
        async: false, // 同步
        success: function (data) {
            if (data) {
                str = "";
                str += "<option value=''>--请选择--</option>";
                for (var i = 0; i < data.length; i++) {
                    geogrregionidlist += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
                }
                geogrregionidlist = geogrregionidlist+"</select>";
            }
        }});
});

function deletes(pid){
    var submit = function (v, h, f) {
        if (v == true) {
            $.ajax({
                url: $('#ctx').val() + "/regmarket/participant/delete",
                type: "POST",
                dataType: "json",
                data: {
                    participantid:pid
                },
                success: function (rc) {
                    if(rc.sunccess){
                        jBox.alert("删除成功！",'消息' );
                        setTimeout(function(){
                            $('#message').val("")
                            $('#searchForm').attr('action', $('#ctx').val() + '/regmarket/participant/initialization')
                            $('#searchForm').submit();
                        },2000);

                    }else{
                        jBox.alert( "删除失败！",'消息');
                        setTimeout(function(){
                            $('#message').val("")
                            $('#searchForm').attr('action', $('#ctx').val() + '/regmarket/participant/initialization')
                            $('#searchForm').submit();
                        },2000);
                    }
                }
            });
        }
    }
    jBox.confirm("是否确定删除?", "确认窗口", submit, {
        id: null,
        top: '5%',
        showScrolling: false,
        buttons: {'是': true, '否': false}
    });

}


function addOtherFile(pid,ptype) {
    window.parent.window.isFreshFlag = "1";
    top.$.jBox('iframe:' +  $('#ctx').val() + '/regmarket/participant/UserFileUp', {
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
        ajaxData: { participantid: pid, participanttype: ptype}, /*
         * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
         * "id=1"
         */
        iframeScrolling: 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */
        title: '附件信息', /* 窗口的标题 */
        width: 1000, /* 窗口的宽度，值为'auto'或表示像素的整数 */
        height: 350, /* 窗口的高度，值为'auto'或表示像素的整数 */
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

function addFile(pid,filetype) {
    isFreshFlag = "1";
    // 当前窗口弹出
    var url = $('#ctx').val() + "/regmarket/participant/regFileUplode?participantid=" + pid + "&filetype=" + filetype;
    // 全局弹出
    top.$.jBox("iframe:" + url, {
        id: "regFileUplode",
        title: "附件信息",
        width: 478,
        height: 280,
        iframeScrolling: 'no',
        buttons: {},
        closed: function () {
            $('#message').val("")
            $('#searchForm').attr('action', $('#ctx').val() + '/regmarket/participant/initialization')
            $('#searchForm').submit();
        },
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        }

    });
}
function delFile(pid,filetype) {
    top.$.jBox.confirm('确定删除该条记录?', '确认窗口', function (isOk) {
        if (isOk == "cancel") {
            return;
        }
        var url = "deleteFile";
        $.ajax({
            url: url,
            type: "POST",
            data: {"filetype": filetype,"participantid" : pid},
            dataType: "json",
            success: function (rc) {
                top.$.jBox.alert("删除成功！", '消息');
                $('#message').val("")
                $('#searchForm').attr('action', $('#ctx').val() + '/regmarket/participant/initialization')
                $('#searchForm').submit();
            }
        })
    });
}

function downLoadFile(pid,filetype) {
    //下载附件地址（公共方法）
    var url = "downLoadFile?participantid=" + pid + "&filetype=" + filetype;
    //打开下载窗口
    window.open(url, "_parent");
}


//模板下载
function excelModel() {
    var submit = function (v, h, f) {
        if (v == true) {
            jBox.tip("正在下载，请稍等！", "success", {id: null, top: '15%'});
            $('#searchForm').attr('action', $('#ctx').val() + '/regmarket/participant/exportExcelModel');
            $('#searchForm').submit();
        }
        return true;
    };
    jBox.confirm("是否确认下载模板？", "确认窗口", submit, {
        id: null,
        top: '5%',
        showScrolling: false,
        buttons: {'是': true, '否': false}
    });
};