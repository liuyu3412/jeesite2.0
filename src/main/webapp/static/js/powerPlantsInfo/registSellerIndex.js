!function () {
    var registSellerIndex = function () {
        this._create();

    }
    $.extend(registSellerIndex.prototype, {
        _create: function () {
            $('#themeSwitch', window.parent.document).prev().remove();
            $('#themeSwitch', window.parent.document).remove();
            var ctx = top.ctx;
            this.ctx = ctx;
            this.isAddPeople = true;
            var checkCode=$('input[name=checkCode]').val();
            this.checkCode=checkCode;
            this._initMes();
            this._bindEvents();
            this._inttRelation()
            this._initFile();
            this._queryProcess();
        },
        /**
         * 初始化页面信息
         * @private
         */
        _initMes: function () {
            var scope = this;
            var participantId = $('input[name=participantId]').val();
            var officialFlag = $('input[name=officialFlag]').val();//生效的电力用户登陆标识
            var flag = $('input[name=flag]').val();
            var flowFlag = $('input[name=flowFlag]').val();
            var processFlag = $('input[name=processFlag]').val();
            var acceptStatus = $('input[name=acceptStatus]').val();//当前用户的状态 0：待审批 1 驳回 2撤销 3通过 4审批中
            var url = "";
            if (officialFlag) {

                $('.isHead').show();
                url = scope.ctx + "/dljyzx/baRegSeller/querySellerList";
                if (flag == '1') {
                    $('.remark').text("当前是已生效的市场成员信息");
                } else if (flag == '2') {
                    $('.remark').text("当前市场成员信息正处于变更编辑中，还未提交审核");
                } else if (flag == '3') {
                    if (flowFlag) {
                        if (flowFlag == '1') {//如果流程ID为第一步的的情况下(说明在本人手上)，保存和提交审核都存在
                            $('#save').show();
                            $('#sub').show();
                        } else if (flowFlag == '2') {//如果流程在第二步的情况下，只能撤回
                            $('#cannel').show();
                            $('#save').hide();
                            $('#sub').hide();
                        } else {//如果流程走到第三步或以上的情况下，只能查看，所有操作都禁止
                            $('#cannel').hide();
                            $('#save').hide();
                            $('#sub').hide();
                        }
                    }
                    $('.remark').text("当前变更的市场成员信息已提交，正等待交易中心审批。");
                }
            } else {
                $('#sub').hide();
                url = scope.ctx + "/dljyzx/basicInfo/powerPlantsInfo/queryBaRegSeller";
                //判断该是否在流程中
                if(acceptStatus=='2'||acceptStatus=='4'){
                    $('#save').remove();
                }
            }

            $.ajax({
                url: url,
                type: "post",
                async: false,
                data: {
                    participantId: participantId
                },
                dataType: "json",
                success: function (data) {
                    if (data && data.entity) {
                        var entity = data.entity;
                        scope.sign=data.sign;
                        var selltype = entity.selltype;
                        if (selltype == "01") {
                            $(".isShowTd").show();
                        } else {
                            $(".isShowTd").hide();
                        }
                        var geogrregionName = data.geogrregionName;
                        $('#form').find('input').each(function (i, o) {
                            var name = $(o).attr("name");
                            $(o).val(entity[name]);
                        })
                        $('#selltype').val(entity.selltype);
                        $('#busoperate').val(entity.busoperate);//经营范围
                        $('#powerGridBackGroud').val(entity.powerGridBackGroud);//具有电网公司背景
                        $('#geogrregionidName').val(geogrregionName);
                        // $('#geogrregionIdName').val(geogrregionName);
                        $('input[name=hiddenGeogrregionName]').val(geogrregionName);
                        $('#enterprisetype').val("0"+entity.enterprisetype);//企业性质
                        if(entity.tradebelong==99){
                            $('#tradebelong').val(entity.tradebelong);//所属行业
                        }else{
                            $('#tradebelong').val("0"+entity.tradebelong);//所属行业
                        }
                        if (entity.powersupplycorpname) {
                            var powersupplycorpname = entity.powersupplycorpname;
                            if (entity.gdj == '95412' || entity.gdj == '100003000000011') {
                                $('input[name=gdjName]').val("江苏省公司")
                            } else {
                                $('input[name=gdjName]').val(powersupplycorpname.substr(0, powersupplycorpname.indexOf("供")));//主要办公地址
                            }


                        }
                        $('input[name=gdj]').val(entity.gdj);//主要办公地址id
                        $('input[name=participantId]').val(entity.participantid);
                        $('#attribution').val(entity.attribution);//属地
                        //01 有配网运营权售电公司,  02 无配网运营权售电公司
                        if (entity.selltype == '02') {
                            $('#energy').hide();
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
                    $.each(data, function (i, o) {
                        var fileType = o.affixtype;//文件类型
                        var guid = o.guid;//文件id
                        var _inputGuid = $('input[name="name_' + fileType + '"]');
                        _inputGuid.val(guid);
                        _inputGuid.next().hide();
                        _inputGuid.parent().find('.fileDetle').show();
                        _inputGuid.parent().find('.fileDown').show();
                    })
                }
            })
        },
        /**
         * 初始化联系人信息
         * @private
         */
        _inttRelation: function () {
            var _this = this;
            _this.isAddPeople = true;
            $('#resultTable').find('tbody').empty();
            $.post(top.ctx + "/dljyzx/baRegSeller/queryLinkMan", {participantid: $('input[name=participantId]').val()}, function (data) {
                var relationHtml = '';
                if (data && data.length > 0) {
                    $.each(data, function (i, o) {
                        //常用联系人的标识
                        if (o.iscommon == 1) {
                            _this.isAddPeople = false;
                        }
                        relationHtml += '<tr><td>' + ((o.linkman) ? o.linkman : '') + '</td>' +
                            '<td>' + ((o.position) ? o.position : '') + '</td>' +
                            '<td>' + ((o.telephone) ? o.telephone : '') + '</td>' +
                            '<td>' + ((o.faxphone) ? o.faxphone : '') + '</td>' +
                            '<td>' + ((o.officephone) ? o.officephone : '') + '</td>' +
                            '<td>' + ((o.iscommon == 1) ? '是' : '否') + '</td>' +
                            '<td>' + ((o.email) ? o.email : '') + '</td>' +
                            '<td>' +
                            '<a data-action="delete" href="#"  isDelete="' + o.guid + '" class="link">删 除</a>' +
                            ' <a data-action="edit" href="#"  isCommon="'+o.iscommon+'" isEdit="' + o.guid + '" class="link">修 改</a>' +
                            '</td>' +
                            '</tr>'
                    })
                } else {
                    relationHtml = '<td colspan="6">暂无信息</td>'
                }

                $('#resultTable').find('tbody').append(relationHtml);
                //联系人点击删除
                $('#resultTable').find('a[data-action="delete"]').each(function (i, o) {
                    $(o).on('click', function () {
                        var scope = $(this);
                        var guid = $(this).attr('isDelete');
                        top.jBox.confirm('确定删除该联系人？', '', function (v, h, f) {
                            if (v == 'ok') {
                                $.post(top.ctx + "/dljyzx/baRegSeller/deleteRelation?checkcode="+_this.checkCode, {guid: guid}, function (data) {
                                    top.jBox.alert('删除成功');
                                    _this._inttRelation();
                                })
                            }
                            return true;
                        }, {
                            loaded: function (h) {
                                scope.focus();
                            }
                        });
                    })
                });

                //联系人点击修改
                $('#resultTable').find('a[data-action="edit"]').each(function (i, o) {
                    var participantId = $('input[name=participantId]').val();
                    $(o).on('click', function () {
                        var guid = $(this).attr('isEdit');
                        var isCommon = $(this).attr('isCommon');//判断是否是常用联系人
                        var url = top.ctx + "/dljyzx/baRegSeller/addContactDetailsInfojsp?guid=" + guid + "&participantId=" + participantId + "&isAddPeople=" + _this.isAddPeople+"&isCommon="+isCommon;
                        //全局弹出
                        top.$.jBox("iframe:" + url, {
                            title: "新增联系人",
                            width: 900,
                            height: 565,
                            buttons: {},
                            closed: function () {
                                var realtionPersonFlag = localStorage.getItem("realtionPersonFlag");//判断是否修改成功
                                if (realtionPersonFlag) {
                                    top.jBox.alert('保存成功');
                                    localStorage.removeItem("realtionPersonFlag");
                                }
                                _this._inttRelation();
                            },
                            loaded: function (h) {
                                $(".jbox-content", top.document).css("overflow-y", "hidden");
                            }
                        });

                    })
                })
            })
        },
        /**
         * 绑定事件
         * @private
         */
        _bindEvents: function () {
            var scope = this;
            var ctx = top.ctx;
            var participantId = $('input[name=participantId]').val()
            $("#selltype").change(function () {
                if ($("#selltype").val() == "02") {
                    $("#energy").hide();
                } else if ($("#selltype").val() == "01") {
                    $("#energy").show();
                }
            });
            //点击添加联系人
            $("#addContact").click(function () {
                isFreshFlag = "1";
                var url = top.ctx + "/dljyzx/baRegSeller/addContactDetailsInfojsp?participantId=" + participantId + "&isAddPeople=" + scope.isAddPeople;
                //全局弹出
                top.$.jBox("iframe:" + url, {
                    title: "新增联系人",
                    width: 800,
                    height: 565,
                    buttons: {},
                    closed: function () {
                        scope._inttRelation();
                    },
                    loaded: function (h) {
                        $(".jbox-content", top.document).css("overflow-y", "hidden");
                    }
                });
            });

            //点击股东
            $('#gudong').on('click', function () {
                var officialFlag = $('input[name=officialFlag]').val();//生效的电力用户登陆标识
                var url = ctx + "/dljyzx/basicInfo/powerPlantsInfo/sellerIndex?type=1&participantId=" + participantId + "&registFlag=registFlag"+"&sign="+scope.sign;
                if (officialFlag) {
                    url += "&officialFlag=officialFlag";
                }
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
                var officialFlag = $('input[name=officialFlag]').val();//生效的电力用户登陆标识
                var url = ctx + "/dljyzx/basicInfo/powerPlantsInfo/peopleInfoList?type=3&participantId=" + participantId + "&registFlag=registFlag&sign="+scope.sign;
                if (officialFlag) {
                    url += "&officialFlag=officialFlag";
                }
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
                var url = ctx + "/dljyzx/basicInfo/powerPlantsInfo/sellerList?participantId=" + participantId + "&registFlag=registFlag&sign="+scope.sign;

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
            //点击文件删除
            $('.fileDetle').each(function (i, o) {
                $(o).on('click', function () {
                    var _this = $(this);
                    var guid = _this.parent().find('input').val();
                    top.jBox.confirm('确定删除该文件？', '', function (v, h, f) {
                            if (v == 'ok') {
                                $.post(top.ctx + "/dljyzx/baRegSeller/deleteFlie?checkcode="+scope.checkCode, {guid: guid}, function (data) {
                                    if (data.flag) {
                                        _this.prev().show();
                                        _this.hide();
                                        _this.next().hide();
                                        _this.parent().find('input').val('')
                                        top.jBox.alert('删除成功');
                                    } else {
                                        top.jBox.alert('删除失败');
                                    }
                                })
                            }
                        }
                    )

                })
            });
            //点击文件下载
            $('.fileDown').each(function (i, o) {
                $(o).on('click', function () {
                    var _this = $(this);
                    var guid = _this.parent().find('input').val();
                    var url = top.ctx + "/dljyzx/baRegSeller/downLoadFile?sourceGuid="
                        + guid;
                    //打开下载窗口
                    window.open(url, "_parent");
                })
            });
            //点击提交
            $('#save').on('click', function () {
                var participantid = $('input[name=participantId]').val();
                var officialFlag = $('input[name=officialFlag]').val();//生效的电力用户登陆标识
                var geogrregionid = $('input[name=geogrregionid]').val();//公司工商注册所在地id
                var attribution = $('#attribution').val();//属地
                var managerid = $('#managerid').val();//业务范围
                var selltype = $('#selltype').val();//售电公司类型
                var gdjId = $('#gdjId').val();//主要办公地址

                var name_23 = $('input[name=name_23]').val();//信用承诺书
                var name_0 = $('input[name=name_0]').val();//工商营业执照
                var name_19 = $('input[name=name_19]').val();//资产总额证明
                var name_27 = $('input[name=name_27]').val();//场所信息
                var name_9 = $('input[name=name_9]').val();//银行开户许可证
                var name_17 = $('input[name=name_17]').val();//企业法人代表身份证扫描件
                var name_26 = $('input[name=name_26]').val();//信用中国公示材料
                var name_32 = $('input[name=name_32]').val();//公司章程
                var name_1 = $('input[name=name_1]').val();//电力业务许可证
                var name_36 = $('input[name=name_36]').val();//技术信息支持系统等证明
                if (!name_23) {
                    top.$.jBox.alert("请先上传信用承诺书！", '消息');
                    return false;
                }
                if (!name_0) {
                    top.$.jBox.alert("请先上传工商营业执照！", '消息');
                    return false;
                }
                if (!name_19) {
                    top.$.jBox.alert("请先上传资产总额证明！", '消息');
                    return false;
                }
                if (!name_27) {
                    top.$.jBox.alert("请先上传场所信息！", '消息');
                    return false;
                }
                if (!name_9) {
                    top.$.jBox.alert("请先上传银行开户许可证！", '消息');
                    return false;
                }
                if (!name_17) {
                    top.$.jBox.alert("请先上传企业法人代表身份证扫描件！", '消息');
                    return false;
                }
                if (!name_26) {
                    top.$.jBox.alert("请先上传信用中国公示材料！", '消息');
                    return false;
                }
                if (!name_32) {
                    top.$.jBox.alert("请先上传公司章程！", '消息');
                    return false;
                }
                if($("#selltype").val()=="01"){
                    if (!name_1) {
                        top.$.jBox.alert("请先上传电力业务许可证！", '消息');
                        return false;
                    }
                }

                if (!name_36) {
                    top.$.jBox.alert("请先上传技术信息支持系统等证明！", '消息');
                    return false;
                }

                //统一社会信用代码是否被使用
                var _businesscode = $('input[name=businesscode]').val();
                var codeFlag = scope._checkBusinessCode(_businesscode);
                if (!codeFlag) {
                    top.jBox.alert('该统一社会信用代码已经被使用');
                    return false;
                }
                if (!geogrregionid) {
                    top.jBox.alert("公司工商注册所在地不能为空");
                    return false;
                }
                if (!attribution || attribution == '95888') {
                    top.jBox.alert("属地不能为空");
                    return false;
                }
                if (!managerid) {
                    top.jBox.alert("业务范围不能为空");
                    return false;
                }
                if (!selltype) {
                    top.jBox.alert("售电公司类型不能为空");
                    return false;
                }
                if(selltype=='01'){
                    var licencecode=$('input[name=licencecode]').val();
                    var dateofissue=$('input[name=dateofissue]').val();
                    var expirationdate=$('input[name=expirationdate]').val();
                    if(!licencecode){
                        top.jBox.alert("电力业务许可证编号不能为空");
                        $('input[name=licencecode]').focus();
                        return false;
                    }
                    if(!dateofissue){
                        top.jBox.alert("许可证生效日期不能为空");
                        $('input[name=dateofissue]').focus();
                        return false;
                    }
                    if(!expirationdate){
                        top.jBox.alert("许可证失效日期不能为空");
                        $('input[name=expirationdate]').focus();
                        return false;
                    }
                }
                // if (!gdjId) {
                //     top.jBox.alert("主要办公地址不能为空");
                //     return false;
                // }

                //  判断联系人是否有常用联系人
                if (!scope._checkRelationList(participantid)) {
                    top.jBox.alert("联系人中必须有常用联系人")
                    return false;
                }
                //判断从业人员是否完善
                if (!scope._checkPeopleInfo(participantid)) {
                    if (scope.withoutFlag) {
                        top.jBox.alert("无电网运营权的售电公司需要从业人员中包含至少一个高级职称等级和三个中级职称等级")
                    } else if (scope.existFlag) {
                        top.jBox.alert("有配网运营权的售电公司需要从业人员中包含两个高级职称等级和五个中级职称等级");
                    }
                    return false;
                }
                ;
                //售电公司类型  01 有配网运营权售电公司,  02 无配网运营权售电公司 无电网运营权从业人员配置至少一高三中职称约束，有配网运营权两高五中约束
                var selltype = $('#selltype').val();
                //从业人员人数
                var peopleSize = scope.relationSize;
                if (selltype == '01') {
                    if (peopleSize <= 19) {
                        top.jBox.alert("从业人员不能少于20")
                        return false;
                    }
                } else if (selltype == '02') {
                    if (peopleSize <= 9) {
                        top.jBox.alert("从业人员不能少于10")
                        return false;
                    }
                }


                var json = {}
                json.participantid = participantid
                var isValidated = $('#form').form('validate');
                if (isValidated) {
                    $('#form').find('input').each(function (i, o) {
                        var name = $(o).attr('name');
                        if (name == 'geogrregionId') {
                            json.geogrregionid = $(o).val();
                        } else if (name == 'geogrregionName' || name == 'gdjName') {

                        } else if (name == 'dateOfissue' || name == 'expirationdate' || name == 'starteffectivedate' || name == 'founddate') {
                            var newName = "string" + name;
                            json[newName] = $(o).val();
                        } else {
                            json[name] = $(o).val();
                        }

                    });
                    json.attribution = $('#attribution').val();//属地
                    json.managerid = $('#managerid').val();//业务范围
                    json.selltype = $('#selltype').val();//售电公司类型
                    json.powerGridBackGroud = $('#powerGridBackGroud').val();//售电公司类型
                    json.busoperate = $('#busoperate').val();//经营范围
                    json.gdj = $('#gdjId').val();//经营范围
                    json.tradebelong = $('#tradebelong').val();//所属行业
                    json.enterprisetype = $('#enterprisetype').val();//企业性质
                    var url = "";
                    if (officialFlag) {
                        url = "/dljyzx/baRegSeller/saveBaRegMarket?checkcode="+scope.checkCode
                    } else {
                        url = "/dljyzx/baRegSeller/saveOrUpload?checkcode="+scope.checkCode;
                    }
                    $.ajax({
                        url: top.ctx + url,
                        data: json,
                        type: "post",
                        dataType: "json",
                        success: function (data) {
                            if (data > 0) {
                                if (officialFlag) {
                                    top.jBox.alert('保存成功');
                                } else {
                                    top.jBox.alert('提交成功');
                                }

                            }
                        }

                    });

                } else {
                    return false;
                }

            });

            //点击提交
            $('#sub').on('click', function () {
                var participantid = $('input[name=participantId]').val();
                var officialFlag = $('input[name=officialFlag]').val();//生效的电力用户登陆标识
                var json = {}
                json.participantid = participantid
                var isValidated = $('#form').form('validate');
                if (isValidated) {
                    //  判断联系人是否有常用联系人
                    if (!scope._checkRelationList(participantid)) {
                        top.jBox.alert("联系人中必须有常用联系人")
                        return false;
                    }
                    //统一社会信用代码是否被使用
                    var _businesscode = $('input[name=businesscode]').val();
                    var codeFlag = scope._checkBusinessCode(_businesscode);
                    if (!codeFlag) {
                        top.jBox.alert('该统一社会信用代码已经被使用');
                        return false;
                    }
                    //判断从业人员是否完善
                    if (!scope._checkPeopleInfo(participantid)) {
                        if (scope.withoutFlag) {
                            top.jBox.alert("无电网运营权的售电公司需要从业人员中包含至少一个高级职称等级和三个中级职称等级")
                        } else if (scope.existFlag) {
                            top.jBox.alert("有配网运营权的售电公司需要从业人员中包含两个高级职称等级和五个中级职称等级");
                        }
                        return false;
                    };
                    //售电公司类型  01 有配网运营权售电公司,  02 无配网运营权售电公司 无电网运营权从业人员配置至少一高三中职称约束，有配网运营权两高五中约束
                    var selltype = $('#selltype').val();
                    //从业人员人数
                    var peopleSize = scope.relationSize;
                    if (selltype == '01') {
                        if (peopleSize <= 19) {
                            top.jBox.alert("从业人员不能少于20")
                            return false;
                        }
                    } else if (selltype == '02') {
                        if (peopleSize <= 9) {
                            top.jBox.alert("从业人员不能少于10")
                            return false;
                        }
                    }
                    $('#form').find('input').each(function (i, o) {
                        var name = $(o).attr('name');
                        if (name == 'geogrregionId') {
                            json.geogrregionid = $(o).val();
                        } else if (name == 'geogrregionName' || name == 'gdjName') {

                        } else if (name == 'dateofissue' || name == 'expirationdate' || name == 'starteffectivedate' || name == 'founddate') {
                            var newName = "string" + name;
                            json[newName] = $(o).val();
                        } else {
                            json[name] = $(o).val();
                        }

                    });
                    json.attribution = $('#attribution').val();//属地
                    json.managerid = $('#managerid').val();//业务范围
                    json.selltype = $('#selltype').val();//售电公司类型
                    json.powerGridBackGroud = $('#powerGridBackGroud').val();//售电公司类型
                    json.busoperate = $('#busoperate').val();//经营范围
                    var url = "/dljyzx/baRegSeller/saveBaRegMarket?checkcode="+scope.checkcode
                    $.ajax({
                        url: top.ctx + url,
                        data: json,
                        type: "post",
                        dataType: "json",
                        success: function (data) {
                            if (data > 0) {
                                scope._startFlow($('#participantname').val());

                            }
                        }

                    });

                } else {
                    return false;
                }

            });

            //点击撤销
            $('#cannel').on('click', function () {
                var businessId = $('input[name=businessId]').val();
                top.jBox.confirm('确定撤销该流程？', '', function (v, h, f) {
                    if (v == 'ok') {
                        $.post(top.ctx + "/dljyzx/baWaitdo/delete?checkcode="+scope.checkCode, {businessId: businessId}, function (data) {
                            if (data > 0) {
                                top.$.jBox.tip('取消成功');
                                window.location.href = top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/powerPlantsInfo";
                            }
                        })
                    }
                    return true;
                })

            });

            //模板点击下载
            $('#art4').on('click', function () {
                var url = top.ctx + "/dljyzx/baRegSeller/downcommitment";
                //打开下载窗口
                window.open(url, "_parent");
            });


            //判断统一社会信用代码是否唯一
            $('input[name=businesscode]').on('change', function () {
                var _businesscode = $(this).val();
                var codeFlag = scope._checkBusinessCode(_businesscode);
                if (!codeFlag) {
                    top.jBox.alert('该统一社会信用代码已经被使用');
                }
            });

            //选择售电公司类型
            $('#selltype').on('change', function () {
                var selltype = $("#selltype").val();
                if (selltype == "01") {
                    $(".isShowTd").show();
                    $("#licencecode").attr("class", "easyui-validatebox");
                    $("#licencecode").focus();
                    $.parser.parse('body');
                } else {
                    $(".isShowTd").hide();
                    $("#licencecode").removeAttr("class");
                }
                $(this).focus();
            })

        },
        /**
         * 判断联系人是否有常用联系人
         * @param participantid
         * @private
         */
        _checkRelationList: function (participantid) {
            var scope = this;
            var flag = false;
            $.ajax({
                url: top.ctx + "/dljyzx/baRegSeller/queryRelationList",
                type: "post",
                async: false,
                dataType: "json",
                data: {
                    "participantid": participantid,
                },
                success: function (data) {
                    if (data && data.length > 0) {

                        for (var i = 0; i < data.length; i++) {
                            if (data[i].iscommon == 1) {
                                flag = true;
                                break;
                            }
                        }
                    }
                }
            });
            return flag;
        },

        /**
         * 获取从业人员的职称等级
         * @param participantid
         * @private
         *
         */
        _checkPeopleInfo: function (participantid) {
            var scope = this;
            var flag = true;
            var list = [];
            $.ajax({
                url: top.ctx + "/dljyzx/baRegSeller/querySellerPersonList",
                type: "post",
                dataType: "json",
                async: false,
                data: {
                    "participantid": participantid,
                },
                success: function (rc) {
                    if (rc) {
                        scope.relationSize = rc.length;
                        for (var i = 0; i < rc.length; i++) {
                            list.push(rc[i].professortitle);
                        }
                    }
                }
            });
            var highCount = 0;//高级人员
            var middleCount = 0;//中级人员
            for (var i = 0; i < list.length; i++) {
                if (list[i] == "高级") {
                    highCount++;
                } else if (list[i] == "中级") {
                    middleCount++;
                }
            }
            //售电公司类型  01 有配网运营权售电公司,  02 无配网运营权售电公司 无电网运营权从业人员配置至少一高三中职称约束，有配网运营权两高五中约束
            var selltype = $('#selltype').val();
            if (selltype == '01') {
                if (highCount >= 2) {
                    var count = highCount + middleCount;
                    if (count < 7) {
                        scope.existFlag = true;
                        flag = false;
                    }
                } else {
                    scope.existFlag = true;
                    flag = false;
                }
                // if (highCount < 2 || middleCount < 5) {
                //     scope.existFlag = true;
                //     flag = false;
                // }
            } else if (selltype == '02') {
                if (highCount >= 1) {
                    var count = highCount + middleCount;
                    if(count<4){
                        scope.withoutFlag = true;
                        flag = false;
                    }
                } else {
                    scope.withoutFlag = true;
                    flag = false;
                }
                // if (highCount == 0 || middleCount <= 2) {
                //     scope.withoutFlag = true;
                //     flag = false;
                // }
            }
            return flag;
        },

        _startFlow: function (participantname) {
            var ctx = top.ctx;
            var scope = this;
            var leverList = "";
            $.ajax({
                url: ctx + "/dljyzx/flow/getFlowInfo",
                type: "post",
                async: false,
                success: function (data) {
                    if (!data.count > 0) {
                        return;
                    } else {
                        var gdj = $('input[name=gdj]').val();
                        var rcCount = data.count;
                        $.ajax({
                            url: ctx + "/dljyzx/flow/gdjcj",
                            async: false,
                            data: {
                                gdj: gdj
                            },
                            type: "post",
                            dataType: "json",
                            success: function (msg) {
                                if (msg.length > 0) {
                                    leverList = msg;
                                }
                            }
                        });
                        if (rcCount == 0) {
                            top.jBox.alert('消息', "请先定义一个外网侧的流程");
                            return;
                        } else if (rcCount != 1) {
                            top.jBox.alert('消息', "外网侧的流程只能定义一个!");
                            return;
                        } else {
                            scope._getFlowNodeInfo(data, leverList, participantname)
                        }
                    }
                }

            });
        },
        _getFlowNodeInfo: function (data, leverList, participantname) {
            var ctx = top.ctx;
            var scope = this;
            $.ajax({
                url: ctx + "/dljyzx/flow/getFlowNodeInfo",
                type: "post",
                data: {
                    flowid: data.flowid
                },
                async: false,
                success: function (v) {
                    if (!v.result) {
                        top.jBox.info('消息', "请先配置下一个流程节点");
                        return;
                    } else if (!v.jsname) {
                        top.jBox.info('消息', "请先配置下一个节点接收人！");
                        return;
                    } else {
                        scope._initTree(data, leverList, participantname);
                    }

                }
            });
        },
        _initTree: function (getFlowInfo, leverList, participantname) {
            var scope = this;
            var ctx = top.ctx;
            var url = "/dljyzx/flow/choosePerson";
            var participantCode = $("#participantCode").val();
            var flowid = getFlowInfo.flowid;
            var flowName = getFlowInfo.flowname;
            var flowInstName = flowName + "_" + participantname;
            var level1 = leverList[0][2];
            var level2 = leverList[0][3];
            var level3 = leverList[0][4];
            var participantId = $('input[name=participantId]').val();
            top.$.jBox.open("iframe:" + ctx + "/tag/treeProcess?url=" + encodeURIComponent(url)
                + "&flowNodeInstId=" + participantCode + "&flowid=" + flowid, "人员信息", 300, 420, {
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
                            break; // 如果为非复选框选择，则返回第一个选择  </c:if>
                        }
                        if (ids.length <= 0) {
                            top.$.jBox.alert('请选择下一个节点接收人！', "消息");
                            return false;
                        }
                        $.ajax({
                            url: ctx + "/dljyzx/flow/sendSellertPartFlow",
                            type: "post",
                            data: {
                                flowid: flowid,
                                flowName: flowName,
                                flowInstName: flowInstName,
                                participantId: participantId,
                                level1: level1,
                                level2: level2,
                                level3: level3,
                                userIds: ids.toString(),
                            },
                            async: false,
                            success: function (v) {
                                if (v && v == 'success') {
                                    top.$.jBox.tip('提交成功');
                                    window.location.href = top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/powerPlantsInfo";
                                } else {
                                    top.$.jBox.error('提交失败');
                                }

                            }
                        });
                    }
                    else if (v == "clear") {
                    }
                },
                loaded: function (h) {
                    $(".jbox-content", top.document).css("overflow-y", "hidden");
                }
            });
        },
        /**
         * 判断统一社会信用代码是否唯一
         * @param businesscode
         * @param participantType
         * @private
         */
        _checkBusinessCode: function (businesscode) {
            var participantId = $('input[name=participantId]').val();
            var scope = this;
            var flag = true;
            $.ajax({
                url: scope.ctx + "/dljyzx/baRegSeller/queryCount",
                type: "post",
                dataType: "json",
                async: false,
                data: {
                    businesscode: businesscode,
                    participantId: participantId
                },
                success: function (data) {
                    // var regSeller = data.regSeller;
                    var seller = data.seller;
                    if (seller.length > 0) {
                        flag = false;
                    }
                    // else {
                    //     if (regSeller.length > 0) {
                    //         if (regSeller.length == 1) {
                    //             var participantid = regSeller[0].participantid;
                    //             var participantidTwo = $('input[name=participantId]').val()
                    //             if (participantid != participantidTwo) {
                    //                 flag = false;
                    //             }
                    //         } else {
                    //             flag = false;
                    //         }
                    //
                    //     }
                    // }

                }
            });
            return flag;
        },

        /**
         * 查询该售电公司是否在流程中
         * @private
         */
        _queryProcess:function () {
            var participantId = $("input[name=participantId]").val();
            $.ajax({
                url: top.ctx + '/dljyzx/baRegSeller/queryProcess',
                type: "post",
                dataType: "json",
                async: false,
                data: {participantId: participantId},
                success: function (data) {
                    if(data&&data.length>0){
                        if(data[0]==1){
                            $('#save').remove();
                        }
                    }
                }
            })
        }



        // /**
        //  * 初始化售电公司
        //  */
        // _initSeller:function () {
        //     var participantId=$('input[name=participantId]').val()
        //     $.ajax({
        //         url: top.ctx + '/dljyzx/myPlan/directTradeDeclare/getCloseDate',
        //         type: "post",
        //         dataType: "json",
        //         async: false,
        //         data: {participantId:participantId},
        //         success:function (data) {
        //
        //         }
        //     })
        // }
    })

    $(function () {
        new registSellerIndex();
        setTimeout(function () {
            var docHeight = $("#main").height() + 800;
            top.wSizeByDoc(docHeight);
            $("#main").parent().parent().removeAttr('style')
        }, 100)
    })
}()