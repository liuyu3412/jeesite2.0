var contractBaseInfoTabChange={
    /**
     * 绑定tab页点击事件
     */
    bindEvents:function(){
        $('.tabForm').find('li').each(function (i,o) {
            $(o).on('click',function(){
                var url=$(o).attr('data-action');//获取跳转页面的url
                $('.tabForm').attr('action',url);
                $('.tabForm').submit();
            })

        })
    }
}