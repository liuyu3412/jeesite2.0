var flag = false;

function linkmanCheck() {
    if ($('#username').val() == '') {
        jBox.tip("单位中文名称不能为空！", "messager", {id: null, top: '40%'});
        $('#username').css({'border-color': 'rgba(245,88,88,0.3)', 'box-shadow': '0 0 7px rgba(245,88,88,2)'});
        $('#username').attr('class', 'false');
        flag = false;
        return flag;
    } else {
        $('#username').css({'border-color': '', 'box-shadow': ''});
        $('#username').attr('class', '');
        flag = true;
        return flag;
    }
}

//邮箱校验
function emailCheck() {
    var email = $('#email').val();
    var reg = /^([a-zA-Z0-9_-]||[.,\\])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;//邮箱
    if (email != '') {
        if (reg.test(email)) {
            $('#email').css({'border-color': '', 'box-shadow': ''});
            $('#email').attr('class', '');
            flag = true;
            return flag;
        } else {
            jBox.tip('请输入正确的邮箱地址！', 'messager', {id: null, top: '45%'});
            $('#email').css({'border-color': 'rgba(245,88,88,0.3)', 'box-shadow': '0 0 7px rgba(245,88,88,2)'});
            $('#email').attr('class', 'null');
            flag = false;
            return flag;
        }
    } else {
        jBox.tip('请输入邮箱地址！', 'messager', {id: null, top: '45%'});
        $('#email').css({'border-color': 'rgba(245,88,88,0.3)', 'box-shadow': '0 0 7px rgba(245,88,88,2)'});
        $('#email').attr('class', 'null');
        flag = false;
        return flag;
    }
}


function fileSelected() {
    var filePath = $("#attfile").val();
    var file = $("#filename");
    var index = filePath.lastIndexOf("\\");
    fileName = filePath.substring(index + 1, filePath.length);
    file.val(fileName);
}


function save() {
    if (flag) {
        var code = $("#validateCode2").val();
        if (code == "") {
            jBox.tip('请输入验证码', 'messager', {id: null, top: '50%'});
            return false;
        }
        if ($("#filename").val() == "") {
            jBox.tip('请上传PDF附件！', 'messager', {id: null, top: '50%'});
            return;
        }
        var f = document.getElementById("attfile").files;
        var fsize = f[0].size
        if (fsize > 2097152) {
            jBox.tip('最大上传文件大小2MB！', 'messager', {id: null, top: '50%'});
            return;
        }
        $('#save').attr('disabled', 'disabled');
        // 验证文件名是否有效
        var isLegal = validationFileName($("#attfile").val());
        if (isLegal == false) {
            jBox.tip('文件类型不合法！', 'messager', {id: null, top: '50%'});
            $('#save').removeAttr('disabled', 'disabled');
            return;
        }
       $.ajaxFileUpload({
            type: "POST",
            url: $('#ctx').val() + '/homePage/retrieveAccount',
            data: {
                "email": $("#email").val(),
                "pname": $('#username').val(),
                "filename": $('#filename').val(),
                "code": code
            },//要传到后台的参数，没有可以不写
            secureuri: false,//是否启用安全提交，默认为false
            fileElementId: 'attfile',//文件选择框的id属性
            dataType: 'JSON',//服务器返回的格式
            async: false,
            success: function (data) {
                var dataObject = eval('(' + data + ')');
                if (dataObject.result == 'success') {
                    jBox.tip('提交成功，我们将尽快与您联系，请耐心等待！', 'messager', {id: null, top: '50%'});
                    setTimeout(function () {
                        window.location.href="/admin/login";
                    },3000);
                } else {
                    if (dataObject.result == 'epdf') {
                        jBox.tip('文件格式不正确!', 'messager', {id: null, top: '50%'});
                    } else {
                        jBox.tip(dataObject.message, 'messager', {id: null, top: '50%'});
                    }
                }
            },
            error: function (data, status, e) {
            }
        });
    } else {
        jBox.tip("请把按要求填写信息！", "messager", {id: null, top: '50%'});
        return flag;
    }
}

function validationFileName(fileName) {
    // 限制的类型
    var LIMIT_TYPES = "exe,bat,jsp";
    // 允许类型
    var ALLOW_TYPES = "doc,docx,ppt,pptx,xls,xlsx,vsd,vsdx,wps,et,dps,pdf,ceb,cebx,txt,rtf,oeb,jpg,jpeg,gif,png,bmp,tif,rar,7z,zip";
    var index = fileName.lastIndexOf(".");
    var fileName = fileName.substring(index + 1, fileName.length);
    var num1 = LIMIT_TYPES.indexOf(fileName);
    var num2 = ALLOW_TYPES.indexOf(fileName);
    if (num2 >= 0) {
        return true;
    }
    if (num1 >= 0) {
        return false;
    }
    return true;
}


//点击文件下载
$('.fileDown2').click(function () {
    var url =$('#ctx').val() + "/homePage/downLoadRetrieveFile";
   //打开下载窗口
    window.open(url, "_parent");
});