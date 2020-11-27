<%--
  Created by IntelliJ IDEA.
  User: hp
  Date: 2020/7/3
  Time: 14:15
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
    <title>月结算单</title>
    <%@include file="/WEB-INF/views/modules/cms/front/include/head.jsp" %>
    <meta name="decorator" content="default"/>
    <meta charset="utf-8">
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
        .lock-status{
            width: 100%;
            color: #ff0000;
            font-size: 14px;
            font-weight: 700;
            margin-left: 10px;
            line-height: 30px;
        }
        .ground{
            background: rgba(255,255,255,0.7)
        }
    </style>
    <script src="${ctx}/static/modules/cms/front/themes/basic/echarts.js"></script>
    <script type="text/javascript">
    </script>
</head>
<body>
<form:form id="searchForm1" modelAttribute="" action="${ctx}/dljyzx/resultmonth/list" method="post" class="breadcrumb form-search">
    <h class="h-font">辅助服务市场月结算清单查询</h>
    <ul class="ul-form">
        <li><label>月份：</label>
            <input style="width: 85px;"
                   id="month" name="month" type="text"
                readonly="readonly"
                   maxlength="20"
                   class="input-medium Wdate"
                   value="${jsAsSeResultMonth.month}"
                   onfocus="WdatePicker({dateFmt:'yyyy-MM',isShowClear:false})" >
        </li>

        <li class="btns">
            <input id="btnQuery" class="btn btn-primary" type="submit" value="查询"  />
        </li>
    </ul>
</form:form>
<sys:message content="${message}"/>
<div id="scrollBox" style="width: 100%; height: 40%; overflow: scroll">
    <table id="contentTable" class="table table-striped table-bordered table-condensed ground">
        <h class="h-font">月结算单查询</h>
        <thead>
        <tr>
            <th></th>
            <th>月份</th>
            <th>结算单名称</th>
            <th>结算单生成日期</th>
            <th>发布状态</th>
            <th>确认状态</th>
            <th>用户反馈</th>
            <th>处理情况</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach var="jsAsSeResultMonth" items="${page.list}">
            <tr guid="" code="">
                <td>
                    <input type="checkbox" class="checkValue" ${ind.atts==true?"checked":""}/>
                </td>
                <td>
                        ${jsAsSeResultMonth.month}
                </td>
                <td>
                        ${jsAsSeResultMonth.resultName}
                </td>
                <td>
                        ${jsAsSeResultMonth.resultProductDate}
                </td>
                <td>
                        ${jsAsSeResultMonth.issueStatus}
                </td>
                <td>
                    ${jsAsSeResultMonth.confirmStatus}
                 </td>
                <td>
                        ${jsAsSeResultMonth.feedBack}
                </td>
                <td>
                        ${jsAsSeResultMonth.dealStatus}
                </td>
                <td >


                    <span ><a  class="link"class="link" href="#" onclick="confirm('${jsAsSeResultMonth.guId}')"
                    >确认</a></span>

                    <span ><a class="link"  href="#" onclick="report('${jsAsSeResultMonth.guId}','${jsAsSeResultMonth.month}')"
                    >申诉</a></span>

                    <span ><a  class="link" href="#" onclick="filedownLoad('${jsAsSeResultMonth.guId}','${jsAsSeResultMonth.month}')"
                    >下载</a></span>
                </td>
            </tr>

        </c:forEach>

        </tbody>

    </table>

    <div class="pagination">${page}</div>
</div>



<form:form id="searchForm"  action="${ctx}/dljyzx/resultmonth/list" method="post" class="breadcrumb form-search">
    <input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
    <input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
    <%--<input id="userName" name="userName" type="hidden" value="${userName}" />--%>
</form:form>
<script type="text/javascript">
    function page(n,s){
        $("#pageNo").val(n);
        $("#pageSize").val(s);
        $("#searchForm").submit();
        return false;
    }
function filedownLoad(guid,month) {
    var url = "${ctx}/dljyzx/resultmonth/download?guId="
        + guid+"&month="+month;
    //打开下载窗口
    window.open(url, "_parent");
}

    function  confirm(guId) {
        $.ajax({
            type:"post",
            url:"${ctx}/dljyzx/resultmonth/confirm",
            data:{
                "guId":guId
            },
            async:false,
            success:function(data){
                alert(data.msg);
                $("#btnQuery").click();
            }
            ,});
    }


function report(guid,month){


    var name = "申诉页面";
    console.log(guid);
  var   guId= guid.split("&")[0];
    console.log("guId:"+guId)
    var url = "${ctx}/dljyzx/resultmonth/getConfirmInfo?guId="+guId;
    top.$.jBox("iframe:" + url, {
        title: name,
        id:'confirmStatus',
        name:'confirmStatus',
        width: 500, height: 400,
        iframeScrolling: 'yes',
        buttons: {},
        closed: function () {
            $("#btnQuery").click();
        },
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        }
    });


}


</script>
</body>
</html>
