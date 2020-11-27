<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>江苏电力交易中心</title>
	<meta name="decorator" content="default"/>
	<script type="text/javascript" src="${ctxStatic}/js/util/util.js"></script>
</head>
<body >
<div>&nbsp;</div>
<div>
	<form id="fileForm" enctype="multipart/form-data" method="post" action="${ctx}/dljyzx/settlement/save">

		<table class="formTable" style="width: 100%;">
			<tr>
				<td style="width: 100px" align="right">
					标题:
				</td>
				<td style="position: relative; left: 10px;">
					<li  id="title" name="seqName" tipBottom="true" autocomplete="off" maxlength="20" data-options="required:true,validType:'fjNameRex'" style=" width: 320px ;list-style-type: none" >${seqName}</li>
				</td>

			</tr>
			<tr height="8px"></tr>
			<tr>
				<td style="width: 100px;" align="right">
					确认选择:
				</td>
				<td style="position: relative; left: 10px;">
					<select id="type" style="width: 150px;" name="status">
						<option  ${status=="2"?"selected":""} value="2">有异议</option>
					</select>
				</td>
			</tr>


			<tr>
				<td style="width: 100px" align="right">
					说明:
				</td>
				<td>
					<textarea  style="width: 50%"  name="explainText" id="explainText"  value="${explainText}" placeholder="如不确认请简要说明"/></textarea>
				</td>

				<%--<span class="place" style="color: red;">可输入400个汉字</span>--%>
				<%--oninput="placeLength(this)"--%>
			</tr>
			<tr>
				<td style="width: 100px" align="right">
					<label  style="color: red;">*</label>选择附件</label></label>
					<%--style="height: 25px; width: 260px"--%>
				</td>
				<td>
					<input style="border:0px" class="file" type="file" id="file" name="file" tipBottom="true"  class="easyui-validatebox"  />
				</td>
			</tr>
            <c:if test="${'1' == number }">
                <tr>
                    <td style="width: 100px" align="right">
                        申诉文件:
                    </td>
                    <td style="position: relative; left: 10px; ">
                        <li     id="reportdownFile" name="reportdownFile" tipBottom="true" autocomplete="off" maxlength="20" data-options="required:true,validType:'fjNameRex'" style=" width: 260px ;list-style-type: none" >
                            <a  href="#"
                                <%--onclick="reportpdfdown('${singleInfo.guId}')"--%>
                                style="color: #5eb1fd; text-decoration: underline">点击下载</a>
                        </li>

					</td>
                </tr>
            </c:if>
			<tr style="display: none">
				<%--<td><input id="participantid" name="participantid"  value="${singleInfo}"></td>--%>
				<td><input  name="guIds" value="${guIds}"></td>
			</tr>

		</table>
		<input style="margin: 0px 150px 0px 150px" type="button" id ="pdfSubmit"  value="保存" class="btn-primary"  />
	<div>
		<span id="msg" style="margin: 0px 150px 0px 150px ;display: none ">${msg}</span>
	</div>
	</form>
</div>
<script type="text/javascript">
    alertInfo();
	function alertInfo() {
		var  msg =$("#msg").text();
		console.log(msg)
		if(msg!=''&&msg!=null){
            top.$.jBox.tip("操作成功", "success");
            window.parent.window.jBox.close("report");
		}
    }
    function   reportpdfdown(guId){
        var url = "${ctx}/dljyzx/settlement/reportpdfdown?guId="
            + guId;
        window.open(url, "_parent");
    }
    function   reportpdfview(guId){
        var url = "${ctx}/dljyzx/settlement/reportpdfview?guId="
            + guId;
        window.open(url, "_blank");
    }







    $("#pdfSubmit").on("click",function(){

        var explainText = $("#explainText").val();
        var pdfSubmit = $("#file").val().split(".");
        var pdfstr = pdfSubmit[pdfSubmit.length-1];
        var filesSize = 0;
        var uploadSize = null;
        if(!$("#file")[0].files[0]){
            top.$.jBox.info('请添加附件', "上传错误");
            return;
        }else{
            filesSize = parseFloat($("#file")[0].files[0].size/(1024*1024));
            uploadSize = filesSize<=10?true:false;
        }

        var blo = true;

        if(explainText==""){
            top.$.jBox.info('请填写内容描述', "上传错误");
            blo = false;
        }
        if(!(pdfstr == "pdf" || pdfstr == "PDF")){
            top.$.jBox.info('上传附件请选择PDF格式', "上传错误");
            blo = false;
        }
        if(!uploadSize){
            top.$.jBox.info('上传附件不可超过10M', "上传错误");
            blo = false;
        }
        if(blo){
            $("#fileForm").submit();
        }

    })

</script>
</body>
</html>