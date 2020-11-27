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
    <title>出清查询</title>
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
<form:form id="searchForm1" modelAttribute="" action="${ctx}/dljyzx/clear/list" method="post" class="breadcrumb form-search">
    <h class="h-font">辅助服务市场出清结果查询</h>
    <ul class="ul-form">
        <%--<li><label>年份：</label>--%>
            <%--<input id="year" name="year" readonly="readonly" maxlength="20" class=" Wdate required"--%>
                   <%--onclick="WdatePicker({dateFmt:'yyyy-mm',isShowClear:false});" onchange="queryForm()"/>--%>
        <%--</li>--%>
            <li><label>调用日期：</label>
                <input
                        <%--style="height: 20px; width: 100px;"--%>
                        style="width: 85px"
                       id="callTime" name="callTime" type="text"
                       <%--readonly="readonly" maxlength="20" --%>
                       class="input-medium Wdate"
                        readonly="readonly"
                       value="${callTime}"
                       onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:true})" >
            </li>
        <li><label>中标结果：</label>
            <select style="width:120px;" name="clearStatus" value="${clearStatus}">
                <option value="">全部</option>
                <option ${clearStatus=="1"?"selected":""}  value="1">已中标</option>
                <option  ${clearStatus=="0"?"selected":""}  value="0">未中标</option>
            </select>
        </li>
        <li><label>户号：</label>
            <input  type="text"  id="consumerNumber" name ="consumerNumber"  value="${consumerNumber}" />
        </li>
        <li class="btns">
            <input id="btnQuery" class="btn btn-primary" type="submit" value="查询"/>
            <%--<input id="btnSubmit" onclick="save('01')" class="btn btn-primary" type="button" value="提交"/>--%>
        </li>
    </ul>
    <%--<span class="lock-status">状态：<span id="lockStatus"></span><span id="status"></span></span>--%>
</form:form>


<sys:message content="${message}"/>
<div id="scrollBox" class="infor_t" style="height: 30%; overflow-x: auto;" >
    <table id="contentTable" class="table table-striped table-bordered table-condensed ground">
        <%--<h class="h-font">出清结算查询</h>--%>
        <thead>
        <tr>

            <th>市场成员名称</th>
            <th>户号</th>
            <th>序列名称</th>
            <th>出清时间</th>
            <th>申报时间</th>
            <th>调用日期</th>
            <th>出清状态</th>
            <th>电价（元/兆瓦）</th>
            <th>可调负荷(兆瓦)</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody class="ground">
        <c:forEach var="cr" items="${clearResult}">
            <%-- <span  style="display: none"> ${clearInquiry.tradeSeqId}</span> --%>
            <tr guid="" code="">
                <%--<td>--%>
                    <%--<input type="checkbox" class="checkValue" ${ind.atts==true?"checked":""}/>--%>
                <%--</td>--%>
                <td style="white-space:nowrap;">
                        ${cr.participantName}
                </td>

                <td style="white-space:nowrap;">
                        ${cr.consNo}
                </td>
                <td style="white-space:nowrap;">
                        <%-- ${clearInquiry.seqName} --%>
                </td>
                <td style="white-space:nowrap;">
                        ${cr.dataTime}
                </td>
                <td  style="white-space:nowrap;">
                        <%-- ${clearInquiry.reportTime} --%>
                </td>
                <td style="white-space:nowrap;">
                        ${cr.dataTime}
                </td>
                <%-- <td style="display: none">
                            ${clearInquiry.callTime}
                </td> --%>
                <td style="white-space:nowrap;">
                       <%--  ${clearInquiry.clearStatus} --%>
                </td>
                <td style="white-space:nowrap;">
                        <%-- ${clearInquiry.bidPrice} --%>
                </td>
                <td style="white-space:nowrap;">
                        <%-- ${clearInquiry.bidPower} --%>
                </td>
                <td style="white-space:nowrap;">
                    <%-- <a  href="javascript:void(0)"  class="link"  onclick="javaScript:queryTimePeriod('${clearInquiry.callTime}','${clearInquiry.consumerNumber}','${clearInquiry.tradeSeqId}','${clearInquiry.clearStatus}')"><span>查看 </span></a> --%>
                    <a  href="javascript:void(0)"  class="link"  onclick="javaScript:queryClear('${cr}')"><span>查看 </span></a>
                </td>
            </tr>

        </c:forEach>

        </tbody>
        <tr  style="background-color: white;">
            <td style="background-color: white;">
            </td>
            <td style="background-color: white;">
            </td>
            <td style="background-color: white;">
            </td>
            <td style="background-color: white;">
            </td>
            <td style="background-color: white;">
            </td>
            <td style="background-color: white;">
            </td>
            <td style="background-color: white;">
            </td>
            <td style="background-color: white;">
            </td>
            <td style="white-space:nowrap;">
                合计：${decimal}
            </td>
            <td style="background-color: white;">
            </td>


        </tr>
    </table>

</div>

    <div class="pagination">${page}</div>



<form:form id="searchForm"  action="${ctx}/dljyzx/clear/list" method="post" class="breadcrumb form-search">
    <input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
    <input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
    <%--<input id="userName" name="userName" type="hidden" value="${userName}" />--%>
</form:form>
<script type="text/javascript">
    var myChart = echarts.init(document.getElementById('Echarts'));
    function page(n,s){
        $("#pageNo").val(n);
        $("#pageSize").val(s);
        $("#searchForm").submit();
        return false;
    }
    function queryTimePeriod(callTime,consumerNumber,tradeSeqId,clearStatus){

        var name = "查询页面";
        var url = "${ctx}/dljyzx/clear/queryTime?callTime="+callTime+"&consumerNumber="+consumerNumber+"&tradeSeqId="+tradeSeqId+"&clearStatus="+clearStatus;
        top.$.jBox("iframe:" + url, {
            title: name,
            id:'queryTime',
            name:'queryTime',
            width: 1100, height: 700,
            iframeScrolling: 'yes',
            buttons: {},
            closed: function () {
            },
            loaded: function (h) {
                $(".jbox-content", top.document).css("overflow-y", "hidden");
            }
        });
    }
    
    function queryClear(clearResult) {
    	var t = clearResult.split("dataType=10,")[1];
    	t = t.split(",updateTime")[0];
    	t = t.replace(/p\d+=/g,"");
    	var url = "${ctx}/dljyzx/clear/queryClear?clearResult=" + t;
    	top.$.jBox("iframe:" + url, {
             title: '出清查询',
             id:'queryTime',
             name:'queryTime',
             width: 1100, height: 600,
             iframeScrolling: 'yes',
             buttons: {},
             closed: function () {
             },
             loaded: function (h) {
                 $(".jbox-content", top.document).css("overflow-y", "hidden");
             }
         });
    	//console.log(clearResult)
    }
</script>
</body>
</html>


