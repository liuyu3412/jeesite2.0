!function () {
    var searchIndex = function () {
        this._create();
    }
    $.extend(searchIndex.prototype, {
        _create: function () {
            var searchValue=localStorage.getItem("searchValue");//从缓存中获取搜索内容
            if(searchValue){
                $('#kw').val(searchValue)
                localStorage.removeItem("searchValue");
            }
            var ctx=$('#ctx').val();
            this.ctx=ctx;
            this._init();
            this._bindEvents();

        },
        _init: function () {
            var scope=this;
            var pageNo=$('#pageNo').val();
            var pageSize=$('#pageSize').val();
            var keyword=$('#kw').val();//搜索内容
            //搜索内容不为空的情况在搜索
            if(keyword){
                $.post("serachDetail", {pageNo:pageNo,pageSize: pageSize,keyword:keyword}, function (data) {
                    if (data&&!$.isEmptyObject(data)) {
                        if(data.mes.length>0){
                            //初始化查询内容div
                            $("#content_left").empty();
                            var contentHtml='';
                            //将查询内容拼接
                            $.each(data.mes,function (i,o) {
                                var itemid=o.itemid.substr(0,3);
                                var issuetime=o.issuetime;//新闻时间
                                if(issuetime&&issuetime.indexOf(' ')!=-1){
                                    issuetime=issuetime.substr(0,issuetime.indexOf(' '))
                                }
                                var url='';
                                if(itemid=='850')
                                {
                                    url='javascript:void(0);';
                                }else {
                                    url=scope.ctx+'/homePage/details?guid='+o.guid+'&itemId='+itemid;
                                }
                                var content='';
                                if(o.filecontent){
                                    content=o.filecontent+'...'
                                }

                                contentHtml+='<div class="result c-container">' +
                                    '<h4>'+
                                    '<a href="'+url+'"  data-action="view" style="cursor: pointer;font-size: 17.5px!important;" onclick=\"Details(\''+o.guid+'\')\"  v="'+o.guid+'">'+o.ntitle+'</a>'+
                                    '</h4>'+
                                    '<div class="c-abstract" style="font-size: 14px!important;">' +
                                    content+
                                    '</div>'+
                                    '<div style="margin-top: 10px">'+issuetime+'</div>'+
                                    '</div></br>'
                            });
                            console.log(contentHtml)
                            $("#content_left").append(contentHtml);
                            $('#pageNo').val(data.pageNo);
                            $('#pageSize').val(data.pageSize);
                            $('.pagination').empty();
                            $('.pagination').append(data.page);
                        }else{
                            $('.pagination').empty();
                            $("#content_left").empty();
                            $.jBox.info('暂无数据')

                        }

                    }
                })
            }else{
                $('.pagination').empty();
                $("#content_left").empty();
            }


        },
        /**
         * 绑定事件
         *
         */
        _bindEvents:function () {
            var scope=this;
            //点击搜索
            $('#su').on('click',function () {
                var keyword=$('#kw').val();//搜索内容
                if(keyword){
                    scope._init();
                }else{
                    $("#content_left").empty();
                    $('.pagination').empty();
                    $.jBox.info('搜索内容不能为空')
                }

            })

            $('#kw').bind('keypress',function (event) {
                if(event.keyCode=='13'){
                    $("#su").click();
                }
            })

            $('#su').mouseover(function () {
                $('#su').addClass("btnhover");
            });
            $('#su').mouseout(function () {
                $(this).removeClass("btnhover");
            })

        }
    })
    $(function () {
        new searchIndex();
    })

}()
