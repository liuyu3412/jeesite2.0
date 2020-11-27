var closeDate;
!function () {
    var directTradeDeclare = function () {
        this._create();
    };

    $.extend(directTradeDeclare.prototype, {
        _create: function () {
            var checkCode=$('input[name=checkCode]').val();
            this.checkCode=checkCode;
            this._checkUser();
            this._init();
            this._initConName();
            // this._initCloseDate();
            this._initTalbe();
            this._bindEvents();
        },
        /**
         * 获取截止日期
         */
        _initCloseDate: function () {
            $.ajax({
                url: top.ctx + '/dljyzx/myPlan/directTradeDeclare/getCloseDate',
                type: "post",
                dataType: "json",
                async: false,
                data: "",
                success: function (data) {
                    if (data) {
                        closeDate = data;
                        $('#closeDate').html('提示：请在' + data + '号之前完成确认，过期关闭');
                    }
                },
                error: function (event, request, settings) {
                    top.$.messager.alert('消息', '获取截止日期失败!');
                }
            });
        },
        /**
         * 判断用户类型
         * 1 电厂
         * 2 电力
         * @private
         */
        _checkUser: function () {
            var date = new Date();
            // $('input[name="planMonth"]').val(date.toISOString().substr(0, 7))
            var scope = this;
            $.ajax({
                url: "queryRole",
                type: "post",
                async: false,
                dataType: "json",
                success: function (data) {

                    if (data == 1) {
                        scope._buttonState(data)
                        //电厂
                        scope.role = 1;
                        $('.roleType').html('电力用户');
//	 	 		  		_elePowUserDataGrid();
                    } else if (data == 2) {
                        //电力用户
                        scope._buttonState(data)
                        scope.role = 2;
                        $('.roleType').text('电厂名称');
//	 	 		  		_genStaDataGrid();
                    }
                }

            });
        },
        _buttonState: function (role) {
            if (role == 1) {//1是电厂，2是电力用户
                $("input[data-action=agree]").parent().css("display", "none");//同意按钮
                $("input[data-action=disagree]").parent().css("display", "none");//不同意按钮
                $("input[data-action=revocation]").parent().css("display", "none");//用户撤销按钮
            } else if (role == 2) {
                $("input[data-action=call]").parent().css("display", "none");//上报按钮
//                $("input[data-action=down]").parent().css("display", "none");//抽取合同按钮
                $("input[data-action=edit]").parent().css("display", "none");//修改按钮

                $("input[data-action=agreeRevocation]").parent().css("display", "none");//电厂同意按钮
                $("input[data-action=disagreeRevocation]").parent().css("display", "none");//电厂不同意按钮
            }
        },
        /**
         * 初始化页面数据
         */
        _init: function () {
            var scope = this;
            //初适化合同序列
            $.post("conSeq", {planDate: $('input[name="planMonth"]').val(), role: scope.role}, function (data) {
                if (data) {
                    var sequenNameHtml = '<option value="" selected="selected">请选择</option>';
                    $.each(data, function (i, o) {
                        sequenNameHtml += '<option value="' + o.sequenceid + '">' + o.sequencename + '</option>'
                    })
                    $('#sequenName').append(sequenNameHtml);
                }
            });


        },
        /**
         * 初始化合同名称
         * @private
         */
        _initConName: function () {
            var scope = this;
            $.post("conName", {
                planDate: $('input[name="planMonth"]').val(),
                role: scope.role
            }, function (data) {
                if (data) {
                    var conNameHtml = '<option value="" selected="selected">请选择</option>';
                    $.each(data, function (i, o) {
                        conNameHtml += '<option value="' + o.contractId + '">' + o.contractName + '</option>'
                    })
                    $('#conName').append(conNameHtml);
                }
            })
        },
        /**
         * 初始化表格
         * @private
         */
        _initTalbe: function () {
            $('.pagination').empty();
            $('table.parentTable').find('tbody').empty();
            $('table.childTable').find('tbody').empty();
            var scope = this;
            var planMonth = $('input[name=planMonth]').val();//月度
            var sequenName = $('#sequenName').val();//合同序列
            var contractId = $('#conName').val();//合同id
            var json = {
                planMonth: planMonth,
                sequenName: sequenName,
                contractId: contractId,
                pageNo: $('#pageNo').val(),
                pageSize: $('#pageSize').val(),
                role: scope.role
            };
            $.post("findPageList", json, function (data) {
                if (data.page) {
                    var pageList=data.page.list;
                    var countList=data.countList;
                    if (pageList&&pageList.length > 0) {
                        var parentHtml = '<tr>' +
                            '<td><input class="countCheck" type="checkbox"/></td>' +
                            '<td></td>' +
                            '</tr>';
                        var childHtml = '';
                        //统计的list
                        if(countList){
                            var countHtml='<tr>' +
                                '<td></td>'+
                                '<td>合计</td>'
                            $.each(countList,function(i,o){
                                countHtml+='<td>'+o+'</td>'
                            });
                            countHtml+='</tr>'
                            childHtml+=countHtml;
                        }

                        var checkFlag = $(".parentClass").is(":checked");
                        $.each(pageList, function (i, o) {
                            var status = '';
                            var color = '';
                            if (scope.role == 1) {
                                switch (o.status) {
                                    case 0:
                                        status = '未上报';
                                        color = 'null'
                                        break;
                                    case 1:
                                        status = '电厂已上报';
                                        color = 'yellow'
                                        break;
                                    case 2:
                                        status = '用户已上报';
                                        break;
                                    case 3:
                                        status = '对方已同意';
                                        color = 'rgba(0, 128, 0, 0.55)';
                                        break;
                                    case 4:
                                        status = '对方不同意';
                                        color = 'red';
                                        break;
                                    case 5:
                                        status = '交易中心已审批';
                                        color = 'null'
                                        break;
                                    case 6:
                                        status = '用户已撤销';
                                        color = 'yellow'
                                        break;
                                    case 7:
                                        status = '电厂不同意';
                                        color = 'red'
                                        break;

                                }
                            } else {
                                switch (o.status) {
                                    case 0:
                                        status = '未上报';
                                        color = 'null'
                                        break;
                                    case 1:
                                        status = '电厂已上报';
                                        color = 'yellow'
                                        break;
                                    case 2:
                                        status = '用户已上报';
                                        break;
                                    case 3:
                                        status = '用户已同意';
                                        color = 'rgba(0, 128, 0, 0.55)';
                                        break;
                                    case 4:
                                        status = '用户不同意';
                                        color = 'red';
                                        break;
                                    case 5:
                                        status = '交易中心已审批';
                                        color = 'null'
                                        break;
                                    case 6:
                                        status = '用户已撤销';
                                        color = 'yellow'
                                        break;
                                    case 7:
                                        status = '电厂不同意';
                                        color = 'red'
                                        break;

                                }
                            }
                            var contractName = o.contractName;
                            if (contractName.length > 30) {
                                contractName = contractName.substr(0, 30) + "...";
                            }
                            var checkHtml = 'checked="checked"';
                            parentHtml += '<tr>'
                                + '<td ><input isVal="' + o.id + '" type="checkbox" ' + ((checkFlag) ? checkHtml : "" ) + '" /><input name="isStatus" type="hidden" value="' + o.status + '"/><input type="hidden" value="'+o.sign+'" name="sign"/></td>'
                                + '<td class="link" style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden" name="contitle" title="' + o.contractName + '" >' + contractName + '</td>' //合同名称
                            childHtml += '<tr>' +
                                '<td  style="width: 100px!important;background-color: ' + color + '"><div style="overflow:hidden;width: 100px">' + status + '</div></td>';//合同状态
                            if (scope.role == 2) {
                                childHtml += '<td style="background-color: ' + color + '"><div style="width: 150px" >' + o.sellerName + '</div></td>';//role = 2
                            } else if (scope.role == 1) {
                                childHtml += '<td style="background-color: ' + color + '"><div style="width: 300px" >' + o.purchaserName + '</div></td>';//role = 1
                            }

                            var engSpRest = 0//统计当月审批的总和
                                , engSum = o.netEngSum;
                            for (var i = 1; i <= 12; i++) {
                                var key = 'netEngPlanM' + i
                                var value = 0;
                                if (o[key]) {
                                    value = o[key];
                                }
                                engSpRest += value;
                            }
                            childHtml += '<td style="background-color: ' + color + '">' + o.netEngSum + '</td>' + // 合同总量
                                '<td style="background-color: ' + color + '">' + ((o.netEngPlanM1) ? o.netEngPlanM1 : '') + '</td>' + // 1月
                                '<td style="background-color: ' + color + '">' + ((o.netEngPlanM2) ? o.netEngPlanM2 : '') + '</td>' + // 2月
                                '<td style="background-color: ' + color + '">' + ((o.netEngPlanM3) ? o.netEngPlanM3 : '') + '</td>' + // 3月
                                '<td style="background-color: ' + color + '">' + ((o.netEngPlanM4) ? o.netEngPlanM4 : '') + '</td>' + // 4月
                                '<td style="background-color: ' + color + '">' + ((o.netEngPlanM5) ? o.netEngPlanM5 : '') + '</td>' + // 5月
                                '<td style="background-color: ' + color + '">' + ((o.netEngPlanM6) ? o.netEngPlanM6 : '') + '</td>' + // 6月
                                '<td style="background-color: ' + color + '">' + ((o.netEngPlanM7) ? o.netEngPlanM7 : '') + '</td>' + // 7月
                                '<td style="background-color: ' + color + '">' + ((o.netEngPlanM8) ? o.netEngPlanM8 : '') + '</td>' + // 8月
                                '<td style="background-color: ' + color + '">' + ((o.netEngPlanM9) ? o.netEngPlanM9 : '') + '</td>' + // 9月
                                '<td style="background-color: ' + color + '">' + ((o.netEngPlanM10) ? o.netEngPlanM10 : '') + '</td>' + // 10月
                                '<td style="background-color: ' + color + '">' + ((o.netEngPlanM11) ? o.netEngPlanM11 : '') + '</td>' + // 11月
                                '<td style="background-color: ' + color + '">' + ((o.netEngPlanM12) ? o.netEngPlanM12 : '') + '</td>' + // 12月
                                '<td>' + (engSum - engSpRest).toFixed(4) + '</td>' + // 申报后尾差
                                '</tr>';
                        });


                        $('table.parentTable').find('tbody').append(parentHtml);

                        $('table.childTable').find('tbody').append(childHtml)
                        $('.pagination').append(data.page.html);
                        $('.pagination').find('a').each(function (i, o) {
                            var inputNum=$(this).find('input').length;
                            if(inputNum==2){
                                $('#xx').unbind();
                            }else{
                                $(o).unbind().on('click',function(){

                                    var pageNo = $(o).text();
                                    var pageSize=$('#xx').val();
                                    if (pageNo == '下一页 »') {
                                        var pageNo = parseInt($('.pagination').find('.active').find('a').text()) + 1;

                                        scope._toPage(pageNo, pageSize);
                                    } else if (pageNo == '« 上一页') {
                                        var pageNo = parseInt($('.pagination').find('.active').find('a').text()) - 1;
                                        scope._toPage(pageNo, pageSize);
                                    }else if(pageNo=='转到'){
                                        var pageNo = parseInt($('.pagination').find('.active').find('a').text());
                                        scope._toPage(pageNo, pageSize);
                                    } else {
                                        scope._toPage(pageNo, pageSize);
                                    }
                                })
                            }
                        })

                        $('.parentTable').find('tbody').find('input[type=checkbox]').each(function (i, o) {
                            var checkBoxId = $(o).attr("isVal");
                            if(checkBoxId){
                                if (scope.checkBoxIds) {
                                    var checkBoxTempIds = scope.checkBoxIds;
                                    if (checkBoxTempIds.indexOf(checkBoxId) >= 0) {
                                        $(o).attr("checked", true);
                                    }
                                }
                                $(o).on('click', function () {
                                    if (!$(this).is(":checked")) {
                                        $('input.parentClass').attr("checked", false);
                                        var checkBoxTempList = scope.checkBoxIds.split(",");
                                        $.each(checkBoxTempList, function (i, o) {
                                            if (checkBoxId == o) {
                                                checkBoxTempList.splice(i,1);
                                            }
                                        });
                                        scope.checkBoxIds = checkBoxTempList;
                                    } else {
                                        if (scope.checkBoxIds) {
                                            scope.checkBoxIds += "," + checkBoxId;
                                        } else {
                                            scope.checkBoxIds = checkBoxId;
                                        }
                                    }
//                                alert(scope.checkBoxIds);
                                });
                            }

                        })

                        $('.parentTable').find('tbody').find('td[name="contitle"]').mouseover(function () {
                            $(this).addClass("textBold");
                        })
                        $('.parentTable').find('tbody').find('td[name="contitle"]').mouseout(function () {
                            $(this).removeClass("textBold");
                        })
                        $('.parentTable').find('tbody').find('td[name="contitle"]').each(function (i, o) {
                            $(o).on('click', function () {
                                var sign=$(this).parent().find('input[name=sign]').val();
                                var idList = [];
                                $(this).parent().find('input[type=checkbox]').each(function (x, y) {
                                    idList.push($(y).attr('isVal'));
                                    idList.push($(y).next().val());
                                });
                                if (idList.length > 0) {
                                    var title = '';
                                    if (scope.role == 2) {
                                        title = '电力用户查看界面';
                                    } else {
                                        title = '电厂申报明细界面';
                                    }
                                    top.jBox("iframe:" + top.ctx + '/dljyzx/myPlan/directTradeDeclare/toDlyhDetail?id=' + idList[0]
                                        + "&planMonth=" + $('input[name="planMonth"]').val() + "&status=" + idList[1] + "&role=" + scope.role+"&sign="+sign,
                                        {
                                            title: title,
                                            width: 900,
                                            height: 600,
                                            buttons: {},
                                            closed: function () {
                                                $('table.parentTable').find('tbody').empty();
                                                $('table.childTable').find('tbody').empty();
                                                scope._initTalbe();
                                            },
                                            loaded: function (h) {
                                                $(".jbox-content", top.document).css("overflow-y", "hidden");
                                            }
                                        }
                                    );
                                }
                            });
                        })

                    } else {
                        top.jBox.alert('暂无记录');
                    }

                } else {
                    top.jBox.alert('暂无记录');
                }

            });

            $.post(top.ctx+"/dljyzx/scSummationTradeJs/queryList",{planMonth: $('input[name=planMonth]').val()},function (data) {
                if(data&&data.transferList){
                    var transferSum=data.transferList[0]//该用户已经转让的电量
                    var appearSum=data.appear.contractsum;//电厂已经上报的电量
                    var planMonth= $('input[name=planMonth]').val();
                    planMonth=planMonth.substr(planMonth.indexOf('-')+1);
                    planMonth=parseInt(planMonth);
                    // //转让的电量大于上报的电量时候
                    // if(transferSum>appearSum){
                    //     $("input[data-action=agree]").hide();
                    // }
                    var str='';
                    if(scope.role==2){
                        if(!appearSum){
                            appearSum=0;
                        }
                        if(transferSum){
                            str='您在'+planMonth+'月的电量转让'+transferSum+'MWh,电厂已经上报了'+appearSum+'MWh';
                            $('.conMessage').html(str);
                        }else{
                            $('.conMessage').empty();
                        }

                    }
                }
            })
        },
        _toPage: function (pageNo, pageSize) {
            var scope = this;
            $("#pageNo").val(pageNo);
            $("#pageSize").val(pageSize);
            scope._initTalbe();
        },
        /**
         * 同意或者不同意
         * isAgree 3 同意
         * isAgree 4 不同意
         * status 当前状态
         *
         */
        _agree: function (status, id, isAgree, mes,reason) {
            var scope = this;
            //未上报的不可以同意
            if (status == 0) {
                jBox.alert('该记录未上报');
                return;
            } else {
                var planMonth= $('input[name="planMonth"]').val();
                planMonth=planMonth.substr(planMonth.indexOf('-')+1);
                planMonth=parseInt(planMonth);
                $.post("updateStatus?checkcode="+scope.checkCode, {id: id.toString(), status: isAgree,planMonth:planMonth,reason:reason}, function (data) {
                    jBox.alert(mes);
                    $('table.parentTable').find('tbody').empty();
                    $('table.childTable').find('tbody').empty();
                    scope._initTalbe();
                })
            }

        },
        /**
         * 绑定事件
         * @private
         */
        _bindEvents: function () {
            var scope = this;
            var checkedFlag = false//判断是否勾选的标识
            var ctxUrl = $("input[name=ctxUrl]").val();
            //点击查询
            $('#searchForm').submit(function () {
                $('table.parentTable').find('tbody').empty();
                $('table.childTable').find('tbody').empty();
                scope._initTalbe();
                return false;
            })
            //点击修改
            $('input[data-action="edit"]').on('click', function () {
                var idList = [];
                $('.parentTable').find('tbody').find('input[type=checkbox]').each(function (i, o) {
                    if ($(o).is(':checked')) {
                        idList.push($(o).attr('isVal'));
                        idList.push($(o).next().val());
                    }
                });
                if (idList.length > 0) {
                    if (idList.length > 2) {
                        top.jBox.alert('只能选择一条记录');
                    } else {
                        top.jBox("iframe:" + '/jeesite/admin/dljyzx/myPlan/directTradeDeclare/toDlyhDetail?id=' + idList[0]
                            + "&planMonth=" + $('input[name="planMonth"]').val() + "&status=" + idList[1],
                            {
                                title: '电厂申报明细界面 ',
                                width: 900,
                                height: 700,
                                buttons: {},
                                closed: function () {
                                    $('table.parentTable').find('tbody').empty();
                                    $('table.childTable').find('tbody').empty();
                                    scope._initTalbe();
                                },
                                loaded: function (h) {
                                    $(".jbox-content", top.document).css("overflow-y", "hidden");
                                }
                            }
                        );
                    }
                } else {
                    top.jBox.alert('请选择一条记录');
                }

            })

            //点击上报
            $('input[data-action="call"]').on('click', function () {
                // var sysdate = new Date();
                // var day = sysdate.getDate();//当前日期
                // if (day > closeDate) {
                //     top.jBox.alert('上报已截止');
                //     return;
                // }
                var idList = [];
                var statList = [];
                $('.parentTable').find('tbody').find('input[type=checkbox]').each(function (i, o) {
                    if ($(o).is(':checked')) {
                        checkedFlag = true;
                        if ($(o).next().val() == 0 || $(o).next().val() == 4) {
                            idList.push($(o).attr('isVal'));//id
                            statList.push($(o).next().val());//状态
                        }
                    }
                });
                if (idList.length > 0) {
                    if (statList.length > 0) {
                        top.jBox.confirm('分月计划是否确认无误？', '', function (v, h, f) {
                            if (v == 'ok') {
                                var stat = 1;
                                var planMonth= $('input[name="planMonth"]').val();
                                planMonth=planMonth.substr(planMonth.indexOf('-')+1);
                                planMonth=parseInt(planMonth);
                                $.post("updateStatus?checkcode="+scope.checkCode, {id: idList.toString(), status: stat,planMonth:planMonth}, function (data) {
                                    top.jBox.alert('上报成功');
                                    $('table.parentTable').find('tbody').empty();
                                    $('table.childTable').find('tbody').empty();
                                    scope._initTalbe();
                                })
                            }
                            return true;
                        });

                    } else {
                        top.jBox.alert('您选择的合同已上报');

                    }
                } else {
                    if (checkedFlag) {
                        top.jBox.alert('您选择的合同已上报');
                    } else {
                        top.jBox.alert('请选择一条记录');
                    }
                }

            })

            //点击导出
            $('input[data-action=down]').on('click', function () {
                if ($('.parentTable').find('tbody').find('tr').length == 0) {
                    top.jBox.alert('暂无记录');
                } else {
                    top.jBox.confirm('是否确认导出？', '', function (v, h, f) {
                        if (v === 'ok') {
                            var url = ctxUrl + "/dljyzx/myPlan/directTradeDeclare/exportExcel"
                            var form = $(".excelForm");   //定义一个form表单
                            form.attr('style', 'display:none');   //在form表单中添加查询参数
                            form.attr('target', '');
                            form.attr('method', 'post');
                            form.attr('action', url);
                            // 创建Input
                            if(form.find('input[name=planMonth]').length>0){
                                form.find('input[name=planMonth]').val($('#searchForm').find('input[name=planMonth]').val());
                            }else{
                                var con_input = $('<input type="text" name="planMonth" />');
                                con_input.attr('value', $('input[name="planMonth"]').val());
                                // 附加到Form
                                form.append(con_input);
                            }


                            form.submit();   //表单提交
                            return;
                        }
                        return true;
                    });
                }
            })

            //点击同意
            $('input[data-action="agree"]').on('click', function () {
                checkedFlag = false;
                var idList = [];
                var statList = [];
                $('.parentTable').find('tbody').find('input[type=checkbox]').each(function (i, o) {
                    if ($(o).is(':checked')) {
                        checkedFlag = true;
                        if ($(o).next().val() == 1 || $(o).next().val() == 2) {
                            idList.push($(o).attr('isVal'));//id
                            statList.push($(o).next().val());//状态
                        }
                    }
                });

                if (idList.length > 0) {
                    if (statList.length > 0) {
                        top.jBox.confirm('是否同意？', '', function (v, h, f) {
                            if (v == 'ok') {
                                scope._agree(3, idList, 3, '已同意');
                            }
                            return true;
                        });

                    } else {
                        top.jBox.alert('没有需要同意的合同');
                    }
                } else {
                    if (checkedFlag) {
                        top.jBox.alert('没有需要同意的合同');
                    } else {
                        top.jBox.alert('请选择一条记录');
                    }

                }
                // if (idList.length == 0) {
                //     top.jBox.info('请选择一条记录');
                // } else if (idList.length > 2) {
                //     top.jBox.info('只能选择一条记录');
                // } else {
                //     if (idList[1] == 1 || idList[1] == 2 || idList[1] == 4) {
                //         top.jBox.confirm('是否同意？', '', function (v, h, f) {
                //             if (v === 'ok') {
                //                 var stat = idList[1];
                //                 scope._agree(stat, idList[0], 3, '已同意');
                //             }
                //             return true;
                //         });
                //     } else {
                //         top.jBox.info('没有需要操作的合同');
                //     }
                //
                //
                // }
            })
            //点击不同意
            $('input[data-action="disagree"]').on('click', function () {
                checkedFlag = false;
                var idList = [];
                var statList = [];
                $('.parentTable').find('tbody').find('input[type=checkbox]').each(function (i, o) {
                    if ($(o).is(':checked')) {
                        checkedFlag = true;
                        if ($(o).next().val() == 1 || $(o).next().val() == 2) {
                            idList.push($(o).attr('isVal'));//id
                            statList.push($(o).next().val());//状态
                        }
                    }
                });
                if (idList.length > 0) {
                    if (statList.length > 0) {
                        top.jBox.confirm('是否不同意？', '', function (v, h, f) {
                            if (v == 'ok') {
                                scope._agree(4, idList, 4, '不同意');
                            }
                            return true;
                        });

                    } else {
                        top.jBox.alert('没有需要不同意的合同');

                    }
                } else {
                    if (checkedFlag) {
                        top.jBox.alert('没有需要不同意的合同');
                    } else {
                        top.jBox.alert('请选择一条记录');
                    }

                }

                // var idList = [];
                // $('.parentTable').find('tbody').find('input[type=checkbox]').each(function (i, o) {
                //     if ($(o).is(':checked')) {
                //         idList.push($(o).attr('isVal'));
                //         idList.push($(o).next().val());
                //     }
                // });
                // if (idList.length == 0) {
                //     top.jBox.info('请选择一条记录');
                // } else if (idList.length > 2) {
                //     top.jBox.info('只能选择一条记录');
                // } else {
                //     if (idList[1] == 1 || idList[1] == 2 || idList[1] == 3) {
                //         top.jBox.confirm('是否不同意？', '', function (v, h, f) {
                //             if (v === 'ok') {
                //                 var stat = idList[1];
                //                 scope._agree(stat, idList[0], 4, '不同意');
                //             }
                //             return true;
                //         });
                //     } else {
                //         top.jBox.info('没有需要操作的合同');
                //     }
                //
                //
                // }
            })
            //
            // //合同序列点击
            // $('#sequenName').on('change', function () {
            //     if ($(this).val()) {
            //         $('#conName').empty();
            //         $.post("conName", {
            //             planDate: $('input[name="planMonth"]').val(),
            //             role: scope.role,
            //             sequenceId: $(this).val()
            //         }, function (data) {
            //             if (data) {
            //                 var conNameHtml = '<option value="" selected="selected">请选择</option>';
            //                 $.each(data, function (i, o) {
            //                     conNameHtml += '<option value="' + o[1] + '">' + o[0] + '</option>'
            //                 })
            //                 $('#conName').append(conNameHtml);
            //             }
            //         })
            //     }
            //
            // })
            //全选
            $('input.parentClass').on('click', function () {

                if ($(this).is(":checked")) {
                    $('.parentTable').find('input[type=checkbox]').each(function (i, o) {
                        var id = $(o).attr('isval');
                        if (scope.checkBoxIds) {
                            scope.checkBoxIds += "," + id;
                        } else {
                            scope.checkBoxIds = id;
                        }

                        $(o).attr("checked", "checked");
                    })
                } else {
                    var checkBoxIdsList = scope.checkBoxIds.split(',');
                    $('.parentTable').find('tbody').find('input[type=checkbox]').each(function (i, o) {
                        var id = $(o).attr('isval');
                        $(o).attr("checked", false);
                        $.each(checkBoxIdsList, function (i, o) {
                            if (o == id) {
                                checkBoxIdsList.splice(i, 1);
                            }
                        })
                    })
                    scope.checkBoxIds = checkBoxIdsList;
                }

            });



            //电力用户点击撤销
            $('input[data-action="revocation"]').on('click', function () {
                checkedFlag = false;
                var idList = [];
                var statList = [];
                $('.parentTable').find('tbody').find('input[type=checkbox]').each(function (i, o) {
                    if ($(o).is(':checked')) {
                        checkedFlag = true;
                        if ($(o).next().val() == 3||$(o).next().val() == 7 ) {
                            idList.push($(o).attr('isVal'));//id
                            statList.push($(o).next().val());//状态
                        }
                    }
                });

                if (idList.length > 0) {
                    if (statList.length > 0) {
                        var html = "<div style='padding:10px;'>撤销原因：<input type='text' id='reason' name='reason' /></div>";
                        var submit = function (v, h, f) {
                            if (f.reason == '') {
                                $.jBox.tip("请输入撤销原因。", 'error', { focusId: "reason" }); // 关闭设置
                                return false;
                            }

                            scope._agree(6, idList, 6, '已撤销',f.reason);
                            return true;
                        };
                        top.jBox(html, { title: "撤销原因？", submit: submit });
                        // top.jBox.confirm('请输入撤销原因？', '', function (v, h, f) {
                        //     if (v == 'ok') {
                        //         scope._agree(3, idList, 3, '已同意');
                        //     }
                        //     return true;
                        // });

                    } else {
                        top.jBox.alert('没有需要撤销的合同');
                    }
                } else {
                    if (checkedFlag) {
                        top.jBox.alert('没有需要撤销的合同');
                    } else {
                        top.jBox.alert('请选择一条记录');
                    }

                }
                // if (idList.length == 0) {
                //     top.jBox.info('请选择一条记录');
                // } else if (idList.length > 2) {
                //     top.jBox.info('只能选择一条记录');
                // } else {
                //     if (idList[1] == 1 || idList[1] == 2 || idList[1] == 4) {
                //         top.jBox.confirm('是否同意？', '', function (v, h, f) {
                //             if (v === 'ok') {
                //                 var stat = idList[1];
                //                 scope._agree(stat, idList[0], 3, '已同意');
                //             }
                //             return true;
                //         });
                //     } else {
                //         top.jBox.info('没有需要操作的合同');
                //     }
                //
                //
                // }
            });

            //电厂点击同意
            $('input[data-action="agreeRevocation"]').on('click', function () {
                checkedFlag = false;
                var idList = [];
                var statList = [];
                $('.parentTable').find('tbody').find('input[type=checkbox]').each(function (i, o) {
                    if ($(o).is(':checked')) {
                        checkedFlag = true;
                        if ($(o).next().val() == 6 ) {
                            idList.push($(o).attr('isVal'));//id
                            statList.push($(o).next().val());//状态
                        }
                    }
                });

                if (idList.length > 0) {
                    if (statList.length > 0) {
                        top.jBox.confirm('是否同意？', '', function (v, h, f) {
                            if (v == 'ok') {
                                scope._agree(6, idList, 0, '已同意');
                            }
                            return true;
                        });

                    } else {
                        top.jBox.alert('没有需要同意的合同');
                    }
                } else {
                    if (checkedFlag) {
                        top.jBox.alert('没有需要同意的合同');
                    } else {
                        top.jBox.alert('请选择一条记录');
                    }

                }
            });

            //电厂点击不同意
            $('input[data-action="disagreeRevocation"]').on('click', function () {
                checkedFlag = false;
                var idList = [];
                var statList = [];
                $('.parentTable').find('tbody').find('input[type=checkbox]').each(function (i, o) {
                    if ($(o).is(':checked')) {
                        checkedFlag = true;
                        if ($(o).next().val() == 6 ) {
                            idList.push($(o).attr('isVal'));//id
                            statList.push($(o).next().val());//状态
                        }
                    }
                });

                if (idList.length > 0) {
                    if (statList.length > 0) {
                        top.jBox.confirm('是否不同意？', '', function (v, h, f) {
                            if (v == 'ok') {
                                scope._agree(6, idList, 7, '不同意');
                            }
                            return true;
                        });

                    } else {
                        top.jBox.alert('没有需要不同意的合同');
                    }
                } else {
                    if (checkedFlag) {
                        top.jBox.alert('没有需要不同意的合同');
                    } else {
                        top.jBox.alert('请选择一条记录');
                    }

                }
            });

            $('input[name=planMonth]').change(function () {
                scope._initConName();
            });

            //帮助文档
            $('a[data-action="viewHelp"]').on('click',function(){
                top.jBox.open("html:"+$('#isHelp').html(), "帮助文档", 800,
                     500,{
                        loaded: function (h) {
                            $(".jbox-content", top.document).css("font-size", "20px");
                            $(".jbox-content", top.document).css("line-height", "30px");
                            $(".jbox-content", top.document).css("padding", "10px");
                        }
                    });
            })
        }
    })
    $(function () {
        new directTradeDeclare();
    })
}()