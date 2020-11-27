<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp" %>
<html>
<head>
    <title>单表管理</title>
    <meta name="decorator" content="default"/>
    <script type="text/javascript">

        var cookie = {
            set: function (key, val, time) {//设置cookie方法
                var date = new Date(); //获取当前时间
                var expiresDays = time;  //将date设置为n天以后的时间
                date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
                document.cookie = key + "=" + val + ";expires=" + date.toGMTString();  //设置cookie
            },
            get: function (key) {//获取cookie方法
                /*获取cookie参数*/
                var getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
                var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
                var tips;  //声明变量tips
                for (var i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
                    var arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
                    if (key == arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                        tips = arr[1];   //将cookie的值赋给变量tips
                        break;   //终止for循环遍历
                    }
                }
                return tips;
            },
            delete: function (key) { //删除cookie方法
                var date = new Date(); //获取当前时间
                date.setTime(date.getTime() - 10000); //将date设置为过去的时间
                document.cookie = key + "=v; expires =" + date.toGMTString();//设置cookie
            }

        }
        //cookie已存id
        var checkedId = cookie.get("checkedIds");
        // var checkedId = $('#checkedIds').val();
        var checkedIds = [];
        if(checkedId){
            console.log(checkedId)
            checkedIds = checkedId.split(',');
        }

        function page(n, s) {
            $("#pageNo").val(n);
            $("#pageSize").val(s);
            $('#checkedIds').val(checkedIds);
            $("#searchForm").submit();
            return false;
        }

        function btn_ExPortPage() {
            var obj = $("#searchForm").serialize();
            var params = $.param(obj);
            document.location.href = "${ctx}/cms/dianUser/downExcle?" + params;
        }

        function alertDetail(mess,failDetail){
            $.jBox({
                state1: {
                    content: mess,
                    buttons: { '详情': 1, '取消': 0 },
                    buttonsFocus: 0,
                    submit: function (v, h, f) {
                        if (v == 0) {
                            $("#searchForm").submit();
                            return true; // close the window
                        }
                        else {
                            $.jBox.nextState(); //go forward
                            // 或 $.jBox.goToState('state2')
                        }
                        return false;
                    }
                },
                state2: {
                    content: failDetail,
                    buttons: { '上一步': 1, '取消': 0 },
                    buttonsFocus: 0,
                    submit: function (v, h, f) {
                        if (v == 0) {
                            $("#searchForm").submit();
                            return true; // close the window
                        } else {
                            $.jBox.prevState() //go back
                            // 或 $.jBox.goToState('state1');
                        }
                        return false;
                    }
                }
            });
            // top.$('.jbox-body .jbox-icon').css('top','55px');
        }

        function upExcle() {
            var oFormData = new FormData();
            var uploadForm = document.getElementById('btnFile');
            var pic = uploadForm.files[0];
            oFormData.append('file', pic);
            $.ajax({
                type: 'POST',
                url: '${ctx}/cms/dianUser/uploadExcle',
                data: oFormData,
                dataType: 'json',
                cache: false, // 不要缓存
                processData: false, // 不需要进行数据的转换
                contentType: false // 不要默认的 application/x-www-form-urlencoded 类型，因为 form 表单已经指定了
            }).done(function (data) {
                if (data.code == 200) {
                    alertDetail(data.msg,data.failDetail);
                } else {

                }
            }).fail(function (err) {
            });
        }

        function checkAll() {
            var all = document.getElementById('all');//获取到点击全选的那个复选框的id
            var one = document.getElementsByName('checkname[]');//获取到复选框的名称
            if (all.checked == true) {//因为获得的是数组，所以要循环 为每一个checked赋值
                for (var i = 0; i < one.length; i++) {
                    one[i].checked = true;
                    if(checkedIds.indexOf(one[i].id)==-1){
                        checkedIds.push(one[i].id)
                    }
                }
            } else {
                for (var j = 0; j < one.length; j++) {
                    one[j].checked = false;
                    for (var i = 0; i < checkedIds.length; i++) {
                        if (one[j].id == checkedIds[i]) {
                            checkedIds.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            cookie.set("checkedIds",checkedIds,1);
        }

        function checkOne(m) {
            var f = true;
            var all = document.getElementById('all');//获取到点击全选的那个复选框的id
            var one = document.getElementsByName('checkname[]');//获取到复选框的名称
            for (var i = 0; i < one.length; i++) {
                if (one[i].checked != f) {
                    all.checked = false;
                    break;
                }
                all.checked = f;
            }
            if (m.is(":checked")) {
                if(checkedIds.indexOf(m.attr("id"))==-1){
                    checkedIds.push(m.attr("id"))
                }
            } else {
                for (var i = 0; i < checkedIds.length; i++) {
                    if (m.attr("id") == checkedIds[i]) {
                        checkedIds.splice(i, 1);
                        break;
                    }
                }
            }
            cookie.set("checkedIds",checkedIds,1);
        }

    </script>
</head>
<body>
<ul class="nav nav-tabs">
    <li class="active"><a href="${ctx}/cms/dianUser/">单表列表</a></li>
    <shiro:hasPermission name="cms:dianUser:edit">
        <li><a href="${ctx}/cms/dianUser/form">单表添加</a></li>
    </shiro:hasPermission>
</ul>
<form:form id="searchForm" modelAttribute="dianUser" action="${ctx}/cms/dianUser/" method="post"
           class="breadcrumb form-search">
    <input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
    <input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
    <input id="checkedIds" name="checkedIds" type="hidden" value="${checkedIds}"/>
    <ul class="ul-form">
        <li><label>客户名称：</label>
            <form:input path="name" htmlEscape="false" maxlength="50" class="input-medium"/>
        </li>
        <li><label>组织机构码：</label>
            <form:input path="organizationCode" htmlEscape="false" maxlength="50" class="input-medium"/>
        </li>
        <li><label>企业编号：</label>
            <form:input path="seqNo" htmlEscape="false" maxlength="50" class="input-medium"/>
        </li>
        <li><label>状态：</label>
                <%--		<form:input path="statuz" htmlEscape="false" maxlength="50" class="input-medium"/>--%>
            <select name="statuz" maxlength="50" class="input-medium">
                <option value=>全部</option>
                <option value=1 <c:if test="${dianUser.statuz eq 1}"> selected </c:if>>待审核</option>
                <option value=2 <c:if test="${dianUser.statuz eq 2}">selected</c:if>>审核通过</option>
                <option value=3 <c:if test="${dianUser.statuz eq 3}">selected</c:if>>审核失败</option>
            </select>
        </li>
        <li class="btns"><input id="btnSubmit" class="btn btn-primary" type="submit" value="查询"/></li>
        <li class="clearfix"></li>
        </li>
        <li class="btns"><input id="downExcle" class="btn btn-primary" type="button" onclick="btn_ExPortPage()"
                                value="导出"/></li>
        <li class="clearfix"></li>
        </li>
        <li class="btns">
            <input id="uploadExcle" class="btn btn-primary" type="button"
                   onclick="document.getElementById('btnFile').click();" value="导入"/>
        </li>
        <input type="file" id="btnFile" onchange="upExcle()" style="display:none">
        <li class="clearfix"></li>
    </ul>
</form:form>
<sys:message content="${message}"/>
<table id="contentTable" class="table table-striped table-bordered table-condensed">
    <thead>
    <tr>
        <th><input type="checkbox" id="all" onclick="checkAll()"/>全选</th>
        <th>客户名称</th>
        <th>组织机构代码</th>
        <th>营业执照号码</th>
        <th>企业编号</th>
        <th>联系人</th>
        <th>联系方式</th>
        <th>状态</th>
        <th>注册时间</th>
        <shiro:hasPermission name="cms:dianUser:edit">
            <th>操作</th>
        </shiro:hasPermission>
    </tr>
    </thead>
    <tbody>
    <c:forEach items="${page.list}" var="dianUser">
        <tr>
            <td><input type="checkbox" id="${dianUser.id}" name="checkname[]"
                       <c:if test="${dianUser.checked eq 1}">checked</c:if>
                       onclick="checkOne($(this))"/></td>
            <td><a href="${ctx}/cms/dianUser/form?id=${dianUser.id}">
                    ${dianUser.name}
            </a></td>
            <td>${dianUser.organizationCode}</td>
            <td>${dianUser.businessCode}</td>
            <td>${dianUser.seqNo}</td>
            <td>${dianUser.linkedName}</td>
            <td>${dianUser.linkedPhone}</td>
            <td>
                <c:if test="${dianUser.statuz eq 1}">待审核</c:if>
                <c:if test="${dianUser.statuz eq 2}">审核成功</c:if>
                <c:if test="${dianUser.statuz eq 3}">审核失败</c:if>
            </td>
            <td><fmt:formatDate value="${dianUser.created}" type="date" pattern="yyyy-MM-dd"/></td>
            <shiro:hasPermission name="cms:dianUser:edit">
                <td>
                    <a href="${ctx}/cms/dianUser/form?id=${dianUser.id}">修改</a>
                    <a href="${ctx}/cms/dianUser/delete?id=${dianUser.id}"
                       onclick="return confirmx('确认要删除该单表吗？', this.href)">删除</a>
                </td>
            </shiro:hasPermission>
        </tr>
    </c:forEach>
    </tbody>
</table>
<div class="pagination">${page}</div>
</body>
</html>
