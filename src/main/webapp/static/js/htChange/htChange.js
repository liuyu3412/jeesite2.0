 
 
function sendFlow(type) {
    var contractname = $("#contractname").val();
	var contractid =$("#contractid").val();	
    var ctx = top.ctx;
    var url = "/dljyzx/flow/getPersonTreeTwo?type="+type;
    var flowInstName  = "外网合同变更流程-发电企业/电力用户" + "-" + contractname+"-合同变更";
    top.$.jBox.open("iframe:" + ctx + "/tag/treeProcess?url=" + encodeURIComponent(url), "人员信息", 300, 420, {
        buttons: {"确定": "ok", "关闭": true},
        submit: function (v, h, f) {
            if (v == "ok") {
                var tree = h.find("iframe")[0].contentWindow.tree;
                var ids = [], names = [], nodes = [];
                nodes = tree.getSelectedNodes();
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].isParent) {
                        continue; // 如果为复选框选择，则过滤掉父节点
                    }
                    if (nodes[i].level == 0) {
                        top.$.jBox.tip("不能选择根节点（" + nodes[i].name + "）请重新选择。");
                        return false;
                    }
                    if (nodes[i].isParent) {
                        top.$.jBox.tip("不能选择父节点（" + nodes[i].name + "）请重新选择。");
                        return false;
                    }
                    if (nodes[i].module == "") {
                        top.$.jBox.tip("不能选择公共模型（" + nodes[i].name + "）请重新选择。");
                        return false;
                    }
                    ids.push(nodes[i].id);
                    names.push(nodes[i].name);
                    break; // 如果为非复选框选择，则返回第一个选择  </c:if>
                }
                $.ajax({
                    url: ctx + "/dljyzx/flow/sendContractFlow",
                    type: "post",
                    data: {
                        flowInstName: flowInstName,
                        contractId: contractid,
                        userIds: ids.toString(),
                        type:type
                    },
                    async: false,
                    success: function (v) {
					  //backList();
					  $("#fan").click();
                    }
                });
            }
            else if (v == "clear") {
            }
        },
        loaded: function (h) {
            $(".jbox-content", top.document).css("overflow-y", "hidden");
        }
    });
}


function backList(){
        window.location.href("${ctx}/dljyzx/cocontractbaseinfochange/cocontractbaseinfochange/list");
   }