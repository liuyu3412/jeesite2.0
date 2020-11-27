/**
 * 增加审计全局变量
 */
var me = window;// 定义全局变量
var map = new myMap;
me.energyunits = "MWh";
me.capacityunit = 'MW';
var minprice = null;
var maxprice = null;
var sid = null;
var stime = null;
var sum_Energy1 = 0;//表示同意交易单元不同时间段的电量总和;
var sum_Energy = 0;// 表示同一交易单元同一时间段各阶梯电量(总)总和；
var sum_jf_Energy = 0;// 表示同一交易单元同一时间段各阶梯电量(尖峰)总和；
var sum_f_Energy = 0;// 表示同一交易单元同一时间段各阶梯电量(峰)总和；
var sum_p_Energy = 0;// 表示同一交易单元同一时间段各阶梯电量(平)总和；
var sum_g_Energy = 0;// 表示同一交易单元同一时间段各阶梯电量(谷)总和；
var sum_dg_Energy = 0;// 表示同一交易单元同一时间段各阶梯电量(低谷)总和；
var sum_matchjydyid = 0;
var energy_hi_lmt = 0;// 电量总上限
var energy_low_lmt = 0;// 电量总下限

var energy_hi_lmt_checked = 0;
var energy_low_lmt_checked = 0;

var energy_hi_lmt_j = 0;// 尖峰上限
var energy_low_lmt_j = 0;// 尖峰下限

var energy_hi_lmt_f = 0;// 峰上限
var energy_low_lmt_f = 0;// 峰下限

var energy_hi_lmt_p = 0;// 平上限
var energy_low_lmt_p = 0;// 平下限

var energy_hi_lmt_g = 0;// 谷上限
var energy_low_lmt_g = 0;// 谷下限

var energy_hi_lmt_d = 0;// 低谷上限
var energy_low_lmt_d = 0;// 低谷下限

var sprice = null;
var spricePeriod1 = null;
var spricePeriod2 = null;
var spricePeriod3 = null;
var spricePeriod4 = null;
var spricePeriod5 = null;
var sum_count = 0; // 总电量不为空且电价为空的次数
var jf_count = 0;// 尖峰电量不为空且尖峰电价为空的次数
var f_count = 0;// 峰电量不为空且峰电价为空的次数
var p_count = 0;// 平电量不为空且平电价为空的次数
var g_count = 0;// 谷电量不为空且谷电价为空的次数
var dg_count = 0;// 低谷电量不为空且低谷电价为空的次数
var count = null;
me.tradeSeqId = null;
me.energyPrecision = null;
me.pricePrecision = null;
me.difference = null;// 电价申报模式
me.powerEnergyType = null;// 发电侧申报电量类型
me.vendeeispricedifference = null; //价差模式

me.rowIndex = null;

me.tradetype_code = "";
me.jydyId = "";
me.JYDYID = "";
var baseItem = {};//储存将要复制的内容；

me.isSbjc = false; //是否配置了价差成交价格
me.zdjc = false; //是否配置了指定价差模式

function init(){
	
	if(sbcxmark == '1'){//申报数据查询页面进入时按钮禁用
		$('#report').attr({"disabled":"disabled"});
		$('#reportSelect').attr({"disabled":"disabled"});
		$('#paste').attr({"disabled":"disabled"});
		$('#copy').attr({"disabled":"disabled"});
		$('#reset').attr({"disabled":"disabled"});
	}
	
	$(document.getElementById("showPic")).hide();
	getGlobalValue();
	saleEnergyLimitDatagrid();
	getrownum();
	_initMarketId();
	var tex = "按照10兆瓦时的整数倍申报电量，申报电价精确到0.01元/兆瓦时；电量单位：兆瓦时，电价单位：元/兆瓦时";
	$("#reportTimelabel").text(tex);
//	change();
	getTabs();//选中时触发	
	getTradeName();
	getDataGrid();
	changeSBJTDS();
}
//申报阶梯段数改变
function changeSBJTDS(){
	$('#sbjtds').combobox({  
        onChange:changeSBJTDS1
    });  
}

function changeSBJTDS1(){
	var SBS = $('#sbjtds').combobox('getValue');
	$("#reportdata").datagrid("uncheckAll");
	if(SBS!=0){
		var rowsdata = $("#reportdata").datagrid("getRows");
		for(var i=0;i<rowsdata.length;i++){
			if(SBS==rowsdata[i].band){
				$("#reportdata").datagrid("checkRow",i);
			}
		}
	}
}

function getGlobalValue(){
	
	//获取服务器配置，判断是否加密需要加密
	var encryptInfo = commonUtilAjax('getEncryptCfg','{}')
	if(encryptInfo) {
		me.certContent = encryptInfo.publiccert;
		me.dataEncryptFlag = encryptInfo.DATA_ENCRYPT_FLAG;
		me.dataDisgerFlag = encryptInfo.DATA_DISGER_FLAG;
		if(me.dataEncryptFlag == '1' && !me.certContent) {//启用加密没有获取证书时需要给出提示，改为非加密数据
			top.$.messager.alert('提示', '获取加密证书失败，请联系管理员进行确认！继续申报将存在安全隐患！');
			me.dataEncryptFlag = '0';
		}
	}
	//获取加密工具类
//	me.cfcaUtil = new CFCACryptoUtil();
	
	if(me.dataEncryptFlag == '1') {
		try{
			//me.cfcaUtil.setCertificate(me.certContent);
			var eDiv = document.createElement("div");
	        if (navigator.appName.indexOf("Internet") >= 0) {
	            if (window.navigator.cpuClass == "x86") {
	                eDiv.innerHTML = "<object id=\"CryptoAgent\" codebase=\"CryptoKit.Standard.x86.cab\" classid=\"clsid:2F9BEB71-4164-4837-99EE-ED8065B58658\"></object>";
	            }
	            else {
	                eDiv.innerHTML = "<object id=\"CryptoAgent\" codebase=\"CryptoKit.Standard.x64.cab\" classid=\"clsid:EC380EBA-922E-41F8-89FF-2FE4DCD200E3\"></object>";
	            }
	        }
	        else {
	            eDiv.innerHTML = "<embed id=\"CryptoAgent\" type=\"application/npCryptoKit.standard.x86\" style=\"height: 0px; width: 0px\">";
	        }
	        document.body.appendChild(eDiv);
	        
	        var CryptoAgency = document.getElementById("CryptoAgent");
			var cert = me.certContent;
			//var cert = "MIID9TCCAt2gAwIBAgIFEACBMZYwDQYJKoZIhvcNAQEFBQAwGzELMAkGA1UEBhMCQ04xDDAKBgNVBAoTA0JPQzAeFw0xNDA1MDcwMzAyMzdaFw0xNjA1MDcwMzAyMzdaMHIxCzAJBgNVBAYTAmNuMRcwFQYDVQQKEw5DRkNBIFRFU1QgT0NBMTENMAsGA1UECxMEU0dDQzEUMBIGA1UECxMLRW50ZXJwcmlzZXMxJTAjBgNVBAMUHDA0MUBaMTIzNEBTR0NDVGVzdDFAMDAwMDAwMDIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQD0RcEf4Z+WlXhK8v5UiKauiazWyCgJa341oWIxETXJ5Twv9h0i7zctWVYccZLcg/DDO+0MOVnxFw7+EDKdJqo1u77cWndj6b31q3JPpIjBlnRGu8R9PBfp/W0u89dO2gq54GThqqQMbO3UqJRQgKsLjLzJ8mh+z3gmUD/syb5DAWnEYM8p4N15/zw+6ra41YsY11MXaw7WXeWGIbugh0ZJO2J6NK3Oq/P+04W2hOMHVytOyDJH4iN1/H7Fk83dFbqU36g9ExhpcW6J7Ps2Q3KFC1INKFOOIxFnQLA8cC19s4qAf/Jv/29DVlBWdGYvOmBrbgYFgGhQGlYeVmy1DKaPAgMBAAGjgegwgeUwHwYDVR0jBBgwFoAUz3CdYeudfC6498sCQPcJnf4zdIAwSAYDVR0gBEEwPzA9BghggRyG7yoBATAxMC8GCCsGAQUFBwIBFiNodHRwOi8vd3d3LmNmY2EuY29tLmNuL3VzL3VzLTE0Lmh0bTA3BgNVHR8EMDAuMCygKqAohiZodHRwOi8vdWNybC5jZmNhLmNvbS5jbi9SU0EvY3JsNjM2LmNybDALBgNVHQ8EBAMCA+gwHQYDVR0OBBYEFKaEZZTDdHPhPqJ1+ZIIm/pHDbwPMBMGA1UdJQQMMAoGCCsGAQUFBwMCMA0GCSqGSIb3DQEBBQUAA4IBAQBWr4nmzLbYqkasWTIO8s8z596aX4IB8EF5uksO2EHY6lAOITrzEFjGkmb48i6wOmpk8Kco6Nu8Y9Nv4vmZCDcMIFlzennVt0cL9NKnF0CL9zzV8M9ya6/xtXO68OQcaqIVAkZQcHq8Zr60Owy0vSOaQvjJzfWBYy9tfUCsyn+W51lSJIZyGX6yUrU8im/Bv1wGZVurTP9TR3N8VYgN++GI4YGbj9hlkdm9xz/trS+riy3oQISRcmZCs7uXf6r4bt4eZ0CJcSbDJkgxwJF94cXwePD6ZsSGVdBJTVTU9/wislt3FJpC0ykv4R4aLkcn8MXHWl9SZlYxVLMm4UdH4nTH";
			CryptoAgency.SetEncryptCertificate(cert);
			//document.getElementById("CryptoAge").SetEncryptCertificate(cert);
		}catch(e){
			top.$.messager.alert('提示', '加载加密证书失败,请在登录页面下载公共基础插件！继续申报将存在安全隐患！');
			me.dataEncryptFlag = '0';
			me.dataDisgerFlag = '0';
		}
	}
}

//进行数据加密
function getEncryptMessage(msg){
	/*if(me.dataEncryptFlag == 1) {//如果加密
		if(msg) {
    		return me.cfcaUtil.encryptMessage(msg,true);
		}
		return null;
	}
	return msg;*/
	if(me.dataEncryptFlag == 1){
		if(msg) {
			var CryptoAgency = document.getElementById("CryptoAgent");
			a = CryptoAgency.EncryptMessageasEnvelope_3DES(msg);
			cipher = a.replace(/\+/g,"@@@");
			//cipher.replace(/\+/g,",,,");
			return cipher;
		}
		return null;
	}	
	return msg;
}
function getTabs(){
	$('#tab').tabs({    
		onSelect:tabChanges
	});  
}
/**
 * 刷新
 */
function refresh() {
	getTradeName();
}

/**
 * 市场成员ID
 */
function _initMarketId() {
	$.ajax({
		async: false, 
		url : "/pmos/rest/pmostrbibidjydy/getUserInfo",
		type : "post",
		dataType : "json",
		data : 'params={}',
		success : function(data) {
			if (data.resultValue.items.length > 0) {
				me.marketId = data.resultValue.items[0];
			}
		},
		error : function(event, request, settings) {
			top.$.messager.alert('提示', '获取市场成员信息失败!');
		}
	});
};

/**
 * 交易序列名称
 */
function getTradeName() {
	$.ajax({
		url : "/pmos/rest/pmostrbibidjydy/getTradeName",
		type : "post",
		dataType : "json",
		async:false,
		data : "params={}",
		success : function(data) {
			if (data.length > 0) {
				$('#tradeName').combobox({
					data : data,
					valueField : 'id',
					textField : 'text',
					onSelect : change
				});
				
				setTimeout(function(){
					var tqid = Zutil.getUrlParam('tradeseqId');
					if(!tqid) {
						tqid = data[0].id;
					}
					$('#tradeName').combobox('select', tqid);//选中数据
				}, 100);
			}
		},
		error : function(event, request, settings) {
			top.$.messager.alert('提示', '操作失败!');
		}
	});
}

/**
 * 查询被替代方交易单元下拉列表中的值
 */
function getMatchJydyIdValue(){	
	//var tradeseqid = $("#tradeName").combobox('getValue');
	$.ajax({
		async: false,
		url : "/pmos/rest/pmostrbibidjydy/getMatchJydyIdValue",
		type : "post",
		dataType : "json",
		data : 'params={tradeseqid:"' + tradeseqid + '"}',
		success : function(data) {
			if (data.length > 0) {
				me.matchJydyId = data;
			}
		},
		error : function(event, request, settings) {
			top.$.messager.alert('提示', '获取被替代方交易单元下拉列表信息失败!');
		}
	});
}
/**
 * 申报时间赋值
 */
function getReportTime() {
	var tradeseqid = $("#tradeName").combobox('getValue');
	me.tradename = $('#tradeName').combobox('getText');
	var seqtype = "";
	if (tradeseqid != null) {
		seqtype = "1";
	}
	$.ajax({
		async: false,
		url : "/pmos/rest/pmostrbibidjydy/getReportTime",
		type : "post",
		dataType : "json",
		data : 'params={tradeseqId:"' + tradeseqid + '",type:"' + "1"
				+ '",seqtype:"' + seqtype + '"}',
		success : function(data) {
			if (data.length > 0) {
				$('#startTime').datebox('setValue', data[0]);
				$('#endTime').datebox('setValue', data[1]);
				me.tr_marketId =data[3];
				if(me.tr_marketId != '93112'){
					 $('#tab').tabs('close','峰平谷时段查询');  
				}
				/*
				//判断是否在申报时间内
				if(data[2] == "0") {
					top.$.messager.alert("消息","当前不在申报时间内，不允许申报!");
				}*/
			}
		},
		error : function(event, request, settings) {
			top.$.messager.alert('提示', '获取申报时间信息失败!');
		}
	});

}


//easyUI默认出现滚动条  
function defaultHaveScroll(gridid){  
    var opts=$('#'+gridid).datagrid('options');
    // alert(Ext.util.JSON.encode(opts.columns));  
    var text='{';  
    for(var i=0;i<opts.columns.length;i++){  
       var inner_len=opts.columns[i].length;  
       for(var j=0;j<inner_len;j++){  
           if((typeof opts.columns[i][j].field)=='undefined')break;  
            text+="'"+opts.columns[i][j].field+"':''";  
            if(j!=inner_len-1){  
                text+=",";  
            }  
       }  
    }  
    text+="}";  
    text=eval("("+text+")");  
    var data={"total":1,"rows":[text]};  
    $('#'+gridid).datagrid('loadData',data);  
   // $('#grid').datagrid('appendRow',text);  
  // $("tr[datagrid-row-index='0']").css({"visibility":"hidden"});  
}

/**
 * 下拉框改变
 * @param e
 */
function change(e) {
//	var tradeseqid = $("#tradeName").combobox('getValue');
	var tradeseqid = e.id;
	if (!tradeseqid) {
		$("#reportdata").empty();
		defaultHaveScroll('reportdata');
		$('#startTime').datetimebox('setValue','');
		$('#endTime').datetimebox('setValue','');
		top.$.messager.alert("消息","请先选择交易序列！");
		return;
	}
	//选择第一个tab面板(申报数据)
	$('#tab').tabs('select',0);
	var seqtype = "";
	if (tradeseqid != null) {
		seqtype = "1";
	}
	var params = '{"tradeseqId":"'+tradeseqid+'","type":"1","seqtype":'+seqtype+'}';
	//交易序列名称切换时，判断是否显分配时间段。及分配的时间段数量
	var s = commonAjax("getItemCode",params);
	if(s!=null&&s.length>0&&s[0]!=null){//是否分时间段
		if(s[0]==1){//为1则继续， 表示分时间段
			params = '{"tradeseqId":"'+tradeseqid+'","type":"2","seqtype":'+seqtype+'}';
			var ss = commonAjax("getItemCode",params);
			if(ss!=null&&ss.length>0&&ss[0]!=null){
				if(ss[0]>0){//如果大于0则显示，否则提示
    				count = parseInt(ss[0]);//获取配置的时间段段数
				}else{
					top.$.messager.alert("消息","请先配置时间段后再申报!");
					$("#reportdata").empty();
					defaultHaveScroll('reportdata');
					$('#startTime').datetimebox('setValue','');
					$('#endTime').datetimebox('setValue','');
		   			return;
				}
			}
		}else{////没有分配置时间段数量。
			top.$.messager.alert("消息","请先配置时间段后再申报!");
			$("#reportdata").empty();
			defaultHaveScroll('reportdata');
			$('#startTime').datetimebox('setValue','');
			$('#endTime').datetimebox('setValue','');
		   	return;
			
		}
	}else{//没有分配置时间段数量。
		top.$.messager.alert("消息","请先配置时间段后再申报!");
		$("#reportdata").empty();
		defaultHaveScroll('reportdata');
		$('#startTime').datetimebox('setValue','');
		$('#endTime').datetimebox('setValue','');
		return;
    }
	var p = '{"tradeseqId":'+tradeseqid+'}';
	var show = commonAjaxSale("showBtn",p);
	 //要改为0
	 if(show[0][0] =="0")
	 {
		 $(document.getElementById("showPic")).hide();

	 }else{
		 $(document.getElementById("showPic")).show();
	 }
	getReportTime();//给时间赋值
	
	getUnitValue();//电量单位：MWh、WKWh
	getTypeCode();//获取交易二级大类的类型code
	gePrecision();//获取精度，并设置label的值
	 
	query();//查询
}

/**
 * 
 * @param methodName
 * @param params
 * @returns  向后台查询数据
 */
function commonAjax(methodName,params){
	var items=null;
	$.ajax({                                
		url : "/pmos/rest/pmostrbibidjydy/"+methodName,
		type : "post",
		dataType : "json",
		data : 'params='+params,
		async:false,//异步刷新
		success : function(data) {
			if(data.successful){
				items = data.resultValue.items;
			}
		},
		error : function(event, request, settings) {
			top.$.messager.alert('消息','操作失败!');
		}
	});
	return items;
}



/**
 * 获取交易二级大类的类型code
 */
function getTypeCode() {
	var tradeseqid = $('#tradeName').combobox('getValue');
	var params = '{"tradeseqId":'+tradeseqid+'}';
    var s = commonAjax("getTradetypeCode",params);
    if(s!=null&&s.length>0){
		if(s[0].bool){
			if(s[0].list.length>0){
				var codes = s[0].list;
				me.tradetype_code = codes[0];
			}
		}
    }
}
//电量、容量量纲条款设置
function getUnitValue() {
	var tradeseqid = $('#tradeName').combobox('getValue');
	
	var params = '{"tradeseqId":'+tradeseqid+'}';
	var s = commonAjax("getUnitValue", params);
	if(s!=null && s.length>0) {
		if(s[0].bool) {
			if(s[0].list.length == 0) {
				me.energyunits = 'MWh';
				me.capacityunit = 'MW';
			} else if(s[0].list.length == 1) {
				if(s[0].list[0][0]=='ENERGY_UNIT') {
					me.energyunits = s[0].list[0][1];
				} else {
					me.capacityunit = s[0].list[0][1];
				}
			} else if(s[0].list.length == 2) {
				me.energyunits = s[0].list[0][1];
				me.capacityunit = s[0].list[1][1];
			}
		}
	}
}

/**
 * 获取精度数据
 */
function gePrecision() {
	me.energyPrecision = null;
	me.pricePrecision = null;
	me.difference = null;
	me.powerEnergyType = null;
	me.vendeeispricedifference = null;
	me.isdeconeenergy=null;//售方申报一个电量
	me.vendeedecnum =1;//购方申报时选择售方数量 默认为1
	me.istradeyeartomonths = null;
	/**
	 * 添加电量电价精度动态显示 liping
	 */
	// 添加电量电价精度动态显示
	var tradeseqid = $('#tradeName').combobox('getValue');
	var params = '{"tradeseqId":'+tradeseqid+'}';
	var precision = commonAjax("getPrecision",params);
	if(precision!=null&&precision.length>0){
		if(precision[0].bool){
			if(precision[0].list.length>0){
				var precisionNum = precision[0].list;
				for(var j=0; j<precisionNum.length; j++){
					if("ENGERY_PRECISION"==precisionNum[j][0]){
						me.energyPrecision = precisionNum[j][1];
					}else if("PRICE_PRECISION"==precisionNum[j][0]){
						me.pricePrecision = precisionNum[j][1];
					}else if("POWER_RATE_PRECISION_RESULT"==precisionNum[j][0]){
						me.powerPrecision = precisionNum[j][1];
					}else if("IS_PRICE_DIFFERENCE"==precisionNum[j][0]){
						me.difference = precisionNum[j][1];
					}else if("IS_DEC_CAPACITY"==precisionNum[j][0]){
						me.sumCapacity = precisionNum[j][1];
					}else if("POWER_DES_ENERGY_TYPE"==precisionNum[j][0]){
						me.powerEnergyType = precisionNum[j][1];
					}else if('VENDEE_IS_PRICE_DIFFERENCE'==precisionNum[j][0]){//购方是否是价差模式
						me.vendeeispricedifference = precisionNum[j][0];
					}else if("IS_DEC_ONE_ENERGY"==precisionNum[j][0]){ //售方申报一个电量
						me.isdeconeenergy = precisionNum[j][1];
					}else if("IS_SALE_MARGINAL_PRICE"==precisionNum[j][0]){//售方按边际条件申报
						me.issalemarginalprice = precisionNum[j][1];
					}else if("VENDEE_DEC_NUM"==precisionNum[j][0]){//购方申报时选择售方数量
						me.vendeedecnum = precisionNum[j][1];
					}else if("IS_TRADE_YEAR_TO_MONTHS" == precisionNum[j][0]){
						me.istradeyeartomonths = precisionNum[j][1];
					}else if('BAND_PRICE_LOW_LIMIT' == precisionNum[j][0]){
						me.bandPriceLowLimit = precisionNum[j][1];
					}else if('BAND_ENERGY_HI_LIMIT' == precisionNum[j][0]){
						me.bandEnergyHiLimit = precisionNum[j][1];
					}
				}
			}
		}
	}
	
	var tex = "";
	var unit = "兆瓦时";
	if(me.energyunits=="WKWh")
	{
		unit = "万千瓦时";
	}
	if (me.energyPrecision != null) {
		if (me.energyPrecision < 0) {
			tex += "申报电量精确到" + Math.pow(10, me.energyPrecision) +unit+"；";
		} else {
			tex += "按照" + Math.pow(10, me.energyPrecision) +unit+"的整数倍申报电量，";
		}
	} else {
		tex += "按照10"+unit+"的整数倍申报电量，";
	}
	if (!(me.marketId == '95518' && me.tradetype_code.substring(0,5)=='30011')) {
		if (me.pricePrecision != null) {
			if (me.pricePrecision > 0) {
				tex += "按照" + Math.pow(10, me.pricePrecision)+"元/兆瓦时的整数倍申报电价；";
			} else {
				tex += "申报电价精确到" + Math.pow(10, me.pricePrecision) + "元/兆瓦时；";
			}
		} else {
			tex += "申报电价精确到0.01元/兆瓦时；";
		}
	}
	tex += "电量单位："+unit;
	if (!(me.marketId == '95518' && me.tradetype_code.substring(0,5)=='30011')) {
		tex += "，电价单位：元/兆瓦时";
	}
	$("#reportTimelabel").text(tex);//给label赋值;
}

function reset(){
	if(!confirm("重置将清空您本次交易的所有申报数据并恢复至未申报状态，是否继续？")){
		return
	}
	var tradeseqid = $('#tradeName').combobox('getValue');
	if(tradeseqid == null||tradeseqid==""){
		top.$.messager.alert("消息","请选择交易名称!");
		return;
	}
	var params = '{"tradeseqId":'+tradeseqid+',"count":'+count+'}';
	var res = commonAjax("reset",params);
	if(res[0].successful){
		 top.$.messager.alert("消息","重置成功!");
		 query();
   }else{
		top.$.messager.alert("消息","重置失败!");
		return
	}
}

/**
 * 查询
 */
function query() {
	/*me.readonly = '0';
	$('button#report').removeAttr('disabled');
	$('button#paste').removeAttr('disabled');
	$('button#copy').removeAttr('disabled');*/	
	var tradeseqid = $('#tradeName').combobox('getValue');
	var startdate = $('#startTime').datetimebox('getValue');
	var enddate = $('#endTime').datetimebox('getValue');
	$('#tab').tabs('select',0);
	if(tradeseqid == null||tradeseqid==""){
		top.$.messager.alert("消息","请选择交易名称!");
		return;
	}
	if(!count){
		alert("请先配置时间段后再申报！");
		$("#reportdata").empty();
		defaultHaveScroll('reportdata');
		
		$('#startTime').datetimebox('setValue','');
		$('#endTime').datetimebox('setValue','');
		return;
	}
	if(startdate==null||startdate=="" || enddate ==null||enddate ==""){
		alert("售方集中交易申报没有配置节点开始结束时间，无法查询！");
		$("#reportdata").empty();
		defaultHaveScroll('reportdata');
		$('#startTime').datetimebox('setValue','');
		$('#endTime').datetimebox('setValue','');
		return;
	}
	var params = '{"tradeseqId":'+tradeseqid+',"count":'+count+'}';
	var s = commonAjax("queryData",params);
	if(s!=null&&s.length>0){
		if(s[0].bool){
			//查询尖峰平谷显示哪些
			var params = '{"tradeseqId" :'+ tradeseqid+',keys:["IS_DEC_SUM","IS_ENERGY1","IS_ENERGY2","IS_ENERGY3","IS_ENERGY4","IS_ENERGY5","IS_DEC_PRICE"]}';
			me.responseDisplayConfig =  commonAjax("getDisplayConfig",params);
			displayConfig();
			//查询数据*****************************************************************************************
			$.ajax({
				url : "/pmos/rest/pmostrbibidjydy/getDataGrid",
				type : "post",
				dataType : "json",
				async:false,//异步刷新
				data : 'params={tradeseqid:"'+$("#tradeName").combobox('getValue')+'"}',
				success : function(data) {
					
					if(data.successful){
						$("#reportdata").empty();
						/*if(me.energyunits == "WKWh"){//2016/11/04新加量刚判断
							for(var i=0;i<data.resultValue.items.length;i++){
								if(data.resultValue.items[i].energy){
									data.resultValue.items[i].energy = data.resultValue.items[i].energy/10;
								}
								if(data.resultValue.items[i].energyPeriod1){
									data.resultValue.items[i].energyPeriod1 = data.resultValue.items[i].energyPeriod1/10;
								}
								if(data.resultValue.items[i].energyPeriod2){
									data.resultValue.items[i].energyPeriod2 = data.resultValue.items[i].energyPeriod2/10;
								}
								if(data.resultValue.items[i].energyPeriod3){
									data.resultValue.items[i].energyPeriod3 = data.resultValue.items[i].energyPeriod3/10;
								}
								if(data.resultValue.items[i].energyPeriod4){
									data.resultValue.items[i].energyPeriod4 = data.resultValue.items[i].energyPeriod4/10;
								}
								if(data.resultValue.items[i].energyPeriod5){
									data.resultValue.items[i].energyPeriod5 = data.resultValue.items[i].energyPeriod5/10;
								}
							}
						}*/
						if(data.resultValue.items.length == 0){
							$('#reportdata').datagrid("loadData",data.resultValue.items);
							top.$.messager.alert("消息","存在重复的准入交易单元！");
						}else{
							$('#reportdata').datagrid("loadData",data.resultValue.items);
						}
					}else{
						$("#reportdata").empty();
						defaultHaveScroll('reportdata');
						top.$.messager.alert("消息","查询失败！");
					}
					
				},
				error : function(event, request, settings) {
					top.$.messager.alert('消息','操作失败!');
				}
			});
		}else{
			top.$.messager.alert('消息',s[0].msg);
		}
	}
	
	showTex();
	if(me.marketId=='95812'){ //山东场景隐藏用户最大电力列--2017/02/09
		$("#reportdata").datagrid('hideColumn','userMaxPower');
		//$("#reportdata").datagrid("getPanel").panel("电量（总）","11电量（总）");
		$("#reportdata").datagrid("setColumnTitle",{field:'energy',text:'<span style="color:#F00">*</span> 电量（总）'});
		$("#reportdata").datagrid("setColumnTitle",{field:'price',text:'<span style="color:#F00">*</span> 电价'});
	}else{
		showUserMaxPower();
	}
	getGenUseRate(tradeseqid);
	//需求侧管理费用 福建场景显示
    showRequiremanacost();
}
//需求侧管理费用 福建场景显示
function showRequiremanacost()
{
	if(me.marketId=='95712')
	{
		$("#reportdata").datagrid('showColumn','requiremanacost');
		//$("#reportdata").datagrid('hideColumn','userMaxPower');
	}
	if(me.tr_marketId=='93112'&&$("#reportdata").datagrid('getColumnOption','energy').hidden==false){
		$("#reportdata").datagrid('showColumn','powerPeriod');
	}else{
		$("#reportdata").datagrid('hideColumn','powerPeriod');
	}
	
};
//厂用电率
function getGenUseRate(tradeseqid)
 {

	var params = '{"tradeseqId":' + tradeseqid + '}';
	var s = commonAjax("getGenUseRate", params);
	var result = s[0];
	//me.readonly = result.readonly;//根据厂用电率来源  判断 表格是否可编辑
	me.readonly = 0; //20160301 厂用电率控制暂时注释掉
}
//添加
function showTex() {
	if (me.difference == null || me.difference == "") {
		if(me.vendeeispricedifference=="1" ){
			$("#reportLeftlabel").text("电价申报模式：价差模式");
			$("#notice").show();
		}else {
			var tradeseqid = $('#tradeName').combobox('getValue');
			var params = '{"tradeseqId" :'+ tradeseqid+'}';
			var co = commonAjax("checkShowTex",params);
			if(co!=null&&co.length>0){
				result = co[0];
				if(result.bool){
					var Columns = result.list;
					if(me.tradetype_code.substring(0,4)==('2001')){
						if(Columns.length>0){
							if(Columns[0] == "1" ){
								$("#reportLeftlabel").text("电价申报模式：价差模式");	
								$("#notice").show();
							}else{
								$("#reportLeftlabel").text("");
							}
						}else{
							$("#reportLeftlabel").text("电价申报模式：价差模式");	
							$("#notice").show();
						}
					}else{
						$("#reportLeftlabel").text("");
					}
				}
			}
		}

	}else if(me.difference == "1"){//是
		$("#reportLeftlabel").text("电价申报模式：价差模式");
		$("#notice").show();
	}else if(me.difference == "0"){//否
		if(me.vendeeispricedifference=="1"){
			$("#reportLeftlabel").text("电价申报模式：价差模式");
			$("#notice").show();
		}else{
			$("#reportLeftlabel").text("");
		}
	}
}
// 添加
function showUserMaxPower() {
	var tradeseqid = $('#tradeName').combobox('getValue');
	var params = '{"tradeseqId" :'+ tradeseqid+'}';
	var co = commonAjax("checkShowUserMaxPower",params);
		if (co[0].bool) {
			var Columns = co[0].list;
			if (Columns.length > 0) {
				$("#reportdata").datagrid('showColumn','userMaxPower');
			} else {
				$("#reportdata").datagrid('hideColumn','userMaxPower');
			}
		}
}

//隐藏没配置显示的列
function displayConfig(){
	var result = null;
	if(me.responseDisplayConfig!=null&&me.responseDisplayConfig.length>0){
		result = me.responseDisplayConfig[0];
		if(result.bool){
			//显示的字段
			var noneDispaly = result.list;
			//所有需要控制的字段
			var allColumns = [{key:"IS_DEC_SUM",hi:"energy"}, {key:"IS_ENERGY1",hi:"energyPeriod1"},
			                  {key:"IS_ENERGY2",hi:"energyPeriod2"},{key:"IS_ENERGY3",hi:"energyPeriod3"},
			                  {key:"IS_ENERGY4",hi:"energyPeriod4"},{key:"IS_ENERGY5",hi:"energyPeriod5"},
							  {key:"IS_DEC_PRICE",hi:"price"},{key:"IS_DEC_PRICE",hi:"pricePeriod1"},
			                  {key:"IS_DEC_PRICE",hi:"pricePeriod2"},{key:"IS_DEC_PRICE",hi:"pricePeriod3"},
			                  {key:"IS_DEC_PRICE",hi:"pricePeriod4"},{key:"IS_DEC_PRICE",hi:"pricePeriod5"},
			                  {key:"IS_DEC_SUM",hi:"powerPeriod"}, {key:"IS_ENERGY1",hi:"powerPeriod1"},
			                  {key:"IS_ENERGY2",hi:"powerPeriod2"},{key:"IS_ENERGY3",hi:"powerPeriod3"},
			                  {key:"IS_ENERGY4",hi:"powerPeriod4"},{key:"IS_ENERGY5",hi:"powerPeriod5"}
			                  ];
			
			for(var i=0; i<allColumns.length; i++){
				var col = allColumns[i];
				//先把所有的列显示出来
				var cols = $("#reportdata").datagrid('options').columns[0];
				for(var k=0;k<cols.length;k++){
					if(cols[k].field==col.hi){
						$("#reportdata").datagrid('showColumn',col.hi);
						break;
					}
				}
				
				var b = true;//定义是否隐藏列
				
				for(var j=0; j<noneDispaly.length; j++){
					if(col.key==noneDispaly[j][0]){
						if(col.key == 'IS_PRICE_DIFFERENCE') {
							me.isSbjc = true;//配置了价差成交价格
						}
						if(col.key == 'IS_DEAL_PRICE') {
							me.zdjc = true;//配置了指定价差模式
						}
						b = false;//如果在显示配置数据中存在设置false
						break ;
					}
				}
				if(b){
					//隐藏列
					$("#reportdata").datagrid('hideColumn',col.hi);
				}
				
			}
			
			if(me.zdjc){//如果指定价差，那么就认为是价差模式。先显示出来在根据选项判断是否隐藏
				me.isSbjc = true;
			}
			
			if($("#reportdata").datagrid('getColumnOption','energy').hidden==true){
				$("#reportdata").datagrid('hideColumn','price');
				$("#reportdata").datagrid('hideColumn','powerPeriod');
			}
			if($("#reportdata").datagrid('getColumnOption','energyPeriod1').hidden==true){
				$("#reportdata").datagrid('hideColumn','pricePeriod1');
				$("#reportdata").datagrid('hideColumn','powerPeriod1');
				//$("#fpgsdcx").datagrid('hideColumn','hourPeriod1');
			}
			if($("#reportdata").datagrid('getColumnOption','energyPeriod2').hidden==true){
				$("#reportdata").datagrid('hideColumn','pricePeriod2');
				$("#reportdata").datagrid('hideColumn','powerPeriod2');
				//$("#fpgsdcx").datagrid('hideColumn','hourPeriod2');
			}
			if($("#reportdata").datagrid('getColumnOption','energyPeriod3').hidden==true){
				$("#reportdata").datagrid('hideColumn','pricePeriod3');
				$("#reportdata").datagrid('hideColumn','powerPeriod3');
				//$("#fpgsdcx").datagrid('hideColumn','hourPeriod3');
			}
			if($("#reportdata").datagrid('getColumnOption','energyPeriod4').hidden==true){
				$("#reportdata").datagrid('hideColumn','pricePeriod4');
				$("#reportdata").datagrid('hideColumn','powerPeriod4');
				//$("#fpgsdcx").datagrid('hideColumn','hourPeriod4');
			}
			if($("#reportdata").datagrid('getColumnOption','energyPeriod5').hidden==true){
				$("#reportdata").datagrid('hideColumn','pricePeriod5');
				$("#reportdata").datagrid('hideColumn','powerPeriod5');
				//$("#fpgsdcx").datagrid('hideColumn','hourPeriod5');
			}
		}else {
			alert(result.msg);
		}
	}
}

//加载申报数据表格
function getDataGrid()
{
	getMatchJydyIdValue();
	$("#reportdata").datagrid({
		height: 368, 
		nowrap: true,
		width:'100%',
		striped: true,
		collapsible:true,
		remoteSort: false,
		rownumbers:true,
        loadMsg:"加载数据中，请稍后",  
		frozenColumns: [[ 
		{ field: 'ck', checkbox: true }, 
		{field:'jydyId',titleAlign:'center',title:'交易单元名称',width:180,align:"left",hidden:true},
		{ title: '交易单元名称', field: 'busiunitname', width: 170,titleAlign:'center',align:"left"}, 
		{ title: '申报状态', field: 'bidStatus', width: 60,titleAlign:'center',align:"left" ,
			formatter:function(value,row,index){
        		if(value==""||value==0){
        			return "未申报";
        		}else if(value==1){
        			return "已申报";
        		}
        	}
		} ,
		{ title: '时间段', field: 'timeRange', width: 180,titleAlign:'center',align:"left"} 
		]], 
		columns: [[ 
		{ field: 'bidinfoid', title: '申报数据编号', width: 100,titleAlign:'center' ,align:"left",hidden:true}, 
		{ field: 'tradeTimepart', title: '时间段', width: 100,titleAlign:'center' ,align:"left",hidden:true}, 
		{ field: 'energy', title: '电量（总）', width: 120,titleAlign:'center' ,align:"left",editor:{type:'text'}}, 
		{ field: 'powerPeriod', title: '电力（总）', width: 120,titleAlign:'center' ,align:"left",editor:{type:'text'}},
		{ field: 'price', title: '电价', width: 120,titleAlign:'center' ,align:"left",editor:{type:'text'}}, 
		{ field: "matchJydyid", title: "被替代方交易单元",width:200,titleAlign:"center",align:"left",editor:{type:'combobox',
			options:{valueField:'id',textField:'text',data:me.matchJydyId,panelHeight:"auto"}
		},
		formatter:function(value,row,index){
			if(value == null){
				return "";
			}
			for(var i = 0;i<me.matchJydyId.length;i++){
				if(value==(me.matchJydyId[i].id)){
					return me.matchJydyId[i].text;
				}
			}
		}
		},
		{ field: 'energyPeriod1', title: '电量（尖峰）', width: 120,titleAlign:'center' ,align:"left",editor:{type:'text'}}, 
		{ field: 'pricePeriod1', title: '电价（尖峰）', width: 120,titleAlign:'center' ,align:"left",editor:{type:'text'} }, 
		{ field: 'powerPeriod1', title: '电力（尖峰）', width: 120,titleAlign:'center' ,align:"left",editor:{type:'text'}},
		{ field: 'energyPeriod2', title: '电量（峰）', width: 120,titleAlign:'center' ,align:"left",editor:{type:'text'} }, 
		{ field: 'pricePeriod2', title: '电价（峰）', width: 120,titleAlign:'center' ,align:"left",editor:{type:'text'} }, 
		{ field: 'powerPeriod2', title: '电力（峰）', width: 120,titleAlign:'center' ,align:"left",editor:{type:'text'}},
		{ field: 'energyPeriod3', title: '电量（平）', width: 120,titleAlign:'center' ,align:"left",editor:{type:'text'} }, 
		{ field: 'pricePeriod3', title: '电价（平）', width: 120,titleAlign:'center' ,align:"left",editor:{type:'text'} }, 
		{ field: 'powerPeriod3', title: '电力（平）', width: 120,titleAlign:'center' ,align:"left",editor:{type:'text'}},
		{ field: 'energyPeriod4', title: '电量（谷）', width: 120,titleAlign:'center' ,align:"left",editor:{type:'text'} }, 
		{ field: 'pricePeriod4', title: '电价（谷）', width: 120,titleAlign:'center' ,align:"left",editor:{type:'text'} }, 
		{ field: 'powerPeriod4', title: '电力（谷）', width: 120,titleAlign:'center' ,align:"left",editor:{type:'text'}},
		{ field: 'energyPeriod5', title: '电量（低谷）', width: 120,titleAlign:'center' ,align:"left",editor:{type:'text'} }, 
		{ field: 'pricePeriod5', title: '电价（低谷）', width: 120,titleAlign:'center' ,align:"left",editor:{type:'text'} }, 
		{ field: 'powerPeriod5', title: '电力（低谷）', width: 120,titleAlign:'center' ,align:"left",editor:{type:'text'}},
		{ field: 'vendeeGenRate', title: '厂用电率', width: 120,titleAlign:'center' ,align:"left" ,editor:{type:'text'}}, 
		{ field: 'userMaxPower', title: '用电最大电力', width: 120,titleAlign:'center' ,align:"left",editor:{type:'text'} }, 
        { field: "requiremanacost", title: "需求侧管理费用" ,width:100,titleAlign:"center",hidden:true,align:"right"},
		{ field: 'band', title: '阶梯申报段数', width: 80,titleAlign:'center' ,align:"left" }, 
		{ field: 'tradeRole', title: '申报角色', width: 80,titleAlign:'center' ,align:"left",
			formatter:function(value,row,index){
				if(value==""||value==0){
        			return "购电方";
        		}else if(value==1){
        			return "售电方";
        		}
        }}, 
        { field: "priceHiLimit", title: "申报价格上限" , titleAlign:'center',hidden:true,width:70,align:"center"},
        { field: "priceLowLimit", title: "申报价格下限" , titleAlign:'center',hidden:true,width:70,align:"center"},
        { field: 'showBidPerson', title: '申报人', width: 180,titleAlign:'center' ,align:"left" }, 
		{ field: 'showUpdateTime', title: '申报时间', width: 180,titleAlign:'center' ,align:"left" },
		{field:'decDate',titleAlign:'center',title:'申报时间(毫秒)',width:150,align:"left",hidden:false}//新添显示
		]], 
		onLoadSuccess:onloadChange,

		onAfterEdit:onAfterEdit,

		onClickCell: onClickCell,

	});
		defaultHaveScroll('reportdata');
}
var editfiled = null;
//单击单元格时可编辑
var editIndex = undefined;
function onClickCell(index, field){
	if(field == "energy"){
		var ed = $('#reportdata').datagrid('getRows');  
		if(me.issalemarginalprice == 1 && ed[index].band != 1 ){
			return;
		}
	}
	if (endEditing(this,editIndex)){
		$(this).datagrid('selectRow', index).datagrid('editCell', {index:index,field:field});
		editIndex = index;
		editfiled = field;
	}
}
var oldvalue = "";
function onAfterEdit(rowIndex, rowData, changes){
	var value = changes[editfiled];
	if(!value || value == oldvalue){
		return ;
	}
	if((editfiled.indexOf('power')!=-1&&editfiled!="powerPeriod")){
		oldvalue = value;
		var tradeseqId = $('#tradeName').combobox('getValue');
		var params = {
				items:{
					tradeseqId:tradeseqId,
					tradetimepart:rowData["tradeTimepart"],//tradeTimepart
					column:editfiled
				}				
			};
		$.ajax({
			async: false, 
			url : "/pmos/rest/pmostrbibidjydy/getpkhours",
			type : "post",
			dataType : "json",
			contentType: "application/json",
			data:JSON.stringify(params),
			success : function(data) {
				if (data.resultValue.items.length > 0) {
					hour = data.resultValue.items[0][0];
					rowData[editfiled.replace('power','energy')] =hour*value;
					$('#reportdata').datagrid("refreshRow",rowIndex);
				}
			},
			error : function(event, request, settings) {
				top.$.messager.alert('提示', '自动计算电量失败!');
			}
		});
	}
}
function getParamtersString() {
	var params = "";
	var tradeseqid = $('#tradeName').combobox('getValue');
	var startdate = $('#startTime').datetimebox('getValue');
	var enddate = $('#endTime').datetimebox('getValue');
	if (tradeseqid == null) {
		tradeseqid = "";
	}
}


function onloadChange(e) {
	loadChange();
	me.jydyId = "";
	putJydyId();
}

function loadChange(){
	
	 if(me.isdeconeenergy!='1'){
		 $('#reportdata').datagrid('hideColumn', "matchJydyid");
	 }else{
		 $('#reportdata').datagrid('showColumn', "matchJydyid");
		
	 }	
	
	if (me.tradetype_code != null) {
		if (me.marketId == '95518' && me.tradetype_code.substring(0,5)=='30011') {
			$("#reportdata").datagrid("hideColumn",'price');
			$("#reportdata").datagrid("hideColumn",'pricePeriod1');
			$("#reportdata").datagrid("hideColumn",'pricePeriod2');
			$("#reportdata").datagrid("hideColumn",'pricePeriod3');
			$("#reportdata").datagrid("hideColumn",'pricePeriod4');
			$("#reportdata").datagrid("hideColumn",'pricePeriod5');
		}
		if(me.tradetype_code.substring(0,3)=='300' ){
			$("#reportdata").datagrid("setColumnTitle",{field:'busiunitname',text:'替代方交易单元'});
			$("#limitEnergy").datagrid("setColumnTitle",{field:'tradeunitName',text:'替代方交易单元'});
		}else{
			$("#reportdata").datagrid("setColumnTitle",{field:'busiunitname',text:'交易单元名称'});
			$("#limitEnergy").datagrid("setColumnTitle",{field:'tradeunitName',text:'交易单元名称'});
		}
		if(me.tradetype_code.substring(0,3)=='300' || me.tradetype_code.substring(0,3)=='400' || me.tradetype_code.substring(0,3)=='500'){
			
			if(me.powerEnergyType == "1"){
				$("#reportdata").datagrid("setColumnTitle",{field:'energy',text:'发电量'});
				$("#reportdata").datagrid("showColumn",'vendeeGenRate');
			}else{
				$("#reportdata").datagrid("setColumnTitle",{field:'energy',text:'上网电量'});
				$("#reportdata").datagrid("hideColumn",'vendeeGenRate');
			}
		}else{
			$("#reportdata").datagrid("hideColumn",'vendeeGenRate');
			$("#reportdata").datagrid("setColumnTitle",{field:'energy',text:'电量（总）'});
		}		
	}
}

function putJydyId(){
	var data = $("#reportdata").datagrid('getRows');
	for (var i=0;i<data.length;i++){
		var jydyId = data[i].jydyId;
		var arrayJydy = me.jydyId.split(",");
		for(var p=0;p<arrayJydy.length;p++){
			if(arrayJydy[p]==jydyId){
				break;
			}
			if(p==arrayJydy.length-1){//循环到最后也没有匹配的数据
				me.jydyId += jydyId+",";
			}
		}
	}
	me.jydyId = me.jydyId.length>0?me.jydyId.substring(0,me.jydyId.length-1):"";
}
function putJydyId1(){
	me.JYDYID = "";
	var data = $("#reportdata").datagrid('getSelections');
	for (var i=0;i<data.length;i++){
		var jydyId = data[i].jydyId;
		var arrayJydy = me.JYDYID.split(",");
		for(var p=0;p<arrayJydy.length;p++){
			if(arrayJydy[p]==jydyId){
				break;
			}
			if(p==arrayJydy.length-1){//循环到最后也没有匹配的数据
				me.JYDYID += jydyId+",";
			}
		}
	}
}
// 为电量加上千位分隔符
function changeEnergyAddPoint(e) {
	utilFun.fomartNumber("DataGrid", _dataGrid, [ "energy", "energyPeriod1",
			"energyPeriod2", "energyPeriod3", "energyPeriod4", "energyPeriod5",
			"userMaxPower" ]);
}


//复制
function copy()
{
	var data = $('#reportdata').datagrid('getChecked');//获取选中信息
	var rownums = $('#reportdata').datagrid('getRowNum');//获取选中行的行号
	baseItem = {};//每次复制前先清空之前的内容；
	if (data.length!=1)
    {
        top.$.messager.alert("消息","请勾选一条要复制的记录。");
         return;
    }
	$('#reportdata').datagrid('endEdit',rownums-1);//取消编辑
    baseItem = data[0];//将所选的内容存入到全局变量中
    $("#reportdata").datagrid('unselectAll');//取消所有的选中项

}
//粘贴
function paste()
{
	if(!baseItem.bidinfoid){
		top.$.messager.alert("消息","请先复制记录。");
        return;
	}
	if($("#reportdata").datagrid('getSelections').length == 0)
    {
         top.$.messager.alert("消息","请勾选要粘贴的记录。");
         return;
    }
	
	/*//已申报数据不允许粘贴
	var _reported = false;
	$.each($("#reportdata").datagrid('getSelections'), function(i, obj){
		if(obj.bidStatus == 1) {
			_reported = true;
		}
	});
	if(_reported) {
		top.$.messager.alert("消息","已申报的数据不允许操作。");
        return;
	}*/
	
    if(confirm("粘贴后将覆盖你选中记录的申报信息，是否继续？")){
        //所有要可以复制的列名
        var col = ['energy','price','energyPeriod1','pricePeriod1','energyPeriod2','pricePeriod2','energyPeriod3','pricePeriod3','energyPeriod4','pricePeriod4','energyPeriod5','pricePeriod5','userMaxPower','vendeeGenRate'];
        
        var items = $("#reportdata").datagrid('getSelections');//所有要粘贴的记录
        
        var rownums = $('#reportdata').datagrid('getRowNum');//获取选中行的行号
        var rownum = rownums.split(",");
        var copyData = {};//需要复制的数据，组成的新对象
        for(var i=0;i<col.length;i++){//为copyData赋值
        	copyData[col[i]] = baseItem[col[i]];
        }
     
        for(var i = 0; i<rownum.length; i++){
        	$('#reportdata').datagrid('endEdit',rownum[i]-1);//取消编辑
        	$('#reportdata').datagrid('updateRow',{ index:rownum[i]-1, row: copyData });//index指的是索引，从0开始，比行号小1
//        	$('#reportData').datagrid('beginEdit',rownum[i]-1);//取消编辑
        	
        }
        
        $('#reportdata').datagrid('unselectAll');//取消选中信息
    }
    

}

function getrownum()
{
	$.extend($.fn.datagrid.methods, {   
		getRowNum:function(jq){   
			var opts=$.data(jq[0],"datagrid").options;   
			var array = new Array();   
			opts.finder.getTr(jq[0],"","selected",1).each(function(){   
				array.push($(this).find("td.datagrid-td-rownumber").text());   
			});   
			return array.join(",");   
		}   
	}); 
	
}

function getJydyId() {
	var tradeseqid = me.tradeSeqId;
	if (tradeseqid == null || tradeseqid == "") {
		mx.indicate("info", "无相关数据!");
		return;
	} else {
		var params = {
			"tradeseqId" : tradeseqid
		};
		var co = me.restClient.getSync(purchaseTrBidinfoJydb
				.mappath("~/rest/purchasetrbidinfojydy/getJydyId"), {
			"params" : JSON.stringify(params)
		});
		if (co.successful) {
			result = co.resultValue.items[0];
			if (result.bool) {
				var Columns = result.list;
				if (Columns[0] != null && Columns[0] != "") {
					me.jydyId = Columns[0];
				} else {
					mx.indicate("info", "获取jydyId失败！");
					return;
				}
			}
		}
	}
}

//申报
function report(value)
{
	if(me.rowIndex != null) {
		$('#reportdata').datagrid('endEdit',me.rowIndex);//取消编辑
	}
//	$("#reportdata").empty();
	var tradeseqid = $("#tradeName").combobox('getValue');
	if (!tradeseqid) {
		$("#reportdata").empty();
		defaultHaveScroll('reportdata');
		$('#startTime').datetimebox('setValue','');
		$('#endTime').datetimebox('setValue','');
		top.$.messager.alert("消息","请先选择交易序列！");
		return;
	}
	var a=[];
	if(1==value){
		 a = $("#reportdata").datagrid('getRows');
	}else{
		 a = $("#reportdata").datagrid('getSelections');
		 if(a.length==0){
			 top.$.messager.alert("消息","请先选择要申报的记录!");
				return;
		 }else{
			  putJydyId1();
		 }
	}
	if(a.length>0){
		var b = $("#reportdata").datagrid('getRows');
		for(var i=0;i<b.length;i++){
			$("#reportdata").datagrid('endEdit',i);
		}
	}
	if(a.length==1&&a[0].bidinfoid=="")//包含空数据行，用来显示滚动条
	{
		top.$.messager.alert("消息","请先查询数据后再申报!");
		return;
	}
	
	if(a.length==0)//未选择行
	{
		top.$.messager.alert("消息","请至少选择一行数据再申报!");
		return;
	}
	
	checkPrice();// 判断是否申报了购方申报价格上，下限
	var checkdata = 0;
	var startdate = $('#startTime').datebox('getValue');
	var enddate = $('#endTime').datebox('getValue');
	var ss = commonAjax("check","{}");
	if (ss[0] != null && ss[0].length > 0) {
		var now = ss[0];
		if (now < startdate || now > enddate) {// 判断点击申报按钮时服务器时间与交易序列开始结束时间的早晚
			top.$.messager.alert("消息","未在允许申报时间内，无法申报！");
			return;
		}
	}

	if (a.length > 0) {
		var array = new Array();
		var hasnull = false;

		for ( var i = 0; i < a.length; i++) {
			if (i == 0) {
				sum_jydyid = null;//预成交交易单元ID
				sid = null;
				stime = null;
				sum_Energy = 0;
				sum_jf_Energy = 0;
				sum_f_Energy = 0;
				sum_p_Energy = 0;
				sum_g_Energy = 0;
				sum_dg_Energy = 0;
				sum_count = 0; // 总电量不为空且电价为空的次数
				jf_count = 0;// 尖峰电量不为空且尖峰电价为空的次数
				f_count = 0;// 峰电量不为空且峰电价为空的次数
				p_count = 0;// 平电量不为空且平电价为空的次数
				g_count = 0;// 谷电量不为空且谷电价为空的次数
				dg_count = 0;// 低谷电量不为空且低谷电价为空的次数
			}

			var row = a[i];
			var rowIndex = $("#reportdata").datagrid('getRowIndex',row);
			var bidinfoid = row.bidinfoid;// guid
			var jydyId = row.jydyId;// 交易单元名称
			var tradeRole = row.tradeRole;// 角色
			var band = row.band;// 阶梯申报段数
			var tradeTimepart = row.tradeTimepart;// 时间段

			if (tradeTimepart == null) {// 判断申报时间段是否为空
				top.$.messager.alert("消息","申报时间段列数值为空，无法申报！");
				return;
			}
//***************************************************待编写*************
// 当时间分段数大于1时会用这段代码校验 只有当时间段数量为1时，sid = jydyId 这里校验不了 单独处理
//			if (sid != null && (sid != jydyId || stime != tradeTimepart)) {
//				var v = indicateForCheckPrice();
//				if (!v[0]) {
//					mx.indicate("info", v[1]);
//					var item = _dataGrid.items;
//					for ( var i = 0; i < item.length; i++) {
//						var p_item = item[i];
//						if (v.length == 3) {
//							if (p_item.$e_right[0].cells["tradeTimepart"].innerHTML == stime) {
//								if (p_item.$e_right[0].cells[v[2]] != null) {
//									p_item.$e_right[0].cells[v[2]].style.color = "red";
//									// p_item.$e_right.find('td#'+v[2]).css('color','red');
//								}
//							}
//						}
//					}
//					return;
//				}
//			}
			var energy = (row.energy==undefined?null:row.energy);//总电量
			var price = (row.price==undefined?null:row.price);//总电价
			var powerPeriod = (row.powerPeriod==undefined?null:row.powerPeriod);
			var energyPeriod1 = (row.energyPeriod1==undefined?null:row.energyPeriod1);//尖峰
			var pricePeriod1 = (row.pricePeriod1==undefined?null:row.pricePeriod1);
			var powerPeriod1 = (row.powerPeriod1==undefined?null:row.powerPeriod1);
			var energyPeriod2 = (row.energyPeriod2==undefined?null:row.energyPeriod2);//峰
			var pricePeriod2 = (row.pricePeriod2==undefined?null:row.pricePeriod2);
			var powerPeriod2 = (row.powerPeriod2==undefined?null:row.powerPeriod2);
			var energyPeriod3 = (row.energyPeriod3==undefined?null:row.energyPeriod3);//平
			var pricePeriod3 = (row.pricePeriod3==undefined?null:row.pricePeriod3);
			var powerPeriod3 = (row.powerPeriod3==undefined?null:row.powerPeriod3);
			var energyPeriod4 = (row.energyPeriod4==undefined?null:row.energyPeriod4);//谷
			var pricePeriod4 = (row.pricePeriod4==undefined?null:row.pricePeriod4);
			var powerPeriod4 = (row.powerPeriod4==undefined?null:row.powerPeriod4);
			var energyPeriod5 = (row.energyPeriod5==undefined?null:row.energyPeriod5);//低谷
			var pricePeriod5 = (row.pricePeriod5==undefined?null:row.pricePeriod5);
			var powerPeriod5 = (row.powerPeriod5==undefined?null:row.powerPeriod5);
			var vendeeGenRate = (row.vendeeGenRate==undefined?null:row.vendeeGenRate);//购厂用电率
			var requiremanacost = (row.requiremanacost==undefined?null:row.requiremanacost);
			var userMaxPower = (row.userMaxPower==undefined?null:row.userMaxPower);
			var timeRange = (row.timeRange==undefined?null:row.timeRange);
			var matchjydyid = (row.matchJydyid==undefined?null:row.matchJydyid);
			
			if(energy == null || energy==""){
				top.$.messager.alert("消息","申报电量不可以为空，请重新填报后申报！");
				return;
			}
			/*if(me.energyunits == "WKWh"){
				energy = energy == null?null : energy*10;
				energyPeriod1 = energyPeriod1 == null?null : energyPeriod1*10;
				energyPeriod2 = energyPeriod2 == null?null : energyPeriod2*10;
				energyPeriod3 = energyPeriod3 == null?null : energyPeriod3*10;
				energyPeriod4 = energyPeriod4 == null?null : energyPeriod4*10;
				energyPeriod5 = energyPeriod5 == null?null : energyPeriod5*10;
			}*/
			
			//本条限额   下限   应该取两者大者  上限  应该取两者小者(总限额 和 分交易单元限额)
			var hprice = row.priceHiLimit;
			if(!hprice) {
				hprice = maxprice;
			}else if(maxprice&& parseFloat(hprice) > maxprice){//如果单独限额大于总上限
				hprice = maxprice;
			}
			var mprice = row.priceLowLimit;
			if(!mprice) {
				mprice = minprice;
			}else if(minprice&& parseFloat(mprice) < minprice){//如果单独限额大于总上限
				mprice = minprice;
			}

			if (!(me.marketId == '95518' && me.tradetype_code.substr(0,5)=='30011')) {
				if (minprice || maxprice) {// 如果配置了电价的上下限
					if ((energy && (!price))
							|| (energyPeriod1 && (!pricePeriod1))
							|| (energyPeriod2 && (!pricePeriod2))
							|| (energyPeriod3 && (!pricePeriod3))
							|| (energyPeriod4 && (!pricePeriod4))
							|| (energyPeriod5 && (!pricePeriod5))) {// 如果电量不为空且电价为空
						top.$.messager.alert("消息","配置了电价上限或下限且电量不为空电价为空的记录无法申报！");
						return;
					}
				}
			}

			//800 开头
			
			//800开头的校验申报电量
			if(me.tradetype_code.substring(0,3)=='800')
			{
				var params = '{"tradeseqId":' + tradeseqid + '}';
				var s = commonAjax("checkEnergy", params);
				var result = s[0];
				var value = result.energy;//
				if(value!="-1"&&energy>value)
				{
					top.$.messager.alert( "消息","申报电量不能大于挂牌电量与占比乘积");
					return;
				}
				
			}
			/*if(a.length==1&&energy==0){//只有一条记录
				top.$.messager.alert( "消息","同一交易单元申报电量为0,无法申报");
				return;
			}
			
			if(sid == jydyId){//相同交易单元
				if (energy) {
					sum_Energy1 = parseInt(sum_Energy1);
					sum_Energy1 += parseInt(energy);
				}
				if(i==a.length-1 && sum_Energy1==0){
					top.$.messager.alert( "消息","同一交易单元申报电量为0,无法申报");
					return;
				}
			}else{
				if(i!=0 && sum_Energy1==0){
					top.$.messager.alert( "消息","同一交易单元申报电量为0,无法申报");
					return;
				}
				sum_Energy1=0;
				if(energy){
					sum_Energy1=parseInt(energy)
				}
			}*/
			
			if (sid == jydyId && stime == tradeTimepart) {// 相同的交易单元同一时间段的情况
				if(me.isdeconeenergy=='1')
				{
					if(!matchjydyid&&price)//非空校验
					{
						top.$.messager.alert( "消息","被替代方交易单元不能为空");
						return;
					}
					if(price){
						if(sum_jydyid != matchjydyid){
							sum_matchjydyid++;
						}
						if(me.vendeedecnum){
							if(sum_matchjydyid>me.vendeedecnum){
								top.$.messager.alert("消息","相同交易单元、时间段内，被替代方交易单元数量不能大于"+ me.vendeedecnum + "个！");
								return;
							}
						}
					}
				}
				if (energy) {
					sum_Energy = parseInt(sum_Energy);
					sum_Energy += parseInt(energy);
				}
				if (energyPeriod1) {
					sum_jf_Energy = parseInt(sum_jf_Energy);
					sum_jf_Energy += parseInt(energyPeriod1);
				}
				if (energyPeriod2) {
					sum_f_Energy = parseInt(sum_f_Energy);
					sum_f_Energy += parseInt(energyPeriod2);
				}
				if (energyPeriod3) {
					sum_p_Energy = parseInt(sum_p_Energy);
					sum_p_Energy += parseInt(energyPeriod3);
				}
				if (energyPeriod4) {
					sum_g_Energy = parseInt(sum_g_Energy);
					sum_g_Energy += parseInt(energyPeriod4);
				}
				if (energyPeriod5) {
					sum_dg_Energy = parseInt(sum_dg_Energy);
					sum_dg_Energy += parseInt(energyPeriod5);
				}
				if (!(me.marketId == '95518' && me.tradetype_code
						.substr(0,5)=='30011')) {
					
					if (price != null && price != "") {// 电价总不为空
						if (sprice.indexOf(";" + price + ";") != -1) {
							top.$.messager.alert("消息","相同交易单元、时间段，不同阶梯申报段数的电价相同，无法申报！");
							return;
						} else {
							sprice += price + ";";
						}
					} else {// 电价总为空
						if (energy) {
							sum_count++;// 电量不为空 电价为空的次数；
						}
					}									
				}
			} else {
				if(me.isdeconeenergy=='1')
				{
					if (price) {
						if (matchjydyid) {
							// sum_jydyid = matchjydyid;
							sum_jydyid = ";" + matchjydyid + ";";
						} else {
							top.$.messager.alert("消息","被替代方交易单元不能为空");
							return;
						}
					}
					
				}
				/*if(i!=0&&sum_Energy==0){
					top.$.messager.alert("消息","申报电量为0，无法申报！");
					return;
				}*/
				sid = jydyId;// 当前行所在的交易单元
				stime = tradeTimepart;// 当前行所在的时间段
				// 不同交易不同时间段时要初始 所有和值
				sum_jydyid =  matchjydyid;
				sum_matchjydyid = 1;
				sum_Energy = 0;
				sum_jf_Energy = 0;
				sum_f_Energy = 0;
				sum_p_Energy = 0;
				sum_g_Energy = 0;
				sum_dg_Energy = 0;
				sum_count = 0;
				jf_count = 0;
				f_count = 0;
				p_count = 0;
				g_count = 0;
				dg_count = 0;
				if (energy) {
					if (!price) {
						sum_count = 1;
					}
					sum_Energy = parseInt(energy);
				}

				if (energyPeriod1) {
					if (!pricePeriod1) {
						jf_count = 1;
					}
					sum_jf_Energy = parseInt(energyPeriod1);
				}

				if (energyPeriod2) {
					if (!pricePeriod2) {
						f_count = 1;
					}
					sum_f_Energy = parseInt(energyPeriod2);
				}

				if (energyPeriod3) {
					if (!pricePeriod3) {
						p_count = 1;
					}
					sum_p_Energy = parseInt(energyPeriod3);
				}

				if (energyPeriod4) {
					if (!pricePeriod4) {
						g_count = 1;
					}
					sum_g_Energy = parseInt(energyPeriod4);
				}

				if (energyPeriod5) {
					if (!pricePeriod5) {
						dg_count = 1;
					}
					sum_dg_Energy = parseInt(energyPeriod5);
				}

				sprice = ";" + price + ";";
				spricePeriod1 = ";" + pricePeriod1 + ";";
				spricePeriod2 = ";" + pricePeriod2 + ";";
				spricePeriod3 = ";" + pricePeriod3 + ";";
				spricePeriod4 = ";" + pricePeriod4 + ";";
				spricePeriod5 = ";" + pricePeriod5 + ";";

			}
			/**
			 * 查询出当前行所在交易单元在同一时间段内的购方限额 相同交易单元在同一时间内 所填值必须在对应列数据的上下限之间
			 * modifiedbyWangLing 20140210
			 */
			var paramsss = '{"jydyId":"'+sid+'","timePart":"'+stime+'","tradeseqid":"'+ tradeseqid+'"}';
			var client = commonAjax("publishPre",paramsss);
			if (client!=null&&client.length>0) {
				result = client[0];
				if (result.bool) {
					if(result.list.length>0){
						var items = result.list;
						energy_hi_lmt = items[0][0];// 电量总上限
						energy_low_lmt = items[0][1];// 电量总下限
						energy_hi_lmt_checked=energy_hi_lmt;
						energy_low_lmt_checked=energy_low_lmt;
						
						energy_hi_lmt_j = items[0][2];// 尖峰上限
						energy_low_lmt_j = items[0][3];// 尖峰下限
						
						energy_hi_lmt_f = items[0][4];// 峰上限
						energy_low_lmt_f = items[0][5];// 峰下限
						
						energy_hi_lmt_p = items[0][6];// 平上限
						energy_low_lmt_p = items[0][7];// 平下限
						
						energy_hi_lmt_g = items[0][8];// 谷上限
						energy_low_lmt_g = items[0][9]// 谷下限
						
						energy_hi_lmt_d = items[0][10];// 低谷上限
						energy_low_lmt_d = items[0][11];// 低谷下限
					}
				}
				
			}
			
			if(2==value){
				var a1=[];
				var b1=[];
				var c1=[];
				var d1=[];
				var energy2=0;
				 a1 = $("#reportdata").datagrid('getRows');
				 b1 = $("#reportdata").datagrid('getSelections');
				 for ( var z = 0; z < a1.length; z++) {
					 var row1 = a1[z];
					 c1[z]=row1.bidinfoid;
				 }
				 for(var x = 0; x < b1.length; x++){
					 var row2 = b1[x];
					 d1[x]=row2.bidinfoid;
				 }
				 for(var m=0;m<c1.length;m++){
					 for(var n=0;n<d1.length;n++){
						 if(c1[m]==d1[n]){
							 c1.splice(m, 1)
						 }
					 }
				 }
				 for ( var n = 0; n < a1.length; n++) {
					 var row3 = a1[n];
					 for(var m=0;m<c1.length;m++){
						 if(row3.bidinfoid==c1[m]){
							 if(jydyId==row3.jydyId && row3.bidStatus==1){
								 energy2+=row3.energy==null?0:parseInt(row3.energy);
							 }
						 }
					 }
				 }
				 if(energy_hi_lmt!=null){
					 energy_hi_lmt_checked=energy_hi_lmt;
					 energy_hi_lmt = energy_hi_lmt-energy2;
				 }
				if(energy_low_lmt!=null){
					energy_low_lmt_checked=energy_low_lmt;
					energy_low_lmt = energy_low_lmt-energy2;
				}
				 //return;
			}
			//电量上下限校验
			var v = indicateForCheckPrice();
			if(!v[0]){
				var _panel = $('#reportdata').datagrid('getPanel');
				var _td = _panel.find('.datagrid-view2 .datagrid-body tr:eq('+rowIndex+')').find('td[field="'+v[2]+'"]');
				_td.css('color', 'red');
				
				top.$.messager.alert("消息", v[1]);
				
				return ;
			}
			
			//2016/12/6 添加同一时间段  限额电量百分比控制
			if(me.bandEnergyHiLimit){
				if(energy_hi_lmt == null){
					top.$.messager.alert("消息","未配置申报限额!")
					return;
				}
				if(energy >me.bandEnergyHiLimit*energy_hi_lmt){
					top.$.messager.alert("消息", "同一时间段,每段电量不得超过限额电量的"+me.bandEnergyHiLimit*100+"%!");
					return;
				}
			}
			
			if (me.tradetype_code.substr(0,3)=='100') {
				var matchjydyids = matchjydyid;
				if(matchjydyid)
				{
				  matchjydyids = matchjydyid.replace(',','/');
				}
				array[i] = bidinfoid + ";" + jydyId + ";" + tradeRole + ";"
						+ band + ";" + tradeTimepart + ";" + timeRange + ";"
						+ energy + ";" + price + ";" + energyPeriod1 + ";"
						+ pricePeriod1 + ";" + energyPeriod2 + ";"
						+ pricePeriod2 + ";" + energyPeriod3 + ";"
						+ pricePeriod3 + ";" + energyPeriod4 + ";"
						+ pricePeriod4 + ";" + energyPeriod5 + ";"
						+ pricePeriod5 + ";" + userMaxPower + ";"
						+ vendeeGenRate+";"+requiremanacost+";"+matchjydyids+";"
	    				+powerPeriod+";"
	    				+powerPeriod1+";"
	    				+powerPeriod2+";"
	    				+powerPeriod3+";"
	    				+powerPeriod4+";"
	    				+powerPeriod5;
			} else {
				var matchjydyids = matchjydyid;
				if(matchjydyid)
				{
				  matchjydyids = matchjydyid.replace(',','/');
				}
				array[i] = bidinfoid+";"+jydyId+";"+tradeRole+";"+band+";"+tradeTimepart+";"+timeRange+";"+getEncryptMessage(energy)+";"+getEncryptMessage(price)+";"
				+getEncryptMessage(energyPeriod1)+";"+getEncryptMessage(pricePeriod1)+";"+getEncryptMessage(energyPeriod2)+";"
				+getEncryptMessage(pricePeriod2)+";"+getEncryptMessage(energyPeriod3)+";"+getEncryptMessage(pricePeriod3)+";"
				+getEncryptMessage(energyPeriod4)+";"+getEncryptMessage(pricePeriod4)+";"+getEncryptMessage(energyPeriod5)+";"
				+getEncryptMessage(pricePeriod5)+";"+userMaxPower+";"+vendeeGenRate+";"+requiremanacost+";"+matchjydyids+";"+getEncryptMessage(powerPeriod)+";"
				+getEncryptMessage(powerPeriod1)+";"
				+getEncryptMessage(powerPeriod2)+";"
				+getEncryptMessage(powerPeriod3)+";"
				+getEncryptMessage(powerPeriod4)+";"
				+getEncryptMessage(powerPeriod5);
			}
			// colunms是datagrid中的字段，这里必须与array[i]中的顺序，个数一样。
			var columns = "bidinfoid;jydyId;tradeRole;band;tradeTimepart;timeRange;energy;price;energyPeriod1;pricePeriod1;energyPeriod2;pricePeriod2;" +
			"energyPeriod3;pricePeriod3;energyPeriod4;pricePeriod4;energyPeriod5;pricePeriod5;userMaxPower;vendeeGenRate;powerPeriod;powerPeriod1;powerPeriod2;powerPeriod3;powerPeriod4;powerPeriod5";//;
			// 调公用的校验方法
			var validateController = new validate();
			var paramCodeVali = validateController.getValidate("floatNumber");// floatNumber表示有效数字校验
			var paramCodeVali2 = validateController.getValidate("floatNumberb");
			var paramCodeVali3 = validateController.getValidate("floatNumberc");
			var cols = columns.split(";");
			// 数据校验
			
			if (!$("#reportdata").datagrid('getColumnOption','vendeeGenRate').hidden) {// 判断列是否是显示的
				if (vendeeGenRate != null && vendeeGenRate != ""&& vendeeGenRate != "null") {
					var bool = checkNumber(vendeeGenRate);
					if (!bool) {
						top.$.messager.alert("消息","厂用电率不是有效数字！");
						return;
					}
					if (vendeeGenRate < 0 || vendeeGenRate > 1) {
						top.$.messager.alert( "消息","厂用电率只能是0-1之间的数字！");
						return;
					}
				}
			}
			if (row["userMaxPower"] == null || row["userMaxPower"] == "null"||row["userMaxPower"]=="") {// 标记是否有没填数据的项
				if (!$("#reportdata").datagrid('getColumnOption','userMaxPower').hidden) {// 判断列是否是显示的
					if (hasnull == false) {// 如果是true就不用再从新赋值了
						hasnull = true;
					}
				}
			} else {
				// var bool = paramCodeVali.validator(row[cols[j]]);
				var bool = checkNumber(row["userMaxPower"]);
				if (!bool) {
					top.$.messager.alert('提示', "“" + row["userMaxPower"] + "”"+ "不是有效数字！");
					return;
				}
				var bool3 = checkSum(row["userMaxPower"], "0");
				if (!bool3) {
					top.$.messager.alert('提示', "“"+ $("#reportdata").datagrid('getColumnOption','userMaxPower').title + "”"
							+ "请输入最多16位整数,最多4位小数的数字！");
					return;
				}
			}
			// 数据校验
			for ( var j = 6; j < cols.length - 2; j++) {
				
				if (row[cols[j]] == null || row[cols[j]] == "null"||row[cols[j]] =="") {// 标记是否有没填数据的项
					if (!$("#reportdata").datagrid('getColumnOption',cols[j]).hidden) {// 判断列是否是显示的
						if (hasnull == false) {// 如果是true就不用再从新赋值了
							hasnull = true;
						}
					}
				} else {
					// var bool = paramCodeVali.validator(row[cols[j]]);
					var bool = checkNumber(row[cols[j]]);
					if (!bool) {
						top.$.messager.alert('提示', "“" + row[cols[j]] + "”"
								+ "不是有效数字！");
						return;
					}
					var bool2 = null;
					var bool3 = null;
					if (!(me.marketId == '95518' && me.tradetype_code
							.substring(0,5)=='30011')) {
						if (me.pricePrecision == null) {
							bool2 = checkFloatNum(row[cols[j]], -2);
							if (!bool2) {
								if (cols[j].indexOf("price") != -1) {// 电价的验证
									// 保留1位小数
									top.$.messager.alert('提示', "“"+ $("#reportdata").datagrid('getColumnOption',cols[j]).title + "”"+ "请输入最多12位整数,最多2位小数的数字！");
									return;
								}
							}
						} else {
							bool2 = checkFloatNum(row[cols[j]],me.pricePrecision);
							if (!bool2) {
								if (cols[j].indexOf("price") != -1) {// 电价的验证
									// 保留1位小数
									var tex = "";
									if (me.pricePrecision >= 0) {
										tex += "“"+ $("#reportdata").datagrid('getColumnOption',cols[j]).title+ "”"
												+ "必须为"+ Math.pow(10,me.pricePrecision)+ "的整数倍！";
									} else {
										tex += "“"
												+ $("#reportdata").datagrid('getColumnOption',cols[j]).title
												+ "”" + "请输入最多12位整数,最多"+ Math.abs(me.pricePrecision)+ "位小数的数字！"
									}
									top.$.messager.alert('提示', tex);
									return;
								}
							}
						}
					}
					if (me.energyPrecision == null) {
						//bool3 = checkNum(row[cols[j]], "1");
						bool3 = paramCodeVali3.validator(row[cols[j]]);
						if (!bool3) {
							if (cols[j].indexOf("energy") != -1) {// 电量的验证
								// 10的整数倍
								top.$.messager.alert('提示', "“"+ $("#reportdata").datagrid('getColumnOption',cols[j]).title + "”" + "必须为10的整数倍！");
								return;
							}
						}
					} else {
						bool3 = checkNum(row[cols[j]], me.energyPrecision);
						if (!bool3) {
							if (cols[j].indexOf("energy") != -1) {// 电量的验证
								// 10的整数倍
								var tex = "";
								if (me.energyPrecision < 0) {
									tex += "“"+ $("#reportdata").datagrid('getColumnOption',cols[j]).title + "”" + "请输入最多12位整数,最多"
											+ Math.abs(me.energyPrecision) + "位小数的数字！"
								} else {
									tex += "“"+ $("#reportdata").datagrid('getColumnOption',cols[j]).title
											+ "”" + "必须为"+ Math.pow(10, me.energyPrecision)+ "的整数倍！";
								}
								top.$.messager.alert('提示', tex);
								return;
							}
						}
					}
					
					//电量不能为负
					if(cols[j] == "energy") {
						var _energy = parseInt(row[cols[j]]);
						if(isNaN(_energy) || _energy<0) {
							tex = "“"+$("#reportdata").datagrid('getColumnOption',cols[j]).title+"”"+"应该填写正数";
							top.$.messager.alert('提示', tex);
							return;
						}
					}
					// var bool2 = paramCodeVali2.validator(row[cols[j]]);
					// if(!bool2){
					// if(cols[j].indexOf("price") != -1){//电价的验证 保留1位小数
					// mx.indicate("info",
					// "“"+row[cols[j]]+"”"+"请输入最多12位整数,最多1位小数的数字！");
					// return ;
					// }
					// }
					// var bool3 = paramCodeVali3.validator(row[cols[j]]);
					// if(!bool3){
					// if(cols[j].indexOf("energy") != -1){//电量的验证 10的整数倍
					// mx.indicate("info", "“"+row[cols[j]]+"”"+"电量必须为10的整数倍！");
					// return ;
					// }
					// }
					if (!(me.marketId == '95518' && me.tradetype_code.substring(0,5)=='30011')) {
						if (cols[j] == "price" || cols[j] == "pricePeriod1"|| cols[j] == "pricePeriod2"|| cols[j] == "pricePeriod3"|| cols[j] == "pricePeriod4"|| cols[j] == "pricePeriod5") {
							if (!$("#reportdata").datagrid('getColumnOption',cols[j]).hidden) {
								var p_f_flag = false;
								if (parseFloat(mprice) > parseFloat(row[cols[j]])&& mprice != null) {
									top.$.messager.alert('提示', "“"+ $("#reportdata").datagrid('getColumnOption',cols[j]).title+ "”"+ "低于["+mprice+"]购方申报价格下限！");
									p_f_flag = true;
								} else if (parseFloat(row[cols[j]]) > parseFloat(hprice)&& hprice != null) {
									top.$.messager.alert('提示', "“"+ $("#reportdata").datagrid('getColumnOption',cols[j]).title +"”"+ "超过["+hprice+"]购方申报价格上限！");
									p_f_flag = true;
								}
								
								if(p_f_flag) {
									var _panel = $('#reportdata').datagrid('getPanel');
									var _td = _panel.find('.datagrid-view2 .datagrid-body tr:eq('+i+')').find('td[field="'+cols[j]+'"]');
									_td.css('color', 'red');
									
									return;
								}
							}
						}
					}
				}
			}

			/*
			 * //验证页面是否全为空。 if(energy ==null &&price ==null &&energyPeriod1
			 * ==null &&pricePeriod1 ==null &&energyPeriod2 ==null
			 * &&pricePeriod2 ==null&& energyPeriod3 ==null &&pricePeriod3
			 * ==null &&energyPeriod4 ==null &&pricePeriod4 ==null
			 * &&energyPeriod5 ==null &&pricePeriod5==null){
			 */
			// 电量至少填一个
			/*if (energy == null && energyPeriod1 == null&& energyPeriod2 == null && energyPeriod3 == null&& energyPeriod4 == null && energyPeriod5 == null) {
				checkdata = checkdata + 1;
			} else {
				continue;
			}*/

		}

		// 单独校验时间段数量为1的记录
		// 当只有一个时间段时：
		// 注释掉此段对时间段数量校验位1的代码
		// 理由：前面的大循环中，对datagrid中的所有列进行了循环判断，而调用indicateForCheckPrice（）方法进行上下限判断的条件是
		// 下一条item中的tradeTimepart（时间段）值与前面一条的不相同，但是会出现最后一条item没有下一条。所以每次校验，对于时间段是多个的数据，最后一个时间段是不进行校验的。
		// 既，假设时间段为3个，前2个时间段的上下限是进行校验的，第3个不进行校验。
		// 而时间段为1的数据，其实就相当于最后一个时间段。
		// 所以，综上所述，不需要这个判断了。
		// liping 2014-06-11 注释
		// if(count == 1){//时间段数量为1
		//var v = indicateForCheckPrice();
//待编写
//		if (!v[0]) {
//			mx.indicate("info", v[1]);
//			var item = _dataGrid.items;
//				var p_item = item[i];
//				if (v.length == 3) {
//					if (p_item.$e_right[0].cells["tradeTimepart"].innerHTML == stime) {
//						if (p_item.$e_right[0].cells[v[2]] != null) {
//							p_item.$e_right[0].cells[v[2]].style.color = "red";
//						}
//					}
//				}
//			}
//			return;
//		}
		// }
		
		/*if (checkdata == a.length) {
			top.$.messager.alert("消息","申报电量为空，无法申报！");
			return;
		}*/

		//添加同一时间段价差控制2016/12/7
		if(me.bandPriceLowLimit){
			var a=[];
			a = $("#reportdata").datagrid('getRows');
			for ( var i = 0; i < a.length; i++) {
				var row = a[i];
				
				var tradeTimepart = row.tradeTimepart;// 时间段
				var jydyId = row.jydyId;
				if (tradeTimepart == null) {// 判断申报时间段是否为空
					top.$.messager.alert("消息","申报时间段列数值为空，无法申报！");
					return;
				}
				var price = (row.price==undefined?null:row.price);//总电价
				if(price == null){
					top.$.messager.alert("消息","电价不能为空！");
					return;
				}
				var key = jydyId+tradeTimepart;
				if(map.containsKey(key)){
					var value = map.get(key);
					map.removeByKey(key);
					map.put(key, value+";"+price)
				}else{
					map.put(key, price)
				}
			}
			
			//对电价排序比较
			var arr = map.keys();
			for(var i =0;i<arr.length;i++){
				var key = arr[i];
				var value = map.get(key);
				var p = value.split(";");
				//p.sort();
				for(var m =0;m<p.length-1;m++){
					if(p[m+1]-p[m]<=0){
						top.$.messager.alert("消息","同一时间段,阶梯电价必须递增!");
						map.clear();
						return;
					}
					if(p[m+1]-p[m]<me.bandPriceLowLimit){
						top.$.messager.alert("消息","同一时间段,每段价差不得小于"+me.bandPriceLowLimit+"元/MWh!");
						map.clear();
						return;
					}
				}
			}
			map.clear();
		}
		
		if (hasnull == true) {// 如果有没填数据的项，让用户确认是否继续保存
			if(!window.confirm('有数据为空,确定保存数据？')) {
				return;
			}
		}
		
		var tradeseqid = $('#tradeName').combobox('getValue');
		var jsonData = new Object();
		jsonData["entity"] = array.toString();
		jsonData["tradeseqId"] = "" + tradeseqid;
		jsonData['dataEncryptFlag'] = me.dataEncryptFlag;// 增加加密标志
		jsonData['dataDisgerFlag'] = me.dataDisgerFlag;// 增加加密标志
		
		if(1==value){
			jsonData['JYDYID'] = me.jydyId;
		}else{
			jsonData['JYDYID'] = me.JYDYID;
		}
		if (me.dataDisgerFlag == '1') {
			//注释了
//			if (!me.cfcaUtil.selectSignCertificate()) {
//				top.$.messager.alert("消息","请插入加密密钥！");
//				if (!me.cfcaUtil.selectSignCertificate()) {
//					top.$.messager.alert("消息","获取用户身份密钥失败！");
//					jsonData['dataDisgerFlag'] = "0";
//				}
//			}
//			if (jsonData['dataDisgerFlag'] == '1') {
//				jsonData["disgerData"] = me.cfcaUtil.signMessage(
//						jsonData["entity"], false, true);
//				if (jsonData["disgerData"] === false) {
//					top.$.messager.alert("消息","签名失败！");
//					return;
//				}
//			}
		} else {
			jsonData["disgerData"] = "";
		}
		
//		me.progress = utils.commonProgress.progress.tradeProgress("waiting",
//				"正在申报……");
//		me.$e.setBusy(true);

		var s = commonUtilAjax("saveData",JSON.stringify(jsonData));
		//去后台保存数据
		if(s.successful){
			result = s.resultValue.items[0];
			if(result.bool){
				if(me.istradeyeartomonths == "1"){//me.istradeyeartomonths == "1"
					showFenYue(tradeseqid);
				}else{
					top.$.messager.alert('提示', result.msg);
				}
				//保存后刷新表格
				query();
	
			}else{
				top.$.messager.alert('提示', result.msg);
			}
		}
	}
	
}

function showFenYue(tradeseqid){
	var url="/pmos/powerTrade/tradeyeartomonth.jsp?tradeseqid="+tradeseqid+"&tradename="+me.tradename;
	//全局弹出
	top.$.jBox("iframe:"+url, {
		title: "分月计划上报",
		width: 900,
		height: 540,
		buttons: []
	});
}

function indicateForCheckPrice() {
	if (sum_Energy && (energy_hi_lmt || energy_low_lmt)) {
		var showText = checkPriceAll(energy_hi_lmt, energy_low_lmt, sum_Energy,
				"总");
		if (showText != null && showText != "") {
			return [ false, showText, "energy" ];
		}
	}
	if (sum_jf_Energy && (energy_hi_lmt_j || energy_low_lmt_j)) {
		var showText = checkPriceAll(energy_hi_lmt_j, energy_low_lmt_j,
				sum_jf_Energy, "尖峰");
		if (showText != null && showText != "") {
			return [ false, showText, "energyPeriod1" ];
		}
	}
	if (sum_f_Energy && (energy_hi_lmt_f || energy_low_lmt_f)) {
		var showText = checkPriceAll(energy_hi_lmt_f, energy_low_lmt_f,
				sum_f_Energy, "峰");
		if (showText != null && showText != "") {
			return [ false, showText, "energyPeriod2" ];
		}
	}
	if (sum_p_Energy && (energy_hi_lmt_p || energy_low_lmt_p)) {
		var showText = checkPriceAll(energy_hi_lmt_p, energy_low_lmt_p,
				sum_p_Energy, "平");
		if (showText != null && showText != "") {
			return [ false, showText, "energyPeriod3" ];
		}
	}
	if (sum_g_Energy && (energy_hi_lmt_g || energy_low_lmt_g)) {
		var showText = checkPriceAll(energy_hi_lmt_g, energy_low_lmt_g,
				sum_g_Energy, "谷");
		if (showText != null && showText != "") {
			return [ false, showText, "energyPeriod4" ];
		}
	}
	if (sum_dg_Energy && (energy_hi_lmt_d || energy_low_lmt_d)) {
		var showText = checkPriceAll(energy_hi_lmt_d, energy_low_lmt_d,
				sum_dg_Energy, "低谷");
		if (showText != null && showText != "") {
			return [ false, showText, "energyPeriod5" ];
		}
	}
	if (!(me.marketId == '95518' && me.tradetype_code.indexOf('30011')==0)) {
		if (sum_count > 1) {
			return [ false, "相同交易单元、时间段，申报电量（总）不允许存在多条电量（总）不为空，电价为空的记录" ];
		}
		if (jf_count > 1) {
			return [ false, "相同交易单元、时间段，申报电量（总）不允许存在多条电量（尖峰）不为空，电价（尖峰）为空的记录" ];
		}
		if (f_count > 1) {
			return [ false, "相同交易单元、时间段，申报电量（总）不允许存在多条电量（峰）不为空，电价（峰）为空的记录" ];
		}
		if (p_count > 1) {
			return [ false, "相同交易单元、时间段，申报电量（总）不允许存在多条电量（平）不为空，电价（平）为空的记录" ];
		}
		if (g_count > 1) {
			return [ false, "相同交易单元、时间段，申报电量（总）不允许存在多条电量（谷）不为空，电价（谷）为空的记录" ];
		}
		if (dg_count > 1) {
			return [ false, "相同交易单元、时间段，申报电量（总）不允许存在多条电量（低谷）不为空，电价（低谷）为空的记录" ];
		}
	}
	return [ true, "" ];
}

function checkPrice() {
	var tradeseqid = $("#tradeName").combobox('getValue');
	// 判断是否配置购方申报电价上下限
	var paramss = {
		"tradeseqId" : "" + tradeseqid,
		keys : [ "VENDEE_HI_PRICE", "VENDEE_LOW_PRICE" ]
	};
    var params = JSON.stringify(paramss)
  //交易序列名称切换时，判断是否显分配时间段。及分配的时间段数量
	var s = commonAjax("checkprice",params);
	if (s[0].bool) {
		var result = s[0].list;
			if (result.length > 0) {
				for ( var i = 0; i < result.length; i++) {
					var name = result[i][0];
					var value = result[i][1];
					if (name == 'VENDEE_HI_PRICE') {
						maxprice = value;
					} else if (name == 'VENDEE_LOW_PRICE') {
						minprice = value;
					}
				}
			}
	}
}
function tabChanges(title,index) {
	var tradeseqid = $("#tradeName").combobox('getValue');
	if(title == "限额电量"){
		if(tradeseqid==null || tradeseqid ==""){
			top.$.messager.alert("消息","请选择交易名称！");
			return;
		}else{
    		var params = '{"tradeseqId" :'+ tradeseqid+'}';
    		var co = commonAjax("getIsPub",params);
    		if(co!=null&&co.length>0){
    			if(co == "0"){
    				top.$.messager.alert("消息","交易公告未发布！");
    				return;
        		}
    		}
    		
		}
		if(me.jydyId == ""){
			top.$.messager.alert("消息","无相关数据！");
			return;
		}
		
		var params = '{tradeseqId :' +tradeseqid+',"keys":["IS_DEC_SUM","IS_ENERGY1","IS_ENERGY2","IS_ENERGY3","IS_ENERGY4","IS_ENERGY5"]}';
		me.energyLimitDisplayConfig = commonAjax("getDisplayConfig",params);
		var a='{"tradeSeqId":"'+tradeseqid+'","Trade_TimePart":"","jydyId":"'+me.jydyId+'","tradeRole":"0"}';
		searchEnergyLimitDatagrid(a);
		me.energyLimitConfig();
	}else if(title == "峰平谷时段查询"){
		if(tradeseqid==null || tradeseqid ==""){
			top.$.messager.alert("消息","请选择交易名称！");
			return;
		}else{
    		var params = '{"tradeseqId" :'+ tradeseqid+'}';
    		var co = commonAjax("getIsPub",params);
    		if(co!=null&&co.length>0){
    			if(co == "0"){
    				top.$.messager.alert("消息","交易公告未发布！");
    				return;
        		}
    		}
		}
		if(me.jydyId == ""){
			top.$.messager.alert("消息","无相关数据！");
			return;
		}
		var p = '{"tradeseqId":'+tradeseqid+'}';
		fpgsdcxDatagrid();
		searchFpgsdcxDatagrid(p);
	}else if(title == "单元组申报限额"){
		if(tradeseqid==null || tradeseqid ==""){
			top.$.messager.alert("消息","请选择交易名称！");
			return;
		}
		if(me.jydyId == ""){
			top.$.messager.alert("消息","无相关数据！");
			return;
		}
		var data = $("#reportdata").datagrid('getRows');
		var jydyId = data[0].jydyId;
		var p = '{"tradeSeqId":"'+tradeseqid+'","jydyId":"'+jydyId+'"}';
		//var p = '{"tradeseqId":'+tradeseqid+'}';
		dyzsbxeDatagrid();
		searchDyzDatagrid(p);
	}
}

function checkPriceAll(hi_lmt, low_lmt, energy, type) {
	var showText = "";
	if(me.energyunits =='WKWh') {
		if(hi_lmt == null){
			if(low_lmt != null){
				if(energy < parseFloat(low_lmt)/10){
					showText = "相同交易单元、时间段，申报电量（"+type+"）必须大于电量（"+type+"）下限"+parseFloat(energy_low_lmt_checked)/10+"万千瓦时";
				}
			}
		}else{
			if(low_lmt != null){
				if(energy < parseFloat(low_lmt)/10 || energy > parseFloat(hi_lmt)/10){
					showText = "相同交易单元、时间段，申报电量（"+type+"）必须在电量（"+type+"）上限"+parseFloat(energy_hi_lmt_checked)/10+"万千瓦时和下限"+parseFloat(energy_low_lmt_checked)/10+"万千瓦时之间";
				}
			}else if(energy>parseFloat(hi_lmt)/10){
				showText = "相同交易单元、时间段，申报电量（"+type+"）必须小于电量（"+type+"）上限"+parseFloat(energy_hi_lmt_checked)/10+"万千瓦时";
			}
			
		}
	} else {
		if(hi_lmt == null){
			if(low_lmt != null){
				if(energy < low_lmt){
					showText = "相同交易单元、时间段，申报电量（"+type+"）必须大于电量（"+type+"）下限"+energy_low_lmt_checked+"兆瓦时";
				}
			}
		}else{
			if(low_lmt != null){
				if(energy < low_lmt || energy > hi_lmt){
					showText = "相同交易单元、时间段，申报电量（"+type+"）必须在电量（"+type+"）上限"+energy_hi_lmt_checked+"兆瓦时和下限"+energy_low_lmt_checked+"兆瓦时之间";
				}
			}else if(energy>hi_lmt){
				showText = "相同交易单元、时间段，申报电量（"+type+"）必须小于电量（"+type+"）上限"+energy_hi_lmt_checked+"兆瓦时";
			}
			
		}
	}
	return showText;
}

/**
 * 格式化数字
 * 
 * @author wsl
 * @param s
 *            要格式化的数字
 * @param n
 *            保留小数点后多数位
 */
function fnumber(s, n) {
	if (s + "" == "NaN")// 如果为非法数字则将值置为0
	{
		s = 0;
		return "";
	}
	if (s == null) {
		s = 0;
		return "";
	}
	n = n > 0 && n <= 20 ? n : 2;
	r1 = (s + "").split(".")[1];
	if (r1 == null) {
		return s;
	} else {
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
		var l = s.split(".")[0].split("").reverse();
		var r = "";
		if (r1.length < n) {
			r = r1;
		} else {
			r = s.split(".")[1];
		}
	}

	var t = "";
	for (i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	return t.split("").reverse().join("") + "." + r;
}
// 电价
function renderCellByPrice(p_item, $p_cell) {
	if (me.pricePrecision == null) {
		$p_cell.text(fnumber(p_item.getValue(this.name), 2));
		// p_item.setValue(this.name,fnumber(p_item.getValue(this.name), 1));
	} else {
		$p_cell.text(p_item.getValue(this.name) == null ? "" : p_item
				.getValue(this.name));
	}
}

/**
 * 精确数字位数
 */
function round(number, fractionDigits) {
	if (number == null) {
		return "";
	}
	if (number + "" == "NaN")// 如果为非法数字则将值置为0
	{
		return "";
	}
	with (Math) {
		var rv = round(number / fractionDigits) * fractionDigits;
		return rv;
	}
}
// 电价精度验证
function checkFloatNum(value, num) {
	var num1 = Math.abs(num);
	var zz = "";
	if (num > 0) {
		zz = new RegExp('^-?[1-9]\\d*0{' + num1 + ',' + num1 + '}$');
	} else if (num == 0) {
		zz = new RegExp('^-?[1-9]\\d*$');
	} else {
		zz = new RegExp('^(-?0|-?[1-9]\\d{0,11})(\\.\\d{1,' + num1 + '})?$');
	}
	return zz.test(value);
}
// 电量精度验证
function checkNum(value, num) {
	var num1 = Math.abs(num);
	var zz = "";
	if (num < 0) {
		zz = new RegExp('^(-?0|-?[1-9]\\d{0,11})(\\.\\d{1,' + num1 + '})?$');
	} else if (num == 0) {
		//zz = new RegExp('^-?[1-9]\\d*$');
		zz = new RegExp('^-?\\d+$');
	} else {
		//zz = new RegExp('^(0|-?[1-9]\\d*0{' + num1 + ',' + num1 + '})$');
		zz = new RegExp('^-?\\d+0{'+num1+','+num1+'}$');
	}
	return zz.test(value);
}
function checkSum(value) {
	zz = new RegExp('^(-?0|-?[1-9]\\d{0,15})(\\.\\d{1,4})?$');
	return zz.test(value);
}
// 判断是否是合法数字
function checkNumber(value) {
	//var zz = new RegExp('^(0|-?[0-9]\\d*)(\\.\\d+)?$');
	var zz = new RegExp('^(-?[1-9]\\d*|-?0)(\\.\\d+)?$');
	return zz.test(value);
}




function removeColor() {
	var item = _dataGrid.items;
	for ( var i = 0; i < item.length; i++) {
		var p_item = item[i];
		var energ = [ "energy", "energyPeriod1", "energyPeriod2",
				"energyPeriod3", "energyPeriod4", "energyPeriod5" ];
		for ( var j = 0; j < energ.length; j++) {
			p_item.$e_right[0].cells[energ[j]].style.color = "";
		}
	}
}
function changeShow(p_item, $p_cell) {
	$p_cell.text(p_item.getValue(this.name) == "" ? "未申报" : p_item
			.getValue(this.name) == "0" ? "未申报" : "已申报");
}

//公共ajax编码,适用于返回值@RawResponseBody
function commonUtilAjax(methodName,params){
	var items=null;
	$.ajax({
		url : "/pmos/rest/pmostrbibidjydy/"+methodName,
		type : "post",
		dataType : "json",
		data : 'params='+params,
		async:false,//异步刷新
		success : function(data) {
			items = data;
		},
		error : function(event, request, settings) {
			top.$.messager.alert('消息','操作失败!');
		}
	});
	return items;
}

//显示预成交曲线
function showPic()
{
	$('#win').window('open'); 
	var tradeseqid = $("#tradeName").combobox('getValue');
	var params = '{"tradeseqId":'+tradeseqid+'}';
	$.ajax({
		  url: "/pmos/rest/pmossellertrbidinfojydy/getXml",
		  type : "post",
		  dataType : "json",
		  data : 'params='+params,
		  success:function(data){
			  var xmlData="";
			  if(data.successful){
				  xmlData=data.resultValue.items[0];
			  }
		     var myChart1 = new FusionCharts("../../ETradePublicUtils/fusionChart/resources/swf/MSStepLine.swf?ChartNoDataText=无数据显示", "myChart", "100%", "100%");
	         myChart1.setDataXML(xmlData);
	         myChart1.render("pic");
		  },
		  error:function(data){
			  top.$.messager.alert("消息","出现异常!!!");
		  }
		 });
}


//调用售方申报页面的后台ajax编码，适用于@ItemResponseBody
function commonAjaxSale(methodName,params){
	var items=null;
	$.ajax({
		url : "/pmos/rest/pmossellertrbidinfojydy/"+methodName,
		type : "post",
		dataType : "json",
		data : 'params='+params,
		async:false,//异步刷新
		success : function(data) {
			if(data.successful){
				items = data.resultValue.items;
			}
			
		},
		error : function(event, request, settings) {
			top.$.messager.alert('消息','操作失败!');
		}
	});
	return items;
}
//替换datagrid列标题(Datagrid动态设置列标题的的扩展方法)
$.extend($.fn.datagrid.methods, { 
    setColumnTitle: function(jq, option){ 
        if(option.field){
            return jq.each(function(){ 
                var $panel = $(this).datagrid("getPanel");
                var $field = $('td[field='+option.field+']',$panel);
                if($field.length){
                    var $span = $("span",$field).eq(0);
                    $span.html(option.text);
                }
            });
        }
        return jq;     
    } 

});

function myMap(){
	this.elements = new Array();
	
	//获取MAP元素个数
     this.size = function() {
         return this.elements.length;
     };
     
   //删除MAP所有元素
      this.clear = function() {
          this.elements = new Array();
      };
	//向MAP中增加元素（key, value) 
	  this.put = function(_key, _value) {
	      this.elements.push( {
	          key : _key,
	          value : _value
	      });
	  };
	//获取指定KEY的元素值VALUE，失败返回NULL
     this.get = function(_key) {
         try {
             for (i = 0; i < this.elements.length; i++) {
                 if (this.elements[i].key == _key) {
                     return this.elements[i].value;
                 }
             }
         } catch (e) {
             return false;
         }
         return false;
     };
     
   //判断MAP中是否含有指定KEY的元素
      this.containsKey = function(_key) {
          var bln = false;
          try {
              for (i = 0; i < this.elements.length; i++) {
                  if (this.elements[i].key == _key) {
                      bln = true;
                }
              }
          } catch (e) {
              bln = false;
          }
          return bln;
      };
    
    //删除指定KEY的元素，成功返回True，失败返回False
       this.removeByKey = function(_key) {
           var bln = false;
           try {
               for (i = 0; i < this.elements.length; i++) {
                   if (this.elements[i].key == _key) {
                       this.elements.splice(i, 1);
                       return true;
                   }
               }
           } catch (e) {
               bln = false;
           }
           return bln;
       };
    //获取MAP中所有KEY的数组（ARRAY）
       this.keys = function() {
           var arr = new Array();
           for (i = 0; i < this.elements.length; i++) {
               arr.push(this.elements[i].key);
           }
         return arr;
       };
}
