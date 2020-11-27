//==========================以下为公共函数======================================
/**
 * 获取查询条件json
 */
function queryCondition(condition,pageIndex,pageSize){
	var pageInfo={"pageIndex":pageIndex,"pageSize":pageSize};
	var params=$.extend(true,{filter:condition}, pageInfo);
	return 'params='+encodeURIComponent(JSON.stringify(params));
}
/**
 * 获取总页数
 * @param itemAllCount
 * @param pageSize
 */
function getTotlePage(itemAllCount,pageSize){
	var totalPage=(itemAllCount%pageSize>0)?(itemAllCount/pageSize+1):itemAllCount/pageSize;
	return parseInt(totalPage);
}
/**
 * 验证输入的分页信息
 * @param pageNum
 * @param pageSize
 */
function validationPageNum(pageNum,pageSize,pageAll){
	var reg=/^\d+$/;
	if(!reg.test(pageNum)){
		$.messager.alert('提示','只能为数字!');
		return false;
	}else if(pageAll>0){
		if(pageNum>getTotlePage(pageAll,pageSize)){
			$.messager.alert('提示','输入数大于总页数!');
			return false;
		}
	}
	return true;
}
/**
 * 获取form表单json
 */
$.fn.formJson = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	var reobj={items:[]};
	reobj.items.push(o);
	return JSON.stringify(reobj);
};

$.fn.serializeJson = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return JSON.stringify(o);
};

(function($){
	$.fn.zpagebar = function(settings){
		return this.each(function(){
			var $pb = $(this);
			settings = $.extend({}, $.fn.zpagebar.defaults, settings);
			if(isNaN(settings.curPage)) {
				settings.curPage = 1;
			}
			var totalPage = parseInt((settings.total%settings.pageSize>0)?(settings.total/settings.pageSize+1):settings.total/settings.pageSize);
			if(settings.curPage>totalPage) {
				settings.curPage = totalPage;
			}
			
			var $pbc = $('<div class="pagebar-text push-left">共 '+settings.total+' 条记录，'
			+'当前第 <input id="page" type="text" class="pageno" value="'+settings.curPage+'" style="ime-mode:disabled"> 页，共 '+totalPage+' 页</div>'
			+'<div class="pagebar-buttons push-right">'
			+'<a href="javascript:'+settings.funName+'(1)">首页</a>'
			+'<a href="javascript:'+settings.funName+'('+((settings.curPage > 1) ? (settings.curPage - 1): 1)+')">上一页</a>'
			+'<a href="javascript:'+settings.funName+'('+((settings.curPage < (totalPage - 1)) ? (settings.curPage + 1): totalPage)+')">下一页</a>'
			+'<a href="javascript:'+settings.funName+'('+totalPage+')">尾页</a>'
			+'</div>');
			
			if(settings.zeroHide && totalPage == 0) {
				$pb.hide();
			} else {
				$pb.addClass('pagebar').html($pbc);
			}
			
			
			$pbc.find('#page').keypress(function(event){
				var eventObj = event || e;
		        var keyCode = eventObj.keyCode || eventObj.which;
		        if(keyCode == 13) {
		        	$pbc.find('#page').trigger('change', {totalPage: totalPage, funName: settings.funName});
		        }
			}).bind('change', {totalPage: totalPage, funName: settings.funName}, pchange);
			
			if(totalPage <= 1) {
				$pbc.find('a').addClass("disabled").removeAttr('href');
			} else {
				if(settings.curPage == 1) {
					$pbc.find('a:lt(2)').addClass("disabled").removeAttr('href');
				} else if(settings.curPage == totalPage){
					$pbc.find('a:gt(1)').addClass("disabled").removeAttr('href');
				}
			}
		});
	}
	
	function pchange(e) {
		var cp = $(e.target).val();
		if(isNaN(cp)) {
			cp = 1;
			$(e.target).val(cp);
		}
		if(cp < 1) {
			cp = 1
		}
		if(cp > e.data.totalPage) {
			cp = e.data.totalPage;
		}
		eval('('+e.data.funName+'('+cp+'))');
	}
	
	$.fn.zpagebar.defaults = {
		curPage: 1,
		pageSize: 10,
		zeroHide: true
	}
})(jQuery);