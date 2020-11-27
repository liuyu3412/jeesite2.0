!function () {
    var directTradeDeclare = function () {
        this._create();

    };

    $.extend(directTradeDeclare.prototype, {
        _create: function () {
            var checkCode = $('input[name=checkCode]').val();
            this.checkCode = checkCode;
            // this._initCloseDate();
            this._initTalbe();
            this._bindEvents();
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
            var json = {
                planMonth: planMonth,
                pageNo: $('#pageNo').val(),
                pageSize: $('#pageSize').val(),
                role: scope.role
            };
            $.post("findPageList", json, function (data) {
                if (data.page) {
                    var pageList = data.page.list;
                    var countList = data.total;
                    if (pageList && pageList.length > 0) {
                        var parentHtml = '<tr>' +
                            '<td><input class="countCheck" type="checkbox"/></td>' +
                            '<td></td>' +
                            '</tr>';
                        var childHtml = '';
                        //统计的list
                        if (countList) {
                            var countHtml = '<tr>' +
                                '<td>合计</td>'
                            $.each(countList, function (i, o) {
                                countHtml += '<td>' + o + '</td>'
                            });
                            countHtml += '</tr>'
                            childHtml += countHtml;
                        }

                        var checkFlag = $(".parentClass").is(":checked");
                        var index = 0;
                        $.each(pageList, function (i, o) {
                            index++;
                            var status = '';
                            var color = '';
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
                                    status = '交易中心已审批';
                                    color = 'null';
                                    break;
                                case 3:
                                    status = '交易中心已驳回';
                                    color = 'red';
                                    break;
                            }
                            var contractName = o.contractName;
                            if (contractName.length > 30) {
                                contractName = contractName.substr(0, 30) + "...";
                            }
                            var checkHtml = 'checked="checked"';
                            parentHtml += '<tr>'
                                + '<td ><input isVal="' + o.id + '" type="checkbox" ' + ((checkFlag) ? checkHtml : "") + '" /><input name="isStatus" type="hidden" value="' + o.status + '"/>' +
                                '<input value="' + index + '" type="hidden" /></td>'
                                + '<td class="" style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden" name="contitle" title="' + o.contractName + '" >' + contractName + '</td>' //合同名称
                            childHtml += '<tr>' +
                                '<td  style="width: 100px!important;background-color: ' + color + '"><div style="overflow:hidden;width: 100px">' + status + '</div></td>';//合同状态

                            var engSpRest = 0//统计当月审批的总和
                                , engSum = o.netContractEng;
                            for (var i = 1; i <= 12; i++) {
                                var key = 'netEng' + i
                                var value = 0;
                                if (o[key]) {
                                    value = o[key];
                                }
                                engSpRest += value;
                            }
                            childHtml += '<td style="background-color: ' + color + ';width: 80px">' + o.netContractEng + '</td>' + // 合同总量
                                '<td class="putValue" style="background-color: ' + color + '">' + ((o.netEng1) ? o.netEng1 : 0) + '</td>' + // 1月
                                '<td class="putValue" style="background-color: ' + color + '">' + ((o.netEng2) ? o.netEng2 : 0) + '</td>' + // 2月
                                '<td class="putValue" style="background-color: ' + color + '">' + ((o.netEng3) ? o.netEng3 : 0) + '</td>' + // 3月
                                '<td class="putValue" style="background-color: ' + color + '">' + ((o.netEng4) ? o.netEng4 : 0) + '</td>' + // 4月
                                '<td class="putValue" style="background-color: ' + color + '">' + ((o.netEng5) ? o.netEng5 : 0) + '</td>' + // 5月
                                '<td class="putValue" style="background-color: ' + color + '">' + ((o.netEng6) ? o.netEng6 : 0) + '</td>' + // 6月
                                '<td class="putValue" style="background-color: ' + color + '">' + ((o.netEng7) ? o.netEng7 : 0) + '</td>' + // 7月
                                '<td class="putValue" style="background-color: ' + color + '">' + ((o.netEng8) ? o.netEng8 : 0) + '</td>' + // 8月
                                '<td class="putValue" style="background-color: ' + color + '">' + ((o.netEng9) ? o.netEng9 : 0) + '</td>' + // 9月
                                '<td class="putValue" style="background-color: ' + color + '">' + ((o.netEng10) ? o.netEng10 : 0) + '</td>' + // 10月
                                '<td class="putValue" style="background-color: ' + color + '">' + ((o.netEng11) ? o.netEng11 : 0) + '</td>' + // 11月
                                '<td class="putValue" style="background-color: ' + color + '">' + ((o.netEng12) ? o.netEng12 : 0) + '</td>' + // 12月
                                '<td style="width: 80px">' + (engSum - engSpRest).toFixed(4) + '</td>' + // 申报后尾差
                                '</tr>';
                        });


                        $('table.parentTable').find('tbody').append(parentHtml);

                        $('table.childTable').find('tbody').append(childHtml)
                        $('.pagination').append(data.page.html);
                        $('.pagination').find('a').each(function (i, o) {
                            var inputNum = $(this).find('input').length;
                            if (inputNum == 2) {
                                $('#xx').unbind();
                            } else {
                                $(o).unbind().on('click', function () {

                                    var pageNo = $(o).text();
                                    var pageSize = $('#xx').val();
                                    if (pageNo == '下一页 »') {
                                        var pageNo = parseInt($('.pagination').find('.active').find('a').text()) + 1;

                                        scope._toPage(pageNo, pageSize);
                                    } else if (pageNo == '« 上一页') {
                                        var pageNo = parseInt($('.pagination').find('.active').find('a').text()) - 1;
                                        scope._toPage(pageNo, pageSize);
                                    } else if (pageNo == '转到') {
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
                            if (checkBoxId) {
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
                                                checkBoxTempList.splice(i, 1);
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
                            // $(this).addClass("textBold");
                        })
                        $('.parentTable').find('tbody').find('td[name="contitle"]').mouseout(function () {
                            // $(this).removeClass("textBold");
                        })
                    } else {
                        top.jBox.alert('暂无记录');
                    }

                } else {
                    top.jBox.alert('暂无记录');
                }

            }).then(function () {
                $(".putValue").on('click',
                    function () {
                        var monthNum = $('input[name=planMonth]').val().split("-")[1];//月度
                        var totalValue = $(".putValue")
                        if ($(this).parent().children().eq(0).text() == '交易中心已审批') {
                            return
                        }
                        for (var i = 0; i < totalValue.length; i++) {
                            if (totalValue[i] == this) {
                                var doNotEdit = ((i + 1) % 12 == 0 ? 12 : (i + 1) % 12);
                                if (doNotEdit < monthNum || (doNotEdit > 6 && doNotEdit < 13)) {
                                    return
                                }
                            }
                        }
                        var num = this.innerHTML;
                        if (Number(num) || num == 0) {
                            $(this).html('<input class="newInput" style="width: 80px;hight:20px;padding: 0px 0px;margin-bottom: -4px;margin-top: -7px;" type = "text" value= "' + num + '"/>')
                        }
                    }
                )
            });
        },
        _toPage: function (pageNo, pageSize) {
            var scope = this;
            $("#pageNo").val(pageNo);
            $("#pageSize").val(pageSize);
            scope._initTalbe();
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

            //点击上报
            $('input[data-action="call"]').on('click', function () {
                var idList = [];
                var statList = [];
                var checkedDataList = []
                var numRole = false;
                $('.parentTable').find('tbody').find('input[type=checkbox]').each(function (i, o) {
                    if ($(o).is(':checked')) {
                        checkedFlag = true;
                        if ($(o).next().val() != 2) {
                            var index = $(o).next().next().val();
                            var sRow = $("#second").children().eq(index).children()
                            var pump = new Object();
                            pump.id = $(o).attr('isVal');
                            pump.netEng1 = sRow.eq(2).children("input").val() ? sRow.eq(2).children("input").val() : sRow.eq(2).text();
                            pump.netEng2 = sRow.eq(3).children("input").val() ? sRow.eq(3).children("input").val() : sRow.eq(3).text();
                            pump.netEng3 = sRow.eq(4).children("input").val() ? sRow.eq(4).children("input").val() : sRow.eq(4).text();
                            pump.netEng4 = sRow.eq(5).children("input").val() ? sRow.eq(5).children("input").val() : sRow.eq(5).text();
                            pump.netEng5 = sRow.eq(6).children("input").val() ? sRow.eq(6).children("input").val() : sRow.eq(6).text();
                            pump.netEng6 = sRow.eq(7).children("input").val() ? sRow.eq(7).children("input").val() : sRow.eq(7).text();
                            pump.netEng7 = sRow.eq(8).children("input").val() ? sRow.eq(8).children("input").val() : sRow.eq(8).text();
                            pump.netEng8 = sRow.eq(9).children("input").val() ? sRow.eq(9).children("input").val() : sRow.eq(9).text();
                            pump.netEng9 = sRow.eq(10).children("input").val() ? sRow.eq(10).children("input").val() : sRow.eq(10).text();
                            pump.netEng10 = sRow.eq(11).children("input").val() ? sRow.eq(11).children("input").val() : sRow.eq(11).text();
                            pump.netEng11 = sRow.eq(12).children("input").val() ? sRow.eq(12).children("input").val() : sRow.eq(12).text();
                            pump.netEng12 = sRow.eq(13).children("input").val() ? sRow.eq(13).children("input").val() : sRow.eq(13).text();
                            var totalMonthNum = 0;
                            for (var index in pump) {
                                var sbNum = pump[index]
                                if (index != 'id' && !(/^[1-9]\d*(\.\d+)?$/).test(sbNum) && sbNum != 0) {
                                    top.jBox.alert('您填写的数字有误');
                                    numRole = true;
                                }
                                if (!numRole && index != 'id') {
                                    totalMonthNum += Number(sbNum);
                                }
                            }
                            if (totalMonthNum != sRow.eq(1).text()) {
                                top.jBox.alert('您申报后尾差不为0');
                                var kk = Number(sRow.eq(1).text());
                                sRow.eq(14).text((kk - totalMonthNum).toFixed(4))
                                numRole = true;
                            }
                            idList.push($(o).attr('isVal'));//id
                            statList.push($(o).next().val());//状态
                            checkedDataList.push(pump);
                        }
                    }
                });
                if (numRole) {
                    return;
                }
                if (idList.length > 0) {
                    if (statList.length > 0) {
                        top.jBox.confirm('分月计划是否确认无误？', '', function (v, h, f) {
                            if (v == 'ok') {
                                var stat = 1;
                                var planMonthStr = $('input[name="planMonth"]').val();
                                planMonthStr = planMonthStr.split("-");
                                var planMonth = new Date()
                                planMonth.setFullYear(planMonthStr[0], planMonthStr[1], 1)
                                $.post("updateStatus?checkcode=" + scope.checkCode, {
                                    checkedDataList: JSON.stringify(checkedDataList),
                                    planMonth: planMonth
                                }, function (data) {
                                    top.jBox.alert('上报成功');
                                    $('table.parentTable').find('tbody').empty();
                                    $('table.childTable').find('tbody').empty();
                                    scope._initTalbe();
                                })
                            }
                            return true;
                        });

                    } else {
                        top.jBox.alert('您选择的合同已审批');

                    }
                } else {
                    if (checkedFlag) {
                        top.jBox.alert('您选择的合同已审批');
                    } else {
                        top.jBox.alert('请选择一条记录');
                    }
                }

            })


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
        }
    })
    $(function () {
        new directTradeDeclare();
    })

    function onlyNum() {
        if (!(event.keyCode == 46) && !(event.keyCode == 8) && !(event.keyCode == 37) && !(event.keyCode == 39)) {
            if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
                event.returnValue = false;
            }
        }
    }

    $(".newInput").live("keyup input", function () {
        if (!(/^[1-9]\d*(\.\d+)?$/).test(this.value) && this.value != 0) {
            this.value = this.value.replace(/[a-z]/g, '');
        }
        var checkNums = $(this).parent().parent().children()
        var pump = new Object();
        pump.netEng1 = checkNums.eq(2).children("input").val() ? checkNums.eq(2).children("input").val() : checkNums.eq(2).text();
        pump.netEng2 = checkNums.eq(3).children("input").val() ? checkNums.eq(3).children("input").val() : checkNums.eq(3).text();
        pump.netEng3 = checkNums.eq(4).children("input").val() ? checkNums.eq(4).children("input").val() : checkNums.eq(4).text();
        pump.netEng4 = checkNums.eq(5).children("input").val() ? checkNums.eq(5).children("input").val() : checkNums.eq(5).text();
        pump.netEng5 = checkNums.eq(6).children("input").val() ? checkNums.eq(6).children("input").val() : checkNums.eq(6).text();
        pump.netEng6 = checkNums.eq(7).children("input").val() ? checkNums.eq(7).children("input").val() : checkNums.eq(7).text();
        pump.netEng7 = checkNums.eq(8).children("input").val() ? checkNums.eq(8).children("input").val() : checkNums.eq(8).text();
        pump.netEng8 = checkNums.eq(9).children("input").val() ? checkNums.eq(9).children("input").val() : checkNums.eq(9).text();
        pump.netEng9 = checkNums.eq(10).children("input").val() ? checkNums.eq(10).children("input").val() : checkNums.eq(10).text();
        pump.netEng10 = checkNums.eq(11).children("input").val() ? checkNums.eq(11).children("input").val() : checkNums.eq(11).text();
        pump.netEng11 = checkNums.eq(12).children("input").val() ? checkNums.eq(12).children("input").val() : checkNums.eq(12).text();
        pump.netEng12 = checkNums.eq(13).children("input").val() ? checkNums.eq(13).children("input").val() : checkNums.eq(13).text();
        var totalMonthNum = 0;
        for (var index in pump) {
            var sbNum = pump[index]
            totalMonthNum += Number(sbNum);
        }
        var kk = Number(checkNums.eq(1).text());
        checkNums.eq(14).text((kk - totalMonthNum).toFixed(4))
    })


}()