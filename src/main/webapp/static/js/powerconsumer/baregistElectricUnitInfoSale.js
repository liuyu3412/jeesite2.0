﻿var pageSize = 10;// 每页显示的条数
// 市场成员id
var readOnly="false";
var show="";
var consid="";
var edit="";
var biao="biao";
var participantid="";
var yddy="";
function init() {
	//initParams();
	// 加载表头
	//initLoadGrid();
	// 加载数据
	
	// 初始化 按钮 只读
	//initButtons();
	// 加载数据
	//loadGridData(1);
 
}
function initParams(){
	// 获取参数信息
	var Params = window.location.search;
	//
	if(Params !=null && Params.length>0){
		// 分割参数
		var ppp = Params.split("&");
		// 循环遍历
		for(i=0;i<ppp.length;i++){
			// 市场成员id
			if(ppp[i].indexOf("participantid")!=-1) {
				participantid = ppp[i].substring(ppp[i].indexOf("participantid")+14,ppp[i].length);
			} 
			if(ppp[i].indexOf("show")!=-1) {
				show = ppp[i].substring(ppp[i].indexOf("show")+5,ppp[i].length);
			} 
			if(ppp[i].indexOf("consid")!=-1) {
				consid = ppp[i].substring(ppp[i].indexOf("consid")+7,ppp[i].length);
			}
			if(ppp[i].indexOf("edit")!=-1) {
				edit = ppp[i].substring(ppp[i].indexOf("edit")+5,ppp[i].length);
			}
			if(ppp[i].indexOf("yddy")!=-1){
				yddy = ppp[i].substring(ppp[i].indexOf("yddy")+5,ppp[i].length);
			}
			if(ppp[i].indexOf("readOnly")!=-1){
				readOnly = ppp[i].substring(ppp[i].indexOf("readOnly")+9,ppp[i].length);
			}
			 
		}
		// 设置隐藏框 市场成员id
		$("#participantid").val(participantid);
		
	}
	/**
	 * 加载是否只读信息
	 */
	/*$.ajax({
		url :"/pmos/rest/regist/loadStatus",
		type : "POST",
		async : false,
		dataType :"json",
		data:{
		},
		success : function(data){ 
			// 只读设置
			if(data.resultValue.items[0].readOnly=="true"){
				readOnly="true";
			} 
		}
	
});*/
}
/**
 * 加载表头
 */
function initLoadGrid() {
	$('#yddyTable').datagrid({
		width : 750,
		height:400,
		singleSelect : true,
		fitColumns : true,
		rownumbers : true,
		onClickCell : function(index, field, value) {  
			$(this).datagrid('selectRow', index);
			var item = $(this).datagrid('getSelected');
			if (field == 'loadName') {
				guid = item.guid;
				conssid=item.consid;
				dataStatus = item.dataStatus;
				if(yddy=='1'){
					readOnly = "true";
				}
				// 跳转到查看页面
				var url = "../../pmos/marketMember/baregistElectricUnitDetailInfoSale.jsp?guid="
					+guid+"&dataStatus="+dataStatus+"&readOnly="+readOnly+"&consid="+consid+"&biao="+biao;
				top.$.jBox('iframe:' + url, {
					id : 'viewJzBox1',
					title : "用电单元详细信息",
					width : 950,
					height : 500,
					buttons : {},
					closed:function(){
						loadGridData(1);
					}
				});
			}
		},
		columns : [ [ {
			field:'ck',
			checkbox:true
			},{
			field : 'consid', // 负荷信息ID
			title : 'ID',
			hidden : true
		}, {
			field : 'guid', // 主键
			title : 'guid',
			hidden : true
		}, {
			field : 'loadName',
			title : '用电单元名称',
			align:"left",
			width : 200
		}, {
			field : 'loadTypeName',
			title : '用电单元类型',
			align:"left",
			width : 120
		}, {
			field : 'voltageGradeName',
			title : '用电电压等级',
			align:"right",
			width : 120
		}, {
			field : 'consNo',
			title : '营销用户编号',
			align:"right",
			width : 120
		} ] ],
		// 单击事件 弹出框 详细信息
	});
}

// 加载数据
function loadGridData(pageNum) {  
	 //conssid=$("#considq", parent.document).val();
	// 访问
	var url =  "/pmos/rest/registelectricunitInfoyddy";
	$.ajax({
		url :  "/pmos/rest/regist/registelectricunitInfoyddy",
		type : "post",
		dataType : "json",
		data : {
			"yddy" : yddy,
			"consid" : consid,
			"pageNum" : pageNum,
			"pageSize" : pageSize
		},
		success : function(rc) {
			$("#yddyTable").datagrid('loadData', rc.resultValue.items);
			var itemCount =rc.resultValue.itemCount;
			$('#pagebar').zpagebar({
				curPage: pageNum,
				total: itemCount,
				funName: 'loadGridData'
			});
		},
		error : function(event, request, settings) {
			top.$.messager.alert('消息', '数据已加载，请勿频繁操作!');
		}
	});
}

function getIDS(){
	var rows = $("#yddyTable").datagrid('getSelections');
	var ids = [];
	for(var i = 0; i < rows.length; i++ ) {
		var row = rows[i];
		if(row.jydyId){
			ids.push(row.jydyId)
		}
	}
	return ids;
}

/**
 * 删除按钮
 * @returns
 */
function deleteG(){
	var affixCount = 0;
	var $isChecked = $(".registCheckBox").is(":checked");
	var $this = $(".registCheckBox:checked").parent().parent();
	if ($isChecked == false) {
		jBox.tip('请选择一条数据!', 'messager'); 
		return;
	}
	var submit = function (v, h, f) {
        if (v == true){
            var url = $('#ctx').val()+"/BaaddSaleCompanyView/bindview/deleteGss";
			$.post(url, {guid : $this.find('td').eq(1).find('span').eq(1).find('input').val()}, function(data) {
				if(data.sunccess){
					window.setTimeout(function () {jBox.tip("删除成功！", "success");
						$("#ifr", window.parent.document).attr('src', $("#ifr", window.parent.document).attr('src'));
					}, 500);
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
/**
 * 编辑按钮
 * 
 */
function edit(){
	// 选择数据进行
	var items = $("#yddyTable").datagrid('getSelections');
	if (items.length <= 0) {
		$.messager.alert('消息', "请选择一条数据编辑");
		return;
	}
	var url = "../marketMember/baregistElectricUnitDetailInfo.jsp?" + "guid="
			+ items[0].guid 
			+ "&dataStatus=" + items[0].dataStatus;
	top.$.jBox('iframe:' + url, {
		id : 'viewJzBox',
		title : "查看机组",
		width : 950,
		height : 500,
		buttons : {}
	});
}

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
	var loadId = $(this).find('span').eq(0).find('input').val();
	var guid = $(this).find('span').eq(1).find('input').val();
	add(1,guid);
});

/**
 * 用电单元的新建
 */
function add(obj,guid){
	window.parent.parent.window.isFreshFlag="1";
	var  conssid=$("#considq", parent.document).val();
	var dataStatus = $('#dataStatus',parent.document).val();
	top.$.jBox('iframe:'+$('#ctx').val()+"/BaaddSaleCompanyView/bindview/baregistElectricUnitDetailInfoSale", {
		id:'DetailInfo1',
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
		ajaxData : {obj:obj,guid:guid,dataStatus:dataStatus}, /*
						 * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
						 * "id=1"
						 */
		iframeScrolling : 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */

		title : obj = 0 ? '用电单元详细信息' : '编辑用电单元信息', /* 窗口的标题 */
		width : 1100, /* 窗口的宽度，值为'auto'或表示像素的整数 */
		height : 650, /* 窗口的高度，值为'auto'或表示像素的整数 */
		bottomText : '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */
		buttons : {
			'确定' : 'ok'
		}, /* 窗口的按钮 */
		buttonsFocus : 0, /* 表示第几个按钮为默认按钮，索引从0开始 */
		loaded : function(h) {
			$(".jbox-content", top.document).css("overflow-y", "hidden");
		},
		 closed: function () {  /* 窗口关闭后执行的函数 */
			if(window.parent.parent.window.isFreshFlag=='2'){
				// 模拟0.5秒后完成操作
				window.setTimeout(function () {jBox.tip('保存成功!', 'success'); 
					$("#ifr", window.parent.document).attr('src', $("#ifr", window.parent.document).attr('src'));
				}, 500);
				
				//initFileGrid1(window.parent.parent.window.consid,obj);
            }
		}
	});
}

function page(n, s) {
	$("#pageNo").val(n);
	$("#pageSize").val(s);
	$("#searchForm").submit();
	return false;
}

/**
 * 注册完成
 */
function over(){
	$.ajax({
		url :"/pmos/rest/regist/registOver",
		type : "POST",
		dataType :"json",
		data:{
		},
		success : function(data){
			if(data.successful){
				top.$.messager.alert('提示', "您的注册申请已提交，请等待交易中心审批，您可登录系统查看已提交的信息和审批状态！","info",
				function(){
					// 注册入口
					  top.location.href="/pmos/index/login.jsp";
				}		
				);
			}
		},
		error:function (){
			$.messager.alert('消息', "注册失败！");
		}
});
}

function initButtons(){
	if(readOnly=="true" || yddy=="1"){
		document.getElementById("editG").style.display="none";
		document.getElementById("deleteG").style.display="none";
		// window.parent.document.getElementById("editS").style.display="none";
		
	}
}
