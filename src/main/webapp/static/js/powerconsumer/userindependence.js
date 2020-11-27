$(document).ready(function () {
    $("#Inquire").click(function () {
        var processremark = $("#processremark").val();
        if (processremark == "") {
            $.jBox.alert("请输入统一信用代码/户号/用户名称", "消息");
            return false;
        }
        var code = $("#validateCode").val();
        if (code == "") {
            $.jBox.alert("请输入验证码", "消息");
            return false;
        }
        $.post('/homePage/userIndependence', {
            processremark: processremark,
            code: code
        }, function (res) {
            if (res.success == true) {
                $("#userLogs").hide();
                $("#info").show();
                $("#pid").val(res.pid);
            } else {
                $.jBox.alert(res.message, "消息");
                setTimeout(function () {
                    window.location.reload();
                }, 3000);
            }
        });
    })
})
var flag = false;
function linkmanCheck() {
    var linkman = $('#linkman').val();
    var reg = "^[\u4e00-\u9fa5]*$";//
    var re = new RegExp(reg);
    if ($('#linkman').val() == '') {
        jBox.tip("联系人姓名不能为空！", "messager", {id: null, top: '50%'});
        $('#linkman').css({'border-color': 'rgba(245,88,88,0.3)', 'box-shadow': '0 0 7px rgba(245,88,88,2)'});
        $('#linkman').attr('class', 'false');
        flag = false;
        return flag;
    } else {
        if (re.test(linkman)) {
            $('#linkman').attr('class', 'true');
            $('#linkman').css({'border-color': '', 'box-shadow': ''});
                flag=true;
            return flag;
        } else {
            jBox.tip("请输入正确的中文-联系人姓名！", "messager", {id: null, top: '50%'});
            $('#linkman').css({'border-color': 'rgba(245,88,88,0.3)', 'box-shadow': '0 0 7px rgba(245,88,88,2)'});
            $('#linkman').attr('class', 'false');
            flag = false;
            return flag;
        }
    }
}

//电话校验
function telCheck() {
    var zhi = $('#telephone').val();
    var reg = "^1[3|4|5|6|7|8|9][0-9]\\d{8}$";
    var re = new RegExp(reg);
    if (re.test(zhi)) {
        $('#telephone').css({'border-color': '', 'box-shadow': ''});
        $('#telephone').attr('class', 'true');
            flag=true;
        return flag;
    } else {
        jBox.tip('请输入正确的手机号！', 'messager');
        //$('#telephone').val();
        $('#telephone').css({'border-color': 'rgba(245,88,88,0.3)', 'box-shadow': '0 0 7px rgba(245,88,88,2)'});
        $('#telephone').attr('class', 'false');
        flag = false;
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
                flag=true;
            return flag;
        } else {
            jBox.tip('请输入正确的邮箱地址！', 'messager', {id: null, top: '50%'});
            $('#email').css({'border-color': 'rgba(245,88,88,0.3)', 'box-shadow': '0 0 7px rgba(245,88,88,2)'});
            $('#email').attr('class', 'null');
            flag = false;
            return flag;
        }
    } else {
        jBox.tip('请输入邮箱地址！', 'messager', {id: null, top: '50%'});
        $('#email').css({'border-color': 'rgba(245,88,88,0.3)', 'box-shadow': '0 0 7px rgba(245,88,88,2)'});
        $('#email').attr('class', 'null');
        flag = false;
        return flag;
    }
}

//提交人
function submitpersonCheck() {
    var submitperson = $('#submitperson').val();
    var reg = "^[\u4e00-\u9fa5]*$";//
    var re = new RegExp(reg);
    if ($('#submitperson').val() == '') {
        jBox.tip("提交人姓名不能为空！", "messager", {id: null, top: '50%'});
        $('#submitperson').css({'border-color': 'rgba(245,88,88,0.3)', 'box-shadow': '0 0 7px rgba(245,88,88,2)'});
        $('#submitperson').attr('class', 'false');
        flag = false;
        return flag;
    } else {
        if (re.test(submitperson)) {
            $('#submitperson').attr('class', 'true');
            $('#submitperson').css({'border-color': '', 'box-shadow': ''}, {id: null, top: '50%'});
                flag=true;
            return flag;
        } else {
            jBox.tip("请输入正确的中文-提交人姓名！", "messager", {id: null, top: '50%'});
            $('#submitperson').css({'border-color': 'rgba(245,88,88,0.3)', 'box-shadow': '0 0 7px rgba(245,88,88,2)'});
            $('#submitperson').attr('class', 'false');
            flag = false;
            return flag;
        }
    }
}

//提交人联系方式
function submittelCheck() {
    var submittelephone = $('#submittelephone').val();
    var reg = "^1[3|4|5|6|7|8|9][0-9]\\d{8}$";
    var re = new RegExp(reg);
    if (re.test(submittelephone)) {
        $('#submittelephone').css({'border-color': '', 'box-shadow': ''});
        $('#submittelephone').attr('class', 'true');
            flag=true;
        return flag;
    } else {
        jBox.tip('请输入正确的手机号！', 'messager', {id: null, top: '50%'});
        //$('#telephone').val();
        $('#submittelephone').css({'border-color': 'rgba(245,88,88,0.3)', 'box-shadow': '0 0 7px rgba(245,88,88,2)'});
        $('#submittelephone').attr('class', 'false');
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
        var linkman = $('#linkman').val();
        var reg = "^[\u4e00-\u9fa5]*$";//
        var re = new RegExp(reg);
        if ($('#linkman').val() == '') {
            jBox.tip("联系人姓名不能为空！", "messager", {id: null, top: '55%'});
            return ;
        } else {
            if (re.test(linkman)) {

            } else {
                jBox.tip("请输入正确的中文-联系人姓名！", "messager");
                return ;
            }
        }
        var zhi = $('#telephone').val();
        var reg = "^1[3|4|5|6|7|8|9][0-9]\\d{8}$";
        var re = new RegExp(reg);
        if (re.test(zhi)) {

        } else {
            jBox.tip('请输入正确的手机号！', 'messager');
            return ;
        }
        var email = $('#email').val();
        var reg = /^([a-zA-Z0-9_-]||[.,\\])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;//邮箱
        if (email != '') {
            if (reg.test(email)) {
            } else {
                jBox.tip('请输入正确的邮箱地址！', 'messager', {id: null, top: '55%'});
                return ;
            }
        } else {
            jBox.tip('请输入邮箱地址！', 'messager', {id: null, top: '55%'});
            return ;
        }


        var submitperson = $('#submitperson').val();
        var reg = "^[\u4e00-\u9fa5]*$";//
        var re = new RegExp(reg);
        if ($('#submitperson').val() == '') {
            jBox.tip("提交人姓名不能为空！", "messager", {id: null, top: '55%'});
            return ;
        } else {
            if (re.test(submitperson)) {
            } else {
                jBox.tip("请输入正确的中文-提交人姓名！", "messager");
                return ;
            }
        }

        var submittelephone = $('#submittelephone').val();
        var reg = "^1[3|4|5|6|7|8|9][0-9]\\d{8}$";
        var re = new RegExp(reg);
        if (re.test(submittelephone)) {

        } else {
            jBox.tip('请输入正确的手机号！', 'messager');

            return ;
        }
        if ($("#authorizetype option:selected").val() == '') {
            jBox.tip("授权类型必选不能为空！", "messager", {id: null, top: '50%'});
            return;
        }
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
            url: $('#ctx').val() + '/homePage/userIndependenceSave',
            data: {
                "pid": $('#pid').val(),
                "authorizetype": $('#authorizetype option:selected').val(),
                "linkman": $('#linkman').val(),
                "telephone": $('#telephone').val(),
                "email": $("#email").val(),
                "filename": $('#filename').val(),
                "submitperson": $('#submitperson').val(),
                "submittelephone": $('#submittelephone').val(),
                "type": 1,
                "code": code
            },//要传到后台的参数，没有可以不写
            secureuri: false,//是否启用安全提交，默认为false
            fileElementId: 'attfile',//文件选择框的id属性
            dataType: 'JSON',//服务器返回的格式
            async: false,
            success: function (data) {
                var dataObject = eval('(' + data + ')');
                if (dataObject.result == 'success') {
                    jBox.tip('提交成功!', 'messager', {id: null, top: '50%'});
                    setTimeout(function () {
                        window.location.reload();
                    }, 3000);
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