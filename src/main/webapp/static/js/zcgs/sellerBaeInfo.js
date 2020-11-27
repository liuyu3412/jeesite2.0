!function () {
    var sellerBaeInfo = function () {
        this._create();
    }
    $.extend(sellerBaeInfo.prototype, {
        _create: function () {
            this._initMes();
            this._initGudong();
            this._bindEvents();

        },
        /**
         * 初始化页面信息
         * @private
         */
        _initMes: function () {
            var scope = this;
            var participantId = $('input[name=participantId]').val();
            var ctx = $('input[name=ctx]').val();
            $.ajax({
                url: ctx + "/homePage/queryBaseinfo",
                type: "post",
                async: false,
                data: {
                    participantid: participantId
                },
                dataType: "json",
                success: function (data) {
                    if (data) {
                        var entity=data.entity;
                        for (var key in entity) {
                            $('input[name="' + key + '"]').val(entity[key]);
                        }
                        scope.affixId=data.affixId;
                    }

                }
            });


        },

        _initGudong:function () {
            var ctx = $('input[name=ctx]').val();
            $.ajax({
                url: ctx+"/homePage/findbaGengroup",
                type: "post",
                dataType: "json",
                data: {
                    "participantid": $('input[name=participantId]').val(),
                },
                success: function (rc) {
                    if (rc) {
                        $("#gudongTable tbody").html("");
                        var str = "";
                        var num=1;
                        for (var i = 0; i < rc.length; i++) {
                            str += "<tr>";
                            str += "<td>"+num+"</td>";
                            str += "<td>" + rc[i][1] + "</td>";
                            str += "<td>" + rc[i][2] + "</td>";
                            str += "</tr>";
                            num++;
                        }
                        $("#gudongTable tbody").append(str);
                    }
                }
            });
        },
        _bindEvents:function () {
            var scope=this;
            var ctx = $('input[name=ctx]').val();
            $('#id2_3').on('click',function () {
                if(scope.affixId){
                    var url=ctx+"/homePage/downLoadFile?sourceGuid="+scope.affixId
                    window.open(url, "_parent");
                }else{
                    $.jBox.alert("暂无附件")
                }
            })
        }


    })

    $(function () {
        new sellerBaeInfo();
    })
}()