!function () {
    var registSeller = function () {
        this._create();
    }
    $.extend(registSeller.prototype, {
        _create: function () {
            var ctx = top.ctx;
            this.ctx = ctx;
            var businessId = $('input[name=businessId]').val();
            this.businessId = businessId;
            this._initMes();
            this._initFile();
            this._bindEvents();
        },
        /**
         * 初始化页面信息
         * @private
         */
        _initMes: function () {
            var scope = this;
            var isSellerFlag=$('input[name=isSellerFlag]').val();
            $.ajax({
                url: scope.ctx + "/dljyzx/baRegSeller/get",
                type: "post",
                async: false,
                dataType: "json",
                data: {
                    businessid: scope.businessId,
                    isSellerFlag: isSellerFlag
                },
                success: function (data) {
                    if (data && data.regSeller) {
                        scope.sign=data.sign;
                        var regSeller = data.regSeller;
                        var sellType=regSeller.selltype;//售电公司类型 01:有配网运营权售电公司 02:无配网运营权售电公司
                        if(sellType=='02'){
                            $('#energy').hide();
                            $('.isShowTd').hide();
                        }
                        $('input[name=participantId]').val(regSeller.participantid);
                        for (var key in regSeller) {
                            $('span[name=' + key + ']').text(regSeller[key]);
                        }
                        if (regSeller.powerGridBackGroud == '0') {
                            $('#powerGridBackground').text('否')
                        } else {
                            $('#powerGridBackground').text('是')
                        }
                        $('#geogrregionName').text(data.areaName);//公司地址所在地
                        $('#selltype').text(data.sellType);//售电公司类型
                        $('#gdj').text(data.gdjName);//主要办公地址
                        $('#attribution').text(data.attribution);//属地
                        $('#tradebelong').text(data.tradebelong);//所属行业
                        $('#enterprisetype').text(data.enterprisetype);//企业性质

                        //联系人信息
                        var contactDetailsInfoList = data.contactDetailsInfoList;
                        if (contactDetailsInfoList) {
                            var contactHtml = '';
                            $.each(contactDetailsInfoList, function (i, o) {
                                contactHtml += '<tr>' +
                                    '<td>' + ((o.linkman) ? o.linkman : '') + '</td>' +//姓名
                                    '<td>' + ((o.position) ? o.position : '') + '</td>' +//职务
                                    '<td>' + ((o.telephone) ? o.telephone : '') + '</td>' +//手机号
                                    '<td>' + ((o.faxphone) ? o.faxphone : '') + '</td>' +//传真号
                                    '<td>' + ((o.email) ? o.email : '') + '</td>' +
                                    '</tr>'
                            })
                            $('table.contactDetailsInfo').find('tbody').append(contactHtml);
                        }

                        //初始化股权信息
                        var stockInfoList = data.stockInfoList;
                        if (stockInfoList) {
                            var stockHtml = '';
                            $.each(stockInfoList, function (i, o) {
                                if (o.gengroupid) {
                                    stockHtml += '<tr>' +
                                        '<td style="display: none;"><input name ="gengroupid" value="' + ((o.gengroupid) ? o.gengroupid : '') + '"></td>' +
                                        '<td>' + ((o.gengroupName) ? o.gengroupName : '') + '</td>' +
                                        '<td>' + ((o.sharePercent) ? o.sharePercent : '') + '</td>' +
                                        '</tr>'
                                }
                            })
                            $('.stockInfoTable').find('tbody').append(stockHtml);
                        }

                        //初始化配电网供电范围
                        var serviceAreaList = data.serviceAreaList;
                        if (serviceAreaList) {
                            var serviceAreaHtml = '';
                            $.each(serviceAreaList, function (i, o) {
                                serviceAreaHtml += '<tr>' +
                                    '<td>' + ((o.voltage) ? o.voltage : '') + '</td>' +
                                    '<td>' + ((o.station) ? o.station : '') + '</td>' +
                                    '<td>' + ((o.masterstation) ? o.masterstation : '') + '</td>' +
                                    '<td>' + ((o.mastercup) ? o.mastercup : '') + '</td>' +
                                    '<td>' + ((o.sumline) ? o.sumline : '') + '</td>' +
                                    '<td>' + ((o.remark) ? o.remark : '') + '</td>' +
                                    '</tr>'
                            });
                            $('.regSeller').find('tbody').append(serviceAreaHtml);
                        }

                        //初始化附件信息
                        var attachmentInfoList = data.affixList
                        if (attachmentInfoList) {
                            var fileHtml = '';
                            $.each(attachmentInfoList, function (i, o) {
                                fileHtml += '<tr>' +
                                    '<td>' + ((o.affixname) ? o.affixname : '') + '</td>' +
                                    '<td>' + ((o.afffixTypeName) ? o.afffixTypeName : '') + '</td>' +
                                    '<td>' + ((o.uploadtime) ? o.uploadtime : '') + '</td>' +
                                    '</tr>'
                            })
                            $('table.powerPlantsInfoTable').find('tbody').append(fileHtml);
                        }

                    }
                }

            });
        },
        /**
         * 获取附件信息
         * @private
         */
        _initFile: function () {
            var scope = this;
            var participantId = $('input[name=participantId]').val();
            $.post(scope.ctx + "/dljyzx/baRegSeller/queryFileList", {participantId: participantId}, function (data) {
                if (data && data.length > 0) {
                    $('#fileTable2').find('input').each(function (i,o) {
                        var name=$(o).attr('name');

                    })
                    $.each(data, function (i, o) {
                        var fileType = o.affixtype;//文件类型
                        var guid = o.guid;//文件id
                        var _inputGuid = $('input[name="name_' + fileType + '"]');
                        _inputGuid.val(guid);
                        _inputGuid.next().hide();
                        // _inputGuid.parent().find('.fileDetle').show();
                        _inputGuid.parent().find('.fileDown').show();
                        _inputGuid.parent().find('.fileDown').prev().hide();
                    })
                }
            })
        },
        _bindEvents: function () {
            var scope=this;
            //点击股东
            $('#gudong').on('click', function () {
                var participantId = $('input[name=participantId]').val();
                var url = ctx + "/dljyzx/basicInfo/powerPlantsInfo/sellerIndex?type=1&participantId=" + participantId + "&processFlag=processFlag&sign="+scope.sign;
                // 全局弹出
                top.$.jBox("iframe:" + url, {
                    title: "股东信息",
                    width: 850,
                    height: 400,
                    iframeScrolling: 'no',
                    buttons: {},
                    closed: function () {
                    },
                    loaded: function (h) {
                        $(".jbox-content", top.document).css("overflow-y", "hidden");
                    }

                });
            });
            //点击从业人员信息
            $('#people').on('click', function () {
                var participantId = $('input[name=participantId]').val();
                var url = ctx + "/dljyzx/basicInfo/powerPlantsInfo/peopleInfoList?type=3&participantId=" + participantId + "&processFlag=processFlag&sign="+scope.sign;
                // 全局弹出
                top.$.jBox("iframe:" + url, {
                    title: "从业人员配置信息",
                    width: 1200,
                    height: 550,
                    iframeScrolling: 'no',
                    buttons: {},
                    closed: function () {
                    },
                    loaded: function (h) {
                        $(".jbox-content", top.document).css("overflow-y", "hidden");
                    }

                });
            });
            //点击配电网基本信息
            $('#energy').on('click', function () {
                var participantId = $('input[name=participantId]').val();
                var url = ctx + "/dljyzx/basicInfo/powerPlantsInfo/sellerList?participantId=" + participantId + "&processFlag=processFlag&sign="+scope.sign;

                // 全局弹出
                top.$.jBox("iframe:" + url, {
                    title: "供电范围信息",
                    width: 850,
                    height: 550,
                    iframeScrolling: 'no',
                    buttons: {},
                    closed: function () {
                    },
                    loaded: function (h) {
                        $(".jbox-content", top.document).css("overflow-y", "hidden");
                    }

                });
            });
            //点击下载
            $('.fileDown').each(function (i,o) {
                $(o).on('click',function () {
                    var guid=$(this).prev().prev().val();
                    var url = top.ctx + "/dljyzx/baRegSeller/downLoadFile?sourceGuid="
                        + guid;
                    //打开下载窗口
                    window.open(url, "_parent");
                })
            })
        }


    })

    $(function () {
        new registSeller();
    })
}()