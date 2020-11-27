$(function() {
	gePrecision(); // 获取动态展示信息
	getGlobalValue();
	var param = {
		"tradeseqId" : $('#tradeseqId')[0].value,
		"traderole" : "1"
	};
	var isExistRes = commenAjax("queryMatchConData", param); // 判断准入交易单元已经存在
	if (isExistRes.success) {
		return;
	} else {
		// beforeQueryData();
	}
});
var dataEncryptFlag;
var dataDisgerFlag;

// 选择申报段数高亮显示
function changeBand(param) {
	var tableRow = $("#contentTable").find('tbody');
	for (var i = 0; i < tableRow[0].rows.length; i++) {
		var bandid = tableRow.find("input[id='bandid']")[i].value; // #8EDEA0
		if (bandid == param) {
			tableRow[0].rows[i].style.backgroundColor = "#8EDEA0";
		} else {
			tableRow[0].rows[i].style.backgroundColor = "#ffffff";
		}
	}
}

// 查询数据前先插入交易空数据
function beforeQueryData() {
	var count = 0;
	var checkcode = $("#checkcode")[0].value;
	var tradeseqId = $('#tradeseqId')[0].value;
	var param = {
		"tradeseqId" : tradeseqId,
		"type" : "2",
		"seqtype" : "1",
		"traderole" : "1"
	};
	var itemRes = commenAjax("getItemCode", param); // 获取条款
	if (itemRes.success) {
		var timeRangeCount = parseInt(itemRes.itemvalue); // 获取配置的时间段段数
		if (timeRangeCount > 0) { // 如果大于0则显示，否则提示
			var params = {
				"tradeseqId" : tradeseqId,
				"count" : timeRangeCount,
				"traderole" : "1"
			};
			var itemRes = commenAjax("queryData?checkcode=" + checkcode, params);
			if (itemRes.success) {
				$("#searchForm").submit();
			}
		} else {
			jBox.alert("请先配置时间段后再申报！", "消息");
		}
	} else {
		jBox.alert("请先配置条款后再申报！", "消息");
	}
}

// tab切换table
function myclick(v) {
	var lif = document.getElementById("tab" + v);
	for (var k = 1; k <= 3; k++) {
		var liother = document.getElementById("tab" + k);
		if (k == v) {
			lif.style.backgroundColor = "#5EB1FD";
			liother.childNodes[1].style.color = "#fff";
		} else {
			liother.style.backgroundColor = "";
			liother.childNodes[1].style.color = "#416AA3";
		}
	}
	var divs = document.getElementsByClassName("tab_css");
	for (var i = 0; i < divs.length; i++) {
		var divv = divs[i];
		if (divv == document.getElementById("table" + v)) {
			divv.style.display = "block";
			tabOnChange(divv, 1);
		} else {
			divv.style.display = "none";
		}
	}
}

// 切换tab时跳转页
function tabOnChange(divv, thepage) {
	var jydyIds = "";
	var item;

	var tableRow = $("#contentTable").find('tbody');
	for (var i = 0; i < tableRow[0].rows.length; i++) {
		var jydyId = tableRow.find("input[id='jydyIds']")[i].value;
		if (i == (tableRow[0].rows.length - 1)) {
			jydyIds += jydyId;
		} else {
			jydyIds += jydyId + ",";
		}
	}

	var tradeseqId = $('#tradeseqId')[0].value;
	var param = {
		"unitId" : jydyIds,
		"tradeseqId" : tradeseqId,
		"thepage" : thepage
	};
	if (divv.id == "table2") {
		item = commenAjax("findJzSellerLimitEng", param);
		divv.innerHTML = item.innerHtml;
		if (item.success == "false") {
			jBox.alert(item.resInfo, "消息");
		}
	} else if (divv.id == "table3") {
		item = commenAjax("findJzSellerUnitGroup", param);
		divv.innerHTML = item.innerHtml;
		if (item.success == "false") {
			jBox.alert(item.resInfo, "消息");
		}
	}
}

// 点击跳转页触发
function getClickPage(thepage, pageSize, val) {
	var divs = document.getElementsByClassName("tab_css");
	for (var i = 0; i < divs.length; i++) {
		var divv = divs[i];
		if (divv.style.display == "block") {
			if (thepage > val || isNaN(thepage)) {
				tabOnChange(divv, 1);
			} else {
				tabOnChange(divv, thepage);
			}
		}
	}
}

// 获取交易序列的精度
function gePrecision() {
	var energyunits = "MWh";// 单位：MWh（兆瓦时）、WKWh（万千瓦时）
	var capacityunit = 'MW';
	var energyPrecision = null;
	var pricePrecision = null;
	var difference = null; // 是否显示电价精度
	var sumCapacity = null;// 是否显示容量合计
	var powerPrecision = null; // 电费精度
	var sumCapacityValue = null; // 容量合计上限值
	var powerEnergyType = null; // 发电侧申报电量类型
	var isdeconeenergy = null; // 售方申报一个电量
	var issalemarginalprice = null; // 售方按边际条件申报
	var istradeyeartomonths = null;
	var isdecenergyscale = null;
	var bandPriceLowLimit = null;
	var bandEnergyHiLimit = null;
	// 添加电量电价精度动态显示
	var tradeseqId = $('#tradeseqId')[0].value;
	var params = {
		"tradeseqId" : tradeseqId
	};
	var precision = commenAjax("getPrecision", params);

	if (precision.success) {
		if (precision != null && precision.list.length > 0) {
			var precisionNum = precision.list;
			for (var j = 0; j < precisionNum.length; j++) {
				if ("ENGERY_PRECISION" == precisionNum[j][0]) {
					energyPrecision = precisionNum[j][1];
				} else if ("PRICE_PRECISION" == precisionNum[j][0]) {
					pricePrecision = precisionNum[j][1];
				} else if ("POWER_RATE_PRECISION_RESULT" == precisionNum[j][0]) {
					powerPrecision = precisionNum[j][1];
				} else if ("IS_PRICE_DIFFERENCE" == precisionNum[j][0]) {
					difference = precisionNum[j][1];
				} else if ("IS_DEC_CAPACITY" == precisionNum[j][0]) {
					sumCapacity = precisionNum[j][1];
				} else if ("POWER_DES_ENERGY_TYPE" == precisionNum[j][0]) {
					powerEnergyType = precisionNum[j][1];
				} else if ("IS_DEC_ONE_ENERGY" == precisionNum[j][0]) { // 售方申报一个电量
					isdeconeenergy = precisionNum[j][1];
				} else if ("IS_SALE_MARGINAL_PRICE" == precisionNum[j][0]) {// 售方按边际条件申报
					issalemarginalprice = precisionNum[j][1];
				} else if ("IS_TRADE_YEAR_TO_MONTHS" == precisionNum[j][0]) {
					istradeyeartomonths = precisionNum[j][1];
				} else if ('IS_DEC_ENERGY_SCALE' == precisionNum[j][0]) {
					isdecenergyscale = precisionNum[j][1];
				} else if ('BAND_PRICE_LOW_LIMIT' == precisionNum[j][0]) {
					bandPriceLowLimit = precisionNum[j][1];
				} else if ('BAND_ENERGY_HI_LIMIT' == precisionNum[j][0]) {
					bandEnergyHiLimit = precisionNum[j][1];
				}
			}
		}
	}
	var tex = "";
	var unit = "兆瓦时";
	if (energyunits == "WKWh") {
		unit = "万千瓦时";
	}
	var rldw = "兆瓦";
	if (capacityunit == "WKW") {
		rldw = "万千瓦";
	}
	if (energyPrecision != null) {
		if (energyPrecision < 0) {
			tex += "申报电量精确到" + Math.pow(10, energyPrecision) + unit + "；";
		} else {
			tex += "按照" + Math.pow(10, energyPrecision) + unit + "的整数倍申报电量，";
		}
	} else {
		tex += "按照10" + unit + "的整数倍申报电量，";
	}
	if (pricePrecision != null) {
		if (pricePrecision > 0) {
			tex += "按照" + Math.pow(10, pricePrecision) + "元/兆瓦时的整数倍申报电价；电量单位："
					+ unit + "，容量单位：" + rldw + "，电价单位：元/兆瓦时";
		} else {
			tex += "申报电价精确到" + Math.pow(10, pricePrecision) + "元/兆瓦时；电量单位："
					+ unit + "，容量单位：" + rldw + "，电价单位：元/兆瓦时";
		}
	} else {
		tex += "申报电价精确到0.01元/兆瓦时；电量单位：" + unit + "，容量单位：" + rldw
				+ "，电价单位：元/兆瓦时";
	}
	$("#reportTimelabel")[0].innerHTML = tex;

	// 显示电价申报模式
	if (difference == null || difference == "") {
		var co = commenAjax("checkShowTex", params);
		if (co.success) {
			if (co != null && co.list.length > 0) {
				var Columns = co.list[0];
				var tradetype_code = Columns[1];
				if (tradetype_code.substring(0, 4) == '2001') {
					if (Columns.length > 0) {
						if (Columns[0] == "1") {
							$("#reportLeftlabel")[0].innerHTML = "电价申报模式：价差模式";
						} else {
							$("#reportLeftlabel")[0].innerHTML = "";
						}
					} else {
						$("#reportLeftlabel")[0].innerHTML = "电价申报模式：价差模式";
					}
				} else {
					$("#reportLeftlabel")[0].innerHTML = "";
				}
			}
		}
	} else if (difference == "1") {// 是
		$("#reportLeftlabel")[0].innerHTML = "电价申报模式：价差模式";
	} else if (difference == "0") {// 否
		$("#reportLeftlabel")[0].innerHTML = "";
	}
}

// 判断是否配置申报电价上下限
function checkPrice() {
	var tradeseqId = $("input[id='tradeseqId']").attr('value');
	var params = {
		"tradeseqId" : tradeseqId
	};
	var res = commenAjax("checkprice", params);
	if (res != null && res.length > 0) {
		result = res[0];
		if (result.bool) {
			if (result.list.length > 0) {
				for (var i = 0; i < result.list.length; i++) {
					var name = result.list[i][0];
					var value = result.list[i][1];
					if (name == 'SALE_HI_PRICE') {
						maxprice = value;
					} else if (name == 'SALE_LOW_PRICE') {
						minprice = value;
					}
				}
			}
		}
	}
}

var bandGroup = [];
// 数据校验
function checkEngPrice() {
	var param = {
		"tradeseqId" : $('#tradeseqId')[0].value
	};
	var precision = commenAjax("getPriceAndEngPrec", param);
	var pricePrecision; // 电价精度
	var energyPrecision;// 电量精度
	if (precision.success) {
		pricePrecision = precision.pricePrecision;
		energyPrecision = precision.energyPrecision;
	}

	// 多段校验
	var bandNum = $("#bundNum").val();
    if (bandNum != "1") {
        //var bandGroup = [];
        var checklist = getCheckedList();
        if(checklist.length % bandNum != 0){
            return [false,"当前为<span style='color:red' >" + bandNum + "段式</span>申报模式，请勾选全部数据，再进行申报！",0,""];
        }

        var jydyCheckedNumList = getCheckedJYDYList();
        for(var jydyi=0;jydyi<jydyCheckedNumList.length;jydyi++){
            if (jydyCheckedNumList[jydyi]%bandNum != 0){
                return [false,"当前为<span style='color:red' >" + bandNum + "段式</span>申报模式，请勾选全部数据，再进行申报！",0,""];
            }
        }

		var everyUnitEng = [];
		var num = 0;
		var etableRow = $("#contentTable").find('tbody');
		for (var i = 0; i < etableRow[0].rows.length; i++) {
			var erowCheck = etableRow.find("input[id='checkId']")[i];
			//if (erowCheck.checked) {
				var jydyIds = etableRow.find("input[id='jydyIds']")[i].value;
				var energyhi = etableRow.find("input[id='energyhi']")[i].value;
				var energylow = etableRow.find("input[id='energylow']")[i].value;
				var evryEng = etableRow.find("input[id='declarEng']")[i].value != null ? Number(etableRow.find("input[id='declarEng']")[i].value) : 0;
				everyUnitEng[i] = {"unitid" : jydyIds,"evryEng" : evryEng};
				if (( i % bandNum ) == 0) {
					bandGroup[num++] = {"egroupId" : jydyIds,"totalEng" : evryEng,
						"egroupEngHi" : energyhi,"egroupEnglow" : energylow };
				} else {
					for (var m = 0; m < bandGroup.length; m++) {
						if (jydyIds == bandGroup[m].egroupId) {
							bandGroup[m].totalEng = bandGroup[m].totalEng + evryEng;
						}  
					}
				}
			//}
		}
		
		//判断每一段电量占总量比
		for(var a = 0; a < everyUnitEng.length; a++){
			var evUnitId = everyUnitEng[a].unitid;
			var evUnitEng = everyUnitEng[a].evryEng;
			for(var b = 0; b < bandGroup.length; b++){
				var groupUnitId = bandGroup[b].egroupId;
				var groupEng = bandGroup[b].totalEng;
				if(evUnitId == groupUnitId){
					var engPercent = evUnitEng / groupEng;
					if(engPercent < 0.3 ){
						return [false,"第" + ((a % bandNum)+1) + "段电量占总电量比小于<span style='color:red'>30%</span>，请重新填写该段电量，再进行申报！",a, "energy" ];
					}
				}
			}
		}

		// 判断申报多段电量和是否超过电量限额上、下限
		for (var n = 0; n < bandGroup.length; n++) {
			var eGroupEng = bandGroup[n].totalEng;
			var eGroupEngHi = bandGroup[n].egroupEngHi;
			var eGroupEnglow = bandGroup[n].egroupEnglow;
			if (eGroupEngHi != null && eGroupEngHi != "") {
				if (eGroupEng > eGroupEngHi) {
					return [
							false,
							"相同交易单元、时间段，申报电量（总）必须小于电量（总）上限" + eGroupEngHi
									+ "兆瓦时！", (n * bandNum), "energy" ];
				}
			}
			if (eGroupEnglow != null && eGroupEnglow != "") {
				if (eGroupEng < eGroupEnglow) {
					return [
							false,
							"相同交易单元、时间段，申报电量（总）必须大于电量（总）下限" + eGroupEnglow
									+ "兆瓦时！！", (n * bandNum), "energy" ];
				}
			}
		}

		//判断申报多段电价是否有相同的
		var epriceGroup = [];
		for (var a = 0; a < etableRow[0].rows.length; a++) {
			var erowCheck = etableRow.find("input[id='checkId']")[a];
			var jydyId = etableRow.find("input[id='jydyIds']")[a].value;
			var declarPrice = Number(etableRow.find("input[id='declarPrice']")[a].value);
			if (erowCheck.checked) {
				epriceGroup[a] = {
					"jydyid" : jydyId,
					"price" : declarPrice
				};
				for (var b = 0; b < etableRow[0].rows.length; b++) {
					var nextrow = etableRow.find("input[id='checkId']")[b];
					var nextjydy = etableRow.find("input[id='jydyIds']")[b].value;
					var nextprice = Number(etableRow.find("input[id='declarPrice']")[b].value);
					if (b != a) {
						if (epriceGroup[a].jydyid == nextjydy
								&& epriceGroup[a].price == nextprice 
								&& etableRow.find("input[id='declarPrice']")[a].value != ""
								&& etableRow.find("input[id='declarPrice']")[b].value != "") {
							return [ false, "相同交易单元、时间段，不同阶梯申报段数的电价相同，无法申报！",b, "price" ];
						}
					}
				}
			}
		}
	}

	// 单元组限额电量设置
	var groupIdArr = [];
	var count = 0;
	var tableRow = $("#contentTable").find('tbody');
	for (var i = 0; i < tableRow[0].rows.length; i++) {
		var rowCheck = tableRow.find("input[id='checkId']")[i];
		// if(rowCheck.checked){
		var groupId = tableRow.find("input[id='groupId']")[i].value;
		var groupEngHi = tableRow.find("input[id='groupEngHi']")[i].value;
		var groupEnglow = tableRow.find("input[id='groupEnglow']")[i].value;
		if (count == 0) {
			groupIdArr[count++] = {
				"groupId" : groupId,
				"totalEng" : 0,
				"groupEngHi" : groupEngHi,
				"groupEnglow" : groupEnglow
			};
		} else {
			for (var m = 0; m < groupIdArr.length; m++) {
				if (groupId != groupIdArr[m].groupId) {
					groupIdArr[count++] = {
						"groupId" : groupId,
						"totalEng" : 0,
						"groupEngHi" : groupEngHi,
						"groupEnglow" : groupEnglow
					};
				}
			}
		}
		// }
	}

	for (var j = 0; j < tableRow[0].rows.length; j++) {
		var rowCheck = tableRow.find("input[id='checkId']")[j];
		var rowEng = tableRow.find("input[id='declarEng']")[j];
		var rowPrice = tableRow.find("input[id='declarPrice']")[j];
		if (rowCheck.checked) {
			var energy = rowEng.value;

			// 电量不能为空
			if (energy == null || rowEng.value == "") {
				return [ false, "申报的电量或电价不能为空！", j, "energy" ];
			} else {
				var v1 = checkNumber(energy);
				if (!v1) {
					return [ false, "申报的电量不是有效数字！", j, "energy" ];
					break;
				}else{
					energy = Number(rowEng.value);
					if (energy > 9999999999) {
						return [ false, "电量请输入最多10位数字！", j, "energy" ];
					}
				}
			}
			// 电价不能为空
			if (rowPrice == null || rowPrice.value == "") {
				return [ false, "申报的电量或电价不能为空！", j, "price" ];
			} else {
				var v2 = checkNumber(rowPrice.value);
				if (!v2) {
					return [ false, "申报的电价不是有效数字！", j, "price" ];
					break;
				} else {
					rowPrice = Number(rowPrice.value);
					if (rowPrice > 999999) {
						return [ false, "电价请输入最多6位数字！", j, "price" ];
					}
				}
			}

			// 电量不能为负
			if (isNaN(energy) || energy < 0) {
				return [ false, "申报的电量应该填写正数！", j, "energy" ];
			}

			if (bandNum == "1") {
				// 电量上下限额校验
				var energy = Number(tableRow.find("input[id='declarEng']")[j].value);
				var hi_lmt = tableRow.find("input[id='energyhi']")[j].value == "" ? null
						: Number(tableRow.find("input[id='energyhi']")[j].value);
				var low_lmt = tableRow.find("input[id='energylow']")[j].value == "" ? null
						: Number(tableRow.find("input[id='energylow']")[j].value);
				var showText = "";
				if (energy && (hi_lmt || low_lmt)) {
					if (hi_lmt == null) {
						if (low_lmt != null) {
							if (energy < low_lmt) {
								showText = "相同交易单元、时间段，申报电量（总）必须大于电量（总）下限"
										+ energy_low_lmt_checked + "兆瓦时！";
							}
						}
					} else {
						if (low_lmt != null) {
							if (energy < low_lmt || energy > hi_lmt) {
								showText = "相同交易单元、时间段，申报电量（总）必须在电量（总）上限"
										+ hi_lmt + "兆瓦时和下限" + low_lmt
										+ "兆瓦时之间！";
							}
						} else if (energy > hi_lmt) {
							showText = "相同交易单元、时间段，申报电量（总）必须小于电量（总）上限" + hi_lmt
									+ "兆瓦时！";
						}
					}
				}
				if (showText != null && showText != "") {
					return [ false, showText, j, "energy" ];
					break;
				}
			}
			
			// 电价限额
			var price = Number(tableRow.find("input[id='declarPrice']")[j].value);
			var hi_price = tableRow.find("input[id='pricehi']")[j].value == "" ? null
					: Number(tableRow.find("input[id='pricehi']")[j].value);
			var low_price = tableRow.find("input[id='pricelow']")[j].value == "" ? null
					: Number(tableRow.find("input[id='pricelow']")[j].value);
			var rulePriceHi = tableRow.find("input[id='rulePriceHi']")[j].value == "" ? null
					: Number(tableRow.find("input[id='rulePriceHi']")[j].value);
			var rulePricelow = tableRow.find("input[id='rulePricelow']")[j].value == "" ? null
					: Number(tableRow.find("input[id='rulePricelow']")[j].value);
			var priceText = "";
			if (price != null && (hi_price == null || low_price == null)) {
				if (rulePriceHi == null) {
					if (rulePricelow != null) {
						if (price < rulePricelow) {
							priceText = "申报价格不能低于价格下限" + rulePricelow
									+ "元/兆瓦时！";
						}
					}
				} else {
					if (rulePricelow != null) {
						if (price < rulePricelow || price > rulePriceHi) {
							priceText = "申报电价必须在电价上限" + rulePriceHi
									+ "元/兆瓦时和下限" + rulePricelow + "元/兆瓦时之间！";
						}
						if (price > rulePriceHi && rulePriceHi != null) {
							priceText = "申报价格不能高于价格上限" + rulePriceHi + "元/兆瓦时！";
						}
					}
				}
			} else if (price != null && (hi_price != null || low_price != null)) {
				if (price < low_price) {
					priceText = "申报价格不能低于售方申报价格下限" + low_price + "元/兆瓦时！";
				} else if (price > hi_price) {
					priceText = "申报价格不能高于售方申报价格上限" + hi_price + "元/兆瓦时！";
				}
			} else {
				if (low_price != null) {
					if (price < low_price || price > hi_price) {
						priceText = "申报电价必须在电价上限" + hi_price + "元/兆瓦时和下限"
								+ low_price + "元/兆瓦时之间！";
					}
				} else if (price > hi_price && hi_price != null) {
					priceText = "申报电价必须小于电价上限" + hi_price + "元/兆瓦时！";
				}
			}
			if (priceText != null && priceText != "") {
				return [ false, priceText, j, "price" ];
				break;
			}
			var bool2 = null;
			var bool3 = null;
			//rowPrice = rowPrice.value;
			if (pricePrecision == null) {
				bool2 = checkFloatNum(rowPrice, -2);
				if (!bool2) {
					if (rowPrice) {// 电价的验证 保留1位小数
						return [
						        false,
						        "请输入最多6位整数,最多" + Math.abs(pricePrecision)
						        + "位小数的数字！", j, "price" ];
						break;
					}
				}
			} else {
				bool2 = checkFloatNum(rowPrice, pricePrecision);
				if (!bool2) {
					if (rowPrice) {// 电价的验证 保留1位小数
						var tex = "";
						if (pricePrecision >= 0) {
							tex += "电价必须为" + Math.pow(10, pricePrecision)
							+ "的整数倍！";
						} else {
							tex += "请输入最多6位整的数,最多" + Math.abs(pricePrecision)
							+ "位小数的数字！"
						}
						if (tex != null && tex != "") {
							return [ false, tex, j, "price" ];
							break;
						}
					}
				}
			}
			if (energyPrecision != null) {
				bool3 = checkNum(energy, energyPrecision);
				if (!bool3) {
					if (energy != null && Number(energy) != 0) {// 电量的验证 10的整数倍
						var tex = "";
						if (energyPrecision < 0) {
							tex += "请输入最多10位整数,最多" + Math.abs(energyPrecision)
							+ "位小数的数字！"
						} else {
							if (parseFloat(rowEng.value) % Math.pow(10, energyPrecision) != 0) {
								tex += "电量(总)必须为"
									+ Math.pow(10, energyPrecision)
									+ "的整数倍！";
							}
						}
						if (tex != null && tex != "") {
							return [ false, tex, j, "energy" ];
							break;
						}
					}
				}
			}
		}
		

		var egroupId = tableRow.find("input[id='groupId']")[j].value;
		var evryEng = tableRow.find("input[id='declarEng']")[j].value != null ? Number(tableRow
				.find("input[id='declarEng']")[j].value)
				: 0;

		// 循环添加单元组电量总和
		for (var k = 0; k < groupIdArr.length; k++) {
			if (egroupId == groupIdArr[k].groupId) {
				groupIdArr[k].totalEng = groupIdArr[k].totalEng + evryEng;
			}
		}
	}

	// 判断申报电量是否超过单元组限额
	for (var n = 0; n < groupIdArr.length; n++) {
		var evryGroupEng = groupIdArr[n].totalEng;
		var evryGroupEngHi = groupIdArr[n].groupEngHi;
		var evryGroupEnglow = groupIdArr[n].groupEnglow;
		if (evryGroupEngHi != null && evryGroupEngHi != "") {
			if (evryGroupEng > evryGroupEngHi) {
				return [ false, "申报的电量总和不能大于单元组电量限额总上限！", 0, "energy"  ];
			}
		}
		if (evryGroupEnglow != null && evryGroupEnglow != "") {
			if (evryGroupEng < evryGroupEnglow) {
				return [ false, "申报的电量总和不能小于单元组电量限额总下限！", 0, "energy"  ];
			}
		}
	}
}

// 数据申报
function sellerDeclar() {
	var tradeseqId = $("#tradeseqId")[0].value;
	var res = commenAjax("getdeclareTime",{"tradeseqId" : tradeseqId});  
	if (!res.success) { 
		jBox.alert(res.msg,"消息");
		return;
	}
	
	// 判断是否有选择
	var checkde_val = [];
	var checkcode = $("#checkcode")[0].value;
	var tableerRow = $("#contentTable").find('tbody');
	var checkedlist = getCheckedList();
	if (checkedlist.length == 0) {
		jBox.alert("请勾选要申报的数据！", "消息");
		return;
	}
	var tableRow = [];
	var index = 0;
	// 对选择的选项进行申报
	for (var i = 0; i < tableerRow[0].rows.length; i++) {
		var JsonStr = "";
		var rowCheck = tableerRow.find("input[id='checkId']")[i];
		if (rowCheck.checked) {
			var seqId = rowCheck.value;
			var rowEng = tableerRow.find("input[id='declarEng']")[i].value;
			var rowPrice = tableerRow.find("input[id='declarPrice']")[i].value;
			var rowTradeCode = tableerRow.find("input[id='tradetypeCode']")[i].value;
			var rowBidinfoId = tableerRow.find("input[id='bidinfoid']")[i].value;
			var energyHiLimit = tableerRow.find("input[id='energyhi']")[i].value;
			var energyLowLimit = tableerRow.find("input[id='energylow']")[i].value;
			var pricehilimit = tableerRow.find("input[id='pricehi']")[i].value;
			var pricelowlimit = tableerRow.find("input[id='pricelow']")[i].value;
			var bundid = tableerRow.find("input[id='bandid']")[i].value;
            var jydyIds = tableerRow.find("input[id='jydyIds']")[i].value;
			JsonStr = {
				"seqId" : seqId,
				"rowEng" : rowEng,
				"rowPrice" : rowPrice,
				"rowTradeCode" : rowTradeCode,
				"rowBidinfoId" : rowBidinfoId,
				"energyHiLimit" : energyHiLimit,
				"energyLowLimit" : energyLowLimit,
				"pricehilimit" : pricehilimit,
				"pricelowlimit" : pricelowlimit,
				"bundid" : bundid,
				"jydyIds":jydyIds
			};
			// JsonStr += '{\"seqId\":' + seqId + ',\"rowEng\":' + rowEng +
			// ',\"rowPrice\":' + rowPrice + ',\"rowTradeCode\":' + rowTradeCode
			// + ',\"rowBidinfoId\":\"' + rowBidinfoId +'\"}';
			// tableRow[i-1] = eval('(' + JsonStr +')');
			tableRow[index++] = JsonStr;
		}
		// alert(tableRow[i-1].seqId + " " + tableRow[i-1].rowEng + " " +
		// tableRow[i-1].rowPrice + " " + tableRow[i-1].rowTradeCode);
	}

	
	// checkPrice(tradeseqId);// 判断是否申报了购方申报价格上，下限
	// 电量、电价数据校验
	var res = checkEngPrice();
	if (res != undefined && !res[0]) {
		if (res[1]) {
			if (res[3] != null && res[3] == "energy") {
				$('#contentTable').find('tbody').find("input[id='declarEng']")[res[2]].style.borderColor = "red";
				$('#contentTable').find('tbody')
						.find("input[id='declarPrice']")[res[2]].style.borderColor = "";
			} else if (res[3] != null && res[3] == "price") {
				$('#contentTable').find('tbody')
						.find("input[id='declarPrice']")[res[2]].style.borderColor = "red";
				$('#contentTable').find('tbody').find("input[id='declarEng']")[res[2]].style.borderColor = "";
			}
			jBox.alert(res[1], "消息");
		}
		return;
	}

	/*
	 * var isEncrypt = commenAjax('getEncryptflag', {}); var dataEncryptFlag =
	 * isEncrypt.DATA_ENCRYPT_FLAG;
	 */
	var bandNum = $("#bundNum").val();
	var temp1 = "<div style='line-height:26px;'>" +
				"<span style='color:red;font-size:18px;'>&nbsp;您要申报的电量、电价如下，请仔细核对：</span><br/>";
	if (tableRow.length > 0) {
		var array = [];
		for (var k = 0; k < tableRow.length; k++) {
			var bidinfoid;
			var energy;
			var price;       //alert(bandGroup[Math.floor(k / bandNum)].totalEng);
			var bundid = tableRow[k].bundid.toString();
            var jydyId = tableRow[k].jydyIds.toString();
			var typeCode = tableRow[k].rowTradeCode.toString();
			var total=0;
			for (var m = 0; m < tableRow.length; m++) {
				if (jydyId == tableRow[m].jydyIds) {
					var evryGroupEng = tableRow[m].rowEng
					total= total + parseFloat(evryGroupEng);
				}
			}
			var evryGroupEng = bandNum != "1" ? bandGroup[Math.floor(k / bandNum)].totalEng : tableRow[k].rowEng;
			for (var i= 0;i<bandGroup.length;i++){
				if(jydyId ==bandGroup[i].egroupId){
					evryGroupEng=bandGroup[i].totalEng
				}
			}
			temp1 += "<span style='font-size:17px;padding-left:17px;'>"
					+ ("第" + bundid + "段  电量：" + tableRow[k].rowEng + "MWh="
							+ Math.round(tableRow[k].rowEng) / 10 + "万千瓦时="
							+ Math.round(tableRow[k].rowEng) / 100000 + "亿千瓦时" 
							+ ((bandNum != "1") ? "，占总量比：" + (  Math.round(tableRow[k].rowEng / total * 100)+ "%") : "")
							+ "&nbsp;\；&nbsp;电价："
							+ tableRow[k].rowPrice + "元/兆瓦时="
							+ Math.round(tableRow[k].rowPrice) / 1000 + "元/千瓦时；") ;
					//+ "<br/>";
			if(bandNum != "1" && Math.floor((k+1) % bandNum) == 0){
				temp1 += "<br/>以上" + bandNum + "段电量的总和：" + evryGroupEng + "MWh="
						+ Math.round(evryGroupEng) / 10 + "万千瓦时="
						+ Math.round(evryGroupEng) / 100000 + "亿千瓦时 。" ;
			}
			temp1 +=  "</span><br/>";
			if (dataEncryptFlag == 1) { // 如果需要加密，则对数据进行加密处理
				bidinfoid = tableRow[k].rowBidinfoId;
				energy = getEncryptMessage(tableRow[k].rowEng);
				price = getEncryptMessage(tableRow[k].rowPrice);
			} else {
				bidinfoid = tableRow[k].rowBidinfoId;
				energy = tableRow[k].rowEng;
				price = tableRow[k].rowPrice;
			}
			if (typeCode.substr(0, 3) == '100') {
				array[k] = bidinfoid + ";" + jydyId + ";" + tradeRole + ";"
						+ band + ";" + tradeTimepart + ";" + timeRange + ";"
						+ energy + ";" + price + ";" + energyPeriod1 + ";"
						+ pricePeriod1 + ";" + energyPeriod2 + ";"
						+ pricePeriod2 + ";" + energyPeriod3 + ";"
						+ pricePeriod3 + ";" + energyPeriod4 + ";"
						+ pricePeriod4 + ";" + energyPeriod5 + ";"
						+ pricePeriod5 + ";" + userMaxPower + ";"
						+ vendeeGenRate + ";" + requiremanacost + ";"
						+ matchjydyids + ";" + powerPeriod + ";" + powerPeriod1
						+ ";" + powerPeriod2 + ";" + powerPeriod3 + ";"
						+ powerPeriod4 + ";" + powerPeriod5;
			} else {
				// 加密 array[k] =
				// bidinfoid+";"+jydyId+";"+tradeRole+";"+band+";"+tradeTimepart+";"+timeRange+";"+getEncryptMessage(energy)+";"+getEncryptMessage(price);
				// array[k] = '{\"bidinfoid\":' + bidinfoid + ',\"energy\":'
				// +energy+ ',\"price\":' + price + '}';
				array[k] = {
					"bidinfoid" : bidinfoid,
					"energy" : energy,
					"price" : price,
                    "bandId" : bundid,
                    "jydyId":jydyId
				};
				/*
				 * +getEncryptMessage(energyPeriod1)+";"+getEncryptMessage(pricePeriod1)+";"+getEncryptMessage(energyPeriod2)+";"
				 * +getEncryptMessage(pricePeriod2)+";"+getEncryptMessage(energyPeriod3)+";"+getEncryptMessage(pricePeriod3)+";"
				 * +getEncryptMessage(energyPeriod4)+";"+getEncryptMessage(pricePeriod4)+";"+getEncryptMessage(energyPeriod5)+";"
				 * +getEncryptMessage(pricePeriod5)+";"+userMaxPower+";"+vendeeGenRate+";"+requiremanacost+";"+matchjydyids+";"+getEncryptMessage(powerPeriod)+";"
				 * +getEncryptMessage(powerPeriod1)+";"
				 * +getEncryptMessage(powerPeriod2)+";"
				 * +getEncryptMessage(powerPeriod3)+";"
				 * +getEncryptMessage(powerPeriod4)+";"
				 * +getEncryptMessage(powerPeriod5);
				 */
			}
		}
	  
		top.jBox(temp1 + "</div>", {
			width : 'auto',
			height : 220 + tableRow.length * 20,
			title : "信息核对",
			buttons : {
				'确认申报' : 'ok',
				'取消' : 'no'
			},
			submit : function(v, h, f) {
				if (v == 'ok') {
					var jsonData = new Object();
					jsonData["entity"] = array;
					jsonData["tradeseqId"] = $('#tradeseqId')[0].value;
					jsonData['dataEncryptFlag'] = dataEncryptFlag;//me.dataEncryptFlag;//
					//增加加密标志
					jsonData['dataDisgerFlag'] = dataDisgerFlag;//me.dataDisgerFlag;//
					//增加加密标志
					var result = commenAjax("sellerSaveData?checkcode=" +
					checkcode,{"params":JSON.stringify(jsonData)});
					if(result.success){
						top.$.jBox.alert(result.msg,"消息");
					}else{
						top.$.jBox.alert(result.msg,"消息");
					}
					$("#searchForm").submit();
				}else{
					top.jBox.close();
				}
			}
		});
	}
}

function getCheckedList(){
    var tableerRow = $("#contentTable").find('tbody');
    var checkde_val = [];
    for (var i = 0; i < tableerRow[0].rows.length; i++) {
        var erowCheck = tableerRow.find("input[id='checkId']")[i];
        if (erowCheck.checked) {
            checkde_val.push(erowCheck.value);
        }
    }
    return checkde_val;
}

function getCheckedJYDYList(){
    var tableerRow = $("#contentTable").find('tbody');
    var checkde_val = [];
    for (var i = 0; i < tableerRow[0].rows.length; i++) {
        var erowCheck = tableerRow.find("input[id='checkId']")[i];
        if (erowCheck.checked) {
            var jydyIds = tableerRow.find("input[id='jydyIds']")[i].value;
            checkde_val.push(jydyIds);
        }
    }
    return arrCheck(checkde_val);
}

function arrCheck(arr){
    var newArr = [];
    for(var i=0;i<arr.length;i++){
        var temp=arr[i];
        var count=0;
        for(var j=0;j<arr.length;j++){
            if(arr[j]==temp){
                count++;
                arr[j]=-1;
            }
        }
        if(temp != -1){
            newArr.push(count)
        }
    }
    return newArr;
}

// 数据进行加密
function getEncryptMessage(msg) {
	if (dataEncryptFlag == '1') {
		var cipher;
		if(msg) {
			var CryptoAgency = document.getElementById("CryptoAgent");
			try{
				val = CryptoAgency.EncryptMessageasEnvelope_3DES(msg); //alert(val);
			}catch (e) {
				document.getElementById("eDiv").remove();
				getGlobalValue();
				CryptoAgency = document.getElementById("CryptoAgent");
				val = CryptoAgency.EncryptMessageasEnvelope_3DES(msg); //alert(val);*/
			}
			cipher = val.replace(/\+/g,"@@@");
			return cipher;
		}
		return null;
	}
	return msg;
}

function getGlobalValue() {
	// 获取服务器配置，判断是否加密需要加密
	var isEncrypt = commenAjax('getEncryptflag', {});
	dataEncryptFlag = isEncrypt.DATA_ENCRYPT_FLAG;
	dataDisgerFlag = isEncrypt.DATA_DISGER_FLAG;
	if (dataEncryptFlag != null && dataEncryptFlag == '1') { // 等于1时才需要加密，
		var encryptInfo = commenAjax('getEncryptCfg', {});
		if (encryptInfo) {
			var certContent = encryptInfo.publiccert;
			if (dataEncryptFlag == '1' && !certContent) {// 启用加密没有获取证书时需要给出提示，改为非加密数据
				jBox.alert("获取加密证书失败，请联系管理员进行确认！继续申报将存在安全隐患！", "提示");
				dataEncryptFlag = '0';
			}
		}
	}

	// 获取加密工具类
	if (dataEncryptFlag == '1') {
		try {
			// me.cfcaUtil.setCertificate(me.certContent);
			var eDiv = document.createElement("div");
			if (navigator.appName.indexOf("Internet") >= 0) {
				if (window.navigator.cpuClass == "x86") {
					eDiv.innerHTML = "<object id=\"CryptoAgent\" codebase=\"CryptoKit.Standard.x86.cab\" classid=\"clsid:2F9BEB71-4164-4837-99EE-ED8065B58658\"></object>";
				} else {
					eDiv.innerHTML = "<object id=\"CryptoAgent\" codebase=\"CryptoKit.Standard.x64.cab\" classid=\"clsid:EC380EBA-922E-41F8-89FF-2FE4DCD200E3\"></object>";
				}
			} else {
				eDiv.innerHTML = "<embed id=\"CryptoAgent\" type=\"application/npCryptoKit.standard.x86\" style=\"height: 0px; width: 0px\">";
			}
			document.body.appendChild(eDiv);

			var CryptoAgency = document.getElementById("CryptoAgent");
			var cert = certContent;
			// var cert =
			// "MIID9TCCAt2gAwIBAgIFEACBMZYwDQYJKoZIhvcNAQEFBQAwGzELMAkGA1UEBhMCQ04xDDAKBgNVBAoTA0JPQzAeFw0xNDA1MDcwMzAyMzdaFw0xNjA1MDcwMzAyMzdaMHIxCzAJBgNVBAYTAmNuMRcwFQYDVQQKEw5DRkNBIFRFU1QgT0NBMTENMAsGA1UECxMEU0dDQzEUMBIGA1UECxMLRW50ZXJwcmlzZXMxJTAjBgNVBAMUHDA0MUBaMTIzNEBTR0NDVGVzdDFAMDAwMDAwMDIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQD0RcEf4Z+WlXhK8v5UiKauiazWyCgJa341oWIxETXJ5Twv9h0i7zctWVYccZLcg/DDO+0MOVnxFw7+EDKdJqo1u77cWndj6b31q3JPpIjBlnRGu8R9PBfp/W0u89dO2gq54GThqqQMbO3UqJRQgKsLjLzJ8mh+z3gmUD/syb5DAWnEYM8p4N15/zw+6ra41YsY11MXaw7WXeWGIbugh0ZJO2J6NK3Oq/P+04W2hOMHVytOyDJH4iN1/H7Fk83dFbqU36g9ExhpcW6J7Ps2Q3KFC1INKFOOIxFnQLA8cC19s4qAf/Jv/29DVlBWdGYvOmBrbgYFgGhQGlYeVmy1DKaPAgMBAAGjgegwgeUwHwYDVR0jBBgwFoAUz3CdYeudfC6498sCQPcJnf4zdIAwSAYDVR0gBEEwPzA9BghggRyG7yoBATAxMC8GCCsGAQUFBwIBFiNodHRwOi8vd3d3LmNmY2EuY29tLmNuL3VzL3VzLTE0Lmh0bTA3BgNVHR8EMDAuMCygKqAohiZodHRwOi8vdWNybC5jZmNhLmNvbS5jbi9SU0EvY3JsNjM2LmNybDALBgNVHQ8EBAMCA+gwHQYDVR0OBBYEFKaEZZTDdHPhPqJ1+ZIIm/pHDbwPMBMGA1UdJQQMMAoGCCsGAQUFBwMCMA0GCSqGSIb3DQEBBQUAA4IBAQBWr4nmzLbYqkasWTIO8s8z596aX4IB8EF5uksO2EHY6lAOITrzEFjGkmb48i6wOmpk8Kco6Nu8Y9Nv4vmZCDcMIFlzennVt0cL9NKnF0CL9zzV8M9ya6/xtXO68OQcaqIVAkZQcHq8Zr60Owy0vSOaQvjJzfWBYy9tfUCsyn+W51lSJIZyGX6yUrU8im/Bv1wGZVurTP9TR3N8VYgN++GI4YGbj9hlkdm9xz/trS+riy3oQISRcmZCs7uXf6r4bt4eZ0CJcSbDJkgxwJF94cXwePD6ZsSGVdBJTVTU9/wislt3FJpC0ykv4R4aLkcn8MXHWl9SZlYxVLMm4UdH4nTH";
			CryptoAgency.SetEncryptCertificate(cert);
			// document.getElementById("CryptoAge").SetEncryptCertificate(cert);
		} catch (e) {
			var road = this.ctx.toString().substring(0,
					this.ctx.toString().indexOf("admin"));
			var chajian = "<a target='_blank' style='text-decoration:underline;color:red' href='"
					+ road
					+ "plugs/npCryptoKit.Standard.x86.exe'>加密插件</a>】，如已下载，请忽略！";
			if (window.parent.window.myflag == "true") {
				top.$.jBox.alert("未获取到加密插件，继续申报将存在安全隐患，请先下载公共基础插件【" + chajian
						+ "再使用360浏览器（极速模式）申报！", "提示");
			}
			dataEncryptFlag = '0';
			dataDisgerFlag = '0';
			window.parent.window.myflag = "false";
		}
	}
}

// 判断是否是合法数字
function checkNumber(value) {
	// var zz = new RegExp('^(-?[1-9]\\d*|-?0)(\\.\\d+)?$');
	var zz = new RegExp('^(-?[1-9]\\d*|-?0)(\\.\\d+)?$');
	return zz.test(value);
}

// 电价精度验证
function checkFloatNum(value, num) {
	var num1 = Math.abs(num);
	var zz = "";
	if (num > 0) {
		zz = new RegExp('^-?\\d+0{' + num1 + ',' + num1 + '}$');
	} else if (num == 0) {
		zz = new RegExp('^-?\\d+$');
	} else {
		zz = new RegExp('^(-?0|-?[1-9]\\d{0,11})(\\.\\d{1,' + num1 + '})?$');
	}
	return zz.test(value);
}

// 电量精度验证
function checkNum(value, num) {
	var num1 = Math.abs(num);
	var zz = "";
	if (num < 0) {
		zz = new RegExp('^(-?0|-?[1-9]\\d{0,11})(\\.\\d{1,' + num1 + '})?$');
	} else if (num == 0) {
		zz = new RegExp('^-?\\d+$');
	} else {
		zz = new RegExp('^-?\\d+0{' + num1 + ',' + num1 + '}$');
	}
	return zz.test(value);
}

function commenAjax(methodName, params) {
	var items = null;
	$.ajax({
		url : this.ctx + "/dljyzx/sellerTradeTngUp/" + methodName,
		dataType : "json",
		data : params,
		type : 'post',
		async : false,
		success : function(data) {
			items = data;
		},
		error : function(da) {
			jBox.alert(da.success, "消息");
		}
	});
	return items;
}
