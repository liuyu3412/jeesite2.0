!function () {
    var processDetails = function () {
        this._create();
    }
    $.extend(processDetails.prototype, {
        _create: function () {
            this._initMessag();
            this._bindEvent();
        },
        /**
         * 初始化市场成员详细信息
         * @private
         */
        _initMessag: function () {
            $.post(parent.ctx + "/dljyzx/basicInfo/powerPlantsInfo/queryList", {businessId: $('input[name="businessId"]').val()}, function (data) {
                if (!$.isEmptyObject(data)) {
                    var powerPlantsInfo = data.powerPlantsInfo//基本信息
                    var marketBean = data.marketBean;//企业信息正式表数据
                    var regMarketBean = data.regMarketBean;//企业信息临时表数据

                    if (powerPlantsInfo) {
                        var regMarkType=data.regMarketBean.participanttype;//企业类型
                        if(regMarkType!='2'){
                            $('.stockInfoTable').prev().remove();
                            $('.stockInfoTable').remove();
                            $('.isGenerate').remove();
                            $('.isElectricity').show();
                        }else{
                            $('.isElectricity').remove();
                            $('.isGenerate').show();

                        }
                        for (var key in powerPlantsInfo) {
                            if (key == 'gdj') {
                                $('span[name=' + key + ']').text(data.gdjName);
                            } else if (key == 'companyType') {
                                var companyType = '';
                                if (powerPlantsInfo[key] == '1') {
                                    companyType = '公用';
                                } else if (powerPlantsInfo[key] == '2') {
                                    companyType = '自备';
                                }
                                $('span[name=' + key + ']').text(companyType);
                            } else if (key == 'state') {
                                var state = '';
                                if (powerPlantsInfo[key] == '1') {
                                    state = '入市准备';
                                } else if (powerPlantsInfo[key] == '3') {
                                    state = '入市';
                                } else if (powerPlantsInfo[key] == '4') {
                                    state = '退市';
                                }
                                $('span[name=' + key + ']').text(state);
                            } else if (key == 'rating') {
                                var rating = '';
                                if (powerPlantsInfo[key] == '1') {
                                    rating = '省公司购(售)电';
                                } else if (powerPlantsInfo[key] == '2') {
                                    rating = '地市公司购(售)电';
                                } else if (powerPlantsInfo[key] == '3') {
                                    rating = '县公司购(售)电';
                                } else if (powerPlantsInfo[key] == '4') {
                                    rating = '总部购(售)电';
                                } else if (powerPlantsInfo[key] == '5') {
                                    rating = '分部购(售)电';
                                }
                                $('span[name=' + key + ']').text(rating);
                            } else if (key == 'dfdc') {
                                var dfdc = '';
                                if (powerPlantsInfo[key] == '0') {
                                    dfdc = '否';
                                } else if (powerPlantsInfo[key] == '1') {
                                    dfdc = '是';
                                }
                                $('span[name=' + key + ']').text(dfdc);
                            } else {
                                $('span[name=' + key + ']').text(powerPlantsInfo[key]);
                            }
                        }
                        var uVoltageLevel=regMarketBean.uVoltageLevel;
                        if(uVoltageLevel){
                            var uVoltageLevelName= dictionary.getDictionaryChild(100,uVoltageLevel);
                            $('#uVoltageLevel').text(uVoltageLevelName);
                        }
                        //合同
                        $('#uContractVolume').text(regMarketBean.uContractVolume);
                        for (var key in regMarketBean) {
                            if (!marketBean[key]||regMarketBean[key] != marketBean[key]) {
                                $('#'+key).css("color","red");
                            }
                        }
                    }
                    //地区名称
                    if (data.area) {
                        $('#geogrregionid').text(data.area.geogrregionname);
                    }
                } else {
                    top.jBox.info("暂无数据");
                }

            });

            //初始化联系人
            $('.contactDetailsInfo').find('tbody').empty();
            $.post(top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/queryRelationList", function (data) {
                var contactHtml = '';
                $.each(data, function (i, o) {
                    contactHtml += '<tr>' +
                        '<td>' + ((o.linkman) ? o.linkman : '') + '</td>' +//姓名
                        '<td>' + ((o.position) ? o.position : '') + '</td>' +//职务
                        '<td>' + ((o.telephone) ? o.telephone : '') + '</td>' +//手机号
                        '<td>' + ((o.faxphone) ? o.faxphone : '') + '</td>' +//传真号
                        '<td>' + ((o.email) ? o.email : '') + '</td>' +
                        '</tr>'
                })
                $('table.contactDetailsInfo').find('tbody').append(contactHtml);

            })
            //初始化股权信息
            $.post(top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/queryPartgrouprelation", function (data) {
                var stockHtml = '';
                var list = data.list;
                $.each(list, function (i, o) {
                    if (o.gengroupid) {
                        stockHtml += '<tr>' +
                            '<td style="display: none;"><input name ="gengroupid" value="' + ((o.gengroupid) ? o.gengroupid : '') + '"></td>' +
                            '<td>' + ((o.genGroupName) ? o.genGroupName : '') + '</td>' +
                            '<td>' + ((o.sharepercent) ? o.sharepercent : '') + '</td>' +
                            '</tr>'
                    }
                })
                $('.stockInfoTable').find('tbody').append(stockHtml);
            });

            //初始化附件
            $.ajax({
                url : top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/queryAffix",
                type : "post",
                async : false,
                success : function(data) {
                    if (data) {
                        var fileHtml = '';
                        $.each(data, function (i, o) {
                            fileHtml += '<tr>' +
                                '<td>' + ((o.affixname) ? o.affixname : '') + '</td>' +
                                '<td>' + ((o.affixtype) ? o.afffixTypeName : '') + '</td>' +
                                '<td>' + ((o.uploadtime) ? o.uploadtime : '') + '</td>' +
                                // '<td><a class="link isDown" isDown="'+o.guid+'" >下载</a></td>' +
                                '</tr>'
                        })
                        $('table.powerPlantsInfoTable').find('tbody').append(fileHtml);

                        // $('.powerPlantsInfoTable').find('.isDown').each(function (i,o) {
                        //     $(o).on('click',function () {
                        //         var guid=$(this).attr('isDown');
                        //     })
                        // })
                    }
                }
            });
        },
        /**
         * 绑定事件
         * @private
         */
        _bindEvent: function () {
            var scope = this;
            //点击机组信息
            $('a[data-action="view"]').on('click', function () {
                parent.jBox('html:' + $('#edit-panel').html() + '', {
                    title: "机组信息",
                    width: 900,
                    height: 700,
                });
            });
            //点击提交
            $('#btnSubmit').on('click', function () {
                var activityInstId = $('input[name=activityInstId]').val();//流程实例id
                var businessid = $('input[name=businessid]').val();//业务ID
                var level1 = $('input[name=level1]').val();
                var level2 = $('input[name=level2]').val();
                var level3 = $('input[name=level3]').val();
                var textarea = $('.istextarea').val();//审批意见
                //判断是否选中审批结论
                var returnVal = scope._checkListEditor('check');
                //未选择审批结论
                if (!returnVal) {
                    top.jBox.info('请选择审批结论!')
                    return
                    //同意
                } else if (returnVal == '1') {
                    var ctxUrl = top.ctx;
                    var treeUrl = '/dljyzx/baWaitdo/getRoot';
                    $.ajax({
                        url: ctxUrl + '/dljyzx/bacommonflowinfo/next',
                        type: "post",
                        async: false,
                        dataType: "json",
                        data: {
                            activityInstId: activityInstId
                        },
                        success: function (data) {
                            if (data.msg == 'successful') {
                                top.$.jBox.open("iframe:" + ctxUrl + "/tag/treeProcess?url=" + encodeURIComponent(treeUrl)
                                    + "&flowNodeInstId=" + activityInstId +
                                    "&level1=" + level1 + "&level2=" + level2 + "&level3=" + level3 + "", "选择人员", 300, 420, {
                                    buttons: {"确定": "ok", "关闭": true},
                                    submit: function (v, h, f) {
                                        if (v == "ok") {
                                            var tree = h.find("iframe")[0].contentWindow.tree;
                                            var ids = [], names = [], nodes = [];
                                            nodes = tree.getSelectedNodes();
                                            for (var i = 0; i < nodes.length; i++) {
                                                if (nodes[i].isParent) {
                                                    continue; // 如果为复选框选择，则过滤掉父节点
                                                }
                                                if (nodes[i].level == 0) {
                                                    top.$.jBox.info("不能选择根节点（" + nodes[i].name + "）请重新选择。");
                                                    return false;
                                                }
                                                if (nodes[i].isParent) {
                                                    top.$.jBox.info("不能选择父节点（" + nodes[i].name + "）请重新选择。");
                                                    return false;
                                                }
                                                if (nodes[i].module == "") {
                                                    top.$.jBox.info("不能选择公共模型（" + nodes[i].name + "）请重新选择。");
                                                    return false;
                                                }
                                                ids.push(nodes[i].id);
                                                names.push(nodes[i].name);
                                                break;
                                            }
                                            scope._flowProcess(ids, returnVal, 1);
                                        }
                                        else if (v == "clear") {

                                        }
                                    },
                                    loaded: function (h) {
                                        $(".jbox-content", top.document).css("overflow-y", "hidden");
                                    }
                                });

                            }
                        },
                        error: function () {
                        }
                    });
                    //不同意
                } else if (returnVal == '2') {
                    var activityInstId = $('input[name=activityInstId]').val()//流程实例Id
                    scope._forward(activityInstId);
                }
            })
            $('a[data-action="TabPage1"]').on('click', function () {
                $('#TabPage1').show();
                $('#TabPage2').hide();
            })
            $('a[data-action="TabPage2"]').on('click', function () {
                $('#TabPage2').show();
                $('#TabPage1').hide();
            })
        },
    })

    $(function () {
        new processDetails();
    })
}()