!function () {
    var baWaidtoDetails = function () {
        this._create();
    }
    $.extend(baWaidtoDetails.prototype, {
        _create: function () {
            this._init();
        },
        _init:function () {
            var flag=$('input[name=flag]').val();
            var isIndex=$('input[name=isIndex]').val();
            if(flag){
                $('.xie.mt0').hide();
            }else if(isIndex){
                $('.xie.mt0').text("");
                $('.xie.mt0').append("<a href='../../minePage/'>我的主页</a>>>我的待办");
            }
            $(".list").empty();
            $('.pagination').empty();
            var ctxTwo=parent.ctx;
            var scope=this;
            $.ajax({
                url : ctxTwo+'/minePage/queryWaitdoList3',
                type : 'post',
                data:{
                    flag:flag,
                    pageNo: $('#pageNo').val(),
                    pageSize: $('pageSize').val()
                },
                success : function(data){
                    var waitList=data.list
                    if(waitList){
                        var html="";
                        $.each(waitList,function (i,o) {
                            var url='';
                            if(o.url){
                                var urlParams=o.url.split("?");
                                url=ctx+"/dljyzx/baWaitdo/index?"+urlParams[1]+"&businessid="+
                                    o.sequenceid+"&activityInstID="+o.workitemid+"&isout=1";
                                var processinstname = o.processinstname;
                                if(processinstname.length>50){
                                    processinstname=processinstname.substr(0,50)+"...";
                                }
                                var startDate = o.startdate;
                                html+='<li>' +
                                    '<span class="fr">'+startDate+'</span>' +
                                    '<a style="cursor: pointer" action="view" title="'+o.processinstname+' " urlValue="'+url+'">'+processinstname+'</a>'+
                                    '</li>'
                            }
                        })
                        $(".list").append(html);
                        $('.pagination').append(data.html);
                        $('.pagination').find('a').each(function (i, o) {
                            $(o).unbind().on('click', function () {
                                var pageNo = $(o).text();
                                if (pageNo == '下一页 »') {
                                    var pageNo = parseInt($('.pagination').find('.active').find('a').text()) + 1;
                                    scope._toPage(pageNo, 10);
                                } else if (pageNo == '« 上一页') {
                                    var pageNo = parseInt($('.pagination').find('.active').find('a').text()) - 1;
                                    scope._toPage(pageNo, 10);
                                } else {
                                    scope._toPage(pageNo, 10);
                                }

                            })
                        })
                        if(!flag){
                            $(".list").find('a').each(function(i,o){
                                var url=$(o).attr('urlValue')
                                $(o).on('click',function(){
                                    top.jBox("iframe:" +url ,
                                        {
                                            title: '提交审核 ',
                                            width: 1100,
                                            height: 700,
                                            buttons: {},
                                            closed: function () {
                                            }
                                        }
                                    );
                                })
                            })
                        }


                    }

     
                }
            });
        },
        _toPage: function (pageNo, pageSize) {
            var scope = this;
            $("#pageNo").val(pageNo);
            $("#pageSize").val(pageSize);
            scope._init();
        },
    })

    $(function () {
        new baWaidtoDetails();
    })
}()