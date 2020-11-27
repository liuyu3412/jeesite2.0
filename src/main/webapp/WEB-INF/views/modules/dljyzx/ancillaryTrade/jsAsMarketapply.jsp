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
        .h-font{
            font-size: 20px;
            line-height: 36px;
            font-weight: bold;
            color: #555;;
        }
        .icon-xing{
            color: #FF0000;
            font-size: 20px;
            line-height: 20px;
        }
        .p-font{
            font-size: 36px;
            color: #5eb1fd;
            line-height: 36px;
            margin: 0 !important;
            padding-right: 20px;
            float: right;
            cursor: pointer !important;
        }
        .btn-primary{
            cursor: pointer !important;
        }
        .link{
            cursor: pointer !important;
        }
        .ground{
            background: rgba(255,255,255,0.7)
        }
        td{white-space:nowrap;overflow:hidden;}
    </style>
    <%--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/css/select2.min.css"/>--%>
    <%--<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/js/select2.min.js"></script>--%>
    <script type="text/javascript">

        function page(n,s){
            $("#pageNo").val(n);
            $("#pageSize").val(s);
            $("#searchForm").submit();
            return false;
        }
    </script>
</head>
<body>
<form:form id="searchForm" modelAttribute="jsIeBasicTarget" action="${ctx}/dljyzx/jsAsMarketapply/list" method="post" class="breadcrumb form-search">
    <h class="h-font">辅助服务市场入市承诺</h>
    <input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
    <input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
    <ul class="ul-form">
        <li><label>年份：</label>
            <input id="year" name="year" readonly="readonly" maxlength="20" class=" Wdate required" style="width: 70px"
                   onclick="WdatePicker({dateFmt:'yyyy',isShowClear:false});" value="${jsAsMarketapply.year}"/>
        </li>
        <%--<li><label>户号：</label>--%>
            <%--<input type="text" id="consNo" name="consNo" style="width: 80px;" value="${jsAsMarketapply.consNo}"/>--%>
        <%--</li>--%>
        <li style="display: ${'true'==isLargeUser?'none':''}"><label>用户名称：</label><input type="text" id="consName" name="consName" value="${jsAsMarketapply.consName}"/>
        </li>
        <li><label>状态：</label>
            <select id="status" name="status" style="width: 100px">
                <option value="">全部</option>
                <option value="-1" ${"-1"==jsAsMarketapply.status?"selected":""}>未申请</option>
                <option value="00" ${"00"==jsAsMarketapply.status?"selected":""}>已保存</option>
                <option value="01" ${"01"==jsAsMarketapply.status?"selected":""}>已提交</option>
                <option value="08" ${"08"==jsAsMarketapply.status?"selected":""}>已通过</option>
                <option value="09" ${"09"==jsAsMarketapply.status?"selected":""}>未通过</option>
            </select>
        </li>
        <li class="btns">
            <input id="btnQuery" class="btn btn-primary" type="submit" value="查询"/>
            <input id="btnSubmit" onclick="submits()" class="btn btn-primary" type="button" value="提交"/>
        </li>
    </ul>
</form:form>
<sys:message content="${message}"/>
<div class="infor_t" style="margin-top:0px;overflow-x: auto;">
<table id="contentTable" class="table table-striped table-bordered table-condensed ground">
    <thead>
    <tr>
        <th>全选<input type="checkbox" id="parentCheck"/></th>
        <th>用户名称</th>
        <th>状态</th>
        <th>申请日期</th>
        <th>联系人</th>
        <th>手机号码</th>
        <th>备注</th>
        <th>附件</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach var="jsAsMarketapply" items="${page.list}">
        <tr guid="${jsAsMarketapply.guid}" userId="${jsAsMarketapply.userId}" consName="${jsAsMarketapply.consName}" promiseAttachid="${jsAsMarketapply.promiseAttachid}"
            agreementAttachid="${jsAsMarketapply.agreementAttachid}" status="${jsAsMarketapply.status}">
            <td>
                <input type="checkbox" class="checkValue"/>
            </td>
            <td>
                <a class="link" onclick="toDetail(this)">${jsAsMarketapply.consName}</a>
            </td>
            <td>
                    ${jsAsMarketapply.status}
            </td>
            <td>
                    ${jsAsMarketapply.applyDateStr}
            </td>
            <td>
                    ${jsAsMarketapply.comPerson}
            </td>
            <td>
                    ${jsAsMarketapply.tel}
            </td>
            <td>
                    ${jsAsMarketapply.auditContent}
            </td>
            <td>
                <c:if test="${'未申请'!=jsAsMarketapply.status}">
                    <a class="link" title="下载" onclick="downloadFile(this)">下载</a>
                </c:if>
            </td>
        </tr>

    </c:forEach>
    </tbody>
</table>
</div>
<div class="pagination">${page}</div>

<script type="text/javascript">

    $(function() {
        $("#parentCheck").click(function() {
                if ($("#parentCheck").attr("checked")) {
                    $("#contentTable tbody td").each(function() {
                        $(this).find("input").attr("checked","true");
                    });
                }else {
                    $("#contentTable tbody td").each(function() {
                        $(this).find("input").removeAttr("checked","true");
                    });
                }
            }
        );
    });

    function downloadFile(obj) {
        var promiseAttachid=$(obj).parent().parent().attr("promiseAttachid");
        var agreementAttachid=$(obj).parent().parent().attr("agreementAttachid");
        if(promiseAttachid){
            window.location.href = "${ctx}/dljyzx/jsAsMarketapply/download?attachmentId=" + promiseAttachid;

        }
        if(agreementAttachid){
            var url = "${ctx}/dljyzx/jsAsMarketapply/download?attachmentId=" + agreementAttachid;
            //打开下载窗口
            window.open(url, "agreementAttachid");
        }
    }

    function toDetail(obj) {
        var guid=$(obj).parent().parent().attr("guid");
        var userId=$(obj).parent().parent().attr("userId");
        var consName=$(obj).parent().parent().attr("consName");
        var height = $(window).height();
        var width = $(window).width();
        if('true'=='${isLargeUser}'){
            width=width/1.5;
        }

        var year='${jsAsMarketapply.year}';
        var url = ctx + "/dljyzx/jsAsMarketapply/toDetail?guid="+guid+"&userId="+userId+"&year="+year;
        // var url = ctx + "/dljyzx/basicInfo/powerPlantsInfo/sellerIndex?type=1&participantId=" + attachmentId;
        // 全局弹出
        top.$.jBox("iframe:" + url, {
            title: "入市申请信息("+consName+")",
            id:'subIframe',
            name:'subIframe',
            top:10,
            width: parseFloat(width+100),
            height: parseFloat(height-200),
            iframeScrolling: 'yes',
            buttons: {},
            closed: function () {
                $("#btnQuery").click();
            }
            });
    }

    function submits() {
        var indArry=[];
        var flag=true;
        $('#contentTable tr').each(function(i){                   // 遍历 tr
            if(i>0){
                if($(this).find('input').attr("checked")){
                    if("已保存"==$(this).attr("status")){
                        var guid=$(this).attr("guid");
                        indArry.push(guid);
                    }else{
                        top.$.jBox.tip("存在"+$(this).attr("status")+"的数据");
                        flag=false;
                        return false;
                    }
                }
            }
        });
        if(!flag){
            return;
        }
        if(indArry.length==0){
            top.$.jBox.tip("请勾选");
            return;
        }
        var param={};
        param.guids=indArry.join(',');
        $.ajax({
            type: 'POST',
            url: "${ctx}/dljyzx/jsAsMarketapply/submitApplys",
            data: param,
            dataType: "json",
            async:false,
            success : function(data){
                if(data.code=="200"){
                    top.$.jBox.tip("提交成功");
                    $("#btnQuery").click();
                }else{
                    top.jBox.alert(data.msg);
                }
            }
        });
    }

</script>
</body>
</html>

