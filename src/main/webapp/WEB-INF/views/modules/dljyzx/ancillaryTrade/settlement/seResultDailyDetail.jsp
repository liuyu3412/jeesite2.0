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
    <title>日结算查询</title>
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
        .a_a{
            text-decoration:underline;color: blue;cursor: pointer;
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
        .link{
            cursor: pointer !important;
        }
        .ground{
            background: rgba(255,255,255,0.7)
        }
    </style>
    <script src="${ctx}/static/modules/cms/front/themes/basic/echarts.js"></script>
    <script type="text/javascript">
    </script>
</head>
<body>
<form:form id="searchForm1" modelAttribute="" action="${ctx}/dljyzx/settlement/toDetail" method="post" class="breadcrumb form-search">
    <h class="h-font">辅助服务市场结算结果查询</h>
    <ul class="ul-form">
            <%--<li><label>年份：</label>--%>
            <%--<input id="year" name="year" readonly="readonly" maxlength="20" class=" Wdate required"--%>
            <%--onclick="WdatePicker({dateFmt:'yyyy-mm',isShowClear:false});" onchange="queryForm()"/>--%>
            <%--</li>--%>
        <%--<li><label>月份：</label>--%>
            <%--<input style="width: 85px;"--%>
                   <%--id="yearMonth" name="yearMonth" type="text"--%>
                <%--&lt;%&ndash;readonly="readonly" maxlength="20" &ndash;%&gt;--%>
                   <%--class="input-medium Wdate"--%>
                   <%--value="${seResultDaily.yearMonth}"--%>
                   <%--readonly="readonly"--%>
                   <%--onfocus="WdatePicker({dateFmt:'yyyy-MM',isShowClear:false})" >--%>
        <%--</li>--%>
        <li><label>状态：</label>
            <select style="width:120px;" id="status" name="status" value="">
                <option value="">全部</option>
                <option ${status=="1"?"selected":""} value="1">已确认</option>
                <option ${status=="0"?"selected":""} value="0">未确认</option>
                <option ${status=="2"?"selected":""} value="2">有异议</option>
            </select>
        </li>
        <li><label>户号：</label>
            <input  type="text"  id="consumerNumber" name ="consumerNumber"  value="${consumerNumber}" />
        </li>
        <li class="btns">
            <input id="btnQuery" class="btn btn-primary" type="submit" value="查询"/>
                <%--<input id="btnSubmit" onclick="save('01')" class="btn btn-primary" type="button" value="提交"/>--%>
        </li>
        <li class="btns">
        <input id="btnConfirm" class="btn btn-primary"  type="button" onclick="confirmStatus()" value="确认"  ></input>
        </li>
        <li class="btns">
            <input id="btnReport" class="btn btn-primary"  type="button" onclick="report()" value="申诉" ></input>
        </li>
       <input id="tradeseqId" name="tradeseqId"  value="${tradeseqId}" style="display: none"  />
        <input id="adjustDate" name="adjustDate"  value="${adjustDate}" style="display: none"  />
    </ul>
    <%--<span class="lock-status">状态：<span id="lockStatus"></span><span id="status"></span></span>--%>
</form:form>


<sys:message content="${message}"/>
<div id="scrollBox" style="width: 100%; height: 60%; overflow-x: auto;white-space: nowrap ">
    <table id="contentTable" class="table table-striped table-bordered table-condensed ground">
        <thead>
        <tr>
            <th>全选<input type="checkbox" id="parentCheck"/></th>
            <th>月份</th>
            <th>交易需求名称</th>
            <th>户号</th>
            <%--<th>所属市场成员名称</th>--%>
            <th>所属售电公司</th>
            <th>结算日期</th>
            <th>申报电力</th>
            <th>实际电力</th>
            <th>实际平均负荷</th>
            <th>实际调节电力</th>
            <th>时段小时数</th>
            <th>奖惩类型</th>
            <th>准确率</th>
            <th>补偿价格（元/兆瓦）</th>
            <th>补偿金额（元）</th>
            <th>电力用户分成</th>
            <th>售电公司分成</th>
            <th>考核价格（元/兆瓦）</th>
            <th>考核金额（元）</th>
            <th>电力用户分摊</th>
            <th>售电公司分摊</th>
            <th>状态</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach var="seResultDaily" items="${page.list}">
            <tr tradeseqId="${seResultDaily.tradeseqId}"   status ="  ${seResultDaily.status}"
                seqName ="${seResultDaily.seqName}"
                guId="${seResultDaily.guId}" adjustDate="${seResultDaily.adjustDate}" >

                <td>
                    <input type="checkbox" class="checkValue"/>
                </td>
                <td>
                        ${seResultDaily.yearMonth}
                </td>
                <td>

                    <a >${seResultDaily.seqName}</a>
                </td>
                <td>
                        ${seResultDaily.consumerNumber}
                </td>
                <%--<td>--%>
                        <%--${seResultDaily.participantName}--%>
                <%--</td>--%>
                <td>
                        ${seResultDaily.seller}
                </td>
                <td>
                        ${seResultDaily.seDate}
                </td>

                <td>
                        ${seResultDaily.bidPower}
                </td>
                <td>
                        ${seResultDaily.realPower}
                </td>
                <td>
                        ${seResultDaily.realTimeAverageLoad}
                </td>
                <td>
                        ${seResultDaily.realReguPower}
                </td>
                <td>
                        ${seResultDaily.interval}
                </td>
                <td>
                        ${seResultDaily.moneyType}
                </td>
                <td>
                        ${seResultDaily.accuRacy}
                </td>
                <td>
                        ${seResultDaily.addPrice}
                </td>

                <td>
                        ${seResultDaily.addMoney}
                </td>
                <td>
                        ${seResultDaily.consumberShare}
                </td>
                <td>
                        ${seResultDaily.sellerShare}
                </td>
                <td>
                        ${seResultDaily.assPrice}
                </td>
                <td>
                        ${seResultDaily.assMoney}
                </td>
                <td>
                        ${seResultDaily.consumberPenalty}
                </td>
                <td>
                        ${seResultDaily.sellerPenalty}
                </td>

                <td>
                        ${seResultDaily.status}
                </td>
                <td>
                    <%--<a  href="javascript:void(0)"   onclick="javaScript:confirm('${seResultDaily.guId}')">--%>
                        <%--<span class="link">确认 </span>--%>

                    <%--</a>--%>
                    <%--<a  href="javascript:void(0)"   onclick="javaScript:report('${seResultDaily.guId}')">--%>
                        <%--<span class="a_a">申诉 </span>--%>
                    <%--</a>--%>
                        <c:if test="${seResultDaily.status == '有异议'}">
                            <a  href="javascript:void(0)"   onclick="javaScript:recall(this)">
                                <span class="a_a">撤回 </span>
                            </a>
                        </c:if>

                        <c:if test="${seResultDaily.status == '有异议'}">
                            <a  href="javascript:void(0)"   onclick="javaScript:reportpdfview('${seResultDaily.guId}')">
                                <span class="a_a">预览 </span>
                            </a>
                        </c:if>


                    <c:if test="${seResultDaily.status == '有异议'}">
                    <a  href="javascript:void(0)"   onclick="javaScript:reportpdfdown('${seResultDaily.guId}')">
                        <span class="a_a">下载 </span>
                    </a>
                    </c:if>
                </td>
            </tr>

        </c:forEach>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td >合计:${decimalAddMoney}</td>
            <td></td>
            <td></td>
            <td></td>
            <td>合计:${decimalAssMoney}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        </tbody>
    </table>

    <div class="pagination">${page}</div>
</div>



<form:form id="searchForm"  action="${ctx}/dljyzx/settlement/list" method="post" class="breadcrumb form-search">
    <input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
    <input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
    <%--<input id="userName" name="userName" type="hidden" value="${userName}" />--%>
</form:form>
<script type="text/javascript">
    function page(n,s){
        $("#pageNo").val(n);
        $("#pageSize").val(s);
        $("#searchForm").submit();
        return false;
    }


    function confirmStatus(){
        var number=0;
        $('#contentTable tr').each(function(i) {
            if ($(this).find('input').attr("checked")) {
                number++;
            }else{
                i++;
            }
        });
        console.log("number:"+number);
        if(number==0){
            confirmAll();
        }else{
            confirmChecked();
        }
    }
function confirmChecked(){

    // var tradeseqId =  $("#tradeseqId").val();
    var adjustDate =  $("#adjustDate").val();
    var status =  $("#status").val();

    // console.log("tradeseqId:"+tradeseqId);
    var indArry =[];
    $('#contentTable tr').each(function(i) {
        if ($(this).find('input').attr("checked")) {
            seqName =$(this).attr("seqName");

            if('有异议' == $(this).attr("status")  ){

                top.$.jBox.tip("有记录已申诉,不可再次确认");
                flag=false;
                return false ;
            }else{
                guId = $(this).attr("guId");
                indArry.push(guId);
            }
        }
    });
    var  s="";
        for(var i=0;i<indArry.length;i++){
            s=s+indArry[i]+"-";
        }
        s=s.substring(0,s.length-1);
        console.log("s:"+s);
        $.ajax({
            type:"post",
            url:"${ctx}/dljyzx/settlement/confirm",
            data:{
                "adjustDate":adjustDate,
                "guIds":s
            },
            async:false,
            success:function(data){
                alert(data.msg);
                $("#btnQuery").click();
            }
            ,});


}

function  confirmAll(){
     if(confirm('确认当前所有未确认记录?')){
         var tradeseqId=$(obj).parent().parent().attr("tradeseqId");
         var adjustDate =$("#adjustDate").val();
         var status =  $("#status").val();
         $.ajax({
             type:"post",
             url:"${ctx}/dljyzx/settlement/confirm",
             data:{
                 "adjustDate":adjustDate,
                 "status":status
             },
             async:false,
             success:function(data){
                 alert(data.msg);
                 $("#btnQuery").click();
             }
             ,});
   }
}
function recall(obj){

    if(confirm('确定要撤回当前申诉?')){

        var tradeseqId=$(obj).parent().parent().attr("tradeseqId");
        var guId=$(obj).parent().parent().attr("guId");
        // var tradeseqId =  $("#tradeseqId").val();
        $.ajax({
            type:"post",
            url:"${ctx}/dljyzx/settlement/recall",
            data:{
                "tradeseqId":tradeseqId,
                "guId":guId
            },
            async:false,
            success:function(data){
                console.log("data:"+data);
                console.log(data);
                alert(data.msg);
                $("#btnQuery").click();
            }
            ,});
    }
}


    $(function() {
        $("#parentCheck").click(function() {

                if ($("#parentCheck").attr("checked")) {
                    $("#contentTable tbody td").each(function() {
                        $(this).find("input").attr("checked","true");
                    });
                }else {
                    $("#contentTable tbody td").each(function() {
                        $(this).find("input").removeAttr("checked","true");
                    });
                }
            }
        );
    });
    function report(){
        var indArry=[];
        var flag=true;
        var guId;
        var number=0;
        var seqName="";
        $('#contentTable tr').each(function(i) {
            if ($(this).find('input').attr("checked")) {
                number++;
            }
        });
        if(number ==0){
            top.$.jBox.tip("请选择记录");
            return;
        }

        $('#contentTable tr').each(function(i) {
            if ($(this).find('input').attr("checked")) {
                tradeseqId =$(this).attr("tradeseqId");

                if('有异议' == $(this).attr("status")  ){

                    top.$.jBox.tip("记录已申诉");
                    flag=false;
                    return false ;
                }else{
                    guId = $(this).attr("guId");

                    indArry.push(guId);
                }
            }
        });
        if(!flag){
            return;
        }

        reportInfo(indArry,tradeseqId);

    }
    function reportInfo(indArry,tradeseqId){
        var s="";
        for(var i=0;i<indArry.length;i++){
            s=s+indArry[i]+"-";
        }
        s=s.substring(0,s.length-1);

        console.log("s:"+s);
        var name = "确认页面";
        var url = "${ctx}/dljyzx/settlement/report?guIds="+s+"&tradeseqId="+tradeseqId;

        top.$.jBox("iframe:" + url, {
            title: name,
            id:'report',
            name:'report',
            width: 500, height: 500,
            iframeScrolling: 'yes',
            buttons: {},
            closed: function () {
                $("#btnQuery").click();
            },
            loaded: function (h) {
                $(".jbox-content", top.document).css("overflow-y", "hidden");
            }
        });
    }
    <%--function toDetail(obj){--%>
        <%--var tradeseqId=$(obj).parent().parent().attr("tradeseqId");--%>
       <%--alert(tradeseqId);--%>
        <%--var url = "${ctx}/dljyzx/settlement/toDetail?tradeseqId="+tradeseqId;--%>
        <%--top.$.jBox("iframe:" + url, {--%>
            <%--title: name,--%>
            <%--id:'toDetail',--%>
            <%--name:'toDetail',--%>
            <%--width: 500, height: 500,--%>
            <%--iframeScrolling: 'yes',--%>
            <%--buttons: {},--%>
            <%--closed: function () {--%>
                <%--$("#btnQuery").click();--%>
            <%--},--%>
            <%--loaded: function (h) {--%>
                <%--$(".jbox-content", top.document).css("overflow-y", "hidden");--%>
            <%--}--%>
        <%--});--%>

    <%--}--%>

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


</script>
</body>
</html>


