<%--
  Created by IntelliJ IDEA.
  User: hp
  Date: 2020/6/28
  Time: 13:50
  To change this template use File | Settings | File Templates.
--%>
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
        .lock-status{
            width: 100%;
            color: #ff0000;
            font-size: 14px;
            font-weight: 700;
            margin-left: 10px;
            line-height: 30px;
        }
        .link{
            cursor: pointer !important;
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
<form:form id="searchForm1" modelAttribute="" action="${ctx}/dljyzx/settlement/list" method="post" class="breadcrumb form-search">
    <h class="h-font">辅助服务市场结算结果查询</h>
    <ul class="ul-form">
            <%--<li><label>年份：</label>--%>
            <%--<input id="year" name="year" readonly="readonly" maxlength="20" class=" Wdate required"--%>
            <%--onclick="WdatePicker({dateFmt:'yyyy-mm',isShowClear:false});" onchange="queryForm()"/>--%>
            <%--</li>--%>
        <li><label>月份：</label>
            <input style="width: 85px;"
                   id="yearMonth" name="yearMonth" type="text"
                <%--readonly="readonly" maxlength="20" --%>
                   class="input-medium Wdate"
                   value="${seResultDaily.yearMonth}"
                   readonly="readonly"
                    maxlength="20"
                   onfocus="WdatePicker({dateFmt:'yyyy-MM',isShowClear:true})" >
        </li>
        <%--<li><label>状态：</label>--%>
            <%--<select style="width:120px;" name="status" value="">--%>
                <%--<option value="">全部</option>--%>
                <%--<option ${status=="1"?"selected":""} value="1">已确认</option>--%>
                <%--<option ${status=="0"?"selected":""} value="0">未确认</option>--%>
                <%--<option ${status=="2"?"selected":""} value="2">有异议</option>--%>
            <%--</select>--%>
        <%--</li>--%>
        <%--<li><label>户号：</label>--%>
            <%--<input  type="text"  id="consumerNumber" name ="consumerNumber"  value="${consumerNumber}" />--%>
        <%--</li>--%>
        <li class="btns">
            <input id="btnQuery" class="btn btn-primary" type="submit" value="查询"/>
                <%--<input id="btnSubmit" onclick="save('01')" class="btn btn-primary" type="button" value="提交"/>--%>
        </li>
    </ul>
    <%--<span class="lock-status">状态：<span id="lockStatus"></span><span id="status"></span></span>--%>
</form:form>


<sys:message content="${message}"/>
<div id="scrollBox" style="width: 100%; height: 40%; overflow-x: auto;white-space: nowrap ">
    <table id="contentTable" class="table table-striped table-bordered table-condensed ground">
        <thead>
        <tr>
            <th>日期</th>
            <th>交易需求名称</th>
            <%--<th>户号</th>--%>
            <%--<th>所属市场成员名称</th>--%>
            <%--<th>所属售电公司</th>--%>
            <%--<th>结算日期</th>--%>
            <%--<th>申报电力</th>--%>
            <%--<th>实际电力</th>--%>
            <%--<th>实际调节电力</th>--%>
            <%--<th>准确率</th>--%>
            <%--<th>补偿价格（元/兆瓦）</th>--%>
            <%--<th>补偿金额（元）</th>--%>
            <%--<th>考核价格（元/兆瓦）</th>--%>
            <%--<th>考核金额（元）</th>--%>
            <%--<th>电力用户分摊</th>--%>
            <%--<th>售电公司分摊</th>--%>
            <%--<th>电力用户分成</th>--%>
            <%--<th>售电公司分成</th>--%>
            <%--<th>状态</th>--%>
            <%--<th>操作</th>--%>
        </tr>
        </thead>
        <tbody>
        <c:forEach var="seResultDaily" items="${page.list}">
            <tr adjustDate="${seResultDaily.adjustDate}" >
                <td>
                    <a class="link"  onclick="toDetail(this)"  > ${seResultDaily.adjustDateC}</a>
                </td>
                <td>

                    <a class="link" onclick="toTradeSeqIdDetail(this)"   >查看</a>
                </td>



            </tr>

        </c:forEach>
        </tbody>
    </table>

    <div class="pagination">${page}</div>
</div>



<form:form id="searchForm"  action="${ctx}/dljyzx/settlement/list" method="post" class="breadcrumb form-search">
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

    function  confirm(guId) {
        $.ajax({
            type:"post",
            url:"${ctx}/dljyzx/settlement/confirm",
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

    function report(guId){
        var name = "申诉页面";
        var url = "${ctx}/dljyzx/settlement/report?guId="+guId;
        top.$.jBox("iframe:" + url, {
            title: name,
            id:'report',
            name:'report',
            width: 1000, height: 500,
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
    function toDetail(obj){

        var adjustDate=$(obj).parent().parent().attr("adjustDate");

       // alert(tradeseqId);
        var url = "${ctx}/dljyzx/settlement/toDetail?adjustDate="+adjustDate;
        var name = "详细页面";
        var height=window.screen.height*(0.58);
        var width=window.screen.width*(0.58);
        console.log("height:"+height);
        console.log("width:"+width);
        top.$.jBox("iframe:" + url, {
            title: name,
            id:'toDetail',
            name:'toDetail',
            width: width, height: height,
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
    function toTradeSeqIdDetail(obj){
        var adjustDate=$(obj).parent().parent().attr("adjustDate");

        var url = "${ctx}/dljyzx/settlement/look?adjustDate="+adjustDate;
        top.$.jBox("iframe:" + url, {
            title: "交易需求名称页面",
            id:'look',
            name:'look',
            width: 1000, height: 500,
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


