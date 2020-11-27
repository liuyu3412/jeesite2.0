package com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryServicesPowerQuery;

import java.util.List;

public class PowerQueryUtil {

    private List<JsAsPowerQuery> list;

    private  Integer pageSize;

    private  Integer totalNum;

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getTotalNum() {
        return totalNum;
    }

    public void setTotalNum(Integer totalNum) {
        this.totalNum = totalNum;
    }

    public PowerQueryUtil() {
    }

    public PowerQueryUtil(List<JsAsPowerQuery> list) {
        this.list = list;
    }

    public List<JsAsPowerQuery> getList() {
        return list;
    }

    public void setList(List<JsAsPowerQuery> list) {
        this.list = list;
    }
}
