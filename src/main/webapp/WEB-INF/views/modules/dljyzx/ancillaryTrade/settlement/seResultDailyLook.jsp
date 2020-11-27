<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page language="java" import="java.text.*,java.util.*" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
<head>
	<title>查看页面</title>
	<meta name="decorator" content="cms_default_${site.theme}"/>
	<meta name="description" content="JSEPC " />
	<meta name="keywords" content="JSEPC " />
	<%@include file="/WEB-INF/views/modules/cms/front/include/head.jsp" %>
	<style>
		table{
			width: 100%;
		}
		td{
			padding: 5px;
		}
		.tr_top{
			text-align: center;
		}
		.tr_left{
			text-align: right;
			width: 30%;
		}
		.tr_bottom{
			text-align: center;
			color: red;
		}

	</style>
</head>
<body>
	<form:form id="inputForm"  action="${ctx}/dljyzx/settlement/save" enctype="multipart/form-data" method="post" class="form-horizontal breadcrumb form-search" >
		<table>
			<li class="tr_left">
				<li>
					序号:交易需求名称
					<%--<input style="display: none;" value="${singleInfo.guId}" name="guId" />--%>
				</li>
			</li>
			<br>
			<br>
			<c:forEach var="seResultDaily" items="${list}" varStatus="stauts">
			<li>
				<li class="tr_left">
					<li>${stauts.count}:</li>
						<%--<input type="text" class="input" name="reportUser" id="reportUser" placeholder="xxxxxxxxxxxxx" />--%>
						${seResultDaily.seqName}
						<%--<input style="display: none;" value="${ReportDetil.reportUser}" id="reportUser" name="reportUser" />--%>
				</li>
			</li>
			<br>
			<br>
			</c:forEach>
			<%--<li>--%>
				<%--<li class="tr_left" >--%>
					<%--<li>确认结果：--%>
					<%--<select style="width: 120px"  name="status" >--%>
						<%--<option value=""></option>--%>
						<%--<option ${status=="未确认"?"selected":""}  value="未确认">未确认</option>--%>
						<%--<option  ${status=="已确认"?"selected":""}  value="已确认">已确认</option>--%>
					<%--</select>--%>
					<%--</li>--%>
				<%--</li>--%>
			<%--</li>--%>
			<%--<br>--%>
			<%--<br>--%>
			<%--<li class="tr_left">--%>
				<%--<li >说明:</li>--%>
					<%--<textarea  style="width: 40%"  name="explainText" id="explainText" value="2019" /></textarea>--%>
					<%--&lt;%&ndash;<span class="place" style="color: red;">可输入400个汉字</span>&ndash;%&gt;--%>
			<%--&lt;%&ndash;oninput="placeLength(this)"&ndash;%&gt;--%>
			<%--</li>--%>
			<%--<br>--%>
			<%--<br>--%>
			<%--<li>--%>
				<%--<li>--%>
					<%--<input type="submit" class="btn btn-primary" id="submitBtn" value="提交" />--%>
				<%--</li>--%>
			<%--</li>--%>
			<%--<br>--%>
			<%--<br>--%>
		</table>
	</form:form>

		<%--<c:if test="${resultObj == 'ok'}">--%>
			<%--<div style="text-align: center;width: 80%;font-size: 10px;padding: 100px;color: red;">--%>
				<%--提交成功,可以关闭窗口<br/><br/><br/>--%>
				<%--<span class="ss_text"></span>--%>
			<%--</div>--%>

		<%--</c:if>--%>
		<%--<c:if test="${resultObj == 'error'}">--%>
			<%--<div style="text-align: center;width: 80%;font-size: 50px;padding: 100px;color: red;">--%>
				<%--提交失败!<br/><br/><br/>--%>
				<%--&lt;%&ndash;<input type="button" class="btn btn-primary" id="againFrom" value="重新举报" />&ndash;%&gt;--%>
			<%--</div>--%>
			<%--&lt;%&ndash;<script>&ndash;%&gt;--%>
                <%--&lt;%&ndash;$("#againFrom").on("click",function(){&ndash;%&gt;--%>
                    <%--&lt;%&ndash;$(location).attr('href', 'dljyzx/report/addReport?pid=${reportTargetPid}');&ndash;%&gt;--%>
                <%--&lt;%&ndash;})&ndash;%&gt;--%>
			<%--&lt;%&ndash;</script>&ndash;%&gt;--%>
		<%--</c:if>--%>


</body>
<script>


</script>
</html>