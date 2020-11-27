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

function commitBind(sname, sid) {
    var path = window.location.href.substring(0, (window.location.href.indexOf('/', window.location.href.indexOf('/') + 3)));
    $.ajax({
            url: path + "/homePage/marketparticipant?participantType="
                + 0,
            type: "POST",
            dataType: "json",
            success: function (rc) {
            // 跳转到下一个页面
            if (rc) {
                var participantId = localStorage.getItem("participantId");
                localStorage.setItem("panIdSign", rc.sign);
                if (participantId == null || participantId == "") {
                    localStorage.setItem("participantId", rc.participantId);
                } else {
                    localStorage.removeItem("participantId");
                    localStorage.setItem("participantId", rc.participantId);
                }


                var url = path + "/homePage/zhuCeDlyh?type=0&participantid=" + rc.participantId + "&sid=" + sid;
                //全局弹出
                top.$.jBox("iframe:" + url, {
                    title: sname,
                    top: 5,
                    width: 1250,
                    height: 560,
                    buttons: {},
                    loaded: function (h) {
                        $(".jbox-content", top.document).css("overflow-y", "hidden");
                    },
                    closed: function () {
                        if (localStorage.getItem("data")) {
                                top.$.jBox.tip("提交成功", 'success');
                        }
                        localStorage.removeItem("data")
                        $("#searchForm").submit();
                    }
                });
            }
        }
    });


}


















