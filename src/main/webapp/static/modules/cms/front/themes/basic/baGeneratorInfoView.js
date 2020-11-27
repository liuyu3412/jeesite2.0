var generatorid, dataStatus, generatortype;
var flagDouble = true;
var oldTimeArr = [];
var newTimeArr = [];
var isUpdateFlag = false;
var checkCode = "";

var arr = [];
var threeArr = [];
/*function loadSelectEdit() {
    var parentid = $("#generatortype option:selected").attr("remark");
    var parentVal = $("#generatortype option:selected").val();
  //判断浏览器类型
	var brow=$.browser;
	var bInfo="";
	if(!brow.msie) {
    if (parentid) {
        $("#generatortypesub option:first").html("--请选择机组子类型--");
        $("#generatortypethird option:first").html("--请选择机组三级类型--");
    } else {
        $("#generatortypesub option:first").html("--请选择机组子类型--");
        $("#generatortypethird option:first").html("--请选择机组三级类型--");
    }
    }

    $("#generatortypesub option").each(function () {
        $(this).removeAttr("style");
        if (parentid != $(this).attr("remark")) {
            $(this).attr("style", "display:none");
        } else {
            if (flagDouble) {
                var dbType = $("#subTypeInfo").val();
                var subType = $(this).val();
                if (subType == dbType) {
                    $(this).attr("selected", "selected");
                    flagDouble = false;
                }
                $(this).removeAttr("style");
            }
        }
    });

}*/

function initSelect2() {
    $("#loadHtmlInfo").html("");
    parentid = $("#generatortype option:selected").attr("remark");
    parentVal = $("#generatortype option:selected").val();
    if (parentid) {
        $("#generatortypesub option:first").attr("selected", "selected");
        $("#generatortypethird option:first").attr("selected", "selected");
        var str = "";
        if (parentVal == 1) {
            str += "<table id=\"water\" width=\"100%\"";
            str += "								class=\"table table-striped table-bordered table-condensed\"";
            str += "								width=\"100%\">";
            str += "								<tbody>";
            str += "									<tr height=\"1px\"></tr>";
            str += "									<tr>";
            str += "										<td colspan=\"6\" style=\"font-weight: bold;\" class=\"title_b\">参数信息</td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td width=\"90px\" style=\"text-align: right;\">平均加出力速度(MW/min):</td>";
            str += "										<td style=\"width: 150px\"><input  readonly";
            str += "											id=\"paramInfo_avgaddspeed\" name=\"avgaddspeed\"";
            str += "											 class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\">平均减出力速度(MW/min):</td>";
            str += "										<td style=\"width: 150px\"><input readonly";
            str += "											id=\"paramInfo_avgremovespeed\" name=\"avgremovespeed\"";
            str += "											 class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\"><a style=\"color: red\">*</a>下水库容量(km3):</td>";
            str += "										<td style=\"width: 150px\"><select remark=\"91\" disabled='disabled'";
            str += "											name=\"csxndzskr\" class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\"><a style=\"color: red\">*</a>抽发转换率(%):</td>";
            str += "										<td><input id=\"paramInfo_csxnjzcfzhl\" name=\"csxnjzcfzhl\" readonly";
            str += "											 class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[2,4]'\"></td>";
            str += "										<td style=\"text-align: right;\"><a style=\"color: red\">*</a>抽水工况额定容量(MW):</td>";
            str += "										<td><input id=\"paramInfo_csxnjzcsgkhdgl\" readonly";
            str += "											name=\"csxnjzcsgkhdgl\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">抽水转发电一次功率(MW):</td>";
            str += "										<td><input id=\"paramInfo_csxnjzcszfdyccgl\" readonly";
            str += "											name=\"csxnjzcszfdyccgl\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">单机额定抽水工况可持续时间(h):</td>";
            str += "										<td><input id=\"paramInfo_csxnjzdjhdcsgkkcxsj\" readonly";
            str += "											name=\"csxnjzdjhdcsgkkcxsj\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">单机额定发电工况可持续时间(h):</td>";
            str += "										<td><input id=\"paramInfo_csxnjzdjhdfdgckcxsj\" readonly";
            str += "											name=\"csxnjzdjhdfdgckcxsj\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">发电转抽水一次功率(MW):</td>";
            str += "										<td><input id=\"paramInfo_csxnjzfdzcsyccgl\" readonly";
            str += "											name=\"csxnjzfdzcsyccgl\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">有无AGC调整装置:</td>";
            str += "										<td><select remark=\"30\" name=\"ifagcfm\" disabled='disabled'";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">有无一次调频装置:</td>";
            str += "										<td><select remark=\"115\" name=\"ifoncefm\" disabled='disabled'";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">是否特许招标:</td>";
            str += "										<td><select remark=\"30\" name=\"inviteProject\" disabled='disabled'";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">最高水位(m):</td>";
            str += "										<td><input id=\"paramInfo_largestpower\" readonly";
            str += "											name=\"largestpower\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">死水位(m):</td>";
            str += "										<td><input id=\"paramInfo_largestpowerinleast\" readonly";
            str += "											name=\"largestpowerinleast\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">最小有功出力(MW):</td>";
            str += "										<td><input id=\"paramInfo_leastpower\" readonly name=\"leastpower\"";
            str += "											 class=\"easyui-validatebox\"  tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">一次调频转速不等率(%):</td>";
            str += "										<td><input id=\"paramInfo_oncefmrate\" readonly name=\"oncefmrate\"";
            str += "											 class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[2,2]'\"></td>";
            str += "										<td style=\"text-align: right;\">一次调频动作死区:</td>";
            str += "										<td><input id=\"paramInfo_oncefmtodeath\" readonly";
            str += "											name=\"oncefmtodeath\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'special[36]'\"></td>";
            str += "										<td style=\"text-align: right;\">启到停的最小时间间隔(h):</td>";
            str += "										<td><input id=\"paramInfo_opentostopspace\" readonly";
            str += "											name=\"opentostopspace\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[2,2]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">停到启的最小时间间隔(h):</td>";
            str += "										<td><input id=\"paramInfo_stoptoopenspace\" readonly";
            str += "											name=\"stoptoopenspace\" maxlength=\"2\"";
            str += "											data-options=\"validType:'floatNumToNum[2,2]'\"></td>";
            str += "										<td style=\"text-align: right;\"><a style=\"color: red\">*</a>所属河流流域:</td>";
            str += "										<td><select remark=\"90\" name=\"wpgbasin\" readonly";
            str += "											class=\"paramSelect  required\">";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\"><a style=\"color: red\">*</a>调节方式:</td>";
            str += "										<td><select remark=\"86\" name=\"wpgregulatemode\" readonly";
            str += "											class=\"paramSelect  required\">";
            str += "										</select></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">水头分类:</td>";
            str += "										<td><select remark=\"89\" name=\"wpgshuitoufenlei\" readonly";
            str += "											class=\"paramSelect\">";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\"><a style=\"color: red\">*</a>水电站库容(km3):</td>";
            str += "										<td><input id=\"paramInfo_wpskurong\" name=\"wpskurong\" readonly";
            str += "											 class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">抽水蓄能机组年租赁费(万):</td>";
            str += "										<td><input id=\"paramInfo_zlscsxnjznzlf\" readonly";
            str += "											name=\"zlscsxnjznzlf\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[10,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">租赁费分摊电网公司占比(%):</td>";
            str += "										<td><input id=\"paramInfo_zlscsxnjzzlfftbDwgs\" readonly";
            str += "											name=\"zlscsxnjzzlfftbDwgs\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[2,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">租赁费分摊发电企业占比(%):</td>";
            str += "										<td><input id=\"paramInfo_zlscsxnjzzlfftbFdqy\" readonly";
            str += "											name=\"zlscsxnjzzlfftbFdqy\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[2,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">租赁费分摊社会用户占比(%):</td>";
            str += "										<td><input id=\"paramInfo_zlscsxnjzzlfftbShyh\" readonly";
            str += "											name=\"zlscsxnjzzlfftbShyh\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[2,4]'\"></td>";
            str += "									</tr>";
            str += "                                    <tr><td style=\"text-align: right;\"><a style=\"color: red\">*</a>是否分布式:</td><td><select remark=\"30\" disabled='disabled' name=\"isbidtype\" class=\"paramSelect required\"></select></td></tr>"
            str += "								</tbody>";
            str += "							</table>";
        } else if (parentVal == 0) {
            str += "<table class=\"fire table table-striped table-bordered table-condensed\" width=\"100%\"";
            str += "								class=\"table table-striped table-bordered table-condensed\"";
            str += "								width=\"100%\">";
            str += "								<tbody>";
            str += "									<tr height=\"1px\"></tr>";
            str += "									<tr>";
            str += "										<td colspan=\"6\" style=\"font-weight: bold;\" class=\"title_b\">参数信息</td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td width=\"90px\" style=\"text-align: right;\">锅炉压力水平:</td>";
            str += "										<td style=\"width: 150px\"><select remark=\"22\" disabled='disabled'";
            str += "											name=\"boilerpressure\" class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\"><a style=\"color: red\">*</a>发电标煤耗(g/kWh):</td>";
            str += "										<td style=\"width: 150px\"><input readonly";
            str += "											id=\"paramInfo_coalconsumeratio\" name=\"coalconsumeratio\"";
            str += "											 class=\"easyui-validatebox\"";
            str += "											data-options=\"required:true,validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\"><a style=\"color: red\">*</a>供电标煤耗(g/kWh):</td>";
            str += "										<td style=\"width: 150px\"><input readonly";
            str += "											id=\"paramInfo_timeConsumption\" name=\"timeConsumption\"";
            str += "											 class=\"easyui-validatebox\" tipbottom=\"true\"";
            str += "											data-options=\"required:true,validType:'floatNumToNum[8,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\"><a style=\"color: red\">*</a>是否分布式:</td>";
            str += "										<td><select remark=\"30\" name=\"isbidtype\" disabled='disabled'";
            str += "											class=\"paramSelect required\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">是否联合循环:</td>";
            str += "										<td><select remark=\"30\" name=\"isccunitmode\" disabled='disabled'";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">是否风冷:</td>";
            str += "										<td><select remark=\"30\" name=\"iscoldbyair\" disabled='disabled'";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\"><a style=\"color: red\">*</a>是否脱硝:</td>";
            str += "										<td><select remark=\"30\" name=\"isdesalt\" disabled='disabled'";
            str += "											class=\"paramSelect required\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">脱硝认定日期:</td>";
            str += "										<td>";
            str += "									<input id=\"opbegindate\" name=\"desaltdate\" ro type=\"text\"";
            str += "									readonly=\"readonly\" maxlength=\"20\"";
            str += "									class=\"input-big Wdate\"";
            str += "									 />";
            str += "											</td>";
            str += "										<td style=\"text-align: right;\">脱硝效率(%):</td>";
            str += "										<td><input id=\"paramInfo_desaltpetreratio\"";
            str += "											name=\"desaltpetreratio\" readonly class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[2,6]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\"><a style=\"color: red\">*</a>是否脱硫:</td>";
            str += "										<td><select remark=\"30\" disabled name=\"isdesulfurated\"";
            str += "											class=\"paramSelect required\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">脱硫认定日期:</td>";
            str += "										<td>";
            str += "									<input id=\"opbegindate\" name=\"desulfurateddate\" type=\"text\"";
            str += "									readonly=\"readonly\" maxlength=\"20\"";
            str += "									class=\"input-big Wdate\"";
            str += "									/>";
            str += "											</td>";
            str += "										<td style=\"text-align: right;\">脱硫效率(%):</td>";
            str += "										<td><input id=\"paramInfo_desulfurateratio\"";
            str += "											name=\"desulfurateratio\" readonly  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[2,6]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\"><a style=\"color: red\">*</a>是否除尘:</td>";
            str += "										<td><select remark=\"30\" disabled='disabled' name=\"generatorclass2\"";
            str += "											class=\"paramSelect required\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">除尘认定日期:</td>";
            str += "										<td>";
            str += "									<input id=\"opbegindate\" name=\"desdirtdate\" type=\"text\"";
            str += "									readonly=\"readonly\" maxlength=\"20\"";
            str += "									class=\"input-big Wdate\"";
            str += "									 />";
            str += "											</td>";
            str += "										<td style=\"text-align: right;\">除尘效率(%):</td>";
            str += "										<td><input id=\"paramInfo_dustratio\" readonly name=\"dustratio\"";
            str += "											 class=\"easyui-validatebox\" tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">有无AGC调整装置</td>";
            str += "										<td><select remark=\"30\" disabled='disabled' name=\"ifagcfm\"";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">有无一次调频装置:</td>";
            str += "										<td><select remark=\"115\" disabled='disabled' name=\"ifoncefm\"";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\"><a style=\"color: red\">*</a>是否供热:</td>";
            str += "										<td><select remark=\"30\" disabled='disabled' name=\"isheatsupply\"";
            str += "											class=\"paramSelect required\">";
            str += "";
            str += "										</select></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">供热类型:</td>";
            str += "										<td><select remark=\"114\" disabled='disabled' name=\"grjzlx\"";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">最大供热流量(t/h):</td>";
            str += "										<td><input id=\"paramInfo_jzgzdgrllnl\" readonly name=\"jzgzdgrllnl\"";
            str += "											 class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">平均供热流量(t/h):</td>";
            str += "										<td><input id=\"paramInfo_pjgrll\" readonly name=\"pjgrll\"";
            str += "											 class=\"easyui-validatebox\" tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">热态启动并网时间(h):</td>";
            str += "										<td><input id=\"paramInfo_hotstarttime\"";
            str += "											name=\"hotstarttime\" readonly class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[2,2]'\"></td>";
            str += "										<td style=\"text-align: right;\">冷态启动并网时间(h):</td>";
            str += "										<td><input id=\"paramInfo_coldstarttime\" readonly";
            str += "											name=\"coldstarttime\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[2,2]'\"></td>";
            str += "										<td style=\"text-align: right;\">温态启动并网时间(h):</td>";
            str += "										<td><input id=\"paramInfo_warmstarttime\" readonly ";
            str += "											name=\"warmstarttime\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[2,2]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\"><a style=\"color: red\">*</a>是否资源综合利用:</td>";
            str += "										<td><select remark=\"30\" disabled='disabled' name=\"iscomprehensive\"";
            str += "											class=\"paramSelect required\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">资源综合利用认定时间:</td>";
            str += "										<td>";
            str += "									<input id=\"opbegindate\" name=\"tradeRunDate\" type=\"text\"";
            str += "									readonly=\"readonly\" maxlength=\"20\"";
            str += "									class=\"input-big Wdate\"";
            str += "									 />";
            str += "											</td>";
            str += "										<td style=\"text-align: right;\">一次调频转速不等率(%):</td>";
            str += "										<td><input id=\"paramInfo_oncefmrate\" readonly name=\"oncefmrate\"";
            str += "											 class=\"easyui-validatebox\" tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[2,2]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">一次调频动作死区:</td>";
            str += "										<td><input id=\"paramInfo_oncefmtodeath\"readonly ";
            str += "											name=\"oncefmtodeath\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'special[36]'\"></td>";
            str += "										<td style=\"text-align: right;\">启到停的最小时间间隔(h):</td>";
            str += "										<td><input id=\"paramInfo_opentostopspace\" readonly ";
            str += "											name=\"opentostopspace\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[2,2]'\"></td>";
            str += "										<td style=\"text-align: right;\">停到启的最小时间间隔(h):</td>";
            str += "										<td><input id=\"paramInfo_stoptoopenspace\" readonly";
            str += "											name=\"stoptoopenspace\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[2,2]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">夏季最大有功出力(MW):</td>";
            str += "										<td><input id=\"paramInfo_summerpower\" readonly name=\"summerpower\"";
            str += "											 class=\"easyui-validatebox\" ";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">冬季最大有功出力(MW):</td>";
            str += "										<td><input id=\"paramInfo_winterpower\" readonly name=\"winterpower\"";
            str += "											 class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">最小有功出力(MW):</td>";
            str += "										<td><input id=\"paramInfo_leastpower\" readonly name=\"leastpower\"";
            str += "											 class=\"easyui-validatebox\" tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">平均加出力速度(MW/min):</td>";
            str += "										<td><input id=\"paramInfo_avgaddspeed\" readonly name=\"avgaddspeed\"";
            str += "											 class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\">平均减出力速度(MW/min):</td>";
            str += "										<td><input id=\"paramInfo_avgremovespeed\" readonly";
            str += "											name=\"avgremovespeed\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\">是超低排放</td>";
            str += "										<td><select remark=\"30\" name=\"generatorclass1\" disabled='disabled'";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">超低排放认定日期:</td>";
            str += "										<td>";
            str += "									<input id=\"testRunDate\" name=\"testRunDate\" type=\"text\"";
            str += "									readonly=\"readonly\" maxlength=\"20\"";
            str += "									class=\"input-big Wdate\"";
            str += "									 />";
            str += "											</td>";
            str += "									</tr>";
            str += "								</tbody>";
            str += "							</table>";
        } else if (parentVal == 2) {
            str += "<table class=\"sunEnergy table table-striped table-bordered table-condensed \" width=\"100%\"";
            str += "								class=\"table table-striped table-bordered table-condensed\"";
            str += "								width=\"100%\">";
            str += "								<tbody>";
            str += "									<tr height=\"1px\"></tr>";
            str += "									<tr>";
            str += "										<td colspan=\"6\" style=\"font-weight: bold;\" class=\"title_b\">参数信息</td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td width=\"90px\" style=\"text-align: right;\">是否分布式:</td>";
            str += "										<td style=\"width: 150px\">";
            str += "										<select remark=\"30\" disabled='disabled' name=\"isbidtype\"";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select>";
            str += "										</td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\">是否特许招标:</td>";
            str += "										<td style=\"width: 150px\">";
            str += "										<select remark=\"30\" disabled='disabled' name=\"inviteProject\"";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select>";
            str += "										</td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\">单机容量(MW):</td>";
            str += "										<td style=\"width: 150px\"><input readonly";
            str += "											id=\"paramInfo_standAlonePower\" name=\"standAlonePower\"";
            str += "											 class=\"easyui-validatebox\" tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[4,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">政府补贴电价:</td>";
            str += "										<td><input id=\"paramInfo_emermaxnetpower\" readonly";
            str += "											name=\"emermaxnetpower\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>"
            str += "										<td style=\"text-align: right;\">组合机组台数:</td>";
            str += "										<td><input id=\"generatorTowerNum\" readonly";
            str += "											name=\"generatorTowerNum\"  class=\"easyui-validatebox\"";
            str += "											/></td>"
            str += "									</tr>";
            str += "								</tbody>";
            str += "							</table>";

        } else if (parentVal == 3) {
            str += "<table class=\"cloud table table-striped table-bordered table-condensed\" width=\"100%\"";
            str += "								class=\"table table-striped table-bordered table-condensed\"";
            str += "								width=\"100%\">";
            str += "								<tbody>";
            str += "									<tr height=\"1px\"></tr>";
            str += "									<tr>";
            str += "										<td colspan=\"6\" style=\"font-weight: bold;\" class=\"title_b\">参数信息</td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td width=\"90px\" style=\"text-align: right;\"><a style=\"color: red\">*</a>是否分布式:</td>";
            str += "										<td style=\"width: 150px\"><select remark=\"30\"";
            str += "											name=\"isbidtype\" disabled='disabled' class=\"paramSelect required\">";
            str += "";
            str += "										</select></td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\"><a style=\"color: red\">*</a>组合机组台数:</td>";
            str += "										<td style=\"width: 150px\"><input readonly";
            str += "											id=\"paramInfo_generatorTowerNum\" name=\"generatorTowerNum\"";
            str += "											 class=\"easyui-validatebox\"";
            str += "											data-options=\"required:true,validType:'numberMaxLen[5]'\"></td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\">单机容量(MW):</td>";
            str += "										<td style=\"width: 150px\"><input readonly";
            str += "											id=\"paramInfo_standAlonePower\" name=\"standAlonePower\"";
            str += "											 class=\"easyui-validatebox\" tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[4,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">额定风速(m/s):</td>";
            str += "										<td><input id=\"paramInfo_specifiedWindspeed\"";
            str += "											name=\"specifiedWindspeed\" readonly class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">切入风速(m/s):</td>";
            str += "										<td><input id=\"paramInfo_cutinWindspeed\" readonly";
            str += "											name=\"cutinWindspeed\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">切除风速(m/s):</td>";
            str += "										<td><input id=\"paramInfo_cutoutWindspeed\" readonly";
            str += "											name=\"cutoutWindspeed\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\"><a style=\"color: red\">*</a>是否特许招标:</td>";
            str += "										<td><select remark=\"30\" name=\"inviteProject\"";
            str += "											class=\"paramSelect required\" disabled='disabled'>";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">叶轮直径(m):</td>";
            str += "										<td><input id=\"paramInfo_vaneDiameter\" readonly";
            str += "											name=\"vaneDiameter\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[10,4]'\"></td>";
            str += "									</tr>";
            str += "								</tbody>";
            str += "							</table>";
        } else if (parentVal == 4) {
            str += "<table class=\"heneng table table-striped table-bordered table-condensed\" width=\"100%\" >";
            str += "								<tbody>";
            str += "									<tr height=\"1px\"></tr>";
            str += "									<tr>";
            str += "										<td colspan=\"6\" style=\"font-weight: bold;\" class=\"title_b\">参数信息</td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td width=\"90px\" style=\"text-align: right;\">核电站类型:</td>";
            str += "										<td style=\"width: 150px\"><select remark=\"84\" disabled='disabled'";
            str += "											name=\"npstype\" class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\">核电站技术级别:</td>";
            str += "										<td style=\"width: 150px\"><select remark=\"85\" disabled='disabled'";
            str += "											name=\"npsgrade\" class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\">换料周期(月):</td>";
            str += "										<td style=\"width: 150px\"><input readonly";
            str += "											id=\"paramInfo_npgunitreloadingsycle\"";
            str += "											name=\"npgunitreloadingsycle\"  class=\"easyui-validatebox\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[8,2]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">锅炉压力水平:</td>";
            str += "										<td><select remark=\"22\" disabled='disabled' name=\"boilerpressure\"";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">是否特许招标:</td>";
            str += "										<td><select remark=\"30\" disabled='disabled' name=\"inviteProject\"";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">设计使用年限:</td>";
            str += "										<td><input id=\"paramInfo_npgdesignuseyear\" readonly";
            str += "											name=\"npgdesignuseyear\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[8,2]'\"></td>";
            str += "									</tr>";
            str += "								</tbody>";
            str += "							</table>";
        }
        if(isreadoly) {
            $("#loadHtmlInfo").append(str);
        }else{
            initSelect()
        }
        $.parser.parse('body');
        loadSelect();
        initValidate(parentid,parentVal);
    } else {
        $("#generatortypesub option:first").attr("selected", "selected");
        $("#generatortypethird option:first").attr("selected", "selected");
    }

    //判断浏览器类型
    var brow=$.browser;
    var bInfo="";
    $("#generatortypesub").html("");
    var str = "<option value=''>--请选择机组子类型--</option>";
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].remark == parentid) {
            var dbType = $("#subTypeInfo").val();
            if (dbType) {
                if (arr[i].value == dbType) {
                    str += "<option value="+arr[i].value+" parentid="+arr[i].parentid+" selected='selected'>"+arr[i].content+"</option>";
                }else {
                    str += "<option value="+arr[i].value+" parentid="+arr[i].parentid+">"+arr[i].content+"</option>";
                }
            }else {
                str += "<option value="+arr[i].value+" parentid="+arr[i].parentid+">"+arr[i].content+"</option>";
            }
        }
    }
    $("#generatortypesub").html(str);
    $("#generatortypethird").html("");
}


function loadSelect() {
    var str = "";
    $(".paramSelect").each(function () {
        var type = $(this).attr("remark");
        var content = $(this);
        var selectValue = $(this).attr("selectValue");
        $.ajax({
            url: top.ctx + "/dljyzx/baRegGenerator/getComboBoxData",
            type: "get",
            dataType: "json",
            data: 'type=' + type,
            success: function (data) {
                if (data) {
                    str = "";
                    str += "<option value=''>--请选择--</option>";
                    for (var i = 0; i < data.length; i++) {
                        if(selectValue == data[i].value){
                            str += "<option value=" + data[i].value + " selected='selected'>" + data[i].text + "</option>";
                        }else{
                            str += "<option value=" + data[i].value + ">" + data[i].text + "</option>";
                        }
                    }
                    content.html(str);
                }
            }
        });

    });
}
function initValidate(parentid,parentVal){
    if(parentid){
        if(parentVal == 1){
            $('#baseInfoform').validate({
                rules: {
                    generatorname: {required: true},
                    generatortype: {required: true},
                    opbegindate: {required: true},
                    gateidId:{required:true},
                    csxnjzcsgkhdgl:{required:true},
                    csxnjzcfzhl:{required:true},
                    wpskurong:{required:true},
                    csxndzskr:{required:true},
                    commercialbegindate: {required: true},
                    generatorratedcap: {required: true},
                    maxtecpower: {required: true},
                    mintecpower: {required:true},
                    wpgbasin: {required: true},
                    wpgregulatemode:{required: true}
                }
            });
        }else if(parentVal == 0){
            $('#baseInfoform').validate({
                rules: {
                    generatorname: {required: true},
                    generatortype: {required: true},
                    opbegindate: {required: true},
                    gateidId:{required:true},
                    commercialbegindate: {required: true},
                    generatorratedcap: {required: true},
                    maxtecpower: {required: true},
                    mintecpower: {required:true},
                    coalconsumeratio: {required: true},
                    timeConsumption: {required: true},
                    isbidtype: {required: true},
                    isdesulfurated: {required: true},
                    isdesalt: {required: true},
                    isheatsupply: {required: true},
                    generatorclass2: {required: true},
                    iscomprehensive: {required: true}
                }
            });
        }else if (parentVal == 3){
            $('#baseInfoform').validate({
                rules: {
                    generatorname: {required: true},
                    generatortype: {required: true},
                    opbegindate: {required: true},
                    gateidId:{required:true},
                    commercialbegindate: {required: true},
                    generatorratedcap: {required: true},
                    maxtecpower: {required: true},
                    mintecpower: {required:true},
                    isbidtype: {required: true},
                    inviteProject: {required: true},
                    generatorTowerNum: {required: true}
                }
            });
        }
    }else{
        $('#baseInfoform').validate({
            rules: {
                generatorname: {required: true},
                generatortype: {required: true},
                opbegindate: {required: true},
                commercialbegindate: {required: true},
                generatorratedcap: {required: true},
                maxtecpower: {required: true}
            }
        });
    }
}

//显示第三级节点
function initThreeNode(){

    var parentid = $("#generatortypesub option:selected").attr("parentid");
    var parentVal = $("#generatortypesub option:selected").val();
    if (parentid) {
        $("#generatortypethird option:first").removeAttr("style");
        $("#generatortypethird option:first").attr("selected","selected");
    }else {
        $("#generatortypethird option:first").removeAttr("style");
        $("#generatortypethird option:first").attr("selected","selected");
    }


    $("#generatortypethird option").each(function () {
        $(this).removeAttr("style");
        var thisRemak = $(this).attr("remark");
        if (parentid != thisRemak) {
            $(this).attr("style", "display:none");
        } else {
            $(this).removeAttr("style");
            var subType = $("#subThreeTypeInfo").val();
            if (subType) {
                if ($(this).val() == subType) {
                    $("#generatortypethird option:first").removeAttr("selected");
                    $(this).attr("selected", "selected");
                }
            }
        }
    });

    //判断浏览器类型
    var brow=$.browser;
    var bInfo="";

    var str = "<option value=''>--请选择机组三级类型--</option>";
    for (var i = 0; i < threeArr.length; i++) {
        if (threeArr[i].remark == parentid) {
            var subType = $("#subThreeTypeInfo").val();
            if (subType) {
                if (threeArr[i].value == subType) {
                    str += "<option value="+threeArr[i].value+" selected='selected'>"+threeArr[i].content+"</option>";
                }else {
                    str += "<option value="+threeArr[i].value+">"+threeArr[i].content+"</option>";
                }
            }else {
                str += "<option value="+threeArr[i].value+">"+threeArr[i].content+"</option>";
            }
        }
    }
    $("#generatortypethird").html(str);


}



$(function () {
    checkCode = $("#checkCode").val();
    $("#generatortypesub option").each(function() {
        var obj = {};
        obj.content = $(this).html();
        obj.value = $(this).attr("value");
        obj.style = $(this).attr("style");
        obj.remark = $(this).attr("remark");
        obj.parentid = $(this).attr("parentid");
        arr.push(obj);
    });
    $("#generatortypethird option").each(function() {
        var obj = {};
        obj.content = $(this).html();
        obj.value = $(this).attr("value");
        obj.style = $(this).attr("style");
        obj.remark = $(this).attr("remark");
        threeArr.push(obj);
    });
    //判断浏览器类型
    var brow=$.browser;
    var bInfo="";

    $("#generatortypesub").html("");
    var ctx = top.ctx;
    loadSelect();
    initSelect2();
    initThreeNode();
    $('#gateidName').width(205);
    $('#dcjzName').width(205);
    $('#dcjzButton').remove();
    $('#gateidButton').remove();
    $("#generatortype").change(function () {
        $("#generatortypesub").html("");
            initSelect2();
        initValidate(parentid,parentVal)
    });

    $("#generatortypesub").change(function () {
        initThreeNode();
    });

    $('input[data-action="commit"]').on('click', function () {
        if ($('#baseInfoform').valid()) {
            // 验证信息
            var flag = validateFrom();
            if(!flag){
                return;
            }
            var isValidated = $('#form').form('validate');
            if (isValidated == false) {
                return false;
            }
            // 验证信息
            var flag = validateFrom();
            if(!flag){
                return;
            }
            var url = "/dljyzx/flow/choosePerson";
            top.$.jBox.open("iframe:" + ctx + "/tag/treeProcess?url=" + encodeURIComponent(url), "人员信息", 300, 420, {
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
                        $('input[name=userId]').val(ids.toString())
                        if(!$('input[name=userId]').val()){
                            top.$.jBox.alert('请选择下一个节点接收人！', "消息");
                            return false;
                        }
                        var formData = new FormData($("#baseInfoform")[0])
                        $.ajax({
                            url: top.ctx + "/dljyzx/baRegGenerator/submitForReview?checkcode="+checkCode,
                            type: "POST",
                            data: formData,
                            async: false,
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function (data) {
                                if (data) {
                                    var flowInfo = getFlowInfo();
                                    var generatorid = data.generatorid;
                                    // var gdjcjMessage=gdjcj(generatorid);
                                    var level1 = 95412001;
                                    var level2 = '';
                                    var level3 = '';
                                    if (flowInfo.count == 0) {
                                        top.$.jBox.alert('消息', "请先定义一个外网侧的流程");
                                        return ;
                                    } else if (flowInfo.count != 1) {
                                        top.$.jBox.alert('消息', "外网侧的流程只能定义一个!");
                                        return ;
                                    }else{
                                        var flowName=flowInfo.flowname;
                                        var flowId = flowInfo.flowid;
                                        var flowNode=getFlowNodeInfo(flowId);
                                        if (!flowNode.result) {
                                            top.$.jBox.alert('消息', "请先配置下一个流程节点");
                                            return ;
                                        } else if (!flowNode.jsname) {
                                            top.$.jBox.alert('消息', "请先配置下一个节点接收人！");
                                            return ;
                                        }else{
                                            var flowInstName = "";
                                            flowInstName = flowName + "-" + data.generatorname+"-机组注册";
                                            var json={
                                                flowId:flowId,
                                                flowName:flowName,
                                                flowInstName : flowInstName,
                                                userIds : $('input[name=userId]').val(),
                                                generatorId : generatorid,
                                                level1 : level1,
                                                level1 : level2,
                                                level1 : level3,

                                            };
                                            /*sendFlow(json);*/
                                        }
                                    }
                                }
                                top.$.jBox.alert( "提交成功！",'消息');
                                window.location.href = top.ctx +"/dljyzx/baRegGenerator/baRegGeneratorRecording"
                            }

                        })
                    }
                    else if (v == "clear") {
                    }
                },
                loaded: function (h) {
                    $(".jbox-content", top.document).css("overflow-y", "hidden");
                }
            });
        }
    })
    //获取流程信息
    function getFlowInfo() {
        var message = '';
        $.ajax({
            url: ctx + "/dljyzx/flow/getFlowInfo",
            async: false,
            type: "post",
            dataType: "json",
            success: function (data) {
                message = data;
            }
        });
        return message;
    }

    function gdjcj(generatorId){
        var message = '';
        $.ajax({
            url: ctx + "/dljyzx/baRegGenerator/gdjcj",
            async: false,
            type: "post",
            dataType: "json",
            data:{
                generatorId:generatorId
            },
            success: function (data) {
                message=data;
            }
        });
        return message;
    }

    function getFlowNodeInfo(flowId) {
        var message = '';
        $.ajax({
            url: ctx + "/dljyzx/flow/getFlowNodeInfo",
            async: false,
            type: "post",
            dataType: "json",
            data:{
                flowid:flowId
            },
            success: function (data) {
                message=data;
            }
        });
        return message;
    }

    function sendFlow(json) {
        $.ajax({
            url: ctx + "/dljyzx/flow/sendGeneratorFlow?checkcode="+checkCode,
            async: false,
            type: "post",
            dataType: "json",
            data: {
                flowid: json.flowId,
                flowName: json.flowName,
                flowInstName:json.flowInstName,
                generatorId: json.generatorId,
                level1:json.level1,
                level2: json.level2,
                level3: json.level3,
                userIds: json.userIds,
                isRegisterFlow:'true'//机组注册标识
            },
            success: function (data) {
                if (data) {
                    if (data.flag=="success") {
                        top.$.jBox.tip('提交成功');
                        location.href = top.ctx + "/dljyzx/baRegGenerator/baRegGeneratorInfos";
                    }
                }
            }
        });
    }

    //注册用户登陆后保存
    $('input[data-action="save"]').on('click', function () {
        if ($('#baseInfoform').valid()) {
            // 验证信息
            var flag = validateFrom();
            if(!flag){
                return;
            }
            /* var arr = [];
             $(".Wdate").each(function() {
                 var entity = {};
                 entity.id = this.id;
                 entity.value = $(this).val();
                 arr.push(entity);
             });
             var flagDate = false;
             for (var i = 0; i < arr.length; i++) {
                 var temp;
                 if (arr[i].id=="exitMarketDate") {
                     temp = arr[i].value;
                 }
                 for (var j = 0; j < arr.length; j++) {
                     if (arr[j].value>temp) {
                         flagDate = true;
                     }
                 }
             }
             if (flagDate) {
                 top.jBox.alert("退市日期必须最大!");
                 return;
             }
             var isValidated = $('#form').form('validate');
             if (isValidated == false) {
                 return false;
             }*/
            // 验证信息
            var flag = validateFrom();
            if(!flag){
                return;
            }
            var formData = new FormData($("#baseInfoform")[0])
            $.ajax({
                url: top.ctx + "/dljyzx/baRegGenerator/submitForReview?checkcode="+checkCode,
                type: "POST",
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data) {
                        top.jBox.alert("保存成功");
                    }
                }

            })
        }
    })
});


$('input[data-action="commitNoFlow"]').on('click', function () {
        if ($('#baseInfoform').valid()) {
            //判断是否有核准 文件
            var guid = $("#generatorid").val();
            var typeFlag=false;
            $.ajax({
                url: "fileListBareg",
                type: 'post',
                async: false,
                dataType: "json",
                data: "generatorid=" + guid,
                success: function (data) {
                    if (data) {
                        for (var i = 0; i < data.length; i++) {
                            var affixtype=data[i].affixtype
                            if(affixtype==4){
                                typeFlag=true;
                                break;
                            }
                        }

                    }
                }
            });
            if(!typeFlag){
                top.$.jBox.alert("请上传建设核准文件!");
                return;
            }
            // 验证信息
            var flag = validateFrom();
            if(!flag){
                return;
            }
            var isValidated = $('#baseInfoform').form('validate');
            if (isValidated == false) {
                return false;
            }
            // 验证信息
            var flag = validateFrom();
            if(!flag){
                return;
            }
            $('input[data-action="commitNoFlow"]').attr('disabled',"true");
            var formData = new FormData($("#baseInfoform")[0])
            $.ajax({
                url: top.ctx + "/dljyzx/baRegGenerator/submitForReviewRegist?checkcode="+checkCode,
                type: "POST",
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data) {
                        var generatorid = data.generatorid;
                        if (data!=null) {
                            top.$.jBox.alert("新增成功!");
                            window.location.href= top.ctx+"/dljyzx/baRegGenerator/baRegGeneratorInfosRegist?type=regist&participantid="+getQueryString("participantid");
                        }
                    }
                }
            })
        }
    })


    //获取流程信息
    function getFlowInfo() {
        var message = '';
        $.ajax({
            url: ctx + "/dljyzx/flow/getFlowInfo",
            async: false,
            type: "post",
            dataType: "json",
            success: function (data) {
                message = data;
            }
        });
        return message;
    }

    function gdjcj(generatorId){
        var message = '';
        $.ajax({
            url: ctx + "/dljyzx/baRegGenerator/gdjcj",
            async: false,
            type: "post",
            dataType: "json",
            data:{
                generatorId:generatorId
            },
            success: function (data) {
                message=data;
            }
        });
        return message;
    }

    function getFlowNodeInfo(flowId) {
        var message = '';
        $.ajax({
            url: ctx + "/dljyzx/flow/getFlowNodeInfo",
            async: false,
            type: "post",
            dataType: "json",
            data:{
                flowid:flowId
            },
            success: function (data) {
                message=data;
            }
        });
        return message;
    }

    function sendFlow(json) {
        $.ajax({
            url: ctx + "/dljyzx/flow/sendGeneratorFlow?checkcode="+checkCode,
            async: false,
            type: "post",
            dataType: "json",
            data: {
                flowid: json.flowId,
                flowName: json.flowName,
                flowInstName:json.flowInstName,
                generatorId: json.generatorId,
                level1:json.level1,
                level2: json.level2,
                level3: json.level3,
                userIds: json.userIds,
                isRegisterFlow:'true'//机组注册标识
            },
            success: function (data) {
                if (data) {
                    if (data.flag=="success") {
                        top.$.jBox.tip('提交成功');
                        location.href = top.ctx + "/dljyzx/baRegGenerator/baRegGeneratorInfos";
                    }
                }
            }
        });
    }

    //注册用户登陆后保存
    $('input[data-action="save"]').on('click', function () {
        if ($('#baseInfoform').valid()) {
            // 验证信息
            var flag = validateFrom();
            if(!flag){
                return;
            }
            /* var arr = [];
             $(".Wdate").each(function() {
                 var entity = {};
                 entity.id = this.id;
                 entity.value = $(this).val();
                 arr.push(entity);
             });
             var flagDate = false;
             for (var i = 0; i < arr.length; i++) {
                 var temp;
                 if (arr[i].id=="exitMarketDate") {
                     temp = arr[i].value;
                 }
                 for (var j = 0; j < arr.length; j++) {
                     if (arr[j].value>temp) {
                         flagDate = true;
                     }
                 }
             }
             if (flagDate) {
                 top.jBox.alert("退市日期必须最大!");
                 return;
             }
             var isValidated = $('#form').form('validate');
             if (isValidated == false) {
                 return false;
             }*/
            // 验证信息
            var flag = validateFrom();
            if(!flag){
                return;
            }
            var formData = new FormData($("#baseInfoform")[0])
            $.ajax({
                url: top.ctx + "/dljyzx/baRegGenerator/submitForReview?checkcode="+checkCode,
                type: "POST",
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data) {
                        top.jBox.alert("保存成功");
                    }
                }

            })
        }
    })

$(document).ready(function () {
	checkCode = $("#checkCode").val();
    var urlData = parseUrlQuery();
    generatorid = urlData.generatorId;
    dataStatus = $("#dataStatus").val();
    generatortype = urlData.generatorType;


    //流程页面进入
    var processFlag = $('input[name=processFlag]').val();
    if (processFlag) {
        $('#button_2').show();
        $('.xie ').hide();
        $('.isSave').hide();
        $('.isBack').hide();
    }
    var orderNo = $('input[name=orderNo]').val();
    var isAdd = $('input[name=isAdd]').val(); //是否是新增机组的标识
    var xuhao = $('input[name=xuhao]').val(); //流程序号
    var isOfficial = $('input[name=isOfficial]').val(); //生效的机组的标识
    if (orderNo) {
        if (orderNo == '1') {//如果流程ID为第一步的的情况下(说明在本人手上)，保存和提交审核都存在
            $('#btnCancel').show();
        } else if (orderNo == '2') {//如果流程在第二步的情况下，只能撤回
            $('#btnCancel').show();
            $('.isSave').hide();
            $('.isSubmit').hide();
        } else {//如果流程走到第三步或以上的情况下，只能查看，所有操作都禁止
            $('#button_2').hide();
        }
    } else {
        //未生效的机组才可以删除
        if(!isOfficial){
            $('.isDelete').show();
        }

    }

    //如果流程序号大于2 说明该流程已经被人审核过 不可以撤销
    if(xuhao>2){
        $('#btnCancel').hide();
    }

    var isRegist = $('input[name=isRegist]').val();//注册用户登陆的标识
    if (isRegist) {
        $('.button_2').show();
        $('.isSubmit').hide();
        $('.isDelete').hide();
    };

    //用户点击删除 只有新增的机组才可以删除
    $('.isDelete').on('click', function () {
        top.$.jBox.confirm('是否删除？', '', function (v, h, f) {
            if (v == 'ok') {
                var generatorId = $('input[name=generatorid]').val();//机组ID
                $.post(top.ctx + "/dljyzx/baRegGenerator/isDelete?checkcode="+checkCode, {generatorId: generatorId}, function (data) {
                    if (data > 0) {
                        top.$.jBox.tip('删除成功');
                        window.location.href = top.ctx + "/dljyzx/baRegGenerator/baRegGeneratorInfos";
                    }
                })
            }
        })

    })
    $("select").change(function(){
    	isUpdateFlag = true;
	});
	$("input").change(function(){
		isUpdateFlag = true;
	});
    $(".Wdate").each(function() {
		var obj = {};
		obj.id = this.id;
		obj.value = $(this).val();
		oldTimeArr.push(obj);
	});
});


function validateFrom(){
	var message = "";
    var generatorname = $('#generatorname').val();//机组名称
    var generatortype = $("#generatortype option:selected").val();//机组类型
    var gateidId = $('#gateidId').val();//地理区域
    var opbegindate = $('#opbegindate').val();//首次并网时间
    var commercialbegindate = $('#commercialbegindate').val();//试运结束时间
    var dcjzId = $('#dcjzId').val();//调度单位
    var generatorratedcap = $('#generatorratedcap').val();//额定容量(MW)
    var maxtecpower = $('#maxtecpower').val();//最大技术出力(MW)
    var mintecpower = $('#mintecpower').val();//最小技术出力(MW)
    if (!gateidId) {
        top.jBox.alert('地理区域不能为空');
        return;
    }
    if (!dcjzId) {
        top.jBox.alert('调度单位不能为空');
        return;
    }
    if(generatorname == "" || generatortype=="" || gateidId=="" || opbegindate=="" || commercialbegindate=="" || dcjzId==""
        || generatorratedcap=="" || maxtecpower=="" || mintecpower==""){
        return false;
    }

    return true;
}


/**
 * 保存验证
 * @returns
 */
function JqValidate() {
    return $('#param_info_form').validate({
        rules: {
            generatorname: {required: true},
            generatortype: {required: true},
            opbegindate: {required: true},
            generatorratedcap: {required: true},
            maxtecpower: {required: true},
            wpgregulatemode: {required: true}
        }
    });
}
/**
 * 保存操作
 */
function save() {

    // var isValidated = $('#param_info_form').form('validate');
    // if (isValidated == false) {
    //     return false;
    // }
    var ctx = top.ctx;
    var isOk = $('#param_info_form').valid();
    if (isOk == false) {
        return false;
    }

    // 验证信息
    var flag = validateFrom();
    if(!flag){
        return;
    }

    /*var arr = [];
	$(".Wdate").each(function() {
		var entity = {}; 
		entity.id = this.id;
		entity.value = $(this).val();
		arr.push(entity);
	});
	var flagDate = false;
	for (var i = 0; i < arr.length; i++) {
		var temp;
		if (arr[i].id=="exitMarketDate") {
			temp = arr[i].value; 
		}
		for (var j = 0; j < arr.length; j++) {
			if (arr[j].value>temp) {
				flagDate = true;
			}
		}
	}
	if (flagDate) {
		top.jBox.alert("停运日期必须最大!");
		return;
	}*/
    if (JqValidate()) {
        var valiResult = JqValidate();
        var newUrl = "saveOrUpdateBaGeneratorInfo";
        if (JqValidate()) {
            var json=$("#param_info_form").serialize();
            $.ajax({
                url:ctx+"/dljyzx/baRegGenerator/saveOrUpdata?checkcode="+checkCode,
                data:json,
                type: "post",
                async: false,
                success:function (data) {
                    if(data&&data.successful){
                        var isRegist=$('input[name=isRegist]').val();
                        if(isRegist){
                            top.$.jBox.alert('保存成功');
                            window.location.href = top.ctx + "/dljyzx/baRegGenerator/baRegGeneratorInfos";
                        }else{
                            top.$.jBox.alert('保存成功');
                        }

                    }
                }
            })
        }
    }
}


function saveRegist() {

    var isValidated = $('#param_info_form').form('validate');
    if (isValidated == false) {
        return false;
    }

    var isOk = $('#param_info_form').valid();
    if (isOk == false) {
        return false;
    }
    // 验证信息
    var flag = validateFrom();
    if(!flag){
        return;
    }
    var valiResult = JqValidate();
    if (JqValidate()) {
        var formData = new FormData($("#param_info_form")[0])
        $.ajax({
            url: "saveOrUpdateBaGeneratorInfoRegist",
            type: "POST",
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data) {
                    var generatorid = data.generatorid;
                    if (data != null) {
                        top.$.jBox.alert("修改成功!");
                        window.location.href = "baRegGeneratorInfosRegist?type=regist&participantid=" + getQueryString("participantid");
                    }
                }
            }
        })
    }


}

/**
 * 提交审批
 */
function submitProcess() {
	$(".Wdate").each(function() {
		var obj = {};
		obj.id = this.id;
		obj.value = $(this).val();
		newTimeArr.push(obj);
	});
	for (var i = 0; i < newTimeArr.length; i++) {
		if (newTimeArr[i]!=oldTimeArr[i]) {
			isUpdateFlag = true;
		}
	}

    var isOk = $('#param_info_form').valid();
    if (isOk) {
        // 验证信息
        var flag = validateFrom();
        if(!flag){
            return;
        }
        var ctx = top.ctx;
        var processFlag = $('input[name=processFlag]').val();
        var activityInstId = $('input[name=activityInstId]').val();
        var businessId = $('input[name=businessId]').val();
        var orderNo = $('input[name=orderNo]').val();
        var isValidated = $('#form').form('validate');
        if (isValidated == false) {
            return false;
        }
        if (JqValidate()) {
            if (JqValidate()) {
                var json=$("#param_info_form").serialize();
                var checkCode=$('#checkCode').val();
                var formData = new FormData($("#param_info_form")[0])
                $.ajax({
                    url: top.ctx + "/dljyzx/baRegGenerator/submitForReview?checkcode="+checkCode,
                    type: "POST",
                    data: formData,
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if (data) {
                            var flowInfo = getFlowInfo();
                            var generatorid = data.generatorid;
                            // var gdjcjMessage=gdjcj(generatorid);
                            var level1 = 95412001;
                            var level2 = '';
                            var level3 = '';
                            if (flowInfo.count == 0) {
                                top.$.jBox.alert('消息', "请先定义一个外网侧的流程");
                                return ;
                            } else if (flowInfo.count != 1) {
                                top.$.jBox.alert('消息', "外网侧的流程只能定义一个!");
                                return ;
                            }else{
                                var flowName=flowInfo.flowname;
                                var flowId = flowInfo.flowid;
                                var flowNode=getFlowNodeInfo(flowId);
                                if (!flowNode.result) {
                                    top.$.jBox.alert('消息', "请先配置下一个流程节点");
                                    return ;
                                } else if (!flowNode.jsname) {
                                    top.$.jBox.alert('消息', "请先配置下一个节点接收人！");
                                    return ;
                                }else{
                                    var flowInstName = "";
                                    flowInstName = flowName + "-" + data.generatorname+"-机组注册";
                                    var json={
                                        flowId:flowId,
                                        flowName:flowName,
                                        flowInstName : flowInstName,
                                        userIds : $('input[name=userId]').val(),
                                        generatorId : generatorid,
                                        level1 : level1,
                                        level1 : level2,
                                        level1 : level3,

                                    };
                                   /* sendFlow(json);*/
                                }
                            }
                        }
                        top.$.jBox.alert( "提交成功！",'消息');
                        window.location.href = top.ctx +"/dljyzx/baRegGenerator/baRegGeneratorRecording"

                    }

                })
            }else{
                return false;
            }
        }

    }
}
function updateProcess(){
    $(".Wdate").each(function() {
        var obj = {};
        obj.id = this.id;
        obj.value = $(this).val();
        newTimeArr.push(obj);
    });
    for (var i = 0; i < newTimeArr.length; i++) {
        if (newTimeArr[i]!=oldTimeArr[i]) {
            isUpdateFlag = true;
        }
    }

    var isOk = $('#param_info_form').valid();
    if (isOk) {
        // 验证信息
        var flag = validateFrom();
        if(!flag){
            return;
        }
        var ctx = top.ctx;
        var processFlag = $('input[name=processFlag]').val();
        var activityInstId = $('input[name=activityInstId]').val();
        var businessId = $('input[name=businessId]').val();
        var orderNo = $('input[name=orderNo]').val();
        var isValidated = $('#form').form('validate');
        if (isValidated == false) {
            return false;
        }
        if (JqValidate()) {
                var json=$("#param_info_form").serialize();
                var checkCode=$('#checkCode').val();
                var formData = new FormData($("#param_info_form")[0])
                $("#updateSave").removeAttr("onclick");
               $.ajax({
                    url: top.ctx + "/dljyzx/historyrecord/baGenerator/updateForReview?checkcode="+checkCode,
                    type: "POST",
                    data: formData,
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        console.log(data);
                        if (data) {
                            var flowInfo = getFlowInfo();
                            var generatorid = data.generatorid;
                            var level1 = 95412001;
                            var level2 = '';
                            var level3 = '';
                            if (flowInfo.count == 0) {
                                top.$.jBox.alert('消息', "请先定义一个外网侧的流程");
                                return ;
                            } else if (flowInfo.count != 1) {
                                top.$.jBox.alert('消息', "外网侧的流程只能定义一个!");
                                return ;
                            }else{
                                var flowName=flowInfo.flowname;
                                var flowId = flowInfo.flowid;
                                var flowNode=getFlowNodeInfo(flowId);
                                if (!flowNode.result) {
                                    top.$.jBox.alert('消息', "请先配置下一个流程节点");
                                    return ;
                                } else if (!flowNode.jsname) {
                                    top.$.jBox.alert('消息', "请先配置下一个节点接收人！");
                                    return ;
                                }else{
                                    var flowInstName = "";
                                    flowInstName = flowName + "-" + data.generatorname+"-机组注册";
                                    var json={
                                        flowId:flowId,
                                        flowName:flowName,
                                        flowInstName : flowInstName,
                                        userIds : $('input[name=userId]').val(),
                                        generatorId : generatorid,
                                        level1 : level1,
                                        level1 : level2,
                                        level1 : level3,
                                    };
                                }
                            }
                        }
                        top.$.jBox.alert( "提交成功！", "消息");
                        window.location.href = top.ctx +"/dljyzx/historyrecord/baGenerator/effectiveUnit"
                    }
                })
            }else{
                top.$.jBox.alert("提交失败！",'消息');
                return false;
        }
    }
}



function sendFlow(json,isOfficial) {
    var officialFlag=true;
    if(isOfficial){
        officialFlag=false
    }    var ctx = top.ctx;
    $.ajax({
        url: ctx + "/dljyzx/flow/sendGeneratorFlow?checkcode="+checkCode,
        async: false,
        type: "post",
        dataType: "json",
        data: {
            flowid: json.flowId,
            flowName: json.flowName,
            flowInstName: json.flowInstName,
            generatorId: json.generatorId,
            level1: json.level1,
            level2: json.level2,
            level3: json.level3,
            userIds: json.userIds,
            isRegisterFlow: officialFlag//机组注册标识
        },
        success: function (data) {
            if (data.flag == "success") {
                top.$.jBox.tip('提交审批成功');
                window.location.href = ctx + "/dljyzx/baRegGenerator/baRegGeneratorInfos";
            }
        }
    });
}

function gdjcj(generatorId) {
    var ctx = top.ctx;
    var message = '';
    $.ajax({
        url: ctx + "/dljyzx/baRegGenerator/gdjcj",
        async: false,
        type: "post",
        dataType: "json",
        data: {
            generatorId: generatorId
        },
        success: function (data) {
            message = data;
        }
    });
    return message;
}

//获取流程信息
function getFlowInfo() {
    var ctx = top.ctx;
    var message = '';
    $.ajax({
        url: ctx + "/dljyzx/flow/getFlowInfo",
        async: false,
        type: "post",
        dataType: "json",
        success: function (data) {
            message = data;
        }
    });
    return message;
}

function getFlowNodeInfo(flowId) {
    var ctx = top.ctx;
    var message = '';
    $.ajax({
        url: ctx + "/dljyzx/flow/getFlowNodeInfo",
        async: false,
        type: "post",
        dataType: "json",
        data: {
            flowid: flowId
        },
        success: function (data) {
            message = data;
        }
    });
    return message;
}
//重新提交流程
function subProcees(businessId, activityInstId) {
    var ctxUrl = parent.ctx;
    $.ajax({
        url: ctxUrl + '/dljyzx/bacommonflowinfo/next',
        type: "post",
        async: false,
        dataType: "json",
        data: {
            activityInstId: activityInstId
        },
        success: function (data) {
            if (data.msg == 'successful') {
                var treeUrl = '/dljyzx/baWaitdo/getRoot';
                top.$.jBox.open("iframe:" + ctxUrl + "/tag/treeProcess?url=" + encodeURIComponent(treeUrl)
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
                    // closed: function () {
                    //     var processFlag = $('input[name=processFlag]').val();
                    //     if (processFlag) {
                    //         // localStorage.setItem("processSuccess", "processSuccess");//流程提交成功的标识
                    //         // top.jBox.close(true);
                    //     } else {
                    //         // top.$.jBox.tip('提交审批成功');
                    //         // window.location.href = ctx + "/dljyzx/baRegGenerator/baRegGeneratorInfos";
                    //     }
                    //
                    // }
                });
                //最后节点
            }
        },
        error: function () {
        }
    });
}
function flowProcess(ids, returnVal, outcome) {
    var ctxUrl = parent.ctx;
    var activityInstId = $('input[name=activityInstId]').val();//流程实例id
    var businessid = $('input[name=businessId]').val();//业务ID
    var checkCode = $('#checkCode').val();//业务ID
    // var textarea = $('.istextarea').val();//审批意见
    $.ajax({
        url: ctxUrl + "/dljyzx/flow/tasksSave?checkcode="+checkCode,
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
            flag:"flag"
        },
        success: function (data) {
            if (data.msg && data.msg == 'success') {
                var processFlag = $('input[name=processFlag]').val();
                if (processFlag) {
                    if (returnVal == '1') {
                        localStorage.setItem("processSuccess", "processSuccess");//流程提交成功的标识
                        top.jBox.close(true);
                    }
                }else{
                    if (returnVal == '1') {
                        var generatortype=$('#generatortype').val();
                        top.$.jBox.tip('提交成功');
                        window.location.href = top.ctx + "/dljyzx/baRegGenerator/getBaRegGeneratorInfo?generatorId="+$('input[name=generatorid]').val()+"&generatorType="+generatortype;
                    }
                }

            } else {
                top.$.jBox.error('提交失败');
            }
        },
        error: function () {

        }

    });
}
function parseUrlQuery() {
    var data = {};

    var url = location.href;
    if (url.indexOf('?') == -1) {
        return data;
    }

    var query = url.substring(url.indexOf('?') + 1);
    var kvs = query.split("&");
    for (var i = 0; i < kvs.length; i++) {
        var kv = kvs[i];
        var _kv = kv.split("=");
        data[_kv[0]] = _kv[1];
    }

    return data;
};

function loadGridData(pageNum) {
    var url = "baRegGeneratorInfos";
    $.get(url, function (data) {
        console.log(data);
        window.open(data);
    });
}


function goBack() {
    history.back();
}
