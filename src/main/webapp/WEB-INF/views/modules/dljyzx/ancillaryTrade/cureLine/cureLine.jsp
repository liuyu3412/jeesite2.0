<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page language="java" import="java.text.*,java.util.*" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
<head>
	<title>典型曲线</title>
	<meta name="decorator" content="default"/>
	<%@include file="/WEB-INF/views/modules/cms/front/include/head.jsp" %>
	<script src="${ctx}/static/modules/cms/front/themes/basic/echarts.js"></script>
	<style>
		.top_label_text{
			width: 20%;
			text-align: right;
		}
		.userName{
			font-size: xx-large;
		}
		#table_option td{
			display: flex;
            justify-content: left;
            align-items: center;
		}
	</style>
	</head>
    <body>
    	<div class="infor mt20 oa"  style="margin-top: 28px;">
		<div class="title tc line">典型曲线</div>
		<div class="h_100 w_45 fl">
			<div class="ma" id="jytj" style="width: 100%;height: 500px">
				<div class="line text-center" style="margin: 0 auto;font-weight: 700;">
					<span>选择曲线:</span>
					<select class="select" id="curveId">
						<c:forEach items="${curveInfos}" var="info" varStatus="index">
							<option value="${info.id}">${info.curveName}</option>
						</c:forEach>
					</select>
				</div>	
				<div>
					<table style="width: 96%;">
						<tbody>
							<tr>
								<th width="10%">时段</th>
								<th width="20%">电力兆瓦(MW)</th>
								<%--<th width="20%">补偿价(元/MWH)</th>--%>
								<th width="25%">开始时间</th>
								<th width="25%">结束时间</th>
							</tr>
						</tbody>
					</table>
					<div class="row pre-scrollable" style="width: 100%;margin: 0;">
						<table>
							<tbody>
									<c:forEach items="${detailList}" var="detail" varStatus="index">
										<tr class="text-center powerAndPrice" id="${detail.guid}"  >
											<td width="10%" timeDetailId="${detail.guid}">${detail.time}</td>
											<td width="20%" >
												<input type="number" value="0" id="power" style="width: 50%;"/>
											</td>
											<%--<td width="20%">--%>
												<%--<input type="number" value="0" id="price" style="width: 50%;"/>--%>
											<%--</td>--%>
											<td width="25%">${detail.startTime}</td>
											<td width="25%" class="endTime">${detail.endTime}</td>
										</tr>
									</c:forEach>
							</tbody>
						</table>	
					</div>
				</div>
				<div class="line" style="margin: 3px auto;font-weight: 700;">
					<table id="table_option" style="width: 100%;">
						<tbody>
							<tr>
								<td>
									<span>曲线名称:</span>
									<input type="text" class="curveName" name="curveName" />
									<input type="button" id="btnAdd" class="btn btn-primary" style="margin-left: 5px;" value="增加" />
									<input type="button" id="btnSave" class="btn btn-primary" style="margin-left: 5px;" value="保存" />
								</td>
								<td>
								</td>
							</tr>
							<tr>
								<td>
									<span>曲线备注:</span>
									<textarea  name="description" class="description" id="description" /></textarea>
									<input type="button" id="btnDel" class="btn btn-primary" style="margin-left: 5px;" value="删除" />
									<input type="button" id="btnReset" class="btn btn-primary" style="margin-left: 5px;" value="重置" />
								</td>
								<td>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="h_100 w_55 fl" style="width: 55%;">
			<div class="ma" id="Echarts" style="width: 100%;height: 500px"></div>
		</div>
	</div>
		<script>
			var myChart = echarts.init(document.getElementById('Echarts'));
			
			window.onload=function(){
				init();
				//初始化页面
				function init(){
					sel_change();
				}
				
				$("#btnAdd").on("click",function(){
					
					var jsonObj = getThisHtmlData();
					var detailList = jsonObj.detailList;
					var curveInfo = jsonObj.curveInfo
					
					if(curveInfo.curveName == ""){
						top.jBox.alert("曲线名称不能为空");
						return false;
					}
					
					var detailListStr = JSON.stringify(detailList);
					
					top.jBox.tip("开始添加","loading");
					$.ajax({
						type:"post",
						url:"${ctx}/dljyzx/cureLine/addCurve",
						async:true,
						data:{"curveName":curveInfo.curveName
							  ,"description":curveInfo.description
							  ,"detailListStr":detailListStr},
						success:function(data){
						
							if(data.id){
								$("select[id='curveId']").prepend("<option value=\""+data.id+"\">"+data.curveName+"</option>");
								$("#curveId option[value='"+data.id+"']").prop("selected", true);
								top.jBox.tip("增加成功","success");
							}else{
							
								top.jBox.tip("增加失败","error");
							}
							
						},
						error:function(){
							top.jBox.alert("网络连接异常");
						}
					});
				})
				
				$("#btnSave").on("click",function(){
					//96时间段数据
					var jsonObj = getThisHtmlData();
					var detailList = jsonObj.detailList;
					var curveInfo = jsonObj.curveInfo
					
					if(curveInfo.id==null){
						top.jBox.alert("未选择曲线");
						return false;
					}
					if(curveInfo.curveName == ""){
						top.jBox.alert("曲线名称不能为空");
						return false;
					}
					
					var detailListStr = JSON.stringify(detailList);
					
					top.jBox.tip("开始保存","loading");
					$.ajax({
						type:"post",
						url:"${ctx}/dljyzx/cureLine/save",
						async:true,
						data:{"id":curveInfo.id
							  ,"curveName":curveInfo.curveName
							  ,"description":curveInfo.description
							  ,"detailListStr":detailListStr},
						success:function(data){
						
							if(data.id){
								$("option[value='"+curveInfo.id+"']").text(curveInfo.curveName);
								top.jBox.tip("保存成功","success");
							}else{
								top.jBox.tip("保存失败","error");
							}
							
						},
						error:function(){
							top.jBox.alert("网络连接异常");
						}
					});
				})
				
				$("#btnDel").on("click",function(){
				
					if(!confirm("确认删除当前曲线?")){
						return false;
					}
					var jsonObj = getThisHtmlData();
					var curveInfo = jsonObj.curveInfo
					if(curveInfo.id==null){
						top.jBox.alert("未选择曲线");
						return false;
					}
					top.jBox.tip("开始删除","loading");
					$.ajax({
						type:"post",
						url:"${ctx}/dljyzx/cureLine/del",
						async:true,
						data:{"id":curveInfo.id},
						success:function(data){
						
							if(data.id){
								$("#curveId").find("option[value='"+data.id+"']").remove();
								if($("#curveId").find("option").length==0){
									$("input[id='power']").val(0);
									$("input[id='price']").val(0);
									$("input[class='curveName']").val("");
									$("textarea[class='description']").val("");
									var option = myChart.getOption();
									option.series[0].data = [];
									option.series[1].data = [];
									myChart.setOption(option);
								}else{
									$("#curveId").find("option:eq(0)").prop("selected", true);
									sel_change();
								}
								
								top.jBox.tip("删除成功","success");
							}else{
								top.jBox.tip("删除失败","error");
							}
							
						},
						error:function(){
							top.jBox.alert("网络连接异常");
						}
					});
				
				})
				
				$("#btnReset").on("click",function(){
					sel_change();
				})
				
				$("input[id='power']").on("input",function(){
					
					var powers = [];
					powers.push(null);
					
					$("input[id='power']").each(function(){
						powers.push($(this).val());
					});
					var option = myChart.getOption();
					option.series[0].data = powers;
					myChart.setOption(option);
				
				})
				
				$("input[id='price']").on("input",function(){
					var prices = [];
					prices.push(null);
					
					$("input[id='price']").each(function(){
						prices.push($(this).val());
					});
					var option = myChart.getOption();
					option.series[1].data = prices;
					myChart.setOption(option);
				})
				
				//曲线选择事件
				$("#curveId").on("change",function(){
					sel_change();
				})
				
				//获取页面当前数据
				function getThisHtmlData(){
					
					var detailList = [];
					$("tr[class~='powerAndPrice']").each(function(){
						var detail = {};
						//返回id的值给detail.guid
						detail.guid = $(this).attr("id");
						detail.timeDetailId = $(this).find("td:eq(0)").attr("timeDetailId");
						
						var power = $(this).find("input[id='power']").val()
						if(power==""){
							$(this).find("input[id='power']").val(0)
							power = 0;
						}
						var price = $(this).find("input[id='price']").val()
						if(price==""){
							$(this).find("input[id='price']").val(0)
							price = 0;
						}
						detail.tradePower = power;
						detail.tradePrice = price;
						detailList.push(detail);
					});
					
					var curveInfo = {};
					curveInfo.id = $("#curveId option:selected").val();
					curveInfo.curveName = $("input[class='curveName']").val();
					curveInfo.description = $("textarea[class='description']").val();
					
					
					var jsonObj = {};
					jsonObj.curveInfo = curveInfo;
					jsonObj.detailList = detailList;
					
					return jsonObj;
				}
				
				//select 选中事件
				function sel_change(){
					var curveIdSel = $("#curveId option:selected").val();
					//echarts图标中数据信息
					var chartDataObj = {};
					//下放曲线信息
					var lineDateObj = {};
					
					var timeDateils = [];
					chartDataObj = {};//echarts图标中数据信息
					lineDateObj = {};//下放曲线信息
					top.jBox.tip("开始获取","loading");
					$.ajax({
						type:"post",
						url:"${ctx}/dljyzx/cureLine/getInfoDetail",
						data:{"curveId":curveIdSel},
						async:false,
						success:function(data){
						
							top.jBox.tip("获取成功","success");
							if(!data){
								return false;
							}
							
							//获取选中曲线
							chartDataObj.description = data.curveName;
						    timeDateils = data.curveData;
						    lineDateObj.curveName = data.curveName;
						    lineDateObj.description = data.description;
							
							//设置下放内容
							$("input[class='curveName']").val(lineDateObj.curveName);
							$("textarea[class='description']").val(lineDateObj.description);
							
							
							chartDataObj.axis = [];
							chartDataObj.powers = [];
							chartDataObj.prices = [];
							//将曲线放入表格中
							if(timeDateils!=null && timeDateils.length!=0){
								for (var i = 0; i < timeDateils.length; i++) {
									var obj = timeDateils[i];
									if(i==0){
										chartDataObj.axis.push("00:00");
										chartDataObj.powers.push(null);
										chartDataObj.prices.push(null);
									}
									chartDataObj.axis.push(obj.endTime);
									var tr = $("tr[id='"+timeDateils[i].timeDetailId+"']");
									//发现tr元素的自雷或者是父类
									tr.find("#power").val(obj.tradePower);
									tr.find("#price").val(obj.tradePrice);
									chartDataObj.powers.push(obj.tradePower);
									chartDataObj.prices.push(obj.tradePrice);
								}
							}else{
								chartDataObj.axis.push("00:00");
								$("tr[class~='powerAndPrice']").each(function(){
									chartDataObj.axis.push($(this).find("td[class='endTime']").text());
								});
							}
							//展示曲线图形
							myChart.setOption({
							    title: {
							        text: '时段曲线图'
							    },
							    tooltip: {
							        trigger: 'axis'
							    },
							    legend: {
							        show:true,
							        data: ["电力曲线"]
							    },
							    grid: {
							        left: '3%',
							        right: '4%',
							        bottom: '3%',
							        containLabel: true
							    },
							    xAxis: {
							        type: 'category',
							        data: chartDataObj.axis
							    },
							    yAxis: {
							        type: 'value'
							    },
							    series: [
							        {
							            name: "电力曲线",
							            type: 'line',
							            step: 'start',
							            data: chartDataObj.powers
							        }
							        // ,{
							        //     name: "电价曲线",
							        //     type: 'line',
							        //     step: 'start',
							        //     data: chartDataObj.prices
							        // }
							    ]
							});
						},
						error:function(){
							top.jBox.tip("获取失败","success");
							top.jBox.alert("网络连接异常");
						}
					});
				}
			}
		</script>
 	</body>
</html>