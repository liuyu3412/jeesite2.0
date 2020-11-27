var isAddPeople = true;
var checkCode = "";
function newBtn(index) {
    $("a[remark='newBtn" + index + "']").parent("td").parent("tr").remove();
}


$(function () {
    var participanttype=$('#participanttype').val();//市场成员类型
    checkCode = $("#checkCode").val();
    $('#participantname').focus();
    powSizeParent();
    var roleNum = $('input[name=roleNum]').val();//登陆用户类型 1:电厂 2:电力
    var flowFlag = $('input[name=flowFlag]').val();//判断流程在哪一步
    var activityInstId = $('input[name=activityInstId]').val();//流程实例ID
    var xuhao = $('input[name=xuhao]').val();//流程序号
    $('.back-to-top').click(function (e) {
        window.scrollTo(0, 0);
    });

    var isremitted = $("#isremitted").val();
    if (isremitted == 0) {
        $(".isShowTd").show();
    } else {
        $(".isShowTd").hide();
    }

    var processFlag=$('input[name=processFlag]').val();//判断是否是不通过的流程
    if(processFlag){
        $('.isHead').hide();
        $('.back-to-top').hide();
    }

    var flag = $('input[name=flag]').val();//当前企业信息状态
    if (flag =='1') {
        $('.showText').text("当前是已生效的市场成员信息");
    } else if (flag == '2') {
        $('.showText').text("当前市场成员信息正处于变更编辑中，还未提交审核");
    } else if (flag == '3') {
        if(flowFlag){
            if(flowFlag=='1'){//如果流程ID为第一步的的情况下(说明在本人手上)，保存和提交审核都存在
                $('input[data-action=commit]').show();
                $('input[data-action=sub]').show();
                $('input[data-action=cannel]').show();
            }else if(flowFlag=='2'){//如果流程在第二步的情况下，只能撤回
                $('input[data-action=cannel]').show();
                $('input[data-action=commit]').hide();
                $('input[data-action=sub]').hide();
            }else{//如果流程走到第三步或以上的情况下，只能查看，所有操作都禁止
                $('input[data-action=cannel]').hide();
                $('input[data-action=commit]').hide();
                $('input[data-action=sub]').hide();
            }
        }
        $('.showText').text("当前变更的市场成员信息已提交，正等待交易中心审批。");
    }
    //如果流程序号大于2 说明该流程已经被人审核过 不可以撤销
    if(xuhao>2){
        $('input[data-action=cannel]').hide();
    }

    var index = 0;
    var ctx = parent.ctx;
    var participantname = '';
    var _starteffectivedate = $('input[name=_starteffectivedate]').val();
    var _endeffectivedate = $('input[name=_endeffectivedate]').val();
    var _dateofissue = $('input[name=_dateOfissue]').val();
    var _expirationDate = $('input[name=_expirationDate]').val();
    //入市日期
    var startDate = new Date(_starteffectivedate);
    if (startDate&&_starteffectivedate) {
        $('input[name=starteffectivedate]').val(startDate.toISOString().substr(0, 10))
    }
    //退市日期
    var endeffectivedate = new Date(_endeffectivedate);
    if (endeffectivedate&&_endeffectivedate) {
        $('input[name=endeffectivedate]').val(endeffectivedate.toISOString().substr(0, 10))
    }
    //许可证生效日期
    var dateofissue = new Date(_dateofissue);
    if (dateofissue&&_dateofissue) {
        $('input[name=dateOfissue]').val(dateofissue.toISOString().substr(0, 10))
    }
    //许可证失效日期
    var expirationDate = new Date(_expirationDate);
    if (expirationDate&&_expirationDate) {
        $('input[name=expirationDate]').val(expirationDate.toISOString().substr(0, 10))
    }
    var areaName = $('input[name=areaName]').val();
    $('#geogrregionIdId').val($('input[name="_geogrregionId"]').val());
    $('#geogrregionIdName').val(areaName);

    $("#upLoadFlie").click(function () {
        var url = top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/insertBaPartaffixInfojsp?checkcode="+checkCode;
        //全局弹出
        top.jBox("iframe:" + url, {
            id:"isFileUplode",
            title: "附件信息",
            width: 600,
            height: 400,
            buttons: {},
            closed: function () {
                initAffix();

            },
            loaded: function (h) {
                $(".jbox-content", top.document).css("overflow-y", "hidden");
            }
        });
    });


    $(".editInfo").click(function () {
        var total = 0;
        $(".editInfo").each(function () {
            total += parseInt($(this).parent("td").prev().find("input").val());
        });
        var a = $(this).parent("td").prev().find("input").val();
        var url = "findbaGengroup?type=2&percent=" + a + "&total=" + total;
        //全局弹出
        $.jBox("iframe:" + url, {
            title: "发电集团信息",
            width: 600,
            height: 250,
            buttons: {},
            closed: function () {
            }
        });
    });

    $("input[data-action=sub]").each(function (i, o) {

        $(o).on('click', function () {
        	var isHasPeople = true;
        	//判断是否有常用联系人
        	$("#resultTable tbody tr").each(function() {
        		if ($(this).find("td:eq(4)").html()=="是") {
        			isHasPeople = false;
        		}
        	});

        	if (isHasPeople) {
        		top.$.jBox.alert("必须有一个常用的企业联系人！",'消息');
        		return false;
        	}
            var isValidated = $('#searchForm').form('validate');
            if (isValidated == false) {
                return false;
            }
            if ($('#searchForm').valid()) {
                var totalPercent = 0;
                var flag = true;
                var numFlag = false;
                var geogrregionIdId = $('input[name=geogrregionId]').val();
                if (!geogrregionIdId) {
                    top.jBox.alert('地理区域不能为空');
                    return;
                }
                if(roleNum=="1"){
                    var gdjName = $('input[name=gdjName]').val();
                    if (!gdjName) {
                        top.jBox.alert('购电结算单位不能为空');
                        return;
                    }
                    var isremitted=$('#isremitted').val();
                    if(isremitted=='0'){
                        var licencecode = $('input[name=licenceCode]').val();
                        if (!licencecode) {
                            top.jBox.alert('电力业务许可证编号不能为空');
                            $('input[name=licencecode]').focus();
                            return;
                        }
                        var dateOfissue = $('input[name=dateOfissue]').val();
                        if (!dateOfissue) {
                            top.jBox.alert('许可证生效日期不能为空');
                            $('input[name=dateOfissue]').focus();
                            return;
                        }
                        var expirationDate = $('input[name=expirationDate]').val();
                        if (!expirationDate) {
                            top.jBox.alert('许可证失效日期不能为空');
                            $('input[name=expirationDate]').focus();
                            return;
                        }
                    }

                    var nullFlag = false;
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
                    if(numFlag){
                        top.jBox.alert('所占股权只能输入数字!');
                        return;
                    }
                    if (nullFlag) {
                        top.jBox.alert('请输入所占股权');
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
                        if (sourceguid) {
                        	json.sourceguid = sourceguid;
						}else {
							json.sourceguid = "";
						}
                        groupRelationList.push(json);
                    })
                    for (var i = 0; i < groupRelationList.length; i++) {
                        for (var j = groupRelationList.length - 1; j > i; j--) {
                            if (groupRelationList[i].gengroupid == groupRelationList[j].gengroupid) {
                                groupRelationFlag = true;
                                break;
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

                    // 验证邮箱
                    var email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
                    if($("#email").val()){
                        if (!email.test($("#email").val())){
                            top.jBox.alert("请输入正确的邮箱!");
                            return;
                        }
                    }


                    // 验证电话
                    var phone = /^1[34578]\d{9}$/;
                    if (!phone.test($("#telephone").val())){
                        top.jBox.alert("请输入正确的手机号码!");
                        return;
                    }

                    // 验证传真
                    var faxphone = /^(0?\d{2,3}\-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
                    if (!faxphone.test($("#faxphone").val())){
                        top.jBox.alert("请输入正确的传真号码!");
                        return;
                    }

                    // 验证邮编
                    var postalcode = /^[0-9][0-9]{5}$/;
                    if (!postalcode.test($("#postalcode").val())){
                        top.jBox.alert("请输入正确的邮政编码!");
                        return;
                    }

                    // 验证办公号码
                    var officephone = /^(0?\d{2,3}\-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
                    if (!officephone.test($("#officephone").val())){
                        top.jBox.alert("请输入正确的办公号码!");
                        return;
                    }
                    if (flag) {
                        $.ajax({
                            url: top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/BaRegGengroup?checkcode="+checkCode,
                            type: "post",
                            async: false,
                            data: {
                                json: JSON.stringify(groupRelationList)
                            },
                            success: function (data) {

                            }
                        });
                        top.$.jBox.tip('保存成功');
                        $("#searchForm").submit();
                    }
                }else{
                    // 验证邮箱
                    var email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
                    if($("#email").val()){
                        if (!email.test($("#email").val())){
                            top.jBox.alert("请输入正确的邮箱!");
                            return;
                        }
                    }

                    // 验证电话
                    var phone = /^1[34578]\d{9}$/;
                    if (!phone.test($("#telephone").val())){
                        top.jBox.alert("请输入正确的手机号码!");
                        return;
                    }

                    // 验证传真
                    var faxphone = /^(0?\d{2,3}\-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
                    if (!faxphone.test($("#faxphone").val())){
                        top.jBox.alert("请输入正确的传真号码!");
                        return;
                    }

                    // 验证邮编
                    var postalcode = /^[0-9][0-9]{5}$/;
                    if (!postalcode.test($("#postalcode").val())){
                        top.jBox.alert("请输入正确的邮政编码!");
                        return;
                    }

                    // 验证办公号码
                    var officephone = /^(0?\d{2,3}\-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
                    if (!officephone.test($("#officephone").val())){
                        top.jBox.alert("请输入正确的办公号码!");
                        return;
                    }

                    $('#uVoltageLevel').val($('#uVoltageLevel_select').val());
                    top.$.jBox.tip('保存成功');
                    $("#searchForm").submit();
                }

            }

        })
    })
    $("#addGufen").click(function () {
        index++;
        var options = "<select name=\"gengroupid\" >";
        $.ajax({
            url: "findbaGengroup",
            type: "post",
            async: false,
            success: function (data) {
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        options += "<option value=" + data[i].gengroupid + " name=\"gengroupid\">"
                            + data[i].gengroupName
                            + "</option>";
                    }
                    options += "</select>";
                }
            }
        });

        var str = "";
        str += "<tr class=\"percentTr\">";
        str += "<td>" + options + "</td>";
        str += "<td><a style=\"color: red\">*</a><input name = \"sharePercent\"></td>";
        str += "<td> ";
        str += "<a href='javascript:void(0)' class=\"link\" onclick='newBtn("
            + index
            + ")' remark=\"newBtn"
            + index + "\">删  除</a>";
        str += "</td>";
        str += "</tr>";
        $("#tableGu tr:last").after(str);

        /* var total = 0;
         $(".editInfo").each(function() {
         total +=  parseInt($(this).parent("td").prev().find("input").val());
         });
         var a = $(this).parent("td").prev().find("input").val();
         var url= "findbaGengroup?type=1&total="+total;
         //全局弹出
         $.jBox("iframe:"+url, {
         title: "发电集团信息",
         width: 600,
         height: 250,
         buttons: {},
         closed:function(){}
         }); */
    });
    //点击添加联系人
    $("#addContact").click(function () {
        isFreshFlag = "1";
        var url = top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/addContactDetailsInfojsp?isAddPeople="+isAddPeople+"&checkcode="+checkCode;
        //全局弹出
        top.$.jBox("iframe:" + url, {
            title: "新增联系人",
            width: 600,
            height: 565,
            buttons: {},
            closed: function () {
                inttRelation();
            },
            loaded: function (h) {
                $(".jbox-content", top.document).css("overflow-y", "hidden");
            }
        });
    });
    //点击提交审核
    $("input[data-action=commit]").each(function (i, o) {
        $(o).on('click', function () {
        	var isHasPeople = true;
        	//判断是否有常用联系人
        	$("#resultTable tbody tr").each(function() {
        		if ($(this).find("td:eq(4)").html()=="是") {
        			isHasPeople = false;
        		}
        	});

        	if (isHasPeople) {
        		top.$.jBox.alert("必须有一个常用的企业联系人！",'消息');
        		return false;
        	}

            var processFlag=$('input[name=processFlag]').val();//判断是否是不通过的流程
            if ($('#searchForm').valid()) {
                var totalPercent = 0;
                var flag = true;
                var numFlag=false;
                var geogrregionIdId = $('input[name=geogrregionId]').val();
                if (!geogrregionIdId) {
                    top.jBox.alert('地理区域不能为空', {top: '10%;'});
                    return;
                }
                var nullFlag = false;
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
                if(numFlag){
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

                //电厂用户才保存股权信息
                if(roleNum=="1"){
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

                    var isremitted=$('#isremitted').val();
                    if(isremitted=='0'){
                        var licencecode = $('input[name=licenceCode]').val();
                        if (!licencecode) {
                            top.jBox.alert('电力业务许可证编号不能为空');
                            $('input[name=licencecode]').focus();
                            return;
                        }
                        var dateOfissue = $('input[name=dateOfissue]').val();
                        if (!dateOfissue) {
                            top.jBox.alert('许可证生效日期不能为空');
                            $('input[name=dateOfissue]').focus();
                            return;
                        }
                        var expirationDate = $('input[name=expirationDate]').val();
                        if (!expirationDate) {
                            top.jBox.alert('许可证失效日期不能为空');
                            $('input[name=expirationDate]').focus();
                            return;
                        }
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
                        if (sourceguid&&sourceguid!='undefined') {
                        	json.sourceguid = sourceguid;
						}else {
							json.sourceguid = "";
						}
                        groupRelationList.push(json);
                    })
                    for (var i = 0; i < groupRelationList.length; i++) {
                        for (var j = groupRelationList.length - 1; j > i; j--) {
                            if (groupRelationList[i].gengroupid == groupRelationList[j].gengroupid) {
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

                    // 验证邮箱
                    var email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
                    if($("#email").val()){
                        if (!email.test($("#email").val())){
                            top.jBox.alert("请输入正确的邮箱!");
                            return;
                        }
                    }

                    // 验证电话
                    var phone = /^1[34578]\d{9}$/;
                    if (!phone.test($("#telephone").val())){
                        top.jBox.alert("请输入正确的手机号码!");
                        return;
                    }

                    // 验证传真
                    var faxphone = /^(0?\d{2,3}\-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
                    if (!faxphone.test($("#faxphone").val())){
                        top.jBox.alert("请输入正确的传真号码!");
                        return;
                    }

                    // 验证邮编
                    var postalcode = /^[0-9][0-9]{5}$/;
                    if (!postalcode.test($("#postalcode").val())){
                        top.jBox.alert("请输入正确的邮政编码!");
                        return;
                    }

                    // 验证办公号码
                    var officephone = /^(0?\d{2,3}\-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
                    if (!officephone.test($("#officephone").val())){
                        top.jBox.alert("请输入正确的办公号码!");
                        return;
                    }

                    $.ajax({
                        url: top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/BaRegGengroup?checkcode="+checkCode,
                        type: "post",
                        async: false,
                        data: {
                            json: JSON.stringify(groupRelationList)
                        },
                        success: function (data) {

                        }
                    });

                }else{
                    // 验证邮箱
                    var email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
                    if($("#email").val()){
                        if (!email.test($("#email").val())){
                            top.jBox.alert("请输入正确的邮箱!");
                            return;
                        }
                    }

                    // 验证电话
                    var phone = /^1[34578]\d{9}$/;
                    if (!phone.test($("#telephone").val())){
                        top.jBox.alert("请输入正确的手机号码!");
                        return;
                    }

                    // 验证传真
                    var faxphone = /^(0?\d{2,3}\-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
                    if (!faxphone.test($("#faxphone").val())){
                        top.jBox.alert("请输入正确的传真号码!");
                        return;
                    }

                    // 验证邮编
                    var postalcode = /^[0-9][0-9]{5}$/;
                    if (!postalcode.test($("#postalcode").val())){
                        top.jBox.alert("请输入正确的邮政编码!");
                        return;
                    }

                    // 验证办公号码
                    var officephone = /^(0?\d{2,3}\-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
                    if (!officephone.test($("#officephone").val())){
                        top.jBox.alert("请输入正确的办公号码!");
                        return;
                    }
                }

                var json = {};
                $('.isParent').find('input').each(function (i, o) {
                    var name = $(o).attr("name");
                    if (name && $(o).val()) {
                        if (name != 'starteffectivedate'
                            && name != "endeffectivedate"
                            && name != "dateOfissue"
                            && name != "founddate"
                            && name != "expirationDate") {
                            json[name] = $(o).val();
                        } else {
                            json[name + "Old"] = $(o).val();
                        }
                    }
                })
                json.participantid = $('input[name=participantid]').val()
                json.companyType = $('#companyType').val();//商业性质
                json.state = $('#state').val();//状态
                json.rating = $('#rating').val();//购电层级
                json.dfdc = $('#dfdc').val();//是否地方电厂
                json.isremitted = $('#isremitted').val();//许可证是否豁免
                json.geogrregionId = $('#geogrregionIdId').val();
                json.uVoltageLevel = $('#uVoltageLevel_select').val();
                //保存企业信息
                $.ajax({
                    url: ctx + "/dljyzx/flow/saveOrUpdate?checkcode="+checkCode,
                    type: "post",
                    data: json,
                    async: false,
                    dataType: "json",
                    success: function (data) {
                        //流程退回后重新提交
                        if(processFlag||$('input[name=flag]').val()=='3'){
                            var businessId=$('input[name=businessId]').val();
                            subProcees(businessId,activityInstId);
                        }else{
                            if (data.entity) {
                                participantname = data.entity.participantName;
                                startFlow(participantname);
                            }
                        }

                    }

                });

            }


        })
    })
    //启动流程
    function startFlow(participantname) {
        var leverList = "";
        $.ajax({
            url: ctx + "/dljyzx/flow/getFlowInfo",
            type: "post",
            async: false,
            success: function (data) {
                if (!data.count > 0) {
                    return;
                } else {
                    var gdj = $('input[name=gdj]').val();
                    var rcCount = data.count;
                    // $.ajax({
                    //     url: ctx + "/dljyzx/flow/gdjcj",
                    //     async: false,
                    //     data: {
                    //         gdj: gdj
                    //     },
                    //     type: "post",
                    //     dataType: "json",
                    //     success: function (msg) {
                    //         if (msg.length > 0) {
                    //             leverList = msg;
                    //         }
                    //     }
                    // });
                    debugger;
                    if (rcCount == 0) {
                        top.jBox.alert('消息', "请先定义一个外网侧的流程");
                        return;
                    } else if (rcCount != 1) {
                        top.jBox.alert('消息', "外网侧的流程只能定义一个!");
                        return;
                    } else {
                        getFlowNodeInfo(data, participantname)
                    }
                }
            }

        });
    }

    //获取流程信息
    function getFlowNodeInfo(data, participantname) {
        $.ajax({
            url: ctx + "/dljyzx/flow/getFlowNodeInfo",
            type: "post",
            data: {
                flowid: data.flowid
            },
            async: false,
            success: function (v) {
                if (!v.result) {
                    top.jBox.info('消息', "请先配置下一个流程节点");
                    return;
                } else if (!v.jsname) {
                    top.jBox.info('消息', "请先配置下一个节点接收人！");
                    return;
                } else {
                    initTree(data, participantname);
                }

            }
        });
    }

    $('#geogrregionIdName').width(205);

    //初始化联系人信息
    var inttRelation = function () {
        $('#resultTable').find('tbody').empty();
        $.post(top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/queryRelationList", function (data) {
            var relationHtml = '';
            isAddPeople = true;
            if (data && data.length > 0) {
                $.each(data, function (i, o) {
                	if (o.iscommon == 1) {
                		isAddPeople = false;
                		$("#telephone").val(o.telephone);
                		$("#email").val(o.email);
                		$("#faxphone").val(o.faxphone);
                		$("#linkman").val(o.linkman);
                		$("#position").val(o.position);
                		$("#faxphone").val(o.faxphone);
					}
					var typeHtml='';
                    if(participanttype!=3){
                        if(flags!="readonly"){
                            typeHtml= '<td><a data-action="delete" href="#"  isDelete="' + o.guid + '" class="link">删 除</a>   <a data-action="edit" href="#" isCommon="'+o.iscommon+'"   isEdit="' + o.guid + '" class="link">修 改</a></td></tr> '
                        }
                    }else{
                        typeHtml='<td></td></tr>'
                    }
                    relationHtml += '<tr><td>' + ((o.linkman) ? o.linkman : '') + '</td>' +
                        '<td>' + ((o.position) ? o.position : '') + '</td>' +
                        '<td>' + ((o.telephone) ? o.telephone : '') + '</td>' +
                        '<td>' + ((o.faxphone) ? o.faxphone : '') + '</td>' +
                        '<td>' + ((o.iscommon == 1) ? '是' : '否') + '</td>' +
                        '<td>' + ((o.email) ? o.email : '') + '</td>' +typeHtml


                })
            } else {
                relationHtml = '<td colspan="6">暂无信息</td>'
            }

            $('#resultTable').find('tbody').append(relationHtml);

            //联系人点击修改
            $('#resultTable').find('a[data-action="edit"]').each(function (i, o) {
                $(o).on('click', function () {
                    var scope = $(this);
                    var guid = $(this).attr('isEdit');
                    var jobNum=$('input[name=jobNum]').val();
                    var isCommon = $(this).attr('isCommon');//判断是否是常用联系人
                    var url = top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/addContactDetailsInfojsp?guid=" + guid+"&isAddPeople="+isAddPeople+"&isCommon="+isCommon+"&checkcode="+checkCode;
                    //全局弹出
                    top.$.jBox("iframe:" + url, {
                        title: "修改联系人",
                        width: 900,
                        height: 565,
                        buttons: {},
                        closed: function () {
                            inttRelation();
                        },
                        loaded: function (h) {
                            $(".jbox-content", top.document).css("overflow-y", "hidden");
                        }
                    });

                })
            })

            //联系人点击删除
            $('#resultTable').find('a[data-action="delete"]').each(function (i, o) {
                $(o).on('click', function () {
                    var scope = $(this);
                    var guid = $(this).attr('isDelete');
                    top.jBox.confirm('确定删除该联系人？', '', function (v, h, f) {
                        if (v == 'ok') {
                            $.post("deleteContactUser?checkcode="+checkCode, {guid: guid}, function (data) {
                                top.jBox.alert('删除成功');
                                inttRelation();
                            })
                        }
                        return true;
                    }, {
                        loaded: function (h) {
                            scope.focus();
                        }
                    });
                })
            })
        })
    }
    inttRelation();


    //初始化股权信息
    function inttPartgrouprelation() {

        $('#tableGu').find('tbody').empty();
        $.post(top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/queryPartgrouprelation", function (data) {
            var partgroupHtml = '';
            var list = data.list;
            var genGroup = data.genGroup;
            if (list && list.length > 0) {
                $.each(list, function (i, o) {
                    var selectHtml = '<select name="gengroupid" ';
                    if(flags=="readonly"){
                        selectHtml+= 'disabled="disabled"';
                    }
                    selectHtml+='>';
                    $.each(genGroup, function (index, v) {
                        if (v.gengroupid == o.gengroupid) {
                            selectHtml += '<option value="' + o.gengroupid + '" name="gengroupid" selected="selected">' + v.gengroupName + '</option>'
                        } else {
                            selectHtml += '<option value="' + v.gengroupid + '" name="gengroupid" >' + v.gengroupName + '</option>'
                        }
                    });
                    selectHtml += "</select>"
                    partgroupHtml += '<tr class="percentTr"><td><input type="hidden" name="groupGuid" value="' + o.guid + '"/>' + selectHtml + '</td>' +
                        '<td>' +
                        '<a style="color: red">*</a>' +
                        '<input name="sharePercent"  value="' + o.sharepercent + '"'
                    if(flags=="readonly"){
                        partgroupHtml +='readonly';
                    }
                    partgroupHtml +='/> <input name="sourceguid" type="hidden" value="'+o.sourceguid+'"/>' +
                    '</td>'
                   if(flags !="readonly"){
                       partgroupHtml += '<td><a data-action="delete" href="#"  isDelete="' + o.guid + '" class="link">删 除</a></td></tr>'
                   }
                })
            }/* else {
             partgroupHtml = '<td colspan="6">暂无信息</td>'
             }*/

            $('#tableGu').find('tbody').append(partgroupHtml);
            //股权点击删除
            $('#tableGu').find('a[data-action="delete"]').each(function (i, o) {
                $(o).on('click', function () {
                    var scope = $(this);
                    var guid = $(this).attr('isDelete');

                    top.$.jBox.confirm('确定删除股权信息？', '', function (v, h, f) {
                            if (v == 'ok') {
                                $.post(top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/delPartGroup?checkcode="+checkCode, {
                                    guid: guid
                                }, function (data) {
                                    top.jBox.alert('删除成功');
                                    // inttPartgrouprelation();
                                    scope.parent("td").parent("tr").remove();
                                })
                            }
                            return true;
                        }, {
                            loaded: function (h) {
                                scope.focus();
                            }
                        }
                    );
                })
            })
        })
    }
    inttPartgrouprelation();




    //初始化附件信息 ------------改过
    var initAffix = function () {
        $('#affixTable').find('tbody').empty();
        $.ajax({
            url : top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/queryAffix",
            type : "post",
            async : false,
            success : function(data) {
                var affixHtml = '';
                if (data && data.length > 0) {
                    $.each(data, function (i, o) {
                        var typeHtml='';
                        if(participanttype!=3){
                            typeHtml='<td>'
                            if(flags!="readonly"){
                                typeHtml+='<a data-action="delete" href="#"  isDelete="' + o.guid + '" class="link">删 除</a>&nbsp;&nbsp;'
                            }
                           typeHtml+='<a href="javascript:void(0);" data-action="downFile" isDown="' + o.guid + '" class="link">下载</a></td></tr>'
                        }else{
                            typeHtml='<td><a href="javascript:void(0);" data-action="downFile" isDown="' + o.guid + '" class="link">下载</a></td></tr>'
                        }
                        affixHtml += '<tr><td>' + ((o.affixname) ? o.affixname : '') + '</td>' +
                            '<td>' + ((o.afffixTypeName) ? o.afffixTypeName : '') + '</td>' +
                            '<td>' + ((o.uploadtime) ? o.uploadtime : '') + '</td>' +typeHtml

                    })
                } else {
                    affixHtml = '<td colspan="6">暂无信息</td>'
                }

                $('#affixTable').find('tbody').append(affixHtml);
                //附件下载
                $('#affixTable').find('a[data-action="downFile"]').each(function (i, o) {
                    $(o).on('click', function () {
                    	var guid = $(this).attr('isDown');
                    	$.post("updownBaPartaffixInfoValida", {guid: guid}, function (data) {
                            if(data){
                            	//下载附件地址（公共方法）
                            	var sourceguid=guid;
                            	var url =  "updownBaPartaffixInfo?sourceGuid="
                            			+guid;
                            	//打开下载窗口
                            	window.open(url, "_parent");
                            	powSizeParent(800);
                           }else {
                        	   top.jBox.alert('附件不存在!');
                           }
                        })


                    })
                })

                //附件点击删除
                $('#affixTable').find('a[data-action="delete"]').each(function (i, o) {
                    $(o).on('click', function () {
                        var scope = $(this);
                        var guid = $(this).attr('isDelete');
                        top.jBox.confirm('确定删除附件吗？', '', function (v, h, f) {
                            if (v === 'ok') {
                                $.post(top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/deleteAffix?checkcode="+checkCode, {guid: guid}, function (data) {
                                    if(data>0){
                                        top.jBox.alert('删除成功');
                                        initAffix();
                                    }

                                })
                            }
                            return true;
                        }, {
                            loaded: function (h) {
                                scope.focus();
                            }
                        });
                    })
                })
            },
        });
    }
    initAffix();
    // setTimeout(function () {
    //
    //
    // },500)

    //点击撤销
    $('input[data-action=cannel]').on('click',function () {
        var businessId=$('input[name=businessId]').val();
        top.jBox.confirm('确定撤销该流程？', '', function (v, h, f) {
            if (v == 'ok') {
                $.post(top.ctx+"/dljyzx/baWaitdo/delete?checkcode="+checkCode,{businessId:businessId},function (data) {
                    if(data>0){
                        top.$.jBox.tip('取消成功');
                        window.location.href = top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/powerPlantsInfo";
                    }
                })
            }
            return true;
        })

    });
    powSizeParent(800);
    //重新提交流程
    var subProcees=function (businessId,activityInstId) {
        var ctxUrl=parent.ctx;
        $.ajax({
            url: ctxUrl + '/dljyzx/bacommonflowinfo/next',
            type: "post",
            async: false,
            dataType: "json",
            data: {
                activityInstId: activityInstId
            },
            success: function (data) {
                if (data.msg == 'successful') {
                    var treeUrl = '/dljyzx/baWaitdo/getRoot';
                    top.$.jBox.open("iframe:" + ctxUrl + "/tag/treeProcess?url=" + encodeURIComponent(treeUrl)
                        + "&flowNodeInstId=" + activityInstId, "选择人员", 300, 420, {
                        buttons: {"确定": "ok", "关闭": true},
                        submit: function (v, h, f) {
                            if (v == "ok") {
                                var tree = h.find("iframe")[0].contentWindow.tree;
                                var ids = [], names = [], nodes = [];
                                nodes = tree.getSelectedNodes();
                                for (var i = 0; i < nodes.length; i++) {
                                    if (nodes[i].isParent) {
                                        continue; // 如果为复选框选择，则过滤掉父节点
                                    }
                                    if (nodes[i].level == 0) {
                                        top.$.jBox.info("不能选择根节点（" + nodes[i].name + "）请重新选择。");
                                        return false;
                                    }
                                    if (nodes[i].isParent) {
                                        top.$.jBox.info("不能选择父节点（" + nodes[i].name + "）请重新选择。");
                                        return false;
                                    }
                                    if (nodes[i].module == "") {
                                        top.$.jBox.info("不能选择公共模型（" + nodes[i].name + "）请重新选择。");
                                        return false;
                                    }
                                    ids.push(nodes[i].id);
                                    names.push(nodes[i].name);
                                    break;
                                }
                                flowProcess(ids, 1, 1);
                                // top.jBox.close(true);
                                // top.jBox.success('审核通过');
                            }
                            else if (v == "clear") {

                            }
                        },
                        loaded: function (h) {
                            $(".jbox-content", top.document).css("overflow-y", "hidden");
                        },
                        closed: function () {
                            // top.jBox.close(true);
                        }
                    });
                    //最后节点
                }
            },
            error: function () {
            }
        });
    }
    var flowProcess=function (ids, returnVal, outcome) {
        var ctxUrl = parent.ctx;
        var activityInstId = $('input[name=activityInstId]').val();//流程实例id
        var businessid = $('input[name=businessId]').val();//业务ID
        // var textarea = $('.istextarea').val();//审批意见
        $.ajax({
            url: ctxUrl + "/dljyzx/flow/tasksSave?checkcode="+checkCode,
            type: "post",
            async: false,
            dataType: "json",
            data: {
                flowNodeInstId: activityInstId,
                businessID: businessid,
                direction: returnVal,
                workitemId: activityInstId,
                outcome: outcome,
                ids: ids.toString(),
                workitem: "",
                flag:'flag'
            },
            success: function (data) {
                if (data.msg && data.msg == 'success') {
                    if(processFlag){
                        localStorage.setItem("processSuccess", "processSuccess");//流程提交成功的标识
                        top.jBox.close(true);
                    }else{
                        if (returnVal == '1') {
                            top.$.jBox.tip('提交成功');
                            window.location.href = top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/powerPlantsInfo";
                        }
                    }

                } else {
                    top.$.jBox.error('提交失败');
                }
            },
            error: function () {

            }

        });
    }

    //选择许可证是否豁免
    $('#isremitted').on('change', function () {
        var isremitted = $("#isremitted").val();
        if (isremitted == 0) {
            $(".isShowTd").show();
        } else {
            $(".isShowTd").hide();
        }
    });

    setTimeout(function () {
        $("#main").parent().parent().removeAttr('style')
    },100)
})


function initTree(getFlowInfo, participantname) {
    var ctx = top.ctx;
    var url = "/dljyzx/flow/choosePerson";
    var participantCode = $("#participantCode").val();
    var flowid = getFlowInfo.flowid;
    var flowName = getFlowInfo.flowname;
    var flowInstName = flowName + "_" + participantname+"_市场成员变更";
    var level1 = 95412001;
    var level2 = '';
    var level3 = '';
    var participantId = $('input[name=participantid]').val();
    top.$.jBox.open("iframe:" + ctx + "/tag/treeProcess?url=" + encodeURIComponent(url)
        + "&flowNodeInstId=" + participantCode + "&flowid=" + flowid, "人员信息", 300, 420, {
        buttons: {"确定": "ok", "关闭": true},
        submit: function (v, h, f) {
            if (v == "ok") {
                var tree = h.find("iframe")[0].contentWindow.tree;
                var ids = [], names = [], nodes = [];
                nodes = tree.getSelectedNodes();
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].isParent) {
                        continue; // 如果为复选框选择，则过滤掉父节点
                    }
                    if (nodes[i].level == 0) {
                        top.$.jBox.info("不能选择根节点（" + nodes[i].name + "）请重新选择。");
                        return false;
                    }
                    if (nodes[i].isParent) {
                        top.$.jBox.info("不能选择父节点（" + nodes[i].name + "）请重新选择。");
                        return false;
                    }
                    if (nodes[i].module == "") {
                        top.$.jBox.info("不能选择公共模型（" + nodes[i].name + "）请重新选择。");
                        return false;
                    }
                    ids.push(nodes[i].id);
                    names.push(nodes[i].name);
                    break; // 如果为非复选框选择，则返回第一个选择  </c:if>
                }
                if(ids.length <= 0){
                    top.$.jBox.alert('请选择下一个节点接收人！', "消息");
                    return false;
                }
                $.ajax({
                    url: ctx + "/dljyzx/flow/sendMarketPartFlow?checkcode="+checkCode,
                    type: "post",
                    data: {
                        flowid: flowid,
                        flowName: flowName,
                        flowInstName: flowInstName,
                        participantId: participantId,
                        level1: level1,
                        level2: level2,
                        level3: level3,
                        userIds: ids.toString(),
                    },
                    async: false,
                    success: function (v) {
                        if (v && v == 'success') {
                            top.$.jBox.tip('提交成功');
                            window.location.href = top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/powerPlantsInfo";
                        } else {
                            top.$.jBox.error('提交失败');
                        }

                    }
                });
            }
            else if (v == "clear") {
            }
        },
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        }
    });
}