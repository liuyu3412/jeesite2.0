<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<title>单表管理1231231</title>
	<meta name="decorator" content="default"/>
	<script type="text/javascript">
		$(document).ready(function() {
			//$("#name").focus();
			$("#inputForm").validate({
				submitHandler: function(form){
					loading('正在提交，请稍等...');
					form.submit();
				},
				errorContainer: "#messageBox",
				errorPlacement: function(error, element) {
					$("#messageBox").text("输入有误，请先更正。");
					if (element.is(":checkbox")||element.is(":radio")||element.parent().is(".input-append")){
						error.appendTo(element.parent().parent());
					} else {
						error.insertAfter(element);
					}
				}
			});
		});
	</script>
</head>
<body>
	<ul class="nav nav-tabs">
		<li><a href="${ctx}/cms/dianUser/">单表列表</a></li>
		<li class="active"><a href="${ctx}/cms/dianUser/form?id=${dianUser.id}">单表<shiro:hasPermission name="cms:dianUser:edit">${not empty dianUser.id?'修改':'添加'}</shiro:hasPermission><shiro:lacksPermission name="cms:dianUser:edit">查看</shiro:lacksPermission></a></li>
	</ul><br/>
	<form:form id="inputForm" modelAttribute="dianUser" action="${ctx}/cms/dianUser/save" method="post" class="form-horizontal">
		<form:hidden path="id"/>
		<sys:message content="${message}"/>		
		<div class="control-group">
			<label class="control-label">客户名称：</label>
			<div class="controls">
				<form:input path="name" htmlEscape="false" maxlength="50" class="input-xlarge required"/>
				<span class="help-inline"><font color="red">*</font> </span>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">注册日日期：</label>
			<div class="controls">
				<input name="created" type="text" readonly="readonly" maxlength="20" class="input-medium Wdate required"
					value="<fmt:formatDate value="${dianUser.created}" pattern="yyyy-MM-dd HH:mm:ss"/>"
					onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',isShowClear:false});"/>
				<span class="help-inline"><font color="red">*</font> </span>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">联系人：</label>
			<div class="controls">
				<form:input path="linkedName" htmlEscape="false" maxlength="50" class="input-xlarge "/>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">联系电话：</label>
			<div class="controls">
				<form:input path="linkedPhone" htmlEscape="false" maxlength="13" class="input-xlarge "/>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">组织机构代码：</label>
			<div class="controls">
				<form:input path="organizationCode" htmlEscape="false" maxlength="32" class="input-xlarge "/>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">营业执照号码：</label>
			<div class="controls">
				<form:input path="businessCode" htmlEscape="false" maxlength="50" class="input-xlarge "/>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">企业编号：</label>
			<div class="controls">
				<form:input path="seqNo" htmlEscape="false" maxlength="20" class="input-xlarge "/>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">状态：</label>
			<div class="controls">
				<select name="statuz"  maxlength="1" class="input-xlarge">
					<option value=>--请选择--</option>
					<option value=1 <c:if test="${dianUser.statuz eq 1}"> selected </c:if>>待审核</option>
					<option value=2 <c:if test="${dianUser.statuz eq 2}">selected</c:if>>审核通过</option>
					<option value=3 <c:if test="${dianUser.statuz eq 3}">selected</c:if>>审核失败</option>
				</select>
			</div>
		</div>
		<div class="form-actions">
			<shiro:hasPermission name="cms:dianUser:edit"><input id="btnSubmit" class="btn btn-primary" type="submit" value="保 存"/>&nbsp;</shiro:hasPermission>
			<input id="btnCancel" class="btn" type="button" value="返 回" onclick="history.go(-1)"/>
		</div>
	</form:form>
</body>
</html>