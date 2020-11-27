/*function findLsXx(){
	var type=$("#filter option:selected").val();
	alert(type);
	var updatetime="1";
	if(type=='3'){
		updatetime="3";
	}else if(type=='10'){
		updatetime="10";
	}
	
	$.ajax({
		url :  "http://localhost:8088/jeesite/historyrecord/logMarketparticipant/list",
		type : "post",
		dataType : "json",
		data : queryCondition('updatetime='+updatetime,pageNum,pageSize),
		success : function(data) {
			if(data.successful){
				var d=data.resultValue.items[0];
				var ldata=$.parseJSON(d);
				$('#lsxxTable').datagrid("loadData",ldata);
				
				var	itemCount=data.resultValue.itemCount;
				
				$('#pagebar').zpagebar({
					curPage: pageNum,
					total: itemCount,
					funName: 'findLsXx'
				});
			}
		},
		error : function(event, request, settings) {
			top.$.messager.alert('消息','操作失败!');
		}
	});
}*/

