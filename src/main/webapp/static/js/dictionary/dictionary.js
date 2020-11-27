var dictionary={
    /**
     * 根据key和valye获取单个字典值
     * @param e
     */
    getDictionaryChild:function(type,value){
        var name='';
        $.ajax({
            url: top.ctx+"/dljyzx/bacommonflowinfo/getSingle",
            type: "post",
            async: false,
            data:{
                type:type,
                value:value
            },
            dataType: "json",
            success: function (data) {
                if(data){
                    name=data.name;
                }
            }
        });
       return name;

    },
    /**
     * 根据key获取list
     * @param e
     */
    getDictionaryByKey:function(type){
        var list=[]
        $.ajax({
            url: top.ctx+"/dljyzx/bacommonflowinfo/getSingle",
            type: "post",
            async: false,
            data:{
                type:type
            },
            dataType: "json",
            success: function (data) {
                if(data&&data.length>0){
                    list=data;
                }
            }
        });
        return list;
    }

}