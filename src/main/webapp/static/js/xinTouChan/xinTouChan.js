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
    var url = $('#ctx').val() + "/xinTouChan/addXinView?" + "sid=" + sid;
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
            $("#searchForm").submit();
        }
    });
}


var lineNum = 0;

function addLine() {
    lineNum = lineNum + 1;
    var tr = "<tr><td>" + lineNum + "</td>" +
        "<td><select  style=\"width: 90px; height: 34px;text-align: center\">" +
        "<option value=''>请选择</option>" +
        "<option value='402881e5405cc9670140717668ea027f'>南京市</option>" +
        "<option value='402881e5405cc9670140717bf88f0284'>南通市</option>" +
        "<option value='402881e5405cc9670140717a4c180282'>常州市</option>" +
        "<option value='402881e5405cc967014071794bbf0281'>徐州市</option>" +
        "<option value='402881e5405cc9670140718e6f6d028c'>扬州市</option>" +
        "<option value='402881e5405cc967014071784a2d0280'>无锡市</option>" +
        "<option value='402881e5405cc96701407191c9560290'>泰州市</option>" +
        "<option value='402881e5405cc96701407185422f0288'>盐城市</option>" +
        "<option value='402881e5405cc9670140717b2a040283'>苏州市</option>" +
        "<option value='402881e5405cc9670140717f93790285'>连云港市</option>" +
        "<option value='402881e5405cc96701407190dfa2028f'>镇江市</option>" +
        "<option value='402881e5405cc96701407193b7a90291'>宿迁市</option>" +
        "<option value='402881e5405cc9670140718463770287'>淮安市</option>" +
        "</select>" +
        "</td>" +
        "<td><input class='input-small' style=\"width: 200px; height: 34px;text-align: center\"/></td>" +
        "<td><input class='input-small' style=\"width: 150px; height: 34px;text-align: center\"/></td>" +
        "<td width='90px'><select  style=\"width: 90px; height: 34px;text-align: center\">" +
        "<option value=''>请选择</option>" +
        "<option value='0.4kV'>0.4kV</option>" +
        "<option value='6.3kV'>6.3kV</option>" +
        "<option value='10kV'>10kV</option>" +
        "<option value='20kV'>20kV</option>" +
        "<option value='35kV'>35kV</option>" +
        "<option value='66kV'>66kV</option>" +
        "<option value='110kV'>110kV</option>" +
        "<option value='220kV'>220kV</option>" +
        "<option value='330kV'>330kV</option>" +
        "<option value='500kV'>500kV</option>" +
        "<option value='750kV'>750kV</option>" +
        "<option value='1000kV'>1000kV</option>" +
        "</select></td>" +
        "<td style='width: 120px'><select  style=\"width: 120px; height: 34px;text-align: center\">" +
        "<option value=''>请选择</option>" +
        "<option value='1'>新注册用户</option>" +
        "<option value='2'>新增户号</option>" +
        "</select></td>" +
        "<td><input type='file' style=\"width: 200px; height: 34px;text-align: center\" /></td>" +
        "<td><input type='file' style=\"width: 200px; height: 34px;text-align: center\" /></td></tr>";
    $("#t1").append(tr);
}


function removeLine() {
    var trs = $('#t1 tbody').children()
    if (trs.length > 1) {
        trs.last().remove();
        lineNum = lineNum - 1;
    }
}

function dateGet() {

    var formData = new FormData();
    var isEmpty = true;
    for (var j = 0; j < lineNum && isEmpty; j++) {
        var jsonStr = '{}';
        var ob = JSON.parse(jsonStr);
        $('#t1').find('td').each(function (i) {
            if (i / 8 >= j && i / 8 < j + 1) {
                if (i % 8 == 1) {
                    var d1 = $(this).children().eq(0).val();
                    if (d1) {
                        ob['areaCounty'] = d1;
                    } else {
                        jBox.alert('所有单元格不许为空');
                        isEmpty = false;
                        return false;
                    }
                }
                if (i % 8 == 2) {
                    var d2 = $(this).children().eq(0).val();
                    if (d2) {
                        ob['participantName'] = d2
                    } else {
                        jBox.alert('所有单元格不许为空');
                        isEmpty = false;
                        return false;
                    }
                }
                if (i % 8 == 3) {
                    var d3 = $(this).children().eq(0).val();
                    if (d3) {
                        ob['userNumber'] = d3
                    } else {
                        jBox.alert('所有单元格不许为空');
                        isEmpty = false;
                        return false;
                    }
                }
                if (i % 8 == 4) {
                    var d4 = $(this).children().eq(0).val();
                    if (d4) {
                        ob['voltageLevel'] = d4
                    } else {
                        jBox.alert('所有单元格不许为空');
                        isEmpty = false;
                        return false;
                    }
                }
                if (i % 8 == 5) {
                    var d5 = $(this).children().eq(0).val();
                    if (d5) {
                        ob['updateType'] = d5
                    } else {
                        jBox.alert('所有单元格不许为空');
                        isEmpty = false;
                        return false;
                    }
                }
                if (i % 8 == 6) {
                    var d6 = $(this).children().eq(0)[0].files[0];
                    if (!d6) {
                        jBox.alert('所有单元格不许为空');
                        isEmpty = false;
                        return false;
                    }
                    if (d6.name.indexOf('.pdf') == -1) {
                        jBox.alert("只能上传PDF格式的文件", "消息");
                        isEmpty = false;
                        return false;
                    }
                    var guid1 = guid();
                    ob['rssqb'] = guid1;
                    formData.append(guid1, d6)
                }
                if (i % 8 == 7) {
                    var d7 = $(this).children().eq(0)[0].files[0];
                    if (!d7) {
                        jBox.alert('所有单元格不许为空');
                        isEmpty = false;
                        return false;
                    }
                    if (d7.name.indexOf('.pdf') == -1) {
                        jBox.alert("只能上传PDF格式的文件", "消息");
                        isEmpty = false;
                        return false;
                    }
                    var guid2 = guid();
                    ob['xycns'] = guid2;
                    formData.append(guid2, d7)
                }
            }
        });
        ob['seqId'] = $('#seqId').val();
        var aaa = JSON.stringify(ob);
        formData.append(j, aaa)
    }

    if (!isEmpty) {
        return;
    }
    jBox.tip("loading...", 'loading');
    $.ajax({
        url: $('#ctx').val() + '/xinTouChan/insertXin',
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


function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function areaChose(v) {
    var that = $(v);
    // 正常打开
    top.$.jBox.open("iframe:/admin/tag/treeselect?url=" + encodeURIComponent("/dljyzx/baRegGenerator/areaTreeData") + "&module=&checked=&extId=&isAll=", "选择地区", 300, 420, {
        buttons: {"确定": "ok", "清除": "clear", "关闭": true},
        submit: function (v, h, f) {
            if (v == "ok") {
                var tree = h.find("iframe")[0].contentWindow.tree;//h.find("iframe").contents();
                var ids = [], names = [], nodes = [];
                if ("" == "true") {
                    nodes = tree.getCheckedNodes(true);
                } else {
                    nodes = tree.getSelectedNodes();
                }
                for (var i = 0; i < nodes.length; i++) {//
                    ids.push(nodes[i].id);
                    names.push(nodes[i].name);//
                    break; // 如果为非复选框选择，则返回第一个选择
                }
                that.prev().val(ids.join(",").replace(/u_/ig, ""));
                that.val(names.join(","));
                that.attr('title', names.join(","));
            }//
            else if (v == "clear") {
                that.prev().val("");
                that.val("");
            }//
            // if (typeof geogrregionIdTreeselectCallBack == 'function') {
            //     geogrregionIdTreeselectCallBack(v, h, f);
            // }
        },
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        }
    });
}


















