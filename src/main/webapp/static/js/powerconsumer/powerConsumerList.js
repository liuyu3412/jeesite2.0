var isFreshFlag = "1";
var consid = '';
var guid = '';
var status = '';
var checkedIds;
var dataStatus = '';
var checkItems = new Array();//页码check
var param = {};
var index = '';
$(function () {

})

// $("input[type='checkbox'][class='registCheckBox']").live('click', function () {
//     $("input[type='checkbox'][class='registCheckBox']").removeAttr("checked");
//     $(this).prop("checked", true);
// });


//$("#contentTable1 tr td:not(:last-child)").live('click',function(){	
//$("input[type='checkbox'][class='registCheckBox']").removeAttr("checked");
//$(this).prop("checked", true);
//});

$("#contentTable1 tr").mouseover(function () {
    $(this).addClass("over");
    $(this).attr('style', 'cursor:pointer;');
}).mouseout(function () {
    $(this).removeClass("over");
});

$("#contentTable1 tr td:nth-child(2)").live('click', function () {
    var consid = $(this).find('span').eq(0).find('input').val();
    var loadId = $(this).find('span').eq(1).find('input').val();
    var sign = $(this).find('span').eq(2).find('input').val();
    dataStatus = $(this).parent().find('td').eq(6).find('span').find('input').val();
    var effectiveData = $(this).parent().find('td').eq(4).text();
    var expiryDate = $(this).parent().find('td').eq(5).text();
    add(1, sign, dataStatus, consid, loadId, effectiveData, expiryDate);
});

//受理通知书查询
$("#contentTable1 tr td:nth-child(11)").live('click', function () {
    var consid = $(this).parent().find('td').eq(1).find('span').eq(0).find('input').val();
    var sessionid = $(this).parent().find('td').eq(1).find('span').eq(1).find('input').val();
    var sign = $(this).parent().find('td').eq(1).find('span').eq(2).find('input').val();
    dataStatus = $(this).parent().find('td').eq(7).find('span').find('input').val();
    /**
     * 附件查看
     */
    window.parent.window.isFreshFlag = "1";
    top.$.jBox('iframe:' + $('#ctx').val() + '/PowerConsumerView/bindview/bpFileUp', {
        id: null,
        top: '5%',
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
        ajaxData: {sign: sign, consid: consid, sessionid: sessionid, dataStatus: dataStatus, allStatus: true}, /*
						 * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
						 * "id=1"
						 */
        iframeScrolling: 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */
        title: '附件信息', /* 窗口的标题 */
        width: 1000, /* 窗口的宽度，值为'auto'或表示像素的整数 */
        height: 650, /* 窗口的高度，值为'auto'或表示像素的整数 */
        bottomText: '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */

        buttonsFocus: 0, /* 表示第几个按钮为默认按钮，索引从0开始 */
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        },
        closed: function () {  /* 窗口关闭后执行的函数 */
            //$(obj).parent().parent().attr("class",'true');
        }
    });
});


$("#contentTable1 tr td:last-child").live('click', function () {
    var consid = $(this).parent().find('td').eq(1).find('span').eq(0).find('input').val();
    var sessionid = $(this).parent().find('td').eq(1).find('span').eq(1).find('input').val();
    var sign = $(this).parent().find('td').eq(1).find('span').eq(2).find('input').val();
    dataStatus = $(this).parent().find('td').eq(7).find('span').find('input').val();
    /**
     * 附件查看
     */
    window.parent.window.isFreshFlag = "1";
    top.$.jBox('iframe:' + $('#ctx').val() + '/PowerConsumerView/bindview/UserFileUp', {
        id: null,
        top: '5%',
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
        ajaxData: {sign: sign, consid: consid, sessionid: sessionid, dataStatus: dataStatus, allStatus: true}, /*
						 * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
						 * "id=1"
						 */
        iframeScrolling: 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */
        title: '附件信息', /* 窗口的标题 */
        width: 1000, /* 窗口的宽度，值为'auto'或表示像素的整数 */
        height: 650, /* 窗口的高度，值为'auto'或表示像素的整数 */
        bottomText: '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */

        buttonsFocus: 0, /* 表示第几个按钮为默认按钮，索引从0开始 */
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        },
        closed: function () {  /* 窗口关闭后执行的函数 */
            //$(obj).parent().parent().attr("class",'true');
        }
    });
});


function page(n, s) {
    $('#searchForm').attr('action', $('#ctx').val() + '/PowerConsumerView/pcview');
    $("#pageNo").val(n);
    $("#pageSize").val(s);
    $("#searchForm").submit();
    return false;
}

/**
 *
 */
function affix() {

}

/**
 * 新增用户
 */
function add(obj, sign, dataStatus, consid, loadId, effectiveData, expiryDate) {
    isFreshFlag = "1";
    top.$.jBox('iframe:' + $('#ctx').val() + '/BaaddSaleCompanyView/bindview/list', {
        top: '5%',
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
        ajaxData: {
            sign: sign,
            addStatus: obj,
            participantId: '',
            consid: consid,
            loadId: loadId,
            dataStatus: dataStatus,
            effectiveData: effectiveData,
            expiryDate: expiryDate
        }, /*
						 * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
						 * "id=1"
						 */
        iframeScrolling: 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */

        title: obj == 0 ? '新增电力用户' : (dataStatus == '01' || dataStatus == '00') ? '查看电力用户' : '编辑电力用户', /* 窗口的标题 */
        width: 1100, /* 窗口的宽度，值为'auto'或表示像素的整数 */
        height: 600, /* 窗口的高度，值为'auto'或表示像素的整数 */
        //bottomText : '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */
        //buttonsFocus : 0, /* 表示第几个按钮为默认按钮，索引从0开始 */
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        }, closed: function () {  /* 窗口关闭后执行的函数 */
            $.post($('#ctx').val() + '/PowerConsumerView/pcview/closeSessionGuid', '', function (data) {
                location.reload();
                return false;
            });
        }
    });
}


/**
 * 绑定已有的用户
 */
function bind() {
    top.$.jBox('iframe:' + $('#ctx').val() + '/PowerConsumerView/bindview', {
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
        ajaxData: {edit: 1, participantId: ''}, /*
						 * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
						 * "id=1"
						 */
        iframeScrolling: 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */

        title: '绑定与上报', /* 窗口的标题 */
        width: 1100, /* 窗口的宽度，值为'auto'或表示像素的整数 */
        height: 600, /* 窗口的高度，值为'auto'或表示像素的整数 */
        //bottomText : '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */

        //buttonsFocus : 0, /* 表示第几个按钮为默认按钮，索引从0开始 */
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        }, closed: function () {  /* 窗口关闭后执行的函数 */
            $.post($('#ctx').val() + '/PowerConsumerView/pcview/closeSession', '', function (data) {
                location.reload();
                return false;
            });
        }
    });
}


/**
 * 新绑定申请及查询
 */
function newBind() {
    top.$.jBox('iframe:' + $('#ctx').val() + '/PowerConsumerView/bindview/newBind', {
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
        ajaxData: {edit: 1, participantId: ''}, /*
						 * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
						 * "id=1"
						 */
        iframeScrolling: 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */

        title: '申请绑定与查询', /* 窗口的标题 */
        width: 1100, /* 窗口的宽度，值为'auto'或表示像素的整数 */
        height: 600, /* 窗口的高度，值为'auto'或表示像素的整数 */
        //bottomText : '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */

        //buttonsFocus : 0, /* 表示第几个按钮为默认按钮，索引从0开始 */
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        }, closed: function () {  /* 窗口关闭后执行的函数 */
            $.post($('#ctx').val() + '/PowerConsumerView/pcview/closeSession', '', function (data) {
                location.reload();
                return false;
            });
        }
    });
}

/**
 * 删除
 */
function del() {
    var affixCount = 0;
    var status = 0;
    var $isChecked = $(".registCheckBox").is(":checked");
    if ($isChecked == false) {
        top.$.jBox.tip('请至少选择一条数据!', 'messager');
        return;
    }
    var stateReturn = 0;
    var consid = '', loadId = '', $this = null;
    // $this.find('td').eq(1).find('span').eq(0).find('input').val()
    // var loadId = $this.find('td').eq(1).find('span').eq(1).find('input').val();
    $("input[type='checkbox']:checked[class='registCheckBox']").each(function () {
        $this = $(this).parent().parent();
        consid = consid + $this.find('td').eq(1).find('span').eq(0).find('input').val() + ",";
        loadId = loadId + $this.find('td').eq(1).find('span').eq(1).find('input').val() + ",";
    });
    consid = consid.substr(0, consid.lastIndexOf(","));
    loadId = loadId.substr(0, loadId.lastIndexOf(","));
    // var mktaad = $this.find('td').eq(7).text();

    // var effectiveData = $this.find('td').eq(4).text();
    // var expiryDate = $this.find('td').eq(5).text();

    $("input[type='checkbox']:checked[class='registCheckBox']").each(function () {
        $this = $(this).parent().parent();
        var $dataStatus = ($this.find('td').eq(6).find('span').find('input').val());
        if ($dataStatus == '00' || $dataStatus == '01' || $dataStatus == '13' || $dataStatus == '22') {
            stateReturn = 1;
            top.$.jBox.tip('待提交/待审批的数据才可删除!', 'messager');
            return;
        }
    });
    // if ($dataStatus == '30' || $dataStatus == '32') {
    //     status = 1;
    // }
    if (stateReturn == 0) {


        var submit = function (v, h, f) {
            if (v == true) {
                var url = $('#ctx').val() + "/BaaddSaleCompanyView/bindview/back1?checkcode=" + $('#checkcode').val();
                $.post(url, {
                    status: status,
                    // dataStatus: $dataStatus,
                    consid: consid,
                    loadId: loadId
                    // beginTime: effectiveData,
                    // endTime: expiryDate
                }, function (data) {
                    if (data.sunccess) {
                        jBox.tip("删除成功！", "success", {id: null, top: '5%'});
                        window.setTimeout(function () {
                            location.reload();
                        }, 2000);
                    } else {
                        jBox.tip(data.message, "messager", {id: null, top: '5%'});
                        return;
                    }
                });
            } else {

            }
            return true;
        };
        jBox.confirm("将删除选中的用户，是否继续？", "确认窗口", submit, {
            id: null,
            top: '5%',
            showScrolling: false,
            buttons: {'是': true, '否': false}
        });
    }
}


/**
 * 撤销
 */
function delReturn() {
    var affixCount = 0;
    var $isChecked = $(".registCheckBox").is(":checked");
    var $this = $(".registCheckBox:checked").parent().parent();

    if ($isChecked == false) {
        top.$.jBox.tip('请至少选择一条数据!', 'messager');
        return;
    }

    $("input[type='checkbox']:checked[class='registCheckBox']").each(function () {
        $this = $(this).parent().parent();
        var mktaad = $this.find('td').eq(7).text();
        var $dataStatus = ($this.find('td').eq(6).find('span').find('input').val());
        if ($dataStatus == '00'|| $dataStatus == '01' || $dataStatus == '13') {
            top.$.jBox.tip('[' + ($this.find('td').eq(1).find('span').eq(3).text()) + '] 只有绑定待审批才可以撤销!', 'messager');
            return;
        }
        if (mktaad < 1) {
            top.$.jBox.tip('[' + ($this.find('td').eq(1).find('span').eq(3).text()) + '] 请添加用电单元！', 'messager');
            return false;
        }
    });
    // $.ajax({
    //     url: $('#ctx').val() + "/PowerConsumerView/pcview/getFileList",
    //     type: "post",
    //     async: false,
    //     dataType: "json",
    //     data: {
    //         "participantid": ($this.find('td').eq(1).find('span').eq(1).find('input').val())
    //     },
    //     success: function (data) {
    //         if (data.yesOrNo == true) {
    //             affixCount = 1;
    //         }
    //     }
    // });
    // if(affixCount==0){
    //     top.$.jBox.tip('请先上传三方合同附件！', 'messager');
    //     return false;
    // }

    param['consid'] = '';
    param['loadId'] = '';
    param['sign'] = '';
    param['participantname'] = '';
    param['consNo'] = '';
    param['dataStatus'] = '';
    $("input[type='checkbox']:checked[class='registCheckBox']").each(function () {
        $this = $(this).parent().parent();
        param['consid'] = param['consid'] + ($this.find('td').eq(1).find('span').eq(0).find('input').val()) + ",";
        param['loadId'] = param['loadId'] + ($this.find('td').eq(1).find('span').eq(1).find('input').val()) + ",";
        param['sign'] = param['sign'] + ($this.find('td').eq(1).find('span').eq(2).find('input').val()) + ",";
        // param['participantname'] = param['participantname']+($this.find('td').eq(1).find('span').eq(3).text())+",";
        param['consNo'] = param['consNo'] + ($this.find('td').eq(3).text()) + ",";
        // param['dataStatus'] = $dataStatus;
    });
    param['consid'] = param['consid'].substr(0, param['consid'].lastIndexOf(","));
    param['loadId'] = param['loadId'].substr(0, param['loadId'].lastIndexOf(","));
    param['sign'] = param['sign'].substr(0, param['sign'].lastIndexOf(","));
    param['consNo'] = param['consNo'].substr(0, param['consNo'].lastIndexOf(","));
    $.post($('#ctx').val() + '/PowerConsumerView/pcview/submit1?checkcode=' + $('#checkcode').val(), param, function (data) {
        if (data.messageStatus == false) {
            if (data.start == 0) {
                top.$.jBox.tip(data.message, 'messager');
                return;
            } else {
                window.setTimeout(function () {
                    top.$.jBox.tip(data.message, 'success');
                    page($("#pageNo").val(), $("#pageSize").val());
                    location.reload();
                }, 500);
            }
        } else {
            top.$.jBox.tip(data.message, 'messager');
        }
    });
}


/**
 * 提交
 */
function sub() {
    var affixCount = 0;
    var $isChecked = $(".registCheckBox").is(":checked");
    var $this = $(".registCheckBox:checked").parent().parent();
    var stateReturn = 0;
    if ($isChecked == false) {
        top.$.jBox.tip('请至少选择一条数据!', 'messager');
        return;
    }

    $("input[type='checkbox']:checked[class='registCheckBox']").each(function () {
        $this = $(this).parent().parent();
        var mktaad = $this.find('td').eq(7).text();
        var $dataStatus = ($this.find('td').eq(7).find('span').find('input').val());
        if ($dataStatus == '20' || $dataStatus == '22') {
        } else {
            top.$.jBox.tip('[' + ($this.find('td').eq(1).find('span').eq(3).text()) + '] 只有待提交与被驳回的数据才可提交!', 'messager');
            stateReturn = 1;
            return false;
        }
        if (mktaad < 1) {
            top.$.jBox.tip('[' + ($this.find('td').eq(1).find('span').eq(3).text()) + '] 请添加用电单元！', 'messager');
            stateReturn = 1;
            return false;
        }
    });
    // $.ajax({
    //     url: $('#ctx').val() + "/PowerConsumerView/pcview/getFileList",
    //     type: "post",
    //     async: false,
    //     dataType: "json",
    //     data: {
    //         "participantid": ($this.find('td').eq(1).find('span').eq(1).find('input').val())
    //     },
    //     success: function (data) {
    //         if (data.yesOrNo == true) {
    //             affixCount = 1;
    //         }
    //     }
    // });
    // if(affixCount==0){
    //     top.$.jBox.tip('请先上传三方合同附件！', 'messager');
    //     return false;
    // }
    if (stateReturn == 0) {
        param['consid'] = '';
        param['loadId'] = '';
        param['sign'] = '';
        param['participantname'] = '';
        param['consNo'] = '';
        param['dataStatus'] = '';
        $("input[type='checkbox']:checked[class='registCheckBox']").each(function () {
            $this = $(this).parent().parent();
            param['consid'] = param['consid'] + ($this.find('td').eq(1).find('span').eq(0).find('input').val()) + ",";
            param['loadId'] = param['loadId'] + ($this.find('td').eq(1).find('span').eq(1).find('input').val()) + ",";
            param['sign'] = param['sign'] + ($this.find('td').eq(1).find('span').eq(2).find('input').val()) + ",";
            // param['participantname'] = param['participantname']+($this.find('td').eq(1).find('span').eq(3).text())+",";
            param['consNo'] = param['consNo'] + ($this.find('td').eq(3).text()) + ",";
            // param['dataStatus'] = $dataStatus;
        });
        param['consid'] = param['consid'].substr(0, param['consid'].lastIndexOf(","));
        param['loadId'] = param['loadId'].substr(0, param['loadId'].lastIndexOf(","));
        param['sign'] = param['sign'].substr(0, param['sign'].lastIndexOf(","));
        param['consNo'] = param['consNo'].substr(0, param['consNo'].lastIndexOf(","));
        $.post($('#ctx').val() + '/PowerConsumerView/pcview/submit?checkcode=' + $('#checkcode').val(), param, function (data) {
            if (data.messageStatus == false) {
                if (data.start == 0) {
                    top.$.jBox.tip(data.message, 'messager');
                    return;
                } else {
                    window.setTimeout(function () {
                        top.$.jBox.tip(data.message, 'success');
                        page($("#pageNo").val(), $("#pageSize").val());
                    }, 500);
                }
            } else {
                top.$.jBox.alert('<span style=\'font-size:22px; line-height: 22px;\'>总绑定电量已超过3000亿千瓦时阀值！</span>', '消息');
            }
        });
    }
}


/**
 导出
 */
function exportExcel() {
    var submit = function (v, h, f) {
        if (v == true) {
            $('#searchForm').attr('action', $('#ctx').val() + '/PowerConsumerView/pcview/exportExcel');
            jBox.tip("正在导出，请耐心等待...", 'loading');
            $("#searchForm").submit();
        }
        return true;
    };
    jBox.confirm("请确认是否导出？", "确认窗口", submit, {id: 'hahaha', showScrolling: false, buttons: {'是': true, '否': false}});
    return false;
}


function submitObject() {
    $('#searchForm').attr('action', $('#ctx').val() + '/PowerConsumerView/pcview');
    $('#searchForm').submit();
}