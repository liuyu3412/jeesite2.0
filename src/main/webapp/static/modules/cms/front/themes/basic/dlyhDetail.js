!function () {

    var maxengSp = 0;


    var dlyDetail = function () {
        this._create();
    };

    function extracted(data, planMonth, startTime, endTime, _html) {
        var engConRest = 0//计算合同初始值的总和
            , engOriRest = 0//统计已结算计划的总和
            , engPlanRest = 0//统计修改意向的总和
            , engSpRest = 0//统计当月审批的总和
            , engSum = data.entity.netEngSum;
        $.each(data.list, function (i, o) {
            if (i <= (planMonth - 2)) {
                maxengSp = maxengSp + o.engPlan;
            }
            var html = '';
            engConRest += ((o.engCon) ? o.engCon : 0);
            engOriRest += ((o.engOri) ? o.engOri : 0);
            engPlanRest += ((o.engPlan) ? o.engPlan : 0);
            engSpRest += ((o.engSp) ? o.engSp : 0);
            if (i > (planMonth - 2)) {
                if (i + 1 >= startTime && i + 1 <= endTime) {
                    html += '<tr>'
                } else {
                    html += '<tr aria-readonly="true" style="background-color:#BDB6B6">'
                }

            } else {
                html += '<tr aria-readonly="true" style="background-color:#BDB6B6">'
            }
            html += '<td class="month">' + o.monthStr + '</td>' +
                '<td class="engCon">' + ((o.engCon) ? o.engCon : 0) + '</td>' +
                '<td class="engOri">' + ((o.engOri) ? o.engOri : 0) + '</td>' +
                '<td class="engPlan">' +
                '<span>' + ((o.engPlan) ? o.engPlan : 0) + '</span>' +
                '<input maxlength="50" name="engPlan" value="' + ((o.engPlan) ? o.engPlan : 0) + '"style="display: none"  class="remarkInput"   />' +
                '<input maxlength="50" name="initialValue" value="' + ((o.engOri) ? o.engOri : 0) + '"style="display: none"/>' +
                '</td>' +
                '<td class="engSp">' + ((o.engSp) ? o.engSp : 0) + '</td>' +
                '<td class="remark">' +
                '<span>' + ((o.remark) ? o.remark : _html) + '</span>' +
                '<input name="remark" maxlength="50" value="' + ((o.remark) ? o.remark : _html) + '" class="remarkInput"/>' +
                '</td>' +
                '</tr>';
            $('.parentTable').find('tbody').append(html);
        })
        var lastHtml =
            '<tr class="tail">' +
            '<td>尾差</td>' +
            '<td class="engCon isZero1">' + (engSum - engConRest).toFixed(4) + '</td>' +
            '<td class="engOri isZero2">' + (engSum - engOriRest).toFixed(4) + '</td>' +
            '<td class="engPlan isReportRest">' + (engSum - engPlanRest).toFixed(4) + '</td>' +
            // '<td class="engPlan isReportRest">' + (0).toFixed(4) + '</td>' +
            '<td class="engSp isZero3">' + (engSum - engSpRest).toFixed(4) + '</td>' +
            '<td class="remark">' +
            //                        '<span></span>' +
            //                        '<input name="remark" maxlength="50" style="display: none;width: 194px;margin-bottom:0px;"/>' +
            '</td>' +
            '</tr>'
        $('.parentTable').find('tbody').append(lastHtml)
        return engSum;
    }

    $.extend(dlyDetail.prototype, {
        _create: function () {
            var checkCode = $('input[name=checkCode]').val();
            this.checkCode = checkCode;
            this._init();
            this._bindEvents();
        },

        /**
         * 初始化页面数据
         */
        _init: function () {
            var scope = this;

            var status = $('input[name=status]').val();
            var isLook = $('input[name=isLook]').val();
            var role = $('input[name=role]').val();//用户类型 1：电厂 2:电力

            $.post('get', {id: $('input[name=id]').val()}, function (data) {
                console.log(data);
                console.log(data.startPlanDate);
                var _html = '';
                if (data) {
                    status = data.entity.status;
                    $('input[name=status]').val(status);
                    if (role == 2) {
                        $('#btnSubmit').hide();
                        if (status == 1 || status == 2) {
                            $('#agree').show();
                            // $('#disagree').show();
                        }
                        if (status == 1 || status == 2) {
                            // $('#agree').show();
                            $('#disagree').show();
                        }

                        //用户可以撤销的状态
                        if (status == 3 || status == 7) {
                            $('#revocation').show();
                        }
                    }
                    scope.purchaserId = data.entity.purchaserId;//该计划的购买方
                    var planMonth = 0;
                    var startTime = data.startTime;
                    var endTime = data.endTime;
                    if (data.month) {
                        planMonth = parseInt(data.month);
                    }

                    $('#searchForm').find('input').each(function (i, o) {
                        var _inputName = $(o).attr('name');
                        if (_inputName != 'isSubmit' && _inputName != "agree" && _inputName != "disagree" && _inputName != "revocation" && _inputName != "agreeRevocation" && _inputName != "disagreeRevocation") {
                            if (_inputName == 'startDate' || _inputName == 'endDate') {
                                if (data.entity[_inputName]) {
                                    $(o).val(data.entity[_inputName].substr(0, 10))
                                    $(o).attr("title", data.entity[_inputName].substr(0, 10))
                                }
                            } else {
                                $(o).val(data.entity[_inputName]);
                                $(o).attr("title", data.entity[_inputName])
                            }

                        }

                    })

                    var engSum = extracted(data, planMonth, startTime, endTime, _html);


                    if (isLook || role == 2) {
                        $('#btnSubmit').val("保存");
                        $('.parentTable').find('tbody').find('.remark').on('click', function () {
                            $(this).find('span').text("");
                            $(this).find('input[name="remark"]').show();
                            $(this).find('input[name="remark"]').focus();
                        })
                        $('.parentTable').find('tbody').find('.remark').find('input[name="remark"]').blur(function () {
                            $(this).hide();
                            var remark = $(this).val();
                            $(this).parent().find('span').text(remark);
                        })
                    } else {

                        //判断是否为未上报状态
                        if (status != 0 && status != 4) {
                            $('#btnSubmit').hide();
                        } else {
                            $(".remarkInput").each(function (i, o) {
                                $(o).bind("keyup", function () {
                                    $(o).val($(o).val().replace(/[^\-?\d.]/g, ''));
                                });
                            })

                            //绑定已结算/当月修改事件
                            $('.parentTable').find('td.engPlan').each(function (i, o) {
                                if (i == (planMonth - 1)) {
                                    if (i + 1 >= startTime && i + 1 <= endTime) {
                                        $(o).on('click', function () {

                                            var curTime = new Date();
                                            var startTime = new Date(Date.parse(data.startPlanDate))
                                            var endTime = new Date(Date.parse(data.endPlanDate))
                                            if (!(startTime < curTime && curTime < endTime)) {
                                                console.log("不在修改时间区间内");

                                                return;
                                            }


                                            $(this).find('input[name=engPlan]').show();
                                            $(this).find('input[name=engPlan]').focus();
                                            $(this).find('span').hide();
                                            $(this).find('input[name=engPlan]')
                                            //                            .on('keyup',function () {
                                            //                                var _inputVal=$(this).val();
                                            //                                var reg=
                                            //                                if(!"/[^0-9-]+/,".test(_inputVal)){
                                            //                                    alert(1);
                                            //                                    return;
                                            //                                }
                                            //                            })
                                                .blur(function (i, o) {
                                                    var _this = $(this).val();
                                                    if (!isNaN(_this)) {
                                                        var engPlanVal = $('.tail').find('.engPlan').text();
                                                        engPlanVal = parseFloat(engPlanVal);
                                                        $(this).prev().show();
                                                        $(this).hide();
                                                        var _oldThis = $(this).val()//input 中的值
                                                        if (_oldThis < 0 || String(_oldThis).indexOf(".") != -1) {
                                                            top.$.jBox.tip('请勿输入小数及负数', 'messager');
                                                            $(this).val($(this).prev().text());
                                                            return
                                                        }
                                                        if (_oldThis > engSum - maxengSp) {
                                                            top.$.jBox.tip('请不要超过合同总量!', 'messager');
                                                            $(this).val($(this).prev().text());
                                                            return
                                                        }
                                                        var _thisVal = $(this).prev().text();//span 中的值
                                                        var newVal = _thisVal - _oldThis;
                                                        if (newVal != 0) {
                                                            $('.parentTable').find('input[name=engPlan]').each(function (i, o) {
                                                                $(this).prev().text($(this).next().val())
                                                            })
                                                            $(this).prev().text(_oldThis);
                                                            getEngPlans($(this).next().val() - _oldThis);
                                                        }
                                                    }
                                                })
                                        })
                                    }

                                }
                            })

                            // 平均算法
                            function getEngPlans(val) {
                                var tableEngPlan = $('.parentTable').find('input[name=engPlan]')
                                tableEngPlan.addClass("wyl");
                                tableEngPlan.each(function (i, o) {
                                    if (i < planMonth) {
                                        $(o).removeClass("wyl")
                                    }
                                    if (val < 0) {
                                        if ($(this).prev().text() == 0) {
                                            $(o).removeClass("wyl")
                                        }
                                    }
                                })
                                var engPlans = getNeedMathEngPlans();
                                var beginPlanLength = engPlans.length;
                                engPlans.each(function (i, o) {
                                    var finalNum = (Number($(this).prev().text()) + val / engPlans.length).toFixed(0);
                                    if (finalNum < 0) {
                                        $(this).prev().text(0)
                                    } else {
                                        $(this).prev().text(finalNum)
                                    }
                                })

                                var totalPlan = getTotalPlan()
                                if (Math.abs(engSum - totalPlan) >= beginPlanLength) {
                                    getEngPlans(engSum - totalPlan)
                                } else if (engSum - totalPlan < beginPlanLength) {
                                    engPlans.each(function (i, o) {
                                        if (i == engPlans.length - 1) {
                                            if (Number($(this).prev().text()) + engSum - totalPlan < 0) {
                                                $(this).prev().text(0)
                                                getEngPlans(engSum - getTotalPlan())
                                            } else {
                                                var lastNumPlan = Number($(this).prev().text()) + engSum - totalPlan;
                                                if (String(lastNumPlan).indexOf(".") == -1) {
                                                    $(this).prev().text(lastNumPlan)
                                                } else {
                                                    $(this).prev().text(lastNumPlan.toFixed(3))
                                                }
                                            }
                                        }
                                    })
                                }
                            }

                            function getNeedMathEngPlans() {
                                return $('.parentTable').find('.wyl');
                            }

                            function getTotalPlan() {
                                var totalPlan = 0;
                                $('.parentTable').find('input[name=engPlan]').each(function (i, o) {
                                    totalPlan = totalPlan + Number($(this).prev().text());
                                })
                                return totalPlan;
                            }


                            //绑定备注点击事件
                            $('.parentTable').find('td.remark').each(function (i, o) {
                                if (i == (planMonth - 1)) {
                                    $(o).on('click', function () {
                                        $(this).find('input[name=remark]').show();
                                        $(this).find('input[name=remark]').focus();
                                        $(this).find('span').hide();

                                        $(this).find('input[name=remark]').blur(function (i, o) {
                                            $(this).prev().show();
                                            $(this).hide();
                                            $(this).prev().text($(this).val());
                                        })
                                    })
                                }
                            })
                        }
                        //电力用户提交撤销的情况
                        if (status == 6) {
                            $('#agreeRevocation').show();
                            $('#disagreeRevocation').show();
                        }

                    }

                }

            });
            $.post(top.ctx + "/dljyzx/scSummationTradeJs/queryList", {planMonth: $('input[name=planMonth]').val()}, function (data) {
                if (data && data.transferList) {
                    var transferSum = data.transferList[0]//该用户已经转让的电量
                    var appearSum = data.appear.contractsum;//电厂已经上报的电量
                    var planMonth = $('input[name=planMonth]').val();
                    planMonth = planMonth.substr(planMonth.indexOf('-') + 1);
                    planMonth = parseInt(planMonth);
                    // //转让的电量大于上报的电量时候
                    // if(transferSum>appearSum){
                    //     $('#agree').hide();
                    // }
                    var str = '';
                    if (role == 2) {
                        if (!appearSum) {
                            appearSum = 0;
                        }
                        if (transferSum) {
                            str = '您在' + planMonth + '月的电量转让' + transferSum + 'MWh,电厂已经上报了' + appearSum + 'MWh';
                            $('.conMessage').html(str);
                        } else {
                            $('.conMessage').empty();
                        }

                    }
                    // else{
                    //     str='该用户在'+planMonth+'月的电量转让'+transferSum+'WM,所以您的申报电量必须'+appearSum+'WM'
                    // }

                }
            })


        },
        /**
         * 绑定事件
         * @private
         */
        _bindEvents: function () {
            var scope = this;
            var status = $('input[name=status]').val();
            var id = $('input[name=id]').val();
            //点击上报
            $('#searchForm').submit(function (e) {

                var engPlanList = [];
                var remarkList = [];
                //获取所有修改的 已结算/当月修改
                $('input[name=engPlan]').each(function (i, o) {
                    var json = {};
                    json.index = i;
                    json.value = $(this).val();
                    engPlanList.push(json);
                })

                //获取所有修改的备注
                $('input[name=remark]').each(function (i, o) {
                    var json = {};
                    json.index = i;
                    json.value = $(this).val();
                    remarkList.push(json);
                })
                var isReportRest = $('.isReportRest').text();//尾差
                if (!(isReportRest == '0.0000' || isReportRest == '-0.0000')) {
                    $.jBox.tip("尾差必须为0", 'messager')
                    return false;
                }
                $.post("beforeSave?checkcode=" + scope.checkCode, {id: id}, function (msg) {
                    // $.ajax({
                    //     url: "save?checkcode="+scope.checkCode,
                    //     type: "post",
                    //     async: false,
                    //     data: {
                    //         isReportRest: isReportRest,
                    //         engPlanList: JSON.stringify(engPlanList),
                    //         remarkList: JSON.stringify(remarkList),
                    //         id: id
                    //     },
                    //     success: function (data) {
                    //     }
                    // })
                    var planMonth = $('input[name=planMonth]').val();
                    planMonth = planMonth.substr(planMonth.indexOf('-') + 1);
                    planMonth = parseInt(planMonth);
                    $.ajax({
                        url: "save?checkcode=" + scope.checkCode,
                        type: "post",
                        async: false,
                        data: {
                            isReportRest: isReportRest,
                            engPlanList: JSON.stringify(engPlanList),
                            remarkList: JSON.stringify(remarkList),
                            id: id,
                            purchaserId: scope.purchaserId,
                            planMonth: planMonth
                        },
                        success: function (data) {
                            $('#btnSubmit').attr('disabled', 'disabled');
                            jBox.alert('保存及上报成功！', "消息");
                        }
                    })
                    //
                    // $.post(
                    //     "save",
                    //    {
                    //         isReportRest:isReportRest,
                    //         engPlanList: JSON.stringify(engPlanList),
                    //         remarkList: JSON.stringify(remarkList),
                    //         id:id
                    //     },
                    //     function (data) {
                    //         $('#btnSubmit').attr('disabled', 'disabled');
                    //         jBox.alert('保存及上报成功！',"消息");
                    //     }
                    // )
                })

                return false;
            })

            //点击同意
            $('#agree').on('click', function () {
                top.jBox.confirm('是否同意？', '', function (v, h, f) {
                    if (v === 'ok') {
                        var stat = status;
                        scope._agree(stat, id, 3, '已同意');
                    }
                    return true;
                });
            })
            //点击不同意
            $('#disagree').on('click', function () {
                top.jBox.confirm('是否不同意？', '', function (v, h, f) {
                    if (v == 'ok') {
                        var stat = status;
                        scope._agree(stat, id, 4, '不同意');
                    }
                    return true;
                });
            });


            //电力用户点击撤销
            $('#revocation').on('click', function () {
                var html = "<div style='padding:10px;'>撤销原因：<input type='text' id='reason' name='reason' /></div>";
                var submit = function (v, h, f) {
                    if (f.reason == '') {
                        $.jBox.tip("请输入撤销原因。", 'error', {focusId: "reason"}); // 关闭设置
                        return false;
                    }

                    scope._agree(6, id, 6, '已撤销', f.reason);
                    return true;
                };
                top.jBox(html, {title: "撤销原因？", submit: submit});
                // top.jBox.confirm('？', '', function (v, h, f) {
                //     if (v === 'ok') {
                //         var stat = status;
                //         scope._agree(stat, id, 3, '已同意');
                //     }
                //     return true;
                // });
            });

            //电厂点击同意
            $('#agreeRevocation').on('click', function () {
                top.jBox.confirm('是否同意？', '', function (v, h, f) {
                    if (v == 'ok') {
                        scope._agree(6, id, 0, '已同意');
                    }
                    return true;
                });
            });

            //电厂点击不同意
            $('#disagreeRevocation').on('click', function () {
                top.jBox.confirm('是否不同意？', '', function (v, h, f) {
                    if (v == 'ok') {
                        scope._agree(6, id, 7, '不同意');
                    }
                    return true;
                });
            });


        },
        /**
         * 同意或者不同意
         * isAgree 3 同意
         * isAgree 4 不同意
         * status 当前状态
         *
         */
        _agree: function (status, id, isAgree, mes, reason) {
            var scope = this;
            //未上报的不可以同意
            if (status == 0) {
                jBox.alert('该记录未上报');
                return;
            } else {
                var planMonth = $('input[name="planMonth"]').val();
                planMonth = planMonth.substr(planMonth.indexOf('-') + 1);
                planMonth = parseInt(planMonth);
                $.post("updateStatus?checkcode=" + scope.checkCode, {
                    id: id,
                    status: isAgree,
                    planMonth: planMonth,
                    reason: reason
                }, function (data) {
                    $('#agree').hide();
                    $('#disagree').hide();
                    $('#revocation').hide();
                    $('#disagreeRevocation').hide();
                    $('#agreeRevocation').hide();
                    jBox.alert(mes);
                })
            }

        },
    })
    $(function () {
        new dlyDetail();
    })
}()