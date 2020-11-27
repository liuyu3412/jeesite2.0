!function () {
    var myShares = function () {
        var _this = this;
        _this._create();
        if (this.socket) {
            this.socket.onmessage = function (evt) {
                _this._onmessage(evt);
            }
            this.socket.onopen = function (evt) {
                _this._onopen(evt);
            }
            this.socket.onclose=function (evt) {
                $(".isButtons").remove();
            }
            this.socket.onerror=function (evt) {
                $(".isButtons").remove();
            }
        }

    }
    $.extend(myShares.prototype, {
        _create: function () {
            var scope = this;
            var participantId = $('input[name=participantId]').val();
            var code = $('input[name=code]').val();
            this.tradeseqId = $('input[name=tradeseqId]').val();
            this._getRole();
            if (scope.roleFlag && scope.roleFlag == "true") {
                function waitForSocketConnection(socket, callback) {
                    setTimeout(
                        function () {
                            if (socket.readyState === 1) {
                                if (callback !== undefined) {
                                    callback();
                                }
                                return;
                            } else {
                                waitForSocketConnection(socket, callback);
                            }
                        }, 5);
                };
                // 判断该交易序列是否配置的交易时间 如果配置了 当前时间是否在交易时间中
                scope.socket = new WebSocket('ws://127.0.0.1:9999/listingmatchmaking/' + participantId + '/' + this.tradeseqId + '/' + code);
                // scope.socket = new WebSocket('wss://www.jspec.com.cn/listingmatchmaking/' + participantId + '/' + this.tradeseqId + '/' + code);
                //scope.socket = new WebSocket('ws://www.jspec.com.cn:17001/listingmatchmaking/' + participantId + '/' + this.tradeseqId + '/' + code);
                // scope.socket = new WebSocket('ws://26.47.65.128:9999/listingmatchmaking/' + participantId + '/' + this.tradeseqId + '/' + code);
                // scope.socket = new WebSocket('ws://169.254.68.112:9999/listingmatchmaking/' + participantId + '/' + this.tradeseqId + '/' + code);
                // scope.socket = new WebSocket('ws://26.47.65.122:9999/listingmatchmaking/' + participantId + '/' + this.tradeseqId + '/' + code);
                scope._bindEvents();
                waitForSocketConnection(this.socket, function () {
                    scope.socket.send('ALL');
                });
            }


        },
        _onmessage: function (evt) {
            var _this = this;
            var data = $.parseJSON(evt.data);
            if(data){
                //全量数据
                if(data.code=="ALL"){
                    _this._getSharesTime(data);
                }else if(data.code=="NODEAL"){
                    //未成交数据更新排行榜
                    //更新排行榜

                    _this._initListingTop(data.listingTop);
                    return
                }else if(data.code=="MSG"){

                    top.jBox.alert(data.text);
                    return
                }else if(data.code=="DEAL"){
                    //交易成交

                    _this._initListingTop(data.listingTop);

                }else if(data.code=="CANCEL"){
                    //取消挂牌

                    _this._initListingTop(data.listingTop);

                }

                if(_this.isTradeTimeFlag&&_this.timeFlag){
                    _this._initChars(data);
                }
                $(".isButtons").show();
            }


        },
        _onopen: function (evt) {

        },
        /**
         * 初始化图表
         * @param data
         * @private
         */
        _initChars: function (data) {
            var _this = this;
            if (data && data.dealData.length > 0) {
                //更新排行榜
                if(data.listingTop){
                    _this._initListingTop(data.listingTop);
                }
                //跟新最新成交价格
                var nowPrice=data.dealData[data.dealData.length-1][1]
                $('.newPrice').text(nowPrice);
                //最高价格
                if(data.maxprice){
                    var maxprice=data.maxprice;
                    if(maxprice==0){
                        $('.maxprice').text("无");
                    }else{
                        $('.maxprice').text(maxprice);
                    }

                }

                //最低
                if(data.minprice){
                    var minprice=data.minprice;

                    if(minprice==0){
                        $('.minprice').text("无");
                    }else{
                        $('.minprice').text(minprice);
                    }
                }

                //成交量
                if(data.totalDealEnergy){
                    var totalDealEnergy=data.totalDealEnergy;
                    $('.totalDealEnergy').text(totalDealEnergy);
                }

                //当前时间
                if(data.time){
                    var nowTime=data.time;
                    $('.nowTime').text(nowTime);
                }



                var nowMin = data.dealData[data.dealData.length - 1][5];

                var message = _this._dateConvert(data.dealData);

                if (message) {
                    if (_this.myChart2) {

                        //增量数据的情况
                        var initData = _this.initData;
                        //获取上一分钟交易的数量
                        var volat = initData[initData.length - 1][4];
                        //获取上一分钟交易的时间
                        var lastTime = initData[initData.length - 1][5];
                        //本此推送数据的第一个时间
                        var nowTime = message[0][5];
                        //获取两次时间的差
                        var minus = Number(nowTime) - Number(lastTime);

                        //对比两个时间 如果相隔不是1分钟 则重新请求
                        if (!(minus == 1 || minus == 41)) {
                            //判断数据是否为下午第一条数据
                            // if (nowMin != '13:00') {
                            //     this.socket.send('ALL');
                            //     return false;
                            // }

                        }

                        //推送数据 时间和上条时间相同 并且 推送的交易量为0 且 上一条的交易量不为0  这种情况视为垃圾数据 不做处理
                        // if (message[0][4] == 0 && lastTime == nowTime && volat != 0) {
                        //     return false;
                        // }
                        //合并数据
                        for (var j = 0; j < message.length; j++) {
                            if (lastTime == message[j][5]) {
                                initData[initData.length - 1] = message[j];

                            } else {
                                initData.push(message[j]);
                            }
                        }
                        message = initData;

                        _this.initData = message;

                    } else {
                        //全量数据放入缓存
                        _this.initData = message;
                    }

                    // var price = message[message.length - 1][1]//最近一笔成交价格
                    // $('.newPrice').text(price);
                    var price_List = [],
                        volume = [],
                        avg_list=[],
                        i = 0;//成交量

                    //数据处理
                    // var price_trend=[
                    //     [2320.26,2320.26,2320.26,2320.26],
                    //     [2300,2291.3,2288.26,2308.38],
                    //     [2295.35,2346.5,2295.35,2346.92],
                    //     [2347.22,2358.98,2337.35,2363.8],
                    //     [2360.75,2382.48,2347.89,2383.76],
                    //     [2383.43,2385.42,2371.23,2391.82],
                    //     [2377.41,2419.02,2369.57,2421.15],
                    //     [2425.92,2428.15,2417.58,2440.38],
                    //     [2411,2433.13,2403.3,2437.42],
                    //     [2411,2433.13,2403.3,2437.42]
                    // ];

                    for (i; i < message.length; i += 1) {
                        var mesBean = message[i];
                        volume.push(Number(mesBean[4]));
                        var price_trend = [mesBean[0]==0?null:mesBean[0], mesBean[1]==0?null:mesBean[1], mesBean[3]==0?null:mesBean[3], mesBean[2]==0?null:mesBean[2]];
                        price_List.push(price_trend);
                        avg_list.push(mesBean[6]==0?null:mesBean[6]);

                    }
                    var timeList = [];
                    _this._appendTimeMessage( volume, message, timeList);


                    // _this.myChart = echarts.init(dom);
                    var app = {};
                    var option = null;
                    var upColor = '#ec0000';
                    var upBorderColor = '#8A0000';
                    var downColor = '#00da3c';
                    var downBorderColor = '#008F28';

                    var timeListLength=timeList.length;
                    var volumeLength=volume.length;
                    var dataZoomEnd;
                    var dataZoomStart;
                    if(timeListLength==0){
                        dataZoomEnd=0;
                        dataZoomStart=0;
                    }else{
                        dataZoomEnd=(volumeLength/timeListLength)*100
                        dataZoomStart=(dataZoomEnd-10)>0?(dataZoomEnd-10):0
                    }



                    // var option2 = {
                    //     tooltip: {
                    //         trigger: 'axis',
                    //         showDelay: 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                    //         formatter: function (params, ticket, callback) {
                    //             var param = params[0];
                    //             var msg = volume[param.dataIndex];//获取数量
                    //             return [
                    //                 '交易时间: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                    //                 '成交数量: ' + msg + '<br/>',
                    //                 '成交价格: ' + param.value + '<br/>'
                    //             ].join('');
                    //         }
                    //     },
                    //     legend: {
                    //         y: -30,
                    //
                    //     },
                    //     toolbox: {
                    //         y: -30,
                    //         // show: true,
                    //         feature: {
                    //             // mark: {show: true},
                    //             // dataZoom: {show: true},
                    //             // dataView: {show: true, readOnly: false},
                    //             // magicType: {show: true, type: ['line', 'bar']},
                    //             // restore: {show: true},
                    //             // saveAsImage: {show: true}
                    //         }
                    //     },
                    //
                    //     grid: {
                    //         x: 80,
                    //         y: 5,
                    //         x2: 20,
                    //         y2: 40
                    //     },
                    //     xAxis: [
                    //         {
                    //             show: false,
                    //             type: 'category',
                    //             position: 'top',
                    //             splitNumber: 120,
                    //             boundaryGap: false,
                    //             axisLabel: {show: false},
                    //             axisTick: {onGap: false},
                    //             splitLine: {show: false},
                    //             data: timeList,
                    //
                    //         },
                    //
                    //     ],
                    //     yAxis: [
                    //         {
                    //             type: 'value',
                    //             scale: true,
                    //             splitNumber: 3,
                    //             boundaryGap: [0.05, 0.05],
                    //             axisLabel: {
                    //                 // formatter: function (v) {
                    //                 //     return Math.round(v / 10000) + ' 万'
                    //                 // }
                    //             },
                    //             splitArea: {show: true}
                    //         }
                    //     ],
                    //     series: [
                    //         {
                    //             name: '价格',
                    //             type: 'line',
                    //             symbol: 'none',
                    //             data: price_trend,
                    //             //#8dbfee
                    //             itemStyle: {
                    //                 normal: {
                    //                     color: '#8dbfee',
                    //                     lineStyle: {
                    //                         color: '#8dbfee'
                    //                     }
                    //                 }
                    //             },
                    //         }
                    //     ]
                    // };
                    var option2 = {
                        // title: {
                        //     text: '2013年上半年上证指数'
                        // },
                        tooltip: {
                            trigger: 'axis',
                            formatter: function (params) {
                                var res = params[0].name;
                                for (var i = params.length - 1; i >= 0; i--) {
                                    if (params[i].value instanceof Array) {
                                        var param = params[0];
                                        var msg = volume[param.dataIndex];//获取数量
                                        res += '<br/>' + params[i].seriesName;
                                        res += '<br/>  电量:' + msg;
                                        var v1 = params[i].value[1]==null?0:params[i].value[1];
                                        var v2 = params[i].value[2]==null?0:params[i].value[2];
                                        var v3 = params[i].value[3]==null?0:params[i].value[3];
                                        var v4 = params[i].value[4]==null?0:params[i].value[4];
                                        res += '<br/>  开盘价 : ' + v1 + '  最高价 : ' + v4;
                                        res += '<br/>  收盘价 : ' + v2 + '  最低价 : ' + v3;
                                    }
                                    else {
                                        res += '<br/>' + params[i].seriesName;
                                        var prv = params[i].value
                                        if (!prv){
                                            prv = 0;
                                        }
                                        res += ' : ' + prv;
                                    }
                                }
                                return res;
                            }
                        },
                        legend: {
                            y: -30,

                        },
                        toolbox: {
                            y: -30,
                            // show: true,
                            feature: {
                                // mark: {show: true},
                                // dataZoom: {show: true},
                                // dataView: {show: true, readOnly: false},
                                // magicType: {show: true, type: ['line', 'bar']},
                                // restore: {show: true},
                                // saveAsImage: {show: true}
                            }
                        },
                        grid: {
                            x: 80,
                            y: 30,
                            x2: 20,
                            y2: 40
                        },
                        dataZoom: {
                            show: false,
                            realtime: true,
                            start: dataZoomStart,
                            end: dataZoomEnd
                        },
                        xAxis: [
                            {
                                show: false,
                                type: 'category',
                                position: 'bottom',
                                boundaryGap: true,
                                axisTick: {onGap: false},
                                splitLine: {show: false},
                                axisLabel: {
                                    // color: "#7f7f7f",
                                    showMinLabel: true,
                                    showMaxLabel: true,
                                    interval: function (a, i) {
                                        return _this.formatXLabelInterval(a, i)
                                    },
                                    formatter: function (a, i) {
                                        if (a == '') {

                                        }
                                        return _this.formatXlabelFormat(a, i)
                                    }
                                },
                                data: timeList
                            }
                        ],
                        yAxis: [
                            {
                                name:'元/MWh',
                                type: 'value',
                                scale: true,
                                splitNumber: 5,
                                boundaryGap: [0.5, 0.2],
                                axisLabel : {
                                    formatter: '{value} '
                                },
                                minInterval:1
                            },
                            // {
                            //     name:'元/MWh',
                            //     type: 'value',
                            //     scale: true,
                            //     splitNumber: 5,
                            //     boundaryGap: [0.05, 0.05],
                            //
                            // }
                        ],
                        series: [
                            // {
                            //     name: '价格',
                            //     type: 'line',
                            //     symbol: 'none',
                            //     data: price_trend,
                            //     //#8dbfee
                            //     itemStyle: {
                            //         normal: {
                            //             color: '#8dbfee',
                            //             lineStyle: {
                            //                 color: '#8dbfee'
                            //             }
                            //         }
                            //     },
                            // },
                            {
                                name: '',
                                type: 'k',
                                data: price_List,
                                itemStyle: {
                                    normal: {
                                        color: upColor,
                                        color0: downColor,
                                        borderColor: upBorderColor,
                                        borderColor0: downBorderColor
                                    }
                                }
                            },
                            {
                                name: 'avgprice',
                                type: 'line',
                                data: avg_list,
                                smooth: true,
                                showSymbol: false,
                                itemStyle : {
                                    normal : {
                                        lineStyle:{
                                            color:'#FF8000'
                                        }
                                    }
                                },
                                lineStyle: {
                                    normal: {
                                        width: 2
                                    }
                                }
                            }
                        ]
                    };

                    _this.myChart2 = echarts.init(document.getElementById('main2'));
                    _this.myChart2.setOption(option2);

                    var option3 = {
                        tooltip: {

                            trigger: 'axis',
                            showDelay: 0,         // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                            formatter: function (params, ticket, callback) {
                                return "";
                            }
                        },
                        legend: {
                            y: -30,
                        },
                        // toolbox: {
                        //     y: -30,
                        //     show: true,
                        //     // feature: {
                        //     //     mark: {show: true},
                        //     //     dataZoom: {show: true},
                        //     //     dataView: {show: true, readOnly: false},
                        //     //     magicType: {show: true, type: ['line', 'bar']},
                        //     //     restore: {show: true},
                        //     //     saveAsImage: {show: true}
                        //     // }
                        // },

                        grid: {
                            x: 80,
                            y: 30,
                            x2: 20
                        },
                        dataZoom: {
                            show: true,
                            realtime: true,
                            y: 175,
                            start: dataZoomStart,
                            end: dataZoomEnd

                        },
                        xAxis: [
                            {
                                type: 'category',
                                position: 'bottom',
                                boundaryGap: true,
                                axisTick: {onGap: false},
                                splitLine: {show: false},
                                axisLabel: {
                                    // color: "#7f7f7f",
                                    showMinLabel: true,
                                    showMaxLabel: true,
                                    interval: function (a, i) {
                                        return _this.formatXLabelInterval(a, i)
                                    },
                                    // formatter: function (a, i) {
                                    //     if (a == '') {
                                    //
                                    //     }
                                    //     return _this.formatXlabelFormat(a, i)
                                    // }
                                },
                                data: timeList
                            }
                        ],
                        yAxis: [
                            {
                                name:'MWh',
                                type: 'value',
                                splitNumber: 5,
                                boundaryGap: [0.05, 0.05],
                                axisLabel: {
                                    formatter: '{value} '
                                },
                                splitArea: {show: false},
                                minInterval:1,
                                min:0
                            }
                        ],
                        series: [
                            {
                                name: '电量',
                                type: 'bar',
                                symbol: 'none',
                                data: volume,
                                itemStyle: {
                                    normal: {
                                        color: function (params) {
                                            if (!(params.dataIndex >= price_List.length)) {
                                                var col = "";
                                                var kaip = price_List[params.dataIndex][0];//开盘价格
                                                var shoup = price_List[params.dataIndex][1];//收盘价格
                                                //价格跌
                                                if (kaip >= shoup) {
                                                    col = "#00da3c"
                                                } else if (kaip < shoup) {
                                                    //价格涨
                                                    col = "#ec0000"
                                                }

                                                return col;
                                            }

                                        },

                                    }
                                },
                            }
                        ]
                    };
                    _this.myChart3 = echarts.init(document.getElementById('main3'));
                    _this.myChart3.setOption(option3);
                    echarts.connect([_this.myChart2, _this.myChart3]);
                }


                // _this.myChart.setOption(option = {
                //     backgroundColor: '#fff',
                //     animation: false,
                //     legend: {
                //         bottom: 10,
                //         left: 'center',
                //         data: ['价格']
                //     },
                //     tooltip: {
                //         trigger: 'axis',
                //         backgroundColor: 'rgba(245, 245, 245, 0.8)',
                //         borderWidth: 1,
                //         borderColor: '#ccc',
                //         padding: 10,
                //         textStyle: {
                //             color: '#000'
                //         },
                //
                //         // extraCssText: 'width: 170px'
                //     },
                //     axisPointer: {
                //         link: {xAxisIndex: 'all'},
                //         label: {
                //             backgroundColor: '#777'
                //         }
                //     },
                //     toolbox: {
                //         feature: {
                //             dataZoom: {
                //                 yAxisIndex: false
                //             },
                //             brush: {
                //                 type: ['lineX', 'clear']
                //             }
                //         }
                //     },
                //     brush: {
                //         xAxisIndex: 'all',
                //         brushLink: 'all',
                //         outOfBrush: {
                //             colorAlpha: 0.1
                //         }
                //     },
                //
                //     visualMap: {
                //         show: false,
                //         seriesIndex: 5,
                //         dimension: 2,
                //         pieces: [{
                //             value: 1,
                //             color: downColor
                //         }, {
                //             value: -1,
                //             color: upColor
                //         }]
                //     },
                //     //图标位置
                //     grid: [
                //         {
                //             left: '0%',
                //             right: '0%',
                //             height: '50%'
                //         },
                //         {
                //             left: '0%',
                //             right: '0%',
                //             top: '80%',
                //             height: '16%'
                //         }
                //     ],
                //     xAxis: [
                //
                //         {
                //             type: 'category',
                //             data: timeList,
                //             scale: true,
                //             boundaryGap : true,
                //             axisLine: {onZero: false},
                //             splitLine: {show: false},
                //             splitNumber: 20,
                //             axisPointer: {
                //                 z: 100
                //             }
                //         },
                //         {
                //             type: 'category',
                //             gridIndex: 1,
                //             data: timeList,
                //             scale: true,
                //             boundaryGap : true,
                //             axisLine: {onZero: false},
                //             axisTick: {show: false},
                //             splitLine: {show: false},
                //             axisLabel: {show: false},
                //             splitNumber: 20,
                //             // axisPointer: {
                //             //     label: {
                //             //         formatter: function (params) {
                //             //             var seriesValue = (params.seriesData[0] || {}).value;
                //             //             return params.value
                //             //             + (seriesValue != null
                //             //                 ? '\n' + echarts.format.addCommas(seriesValue)
                //             //                 : ''
                //             //             );
                //             //         }
                //             //     }
                //             // }
                //         }
                //     ],
                //     yAxis: [
                //         {
                //             scale: true,
                //             splitArea: {
                //                 show: true
                //             }
                //         },
                //         {
                //             scale: true,
                //             gridIndex: 1,
                //             splitNumber: 2,
                //             axisLabel: {show: false},
                //             axisLine: {show: false},
                //             axisTick: {show: false},
                //             splitLine: {show: false}
                //         }
                //     ],
                //     series: [
                //
                //         {
                //             name: '价格',
                //             type: 'line',
                //             data: price_trend,
                //             smooth: true,
                //             lineStyle: {
                //                 normal: {opacity: 0.5}
                //             }
                //         },
                //         {
                //             name: '交易数量',
                //             type: 'bar',
                //             xAxisIndex: 1,
                //             yAxisIndex: 1,
                //             data: volume
                //         }
                //     ]
                // }, true);


                // _this.myChart.dispatchAction({});
            }

        },
        splitData: function (rawData) {
            //时间
            var time = [];
            //交易数量
            var volumes = [];
            var prices = []
            for (var i = 0; i < rawData.length; i++) {
                time.push(rawData[i][0]);
                volumes.push(rawData[i][2]);
                prices.push(rawData[i][1]);
            }

            return {
                time: time,
                volumes: volumes,
                prices: prices
            };
        },
        //数据补全
        _appendTimeMessage: function ( volume, data, timeList) {
            var am_startTime = $('input[name=am_startTime]').val() //上午交易开始时间
            var am_lastTime = $('input[name=am_lastTime]').val()//上午交易结束时间
            // var pm_lastTime = $('input[name=pm_lastTime]').val()//下午交易结束时间
            // var pm_startTime = $('input[name=pm_startTime]').val()//下午交易开始时间

            var scope = this;
            var date = data[0][0] + "";
            //第一笔交易时间
            am_startTime = scope._getDateUTCOrNot(Number(am_startTime), false);
            //交易早上最后的时间
            am_lastTime = scope._getDateUTCOrNot(Number(am_lastTime), false);

            //交易下午最后的时间
            // pm_lastTime = scope._getDateUTCOrNot(Number(pm_lastTime), false);

            //交易下午开始的时间
            // pm_startTime = scope._getDateUTCOrNot(Number(pm_startTime), false);

            //获取上午数据
            var i = am_startTime;
            if (am_startTime) {
                for (; i <= am_lastTime; i.setMinutes((i.getMinutes() + 1))) {

                    // var date = new Date(Number(scope._convertDateToUTC(i)));
                    if (i.getHours() <= 9) {
                        timeList.push("0" + i.getHours() + ":" + (i.getMinutes() >= 10 ? i.getMinutes() : "0" + i.getMinutes()));
                    } else {
                        timeList.push(i.getHours() + ":" + (i.getMinutes() >= 10 ? i.getMinutes() : "0" + i.getMinutes()));
                    }
                }
            }
            // if (pm_startTime) {
            //     //获取下午数据
            //     i = pm_startTime;
            //     for (; i <= pm_lastTime; i.setMinutes((i.getMinutes() + 1))) {
            //         // var date = new Date(Number(scope._convertDateToUTC(i)));
            //         if (i.getHours() <= 9) {
            //             timeList.push("0" + i.getHours() + ":" + (i.getMinutes() >= 10 ? i.getMinutes() : "0" + i.getMinutes()));
            //         } else {
            //             timeList.push(i.getHours() + ":" + (i.getMinutes() >= 10 ? i.getMinutes() : "0" + i.getMinutes()));
            //         }
            //
            //     }
            // }

        },
        /**
         时间处理
         */
        _dateConvert: function (obj) {
            var scope = this;
            var data = obj;
            for (var i = 0; i < data.length; i++) {
                var bean = data[i];
                var date = new Date();
                var year = date.getFullYear();
                var month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
                var day = (date.getDate()) < 10 ? "0" + (date.getDate()) : date.getDate()
                var hour = bean[5].substr(0, 2);
                var minute = bean[5].substr(2);
                bean[5] = year.toString() + month.toString() + day.toString() + hour + minute;
            }
            return data;
        },

        fn_hour: function (obj) {
            obj = obj + '';
            if (obj.indexOf('0') != 0) {
                obj = parseInt(Number(obj) - 8);
                if (obj <= 9) {
                    obj = '0' + obj;
                }

            } else {
                obj = obj.substring(1);
                obj = parseInt(Number(obj) - 8);
                if (obj <= 9) {
                    obj = '0' + obj;
                }

            }
            return obj;
        },


        /**
         * 获取日期对象，如果isUTC为true获取 日期的UTC对象，false则获取普通日期对象
         * @param date
         * @param isUTC
         * @returns
         */
        _getDateUTCOrNot: function (date, isUTC) {
            if (!(date instanceof String)) {
                date += "";
            }
            var dArr = new Array();
            for (var hh = 0; hh < 5; hh++) {
                var numb;
                if (hh == 0) {
                    numb = Number(date.slice(0, 4));
                } else {
                    numb = Number(date.slice((hh - 1) * 2 + 4, hh * 2 + 4));
                }

                dArr.push(numb);
            }
            if (isUTC == false) {
                return new Date(dArr[0], dArr[1] - 1, dArr[2], dArr[3], dArr[4]);
            }
            var dateUTC = Number(Date.UTC(dArr[0], dArr[1] - 1, dArr[2], dArr[3], dArr[4])); //得出的UTC时间

            return dateUTC;
        },

        //把时间日期格式转化成utc格式
        _convertDateToUTC: function (date) {
            //return Number(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes()))-Number(8 * 3600 * 1000);
            return Number(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()));
        },
        formatXLabelInterval: function (t, a) {
            return "09:00" === a ? a : "11:00" === a ? a  : void 0
        },
        formatXlabelFormat: function (t, a) {
            return "10:00" === t ? null : false && "10:30" === t ? null : "11:00" === t ? "11:30" : "13:30" === t ? null : false && "14:00" === t ? null : "14:30" === t ? null : t
        },

        /**
         * 绑定事件
         * @private
         */
        _bindEvents: function () {
            var scope = this;
            $('button').on('click', function (e) {
                if (e.target.id == 'buy') {
                    top.$.jBox('iframe:myShares/sharesBuyAndSell',
                        {
                            id: 'sharesByOrSell',
                            title: '买',
                            width: 550,
                            height: 600,
                            buttons: false,
                            ajaxData: {tradeseqId: scope.tradeseqId, name: $('.isTradeName').text(),sign:$("input[name=sign]").val()},
                            loaded: function (h) {
                                $(".jbox-content", top.document).css("overflow-y", "hidden");
                            },
                            closed: function () {

                            }
                        }
                    );

                } else if (e.target.id == 'sell') {
                    top.$.jBox('iframe:myShares/sharesBuyAndSell',
                        {
                            id: 'sharesByOrSell',
                            title: '卖',
                            width: 550,
                            height: 600,
                            buttons: false,
                            ajaxData: {tradeseqId: scope.tradeseqId, name: $('.isTradeName').text(),sign:$("input[name=sign]").val()},
                            loaded: function (h) {
                                $(".jbox-content", top.document).css("overflow-y", "hidden");
                            },
                            closed: function () {

                            }
                        }
                    );

                } else if (e.target.id == 'cannel') {

                    top.$.jBox('iframe:myShares/toCancle',
                        {
                            id: 'sharesByOrSell',
                            title: '撤销',
                            width: 1400,
                            height: 600,
                            buttons: false,
                            ajaxData: {tradeseqId: scope.tradeseqId, name: $('.isTradeName').text(), flagType: 0},
                            loaded: function (h) {
                                $(".jbox-content", top.document).css("overflow-y", "hidden");
                            },
                            closed: function () {

                            }
                        }
                    );
                } else if (e.target.id == 'myTrade') {
                    top.$.jBox('iframe:myShares/toCancle',
                        {
                            id: 'sharesByOrSell',
                            title: '我的委托',
                            width: 1400,
                            height: 600,
                            buttons: false,
                            ajaxData: {tradeseqId: scope.tradeseqId, name: $('.isTradeName').text(), flagType: 1},
                            loaded: function (h) {
                                $(".jbox-content", top.document).css("overflow-y", "hidden");
                            },
                            closed: function () {

                            }
                        }
                    );
                }else if (e.target.id == 'myDeal') {
                    top.$.jBox('iframe:myShares/toCancle2',
                        {
                            id: 'sharesByOrSell',
                            title: '我的成交',
                            width: 1400,
                            height: 600,
                            buttons: false,
                            ajaxData: {tradeseqId: scope.tradeseqId, name: $('.isTradeName').text(), flagType: 1},
                            loaded: function (h) {
                                $(".jbox-content", top.document).css("overflow-y", "hidden");
                            },
                            closed: function () {

                            }
                        }
                    );
                }
            })
        },

        /**
         * 根据交易序列id获取交易的时间
         * @param id
         * @private
         */
        _getSharesTime: function (data) {
            var scope = this;
            if (data) {
                data=scope.formartTime(data);
                var date = new Date();
                var am_startTime = scope._getDateUTCOrNot(Number(data.amsdate), false);
                var am_lastTime = scope._getDateUTCOrNot(Number(data.amedate), false);
                //判断当前时间是否在交易时间中
                if (date >= am_startTime && date <= am_lastTime) {
                    scope.isTradeTimeFlag = true;
                }
                var html = '';
                html += '开始时间:' + (am_startTime.getHours() <= 9 ? ('0' + am_startTime.getHours()) : am_startTime.getHours()) + ':'
                    + (am_startTime.getDay() <= 9 ? ('0' + am_startTime.getDay()) : +am_startTime.getDay())
                    + '结束时间' + (am_lastTime.getHours() <= 9 ? ('0' + am_lastTime.getHours()) : am_startTime.getHours())
                    + ':' + (am_lastTime.getDay() <= 9 ? ('0' + am_lastTime.getDay()) : am_lastTime.getDay())

                $('input[name=am_startTime]').val(data.amsdate) //上午交易开始时间
                $('input[name=am_lastTime]').val(data.amedate)//上午交易结束时间
                // if (data.pmedate&&data.pmsdate) {
                //     var pm_startTime = scope._getDateUTCOrNot(Number(data.pmsdate), false)
                //     var pm_lastTime = scope._getDateUTCOrNot(Number(data.pmedate), false)

                    // //判断当前时间是否在交易时间中
                    // if (date >= pm_startTime && date <= pm_lastTime) {
                    //     scope.isTradeTimeFlag = true;
                    // }
                    // $('input[name=pm_lastTime]').val(data.pmedate)//下午午交易结束时间
                    // $('input[name=pm_startTime]').val(data.pmsdate)//下午交易开始时间
                    html = '交易时间:'
                        + (am_startTime.getHours() <= 9 ? ('0' + am_startTime.getHours()) : am_startTime.getHours()) + ':'
                        + (am_startTime.getMinutes() <= 9 ? ('0' + am_startTime.getMinutes()) : am_startTime.getMinutes())
                        + "-"
                        + (am_lastTime.getHours() <= 9 ? ('0' + am_lastTime.getHours()) : am_lastTime.getHours()) + ':'
                        + (am_lastTime.getMinutes() <= 9 ? ('0' + am_lastTime.getMinutes()) : am_lastTime.getMinutes())
                        // +
                        // '下午交易时间:'
                        // + (pm_startTime.getHours() <= 9 ? ('0' + pm_startTime.getHours()) : pm_startTime.getHours()) + ':'
                        // + (pm_startTime.getMinutes() <= 9 ? ('0' + pm_startTime.getMinutes()) : pm_startTime.getMinutes())
                        // + "-"
                        // + (pm_lastTime.getHours() <= 9 ? ('0' + pm_lastTime.getHours()) : pm_lastTime.getHours()) + ':'
                        // + (pm_lastTime.getMinutes() <= 9 ? ('0' + pm_lastTime.getMinutes()) : pm_lastTime.getMinutes())
                // }
                if (scope.isTradeTimeFlag) {
                    $('.isSharesTime').html(html);
                } else {
                    scope.timeFlag = false;
                    top.jBox.alert("未在流程节点控制时间内！")
                }


                scope.timeFlag = true;

            } else {
                scope.timeFlag = false;
            }


        },


        /**
         * 获取用户类型checkRole
         * @private
         */
        _getRole: function () {
            var scope = this;
            var ctxPath = $('input[name=ctxPath]').val();
            $.ajax({
                url: ctxPath + '/myShares/queryRole',
                type: "post",
                dataType: "json",
                async: false,
                data: {tradeseqId: scope.tradeseqId},
                success: function (data) {
                    if (data && data.success.toString() =="true") {
                        var list=data.list;
                        scope.roleFlag = "true";
                        //只有一种交易角色的情况
                        if (list.length == 1) {
                            //购方
                            if (list[0] == 0) {
                                $('#sell').remove()
                            } else if (list[0] == 1) {
                                //售方
                                $('#buy').remove()
                            } else {
                                //数据有误的情况
                                $('#sell').remove();
                                $('#buy').remove();
                                scope.roleFlag = "false";
                            }
                        }
                    }else {
                        // var info = 'jQuery jBox<br /><br />版本：v2.0<br />日期：2011-7-24<br />';
                        // info += '官网：<a target="_blank" href="http://kudystudio.com/jbox">http://kudystudio.com/jbox</a>';
                        top.jBox(data.msg,{id:"",closed:function () {
                            localStorage.setItem("isMyShares","isMyShares");
                            top.jBox.close("toMyShares");
                        }});
                        // top.jBox.alert(data.msg,"消息");
                        // top.jBox.close("toMyShares");

                    }
                },
                error: function (event, request, settings) {
                    top.$.messager.alert('消息', '请求失败!');
                }
            });
        },


        /**
         * 时间格式化
         * @param data
         */
        formartTime: function (data) {
            var date = new Date();
            var year = date.getFullYear();
            var month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
            var day = (date.getDate()) < 10 ? "0" + (date.getDate()) : date.getDate();

            if (data.amedate) {
                //上午开始时间
                data.amsdate = year.toString() + month.toString() + day.toString() + data.amsdate.substr(0, 2) + data.amsdate.substr(2)
            }
            if (data.amedate) {
                //上午结束时间
                data.amedate = year.toString() + month.toString() + day.toString() + data.amedate.substr(0, 2) + data.amedate.substr(2)
            }
            if (data.pmsdate) {
                //下午开始时间
                data.pmsdate = year.toString() + month.toString() + day.toString() + data.pmsdate.substr(0, 2) + data.pmsdate.substr(2)
            }
            if (data.pmedate) {
                //下午结束时间
                data.pmedate = year.toString() + month.toString() + day.toString() + data.pmedate.substr(0, 2) + data.pmedate.substr(2)
            }

            return data;
        },

        /**
         * 初始化排行榜
         * @param data
         * @private
         */
        _initListingTop:function (data) {
            $('.selUl').empty();
            $('.buyUl').empty();
            if($.isArray(data)&&data.length>0){
                var selList=[];
                var buyList=[];
                for(var i=0;i<data.length;i++){
                    var mes=data[i]
                    var role=mes[2];//角色
                    if(role==1){
                        selList.push(mes)
                    }else if(role==0){
                        buyList.push(mes)
                    }

                }
                var selHtml='<li><span class="name"></span><span class="value ">电价</span><span class="value ">电量</span></li>';
                var buyHtml='<li><span class="name"></span><span class="value ">电价</span><span class="value ">电量</span></li>';
                var sleHtmlList=[]
                for(var i=0;i<selList.length;i++){
                    var mes=selList[i]
                    var price=mes[0];//价格
                    var num=mes[1];//电量
                    var role=mes[2];//角色
                    //卖排行榜
                    sleHtmlList.push('<li><span class="name">卖'+(i==0?"一":i==1?"二":i==2?"三":i==3?"四":i==4?"五":void 0)+'</span><span class="value isGreen">'+price+'</span><span class="value ">'+num+'</span></li>')

                }
                var listLenth=sleHtmlList.length-1;
                for(var i=listLenth;i>=0;i--){
                    var mes=selList[i]
                    var price=mes[0];//价格
                    var num=mes[1];//电量
                    var role=mes[2];//角色
                    //卖排行榜
                    selHtml+=sleHtmlList[i];

                }
                for(var i=0;i<buyList.length;i++){
                    var mes=buyList[i]
                    var price=mes[0];//价格
                    var num=mes[1];//电量
                    var role=mes[2];//角色
                    //买排行榜
                    buyHtml+='<li><span class="name">买'+(i==0?"一":i==1?"二":i==2?"三":i==3?"四":i==4?"五":void 0)+'</span><span class="value isRed">'+price+'</span><span class="value ">'+num+'</span></li>'

                }
                $('.selUl').append(selHtml)
                $('.buyUl').append(buyHtml)

            }

        }


    })

    new myShares();
}(window)

