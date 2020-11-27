var checkItems = new Array();//页码check
var param = {};
$(function() {
	
})
function page(n, s) {
	//inputCheckItems();
	$("#sessionPage").val($("#pageNo").val());
	$("#pageNo").val(n);
	$("#pageSize").val(s);
	$("#searchForm").submit();
	return false;
}
$("input[type='checkbox'][class='registCheckBox']").live('click',function(){
	$("input[type='checkbox']:checked[class='registCheckBox']").each(function(){
		checkItems[$(this).attr('id')] = $(this).val();
	});
	if(typeof($(this).attr('checked')) == 'undefined'){
		checkItems[$(this).attr('id')] = '';
	}
	$('#checkedIds').val(JSON.stringify(checkItems).replace(/\"/g, "").replace(/null/g, ""));
	window.parent.window.checkedIds = $('#checkedIds').val();
	var listCheckBoxPage = $('#listCheckBoxPage').val().replace('[', "").replace(']', "");
	var arr=$('#checkedIds').val().replace('[', "").replace(']', "").split(',');  
	var arrGrep = $.grep(arr, function(n) {return $.trim(n).length > 0;});//清除空值
	var listCheckBoxPageLength = listCheckBoxPage.split(',') == '' ? 0 : listCheckBoxPage.split(',').length;
	var arrGrepLength = arrGrep.length;
	if(listCheckBoxPageLength > 10 || (listCheckBoxPageLength+arrGrepLength) > 10){
		this.checked = false;
		jBox.tip('最多选中数据不可超过10条!', 'messager');
		return;
	}
});

//获取分页选中项
function inputCheckItems(){
	
}
//删除TR
function del(obj){
	$(obj).parent().parent().remove();
}

$("#contentTable1 tr").mouseover(function(){
    $(this).addClass("over");
	$(this).attr('style','cursor:pointer;');
}).mouseout(function(){
    $(this).removeClass("over");
});
//点击市场成员名称查看详情
$("#contentTable1 tr td:nth-child(2)").live('click',function(){
	$(this).find('span').find('input').val();
});

/**
 * 绑定
 */
function add() {
	//inputCheckItems();
	var checkedIds = $('#checkedIds').val();
	var arrGrep = $.grep(checkItems, function(n) {return $.trim(n).length > 0;});//清除空值
	if ($('#countCheckBox').val() <= 0 && arrGrep.length <= 0) {
		jBox.tip("Loading...", 'loading');
         // 模拟2秒后完成操作
        window.setTimeout(function () {jBox.tip('请选择一条数据!', 'messager'); }, 2000);
        return;
	}else{
		top.$.jBox('iframe:'+$('#ctx').val()+'/PowerConsumerView/pcview/powerconsumerlist', {
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
		ajaxData : {checkedIds : checkedIds,pageNo:$("#pageNo").val()}, /*
						 * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
						 * "id=1"
						 */
		iframeScrolling : 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */
		title : '', /* 窗口的标题 */
		width : 1000, /* 窗口的宽度，值为'auto'或表示像素的整数 */
		height : 650, /* 窗口的高度，值为'auto'或表示像素的整数 */
		bottomText : '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */
		buttons : {
			'确定' : 'ok'
		}, /* 窗口的按钮 */
		buttonsFocus : 0, /* 表示第几个按钮为默认按钮，索引从0开始 */
		loaded : function(h) {
			$(".jbox-content", top.document).css("overflow-y", "hidden");
		},closed: function () {  /* 窗口关闭后执行的函数 */
			//$.post($('#ctx').val()+'/PowerConsumerView/pcview/closeConsidSession','',function(data) {
				//return false;
			//});
		}
	});
	}
}

/**
 * 增加附件
 */
function addFile1(filetype,obj) {
	window.parent.window.isFreshFlag="1";
	var consid = $(obj).parent().parent().find('td').eq(0).find('span').eq(2).find('input').val();
	
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
		ajaxData : {consid:consid,filetype:filetype}, /*
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
			$(obj).parent().parent().attr("class",true);
			if(window.parent.window.isFreshFlag=='2'){
				// 模拟0.5秒后完成操作
				window.setTimeout(function () {jBox.tip('上传成功!', 'success'); }, 500);
				initFileGrid1(window.parent.window.consid,obj);
            }
		}
	});
}


//保存
function save(consid,parid,obj){
	param['consid'] = consid;	
	param['parid'] = parid;
	param['dateStart'] = 1;
	var saved = $(obj).parent().parent().attr("class");
	var consid = $(obj).parent().parent().find('td').eq(0).find('span').eq(1).find('input').val();
	var effectiveData = $(obj).parent().parent().find('td').eq(1).find('input').eq(0).val();
	var expiryDate = $(obj).parent().parent().find('td').eq(2).find('input').eq(0).val();
	var agencyEnergy = $(obj).parent().parent().find('td').eq(3).find('input').eq(0).val();
	if(expiryDate == '' || effectiveData == ''){
		 // 
		jBox.tip('请填写开始与结束时间！', 'messager');
        return;
	}
	if(expiryDate < effectiveData){
		jBox.tip('结束时间不能小于开始时间！', 'messager');
		return;
	}
	if(saved == 'false'){
	    jBox.tip("Loading...", 'loading');
         // 模拟2秒后完成操作
		window.setTimeout(function () {jBox.tip('请先上传附件！', 'messager'); }, 2000);
        return;
	}else{
		param['effectiveData'] = effectiveData;
		param['expiryDate'] = expiryDate;
	//查询该用户在该时间段内是否存在与其他售电公司绑定关系
		$.post($('#ctx').val()+'/PowerConsumerView/pcview/checkBindEdit',param,function(data) {
			jBox.tip("Loading...", 'loading');
			var message = data.message;
			var start = data.start;
			if(start == "message"){
				 // 模拟2秒后完成操作
				window.setTimeout(function () {jBox.tip(message, 'messager'); }, 2000);
				return;
			}else{
				//window.setTimeout(function () {jBox.tip(message, 'messager'); }, 2000);
				param['agencyEnergy'] = agencyEnergy;
				param['status'] = '2';
				$.post($('#ctx').val()+'/PowerConsumerView/pcview/bindEdit?checkcode='+$('#checkcode').val(),param,function(data) {
					if(data.message == 'success'){
						jBox.tip('保存成功！', 'success');
						$(obj).parent().parent().remove();
					}else{
						jBox.tip('保存失败！', 'messager');
					}
				});
			}
		});
	}
}


function initFileGrid1(consid,obj) { 
	//加载附件地址
	var url = $('#ctx').val()+"/PowerConsumerView/bindview/getFileList";
	$.ajax({
		url :url,
		type : "POST",
		async : false,
		dataType :"json",
		data:{"participantid" : consid},
		success : function(data){ 
		// 
			var baGuidList = data.baGuidList
			//只读设置
			 for(var i=0;i<baGuidList.length;i++){ 
				 var guid=baGuidList[i].guid;
					   if(baGuidList[i].affixtype==31){
							var guid31=guid;
							var guidid = $(obj).parent();
							var parentParent = $(obj).parent().parent();
							guidid.find('a').eq(1).unbind("click").bind("click",function(){ 
									delFile(guid31,obj); 
								});
							guidid.find('a').eq(2).bind("click",function(){ 
									downLoadFile(guid31,obj); 
									});
							parentParent.find('td').eq(0).find('span').eq(2).find('input').val(baGuidList[i].participantid);
							guidid.find('a').eq(0).attr('style','display: none;text-decoration: underline;cursor: pointer;color:#4F81BD;');
							guidid.find('a').eq(1).attr('style','text-decoration: underline;cursor: pointer;color:#4F81BD;');
							guidid.find('a').eq(2).attr('style','text-decoration: underline;cursor: pointer;color:#4F81BD;');
							 //id31=true;
						}
			
			}
		}
	
	});
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


/**
 * 附件查看
 */
function addFiles(status,obj){
	window.parent.window.isFreshFlag="1";
	var consid = $(obj).parent().parent().find('td').eq(0).find('span').eq(1).find('input').val();
	var sessionid = $(obj).parent().parent().find('td').eq(0).find('span').eq(2).find('input').val();
	top.$.jBox('iframe:'+$('#ctx').val()+'/PowerConsumerView/bindview/UserFileUp', {
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
		ajaxData : {status:status,consid:consid,sessionid:sessionid,allStatus:false}, /*
						 * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
						 * "id=1"
						 */
		iframeScrolling : 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */
		title : '附件信息', /* 窗口的标题 */
		width : 1000, /* 窗口的宽度，值为'auto'或表示像素的整数 */
		height : 650, /* 窗口的高度，值为'auto'或表示像素的整数 */
		bottomText : '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */
		//buttons : {
		//	'确定' : 'ok'
		//}, /* 窗口的按钮 */
		buttonsFocus : 0, /* 表示第几个按钮为默认按钮，索引从0开始 */
		loaded : function(h) {
			$(".jbox-content", top.document).css("overflow-y", "hidden");
		},
		 closed: function () {  /* 窗口关闭后执行的函数 */
			$(obj).parent().parent().attr("class",'true');
			//window.setTimeout(function () {jBox.tip(message, 'messager'); }, 2000);
		}
	});
}


/**
 * 附件删除后重新加载
 */
function LoadFile(obj){
		var guidid = $(obj).parent();
		guidid.find('a').eq(0).attr('style','text-decoration: underline;cursor: pointer;color:#4F81BD;');
		guidid.find('a').eq(1).attr('style','display: none;text-decoration: underline;cursor: pointer;color:#4F81BD;');
		guidid.find('a').eq(2).attr('style','display: none;text-decoration: underline;cursor: pointer;color:#4F81BD;');
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
function delFile(guid,obj) {
	var submit = function (v, h, f) {
        if (v == true){
            var url = $('#ctx').val()+"/PowerConsumerView/bindview/deleteFile";
			$.post(url, {guid : guid}, function(data) {
				if(data.sunccess){
					$(obj).parent().parent().attr("class",false);
					jBox.tip("删除成功！", "success");
					LoadFile(obj);
				}else{
					jBox.tip("删除失败！", "messager");
				}
			});
        }else{
            
		}
        return true;
    };
    jBox.confirm("确定删除该条记录?", "确认窗口", submit, { id:'hahaha', showScrolling: false, buttons: { '确认': true, '取消': false } });
}