var guid = "";
var show = "";
var readOnly = "";
var owernbitss = "";
function init() {
    initParams();
    loadForm();
    readOnlyInput();
}

function initParams() {
    // 获取参数信息
    var Params = window.location.search;
    //
    if (Params != null && Params.length > 0) {
        // 分割参数
        var ppp = Params.split("&");
        if (localStorage.getItem("participantId")) {
            participantid = localStorage.getItem("participantId");
        }
        // 循环遍历
        for (i = 0; i < ppp.length; i++) {
            // 市场成员id

            if (ppp[i].indexOf("show") != -1) {
                show = ppp[i].substring(ppp[i].indexOf("show") + 5, ppp[i].length);
            }
            if (ppp[i].indexOf("guid") != -1) {
                guid = ppp[i].substring(ppp[i].indexOf("guid") + 5, ppp[i].length);
            }
        }
        // 设置隐藏框 市场成员id
        $("#participantid").val(participantid);
    }
    /**
     * 加载是否只读信息
     */
    $.ajax({
        url: "/pmos/rest/regist/loadStatus",
        type: "POST",
        async: false,
        dataType: "json",
        data: {},
        success: function (data) {
            // 只读设置
            if (data.resultValue.items[0].readOnly == "true") {
                readOnly = "true";
            }
        }

    });
}
/**
 * 当处于查看的时候只读状态
 */
function readOnlyInput() {
    if (readOnly == "true") {
        //所有的input 设置为只读
        $(".formTable input").each(function () {
            $(this).attr("readonly", true);
        })
        /*$("#personsex").combo("hideIcon");*/
        document.getElementById("saveBtn").style.display = "none";
    }
    else {

    }

}
/**
 * 保存
 */
function save() {
    var flag = false;
    var owernbitall = 0;
    if (owernbitss == null || owernbitss == "") {
        owernbitss = 0;
    }
    //验证
    if (flag == false) {
        var owernname = $("#owernname").val();
        if(!(/^[\u4e00-\u9fa5]*$/).test(owernname)){
            top.$.jBox.alert("请输入中文", "提示");
            return;        }
        var owernbit = $("#owernbit").val();
        if (owernname == null || owernname == '') {
            top.$.jBox.alert("股东名称不能为空", "提示");
            return;
        }
        if (!owernbit) {
            top.$.jBox.alert("持股比率不能为空", "提示");
            return;
        }
        if (isNaN(owernbit)) {
            top.$.jBox.alert("股权比例必须为数字!", "提示");
        } else {
            var sum = 0;
            if ($("#sum").val()) {
                sum = $("#sum").val();
            }
            var total = parseFloat(owernbit) + parseFloat(sum);
            if (total <= 100) {
                var formData = new FormData($("#gudongForm")[0]);
                $.ajax({
                    url: "savegudongInfo",
                    type: "POST",
                    data: formData,
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (rc) {
                        if (rc) {
                            if (rc.flag == "success") {
                                top.$.jBox.alert("新增成功!", "提示");
                                top.$.jBox.close("DetailInfo");
                            }
                        }
                    }
                });
            } else {
                top.$.jBox.alert("股权比例总和不能大于100!", "提示");
            }
        }


        /*post(url, data, function(rc) {
         if(rc.successful){
         top.$.messager.alert('提示','保存成功','info',function(){
         top.$.jBox.close('DetailInfo');
         });
         }else{
         $.messager.alert('提示','保存失败');
         }
         });*/
    }

}
function loadForm() {
    if (guid == null || guid == "") {
    } else {
        $.ajax({
            url: "/pmos/rest/regist/loadgudongInfo?guid="
            + guid,
            type: "post",
            dataType: "json",
            success: function (rc) {
                //获取返回结果 --就一个值
                var data = rc.resultValue.items[0];
                $('#gudongForm').form('load', data);
                owernbitss = data.owernbit;
                wrapComboTree($('#gudongForm'), rc.resultValue.dicts);
            },
            error: function (event, request, settings) {
                top.$.messager.alert('消息', '数据已加载，请勿频繁操作!');
            }
        });
    }


}