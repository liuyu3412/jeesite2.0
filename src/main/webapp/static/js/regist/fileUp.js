var fileName="";
var success=false;

function init() {
	var participantid = getUrlParameter(window.location.href, 'participantid');
	var filetype = getUrlParameter(window.location.href, 'filetype');
	$("#affixtype").val(filetype);
	$("#participantid").val(participantid);
	$.extend($.fn.validatebox.defaults.rules, {
		fjNameRex: {
		    validator: function(value){
//		    var rex=/^1[3-8]\d{9}$/;
		    
		    var rex =/^[a-zA-Z0-9_\u4e00-\u9fa5\.]{2,20}$/;
		    if(rex.test(value))
		    {
		      return true;
		    }else
		    {
		       return false;
		    }
		    },
		    message: '0-20个数字、字母、下划线、汉子组成'
		}
	});
}

function fileSelected() {
	var filePath = $("#attFile").val();
	var file = $("#affixname");
	var index = filePath.lastIndexOf("\\");
	 fileName = filePath.substring(index + 1, filePath.length);
	file.val(fileName);
}

function save() {
	$('#save').attr('disabled','disabled');
	var isValidated = $('#fileUpForm').form('validate');// 验证
	if (isValidated == false) {
		$('#save').removeAttr('disabled','disabled');
		return false;
	}
	// 验证文件名是否有效
	var isLegal = validationFileName($("#attFile").val());
	if (isLegal == false) {
		$.messager.alert('提示消息', "文件类型不合法！");
		$('#save').removeAttr('disabled','disabled');
		return;
	}
	var splitName=fileName.split(".");
	var name=splitName[splitName.length-1];
	if(name!="pdf"){
		$.messager.alert('提示消息', "请上传PDF附件！");
		$('#save').removeAttr('disabled','disabled');
		return;
	}
	document.getElementById("mask-div").style.display="block";
	document.getElementById("down").style.display="block";
	var data = $("#fileUpForm").formJson();
	var url =  "../../pmos/rest/regist/saveFile";
	//var url =  "../../pmos/rest/regist/saveFile";
	post(url, data, function(rc) {
		url =  '../../ETradePublicUtils/rest/fileUpLoad/uploadFile';
		var pkVal = rc.resultValue.guid;
		$("#pkVal").val(pkVal);
		$('#fileForm').form('submit', {
			url : url,
			success : function(result) {
				uploadFileCallBack(result, pkVal);
				if(success==false){
					$.messager.alert('提示消息', "上传成功！");
				}
			}
		});
	});
}

function uploadFileCallBack(result, pkVal) { 
	var o = eval("(" + result + ")");
	if (o.isSuccess) {
		$('#save').removeAttr('disabled','disabled');
		document.getElementById("mask-div").style.display="none";
		document.getElementById("down").style.display="none";
		 window.parent.window.jBox.close();
	} else {
		var url =  "../../pmos/rest/regist/deleteFile";
		getSync(url, {
			guid : pkVal
		})
		if (o.flag == 2 || o.flag == 3) {
			$.messager.alert('提示消息', "文件类型不合法！");
		} else if (o.flag == 4) {
			$.messager.alert('提示消息', "文件大小超过限制(附件大小限制为10M)！");
		} else {
			$.messager.alert('提示消息', "附件上传操作异常！");
		}
		$('#save').removeAttr('disabled','disabled');
		document.getElementById("mask-div").style.display="none";
		document.getElementById("down").style.display="none";
		success=true;
	}
}
