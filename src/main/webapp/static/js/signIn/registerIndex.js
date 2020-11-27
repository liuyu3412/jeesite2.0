!function () {
    var registerIndex=function () {
        this.ctx=$('input[name=ctx]').val();
        this._create();
    }
    $.extend(registerIndex.prototype,{
        _create:function () {
            this._bindEvents();
        },
        _bindEvents:function () {
            var scope=this;
            //点击完成提交审核
            $('#finshRegit').on('click',function () {
                scope._sendFlow();
            })
        },
        /**
         * 获取流程信息
         * @private
         */
        _sendFlow:function(){
            var scope=this;
            var leverList = "";
            $.ajax({
                url: scope.ctx + "/dljyzx/flow/getFlowInfo",
                type: "post",
                async: false,
                success: function (data) {
                    if (!data.count > 0) {
                        return;
                    } else {
                        var rcCount = data.count;
                        $.ajax({
                            url: scope.ctx  + "/dljyzx/flow/gdjcj",
                            async: false,
                            type: "post",
                            dataType: "json",
                            success: function (msg) {
                                if (msg.length > 0) {
                                    leverList = msg;
                                }
                            }
                        });
                        if (rcCount == 0) {
                            jBox.alert('消息', "请先定义一个外网侧的流程");
                            return;
                        } else if (rcCount != 1) {
                            jBox.alert('消息', "外网侧的流程只能定义一个!");
                            return;
                        } else {
                            scope._getFlowNodeInfo(data, leverList);
                        }
                    }
                }

            });
        },
        _getFlowNodeInfo:function (data,leverList) {
            var scope=this;
            $.ajax({
                url: scope.ctx  + "/dljyzx/flow/getFlowNodeInfo",
                type: "post",
                data: {
                    flowid: data.flowid
                },
                async: false,
                success: function (v) {
                    if (!v.result) {
                        jBox.info('消息', "请先配置下一个流程节点");
                        return;
                    } else if (!v.jsname) {
                        jBox.info('消息', "请先配置下一个节点接收人！");
                        return;
                    } else {
                        scope._initTree(data, leverList);
                    }

                }
            });
        },
        /**
         * 初始化人员树
         */
        _initTree:function (getFlowInfo, leverList) {
            var scope=this;
            var participantName=$('input[name=participantName]').val();
            var ctx = scope.ctx;
            var url = "/dljyzx/flow/choosePerson";
            var participantCode = $("#participantCode").val();
            var flowid = getFlowInfo.flowid;
            var flowName = getFlowInfo.flowname;
            var flowInstName = flowName + "_" + participantName+"用户注册";
            var level1 = leverList[0][2];
            var level2 = leverList[0][3];
            var level3 = leverList[0][4];
            var participantId = $('input[name=participantid]').val();
            jBox.open("iframe:" + ctx + "/tag/treeProcess?url=" + encodeURIComponent(url)
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
                                jBox.info("不能选择根节点（" + nodes[i].name + "）请重新选择。");
                                return false;
                            }
                            if (nodes[i].isParent) {
                                jBox.info("不能选择父节点（" + nodes[i].name + "）请重新选择。");
                                return false;
                            }
                            if (nodes[i].module == "") {
                                jBox.info("不能选择公共模型（" + nodes[i].name + "）请重新选择。");
                                return false;
                            }
                            ids.push(nodes[i].id);
                            names.push(nodes[i].name);
                            break; // 如果为非复选框选择，则返回第一个选择  </c:if>
                        }
                        if(ids.length <= 0){
                            jBox.alert('请选择下一个节点接收人！', "消息");
                            return false;
                        }
                        var generatorIdList=[];
                        var mktaadminIdList=[];
                        //获取机组id
                        $('#contentTable').find('input[name=generatorId]').each(function (i,o) {
                            generatorIdList.push($(o).val());
                        })
                        var participantId=$('input[name=participantid]').val();//市场成员ID
                        var electricity=$('input[name=electricity]').val();//电力用户注册的标识

                        //获取用电单元ID
                        $('#mktaadminTable').find('input[name=mktaadminloadId]').each(function (i,o) {
                            mktaadminIdList.push($(o).val())
                        })
                        $.ajax({
                            url: ctx + "/dljyzx/flow/sendRegister",
                            type: "post",
                            data: {
                                baRegId:participantId,
                                baRegGeneratorId:generatorIdList.toString(),
                                mktaadminIdList:mktaadminIdList.toString(),
                                flowid: flowid,
                                flowName: flowName,
                                flowInstName: flowInstName,
                                level1: level1,
                                level2: level2,
                                level3: level3,
                                electricity:electricity,
                                userIds: ids.toString(),
                            },
                            async: false,
                            success: function (v) {
                                if (v && v == 'success') {
                                    jBox.tip('提交成功');
                                    // window.location.href = top.ctx + "/dljyzx/basicInfo/powerPlantsInfo/powerPlantsInfo";
                                } else {
                                    jBox.error('提交失败');
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
        }
    })
    $(function () {
        new registerIndex();
    })
}()
