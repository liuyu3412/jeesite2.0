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
        td{
            padding: 5px 0;
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
        <table id="contentTable" style="width: 100%">
            <tbody>
            <tr>
                <td><label class="top_label_text description" ><label style="color: red;"></label>户号：</label></td>
                <td><input id="consNo" name="consNo" type="text" readonly value="${jsAsMarketapply.consNo}"/></td>
            </tr>
            <tr id="user">
                <td><label class="top_label_text description" ><label style="color: red;"></label>补偿费用用户分成比例(%)：</label></td>
                <td><input name="penaltyRate" type="number" min="0" max="100" oninput="inputNum(this)" onblur="checkNum(this)" value="${jsAsMarketapply.penaltyRate==undefind?100:jsAsMarketapply.penaltyRate}"/></td>
                <td><label class="top_label_text description" ><label style="color: red;"></label>补偿费用售电公司分成比例(%)：</label></td>
                <td><input name="penaltySellerRate" type="number" readonly value="${jsAsMarketapply.penaltySellerRate==undefind?0:jsAsMarketapply.penaltySellerRate}"/></td>
            </tr>
            <tr id="userSeller">
                <td><label class="top_label_text description" ><label style="color: red;"></label>考核费用用户分摊比例(%)：</label></td>
                <td><input name="shareRate" type="number" min="0" max="100" oninput="inputNum(this)" onblur="checkNum(this)" value="${jsAsMarketapply.shareRate==undefind?100:jsAsMarketapply.shareRate}"/></td>
                <td><label class="top_label_text description" ><label style="color: red;"></label>考核费用售电公司摊分成比例(%)：</label></td>
                <td><input name="shareSellerRate" type="number" readonly value="${jsAsMarketapply.shareSellerRate==undefind?0:jsAsMarketapply.shareSellerRate}"/></td>
            </tr>
            <tr>
                <td><label class="top_label_text description" ><label style="color: red;"></label>联系人：</label></td>
                <td><input name="comPerson" type="text" value="${jsAsMarketapply.comPerson}"/></td>
            </tr>
            <tr>
                <td><label class="top_label_text description" ><label style="color: red;"></label>手机号：</label></td>
                <td><input name="tel" type="text" value="${jsAsMarketapply.tel}"/></td>
            </tr>
            <tr>
                <td><label class="top_label_text description" ><label style="color: red;"></label>用电地址：</label></td>
                <td><textarea  style="width: 100%;" name="address" id="description" />${jsAsMarketapply.address}</textarea></td>
            </tr>
            <%--<tr>--%>
                <%--<td><label class="top_label_text description" ><label style="color: red;"></label>地理区域：</label></td>--%>
                <%--<td><sys:treeselect id="area" name="area"--%>
                                    <%--value="" labelName="areaName" labelValue="" title="地区"--%>
                                    <%--url="/dljyzx/jsAsMarketapply/areaTreeData"--%>
                                    <%--allowClear="true" notAllowSelectParent="false"/></td>--%>
            <%--</tr>--%>
            <tr>
                <td><label class="top_label_text description" ><label style="color: red;"></label>入市承诺书：</label></td>
                <%--<td><input style="border:0px;height: 25px; width: 260px" class="file easyui-validatebox" type="file" id="promisefile" name="promisefile"--%>
                           <%--value="&#92${jsAsMarketapply.promiseAttachname}"/></td>--%>
                <td>
                    <input name="promiseAttachid" type="hidden" value="${jsAsMarketapply.promiseAttachid}">
                    <input type="file" onchange="uploadFile(this)" style="display: none;" />
                    <a class="link" title="上传附件" onclick="addFile(this)">${jsAsMarketapply.promiseAttachname==undefind?"上传佐证材料...":jsAsMarketapply.promiseAttachname}</a>
                </td>
            </tr>
            <tr>
                <td><label class="top_label_text description" ><label style="color: red;"></label>负荷调节协议：</label></td>
                <%--<td><input style="border:0px;height: 25px; width: 260px" class="file easyui-validatebox" type="file" id="agreefile" name="agreefile"--%>
                           <%--value="&#92${jsAsMarketapply.agreementAttachname}"/></td>--%>
                <td>
                    <input name="agreementAttachid" type="hidden" value="${jsAsMarketapply.agreementAttachid}">
                    <input type="file" onchange="uploadFile(this)" style="display: none;" />
                    <a class="link" title="上传附件" onclick="addFile(this)">${jsAsMarketapply.agreementAttachname==undefind?"上传佐证材料...":jsAsMarketapply.agreementAttachname}</a>
                </td>
            </tr>
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
        $("#contentTable").find("textarea").attr("disabled",true);
    }
    var isLargeUser='${isLargeUser}';
    if('true'==isLargeUser){
        $("#user").hide();
        $("#userSeller").hide();
        $("#contentTable").css("width","60%");
        $("#contentTable").css("margin","0px auto");
    }

    function save(status1) {
        jBox.tip("表单提交中...", 'loading');
        if(checkParam()){
            var param = {};
            param.guid=$('input[name="guid"]').val();
            param.consNo=$("#consNo").val();
            param.penaltyRate=$('input[name="penaltyRate"]').val();
            param.penaltySellerRate=$('input[name="penaltySellerRate"]').val();
            param.shareRate=$('input[name="shareRate"]').val();
            param.shareSellerRate=$('input[name="shareSellerRate"]').val();
            param.comPerson=$('input[name="comPerson"]').val();
            param.tel=$('input[name="tel"]').val();
            param.address=$("textarea[name='address']").val();
            param.promiseAttachid=$('input[name="promiseAttachid"]').val();
            param.agreementAttachid=$('input[name="agreementAttachid"]').val();
            param.status=status1;
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


    function inputNum(obj) {
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
        $(obj).parent().parent().find('input:eq(1)').val(100-num);
    }

    function checkNum(obj) {
        var num=$(obj).val();
        if(!num){
            num=100;
        }
        $(obj).val(num);
        $(obj).parent().parent().find('input:eq(1)').val((100-num).toFixed(2));
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
        if(!$("textarea[name='address']").val()){
            jBox.tip('用电地址不能为空。', 'success');
            $("textarea[name='address']").focus();
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
        return true;
    }
</script>
</body>
</html>

