function back() {
			history.go(-1);
}

/**
 * 异步请求
 * 
 * @param p_path
 *            请求路径
 * @param p_data
 *            请求参数
 * @param p_callback
 *            回调函数
 */
function post(p_path, p_data, p_callback) {
	if ($isFunction(p_data)) {
		p_callback = p_data;
		p_data = null;
	}
	_temp_get(p_path, p_data, p_callback, true, "POST");
}

/**
 * 函数内部使用
 * 
 * @param p_path
 * @param p_data
 * @param p_callback
 * @param async
 */
function _temp_get(p_path, p_data, p_callback, async, type) {
	if (p_data == null) {
		p_data = {};
	}
	if (p_data.rnd == null) {
		p_data.rnd = Math.random();
	}
	var ajaxSetting = {
		url : p_path,
		type : type,
		contentType : "application/json",
		dataType : "json",
		cache : false,
		async : async,
		data : p_data,
		success : function(rc) {
			if ($isFunction(p_callback)) {
				p_callback(rc);
			}
		},
		error : function(p_request, p_status, p_err) {
			top.$.jBox.alert('URL请求失败!', '错误');
		}
	};
	$.ajax(ajaxSetting);
}



/**
 * 函数内部使用
 * 
 * @param value
 * @returns {Boolean}
 */
function $isFunction(value) {
	return typeof (value) == "function";
}


/**
 * 获取下拉框数据
 * 
 * @param fieldName
 *            --属性比如participanttype
 * @param type
 *            --比如 38
 * @returns
 */
function comboBox(fieldName, type) {
	$.ajax({
		url :  "/pmos/rest/combobox/getComboBoxData?type="
				+ type,
		type : "post",
		dataType : "json",
		success : function(rc) {
			$("#" + fieldName).combobox('loadData', rc);
		},
		error : function(event, request, settings) {
			top.$.messager.alert('消息', '数据已加载，请勿频繁操作!');
		}
	});
}

function setFormFieldReadOnly($form, boolean) {
//	if (boolean == false) {
//		$form.find("input[type!='button']").removeAttr("readonly");
//		$form.find(".easyui-combobox").combobox("enable");
//		$form.find(".easyui-combotree").combotree("enable");
//		$form.find(".easyui-datebox").datebox("enable");
//		$form.find(".easyui-datetimebox").datetimebox("enable");
//		$form.find("input[type='text']").attr("readonly", "readonly");
//	} else {
//		$form.find("input[type!='button']").attr("readonly", "readonly");
//		$form.find(".easyui-combobox").combobox("disable");
//		$form.find(".easyui-combotree").combotree("disable");
//		$form.find(".easyui-datebox").datebox("disable");
//		$form.find(".easyui-datetimebox").datetimebox("disable");
//	}
}

/**
 * 获取url里？后面参数的值如 getUrlParameter('index.jsp?id = 3', 'id')
 * 
 * @param url
 * @param parameterName
 * @returns
 */
function getUrlParameter(url, parameterName) {
	var reg = new RegExp("(\\?|^|&)" + parameterName + "=([^&]*)(&|$)", "i");
	var r = url.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	} else {
		return "";
	}
}

/**
 * 同步请求,返回值为请求结果
 * 
 * @param p_path
 *            请求路径
 * @param p_data
 *            请求参数
 */
function getSync(p_path, p_data) {
	var rc = null;
	_temp_get(p_path, p_data, function(p_context) {
		rc = p_context;
	}, false, "GET");
	return rc;
}

/**
 * 同步请求,返回值为请求结果
 * 
 * @param p_path
 *            请求路径
 * @param p_data
 *            请求参数
 */
function postSync(p_path, p_data) {
	var rc = null;
	_temp_get(p_path, p_data, function(p_context) {
		rc = p_context;
	}, false, "POST");
	return rc;
}

/**
 * 异步请求
 * 
 * @param p_path
 *            请求路径
 * @param p_data
 *            请求参数
 * @param p_callback
 *            回调函数
 */
function get(p_path, p_data, p_callback) {
	if ($isFunction(p_data)) {
		p_callback = p_data;
		p_data = null;
	}
	_temp_get(p_path, p_data, p_callback, true, "GET");
}

/**
 * 异步请求
 * 
 * @param p_path
 *            请求路径
 * @param p_data
 *            请求参数
 * @param p_callback
 *            回调函数
 */
function post(p_path, p_data, p_callback) {
	if ($isFunction(p_data)) {
		p_callback = p_data;
		p_data = null;
	}
	_temp_get(p_path, p_data, p_callback, true, "POST");
}

/**
 * 函数内部使用
 * 
 * @param p_path
 * @param p_data
 * @param p_callback
 * @param async
 */
function _temp_get(p_path, p_data, p_callback, async, type) {
	if (p_data == null) {
		p_data = {};
	}
	if (p_data.rnd == null) {
		p_data.rnd = Math.random();
	}
	var ajaxSetting = {
		url : p_path,
		type : type,
		contentType : "application/json",
		dataType : "json",
		cache : false,
		async : async,
		data : p_data,
		success : function(rc) {
			if ($isFunction(p_callback)) {
				p_callback(rc);
			}
		},
		error : function(p_request, p_status, p_err) {
			$.messager.alert('错误', 'URL请求失败!');
		}
	};
	$.ajax(ajaxSetting);
}

/**
 * 函数内部使用
 * 
 * @param value
 * @returns {Boolean}
 */
function $isFunction(value) {
	return typeof (value) == "function";
}

/**
 * 
 * @param data
 * @param dicts
 * @returns
 */
function wrapComboTree($form, dicts) {
	for ( var i = 0; i < dicts.length; i++) {
		if (dicts[i].values.length == 1) {
			if ($form.find("#" + dicts[i].name)) {
				$("#" + dicts[i].name)
						.combo('setText', dicts[i].values[0].text);
			}
		}
	}
}

/**
 * 验证文件类型是否有效
 * 
 * @param fileName
 * @returns {Boolean}
 */
function validationFileName(fileName) {
	// 限制的类型
	var LIMIT_TYPES = "exe,bat,jsp";
	// 允许类型
	var ALLOW_TYPES = "doc,docx,ppt,pptx,xls,xlsx,vsd,vsdx,wps,et,dps,pdf,ceb,cebx,txt,rtf,oeb,jpg,jpeg,gif,png,bmp,tif,rar,7z,zip";
	var index = fileName.lastIndexOf(".");
	var fileName = fileName.substring(index + 1, fileName.length);
	var num1 = LIMIT_TYPES.indexOf(fileName);
	var num2 = ALLOW_TYPES.indexOf(fileName);
	if (num2 >= 0) {
		return true;
	}
	if (num1 >= 0) {
		return false;
	}
	return true;
}

$.fn.getFormData = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	var reobj = {
		items : []
	};
	reobj.items.push(o);
	return JSON.stringify(reobj);
};

$.extend($.fn.validatebox.defaults.rules, {
	maxLength : {
		validator : function(value, param){
			if(/\"+|\'+|\\+|\?+|\%+|\>+|\<+|\&/.test(value)){
				this.message = "不能输入包含非法字符 { \" \' \\ ? % > < & }的数据.";
				return false;
			}
			
			var num = 0;
			if(value!=null){
				value = (value+"").split("");
				for(var i=0; i<value.length; i++){
					var cn = value[i];
					//全角字符校验
					var re =  /[^\x00-\x80]/;//  /[^\x00-\x80]/; //或    /[^\0-\127]/    十进制表示
					if(/^[\u4e00-\u9fa5]+$/.test(cn) || re.test(cn)){
						num = num + 3;
					}else{
						num = num + 1;
					}
				}
			}
			this.message = "请输入最多 {0} 个字符,中文占3个字符.";
			return num <= param[0];
		},
		message: '请输入最多 {0} 个字符.'
	},
	zipcode : {
		validator : function(value){
			return /^[0-9]\d{5}$/.test(value);
		},
		message : '请输入有效的邮政编码,如:100000.'
	},
	code: {
		validator : function(value){
			return /^[A-Z0-9]{18}$/.test(value);
		},
		message : '请输入18位大写字母或者数字.'
	},
	floatNumToNum : {
		validator : function(value, param){
			var t = '/^[0-9]{0,'+param[0]+'}(\\.[0-9]{1,'+param[1]+'})?$/';
			var re = new RegExp(eval(t));
			this.message = '请输入有效数字(小数点前最多{0}位,小数点后最多{1}位).';
			return re.test(value);
		},
		message : '请输入有效数字(小数点前最多{0}位,小数点后最多{1}位).'
	},
	webaddress : {
		validator : function(value){
			if (/\"+|\'+|\_+|\>+|\</.test(value)) {
				this.message = "不能输入包含非法字符 { \" \' _  > < }的数据.";
				return false;
			}
			var num = 0;
			if (value != null) {
				value = (value + "").split("");
				for ( var i = 0; i < value.length; i++) {
					// debugger;
					var cn = value[i];
					// 全角字符校验
					var re = /[^\x00-\x80]/;// /[^\x00-\x80]/; //或
					// /[^\0-\127]/ 十进制表示
					if (/^[\u4e00-\u9fa5]+$/.test(cn) || re.test(cn)) {
						num = num + 3;
					} else {
						num = num + 1;
					}
				}
			}
			this.message = "请输入最多256个字符.";
			return num <= 256;
		},
		message: '请输入最多256个字符.'
	},
	telephone : {
		validator : function(value){
			return /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/.test(value);
		},
		message : '请输入有效的电话号码,如:010-29292929.'
	},
	mobilephone : {
		validator : function(value){
			return /(^0?[1][3578][0-9]{9}$)/.test(value);
		},
		message : '请输入有效的手机号码,如:15011111111.'
	},
	extendEmail : {
		validator : function(value){
			return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
		},
		message : '请输入正确的Email地址,如:abc@163.com.'
	},
	numberMaxLen:{
		validator : function(value, param){
			if (!(/^[1-9][0-9]*$|^$|^[0]$/.test(value))) {
				this.message = "请输入正整数！";
				return false;
			}
			var x = 10, n = Number(param[0]) - 1;
			while (n > 0) {
				x = x * 10;
				n --;
			}
			if(!(value <= x)){
				this.message = "最大长度为 {0}";
				return false;
			}
			return true;
		},
		message : '请输入最大长度为 {0} 的整数.'
	},
	ajaxValidate : {
		validator : function(value){
			if (!(/^[0-9a-zA-Z\-]+$/.test(value))) {
				this.message = "请输入字母、数字或横杠！";
				return false;
			}
			var num = 0;
			if (value != null) {
				value = (value + "").split("");
				for ( var i = 0; i < value.length; i++) {
					var cn = value[i];
						num = num + 1;
				}
			}
			this.message = "请输入最多50个字符.";
			return num <= 50;
			
//			return /^[0-9a-zA-Z]+$/.test(value);
		},
		message : '请输入英文字母、数字或横杠.'
	},
	chinese : {
		validator : function(value){
			return /^[\u4e00-\u9fa5]+$|^$/.test(value);
		},
		message : '请输入中文.'
	},
	notChinese : {
		validator : function(value){
		var flag = true;
		if(value!=null){
				value = (value+"").split("");
				for(var i=0; i<value.length; i++){
					var cn = value[i];
					if(/^[\u4e00-\u9fa5]/.test(cn)){
						flag = false;
					}
				}
			}
			return flag;
		},
		message : '请输入正确的证件号.'
	},
	formatChineseNamePowerInfoPubs : {
		// 中文名字校验,支持少量少数民族
		validator : function(value){
		    if(value){
//		   		value = value.trim();//去掉对于空格的校验
		    	$.trim(value);
		    }
			
			return /^(([\u4e00-\u9fa5]{2,6}(?:·[\u4e00-\u9fa5]{2,6}))|([\u4e00-\u9fa5]{2,5}))$|^$/
					.test(value);
		},
		message : '请输入标准的中文名称 ，如果为少数民族姓名，则分割符号(·)前最多6个汉字，分隔符号(·)后最多6个汉字；普通姓名最多5个汉字！'
	},
	formatChineseNamePowerInfoPubsRegist : {
		// 中文名字校验,支持少量少数民族
		validator : function(value){
		    if(value){
//		   		value = value.trim();//去掉对于空格的校验
		    	$.trim(value);
		    	if(value.indexOf('·')>0){
                    value=value.replace(/·/,'');
				}
		    }
		    //中文验证
		    if(/^[\u4e00-\u9fa5]+$/.test(value)){
                return /^(([\u4e00-\u9fa5]{2,6}(?:·[\u4e00-\u9fa5]{2,6}))|([\u4e00-\u9fa5\()（）]{2,7}))$|^$/
                    .test(value);
			}else{
		    	//英文验证
				value=value.replace(/\s+/g,"");
                return /^[a-z\s]*[a-z\s]$/
                    .test(value);
			}


		},
		message : '请输入标准的中文名称或者英文，如果为少数民族姓名，则分割符号(·)前最多6个汉字，分隔符号(·)后最多6个汉字；普通姓名最多5个汉字！'
	},
	floatNumberMaxSize : {
		validator : function(value, param){
			return (/^([0-9]+(\.[0-9]+)?)?$/.test(value)) && (parseFloat(value) <= param[0]);
		},
		message : '请输入最大为 {0} 的有效数字.'
	},
	chineseN : {
		validator : function(value){
			return /^[\u4e00-\u9fa5a-zA-Z]+$|^$/.test(value);
		},
		message : '请输入中文或字母.'
	},
	chineseNs : {
		validator : function(value){
			return /^[\u4e00-\u9fa5a-zA-Z\()（）]+$|^$/.test(value);
		},
		message : '请输入中文或字母.'
	},
	job : {
		validator : function(value){
			return /^[\u4e00-\u9fa50-9a-zA-Z]+$|^$/.test(value);
		},
		message : '请输入中文、字母、数字'
	},
	jobs : {
		validator : function(value){
			return /^[\u4e00-\u9fa50-9a-zA-Z\()（）]+$|^$/.test(value);
		},
		message : '请输入中文、字母、数字'
	},
	network : {
		validator : function(value){
			return /^((([hH][tT][tT][pP][sS]?|[fF][tT][pP])\:\/\/)?([\w\.\-]+(\:[\w\.\&%\$\-]+)*@)?((([^\s\(\)\<\>\\\"\.\[\]\,@;:]+)(\.[^\s\(\)\<\>\\\"\.\[\]\,@;:]+)*(\.[a-zA-Z]{2,4}))|((([01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}([01]?\d{1,2}|2[0-4]\d|25[0-5])))(\b\:(6553[0-5]|655[0-2]\d|65[0-4]\d{2}|6[0-4]\d{3}|[1-5]\d{4}|[1-9]\d{0,3}|0)\b)?((\/[^\/][\w\.\,\?\'\\\/\+&%\$#\=~_\-@]*)*[^\.\,\?\"\'\(\)\[\]!;<>{}\s\x7F-\xFF])?)$/.test(value);
		},
		message : '请输入正确的网址,如www.baidu.com'
	},
	numMaxLen:{
		validator : function(value, param){
			if (!(/^[0-9]*$|^$|^[0]$/.test(value))) {
				this.message = "请输入数字！";
				return false;
			}
			var x = 10, n = Number(param[0]) - 1;
			while (n > 0) {
				x = x * 10;
				n --;
			}
			if(!(value <= x)){
				this.message = "最大长度为 {0}";
				return false;
			}
			return true;
		},
		message : '请输入最大长度为 {0} 的整数.'
	},
	qiyeName : {
		validator : function(value,param){
			if(!(/^[\u4e00-\u9fa5a-zA-Z0-9\-]+$|^$/.test(value))){
				this.message = "请输入正确的名称，只包含汉字、字母、数字或'-'.";
				return false;
			}
			var num = 0;
			if(value!=null){
				value = (value+"").split("");
				for(var i=0; i<value.length; i++){
					var cn = value[i];
					//全角字符校验
					var re =  /[^\x00-\x80]/;//  /[^\x00-\x80]/; //或    /[^\0-\127]/    十进制表示
					if(/^[\u4e00-\u9fa5]+$/.test(cn) || re.test(cn)){
						num = num + 3;
					}else{
						num = num + 1;
					}
				}
			}
			this.message = "请输入最多 {0} 个字符,中文占3个字符.";
			return num <= param[0];
//			return /^[\u4e00-\u9fa5a-zA-Z\-]+$|^$/.test(value);
		},
		message : '请输入正确的名称，只包含汉子、字母、数字或下划线.'
	},
	qiyeNames: {
		validator : function(value,param){
			if(!(/^[\u4e00-\u9fa5a-zA-Z0-9\-\()（）]+$|^$/.test(value))){
 				return false;
			}
			var num = 0;
			if(value!=null){
				value = (value+"").split("");
				for(var i=0; i<value.length; i++){
					var cn = value[i];
					//全角字符校验
					var re =  /[^\x00-\x80]/;//  /[^\x00-\x80]/; //或    /[^\0-\127]/    十进制表示
					if(/^[\u4e00-\u9fa5]+$/.test(cn) || re.test(cn)){
						num = num + 3;
					}else{
						num = num + 1;
					}
				}
			}
			this.message = "请输入最多 {0} 个字符,中文占3个字符.";
			return num <= param[0];
//			return /^[\u4e00-\u9fa5a-zA-Z\-]+$|^$/.test(value);
		},
		message : '请输入正确的名称，只包含汉子、字母、数字或下划线.'
	},
	special:{//特殊字符验证
		validator : function(value,param){
			if(/\"+|\'+|\_+|\>+|\<+|\@+|\$+|\%+|\^+|\*+|\?+|\~/.test(value)){
				this.message = "不能输入包含 { \" \' _  > < }等非法字符.";
				return false;
			}
			var num = 0;
			if(value!=null){
				value = (value+"").split("");
				for(var i=0; i<value.length; i++){
					var cn = value[i];
					//全角字符校验
					var re =  /[^\x00-\x80]/;//  /[^\x00-\x80]/; //或    /[^\0-\127]/    十进制表示
					if(/^[\u4e00-\u9fa5]+$/.test(cn) || re.test(cn)){
						num = num + 3;
					}else{
						num = num + 1;
					}
				}
			}
			this.message = "请输入最多 {0} 个字符,中文占3个字符.";
			return num <= param[0];
			
//			return /\"+|\'+|\_+|\>+|\<+|\@+|\$+|\%+|\^+|\*+|\?+|\~/.test(value);
		},
	   message : "不能输入包含非法字符 { \" \' _  > < }等的数据."
	},
	file : {//文件编号的验证
//		/^[A-Za-z0-9\u4e00-\u9fa5]{0,}?\[[1-9][0-9]{3}?\][1-9][0-9]{0,}?\号$/.test(obj)
			validator : function(value){
				return /^[A-Za-z0-9\u4e00-\u9fa5]{0,}?\[[1-9][0-9]{3}?\][1-9][0-9]{0,}?\号^$/.test(value);
			},
			message : '请输入正确的文件号如[2012]27号'
	}
	
});