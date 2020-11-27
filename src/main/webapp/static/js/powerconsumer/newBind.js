$('#sid').bind("change", function () {
    if ($(this).val() != '' && $(this).val()) {
        $("#searchForm").submit();
    }
})

function page(n, s, num) {
    if (num == 1) {
        $("#no1").val(n);
        $("#size1").val(s);
    }
    if (num == 2) {
        $("#no2").val(n);
        $("#size2").val(s);
    }
    if (num == 3) {
        $("#no3").val(n);
        $("#size3").val(s);
    }
    $("#searchForm").submit();
}

function back(id) {
    top.jBox.confirm('确定撤销该流程？', '', function (v, h, f) {
        if (v == 'ok') {
            $.post("changeStatus", {guid: id},
                function (data) {
                    $("#searchForm").submit();
                });
        }
        return true;
    })
}

function commitBind(isStock, sid, relationStart, relationEnd,sname) {
    var params = "sid=" + sid + "&isStock=" + isStock + "&relationStart=" + relationStart + "&relationEnd=" + relationEnd;
    var url = $('#ctx').val() + "/PowerConsumerView/bindview/stockBind?" + params;
    //全局弹出
    top.$.jBox("iframe:" + url, {
        title: sname,
        top: 5,
        width: 1040,
        height: 560,
        buttons: {},
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        },
        closed: function () {
            $("#searchForm").submit();
        }
    });
}

function filedownLoad(guid) {
    var url = $('#ctx').val() + "/PowerConsumerView/bindview/downLoadFile?sourceGuid="
        + guid;
    //打开下载窗口
    window.open(url, "_parent");
}

function exportEx() {
    var url = $('#ctx').val() + "/PowerConsumerView/bindview/exportExcel";
    //打开下载窗口
    window.open(url, "_parent");
}

window.parent.document.getElementById('left').style.height = "1500px";
window.parent.document.getElementById('jerichotabiframe_0').style.height = "1500px";

function confirmBind(guid) {
    top.jBox.confirm('确定发送确认消息吗？', '提示', function (v, h, f) {
        if (v == 'ok') {
            $.post("confirm", {guid: guid})
            top.$.jBox.tip('发送成功');
        }
    })
}



