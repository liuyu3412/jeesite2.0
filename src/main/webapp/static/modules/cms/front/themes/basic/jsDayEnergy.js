var showYear = "";
var showMonth = "";

function init(){
	_getAllEnergy();
}

function _getAllEnergy(){
	var rnd= (new Date).getTime();
	$.ajax({
		url :  "initData",
		type : "post",
		dataType : "json",
		async : false,
		//data : queryCondition("a=1", 1, 1),
		data :'params='+encodeURIComponent(showYear+"-"+showMonth),
		success : function(data) {
			if(data){ 
				var result = data;
				if(result.length != 0)
				{
					energyJson = eval(result[0])[0];
					var sumNet = energyJson["sumNet"];
					var sumFd = energyJson["sumFd"];
					var sumCkNet = energyJson["sumCkNet"];
					var sumCkFd = energyJson["sumCkFd"];
					
					var fontFd = document.getElementById("fontFd");
					var fontNet = document.getElementById("fontNet");
					var fontCy = document.getElementById("fontCy");
					var fontCkFd = document.getElementById("fontCkFd");
					var fontCkNet = document.getElementById("fontCkNet");
					
					fontFd.innerText = sumFd;
					fontNet.innerText = sumNet;
					fontCkFd.innerText = sumCkFd;
					fontCkNet.innerText = sumCkNet;
					
					var cydl = 0;
					if(sumFd == 0){
						cydl = 0;
					}
					else{
						var cydl100=parseInt((sumFd - sumNet)*10000/sumFd);
						cydl = parseFloat(cydl100)/100;
					}
					fontCy.innerText = cydl;
					
					showRili.draw();
				}
			}else{
				showRili.draw();
			}
		}/*,
		error : function(event, request, settings) {
			top.$.messager.alert('消息','获取上报电量失败!');
		}*/
	});
}

var S=navigator.userAgent.indexOf("MSIE")!=-1&&!window.opera;

/*根据ID获取dom*/
function getEle(id){
	return document.getElementById(id);
} 

/*创建dom*/
function createEle(C){
	return document.createElement(C);
} 

var energyJson ={"1":["0","0"],"2":["0","0"],"2":["0","0"],"3":["0","0"],"5":["0","0"],"6":["0","0"]
,"7":["0","0"],"8":["0","0"],"10":["0","0"],"11":["0","0"],"12":["0","0"],"13":["0","0"],"14":["0","0"]
,"18":["0","0"],"19":["0","0"],"20":["0","0"],"21":["0","0"],"25":["0","0"],"26":["0","0"],"29":["0","0"]
,"31":["0","0"]};

var P=[19416,19168,42352,21717,53856,55632,91476,22176,39632,21970,19168,42422,42192,53840,119381,46400,54944,44450,38320,84343,18800,42160,46261,27216,27968,109396,11104,38256,21234,18800,25958,54432,59984,28309,23248,11104,100067,37600,116951,51536,54432,120998,46416,22176,107956,9680,37584,53938,43344,46423,27808,46416,86869,19872,42448,83315,21200,43432,59728,27296,44710,43856,19296,43748,42352,21088,62051,55632,23383,22176,38608,19925,19152,42192,54484,53840,54616,46400,46496,103846,38320,18864,43380,42160,45690,27216,27968,44870,43872,38256,19189,18800,25776,29859,59984,27480,21952,43872,38613,37600,51552,55636,54432,55888,30034,22176,43959,9680,37584,51893,43344,46240,47780,44368,21977,19360,42416,86390,21168,43312,31060,27296,44368,23378,19296,42726,42208,53856,60005,54576,23200,30371,38608,19415,19152,42192,118966,53840,54560,56645,46496,22224,21938,18864,42359,42160,43600,111189,27936,44448];
var K="甲乙丙丁戊己庚辛壬癸";
var J="子丑寅卯辰巳午未申酉戌亥";
var O="鼠牛虎兔龙蛇马羊猴鸡狗猪";
var L=["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"];
var D=[0,21208,43467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758];
var B="日一二三四五六七八九十";
var H=["正","二","三","四","五","六","七","八","九","十","十一","腊"];
var E="初十廿卅";
var V={
"0101":"*1元旦节","0214":"情人节","0305":"学雷锋纪念日","0308":"妇女节","0312":"植树节","0315":"消费者权益日","0401":"愚人节","0501":"*1劳动节","0504":"青年节","0601":"国际儿童节","0701":"中国共产党诞辰","0801":"建军节","0910":"中国教师节","1001":"*3国庆节","1224":"平安夜","1225":"圣诞节"
} ;
var T={
"0101":"*2春节","0115":"元宵节","0505":"*1端午节","0815":"*1中秋节","0909":"总发电：7470</br>总上网：7289.975","1208":"腊八节","0100":"除夕"
} ;


/*时间处理*/
function initDate(Y){
	function c(j,i){
		var h=new Date((31556925974.7*(j-1900)+D[i]*60000)+Date.UTC(1900,0,6,2,5));
		return(h.getUTCDate());
	} 
	
	function d(k){
		var h,j=348;
		for(h=32768;h>8;h>>=1){
			j+=(P[k-1900]&h)?1:0
		} 
		return(j+b(k))
	} 
	
	function a(h){
		return(K.charAt(h%10)+J.charAt(h%12))
	} 
	
	function b(h){
		if(g(h)){
			return((P[h-1900]&65536)?30:29)
		} else{
			return(0)
		} 
	} 
	
	function g(h){
		return(P[h-1900]&15)
	} 
	
	function e(i,h){
		return((P[i-1900]&(65536>>h))?30:29)
	}
	
	function to_nongli(m){
		var k,j=0,h=0;
		var l=new Date(1900,0,31);
		var n=(m-l)/86400000;
		this.dayCyl=n+40;
		this.monCyl=14;
		for(k=1900;k<2050&&n>0;k++){
		h=d(k);
		n-=h;
		this.monCyl+=12
		} if(n<0){
		n+=h;
		k--;
		this.monCyl-=12
		} this.year=k;
		this.yearCyl=k-1864;
		j=g(k);
		this.isLeap=false;
		for(k=1;k<13&&n>0;k++){
		if(j>0&&k==(j+1)&&this.isLeap==false){
		--k;
		this.isLeap=true;
		h=b(this.year)
		} else{
		h=e(this.year,k)
		} if(this.isLeap==true&&k==(j+1)){
		this.isLeap=false
		} n-=h;
		if(this.isLeap==false){
		this.monCyl++
		} 
		} if(n==0&&j>0&&k==j+1){
		if(this.isLeap){
		this.isLeap=false
		} else{
		this.isLeap=true;
		--k;
		--this.monCyl
		} 
		} if(n<0){
		n+=h;
		--k;
		--this.monCyl
		} this.month=k;
		this.day=n+1
	} 
	
	/*小于10 补零*/
	function G(h){
		return h<10?"0"+h:h
	} 
	
	/*格式化日期  获取年/月/日*/
	function formatDate(date,type){
		var h=date;
		return type.replace(/dd?d?d?|MM?M?M?|yy?y?y?/g,function(k){
			switch(k){
				case"yyyy":var l="000"+h.getFullYear();
				return l.substring(l.length-4);
				case"dd":return G(h.getDate());
				case"d":return h.getDate().toString();
				case"MM":return G((h.getMonth()+1));
				case"M":return h.getMonth()+1
			} 
		} )
	} 
	
	function to_chineseDay(i,h){
		var j;
		switch(i,h){
			case 10:j="初十";
			break;
			case 20:j="二十";
			break;
			case 30:j="三十";
			break;
			default:j=E.charAt(Math.floor(h/10));
			j+=B.charAt(h%10)
		} 
		return(j)
	} 
	
	this.date=Y;
	this.isToday=false;
	this.isRestDay=false;
	this.solarYear=formatDate(Y,"yyyy");
	this.solarMonth=formatDate(Y,"M");
	this.solarDate=formatDate(Y,"d");
	this.solarWeekDay=Y.getDay();
	this.solarWeekDayInChinese="星期"+B.charAt(this.solarWeekDay);
	
	var X=new to_nongli(Y);
	this.lunarYear=X.year;
	this.shengxiao=O.charAt((this.lunarYear-4)%12);
	this.lunarMonth=X.month;
	this.lunarIsLeapMonth=X.isLeap;
	this.lunarMonthInChinese=this.lunarIsLeapMonth?"闰"+H[X.month-1]:H[X.month-1];
	this.lunarDate=X.day;
	this.showInLunar=this.lunarDateInChinese=to_chineseDay(this.lunarMonth,this.lunarDate);
	if(this.lunarDate==1){
		this.showInLunar=this.lunarMonthInChinese+"月"
	} 
	this.ganzhiYear=a(X.yearCyl);
	this.ganzhiMonth=a(X.monCyl);
	this.ganzhiDate=a(X.dayCyl++);
	this.jieqi="";
	this.restDays=0;
	
	/*获取节气*/
	if(c(this.solarYear,(this.solarMonth-1)*2)==formatDate(Y,"d")){
		this.showInLunar=this.jieqi=L[(this.solarMonth-1)*2]
	} 
	if(c(this.solarYear,(this.solarMonth-1)*2+1)==formatDate(Y,"d")){
		this.showInLunar=this.jieqi=L[(this.solarMonth-1)*2+1]
	}
	
	if(this.showInLunar=="清明"){
		this.showInLunar="清明节";
		this.restDays=1
	} 
	
	/*休息日*/
	this.solarFestival=V[formatDate(Y,"MM")+formatDate(Y,"dd")];
	if(typeof this.solarFestival=="undefined"){
		this.solarFestival=""
	} else{
		if(/\*(\d)/.test(this.solarFestival)){
			this.restDays=parseInt(RegExp.$1);
			this.solarFestival=this.solarFestival.replace(/\*\d/,"")
		} 
	} 
	
	this.showInLunar=(this.solarFestival=="")?this.showInLunar:this.solarFestival;
	this.lunarFestival=T[this.lunarIsLeapMonth?"00":G(this.lunarMonth)+G(this.lunarDate)];
	if(typeof this.lunarFestival=="undefined"){
		this.lunarFestival=""
	} else{
		if(/\*(\d)/.test(this.lunarFestival)){
			this.restDays=(this.restDays>parseInt(RegExp.$1))?this.restDays:parseInt(RegExp.$1);
			this.lunarFestival=this.lunarFestival.replace(/\*\d/,"")
		} 
	} 
	if(this.lunarMonth==12&&this.lunarDate==e(this.lunarYear,12)){
		this.lunarFestival=T["0100"];
		this.restDays=1
	} 
	this.showInLunar=(this.lunarFestival=="")?this.showInLunar:this.lunarFestival;
	//this.showInLunar=(this.showInLunar.length>4)?this.showInLunar.substr(0,2)+"...":this.showInLunar
}



var riliDay=(function(){
var X={} ;
X.lines=0;
X.dateArray=new Array(42);
function ifRN(year){
	return(((year%4===0)&&(year%100!==0))||(year%400===0))
} 
function getMonthDayNum(a,b){
	return[31,(ifRN(a)?29:28),31,30,31,30,31,31,30,31,30,31][b]
} 

function addDayNum(a,addNum){
	a.setDate(a.getDate()+addNum);
	return a
} 

/*该月的每一天初始化成42位数组*/
function initMonthDay(a){
	var f=0;
	var monthFirstDay=new initDate(new Date(a.solarYear,a.solarMonth-1,1));		//当月的1号
	var firstDayWeekNum=(monthFirstDay.solarWeekDay-1==-1)?6:monthFirstDay.solarWeekDay-1;	//1号时周几
	X.lines=Math.ceil((firstDayWeekNum+getMonthDayNum(a.solarYear,a.solarMonth-1))/7);		//日历的行数
	for(var i=0;i<X.dateArray.length;i++){
		if(monthFirstDay.restDays!=0){
			f=monthFirstDay.restDays
		} 
		if(f>0){
			monthFirstDay.isRest=true
		} 
		if(firstDayWeekNum-->0||monthFirstDay.solarMonth!=a.solarMonth){
			X.dateArray[i]=null;
			continue
		} 
		var nowDate=new initDate(new Date());
		if(monthFirstDay.solarYear==nowDate.solarYear&&monthFirstDay.solarMonth==nowDate.solarMonth&&monthFirstDay.solarDate==nowDate.solarDate){ //是否是今天
			monthFirstDay.isToday=true
		} X.dateArray[i]=monthFirstDay;
		monthFirstDay=new initDate(addDayNum(monthFirstDay.date,1)); //增加一天
		f--
	} 
} 

return{
	init:function(a){
		initMonthDay(a)
	} ,
	getJson:function(){
		return X
	} 
} 
} )();

var titleContent=(function(){
var C=getEle("top").getElementsByTagName("SELECT")[0];
var X=getEle("top").getElementsByTagName("SELECT")[1];
//var spanGanzhiYear=getEle("top").getElementsByTagName("SPAN")[0];
//var spanShengxiao=getEle("top").getElementsByTagName("SPAN")[1];
var Y=getEle("top").getElementsByTagName("INPUT")[0];

function initNongliTitle(p_date){
	//spanGanzhiYear.innerHTML=p_date.ganzhiYear;
	//spanShengxiao.innerHTML=p_date.shengxiao
} 

function b(p_date){
	C[p_date.solarYear-1949].selected=true;
	X[p_date.solarMonth-1].selected=true
} 

function initTitle(){
	var _year=C.value;
	var _month=X.value;
	showYear = _year;
	if(_month <10){
		showMonth = "0"+ _month;
	}
	else{
		showMonth = _month;
	}
	var i=new initDate(new Date(_year,_month-1,1));
	riliDay.init(i);
	showRili.draw();
	if(this==C){	//更改的是年
		i=new initDate(new Date(_year,3,1));
		//spanGanzhiYear.innerHTML=i.ganzhiYear;
		//spanShengxiao.innerHTML=i.shengxiao
	} 
	var h=new initDate(new Date());
	Y.style.visibility=(_year==h.solarYear&&_month==h.solarMonth)?"hidden":"visible";	//不是当前月，按钮显示
	
	_getAllEnergy();
} 

function goToNowDate(){
	var _nowDate=new initDate(new Date());
	initNongliTitle(_nowDate);
	b(_nowDate);
	riliDay.init(_nowDate);
	
	var _year=C.value;
	var _month=X.value;
	showYear = _year;
	if(_month <10){
		showMonth = "0"+ _month;
	}
	else{
		showMonth = _month;
	}
	
	_getAllEnergy();
	//showRili.draw();
	Y.style.visibility="hidden"
	
} 

function initSelectContent(p_year,p_month){
	for(var j=1949;j<2050;j++){
		var h=createEle("OPTION");
		h.value=j;
		h.innerHTML=j;
		if(j==p_year){
			h.selected="selected"
		} 
		C.appendChild(h)
	} 
	for(var j=1;j<13;j++){
		var h=createEle("OPTION");
		h.value=j;
		h.innerHTML=j;
		if(j==p_month){
		h.selected="selected"
		} 
		X.appendChild(h)
	} 
	C.onchange=initTitle;
	X.onchange=initTitle
	
	showYear = p_year;
	if(p_month <10){
		showMonth = "0"+ p_month;
	}
	else{
		showMonth = p_month;
	}
} 

function initTitleAndSelect(p_date){
	initSelectContent(p_date.solarYear,p_date.solarMonth);
	//spanGanzhiYear.innerHTML=p_date.ganzhiYear;
	//spanShengxiao.innerHTML=p_date.shengxiao;
	Y.onclick=goToNowDate;
	Y.style.visibility="hidden"
} 
return{
	init:function(g){
		initTitleAndSelect(g)
	} ,
	reset:function(g){
		b(g)
	} 
} 
} )();


var showRili=(function(){
function show(){
	var _riliDay=riliDay.getJson();
	var _dateArray=_riliDay.dateArray;
	getEle("cm").style.height=_riliDay.lines*100+2+"px";		//设置日历整体高度
	getEle("cm").innerHTML="";
	
	for(var a=0;a<_dateArray.length;a++){		//生成每一天
		if(_dateArray[a]==null){
			continue
		} 
		
		var _dayDiv=createEle("DIV");
		if(_dateArray[a].isToday){
			_dayDiv.style.border="1px solid #a5b9da";
			_dayDiv.style.background="#c1d9ff"
		} 
		
		_dayDiv.className="cell";
		_dayDiv.style.left=(a%7)*155+"px";
		_dayDiv.style.top=Math.floor(a/7)*100+2+"px";
		
		var ifSubmit = false;
		var contentHtml = "";
		if(energyJson[_dateArray[a].solarDate] != undefined){
			
				ifSubmit = true;
				//总电量
				var totalEnergy =energyJson[_dateArray[a].solarDate][2];
				//如果没有申报显示的参考电量
				var cankaoEnery = energyJson[_dateArray[a].solarDate][0];
				//如果没有参考值显示的电量
				var demoEnery = energyJson[_dateArray[a].solarDate][1];
				if (totalEnergy=="1") {
					contentHtml = "总发电:<font style='color:green;'>"+cankaoEnery+"</font></br>总上网:<font style='color:green;'>"+demoEnery+"</font>";
				}else {
					if(cankaoEnery != 'null' || demoEnery != 'null'){
					contentHtml = "总发电:<font style='color:red;'>"+cankaoEnery+"</font></br>总上网:<font style='color:red;'>"+demoEnery+"</font>";
					}
				}
				
			
			
			//contentHtml = "总发电:"+energyJson[_dateArray[a].solarDate][0]+"</br>总上网:"+energyJson[_dateArray[a].solarDate][1];
		}
		
		var _numDiv=createEle("DIV");	//显示日期数字的div
		_numDiv.className="so";
		//_numDiv.style.color=((a%7)>4||_dateArray[a].isRest)?"#c60b02":"#313131";
		if(!ifSubmit){
			_numDiv.style.color="#c60b02";
		}
		
		_numDiv.innerHTML=_dateArray[a].solarDate;
		_dayDiv.appendChild(_numDiv);
		
		var _contentDiv=createEle("DIV");
		//_contentDiv.style.color="#666";
		//_contentDiv.innerHTML=_dateArray[a].showInLunar;
		if(contentHtml == ""){
			//contentHtml = "未上报";
			//contentHtml = "总发电:未上报</br>总上网:未上报";
			_contentDiv.style.color="#c60b02";
			_contentDiv.style.textAlign="center";
		}
		else{
			//_contentDiv.style.color="green";
			_contentDiv.style.textAlign="left";
		}
		_contentDiv.innerHTML= contentHtml;
		_dayDiv.appendChild(_contentDiv);
		
		var _year = _dateArray[a].solarYear;
		var _month = _dateArray[a].solarMonth;
		var _day = _dateArray[a].solarDate;
		
		_dayDiv.onclick=(function(d){
			return function(f){
				openDiv(d)
			} 
		} )(a);
		
		
		_dayDiv.onmouseover=(function(d){
			return function(f){
			F.show({
			dateIndex:d,cell:this
			} )
			} 
		} )(a);
		
		_dayDiv.onmouseout=function(){
			F.hide()
		} ;
		getEle("cm").appendChild(_dayDiv)
	} 
	
	var G=createEle("DIV");
	G.id="fd";
	getEle("cm").appendChild(G);
	F.init(G)
} 
return{
	draw:function(G){
		show(G)
	} 
} 
} )();

var F=(function(){
var C;
function Y(e,c){
	if(arguments.length>1){
	var b=/([.*+?^=!:${}()|[\]\/\\])/g,Z="{".replace(b,"\\$1"),d="}".replace(b,"\\$1");
	var a=new RegExp("#"+Z+"([^"+Z+d+"]+)"+d,"g");
	if(typeof (c)=="object"){
	return e.replace(a,function(f,h){
	var g=c[h];
	return typeof (g)=="undefined"?"":g
	} )
	} 
	} return e
} 
function showEle(b){
	var a=riliDay.getJson().dateArray[b.dateIndex];
	var day = a.solarDate;
	var Z=b.cell;
	var c="#{solarYear} 年 #{solarMonth} 月 #{solarDate} 日 #{solarWeekDayInChinese}";
		c+="<br>农历 #{lunarMonthInChinese}月#{lunarDateInChinese}";
		//c+="<br>#{ganzhiYear}年 #{ganzhiMonth}月 #{ganzhiDate}日";
	//日期总发电信息
	var eneryEn = energyJson[day][0];
	//日期总上网信息
	var eneryInfo = energyJson[day][1];
	if(eneryEn != 'null' || eneryInfo != 'null'){
		c += "<br>总发电:<font style='color:green;'>"+eneryEn+"</font></br>总上网:<font style='color:green;'>"+eneryInfo+"</font>";
	}
	else{
		c += "<br><b>未申报</b>";
	}
	
	C.innerHTML=Y(c,a);
	C.style.top=Z.offsetTop+Z.offsetHeight-5+"px";
	C.style.left=Z.offsetLeft+Z.offsetWidth-125+"px";
	C.style.display="block"
} 

function hiddenEle(){
	C.style.display="none"
}

return{
	show:function(Z){
		showEle(Z)
	} ,hide:function(){
		hiddenEle()
	} ,init:function(Z){
		C=Z
	} 
} 
} )();

function openDiv(cellIndex){
	isFreshFlag="1";
	var _riliDate=riliDay.getJson().dateArray[cellIndex];
	var year = _riliDate.solarYear;
	var month = _riliDate.solarMonth;
	if(month<10){
		month = "0"+month;
	}
	var day = _riliDate.solarDate;
	if(day<10){
		day = "0"+day;
	}
	
	var date =year +"-"+  month +"-"+ day;
	var url= top.ctx+"/jsdayenergy/jsDayEnergyPlus/form?days="+date;
	//全局弹出
	top.$.jBox("iframe:"+url, {
		title: "日电量上报",
		width: 1000,
		height: 800,
		buttons: {},
		closed:function(){_getAllEnergy();},
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        }
	});

}

var A=new initDate(new Date());
if(S){
window.attachEvent("onload",function(){
	titleContent.reset(A)
} )
} 
titleContent.init(A);
riliDay.init(A);
showRili.draw();

