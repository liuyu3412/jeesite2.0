var fileName="";
var success=false;
var param = {};
function init() {
	
}

function fileSelected() {
	var filePath = $("#attFile").val();
	var file = $("#affixname");
	var index = filePath.lastIndexOf("\\");
	 fileName = filePath.substring(index + 1, filePath.length);
	file.val(fileName);
}
/**
 * 验证文件名
 */
function validationFileName(filePath){
	// 限制的类型
	var LIMIT_TYPES = "exe,bat,jpg";
	// 允许类型
	var ALLOW_TYPES = "";
	var index=filePath.lastIndexOf(".");
	var fileName=filePath.substring(index+1,filePath.length);
	var num1=LIMIT_TYPES.indexOf(fileName);
	var num2=ALLOW_TYPES.indexOf(fileName);
	if(num2>=0){
		return true;
	}
	if(num1>=0){
		return false;
	}
	return true;
}

function save() {
	alert(1);
	$('#save').attr('disabled','disabled');
	var isValidated = $('#fileUpForm').form('validate');// 验证
	if (isValidated == false) {
		$('#save').removeAttr('disabled','disabled');
		return false;
	}
	// 验证文件名是否有效
	var isLegal = validationFileName($("#attFile").val());
	if (isLegal == false) {
		jBox.tip('文件类型不合法！', 'messager'); 
		$('#save').removeAttr('disabled','disabled');
		return;
	}
	var splitName=fileName.split(".");
	var name=splitName[splitName.length-1].toUpperCase();
	if(name!="PDF"){
		jBox.tip('请上传PDF附件！', 'messager'); 
		$('#save').removeAttr('disabled','disabled');
		return;
	}
	var formData = new FormData($("#fileUpForm"));
	var path = $('#ctx').val().substring(0,($('#ctx').val().indexOf('/',$('#ctx').val().indexOf('/')+3)));
	var urlSrc = path+"/homePage/saveFile" ;
	//var url =  "../../pmos/rest/regist/saveFile";
	$.ajax({
		url : urlSrc,
		type : "POST",
		data: formData,
	    async: false,
	    cache: false,
	    contentType: false,
	    processData: false,
		success : function(rc) {
			if (rc) {
				debugger;
				if (rc.flag=="success") {
					//top.$.jBox.alert("上传成功!","提示");
					window.parent.window.isFreshFlag="2";//回写父页面的值
					window.parent.window.consid = rc.participantid;
					window.parent.window.guid = rc.guid;
					alert(window.parent.window.guid +'--'+ rc.guid);
					//window.parent.window.jBox.close(true);
                    //刷新当前页
                    /* window.parent.window.reload(); */	
				}else {
					//top.$.jBox.alert("上传失败!","提示");
					jBox.tip('上传失败!', 'messager'); 
				}
			}
		}
	});
	//$.post(path+'/saveFile','',function(data) {
	//	if (data) {
	//			if (data.flag=="success") {
	//				top.$.jBox.alert("保存成功!","提示");
	//				window.parent.window.isFreshFlag="2";//回写父页面的值
	//				window.parent.window.jBox.close(true);
                    //刷新当前页
                    /* window.parent.window.reload(); */	
	//			}else {
	//				top.$.jBox.alert("保存失败!","提示");
	//			}
	//		}
		
	//});
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
