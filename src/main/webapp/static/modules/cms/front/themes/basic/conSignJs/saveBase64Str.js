//存储文件 服务器测试使用
	function testsign11(contractId){  alert("33333===   " + contractId);
		//alert("contractId" + contractId);
		//getfilebyId(contractId);  
		//服务器测试使用
		var conid = "9fff67a9938b43709912264c7b2b0502";  
		jBox.alert(conid);
		var signUrl ="https://localhost:8442/onlineAPP/viewerjs/web/viewer.html?" +
		"fileURL=http://localhost:8181/jeesite/homePage/getfilebyId?tempId=" + conid + "&useCert=true&position=1:200:400&returnURL=https://www.baidu.com"
		alert(signUrl);
		window.location.href = signUrl;  
	}
	//服务器测试使用
	/*function getfilebyId(contractId){  
		$.ajax({
			url : this.ctx + "/conelecsign/coContractbaseinfo/savefiletopdf",
			dataType : "json",
			data : {"contractId" : contractId},
			type : 'post',
		    success : function(data){
		    	if(data != null){
		    		alert(data.contractId);
		    		//服务器测试使用
		    		var conid = "9fff67a9938b43709912264c7b2b0502";  
		    		jBox.alert(conid);
		    		var signUrl ="https://localhost:8442/onlineAPP/viewerjs/web/viewer.html?" +
		    		"fileURL=http://localhost:8181/jeesite/homePage/getfilebyId?tempId=" + conid + "&useCert=true&position=1:200:400&returnURL=https://www.baidu.com"
		    		alert(signUrl);
		    		window.location.href = signUrl;  
		    	}
		    },
			error : function(data){
				jBox.alert("获取合同文件失败！");
			}
		});  
	}*/
	
	//合同附件下载
	function downloadPdffile(contractid){
		var contid = contractid;
		$.ajax({
			url : this.ctx + "/conelecsign/coContractbaseinfo/downloadCon?guid="+ "145B7B52D2F5F6B1E0534251860AF781",
			dataType : "json",
			data : {"contractId" : contid},
			type : 'post'/*,
		    success : function(data){
		    	if(data != null){
		    		alert(data.contractId);
		    		//服务器测试使用
		    		var conid = "9fff67a9938b43709912264c7b2b0502";  
		    		jBox.alert(conid);
		    		var signUrl ="https://localhost:8442/onlineAPP/viewerjs/web/viewer.html?" +
		    		"fileURL=http://localhost:8181/jeesite/homePage/getfilebyId?tempId=" + conid + "&useCert=true&position=1:200:400&returnURL=https://www.baidu.com"
		    		alert(signUrl);
		    		window.location.href = signUrl;  
		    	}
		    },
			error : function(data){
				jBox.alert("获取合同文件失败！");
			}*/
		});  
		
	}
	
/*	function openpfile(contractId,callback){   
		alert(232);
	   $.ajax({
			url :   "${ctx}/conelecsign/coContractbaseinfo/getfile",
			dataType : "text",
			data : {"contractId" : contractId},
			type : 'post',
				success : callback 
		   });  
	};
*/
		 
