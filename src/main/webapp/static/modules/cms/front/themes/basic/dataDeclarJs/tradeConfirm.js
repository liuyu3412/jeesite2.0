//开始
$(function () {
    setShowtext();
});

function getTotalNum() {
    var param = {
        "tradeseqId": $("#tradeseqId")[0].value,
        "tradeRole": ($("#qrfName")[0].value == "转入方确认" || $("#qrfName")[0].value == "购方确认") ? 0 : 1
    };
    return totalAjax("getTotalNum", param);
}

//同意按钮
function agreeTrade() {
    var totalNum = getTotalNum();
    var val = 0;
    var tradeseqId = $("#tradeseqId")[0].value;
    var res = CommonAjax("list3", {"tradeseqId": tradeseqId});
    for (var i = 0; i < res.length; i++) {
        var next = res[i]
        var bidStatus = next.bidStatus;
        if (bidStatus == '确认方同意') {
            val += Number(next.saleenergy);//值转换为number，然后相加
        }
    }

    var list = $("#contentTable")[0].rows;
    var checkNum = 0;
    for (var i = 1; i < list.length; i++) {
        var date = $(list[i]);
        var evryRow = list[i];
        var ischecked = $(evryRow).find("#checkId")[0].checked;
        var bidstatus = $(evryRow).find("input[id='bidStaId']").val();
        if (ischecked && bidstatus == 3) {
            checkNum += Number(date.find(".saleenergy")[0].innerText);
        }
    }
    if (Number(val + checkNum) > Number(totalNum)) {
        jBox.alert("确认方限额，可用额度为" + (totalNum - val), "提示");
        return
    }
    checkData("1");
}

var ptype = "confirm";

// 不同意按钮
function unAgreeTrade() {
    checkData("2");
}

function cancelBuss() {
    console.log("--------------------------------------------")
    checkData("3");
}

//精度信息框
function setShowtext() {
    var tradeseqId = $("#tradeseqId")[0].value;
    var params = {
        "tradeseqId": tradeseqId
    };
    var jdData = CommonAjax("getJdData", params);
    if (jdData.success) {
        var energyJd = jdData.energyJd;
        var priceJd = jdData.priceJd;
        var isPriceDifference = jdData.isPriceDifference;
        var text = (energyJd < 0 ? ('申报电量精确到' + 1 / Math.pow(10, Math.abs(energyJd)) + '兆瓦时，') : ('按照' + Math.pow(10, Math.abs(energyJd)) + '兆瓦时的整数倍申报电量，'))
            + (priceJd < 0 ? ('申报电价精确到' + 1 / Math.pow(10, Math.abs(priceJd)) + '元/兆瓦时') : ('按照' + Math.pow(10, Math.abs(priceJd)) + '元/兆瓦时的整数倍申报电价'))
            + '；电量单位：兆瓦时，电价单位：元/兆瓦时';
        $("#ldw").text(text);
        //申报模式
        var sbms = (isPriceDifference == 1 ? '电价申报模式：价差模式' : '');
        $("#sbms").text(sbms);
    }
}

//获取table表中数据并上传
function getCheckedlist() {
    var tableRows = $("#contentTable")[0].rows;
    var datas = [];
    for (var i = 1; i < tableRows.length; i++) {
        var data = [];
        var evryRow = tableRows[i];
        var ischecked = $(evryRow).find("#checkId")[0].checked;
        if (ischecked) {
            var id = $(evryRow).find("input[id='checkId']").val();
            var bidstatus = $(evryRow).find("input[id='bidStaId']").val();
            var feedbackidea = $(evryRow).find("input[id='feedbackidea']").val();
            var tradeRole = ($(evryRow).find("input[id='tradeRole']").val() == "购方") ? "0" : "1";
            var json = {
                "id": id,
                "bidstatus": bidstatus,
                "tradeRole": tradeRole,
                "feedbackidea": feedbackidea
            };
            datas.push(json);
        }
    }
    return datas;
}

//确认前校验
function checkData(isAgree) {

    var tradeseqId = $("#tradeseqId")[0].value;
    var res = CommonAjax("getdeclareTimes", {"tradeseqId": tradeseqId});
    var startdate;
    var enddate;
    if (res.success) {
        startdate = res.strarttime;
        enddate = res.endtime;
    } else {
        jBox.alert(res.msg, "消息");
        return;
    }


    var checkcode = $("#checkcode")[0].value;
    var item = CommonAjax("checktime", {});
    if (item.servtime != null) {
        if (item.servtime < startdate || item.servtime > enddate) {// 判断点击申报按钮时服务器时间与交易序列开始结束时间的早晚
            jBox.alert("未在允许申报时间内，无法申报！", "消息");
            return;
        }
    }

    var res1 = CommonAjax("confirmChange", {"tradeseqId": tradeseqId});
    var flag = false;
    if (res1.flag == "true") {
        flag = true;
    } else {
        flag = false;
    }

    var datas = getCheckedlist();
    if (datas.length == 0) {
        jBox.alert("请选择要确认的交易数据！", "消息");
        return;
    }
    var idlist = [];
    for (var i = 0; i < datas.length; i++) {
        idlist.push(datas[i].id);
        var checkBool = false;
        var bidstatus = datas[i].bidstatus.trim().toString();
        switch (datas[i].bidstatus.trim().toString()) {
            case "2":
                /*if(!(config.isDisagree == "1")) {//确认方同意后修改为不同意
                    alert('已经同意的数据不能重复操作！');
                    checkBool = true;
                }*/
                if (!flag) {
                    jBox.alert('已经同意的数据不能重复操作！', "消息");
                    checkBool = true;
                    break;
                } else if (isAgree == 3) {
                    checkBool = false;
                    break;
                } else {
                    jBox.alert('想修改已经同意的数据请点击交易取消！', "消息");
                    checkBool = true;
                    break;
                }
            case "3":
                if (isAgree == 3){
                    jBox.alert('未确认的交易不能取消！', "消息");
                    checkBool = true;
                }
                break;
            case "4":
                jBox.alert('不能提交交易中心已确认的交易！', "消息");
                checkBool = true;
                break;
            case "5":
                top.$.jBox.alert('不同意的数据不能重复操作！', "消息");
                checkBool = true;
                break;
            case "6":
                top.$.jBox.alert("已经撤销的数据不能重复操作！", "消息");
                checkBool = true;
                break;
            case "8":
                top.$.jBox.alert('已经发布的数据不能确认操作！', "消息");
                checkBool = true;
                break;
            case "9":
                jBox.alert('交易中心不同意的数据不能重复操作！', "消息");
                checkBool = true;
                break;
            case "101":
                jBox.alert('单方申请取消交易的数据不能重复操作！', "消息");
                checkBool = true;
                break;
            case "102":
                jBox.alert('交易已取消的数据不能重复操作！', "消息");
                checkBool = true;
                break;
        }
        if (checkBool) {
            return;
        }
    }
    var ids = idlist.join(",");


    if (isAgree !=2){
        var res2 = CommonAjax("checkEnergy", {"tradeseqId": tradeseqId, "ids": ids});
        if (!res2.success) {
            top.$.jBox.alert(res2.msg, "消息");
            return;
        }
    }

    //var tradeseqId = $("#tradeseqId")[0].value;
    var tradeseqName = $("#caption")[0].value;

    var doUrl;
    switch (isAgree) {
        case "1":
            doUrl = "agreeTradeData?checkcode=" + checkcode;
            break;
        case "2":
            doUrl = "disagree?checkcode=" + checkcode;
            break;
        case "3":
            doUrl = "cancelBuss?checkcode=" + checkcode;
            break;
    }

    var res = CommonAjax(doUrl, {"datas": JSON.stringify(datas), "tradeseqId": tradeseqId, "ids": ids});
    if (res.successful) {
        if (isAgree==3){
            top.$.jBox.alert( "已发送至申报方。申报方同意后该交易失效，否则仍然是有效交易。", "消息");
        }else {
            top.$.jBox.alert(res.msg, "消息");
        }
        $("#searchForm").submit();
    } else {
        top.$.jBox.alert(res.msg, "消息");
    }
}

//填写发电量时根据厂用电率折算上网电量
function setVendeeEng(grossEng, genRate) {
    var netEng = grossEng * (1 - genRate);
    $("#netEngId")[0].value = netEng;
}

//新增弹出界面
function newDeclare(vendeeunitid, tradeseqId, vendeeName) {
    var vendName = vendeeName.replace("#", "%23");
    var params = "tradeseqId=" + tradeseqId + "&vendeeUnitsNames=" + vendName + "&vendeeunitsid=" + vendeeunitid;
    var url = this.ctx + "/dljyzx/tradedeclare/form?" + params;
    //全局弹出
    top.$.jBox("iframe:" + url, {
        title: "新增申报数据（发电权）",
        top: 5,
        width: 1040,
        height: 520,
        buttons: {},
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        },
        closed: function () {
            $("#searchForm").submit();
        }
    });
}

//新增保存数据
function saveDeclare() {
    var formData = $("#inputForm")[0];
    //var id  = formData.id.value;
    var vendeeunitsid = formData.vendeeunitsid.value;
    var vendeeUnitsNames = formData.vendeeUnitsNames.value;
    var saleunitsid = formData.saleunitsid.selectedOptions[0].value;
    var saleUnitsNames = formData.saleunitsid.selectedOptions[0].text;
    var vendeegrosseng = formData.vendeegrosseng.value;
    var vendeegenrate = formData.vendeegenrate.value;
    var vendeeenergy = formData.vendeeenergy.value;
    var vendeeprice = formData.vendeeprice.value;
    var tradeseqId = formData.tradeseqId.value;
    var tradeRole = formData.tradeRole.value;
    var res = CommonAjax("getBandId", {"vendeeunitsid": vendeeunitsid, "tradeseqId": tradeseqId});
    var bandId = res.success ? res.bandId : "0";

    var timepartch = document.getElementsByName("timepartcheckEv");
    var timejson = {};
    var timeStr = "";
    for (var i = 0; i < timepartch.length; i++) {
        if (timepartch.length == 1) {
            timeStr = timepartch[i].value;
        } else {
            if (i == (timepartch.length - 1)) {
                timeStr += timepartch[i].value;
            } else {
                timeStr += timepartch[i].value + ",";
            }
        }
    }
    var tradetimepart = timeStr;
    var paramst = {};
    paramst = {
        //"id" : id,
        "marketid": "95412",
        "tradeseqId": tradeseqId,
        "resultpartyid": "9999",
        "vendeeunitsid": vendeeunitsid,
        "vendeeUnitsNames": vendeeUnitsNames,
        "saleunitsid": saleunitsid,
        "saleUnitsNames": saleUnitsNames,
        "vendeegrosseng": vendeegrosseng,
        "vendeegenrate": vendeegenrate,
        "vendeeenergy": parseInt(vendeeenergy),
        "salegrosseng": parseInt(vendeeenergy),
        "saleenergy": parseInt(vendeeenergy),
        "vendeeprice": parseInt(vendeeprice),
        "saleprice": parseInt(vendeeprice),
        "bidstatus": "1",
        "tradetimepart": tradetimepart,
        "bandid": parseInt(bandId),
        "tradeRole": tradeRole
    };
    var savaOrEdit = CommonAjax("saveData", paramst);
    if (savaOrEdit.success) {
        jBox.alert("保存数据成功！", "消息");
        top.$.jBox.close();
    }
}

//编辑弹出界面
function editDeclare() {
    var checkde_val = getCheckedData();
    if (checkde_val.length != 1) {
        jBox.alert("请先选一条记录编辑！", "消息");
        return;
    } else {
        var url = this.ctx + "/dljyzx/tradedeclare/editDataForm?id=" + checkde_val[0];
        //全局弹出
        top.$.jBox("iframe:" + url, {
            title: "编辑交易方申报数据",
            top: 5,
            width: 1040,
            height: 520,
            buttons: {},
            loaded: function (h) {
                $(".jbox-content", top.document).css("overflow-y", "hidden");
            },
            closed: function () {
                $("#searchForm").submit();
            }
        });
    }
}

//编辑申报数据
function editDeclareData() {
    var formData = $("#inputForm")[0];
    var id = formData.id.value;
    var vendeegrosseng = formData.vendeegrosseng.value;
    var vendeeenergy = formData.vendeeenergy.value;
    var vendeeprice = formData.vendeeprice.value;
    var params = {
        "id": id,
        "vendeegrosseng": parseInt(vendeegrosseng),
        "vendeeenergy": parseInt(vendeeenergy),
        "vendeeprice": parseInt(vendeeprice)
    };
    var editRes = CommonAjax("editData", params);
    if (editRes.success) {
        jBox.alert("编辑数据成功！", "消息");
        top.$.jBox.close();
    }
}

//删除
function delDeclare() {
    var checkde_val = getCheckedData();
    if (checkde_val.length == 0) {
        jBox.alert("请选择需要删除的数据！", "提示");
        return;
    } else {
        if (confirm("确定要删除数据吗？")) {
            var idStr = "";
            for (var i = 0; i < checkde_val.length; i++) {
                if (checkde_val.length == 1) {
                    idStr = checkde_val[0];
                } else {
                    if (i == checkde_val.length - 1) {
                        idStr += checkde_val[i];
                    } else {
                        idStr += checkde_val[i] + ",";
                    }
                }
            }
            var json = JSON.stringify(idStr);
            var params = {"id": idStr};
            var res = CommonAjax("delete", params);
            if (res.success) {
                jBox.alert("删除成功！", "消息");
                $("#searchForm").submit();
            }
        }
    }
}

//获取勾选项
function getCheckedData() {
    var checkedobj = document.getElementsByName("btnline");
    var checkde_val = [];
    //alert(checkedobj.length);
    for (k in checkedobj) {
        if (checkedobj[k].checked) {
            checkde_val.push(checkedobj[k].value);
        }
    }
    return checkde_val;
}

//公共ajax
function CommonAjax(methodName, params) {
    var item;
    $.ajax({
        url: this.ctx + "/dljyzx/tradeconfirm/" + methodName,
        dataType: "json",
        data: params,
        type: 'post',
        async: false,
        success: function (data) {
            item = data;
        },
        error: function () {
            jBox.alert("失败！", "消息");
        }
    });
    return item;
}

//公共ajax
function totalAjax(methodName, params) {
    var item;
    $.ajax({
        url: this.ctx + "/dljyzx/tradedeclare/" + methodName,
        dataType: "json",
        data: params,
        type: 'post',
        async: false,
        success: function (data) {
            item = data;
        },
        error: function () {
            jBox.alert("失败！", "消息");
        }
    });
    return item;
}