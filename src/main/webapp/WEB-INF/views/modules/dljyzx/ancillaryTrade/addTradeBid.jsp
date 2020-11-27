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
    <script type="text/javascript" src="${ctxStatic}/modules/cms/front/themes/basic/conSignJs/jquery.jBox-2.3.min.js"></script>
    <link href="${ctxStatic}/modules/cms/front/themes/basic/conSignCSS/jbox.css" rel="stylesheet" type="text/css" />
    <title>交易申报</title>
    <%@include file="/WEB-INF/views/modules/cms/front/include/head.jsp" %>
    <script src="${ctx}/static/modules/cms/front/themes/basic/echarts.js"></script>
    <meta name="decorator" content="default"/>
    <style>
        .btn-primary{
            cursor: pointer !important;
        }
        td{
            padding: 5px 0;
        }
        .form-search label {
             margin-left: 0;
        }

        .tip{
            color:red;
            font-size: 12px;
            text-align: left;
            line-height: 30px;
            height: 30px !important;
        }
        .content-head {
            width: 100%;
            display: flex;
            /*justify-content: space-between;*/
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
            width: 16.66% !important;
            text-align: center;
            font-weight: bold;
        }
        #table_option td{
            display: flex;
            justify-content: left;
            align-items: center;
        }
        .unit{
            font-size: 12px;
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
        #powers input{
            padding: 0 4px !important;
            margin: 2px 0 !important;
        }
        #seqTable input{
            margin-bottom: 0px !important;
        }
        .ground{
            background: rgba(255,255,255,0.7)
        }
    </style>
</head>
<body style="background: rgba(255,255,255,0.7)">

<form:form id="inputForm" name="inputForm" action="" enctype="multipart/form-data" method="post" class="form-horizontal breadcrumb form-search" cssStyle="background: rgba(255,255,255,0.9);margin-bottom: 0px;padding-bottom: 0px">

    <div>
        <!--<input class="btn btn-primary" type="submit" value="提交" />-->
        <input id="infoSave" class="btn btn-primary" type="button" value="保存" onclick="save('00')" />
        <input id="infoSubmit" class="btn btn-primary" style="margin-left: 20px" type="button" value="提交" onclick="save('01')" />
    </div>
</form:form>

<div class="infor_t" style="margin-top:0px;overflow-x: auto;">
<table id="seqTable" class="table table-striped table-bordered table-condensed ground" style="margin-bottom: 0px;margin-top: 0px;padding-bottom: 0px">
    <thead>
    <tr>
        <th>
            <c:if test="${jsAsTradeBidConsList.size()==1}">序号</c:if>
            <c:if test="${jsAsTradeBidConsList.size()>1}">
                全选<input type="checkbox" id="parentCheck"/>
            </c:if>
        </th>
        <th>负荷调节内容</th>
        <th>电价上限<br><label class="unit">(元/兆瓦)</label></th>
        <th>电价下限<br><label class="unit">(元/兆瓦)</label></th>
        <th>考核系数</th>
        <th>申报平均负荷<br><label class="unit">(兆瓦)</label></th>
        <%--<th>基线点负荷<br><label class="unit">(兆瓦)</label></th>--%>
        <th>
            预计可调负荷<label class="unit">(兆瓦)</label>
            <br><label style="font-size: 12px;line-height: 12px;color: red">注:正数上调；负数下调</label>
        </th>
        <th>申报负荷补偿价<br><label class="unit">(元/兆瓦)</label></th>
        <th>预计收益<label class="unit">(元)</label>
            <br><label style="font-size: 12px;line-height: 12px;color: red">注:正数补偿；负数考核</label>
        </th>
        <th>申报截止时间</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach var="jsAsTradeBidCons" items="${jsAsTradeBidConsList}" varStatus="stauts">
        <tr gbsId="${jsAsTradeBidCons.gbsId}" tradeseqConsId="${jsAsTradeBidCons.tradeseqConsId}"
            adjustType="${jsAsTradeBidCons.adjustType}" timesegId="${jsAsTradeBidCons.timesegId}"
            eKcof="${jsAsTradeBidCons.eKcof}">
            <td>
                <c:if test="${jsAsTradeBidConsList.size()==1}">${stauts.count}</c:if>
                <c:if test="${jsAsTradeBidConsList.size()>1}">
                    <input type="checkbox" class="checkValue"/>
                </c:if>
            </td>
            <td>
                    ${jsAsTradeBidCons.tradeContent}
            </td>
            <td>
                    ${jsAsTradeBidCons.epriceUplimit}
            </td>
            <td>
                    ${jsAsTradeBidCons.epriceDownlimit}
            </td>
            <td>
                    ${jsAsTradeBidCons.eKcof}
            </td>
            <td>
                <input name="tradePower${jsAsTradeBidCons.timesegId}" interval="${jsAsTradeBidCons.interval}"
                       style="width: 80px;" readonly type="number" value="${jsAsTradeBidCons.tradePower}" />
            </td>
            <td>
                 <input name="basePower${jsAsTradeBidCons.timesegId}" style="width: 80px;" readonly type="number" value="${jsAsTradeBidCons.basePower}" />
            </td>
            <%--<td>
                <input name="bidPower${jsAsTradeBidCons.timesegId}" readonly oninput="getProfit(${jsAsTradeBidCons.timesegId})" style="width: 80px;" type="number" value="${jsAsTradeBidCons.bidPower}" />
            </td>--%>
            <td>
                <input name="bidPrice${jsAsTradeBidCons.timesegId}" priceUp="${jsAsTradeBidCons.epriceUplimit}" priceDown="${jsAsTradeBidCons.epriceDownlimit}"
                       onblur="checkPrice(this)" oninput="getProfit(${jsAsTradeBidCons.timesegId})" style="width: 80px;" type="number" value="${jsAsTradeBidCons.bidPrice}" />
            </td>
            <td>
                <input name="profit${jsAsTradeBidCons.timesegId}" style="width: 80px;" readonly type="number" value="${jsAsTradeBidCons.profit}"  />
            </td>
            <td>
                    ${jsAsTradeBidCons.bidEnd}
            </td>
        </tr>
    </c:forEach>
    </tbody>
</table>
</div>


<div id="tradeContent" class="infor_t"  style="margin-top: 0px;">
    <div class="title tip">温馨提示：(负荷单位为兆瓦；负荷电价单位为元/兆瓦)</div>
    <div class="line text-center content-head">
        <div class="title-tip" style="margin-left: 10px;">曲线展示</div>
    </div>
    <div class="ma ground" id="Echarts" style="width: 100%;height: 450px"></div>
    <div style="width: 100%;">
        <div class="line text-center content-head">
            <div class="title-tip">申报负荷电力填写</div>
            <input id="upFile" type="file" style="display: none;" onchange="addFile(this)"/>
            <div id="tradeBtns" class="btns" style="margin-left: 30px">
                <input class="btn btn-primary btn-tip" onclick="exportExcel()" type="button" value="导出Excel"/>
                <input class="btn btn-primary btn-tip" onclick="getFile(this)" type="button" value="导入"/>
            </div>
        </div>
        <div style="margin-top: 5px">
        <form:form id="timeForm" name="timeForm" action="" enctype="multipart/form-data" method="post" class="form-horizontal breadcrumb form-search" cssStyle="background: rgba(255,255,255,0.9);margin-bottom: 0px;padding-bottom: 0px">
            <table>
                <tbody>
                <tr>
                    <td class="head-td">曲线选择(非必选)：</td>
                    <td class="head-td">
                        <select style="width: 100%;margin: 0px" onchange="changeLine(this)">
                            <option value="">无</option>
                            <c:forEach var="line" items="${lines}">
                                <option value="${line.id}">${line.curveName}</option>
                            </c:forEach>
                        </select>
                    </td>
                    <td class="head-td">历史申报负荷：</td>
                    <td class="head-td">
                        <input type="text" readonly="readonly" class="Wdate" style="width: 80%;margin: 0px"
                               onclick="showDate(1)"/>
                    </td>
                    <td class="head-td">历史实际负荷：</td>
                    <td class="head-td">
                        <input type="text" readonly="readonly" class="Wdate" style="width: 80%;margin: 0px;"
                               onclick="showDate(2)"/>
                    </td>
                </tr>
                </tbody>
            </table>
        </form:form>
        </div>
        <div style="margin-top: 5px;margin-left:15px;font-size: 12px;">
            <table class="table ground" style="width: 80%;margin: 0px;float: right;">
                <tbody>
                <tr>
                    <th style="width: 20%;padding: 0px !important;">
                        <img style="width: 100%;height: 100%" src="${ctxStatic}/images/image_sf.png"/>
                    </th>
                    <th style="width: 20%">00-15</th>
                    <th style="width: 20%">15-30</th>
                    <th style="width: 20%">30-45</th>
                    <th style="width: 20%">45-00</th>
                </tr>
                </tbody>
            </table>
            <div id="powers" style="width: 100%;margin: 0;display: flex;justify-content: space-between;">
                <div id="timeSeg" style="width: 20%;float: left">
                    <c:forEach items="${timeSeg}" var="timeS">
                        <div class="time-seg" interval="${timeS.INTERVAL}">${timeS.NAME}</div>
                    </c:forEach>
                </div>
                <table class="table table-striped table-bordered table-condensed ground" style="width: 80%;margin: 0px;">
                    <tbody id="powerDetail">
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div>
<script type="text/javascript">


    var timeIds=[];
    var timeDetail=[];
   $(document).ready(function() {

       var status1='${jsAsTradeBidCons.status}';
       var disableVal=''
       if(status1&&status1!="00"){
           $("#infoSave").hide();
           $("#infoSubmit").hide();
           $(":input").attr("disabled",true);
           disableVal='readonly';
       }
       //加载表格
       <c:forEach items="${jsAsTradeBidConsList}" var="t">
       timeIds.push('${t.timesegId}');
       </c:forEach>
       <c:forEach items="${timeDetail}" var="td">
       timeDetail.push('${td}');
       </c:forEach>
       function gettimeId(i){
           if(i<8){
               return '1';
           }else if (i>=8&&i<12) {
               return '2';
           }else if (i>=12&&i<17) {
               return '3';
           }else if (i>=17&&i<21) {
               return '4';
           }else{
               return '5';
           }
       }
       var txt='';
       for (var i=0;i<24;i++){
           var timeId=gettimeId(i);
           var className='';
           if($.inArray(timeId,timeIds)>=0){
               className='has-trade';
           }
           txt+='<tr class="text-center powerAndPrice" >';
           txt+='<td class="'+className+'" style="width: 20%;padding: 0px">'+i+'</td>';
           txt+='<td style="width: 20%;padding: 0px"><input type="number" value="0" name="power" '+disableVal+' oninput="inputPower(this)" onblur="checkPower(this)" timeId="'+timeId+'" style="width: 50%;"/></td>';
           txt+='<td style="width: 20%;padding: 0px"><input type="number" value="0" name="power" '+disableVal+' oninput="inputPower(this)" onblur="checkPower(this)" timeId="'+timeId+'" style="width: 50%;"/></td>';
           txt+='<td style="width: 20%;padding: 0px"><input type="number" value="0" name="power" '+disableVal+' oninput="inputPower(this)" onblur="checkPower(this)" timeId="'+timeId+'" style="width: 50%;"/></td>';
           txt+='<td style="width: 20%;padding: 0px"><input type="number" value="0" name="power" '+disableVal+' oninput="inputPower(this)" onblur="checkPower(this)" timeId="'+timeId+'" style="width: 50%;"/></td>';
           txt+='</tr>';
       }
        $("#powerDetail").append(txt);

       $("#timeSeg div").each(function(i){
           var timeId=i+1;
           if($.inArray(timeId+'',timeIds)>=0){
               $(this).addClass("has-trade");
           }
       });

       if(timeIds.length>1){
           $("#parentCheck").click(function() {
                   if ($("#parentCheck").attr("checked")) {
                       $("#seqTable tbody td").each(function() {
                           $(this).find("input").attr("checked","true");
                       });
                   }else {
                       $("#seqTable tbody td").each(function() {
                           $(this).find("input").removeAttr("checked","true");
                       });
                   }
               }
           );
       }
   });

    var myChart = echarts.init(document.getElementById('Echarts'));

    window.addEventListener('resize',function () {//执行

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

        myChart.resize();
        initEchart();
    })

   function showDate(type) {
       $('iframe[hidefocus]').parent().hide();//用于强制重新计算坐标值
       if(type==1){
           new WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:true,onpicked:getTradeBefore,oncleared:clearDate});
       }else{
           new WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:true,onpicked:getActualBefore,oncleared:clearDate});
       }
       var scrollTop = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);//滚动条的偏移值
       var oldTop = $('iframe[hidefocus]').parent().css('top').replace('px', '');//日期控件最终计算的top值
       var newTop = oldTop - scrollTop//日期控件的top值减去滚动条的偏移值就是当前日期控件的位置
       var iCount = 0;
       //下面用setInterval 主要是为了第一次加载的时候 top 设置会先于WdatePicker完成
       var intHandle = setInterval(function () {
           var top = $('iframe[hidefocus]').parent().css('top').replace('px', '');
           iCount++;
           if (iCount < 10) {
               $('iframe[hidefocus]').parent().css({
                   'position': 'fixed',
                   'top': newTop
               });
           }
           else {
               clearInterval(intHandle);
           }
       }, 100);
   }

    function initEchart() {
        var timeAxis = new Array();
        <c:forEach items="${timeDetail}" var="t">
        timeAxis.push('${t}');
        </c:forEach>
        //初始化图表
        myChart.setOption({
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                show:true,
                data: ["基线负荷","基线点负荷","申报负荷"]
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: timeAxis
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: "基线负荷",
                    type: 'line',
                    smooth:false,
                    step: 'start',
                    data: []
                },{
                    name: "基线点负荷",
                    type: 'line',
                    step: 'start', //去掉折线图中的节点
                    smooth: false, //true 为平滑曲线，false为直线
                    data: []
                },{
                    name: "申报负荷",
                    type: 'line',
                    smooth:false,
                    step: 'start',
                    data: []
                }
            ]
        });


        initPowers();
    }

    //初始化96时段表格
    function initPowers(){
        var param={};
        param.date='${jsAsTradeBidCons.adjustdate}';
        param.consNo='${jsAsTradeBidCons.consNo}';
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
                    var basePowerDeails=r.basePowerDeails;
                    var maxPowers=r.maxPowers;
                    var newpowers=[];
                    newpowers.push(null);
                    if(powers.length>0){
                        $('#powerDetail input').each(function(i){
                            $(this).val(powers[i].power);
                            $(this).attr("time",i);
                            $(this).attr("timeId",powers[i].timeId);
                            $(this).attr("maxP",maxPowers[i]);
                            newpowers.push(powers[i].power);
                            if("00"==powers[i].hasTra){
                                $(this).addClass("has-trade");
                            }else{
                                $(this).removeClass("has-trade");
                            }
                        });
                    }
                    var option = myChart.getOption();
                    option.series[0].data = basePowers;
                    option.series[1].data = basePowerDeails;
                    option.series[2].data = newpowers;
                    myChart.setOption(option);
                }
            }
        });
    }

    //更新96数据，重新计算平均负荷
    function reTradePowers(){
        $('#seqTable tr').each(function(i){
            if(i>0){
                var timesegId= $(this).attr("timesegId");
                reTradePower(timesegId);
            }
        });
    }

    //计算一条序列平均负荷
    function reTradePower(timeId){
        var tradePowerAll=0;
        $("input[timeId='"+timeId+"']").each(function(){
            tradePowerAll+=parseFloat($(this).val());
        });
        var interval=$("input[name='tradePower"+timeId+"']").attr("interval");
        var basePower=$("input[name='basePower"+timeId+"']").val();
        if(!basePower){
            basePower=0;
        }
        var tradePower=cutZero((tradePowerAll/interval/4).toFixed(4));
        $("input[name='tradePower"+timeId+"']").val(tradePower);
        var bidPower=cutZero((tradePower-basePower).toFixed(4));
        $("input[name='bidPower"+timeId+"']").val(bidPower);
        getProfit(timeId);
    }

    //输入预计负荷，价格计算收益
    function getProfit(timeId){
        // var interval=$("input[name='tradePower"+timeId+"']").attr("interval");
        var bidPower=$("input[name='bidPower"+timeId+"']").val();
        var bidPrice=$("input[name='bidPrice"+timeId+"']").val();
        if(bidPower&&bidPrice){
            var adjustType=$("input[name='tradePower"+timeId+"']").parent().parent().attr("adjustType");
            var eKcof=$("input[name='tradePower"+timeId+"']").parent().parent().attr("eKcof");
            var number = bidPower*bidPrice;
            if("01"==adjustType){
                number=0-number;
            }
            if(number<0){
                number=number*eKcof;
            }
            $("input[name='profit"+timeId+"']").val(cutZero(number.toFixed(2)));
        }
    }

    //验证电价上下限
    function checkPrice(obj){
        var priceUp=parseFloat($(obj).attr("priceUp"));
        var priceDown=parseFloat($(obj).attr("priceDown"));
        var bidPrice=parseFloat($(obj).val());
        if(bidPrice&&!(bidPrice<=priceUp&&bidPrice>=priceDown)){
            var tradeName=$(obj).parent().parent().find('td:eq(1)').text();
            jBox.tip(tradeName+"电价范围"+priceDown+"-"+priceUp, 'error');
            $(obj).focus();
        }
    }

    // 96点负荷输入，加载图表
    function inputPower(obj){
        var powers = [];
        powers.push(null);

        //加载图标
        $("input[name='power']").each(function(){
            if(!$(this).val()){
                powers.push(0);
            }else{
                powers.push($(this).val());
            }
        });
        var option = myChart.getOption();
        option.series[2].data = powers;
        myChart.setOption(option);

        //计算序列值
        var timeId=$(obj).attr("timeid");
        reTradePower(timeId);
    }

   function checkPower(obj){
       if(!$(obj).val()){
           $(obj).val(0);
       }
       if(parseFloat($(obj).val())<0){
           jBox.tip('电力不可为负数。', 'error');
           $(obj).focus();
       }
      /* if(parseFloat($(obj).val())>parseFloat($(obj).attr("maxP"))){
           var i = $(obj).attr("time");
           var i1 = parseInt(i)+1;
           jBox.tip(timeDetail[i]+"-"+timeDetail[i1]+"点申报电力超过最大负荷:"+$(obj).attr("maxP"), 'error');
           $(obj).focus();
       }*/
   }

    //隐藏显示按钮
    function hideBtn(){
        $("#infoSave").attr("disabled",true);
        $("#infoSubmit").attr("disabled",true);
    }
    function showBtn(){
        $("#infoSave").attr("disabled",false);
        $("#infoSubmit").attr("disabled",false);
    }

    //数据提交
    function save(status) {
        hideBtn();
        jBox.tip("表单提交中...", 'loading');
        var param={};
        var flag=true;
        var seqNum=0;
        $('#seqTable tr').each(function(i){
            if(i>0&&(timeIds.length==1||(timeIds.length>1&&$(this).find('input').attr("checked")))){
                var jsAsTradeBidCons={};
                var timeId= $(this).attr("timesegId");
                var basePower=$("input[name='basePower"+timeId+"']").val();
                var bidPower=$("input[name='bidPower"+timeId+"']").val();
                var bidPrice=$("input[name='bidPrice"+timeId+"']").val();
                if(!basePower){
                    /*$("input[name='basePower"+timeId+"']").focus();
                   jBox.tip("基线电力未计算，暂时不可申报", 'error');
                    showBtn();
                    flag=false;*/
                    return true;
                }
                if(!bidPower){
                 /*   $("input[name='bidPower"+timeId+"']").focus();
                    jBox.tip("调节电力必填", 'error');
                    showBtn();
                    flag=false;*/
                    return true;
                }
               if(!bidPrice){
                   /* $("input[name='bidPrice"+timeId+"']").focus();
                    jBox.tip("调节电价必填", 'error');
                    showBtn();
                    flag=false;*/
                    return true;
                }
                var priceUp=parseFloat($("input[name='bidPrice"+timeId+"']").attr("priceUp"));
                var priceDown=parseFloat($("input[name='bidPrice"+timeId+"']").attr("priceDown"));
                if(!(parseFloat(bidPrice)<=priceUp&&parseFloat(bidPrice)>=priceDown)){
                    var tradeName=$("input[name='bidPrice"+timeId+"']").parent().parent().find('td:eq(1)').text();
                    jBox.tip(tradeName+"电价范围"+priceDown+"-"+priceUp, 'error');
                    $("input[name='bidPrice"+timeId+"']").focus();
                    flag=false;
                    return false;
                }
                param["jsAsTradeBidConsList[" + (i-1) + "].bidPower"] = bidPower;
                param["jsAsTradeBidConsList[" + (i-1) + "].bidPrice"] = bidPrice;
                param["jsAsTradeBidConsList[" + (i-1) + "].tradeseqConsId"] = $(this).attr("tradeseqConsId");
                param["jsAsTradeBidConsList[" + (i-1) + "].gbsId"] = $(this).attr("gbsId");
                param["jsAsTradeBidConsList[" + (i-1) + "].status"] = status;

                seqNum++;
            }
        });
       if(!flag){
            showBtn();
            return;
        }
       /* if(seqNum==0){
            jBox.tip("请先勾选申报需求", 'error');
            showBtn();
            return;
        }*/
        var powers = [];
        $("input[name='power']").each(function(i){
            if(!$(this).val()){
                powers.push(0);
            }else{
                powers.push($(this).val());
            }
            if(parseFloat($(this).val())<0){
               /* jBox.tip("申报电力不可为负数", 'error');
                $(this).focus();
                flag=false;*/
                return true;
            }
            if(parseFloat($(this).val())>parseFloat($(this).attr("maxP"))){
                /*var i1 = parseInt(i)+1;
                jBox.tip(timeDetail[i]+"-"+timeDetail[i1]+"申报电力超过最大负荷:"+$(this).attr("maxP"), 'error');
                $(this).focus();
                flag=false;*/
                return true;
            }
        });
        if(!flag){
            showBtn();
            return;
        }
        param.powersStr=powers.join(',');
        param.status=status;
        param.consNo='${jsAsTradeBidCons.consNo}';
        param.adjustDate='${jsAsTradeBidCons.adjustdate}';
        console.log("表格数据");
        console.log(param);
        $.ajax({
            type: 'POST',
            url: "${ctx}/dljyzx/jsAsTradeBid/saveTradeBid",
            dataType: "json",
            data: param,
            async:true,
            success : function(r){
                if(r.status=="1"){
                    $('#seqTable tr').each(function(i) {
                        if (i > 0) {
                            for (var id in r.data) {

                                var item = r.data[id];
                                var tradeseqConsId = item.tradeseqConsId;
                                var gbsId = item.gbsId;

                                if ($(this).attr("tradeseqConsId") == tradeseqConsId) {
                                    $(this).attr("gbsId", gbsId);
                                }
                            }
                        }
                    });
                    if(status=='0'){
                        showBtn();
                        jBox.tip("保存成功", 'success');
                    }else{
                        $(":input").attr("disabled",true);
                        jBox.tip("提交成功", 'success');
                    }
                }else{
                    showBtn();
                    jBox.tip(r.msg, 'error');
                }
            },
            error : function(){
                jBox.tip('表单提交失败。', 'error');
                showBtn();
            }
        });
    }

    //导出申报96点负荷
    function exportExcel() {
        var powers = [];
        $("input[name='power']").each(function(){
            if(!$(this).val()){
                powers.push(0);
            }else{
                powers.push($(this).val());
            }
        });
        var powersStr=powers.join(',');
        var url = "${ctx}/dljyzx/jsAsTradeBid/exportExcle?power=" + powersStr;
        //打开下载窗口
        window.open(url, "_parent");
    }

    //导入申报96点负荷
    function getFile(obj) {
        $("#upFile").click();
    }
    function addFile(obj) {
        jBox.tip("附件上传中...", 'loading');
        var file = $(obj)[0].files[0];
        if(!file){
            jBox.tip('文件上传失败，请重新上传。', 'success');
            $(obj).val('');
            return;
        }
        var filePath=$(obj).val();
        var point = filePath.lastIndexOf(".");
        var type = filePath.substr(point);
        if(type!=".xlsx"){
            jBox.tip('请上传xlsx文档。', 'success');
            $(obj).val('');
            return;
        }
        if(file.size>(10*1024*1024)){
            jBox.tip('文件大小不能超过10M。', 'success');
            $(obj).val('');
            return;
        }
        var oFormData = new FormData();
        oFormData.append('file', file);
        $.ajax({
            type: 'POST',
            url: "${ctx}/dljyzx/jsAsTradeBid/importExcle",
            data: oFormData,
            cache: false, // 不要缓存
            processData: false, // 不需要进行数据的转换
            contentType: false, // 不要默认的 application/x-www-form-urlencoded 类型，因为 form 表单已经指定了
        }).done(function(data) {
            $(obj).val('');
            setPowers(data.data);
            jBox.tip('上传成功。', 'success');
        }).fail(function(err) {
            jBox.tip('文件上传失败，请重新上传。', 'success');
            $(obj).val('');
            return;
        });
    }

    //更换曲线s
    function changeLine(obj) {
        jBox.tip("开始获取...", 'loading');
        var curveIdSel=$(obj).val();
        $.ajax({
            type:"post",
            url:"${ctx}/dljyzx/cureLine/getInfoDetail",
            data:{"curveId":curveIdSel},
            async:false,
            success:function(data) {
                var powerLine=data.curveData;
                setPowers(powerLine);
                jBox.tip('获取成功。', 'success');
            }
        })
    }

    //获取历史申报数据
    function getTradeBefore(obj) {
        jBox.tip("开始获取...", 'loading');
        var param={};
        param.date=obj.cal.getNewDateStr();
        param.consNo='${jsAsTradeBidCons.consNo}';
        $.ajax({
            type:"post",
            url:"${ctx}/dljyzx/jsAsTradeBid/getTraPowerBefore",
            data:param,
            async:false,
            success:function(data) {
                var powerLine=data.data;
                setPowers(powerLine);
                jBox.tip('获取成功。', 'success');
            }
        })
    }

    // 获取历史实际负荷
    function getActualBefore(obj) {
        jBox.tip("开始获取...", 'loading');
        var param={};
        param.date=obj.cal.getNewDateStr();
        param.consNo='${jsAsTradeBidCons.consNo}';
        $.ajax({
            type:"post",
            url:"${ctx}/dljyzx/jsAsTradeBid/getActualBefore",
            data:param,
            async:false,
            success:function(data) {
                var powerLine=data.data;
                setPowers(powerLine);
                jBox.tip('获取成功。', 'success');
            }
        })
    }

    function clearDate() {
        var powerLine=[];
        for(var i=0;i<96;i++){
            var item={};
            item.tradePower=0;
            powerLine.push(item);
        }
        setPowers(powerLine);
    }


    //96数据加载
    function setPowers(data) {
        var powers=[];
        powers.push(null);
        if(data&&data.length>0){
            $("input[name='power']").each(function(i){
                $(this).val(data[i].tradePower);
                powers.push(data[i].tradePower);
            });
        }else{
            $("input[name='power']").each(function(i){
                $(this).val(0);
                powers.push(null);
            });
        }
        //重新计算序列平均负荷
        reTradePowers();
        var option = myChart.getOption();
        option.series[2].data = powers;
        myChart.setOption(option);
    }

    /**
     *去除小数点后多余的0
     */
    function cutZero(old) {　　 //拷贝一份 返回去掉零的新串

        old = old + "";
        var newstr = old;　　 //循环变量 小数部分长度

        var leng = old.length - old.indexOf(".") - 1;　　 //判断是否有效数

        if(old.indexOf(".") > -1) {　　　　 //循环小数部分

            for(i = leng; i > 0; i--) {　　　　　　 //如果newstr末尾有0

                if(newstr.lastIndexOf("0") > -1 && newstr.substr(newstr.length - 1, 1) == 0) {
                    var k = newstr.lastIndexOf("0");　　　　　　　　 //如果小数点后只有一个0 去掉小数点

                    if(newstr.charAt(k - 1) == ".") {
                        return newstr.substring(0, k - 1);
                    } else {　　　　　　　　　　 //否则 去掉一个0

                        newstr = newstr.substring(0, k);
                    }
                } else {　　　　　　　　 //如果末尾没有0

                    return newstr;
                }
            }
        }
        return old;
    }

</script>
</body>
</html>

