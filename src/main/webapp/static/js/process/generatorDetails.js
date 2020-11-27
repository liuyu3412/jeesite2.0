!function () {
    var generatorDetails = function () {
        this._create();
    }
    $.extend(generatorDetails.prototype, {
        _create: function () {
            this._initMessag();
            this._bindEvent();
        },
        /**
         * 初始化市场成员详细信息
         * @private
         */
        _initMessag: function () {
            var flagType=$('input[name=flagType]').val();
            $.post(top.ctx + "/dljyzx/baRegGenerator/getSingle", {businessid: $('input[name=businessId]').val()}, function (data) {
                if (data) {
                    var entity = data.entity;
                    var generatortype = entity.generatortype;
                    var baGenerator=data.baGenerator;
                    switch (generatortype) {
                        //火电
                        case 0:
                            $('.fireTable').show();
                            break;
                        //水电
                        case 1:
                            $('.waterTable').show();
                            break;
                        //太阳能
                        case 2:
                            $('.sunTable').show();
                            break;
                        //风能
                        case 3:
                            $('.windTable').show();
                            break;
                        //核电
                        case 4:
                            $('.nuclearTable').show();
                            break;
                    }


                    for (var key in entity) {
                        // 如果这个span有remark值，则代表这是个下拉框，通过initData去初始化这个值
                        var remark = $('span[name=' + key + ']').attr('remark');
                        var baGeneratorValue=baGenerator[key];
                        if(baGeneratorValue==0){
                            baGeneratorValue=baGeneratorValue.toString();
                        }
                        if (!baGeneratorValue|| entity[key] != baGenerator[key]) {
                            if(key=='generatortypesubName'){
                                if(!baGenerator.generatortypesub || entity.generatortypesub != baGenerator.generatortypesub){
                                    $('span[name=' + key + ']').css("color", "red");
                                }
                            }else if(key=='generatortypeName'){
                                if(!baGenerator.generatortype || entity.generatortype != baGenerator.generatortype){
                                    $('span[name=' + key + ']').css("color", "red");
                                }
                            }else if(key=='generatortypethirdName'){
                                if(!baGenerator.generatortypethird || entity.generatortypethird != baGenerator.generatortypethird){
                                    $('span[name=' + key + ']').css("color", "red");
                                }
                            }else if(key=='gateName'){
                                if(!baGenerator.gateid || entity.gateid != baGenerator.gateid){
                                    $('span[name=' + key + ']').css("color", "red");
                                }
                            }else if(key=='dcjzName'){
                                if(!baGenerator.dcjz || entity.dcjz != baGenerator.dcjz){
                                    $('span[name=' + key + ']').css("color", "red");
                                }
                            }else{
                                $('span[name=' + key + ']').css("color", "red");
                            }

                        }

                        if(remark){
                            $('span[name=' + key + ']').attr('selectValue' , entity[key]);
                        }else{
                            $('span[name=' + key + ']').text(entity[key]);
                        }

                    }

                    // 初始化下拉框的值
                    initData();


                    var fileInfoList = data.fileInfoList;//附件列表
                    if (fileInfoList && fileInfoList.length > 0) {
                        var html = '';
                        $.each(fileInfoList, function (i, o) {
                            html += '<tr>' +
                                     '<td>'+o.affixname+'</td>' +
                                     '<td>'+((o.name)?o.name:'')+'</td>' +
                                     '<td>'+o.uploadtime+'</td>' +
                                    '</tr>'
                        });
                        $('.affixTable').append(html);
                    }else{
                        var html = '<tr><td colspan="3">暂无数据</td></tr>';
                        $('.affixTable').append(html);
                    }


                }

            })
        },
        /**
         * 绑定事件
         * @private
         */

        _bindEvent: function () {
            var scope = this;

        },
    })

    $(function () {
        new generatorDetails();
    });

    function initData(){
        $("span").each(function () {
            var span = $(this);
            var remark = span.attr("remark");
            var selectValue = span.attr("selectValue");
            if(remark){
                $.ajax({
                    url: top.ctx + "/dljyzx/baRegGenerator/getComboBoxData",
                    type: "get",
                    dataType: "json",
                    data: 'type=' + remark,
                    success: function (data) {
                        if (data) {
                            for(var i = 0;i<data.length; i++){
                                if(selectValue == data[i].value){
                                    span.text(data[i].text);
                                }
                            }
                        }
                    }
                });
            }
        });
    }
}()