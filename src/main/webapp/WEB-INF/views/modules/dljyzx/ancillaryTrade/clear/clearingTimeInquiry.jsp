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
        .has-trade{
            color: red;
        }
        .ground{
            background: rgba(255,255,255,0.7)
        }
        #powers{
            display: flex;
            justify-content: space-between;
        }

    </style>
</head>
<body>
<div id="main" style="width: 1000px;height:400px;"></div>
<div >
    <span  id="callTimez" name ="callTimez" style="display: none">${callTimez}</span>
    <span  id="clearStatus" name ="clearStatus" style="display: none">${clearStatus}</span>
    <span  id="callTime" style="display: none">${callTime}</span>
    <span  id="consumerNumber" style="display: none">${consumerNumber}</span>
</div>

<hr>
<div id="scrollBox" style="width: 100%; height: 50%; ">
    <div>
        <table style="width: 96%;height: 100%;">
            <tbody>
            <tr>
                <th width="10%">时段</th>
                <th width="20%">电力(兆瓦)</th>
                <th width="20%">开始时间</th>
                <th width="20%">结束时间</th>
            </tr>
            </tbody>
        </table>
        <div id="powers" class="row pre-scrollable" style="width: 100%;margin: 0; float: left">
            <div id="timeSeg" style="width: 20%;float: left">
                <c:forEach items="${timeSeg}" var="timeSeg">
                    <div class="time-seg" interval="${timeSeg.interval}"  style="text-align: center">${timeSeg.name}</div>
                </c:forEach>
            </div>
            <table style="width: 100%;">
                <tbody>
                <c:forEach items="${timePoint}" var="detail" varStatus="index">
                    <tr class=" text-center powerAndPrice"  >
                        <td width="20%" >${detail.ePower} </td>
                        <td width="25%">${detail.startTime}</td>
                        <td width="25%" class="endTime">${detail.endTime}</td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>
        </div>
    </div>

    <%--<div class="pagination">${page}</div>--%>
    <%--<form:form id="searchForm"  action="/dljyzx/clear/list" method="post" class="breadcrumb form-search">--%>
    <%--<input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>--%>
    <%--<input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>--%>
    <%--&lt;%&ndash;<input id="userName" name="userName" type="hidden" value="${userName}" />&ndash;%&gt;--%>
    <%--</form:form>--%>
<span  id="singleInterval" style="display: none" >${interval}</span>

</div>
<script type="text/javascript">

    var trHeight=$("#powers").find("tbody").height();
    $("#timeSeg div").each(function(i){
        var interval=$(this).attr("interval");
        console.log("interval:"+interval);
        var height=parseFloat(trHeight)*parseFloat(interval)/96*4-2+"px"
        $(this).css("height",height);
        $(this).css("line-height",height);
        if(i%2==0){
            $(this).css("background-color","rgba(213,235,235,0.5)");
        }
       var singleInterval = $("#singleInterval").text();
        if(singleInterval == interval){
            $(this).addClass("has-trade");
        }else{
            $(this).removeClass("has-trade");
        }
    });


    function page(n,s){
        $("#pageNo").val(n);
        $("#pageSize").val(s);
        $("#searchForm").submit();
        return false;
    }
    window.onload = function(){
        queryEcharts();
    }
    var myChart = echarts.init(document.getElementById('main'));
    function queryEcharts() {

        var callTime=$("#callTime").text();
        var clearStatus=$("#clearStatus").text();
        var callTimez=$("#callTimez").text();
        var consumerNumber=$("#consumerNumber").text();
        $.ajax({
            type:"post",
            url:"${ctx}/dljyzx/clear/getecharts",
            data:{

                "callTime":callTime,
            "clearStatus":clearStatus,
                "callTimez":callTimez,
                "consumerNumber":consumerNumber
            },
            async:false,
            success:function(data){
                var chartDataObj =[];
                for(var   i =0;i<data.timePoint.length;i++){
                    chartDataObj.push(data.timePoint[i].startTime);
                }

                var arr = data.arrayList;

                top.jBox.tip("获取成功", "success");
                if (!data) {
                    return false;
                }
                //展示曲线图形
                var   option =myChart.setOption({
                    title: {
                        text: '时段曲线图'
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
                        default: 20,
                        data: chartDataObj
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: "电力曲线",
                            type: 'line',

                            step: 'start',

                            itemStyle : {
                                normal : {
                                    lineStyle:{
                                        color:'#1A8080'
                                    }
                                }
                            },
                            data: data.arrayList
                        },
                        {
                            name: "中标时段",
                            type: 'line',

                            step: 'start',

                            itemStyle : {
                                normal : {
                                    lineStyle:{
                                        color:'red'
                                    }
                                }
                            },
                            data: data.arrayListCall
                        },
                    ]
                });
                myChart.setOption(option);
            }
            ,});
    }
</script>
</body>
</html>