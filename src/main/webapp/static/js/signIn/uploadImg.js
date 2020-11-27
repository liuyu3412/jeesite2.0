var imgSrc = [];
var imgFile = [];
var imgName = [];

function imgUpload(obj) {
    var oInput = '#' + obj.inputId;
    var imgBox = '#' + obj.imgBox;
    var btn = '#' + obj.buttonId;
    $(oInput)
        .on("change", function () {
            var fileImg = $(oInput)[0];
            var fileList = fileImg.files;
            var imgSize = this.files[0].size;
            var imgNames = this.files[0].name;
            var suffix = getCaption(imgNames);
            if(suffix=='pdf'|suffix=='jpg'|suffix=='png'|suffix=='jpeg'){
                if (imgSize > 1024 * 1024 * 5) { //1M
                    return alert("上传附件不能超过5MB");
                }
                if (imgFile.length > 2) {
                    return alert("超过限制,附件仅限上传3个");
                }
                for (var i = 0; i < fileList.length; i++) {
                    var imgSrcI = getObjectURL(fileList[i]);
                    imgName.push(fileList[i].name);
                    imgSrc.push(imgSrcI);
                    imgFile.push(fileList[i]);
                }
                addNewContent(imgBox);
            }else{
                return alert("仅限上传jpg、png、jpeg或pdf文件");
            }
        })
    $(btn)
        .on('click', function () {
            if (!limitNum(obj.num)) {
                alert("超过限制,附件仅限上传3个");
                return false;
            }
            var fd = new FormData($('#fileForm')[0]);
            for (var i = 0; i < imgFile.length; i++) {
                fd.append(obj.data + i, imgFile[i]);
            }
            submitPicture(obj.upUrl, fd);
        })
}

function addNewContent(obj) {
    $(imgBox)
        .html("");
    for (var a = 0; a < imgSrc.length; a++) {
        var oldBox = $(obj)
            .html();
        var suffix = getCaption(imgName[a]);

        if (suffix == 'pdf' || suffix == 'PDF') {
            $(obj).html(oldBox + '<div class="pdfContainer"><a class="media" target="_blank" title=' +imgName[a] + ' href=' + imgSrc[a] + '>' +imgName[a].substring(0,20)+"..."+ '</a><p onclick="removeImg(this,' + a + ')" class="imgDelete">删除</p></div>');
        } else {
            $(obj).html(oldBox + '<div class="pdfContainer"> <a src=' + imgSrc[a] + ' title=' +imgName[a] + '  onclick="imgDisplay(this)"    >' + imgName[a].substring(0,20)+"..."+ ' </a><p onclick="removeImg(this,' + a + ')" class="imgDelete">删除</p></div>');

        }
    }
}

function removeImg(obj, index) {
    imgSrc.splice(index, 1);
    imgFile.splice(index, 1);
    imgName.splice(index, 1);
    var boxId = "#" + $(obj)
        .parent('.pdfContainer')
        .parent()
        .attr("id");
    addNewContent(boxId);
}

function limitNum(num) {
    if (!num) {
        return true;
    } else if (imgFile.length > num) {
        return false;
    } else {
        return true;
    }
}

function submitPicture(url, data) {
    var title = $("#title").val();
    if (title == undefined || title == "" || title == null) {
        top.$.jBox.alert('请输入标题!', "提示消息");
        $('#save').removeAttr('disabled', 'disabled');
        return;
    }
    if (title == "" || title == null) {
        top.$.jBox.alert('请输入标题!', "提示消息");
        return;
    }else {
        var Cts = "公司:";
        var Cts2 = "公司：";
        if(title.indexOf(Cts) >= 0 ||title.indexOf(Cts2) >= 0) {
        }else {
            top.$.jBox.alert('标题输入有误，请模仿例子填写！', '提示消息');
            return;
        }
    }

    var phonenum = $("#phonenum").val();
    if (phonenum == undefined || phonenum == "" || phonenum == null) {
        top.$.jBox.alert('请输入联系方式!', "提示消息");
        $('#save').removeAttr('disabled', 'disabled');
        return;
    }

    var description = $("#description").val();
    if (description == undefined || description == "" || description == null) {
        top.$.jBox.alert('请输入合作要求!', "提示消息");
        $('#save').removeAttr('disabled', 'disabled');
        return;
    }
    $('#btn').attr('disabled', 'disabled');
    if (url && data) {
        $.ajax({
            type: "post",
            url: url,
            async: true,
            data: data,
            processData: false,
            contentType: false,
            success: function (dat) {
                if (dat) {
                    if (dat.flag == "success") {
                        top.$.jBox.alert("发送成功，您已提交后台审核!", "提示");
                        setTimeout(function () {
                            window.parent.window.isFreshFlag = "2";//回写父页面的值
                            window.parent.window.jBox.close("regFileUplode");
                            //刷新当前页
                            top.location.reload();
                            window.parent.window.reload();
                        }, 2500);
                    }
                }
            }
        });
    } else {
        top.$.jBox.alert("提交失败!", "提示");
    }
}

function imgDisplay(obj) {
    var src = $(obj).attr("src");
    var title = $(obj).attr('title');
    var suffix = getCaption($(obj).text())
    var imgHtml = '<div style="width: 100%;height: 100vh;overflow: auto;background: rgba(0,0,0,0.5);text-align: center;position: fixed;top: 0;left: 0;z-index: 1000;"><img src=' + src + ' style="margin-top: 100px;width: 70%;margin-bottom: 100px;"/><p style="font-size: 50px;position: fixed;top: 30px;right: 30px;color: white;cursor: pointer;" onclick="closePicture(this)">×</p></div>'
    $('body')
        .append(imgHtml);
}

function download(File) {
    var blob = File;
    var a = document.createElement('a');
    a.download = 'data.pdf';
    a.href = window.URL.createObjectURL(blob);
    a.click();
}

function closePicture(obj) {
    $(obj)
        .parent("div")
        .remove();
}

function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

function getCaption(obj) {
    var index = obj.lastIndexOf("\.");
    obj = obj.substring(index + 1, obj.length);
    return obj;
}