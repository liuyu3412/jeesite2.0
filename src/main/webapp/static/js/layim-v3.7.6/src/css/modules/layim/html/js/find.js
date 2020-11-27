layui.use(['layim', 'laypage', 'table'], function () {
    var layim = layui.layim
        , layer = layui.layer
        , laytpl = layui.laytpl
        , $ = layui.jquery
        , table = layui.table
        , laypage = layui.laypage;

    table.render({
        elem: '#test'
        , url: ''
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
            {field: 'id', width: 80, title: 'ID', sort: true}
            , {field: 'username', width: 80, title: '用户名'}
            , {field: 'sex', width: 80, title: '性别', sort: true}
            , {field: 'city', width: 80, title: '城市'}
            , {field: 'sign', title: '签名', width: '30%', minWidth: 100} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
            , {field: 'experience', title: '积分', sort: true}
            , {field: 'score', title: '评分', sort: true}
            , {field: 'classify', title: '职业'}
            , {field: 'wealth', width: 137, title: '财富', sort: true}
        ]]
    });

//一些添加好友请求之类的交互参见文档
});