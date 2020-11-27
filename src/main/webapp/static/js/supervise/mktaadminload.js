var param = {};
var menthodName = 'eChartsDescartesList';
var objTime;
var _jBox = {};
$(document).ready(function() {
});

// 自适应高度
function widthHeight() {
	// 获取当前页面宽高
	height = $(window).height();
	// 设置显示区域高度
	var tabw = $(".tab").width();
	$(".tab li").css("width", tabw - 18);
};

function page(n, s) {
	$("#pageNo").val(n);
	$("#pageSize").val(s);
	$("#searchForm").submit();
	return false;
}

//
$('#tbodyList tr').live('click',function(){
	top.$.jBox('iframe:'+$('#ctx1').val()+'/market/partiCipant/yddyUnit?participantid='+$(this).find('td').eq(0).find('input').val(),
			{
				border: 5, /* 窗口的外边框像素大小,必须是0以上的整数 */
				opacity: 0.5, /* 窗口隔离层的透明度,如果设置为0,则不显示隔离层 */
				timeout: 0, /* 窗口显示多少毫秒后自动关闭,如果设置为0,则不自动关闭 */
				showType: 'fade', /* 窗口显示的类型,可选值有:show、fade、slide */
				showSpeed: 'fast', /* 窗口显示的速度,可选值有:'slow'、'fast'、表示毫秒的整数 */
				showIcon: true, /* 是否显示窗口标题的图标，true显示，false不显示，或自定义的CSS样式类名（以为图标为背景） */
				showClose: true, /* 是否显示窗口右上角的关闭按钮 */
				draggable: true, /* 是否可以拖动窗口 */
				dragLimit: true, /* 在可以拖动窗口的情况下，是否限制在可视范围 */
				dragClone: false, /* 在可以拖动窗口的情况下，鼠标按下时窗口是否克隆窗口 */
				persistent: true, /* 在显示隔离层的情况下，点击隔离层时，是否坚持窗口不关闭 */
				showScrolling:false, /* 是否显示浏览的滚动条 */
				ajaxData: {},  /* 在窗口内容使用post:前缀标识的情况下，ajax post的数据，例如：{ id: 1 } 或 "id=1" */
				iframeScrolling: 'yes', /* 在窗口内容使用iframe:前缀标识的情况下，iframe的scrolling属性值，可选值有：'auto'、'yes'、'no' */

				title: '用电单元明细', /* 窗口的标题 */
				width: 1000, /* 窗口的宽度，值为'auto'或表示像素的整数 */
				height: 500, /* 窗口的高度，值为'auto'或表示像素的整数 */
				bottomText: '', /* 窗口的按钮左边的内容，当没有按钮时此设置无效 */
				buttons: { '确定': 'ok' }, /* 窗口的按钮 */
				buttonsFocus: 0, /* 表示第几个按钮为默认按钮，索引从0开始 */
				loaded: function (h) {
					$(".jbox-content", top.document).css("overflow-y", "hidden");
				}	
			}
	);
})
