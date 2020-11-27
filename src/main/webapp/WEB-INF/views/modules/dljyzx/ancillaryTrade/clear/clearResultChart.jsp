<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page language="java" import="java.text.*,java.util.*" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
	<script type="text/javascript" src="${ctxStatic}/modules/cms/front/themes/basic/conSignJs/jquery-1.7.2.min.js"></script>
    <script type="text/javascript"	src="${ctxStatic}/modules/cms/front/themes/basic/conSignJs/jquery.jBox-2.3.min.js"></script>
    <link href="${ctxStatic}/modules/cms/front/themes/basic/conSignCSS/jbox.css" rel="stylesheet" type="text/css" />
    <%@include file="/WEB-INF/views/modules/cms/front/include/head.jsp" %>
    <meta name="decorator" content="default"/>
    <meta charset="utf-8">
	<title>出清图表</title>
</head>
<body>
	<div id="clearChart" style="height: 300px; width: 1100px;"></div>
	<div id="clearTable" style="margin-top: 30px;">
		<table id="mainTable" style="width: 98%; margin-left: 1%;"></table>
	</div>
	
	<script type="text/javascript">
		window.viewObj = {
			tableHead: [
				['时间段', '15', '30', '45', '00', '15', '30', '45', '00', '15', '30', '45', '00', '15', '30', '45', '00'],
				['0/1/2/3', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
				['4/5/6/7', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
				['8/9/10/11', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
				['12/13/14/15', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
				['16/17/18/19', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
				['20/21/22/23', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
			],
			clearResult: '${clearResult}'
		}
		
		createTable("#mainTable");
		function createTable(tableId) {
			$(tableId).empty();
			var datas = getYData();
			console.log(datas)
			for (var i = 0; i < viewObj.tableHead.length; i ++) {
				var tr = $("<tr></tr>");
				for (var j = 0; j < viewObj.tableHead[i].length; j ++) {
					if (i == 0 || j == 0) {
						if (j == 0) tr.append("<td style='width: 12%;'>" + viewObj.tableHead[i][j] + "</td>");
						else tr.append("<td style='width: 5.5%;'>" + viewObj.tableHead[i][j] + "</td>");
					} else {
						var len = viewObj.tableHead[i].length - 1;
						console.log((i-1)*len+j-1)
						if (datas[(i-1)*len+j-1] == 'null') {
							tr.append("<td>" + viewObj.tableHead[i][j] + "</td>");
						} else {
							tr.append("<td>" + datas[(i-1)*len+j-1] + "</td>");
						}
					}
				}
				
				$(tableId).append(tr);
			}
			
			tableStyle(tableId);
		}
		
		function tableStyle(tableId) {
			$(tableId).find("td").css("border", "1px #D8D8D8 solid").css("height", "30px");
	        $(tableId).find("td").attr("align", "center");
		}
		
		function getXData() {
			var times = [];
			var hour = 0;
			var minute = 15;
			while (hour != 24) {
				if (minute == 60) {
					hour += 1;
					minute = 0;
				}
				times.push(timeFormat(hour) + ":" + timeFormat(minute));
				minute += 15;
			}
			
			return times;
		}
		
		function timeFormat(n) {
			return n > 9 ? n : "0" + n;
		}
		
		function getYData() {
			var yData = viewObj.clearResult.replace(/"/g,"").split(",");
			
			return yData;
		}
		
		function getOption() {
			var xData = getXData();
			var yData = getYData();
			var option = {
			    title: {
			        text: '出清结果'
			    },
			    tooltip: {
			        trigger: 'axis'
			    },
			    legend: {
			        data: ['出清电力']
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    toolbox: {
			        feature: {
			            saveAsImage: {}
			        }
			    },
			    xAxis: {
			        type: 'category',
			        boundaryGap: false,
			        data: xData
			    },
			    yAxis: {
			        type: 'value'
			    },
			    series: [
			        {
			            name: '出清电力',
			            type: 'line',
			            step: true,
			            stack: '总量',
			            data: yData
			        }
			    ]
			};
				
			return option;
		}
		
		setEchart();
		function setEchart() {
			var chart = echarts.init(document.getElementById("clearChart"));
			chart.setOption(getOption());
		}
	</script>
</body>
</html>