var participanttype="";
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
//记录有没有保存
var saved=false;
var readOnly = "";
var readOnlys="";
var affixa = "";
var isConcut=false;
//记录上传附件的个数
function init(){
	$('input').attr('disabled','disabled');
	$('select').attr('disabled','disabled');
	
}
/**
 * 新建participantid
 */
function initParticipantid(){
	participantid=getGuid();
	$("#participantid").val(participantid);
	
}