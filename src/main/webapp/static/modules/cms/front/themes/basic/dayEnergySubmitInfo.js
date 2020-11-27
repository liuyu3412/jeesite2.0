var filter = "";
var pageSize = 10, pageNum=1, itemCount = 0;
var editIndex = undefined ;
var editfiled = "" ;
var oldValue = null;
var checkCode = "";

$(document).ready(function() {
	checkCode = $("#checkCode").val();
});

function changeDate(num){
	if(num.length != 0){
		var a = top.$.jBox.confirm('数据有修改，确定切换日期？', "消息",function(isOk){
			if (isOk=="ok") {
				setTitleText(num);
			}

		});
	}
	else{
		setTitleText(num);
	}
}

function setTitleText(num){
	var dateFont = document.getElementById("dateFont");
	var fontRq = document.getElementById("fontRq");
	var oldDate = new Date(dateFont.innerText);
	
	var newTime = oldDate.getTime() + num * 24 * 60 * 60 * 1000;
	var newDate = new Date(newTime);
	
	var newYear = newDate.getFullYear();
	var newMonth = newDate.getMonth() + 1;
	var newDay = newDate.getDate();
	if(newMonth<10){
		newMonth = "0"+newMonth;
	}
	if(newDay<10){
		newDay = "0"+newDay;
	}
	
	dateFont.innerText = newYear +"-"+ newMonth +"-"+ newDay;
	fontRq.innerText = newYear +"-"+ newMonth +"-"+ newDay;
	
	initList();
	datas = [];
	editfiled = "";
}


function sumEnergyFun(){
	var gridDataFd = $('#monthEnergyTable').datagrid("getData");
	var dataRowsFd = gridDataFd.rows;
	
	var gridDataNet = $('#netEnergyTable').datagrid("getData");
	var dataRowsNet = gridDataNet.rows;
	
	var sumEnergy = 0;
	for(i=0; i<dataRowsFd.length; i++){
		if(dataRowsFd[i]['energy'] == "无"){
			sumEnergy += 0;
		}else{
			sumEnergy += parseNumber(dataRowsFd[i]['energy']);
		}
	}
	
	var sumNet = 0;
	for(i=0; i<dataRowsNet.length; i++){
		sumNet += parseNumber(dataRowsNet[i]['energy']);
	}
	
	var fontFd = document.getElementById("fontFd");
	var fontNet = document.getElementById("fontNet");
	fontFd.innerText = formatFloat(sumEnergy);
	fontNet.innerText = formatFloat(sumNet);
	
	var cydl = 0;
	if(sumEnergy == 0){
		cydl = 0;
	}
	else{
		var cydl100=parseInt((sumEnergy - sumNet)*10000/sumEnergy);
		cydl = parseNumber(cydl100)/100;
	}
	
	var fontCy = document.getElementById("fontCy");
	fontCy.innerText = cydl;
}

function initList(){
	var admin = $("#ctx").val();
	var date = $("#fontRq").html();
	window.location.href = admin + "/jsdayenergy/jsDayEnergyPlus/form?days="+date;
}

/**
 * 点击空白处结束编辑
 */
$(document).click(function(e){
})
  
var participantId = "";
var userName = "";
var calibertype = 1; //口径类型
var period = 0; //是否显示尖峰平谷

var datas = []; 
var sum = ""; 

function init(){ 
	initList();
//	_getParams(); 
//	_initCaliber();
//	_initDate();
//	_initPartyId();
//	_initUserName();
//	_findUnitInfo(1);
}


/**
 * 保存按钮
 */
function save(){
	var flag=false;

    $(".energyA").each(function (i,o) {
 		var value=$(o).html();
 		if(isNaN(value)){
 			flag=true
		}
    })
	if(flag){
        top.$.jBox.alert("请输入数字！","消息");
    	return
	}
	var sumEnergy = fontFd.innerText;
	var sumNet = fontNet.innerText;
	
	if(parseFloat(sumNet) > parseFloat(sumEnergy)){
		top.$.jBox.alert("上网电量不能大于发电量！","消息");
		return;
	}
	var arr = new Array();
	var isNumberFlag = true;
	//遍历table1的内容
	$("#table1 tbody tr").each(function() {
		var obj = {}
		obj.days=$("#fontRq").html();
		obj.grossornet = 0;
		obj.sourceType = 1;
		obj.ecounitId=$(this).find("td:eq(0)").html();
		obj.energyOut=parseFloat($(this).find("td:eq(4) span").html()).toFixed(3)=="NaN"?0:parseFloat($(this).find("td:eq(4) span").html()).toFixed(3);
		obj.energyDebug=parseFloat($(this).find("td:eq(5) span").html()).toFixed(3)=="NaN"?0:parseFloat($(this).find("td:eq(5) span").html()).toFixed(3);
		obj.remark=$(this).find("td:eq(6) span").html();
		arr.push(obj);
	}
	);

	

	//遍历table2的内容
	$("#table2 tbody tr").each(function() {
		var obj2 = {};
		obj2.days=$("#fontRq").html();
		obj2.ecounitId=$(this).find("td:eq(0)").html();
		obj2.grossornet = 1;
		obj2.sourceType = 1;
		obj2.energyOut=parseFloat($(this).find("td:eq(4)").html()).toFixed(3)=="NaN"?0:parseFloat($(this).find("td:eq(4)").html()).toFixed(3);
		obj2.energyF=parseFloat($(this).find("td:eq(6) span").html()).toFixed(3)=="NaN"?0:parseFloat($(this).find("td:eq(6) span").html()).toFixed(3);
		obj2.energyP=parseFloat($(this).find("td:eq(8) span").html()).toFixed(3)=="NaN"?0:parseFloat($(this).find("td:eq(8) span").html()).toFixed(3);
		obj2.energyG=parseFloat($(this).find("td:eq(10) span").html()).toFixed(3)=="NaN"?0:parseFloat($(this).find("td:eq(10) span").html()).toFixed(3);
		obj2.remark=$(this).find("td:eq(11) span").html();
		arr.push(obj2);
		console.log(obj2);
	}
	);

	$.ajax({
		url :  "updateInfo?checkcode="+checkCode,
		type : "post", 
		dataType : "json",
		data :'params='+JSON.stringify(arr),
		success : function(data) {
			if (data.flag) {
				if (data.flag=='success') {
					jBox.alert('保存成功!','提示',{top:'40%'});
					localStorage.setItem("deviceState","true");//回写父页面的值
            		window.parent.window.jBox.close();
				}else {
					jBox.alert('保存失败!','提示',{top:'40%'});
				}
			}
		}
	})
}

/**
 * 保留4位小数
 * @param src
 * @returns
 */
function formatFloat(src)
{
	if(src != null && src != "" && src !="无"){
		var i = parseFloat(src);
		return i.toFixed(4);
	}else if(src == '0'){
		return "0.0000";
	}else {
		return src;
	}
}

function checkNumber(src){
	if(src == "" || src == null){
		src = "0";
	}
    var number = /^(([1-9][0-9]*\.[0-9][0-9]*)|([0]\.[0-9][0-9]*)|([1-9][0-9]*)|([0]{1}))$/;
	if(!number.test(src)){
		return false;
	}
	return true;
}

