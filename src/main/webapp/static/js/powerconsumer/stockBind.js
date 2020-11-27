function goBind(userId, participantName, businessCode) {
    var params = "sid=" + $('#sid').val() + "&userId=" + userId + "&businessCode=" + businessCode
        + "&relationStart=" + $('#relationStart').val() + "&relationEnd=" + $('#relationEnd').val();
    var url = $('#ctx').val() + "/PowerConsumerView/bindview/thirdView?" + params;
    //全局弹出
    top.$.jBox("iframe:" + url, {
        title: "",
        top: 80,
        width: 520,
        height: 450,
        buttons: {},
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        },
        closed: function () {
            if (localStorage.getItem("data")) {
                if (localStorage.getItem("data").length > 2) {
                    top.$.jBox.tip(localStorage.getItem("data"));
                } else {
                    top.$.jBox.tip(localStorage.getItem("data"), 'success');
                }
                localStorage.removeItem("data")
            }
        }
    });
}

function subBind() {

    if (!$('#contractNo').val()){
        jBox.alert("合同编号不能为空", "消息");
        return
    }
    var filePdf = $('#file')[0].files[0]
    var fileName = filePdf.name;
    if (!fileName) {
        jBox.alert("请上传文件", "消息");
        return
    }
    if (filePdf.size>2*1024*1024){
        jBox.alert("最大文件限制为2MB", "消息");
        return
    }
    if (fileName.indexOf('.pdf') == -1) {
        jBox.alert("只能上传PDF格式的文件", "消息");
        return
    }
    var relationStart = $('#relationStart').val();
    var relationEnd = $('#relationEnd').val();
    $('#start').val(relationStart.replace(new RegExp('-', 'g'), ""));
    $('#end').val(relationEnd.replace(new RegExp('-', 'g'), ""));

    var formData = new FormData();
    formData.append('sid', $('#sid').val());
    formData.append('userId', $('#userId').val());
    formData.append('participantName', $('#participantName').val());
    formData.append('businessCode', $('#businessCode').val());
    formData.append('relationStart', $('#start').val());
    formData.append('relationEnd', $('#end').val());
    formData.append('contractNo', $('#contractNo').val());
    formData.append('file', $('#file')[0].files[0]);
    jBox.tip("Loading...", 'loading');

    $.ajax({
        url: $('#ctx').val() + '/PowerConsumerView/bindview/bindUser',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            localStorage.setItem("data", data)
            window.parent.window.jBox.close();
        }
    });
}


function selectBs(v) {
    var url = $('#ctx').val() + "/BaaddSaleCompanyView/bindview/objectAdminLoad?consid=" + v;
    //全局弹出
    top.$.jBox("iframe:" + url, {
        title: "",
        top: 100,
        width: 700,
        height: 390,
        buttons: {},
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        },
        closed: function () {

        }
    });
}