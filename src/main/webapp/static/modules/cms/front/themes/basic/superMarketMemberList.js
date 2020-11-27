!function () {
    var superMarketMember = function () {
        this._create();
    };

    $.extend(superMarketMember.prototype, {
        _create: function () {
        	this._initTitle();
            this._initTalbe();
            this._bindEvents();
        },
        _initTitle: function (buttonType) {
        	$('table.contentTable').find('thead').empty();
        	var htmlThead = "";
        	var buttonTypeVal = buttonType ? buttonType : 2;
        	if(buttonTypeVal == 2){
        		htmlThead += "<tr>" +
					"<th></th>" +
					"<th>市场成员名称</th>" +
					"<th>简称</th>" +
					"<th>业务场景</th>" +
					"<th>所属发电集团</th>" +
					"<th>企业法人名称</th>" +
					"<th>地理区域</th>" +
					"<th>机组容量</th>" +
					"<th>入市日期</th>" +
					"<th>退市日期</th>" +
					"<th>机组信息</th>" +
					"<th>附件</th>" +
					"</tr>";
        	}else if(buttonTypeVal == 4) {
        		htmlThead += "<tr>" +
					"<th></th>" +
					"<th>市场成员名称</th>" +
					"<th>简称</th>" +
					"<th>业务场景</th>" +
					"<th>所属发电集团</th>" +
					"<th>企业法人名称</th>" +
					"<th>供电公司</th>" +
					"<th>地理区域</th>" +
					"<th>机组容量</th>" +
					"<th>入市日期</th>" +
					"<th>退市日期</th>" +
					"<th>机组信息</th>" +
					"<th>附件</th>" +
					"</tr>";
        	}else if(buttonTypeVal == 0) {
        		htmlThead += "<tr>" +
					"<th></th>" +
					"<th>市场成员名称</th>" +
					"<th>简称</th>" +
					"<th>业务场景</th>" +
					"<th>地理区域</th>" +
					"<th>行业分类</th>" +
					"<th>用户供电电压等级</th>" +
					"<th>合同容量</th>" +
					"<th>是否核定了输配电价</th>" +
					"<th>入市日期</th>" +
					"<th>退市日期</th>" +
					"<th>用电单元</th>" +
					"<th>附件</th>" +
					"</tr>";
        	}else if(buttonTypeVal == 6) {
        		htmlThead += "<tr>" +
					"<th></th>" +
					"<th>市场成员名称</th>" +
					"<th>简称</th>" +
					"<th>业务场景</th>" +
					"<th>售电公司类型</th>" +
					"<th>地理区域</th>" +
					"<th>业务范围</th>" +
					"<th>注册地</th>" +
					"<th>注册资本</th>" +
					"<th>属地</th>" +
					"<th>成立日期</th>" +
					"<th>入市日期</th>" +
					"<th>退市日期</th>" +
					"<th>用电客户信息</th>" +
					"<th>用电单元</th>" +
					"<th>资产总额（万）</th>" +
					"<th>附件</th>" +
					"</tr>";
        	}else if(buttonTypeVal == 1) {
        		htmlThead += "<tr>" +
					"<th></th>" +
					"<th>市场成员名称</th>" +
					"<th>简称</th>" +
					"<th>业务场景</th>" +
					"<th>地理区域</th>" +
					"<th>入市日期</th>" +
					"<th>退市日期</th>" +
					"<th>上级电网企业</th>" +
					"<th>附件</th>" +
					"</tr>";
        	}
        	$('table.contentTable').find('thead').html(htmlThead);
        	
        },
        /**
         * 初始化表格
         * @private
         */
        _initTalbe: function (buttonType) {
            $('.pagination').empty();
            $('table.contentTable').find('tbody').empty();
            var scope = this;
            var buttonTypeVal = buttonType ? buttonType : 2;
            var json = {
            		participanttype : buttonTypeVal,
            		marketid : "95412"
            };
            $.post("queryList", json, function (data) {
                if (data.list) {
                    if (data.list.length > 0) {
                        var contentHtml = '';
                        $.each(data.list, function (i, o) {
                        	if(buttonTypeVal == 2){
                        		contentHtml += '<tr>' + 
                        		'<td ><input isVal="' + o.id + '" type="checkbox"/></td>' +
                        		'<td>' + ((o.participantname) ? o.participantname : '') + '</td>' + //市场成员名称
                                '<td>' + ((o.aliasname) ? o.aliasname : '') + '</td>' + // 调度简称
                                '<td>' + ((o.marketName) ? o.marketName : '') + '</td>' + // 场景业务
                                '<td>' + ((o.gengroupname) ? o.gengroupname : '') + '</td>' + // 所属发电集团
                                '<td>' + ((o.corporname) ? o.corporname : '') + '</td>' + // 企业法人名称
                                '<td>' + ((o.geogrRegionName) ? o.geogrRegionName : '') + '</td>' + // 地理区域
                                '<td>' + ((o.generatorCount) ? o.generatorCount : '') + '</td>' + // 机组容量
                                '<td>' + ((o.starteffectivedate) ? o.starteffectivedate.substr(0, 10) : '') + '</td>' + // 入市时间
                                '<td>' + ((o.endeffectivedate) ? o.endeffectivedate.substr(0, 10) : '') + '</td>' + // 退市时间
                                '<td>' + ((o.generatorCount) ? o.generatorCount : '') + '</td>' + // 机组信息
                                '<td>' + ((o.affixCount) ? o.affixCount : '') + '</td>' + // 附件
                                '</tr>';
                        	}else if(buttonTypeVal == 4){
                        		contentHtml += '<tr>' + 
                        		'<td ><input isVal="' + o.id + '" type="checkbox"/></td>' +
                        		'<td>' + ((o.participantname) ? o.participantname : '') + '</td>' + //市场成员名称
                                '<td>' + ((o.aliasname) ? o.aliasname : '') + '</td>' + // 调度简称
                                '<td>' + ((o.marketName) ? o.marketName : '') + '</td>' + // 场景业务
                                '<td>' + ((o.gengroupname) ? o.gengroupname : '') + '</td>' + // 所属发电集团
                                '<td>' + ((o.corporname) ? o.corporname : '') + '</td>' + // 企业法人名称
                                '<td>' + ((o.gdjname) ? o.gdjname : '') + '</td>' + // 供电公司
                                '<td>' + ((o.geogrRegionName) ? o.geogrRegionName : '') + '</td>' + // 地理区域
                                '<td>' + ((o.generatorCount) ? o.generatorCount : '') + '</td>' + // 机组容量
                                '<td>' + ((o.starteffectivedate) ? o.starteffectivedate.substr(0, 10) : '') + '</td>' + // 入市时间
                                '<td>' + ((o.endeffectivedate) ? o.endeffectivedate.substr(0, 10) : '') + '</td>' + // 退市时间
                                '<td>' + ((o.generatorCount) ? o.generatorCount : '') + '</td>' + // 机组信息
                                '<td>' + ((o.affixCount) ? o.affixCount : '') + '</td>' + // 附件
                                '</tr>';
                        	}else if(buttonTypeVal == 0){
                        		contentHtml += '<tr>' + 
                        		'<td ><input isVal="' + o.id + '" type="checkbox"/></td>' +
                        		'<td>' + ((o.participantname) ? o.participantname : '') + '</td>' + //市场成员名称
                                '<td>' + ((o.aliasname) ? o.aliasname : '') + '</td>' + // 调度简称
                                '<td>' + ((o.marketName) ? o.marketName : '') + '</td>' + // 场景业务
                                '<td>' + ((o.geogrRegionName) ? o.geogrRegionName : '') + '</td>' + // 地理区域
                                '<td>' + ((o.codename) ? o.codename : '') + '</td>' + // 行业分类
                                '<td>' + ((o.uVoltageLevel) ? o.uVoltageLevel : '') + '</td>' + // 用户供电电压等级
                                '<td>' + ((o.uContractVolume) ? o.uContractVolume : '') + '</td>' + // 合同容量
                                '<td>' + ((o.uIfapprovetransprice) ? o.uIfapprovetransprice : '') + '</td>' + // 是否核定了输配电压
                                '<td>' + ((o.starteffectivedate) ? o.starteffectivedate.substr(0, 10) : '') + '</td>' + // 入市时间
                                '<td>' + ((o.endeffectivedate) ? o.endeffectivedate.substr(0, 10) : '') + '</td>' + // 退市时间
                                '<td>' + ((o.yddycount) ? o.yddycount : '') + '</td>' + // 用电单元
                                '<td>' + ((o.affixCount) ? o.affixCount : '') + '</td>' + // 附件
                                '</tr>';
                        	}else if(buttonTypeVal == 6) {
                        		contentHtml += '<tr>' + 
                        		'<td ><input isVal="' + o.id + '" type="checkbox"/></td>' +
                        		'<td>' + ((o.participantname) ? o.participantname : '') + '</td>' + //市场成员名称
                                '<td>' + ((o.aliasname) ? o.aliasname : '') + '</td>' + // 调度简称
                                '<td>' + ((o.marketName) ? o.marketName : '') + '</td>' + // 场景业务
                                
                                '<td>' + ((o.geogrRegionName) ? o.geogrRegionName : '') + '</td>' + // 售电公司类型
                                
                                '<td>' + ((o.geogrRegionName) ? o.geogrRegionName : '') + '</td>' + // 地理区域
                                
                                '<td>' + ((o.geogrRegionName) ? o.geogrRegionName : '') + '</td>' + // 业务范围
                                '<td>' + ((o.geogrRegionName) ? o.geogrRegionName : '') + '</td>' + // 注册地
                                '<td>' + ((o.geogrRegionName) ? o.geogrRegionName : '') + '</td>' + // 注册资本
                                '<td>' + ((o.geogrRegionName) ? o.geogrRegionName : '') + '</td>' + // 属地
                                '<td>' + ((o.geogrRegionName) ? o.geogrRegionName : '') + '</td>' + // 成立日期
                                
                                '<td>' + ((o.starteffectivedate) ? o.starteffectivedate.substr(0, 10) : '') + '</td>' + // 入市时间
                                '<td>' + ((o.endeffectivedate) ? o.endeffectivedate.substr(0, 10) : '') + '</td>' + // 退市时间
                                
                                '<td>' + ((o.geogrRegionName) ? o.geogrRegionName : '') + '</td>' + // 用电客户信息
                                '<td>' + ((o.geogrRegionName) ? o.geogrRegionName : '') + '</td>' + // 用电单元
                                '<td>' + ((o.geogrRegionName) ? o.geogrRegionName : '') + '</td>' + // 资产总额
                                
                                '<td>' + ((o.affixCount) ? o.affixCount : '') + '</td>' + // 附件
                                '</tr>';
                        	}else if(buttonTypeVal == 1) {
                        		contentHtml += '<tr>' + 
                        		'<td ><input isVal="' + o.id + '" type="checkbox"/></td>' +
                        		'<td>' + ((o.participantname) ? o.participantname : '') + '</td>' + //市场成员名称
                                '<td>' + ((o.aliasname) ? o.aliasname : '') + '</td>' + // 调度简称
                                '<td>' + ((o.marketName) ? o.marketName : '') + '</td>' + // 场景业务
                                '<td>' + ((o.geogrRegionName) ? o.geogrRegionName : '') + '</td>' + // 地理区域
                                '<td>' + ((o.starteffectivedate) ? o.starteffectivedate.substr(0, 10) : '') + '</td>' + // 入市时间
                                '<td>' + ((o.endeffectivedate) ? o.endeffectivedate.substr(0, 10) : '') + '</td>' + // 退市时间
                                '<td>' + ((o.generatorCount) ? o.generatorCount : '') + '</td>' + // 上级电网企业
                                '<td>' + ((o.affixCount) ? o.affixCount : '') + '</td>' + // 附件
                                '</tr>';
                        	}
                        })
                        $('table.contentTable').find('tbody').append(contentHtml)
                        $('.pagination').append(data.html);
                        $('.pagination').find('a').each(function (i, o) {
                            $(o).unbind().on('click', function () {
                                var pageNo = $(o).text();
                                if (pageNo == '下一页 »') {
                                    var pageNo = parseInt($('.pagination').find('.active').find('a').text()) + 1;
                                    scope._toPage(pageNo, 10, buttonTypeVal);
                                } else if (pageNo == '« 上一页') {
                                    var pageNo = parseInt($('.pagination').find('.active').find('a').text()) - 1;
                                    scope._toPage(pageNo, 10, buttonTypeVal);
                                } else {
                                    scope._toPage(pageNo, 10, buttonTypeVal);
                                }
                            })
                        })
                        
                        $('table.contentTable').find('tbody').find('input[type=checkbox]').each(function (i, o) {
                        	var checkBoxId = $(o).attr("isVal");
                        	if(scope.checkBoxIds){
                            	var checkBoxTempIds = scope.checkBoxIds;
                        		if(checkBoxTempIds.indexOf(checkBoxId) >= 0){
                        			$(o).attr("checked", true);
                        		}
                            }
                            $(o).on('click', function () {
                                if (!$(this).is(":checked")) {
                                	var newCheckBoxIds;
                                	var checkBoxTempList = scope.checkBoxIds.split(",");
                                	$.each(checkBoxTempList, function (i, o) {
                                		if(o != checkBoxId){
                                			if(newCheckBoxIds){
                                				newCheckBoxIds += "," + checkBoxId;
                                			}else{
                                				newCheckBoxIds = checkBoxId;
                                			}
                                		}
                                	});
                                	scope.checkBoxIds = newCheckBoxIds;
                                }else{
                                	if(scope.checkBoxIds){
                                		scope.checkBoxIds += "," + checkBoxId;
                                	}else{
                                		scope.checkBoxIds = checkBoxId;
                                	}
                                }
                            });
                        })
                        
                    } else {
                        top.jBox.alert('暂无记录');
                    }

                } else {
                    top.jBox.alert('暂无记录');
                }

            })
        },
        _toPage: function (pageNo, pageSize, buttonType) {
            var scope = this;
            $("#pageNo").val(pageNo);
            $("#pageSize").val(pageSize);
            scope._initTalbe(buttonType);
        },
        /**
         * 绑定事件
         * @private
         */
        _bindEvents: function () {
            var scope = this;

            //直购发电企业
            $('input[data-action="zgfdqyTurn"]').on('click', function () {
            	var buttonType = 2;
            	scope._initTitle(buttonType);
            	scope._initTalbe(buttonType);
            })
            //非直购发电企业
            $('input[data-action="fzgfdqyTurn"]').on('click', function () {
            	var buttonType = 4;
            	scope._initTitle(buttonType);
            	scope._initTalbe(buttonType);
            })
            //电力用户
            $('input[data-action="dlyhTurn"]').on('click', function () {
            	var buttonType = 0;
            	scope._initTitle(buttonType);
            	scope._initTalbe(buttonType);
            })
            //售电公司
            $('input[data-action="sdgsTurn"]').on('click', function () {
            	var buttonType = 6;
            	scope._initTitle(buttonType);
            	scope._initTalbe(buttonType);
            })
            //电网企业
            $('input[data-action="dwqyTurn"]').on('click', function () {
            	var buttonType = 1;
            	scope._initTitle(buttonType);
            	scope._initTalbe(buttonType);
            })

        }
    })

    $(function () {
        new superMarketMember();
    })


}()