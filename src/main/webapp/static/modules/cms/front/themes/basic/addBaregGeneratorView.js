var arr = [];
var threeArr = [];
var checkCode = "";
function back() {
    window.history.back();
}
var parentid;
var parentVal;
function initSelect() {
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
            str += "										<td style=\"width: 150px\"><input";
            str += "											id=\"paramInfo_avgaddspeed\" name=\"avgaddspeed\"";
            str += "											 class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\">平均减出力速度(MW/min):</td>";
            str += "										<td style=\"width: 150px\"><input";
            str += "											id=\"paramInfo_avgremovespeed\" name=\"avgremovespeed\"";
            str += "											 class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\">下水库容量(km3):</td>";
            str += "										<td style=\"width: 150px\"><select remark=\"91\"";
            str += "											name=\"csxndzskr\" class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">抽发转换率(%):</td>";
            str += "										<td><input id=\"paramInfo_csxnjzcfzhl\" name=\"csxnjzcfzhl\"";
            str += "											 class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[2,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">抽水工况额定容量(MW):</td>";
            str += "										<td><input id=\"paramInfo_csxnjzcsgkhdgl\"";
            str += "											name=\"csxnjzcsgkhdgl\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">抽水转发电一次功率(MW):</td>";
            str += "										<td><input id=\"paramInfo_csxnjzcszfdyccgl\"";
            str += "											name=\"csxnjzcszfdyccgl\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">单机额定抽水工况可持续时间(h):</td>";
            str += "										<td><input id=\"paramInfo_csxnjzdjhdcsgkkcxsj\"";
            str += "											name=\"csxnjzdjhdcsgkkcxsj\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">单机额定发电工况可持续时间(h):</td>";
            str += "										<td><input id=\"paramInfo_csxnjzdjhdfdgckcxsj\"";
            str += "											name=\"csxnjzdjhdfdgckcxsj\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">发电转抽水一次功率(MW):</td>";
            str += "										<td><input id=\"paramInfo_csxnjzfdzcsyccgl\"";
            str += "											name=\"csxnjzfdzcsyccgl\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">有无AGC调整装置:</td>";
            str += "										<td><select remark=\"30\" name=\"ifagcfm\"";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">有无一次调频装置:</td>";
            str += "										<td><select remark=\"115\" name=\"ifoncefm\"";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">是否特许招标:</td>";
            str += "										<td><select remark=\"30\" name=\"inviteProject\"";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">最高水位(m):</td>";
            str += "										<td><input id=\"paramInfo_largestpower\"";
            str += "											name=\"largestpower\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">死水位(m):</td>";
            str += "										<td><input id=\"paramInfo_largestpowerinleast\"";
            str += "											name=\"largestpowerinleast\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">最小有功出力(MW):</td>";
            str += "										<td><input id=\"paramInfo_leastpower\" name=\"leastpower\"";
            str += "											 class=\"easyui-validatebox\" tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">一次调频转速不等率(%):</td>";
            str += "										<td><input id=\"paramInfo_oncefmrate\" name=\"oncefmrate\"";
            str += "											 class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[2,2]'\"></td>";
            str += "										<td style=\"text-align: right;\">一次调频动作死区:</td>";
            str += "										<td><input id=\"paramInfo_oncefmtodeath\"";
            str += "											name=\"oncefmtodeath\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'special[36]'\"></td>";
            str += "										<td style=\"text-align: right;\">启到停的最小时间间隔(h):</td>";
            str += "										<td><input id=\"paramInfo_opentostopspace\"";
            str += "											name=\"opentostopspace\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[2,2]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">停到启的最小时间间隔(h):</td>";
            str += "										<td><input id=\"paramInfo_stoptoopenspace\"";
            str += "											name=\"stoptoopenspace\" maxlength=\"2\"";
            str += "											data-options=\"validType:'floatNumToNum[2,2]'\"></td>";
            str += "										<td style=\"text-align: right;\"><a style=\"color: red\">*</a>所属河流流域:</td>";
            str += "										<td><select remark=\"90\" name=\"wpgbasin\"";
            str += "											class=\"paramSelect  required\">";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\"><a style=\"color: red\">*</a>调节方式:</td>";
            str += "										<td><select remark=\"86\" name=\"wpgregulatemode\"";
            str += "											class=\"paramSelect  required\">";
            str += "										</select></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">水头分类:</td>";
            str += "										<td><select remark=\"89\" name=\"wpgshuitoufenlei\"";
            str += "											class=\"paramSelect\">";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">水电站库容(km3):</td>";
            str += "										<td><input id=\"paramInfo_wpskurong\" name=\"wpskurong\"";
            str += "											 class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">抽水蓄能机组年租赁费(万):</td>";
            str += "										<td><input id=\"paramInfo_zlscsxnjznzlf\"";
            str += "											name=\"zlscsxnjznzlf\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[10,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">租赁费分摊电网公司占比(%):</td>";
            str += "										<td><input id=\"paramInfo_zlscsxnjzzlfftbDwgs\"";
            str += "											name=\"zlscsxnjzzlfftbDwgs\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[2,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">租赁费分摊发电企业占比(%):</td>";
            str += "										<td><input id=\"paramInfo_zlscsxnjzzlfftbFdqy\"";
            str += "											name=\"zlscsxnjzzlfftbFdqy\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[2,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">租赁费分摊社会用户占比(%):</td>";
            str += "										<td><input id=\"paramInfo_zlscsxnjzzlfftbShyh\"";
            str += "											name=\"zlscsxnjzzlfftbShyh\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[2,4]'\"></td>";
            str += "									</tr>";
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
            str += "										<td style=\"width: 150px\"><select remark=\"22\"";
            str += "											name=\"boilerpressure\" class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\"><a style=\"color: red\">*</a>发电标煤耗(g/kWh):</td>";
            str += "										<td style=\"width: 150px\"><input";
            str += "											id=\"paramInfo_coalconsumeratio\" name=\"coalconsumeratio\"";
            str += "											 class=\"easyui-validatebox\"";
            str += "											data-options=\"required:true,validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\"><a style=\"color: red\">*</a>供电标煤耗(g/kWh):</td>";
            str += "										<td style=\"width: 150px\"><input";
            str += "											id=\"paramInfo_timeConsumption\" name=\"timeConsumption\"";
            str += "											 class=\"easyui-validatebox\" tipbottom=\"true\"";
            str += "											data-options=\"required:true,validType:'floatNumToNum[8,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\"><a style=\"color: red\">*</a>是否分布式:</td>";
            str += "										<td><select remark=\"30\" name=\"isbidtype\"";
            str += "											class=\"paramSelect required\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">是否联合循环:</td>";
            str += "										<td><select remark=\"30\" name=\"isccunitmode\"";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">是否风冷:</td>";
            str += "										<td><select remark=\"30\" name=\"iscoldbyair\"";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\"><a style=\"color: red\">*</a>是否脱硝:</td>";
            str += "										<td><select remark=\"30\" name=\"isdesalt\"";
            str += "											class=\"paramSelect required\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">脱硝认定日期:</td>";
            str += "										<td>";
            str += "									<input id=\"opbegindate\" name=\"desaltdate\" type=\"text\"";
            str += "									readonly=\"readonly\" maxlength=\"20\"";
            str += "									class=\"input-big Wdate\"";
            str += "									onclick=\"WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:true});\" />";
            str += "											</td>";
            str += "										<td style=\"text-align: right;\">脱硝效率(%):</td>";
            str += "										<td><input id=\"paramInfo_desaltpetreratio\"";
            str += "											name=\"desaltpetreratio\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[2,6]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\"><a style=\"color: red\">*</a>是否脱硫:</td>";
            str += "										<td><select remark=\"30\" name=\"isdesulfurated\"";
            str += "											class=\"paramSelect required\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">脱硫认定日期:</td>";
            str += "										<td>";
            str += "									<input id=\"opbegindate\" name=\"desulfurateddate\" type=\"text\"";
            str += "									readonly=\"readonly\" maxlength=\"20\"";
            str += "									class=\"input-big Wdate\"";
            str += "									onclick=\"WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:true});\" />";
            str += "											</td>";
            str += "										<td style=\"text-align: right;\">脱硫效率(%):</td>";
            str += "										<td><input id=\"paramInfo_desulfurateratio\"";
            str += "											name=\"desulfurateratio\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[2,6]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\"><a style=\"color: red\">*</a>是否除尘:</td>";
            str += "										<td><select remark=\"30\" name=\"generatorclass2\"";
            str += "											class=\"paramSelect required\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">除尘认定日期:</td>";
            str += "										<td>";
            str += "									<input id=\"opbegindate\" name=\"desdirtdate\" type=\"text\"";
            str += "									readonly=\"readonly\" maxlength=\"20\"";
            str += "									class=\"input-big Wdate\"";
            str += "									onclick=\"WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:true});\" />";
            str += "											</td>";
            str += "										<td style=\"text-align: right;\">除尘效率(%):</td>";
            str += "										<td><input id=\"paramInfo_dustratio\" name=\"dustratio\"";
            str += "											 class=\"easyui-validatebox\" tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">有无AGC调整装置</td>";
            str += "										<td><select remark=\"30\" name=\"ifagcfm\"";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">有无一次调频装置:</td>";
            str += "										<td><select remark=\"115\" name=\"ifoncefm\"";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\"><a style=\"color: red\">*</a>是否供热:</td>";
            str += "										<td><select remark=\"30\" name=\"isheatsupply\"";
            str += "											class=\"paramSelect required\">";
            str += "";
            str += "										</select></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">供热类型:</td>";
            str += "										<td><select remark=\"114\" name=\"grjzlx\"";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">最大供热流量(t/h):</td>";
            str += "										<td><input id=\"paramInfo_jzgzdgrllnl\" name=\"jzgzdgrllnl\"";
            str += "											 class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">平均供热流量(t/h):</td>";
            str += "										<td><input id=\"paramInfo_pjgrll\" name=\"pjgrll\"";
            str += "											 class=\"easyui-validatebox\" tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">热态启动并网时间(h):</td>";
            str += "										<td><input id=\"paramInfo_hotstarttime\"";
            str += "											name=\"hotstarttime\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[2,2]'\"></td>";
            str += "										<td style=\"text-align: right;\">冷态启动并网时间(h):</td>";
            str += "										<td><input id=\"paramInfo_coldstarttime\"";
            str += "											name=\"coldstarttime\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[2,2]'\"></td>";
            str += "										<td style=\"text-align: right;\">温态启动并网时间(h):</td>";
            str += "										<td><input id=\"paramInfo_warmstarttime\"";
            str += "											name=\"warmstarttime\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[2,2]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\"><a style=\"color: red\">*</a>是否资源综合利用:</td>";
            str += "										<td><select remark=\"30\" name=\"iscomprehensive\"";
            str += "											class=\"paramSelect required\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">资源综合利用认定时间:</td>";
            str += "										<td>";
            str += "									<input id=\"opbegindate\" name=\"tradeRunDate\" type=\"text\"";
            str += "									readonly=\"readonly\" maxlength=\"20\"";
            str += "									class=\"input-big Wdate\"";
            str += "									onclick=\"WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:true});\" />";
            str += "											</td>";
            str += "										<td style=\"text-align: right;\">一次调频转速不等率(%):</td>";
            str += "										<td><input id=\"paramInfo_oncefmrate\" name=\"oncefmrate\"";
            str += "											 class=\"easyui-validatebox\" tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[2,2]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">一次调频动作死区:</td>";
            str += "										<td><input id=\"paramInfo_oncefmtodeath\"";
            str += "											name=\"oncefmtodeath\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'special[36]'\"></td>";
            str += "										<td style=\"text-align: right;\">启到停的最小时间间隔(h):</td>";
            str += "										<td><input id=\"paramInfo_opentostopspace\"";
            str += "											name=\"opentostopspace\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[2,2]'\"></td>";
            str += "										<td style=\"text-align: right;\">停到启的最小时间间隔(h):</td>";
            str += "										<td><input id=\"paramInfo_stoptoopenspace\"";
            str += "											name=\"stoptoopenspace\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[2,2]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">夏季最大有功出力(MW):</td>";
            str += "										<td><input id=\"paramInfo_summerpower\" name=\"summerpower\"";
            str += "											 class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">冬季最大有功出力(MW):</td>";
            str += "										<td><input id=\"paramInfo_winterpower\" name=\"winterpower\"";
            str += "											 class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">最小有功出力(MW):</td>";
            str += "										<td><input id=\"paramInfo_leastpower\" name=\"leastpower\"";
            str += "											 class=\"easyui-validatebox\" tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">平均加出力速度(MW/min):</td>";
            str += "										<td><input id=\"paramInfo_avgaddspeed\" name=\"avgaddspeed\"";
            str += "											 class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\">平均减出力速度(MW/min):</td>";
            str += "										<td><input id=\"paramInfo_avgremovespeed\"";
            str += "											name=\"avgremovespeed\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\">是超低排放</td>";
            str += "										<td><select remark=\"30\" name=\"generatorclass1\"";
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
            str += "									onclick=\"WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:true});\" />";
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
            str += "										<select remark=\"30\" name=\"isbidtype\"";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select>";
            str += "										</td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\">是否特许招标:</td>";
            str += "										<td style=\"width: 150px\">";
            str += "										<select remark=\"30\" name=\"inviteProject\"";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select>";
            str += "										</td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\">单机容量(MW):</td>";
            str += "										<td style=\"width: 150px\"><input";
            str += "											id=\"paramInfo_standAlonePower\" name=\"standAlonePower\"";
            str += "											 class=\"easyui-validatebox\" tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[4,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">政府补贴电价:</td>";
            str += "										<td><input id=\"paramInfo_emermaxnetpower\"";
            str += "											name=\"emermaxnetpower\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>"
            str += "										<td style=\"text-align: right;\">组合机组台数:</td>";
            str += "										<td><input id=\"generatorTowerNum\"";
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
            str += "											name=\"isbidtype\" class=\"paramSelect required\">";
            str += "";
            str += "										</select></td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\"><a style=\"color: red\">*</a>组合机组台数:</td>";
            str += "										<td style=\"width: 150px\"><input";
            str += "											id=\"paramInfo_generatorTowerNum\" name=\"generatorTowerNum\"";
            str += "											 class=\"easyui-validatebox\"";
            str += "											data-options=\"required:true,validType:'numberMaxLen[5]'\"></td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\">单机容量(MW):</td>";
            str += "										<td style=\"width: 150px\"><input";
            str += "											id=\"paramInfo_standAlonePower\" name=\"standAlonePower\"";
            str += "											 class=\"easyui-validatebox\" tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[4,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">额定风速(m/s):</td>";
            str += "										<td><input id=\"paramInfo_specifiedWindspeed\"";
            str += "											name=\"specifiedWindspeed\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">切入风速(m/s):</td>";
            str += "										<td><input id=\"paramInfo_cutinWindspeed\"";
            str += "											name=\"cutinWindspeed\"  class=\"easyui-validatebox\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "										<td style=\"text-align: right;\">切除风速(m/s):</td>";
            str += "										<td><input id=\"paramInfo_cutoutWindspeed\"";
            str += "											name=\"cutoutWindspeed\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[8,4]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\"><a style=\"color: red\">*</a>是否特许招标:</td>";
            str += "										<td><select remark=\"30\" name=\"inviteProject\"";
            str += "											class=\"paramSelect required\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">叶轮直径(m):</td>";
            str += "										<td><input id=\"paramInfo_vaneDiameter\"";
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
            str += "										<td style=\"width: 150px\"><select remark=\"84\"";
            str += "											name=\"npstype\" class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\">核电站技术级别:</td>";
            str += "										<td style=\"width: 150px\"><select remark=\"85\"";
            str += "											name=\"npsgrade\" class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td width=\"90px\" style=\"text-align: right;\">换料周期(月):</td>";
            str += "										<td style=\"width: 150px\"><input";
            str += "											id=\"paramInfo_npgunitreloadingsycle\"";
            str += "											name=\"npgunitreloadingsycle\"  class=\"easyui-validatebox\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[8,2]'\"></td>";
            str += "									</tr>";
            str += "									<tr height=\"30px\">";
            str += "										<td style=\"text-align: right;\">锅炉压力水平:</td>";
            str += "										<td><select remark=\"22\" name=\"boilerpressure\"";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">是否特许招标:</td>";
            str += "										<td><select remark=\"30\" name=\"inviteProject\"";
            str += "											class=\"paramSelect\">";
            str += "";
            str += "										</select></td>";
            str += "										<td style=\"text-align: right;\">设计使用年限:</td>";
            str += "										<td><input id=\"paramInfo_npgdesignuseyear\"";
            str += "											name=\"npgdesignuseyear\"  class=\"easyui-validatebox\"";
            str += "											tipbottom=\"true\"";
            str += "											data-options=\"validType:'floatNumToNum[8,2]'\"></td>";
            str += "									</tr>";
            str += "								</tbody>";
            str += "							</table>";
        }
        $("#loadHtmlInfo").append(str);
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

function initValidate(parentid,parentVal){
    if(parentid){
        if(parentVal == 1){
            $('#baseInfoform').validate({
                rules: {
                    generatorname: {required: true},
                    generatortype: {required: true},
                    opbegindate: {required: true},
                    commercialbegindate: {required: true},
                    generatorratedcap: {required: true},
                    maxtecpower: {required: true},
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
                    commercialbegindate: {required: true},
                    generatorratedcap: {required: true},
                    maxtecpower: {required: true},
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
                    commercialbegindate: {required: true},
                    generatorratedcap: {required: true},
                    maxtecpower: {required: true},
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
    initSelect();
    initThreeNode();
    $('#gateidName').width(205);
    $('#dcjzName').width(205);
    $('#dcjzButton').remove();
    $('#gateidButton').remove();
    $("#generatortype").change(function () {
        $("#generatortypesub").html("");
        initSelect();
        initValidate(parentid,parentVal)
    });

    $("#generatortypesub").change(function () {
        initThreeNode();
    });

    /*$("#generatortype").change(function () {
        var choseVal = $(this).children('option:selected').val();
        //ajax调用
        $.ajax({
            url: top.ctx + "/dljyzx/baRegGenerator/forwardJspByType",
            type: 'post',
            dataType: "text",
            data: "type=" + choseVal,
            success: function (data) {
                $("#paramInfoJsp").html(data);
            }
        });
    })*/

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
                top.jBox.alert("退市时间必须最大!");
                return;
            }*/
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
                                            sendFlow(json);
                                        }
                                    }
                                }
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
});


/**
 * 保存验证
 * @returns
 */
function JqValidate() {
    return $("#baseInfoform").validate({

    });
}
/**
 * 保存操作
 */
function handle() {
    var valiResult = JqValidate();
    if (JqValidate()) {
        $("#baseInfoform").submit();
    }
}

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