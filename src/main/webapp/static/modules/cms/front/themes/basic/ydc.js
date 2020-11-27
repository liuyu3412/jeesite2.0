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
			scope.showReport();

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
                    url=window.location.href.substring(0, (window.location.href.indexOf('/', window.location.href.indexOf('/') + 3)))
						+top.ctx+"/wantToReport?reportlet=com.fanRuan.jyzx.report.ReadFromDatabase&cptname=ydcmonthplan.cpt&op=write&planDate="+date+"&partyCode="+participantId+"&sign="+data.sign;
                    // url=GLOBAL_CTXPATH+"/ReportServer?reportlet=com.thinkgem.jeesite.modules.report.ReadFromDatabase&cptname=sdgsbindinguser2020.cpt&op=write&planDate="+date+"&partyCode="+participantId+"&sign="+data.sign;
				}
			});
		 	//alertx(url);
            $('#iframe').height(800);
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