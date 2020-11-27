function savedatefunction(){
	var participantName= form.participantName.value;
	var aliasName= form.aliasName.value.trim();
	var oldName= form.oldName.value.trim();
	var companyType= form.companyType.value.trim();
	var geogrregionid= form.geogrregionid.value.trim();
	var state= form.state.value.trim();
	var starteffectivedate= form.starteffectivedate.value.trim();
	var endeffectivedate= form.endeffectivedate.value.trim();
	var rating= form.rating.value.trim();
	var gdj= form.gdj.value.trim();
	var dfdc= form.dfdc.value.trim();
	alert(dfdc);
	var businessCode= form.businessCode.value.trim();
	var licencecode= form.licencecode.value.trim();
	var dateofissue= form.dateofissue.value.trim();
	var expirationdate= form.expirationdate.value.trim();
	var corporname= form.corporname.value.trim();
	var basin= form.basin.value.trim();
	var corporation= form.corporation.value.trim();
	var organizecode= form.organizecode.value.trim();
	var depositBank= form.depositBank.value.trim();
	var depositaccount= form.depositaccount.value.trim();
	var taxcode= form.taxcode.value.trim();
	var address= form.address.value.trim();
	var postalcode= form.postalcode.value.trim();
	var telephone= form.telephone.value.trim();
	var email= form.email.value.trim();
	var officephone= form.officephone.value.trim();
	var faxphone= form.faxphone.value.trim();
	var webAddress= form.webAddress.value.trim();
	var zdkcdmmfts= form.zdkcdmmfts.value.trim();
	var eastlongitdue= form.eastlongitdue.value.trim();
	var northernlatitude= form.northernlatitude.value.trim();
	var gengroupid= form1.gengroupid.value.trim();
	var gengroupName= form1.gengroupName.value.trim();
	var sharePercent= form1.sharePercent.value.trim();
	if(participantname ==null || aliasname==null||participanttype ==null || companyType==null||participantCode ==null || geogrregionid==null||
			state ==null || starteffectivedate==null||endeffectivedate ==null || rating==null||gdj ==null || businesscode==null||
			licencecode ==null || dateofissue==null||expirationdate ==null || corporname==null||corporation ==null || organizecode==null||
			depositbank ==null || depositname==null||depositaccount ==null || taxcode==null||address ==null || postalcode==null||
			telephone ==null || officephone==null||faxphone ==null || eastlongitdue==null||northernlatitude ==null){
		alert("带星字段不能为空！");
		return;
	};
	$.ajax({
		type:"post",
		url:"${ctx}/powerPlantsInfo/updatePowerPlantsInfo",
		data:{
			participantName:"participantName",
			aliasName:"aliasName",
			oldName:"oldName",
			companyType:"companyType",
			geogrregionid:"geogrregionid",
			state:"state",
			starteffectivedate:"starteffectivedate",
			endeffectivedate:"endeffectivedate",
			gdj:"gdj",
			rating:"rating",
			dfdc:"dfdc",
			businessCode:"businessCode",
			licencecode:"licencecode",
			dateofissue:"dateofissue",
			expirationdate:"expirationdate",
			corporname:"corporname",
			basin:"basin",
			corporation:"corporation",
			organizecode:"organizecode",
			depositBank:"depositBank",
			depositaccount:"depositaccount",
			taxcode:"taxcode",
			address:"address",
			postalcode:"postalcode",
			telephone:"telephone",
			email:"email",
			officephone:"officephone",
			faxphone:"faxphone",
			webAddress:"webAddress",
			zdkcdmmfts:"zdkcdmmfts",
			eastlongitdue:"eastlongitdue",
			northernlatitude:"northernlatitude",
			gengroupid:"gengroupid",
			gengroupName:"gengroupName",
			sharePercent:"sharePercent"		
		},
		contentType:"charset=utf-8",
		success:function(data){
			alert(data);
		}
	});	
}