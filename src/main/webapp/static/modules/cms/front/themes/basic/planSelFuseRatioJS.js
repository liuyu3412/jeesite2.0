!function () {
    var planSelFuseRatioJS = function () {
        this._create();
    };
    $.extend(planSelFuseRatioJS.prototype, {
        _create: function () {
            this._init();
            this._initDate();
            this._bindEvents();
        },

        /**
         * 初始化页面数据
         */
        _init: function () {
            var scope = this;
            $.post("queryPageList",{date:$('#planMonth').val()},function (data) {
            	 $('#planRatio').find('tbody').empty();
            	 $('.pagination').empty();
                var list = data.list
                if (list) {
                    var html = '';
                    $.each(list, function (i, o) {
                        var rowspan = 0;
                        var colspan = 0;
                        var display = 'none';
                        if (i % 3 == 0) {
                            rowspan = 3;
                            colspan = 1
                            display = '';
                        }
                        html += '<tr>' +
                            '<td style="display: ' + display + '" rowspan="3" colspan="1"><div>'+((o.busiunitName) ? o.busiunitName : '')+'</div></td>' +//发电企业名称
                            '<td>'+((o.generatorName) ? o.generatorName : '')+'</td>' +//机组号
                            '<td>'+((o.ratioM1) ? o.ratioM1.toFixed(2) : '')+'</td>' +//1月
                            '<td>'+((o.ratioM2) ? o.ratioM2.toFixed(2) : '')+'</td>' +
                            '<td>'+((o.ratioM3) ? o.ratioM3.toFixed(2) : '')+'</td>' +
                            '<td>'+((o.ratioM4) ? o.ratioM4.toFixed(2) : '')+'</td>' +
                            '<td>'+((o.ratioM5) ? o.ratioM5.toFixed(2) : '')+'</td>' +
                            '<td>'+((o.ratioM6) ? o.ratioM6.toFixed(2) : '')+'</td>' +
                            '<td>'+((o.ratioM7) ? o.ratioM7.toFixed(2) : '')+'</td>' +
                            '<td>'+((o.ratioM8) ? o.ratioM8.toFixed(2) : '')+'</td>' +
                            '<td>'+((o.ratioM9) ? o.ratioM9.toFixed(2) : '')+'</td>' +
                            '<td>'+((o.ratioM10) ? o.ratioM10.toFixed(2) : '')+'</td>' +
                            '<td>'+((o.ratioM11) ? o.ratioM11.toFixed(2) : '')+'</td>' +
                            '<td>'+((o.ratioM12) ? o.ratioM12.toFixed(2) : '')+'</td>' +
                            '<td>'+((o.ratioThisYearAve) ? o.ratioThisYearAve.toFixed(2) : '')+'</td>' +//当年平均值
                            '<td>'+((o.ratioLastYearAve) ? o.ratioLastYearAve.toFixed(2) : '')+'</td>' +//去年平均值
                            '<td>'+((o.ratioLast3YearAve) ? o.ratioLast3YearAve.toFixed(2) : '')+'</td>' +//前三年平均值
                            '</tr>'
                    })
                    $('#planRatio').find('tbody').append(html);
                    $('.pagination').html(data.html);
                    $('.pagination').find('a').each(function(i,o){
                        var inputNum=$(this).find('input').length;
                        if(inputNum==2){
                            $('#xx').unbind();
                        }else{
                            $(o).unbind().on('click',function(){

                                var pageNo = $(o).text();
                                var pageSize=$('#xx').val();
                                if (pageNo == '下一页 »') {
                                    var pageNo = parseInt($('.pagination').find('.active').find('a').text()) + 1;

                                    scope._toPage(pageNo, pageSize);
                                } else if (pageNo == '« 上一页') {
                                    var pageNo = parseInt($('.pagination').find('.active').find('a').text()) - 1;
                                    scope._toPage(pageNo, pageSize);
                                }else if(pageNo=='转到'){
                                    var pageNo = parseInt($('.pagination').find('.active').find('a').text());
                                    scope._toPage(pageNo, pageSize);
                                } else {
                                    scope._toPage(pageNo, pageSize);
                                }
                            })
                        }
                    })
                }else{
                	  jBox.alert('暂无数据');
                }
            })

        },
        /**
		 * 初始化日期
		 * 
		 */
        _initDate:function(){
        	var now = new Date();
        	var cyear = now.getFullYear();
        	var qyears = [];
        	var html=''
        	for(var i=0; i<10; i++) {
        		var year=cyear-i
        		html+='<option value="'+year+'" >'+year+'</option>'
        	}
        	$('#planMonth').append(html);
        },
        /**
         * 绑定事件
         *
         * @private
         */
        _bindEvents: function () {
             var scope=this;
	          $('#searchForm').submit(function(){
	        	  scope._init();
                  loadData();
	        	  return false;
	          })   
        },
        _toPage:function(pageNo,pageSize){
           	var scope=this;
        	$("#pageNo").val(pageNo);
        	$("#pageSize").val(pageSize);
            scope._init();
        }
    })
    $(function () {
        new planSelFuseRatioJS();
    })
}()