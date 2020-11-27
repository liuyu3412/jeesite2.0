var participanttype="";
var param = {};
var selectValueStr = [];  
//控制只读状态
//控制展示页面
var show="";
var conssid="";
var consid="";
var edit="";
var attid="";
var isReg1="";
var messege="";
var reloadid="";
var flag="1";
var submitFlag = 0;
var ddataStatus = "10";
// var guid="";
//控制是否上传附件
var id323=false;
var id30=false;
var id10=false;
var id11=false;
var id123=false;
var id20=false
var id21=false;
var id23=false;
var id116=false;
var id110=false;
var id118=false;
var id219=false;
var id220=false;
var id31=false;
var id44=false;
//记录有没有保存
var saved=false;
var readOnly = "";
var readOnlys="";
var affixa = "";
var isConcut=false;
var ysorNo = true;//记录是否可以点击触发验证
//记录上传附件的个数
function init(){
	if($('#status').val() != null && $('#status').val() != ''){
		$('.false').attr('class','true');
		id31=true;
		id30=true;
		id219=true;
		id44=true;
		ysorNo=true;
		submitFlag = 1;
		$('#sa1').css('display','block');
		$('#submit').text('提交审批');
	}else{
		ysorNo = false;
		$('input').attr('disabled','disabled');
		$('select').attr('disabled','disabled');
		$('#beginTime').removeAttr("disabled"); 
		$('#endTime').removeAttr("disabled"); 
		$('#sa1').css('display','none');
		$('#sa5').css('display','none');
	}

$('#example-multiple').multiselect();  
}

function checkField(value){
	$("#aliasname").val(value);
}
//企业全称
function participantnameCheck(){
	if(ysorNo == true){
		if($('#participantname').val() != ''){
			if($('#message').val() != 0){
				$.post($('#ctx').val()+'/BaaddSaleCompanyView/bindview/yesOrNo', {consid:$('#consid').val(),name:'participantname',value : $('#participantname').val()}, function(data) {
					if(data.sunccess){
						jBox.tip("用户名称已存在！", "messager");
						$('#participantname').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
						$('#participantname').attr('class','false');
					}else{
						$('#participantname').css({'border-color':'','box-shadow':''}); 
						$('#participantname').attr('class','true');
						return;
					}
				});
			}else if($('#dataStatus',parent.document).val() == '01'){
				$.post($('#ctx').val()+'/BaaddSaleCompanyView/bindview/yesOrNo', {consid:$('#consid').val(),name:'participantname',value : $('#participantname').val()}, function(data) {
					if(data.sunccess){
						jBox.tip("用户名称已存在！", "messager");
						$('#participantname').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
						$('#participantname').attr('class','false');
					}else{
						$('#participantname').css({'border-color':'','box-shadow':''}); 
						$('#participantname').attr('class','true');
						return;
					}
				});
			}
		}else{
			$('#participantname').attr('class','false');
			jBox.tip("用户名称不能为空！", "messager");
			$('#participantname').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'});
		}
	}
}

//地理区域
function geogrregionNameCheck(){
	if(ysorNo == true){
		if($('#geogrregionName').val() == ''){
			jBox.tip("地理区域不能为空！", "messager");
			$('#geogrregionName').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			$('#geogrregionName').attr('class','false');
		}else {
			$('#geogrregionName').css({'border-color':'','box-shadow':''}); 
		}
	}
}

//营销用户号个数
function consnumberCheck(){
	if(ysorNo == true){
		if($('#consnumber').val() == ''){
			jBox.tip("营销用户号个数不能为空！", "messager");
			$('#consnumber').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			$('#consnumber').attr('class','false');
		}else {
			$('#consnumber').attr('class','true');
			$('#consnumber').css({'border-color':'','box-shadow':''}); 
		}
	}
}

//行业类别
function uindustrytypeCheck(){
	if(ysorNo == true){
		if($('#uindustrytype').val() == ''){
			jBox.tip("行业类别不能为空！", "messager");
			$('#uindustrytype').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			$('#uindustrytype').attr('class','false');
		}else $('#uindustrytype').attr('class','true');
	}
}

//营销客户编号
function guidCheck(){
	if(ysorNo == true){
		if($('#guid').val() != ''){
			if($('#message').val() != 0){
				$.post($('#ctx').val()+'/BaaddSaleCompanyView/bindview/yesOrNo', {consid:$('#consid').val(),name:'guid',value : $('#guid').val()}, function(data) {
					if(data.sunccess){
						jBox.tip("营销客户编号已存在！", "messager");
						$('#guid').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
						$('#guid').attr('class','false');
					}else{
						$('#guid').css({'border-color':'','box-shadow':''}); 
						$('#guid').attr('class','true');
						return;
					}
				});
			}else if($('#dataStatus',parent.document).val() == '01'){
				$.post($('#ctx').val()+'/BaaddSaleCompanyView/bindview/yesOrNo', {consid:$('#consid').val(),name:'guid',value : $('#guid').val()}, function(data) {
					if(data.sunccess){
						jBox.tip("营销客户编号已存在！", "messager");
						$('#guid').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
						$('#guid').attr('class','false');
					}else{
						$('#guid').css({'border-color':'','box-shadow':''}); 
						$('#guid').attr('class','true');
						return;
					}
				});
			}
		}else{
			$('#guid').attr('class','false');
			jBox.tip("营销客户编号不能为空！", "messager");
			$('#guid').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
		}
	}
}

//统一社会信用代码
function businesscodeCheck(){
	if(ysorNo == true){
		var businesscode = $('#businesscode').val();
		var reg = /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/;//
		var re = new RegExp(reg);
		if($('#businesscode').val() != ''){
			if($('#message').val() != 0){
				$.post($('#ctx').val()+'/BaaddSaleCompanyView/bindview/yesOrNo', {consid:$('#consid').val(),name:'businesscode',value : $('#businesscode').val()}, function(data) {
					if(data.sunccess){
						jBox.tip("统一社会信用代码已存在！", "messager");
						$('#businesscode').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
						$('#businesscode').attr('class','false');
					}else{
						if (reg.test(businesscode)) {
							$('#businesscode').css({'border-color':'','box-shadow':''}); 
							$('#businesscode').attr('class','true');
							return;
						}else{
							jBox.tip("统一社会信用代码格式不正确！", "messager");
							$('#businesscode').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
							$('#businesscode').attr('class','false');
							return;
						}
					}
				});
			}else if($('#dataStatus',parent.document).val() == '01'){
				$.post($('#ctx').val()+'/BaaddSaleCompanyView/bindview/yesOrNo', {consid:$('#consid').val(),name:'businesscode',value : $('#businesscode').val()}, function(data) {
					if(data.sunccess){
						jBox.tip("统一社会信用代码已存在！", "messager");
						$('#businesscode').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
						$('#businesscode').attr('class','false');
					}else{
						if (reg.test(businesscode)) {
							$('#businesscode').css({'border-color':'','box-shadow':''}); 
							$('#businesscode').attr('class','true');
							return;
						}else{
							jBox.tip("统一社会信用代码格式不正确！", "messager");
							$('#businesscode').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
							$('#businesscode').attr('class','false');
							return;
						}
					}
				});
			}
		}else{
			$('#businesscode').attr('class','false');
			jBox.tip("统一社会信用代码不能为空！", "messager");
			$('#businesscode').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
		}
	}
}

//税务登记证号
function taxcodeCheck(){
	if(ysorNo == true){
		if($('#taxcode').val() == ''){
			jBox.tip("税务登记证号不能为空！", "messager");
			$('#taxcode').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			$('#taxcode').attr('class','false');
		}else {
			$('#taxcode').attr('class','true');
			$('#taxcode').css({'border-color':'','box-shadow':''}); 
		}
	}
}

//法人名称
function corpornameCheck(){
	if(ysorNo == true){
		if($('#corporname').val() == ''){
			jBox.tip("法人名称不能为空！", "messager");
			$('#corporname').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			$('#corporname').attr('class','false');
		}else {
			$('#corporname').attr('class','true');
			$('#corporname').css({'border-color':'','box-shadow':''}); 
		}
	}
}



//法人代表姓名
function corporationCheck(){
	if(ysorNo == true){
		var corporation = $('#corporation').val();
		var reg = "^[A-z]+$|^[\u4e00-\u9fa5]+$";//邮箱
		var re = new RegExp(reg);
		if($('#corporation').val() == ''){
			jBox.tip("法人代表姓名不能为空！", "messager");
			$('#corporation').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			$('#corporation').attr('class','false');
		}else {
			if (re.test(corporation)) {
				$('#corporation').css({'border-color':'','box-shadow':''}); 
				$('#corporation').attr('class','true');
				return true;
			}else {
				jBox.tip("请输入正确的中文/英文-法人名称！", "messager");
				$('#corporation').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
				$('#corporation').attr('class','false');
				return false;
			}
		}
	}
}

//组织机构代码
function organizecodeCheck(){
	if(ysorNo == true){
		if($('#organizecode').val() == ''){
			jBox.tip("组织机构代码不能为空！", "messager");
			$('#organizecode').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			$('#organizecode').attr('class','false');
		}else {
			$('#organizecode').attr('class','true');
			$('#organizecode').css({'border-color':'','box-shadow':''}); 
		}
	}
}

//开户银行
function depositbankCheck(){
	if(ysorNo == true){
		if($('#depositbank').val() == ''){
			jBox.tip("开户银行不能为空！", "messager");
			$('#depositbank').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			$('#depositbank').attr('class','false');
		}else {
			$('#depositbank').attr('class','true');
			$('#depositbank').css({'border-color':'','box-shadow':''}); 
		}
	}
}

//开户名称
function depositnameCheck(){
	if(ysorNo == true){
		var depositname = $('#depositname').val();
		var reg = "^[\u4e00-\u9fa5]*$";//
		var re = new RegExp(reg);
		if($('#depositname').val() == ''){
			jBox.tip("法人代表姓名不能为空！", "messager");
			$('#depositname').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			$('#depositname').attr('class','false');
		}else {
			if (re.test(depositname)) {
				$('#depositname').css({'border-color':'','box-shadow':''}); 
				$('#depositname').attr('class','true');
				return true;
			}else {
				jBox.tip("请输入正确的中文-开户名称！", "messager");
				$('#depositname').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
				$('#depositname').attr('class','false');
				return false;
			}
		}
	}
}

//开户账号
function depositaccountCheck(){
	if(ysorNo == true){
		if($('#depositaccount').val() == ''){
			jBox.tip("开户账号不能为空！", "messager");
			$('#depositaccount').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			$('#depositaccount').attr('class','false');
		}else {
			$('#depositaccount').attr('class','true');
			$('#depositaccount').css({'border-color':'','box-shadow':''}); 
		}
	}
}

//营业期限
function businesstermCheck(){
    if(ysorNo == true){
        if($('#businessterm').val() == ''){
            jBox.tip("营业期限不能为空！", "messager");
            $('#businessterm').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'});
            $('#businessterm').attr('class','false');
        }else {
            $('#businessterm').attr('class','true');
            $('#businessterm').css({'border-color':'','box-shadow':''});
        }
    }
}

//通信地址
function addressCheck(){
	if(ysorNo == true){
		if($('#address').val() == ''){
			jBox.tip("通信地址不能为空！", "messager");
			$('#address').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			$('#address').attr('class','false');
		}else {
			$('#address').attr('class','true');
			$('#address').css({'border-color':'','box-shadow':''}); 
		}
	}
}

//邮政编码
function postalcodeCheck(){
	if(ysorNo == true){
		var postalcode = $('#postalcode').val();
		var reg = "^[1-9][0-9]{5}$";//邮箱
		var re = new RegExp(reg);
		if (re.test(postalcode)) {
			$('#postalcode').css({'border-color':'','box-shadow':''}); 
			$('#postalcode').attr('class','true');
			return true;
		}else {
			jBox.tip("请输入正确的邮政编码！", "messager");
			$('#postalcode').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			$('#postalcode').attr('class','false');
			return false;
		}
	}
}



//电话校验
function telCheck(){
	if(ysorNo == true){
		var zhi = $('#telephone').val();
			var reg = "^1[3|4|5|7|8][0-9]\\d{8}$";
			var re = new RegExp(reg);
			 if (re.test(zhi)) {
				$('#telephone').css({'border-color':'','box-shadow':''}); 
				$('#telephone').attr('class','true');
				return true;
			}else {
				jBox.tip('请输入正确的手机号！', 'messager');
				//$('#telephone').val();
				$('#telephone').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
				$('#telephone').attr('class','false');
			  return false;
			}
	}
}

//邮箱校验
function emailCheck(){
	if(ysorNo == true){
		var email = $('#email').val();
		var reg = /^([a-zA-Z0-9_-]||[.,\\])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;//邮箱
		//var re = new RegExp(reg);
		if(email != ''){
			if (reg.test(email)) {
				 $('#email').css({'border-color':'','box-shadow':''}); 
				 $('#email').attr('class','');
				return true;
			}else {
				jBox.tip('请输入正确的邮箱地址！', 'messager',{ id:null,top:'55%' });
				$('#email').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
				$('#email').attr('class','null');
				return false;
			}
		}else{
			$('#email').css({'border-color':'','box-shadow':''}); 
			$('#email').attr('class','');
		}
	}
}

//联系人姓名
function linkmanCheck(){
	if(ysorNo == true){
		var linkman = $('#linkman').val();
		var reg = "^[\u4e00-\u9fa5]*$";//
		var re = new RegExp(reg);
		if($('#linkman').val() == ''){
			jBox.tip("联系人姓名不能为空！", "messager",{ id:null,top:'55%' });
			$('#linkman').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			$('#linkman').attr('class','false');
			return false;
		}else {
			if (re.test(linkman)){
				$('#linkman').attr('class','true');
				$('#linkman').css({'border-color':'','box-shadow':''}); 
				return true;
			}else {
				jBox.tip("请输入正确的中文-联系人姓名！", "messager");
				$('#linkman').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
				$('#linkman').attr('class','false');
				return false;
			}
		}
	}
}

//联系人职务
function positionCheck(){
	if($('#position').val() == ''){
		jBox.tip("联系人职务不能为空！", "messager",{ id:null,top:'55%' });
		$('#position').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
		$('#position').attr('class','false');
	}else {
		$('#position').attr('class','true');
		$('#position').css({'border-color':'','box-shadow':''}); 
	}
}

//传真or电话
function phoneCheck(obj){
	if(ysorNo == true){
		var phone = $('#'+obj).val();
		var reg = /^(\d{3,4})?(\-)?\d{7,8}$/;//
		if (reg.test(phone)) {
			$('#'+obj).attr('class','true');
			$('#'+obj).css({'border-color':'','box-shadow':''}); 
			return true;
		}else {
			jBox.tip('请输入正确的'+(obj == 'officephone' ? '办公电话' : '传真')+'！', 'messager',{ id:null,top:'55%' });
			//$('#'+obj).val('');
			$('#'+obj).attr('class','false');
			$('#'+obj).css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			return false;
		}
	}
}

//合同容量(MVA)
function ucontractVolumeCheck(){
	if(ysorNo == true){
		var ucontractVolume = $('#ucontractVolume').val();
		var reg = /^([1-9]\d{0,11}|0)(\.\d{1,4})?$/;
		if(reg.test(ucontractVolume)){
			$('#ucontractVolume').css({'border-color':'','box-shadow':''}); 
			$('#ucontractVolume').attr('class','true');
		}else {
			$('#ucontractVolume').attr('class','false');
			jBox.tip("请输入正确的合同容量(MVA)！", "messager",{ id:null,top:'70%' });
			$('#ucontractVolume').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
		}
	}
}


//运行容量(MVA)
function urunVolumeCheck(){
	if(ysorNo == true){
		var urunVolume = $('#urunVolume').val();
		var reg = /^([1-9]\d{0,11}|0)(\.\d{1,4})?$/;
		if(reg.test(urunVolume)){
			$('#urunVolume').css({'border-color':'','box-shadow':''}); 
			$('#urunVolume').attr('class','true');
		}else {
			$('#urunVolume').attr('class','false');
			jBox.tip("请输入正确的运行容量(MVA)！", "messager",{ id:null,top:'70%' });
			$('#urunVolume').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
		}
	}
}


//生效时间
function beginTimeCheck(){
	if(ysorNo == true){
		if($('#beginTime').val() == ''){
			//jBox.tip("生效时间不能为空！", "success",{ id:null,top:'70%' });
			//$('#beginTime').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			$('#beginTime').attr('class','false');
		}else {
			$('#beginTime').attr('class','true');
			//$('#beginTime').css({'border-color':'','box-shadow':''}); 
		}
	}
}

//失效时间
function endTimeCheck(){
	if(ysorNo == true){
		if($('#endTime').val() == ''){
			//jBox.tip("失效时间不能为空！", "success",{ id:null,top:'70%' });
			//$('#endTime').css({'border-color':'rgba(245,88,88,0.3)','box-shadow':'0 0 7px rgba(245,88,88,2)'}); 
			$('#endTime').attr('class','false');
		}else {
			$('#endTime').attr('class','true');
			//$('#endTime').css({'border-color':'','box-shadow':''}); 
		}
	}
}

/**
 * 新建participantid
 */
function initParticipantid(){
	participantid=getGuid();
	$("#participantid").val(participantid);
	
}




/**
 * 获取市场成员编码
 */
function getParticipantCode(){
	$.ajax({
		url :"/pmos/rest/regist/getParticipantCodeCons",
		type : "POST",
		async : false,
		dataType :"json",
		data:{
			"participantid":participantid
		},
		success : function(data){
			if(data.successful){
				var participantcode = data.resultValue;
				//设置类型
			$("#participantcode").val(participantcode);
			}
		},
		error:function (){
			top.$.messager.alert('消息', "获取市场成员编码失败！");
		}
	
});

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
			var baGuidList = data.baGuidList;
			//只读设置
			 for(var i=0;i<baGuidList.length;i++){ 
				 var guid=baGuidList[i].guid;
					   if(baGuidList[i].affixtype==31){
							var guid31=guid;
							var guidid = $(obj).parent();
							guidid.find('a').eq(1).unbind("click").bind("click",function(){ 
									delFile(guid31,obj,31); 
								});
							guidid.find('a').eq(1).attr('guid',guid31);
							guidid.find('a').eq(1).attr('affixtype',31);
							guidid.find('a').eq(2).bind("click",function(){ 
									downLoadFile(guid31,obj); 
									});
							guidid.find('a').eq(0).attr('style','display: none;text-decoration: underline;cursor: pointer;color:#4F81BD;');
							guidid.find('a').eq(1).attr('style','text-decoration: underline;cursor: pointer;color:#4F81BD;');
							guidid.find('a').eq(2).attr('style','text-decoration: underline;cursor: pointer;color:#4F81BD;');
							id31=true;
						}else if(baGuidList[i].affixtype==0){
							 var guid30=guid;
							 var guidid = $(obj).parent();
							guidid.find('a').eq(1).unbind("click").bind("click",function(){ 
									delFile(guid30,obj,0); 
								});
							guidid.find('a').eq(1).attr('guid',guid30);
							guidid.find('a').eq(1).attr('affixtype',0);
							guidid.find('a').eq(2).bind("click",function(){ 
									downLoadFile(guid30,obj); 
								});
							guidid.find('a').eq(0).attr('style','display: none;text-decoration: underline;cursor: pointer;color:#4F81BD;');
							guidid.find('a').eq(1).attr('style','text-decoration: underline;cursor: pointer;color:#4F81BD;');
							guidid.find('a').eq(2).attr('style','text-decoration: underline;cursor: pointer;color:#4F81BD;');
							id30=true;
					 }else if(baGuidList[i].affixtype==29){
						  var guid29=guid;
							 var guidid = $(obj).parent();
							guidid.find('a').eq(1).unbind("click").bind("click",function(){ 
									delFile(guid29,obj,29); 
								});
							guidid.find('a').eq(1).attr('guid',guid29);
							guidid.find('a').eq(1).attr('affixtype',29);
							guidid.find('a').eq(2).bind("click",function(){ 
									downLoadFile(guid29,obj); 
								});
							guidid.find('a').eq(0).attr('style','display: none;text-decoration: underline;cursor: pointer;color:#4F81BD;');
							guidid.find('a').eq(1).attr('style','text-decoration: underline;cursor: pointer;color:#4F81BD;');
							guidid.find('a').eq(2).attr('style','text-decoration: underline;cursor: pointer;color:#4F81BD;');
							id219=true;
					 }else if(baGuidList[i].affixtype==44){
						  var guid44=guid;
							 var guidid = $(obj).parent();
							guidid.find('a').eq(1).unbind("click").bind("click",function(){ 
									delFile(guid44,obj,44); 
								});
							guidid.find('a').eq(1).attr('guid',guid44);
							guidid.find('a').eq(1).attr('affixtype',44);
							guidid.find('a').eq(2).bind("click",function(){ 
									downLoadFile(guid44,obj); 
								});
							guidid.find('a').eq(0).attr('style','display: none;text-decoration: underline;cursor: pointer;color:#4F81BD;');
							guidid.find('a').eq(1).attr('style','text-decoration: underline;cursor: pointer;color:#4F81BD;');
							guidid.find('a').eq(2).attr('style','text-decoration: underline;cursor: pointer;color:#4F81BD;');
							id44=true;
					 }
			
			}
			$('#back').attr('flag','0');
		}
		
	
	});
}


/**
 * 附件查看---------1
 */
function addFiles(obj){
	ddataStatus = ddataStatus != null && ddataStatus != '' ? ddataStatus : '10';
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
		ajaxData : {consid:$('#consid').val(),dataStatus:ddataStatus,allStatus:false}, /*
						 * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
						 * "id=1"
						 */
		iframeScrolling : 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */
		title : '附件信息', /* 窗口的标题 */
		width : 1000, /* 窗口的宽度，值为'auto'或表示像素的整数 */
		height : 650, /* 窗口的高度，值为'auto'或表示像素的整数 */
		bottomText : '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */

		buttonsFocus : 0, /* 表示第几个按钮为默认按钮，索引从0开始 */
		loaded : function(h) {
			$(".jbox-content", top.document).css("overflow-y", "hidden");
		},
		 closed: function () {  /* 窗口关闭后执行的函数 */
			$(obj).parent().parent().attr("class",'true');
		}
	});
}



/**
 * 增加附件
 */
function addFile1(filetype,obj) {
	window.parent.parent.window.isFreshFlag="1";
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
		ajaxData : {consid:$("#sessionid").val(),filetype:filetype}, /*
						 * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
						 * "id=1"
						 */
		iframeScrolling : 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */
		title : '附件信息', /* 窗口的标题 */
		width : 500, /* 窗口的宽度，值为'auto'或表示像素的整数 */
		height : 300, /* 窗口的高度，值为'auto'或表示像素的整数 */
		bottomText : '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */

		buttonsFocus : 0, /* 表示第几个按钮为默认按钮，索引从0开始 */
		loaded : function(h) {
			$(".jbox-content", top.document).css("overflow-y", "hidden");
		},
		 closed: function () {  /* 窗口关闭后执行的函数 */
			if(window.parent.parent.window.isFreshFlag=='2'){
				// 模拟0.5秒后完成操作
				window.setTimeout(function () {jBox.tip('上传成功!', 'success',
					{ id:null,top:'75%' }); }, 500);
				if(ysorNo == false){
					param['effectiveData'] = $('#beginTime').val();
					param['expiryDate'] = $('#endTime').val();
					param['agencyEnergy'] = 0;
					param['status'] = '2';
					param['consid'] = $("#sessionid").val();
					param['parid'] = $("#participantId").val();
					$.post($('#ctx').val()+'/PowerConsumerView/pcview/bindEdit?checkcode='+$('#checkcode').val(),param,function(data) {
						if(data.message == 'success'){
							//jBox.tip('保存成功！', 'success');
							//$(obj).parent().parent().remove();
						}else{
							//jBox.tip('保存失败！', 'messager');
						}
					});
				}
				initFileGrid1(window.parent.parent.window.consid,obj);
            }
		}
	});
}

/**
 * 增加附件(二类用户自己的附件)
 */
function addFile2(filetype,obj) {
    debugger;
    window.parent.parent.window.isFreshFlag="1";
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
        ajaxData : {consid:$("#consid").val(),filetype:filetype}, /*
						 * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
						 * "id=1"
						 */
        iframeScrolling : 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */
        title : '附件信息', /* 窗口的标题 */
        width : 500, /* 窗口的宽度，值为'auto'或表示像素的整数 */
        height : 300, /* 窗口的高度，值为'auto'或表示像素的整数 */
        bottomText : '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */

        buttonsFocus : 0, /* 表示第几个按钮为默认按钮，索引从0开始 */
        loaded : function(h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        },
        closed: function () {  /* 窗口关闭后执行的函数 */
            if(window.parent.parent.window.isFreshFlag=='2'){
                // 模拟0.5秒后完成操作
                window.setTimeout(function () {jBox.tip('上传成功!', 'success',
                    { id:null,top:'75%' }); }, 500);
                if(ysorNo == false){
                    param['effectiveData'] = $('#beginTime').val();
                    param['expiryDate'] = $('#endTime').val();
                    param['agencyEnergy'] = 0;
                    param['status'] = '2';
                    param['consid'] = $("#sessionid").val();
                    param['parid'] = $("#participantId").val();
                    $.post($('#ctx').val()+'/PowerConsumerView/pcview/bindEdit?checkcode='+$('#checkcode').val(),param,function(data) {
                        if(data.message == 'success'){
                            //jBox.tip('保存成功！', 'success');
                            //$(obj).parent().parent().remove();
                        }else{
                            //jBox.tip('保存失败！', 'messager');
                        }
                    });
                }
                initFileGrid1(window.parent.parent.window.consid,obj);
                $('.addFile').attr('style','display: none;text-decoration: underline;cursor: pointer;color:#4F81BD;');
            }
        }
    });
}





/**
 * 删除附件
 * @param attid
 */
function delFile(guid,obj,affixtype) {
	var submit = function (v, h, f) {
        if (v == true){
            var url = $('#ctx').val()+"/PowerConsumerView/bindview/deleteFile?checkcode="+$('#checkcode').val();
			$.post(url, {guid : guid}, function(data) {
				if(data.sunccess){
					jBox.tip("删除成功！", "success",{ id:null,top:'75%' });
					LoadFile(obj,affixtype);
				}else{
					jBox.tip("删除失败！", "messager",{ id:null,top:'75%' });
				}
			});
        }else{
            
		}
        return true;
    };
    jBox.confirm("确定删除该条记录?", "确认窗口", submit, { id:'hahaha', top:'75%',showScrolling: false, buttons: { '确认': true, '取消': false } });
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
 * 下一步
 */
function next(){
	debugger;
	if(!saved){
		$.messager.alert('消息', "请先保存信息！");
		return false;
	}
	if(participanttype=="0"&&id30==false){
		$.messager.alert('消息', "请先上传附件全部信息！");
		return false;
	}else if(participanttype=="2"&&id10==false||
			participanttype=="2"&&id11==false||
			participanttype=="2"&&id123==false||
			participanttype=="2"&&id116==false||
			participanttype=="2"&&id110==false||
			participanttype=="2"&&id118==false)
			{
		$.messager.alert('消息', "请先上传附件全部信息！");
		return false;
	}
	
	else if(participanttype=="6"&&id21==false||participanttype=="6"&&id23==false
			||participanttype=="6"&&id20==false||participanttype=="6"&&id219==false
			||participanttype=="6"&&id220==false){
		
		$.messager.alert('消息', "请先上传附件全部信息！");
		return false;
	}else{
		//特殊情况 不做处理
	}
	//表单校验
	var isValidated = $('#form').form('validate'); 
	if (isValidated == false) {
		$.messager.alert('消息', "请先保存信息！");
		return false;
	}
	if(participanttype=="2"){
		//发电企业 注册发电组
		window.location.href = "registGeneratorInfo.jsp?participantid=" + participantid;
	}else if(participanttype=="0"){
		//用户 注册用电单元
		window.location.href = "registElectricUnitInfo.jsp?participantid=" + participantid;
	}
	else if(participanttype=="6"){
		window.location.href =  "registSaleCompany.jsp?participantid=" + participantid;
	}
	else{
		
	}
	 
}
/**
 * 附件删除后重新加载
 */
function LoadFile(obj,affixtype){
		if(affixtype == 31){
			id31=false;
		}else if(affixtype == 0){
			id30=false;
		}else if(affixtype == 29){
			id219=false;
		}else if(affixtype == 44){
			id44=false;
		}
		var guidid = $(obj).parent();
		guidid.find('a').eq(0).attr('style','text-decoration: underline;cursor: pointer;color:#4F81BD;');
		guidid.find('a').eq(1).attr('style','display: none;text-decoration: underline;cursor: pointer;color:#4F81BD;');
		guidid.find('a').eq(2).attr('style','display: none;text-decoration: underline;cursor: pointer;color:#4F81BD;');
}

/**
 * 附件查看
 */
function addFiles(status,obj){
	ddataStatus = $('#dataStatus',parent.document).val();
	ddataStatus = ddataStatus != null && ddataStatus != '' ? ddataStatus : 10;
	window.parent.window.isFreshFlag="1";
	var consid = $('#consid').val();
	var sessionid =  $('#sessionid').val();
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
		ajaxData : {status:status,consid:consid,sessionid:sessionid,dataStatus:ddataStatus,allStatus:false}, /*
						 * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
						 * "id=1"
						 */
		iframeScrolling : 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */
		title : '附件信息', /* 窗口的标题 */
		width : 1000, /* 窗口的宽度，值为'auto'或表示像素的整数 */
		height : 650, /* 窗口的高度，值为'auto'或表示像素的整数 */
		bottomText : '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */

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
 * 合同附件查看
 */
function addFiles1(status,obj){
	ddataStatus = $('#dataStatus',parent.document).val();
	ddataStatus = ddataStatus != null && ddataStatus != '' ? ddataStatus : 10;
	window.parent.window.isFreshFlag="1";
	var consid = $('#consid').val();
	var sessionid =  $('#sessionid').val();
	top.$.jBox('iframe:'+$('#ctx').val()+'/PowerConsumerView/bindview/UserFileUp1', {
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
		ajaxData : {status:status,consid:consid,sessionid:sessionid,dataStatus:ddataStatus}, /*
						 * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
						 * "id=1"
						 */
		iframeScrolling : 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */
		title : '附件信息', /* 窗口的标题 */
		width : 1000, /* 窗口的宽度，值为'auto'或表示像素的整数 */
		height : 650, /* 窗口的高度，值为'auto'或表示像素的整数 */
		bottomText : '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */

		buttonsFocus : 0, /* 表示第几个按钮为默认按钮，索引从0开始 */
		loaded : function(h) {
			$(".jbox-content", top.document).css("overflow-y", "hidden");
		},
		 closed: function () {  /* 窗口关闭后执行的函数 */
			$(obj).parent().parent().attr("class",'true');
			var url = $('#ctx').val()+'/PowerConsumerView/bindview/fileCount';
			$.post(url,{"status":0,"consid":consid,"sessionid":sessionid,"dataStatus":ddataStatus},function(data) {
				if(data.count < 1){
					id31 = false;
				}else{
					id31 = true;
				}
			});
		}
	});
}

/**
 * 附件预览
 * @param attid
 */
function showFile(guid,obj){
	$.ajax({
		url :"/pmos/rest/regist/getattid",
		type : "POST",
		async : false,
		dataType :"json",
		data:{
			"guid" : guid
		},
		success : function(data){
			if(data.successful){
				 attid = data.resultValue;
				//设置类型
			}
		},
		error:function (){
			$.messager.alert('消息', "获取guid失败！");
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
	//openPDF(attid,'');
	//window.open("../sbs/PDF.jsp?attid="+attid);
}

//查看审批信息
function upSubmit(){
	var consid = $('#consid',parent.document).val();
	var sign = $('#sign',parent.document).val();
	top.$.jBox('iframe:'+$('#ctx').val()+'/BaaddSaleCompanyView/bindview/regMarket', {
		top:'5%',
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
		ajaxData : {sign:sign,consid:consid}, /*
						 * 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或
						 * "id=1"
						 */
		iframeScrolling : 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */

		title : '变更电力用户', /* 窗口的标题 */
		width : 1100, /* 窗口的宽度，值为'auto'或表示像素的整数 */
		height : 700, /* 窗口的高度，值为'auto'或表示像素的整数 */
		//bottomText : '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */
		//buttonsFocus : 0, /* 表示第几个按钮为默认按钮，索引从0开始 */
		loaded : function(h) {
			$(".jbox-content", top.document).css("overflow-y", "hidden");
		},closed: function () {  /* 窗口关闭后执行的函数 */
			$.post($('#ctx').val()+'/PowerConsumerView/pcview/closeSessionGuid','',function(data) {
				//location.reload();
				return false;
			});
		}
	});
}




/**
 * 提交
 */
function submit(){
    $("#example-multiple option:selected").each(function () {
        selectValueStr.push($(this).val());
    });
    $('#position').val(selectValueStr);

		$(".true").each(function(){
			if($(this).val() == "" || $(this).val() == null){
				jBox.tip("请确认"+$(this).eq(0).parent().prev().text().replace(':','').replace('*','')+"不能为空！", "messager",{ id:null,top:'75%' });
				return false;
			}
		});
		if($(".true").length < 17){
			jBox.tip("请确认"+$(".false").eq(0).parent().prev().text().replace(':','').replace('*','')+"是否填写正确后再提交！", "messager",{ id:null,top:'75%' });
			return false;
		}
		if($('#geogrregionidId').val() == '' || $("#uindustrytype option:selected").val() == '' || $("#uvoltageLevel option:selected").val() == ''){
			if($('#geogrregionidId').val() == ''){
				jBox.tip("地理区域不能为空！", "messager",{ id:null,top:'75%' });
				return false;
			}else if($("#uindustrytype option:selected").val() == ''){
				jBox.tip("行业类别不能为空！", "messager",{ id:null,top:'75%' });
				return false;
			}else if($("#uvoltageLevel option:selected").val() == ''){
				jBox.tip("最高供电电压不能为空！", "messager",{ id:null,top:'75%' });
				return false;
			}else if($("#example-multiple option:selected").val() == ''){
				jBox.tip("联系人职务不能为空！", "messager",{ id:null,top:'75%' });
				return false;
			}
			
		}

		if( $('#position').val().trim() == ''){
			jBox.tip("联系人职务不能为空！", "messager",{ id:null,top:'75%' });
			return false;
		}

		if($(".null").length > 0){
			jBox.tip("请确认所有信息已填写正确！", "messager",{ id:null,top:'75%' });
			return false;
		}
		if(id31==false){
			jBox.tip("请上传购售电合同附件！", "messager",{ id:null,top:'75%' });
			return false;
		}
		if(id30==false){
			jBox.tip("请上传工商营业执照附件！", "messager",{ id:null,top:'75%' });
			return false;
		} 
		if(id219==false){
			jBox.tip("请上传信用承诺书附件！", "messager",{ id:null,top:'75%' });
			return false;
		} 
		if(id44==false){
			jBox.tip("请上传电费发票核查联附件！", "messager",{ id:null,top:'75%' });
			return false;
		} 
		//保存信息路径
		var url =  $('#ctx').val()+'/BaaddSaleCompanyView/bindview/saveSubmitUp?message='+$('#message').val()+'&ddataStatus='+$('#dataStatus',parent.document).val()+'&checkcode='+$('#checkcode').val();

		var date = $("#form").serialize();
		$.post(url,date,function(data) {
			if(data.message == 0){
				jBox.tip(data.mess, "success",{ id:null,top:'75%' });
			}else if(data.message == 1){
				//当保存电力用户成功后给标志，可以保存用电单元
				$("#considq", parent.document).val($('#participantid').val());
                $("#flag", parent.document).val(false);
				jBox.tip(data.mess, "success",{ id:null,top:'75%' });
				$('#message').val('1');
				window.parent.window.status="2";
				subProcees($('#activityInstId').val());
			}else if(data.message == 3){
				jBox.tip(data.messager, "messager",{ id:null,top:'75%' });
			}else{
				jBox.tip("用户已存在！", "messager",{ id:null,top:'75%' });
			}
			
		});
}



		function _startFlow(participantname) {//participantname
            var scope = this;
            var leverList = "";
            $.ajax({
                url: $('#ctx').val() + "/dljyzx/flow/getFlowInfo?status=1",
                type: "post",
                async: false,
                success: function (data) {
                    if (!data.count > 0) {
                        return;
                    } else {
                        var gdj = $('input[name=gdj]').val();
                        var rcCount = data.count;
                        // $.ajax({
                        //     url: $('#ctx').val() + "/dljyzx/flow/gdjcj",
                        //     async: false,
                        //     data: {
                        //         gdj: gdj
                        //     },
                        //     type: "post",
                        //     dataType: "json",
                        //     success: function (msg) {
                        //         if (msg.length > 0) {
                        //             leverList = msg;
                        //         }
                        //     }
                        // });
                        if (rcCount == 0) {
                            top.jBox.alert('消息', "请先定义一个外网侧的流程");
                            return;
                        } else if (rcCount != 1) {
                            top.jBox.alert('消息', "外网侧的流程只能定义一个!");
                            return;
                        } else {
                            _getFlowNodeInfo(data,participantname)
                        }
                    }
                }

            });
        }
		
		function _getFlowNodeInfo(data,participantname) {
            var ctx = top.ctx;
            var scope = this;
            $.ajax({
                url: ctx + "/dljyzx/flow/getFlowNodeInfo",
                type: "post",
                data: {
                    flowid: data.flowid
                },
                async: false,
                success: function (v) {
                    if (!v.result) {
                        top.jBox.info('消息', "请先配置下一个流程节点");
                        return;
                    } else if (!v.jsname) {
                        top.jBox.info('消息', "请先配置下一个节点接收人！");
                        return;
                    } else {
                        _initTree(data, participantname);
                    }

                }
            });
        }

		
		function _initTree(getFlowInfo,participantname) {
            var scope = this;
            var ctx = $('#ctx').val();
            var url = "/dljyzx/flow/choosePerson";
            var participantCode = $("#participantCode").val();
            var flowid = getFlowInfo.flowid;
            var flowName = getFlowInfo.flowname;
            var flowInstName = flowName + "_" + participantname;
            // var level1 = leverList[0][2];
            var level1 = '95412001'
            // var level2 = leverList[0][3];
            var level2 = ''
            // var level3 = leverList[0][4];
            var level3 = ''
            var participantId = $('input[name=participantId]').val();
            top.$.jBox.open("iframe:" + $("#ctx").val() + "/tag/treeProcess?url=" + encodeURIComponent(url)
                + "&flowNodeInstId=" + participantCode + "&flowid=" + flowid, "人员信息", 300, 420, {
                buttons: {"确定": "ok", "关闭": true},
                submit: function (v, h, f) {
                    if (v == "ok") {
                        var tree = h.find("iframe")[0].contentWindow.tree;
                        var ids = [], names = [], nodes = [];
                        nodes = tree.getSelectedNodes();
                        for (var i = 0; i < nodes.length; i++) {
                            if (nodes[i].isParent) {
                                continue; // 如果为复选框选择，则过滤掉父节点
                            }
                            if (nodes[i].level == 0) {
                                top.$.jBox.info("不能选择根节点（" + nodes[i].name + "）请重新选择。");
                                return false;
                            }
                            if (nodes[i].isParent) {
                                top.$.jBox.info("不能选择父节点（" + nodes[i].name + "）请重新选择。");
                                return false;
                            }
                            if (nodes[i].module == "") {
                                top.$.jBox.info("不能选择公共模型（" + nodes[i].name + "）请重新选择。");
                                return false;
                            }
                            ids.push(nodes[i].id);
                            names.push(nodes[i].name);
                            break; // 如果为非复选框选择，则返回第一个选择  </c:if>
                        }
                        if (ids.length <= 0) {
                            top.$.jBox.alert('请选择下一个节点接收人！', "消息");
                            return false;
                        }
                        $.ajax({
                            url: $("#ctx").val() + "/dljyzx/flow/sendMarketPartFlow?checkcode="+$("#checkcode").val(),
                            type: "post",
                            data: {
                                flowid: flowid,
                                flowName: flowName,
                                flowInstName: flowInstName,
                                participantId: $('#consid',parent.document).val(),
                                level1: level1,
                                level2: level2,
                                level3: level3,
                                userIds: ids.toString(),
                            },
                            async: false,
                            success: function (v) {
                                if (v && v == 'success') {
									var consid = $('#consid',parent.document).val();
									var sign = $('#sign',parent.document).val();
                                    top.$.jBox.tip('提交成功');
                                    window.location.href = +$('#ctx').val()+'/BaaddSaleCompanyView/bindview/regMarket?consid='+consid+'&sign='+sign;
                                } else {
                                    top.$.jBox.error('提交失败');
                                }

                            }
                        });
                    }
                    else if (v == "clear") {
                    }
                },
                loaded: function (h) {
                    $(".jbox-content", top.document).css("overflow-y", "hidden");
                }
            });
        }
//重新提交流程
    function subProcees(activityInstId) {
        $.ajax({
            url: $("#ctx").val() + '/dljyzx/bacommonflowinfo/next',
            type: "post",
            async: false,
            dataType: "json",
            data: {
                activityInstId: activityInstId
            },
            success: function (data) {
                if (data.msg == 'successful') {
                    var treeUrl = '/dljyzx/baWaitdo/getRoot';
                    top.$.jBox.open("iframe:" + $("#ctx").val() + "/tag/treeProcess?url=" + encodeURIComponent(treeUrl)
                        + "&flowNodeInstId=" + activityInstId, "选择人员", 300, 420, {
                        buttons: {"确定": "ok", "关闭": true},
                        submit: function (v, h, f) {
                            if (v == "ok") {
                                var tree = h.find("iframe")[0].contentWindow.tree;
                                var ids = [], names = [], nodes = [];
                                nodes = tree.getSelectedNodes();
                                for (var i = 0; i < nodes.length; i++) {
                                    if (nodes[i].isParent) {
                                        continue; // 如果为复选框选择，则过滤掉父节点
                                    }
                                    if (nodes[i].level == 0) {
                                        top.$.jBox.info("不能选择根节点（" + nodes[i].name + "）请重新选择。");
                                        return false;
                                    }
                                    if (nodes[i].isParent) {
                                        top.$.jBox.info("不能选择父节点（" + nodes[i].name + "）请重新选择。");
                                        return false;
                                    }
                                    if (nodes[i].module == "") {
                                        top.$.jBox.info("不能选择公共模型（" + nodes[i].name + "）请重新选择。");
                                        return false;
                                    }
                                    ids.push(nodes[i].id);
                                    names.push(nodes[i].name);
                                    break;
                                }
                                flowProcess(ids, 1, 1);
                                // top.jBox.close(true);
                                // top.jBox.success('审核通过');
                            }
                            else if (v == "clear") {

                            }
                        },
                        loaded: function (h) {
                            $(".jbox-content", top.document).css("overflow-y", "hidden");
                        },
                        closed: function () {
                            // top.jBox.close(true);
                        }
                    });
                    //最后节点
                }
            },
            error: function () {
            }
        });
    }
	
	
	function flowProcess(ids, returnVal, outcome) {
            var activityInstId = $('#activityInstId').val();//流程实例id
            var businessid = $('#businessid').val();//业务ID
            // var textarea = $('.istextarea').val();//审批意见
            $.ajax({
                url: $("#ctx").val() + "/dljyzx/flow/tasksSave?checkcode="+$("#checkcode").val(),
                type: "post",
                async: false,
                dataType: "json",
                data: {
                    flowNodeInstId: activityInstId,
                    businessID: businessid,
                    direction: returnVal,
                    workitemId: activityInstId,
                    outcome: outcome,
                    ids: ids.toString(),
                    workitem: "",
                    flag: 'flag'
                },
                success: function (data) {
                    if (data.msg && data.msg == 'success') {
                        top.$.jBox.tip('提交成功');
                        window.location.href = $('#ctx').val()+'/BaaddSaleCompanyView/bindview/regMarket?consid='+$('#consid').val()+'&sign='+$('#sign').val();
                    } else {
                        top.$.jBox.error('提交失败');
                    }
                },
                error: function () {

                }

            });
        }
	
/**已绑用户时间修改*/
function savedatefunction(){
	if($('#beginTime').val() == '' || $('#endTime').val() == ''){
		jBox.tip("时间不能为空！", "messager",{ id:null,top:'75%' });
		return;
	}
	param['beginTime'] = $('#beginTime').val();
	param['endTime'] = $('#endTime').val();
	param['relationId'] = $('#loadId',parent.document).val();
	param['parid'] = $('#participantid').val();
	param['effectiveData'] = $('#beginTime').val();
	param['expiryDate'] = $('#endTime').val();
	param['dateStart'] = 0;
	//查询该用户在该时间段内是否存在与其他售电公司绑定关系
		$.post($('#ctx').val()+'/PowerConsumerView/pcview/checkBindEdit1',param,function(data) {
			jBox.tip("Loading...", 'loading',{ id:null,top:'75%' });
			var message = data.message;
			var start = data.start;
			if(start == "message"){
				 // 模拟2秒后完成操作
				jBox.tip(message, 'messager',{ id:null,top:'75%' });
				return;
			}else{
				param['agencyEnergy'] = '';
				param['status'] = '2';
				$.post($('#ctx').val()+'/PowerConsumerView/pcview/updatebd?'+'checkcode='+$('#checkcode').val(),param,function(data) {
					if(data.message == 0){
						jBox.tip("修改成功！", "messager",{ id:null,top:'75%' });
						window.setTimeout(function () {
							parent.parent.$.jBox.close();
						},2000);
					}else{
						jBox.tip("修改失败！", "messager",{ id:null,top:'75%' });
					}
				});
			}
		});
}


/**
 *删除
 */
function back(){
if($('#back').attr('flag') == '0'){
	var beginTime=$('#beginTime').val();
	var endTime=$('#endTime').val();
	var submit = function (v, h, f) {
		if (v == true){
			var url = $('#ctx').val()+"/BaaddSaleCompanyView/bindview/back?"+'checkcode='+$('#checkcode').val();
			$.post(url, {beginTime:beginTime,endTime:endTime}, function(data) {
				if(data.sunccess){
					$("#considq", parent.document).val('');
					$('#back').attr('flag','1');
				$('.delete').each(function(){
					var url = $('#ctx').val()+"/PowerConsumerView/bindview/deleteFile?"+'checkcode='+$('#checkcode').val();
					$.post(url, {guid : $(this).attr('guid')}, function(data) {
						if(data.sunccess){
							if($(this).attr('affixtype') == 31){
								id31=false;
							}else if($(this).attr('affixtype') == 0){
								id30=false;
							}else if($(this).attr('affixtype') == 0){
								id219=false;
							}
						}else{
							jBox.tip("删除失败！", "messager",{ id:null,top:'75%' });
						}
					});
					var guidid = $(this).parent();
					guidid.find('a').eq(0).attr('style','text-decoration: underline;cursor: pointer;color:#4F81BD;');
					guidid.find('a').eq(1).attr('style','display: none;text-decoration: underline;cursor: pointer;color:#4F81BD;');
					guidid.find('a').eq(2).attr('style','display: none;text-decoration: underline;cursor: pointer;color:#4F81BD;');
				})
					if(submitFlag == 1){
						$('#submit').attr('flag','0');
					}else{
						$('#submit').attr('flag','1');
					}
					$('input.false').val('');
					$('input.true').val('');
					$('input.true').attr('class','false');
					$('input.null').val('');
					$('input.null').attr('class','');
					$('#submit').attr('class','btn-primary');
					$('#back').attr('class','btn-primary-disabled');
					jBox.tip("删除成功！", "success",{ id:null,top:'75%' });
					window.setTimeout(function () {
						parent.parent.$.jBox.close();
					},2000);
				}else{
					jBox.tip("删除失败！", "messager",{ id:null,top:'75%' });
					return;
				}
			});
		}else{
			
		}
		return true;
	};
	jBox.confirm("将删除本次申请，是否继续？", "确认窗口", submit, { id:null, top:'75%',showScrolling: false, buttons: { '是': true, '否': false } });

}
	
}