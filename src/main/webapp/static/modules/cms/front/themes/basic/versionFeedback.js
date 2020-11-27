!function () {
    var versionFeedback = function () {
        this._create();
    };
    $.extend(versionFeedback.prototype, {
        _create: function () {
            var checkCode=$('input[name=checkCode]').val();
            this.checkCode=checkCode;
            this._init();
            this._bindEvents();
            this._initDate()
        },

        /**
		 * 初始化页面数据
		 */
        _init: function () {
            var scope = this;
            $('#versionTable').find('tbody').empty();
            $('.pagination').empty();
         
            $.ajax({	
            	url:"queryPageList",
            	type : "post",
        		dataType : "json",
        		async : false,
        		data : {
        			date:$('#year').val(),
        			pageNo:$("#pageNo").val(),
			        pageSize:$("#pageSize").val()
        			},           	
            	success:function (data) {
                    if (data.list) {
                        var list = data.list;
                        var html = '';
                        var num = 1;
                        $.each(list, function (i, o) {
                            var feedbackStatus=''
                            switch (o.feedbackStatus){
                                case 0:
                                    feedbackStatus='有';
                                    break
                                case 1:
                                    feedbackStatus='无';
                                    break
                                case 2:
                                    feedbackStatus='未反馈';
                                    break
                            }
                            html +='<tr><td>' + num + '<input name="parentId" isVal="'+o.id+'" type="hidden"/></td>' +
                                '<td><a class="link" href="#" data-action="view" >' + o.versionName + '</a></td>' +// 计划名称
                                '<td>' + o.stringPlanDate + '</td>' +// 发布时间
                                '<td>' + feedbackStatus + '</td>' +// 有无争议
                                '<td>' +  ((o.userName) ? o.userName : '') + '</td>' +// 反馈人
                                '<td>' + ((o.stringUpdateTime) ? o.stringUpdateTime : '') + '</td></tr>'// 反馈时间
                            num++;
                        })
                        $('input[name=pageNo]').val(data.pageNo);
                        $('input[name=pageSize]').val(data.pageSize);
                        $('#versionTable').find('tbody').append(html);
                        $('.list-panel').find('.pagination').append(data.html);
                		$('.list-panel').find('.pagination').find('a').each(function(i,o){
                            var inputNum=$(this).find('input').length;
                            if(inputNum==2){
                                $('#xx').unbind();
                            }else{
                                $(o).unbind().on('click',function(){

                                    var pageNo = $(o).text();
                                    var pageSize=$('#xx').val();
                                    if (pageNo == '下一页 »') {
                                        var pageNo = parseInt($('.pagination').find('.active').find('a').text()) + 1;

                                        scope._parentPage(pageNo, pageSize);
                                    } else if (pageNo == '« 上一页') {
                                        var pageNo = parseInt($('.pagination').find('.active').find('a').text()) - 1;
                                        scope._parentPage(pageNo, pageSize);
                                    }else if(pageNo=='转到'){
                                        var pageNo = parseInt($('.pagination').find('.active').find('a').text());
                                        scope._parentPage(pageNo, pageSize);
                                    } else {
                                        scope._parentPage(pageNo, pageSize);
                                    }
                                })
                            }

        				})

                        
                        $('#versionTable').find('tbody').find('a[data-action="view"]').each(function(i,o){
                        	$(o).on('click',function(){
                        		var id=$(o).parent().parent().find('input[name=parentId]').attr('isVal');
                        		$('#vme').text($(o).text());
                        		$('#mesage').val('');
                        		$('#user').val('');
	                    		var date = new Date();
	                            var time=date.toISOString().substr(0,10);
	                            $('input[name="planMonth"]').val(time)
                        		$('.list-panel').slideToggle();
                                $('.edit-panel').slideToggle();
                                $('#pageNo').val(1);
                                $('#planResultConfirmNewForm').find('input[name=id]').val(id)
                                scope._initResult(id);
                        	})
                        
                        })
          
                    }
                }
            })



        },
        /**
		 * 绑定事件
		 * 
		 * @private
		 */
        _bindEvents: function () {
            var scope = this;
            $('#searchForm').submit(function(){
            	scope._init();
            	return false;
            })
            //计划初始版本保存
            $('#planResultConfirmNewForm').submit(function(){
            	var feedbackInfo=$('#mesage').val();// 反馈信息：
            	if(!feedbackInfo){
            		feedbackInfo='无争议内容'
            	}
            	var feedbackStatus='0'// 有无争议： 0 有争议
        		if($('#radio0').is(":checked")){
        			feedbackStatus='1';
        		}
            	
            	/*var userName=$('#user').val();
            	if(!userName){
            		userName='无';
            	}*/
            	var id=$('#planResultConfirmNewForm').find('input[name=id]').val();
            	var planMonth=$('input[name=planMonth]').val();//反馈时间
            	var json={
            			feedbackInfo:feedbackInfo,	
            			feedbackStatus:feedbackStatus,
            			time:planMonth,
            			id:id
            		    }
            	$.post("update?checkcode="+scope.checkCode,json,function(data){
            	   if(data>0){
                       jBox.alert('保存成功');
            		   scope._initResult(id)
            	   }
            	})
               return false;
            	
            });
            //点击返回
            $('input[data-action="back"]').on('click',function(){
            	$('.list-panel').slideToggle();
                $('.edit-panel').slideToggle();
                scope._init();
            })
            //点击取消
            $('input[data-action="cancel"]').on('click',function(){
            	$('.list-panel').slideToggle();
                $('.edit-panel').slideToggle();
                scope._init();
            })
            //查询
            $('input[data-action=query]').on('click',function(){
            	var id=$('#planResultConfirmNewForm').find('input[name=id]').val();
            	scope._initResult(id)
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
        	$('#year').append(html);
        	 var date = new Date();
             var time=date.toISOString().substr(0,10);
             $('input[name="planMonth"]').val(time)
        	
        },
        /**
		 * 初始化初始版本页面
		 */
        _initResult:function(id){
        	var scope=this;
        	$('#resultTable').find('tbody').empty();
        	$('.edit-panel').find('.pagination').empty();
        	$.ajax({
        		url:"queryResutPageList",
            	type : "post",
        		data : {vvid:id},  
        		async : false,
        		success:function(data){
        			if(data.list){
        				var html='';
        				var num=1;
        				$.each(data.list,function(i,o){

                	          html +='<tr><td>' + num + '<input name="childId" isVal="'+o.busiunitId+'" type="hidden" /></td>' +
                              '<td>' + o.busiunitName + '</td>' +// 计划单元
                              '<td>' + o.grossEng + '</td>' +// 总发电量
                              '<td>' + o.netEng + '</td>' +// 总上网电量
                              '<td>' +  o.stringplanDate + '</td>' +// 日期
                              '<td>' + ((o.feedbackInfo) ? o.feedbackInfo : '')   + '</td></tr>'// 反馈信息
                               num++;       				        	
        				})
        				$('#resultTable').find('tbody').append(html);
        				$('.edit-panel').find('.pagination').append(data.html);
        				$('.edit-panel').find('.pagination').find('a').each(function(i,o){
                            var inputNum=$(this).find('input').length;
                            if(inputNum==2){
                                $('#xx').unbind();
                            }else{
                                $(o).unbind().on('click',function(){

                                    var pageNo = $(o).text();
                                    var pageSize=$('#xx').val();
                                    if (pageNo == '下一页 »') {
                                        var pageNo = parseInt($('.pagination').find('.active').find('a').text()) + 1;

                                        scope._toPage(pageNo, pageSize,id);
                                    } else if (pageNo == '« 上一页') {
                                        var pageNo = parseInt($('.pagination').find('.active').find('a').text()) - 1;
                                        scope._toPage(pageNo, pageSize,id);
                                    }else if(pageNo=='转到'){
                                        var pageNo = parseInt($('.pagination').find('.active').find('a').text());
                                        scope._toPage(pageNo, pageSize,id);
                                    } else {
                                        scope._toPage(pageNo, pageSize,id);
                                    }
                                })
                            }
        				})
        			}
    
        		}
        	})
        },
        _toPage:function(n,s,id){
        	var scope=this;
        	$("#pageNo").val(n);
        	$("#pageSize").val(s);
            $('#resultTable').find('tbody').empty();
            $('.edit-panel').find('.pagination').empty();
            scope._initResult(id);
        },
        _parentPage:function(n,s,id){
        	var scope=this;
        	$("#pageNo").val(n);
        	$("#pageSize").val(s);
            scope._init();
        }
    })
    $(function () {
        new versionFeedback();
    })
}()

	