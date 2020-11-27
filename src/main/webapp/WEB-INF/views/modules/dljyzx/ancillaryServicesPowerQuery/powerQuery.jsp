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
    <title>交易申报</title>
    <%@include file="/WEB-INF/views/modules/cms/front/include/head.jsp" %>
    <script src="${ctx}/static/modules/cms/front/themes/basic/echarts.js"></script>
    <meta name="decorator" content="default"/>
    <style>
        .h-font{
            font-size: 20px;
            line-height: 36px;
            font-weight: bold;
            color: #555;;
        }
        .ground{
            background: rgba(255,255,255,0.7)
        }
        .day-box {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            background: rgba(255,255,255,0.7);
        }
        .day{
            width: 3%;
            cursor:pointer;
        }
        .day-selected{
            border: 2px solid #00affd;
            background: rgba(0,175,253,0.7);
        }
        .link{
            cursor: pointer !important;
        }
        .mydiv{
            position:absolute;
            padding: 5px;
            display:none;
            border:1px solid silver;
            background: rgba(255,255,255,1);
        }
        .link{
            cursor: pointer !important;
        }
        .btn-primary{
            cursor: pointer !important;
        }
        .tip{
            color:red;
            font-size: 12px;
            text-align: left;
        }
        .content-head {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
        .btn-tip{
            font-size: 14px;
            line-height: 16px;
            height: 30px;
            padding: 0 15px;
        }
        .title-tip{
            font-size: 14px;
            line-height: 30px;
            padding-left: 10px;
            font-weight: bold;
            color: #00affd;
            border-left: 5px solid #00affd;
            margin-left: 15px;
        }
        .table-head{
            width: 100%;
            font-size: 12px;
        }
        .head-td{
            width: 25% !important;
            text-align: center;
            font-weight: bold;
        }
        #table_option td{
            display: flex;
            justify-content: left;
            align-items: center;
        }
        .time-seg{
            border: 1px solid #c6e3fd;
            font-size: 20px;
            text-align: center;
        }
        td{
            width: 300px;
            text-align: center;
        }
    </style>
    <script type="text/javascript">
        $(document).ready(function() {

        });
        function page(n,s){
            $("#pageNo").val(n);
            $("#pageSize").val(s);
            $("#searchForm").submit();
            return false;
        }
    </script>
</head>
<body>
<form:form id="searchForm" action="${ctx}/dljyzx/jsAsPowerQuery/findDate" method="post" class="breadcrumb form-search" cssStyle="margin-bottom: 5px">
    <h class="h-font">电力查询</h>
    <input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
    <input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
    <ul class="ul-form">
        <li><label>月份：</label>
            <input id="month" name="month" readonly="readonly" maxlength="20" class=" Wdate required" style="width: 70px"
                   onclick="WdatePicker({dateFmt:'yyyy-MM',isShowClear:false});" value="${month}"/>
        </li>
        <li class="btns">
            <input id="btnQuery" class="btn btn-primary" type="submit" value="查询"/>
        </li>
    </ul>
</form:form>
<sys:message content="${message}"/>
<div class="day-box">
    <c:forEach var="item" items="${days}">
        <%--展示出该月中有交易需求的日的日历--%>
        <div class="day" info="${item.adjustDateStr}" day="${item.day}">${item.day}
            <br><img src="${ctxStatic}/${item.all=='01'?"images/fzfw_icon1_lan.png":(item.has=='01'?"images/fzfw_icon1_dlan.png":(item.adjustDateStr==undefind?"images/fzfw_icon2_h.png":"images/fzfw_icon2_l.png"))}" style="width: 20px;height: 20px">
                <%--<br><img src="${ctxStatic}/images/icon1.png" style="width: 20px;height: 20px">--%>
        </div>
    </c:forEach>
</div>

<div id="tradeContent" class="infor mt20 oa"  style="margin-top: 5px;">
    <div class="title tip">温馨提示：选中日期后,进行电力查询</div>
    <div class="h_100 fl" style="width: 100%">
        <div class="line text-center content-head">
            <div class="title-tip" style="margin-left: 15px;">曲线展示
                &nbsp;&nbsp;
               <span id="ChineseConsoNo" style="display: none;">
                   <span>户号:</span>
                <span id ="currentConsNo"></span>
               </span>
            </div>

        </div>
        <div class="ma" id="Echarts" style="width: 100%;height: 400px"></div>
    </div>

</div>

<span id ="queryConso" style="display:none">
  <span style="margin-top:10px"><label>户号：</label><input style="margin-top: 10px" type="text" id="consNo" name="consNo" value=""/>
</span>
<span class="btns" style="margin-top: 5px">
    <input onclick="queryConsoClick()"  style="margin-top: 5px" id="" class="btn btn-primary" type="submit" value="查询"/>
</span>
</span>

<div id ="tableDiv"
     style="overflow-x:auto;"
>
	<table id="contentTable" class="table table-striped table-bordered table-condensed" style="background-color: white;">
        <thead>
            <tr>
                <td  style="width: 200px;">户号</td>
                <td  style="width: 200px;">调用日期</td>
                <td  style="width: 800px;" >实际平均负荷</td>
                <td >00:15</td>
                <td >00:30</td>
                <td >00:45</td>
                <td >01:00</td>
                <td >01:15</td>
                <td >01:30</td>
                <td >01:45</td>
                <td >02:00</td>
                <td >02:15</td>
                <td >02:30</td>
                <td >02:45</td>
                <td >03:00</td>
                <td >03:15</td>
                <td >03:30</td>
                <td >03:45</td>
                <td >04:00</td>
                <td >04:15</td>
                <td >04:30</td>
                <td >04:45</td>
                <td >05:00</td>
                <td >05:15</td>
                <td >05:30</td>
                <td >05:45</td>
                <td >06:00</td>
                <td >06:15</td>
                <td >06:30</td>
                <td >06:45</td>
                <td >07:00</td>
                <td >07:15</td>
                <td >07:30</td>
                <td >07:45</td>
                <td >08:00</td>
                <td >08:15</td>
                <td >08:30</td>
                <td >08:45</td>
                <td >09:00</td>
                <td >09:15</td>
                <td >09:30</td>
                <td >09:45</td>
                <td >10:00</td>
                <td >10:15</td>
                <td >10:30</td>
                <td >10:45</td>
                <td >11:00</td>
                <td >11:15</td>
                <td >11:30</td>
                <td >11:45</td>
                <td >12:00</td>
                <td >12:15</td>
                <td >12:30</td>
                <td >12:45</td>
                <td >13:00</td>
                <td >13:15</td>
                <td >13:30</td>
                <td >13:45</td>
                <td >14:00</td>
                <td >14:15</td>
                <td >14:30</td>
                <td >14:45</td>
                <td >15:00</td>
                <td >15:15</td>
                <td >15:30</td>
                <td >15:45</td>
                <td >16:00</td>
                <td >16:15</td>
                <td >16:30</td>
                <td >16:45</td>
                <td >17:00</td>
                <td >17:15</td>
                <td >17:30</td>
                <td >17:45</td>
                <td >18:00</td>
                <td >18:15</td>
                <td >18:30</td>
                <td >18:45</td>
                <td >19:00</td>
                <td >19:15</td>
                <td >19:30</td>
                <td >19:45</td>
                <td >20:00</td>
                <td >20:15</td>
                <td >20:30</td>
                <td >20:45</td>
                <td >21:00</td>
                <td >21:15</td>
                <td >21:30</td>
                <td >21:45</td>
                <td >22:00</td>
                <td >22:15</td>
                <td >22:30</td>
                <td >22:45</td>
                <td >23:00</td>
                <td >23:15</td>
                <td >23:30</td>
                <td >23:45</td>
                <td >24:00</td>
            </tr>
        </thead>
        <tbody id="tablesdate" style="width: 100%">

        </tbody>

    </table>

</div>
<div class="pagination">
    <ul>
        <li class="disabled" >
            <a href="javascript:" onclick="prepage()">« 上一页</a>
        </li>
        <li class="active"  >
            <a href="javascript:" id ="currentpage">1</a>
        </li>
        <li class="disabled">
            <a href="javascript:" onclick ="afterpage()">下一页 »</a>
        </li>
        <li class="disabled controls">
            <a href="javascript:">当前第 <input type="text"  id="nowpage" readonly="readonly" value="1"
                                             onkeypress="var e=window.event||this;var c=e.keyCode||e.which;if(c==13)page(this.value,5,'');"
                                             onclick="this.select();" /> 页/每页展示 <input id="pageNum" type="text" value="1"
                                                                                       onkeypress="var e=window.event||this;var c=e.keyCode||e.which;if(c==13)page('1',this.value,'');"
                                                                                       onclick="this.select();" /> 条信息
                共<a  id="totalNum"  style="cursor: pointer;border-radius: 0px;background-color: #00affd;width: 34px;height: 20px;color: #fff;line-height: 20px;margin: 0;text-align: center;"  >
                    </a>条信息
        </li>
    </ul>
    <div style="clear:both;"></div>
</div>

<script type="text/javascript">

    function prepage(){

      var  currentpage =  $("#currentpage").text();
      if(currentpage != "1"){
          currentpage = parseInt(currentpage)-1;
      }
        // $("#nowpage").val(currentpage);
        // $("#currentpage").html(currentpage);
        var month = $('#month').val();
        var day=$('.day-selected').attr("day");
        var param={};
        var conso=$("#consNo").val();
        param.conso=conso;
        if(day<10){
            param.date=month+"-0"+day;
        }else{
            param.date=month+"-"+day;
        }
        param.pageNo=currentpage;
        $(this).parent().find("div").removeClass("day-selected");
        $(this).addClass("day-selected");
        addHtml(param,currentpage)

    }
    function afterpage(){

        var  currentpage =  $("#currentpage").text();
            currentpage = parseInt(currentpage)+1;
        var month = $('#month').val();
        var day=$('.day-selected').attr("day");
        var conso=$("#consNo").val();
        var param={};
        if(day<10){
            param.date=month+"-0"+day;
        }else{
            param.date=month+"-"+day;
        }
        param.pageNo=currentpage;
        param.conso=conso;
        $(this).parent().find("div").removeClass("day-selected");
        $(this).addClass("day-selected");
        addHtml(param,currentpage);

    }
    function  addHtml(param,currentpage){
        //获取当前市场成员下所有参与该日交易的户号以及电力等信息
        $.post("${ctx}/dljyzx/jsAsPowerQuery/powerQueryByDate",param,function(date){
            if(date.code == 200){
                console.log(date.res);
                //向表格中添加数据
                var str = "";
                for (var i = 0; i < date.res.list.length; i++) {
                    str += "<tr><td class=\"link\"  style=\"color:blue;\"onclick = clickaction(this)>" + date.res.list[i].consno + "</td><td id='adjustDate'>" + date.res.list[i].date + "</td><td id='realTimeAverageLoad'>"
                        + date.res.list[i].realTimeAverageLoad + "</td>";
                    if(date.res.list[i].actualPower != null){
                        for (var j = 0; j < date.res.list[i].actualPower.length; j++) {
                            if(date.res.list[i].actualPower[j] == ""){
                                date.res.list[i].actualPower[j] = 0;
                                str += "<td>" + date.res.list[i].actualPower[j] + "</td>";
                            }else{
                                str += "<td>" + date.res.list[i].actualPower[j] + "</td>";
                            }
                        }
                        str += "</tr>";
                    }
                }

                document.getElementById("tablesdate").innerHTML = str;
                $("#nowpage").val(currentpage);
                $("#currentpage").html(currentpage);
                $("#pageNum").val(date.res.pageSize);
                $("#totalNum").html(date.res.totalNum);
            }else{
            }
        },"json");
    }

    $("#tableDiv").scroll(function(){//给table外面的div滚动事件绑定一个函数
        var left=$("#tableDiv").scrollLeft();//获取滚动的距离
        var trs=$("#tableDiv table tr");//获取表格的所有tr
        trs.each(function(i){
            $(this).children().eq(0).css({"position":"relative","top":"0px","left":left,"background-color":"white"});
            $(this).children().eq(1).css({"position":"relative","top":"0px","left":left,"background-color":"white"});
            $(this).children().eq(2).css({"position":"relative","top":"0px","left":left,"background-color":"white"});
        });
    });

    var monthStr = '${month}';
    $('#month').val(monthStr);

    var trHeight=$("#powers").find("tbody").height();
    $("#timeSeg div").each(function(i){
        var interval=$(this).attr("interval");
        var height=parseFloat(trHeight)*parseFloat(interval)/96*4-2+"px"
        $(this).css("height",height);
        $(this).css("line-height",height);
        if(i%2==0){
            $(this).css("background-color","rgba(213,235,235,0.5)");
        }
    });

    var myChart = echarts.init(document.getElementById('Echarts'));
    var timeAxis = new Array();
    for (var k = 0; k <= 24; k++) {
        timeAxis.push(k+":00");
        for (var i = 1; i < 4; i++) {
            if(k == 24){
                break;
            }
            timeAxis.push(k+":" + i * 15);
        }
    }
    window.onload=function() {
        //初始化图表
        myChart.setOption({
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                show:true,
                data: ["基线电力","申报电力","实际电力","实际平均负荷"]
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false, //为false则横坐标在
                data: timeAxis
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: "基线电力",
                    type: 'line',
                    step: 'start',
                    data: []
                },{
                    name: "申报电力",
                    type: 'line',
                    step: 'start', //去掉折线图中的节点
                    // smooth: false, //true 为平滑曲线，false为直线
                    data: []
                },{
                    name: "实际电力",
                    type: 'line',
                    step: 'start',
                    data: []
                },{
                    name: "实际平均负荷",
                    type: 'line',
                    step: 'start',
                    data: []
                }
            ]
        });
    }

    //日期选择
    $(".day").click(function () {
        $("#ChineseConsoNo").css("display","none");
        var month = $('#month').val();
        var day=$(this).attr("day");
        var param={};
        if(day<10){
            param.date=month+"-0"+day;
        }else{
            param.date=month+"-"+day;
        }

        if(!$(this).attr("info")){
            return;
        }
        $(this).parent().find("div").removeClass("day-selected");
        $(this).addClass("day-selected");

        //获取当前市场成员下所有参与该日交易的户号以及电力等信息
        $.post("${ctx}/dljyzx/jsAsPowerQuery/powerQueryByDate",param,function(date){
            if(date.code == 200){
                console.log(date.res);
                //向表格中添加数据
                var str = "";
                for (var i = 0; i < date.res.list.length; i++) {
                    str += "<tr><td class=\"link\"  style=\"color:blue;\"onclick = clickaction(this)>" + date.res.list[i].consno + "</td><td id='adjustDate'>" + date.res.list[i].date + "</td><td id='realTimeAverageLoad'>"
                        + date.res.list[i].realTimeAverageLoad + "</td>";
                    if(date.res.list[i].actualPower != null){
                        for (var j = 0; j < date.res.list[i].actualPower.length; j++) {
                            if(date.res.list[i].actualPower[j] == ""){
                                date.res.list[i].actualPower[j] = 0;
                                str += "<td>" + date.res.list[i].actualPower[j] + "</td>";
                            }else{
                                str += "<td>" + date.res.list[i].actualPower[j] + "</td>";
                            }
                        }
                        str += "</tr>";
                    }
                }
                document.getElementById("tablesdate").innerHTML = str;

                $("#nowpage").val(1);
                $("#currentpage").html(1);
                $("#pageNum").val(date.res.pageSize);
                $("#totalNum").html(date.res.totalNum);
                $("#queryConso").val("");
                $("#queryConso").css("display","block");
            }else{
            }
        },"json");
    });






    function clickaction(td){
        var adjustDate = $('#adjustDate').text();
        var realTimeAverageLoad = $('#realTimeAverageLoad').text(); //realTimeAverageLoad
        var consno = td.innerText
        var param={};
        param.consno = consno;
        param.adjustDate = adjustDate;
        param.realTimeAverageLoad = realTimeAverageLoad;

        $.post("${ctx}/dljyzx/jsAsPowerQuery/queryCurve",param,function(res){
            if(res.code == 200){
                var option = myChart.getOption();
                option.series[0].data = res.baseline;
                option.series[1].data = res.tradeBidPower;
                option.series[2].data = res.actualElectricity;
                option.series[3].data = res.realTimeAverageLoad;
                myChart.setOption(option);
            }else{
            }
        },"json");

        $("#ChineseConsoNo").css("display","block");
        $("#currentConsNo").html(consno);

    }

    function initPowers(){
        var month = $('#month').val();
        var day=$('.day-selected').attr("day");
        var param={};
        if(day<10){
            param.date=month+"-0"+day;
        }else{
            param.date=month+"-"+day;
        }
        param.consNo=$("#consNo").val();
        $.ajax({
            type: 'POST',
            url: "${ctx}/dljyzx/jsAsTradeBid/getPowersByConsNo",
            dataType: "json",
            data: param,
            async:false,
            success : function(r){
                if(r.code=="200"){
                    var powers=r.powers;
                    var basePowers=r.basePowers;
                    var newpowers=[];
                    newpowers.push(null);
                    if(powers.length>0){
                        $('#powers tr').each(function(i){
                            $(this).find('td:eq(1)').find('input').val(powers[i]);
                            newpowers.push(powers[i]);
                        });
                    }
                    if("01"==r.status){
                        $("#tradeBtns").find('input').hide();
                    }else{
                        $("#tradeBtns").find('input').show();
                    }
                    var option = myChart.getOption();
                    option.series[1].data = newpowers;
                    option.series[0].data = basePowers;
                    myChart.setOption(option);
                }
            }
        });
    }



    function  queryConsoClick(){
        var conso=$("#consNo").val();
        var month = $('#month').val();
        // var day=$(".day").attr("day");
        var day=$('.day-selected').attr("day");

        var param={};
        if(day<10){
            param.date=month+"-0"+day;
        }else{
            param.date=month+"-"+day;
        }
        param.conso = conso;
        //获取当前市场成员下所有参与该日交易的户号以及电力等信息
        $.post("${ctx}/dljyzx/jsAsPowerQuery/powerQueryByDate",param,function(date){
            if(date.code == 200){
                console.log(date.res);
                //向表格中添加数据
                var str = "";
                for (var i = 0; i < date.res.list.length; i++) {
                    str += "<tr><td class=\"link\"  style=\"color:blue;\"onclick = clickaction(this)>" + date.res.list[i].consno + "</td><td id='adjustDate'>" + date.res.list[i].date + "</td><td id='realTimeAverageLoad'>"
                        + date.res.list[i].realTimeAverageLoad + "</td>";
                    if(date.res.list[i].actualPower != null){
                        for (var j = 0; j < date.res.list[i].actualPower.length; j++) {
                            if(date.res.list[i].actualPower[j] == ""){
                                date.res.list[i].actualPower[j] = 0;
                                str += "<td>" + date.res.list[i].actualPower[j] + "</td>";
                            }else{
                                str += "<td>" + date.res.list[i].actualPower[j] + "</td>";
                            }
                        }
                        str += "</tr>";
                    }
                }
                document.getElementById("tablesdate").innerHTML = str;

                $("#nowpage").val(1);
                $("#currentpage").html(1);
                $("#pageNum").val(date.res.pageSize);
                $("#totalNum").html(date.res.totalNum);
                $("#queryConso").css("display","block");
            }else{
            }
        },"json");

    }

</script>
</body>
</html>

