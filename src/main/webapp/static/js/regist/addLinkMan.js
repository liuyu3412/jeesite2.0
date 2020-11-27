var guid="";
var show="";
var readOnly="";
var owernbitss="";
var isba="";
var isWiatedo="";
function init(){
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
			if(ppp[i].indexOf("guid")!=-1) {
				guid = ppp[i].substring(ppp[i].indexOf("guid")+5,ppp[i].length);
			} 
			if(ppp[i].indexOf("isba")!=-1) {
				isba = ppp[i].substring(ppp[i].indexOf("isba")+5,ppp[i].length);
			}
			if(ppp[i].indexOf("isWiatedo")!=-1) {
				isWiatedo = ppp[i].substring(ppp[i].indexOf("isWiatedo")+10,ppp[i].length);
			}
		}	
		// 设置隐藏框 市场成员id
		$("#participantid").val(participantid);
	}
	/**
	 * 加载是否只读信息
	 */
	$.ajax({
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
			if(isWiatedo=="isWiatedo"){
				readOnly="true";
			}
		}
	
});
}
/**
 * 当处于查看的时候只读状态 
 */
function readOnlyInput(){
		if(readOnly=="true"){
			//所有的input 设置为只读
			$(".formTable input").each(function(){
				$(this).attr("readonly", true);
			})
			/*$("#personsex").combo("hideIcon");*/
			$("#iscommon").combo("hideIcon");
			document.getElementById("saveBtn").style.display="none";
		}
		else{
			
		}
			
	}
/**
 * 保存
 */
function saveLxr(){
	//判断只能有一个联系人
	var iscommon = $("#iscommon").val();
	var isAddPeople = $("#isAddPeople").val();
	var isCommonFlag = $("input[name=isCommonFlag]").val();//编辑时候本身是否是常用联系人

	if (iscommon=="1") {
		if(isCommonFlag!="1"){
            if (isAddPeople=="false") {
                top.jBox.alert("只能存在一个常用联系人!");
                return;
            }
		}

	}
	
	var isValidated = $("#lxrDetailForm").form('validate');// 验证
	if (isValidated == false) {
		return ;
	}
    // 验证职务
    var position = $('#position').val();
    console.log(position);
    if (!position) {
        top.jBox.alert("职务不能为空!");
        return;
    }
	var formDate = $("#formId").serialize();
	$.ajax({
        url: "addContactDetailsInfo",
        type: "post",
        async: false,
        data: formDate,
        dataType: "json",
        success: function (data) {
            if (data.flag == 'success'||data>0) {
                localStorage.setItem("realtionPersonFlag","realtionPersonFlag");//判断是否保存成功的标识
                $.jBox.alert("保存成功","消息");
                window.parent.window.isFreshFlag = "2";//回写父页面的值
                window.parent.window.jBox.close();
                //刷新当前页
                window.parent.window.reload();
            } else {
                $.jBox.alert("保存失败!","消息");
            }

        }
    });
}
function loadForm() {
	var url = "";
	//如果以生效，正式表中取
	if(isba=="isba"){
		url="/pmos/rest/regist/baloadlinkmanInfo?guid="+guid;
	}else{
		url="/pmos/rest/regist/loadlinkmanInfo?guid="+guid;
	}
	if(guid==null||guid==""){
	}else{
		$.ajax({
			url :  url,
			type : "post",
			dataType : "json",
			success : function(rc) {
				//获取返回结果 --就一个值
				var data = rc.resultValue.items[0];
				$('#lxrDetailForm').form('load', data);
				owernbitss=data.owernbit;
				wrapComboTree($('#lxrDetailForm'), rc.resultValue.dicts);
			},
			error : function(event, request, settings) {
				top.$.messager.alert('消息', '数据已加载，请勿频繁操作!');
			}
		});
	}
	

}

/**
 * 保存
 */
function saveLxrNew(){
	//判断只能有一个联系人
	var iscommon = $("#iscommon").val();
	var isAddPeople = $("#isAddPeople").val();
	var isCommonFlag = $("input[name=isCommonFlag]").val();//编辑时候本身是否是常用联系人

	if (iscommon=="1") {
		if(isCommonFlag!="1"){
			if (isAddPeople=="false") {
				top.jBox.alert("只能存在一个常用联系人!");
				return;
			}
		}

	}

	var isValidated = $("#lxrDetailForm").form('validate');// 验证
	if (isValidated == false) {
		return ;
	}
	// 验证职务
	var position = $('#position').val();
	console.log(position);
	if (!position) {
		top.jBox.alert("职务不能为空!");
		return;
	}
	var formDate = $("#formId").serialize();
	$.ajax({
		url: "addContactInfo",
		type: "post",
		async: false,
		data: formDate,
		dataType: "json",
		success: function (data) {
			if (data.flag == 'success'||data>0) {
				localStorage.setItem("realtionPersonFlag","realtionPersonFlag");//判断是否保存成功的标识
				$.jBox.alert("保存成功","消息");
				window.parent.window.isFreshFlag = "2";//回写父页面的值
				window.parent.window.jBox.close();
				//刷新当前页
				window.parent.window.reload();
			} else {
				$.jBox.alert("保存失败!","消息");
			}
		}
	});
}