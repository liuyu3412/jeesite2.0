<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
  <meta charset="utf-8">
  <title>操作</title>
  <meta name="decorator" content="blank"/>
  <link rel="stylesheet" href="${ctxStatic}/js/layim-v3.7.6/dist/css/layui.css">
</head>
<body>

<div class="site-demo-button">
  <%--<button class="layui-btn site-demo-layim" data-type="chat">自定义会话</button>--%>
  <%--<button class="layui-btn site-demo-layim" data-type="message">接受好友的消息</button>--%>
  <%--<button class="layui-btn site-demo-layim" data-type="messageAudio">接受音频消息</button>--%>
  <%--<button class="layui-btn site-demo-layim" data-type="messageVideo">接受视频消息</button>--%>
  <%--<button class="layui-btn site-demo-layim" data-type="messageTemp">接受临时会话消息</button>--%>

  <br>

  <button class="layui-btn site-demo-layim" data-type="add">申请好友</button>
  <button class="layui-btn site-demo-layim" data-type="addqun">申请加群</button>
  <%--<button class="layui-btn site-demo-layim" data-type="addFriend">同意好友</button>--%>
  <button class="layui-btn site-demo-layim" data-type="addGroup">增加群组到主面板</button>
  <button class="layui-btn site-demo-layim" data-type="removeFriend">删除主面板好友</button>
  <button class="layui-btn site-demo-layim" data-type="removeGroup">删除主面板群组</button>
  <button class="layui-btn site-demo-layim" data-type="setGray">置灰离线好友</button>
  <button class="layui-btn site-demo-layim" data-type="unGray">取消好友置灰</button>

  <br>

  <!-- 示例-970 -->
  <ins class="adsbygoogle" style="display:inline-block;width:970px;height:90px" data-ad-client="ca-pub-6111334333458862" data-ad-slot="3820120620"></ins>

</div>

<div id="demo1"></div>


<script src="${ctxStatic}/js/layim-v3.7.6/dist/layui.js"></script>
<script>
layui.use(['layim', 'laypage'], function(){
var layim = layui.layim
,layer = layui.layer
,laytpl = layui.laytpl
,$ = layui.jquery
,laypage = layui.laypage;

    //总页数大于页码总数
    laypage.render({
        elem: 'demo1'
        ,count: 70 //数据总数
        ,jump: function(obj){
            console.log(obj)
        }
    });

//一些添加好友请求之类的交互参见文档
});
</script>
</body>
</html>
