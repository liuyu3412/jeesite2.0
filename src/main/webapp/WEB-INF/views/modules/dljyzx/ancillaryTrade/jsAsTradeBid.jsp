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
        .has-trade{
            color: red;
        }
        td{white-space:nowrap;overflow:hidden;}
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
<form:form id="searchForm" modelAttribute="jsAsMarketapply" action="${ctx}/dljyzx/jsAsTradeBid/list" method="post" class="breadcrumb form-search" cssStyle="margin-bottom: 5px">
    <h class="h-font">交易申报</h>
    <input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
    <input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
    <ul class="ul-form">
        <li><label>月份：</label>
            <input id="month" name="month" readonly="readonly" maxlength="20" class=" Wdate required" style="width: 70px"
                   onclick="WdatePicker({dateFmt:'yyyy-MM',isShowClear:false});" value="${jsAsTradeseq.month}"/>
        </li>
        <li><label>用户名称：</label>
            <input type="text" id="consName" name="consName" value="${jsAsTradeseq.consName}"/>
        </li>
        <li><label>状态：</label>
            <select id="bidStatus" name="bidStatus" style="width: 100px">
                <option value="">全部</option>
                <option value="-1" ${"-1"==jsAsTradeseq.bidStatus?"selected":""}>未申报</option>
                <option value="00" ${"00"==jsAsTradeseq.bidStatus?"selected":""}>已保存</option>
                <option value="01" ${"01"==jsAsTradeseq.bidStatus?"selected":""}>已申报</option>
            </select>
        </li>
        <input id="day" name="day" type="hidden" value="${jsAsTradeseq.day}"/>
        <li class="btns">
            <input id="btnQuery" class="btn btn-primary" type="button" onclick="queryForm()" value="查询"/>
        </li>
    </ul>
</form:form>
<sys:message content="${message}"/>
<div class="day-box">
    <c:forEach var="item" items="${days}">
        <div class="${item.day==jsAsTradeseq.day?"day day-selected":"day"}" day="${item.day}" info="${item.info}" onMouseOver="show(this)" onMouseOut="hide(this)">${item.day}
        <br><img src="${ctxStatic}/${item.all=='01'?"images/fzfw_icon1_lan.png":(item.has=='01'?"images/fzfw_icon1_dlan.png":(item.info==undefind?"images/fzfw_icon2_h.png":"images/fzfw_icon2_l.png"))}" style="width: 20px;height: 20px">
        <%--<br><img src="${ctxStatic}/images/icon1.png" style="width: 20px;height: 20px">--%>
        </div>
    </c:forEach>

</div>
<div class="infor_t" style="margin-top:0px;overflow-x: auto;">
<table id="contentTable" class="table table-striped table-bordered table-condensed ground">
    <thead>
    <tr>
        <th>序号</th>
        <th>户号</th>
        <th>用户名称</th>
        <th>交易名称</th>
        <th>所属地区</th>
        <th>申报状态</th>
        <th>申报时间</th>
        <th>交易结果</th>
        <th>申报开始时间</th>
        <th>申报截止时间</th>
        <th>负荷调整时间</th>
    </tr>
    </thead>
    <tbody class="ground">
    <c:forEach var="jsAsTradeseq" items="${page.list}"  varStatus="stauts">
        <tr tradeSeqConsId="${jsAsTradeseq.tradeSeqConsId}">
            <td> ${stauts.count} </td>
            <td>${jsAsTradeseq.consNo}</td>
            <td>${jsAsTradeseq.consName}</td>
            <td><a class="link" onclick="toDetail(this)">${jsAsTradeseq.seqName}</a></td>
            <td>${jsAsTradeseq.areaName}</td>
            <td>${jsAsTradeseq.bidStatus}</td>
            <td>${jsAsTradeseq.bidDate}</td>
            <td></td>
            <td>${jsAsTradeseq.bidStartStr}</td>
            <td>${jsAsTradeseq.bidEndStr}</td>
            <td>${jsAsTradeseq.adjustStartStr}-${jsAsTradeseq.adjustEndStr}</td>
        </tr>
    </c:forEach>
    </tbody>
</table>
</div>
<div class="pagination">${page}</div>


<div id="mydiv1" class="mydiv">0-8时<br>南京市鼓楼区<br>上调800MW<br>0-8时<br>南京市鼓楼区<br>上调800MW</div>

<script type="text/javascript">

    $(document).ready(function() {
        widthS=$(window).width();
        heightS=$(window).height();
    })

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

        //浮动窗口显示
    function show(obj) {
        var info=$(obj).attr("info")
        if(info){
            var objDiv = $("#mydiv1");
            $(objDiv).show();
            $(objDiv).html(info);
            var height=$(objDiv).outerHeight(true);
            if ($(obj).is(":nth-last-child(3)")||$(obj).is(":nth-last-child(2)")||$(obj).is(":nth-last-child(1)")) {
                $(objDiv).css("left", event.clientX-70);
            }else{
                $(objDiv).css("left", event.clientX);
            }
            $(objDiv).css("top", event.clientY+10);
        }
    }
    //浮动窗口隐藏
    function hide(obj,id) {
        var objDiv = $("#mydiv1");
        $(objDiv).hide();
    }

    function queryForm(){
        var monthInit='${jsAsTradeseq.month}';
        var dayInit='${jsAsTradeseq.day}';
        if(monthInit!=$("#month").val()){
            $("#day").val("");
        }
        $("#searchForm").submit();
    }

    //日期选择
    $(".day").click(function () {
        if(!$(this).attr("info")){
            return;
        }
        $(this).parent().find("div").removeClass("day-selected");
        $(this).addClass("day-selected");

        var day=$(this).attr("day");
        $("#day").val(day);
        queryForm();
    });
   /* var test1=ctx + "/dljyzx/jsAsTradeBid/testSave";
    $.ajax({
        url:test1,
        dataType:'json',
        data:{},

    });*/
    var heightS = 0;
    var widthS = 0;
    function toDetail(obj) {
        //是否提交当日96曲线
        var tradeSeqConsId=$(obj).parent().parent().attr("tradeSeqConsId");
        var consNo=$(obj).parent().parent().find('td:eq(1)').text();
        var consName=$(obj).parent().parent().find('td:eq(2)').text();
        var url = ctx + "/dljyzx/jsAsTradeBid/toTradeDetail?tradeSeqConsId="+tradeSeqConsId;
                    // var url = ctx + "/dljyzx/basicInfo/powerPlantsInfo/sellerIndex?type=1&participantId=" + attachmentId;
                    // 全局弹出
                    top.$.jBox("iframe:" + url, {
                        title: "需求申报填写&nbsp;&nbsp;&nbsp;("+consName+"： "+consNo+")",
                        id:'subIframe',
                        name:'subIframe',
                        top: 0 ,
                        width: parseFloat(widthS+100),
                        height: 700,
                        iframeScrolling: 'yes',
                        buttons: {},
                        closed: function () {
                            queryForm();
                        }
                    });


    }


</script>
</body>
</html>

