var participantType = "";
var len = "";
var marketid = "";
var marketname = "";
var partid = ""
var username="";
var account="";
var password="";
var Rpassword="";
var idcard="";
var userid="";
var i = "";
var number=0;
var flags="";
var show="";
var arr = [];
var isHavePrivateId = false;
var isHaveAccount = false;
function mload() {
	localStorage.setItem("reloadDgyPage","success");
	naver();
	initParam();// 获取participantid
	initButton();
	// 进度条控制
	initspaner();
	initinput();
	var participantid  = $("#participantid0").val();
	findPeople(participantid);
	
	$.post("queryRelationList?participantid="+participantid, function (data) {
        var relationHtml = '';
        if (data && data.length > 0) {
        	for (var i = 0; i < data.length; i++) {
				if (data[i].iscommon==1) {
					isHaveAccount = true;
				}
			}
        }
    })
	
	$("#password1").focus();
}

$.extend($.fn.validatebox.defaults.rules, {
	loginName : {
		validator : function(value, param) {
			if (value == "" || value == "  登录名") {
				this.message = "登录名不能为空";
				return false;
			}

			if (!/^([a-zA-Z0-9_]{6,20})+$/.test(value)) {
				this.message = "登录账号由字母、数字组成，长度6-20位";
				return false;
			}

			var flag = true;
			/*// 验证登录名是否在BA_APPLY_USER表中存在
			$.ajax({
				url : "findLoginName",
				type : "POST",
				dataType : "json",
				async : false,
				data : {
					"loginName" : loginName
				},
				success : function(data) {
					if (data) {
						if (data.flag == "error") {
							top.$.jBox.alert("登录名已经存在","消息","info");
							isShow("input1false", "input1true", false);
							flag = false;
						} else {
							isShow("input1true", "input1false", false);
							document.getElementById("msg-error01").innerText = "";
							flag = true;
						}
					}
				},
				error : function(event, request, settings) {
					top.$.messager.alert('消息', '操作失败!');
				}
			});*/
			if (flag == true) {
				return true;
			}
			if (flag == false) {
				this.message = "登录名已经存在";
				return false;

			}
		}
	},

	pwd : {
		validator : function(value, param) {
			var str = value;
			if (str.length < 8 || str.length > 20) {
				this.message = "密码位数8到20";
				return false;
			}
			var re = new RegExp("[a-zA-Z]");
			var len = re.test(str);
			if (len) {
				re = new RegExp("[0-9]");
				len = re.test(str);
				if (len) {
					re = new RegExp("((?=[\x21-\x7e]+)[^A-Za-z0-9])");
					len = re.test(str);
					if (len) {
						return true;
					}
				}
			}
			this.message = "密码应由特殊字符、数字及字母组成";
			return false;
		}
	},
	   equals: {    
	        validator: function(value,param){  
	        	var str=$('#password' + param).val();
	        	if(str!=value){
	        		this.message = "密码不一致";
					return false;
	        	}
	        	return true;
	        }   
	        //message: '密码不一致'   
	    },
	idCard : {
		validator : function(value, param) {
			if (!/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(value)) {
				this.message = "请输入18位身份证号";
				return false;
			}
			return true;
		}
	},
	account : {
		validator : function(value, param) {
			if (value == "  用户名" || value == "") {
				this.message = "用户名不能为空";
				return false;
			}
			if (!/^[\s\S]{0,33}$/.test(value)) {
				this.message = "用户名字数不能超过33";
				return false;
			}
			return true;
		}
	},
});
/**
 * 获取 地址栏传过来的参数participantid
 */
function initParam() {
	var Params = window.location.search;
	var participantid = "";
	if (localStorage.getItem("participantId")) {
		participantid = localStorage.getItem("participantId");
	}
	$("#participantid0").val(participantid);
	if (Params != null && Params.length > 0) {
		var ppp = Params.split("&");
		
		for (i = 0; i < ppp.length; i++) {
			// 市场成员类型
			/*if (ppp[i].indexOf("participantId") != -1) {
				participantid = ppp[i].substring(ppp[i]
						.indexOf("participantId") + 14, ppp[i].length);
			}*/
			
			if (ppp[i].indexOf("show") != -1) {
				show = ppp[i].substring(ppp[i]
						.indexOf("show") + 5, ppp[i].length);
			}
		}
		// 设置隐藏框 市场成员id 市场成员类型
		

	}

}
function naver(){
	window.location.hash="#biaoti";
}
/**
 *完成   type=1 保存
 *type=2 完成
 */
function over() {
	var password=document.getElementById("password0").value;
	var loginName=document.getElementById("loginName0").value;
	var loginNameReverse = "";
    for (var i = loginName.length; i > 0 ; i--) {
    	loginNameReverse += loginName.charAt(i-1);
	}
	if (password.indexOf(loginName)>-1||password.indexOf(loginNameReverse)>-1) {
		top.$.jBox.alert("密码中不能包含登录名称!","消息");
		$("#password0").val("");
		$("#password0").attr("readonly","readonly");	
		setTimeout(function() {
			$("#password0").removeAttr("readonly");	
		},500);
		return;
	}
	
	/*$.ajax({
		url : "isPrivateCodeVali",
		type : "post",
		async : false,
		data :{"privateId":document.getElementById("paivateidentiyid0").value},
		success : function(data) {
			if(data && data.privateidentityidCount > 0){
				isHavePrivateId = true;
			}
			}
		
	})*/
	/*if (isHavePrivateId) {
		isHavePrivateId = false;
		top.$.jBox.alert("身份证已经存在请重新输入!","消息");
		$("#paivateidentiyid0").val("");
		$("#password0").attr("readonly","readonly");	
		$("#paivateidentiyid0").attr("readonly","readonly");	
		setTimeout(function() {
			$("#password0").removeAttr("readonly");	
			$("#paivateidentiyid0").removeAttr("readonly");	
		},500);
		return;
	}*/
	// 进行表单验证
	// $('#loginName' + 0 ).validatebox({ required : false});
	if (!localStorage.getItem("pageCodeSuccess")) {
		var isValidated = $('#form').form('validate'); 
		if (isValidated == false) {
			return;
		}
		top.$.jBox("iframe:" + "registPageCodeValid", {
			id : "pageCode",
			width : 700,
			height :260,
			iframeScrolling : 'no',
			buttons : {},
			closed : function() {
				if (localStorage.getItem("pageCodeSuccess")) {
					ISCinterface();
				}
			},
		    loaded: function (h) {
		        $(".jbox-content", top.document).css("overflow-y", "hidden");
		    }
			
		});
	}else {
		top.$.jBox.alert("您已经保存过数据!",'消息');
		flags = 1;
	}
	
		/*ISCinterface();	*/
}
/**
 * 调用接口
 */

function ISCinterface(){
	var cardFlag = false;
	var participantid  = $("#participantid0").val();
	var loginName=document.getElementById("loginName0").value;
	var accountName=document.getElementById("accountName0").value;
	var paivateidentiyid=document.getElementById("paivateidentiyid0").value;
	var paivateidentiyid1=document.getElementById("paivateidentiyid1").value;
	if (paivateidentiyid.length == 0) {
		cardFlag = true;
		paivateidentiyid = paivateidentiyid1;
		localStorage.setItem("cardFlag","true");
	}
	var password=document.getElementById("password0").value;
	$.ajax({
		url : "iscInterface",
		type : "post",
		async : false,
		data :{"loginName":loginName,
				"accountName":accountName,
				"paivateidentiyid":paivateidentiyid,
				"password":password,
				"participantid":participantid,
				"participantType":6,
				"cardFlag":cardFlag
		},
		success : function(data) {
			if (data.message) {
				top.$.jBox.alert(data.message,'消息');
				localStorage.removeItem("pageCodeSuccess");
			}else {
				top.$.jBox.alert("保存成功!",'消息');
				flags = 1;
			}
		},
		error : function(event, request, settings) {
			top.$.jBox.alert("接口错误!",'消息');
		}
		
	})
}

/*function ISCinterface() {
	var scuess = false;
	var isequal=false;
	var arr = new Array();
	var narr=arr.sort();
	for(var s=0;s<i;s++){
		var loginNames = document.getElementById("loginName" + s + "").value;
		arr.push(loginNames);
	}
	for(var k=0;k<arr.length-1;k++){
		if(narr[k]==narr[k+1]){
			 isequal=true;
			 alert("登录名重复!");
			 return;
		}
	}
	
	for (j = 0; j < i; j++) {
		var marketname="江苏";
		var marketid = document.getElementById("marketid" + j + "").value;
		var loginName = document.getElementById("loginName" + j + "").value;
		var accountName = document.getElementById("accountName" + j + "").value;
		var paivateidentiyid = document.getElementById("paivateidentiyid" + j
				+ "").value;
		var password = document.getElementById("password" + j + "").value;
		var partid = document.getElementById("participantid" + j + "").value;
		
		*//**
		 * 判断这些值得有没有userid，有的话。不提交。没的再次提交
		 * 
		 *//*
		$.ajax({
			url : "Userid",
			type : "post",
			async : false,
			data : {
				"participantid" : partid
			},
			success : function(data) {
				if (data) {
					if (data.result == "YES") {
						// 已经存在不进行操作
						scuess = true;
						number=++number;
					} else {
						// 进行保存
						$.ajax({
							url : "iscInterface",
							type : "post",
							async : false,
							data : {
								"loginName" : loginName,
								"accountName" : accountName,
								"paivateidentiyid" : paivateidentiyid,
								"password" : password,
								"participantid" : partid,
								"participantType" : "6",
								"marketid" : marketid

							},
							success : function(data) {
								if(data.pwd=="no"){
									top.$.jBox.alert('消息', "请输入正确的密码格式！");
									scuess = false;
									return ;
								}
								if(data.check=="no"){
									top.$.jBox.alert('消息', "该市场成员已经存在用户！");
									scuess = false;
									return ;
								}
								if (data.userId != ""
										&& data.userId != undefined
										&& data.userId != null) {
									scuess = true;
									number=++number;
									read();
								} else {
									if(data.errorValue!=null&&data.errorValue!=""
										&&data.errorValue!=undefined){
										alert("由于"+data.errorValue+","+marketname+"账号未成功创建，请重新填写!");
									}else{
										alert("由于统一权限接口调用失败,"+marketname+"账号未成功创建，请重新填写!");
									}
									scuess = false;
									window.location.reload(); 
								}
							},
							error : function(event, request, settings) {
								top.$.jBox.alert('消息', '调用isc接口失败!');
							}

						})
						
					}

				}
			},
			error : function(event, request, settings) {
				top.$.jBox.alert('消息', '保存失败!');
			}

		})
		if(scuess == false){
			return;
		}

	}
	if (scuess == true) {
			top.$.jBox.alert('消息', '保存成功!');
	}
	if(number==i){
		flags="1";
	}
}*/

/**
 * 用户保存失败时，成功的只读
 */
function read() {
	document.getElementById("loginName" + j + "").readOnly = true;
	$("#loginName" + j + "").css('background-color', '#f2f2f2');
	 $('#loginName' + j ).validatebox({ required : false});
	document.getElementById("accountName" + j + "").readOnly = true;
	$("#accountName" + j + "").css('background-color', '#f2f2f2');
	$('#accountName' + j).validatebox({ required : false});
	document.getElementById("password" + j + "").readOnly = true;
	$("#pwd" + j + "").css('background-color', '#f2f2f2');
	$("#password" + j + "").css('background-color', '#f2f2f2');
	$('#password' + j ).validatebox({ required : false});
	document.getElementById("Rpassword" + j + "").readOnly = true;
	$("#Rpwd" + j + "").css('background-color', '#f2f2f2');
	$("#Rpassword" + j + "").css('background-color', '#f2f2f2');
	$('#Rpassword' + j ).validatebox({ required : false});
	document.getElementById("paivateidentiyid" + j + "").readOnly = true;
	$("#paivateidentiyid" + j + "").css('background-color', '#f2f2f2');
	$('#paivateidentiyid' + j).validatebox({ required : false});
	document.getElementById("Rxs"+j).style.display="none";
	 document.getElementById("Ryc"+j).style.display="none";
	 document.getElementById("yc"+j).style.display="none";
	 document.getElementById("xs"+j).style.display="none";
}
/**
 * 删除注册的用户
 */
function delectUser() {
	$.ajax({
		url : "/pmos/rest/regist/delectUser",
		type : "post",
		async : false,
		data : {
			"participantid" : participantid
		},
		success : function(data) {

		},
		error : function(event, request, settings) {
			top.$.jBox.alert('消息', '删除用户失败!');
		}

	})

}
/**
 * 完成和下一步的选择，进行对应的隐藏
 */
function initButton() {
	if (show == "show") {
		$("#title").css('display','none');
	}
}

function findPeople(participantid) {
	$.ajax({
		url :  "peopleInfo",
		type : "post",
		dataType : "json",
		async:"false",
		data : {
			"participantid":participantid,
		},
		success : function(rc) {
			if (rc) {
					for (var i = 0; i < rc.length; i++) {
						arr.push(rc[i][6]);
					}
					
			}
		}
	});
	return arr;
}


/**
 * 完成注册
 */
function over2() {
	if(flags!="1"){
		top.$.jBox.alert('请保存用户全部信息后进行提交!','消息');
		return;
	}
	var participantid  = $("#participantid0").val();
	
	var isHaveSeller = $("#sellType").val();
	
	if (!isHaveAccount) {
		top.$.jBox.alert( "必须有一个常用的企业联系人！",'消息');
		return;
	}
	
	if (isHaveSeller=="01") {
		if (arr.length<20) {
			top.$.jBox.alert( "有配网运营权的售电公司从业人员必须为20人以上！",'消息');
			return;
		}
	}else {
		if (arr.length<10) {
			top.$.jBox.alert("无配网运营权的售电公司从业人员必须为10人以上！",'消息' );
			return;
		}
	}
	var highCount = 0;
	var middleCount = 0;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i]=="高级") {
			highCount++;
		}else if (arr[i]=="中级") {
			middleCount++;
		}
	}
	
	if (isHaveSeller=="01") {
		var temp = 0;
		if (highCount>=2) {
			temp = 7 - highCount;
			if (temp>middleCount) {
				top.$.jBox.alert("有配网运营权的售电公司从业人员应至少包含2个高级职称、5个中级职称！",'消息' );
				return;
			}
		}else {
			top.$.jBox.alert("有配网运营权的售电公司从业人员应至少包含2个高级职称、5个中级职称！",'消息' );
			return;
		}
	}else {
		var temp = 0;
		if (highCount>=1) {
			temp = 4 - highCount;
			if (temp>middleCount) {
				top.$.jBox.alert("无配网运营权的售电公司从业人员应至少包含1个高级职称、3个中级职称！",'消息' );
				return;
			}
		}else {
			top.$.jBox.alert("无配网运营权的售电公司从业人员应至少包含1个高级职称、3个中级职称！",'消息' );
			return;
		}
	}
	
	/**
	 * 查看从业人员信息情况
	 *//*
	var flags1=true;
	
	
	
	
	*//**
	 * 无配网还是有配网
	 *//*
	var sell="";*/
	/*$.ajax({
		url :"/pmos/rest/regist/getIsSell",
		type : "POST",
		async : false,
		dataType :"json",
		data:{
		},
		success : function(data){
			if(data.successful){
				 sell = data.resultValue;
				//设置类型
			}
		},
		error:function (){
			top.$.jBox.alert("附件列表查询失败！",'消息' );
		}
	
});
	
	$.ajax({
		url :"/pmos/rest/regist/loadpeoplecount",
		type : "POST",
		async : false,
		dataType :"json",
		data:{
			"participantid" : participantid
		},
		success : function(data){ 
			// 只读设置
			var countall=parseInt(data.resultValue.items[0].countall);
			var countgao=parseInt(data.resultValue.items[0].countgao);
			var countzhong=parseInt(data.resultValue.items[0].countzhong);
			var selltypes=parseInt(data.resultValue.items[0].selltypes);
			if(selltypes=="2"){
				if(countall<10){
					top.$.jBox.alert('消息', "无配网运营权的售电公司从业人员必须为10人以上！");
					flags1=false;
					return false;
				}
				if(countgao<1||countzhong+countgao<4){
					top.$.jBox.alert('消息', "无配网运营权的售电公司从业人员应至少包含1个高级职称、3个中级职称！");
					flags1=false;
					return false;
				}
			}
			if(selltypes=="1"){
				if(countall<20){
					top.$.jBox.alert('消息', "有配网运营权的售电公司从业人员必须为20人以上！");
					flags1=false;
					return false;
				}
				if(countgao<2||countzhong+countgao<7){
					top.$.jBox.alert('消息', "有配网运营权的售电公司从业人员应至少包含2个高级职称、5个中级职称！");
					flags1=false;
					return false;
				}
			}
		},
	
});
	if(flags1==false){
		return;
	}
	*//**
	 * 验证附件是否全部已经上传
	 *//*
	var sell2="";
	$.ajax({
		url :"/pmos/rest/regist/getfileIsNull",
		type : "POST",
		async : false,
		dataType :"json",
		data:{
		},
		success : function(data){
			if(data.successful){
				 sell2 = data.resultValue;
				//设置类型
			}
		},
		error:function (){
			top.$.jBox.alert('消息', "附件列表查询失败！");
		}
	
});*/
	/*if(sell2!="1"){
		top.$.jBox.alert('消息', "请上传全部附件再进行提交！");
		return
	}*/
	/**
	 * 提价改变状态
	 */
	$.ajax({
		url : "registFinsh",
		type : "POST",
		dataType : "json",
		data : {
			"participantid":participantid
		},
		success : function(data) {
			if (data.flag=="success") {
				localStorage.removeItem("cardFlag");
				top.$.jBox.alert("您的注册申请已提交，请等待交易中心审批，您可登录系统查看已提交的信息和审批状态！",
						'提示');
				setTimeout(function() {
                	window.location.href="../";								
				},2000);
			}
		},
		error : function() {
			$.messager.alert('消息', "注册失败！");
		}
	});

}
/**
 * 进度条控制
 */

function initspaner() {
	if (participantType == "0") {
		document.getElementById("title").style.backgroundImage = "url(../images/registTitle/dlyh1.png)";
	} else if (participantType == "2") {
		document.getElementById("title").style.backgroundImage = "url(../images/registTitle/fdqy1.png)";
	} else if (participantType == "6") {
		document.getElementById("title").style.backgroundImage = "url(../images/registTitle/sdgs3.png)";
	} else {
		// 特殊情况 不做处理
	}
}
/**
 * 加载经营范围以及注册用户信息框
 */
function initinput() {
	var participantId = "";
	if (localStorage.getItem("participantId")) {
		participantId = localStorage.getItem("participantId");
	}
	
	$.ajax({
				url : "loadjyfw",
				type : "POST",
				dataType : "json",
				data : {
					"participantId":participantId
				},
				success : function(rc) {
					if (rc) {
						$("input").attr("readonly","readonly");
						$("#loginName0").val(rc.account);       
						$("#accountName0").val(rc.userName);     
						if (localStorage.getItem("cardFlag")) {
							$("#paivateidentiyid1").val(rc.privateidentityid);  
						}else {
							$("#paivateidentiyid0").val(rc.privateidentityid);  
						}
						$("#password0").val(rc.defaultPwd); 
						$("#Rpassword0").val(rc.defaultPwd);         
					}
				},
				error : function() {
					$.messager.alert('消息', "查询经营范围失败！");
				}
			});

}
/**
 * 点击隐藏密码时候变换成显示密码
 */
function yc(i){
	 document.getElementById("yc"+i).style.display="none";
	 document.getElementById("xs"+i).style.display="";
	 //$(this)[0].type = "text";
	 $("#password" + i+ "")[0].type="text";
}
function xs(i){
	 document.getElementById("xs"+i).style.display="none";
	 document.getElementById("yc"+i).style.display="";
	 $("#password" + i+ "")[0].type="password";
}
function Ryc(i){
	 document.getElementById("Ryc"+i).style.display="none";
	 document.getElementById("Rxs"+i).style.display="";
	 //$(this)[0].type = "text";
	 $("#Rpassword" + i+ "")[0].type="text";
}
function Rxs(i){
	 document.getElementById("Rxs"+i).style.display="none";
	 document.getElementById("Ryc"+i).style.display="";
	 $("#Rpassword" + i+ "")[0].type="password";
}


function  goBack(){
	history.go(-1);
}
/**
 * 加载用户信息。
 */
/*function loadinfo(){
	var account1="";
	var marketid1="";
	var idcard1="";
	var partid1="";
	var username1="";
	var password1="";
	$.ajax({
		url : "/pmos/rest/regist/loadinfo",
		type : "POST",
		dataType : "json",
		data : {
			"participantid" : participantid
		},
		success : function(rc) {
			if (rc.successful) {
				len = rc.resultValue.items.length;
				for (i = 0; i < len; i++) {
					marketid1 = rc[i].marketid;
					idcard1 = rc[i].idcard;
					partid1= rc[i].participantid;
					username1=rc[i].username;
					account1=rc[i].account;
					password1=rc[i].password;
					
					if(){}
					
			} 
		},
		error : function() {
			$.messager.alert('消息', "加载用户信息失败！");
		}
	});
}*/