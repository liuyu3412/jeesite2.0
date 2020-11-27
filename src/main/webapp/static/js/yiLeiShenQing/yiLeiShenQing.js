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

function commitBind(sname, sid, isbind) {
    if (isbind == "true") {
        if ($('#msg').val().length>0){
            jBox.tip($('#msg').val(), "messager");
        }else {
            jBox.tip("您有在途业务请勿重新申请", "messager");
        }
        return;
    }

    var url = $('#ctx').val() + "/yiLeiShenQing/addYiView?" + "sid=" + sid;
    //全局弹出
    top.$.jBox("iframe:" + url, {
        title: sname,
        top: 5,
        width: 1250,
        height: 660,
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
var Power = 0;
var consNOnum = 0;


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
        "</select></td></tr>" ;
      /*  "<td style='width: 120px'><select  style=\"width: 120px; height: 34px;text-align: center\">" +
        "<option value=''>请选择</option>" +
        "<option value='1'>一类</option>" +
        "<option value='2'>二类</option>" +
        "</select></td>" +
        "<td style='width: 120px'><select  style=\"width: 120px; height: 34px;text-align: center\">" +
        "<option value=''>请选择</option>" +
        "<option value='1'>一类</option>" +
        "<option value='2'>二类</option>" +
        "</select></td></tr>";*/
    $("#t1").append(tr);
}


function removeLine() {
    var trs = $('#t1 tbody').children()
    if (trs.length > 3) {
        trs.last().remove();
        lineNum = lineNum - 1;
    }
}

function dateGet() {
    var uploadFiles=[];
    var powerId=[];
    var formData = new FormData();
    var isEmpty = true;
    var flag=0;

    // for (var k=0;k <consNOnum && isEmpty;k++){
    //     var jsonStr = '{}';
    //     var ob = JSON.parse(jsonStr);
    //     $('#confirm').find('td').each(function (i) {
    //         if (i % 3 == 1) {
    //             var d3 = $(this).children().eq(0).val();
    //             var reg = /^\d{10}$/; //正规表达式对象
    //             if(reg.test(d3)){
    //                 if (d3) {
    //                     ob['userNumber'] = d3
    //                 } else {
    //                     jBox.alert('用电户号不许为空');
    //                     isEmpty = false;
    //                     return false;
    //                 }
    //             }else {
    //                 jBox.alert('用电户号输入有误，户号由10数字组成');
    //                 isEmpty = false;
    //                 return false;
    //             }
    //         }if (i % 3 == 2) {
    //             var d1 = $(this).text();
    //             console.log($(this).text());
    //             /*if (d1) {
    //                 ob['areaCounty'] = d1;
    //             } else {
    //                 jBox.alert('请选择地理区域');
    //                 isEmpty = false;
    //                 return false;
    //             }*/
    //         }
    //
    //     });
    // }

    // for (var j = 0; j < lineNum && isEmpty; j++) {
    //     var jsonStr = '{}';
    //     var ob = JSON.parse(jsonStr);
    //
    //     $('#t1').find('td').each(function (i) {
    //         if (i / 5 >= j && i / 5 < j + 1) {
    //             if (i % 5 == 1) {
    //                 var d1 = $(this).children().eq(0).val();
    //                 if (d1) {
    //                     ob['areaCounty'] = d1;
    //                 } else {
    //                     jBox.alert('请选择地理区域');
    //                     isEmpty = false;
    //                     return false;
    //                 }
    //             }
    //             if (i % 5 == 2) {
    //                 var d2 = $(this).children().eq(0).val();
    //                 if (d2) {
    //                     ob['participantName'] = d2
    //                 } else {
    //                     jBox.alert('企业名称不许为空');
    //                     isEmpty = false;
    //                     return false;
    //                 }
    //             }
    //             if (i % 5 == 3) {
    //                 var d3 = $(this).children().eq(0).val();
    //                 var reg = /^\d{10}$/; //正规表达式对象
    //                 if(reg.test(d3)){
    //                     if (d3) {
    //                         ob['userNumber'] = d3
    //                     } else {
    //                         jBox.alert('用电户号不许为空');
    //                         isEmpty = false;
    //                         return false;
    //                     }
    //                 }else {
    //                     jBox.alert('用电户号输入有误，户号由10数字组成');
    //                     isEmpty = false;
    //                     return false;
    //                 }
    //             }
    //             if (i % 5 == 4) {
    //                 var d4 = $(this).children().eq(0).val();
    //                 if (d4) {
    //                     ob['voltageLevel'] = d4
    //                 } else {
    //                     jBox.alert('请选择用电电压等级');
    //                     isEmpty = false;
    //                     return false;
    //                 }
    //             }
    //            /* if (i % 7 == 5) {
    //                 var d5 = $(this).children().eq(0).val();
    //                 if (d5) {
    //                     ob['trType2018'] = d5
    //                 } else {
    //                     jBox.alert('所有单元格不许为空');
    //                     isEmpty = false;
    //                     return false;
    //                 }
    //             }*/
    //           /*  if (i % 7 == 6) {
    //                 var d6 = $(this).children().eq(0).val();
    //                 if (d6) {
    //                     ob['trType2019'] = d6
    //                 } else {
    //                     jBox.alert('所有单元格不许为空');
    //                     isEmpty = false;
    //                     return false;
    //                 }
    //             }*/
    //             // if (i % 8 == 7) {
    //             //     var d7 = $(this).children().eq(0)[0].files[0];
    //             //     if (!d7) {
    //             //         jBox.alert('所有单元格不许为空');
    //             //         isEmpty = false;
    //             //         return false;
    //             //     }
    //             //     if (d7.name.indexOf('.pdf') == -1) {
    //             //         jBox.alert("只能上传PDF格式的文件", "消息");
    //             //         isEmpty = false;
    //             //         return false;
    //             //     }
    //             //     var guid2 = guid();
    //             //     ob['xycns'] = guid2;
    //             //     formData.append(guid2, d7)
    //             // }
    //         }
    //     });
    //     ob['seqId'] = $('#seqId').val();
    //     var aaa = JSON.stringify(ob);
    //     formData.append(j, aaa)
    //     flag++;
    // }

    var ylsqb = $('#ylsqb')[0].files[0];
    if (!ylsqb) {
        jBox.alert('请上传一类用户申请表');
        isEmpty = false;
        return false;
    }
    if(ylsqb.size>(10*1024*1024)){
        top.$.jBox.alert("请上传小于10M的文件", "提示消息");
        isEmpty = false;
        return false;
    }
    if (ylsqb.name.indexOf('.pdf') == -1) {
        jBox.alert("只能上传PDF格式的文件", "消息");
        isEmpty = false;
        return false;
    }
    formData.append("ylsqb", ylsqb)
    formData.append("seqId", $('#seqId').val())

    var jsonStr = '{}';
    var ob = JSON.parse(jsonStr);
    $('#confirm').find('tr').each(function (i) {
        if (i > 2) {
            var d3 = $(this).find('td:eq(1)').find('input').val();
            var reg = /^\d{10}$/; //正规表达式对象
            if (d3){
                if(reg.test(d3)){
                    // ob['userNumber'] = d3;
                    var status=$(this).find('td:eq(2)').text().trim();
                    if("申请删除"==status){
                        d3+="-"+"删除";
                        formData.append("userNumber", d3);
                    }
                    if("申请新增"==status){
                        d3+="-"+"新增";
                        formData.append("userNumber", d3);
                    }
                }else {
                    jBox.alert('用电户号输入有误，户号由10数字组成');
                    isEmpty = false;
                    return false;
                }
            } else {
                jBox.alert('用电户号不许为空');
                isEmpty = false;
                return false;
            }
        }
    })

    var powerids=[];
    $('#t3').find('tr').each(function (i) {
        if (i > 2) {
            var Powerid= $(this).find('td:eq(1)').find('input').val();
            if (Powerid){
                formData.append("powerid", Powerid);
                powerids.push(Powerid);
            } else {
                jBox.alert('意向电厂不许为空');
                isEmpty = false;
                return false;
            }
            var d7 = $(this).find('td:eq(2)').find('input')[0].files[0];
            if (d7!= undefined) {
                if (d7.name.indexOf('.pdf') == -1) {
                    jBox.alert("只能上传PDF格式的文件", "消息");
                    isEmpty = false;
                    return false;
                }
                if (d7.size > (10 * 1024 * 1024)) {
                    top.$.jBox.alert("请上传小于10M的文件", "提示消息");
                    isEmpty = false;
                    return false;
                }
                formData.append("file"+i, d7);
            }

        }
    })
    if(powerids.length==0){
        jBox.alert('至少填报一个意向电厂');
        return;
    }

    // for (var j = 0; j < Power && isEmpty; j++) {
    //     $('#t3').find('td').each(function (i) {
    //         if (i / 3 >= j && i / 3 < j + 1) {
    //             if (i % 3 == 1) {
    //                 var Powerid= $(this).children().eq(0).val();
    //                 formData.append("powerid", Powerid);
    //             }
    //             if (i % 3 == 2) {
    //                 var d7 = $(this).children().eq(0)[0].files[0];
    //                 if (d7!= undefined) {
    //                     if (d7.name.indexOf('.pdf') == -1) {
    //                         jBox.alert("只能上传PDF格式的文件", "消息");
    //                         isEmpty = false;
    //                         return false;
    //                     }
    //                     if(d7.size>(10*1024*1024)){
    //                         top.$.jBox.alert("请上传小于10M的文件", "提示消息");
    //                         isEmpty = false;
    //                         return false;
    //                     }
    //                     var file =$(this).children().eq(0)[0].files[0];
    //                     formData.append("file", file);
    //                 }
    //             }
    //         }
    //     });
    // }

    if (!isEmpty) {
        return;
    }

    jBox.tip("loading...", 'loading');
    $("#dataSubmit").attr({"disabled":"disabled"});
    $.ajax({
        url: $('#ctx').val() + '/yiLeiShenQing/insertYi',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            localStorage.setItem("data", data)
            window.parent.window.jBox.close();
        }
    });
    // }else {
    //     jBox.alert('至少提交一条户号申请');
    //     isEmpty = false;
    //     return false;
    // }
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


function removePower() {
    var trs = $('#t3 tbody').children()
    if (trs.length > 3) {
        trs.last().remove();
        Power = Power - 1;
    }
}


function addConsno() {
    var consNOCount = $("#confirm").find('tr').length-2;
    var tr = "<tr><td>" + consNOCount +
        "<td><input class='input-small' style=\"width: 200px; height: 34px;text-align: center\"/></td>" +
        "<td>申请新增</td>" +
        "<td><input data-action='sub' class='btn btn-primary' type='button' onclick='removeConsNO(this)' value='删除'></tr>";
    $("#confirm").find('tbody:eq(1)').append(tr);
}
function removeConsNO(obj) {
    top.$.jBox.confirm('是否确定', '提示', function (v, h, f) {
        if (v === 'ok') {
            var status = $(obj).parent().parent().find('td:eq(2)').text().trim();
            if ("申请新增" == status) {
                $(obj).parent().parent().remove();
                //修改序号
                var xuhao=1;
                $('#confirm').find('tbody:eq(1)').find('tr').each(function (i) {
                    $(this).find('td:eq(0)').html(xuhao);
                    xuhao++;
                })
            } else if ("原有" == status) {
                $(obj).parent().parent().find('td:eq(2)').html("申请删除");
                $(obj).val("撤销");
            } else {
                $(obj).parent().parent().find('td:eq(2)').html("原有");
                $(obj).val("删除");
            }
        }
    });
}
//
// $("#consNo").on('click', '.btnDelete', function () {
//     var delcons=$(this).closest('tr').children().eq(0).text()
//     consNOnum = consNOnum + 1;
//     var tr = "<tr><td>" + consNOnum +
//         "<td><input class='input-small' value='"+delcons+"' disabled style=\"width: 200px; height: 34px;text-align: center\"/></td>" +
//         "<td>删除</td> </tr>" ;
//     $("#confirm").append(tr);
//     $(this).closest('tr').remove();
// });