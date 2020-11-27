var guid=null;
var dataStatus=null;
var readOnly="false";
var biao="";
var dicts;
$(function(){
	var ddataStatus = $('#dataStatus').val();
	if($('#message').val() == 0){
		$('input').attr('disabled','disabled');
		$('select').attr('disabled','disabled');
		$('#saves').remove();
	}else if($('#message').val() == 1){
		if(ddataStatus == 10 || ddataStatus == 12 || ddataStatus == 20 || ddataStatus == 22 || ddataStatus == 30 || ddataStatus == 32 || ddataStatus == null || ddataStatus == ''){
			$('.false').attr('class','true');
		}else{
			$('input').attr('disabled','disabled');
			$('select').attr('disabled','disabled');
			$('#submit').remove();
			$('#back').remove();
		}
	}	
});

//用电单元名称
//function loadNameCheck(){
//	if($('#loadName').val() != ''){
//		if($('#message').val() != 0){
//			$.post($('#ctx').val()+'/BaaddSaleCompanyView/bindview/mdlyesOrNo', {consid:$('#consid').val(),name:'load_name',value : $('#loadName').val()}, function(data) {
//				if(data.sunccess){
//					jBox.tip("用电单元名称已存在！", "messager");
//					$('#loadName').attr('class','false');
//					$('#loadName').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
//				}else{
//					$('#loadName').css({'border-color':'','box-shadow':''}); 
//					$('#loadName').attr('class','true');
//					return;
//				}
//			});
//		}
//	}else{
//		jBox.tip("用电单元名称不能为空！", "messager");
//		$('#loadName').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'});
//		$('#loadName').attr('class','false');
//	}
//	
//}

//营销用户编号
function consNoCheck(){
	if($('#consNo').val() != ''){
		if($('#message').val() != 0){
			$.post($('#ctx').val()+'/BaaddSaleCompanyView/bindview/mdlyesOrNo', {consid:$('#consid').val(),name:'cons_no',value : $('#consNo').val()}, function(data) {
				if(data.sunccess){
					jBox.tip("营销用户编号已存在！", "messager");
					$('#consNo').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
					$('#consNo').attr('class','false');
				}else{
					$('#consNo').css({'border-color':'','box-shadow':''}); 
					$('#consNo').attr('class','true');
					return;
				}
			});
		}
	}else{
		jBox.tip("营销用户编号不能为空！", "messager");
		$('#consNo').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'});
		$('#consNo').attr('class','false');
	}
	
}

//用电地址
function elecAddrCheck(){
	if($('#elecAddr').val() == ''){
		jBox.tip("用电地址不能为空！", "messager");
		$('#elecAddr').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
		$('#elecAddr').attr('class','false');
	}else {
		$('#elecAddr').css({'border-color':'','box-shadow':''}); 
		$('#elecAddr').attr('class','true');
	}
}

//输配电损耗率
function transferAllotLossCheck(){
	var transferAllotLoss = $('#transferAllotLoss').val();
	if($('#transferAllotLoss').val() != ''){
		var reg = /^([1-9]\d{0,10}|0)(\.\d{1,4})?$/;
		if(reg.test(transferAllotLoss)){
			$('#transferAllotLoss').attr('class','');
			$('#transferAllotLoss').css({'border-color':'','box-shadow':''}); 
			return;
		}else {
			$('#transferAllotLoss').attr('class','null');
			jBox.tip("请输入正确的输配电损耗率！", "messager");
			$('#transferAllotLoss').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			return;
		}
	}else {
		$('#transferAllotLoss').css({'border-color':'','box-shadow':''}); 
		$('#transferAllotLoss').attr('class','');
	}
}

//目录电价(不含政府基金及附加)(元/MWH)
function priceCheck(){
	var price = $('#price').val();
	var reg = /^([1-9]\d{0,3}|0)(\.\d{1,6})?$/;
	if($('#price').val() != ''){
		if(reg.test(price)){
			$('#price').attr('class','');
			$('#price').css({'border-color':'','box-shadow':''}); 
			return;
		}else {
			jBox.tip("请输入正确的目录电价(不含政府基金及附加)！", "messager");
			$('#price').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			$('#price').attr('class','null');
			return;
		}
	}else{
		$('#price').css({'border-color':'','box-shadow':''}); 
		$('#price').attr('class','');
	}
}

//政府基金及附加(元/MWH):
function fundsandaddpriceCheck(){
	var fundsandaddprice = $('#fundsandaddprice').val();
	var reg = /^([1-9]\d{0,5}|0)(\.\d{1,6})?$/;
	if($('#fundsandaddprice').val() != ''){
		if(reg.test(fundsandaddprice)){
			$('#fundsandaddprice').attr('class','');
			$('#fundsandaddprice').css({'border-color':'','box-shadow':''}); 
			return;
		}else {
			jBox.tip("请输入正确的政府基金及附加！", "messager");
			$('#fundsandaddprice').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			$('#fundsandaddprice').attr('class','null');
			return;
		}
	}else{
		$('#fundsandaddprice').css({'border-color':'','box-shadow':''}); 
		$('#fundsandaddprice').attr('class','');
	}
}

//变压器容量(MVA)
function transformerVolumeCheck(){
	var transformerVolume = $('#transformerVolume').val();
	var reg = /^([1-9]\d{0,11}|0)(\.\d{1,4})?$/;
	if(reg.test(transformerVolume)){
		$('#transformerVolume').css({'border-color':'','box-shadow':''}); 
		$('#transformerVolume').attr('class','true');
	}else {
		$('#transformerVolume').attr('class','false');
		jBox.tip("请输入正确的变压器容量(MVA)！", "messager");
		$('#transformerVolume').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
	}
}
//直供容量(MVA)
function directSupplyVolumeCheck(){
	var directSupplyVolume = $('#directSupplyVolume').val();
	var reg = /^([1-9]\d{0,11}|0)(\.\d{1,4})?$/;
	if($('#directSupplyVolume').val() != ''){
		if(reg.test(directSupplyVolume)){
			$('#directSupplyVolume').attr('class','');
			$('#directSupplyVolume').css({'border-color':'','box-shadow':''}); 
		}else {
			jBox.tip("请输入正确的直供容量(MVA)！", "messager");
			$('#directSupplyVolume').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			$('#directSupplyVolume').attr('class','null');
		}
	}else{
		$('#directSupplyVolume').css({'border-color':'','box-shadow':''}); 
		$('#directSupplyVolume').attr('class','');
	}
}

//最大需量(MVA)
function mostVolumeCheck(){
	var mostVolume = $('#mostVolume').val();
	var reg = /^([1-9]\d{0,11}|0)(\.\d{1,4})?$/;
	if($('#mostVolume').val() != ''){
		if(reg.test(mostVolume)){
			$('#mostVolume').attr('class','');
			$('#mostVolume').css({'border-color':'','box-shadow':''});
		}else {
			jBox.tip("请输入正确的最大需量(MVA)！", "messager");
			$('#mostVolume').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			$('#mostVolume').attr('class','null');
		}
	}else{
		$('#mostVolume').css({'border-color':'','box-shadow':''}); 
		$('#mostVolume').attr('class','');
	}
}


//功率因数
function powerFactorCheck(){
	var powerFactor = $('#powerFactor').val();
	var reg = /^([1-9]\d{0,15}|0)(\.\d{1,4})?$/;
	if($('#powerFactor').val() != ''){
		if(reg.test(powerFactor)){
			$('#powerFactor').attr('class','');
			$('#powerFactor').css({'border-color':'','box-shadow':''});
		}else {
			jBox.tip("请输入正确的功率因数！", "messager");
			$('#powerFactor').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			$('#powerFactor').attr('class','null');
		}
	}else{
		$('#powerFactor').css({'border-color':'','box-shadow':''}); 
		$('#powerFactor').attr('class','');
	}
}

/**
 *状态加载  
 */
function  initStatus(){
	$.ajax({
		url :"/pmos/rest/regist/loadStatus",
		type : "POST",
		async : false,
		dataType :"json",
		data:{
		},
		success : function(data){ 
			//只读设置
			if(data.resultValue.items[0].readOnly=="true"){
				readOnly=true;
			}else{
				readOnly=false;
			}	
		}
	
});
}

function save(){
	
		var data = $("#bamktaadminloadForm").serialize();
		if($(".true").length < 3){
			jBox.tip("请确认"+$(".false").eq(0).parent().prev().text().replace(':','').replace('*','')+"是否填写正确后再提交！", "messager",{ id:null,top:'75%' });
			return false;	
		}
		if($(".null").length > 0){
			jBox.tip("请确认"+$(".null").eq(0).parent().prev().text().replace(':','').replace('*','')+"是否填写正确后再提交！", "messager",{ id:null,top:'75%' });
			return false;	
		}
		if($("#loadType option:selected").val() == ''  
			|| $('#voltageGrade option:selected').val() == ''
			|| $('#tradeCode option:selected').val() == ''
			|| $('#elecTypeCode option:selected').val() == ''
			|| $('#powerexamflag option:selected').val() == ''){
			if($("#loadType option:selected").val() == ''){
				jBox.tip("请确认用电单元类型是否填写正确后再提交！", "messager",{ id:null,top:'75%' });
				return false;
			}
			if($('#voltageGrade option:selected').val() == ''){
				jBox.tip("请确认用电电压等级是否填写正确后再提交！", "messager",{ id:null,top:'75%' });
				return false;
			}
			if($('#tradeCode option:selected').val() == ''){
				jBox.tip("请确认电价行业类别是否填写正确后再提交！", "messager",{ id:null,top:'75%' });
				return false;
			}
			if($('#elecTypeCode option:selected').val() == ''){
				jBox.tip("请确认用电类别是否填写正确后再提交！", "messager",{ id:null,top:'75%' });
				return false;
			}
			if($('#powerexamflag option:selected').val() == ''){
				jBox.tip("请确认功率因素考核是否填写正确后再提交！", "messager",{ id:null,top:'75%' });
				return false;
			}
			
		}
			var url = $('#ctx').val()+"/BaaddSaleCompanyView/bindview/saveregistelectricunitInfoSale?"+'checkcode='+$('#checkcode').val();
			$.post(url,data,function(data) {
				if(data.message == 0){
					$('#saves').attr('flag','1');
					window.parent.window.isFreshFlag="2";//回写父页面的值
					window.parent.window.consid = data.participantid;
					parent.$.jBox.close();	
				 }else{
					jBox.tip('保存失败!', 'messager'); 
					$('#saves').removeAttr('disabled','disabled');
				 }
			});
}

function initButtons(){
	if(readOnly=="true"){
		$("input").each(function(){ 
			$(this).attr("readonly", true);
	}) 
		$(".combo-arrow").hide();
		document.getElementById("saves").style.display="none";
	}
}