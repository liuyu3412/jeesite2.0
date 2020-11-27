var participantid="";
var filetype="55";
var affixa = "";
var flag = "";
function init(){
	//initParams();
	//isRead();
	//initFileGrid();
}
function isRead(){
	if(read=="1"){
		document.getElementById("cz").style.display="none";
	}
	if(flag=="1"){
		document.getElementById("operatorFile").style.display="none";
	}
}

function page(n, s) {
	$("#pageNo").val(n);
	$("#pageSize").val(s);
	$("#searchForm").submit();
	return false;
}

/**
 * 获取 地址栏传过来的参
 */
function initParams(){
	var Params = window.location.search;
	if(Params !=null && Params.length>0){
		var ppp = Params.split("&");
		for(i=0;i<ppp.length;i++){
			//市场成员id
			if(ppp[i].indexOf("participantid")!=-1) {
				participantid = ppp[i].substring(ppp[i].indexOf("participantid")+14,ppp[i].length);
			
			} 
			if(ppp[i].indexOf("filetype")!=-1) {
				filetype = ppp[i].substring(ppp[i].indexOf("filetype")+9,ppp[i].length);
			
			}
			if(ppp[i].indexOf("affixa")!=-1) {
				affixa = ppp[i].substring(ppp[i].indexOf("affixa")+7,ppp[i].length);
			}
			if(ppp[i].indexOf("flag")!=-1) {
				flag = ppp[i].substring(ppp[i].indexOf("flag")+5,ppp[i].length);
			}
			//市场成员id
		}	
		//设置隐藏框  市场成员id  
	}
}
/**
 * 附件信息加载
 */
function initFileGrid() {//上传附件信息
	$("#fileTable").empty(); // 清空列表
	var url = "../../pmos/rest/regist/getFileListlogin/?affixtype="+affixtype+"&affix="+affixa;
	$('#fileTable').datagrid({
		url :  url,
		width : 798,
		height : 200,
		striped : true,
		async : false,
		singleSelect : true,
		fitColumns : true,
		title: "附件信息",
		queryParams : {
			participantid : participantid
		},
		columns : [ [  {
			field : 'affixname',
			title : '附件名称',
			algin : 'left',
			width : 200
		}, {
			field : 'affixtypeName',
			title : '附件类型',
			algin : 'left',
			width : 140
		}, {
			field : 'uploadtimeString',
			title : '上传时间',
			algin : 'right',
			width : 100
		} ] ],
		rownumbers : true
	});
}


/** **********************************************附件操作************************************************************ */


/**
 * 下载附件
 */
function downLoadFile(guid) {
	//下载附件地址（公共方法）
	var sourceguid=guid;
	var url =  $('#ctx').val()+"/PowerConsumerView/bindview/downFileOutnet?guid="+guid + "&sourceguid=" +sourceguid;
	//打开下载窗口
	window.open(url, "_parent");
}


/**
 * 附件查看
 */
function addFile(sessionid,obj){
	window.parent.window.isFreshFlag="1";
	var consid = sessionid;
	var parid = obj;
	var filetype="55";
	top.$.jBox('iframe:'+$('#ctx').val()+'/PowerConsumerView/pcview/fileUp?start=1', {
		id: null,
		border : 5, /* 窗口的外边框像素大小,必须是0以上的整数 */
		opacity : 0.5, /* 窗口隔离层的透明度,如果设置为0,则不显示隔离层 */
		timeout : 0, /* 窗口显示多少毫秒后自动关闭,如果设置为0,则不自动关闭 */
		showType : 'fade', /* 窗口显示的类型,可选值有:show、fade、slide */
		showSpeed : 'fast', /* 窗口显示的速度,可选值有:'slow'、'fast'、表示毫秒的整数 */
		showIcon : true, /* 是否显示窗口标题的图标，true显示，false不显示，或自定义的CSS样式类名（以为图标为背景） */
		showClose : true, /* 是否显示窗口右上角的关闭按钮 */
		draggable : true, /* 是否可以拖动窗口 */
		dragLimit : true, /* 在可以拖动窗口的情况下，是否限制在可视范围 */	
		dragClone : false, /* 在可以拖动窗口的情况下，鼠标按下时窗口是否克隆窗口 */
		persistent : true, /* 在显示隔离层的情况下，点击隔离层时，是否坚持窗口不关闭 */
		showScrolling : false, /* 是否显示浏览的滚动条 */
		ajaxData : {consid:consid,filetype:filetype,parid:parid}, /*
						 * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
						 * "id=1"
						 */
		iframeScrolling : 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */
		title : '附件信息', /* 窗口的标题 */
		width : 500, /* 窗口的宽度，值为'auto'或表示像素的整数 */
		height : 300, /* 窗口的高度，值为'auto'或表示像素的整数 */
		bottomText : '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */
		//buttons : {
		//	'确定' : 'ok'
		//}, /* 窗口的按钮 */
		buttonsFocus : 0, /* 表示第几个按钮为默认按钮，索引从0开始 */
		loaded : function(h) {
			$(".jbox-content", top.document).css("overflow-y", "hidden");
		},
		 closed: function () {  /* 窗口关闭后执行的函数 */
			
			if(window.parent.window.isFreshFlag=='2'){
				//alert($('#participantid').val()+'--'+$('#pageNo').val() + "--"+ $('#pageSize').val());
				// 模拟0.5秒后完成操作
				window.setTimeout(function () {
					jBox.tip('上传成功!', 'success'); 
					page($("#pageNo").val(), $("#pageSize").val());
				}, 500);
            }
		}
	});
}

/**
 * 附件查看
 */
function addFile1(sessionid,obj){
	window.parent.window.isFreshFlag="1";
	var consid = sessionid;
	var parid = obj;
	var filetype="56";
	top.$.jBox('iframe:'+$('#ctx').val()+'/PowerConsumerView/pcview/fileUp?start=1', {
		id: null,
		border : 5, /* 窗口的外边框像素大小,必须是0以上的整数 */
		opacity : 0.5, /* 窗口隔离层的透明度,如果设置为0,则不显示隔离层 */
		timeout : 0, /* 窗口显示多少毫秒后自动关闭,如果设置为0,则不自动关闭 */
		showType : 'fade', /* 窗口显示的类型,可选值有:show、fade、slide */
		showSpeed : 'fast', /* 窗口显示的速度,可选值有:'slow'、'fast'、表示毫秒的整数 */
		showIcon : true, /* 是否显示窗口标题的图标，true显示，false不显示，或自定义的CSS样式类名（以为图标为背景） */
		showClose : true, /* 是否显示窗口右上角的关闭按钮 */
		draggable : true, /* 是否可以拖动窗口 */
		dragLimit : true, /* 在可以拖动窗口的情况下，是否限制在可视范围 */	
		dragClone : false, /* 在可以拖动窗口的情况下，鼠标按下时窗口是否克隆窗口 */
		persistent : true, /* 在显示隔离层的情况下，点击隔离层时，是否坚持窗口不关闭 */
		showScrolling : false, /* 是否显示浏览的滚动条 */
		ajaxData : {consid:consid,filetype:filetype,parid:parid}, /*
						 * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
						 * "id=1"
						 */
		iframeScrolling : 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */
		title : '附件信息', /* 窗口的标题 */
		width : 500, /* 窗口的宽度，值为'auto'或表示像素的整数 */
		height : 300, /* 窗口的高度，值为'auto'或表示像素的整数 */
		bottomText : '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */
		//buttons : {
		//	'确定' : 'ok'
		//}, /* 窗口的按钮 */
		buttonsFocus : 0, /* 表示第几个按钮为默认按钮，索引从0开始 */
		loaded : function(h) {
			$(".jbox-content", top.document).css("overflow-y", "hidden");
		},
		 closed: function () {  /* 窗口关闭后执行的函数 */
			
			if(window.parent.window.isFreshFlag=='2'){
				//alert($('#participantid').val()+'--'+$('#pageNo').val() + "--"+ $('#pageSize').val());
				// 模拟0.5秒后完成操作
				window.setTimeout(function () {
					jBox.tip('上传成功!', 'success'); 
					page($("#pageNo").val(), $("#pageSize").val());
				}, 500);
            }
		}
	});
}


/**
 * 附件预览
 * @param attid
 */
function showFile(guid){
	$.ajax({
		url :$('#ctx').val()+"/PowerConsumerView/bindview/getattid",
		type : "POST",
		async : false,
		dataType :"json",
		data:{
			"guid" : guid
		},
		success : function(data){
			if(data.successful){
				 attid = data.attid;
				//设置类型
			}else{
				jBox.tip("获取guid失败！", "messager");
			}
		}
	
});
	var url= "/pmos/previewPDF/pagesign.html?id="+attid;
	top.$.jBox("iframe:"+url, {
		id:'DetailInfo3',
		title: '',
		width:900,
		height: 500,
		buttons: {},
		closed:function(){}
	  });
}

/**
 * 删除附件
 * @param attid
 */
function delFile(guid) {
	var submit = function (v, h, f) {
        if (v == true){
            var url = $('#ctx').val()+"/PowerConsumerView/bindview/deleteFile?checkcode="+$('#checkcode').val();
			$.post(url, {guid : guid}, function(data) {
				if(data.sunccess){
					window.setTimeout(function () {
					jBox.tip("删除成功！", "success");
					page($("#pageNo").val(), $("#pageSize").val());
					}, 500);
				}else{
					jBox.tip("删除失败！", "messager");
				}
			});
        }else{
            
		}
        return true;
    };
    jBox.confirm("确定删除该条记录?", "确认窗口", submit, { id:null, showScrolling: false, buttons: { '确认': true, '取消': false } });
}