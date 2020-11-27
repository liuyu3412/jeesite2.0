//开始
$(function () {
    setShowtext();   //动态显示精度等提示信息
});

//显示浮动规则
function showFloatPrin() {
    var val = $("input[id='isShowfloatprinc']").attr('value');
    var floatVal = $("input[id='floatprinciple']").attr('value');
    if (val == 1) {
        if (floatVal == "不浮动") {
            $('#principle0')[0].checked = true;
        } else if (floatVal == "本着风险共存的原则，若在合同有效期内，国家调整上网电价或目录销售电价，则甲乙双方各承担调整差额的50%") {
            $('#principle1')[0].checked = true;
        } else if (floatVal == "本着风险共存的原则，若在合同有效期内，国家调整上网电价，则甲乙双方各承担调整差额的50%") {
            $('#principle2')[0].checked = true;
        } else if (floatVal == "本着风险共存的原则，若在合同有效期内，国家调整目录销售电价，则甲乙双方各承担调整差额的50%") {
            $('#principle3')[0].checked = true;
        } else {
            $('#principle4')[0].checked = true;
            showQT();
            $('#qt')[0].value = floatVal;
        }
    }
}


function getTotalNum() {
    var param = {
        "tradeseqId": $("#tradeseqId")[0].value,
        "tradeRole": ($("#sbfLabel")[0].value == "转入方申报" || $("#sbfLabel")[0].value == "购方申报") ? 0 : 1
    };
    return CommonAjax("getTotalNum", param);
}

//精度信息框
function setShowtext() {
    var tradeseqId = $("#tradeseqId")[0].value;
    var jdData = CommonAjax("getJdData", {"tradeseqId": tradeseqId});
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

//tab切换table
function myclick(v) {
    var lif = document.getElementById("tab" + v);
    for (var k = 1; k <= 3; k++) {
        var liother = document.getElementById("tab" + k);
        if (k == v) {
            lif.style.backgroundColor = "#5EB1FD";
            liother.childNodes[1].style.color = "#fff";
        } else {
            liother.style.backgroundColor = "";
            liother.childNodes[1].style.color = "#416AA3";
        }
    }
    var divs = document.getElementsByClassName("tab_css");
    for (var i = 0; i < divs.length; i++) {
        var divv = divs[i];
        if (divv == document.getElementById("table" + v)) {
            divv.style.display = "block";
            tabOnChange(divv, 1);
        } else {
            divv.style.display = "none";
        }
    }
}

//切换tab时跳转页
function tabOnChange(divv, thepage) {
    var jydyIds = "";
    var item;
    var tableRow = $("#contentTable").find('tbody');
    for (var i = 0; i < tableRow[0].rows.length; i++) {
        var erow = tableRow.find("input[id='saleunitsid']")[i];
        if (i == (tableRow[0].rows.length - 1)) {
            jydyIds += erow.value;
        } else {
            jydyIds += erow.value + ",";
        }
    }

    var param = {
        "tradeseqId": $("#tradeseqId")[0].value,
        "thepage": thepage
    };
    if (divv.id == "table2") {
        item = CommonAjax("getLimitTableData", param);
        divv.innerHTML = item.table2html;
        if (item.success == false) {
            jBox.alert(item.msg, "消息");
        }
    } else if (divv.id == "table3") {
        item = CommonAjax("getYearLimitTableData", param);
        divv.innerHTML = item.table3html;
        if (item.success == false) {
            jBox.alert(item.msg, "消息");
        }
    }
}

//点击跳转也触发
function getClickPage(thepage, pageSize, val) {
    var divs = document.getElementsByClassName("tab_css");
    for (var i = 0; i < divs.length; i++) {
        var divv = divs[i];
        if (divv.style.display == "block") {
            if (thepage > val || isNaN(thepage)) {
                tabOnChange(divv, 1);
            } else {
                tabOnChange(divv, thepage);
            }
        }
    }
}

function finalCancel(p) {
    var parentNode = $(p).parent().parent();
    var pName = parentNode.children().eq(2).html().trim();
    var pNum = parentNode.children().eq(3).html().trim();
    var pPrice = parentNode.children().eq(4).html().trim();
    var tradeName = $('#caption').val();
    var submit = function (v, h, f) {
        if (v == true) {
            var tradeId = $('#tradeseqId').val();
            var dates = [];
            var json = {
                'id': parentNode.find("input[id='checkId']").val(),
                'bidstatus': parentNode.find("input[id='bidstatusid']").val()
                ,
                'tradeRole': 1,
                'feedbackidea': ""
            };
            dates.push(json)
            console.log(dates);
            var res = CommonAjax("finalCancel", {
                "datas": JSON.stringify(dates),
                "tradeseqId": tradeId,
                "ids": parentNode.find("input[id='checkId']").val()
            });
            jBox.alert(res.msg, "消息");
            if (res.successful) {
                $("#searchForm").submit();
            }
        }
        return true;
    };
    jBox.confirm('确认方' + "现申请取消" + tradeName + "交易序列中与你方已成交交易，电量为：" + pNum + "，电价为：" + pPrice + "。" +
        "请问是否同意？", "确认窗口", submit, {
        id: null,
        top: '25%',
        showScrolling: false,
        buttons: {'同意': true, '不同意': false}
    });
}

//提交数据
function uploadData() {
    var tradeseqId = $("#tradeseqId")[0].value;
    var res = CommonAjax("getdeclareTime", {"tradeseqId": tradeseqId});
    if (!res.success) {
        jBox.alert(res.msg, "消息");
        return;
    }

    var datas = getCheckedlist();
    var checkcode = $("#checkcode")[0].value;
    if (datas.length == 0) {
        jBox.alert("请选择要提交的交易数据！", "消息");
        return;
    }
    var idlist = [];
    for (var i = 0; i < datas.length; i++) {
        idlist.push(datas[i].id);
    }
    if (checkStatus(datas, "提交", "1")) return;
    var ids = idlist.join(",");
    var tradeseqId = $("#tradeseqId")[0].value;
    var tradeseqName = $("#caption")[0].value;
    var res = CommonAjax("uploadDeclare?checkcode=" + checkcode, {
        "tradeseqId": tradeseqId,
        "ids": ids,
        "tradeseqName": tradeseqName
    });
    if (res.success) {
        top.$.jBox.alert("数据申报成功！", "消息");
        $("#searchForm").submit();
    }
}

//检测选择数据中的交易状态
function checkStatus(datas, val, flag) {
    var checkBool = false;
    for (var i = 0; i < datas.length; i++) {
        var bidstatus = datas[i].bidstatus.trim().toString();
        switch (bidstatus) {
            case "2":
                jBox.alert('不能' + val + '确认方已同意的交易！', "消息");
                checkBool = true;
                break;
            case "3":
                jBox.alert('不能' + val + '待确认的交易！', "消息");
                checkBool = true;
                break;
            case "4":
                jBox.alert('不能' + val + '交易中心已确认的交易！', "消息");
                checkBool = true;
                break;
            case "5":
                jBox.alert('不能' + val + '确认方不同意的交易！', "消息");
                checkBool = true;
                break;
            case "6":
                if (flag == "1") {
                    jBox.alert('不能' + val + '申报方撤销的交易！', "消息");
                    checkBool = true;
                    break;
                } else {
                    continue;
                }
            case "8":
                jBox.alert('不能' + val + '结果已经发布的交易！', "消息");
                checkBool = true;
                break;
            case "9":
                jBox.alert('不能' + val + '交易中心不同意的交易！', "消息");
                checkBool = true;
                break;
        }
        return checkBool;
    }
}

//获取table表中数据 
function getCheckedlist() {
    var datas = [];
    var tableRow = $("#contentTable").find('tbody');
    for (var i = 0; i < tableRow[0].rows.length; i++) {
        var rowCheck = tableRow.find("input[id='checkId']")[i];
        if (rowCheck.checked) {
            var data = [];
            var id = rowCheck.value;
            var vendeeunitsid = tableRow.find("input[id='vendeeunitsid']")[i].value;
            var saleunitsid = tableRow.find("input[id='saleunitsid']")[i].value;
            var bidstatus = tableRow.find("input[id='bidstatusid']")[i].value;

            data["id"] = id;
            data["bidstatus"] = bidstatus;
            data["vendeeunitsid"] = vendeeunitsid;
            data["saleunitsid"] = saleunitsid;
            data["index"] = i;
            datas.push(data);
        }
    }
    return datas;
}

//根据切换购方单元查询厂用电率
function changeRateByVenId(vendeeunitsid) {
    var tradeseqId = $("#tradeseqId")[0].value;
    var param = {
        tradeseqId: tradeseqId,
        vendeeunitsid: vendeeunitsid
    };
    var res = CommonAjax("getVenRate", param);
    if (res.success) {
        $("#vendeegenrate")[0].value = res.vendeeRate;
    } else {
        top.$.jBox.alert("未获取到购方厂用电率！", "消息");
    }
}

//填写发电量时根据厂用电率折算上网电量
function setVendeeEng(grossEng, isfdq) {
    var engType = $("#engType").val();
    //发电权类型 且发电量不等于空 且发电量类型
    if (isfdq && grossEng != "" && !isNaN(grossEng) && engType == "1") {
        var jdData = CommonAjax("getJdData", {"tradeseqId": $("#tradeseqId").val()});
        var energyJdTemp;
        //获取精度
        if (jdData.success) {
            energyJdTemp = jdData.energyJdResult;
        }
        var genRate = $("input[id='vendeegenrate']").attr('value');
        var netEng = grossEng * (1 - genRate);
        if (energyJdTemp <= 0) { //精度小于0时
            energyJdTemp = Math.abs(energyJdTemp);
            netEng = netEng.toFixed(energyJdTemp);
        } else {//精度不小于0时
            energyJdTemp = Math.pow(10, Math.abs(energyJdTemp));
            netEng = Math.round(netEng / energyJdTemp) * energyJdTemp;
        }
        $("#netEngId")[0].value = netEng;
    } else {
        $("#saleEngId")[0].value = grossEng;
    }
}

//判断交易类型是否是发电权
function getTypeCodeisFdq(tradeseqId) {
    var param = "tradeseqId=" + tradeseqId;
    var res = CommonAjax("getTypeCode", param);
    var isfdqflag;
    if (res.success) {
        var typeCode = res.typeCode.substring(0, 3);
        if (typeCode == "300") {
            isfdqflag = true;
        } else {
            isfdqflag = false;
        }
    } else {
        jBox.alert(res.msg, "消息");
    }
    return isfdqflag;
}

//新增弹出界面
function newDeclare() {
    var tradeseqId = $("#tradeseqId")[0].value;
    var res = CommonAjax("getdeclareTime", {"tradeseqId": tradeseqId});
    if (!res.success) {
        jBox.alert(res.msg, "消息");
        return;
    }

    var totalNum = getTotalNum();
    var val = 0;
    var res = CommonAjax("list3", {"tradeseqId": tradeseqId});
    for (var i = 0; i < res.length; i++) {
        var next = res[i]
        var bidstatus = next.bidstatus;
        if (bidstatus == '新建' || bidstatus == '确认方同意' || bidstatus == '待确认' || bidstatus == '交易中心同意' || bidstatus == '交易结果发布') {
            val += Number(next.saleenergy);//值转换为number，然后相加
        }
    }
    if (val >= totalNum) {
        jBox.alert("申报限额", "提示");
        return
    }
    var isfdq = getTypeCodeisFdq(tradeseqId);
    if (isfdq) { //发电权 新增
        var vendeeunitsid = $("input[id='vendeeunitsid']").attr('value');
        var vendeeUnitsNames = $("input[id='vendeeUnitsNames']").attr('value');
        var params = "tradeseqId=" + tradeseqId + "&vendeeunitsid=" + vendeeunitsid + "&limitNum=" + (totalNum - val);
        var url = this.ctx + "/dljyzx/tradedeclare/form?" + params;
        //全局弹出
        top.$.jBox("iframe:" + url, {
            title: "新增申报数据",
            top: 5,
            width: 1040,
            height: 560,
            buttons: {},
            loaded: function (h) {
                $(".jbox-content", top.document).css("overflow-y", "hidden");
            },
            closed: function () {
                $("#searchForm").submit();
            }
        });
    } else {//大用户 新增
        var isShowfloatprinc = $("input[id='isShowfloatprinc']").attr('value');
        var params = "tradeseqId=" + tradeseqId + "&isShowfloatprinc=" + isShowfloatprinc;
        var url = this.ctx + "/dljyzx/tradedeclare/dyhform?" + params;
        window.parent.window.news = "0";
        //全局弹出
        top.$.jBox("iframe:" + url, {
            title: "新增申报数据（大用户直接）",
            top: 5,
            width: 1040,
            height: 570,
            buttons: {},
            loaded: function (h) {
                $(".jbox-content", top.document).css("overflow-y", "hidden");
            },
            closed: function () {
                $("#searchForm").submit();
                var tnew = window.parent.window.news;
                if (tnew != "0") {
                    top.$.jBox.alert(tnew, "消息");
                }
            }
        });
    }
}

//新增保存数据（发电权）
function savefdqDeclare() {

    if (Number($("#netEngId").val()) > Number($("#limitNum").val())) {
        jBox.alert("申报电量不能超过" + $("#limitNum").val(), "提示");
        return;
    }

    var tradeseqId = $("#tradeseqId").val();
    var res = CommonAjax("getdeclareTime", {"tradeseqId": tradeseqId});
    if (!res.success) {
        jBox.alert(res.msg, "消息");
        return;
    }
    var jdData = CommonAjax("getJdData", {"tradeseqId": tradeseqId});
    var energyJdTemp;
    if (jdData.success) {
        energyJdTemp = jdData.energyJdResult;
    }

    var isuseGen = $("#isuseGen").val();
    var engType = $("#engType").val();
    var energySource = $("#energySource").val();
    var formData = $("#inputForm")[0];
    var checkcode = $("#checkcode").val();
    var vendeeunitsid = $("#vendeeunitsid").val();
    var vendeeUnitsNames = $("#vendeeunitsid").find("option:selected").text();
    var saleunitsid = $("#gsjydyId").val();
    var saleUnitsNames = $("#gsjydyId").find("option:selected").text();
    var vendisable = $("#netEngId").attr("disabled");
    var vendeegenrate = (isuseGen == '0') ? "" : $("#vendeegenrate").val();
    var netEng = "";
    var grosEng = "";
    //上网电量类型
    if (vendisable != "disabled" && engType != "1") {
        if (energyJdTemp <= 0) { //精度小于等于0
            energyJdTemp = Math.abs(energyJdTemp);
            grosEng = ($("#netEngId").val() / (1 - vendeegenrate)).toFixed(energyJdTemp);
        } else { ////精度大于0
            grosEng = Math.round($("#netEngId").val() / (1 - vendeegenrate)) / energyJdTemp;
        }
    } else if (isuseGen == '0' && engType != "1") { //上网电量类型
        grosEng = "";
    } else {
        grosEng = $("#grosEngId").val();
    }
    var vendeegrosseng = grosEng;
    if (engType != "1") { //上网电量类型
        netEng = $("#netEngId").val();
    } else if (isuseGen == '0') { //不适用厂用电率
        netEng = "";
    } else {
        if (energyJdTemp <= 0) { //精度小于等于0
            energyJdTemp = Math.abs(energyJdTemp);
            netEng = (vendeegrosseng * (1 - vendeegenrate)).toFixed(energyJdTemp);
        } else { //精度大于0
            energyJdTemp = Math.pow(10, (energyJdTemp));
            netEng = Math.round((vendeegrosseng * (1 - vendeegenrate)) / energyJdTemp) * energyJdTemp;
        }
    }
    var vendeeenergy = netEng;
    //var vendeegrosseng  = (vendisable != "disabled" && engType != "1") ? grosEng : ( (isuseGen == '0' && engType != "1") ? "" : $("#grosEngId").val() ); //不使用厂用电率 并且电量类型为 上网电量
    //var vendeeenergy  = (engType != "1")? $("#netEngId").val() : ( (isuseGen == '0') ? "" : netEng);
    var feedbackideasbf = $("#feedbackideasbf").val();  //申报方意见
    var vendeeprice = $("#priceId").val();
    var tradeseqId = $("#tradeseqId").val();
    var tradeRole = $("#tradeRole").val();
    var res = CommonAjax("getBandId", {"vendeeunitsid": vendeeunitsid, "tradeseqId": tradeseqId});
    var bandId = res.success ? res.bandId : "0";

    var timepartch = document.getElementsByName("timepartcheckEv");
    var timedata = [];
    for (var i = 0; i < timepartch.length; i++) {
        if (timepartch[i].checked) {
            timedata.push(timepartch[i].value);
        }
    }
    var timepart = timedata.join(",");

    //保存前校核（发电权）
    var validateRes = validateEngPrice((vendisable != "disabled" && engType != "1") ? $("#netEngId").val() : ((isuseGen == '0' && engType != "1") ? vendeeenergy : vendeegrosseng), vendeeprice, timedata);
    if (validateRes != undefined && !validateRes[0]) {
        var isuseGen = $("#isuseGen").val();
        var engType = $("#engType").val();
        if (validateRes[2] == "energy") { //电量类型
            //上网类型 不适用厂用电率
            if (isuseGen != null && "0" == isuseGen && engType != null && engType != "1") {
                $("#inputForm").find("input[id='netEngId']")[0].style.borderColor = "red";
            } else if (vendisable != "disabled" && engType != null && engType != "1") { //上网类型 且不可见
                $("#inputForm").find("input[id='netEngId']")[0].style.borderColor = "red";
            } else {
                $("#inputForm").find("input[id='grosEngId']")[0].style.borderColor = "red";
            }
            $("#inputForm").find("input[id='priceId']")[0].style.borderColor = "grey";
        } else if (validateRes[2] == "price") { //电价类型
            //不适用厂用电率 且上网类型
            if (isuseGen != null && "0" == isuseGen && engType != null && engType != "1") {
                $("#inputForm").find("input[id='netEngId']")[0].style.borderColor = "grey";
            } else if (vendisable != "disabled" && engType != null && engType != "1") {
                $("#inputForm").find("input[id='netEngId']")[0].style.borderColor = "grey";
            } else {
                $("#inputForm").find("input[id='grosEngId']")[0].style.borderColor = "grey";
            }
            $("#inputForm").find("input[id='priceId']")[0].style.borderColor = "red";
        }
        jBox.alert(validateRes[1], "消息");
        return;
    }

    var paramst = {
        "marketid": "95412",
        "tradeseqId": tradeseqId,
        "resultpartyid": "9999",
        "vendeeunitsid": vendeeunitsid,
        "vendeeUnitsNames": vendeeUnitsNames,
        "saleunitsid": saleunitsid,
        "saleUnitsNames": saleUnitsNames,
        "vendeegrosseng": vendeegrosseng,
        "vendeegenrate": vendeegenrate,
        "vendeeenergy": Number(vendeeenergy),
        "feedbackideasbf": feedbackideasbf,
        "salegrosseng": (vendeegrosseng == "") ? "" : Number(vendeegrosseng),
        "saleenergy": Number(vendeeenergy),
        "vendeeprice": Number(vendeeprice),
        "saleprice": Number(vendeeprice),
        "bidstatus": "1",
        "tradetimepart": timepart,
        "bandid": Number(bandId),
        "tradeRole": tradeRole
    };
    var savaOrEdit = CommonAjax("saveData?checkcode=" + checkcode, paramst);
    if (savaOrEdit.success) {
        jBox.alert("保存数据成功！", "消息");
        top.$.jBox.close();
    }
}

//电量、电价校验函数
function validateEngPrice(eng, price, timedata) {
    if (eng == null || eng == "") {//不做空校验
        return [false, "申报的电量不能为空！", "energy"];
    }
    if (parseFloat(eng) < 0) {//不做空校验
        return [false, "申报的电量不能为负数！", "energy"];
    }
    var v1 = checkNumber(eng);
    if (!v1) {
        return [false, "申报的电量不是有效数字！", "energy"];
    }
    var tradeseqId = $("#tradeseqId")[0].value;
    isSbjy = getisSbjy(tradeseqId);
    var params = {
        "tradeseqId": tradeseqId
    };
    var jdData = CommonAjax("getJdData", params);
    var energyJdTemp;
    var priceJdTemp;
    if (jdData.success) {
        energyJdTemp = jdData.energyJd;
        priceJdTemp = jdData.priceJd;
        /*if(isSbjy){
            energyJdTemp = jdData.energyJdResult;
            priceJdTemp = jdData.priceJdResult;
        }*/
    } else {
        jBox.alert("交易精度获取失败！", "消息");
    }
    if (parseFloat(eng) >= 10000000000000000) {
        return [false, '电量最多16位整数！', "energy"];
    }
    if (energyJdTemp < 0) {
        var va = eng + "";
        va = va.split('.')[1];
        /*if(va == undefined || va == null){
            return [false,'电量需要保留' + Math.abs(energyJdTemp) + '位小数！',"energy"];
        }*/
        if (va && va.length > Math.abs(energyJdTemp)) {
            return [false, '电量最多保留' + Math.abs(energyJdTemp) + '位小数！', "energy"];
        }
    } else {
        var va = parseFloat(eng) % (Math.pow(10, energyJdTemp));
        if (va != 0) {
            return [false, '电量必须为' + Math.pow(10, energyJdTemp) + '的整数倍！', "energy"];
        }
    }

    //电价校核
    var v2 = checkNumber(price);
    if (!v2) {
        return [false, "申报的电价不是有效数字！", "price"];
    }
    if (price == null || price == "") {//如果不显示，不校验
        return [false, "电价不能为空！", "price"];
    }
    if (priceJdTemp < 0) {
        var va = price + "";
        va = va.split('.')[1];
        if ('undefined' != va && va != null) {
            if (va.length > Math.abs(priceJdTemp)) {
                return [false, '电价最多保留' + Math.abs(priceJdTemp) + '位小数！', "price"];
            }
        }
    } else {
        var va = parseFloat(price) % (Math.pow(10, priceJdTemp));
        if (va != 0) {
            return [false, '电价必须为' + Math.pow(10, priceJdTemp) + '的整数倍！', "price"];
        }
    }
    if (parseFloat(price) >= 1000000) {
        return [false, '电价最多6位数！', "price"];
    }

    //时间段验证
    if (!timedata || timedata.length < 1) {
        return [false, '请至少选择一个时间段！', "timepart"];
    }
}

//保存大用户直接
function saveDyhDeclare() {
    var tradeseqId = $("#tradeseqId")[0].value;
    var res = CommonAjax("getdeclareTime", {"tradeseqId": tradeseqId});
    if (!res.success) {
        jBox.alert(res.msg, "消息");
        return;
    }


    var checkcode = $("#checkcode").val();
    var vendeeunitsid = $("#vendeeunitsid").val();
    var vendeeUnitsNames = $("#vendeeunitsid").find("option:selected").text();
    var saleunitsid = $("#saleunitsid").val();
    var saleUnitsNames = $("#saleunitsid").find("option:selected").text();
    var vendeeenergy = $("#netEngId").val();
    var tradepricemargin = $("#pricemargin").val();  //价差成交价格
    var feedbackideasbf = $("#feedbackideasbf").val();  //申报方意见
    var tradeseqId = $("#tradeseqId").val();
    var tradeRole = $("#tradeRole").val();
    var res = CommonAjax("getBandId", {"vendeeunitsid": vendeeunitsid, "tradeseqId": tradeseqId});
    var bandId = res.success ? res.bandId : "0";

    if (!vendeeenergy) {
        console.log(vendeeenergy.length)
        jBox.alert('电量不能为空', "消息");
        return
    }

    var res2 = CommonAjax("../tradeconfirm/checkEnergy2", {
        "tradeseqId": tradeseqId,
        "saleunitsid": saleunitsid,
        "vendeeunitsid": vendeeunitsid,
        "energy": vendeeenergy
    });
    if (!res2.success) {
        jBox.alert(res2.msg, "消息");
        return;
    }

    var timepartch = document.getElementsByName("timepartcheckEv");
    var timeStr = "";
    var timedata = [];
    for (var i = 0; i < timepartch.length; i++) {
        if (timepartch[i].checked) {
            timedata.push(timepartch[i].value);
        }
    }
    var tradetimepart = timedata.join(",");

    //获取输配电价等价格
    var pricelist = getPropValue(vendeeunitsid, saleunitsid);
    if (!pricelist.success) {
        jBox.alert("请检查购方、售方交易单元校核信息，无法保存！", "消息");
        return;
    }
    //获取浮动规则
    if ($("input[id='isShowfloatprinc']").attr('value') == 1) {
        var principle = getPrincple();
    }

    //新增保存前校核（大用户）
    var validateRes = validateEngPrice(vendeeenergy, tradepricemargin, timedata);
    if (validateRes != undefined && !validateRes[0]) {
        if (validateRes[2] == "energy") {
            $("#inputForm").find("input[id='netEngId']")[0].style.borderColor = "red";
            $("#inputForm").find("input[id='pricemargin']")[0].style.borderColor = "grey";
        } else if (validateRes[2] == "price") {
            $("#inputForm").find("input[id='pricemargin']")[0].style.borderColor = "red";
            $("#inputForm").find("input[id='netEngId']")[0].style.borderColor = "grey";
        }
        jBox.alert(validateRes[1], "消息");
        return;
    }


    var res3 = CommonAjax("../tradeconfirm/checkPrice", {
        "tradeseqId": tradeseqId,
        "saleunitsid": saleunitsid,
        "vendeeunitsid": vendeeunitsid,
        "tradepricemargin": tradepricemargin
    });
    if (!res3.success) {
        jBox.alert(res3.msg, "消息");
        return;
    }

    var venprice;
    var salprice;
    var isdifference = $("input[id='isdifference']").attr('value');
    if (isdifference != null && isdifference == '1') { //如果是价差模式
        venprice = (pricelist.catalogPrice ? Number(pricelist.catalogPrice) : 0) + Number(tradepricemargin); //购方价格加上价差价格
        salprice = (pricelist.approvedTariff ? Number(pricelist.approvedTariff) : 0) + Number(tradepricemargin); //售方价格加上价差价格
    } else { //如果不是价差模式
        venprice = tradepricemargin;
        salprice = tradepricemargin;
    }

    var paramst = {
        "tradeseqId": tradeseqId,
        "resultpartyid": "9999",
        "vendeeunitsid": vendeeunitsid,
        "vendeeUnitsNames": vendeeUnitsNames,
        "saleunitsid": saleunitsid,
        "saleUnitsNames": saleUnitsNames,
        "vendeeenergy": Number(vendeeenergy),
        "saleenergy": Number(vendeeenergy),
        "tradepricemargin": Number(tradepricemargin),
        "feedbackideasbf": feedbackideasbf,
        "vendeeprice": venprice, //购方价格加上价差价格
        "saleprice": salprice, //售方价格加上价差价格
        "bidstatus": "1",
        "tradetimepart": tradetimepart,
        "bandid": parseInt(bandId),
        "tradeRole": tradeRole,
        "floatprinciple": principle ? principle.name : "",
        "transferallotprice": pricelist.transferAllotPrice ? Number(pricelist.transferAllotPrice) : 0,   //输配电价
        "netdiscountloss": pricelist.netDiscountPrice ? Number(pricelist.netDiscountPrice) : 0,        //网损电价
        "approvedtariff": pricelist.approvedTariff ? Number(pricelist.approvedTariff) : 0,       //批复上网电价
        "fundsandaddprice": pricelist.fundsAndAddPrice ? Number(pricelist.fundsAndAddPrice) : 0,   //政府基金及补贴
        "catalogprice": pricelist.catalogPrice ? Number(pricelist.catalogPrice) : 0,           //目录电价
        "vendeeloss": pricelist.transferAllotLoss ? Number(pricelist.transferAllotLoss) : 0 //网损率
    };
    var savaRes = CommonAjax("saveDyhData?checkcode=" + checkcode, paramst);
    if (savaRes.success) {
        window.parent.window.news = "保存数据成功！";
        top.$.jBox.close();

    } else {
        top.$.jBox.alert(savaRes.msg, "消息");
    }
}

//获取计算出来的网损输配等电价
function getPropValue(vendeeId, saleId) {  //获取计算出来的网损输配等电价
    var tradeseqId = $("#tradeseqId")[0].value;
    isSbjy = getisSbjy(tradeseqId);
    var params = {
        "tradeseqId": tradeseqId,
        "vendeeunitsid": vendeeId,
        "saleunitsid": saleId
    };
    var res = CommonAjax("getTradePropInfo", params);
    return res;
}

//大用户和售电公司采用相同规则
function getisSbjy(tradeseqId) {
    var param = "tradeseqId=" + tradeseqId;
    var res = CommonAjax("getTypeCode", param);
    var isSbjy;
    if (res.success) {
        var typeCode = res.typeCode.substring(0, 3);
        isSbjy = typeCode == '200' || typeCode == '210' || res.typeCode == '400100' || typeCode == '310' || res.typeCode == '700100';
    }
    return isSbjy;
}

//编辑弹出界面
function editDeclare(itemId, isEditflag, saleId, vendeeId) {
    var tradeseqId = $("#tradeseqId")[0].value;
    var res = CommonAjax("getdeclareTime", {"tradeseqId": tradeseqId});
    if (!res.success) {
        jBox.alert(res.msg, "消息");
        return;
    }

    var checkde_val = getCheckedData();
    var checkdePrice = getCheckedDataPrice();
    var checkcode = $("#checkcode")[0].value;
    if (checkde_val.length != 1 && isEditflag) {
        jBox.alert("请先选一条记录编辑！", "消息");
        return;
    } else {
        var datas = getCheckedlist();
        if (checkStatus(datas, "编辑", "1")) {
            return;
        } else {
            var tradeseqId = $("#tradeseqId").val();
            var isfdq = getTypeCodeisFdq(tradeseqId);
            var checkdId = (itemId == null) ? checkde_val[0] : itemId;
            var vendeeunitsid = (datas[0] == null) ? "" : datas[0].vendeeunitsid
            if (isfdq) { //发电权 新增
                var url = this.ctx + "/dljyzx/tradedeclare/editDataForm?id=" + checkdId + "&isEditflag="
                    + isEditflag + "&checkcode=" + checkcode + "&vendeeunitsid=" + vendeeunitsid;
                //全局弹出
                top.$.jBox("iframe:" + url, {
                    title: (itemId == null) ? "编辑申报数据" : "申报数据详细信息",
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
            } else { //大用户直接
                var checkdId = (itemId == null) ? checkde_val[0] : itemId;
                var saleunitsid = (saleId == null) ? datas[0].saleunitsid : saleId;
                var vendeeunitsid = (vendeeId == null) ? datas[0].vendeeunitsid : vendeeId;
                var isShowfloatprinc = $("input[id='isShowfloatprinc']").attr('value');
                var isdifference = $("input[id='isdifference']").attr('value');
                var params = "id=" + checkdId + "&vendeeunitsid=" + vendeeunitsid + "&saleunitsid=" + saleunitsid
                    + "&isShowfloatprinc=" + isShowfloatprinc + "&isEditflag=" + isEditflag
                    + "&isdifference=" + isdifference + "&checkcode=" + checkcode + "&checkdePrice=" + checkdePrice[0];
                var url = this.ctx + "/dljyzx/tradedeclare/eidtDyhEditForm?" + params;
                //全局弹出
                top.$.jBox("iframe:" + url, {
                    title: (itemId == null) ? "编辑申报数据（大用户）" : "申报数据详细信息（大用户）",
                    top: 5,
                    width: 1040,
                    height: 570,
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
    }
}

//编辑申报数据
function editDeclareData() {

    var tradeseqId = $("#tradeseqId")[0].value;
    var res = CommonAjax("getdeclareTime", {"tradeseqId": tradeseqId});
    if (!res.success) {
        jBox.alert(res.msg, "消息");
        return;
    }
    //获取交易申报数据精度
    var jdData = CommonAjax("getJdData", {"tradeseqId": tradeseqId});
    var energyJdTemp;
    if (jdData.success) {
        energyJdTemp = jdData.energyJdResult;
    }

    var vendeeunitsid = $("#vendeeunitsid").val();
    var vendeeenergy = $("#netEngId").val();
    var saleunitsid = $("#saleunitsid").val();
    var tradeseqId = $("#tradeseqId").val();
    var checkdePrice = $("#checkdePrice").val();

    var res2 = CommonAjax("../tradeconfirm/checkEnergy2", {
        "tradeseqId": tradeseqId,
        "saleunitsid": saleunitsid,
        "vendeeunitsid": vendeeunitsid,
        "energy": vendeeenergy,
        "checkdePrice": checkdePrice
    });
    if (!res2.success) {
        jBox.alert(res2.msg, "消息");
        return;
    }


    var tradeseqId = $("#tradeseqId")[0].value;
    var checkcode = $("#checkcode")[0].value;
    var isfdq = getTypeCodeisFdq(tradeseqId);
    if (isfdq) { //发电权 新增
        var id = $("#id").val();
        var engType = $("#engType").val();
        var isuseGen = $("#isuseGen").val();
        var energySource = $("#energySource").val();
        var vendeegenrate = $("#vendeegenrate").val();
        var vendisable = $("#netEngId").attr("disabled");
        var netEng = "";
        var grosEng = "";
        //如果电量类型是上网类型，发电量如下获取
        if (vendisable != "disabled" && engType != "1") {
            //对电量精度处理
            if (energyJdTemp <= 0) { //精度小于等于0
                energyJdTemp = Math.abs(energyJdTemp);
                grosEng = ($("#netEngId").val() / (1 - vendeegenrate)).toFixed(energyJdTemp);
            } else { //精度大于0
                grosEng = Math.round($("#netEngId").val() / (1 - vendeegenrate)) / energyJdTemp;
            }
        } else if (isuseGen == '0' && engType != "1") {  //如果是没有配厂用电率
            grosEng = "";
        } else {
            grosEng = $("#grosEngId").val();
        }
        var vendeegrosseng = grosEng;
        //var vendeegrosseng  =  (vendisable != "disabled" && engType != "1") ? ($("#netEngId").val() / (1 - vendeegenrate)).toFixed(energyJdTemp) : ( (energySource == "")?$("#grosEngId").val() :( ('0' == isuseGen && engType != '1')? "" : $("#grosEngId").val() ) ); //不选择厂用电量 并且口径不是发电量则为 “”
        //如果电量类型是上网类型 或者 选择了厂用电率 或者 没有选择电量来源
        if ((vendisable != "disabled" && engType != '1') || ('0' == isuseGen && engType != '1') || (energySource == "")) {
            netEng = $("#netEngId").val();
        } else {
            //对电量精度处理
            if (energyJdTemp <= 0) {
                energyJdTemp = Math.abs(energyJdTemp);
                netEng = (vendeegrosseng * (1 - vendeegenrate)).toFixed(energyJdTemp);
            } else { //精度大于0
                energyJdTemp = Math.pow(10, (energyJdTemp));
                netEng = Math.round((vendeegrosseng * (1 - vendeegenrate)) / energyJdTemp) * energyJdTemp;
            }
        }
        var vendeeenergy = netEng;
        //var vendeeenergy  = (vendisable != "disabled") ? $("#netEngId").val() : ( (energySource == "")? $("#netEngId").val() : (('0' == isuseGen && engType != '1') ? $("#netEngId").val() : netEng) );
        var vendeeprice = $("#priceId").val();
        var feedbackideasbf = $("#feedbackideasbf").val();
        //保存前校核（发电权）
        var validateRes = validateEngPrice((vendisable != "disabled" && engType != "1") ? $("#netEngId").val() : (("" == vendeegrosseng) ? vendeeenergy : vendeegrosseng), vendeeprice, ["1"]);
        if (validateRes != undefined && !validateRes[0]) {
            if (validateRes[2] == "energy") { //电量类型
                //上网类型 并且没有选择厂用电率
                if (isuseGen != null && '0' == isuseGen && engType != null && engType != '1') {
                    $("#inputForm").find("input[id='netEngId']")[0].style.borderColor = "red";
                } else if (vendisable != "disabled" && engType != null && engType != "1") { //上网类型
                    $("#inputForm").find("input[id='netEngId']")[0].style.borderColor = "red";
                } else {
                    $("#inputForm").find("input[id='grosEngId']")[0].style.borderColor = "red";
                }
                $("#inputForm").find("input[id='priceId']")[0].style.borderColor = "grey";
            } else if (validateRes[2] == "price") { //电价类型
                $("#inputForm").find("input[id='priceId']")[0].style.borderColor = "red";
                //如果没有选厂用电率 并 上网类型
                if (isuseGen != null && '0' == isuseGen && engType != null && engType != '1') {
                    $("#inputForm").find("input[id='netEngId']")[0].style.borderColor = "grey";
                } else if (vendisable != "disabled" && engType != null && engType != "1") { //上网类型
                    $("#inputForm").find("input[id='netEngId']")[0].style.borderColor = "grey";
                } else {
                    $("#inputForm").find("input[id='grosEngId']")[0].style.borderColor = "grey";
                }
            }
            jBox.alert(validateRes[1], "消息");
            return;
        }

        var res3 = CommonAjax("../tradeconfirm/checkPrice", {
            "tradeseqId": tradeseqId,
            "saleunitsid": saleunitsid,
            "vendeeunitsid": vendeeunitsid,
            "tradepricemargin": tradepricemargin
        });
        if (!res3.success) {
            jBox.alert(res3.msg, "消息");
            return;
        }


        var params = {
            "id": id,
            "vendeegrosseng": ('0' == isuseGen && engType != '1') ? "" : parseFloat(vendeegrosseng),
            "vendeeenergy": ("" == vendeeenergy) ? "" : parseFloat(vendeeenergy),
            "vendeeprice": parseFloat(vendeeprice),
            "feedbackideasbf": feedbackideasbf
        };
        var editRes = CommonAjax("editData?checkcode=" + checkcode, params);
        if (editRes.success) {
            jBox.alert("编辑数据成功！", "消息");
            top.$.jBox.close();
        }
    } else { //大用户直接
        var id = $("#id").val();
        var vendeeenergy = $("#netEngId").val();
        var saleenergy = $("#saleEngId").val();
        var tradepricemargin = $("#pricemargin").val();
        var feedbackideasbf = $("#feedbackideasbf").val();
        var vendeeunitsid = $("#vendeeunitsid").val();
        var saleunitsid = $("#saleunitsid").val();

        //保存前校核（大用户）
        var validateRes = validateEngPrice(vendeeenergy, tradepricemargin, ["1"]);
        if (validateRes != undefined && !validateRes[0]) {
            if (validateRes[2] == "energy") { //电量类型
                $("#inputForm").find("input[id='netEngId']")[0].style.borderColor = "red";
                $("#inputForm").find("input[id='pricemargin']")[0].style.borderColor = "grey";
            } else if (validateRes[2] == "price") {
                $("#inputForm").find("input[id='pricemargin']")[0].style.borderColor = "red";
                $("#inputForm").find("input[id='netEngId']")[0].style.borderColor = "grey";
            }
            jBox.alert(validateRes[1], "消息");
            return;
        }

        var res3 = CommonAjax("../tradeconfirm/checkPrice", {
            "tradeseqId": tradeseqId,
            "saleunitsid": saleunitsid,
            "vendeeunitsid": vendeeunitsid,
            "tradepricemargin": tradepricemargin
        });
        if (!res3.success) {
            jBox.alert(res3.msg, "消息");
            return;
        }

        var venprice;
        var salprice;
        var isdifference = $("input[id='isdifference']").attr('value');
        if (isdifference != null && isdifference == '1') { //如果是价差模式
            venprice = (pricelist.catalogPrice ? Number(pricelist.catalogPrice) : 0) + Number(tradepricemargin); //购方价格加上价差价格
            salprice = (pricelist.approvedTariff ? Number(pricelist.approvedTariff) : 0) + Number(tradepricemargin); //售方价格加上价差价格
        } else { //如果不是输配模式
            venprice = tradepricemargin;
            salprice = tradepricemargin;
        }

        //获取输配电价等价格
        var pricelist = getPropValue(vendeeunitsid, saleunitsid);
        if (!pricelist.success) {
            jBox.alert("请检查购方、售方交易单元校核信息，无法保存！", "消息");
            return;
        }

        //获取浮动规则
        var principle = getPrincple();
        var params = {
            "id": id,
            "tradeseqId": tradeseqId,
            "vendeeenergy": Number(vendeeenergy),
            "saleenergy": Number(saleenergy),
            "vendeeprice": venprice, //购方价格加上价差价格
            "saleprice": salprice, //售方价格加上价差价格
            "tradepricemargin": Number(tradepricemargin),
            "feedbackideasbf": feedbackideasbf,
            "floatprinciple": principle.name,
            "vendeeunitsid": vendeeunitsid,
            "saleunitsid": saleunitsid
        };
        var editRes = CommonAjax("editDyhData?checkcode=" + checkcode, params);
        if (editRes.success) {
            jBox.alert("编辑数据成功！", "消息");
            top.$.jBox.close();
        }
    }
}

//删除
function delDeclare() {
    var tradeseqId = $("#tradeseqId")[0].value;
    var res = CommonAjax("getdeclareTime", {"tradeseqId": tradeseqId});
    if (!res.success) {
        jBox.alert(res.msg, "消息");
        return;
    }
    var checkde_val = getCheckedData();
    var checkcode = $("#checkcode")[0].value;
    if (checkde_val.length == 0) {
        jBox.alert("请选择需要删除的数据！", "提示");
        return;
    } else {
        var datas = getCheckedlist();
        if (checkStatus(datas, "删除", "1")) {
            return;
        } else {
            jBox.confirm("确定要删除数据吗？", "提示", function (v, h, f) {
                if (v == 'ok') {
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
                    var params = {"id": idStr};
                    var res = CommonAjax("delete?checkcode=" + checkcode, params);
                    if (res.success) {
                        top.$.jBox.alert("删除成功！", "消息");
                        $("#searchForm").submit();
                    }
                } else {
                    return;
                }
            });
        }
    }
}

//撤销数据
function unMakeata() {
    var datas = getCheckedlist();
    var checkcode = $("#checkcode")[0].value;
    if (datas.length == 0) {
        jBox.alert("请选择要撤销的交易数据！", "消息");
        return;
    }
    var startdate = $('#startTime')[0].value;
    var enddate = $('#endtime')[0].value;
    var param = {};
    var item = CommonAjax("checktime", param);
    if (item.servtime != null) {
        if (item.servtime < startdate || item.servtime > enddate) {// 判断点击申报按钮时服务器时间与交易序列开始结束时间的早晚
            jBox.alert("未在允许申报时间内，无法撤销！", "消息");
            return;
        }
    }

    //校验登录人是否有权限做删除
    /*sendPost('/pmos/rest/wwtradedeclare/checkLoginUser',{sbf:config.sbf,tradeseqId:config.tradeseqId,ids:ids.join(","),pagetype:ptype},function(data){
        if(!data.successful) {
            $.messager.alert('提示',data.msg||'校验登录人信息，出现异常！');
            consoleFlag = true;
            return false;
        }
    },failCallback);
    if(consoleFlag){return;}*/
    //校验状态
    var idlist = [];
    for (var i = 0; i < datas.length; i++) {
        var sid = datas[i].id;
        idlist.push(sid);
        var res = CommonAjax("queryBidstatus", {"ids": sid});
        if (res.success) {
            var bidstatus = res.bidstatus;
        }
        var checkBool = false;
        //var bidstatus = datas[i].bidstatus.trim().toString();
        switch (bidstatus) {
            case "1":
                jBox.alert('不能撤销新建的交易！', "消息");
                checkBool = true;
                break;
            case "2":
                jBox.alert('不能撤销确认方同意的数据！', "消息");
                checkBool = true;
                break;
            case "4":
                jBox.alert('不能撤销交易中心已确认的交易！', "消息");
                checkBool = true;
                break;
            case "5":
                jBox.alert('不能撤销确认方不同意的交易！', "消息");
                checkBool = true;
                break;
            case "8":
                jBox.alert('不能撤销结果已经发布的交易！', "消息");
                checkBool = true;
                break;
            case "9":
                jBox.alert('不能撤销交易中心不同意的交易！', "消息");
                checkBool = true;
                break;
        }
        if (checkBool) {
            return;
        }
    }
    jBox.confirm("确定要撤销数据吗？", "提示", function (v, h, f) {
        if (v == "ok") {
            var ids = idlist.join(",");
            var tradeseqId = $("#tradeseqId")[0].value;
            var tradeseqName = $("#caption")[0].value;
            var sbf = $("#sbf").val();
            var param = {
                "ids": ids,
                "tradeseqId": tradeseqId,
                "tradeseqCaption": tradeseqName,
                "sbf": sbf
            };
            var res = CommonAjax("consoleTradeseq?checkcode=" + checkcode, param);
            if (res.success) {
                top.$.jBox.alert('撤销成功！', "消息");
                $("#searchForm").submit();
            } else {
                jBox.alert(res.msg || '撤销失败！', "消息");
            }
        } else {
            return;
        }
    });
}

//获取勾选项
function getCheckedData() {

    var checkedobj = document.getElementsByName("btnline");
    var checkde_val = [];
    //alert(checkedobj.length);
    for (var k = 0; k < checkedobj.length; k++) {
        if (checkedobj[k].checked) {
            checkde_val.push(checkedobj[k].value);
        }
    }
    return checkde_val;
}


//获取勾选项的那一行的价格
function getCheckedDataPrice() {

    var checkedobj = document.getElementsByName("btnline");
    var checkde_val = [];
    //alert(checkedobj.length);
    for (var k = 0; k < checkedobj.length; k++) {
        if (checkedobj[k].checked) {
            checkde_val.push($(checkedobj[k]).parent().parent().children().eq(3).text().trim());
        }
    }
    return checkde_val;
}

//获取浮动规则
function getPrincple() {
    var princ = document.getElementsByName("principle");
    var checkdVal = {};
    for (k in princ) {
        if (princ[k].checked) {
            if (princ[k].value == 4) {
                checkdVal.value = princ[k].value;
                checkdVal.name = $("#qt")[0].value;
            } else {
                checkdVal.value = princ[k].value;
                checkdVal.name = princ[k].nextElementSibling.innerHTML;
            }
        }
    }
    return checkdVal;
}

//点击是否显示其他
function ishiddenQT(val) {
    if (val == 1) {
        $("#qt")[0].style.display = "block";
    } else {
        $("#qt")[0].style.display = "none";
    }
}

//判断是否是合法数字
function checkNumber(value) {
    //var zz = new RegExp('^(-?[1-9]\\d*|-?0)(\\.\\d+)?$');
    var zz = new RegExp('^(-?[1-9]\\d*|-?0)(\\.\\d+)?$');
    return zz.test(value);
}

//公共ajax
function CommonAjax(methodName, params) {
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