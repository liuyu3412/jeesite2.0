var flag = 1;
;

function usernameLogin() {
    $('.userLog').attr("style", "display:block");
    $('.keyLog').attr("style", "display:none");
}


function ukeyLogin() {

    var userName = $('#username').val();
    if (flag == 1) {
        var eDiv = document.createElement("div");
        //		var eDiv = $('.foot').createElement("div");
        if (navigator.appName.indexOf("Internet") >= 0) {
            if (window.navigator.cpuClass == "x86") {
                eDiv.innerHTML = "<object id=\"CryptoAgent\" codebase=\"plugs/CryptoKit.Standard.x86.cab\" classid=\"clsid:2F9BEB71-4164-4837-99EE-ED8065B58658\" ></object>";
            } else {
                eDiv.innerHTML = "<object id=\"CryptoAgent\" codebase=\"plugs/CryptoKit.Standard.x64.cab\" classid=\"clsid:EC380EBA-922E-41F8-89FF-2FE4DCD200E3\"></object>";
            }

        } else {
            eDiv.innerHTML = "<embed id=\"CryptoAgent\" type=\"application/npCryptoKit.standard.x86\" style=\"height: 0px; width: 0px\">";
            $("#a_loadexe_id").css("display", "");
            $("#a_loadexe_id").attr("href", "./plugs/npCryptoKit.Standard.x86.exe");
        }
        document.body.appendChild(eDiv);
        flag = 0;
    }

    var CryptoAgency = document.getElementById("CryptoAgent");
    var CertSubjectDN;
    try {
        //CertSubjectDN = CryptoAgency.SelectSignCertificate("", "CFCA") ;
        CertSubjectDN = CryptoAgency.SelectSignCertificate("", "");
    } catch (err) {
    }
    if (!CertSubjectDN)		//如果证书不存在
    {
        var LastErrorDesc;
        try {
            LastErrorDesc = CryptoAgency.GetLastErrorDesc();
        } catch (e) {
        }
        /*if (LastErrorDesc) {

            jBox.alert(LastErrorDesc, "消息");
        } else {
            jBox.alert("请先安装插件,然后在使用证书", "消息");
        }*/
        $("#lb").removeClass("login_over");
        return false;
    } else {
        var selectedAlg = "sha-1";

        var Signature = CryptoAgency.SignMessage(userName, selectedAlg);

        $("#signusername").val(Signature.replace(/\+/g, ",,,"));
        return true;

    }
}
$(document).ready(function () {
    //二类用户获取短信验证码
    var validCode = true;
    $(".msgss").click(function () {
        var time = 120;
        var code = $(this);
        var flag = $("input[name='Fruit']:checked").val();
        if (validCode) {
            validCode = false;
            code.addClass("msgs1");
            if(temp=='keylogin'&&$("#cno").val().trim()==''){
                $.jBox.alert("用电总户号不能为空", "消息");
                return false;
            }
            if(temp=='ucreditkeylogin'&&$("#key").val().trim()==''){
                $.jBox.alert("统一社会信用代码不能为空", "消息");
                return false;
            }
            //创建短信验证码
            $.post('/shortMessagePush/secondMessagePush', {
                cno: strEnc($("#cno").val().trim(), k1, k2, k3),
                key: strEnc($("#key").val().trim(), k1, k2, k3),
                type: flag
            }, function (res) {
                if (res.success == true) {
                    var t = setInterval(function () {
                        time--;
                        code.html(time + "秒");
                        if (time == 0) {
                            clearInterval(t);
                            code.html("重新获取");
                            validCode = true;
                            code.removeClass("msgs1");
                        }
                    }, 1000)
                    $.jBox.alert(res.message, "消息");
                } else {
                    $.jBox.alert(res.message, "消息");;
                }
            });
        }
    });



});