package com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt;

import com.thinkgem.jeesite.common.persistence.DataEntity;

public class PageResult extends DataEntity<PageResult> {
    public PageResult(Integer status, String msg) {
        this.status = status;
        this.msg = msg;
    }

    public PageResult() {
        super();
    }

    private Integer status;

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    private String msg;
}
