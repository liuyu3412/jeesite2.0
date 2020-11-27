
!function () {
    var baWaitdo = function () {
        this._create();
    }
    $.extend(baWaitdo.prototype, {
        _create: function () {
            this._checkNode();
            this._checkflow();
            this._bindEvent();
            this._flowChartView();
            this._mainViewData();
        },
        /**
         * 判断流程类型
         * @private
         */
        _checkflow:function(){
            var scope=this;
            var flagType = $('input[name=flagType]').val();//流程类型
            var businessid = $('input[name=businessid]').val();//流程类型
            var isAlready = $('input[name=isAlready]').val();//判断是否是已办事项进入
            if(isAlready){
                $('#body').parent().remove();
                $('.isCheck').next().remove();
                $('.isCheck').remove();
            }
            // if(flagType=='04'||flagType=='05'){
            //     $('a[data-action=view]').text('机组变更信息')
            // }
            $.ajax({
                url: top.ctx+"/dljyzx/flow/queryFlowType",
                type: "post",
                async: false,
                dataType: "json",
                data:{
                    businessId:businessid
                },
                success: function (data) {
                    if(data.length>0&&data[0].length>0){
                       var type= data[0][3];
                       //机组
                       if(type=="ba_reg_generator"){
                           scope.flagType="04";
                           $('a[data-action=view]').text('机组变更信息');
                       }else if(type=='ba_sellerchange_approve'){
                           $('a[data-action="view"]').hide();
                           $('.seller').show();
                       }else if(type=='ba_reg_seller'){
                          //售电公司
                           $('a[data-action="view"]').hide();
                           $('.seller').show();
                           scope.isSellerFlag=true;

                       }else if(type=='co_contractaccessory_change'){
                           //合同变更
                           $('a[data-action="view"]').hide();
                           $('.contractaccessory').show();
                           scope.isCo=true;

                       }
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
            var flowFlag = $('input[name=flowFlag]').val();
            var flagType = scope.flagType;
            var ctxUrl = top.ctx;

            //点击机组信息
            $('a[data-action="view"]').on('click', function () {
                var url = "";
                //機組注冊頁面查看詳情 04 为机组
                if(flagType=='04'){
                    $('a[data-action=view]').text('机组变更信息')
                    url = "/dljyzx/baWaitdo/toGeneratorDetails?businessId=" + $('input[name=businessid]').val()+"&flagType="+flagType;
                } else {
                    url = "/dljyzx/baWaitdo/toProcessDetails?businessId=" + $('input[name=businessid]').val();
                }
                var ctx = top.ctx + url
                top.jBox("iframe:" + ctx,
                    {
                        title: '查看详情 ',
                        width: 1100,
                        height: 500,
                        buttons: {},
                        closed: function () {

                        },
                        loaded: function (h) {
                            $(".jbox-content", top.document).css("overflow-y", "hidden");
                        }

                    }
                );
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
                if (!returnVal && scope.checkFlag) {
                    top.jBox.info('请选择审批结论!')
                    return

                    //驳回后再次提交
                } else if (!scope.checkFlag) {

                    //同意
                } else if (returnVal == '1' || !scope.checkFlag) {
                    if (!scope.checkFlag) {
                        returnVal = '1';
                    }

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
                                            // top.jBox.close(true);
                                            // top.jBox.success('审核通过');
                                        }
                                        else if (v == "clear") {

                                        }
                                    },
                                    loaded: function (h) {
                                        $(".jbox-content", top.document).css("overflow-y", "hidden");
                                    },
                                    closed: function () {
                                        // top.jBox.close(true);
                                    }
                                });
                                //最后节点
                            } else if (data.msg = 'lastNode') {

                                $.ajax({
                                    url: ctxUrl + '/dljyzx/flow/workItemSave',
                                    type: "post",
                                    async: false,
                                    dataType: "json",
                                    data: {
                                        flowInstId: $('input[name=businessid]').val(),//业务ID
                                        workitemId: $('input[name=activityInstId]').val(),//流程实例ID
                                        outcome: returnVal,
                                        workitem: $('.istextarea').val(),
                                    },
                                    success: function (data) {
                                        localStorage.setItem("processSuccess", "processSuccess");//流程提交成功的标识
                                        top.jBox.close(true);
                                    }
                                })
                                // top.jBox.close(true);
                            }
                        },
                        error: function () {
                        }
                    });
                    //不同意
                } else if (returnVal == '2') {
                    top.jBox.confirm('您确认审批不通过并提交流程吗？', '', function (v, h, f) {
                        if (v === 'ok') {
                            var activityInstId = $('input[name=activityInstId]').val()//流程实例Id
                            scope._forward(activityInstId);
                            top.jBox.close(true);
                        }
                        return true;
                    });

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

            //点击终止流程
            $('#noPass').on('click', function () {
                top.jBox.confirm('您确认终止流程吗？', '', function (v, h, f) {
                    if (v === 'ok') {
                        $.ajax({
                            url: ctxUrl + '/dljyzx/flow/flowDelete',
                            type: "post",
                            async: false,
                            dataType: "json",
                            data: {
                                flowInstId: $('input[name=businessid]').val()
                            },
                            success: function (data) {
                                if (data > 0) {
                                    top.$.jBox.success('审核通过');
                                }
                            }
                        })
                        top.jBox.close(true);
                    }
                    return true;
                });
            });
            //机组信息查看
            $('.genertorView').on('click', function () {
                var url = "/dljyzx/baWaitdo/generatorList?businessId=" + $('input[name=businessid]').val();
                var ctx = top.ctx + url
                top.jBox("iframe:" + ctx,
                    {
                        title: '查看详情 ',
                        width: 1100,
                        height: 500,
                        buttons: {},
                        closed: function () {

                        },
                        loaded: function (h) {
                            $(".jbox-content", top.document).css("overflow-y", "hidden");
                        }

                    }
                );
            });
            //用电单元查看
            $('.mktaadmin').on('click', function () {
                var url = "/dljyzx/baWaitdo/toRegistMktaddmin?businessId=" + $('input[name=businessid]').val();
                var ctx = top.ctx + url
                top.jBox("iframe:" + ctx,
                    {
                        title: '查看详情 ',
                        width: 1100,
                        height: 500,
                        buttons: {},
                        closed: function () {

                        },
                        loaded: function (h) {
                            $(".jbox-content", top.document).css("overflow-y", "hidden");
                        }

                    }
                );
            });
            //售电公司
            $(".seller").on('click',function () {
                var isSellerFlag=scope.isSellerFlag//判断是否是正式的售电公司
                var url = "/dljyzx/baWaitdo/toSellerIndex?businessId=" + $('input[name=businessid]').val()
                if(isSellerFlag){
                    url+="&isSellerFlag="+isSellerFlag;
                }
                var ctx = top.ctx + url
                top.jBox("iframe:" + ctx,
                    {
                        title: '查看详情 ',
                        width: 1100,
                        height: 500,
                        buttons: {},
                        closed: function () {

                        },
                        loaded: function (h) {
                            $(".jbox-content", top.document).css("overflow-y", "hidden");
                        }

                    }
                );
            });
            
            //点击修改
            $('.edit').on('click',function () {
                var flagType = scope.flagType;
                var businessId = $('input[name=businessid]').val();//流程类型
                var activityInstId = $('input[name=activityInstId]').val();//流程实例id
                //判断流程是否是第一步
                if(!scope.checkFlag){
                    if(flagType=='04'){
                        window.location.href = top.ctx + "/dljyzx/baRegGenerator/getForProcess?businessId="+businessId+"&activityInstId="+activityInstId
                    }else{
                        var url=top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/powerPlantsInfo?businessid="+businessId+"&processFlag=true";
                        if(scope.isSellerFlag){
                            url+="&isSellerFlag=isSellerFlag";
                        }
                        window.location.href =url ;
                    }
                }else{
                   return false;
                }
            })

            //合同查看
            $('.contractaccessory').on('click', function () {
                var url = "/dljyzx/baWaitdo/toCon?businessId=" + $('input[name=businessid]').val();
                var ctx = top.ctx + url
                top.jBox("iframe:" + ctx,
                    {
                        title: '查看详情 ',
                        width: 1100,
                        height: 500,
                        buttons: {},
                        closed: function () {

                        },
                        loaded: function (h) {
                            $(".jbox-content", top.document).css("overflow-y", "hidden");
                        }

                    }
                );
            });
        },
        /**
         * 获取流程图
         *
         */
        _flowChartView: function () {
            $.post(parent.ctx + "/dljyzx/flow/queryProcess", {businessId: $('input[name=businessid]').val()}, function (data) {
                if (data) {
                    var ctxStatic = parent.ctxStatic;
                    var flowNodeRun = data.flowNodeRun;//流程发起信息
                    var flowNodeStart = data.flowNodeStart;
                    var operateInfo = data.operateInfo;//审批信息
                    var flowNode = data.flowNodeInfo; //流程节点
                    var bool = true;
                    var html = '<div style="width:32px;height: 32px;margin: 16px 4px 4px auto" class="processPicture" title="流程启动&#10' +
                        '发起人：' + flowNodeStart.dmane + '&#10' +
                        '日   期：' + flowNodeStart.ddate + '">' +
                        '<img height="32" width="32" src="' + ctxStatic + '/images/flow/start.png"></div>' +
                        '<div style="width:74px;height: 64px" class="processPicture">' +
                        '<img height="64" width="74" src="' + ctxStatic + '/images/flow/guide.png"></div>';
                    $('#TabPage2').append(html);
                    for (var i = 0; i < flowNode.length; i++) {
                        var htmlTwo = '';
                        var picUrl = '';
                        var flowInfo = flowNode[i];
                        if (flowNodeRun.flowdefid == flowInfo.actid && flowNodeRun.state1 == 0) {
                            picUrl = ctxStatic + '/images/flow/run.png"';
                            bool = false;//遇到代办状态，将以后节点设置为false
                        } else {
                            if (bool) {//如果流程为进行状态
                                picUrl = ctxStatic + '/images/flow/over.png"';
                            } else {
                                picUrl = ctxStatic + '/images/flow/wait.png"';
                            }
                        }
                        htmlTwo = '<div class="processPicture process_' + i + '" style="width: 92px;height: 66px" >' +
                            '<img height="66"  width="92" src="' + picUrl + '">' +
                            '<div style="margin: -40px 0px 0px 4px;" class="processContent">' + flowInfo.actname + '</div>' +
                            '</div>' +
                            '<div style="width:74px;height: 64px" class="processPicture">' +
                            '<img height="64" width="74" src="' + ctxStatic + '/images/flow/guide.png"></div>';
                        var title = "";//
                        $('#TabPage2').append(htmlTwo);
                        for (var j = 0; j < operateInfo.length; j++) {
                            var op = operateInfo[j];
                            if (flowInfo.actid == op[0]) {
                                title = title + "处理人：" + op[1] + " \n日   期：" + op[3] + "\n处   理：" + op[5] + "\n";
                                break;
                            }
                        }
                        var _class = ".process_" + i
                        if (title != "") {
                            $(_class).attr("title", title);
                        } else if (title == "" && i == 0) {//如果为第一个节点并没有退回信息，按流程启动处理
                            var titleTwo = "处理人：" + flowNodeStart.dmane + " \n日   期：" + flowNodeStart.ddate + "\n处   理：→\n";
                            $(_class).attr("title", titleTwo);
                        }
                    }
                    var endHtml = '<div style="width:32px;height: 32px;margin: 16px 4px 4px auto" class="processPicture" title="流程结束">' +
                        '<img height="32" width="32" src="' + ctxStatic + '/images/flow/end.png"></div>';
                    $('#TabPage2').append(endHtml);

                }
            })
        },

        /**
         * 获取审批意见
         *
         */
        _mainViewData: function () {
            $.post(parent.ctx + "/dljyzx/flow/mainViewData", {businessId: $('input[name=businessid]').val()}, function (data) {
                if (data) {
                    var list = data.list;
                    if (list) {
                        var html = '';
                        var num = 1;
                        $.each(list, function (i, o) {
                            var outcome = o.outcome;
                            var outComeName = '';
                            if (outcome == 1) {
                                outComeName = '同意';
                            } else if (outcome == 0) {
                                outComeName = '不同意';
                            }
                            html += '<tr>' +
                                '<td>' + num + '</td>' +
                                '<td>' + o.usercode + '</td>' +//审批人
                                '<td>' + outComeName + '</td>' +//审批结论
                                '<td>' + ((o.opiniom) ? o.opiniom : '') + '</td>' +//审批意见
                                '<td>' + o.date + '</td></tr>'//审批时间
                            num++;
                        })
                        $('.viewData').append(html);
                    }
                }
            })
        },

        _checkListEditor: function (name) {
            var val = '';
            $('input[name=' + name + ']').each(function (i, o) {
                if ($(o).is(":checked")) {
                    val = $(o).val();
                }
            })
            return val;
        },

        /**
         * 判断是否是第一个节点
         * @param activityInstId
         * @private
         */
        _forward: function (activityInstId) {
            var businessId = $('input[name=businessid]').val();
            var scope = this;
            var ctxUrl = top.ctx;
            $.ajax({
                url: ctxUrl + '/dljyzx/flow/forward',
                type: "post",
                async: false,
                dataType: "json",
                data: {
                    activityInstId: activityInstId,
                    coFlag: scope.isCo
                },
                success: function (data) {
                    if (data && data.msg == 'successful') {
                        scope._getPrevNodeUserId(businessId)
                    } else {
                        top.jBox.alert("当前为开始节点,不能回退！");
                    }
                }
            })
        },
        /**
         * 获取上一个节点人员
         * @private
         */
        _getPrevNodeUserId: function (businessId) {
            var scope = this;
            var ctxUrl = top.ctx;
            $.ajax({
                url: ctxUrl + '/dljyzx/flow/getPrevNodeUserId',
                type: "post",
                async: false,
                dataType: "json",
                data: {
                    flowinsid: businessId
                },
                success: function (data) {
                    if (data.prevNodeUserID) {
                        scope._flowProcess(data.prevNodeUserID, -1, 0);
                    } else {
                        top.jBox.alert('当前为开始节点,不能回退');
                    }

                }
            })
        },
        /**
         * 流程流转
         * @param returnVal (1为同意 -1为不同意)
         * @param ids 用户id
         * @param outcome 1 为同意 0 为不同意
         */
        _flowProcess: function (ids, returnVal, outcome) {
            var _this=this;
            var ctxUrl = top.ctx;
            var activityInstId = $('input[name=activityInstId]').val();//流程实例id
            var businessid = $('input[name=businessid]').val();//业务ID
            var checkCode = $('input[name=checkCode]').val();
            var textarea = $('.istextarea').val();//审批意见
            $.ajax({
                url: ctxUrl + "/dljyzx/flow/tasksSave?checkcode="+checkCode,
                type: "post",
                async: false,
                dataType: "json",
                data: {
                    flowNodeInstId: activityInstId,
                    businessID: businessid,
                    direction: returnVal,
                    workitemId: activityInstId,
                    outcome: outcome,
                    ids: ids.toString(),
                    workitem: textarea,
                    coFlag:_this.isCo

                },
                success: function (data) {
                    if (data.msg && data.msg == 'success') {
                        if (returnVal == '1') {
                            localStorage.setItem("processSuccess", "processSuccess");//流程提交成功的标识
                            top.jBox.close(true);
                        } else {
                            localStorage.setItem("processError", "processError");//流程提交成功的标识
                            top.jBox.close(true);
                        }
                    } else {
                        top.$.jBox.error('提交失败');
                    }
                },
                error: function () {

                }

            });
        },
        /**
         * 判断是否是第一个节点
         * @private
         */
        _checkNode: function () {
            var activityInstId = $('input[name=activityInstId]').val();//流程实例id
            var ctxUrl = top.ctx;
            var scope = this;
            $.ajax({
                url: ctxUrl + "/dljyzx/flow/getNode",
                type: "post",
                async: false,
                dataType: "json",
                data: {
                    flowNodeInstId: activityInstId
                },
                success: function (data) {
                    if (data.length > 2) {
                        var xuhao = data[2]
                        if (xuhao == 1) {
                            $('#btnSubmit').hide();
                            $('.edit').show();
                            $('.isCheck').hide();
                            $('.isCheck').next().remove();
                            // $('.remark').text('备注');
                            // $('.remark').parent().next().css('margin-left', '10px');
                            scope.checkFlag = false;
                        } else {
                            $('#noPass').hide();
                            scope.checkFlag = true;
                        }
                    }
                }
            })

        }


    })

    $(function () {
        new baWaitdo();
    })
}()