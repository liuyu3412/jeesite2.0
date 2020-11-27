$(document).ready(function () {
    loaddbsx();
    loaddldl();
    bdwjybs();
    bdwcjdl();
    qwlnjybs();
    qscjdl();
    wSizeParent();
});

/**
 * 电力电量平衡网省
 * @param cyear
 * @param cmonth
 */
function loaddldl() {
    $.ajax({
        url: 'dlphzt',
        type: 'post',
        data: {},
        success: function (data) {
            var year = data.DYEAR;
            var month = data.DMONTH;
            var trend = data.TREND;


            if (trend == '富裕') {
                document.getElementById('dldl1').className = "blue_b";
                document.getElementById('dldl11').className = "blue_j";

                document.getElementById('dldl2').className = "gray_b";
                document.getElementById('dldl22').className = "green_j dn";

                document.getElementById('dldl3').className = "gray_b";
                document.getElementById('dldl33').className = "yellow_j dn";

                document.getElementById('dldl4').className = "gray_b";
                document.getElementById('dldl44').className = "red_j dn";


            }
            else if (trend == '基本平衡') {
                document.getElementById('dldl1').className = "gray_b";
                document.getElementById('dldl11').className = "blue_j dn";

                document.getElementById('dldl2').className = "green_b";
                document.getElementById('dldl22').className = "green_j ";

                document.getElementById('dldl3').className = "gray_b";
                document.getElementById('dldl33').className = "yellow_j dn";

                document.getElementById('dldl4').className = "gray_b";
                document.getElementById('dldl44').className = "red_j dn";

            }
            else if (trend == '偏紧') {
                document.getElementById('dldl1').className = "gray_b";
                document.getElementById('dldl11').className = "blue_j dn";

                document.getElementById('dldl2').className = "gray_b dn";
                document.getElementById('dldl22').className = "green_j dn";

                document.getElementById('dldl3').className = "yellow_b";
                document.getElementById('dldl33').className = "yellow_j";

                document.getElementById('dldl4').className = "gray_b";
                document.getElementById('dldl44').className = "red_j dn";

            }
            else if (trend == '紧张') {


                document.getElementById('dldl1').className = "gray_b";
                document.getElementById('dldl11').className = "blue_j dn";

                document.getElementById('dldl2').className = "gray_b";
                document.getElementById('dldl22').className = "green_j blue_j dn";

                document.getElementById('dldl3').className = "gray_b";
                document.getElementById('dldl33').className = "yellow_j dn";

                document.getElementById('dldl4').className = "red_b";
                document.getElementById('dldl44').className = "red_j";


            }
        }
    });
}

 
 /**
  * 获取数据库时间
  */
function getYear() {
    $.ajax({
        url: 'getYear',
        type: 'post',
        data: {},
        success: function (data) {
        	 
        	document.getElementById('year1').innerHTML=data+".1";
        	document.getElementById('year2').innerHTML=data+".1";
        }
    });
}



/**
 * 获取待办事项
 * @param cyear
 * @param cmonth
 */
function loaddbsx() {
    $.ajax({
        url: 'getWaitdoList',
        type: 'post',
        data: {},
        success: function (data) {
            $('#wddb').empty();
            if (data.length == 0) {
                var html = ' <li><span>当前无待办任务 </span> </li>';
                $('#wddb').append(html);
            }
            var ctx = parent.ctx;
            var temp = "";

            var num = '';
            if (data.length > 2) {
                num = 2;
            } else {
                num = data.length;
            }
            for (var i = 0; i < num; i++) {
                var waitdoid = data[i].waitdoid;
                var url = '';
                if (data[i].url) {
                    var urlParams = data[i].url.split("?");
                    url = ctx + "/dljyzx/baWaitdo/index?" + urlParams[1] + "&businessid=" +
                        data[i].sequenceid + "&activityInstID=" + data[i].workitemid + "&isout=1&flowFlag=" + urlParams[0] + "&flagType=" + data[i].type + "&processdefId=" + data[i].processdefid+"&sign="+data[i].sign;
                }
                var startDate = data[i].startdate;
                temp = temp + "<li>" +
                    "<font class='fr'>" +
                    startDate +
                    "</font>" +
                    "<a style='display: block;text-overflow:ellipsis;white-space: nowrap;overflow: hidden;cursor: pointer' title='" + data[i].processinstname + "' action='view' urlValue='" + url + "' href='#'>" + data[i].processinstname + "</a>" +
                    "</li>";

            }
            if (temp != "") {
                document.getElementById('wddb').innerHTML = temp;
            }

            //点击进入审核页面
            $('#wddb').find('a').each(function (i, o) {
                var url = $(o).attr('urlValue')
                if (url != "") {
                    $(o).on('click', function () {
                        top.jBox("iframe:" + url,
                            {
                                title: '提交审核 ',
                                width: 1100,
                                height: 500,
                                buttons: {},
                                closed: function () {
                                    if (localStorage.getItem("processSuccess")) {
                                        top.jBox.success('提交成功');
                                        localStorage.removeItem("processSuccess");
                                    } else if (localStorage.getItem("processCannelFlag")) {
                                        top.jBox.success('撤销成功');
                                        localStorage.removeItem("processCannelFlag");
                                    } else if (localStorage.getItem("processError")) {
                                        localStorage.removeItem("processError");
                                    }
                                    loaddbsx();
                                },
                                loaded: function (h) {
                                    $(".jbox-content", top.document).css("overflow-y", "hidden");
                                }

                            }
                        );
                    })
                }


            })
        }
    });
}


/**
 * 本单位成交次数
 * @param cyear
 * @param cmonth
 */
function bdwjybs() {

    $.ajax({
        url: 'bdwjybs',
        type: 'post',
        data: {},
        success: function (data) {
            document.getElementById('bdwjybs').innerHTML = data;

        }
    });
}

/**
 * 本单位成交电量
 * @param cyear
 * @param cmonth
 */
function bdwcjdl() {

    $.ajax({
        url: 'bdwcjdl',
        type: 'post',
        data: {},
        success: function (data) {
            if (data.indexOf(".") == -1) {
                $('#cjzdlgs').text("成交总电量(兆瓦时)");
            }
            document.getElementById('bdwcjdl').innerHTML = data;

        }
    });
}

/**
 * 全省成交次数
 * @param cyear
 * @param cmonth
 */
function qwlnjybs() {

    $.ajax({
        url: 'qwlnjybs',
        type: 'post',
        data: {},
        success: function (data) {
            document.getElementById('qwlnjybs').innerHTML = data;

        }
    });
}


/**
 * 全省成交电量
 * @param cyear
 * @param cmonth
 */
function qscjdl() {

    $.ajax({
        url: 'qscjdl',
        type: 'post',
        data: {},
        success: function (data) {
            if (data.indexOf(".") == -1) {
                $('#cjzdlqs').text("成交总电量(兆瓦时)");
            }
            document.getElementById('qscjdl').innerHTML = data;

        }
    });
}
 