var param = {};
var menthodName = 'eChartsDescartesList';
var objTime;
var sOldValue="";//历史时间
//消除滚动条
function wSizeParent() {
	var docHeight = document.body.scrollWidth;
	top.wSizeByDoc(docHeight+250);
}
//根据时间查询序列号
function beginTime(){
	param['beginTime'] = $dp.cal.getNewDateStr();
	param['endTime'] = $('#endTime').val();
	$.post($('#ctx').val() + '/supervise/centralizedeal/dtseq',param,function(data) {
		var trcList = data.trCentralizeDeal;
		$('#deal').empty();
		for (var i = 0; i < trcList.length; i++) {
			$('#deal').append("<option title = "+trcList[i].tradeseqCaption+" value = "+trcList[i].tradeseqId+">"+trcList[i].tradeseqCaption+"</option>");
		}
	});
}

//根据时间查询序列号
function endTime(){
	param['endTime'] = $dp.cal.getNewDateStr();
	param['beginTime'] = $('#beginTime').val();
	$.post($('#ctx').val() + '/supervise/centralizedeal/dtseq',param,function(data) {
		var trcList = data.trCentralizeDeal;
		$('#deal').empty();
		for (var i = 0; i < trcList.length; i++) {
			$('#deal').append("<option title = "+trcList[i].tradeseqCaption+" value = "+trcList[i].tradeseqId+">"+trcList[i].tradeseqCaption+"</option>");
		}
	});
}

$(document).ready(function() {
	// table页签点击事件
	var $li = $('.tab li');
	var $ul = $('.content .infor_xinxi');
	param['menthodid'] = 'a';
	$li.click(function() {
		var $this = $(this);
		var $t = $this.index();
		$li.removeClass();
		$this.addClass('current bl');
		$ul.css('display', 'none');
		$ul.eq($t).css('display', 'block');
		param['menthodid'] = $(this).attr('id');
		eval('(' + (menthodName + $(this).attr('id')) + ')')($('#deal').val());
	});
	eChartsDescartesLista($('#deal').val());
	widthHeight();
	wSizeParent();
});

function page(n, s) {
	$("#pageNo").val(n);
	$("#pageSize").val(s);
	$("#searchForm").submit();
	return false;
}

// 自适应高度
function widthHeight() {
	// 获取当前页面宽高
	height = $(window).height();
	// 设置显示区域高度
	var tabw = $(".tab").width();
	$(".tab li").css("width", ((tabw - 18) / 4));
};
// echarts 自适应宽高
function winWidthHeight(obj) {
	// 自适应设置
	width = $(window).width();
	height = $(window).height();
	$(obj).css('height', 250);
	$(obj).css('width', $(obj).width() - 5);
	// $(obj).css('width', (width/2)-50);
}
function winWidthHeight1(obj,hi) {
	// 自适应设置
	width = $(window).width();
	height = $(window).height();
	$(obj).css('height', 250+hi);
	$(obj).css('width', $(obj).width() - 5);
	// $(obj).css('width', (width/2)-50);
}
$('#butsx').live('click',function() {
	if($('#deal').val() != null && $('#deal').val() != ''){
		eval('(' + (menthodName + param['menthodid']) + ')')($('#deal').val());
	}else{
		jBox.tip("序列不能为空！", "messager",{ id:null,top:'10%' });
	}
});

// echarts 交易公告
function eChartsDescartesLista(obj) {
	var optionBar, optionPie1, optionPie2;
	winWidthHeight(document.getElementById('eChartsPie1'));
	winWidthHeight(document.getElementById('eChartsPie2'));
	var myChartPie1 = echarts.init(document.getElementById('eChartsPie1'));
	var myChartPie2 = echarts.init(document.getElementById('eChartsPie2'));
	param['tradeseqId'] = obj;
	$.post($('#ctx').val() + '/supervise/centralizedeal/granted',param,function(data) {
						$('.jyqk').empty();
						$('.gfqk').empty();
						$('.sfqk').empty();
						$('#notice1').empty();
						$('#notice2').empty();
						$('#gtb').empty();
						$('#stb').empty();
						$('.jyqk')
								.append(
										'<li><span>交易限额电量：</span><font class="shu f20" >'
												+ (typeof (data.hiLmt) != "undefined" ? typeof (data.hiLmt.energyHiLmt) != "undefined" ? (data.hiLmt.energyHiLmt)
														: ''
														: '') + '</font>MWh</li>');
						$('.gfqk')
								.append(
										'<li><span>（购方）准入数量：</span><font class="shu f20" >'
												+ (typeof (data.trGranted0) != "undefined" ? data.trGranted0.con
														: 0) + '</font>家</li>');
						$('.sfqk')
								.append(
										'<li><span>（售方）准入数量 ：</span><font class="shu f20" >'
												+ (typeof (data.trGranted1) != "undefined" ? data.trGranted1.con
														: 0) + '</font>家</li>');
						$('#notice2')
								.append(
										'<li title = "'+(typeof (data.tradeseqRule) != "undefined" ? typeof (data.tradeseqRule.tradeRuleName) != "undefined" ?  data.tradeseqRule.tradeRuleName : '' : '')+'">出清规则： '
												+ (typeof (data.tradeseqRule) != "undefined" ? typeof (data.tradeseqRule.tradeRuleName) != "undefined" ?  ((data.tradeseqRule.tradeRuleName).substring(0,9)+'...') : '' : '')
												+ '</li>'
												+ '<li>申报开始时间：'
												+ (typeof (data.jyconfigTime) != "undefined" ? typeof (data.jyconfigTime.beginTime) != "undefined" ? data.jyconfigTime.beginTime : '' : '')
												+ '</li>'
												+ '<li>申报结束时间：'
												+ (typeof (data.jyconfigTime) != "undefined" ? typeof (data.jyconfigTime.endTime) != "undefined" ? data.jyconfigTime.endTime : '' : '')
												+ '</li><li>交易执行结束时间：'
												+ (typeof (data.trCentralizeDeal) != "undefined" ? typeof (data.trCentralizeDeal[0].endTime) != "undefined" ? data.trCentralizeDeal[0].endTime : '' : '') + '</li>');
						$('#notice1')
								.append(
										'<li>交 易 方 式：'
												+ (typeof (data.tradeTypeFrom) != "undefined" ? data.tradeTypeFrom
														: '')
												+ '</li>'
												+ '<li>交易限额电量：'
												+ (typeof (data.hiLmt) != "undefined" ? typeof (data.hiLmt.energyHiLmt) != "undefined" ? (data.hiLmt.energyHiLmt + 'MWh')
														: ''
														: '')
												+ '</li><li>交易申报段数：'
												+ (typeof (data.jygg) != "undefined" ? typeof (data.jygg.bandNum) != "undefined" ? data.jygg.bandNum : '' : '') 
												+ '</li><li>交易执行开始时间：'
												+ (typeof (data.trCentralizeDeal) != "undefined" ? typeof (data.trCentralizeDeal[0].beginTime) != "undefined" ? data.trCentralizeDeal[0].beginTime : '' : '') + '</li>');
						// 出清排序 购方
						var sort0 = data.sortruleValue0;
						for (var i = 0; i < sort0.length; i++) {
							$('#gtb')
									.append(
											'<tr>'
													+ '<td>'
													+ (sort0[i].factorName == '容量等级' ? '--' : sort0[i].no)
													+ '</td>'
													+ '<td>'
													+ (sort0[i].factorName == '容量等级' ? '--' : sort0[i].factorName)
													+ '</td>'
													+ '<td>'
													+ (sort0[i].factorName != '容量等级' ? sort0[i].ascOrDesc == 0 ? '降序'
															: sort0[i].ascOrDesc == 1 ? '升序'
																	: '--' : '--')
													+ '</td>' + '</tr>');
						}
						// 售方
						var sort1 = data.sortruleValue1;
						for (var i = 0; i < sort1.length; i++) {
							$('#stb')
									.append(
											'<tr>'
													+ '<td>'
													+ sort1[i].no
													+ '</td>'
													+ '<td>'
													+ sort1[i].factorName
													+ '</td>'
													+ '<td>'
													+ (sort1[i].ascOrDesc == 0 ? '降序'
															: sort1[i].ascOrDesc == 1 ? '升序'
																	: '无')
													+ '</td>' + '</tr>');
						}
						// 购方公告查询情况
						var gfSelected = data.pie1.data;
						$('#gfSelected').empty();
						for(var i = 0 ;i< gfSelected.length;i++)
						{
							$('#gfSelected').append('<li style="line-height:50px">'+gfSelected[i].name+'：<font class="shu f20">'+gfSelected[i].value+'</font>个</li>');
						}
						optionPie1 = {
							tooltip : {
								trigger : 'item',
								itemGap:10,
								formatter : "{a} <br/>{b}: {c}个 ({d}%)"
							},
							legend : {
								orient : 'horizontal',
								bottom : '4%',
								data : [ '已查询数据', '未查询数据' ]
							},
							series : [ {
								name : '购方公告',
								type : 'pie',
								radius : [ '53%', '70%' ],
								center : [ '50%', '50%' ],
								label : {
									normal : {
										position : 'inner',
										show : false
									}
								},
								labelLine : {
									normal : {
										show : false
									}
								},
								data : data.pie1.data
							} ]
						};

						// 购方公告查询情况
						var sfSelected = data.pie2.data;
						$('#sfSelected').empty();
						for(var i = 0 ;i< sfSelected.length;i++)
						{
							$('#sfSelected').append('<li style="line-height:50px">'+sfSelected[i].name+'：<font class="shu f20">'+sfSelected[i].value+'</font>个</li>');
						}
						optionPie2 = {
							tooltip : {
								trigger : 'item',
								formatter : "{a} <br/>{b}: {c}个 ({d}%)"
							},
							legend : {
								orient : 'horizontal',
								bottom : '4%',
								data : [ '已查询数据', '未查询数据' ]
							},
							series : [ {
								name : '售方公告',
								type : 'pie',
								radius : [ '53%', '70%' ],
								center : [ '50%', '50%' ],
								label : {
									normal : {
										position : 'inner',
										show : false
									}
								},
								labelLine : {
									normal : {
										show : false
									}
								},
								data : data.pie2.data
							} ]
						};

						// myChartBar.setOption(optionBar);
						myChartPie1.setOption(optionPie1);
						myChartPie2.setOption(optionPie2);
						window.onresize = function() {
							// winWidthHeight(document.getElementById('eChartsBar'));
							winWidthHeight(document
									.getElementById('eChartsPie1'));
							winWidthHeight(document
									.getElementById('eChartsPie2'));
							// myChartBar.resize(); // 使第一个图表适应
							myChartPie1.resize(); // 使第一个图表适应
							myChartPie2.resize(); // 使第一个图表适应
						}
					});
}

// echarts 交易申报
function eChartsDescartesListb(obj) {
param['tradeseqId'] = obj;
var optionBar1,optionBar2,optionBar3,optionBar4;
	winWidthHeight(document.getElementById('eChartsBar1'));
	winWidthHeight(document.getElementById('eChartsBar2'));
	winWidthHeight(document.getElementById('eChartsBar3'));
	winWidthHeight(document.getElementById('eChartsBar4'));
	var myChartBar1 = echarts.init(document.getElementById('eChartsBar1'));
	var myChartBar2 = echarts.init(document.getElementById('eChartsBar2'));
	var myChartBar3 = echarts.init(document.getElementById('eChartsBar3'));
	var myChartBar4 = echarts.init(document.getElementById('eChartsBar4'));
$.post($('#ctx').val() + '/supervise/centralizedeal/jysb',param,function(data) {
	$('#gsxx').empty();
	$('#ysbzrsf').empty();
	$('#ysbzrgf').empty();
	$('#myscroll1').empty();
	$('#myscroll2').empty();
	var endTime,time;
	var sbMarketSort = data.sbMarketSort;
	//申报开始时间
	var jysbBeginTime = data.jyconfigTime.beginTime; 
	//申报结束时间
	var jysbEndTime = data.jyconfigTime.endTime;
	if(typeof(jysbEndTime) != 'undefined' && typeof(jysbEndTime) != 'undefined'){
		endTime = new Date(jysbEndTime.replace(/-/g, "/"));
		time = (parseInt(endTime - new Date()) / 1000);
		timer(time);
	}else{
		$('#day_show').empty();
		$('#hour_show').empty();
		$('#minute_show').empty();
		$('#second_show').empty();
		window.clearInterval(objTime);
	}
	//购方准入总数
	var trGranted0 = (typeof(data.trGranted0) != "undefined" ? typeof(data.trGranted0.con) != "undefined" ? data.trGranted0.con : 0 : 0);
	//购方已申报
	var tmrole0 = (typeof (data.trMonitorLogMap) != "undefined" ?  typeof (data.trMonitorLogMap.tradeRole0) != 'undefined' ? data.trMonitorLogMap.tradeRole0 : '--' : '--');
	//售方准入总数
	var trGranted1 = (typeof(data.trGranted1) != "undefined" ? typeof(data.trGranted1.con) != "undefined" ? data.trGranted1.con : 0 : 0);
	//售方已申报
	var tmrole1 = (typeof (data.trMonitorLogMap) != "undefined" ?  typeof (data.trMonitorLogMap.tradeRole1) != 'undefined' ? data.trMonitorLogMap.tradeRole1 : '--' : '--');
	
	$('#gsxx').append('<li>购方（需求侧）准入<font class="shu f20"> '+(typeof(data.trGranted0) != "undefined" ? typeof(data.trGranted0.con) != "undefined" ? data.trGranted0.con : 0 : 0)+' </font> 家，已申报<font class="shu f20"> '+
						(typeof (data.trMonitorLogMap) != "undefined" ?  typeof (data.trMonitorLogMap.tradeRole0) != 'undefined' ? data.trMonitorLogMap.tradeRole0 : 0 : 0)+' </font>家，已申报总电量<font class="shu f20"> '+
						(typeof (data.trCryptographJydyMap) != "undefined" ?  typeof (data.trCryptographJydyMap.tradeRole0) != 'undefined' ? data.trCryptographJydyMap.tradeRole0 : '--' : '--')+' </font>兆瓦时</li>'+
						'<li>售方（发电侧）准入<font class="shu f20"> '+data.trGranted1.con+' </font> 家，已申报<font class="shu f20"> '+
						(typeof (data.trMonitorLogMap) != "undefined" ?  typeof (data.trMonitorLogMap.tradeRole1) != 'undefined' ? data.trMonitorLogMap.tradeRole1 : 0 : 0)+' </font>家，已申报总电量<font class="shu f20"> '+
						(typeof (data.trCryptographJydyMap) != "undefined" ?  typeof (data.trCryptographJydyMap.tradeRole1) != 'undefined' ? data.trCryptographJydyMap.tradeRole1 : '--' : '--')+' </font>兆瓦时</li>');
	$('#ysbzrsf').append('<li style="margin-left:80px">已申报<font class="shu f20">'+(typeof (data.trMonitorLogMap) != "undefined" ?  typeof (data.trMonitorLogMap.tradeRole1) != 'undefined' ? data.trMonitorLogMap.tradeRole1 : 0 : 0)+
							'</font>家</li><li style="margin-left:80px">准入<font class="shu f20">'+data.trGranted1.con+'</font>家</li>');
	$('#ysbzrgf').append('<li style="margin-left:80px">已申报<font class="shu f20">'+(typeof (data.trMonitorLogMap) != "undefined" ?  typeof (data.trMonitorLogMap.tradeRole0) != 'undefined' ? data.trMonitorLogMap.tradeRole0 : 0 : 0)+
							'</font>家</li><li style="margin-left:80px">准入<font class="shu f20">'+data.trGranted0.con+'</font>家</li>');
	
	if(typeof (sbMarketSort) != "undefined"){
		$('#myscroll1').append('<ul>');
		$('#myscroll2').append('<ul>');
		
		for(var i = 0; i<sbMarketSort.length; i++){
			if(sbMarketSort[i].tradeRole == 1){
				//售方
				$('#myscroll1').append('<li>'+sbMarketSort[i].participantname+'<span class="ml10">'+sbMarketSort[i].updateTime+'</span></li>');
			}else{
				//购方
				$('#myscroll2').append('<li>'+sbMarketSort[i].participantname+'<span class="ml10">'+sbMarketSort[i].updateTime+'</span></li>');
			}
		}
		$('#myscroll1').append('</ul>');
		$('#myscroll2').append('</ul>');
	}

	// 已申报的准入售方
	var xAxisData = [];
	var data0 = [],data1 = [];
	data0.push(((tmrole0/trGranted0)*100).toFixed(2));
	data1.push(((tmrole1/trGranted1)*100).toFixed(2));
	optionBar1 = {
		tooltip : {
			trigger : 'item',
			formatter : '{b}:\n{c}%'
		},
		xAxis : [ {
			data : [ '申报成员占比' ],
			axisLabel : {
				textStyle : {
					color : '#03a9f4'
				}
			},
			axisTick: {
                show: false
            },
			axisLine : {
				show : false
			}
		}, {
			// 辅助 x 轴
			show : false,
			data : [ '申报成员占比' ],
		} ],
		yAxis : {
			max : 100,
			show : false,
			axisLine : {
				show : false
			}
		},
		series : [
				{
					// 辅助系列
					type : 'bar',
					silent : true,
					xAxisIndex : 1,
					itemStyle : {
						normal : {
							barBorderRadius : 20,
							color : '#ddd'
						}
					},
					barWidth : 100,
					data : [ 100 ]
				},
				{
					type : 'bar',
					data : data1,
					label : {
						normal : {
							show : true,
							position : 'top',
							formatter : '{c}%'
						}
					},
					barWidth : 100,
					itemStyle : {
						normal : {
							barBorderRadius : 20,
							color : function(params) {
								if (params.data < 20) {
									return new echarts.graphic.LinearGradient(
											0, 0, 0, 1, [ {
												offset : 0,
												color : '#188df0'
											}, {
												offset : 1,
												color : '#188df0'
											} ])
								} else if (params.data <= 40) {
									return new echarts.graphic.LinearGradient(
											0, 0, 0, 1, [ {
												offset : 0,
												color : '#59DE83'
											}, {
												offset : 1,
												color : '#188df0'
											} ])
								} else if (params.data <= 60) {
									return new echarts.graphic.LinearGradient(
											0, 0, 0, 1, [ {
												offset : 0,
												color : '#69D86B'
											}, {
												offset : 1,
												color : '#188df0'
											} ])
								} else if (params.data <= 80) {
									return new echarts.graphic.LinearGradient(
											0, 0, 0, 1, [ {
												offset : 0,
												color : '#EA8D0C'
											}, {
												offset : 1,
												color : '#188df0'
											} ])
								} else if (params.data >= 80) {
									return new echarts.graphic.LinearGradient(
											0, 0, 0, 1, [ {
												offset : 0,
												color : '#F45712'
											}, {
												offset : 1,
												color : '#188df0'
											} ])
								}
							},
							shadowColor : 'rgba(0, 0, 0, 0.4)',
							shadowBlur : 20
						}
					}
				} ]
	};

	// 已申报的准入购方
	optionBar2 = {
		tooltip : {
			trigger : 'item',
			formatter : '{b}:\n{c}%'
		},
		xAxis : [ {
			data : [ '申报成员占比' ],
			axisLabel : {
				textStyle : {
					color : '#03a9f4'
				}
			},
			axisTick: {
                show: false
            },
			axisLine : {
				show : false
			}
		}, {
			// 辅助 x 轴
			show : false,
			data : [ '申报成员占比' ],
		} ],
		yAxis : {
			max : 100,
			show : false,
			axisLine : {
				show : false
			}
		},
		series : [
				{
					// 辅助系列
					type : 'bar',
					silent : true,
					xAxisIndex : 1,
					itemStyle : {
						normal : {
							barBorderRadius : 20,
							color : '#ddd'
						}
					},
					barWidth : 100,
					data : [ 100 ]
				},
				{
					type : 'bar',
					data : data0,
					label : {
						normal : {
							show : true,
							position : 'top',
							formatter : '{c}%'
						}
					},
					barWidth : 100,
					itemStyle : {
						normal : {
							barBorderRadius : 20,
							color : function(params) {
								if (params.data < 20) {
									return new echarts.graphic.LinearGradient(
											0, 0, 0, 1, [ {
												offset : 0,
												color : '#188df0'
											}, {
												offset : 1,
												color : '#188df0'
											} ])
								} else if (params.data <= 40) {
									return new echarts.graphic.LinearGradient(
											0, 0, 0, 1, [ {
												offset : 0,
												color : '#59DE83'
											}, {
												offset : 1,
												color : '#188df0'
											} ])
								} else if (params.data <= 60) {
									return new echarts.graphic.LinearGradient(
											0, 0, 0, 1, [ {
												offset : 0,
												color : '#69D86B'
											}, {
												offset : 1,
												color : '#188df0'
											} ])
								} else if (params.data <= 80) {
									return new echarts.graphic.LinearGradient(
											0, 0, 0, 1, [ {
												offset : 0,
												color : '#EA8D0C'
											}, {
												offset : 1,
												color : '#188df0'
											} ])
								} else if (params.data >= 80) {
									return new echarts.graphic.LinearGradient(
											0, 0, 0, 1, [ {
												offset : 0,
												color : '#F45712'
											}, {
												offset : 1,
												color : '#188df0'
											} ])
								}
							},
							shadowColor : 'rgba(0, 0, 0, 0.4)',
							shadowBlur : 20
						}
					}
				} ]
	};

	// 供应方数据申报
	var d = new Date();
	var result = [];
	for (var i = 0; i < 6; i++) {
		d.setMinutes(d.getMinutes() - 1);
		d.setSeconds(d.getSeconds() - 10);
		var m = d.getMinutes();
		var s = d.getSeconds();
		m = m < 10 ? "0" + m : m;
		// 在这里可以自定义输出的日期格式
		result.push(d.getHours() + "时" + m + '分' + s + '秒');
	}


	optionBar3 = {
		tooltip: {
			trigger: 'axis',
			position: function (pt) {
				return ['50%', '30%'];
				//return [pt[0] + 10, pt[1] - 10];
			}
		},
		legend : {
			orient : 'horizontal',
			bottom : '40',
			data : [ '已申报电量(亿度)', '已申报个数' ]
		},
		grid: {
			y2:80,
			y:30
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: data.categoryAxis.data
		},
		yAxis : [ {
			type : 'value',
			name : '电量(亿度)',
			//barWidth:30,
			//min : 0,
			//max : 30,

			//interval : 50,
			axisLabel : {
				formatter : '{value}'
			}
		}, {
			type : 'value',
			name : '数量(个)',
			//min : 0,
			//max : 150,
			// interval : 5,
			splitLine : {
				show : false
			},
			axisLabel : {
				formatter : '{value}'
			}
		} ],
		dataZoom: [{
			type: 'inside',
			start: 0,
			end: 100,
			bottom : '2'
		},{
			id:'dataZoom2',
			type: 'slider',
			backgroundColor:'rgba(47,69,84,0)',
			filerColor:'rgba(167,183,204,0.4)',
			borderColor:'#ddd',
			filterMode:'filter',
			zoomOnMouseWheel:true,
			moveOnMouseMove:true,
			show: true,
			height:20,
			start: 0,
			end: 100,
			handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
			handleSize: '80%',
			handleStyle: {
				color: '#fff',
				shadowBlur: 3,
				shadowColor: 'rgba(0, 0, 0, 0.6)',
				shadowOffsetX: 2,
				shadowOffsetY: 2
			}
		}],
		series: [
			{
				name:'已申报电量(亿度)',
				type:'line',
				smooth:true,
				symbol: 'none',
				sampling: 'average',
				itemStyle: {
					normal: {
						color: 'rgb(83,214,141)'
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgb(124,242,178)'
						}, {
							offset: 1,
							color: 'rgb(83,214,141)'
						}])
					}
				},
				data: data.bar2.data
			},
			{
				name:'已申报个数',
				type:'line',
				smooth:true,
				symbol: 'none',
				sampling: 'average',
				yAxisIndex : 1,
				itemStyle: {
					normal: {
						color: 'rgb(38,158,217)'
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgb(62,185,245)'
						}, {
							offset: 1,
							color: 'rgb(38,158,217)'
						}])
					}
				},
				data: data.line2.data
			}
		]
	};


	// 需求方数据申报
	var optionBar4 = {
		tooltip: {
			trigger: 'axis',
			position: function (pt) {
				//return [pt[0], '10%'];
				return ['50%', '30%'];
			}
		},
		legend : {
			orient : 'horizontal',
			bottom : '40',
			data : [ '已申报电量(亿度)', '已申报个数' ]
		},
		
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: data.categoryAxis.data
		},
		grid: {
			y2:80,
			y:30
		},
		yAxis : [ {
			type : 'value',
			name : '电量(亿度)',
			//barWidth:30,
			axisLabel : {
				formatter : '{value}'
			}
		}, {
			type : 'value',
			name : '数量(个)',
			splitLine : {
				show : false
			},
			axisLabel : {
				formatter : '{value}'
			}
		} ],
		dataZoom: [
		{
			type: 'inside',
			start: 0,
			end: 100,
			bottom : '2'
		},{
			id:'dataZoom2',
			type: 'slider',
			backgroundColor:'rgba(47,69,84,0)',
			filerColor:'rgba(167,183,204,0.4)',
			borderColor:'#ddd',
			filterMode:'filter',
			zoomOnMouseWheel:true,
			moveOnMouseMove:true,
			show: true,
			height:20,
			start: 0,
			end: 100,
			handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
			handleSize: '80%',
			handleStyle: {
				color: '#fff',
				shadowBlur: 3,
				shadowColor: 'rgba(0, 0, 0, 0.6)',
				shadowOffsetX: 2,
				shadowOffsetY: 2
			}
		}],
		series: [
			{
				name:'已申报电量(亿度)',
				type:'line',
				smooth:true,
				symbol: 'none',
				sampling: 'average',
				itemStyle: {
					normal: {
						color: 'rgb(83,214,141)'
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgb(124,242,178)'
						}, {
							offset: 1,
							color: 'rgb(83,214,141)'
						}])
					}
				},
				data: data.bar1.data
			},
			{
				name:'已申报个数',
				type:'line',
				smooth:true,
				symbol: 'none',
				sampling: 'average',
				yAxisIndex : 1,
				itemStyle: {
					normal: {
						color: 'rgb(38,158,217)'
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgb(62,185,245)'
						}, {
							offset: 1,
							color: 'rgb(38,158,217)'
						}])
					}
				},
				data: data.line1.data
			}
		]
	};
	myChartBar1.setOption(optionBar1);
	myChartBar2.setOption(optionBar2);
	myChartBar3.setOption(optionBar3);
	myChartBar4.setOption(optionBar4);
	window.onresize = function() {
		winWidthHeight(document.getElementById('eChartsBar1'));
		winWidthHeight(document.getElementById('eChartsBar2'));
		winWidthHeight(document.getElementById('eChartsBar3'));
		winWidthHeight(document.getElementById('eChartsBar4'));
		myChartBar1.resize(); // 使第一个图表适应
		myChartBar2.resize(); // 使第一个图表适应
		myChartBar3.resize(); // 使第一个图表适应
		myChartBar4.resize(); // 使第一个图表适应
	}
});
}


// echarts 出清审核
function eChartsDescartesListc(obj) {
	param['tradeseqId'] = obj;
	$('#sbDeal').empty();
	//$('#cjqk').empty();
	//$('.gfxqc').empty();
	//$('.sfxqc').empty();
	winWidthHeight1(document.getElementById('eChartsLine'),250);
	winWidthHeight(document.getElementById('eChartsBar5'));
	winWidthHeight(document.getElementById('eChartsPie3'));
	winWidthHeight(document.getElementById('eChartsPie4'));
	var myChartLine = echarts.init(document.getElementById('eChartsLine'));
	var myChartBar5 = echarts.init(document.getElementById('eChartsBar5'));
	var myChartPie3 = echarts.init(document.getElementById('eChartsPie3'));
	var myChartPie4 = echarts.init(document.getElementById('eChartsPie4'));
	//$.post($('#ctx').val() + '/supervise/centralizedeal/trInfo', param,function(data) {
		//$('#startjy').empty();
		//$('#endjy').empty();
		//$('#startjy').text(data.trCentralizeDeal[0].beginTime);
		//$('#endjy').text(data.trCentralizeDeal[0].endTime);
	//});
	$('#sbDeal').append($('#deal option:selected').text()+'电力集中交易价格成交情况');
	$.post($('#ctx').val() + '/supervise/centralizedeal/trmcCalcu',param,function(data) {
		for(var i=1; i <= 14; i++){
			$('#sp'+i).empty();
		}
		$('#cbcj').empty();
	    $('#cbcq').empty();
		$('#cbcj').text((typeof (data.trResultMainCalcu.vendeeEnergy) != 'undefined' ? data.trResultMainCalcu.vendeeEnergy : '--'));
		$('#cbcq').text((typeof (data.trResultMainCalcu.tradePriceMargin) != 'undefined' ? data.trResultMainCalcu.tradePriceMargin : '--'));
		
		$('#sp1').text((typeof (data.trMonitorLogMap) != "undefined" ? typeof (data.trMonitorLogMap.tradeRole0) != "undefined" ? data.trMonitorLogMap.tradeRole0 : 0 : 0));
		$('#sp2').text((typeof (data.trCryptographJydyMap) != "undefined" ? typeof (data.trCryptographJydyMap.tradeRole0) != "undefined" ? data.trCryptographJydyMap.tradeRole0 : '--' : '--'));
		$('#sp3').text((typeof (data.calcuCount0) != "undefined" ?  typeof (data.calcuCount0.con) != "undefined" ? data.calcuCount0.con : 0 : 0));
		$('#sp4').text((typeof (data.tradeVendeePriceBJ) != "undefined" ? data.tradeVendeePriceBJ : '--'));
		$('#sp5').text((typeof (data.trCryptographJydyMap) != "undefined" ? typeof (data.trCryptographJydyMap.tradeRoleAvg0) != "undefined" ? data.trCryptographJydyMap.tradeRoleAvg0 : '--' : '--'));
		$('#sp6').text((typeof (data.trCryptographJydyMap) != "undefined" ? typeof (data.trCryptographJydyMap.tradeRoleMax0) != "undefined" ? data.trCryptographJydyMap.tradeRoleMax0 : '--' : '--'));
		$('#sp7').text((typeof (data.trCryptographJydyMap) != "undefined" ? typeof (data.trCryptographJydyMap.tradeRoleMin0) != "undefined" ? data.trCryptographJydyMap.tradeRoleMin0 : '--' : '--'));
		$('#sp8').text((typeof (data.trMonitorLogMap) != "undefined" ? typeof (data.trMonitorLogMap.tradeRole1) != "undefined" ? data.trMonitorLogMap.tradeRole1 : 0 : 0));
		$('#sp9').text((typeof (data.trCryptographJydyMap) != "undefined" ? typeof (data.trCryptographJydyMap.tradeRole1) != "undefined" ? data.trCryptographJydyMap.tradeRole1 : '--' : '--'));
		$('#sp10').text((typeof (data.calcuCount1) != "undefined" ? typeof (data.calcuCount1.con) != "undefined" ? data.calcuCount1.con : 0 : 0));
		$('#sp11').text((typeof (data.tradeSalePriceBJ) != "undefined" ? data.tradeSalePriceBJ : '--'));
		$('#sp12').text((typeof (data.trCryptographJydyMap) != "undefined" ? typeof (data.trCryptographJydyMap.tradeRoleAvg1) != "undefined" ? data.trCryptographJydyMap.tradeRoleAvg1 : '--' : '--'));
		$('#sp13').text((typeof (data.trCryptographJydyMap) != "undefined" ? typeof (data.trCryptographJydyMap.tradeRoleMax1) != "undefined" ? data.trCryptographJydyMap.tradeRoleMax1 : '--' : '--'));
		$('#sp14').text((typeof (data.trCryptographJydyMap) != "undefined" ? typeof (data.trCryptographJydyMap.tradeRoleMin1) != "undefined" ? data.trCryptographJydyMap.tradeRoleMin1 : '--' : '--'));

		// 2016年江苏省首次电力集中交易价格成交情况
	var result = [];
	var symbolSize = 2;
	var points = [];
	optionLine = {
		tooltip: {
			
			formatter: function (params) {
				var mousemove = params.data || [0, 0];
				if(typeof (mousemove[0]) != "undefined"){
					return '申报电价：'+mousemove[1] +'元/MWh'+ '<br/>' + '申报电量：'+mousemove[0]+'MWh';
				}
			}
		},
		grid: {
			left: '1%',
			right: '4%',
			bottom: '1%',
			y:20,
			containLabel: true
		},
		xAxis: {
			type: 'value',
			axisLine: {onZero: false}
		},
		yAxis: {
			type: 'value',
			axisLabel : {
				formatter : '{value}(元/MWh)'
			},
			axisLine: {onZero: false}
		},
	dataZoom: [
		//{
		//	type: 'slider',
		//	xAxisIndex: 0,
		//	show: false,
		//	filterMode: 'empty'
		//},
		{
			type: 'slider',
			yAxisIndex: 0,
			show: false,
			filterMode: 'empty'
		},
		//{
		//	type: 'inside',
		//	xAxisIndex: 0,
		//	show: false,
		//	filterMode: 'empty'
		//},
		{
			type: 'inside',
			yAxisIndex: 0,
			show: false,
			filterMode: 'empty'
		}
	],
		series: [
			
			{
				id: 'a',
				type: 'line',
				step: 'start',
				smooth: false,
				symbolSize: symbolSize,
				data: data.line1.data
				
			},
			{
				id: 'b',
				type: 'line',
				step: 'end',
				smooth: false,
				symbolSize: symbolSize,
				data: data.line2.data
			},
			{
				type:'line',
				markLine:{
					smooth: true,
					effect: {
                        show: true
                    },
					distance: 10,
					label:{
					  normal:{
						  show:true,
						  position:'end',
						  formatter:'{b}：'+data.hiLmt.energyHiLmt
					  }  
					},
					data: [
							[
								{
									name: '交易规模',
									coord: typeof(data.coord1) != "undefined" ? data.coord1 : '0'
								},
								{
									coord: typeof(data.coord0) != "undefined" ? data.coord0 : '0'
								}
						], 
							[
								{
									// 固定起点的 x 像素位置，用于模拟一条指向最大值的水平线
									yAxis: 'max',
									x: '90%'
								}, 
								{
									type: 'max'
							}
						]
					]
				}
			}
		]
	};

		var zr = myChartLine.getZr();
		zr.on('mousemove', function (params) {
		var pointInPixel = [params.offsetX, params.offsetY];
		zr.setCursorStyle(myChartLine.containPixel('grid', pointInPixel) ? 'copy' : 'default');
	});

		
		var d = new Date();
		var result = [];
		for (var i = 0; i < 6; i++) {
			d.setMonth(d.getMonth() - 1);
			var m = d.getMonth() + 1;
			m = m < 10 ? "0" + m : m;
			// 在这里可以自定义输出的日期格式
			result.push(d.getFullYear() + "年" + m + '月');
		}
		var optionBar5 = {
			tooltip : {
				trigger : 'axis',
				formatter: function(params) {
					var str = params[0].axisValue+'<br/>';				
					for(var i=0; i < params.length;i++){
						str = str+'<span style = "display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+params[i].color+'"></span>'+params[i].seriesName+'：'+(typeof(params[i].value) != "undefined" && params[i].value != '-' ? params[i].value : '--')+'MWh<br/>';
					}
					return str;
				},
				axisPointer : {
					type : 'cross',
					crossStyle : {
						color : '#999'
					}
				}
			},
			legend : {
				orient : 'horizontal',
				bottom : '2%',
				data : [ '购方电量', '售方电量' ]
			},
			xAxis : [ {
				type : 'category',
				data : data.categoryAxis.data,
				axisLabel : {
					rotate : -30,// -30度角倾斜显示
				},
				axisPointer : {
					type : 'shadow'
				}
			} ],
			yAxis : [ {
				type : 'value',
				name : '电量 MWh',
				//min : 0,
				//max : 30,
				//interval : 50,
				axisLabel : {
					formatter : '{value}'
				}
			} ],
			series : [ {
				name : '购方电量',
				type : 'bar',
				data : data.bar1.data

			}, {
				name : '售方电量',
				type : 'bar',
				data : data.bar2.data
			}]
		};
		$('#sfsbzzr').text(isNaN(((data.pie1.data[1].value/data.pie1.data[0].value)*100).toFixed(2)) ? 0 : ((data.pie1.data[1].value/data.pie1.data[0].value)*100).toFixed(2));
		// 购方公告查询情况
		var optionPie3 = {
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b}: {c}MWh"
			},
			legend : {
				orient : 'horizontal',
				bottom : '2%',
				left:'7%',
				data : [ '申报电量', '中标电量' ]
			},
			series : [ {
				name : '购方申报、中标电量',
				type : 'pie',
				radius : [ '40%', '55%' ],
				center : [ '30%', '45%' ],
				label : {
					normal : {
						position : 'inner',
						show : false
					}
				},
				labelLine : {
					normal : {
						show : false
					}
				},
				data : data.pie1.data
			} ]
		};
		$('#gfsbzzr').text(isNaN(((data.pie2.data[1].value/data.pie2.data[0].value)*100).toFixed(2)) ? 0 : ((data.pie2.data[1].value/data.pie2.data[0].value)*100).toFixed(2));
		// 购方公告查询情况
		var optionPie4 = {
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b}: {c}MWh"
			},
			legend : {
				orient : 'horizontal',
				bottom : '2%',
				left:'7%',
				data : [ '申报电量', '中标电量' ]
			},
			series : [ {
				name : '售方申报、中标电量',
				type : 'pie',
				radius : [ '40%', '55%' ],
				center : [ '30%', '45%' ],
				label : {
					normal : {
						position : 'inner',
						show : false
					}
				},
				labelLine : {
					normal : {
						show : false
					}
				},
				data : data.pie2.data
			} ]
		};

		myChartLine.setOption(optionLine);
		myChartBar5.setOption(optionBar5);
		myChartPie3.setOption(optionPie3);
		myChartPie4.setOption(optionPie4);
		window.onresize = function() {
			winWidthHeight(document.getElementById('eChartsLine'));
			winWidthHeight(document.getElementById('eChartsBar5'));
			winWidthHeight(document.getElementById('eChartsPie3'));
			winWidthHeight(document.getElementById('eChartsPie4'));
			myChartLine.resize(); // 使第一个图表适应
			myChartBar5.resize(); // 使第一个图表适应
			myChartPie3.resize(); // 使第一个图表适应
			myChartPie4.resize(); // 使第一个图表适应
		}
	});
}

// echarts 分析
function eChartsDescartesListd(obj) {
	param['tradeseqId'] = obj;
	//$('.gfxqc').empty();
	//$('.sfxqc').empty();
	//$('#zzcj').empty();
	$('#contentTable3').empty();
	$('#contentTable4').empty();
	winWidthHeight(document.getElementById('eChartsBar6'));
	winWidthHeight(document.getElementById('eChartsPie6'));
	winWidthHeight(document.getElementById('eChartsBar7'));
	winWidthHeight(document.getElementById('eChartsPie7'));
	var myChartBar6 = echarts.init(document.getElementById('eChartsBar6'));
	var myChartPie6 = echarts.init(document.getElementById('eChartsPie6'));
	var myChartBar7 = echarts.init(document.getElementById('eChartsBar7'));
	var myChartPie7 = echarts.init(document.getElementById('eChartsPie7'));
	//$.post($('#ctx').val() + '/supervise/centralizedeal/trInfo', param,function(data) {
		//$('#startjy').empty();
		//$('#endjy').empty();
		//$('#startjy').text(data.trCentralizeDeal[0].beginTime);
		//$('#endjy').text(data.trCentralizeDeal[0].endTime);
	//});
	$.post($('#ctx').val() + '/supervise/centralizedeal/trMain',param,function(data) {
		for(var i=1; i <= 14; i++){
			$('#cp'+i).empty();
		}
		$('#zcbcj').empty();
	    $('#zcbcq').empty();
		$('#zcjdl').empty();
	    $('#zcqjg').empty();
		$('#zcbcj').text((typeof (data.trMain.vendeeEnergy) != 'undefined' ? data.trMain.vendeeEnergy : '--'));
		$('#zcbcq').text((typeof (data.trMain.tradePriceMargin) != 'undefined' ? data.trMain.tradePriceMargin : '--'));
		$('#zcjdl').text((typeof (data.trMain.vendeeEnergy) != 'undefined' ? data.trMain.vendeeEnergy : '--'));
		$('#zcqjg').text((typeof (data.trMain.tradePriceMargin) != 'undefined' ? data.trMain.tradePriceMargin : '--'));
		
		$('#cp1').text((typeof (data.trMonitorLogMap) != "undefined" ? typeof (data.trMonitorLogMap.tradeRole0) != "undefined" ? data.trMonitorLogMap.tradeRole0 : 0 : 0));
		$('#cp2').text((typeof (data.trCryptographJydyMap) != "undefined" ? typeof (data.trCryptographJydyMap.tradeRole0) != "undefined" ? data.trCryptographJydyMap.tradeRole0 : '--' : '--'));
		$('#cp3').text((typeof (data.calcuCount0) != "undefined" ?  typeof (data.calcuCount0.con) != "undefined" ? data.calcuCount0.con : 0 : 0));
		$('#cp4').text((typeof (data.tradeVendeePriceBJ) != "undefined" ? data.tradeVendeePriceBJ : '--'));
		$('#cp5').text((typeof (data.trCryptographJydyMap) != "undefined" ? typeof (data.trCryptographJydyMap.tradeRoleAvg0) != "undefined" ? data.trCryptographJydyMap.tradeRoleAvg0 : '--' : '--'));
		$('#cp6').text((typeof (data.trCryptographJydyMap) != "undefined" ? typeof (data.trCryptographJydyMap.tradeRoleMax0) != "undefined" ? data.trCryptographJydyMap.tradeRoleMax0 : '--' : '--'));
		$('#cp7').text((typeof (data.trCryptographJydyMap) != "undefined" ? typeof (data.trCryptographJydyMap.tradeRoleMin0) != "undefined" ? data.trCryptographJydyMap.tradeRoleMin0 : '--' : '--'));
		$('#cp8').text((typeof (data.trMonitorLogMap) != "undefined" ? typeof (data.trMonitorLogMap.tradeRole1) != "undefined" ? data.trMonitorLogMap.tradeRole1 : 0 : 0));
		$('#cp9').text((typeof (data.trCryptographJydyMap) != "undefined" ? typeof (data.trCryptographJydyMap.tradeRole1) != "undefined" ? data.trCryptographJydyMap.tradeRole1 : '--' : '--'));
		$('#cp10').text((typeof (data.calcuCount1) != "undefined" ? typeof (data.calcuCount1.con) != "undefined" ? data.calcuCount1.con : 0 : 0));
		$('#cp11').text((typeof (data.tradeSalePriceBJ) != "undefined" ? data.tradeSalePriceBJ : '--'));
		$('#cp12').text((typeof (data.trCryptographJydyMap) != "undefined" ? typeof (data.trCryptographJydyMap.tradeRoleAvg1) != "undefined" ? data.trCryptographJydyMap.tradeRoleAvg1 : '--' : '--'));
		$('#cp13').text((typeof (data.trCryptographJydyMap) != "undefined" ? typeof (data.trCryptographJydyMap.tradeRoleMax1) != "undefined" ? data.trCryptographJydyMap.tradeRoleMax1 : '--' : '--'));
		$('#cp14').text((typeof (data.trCryptographJydyMap) != "undefined" ? typeof (data.trCryptographJydyMap.tradeRoleMin1) != "undefined" ? data.trCryptographJydyMap.tradeRoleMin1 : '--' : '--'));

		
		//售方前5名
		var saleEnergyTopFive = data.trSaleEnergyTopFive;
		for(var i = 0; i < saleEnergyTopFive.length; i++){
			$('#contentTable3').append('<tr>');
			$('#contentTable3').append('<td>'+(i+1)+'</td>');
			//$('#contentTable3').append('<td></td>');
			$('#contentTable3').append('<td>'+saleEnergyTopFive[i].aliasname+'</td>');
			$('#contentTable3').append('<td>'+saleEnergyTopFive[i].saleEnergy+'</td>');
			$('#contentTable3').append('<td>'+((saleEnergyTopFive[i].saleEnergy/data.saleEnergy)*100).toFixed(2)+'</td>');
			$('#contentTable3').append('</tr>');
		}
		
		//购方前5名
		var vendeeEnergyTopFive = data.trVendeeEnergyTopFive;
		for(var i = 0; i < saleEnergyTopFive.length; i++){
			$('#contentTable4').append('<tr>');
			$('#contentTable4').append('<td>'+(i+1)+'</td>');
			//$('#contentTable4').append('<td></td>');
			$('#contentTable4').append('<td>'+vendeeEnergyTopFive[i].aliasname+'</td>');
			$('#contentTable4').append('<td>'+vendeeEnergyTopFive[i].vendeeEnergy+'</td>');
			$('#contentTable4').append('<td>'+((vendeeEnergyTopFive[i].vendeeEnergy/data.vendeeEnergy)*100).toFixed(2)+'</td>');
			$('#contentTable4').append('</tr>');
		}
		var optionBar6 = {
			tooltip : {
				trigger : 'axis',
				formatter: function(params) {  
					return params[0].axisValue+'<br/><span style = "display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#c23531;"></span>'+params[0].seriesName+'：'+params[0].value+'MWh<br/>'
							   
				},	
				axisPointer : {
					type : 'cross',
					crossStyle : {
						color : '#999'
					}
				}
			},
			grid : {
				y : 30
			},
			toolbox : {
				show : true
			},
			
			calculable : true,

			xAxis : [ {
				type : 'category',
				data : data.categoryAxis.data,
				axisLabel : {
					interval : 0,// 横轴信息全部显示
					rotate : -30,// -30度角倾斜显示
					formatter:function(value)  
                    {  
						if(value.length > 8){
							return value.substring(0, 8)+'\n'+value.substring(8, value.length);
						}else{
							return value;
						}        
                    }  
				},
				axisPointer : {
					type : 'shadow'
				}
			} ],
			yAxis : [ {
				type : 'value',
				name : '电量 MWh',
				axisLabel : {
					formatter : '{value}'
				}
			} ],
			series : [ {
				name : '电量',
				type : 'bar',
				data : data.bar1.data,
				barWidth:'40%',
				//配置样式
				itemStyle: {   
					//通常情况下：
					normal:{  
	　　　　　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
						color: function (params){
							var colorList = ['rgb(164,205,238)','rgb(42,170,227)','rgb(25,46,94)','rgb(195,229,235)','rgb(77,170,183)'];
							return colorList[params.dataIndex];
						}
					},
					//鼠标悬停时：
					emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			} ]
		};

		// 购方公告查询情况
		var optionPie6 = {
			tooltip : {
				trigger : 'item',
				position:[80,100],
				formatter : "{a} <br/>{b}: {c}MWh ({d}%)"
			},
			legend : {
				orient : 'horizontal',
				bottom : '2%',
				data : [ '售方成交电量前五名之和', '其它' ]
			},
			series : [ {
				name : '售方成交电量分析',
				type : 'pie',
				center : [ '50%', '50%' ],
				label : {
					normal : {
						position : 'inner',
						show : false
					}
				},
				labelLine : {
					normal : {
						show : false
					}
				},
				data : data.pie1.data,
				//配置样式
				itemStyle: {   
					//通常情况下：
					normal:{  
	　　　　　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
						color: function (params){
							var colorList = ['rgb(46,147,242)','rgb(195,229,235)'];
							return colorList[params.dataIndex];
						}
					},
					//鼠标悬停时：
					emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			} ]
		};
		
	var optionBar7 = {
		tooltip : {
				trigger : 'axis',
				formatter: function(params) {  
					return params[0].axisValue+'<br/><span style = "display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#c23531;"></span>'+params[0].seriesName+'：'+params[0].value+'MWh<br/>'
							   
				},
				axisPointer : {
					type : 'cross',
					crossStyle : {
						color : '#999'
					}
				}
			},
			grid : {
				y : 30
			},
			toolbox : {
				show : true
			},
			
			calculable : true,

			xAxis : [ {
				type : 'category',
				data : data.categoryAxis1.data,
				axisLabel : {
					interval : 0,// 横轴信息全部显示
					rotate : -30,// -30度角倾斜显示
					formatter:function(value)  
                    {  
						if(value.length > 8){
							return value.substring(0, 8)+'\n'+value.substring(8, value.length);
						}else{
							return value;
						}        
                    }  
				},
				axisPointer : {
					type : 'shadow'
				}
			} ],
			yAxis : [ {
				type : 'value',
				name : '电量 MWh',
				axisLabel : {
					formatter : '{value}'
				}
			} ],
			series : [ {
				name : '电量',
				type : 'bar',
				data : data.bar2.data,
				barWidth:'40%',
				//配置样式
				itemStyle: {   
					//通常情况下：
					normal:{  
	　　　　　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
						color: function (params){
							var colorList = ['rgb(164,205,238)','rgb(42,170,227)','rgb(25,46,94)','rgb(195,229,235)','rgb(77,170,183)'];
							return colorList[params.dataIndex];
						}
					},
					//鼠标悬停时：
					emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			} ]
	};

		// 购方公告查询情况
		var optionPie7 = {
			tooltip : {
				trigger : 'item',
				position:[80,100],
				formatter : "{a} <br/>{b}: {c}MWh ({d}%)"
			},
			legend : {
				orient : 'horizontal',
				bottom : '2%',
				data : [ '购方成交电量前五名之和', '其它' ]
			},
			series : [ {
				name : '购方成交电量分析',
				type : 'pie',
				center : [ '50%', '50%' ],
				label : {
					normal : {
						position : 'inner',
						show : false
					}
				},
				labelLine : {
					normal : {
						show : false
					}
				},
				data : data.pie2.data,
				//配置样式
				itemStyle: {   
					//通常情况下：
					normal:{  
	　　　　　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
						color: function (params){
							var colorList = ['rgb(46,147,242)','rgb(195,229,235)'];
							return colorList[params.dataIndex];
						}
					},
					//鼠标悬停时：
					emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			} ]
		};

		myChartBar6.setOption(optionBar6);
		myChartPie6.setOption(optionPie6);
		myChartBar7.setOption(optionBar7);
		myChartPie7.setOption(optionPie7);
		window.onresize = function() {
			winWidthHeight(document.getElementById('eChartsBar6'));
			winWidthHeight(document.getElementById('eChartsPie6'));
			winWidthHeight(document.getElementById('eChartsBar7'));
			winWidthHeight(document.getElementById('eChartsPie7'));
			myChartBar6.resize(); // 使第一个图表适应
			myChartPie6.resize(); // 使第一个图表适应
			myChartBar7.resize(); // 使第一个图表适应
			myChartPie7.resize(); // 使第一个图表适应
		}
	});
}

function timer(intDiff) {
	$('#day_show').empty();
	$('#hour_show').empty();
	$('#minute_show').empty();
	$('#second_show').empty();
	window.clearInterval(objTime);
	objTime = window.setInterval(function() {

		var day = 0,

		hour = 0,

		minute = 0,

		second = 0;// 时间默认值

		if (intDiff > 0) {

			day = Math.floor(intDiff / (60 * 60 * 24));

			hour = Math.floor(intDiff / (60 * 60)) - (day * 24);

			minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);

			second = Math.floor(intDiff) - (day * 24 * 60 * 60)
					- (hour * 60 * 60) - (minute * 60);

		}

		if (minute <= 9)
			minute = '0' + minute;

		if (second <= 9)
			second = '0' + second;

		$('#day_show').html(day + "天");

		$('#hour_show').html('<s id="h"></s>' + hour + '时');

		$('#minute_show').html('<s></s>' + minute + '分');

		$('#second_show').html('<s></s>' + second + '秒');

		intDiff--;

	}, 1000);

}