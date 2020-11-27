var checkItems = new Array();//页码check
var param = {};
var isFreshFlag = '1';
$(function() {
	
})

function fileSelected() {
	var filePath = $("#attfile").val();
	var file = $("#filename");
	var index = filePath.lastIndexOf("\\");
	 fileName = filePath.substring(index + 1, filePath.length);
	file.val(fileName);
}
function validationFileName(fileName) {
	// 限制的类型
	var LIMIT_TYPES = "exe,bat,jsp";
	// 允许类型
	var ALLOW_TYPES = "doc,docx,ppt,pptx,xls,xlsx,vsd,vsdx,wps,et,dps,pdf,ceb,cebx,txt,rtf,oeb,jpg,jpeg,gif,png,bmp,tif,rar,7z,zip";
	var index = fileName.lastIndexOf(".");
	var fileName = fileName.substring(index + 1, fileName.length);
	var num1 = LIMIT_TYPES.indexOf(fileName);
	var num2 = ALLOW_TYPES.indexOf(fileName);
	if (num2 >= 0) {
		return true;
	}
	if (num1 >= 0) {
		return false;
	}
	return true;
}

function save() {
	if($("#controversialtype option:selected").val() == 0){
		 jBox.tip('请选择上报类型！', 'messager');
		 return;
	}
	if($("#filename").val() == ""){
		 jBox.tip('请上传PDF附件！', 'messager');
		 return;
	}
	var rex =/^[a-zA-Z0-9_\u4e00-\u9fa5\.]{2,40}$/;
	if(!rex.test($("#filename").val())){
		 jBox.tip('0-40个数字、字母、下划线、汉字组成！', 'messager');
		 return;
	}
	$('#save').attr('disabled','disabled');
	// 验证文件名是否有效
	var isLegal = validationFileName($("#attfile").val());
	if (isLegal == false) {
		jBox.tip('文件类型不合法！', 'messager');
		$('#save').removeAttr('disabled','disabled');
		return;
	}
	var splitName=fileName.split(".");
	var name=splitName[splitName.length-1];
	if(name!="pdf"){
		jBox.tip('请上传PDF附件！', 'messager');
		$('#save').removeAttr('disabled','disabled');
		return;
	}
	// 模拟2秒后完成操作
	jBox.tip("Loading...", 'loading');
	//var formData = $("#fileForm").serialize();
	$.ajaxFileUpload({  
		type: "POST",  
		url: $('#ctx').val()+'/baNewControversialView/view/save?'+'checkcode='+$('#checkcode').val(), 
		data:{"participantid":$('#participantid').val(),
			  "controversialtype":$("#controversialtype option:selected").val(),
			  "filename":$('#filename').val(),
			  "remarks":$('#remarks').val(),
			  "index":$('#index').val()
			},//要传到后台的参数，没有可以不写  
		secureuri : false,//是否启用安全提交，默认为false  
		fileElementId:'attfile',//文件选择框的id属性  
		dataType: 'JSON',//服务器返回的格式  
		async : false,  
		success: function(data){  
		var dataObject= eval('('+data+')');
			if(dataObject.result=='success'){  
				window.parent.window.isFreshFlag="2";//回写父页面的值
				window.parent.window.consid = dataObject.participantid;
				window.parent.window.index = dataObject.index;
				parent.$.jBox.close();	
			}else{
				if(dataObject.result=='epdf'){
					jBox.tip('文件格式不正确!', 'messager');
				}else{
					jBox.tip('保存失败，系统错误!', 'messager');
				}
				
			}  
		},  
		error: function (data, status, e){  
			//coding  
		}  
	});  
	
	//$('#searchForm').submit();
}



/**
 * 下载附件
 */
function downLoadFile(guid,obj) {
	//下载附件地址（公共方法）
	var sourceguid=guid;
	var url =  $('#ctx').val()+"/PowerConsumerView/bindview/downFileOutnet?guid="+guid + "&sourceguid=" +sourceguid;
	//打开下载窗口
	window.open(url, "_parent");
}


