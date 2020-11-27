var isFreshFlag="1";
var consid = '';
var guid = '';
var status = '';
var checkedIds;
var dataStatus = '';
var checkItems = new Array();//页码check
var param = {};
$(function() {

})

$("input[type='checkbox'][class='registCheckBox']").live('click',function(){	
	$("input[type='checkbox'][class='registCheckBox']").removeAttr("checked");
	$(this).prop("checked", true);
});

$("#contentTable1 tr").mouseover(function(){
    $(this).addClass("over");
	$(this).attr('style','cursor:pointer;');
}).mouseout(function(){
    $(this).removeClass("over");
});

$("#contentTable1 tr td:nth-child(2)").live('click',function(){
	var consid = $(this).find('span').eq(0).find('input').val();
	var loadId = $(this).find('span').eq(1).find('input').val();
	dataStatus = $(this).parent().find('td').eq(6).find('span').find('input').val();
	add(1,dataStatus,consid,loadId);
});

$("#contentTable1 tr td:last-child").live('click',function(){
	var consid = $(this).parent().find('td').eq(1).find('span').eq(0).find('input').val();
	var sessionid = $(this).parent().find('td').eq(1).find('span').eq(1).find('input').val();

	/**
 * 附件查看
 */
	window.parent.window.isFreshFlag="1";
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
		ajaxData : {consid:consid,sessionid:sessionid,allStatus:false}, /*
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
			//$(obj).parent().parent().attr("class",'true');
		}
	});
});



function page(n, s) {
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
function add(obj,dataStatus,consid,loadId){
	top.$.jBox('iframe:'+$('#ctx').val()+'/BaaddSaleCompanyView/bindview', {
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
		ajaxData : {addStatus:obj,participantId : '',consid:consid,loadId:loadId,dataStatus:dataStatus}, /*
						 * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
						 * "id=1"
						 */
		iframeScrolling : 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */

		title : obj == 0 ? '新增电力用户' : '编辑电力用户', /* 窗口的标题 */
		width : 1100, /* 窗口的宽度，值为'auto'或表示像素的整数 */
		height : 700, /* 窗口的高度，值为'auto'或表示像素的整数 */
		bottomText : '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */
		buttons : {
			'确定' : 'ok'
		}, /* 窗口的按钮 */
		buttonsFocus : 0, /* 表示第几个按钮为默认按钮，索引从0开始 */
		loaded : function(h) {
			$(".jbox-content", top.document).css("overflow-y", "hidden");
		},closed: function () {  /* 窗口关闭后执行的函数 */
			$.post($('#ctx').val()+'/PowerConsumerView/pcview/closeSessionGuid','',function(data) {
				return false;
			});
		}
	});
}



/**
 * 绑定已有的用户
 */
function bind() {
	top.$.jBox('iframe:'+$('#ctx').val()+'/PowerConsumerView/bindview', {
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
		ajaxData : {edit : 1,participantId : ''}, /*
						 * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
						 * "id=1"
						 */
		iframeScrolling : 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */

		title : '绑定已有用户', /* 窗口的标题 */
		width : 1100, /* 窗口的宽度，值为'auto'或表示像素的整数 */
		height : 560, /* 窗口的高度，值为'auto'或表示像素的整数 */
		bottomText : '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */
		buttons : {
			'确定' : 'ok'
		}, /* 窗口的按钮 */
		buttonsFocus : 0, /* 表示第几个按钮为默认按钮，索引从0开始 */
		loaded : function(h) {
			$(".jbox-content", top.document).css("overflow-y", "hidden");
		},closed: function () {  /* 窗口关闭后执行的函数 */
			$.post($('#ctx').val()+'/PowerConsumerView/pcview/closeSession','',function(data) {
				return false;
			});
		}
	});
}

/**
 * 提交
 */
function sub(){
	var affixCount = 0;
	var $isChecked = $(".registCheckBox").is(":checked");
	var $this = $(".registCheckBox:checked").parent().parent();
	if ($isChecked == false) {
		jBox.tip('请选择一条数据!', 'messager'); 
		return;
	}
	
	var $dataStatus = ($this.find('td').eq(6).find('span').find('input').val());
	if($dataStatus!='10' && $dataStatus!='20' && $dataStatus!='30'
		&& $dataStatus!='12'&& $dataStatus!='22'&& $dataStatus!='32'){
		jBox.tip('待提交与被驳回的数据才可提交!', 'messager'); 
		return;
	}
	$.ajax({
		url :$('#ctx').val()+"/PowerConsumerView/pcview/getFileList",
		type : "post",
		async : false,
		dataType :"json",
		data:{
			"participantid" : ($this.find('td').eq(1).find('span').eq(1).find('input').val())
		},
		success : function(data){ 
			if(data.yesOrNo == true){
				affixCount =1;
			}
			
		}
	});
	if(affixCount==0){
		jBox.tip('请先上传三方合同附件！', 'messager'); 
		return false;
	}
	param['consid'] = ($this.find('td').eq(1).find('span').eq(0).find('input').val());
	param['loadId'] = ($this.find('td').eq(1).find('span').eq(1).find('input').val());
	param['participantname'] = ($this.find('td').eq(1).find('span').eq(2).text());
	param['consNo'] = ($this.find('td').eq(2).text());
	param['dataStatus'] = $dataStatus;
	$.post($('#ctx').val()+'/PowerConsumerView/pcview/submit?checkcode='+$('#checkcode').val(),param,function(data) {
		if(data.start == 0){
			jBox.tip(data.message, 'messager'); 
			return;
		}else{
			window.setTimeout(function () {
				jBox.tip(data.message, 'success'); 
				page($("#pageNo").val(), $("#pageSize").val());
			}, 500);
		}
	});
}