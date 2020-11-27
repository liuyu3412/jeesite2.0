<%--
  Created by IntelliJ IDEA.
  User: hp
  Date: 2020/4/9
  Time: 14:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page language="java" import="java.text.*,java.util.*" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <script type="text/javascript" src="${ctxStatic}/modules/cms/front/themes/basic/conSignJs/jquery-1.7.2.min.js"></script>
    <script type="text/javascript"	src="${ctxStatic}/modules/cms/front/themes/basic/conSignJs/jquery.jBox-2.3.min.js"></script>
    <link href="${ctxStatic}/modules/cms/front/themes/basic/conSignCSS/jbox.css" rel="stylesheet" type="text/css" />
    <title>入市申请</title>
    <%@include file="/WEB-INF/views/modules/cms/front/include/head.jsp" %>
    <meta name="decorator" content="default"/>
    <style>
        .btn-primary{
            cursor: pointer !important;
        }
        .link{
            cursor: pointer !important;
        }
        #contentTable td{
            padding: 5px 0;
            width: 25%;
        }
        .td_text{
            text-align: right !important;
        }
        .form-search label {
             margin-left: 0;
        }
    </style>
</head>
<body>
<form:form id="inputForm" name="inputForm" action="" enctype="multipart/form-data" modelAttribute="jsAsMarketapply" method="post" class="form-horizontal breadcrumb form-search" cssStyle="background: rgba(255,255,255,0.9)" >
    <!--<div id="top_card">-->

    <div>
        <input name="guid" type="hidden" value="${jsAsMarketapply.guid}">
        <input name="userId" type="hidden" value="${jsAsMarketapply.userId}">
        <input name="year" type="hidden" value="${jsAsMarketapply.year}">
        <table id="contentTable" style="width: 70%">
            <tbody>
            <tr>
                <td class="td_text"><label class="top_label_text description" ><label style="color: red;"></label>联系人：</label></td>
                <td><input name="comPerson" type="text" value="${jsAsMarketapply.comPerson}"/></td>
                <td class="td_text"><label class="top_label_text description" ><label style="color: red;"></label>联系人手机：</label></td>
                <td><input name="tel" type="text" value="${jsAsMarketapply.tel}"/></td>
            </tr>
            <tr>
                <td class="td_text"><label class="top_label_text description" ><label style="color: red;"></label>入市承诺书：</label></td>
                <td>
                    <input name="promiseAttachid" type="hidden" value="${jsAsMarketapply.promiseAttachid}">
                    <input type="file" onchange="uploadFile(this)" style="display: none;" />
                    <a class="link" title="上传附件" onclick="addFile(this)">${jsAsMarketapply.promiseAttachname==undefind?"上传佐证材料...":jsAsMarketapply.promiseAttachname}</a>
                </td>
                <td class="td_text"><label class="top_label_text description" ><label style="color: red;"></label>负荷调节协议：</label></td>
                <td>
                    <input name="agreementAttachid" type="hidden" value="${jsAsMarketapply.agreementAttachid}">
                    <input type="file" onchange="uploadFile(this)" style="display: none;" />
                    <a class="link" title="上传附件" onclick="addFile(this)">${jsAsMarketapply.agreementAttachname==undefind?"上传佐证材料...":jsAsMarketapply.agreementAttachname}</a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>

<div class="infor_t" style="margin-top:0px;overflow-x: auto;">
    <table id="seqTable" class="table table-striped table-bordered table-condensed ground" style="margin-bottom: 0px;margin-top: 0px;padding-bottom: 0px">
        <thead>
        <tr>
            <th>全选<input type="checkbox" id="parentCheck"/></th>
            <th>户号</th>
            <th style="display: ${'true'==isLargeUser?'none':''}">补偿费用用户<br>分成比例(%)</th>
            <th style="display: ${'true'==isLargeUser?'none':''}">补偿费用售电公司<br>分成比例(%)</th>
            <th style="display: ${'true'==isLargeUser?'none':''}">考核费用用户<br>分摊比例(%)</th>
            <th style="display: ${'true'==isLargeUser?'none':''}">考核费用售电公司<br>分摊比例(%)</th>
            <th>用电地址</th>
            <th>所属地区</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach var="jsAsMarketapplyConsno" items="${jsAsMarketapplyConsnos}" varStatus="stauts">
            <tr guid="${jsAsMarketapplyConsno.guid}" consNo="${jsAsMarketapplyConsno.consNo}">
                <td>
                    <input type="checkbox" class="checkValue" ${jsAsMarketapplyConsno.penaltyRate==undefind?'':'checked'}/>
                </td>
                <td>
                        ${jsAsMarketapplyConsno.consNo}
                </td>
                <td style="display: ${'true'==isLargeUser?'none':''}">
                    <input type="number" style="width: 80px;" oninput="inputNum(this,1)" onblur="checkNum(this,1)"
                           value="${jsAsMarketapplyConsno.penaltyRate==undefind?100:jsAsMarketapplyConsno.penaltyRate}"/>
                </td>
                <td style="display: ${'true'==isLargeUser?'none':''}">
                    <input type="number" style="width: 80px;" readonly value="${jsAsMarketapplyConsno.penaltySellerRate==undefind?0:jsAsMarketapplyConsno.penaltySellerRate}"/>
                </td>
                <td style="display: ${'true'==isLargeUser?'none':''}">
                    <input type="number" style="width: 80px;" oninput="inputNum(this,2)" onblur="checkNum(this,2)"
                           value="${jsAsMarketapplyConsno.shareRate==undefind?100:jsAsMarketapplyConsno.shareRate}"/>
                </td>
                <td style="display: ${'true'==isLargeUser?'none':''}">
                    <input type="number" style="width: 80px;" readonly value="${jsAsMarketapplyConsno.shareSellerRate==undefind?0:jsAsMarketapplyConsno.shareSellerRate}"/>
                </td>
                <td>
                    <input type="text" style="width: 400px;" value="${jsAsMarketapplyConsno.address}"/>
                </td>
                <td>
                    <sys:treeselect id="area${stauts.count}" name="area${stauts.count}"
                                    value="${jsAsMarketapplyConsno.areaId}" labelName="areaName${stauts.count}"
                                    labelValue="${jsAsMarketapplyConsno.areaName}" title="地区"
                                    url="/dljyzx/jsAsMarketapply/areaTreeData"
                                    allowClear="true" notAllowSelectParent="false"/>
                </td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</div>

    <div style="margin: 20px 0;text-align: center">
        <!--<input class="btn btn-primary" type="submit" value="提交" />-->
        <input id="infoSave" class="btn btn-primary" type="button" value="保存" onclick="save('00')" />
        <input id="infoSubmit" class="btn btn-primary" style="margin-left: 20px" type="button" value="提交" onclick="save('01')" />
    </div>
</form:form>
<script type="text/javascript">

    var msg = '${msg}';
    if(msg){
        jBox.tip(msg, 'message');
    }
    var status='${jsAsMarketapply.status}';
    if(status&&!(status=="00"||status=="09")){
        $("#infoSave").hide();
        $("#infoSubmit").hide();
        $("#contentTable").find("input").attr("disabled",true);
        $("#contentTable").find("select").attr("disabled",true);
        $("#seqTable").find("input").attr("disabled",true);
        $("#seqTable").find("select").attr("disabled",true);
    }
    var isLargeUser='${isLargeUser}';
    if('true'==isLargeUser){
        $("#user").hide();
        $("#userSeller").hide();
        $("#contentTable").css("width","80%");
        $("#contentTable").css("margin","0px auto");
    }

    $(function() {
        $("#parentCheck").click(function() {
                if ($("#parentCheck").attr("checked")) {
                    $("#seqTable tbody td").each(function() {
                        $(this).find("input").attr("checked","true");
                    });
                }else {
                    $("#seqTable tbody td").each(function() {
                        $(this).find("input").removeAttr("checked","true");
                    });
                }
            }
        );
    });

    function save(status1) {
        jBox.tip("表单提交中...", 'loading');
        if(checkParam()){
            var param = {};
            var year=$('input[name="year"]').val();
            param.guid=$('input[name="guid"]').val();
            param.userId=$('input[name="userId"]').val();
            param.year=year;
            param.comPerson=$('input[name="comPerson"]').val();
            param.tel=$('input[name="tel"]').val();
            param.promiseAttachid=$('input[name="promiseAttachid"]').val();
            param.agreementAttachid=$('input[name="agreementAttachid"]').val();
            param.status=status1;

            var index=0;
            $('#seqTable tr').each(function(i){                   // 遍历 tr
                if(i>0){
                    if($(this).find('td:eq(0)').find('input').attr("checked")){
                        param["jsAsMarketapplyConsnos[" + index + "].consNo"] = $(this).attr("consNo");
                        param["jsAsMarketapplyConsnos[" + index + "].penaltyRate"] = $(this).find('td:eq(2)').find('input').val();
                        param["jsAsMarketapplyConsnos[" + index + "].penaltySellerRate"] = $(this).find('td:eq(3)').find('input').val();
                        param["jsAsMarketapplyConsnos[" + index + "].shareRate"] = $(this).find('td:eq(4)').find('input').val();
                        param["jsAsMarketapplyConsnos[" + index + "].shareSellerRate"] = $(this).find('td:eq(5)').find('input').val();
                        param["jsAsMarketapplyConsnos[" + index + "].address"] = $(this).find('td:eq(6)').find('input').val();
                        param["jsAsMarketapplyConsnos[" + index + "].areaId"] = $('#area'+i+'Id').val();
                        param["jsAsMarketapplyConsnos[" + index + "].year"] = year;
                        index++;
                    }
                }
            });

            $.ajax({
                type: 'POST',
                url: "${ctx}/dljyzx/jsAsMarketapply/save",
                dataType: "json",
                data: param,
                async:true,
                success : function(r){
                    if(r.code=="200"){
                        if(status1=='00'){
                            jBox.tip("保存成功", 'success');
                        }else{
                            $("#infoSave").hide();
                            $("#infoSubmit").hide();
                            $("#contentTable").find("input").attr("disabled",true);
                            $("#contentTable").find("select").attr("disabled",true);
                            $("#contentTable").find("textarea").attr("disabled",true);
                            jBox.tip("提交成功", 'success');
                        }
                        $('input[name="guid"]').val(r.data);
                    }else{
                        jBox.tip(r.msg, 'error');
                    }
                },
                error : function(){
                    jBox.tip('表单提交失败。', 'error');
                }
            });
        }
    }

    function addFile(obj) {
        if(status&&"00"!=status){
            jBox.tip("数据已提交,不可修改附件", 'message');
            return;
        }
        $(obj).parent().find('input:eq(1)').click();
    }

    function uploadFile(obj) {

            jBox.tip("附件上传中...", 'loading');
            var file = $(obj)[0].files[0];
            if(!file){
                jBox.tip('文件上传失败，请重新上传。', 'success');
                $(obj).val('');
                return;
            }
            var filePath=$(obj).val();
            var point = filePath.lastIndexOf(".");
            var type = filePath.substr(point);
            if(type!=".pdf"){
                jBox.tip('请上传pdf文档。', 'success');
                $(obj).val('');
                return;
            }
            if(file.size>(10*1024*1024)){
                jBox.tip('文件大小不能超过10M。', 'success');
                $(obj).val('');
                return;
            }
            var oFormData = new FormData();
            var attachmentId = $(obj).parent().find('input:eq(0)').val();
            var guid = '${jsAsMarketapply.guid}';
            oFormData.append('attfile', file);
            oFormData.append('attachId',attachmentId);
            // oFormData.append('submitId',submitId);
            $.ajax({
                type: 'POST',
                url: "${ctx}/dljyzx/jsAsMarketapply/uploadFile",
                data: oFormData,
                cache: false, // 不要缓存
                processData: false, // 不需要进行数据的转换
                contentType: false, // 不要默认的 application/x-www-form-urlencoded 类型，因为 form 表单已经指定了
            }).done(function(data) {
                $(obj).val('');
                $(obj).parent().find('input:eq(0)').val(data.attachId);
                $(obj).parent().find('a').html(data.attName);
                jBox.tip('上传成功。', 'success');
            }).fail(function(err) {
                jBox.tip('文件上传失败，请重新上传。', 'success');
                $(obj).val('');
                return;
            });
    }


    function inputNum(obj,i) {
        var num=$(obj).val();
        num = (num == "." ? "" : num); //去除第一位“.”
        num = num.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
        num = num.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        num = num.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        num = num.replace(/^(.*\..{2}).*$/, "$1"); //保留三位小数
        if(num>100){
            num = num.substring(0,num.length-1);
        }
        $(obj).val(num);
        if(i==1){
            $(obj).parent().parent().find('td:eq(3)').find('input').val(cutZero(100-num));
        }else{
            $(obj).parent().parent().find('td:eq(5)').find('input').val(cutZero(100-num));
        }

    }

    function checkNum(obj,i) {
        var num=$(obj).val();
        if(!num){
            num=100;
        }
        $(obj).val(num);
        if(i==1){
            $(obj).parent().parent().find('td:eq(3)').find('input').val(cutZero(100-num));
        }else{
            $(obj).parent().parent().find('td:eq(5)').find('input').val(cutZero(100-num));
        }
    }

    var pattern2 = /^1[3456789]\d{9}$/;
    function checkTel(obj) {
        var tel=$(obj).val();
        if(tel) {
            if (!pattern2.test(tel)) {
                obj.focus();
                top.$.jBox.tip("请输入正确的手机号");
                return false;
            }
        }
    }

    function checkParam() {
        if(!$("input[name='comPerson']").val()){
            jBox.tip('联系人不能为空。', 'success');
            $("input[name='comPerson']").focus();
            return false;
        }
        if(!$("input[name='tel']").val()){
            jBox.tip('手机号码不能为空。', 'success');
            $("input[name='tel']").focus();
            return false;
        }
        if(!pattern2.test($("input[name='tel']").val())){
            jBox.tip('手机号码不正确。', 'success');
            $("input[name='tel']").focus();
            return false;
        }
        if(!$("input[name='promiseAttachid']").val()){
            jBox.tip('请上传入市承诺书。', 'success');
            return false;
        }
        if(!$("input[name='agreementAttachid']").val()){
            jBox.tip('请上传负荷调节协议。', 'success');
            return false;
        }
        var indArry=[];
        var flag=true;
        $('#seqTable tr').each(function(i){                   // 遍历 tr
            if(i>0){
                if($(this).find('td:eq(0)').find('input').attr("checked")){
                    if(!$(this).find('td:eq(6)').find('input').val()){
                        jBox.tip('请输入用电地址。', 'success');
                        $(this).find('td:eq(6)').find('input').focus();
                        flag=false;
                        return false;
                    }
                    if(!$('#area'+i+'Id').val()){
                        jBox.tip('请选择所属地区。', 'success');
                        $('#area'+i+'Name').focus();
                        flag=false;
                        return false;
                    }
                    var guid=$(this).attr("guid");
                    indArry.push(guid);
                }
            }
        });
        if(!flag){
            return false;
        }
        if(indArry.length==0){
            jBox.tip("请勾选", 'success');
            return false;
        }
        return true;
    }

    /**
     *去除小数点后多余的0
     */
    function cutZero(old) {　　 //拷贝一份 返回去掉零的新串

        old = old + "";
        var newstr = old;　　 //循环变量 小数部分长度

        var leng = old.length - old.indexOf(".") - 1;　　 //判断是否有效数

        if(old.indexOf(".") > -1) {　　　　 //循环小数部分

            for(i = leng; i > 0; i--) {　　　　　　 //如果newstr末尾有0

                if(newstr.lastIndexOf("0") > -1 && newstr.substr(newstr.length - 1, 1) == 0) {
                    var k = newstr.lastIndexOf("0");　　　　　　　　 //如果小数点后只有一个0 去掉小数点

                    if(newstr.charAt(k - 1) == ".") {
                        return newstr.substring(0, k - 1);
                    } else {　　　　　　　　　　 //否则 去掉一个0

                        newstr = newstr.substring(0, k);
                    }
                } else {　　　　　　　　 //如果末尾没有0

                    return newstr;
                }
            }
        }
        return old;
    }
</script>
</body>
</html>

