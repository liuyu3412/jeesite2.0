alert(3211);

var pageNum=1,pageSize=15;
var marketId ="";
var sheng="";
$(document).ready(function() {
	init();
});
/**
 *  初始化首页
 */
function init(){
	
	alert(3211);
	
	
//	db();//待办
//	htdlJj();//合同电量均价
//	_initMarketId();
//	
//	var cyear = (new Date()).getFullYear();
//	var cmonth = (new Date()).getMonth()+1;
//	
//	_initZBorWS(cyear,cmonth,para_val);//判断是总部登录还是网省登录
//	loadjydl(cyear,cmonth);//交易信息
}
/**
 * 周期下拉选择
 */
function loadZQSelect(){
	$("#ZQselect").change(function(){
		var p1=$(this).children('option:selected').val();
		loadChartData('queryFhqx1', p1, 'div3', 'MSLine.swf');
	});
}

/**
 * 初始化场景id
 */

function _initMarketId(){
	var url =  "../../pmos/rest/marketTreeDropDownEditor/getLoginMarketId";
	marketId = getSync(url,{});
}

function _initZBorWS(cyear,cmonth,para_val){
	if(para_val == '91812'){
		document.getElementById('WSdldlph').style.display = "none";
		document.getElementById('WSfhqx').style.display = "none";
		document.getElementById('zbDldlph').style.display = "block";
		document.getElementById('zbWdgz').style.display = "block";
		$("#jyxx11").text("交易总体情况");
		loadZbWdgz(cyear,cmonth);
		loadZbdldl();
	}else if(para_val == '95712'){
		document.getElementById('WSdldlph').style.display = "block";
		document.getElementById('WSfhqx').style.display = "none";
		document.getElementById('WScontentXX').style.display = "none";
		document.getElementById('zbWdgz').style.display = "none";
		document.getElementById('sy_all').style.height = '590px';
		loaddldl(cyear,cmonth);//电力电量
	}else{
		document.getElementById('WSdldlph').style.display = "block";
		document.getElementById('WSfhqx').style.display = "block";
		document.getElementById('zbDldlph').style.display = "none";
		document.getElementById('zbWdgz').style.display = "none";
		$("#jyxx11").text("全省交易信息");
		loadZQData();
		loadZQSelect();//曲线下拉选择事件
		loaddldl(cyear,cmonth);//电力电量
	}
}


/**
 * 电力电量平衡网省
 * @param cyear
 * @param cmonth
 */
function loaddldl(){
	$.ajax({
		url : "minePage/dlphzt",
		type : 'post',
		data:{},
		success : function(data){
			alert(111);
			if(data.successful){
//				var da = data.resultValue.items[0];
//				$("#dldl").text(sheng+da[1]+"年"+da[2]+"月电力电量供需:"+da[0]);
//				if(da[0] == '富裕'){
//					document.getElementById('fuyu').style.display = "block";
//					document.getElementById('fuyuf').style.borderTop = "3px solid #007D5E";
//				}else{
//					document.getElementById('fuyu').style.display = "none";
//					document.getElementById('fuyuf').style.borderTop = "0";
//				}
//				if(da[0] == '基本平衡'){
//					document.getElementById('jbph').style.display = "block";
//					document.getElementById('jbphf').style.borderTop = "3px solid #3BD686";
//				}else{
//					document.getElementById('jbph').style.display = "none";
//					document.getElementById('jbphf').style.borderTop = "0";
//				}
//				if(da[0] == '偏紧'){
//					document.getElementById('pinj').style.display = "block";
//					document.getElementById('pinjf').style.borderTop = "3px solid #F0C801";
//				}else{
//					document.getElementById('pinj').style.display = "none";
//					document.getElementById('pinjf').style.borderTop = "0";
//				}
//				if(da[0] == '紧张'){
//					document.getElementById('jinz').style.display = "block";
//					document.getElementById('jinzf').style.borderTop = "3px solid #E30000";
//				}else{
//					document.getElementById('jinz').style.display = "none";
//					document.getElementById('jinzf').style.borderTop = "0";
//				}
			}
		}
	});
}

/**
 * @author shidengju
 * 总部电力电量平衡
 */
function loadZbdldl(){
	$.ajax({
		url : "../../pmos/rest/indexWaitDoController/zbdlphzt",
		type : 'post',
		success : function(data){
			if(data.successful){
				var items =  data.resultValue.items;
				for(var i=0;i<items.length;i++){
					var da = items[i]
					if(da[1] == '95412'){//江苏
						if(da[0] =='富裕'){
							document.getElementById('zbJS').style.backgroundColor = "#007D5E";
							document.getElementById('zbJS').title="富裕";
						}else if(da[0] == '基本平衡'){
							document.getElementById('zbJS').style.backgroundColor = "#3BD686";
							document.getElementById('zbJS').title="基本平衡";
						}else if(da[0] == '偏紧'){
							document.getElementById('zbJS').style.backgroundColor = "#F0C801";
							document.getElementById('zbJS').title="偏紧";
						}else if(da[0] == '紧张'){
							document.getElementById('zbJS').style.backgroundColor = "#E30000";
							document.getElementById('zbJS').title="紧张";
						}
					}}
				}
			}
		}
	);
}
/**
 * ×Ü²¿ÎÒµÄ¹Ø×¢
 * @base
 * @author shidengju
 */
function loadZbWdgz(cyear,cmonth){
	$("#zbWdgzSwdl").text(cyear+"Äê"+cmonth+"ÔÂÉÏÍøµçÁ¿");
	$("#zbLjswl").text(cyear+"ÄêÀÛ¼ÆÉÏÍøÁ¿");
	//µ±Ç°ÔÂÉÏÍøÁ¿
	$.ajax({
		url : "../../pmos/rest/indexWaitDoController/zbdqyswl",
		type : 'post',
		success : function(data){
			if(data.successful){
				var da = data.resultValue.items;
				if(da == ''){
					da = 0;
				}
				$("#zbdyswdlData").text(da);
			}
		}
	});
	//µ±Äê½ØÖ¹µ½µ±Ç°ÔÂÀÛ¼ÆÉÏÍøµçÁ¿
	$.ajax({
		url :"../../pmos/rest/indexWaitDoController/zbljswl",
		type : 'post',
		success : function(data){
			if(data.successful){
				var da = data.resultValue.items;
				if(da == ''){
					da = 0;
				}
				$("#zbLjswdlData").text(da);
			}
		}
	});
	var  smonth =  cmonth -1;
	$("#zbhtdlbq").text(cyear+"Äê"+smonth+"ÔÂ·ÝµÄºÏÍ¬µçÁ¿");
	$.ajax({
		url :"../../pmos/rest/indexWaitDoController/zbhtdl",
		type : 'post',
		success : function(data){
			if(data.successful){
				var da = data.resultValue.items;
				if(da[0] == ''){
					da[0]= 0;
				}
				$("#zbhtdl").text(da[0]);
				if(da[1] == null || da[1] == "" || da[0] == 0 ){
					$("#zbhtwcl").text("0.0%");
				}else{
					$("#zbhtwcl").text((da[1]/da[0].toFixed(3))*100+"%");
				}
			}
		}
	});
}

/**
 * ¸ººÉÇúÏßÍøÊ¡
 * @param year
 */
function loadZQData(){
	var p = $("#ZQselect").val();
	loadChartData('queryFhqx1', p, 'div3', 'MSLine.swf');
}
/**
 * ²é¿´¸ººÉÇúÏßÏêÏ¸ÐÅÏ¢
 */
function checkQXDetail_click(){
	url =  "../../pmos/index/FHQXDetail.jsp";
	top.$.jBox("iframe:"+url, {
		title: "¸ººÉÇúÏßÏêÏ¸ÐÅÏ¢",
		width: 1024,
		height: 370,
		buttons: {}
	  });
}

function loadChartData(rest, year, container, charType) {
	url = encodeURI( "../../pmos/rest/indexWaitDoController/" + rest);
	$.ajax({
		type:'GET',
		url:url,
		data:{year:year},
		contentType:"application/x-www-form-urlencoded; charset=utf-8", 
		//async: true,
		cache: false,
		dataType:'html',
		beforeSend:function(url){
		},
		error: function(data,transport){
			$('#'+container).html('Êý¾Ý¼ÓÔØÊ§°Ü');
		},
		success:function(xml){
			showChart(container, charType, xml);
		}
	});
}

function showChart(container, charType, xml) {
	var chart = new FusionCharts("/ETradePublicUtils/fusionChart/resources/swf/"+charType+"?ChartNoDataText=ÎÞÏà¹ØÊý¾Ý",container+"Chart","1015","270","0","0");
	chart.setDataXML(xml);
	chart.render(container);
}
/**
 * ±¾µ¥Î»µ±Äê²ÎÓëÕâ±Ê½»Ò×µÄ´ÎÊý
 */
function loadjydl(cyear,cmonth){
	$("#zbWdgzSwdl").text(cyear+"Äê"+cmonth+"ÔÂÉÏÍøµçÁ¿");
	$("#zbLjswl").text(cyear+"ÄêÀÛ¼ÆÉÏÍøÁ¿");
	$("#dncjdl2").text(cyear+"Äê01ÔÂÖÁ½ñ³É½»´ÎÊý");
	//µ±Ç°ÔÂÉÏÍøÁ¿
	$.ajax({
		url : "../../pmos/rest/indexWaitDoController/zbdqyswlall",
		type : 'post',
		success : function(data){
			if(data.successful){
				var da = data.resultValue.items;
				if(da == ''){
					da = 0;
				}
				$("#zbdyswdlData").text(da);
			}
		}
	});
	//µ±Äê½ØÖ¹µ½µ±Ç°ÔÂÀÛ¼ÆÉÏÍøµçÁ¿
	$.ajax({
		url :"../../pmos/rest/indexWaitDoController/zbljswlall",
		type : 'post',
		success : function(data){
			if(data.successful){
				var da = data.resultValue.items;
				if(da == ''){
					da = 0;
				}
				$("#zbLjswdlData").text(da);
			}
		}
	});
	//È«Ê¡µ±Äê³É½»´ÎÊý
	$.ajax({
		url :"../../pmos/rest/indexWaitDoController/qwlnjybs",
		type : 'post',
		success : function(data){
			if(data.successful){
				var da = data.resultValue.items;
				if(da == ''){
					$("#lncjdl").text(0);
				}else{
					$("#lncjdl").text(da);  
				}
			}
		}
	});
	
	
	//È«Ê¡³É½»µçÁ¿
	$.ajax({
		url :"../../pmos/rest/indexWaitDoController/qscjdlall",
		type : 'post',
		success : function(data){
			if(data.successful){
				var da = data.resultValue.items;
				if(da == ''){
					$("#qscjdl").text(0);
				}else{
					$("#qscjdl").text(da);  
				}
			}
		}
	});
}
function checkDetail_click(a){
	var title
	var year = (new Date()).getFullYear();
	var month = (new Date()).getMonth()+1;
	
	if(a == 1){
		title = "±¾µ¥Î»µ±Äê½»Ò×ÏêÏ¸ÐÅÏ¢";
	}else if(a == 2) {
		title = "±¾µ¥Î»ÀúÄê½»Ò×ÏêÏ¸ÐÅÏ¢";
	}
	url =  "../../pmos/index/jyDetail.jsp?aa="+a;
	top.$.jBox("iframe:"+url, {
		title: title,
		width: 800,
		height: 500,
		buttons: {}
	  });
}

/**
 * ÎÒµÄ´ý°ì
 */
function db(){
	$.ajax({
		url : "../../pmos/rest/indexWaitDoController/",
		type : "post",
		dataType : "json",
		data : queryCondition("",1,5),
		success : function(data) {
			var itemCount = data.resultValue.itemCount;// ×ÜÌõÊý
			if (itemCount > 0) {
				for ( var i = 0; i < data.resultValue.items.length; i++) {
					var rows=data.resultValue.items;
					var u;
					if(rows[i][10] !=null && rows[i][10] != ""){	//PMOSURL²»Îª¿Õ£¬ÒÔÐÂÍâÍø´ý°ìÎª×¼
						u=rows[i][10].split("?")
					}
					else{	//·ñÔòÒÔÀÏÍâÍø´ý°ìÎª×¼
						u=rows[i][2].split("?");//urlÓÐµÄÓÐ²ÎÊý·Ö¸î£¬ÖØ×éurl
					}
					
					var bussId="";
					if(u.length>1){
						bussId="&"+u[1]+"&businessid="+rows[i][1];
					} else {
						//È±ÉÙbusinessid
						bussId="&businessid="+rows[i][1];
					}
					var activityInstID="";
					var workItemID="";
					if(null!=rows[i][8]&&"null"!=rows[i][8]){
						activityInstID=rows[i][8];
					}
					if(null!=rows[i][9]&&"null"!=rows[i][9]){
						workItemID=rows[i][9];
					}
					if(u[0].indexOf("/") == 0){
						u[0] = u[0].substr(1,u[0].length);
					}
					var url = "../../"+u[0]+"?processInstID=&activityInstID="+ activityInstID +"&isout=1&workItemID="+ (workItemID)+bussId;
					
					
					var title = rows[i][7];// ±êÌâ
					var date = rows[i][3];// ·¢²¼Ê±¼ä
					$("#ulId").append(
							"<li><a href='javascript:void(0)' onclick=openAuDo('"+url+"')>" + title
									+ "</a><span>" + date
									+ "</span></li>");
				}
			} else {
				$("#ulId").append("<li style='text-align:left;'>µ±Ç°ÎÞ´ý°ìÈÎÎñ¡£</li><li></li><li></li><li></li><li></li>");
			}
		},
		error : function(event, request, settings) {
			alert('²Ù×÷Ê§°Ü!');
		}
	});
}
/**
 * µ¯³ö´ý°ìÈÎÎñÒ³
 */
function openAuDo(url){
	  top.$(".jbox-body").remove();
		//È«¾Öµ¯³ö
	  top.$.jBox("iframe:"+url, {
		title: "´ý°ìÈÎÎñ",
		width: 1200,
		height: 500,
		buttons: {}
	  });
}
/**
 * ´ý°ìÈÎÎñmoreµ÷ÓÃ
 */
function moreOnDown(){
	var title=this.title;
	var loc=window.location;	
	window.location="./indexShowList.jsp?title="+encodeURI(title);
}
/**
 * ºÏÍ¬µçÁ¿
 */
function htdlJj(){
//	var url1= "../../pmos/rest/indexWaitDoController/queryMarket3";//ºÏÍ¬µçÁ¿
//	var url2="../../pmos/rest/indexWaitDoController/queryMarket4";//ºÏÍ¬¾ù¼Û
//	FlexJQueryChart(Constants.StackedColumn2D,url1,"div1","../..");
//	FlexJQueryChart(Constants.MSLine,url2,"div2","../..");
	var url1 =   "/pmos/rest/ContractAnalyse/getChart4";
	getXml(url1,calls1);
	
	var url2 =   "/pmos/rest/ContractAnalyse/getChart5";
	getXml(url2,calls2);
}

var calls1=function(obj){
	var xml=obj;
	var chart = new FusionCharts( "/ETradePublicUtils/fusionChart/resources/swf/StackedColumn2DLine.swf?ChartNoDataText=ÎÞÏà¹ØÊý¾Ý","myChartId","100%","300","0","0");
	chart.setDataXML(xml);
	chart.render("div1");
	
}
var calls2=function(obj){
	var xml=obj;
	var chart = new FusionCharts( "/ETradePublicUtils/fusionChart/resources/swf/ScrollLine2D.swf?ChartNoDataText=ÎÞÏà¹ØÊý¾Ý","myChartId","100%","300","0","0");
	chart.setDataXML(xml);
	chart.render("div2");
	
}

function getXml(url,callback){
	url = encodeURI(url);
	$.ajax({
		type:'GET',
		url:url,
		data:"",
		contentType:"application/x-www-form-urlencoded; charset=utf-8", 
		async:true,
		cache : false,
		dataType:'html',
		beforeSend:function(url){
		},
		error: function(data,transport){
//			top.$.messager.alert('ÏûÏ¢', 'Êý¾ÝÒÑ¼ÓÔØ£¬ÇëÎðÆµ·±²Ù×÷!');
			alert("´íÎó:\r\¼ÓÔØ´íÎó:"+data+"\r\´íÎóÐÅÏ¢:"+transport,"error");
//			window.parent.location.href = "/jsp/login/timeout.jsp";
		},
		success:function(xml){
			callback(xml); 
		}
	});
};

function queryCondition(condition,pageIndex,pageSize){
	var pageInfo={"pageIndex":pageIndex,"pageSize":pageSize};
	var params=$.extend(true,{filter:condition}, pageInfo);
	return 'params='+encodeURIComponent(JSON.stringify(params));
}