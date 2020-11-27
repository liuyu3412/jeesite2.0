!function() {
	var templetInfo = function() {
		this._create();
	};

	$.extend(templetInfo.prototype, {
		_create : function() {
			//初始化日期
			var date=new Date();
        	$('input[name="planMonth"]').val(date.toISOString().substr(0,7))
			this._init();
			this._bindEvents();
		},
		/**
		 * 初始化页面数据
		 */
		_init : function() {
			var scope = this;
			
			var date=$('input[name=planMonth]').val();
			$.ajax({
				url : "getIsPub",
				type : "post",
				async : false,
				data : {date:date},
				success : function(data) {
			        if(data==0){
			        	jBox.alert('当月报表尚未发布');
                        // $('#iframe').height(600);
						setTimeout(function () {
                            var docHeight = $("#main").height()+600 ;
                            top.wSizeByDoc(docHeight);
                        },300)

			        }else{
			        	scope.showReport();
			        }
				},
				error : function(event, request, settings) {
					
				}
			});
		},
		/**
		 * 获取报表ID
		 */
		showReport:function(){
			var url='';
			var tradeseqId = "";
		 	$.ajax({
				url :  "query",
				type : "post",
				async : false,
				success : function(data) {
					var participantId=data.participantId;

					var date=$('input[name=planMonth]').val()+"-01"
					//alertx(top.ctx);
                    url=GLOBAL_CTXPATH+"${ctx}/wantToReport?reportlet=com.fanRuan.jyzx.report.ReadFromDatabase&cptname=monthplan.cpt&op=write&planDate="+date+"&partyCode="+participantId+"&sign="+data.sign;
				}
			});
		 	//alertx(url);
            $('#iframe').height(700);
            $('#iframe').attr('src',url);
            var docHeight = $("#main").height() ;
            top.wSizeByDoc(docHeight);
		},

		/**
		 * 绑定事件
		 * 
		 * @private
		 */
		_bindEvents : function() {
			var scope = this;
			$('#searchForm').submit(function(){
				scope._init();
				return false;
			})
		}
	})

	$(function() {
		new templetInfo();
        tempSizeParent();
	})

}()