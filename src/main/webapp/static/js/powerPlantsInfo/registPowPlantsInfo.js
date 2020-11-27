var saved=false;
!function () {
    var registPowPlantsInfo = function () {
        this._create();
    }
    $.extend(registPowPlantsInfo.prototype, {
        _create: function () {
            $('#themeSwitch', window.parent.document).prev().remove();
            $('#themeSwitch', window.parent.document).remove();
            var checkCode=$('input[name=checkCode]').val();
            this.checkCode=checkCode;
            var ctx = top.ctx;
            this.ctx = ctx;
            this.isAddPeople=true;
            this._initMes();
            this._bindEvents();
            this._inttRelation();
            this._initFile();
            var docHeight = $("#main").height() + 1000;
            top.wSizeByDoc(docHeight);
        },
        /**
         * 初始化页面信息
         * @private
         */
        _initMes: function () {
            var scope = this;
            var participantId = $('input[name=participantId]').val();
            var roleType = $('input[name=roleType]').val();//用户类型 发电企业2  售电公司6 电力用户0
            var fdqyForm = $('#fdqyForm');//发电企业form
            fdqyForm.serializeArray()
            var dlyhForm = $('#dlyhForm');//电力用户form
            if (roleType == '2' || roleType == '0'|| roleType == '3') {
                $.ajax({
                    url: scope.ctx + "/dljyzx/basicInfo/powerPlantsInfo/queryRegist",
                    type: "post",
                    dataType: "json",
                    async: false,
                    data: {
                        participantId: participantId
                    },
                    success: function (data) {
                        if (data) {
                            $('input[name=participantcode]').val(data.entity.participantcode);
                            $('input[name=marketid]').val(data.entity.marketid);
                            $('input[name=starteffectivedate]').val(data.entity.starteffectivedate);
                            $('input[name=participantType]').val(data.entity.participanttype);
                            if (roleType == '2') {
                                $('#fdqyFile').show();
                                $('.isGqxx').show();
                                $('.dlyhArea').remove();
                                fdqyForm.show();
                                var entity = data.entity;
                                var geogrregionName = data.geogrregionName;
                                fdqyForm.find('input').each(function (i, o) {
                                    var name = $(o).attr('name');
                                    $(o).val(entity[name]);
                                })
                                fdqyForm.find('input[name=geogrregionName]').val(geogrregionName);
                                fdqyForm.find('input[name=gdjName]').val(data.gdjName);
                                fdqyForm.find('input[name=gdlx]').val("直购发电企业");
                                // fdqyForm.find('input[name=geogrregionIdId]').val(geogrregionName);
                                fdqyForm.find('select[name=state]').val(entity.state);
                                fdqyForm.find('select[name=companytype]').val(entity.companyType);
                                fdqyForm.find('select[name=isremitted]').val(entity.isremitted);
                                fdqyForm.find('select[name=rating]').val(entity.rating);
                                fdqyForm.find('select[name=dfdc]').val(entity.dfdc);

                                var isremitted = $("#isremitted").val();
                                if (isremitted == 0) {
                                    $(".isShowTd").show();
                                } else {
                                    $(".isShowTd").hide();
                                }
                            } else if (roleType == '0'||roleType == '3') {
                                $('#dlyhFile').show();
                                $('.fdqyArea').remove();
                                dlyhForm.show();
                                var entity = data.entity;
                                var geogrregionName = data.geogrregionName;
                                dlyhForm.find('input').each(function (i, o) {
                                    var name = $(o).attr('name');
                                    $(o).val(entity[name]);
                                })
                                dlyhForm.find('input[name=geogrregionName]').val(geogrregionName);
                                dlyhForm.find('select[name=state]').val(entity.state);
                                dlyhForm.find('select[name=companytype]').val(entity.companyType);
                                dlyhForm.find('select[name=isremitted]').val(entity.isremitted);
                                dlyhForm.find('input[name=gdjName]').val(data.gdjName);
                                dlyhForm.find('select[name=rating]').val(entity.rating);
                                dlyhForm.find('select[name=dfdc]').val(entity.dfdc);
                                dlyhForm.find('select[name=participanttype]').val(entity.participanttype);
                            }

                        }
                    }
                });
            }

        },
        /**
         * 初始化联系人信息
         * @private
         */
        _inttRelation: function () {
            var _this = this;
            $('#resultTable').find('tbody').empty();
            _this.isAddPeople=true;
            $.ajax({
                url: top.ctx + "/dljyzx/baRegSeller/queryLinkMan",
                type: "post",
                dataType: "json",
                async: false,
                data: {
                    participantid: $('input[name=participantId]').val(),
                    jobNum: $('input[name=jobNum]').val()
                },
                success: function (data) {
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
                                ' <a data-action="delete" href="#"  isDelete="' + o.guid + '" class="link">删 除</a>' +
                                ' <a data-action="edit" href="#" isCommon="'+o.iscommon+'"  isEdit="' + o.guid + '" class="link">修 改</a>' +
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
                            var jobNum=$('input[name=jobNum]').val();
                            top.jBox.confirm('确定删除该联系人？', '', function (v, h, f) {
                                if (v == 'ok') {
                                    $.post(top.ctx + "/dljyzx/baRegSeller/deleteRelation?checkcode="+_this.checkCode, {guid: guid,jobNum:jobNum}, function (data) {
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
                        $(o).on('click', function () {
                            var guid = $(this).attr('isEdit');
                            var isCommon = $(this).attr('isCommon');//判断是否是常用联系人
                            var jobNum=$('input[name=jobNum]').val();
                            var url = top.ctx + "/dljyzx/baRegSeller/addContactDetailsInfojsp?guid=" + guid+"&isAddPeople="+_this.isAddPeople+"&isCommon="+isCommon+"&jobNum="+jobNum;
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
            $.ajax({
                url: scope.ctx + "/dljyzx/baRegSeller/queryFileList",
                type: "post",
                dataType: "json",
                async: false,
                data: {
                    participantId: participantId
                },
                success: function (data) {
                    if (data && data.length > 0) {
                        $.each(data, function (i, o) {
                            var fileType = o.affixtype;//文件类型
                            var guid = o.guid;//文件类型
                            var _inputGuid = $('input[name="name_' + fileType + '"]');
                            _inputGuid.val(guid);
                            _inputGuid.next().hide();
                            _inputGuid.parent().find('.fileDetle').show();
                            _inputGuid.parent().find('.fileDown').show();
                        })
                    }
                }
            });
        },
        /**
         * 绑定事件
         * @private
         */
        _bindEvents: function () {
            var scope = this;
            var fdqyForm = $('#fdqyForm');//发电企业form
            var dlyhForm = $('#dlyhForm');//电力用户form
            var roleType = $('input[name=roleType]').val();//用户类型 发电企业2  售电公司6 电力用户0

            $('#save').on('click', function () {
                var participantType = $('input[name=participantType]').val();//市场成员类型
                //电厂提示用户是否是光伏企业
                if(participantType=="2"){
                    var jobNum = $('input[name=jobNum]').val();
                    var participantId = $('input[name=participantId]').val();
                    var totalPercent = 0;
                    var nullFlag = false;
                    var numFlag = false;
                    var flag = true;
                    $("input[name='sharePercent']").each(function () {
                        //判断是否为空
                        if (!$(this).val()) {
                            nullFlag = true;
                            return
                        } else {
                            if (isNaN(parseFloat($(this).val()))) {
                                numFlag = true;
                                return;
                            } else {
                                totalPercent += parseFloat($(this).val());
                            }
                        }
                    });
                    if (numFlag) {
                        top.jBox.alert('所占股权只能输入数字!');
                        return;
                    }
                    if (nullFlag) {
                        top.jBox.alert('请输入所占股权');
                        return;
                    }
                    if (!flag) {
                        top.jBox.alert('请输入数字');
                        return;
                    }
                    if (totalPercent > 100) {
                        flag = false;
                        top.jBox.alert("股权信息总和不能大于100!");
                        return;
                    }

                    if (totalPercent != 100) {
                        flag = false;
                        top.jBox.alert("股权信息总和必须等于100!");
                        return;
                    }
                    //保存股权信息
                    var groupRelationList = [];
                    var groupRelationFlag = false;
                    $(".percentTr").each(function (i, o) {
                        var json = {};
                        var guid = $(o).find('input[name=groupGuid]').val();//股权主键ID
                        var gengroupid = $(o).find('select[name=gengroupid]').val();//发电集团ID
                        var sharePercent = $(o).find('input[name=sharePercent]').val();//股权
                        var sourceguid = $(o).find('input[name=sourceguid]').val();//源id
                        if (guid) {
                            json.guid = guid;
                        }
                        json.gengroupid = gengroupid;
                        json.sharePercent = sharePercent;
                        if (sourceguid && sourceguid != 'undefined') {
                            json.sourceguid = sourceguid;
                        } else {
                            json.sourceguid = "";
                        }
                        groupRelationList.push(json);
                    })
                    for (var i = 0; i < groupRelationList.length; i++) {
                        for (var j = groupRelationList.length - 1; j > i; j--) {
                            if (groupRelationList[i].gengroupid == groupRelationList[j].gengroupid) {
                                top.jBox.alert("股权信息中不能有重复的发电集团!");
                                groupRelationFlag = true;
                                return;
                            }
                        }
                    }
                    if (groupRelationList.length == 0) {
                        top.jBox.alert("请添加股权信息!");
                        return;
                    } else {
                        if (groupRelationFlag) {
                            top.jBox.alert("股权信息中不能有重复的发电集团!");
                            return;
                        }
                    }
                    //保存股东信息到缓存中
                    $.ajax({
                        type: "post",
                        async: false,
                        url: top.ctx + "/dljyzx/baRegSeller/jsGengroupCache?checkcode=" + scope.checkCode+"&jobNum="+jobNum,
                        data: {
                            json: JSON.stringify(groupRelationList),
                            participantid: participantId
                        },
                    }).done(function(data){
                    }).fail(function(data){
                    });
                    //保存缓存中的 联系人
                    /*$.ajax({
                        url: top.ctx + "/dljyzx/baRegSeller/jsReglinkman?checkcode="+scope.checkCode+"&jobNum="+jobNum,
                        type: "post",
                        async: false,
                        data: {
                            participantid: participantId
                        },
                        success: function (data) {

                        }
                    });*/

                    var genCount=scope._getGenCount(participantId)//判断机组数量是否0
                    if(genCount==0){
                        top.jBox.alert("机组不能为空!")
                        return false;
                    }
                  /*  top.jBox.confirm('是否光伏企业！', '', function (v, h, f) {
                        if (v == 'ok') {*/
                           /* var name_6=$('input[name=name_6]').val();
                            if(!name_6){
                                top.$.jBox.alert("请先上传电价批复文件！", '消息');
                                return true;
                            }*/

                        /*}*/
                        var isremittedValue=$("#isremitted").val();
                        if(isremittedValue==0){
                            var name_1=$('input[name=name_1]').val();
                            if(!name_1){
                                top.$.jBox.alert("请先上传电力业务许可证！", '消息');
                                return true;
                            }
                        }
                        scope._saveMessage();
                        return true;
                   /* },{
                        buttons:{"是":'ok','否':''}
                    });*/
                }else{
                    scope._saveMessage();
                }


            });
            //点击添加联系人
            $("#addContact").click(function () {
                var jobNum=$('input[name=jobNum]').val();
                isFreshFlag = "1";
                var url = top.ctx + "/dljyzx/baRegSeller/addContactDetailsInfojsp?isAddPeople="+scope.isAddPeople+"&jobNum="+jobNum;
                //全局弹出
                top.$.jBox("iframe:" + url, {
                    title: "新增联系人",
                    width: 800,
                    height: 565,
                    buttons: {},
                    closed: function () {
                        var realtionPersonFlag = localStorage.getItem("realtionPersonFlag");//判断是否修改成功
                        if (realtionPersonFlag) {
                            top.jBox.alert('保存成功');
                            localStorage.removeItem("realtionPersonFlag");
                        }
                        scope._inttRelation();
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
                                        _this.prev().prev().val('')
                                        _this.hide();
                                        _this.next().hide();
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

            //选择许可证是否豁免
            $('#isremitted').on('change', function () {
                var isremitted = $("#isremitted").val();
                if (isremitted == 0) {
                    $(".isShowTd").show();
                } else {
                    $(".isShowTd").hide();
                }
            });

            //判断统一社会信用代码是否唯一
            $('input[name=businesscode]').on('blur', function () {
                var _businesscode = $(this).val();
                var participantType = $('input[name=participantType]').val();//市场成员类型
                var codeFlag = scope._checkBusinessCode(_businesscode, participantType);
                if (!codeFlag) {
                    top.jBox.alert('该统一社会信用代码已经被使用');
                }
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
         * 判断统一社会信用代码是否唯一
         * @param businesscode
         * @param participantType
         * @private
         */
        _checkBusinessCode: function (businesscode, participantType) {
            var participantId = $('input[name=participantId]').val();
            var scope = this;
            var flag = true;
            $.ajax({
                url: scope.ctx + "/dljyzx/baRegMarketparticipant/queryList",
                type: "post",
                dataType: "json",
                async: false,
                data: {
                    participanttype: participantType,
                    participantId: participantId,
                    businesscode: businesscode
                },
                success: function (data) {
                    // var regMarket=data.regMarket;//临时表数据
                    var market=data.market;//正式表数据
                    if(data.length>0){
                        flag = false;
                    }
                    // else {
                    //     if (regMarket.length > 0) {
                    //         if (regMarket.length == 1) {
                    //             var participantid = regMarket[0].participantid;
                    //             var participantidTwo = $('input[name=participantId]').val()
                    //             if (participantid != participantidTwo) {
                    //                 flag = false;
                    //             }
                    //         } else {
                    //             flag = false;
                    //         }
                    //     }
                    // }

                }
            });
            return flag;
        },
        /**
         * 获取机组数量
         * @private
         */
        _getGenCount:function (participantId) {
            var scope=this;
            var num=0;
            $.ajax({
               /* url: scope.ctx + "/dljyzx/baRegGenerator/queryCountByGen",*/
                url: scope.ctx + "/dljyzx/baRegGenerator/queryCountByUnit",
                type: "post",
                dataType: "json",
                async: false,
                data: {
                   panId:participantId
                },
                success: function (data) {
                    num=data
                }
            });
            return num;
        },

        _saveMessage:function(){
            var scope = this;
            var fdqyForm = $('#fdqyForm');//发电企业form
            var dlyhForm = $('#dlyhForm');//电力用户form
            var participantType = $('input[name=participantType]').val();//市场成员类型
            var roleType = $('input[name=roleType]').val();//用户类型 发电企业2  售电公司6 电力用户0
            var participantcode = $('input[name=participantcode]').val();//市场成员code
            var marketid = $('input[name=marketid]').val();//市场成员地区ID
            var starteffectivedate = $('input[name=starteffectivedate]').val();
            var participantId = $('input[name=participantId]').val();
            var isValidated = true;
            var json = {};
            json.participantcode = participantcode
            json.marketid = marketid
            json.starteffectivedate = starteffectivedate
            //  判断联系人是否有常用联系人
            if (!scope._checkRelationList(participantId)) {
                top.jBox.alert("联系人中必须有常用联系人")
                return false;
            }
            //统一社会信用代码是否被使用
            var _businesscode = '';
            if (roleType == '2') {
                _businesscode = fdqyForm.find('input[name=businesscode]').val();
            } else if (roleType == '0'||roleType=='3') {
                _businesscode = dlyhForm.find('input[name=businesscode]').val();
            }
            var codeFlag = scope._checkBusinessCode(_businesscode, participantType);
            if (!codeFlag) {
                top.jBox.alert('该统一社会信用代码已经被使用');
                return false;
            }
            //发电企业
            if (roleType == '2') {
                json.jobnum = $('input[name=jobNum]').val();
                isValidated = fdqyForm.form('validate');
                var state = fdqyForm.find('select[name=state]').val();//状态
                var companytype = fdqyForm.find('select[name=companytype]').val();//商业性质
                var isremitted = fdqyForm.find('select[name=isremitted]').val();//许可证是否豁免
                var geogrregionIdId = fdqyForm.find('input[name=geogrregionid]').val();//地理区域ID
                if (isremitted == '0') {
                    var licencecode = $('input[name=licencecode]').val();//电力业务许可证编号
                    var dateofissue = $('input[name=dateofissue]').val();//许可证生效日期
                    var expirationdate = $('input[name=expirationdate]').val();//许可证失效日期
                    var gdj = $('input[name=gdj]').val();//购电结算单位
                    if (!licencecode) {
                        top.jBox.alert('电力业务许可证编号不能为空');
                        $('input[name=licencecode]').focus();
                        return false;
                    }
                    if (!dateofissue) {
                        top.jBox.alert('许可证生效日期不能为空');
                        $('input[name=dateofissue]').focus();
                        return false;
                    }
                    if (!expirationdate) {
                        top.jBox.alert('许可证失效日期不能为空');
                        $('input[name=expirationdate]').focus();
                        return false;
                    }
                    if (!gdj) {
                        top.jBox.alert('购电结算单位不能为空');
                        $('input[name=gdjName]').focus();
                        return false;
                    }
                }
                if (!geogrregionIdId) {
                    top.jBox.alert('地理区域不能为空');
                    $('input[name=geogrregionName]').focus();
                    return false;
                }
                json.participantid = $('input[name=participantId]').val();
                json.participanttype = roleType;
                json.state = state;
                json.companyType = companytype;
                json.isremitted = isremitted;
                json.geogrregionid = geogrregionIdId;
                json.dfdc = $('#dfdc').val();//是否地方发电厂
                json.rating = $('#rating').val();//购电层级
                fdqyForm.find('input').each(function (i, o) {
                    var name = $(o).attr('name');
                    json[name] = $(o).val();
                });
                //请先上传相关附件信息，如果已经上传营业执照（三证合一），则无需上传企业法人工商营业执照、组织机构代码、税务登记证。
                // 反之，上传企业法人工商营业执照、组  织机构代码、税务登记证，就无需上传营业执照（三证合一）！
                var name_18 = $('input[name=name_18]').val();//营业执照（三证合一）
                var name_6 = $('input[name=name_6]').val();//电价批复文件
                var name_4 = $('input[name=name_4]').val();//建设核准文件
                var name_1 = $('#fdqyFile').find('input[name=name_1]').val();//电力业务许可证
                var name_56 = $('input[name=name_56]').val();//合同文本
                var name_10 = $('input[name=name_10]').val();//税务登记证
                if (!name_56) {
                    top.jBox.alert('请上传合同文本');
                    return false;
                };
                if (!name_4) {
                    top.jBox.alert('请上传建设核准文件');
                    return false;
                };
                if (!name_18) {
                    top.jBox.alert('请上传营业执照（三证合一）');
                    return false;
                };
            } else if (roleType == '0'||roleType=='3') {
                isValidated = dlyhForm.form('validate');
                var state = dlyhForm.find('select[name=state]').val();//状态
                var rating = dlyhForm.find('select[name=rating]').val();//购电层级
                // var isremitted = dlyhForm.find('select[name=isremitted]').val();//许可证是否豁免
                var geogrregionIdId = dlyhForm.find('input[name=geogrregionId]').val();//地理区域ID
                json.participantId = $('input[name=participantId]').val();
                json.participanttype = dlyhForm.find('select[name=participanttype]').val();
                json.state = state;groupRelationList
                json.rating = rating;
                // json.companyType = companytype;
                // json.isremitted = isremitted;
                json.geogrregionid = geogrregionIdId;
                dlyhForm.find('input').each(function (i, o) {
                    var name = $(o).attr('name');
                    json[name] = $(o).val();
                });
                var name_29 = $('input[name=name_29]').val();//准入目录文件
                var name_0 = $('#dlyhFile').find('input[name=name_0]').val();//工商营业执照
                if (!name_29) {
                    top.jBox.alert("请上传准入目录文件");
                    return false;
                }
                if (!name_0) {
                    top.jBox.alert("工商营业执照");
                    return false;
                }
            }
           if (isValidated) {
                $.post(top.ctx + "/dljyzx/baRegSeller/saveOrUpdateNew?checkcode="+scope.checkCode, json, function (data) {
                    if (data.flag == 'success'||data>0) {
                        saved=true;
                        top.jBox.alert('保存成功');
                    }
                })
            } else {
                return false;
            }
        }
    })

    $(function () {
        new registPowPlantsInfo();
        // setTimeout(function () {
        //     $("#main").parent().parent().removeAttr('style')
        // }, 100)
    })
}()

//点击文件下载
function fileDown(flag){
    var url ="/homePage/downLoadproveFile?flag="+flag;
    //打开下载窗口
    window.open(url, "_parent");
}
function next() {
    var participanttype = $("#participantType").val();
    if (participanttype == '-1') {
        top.$.jBox.info('请选择市场成员类型', '提示');
        return;
    }
    if (!saved) {
        top.$.jBox.alert("请先保存信息！", '消息');
        return false;
    }
    var participantid = $('input[name=participantId]').val();
    var participantname = $('input[name=participantname]').val();
    var jobnum = $('input[name=jobNum]').val();
    if (participanttype == "2") {
        //发电企业 注册发电组 定制化用于注册驳回后跳转机组列表页面
        window.location.href = top.ctx + "/dljyzx/baRegSeller/baRegGeneratorInfosRegist?type=regist&participantid=" + participantid + "&participantName=" + participantname+ "&jobnum=" + jobnum;
        return true;
    }
}

$(function () {
    var flag = $('input[name=result]').val();//当前企业信息状态
    if (flag =='9') {
        $('.showText').text("当前是已生效的市场成员信息");
    } else if (flag == '0') {
        $('.showText').text("当前变更的市场成员信息已提交，正等待交易中心审批。");
    }
    else if (flag == '1') {
        $('.showText').text($('input[name=Remark]').val());
    }
});