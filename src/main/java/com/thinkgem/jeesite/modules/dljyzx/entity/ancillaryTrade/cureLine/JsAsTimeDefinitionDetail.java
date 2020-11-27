package com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.cureLine;

import com.thinkgem.jeesite.common.persistence.DataEntity;

/**
 * 陶然
 * 2020/6/15
 */
public class JsAsTimeDefinitionDetail extends DataEntity<JsAsTimeDefinitionDetail> {

    /**
     * 主键
     */
    private String guid;

    /**
     * 时段定义表ID
     */
    private String timeId;

    /**
     * 时段
     */
    private int time;

    /**
     * 开始时间
     */
    private String startTime;

    /**
     * 结束时间
     */
    private String endTime;
    /**
     * 是否可修改
     */
    private Integer isModifiable;

    public Integer getIsModifiable() {
        return isModifiable;
    }

    public void setIsModifiable(Integer isModifiable) {
        this.isModifiable = isModifiable;
    }

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    public String getTimeId() {
        return timeId;
    }

    public void setTimeId(String timeId) {
        this.timeId = timeId;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
}
