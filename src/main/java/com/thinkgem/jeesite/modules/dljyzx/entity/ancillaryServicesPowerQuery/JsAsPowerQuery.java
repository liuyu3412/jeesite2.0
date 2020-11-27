package com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryServicesPowerQuery;

import com.thinkgem.jeesite.common.persistence.DataEntity;
import java.math.BigDecimal;
import java.util.List;

public class JsAsPowerQuery extends DataEntity<JsAsPowerQuery> {


    private  Integer preNum ;

    private Integer nowNum ;


    private Integer intPageValue;
    private Integer pageSize;

    private String consno;

    public String getConsno() {
        return consno;
    }

    public void setConsno(String consno) {
        this.consno = consno;
    }

    private String adjustDate;

    private int startTime;

    private int interval;

    private String date;

    private String participantId;


    private BigDecimal realTimeAverageLoad;

    private List<BigDecimal> actualPower;


    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getParticipantId() {
        return participantId;
    }

    public void setParticipantId(String participantId) {
        this.participantId = participantId;
    }

    public Integer getPreNum() {
        return preNum;
    }

    public void setPreNum(Integer preNum) {
        this.preNum = preNum;
    }

    public Integer getNowNum() {
        return nowNum;
    }

    public void setNowNum(Integer nowNum) {
        this.nowNum = nowNum;
    }

    public Integer getIntPageValue() {
        return intPageValue;
    }

    public void setIntPageValue(Integer intPageValue) {
        this.intPageValue = intPageValue;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public JsAsPowerQuery(){

    }
    public JsAsPowerQuery(String consno, String adjustDate, int startTime, int interval, BigDecimal realTimeAverageLoad, List<BigDecimal> actualPower) {
        this.consno = consno;
        this.adjustDate = adjustDate;
        this.startTime = startTime;
        this.interval = interval;
        this.realTimeAverageLoad = realTimeAverageLoad;
        this.actualPower = actualPower;
    }



    public String getAdjustDate() {
        return adjustDate;
    }

    public void setAdjustDate(String adjustDate) {
        this.adjustDate = adjustDate;
    }

    public int getStartTime() {
        return startTime;
    }

    public void setStartTime(int startTime) {
        this.startTime = startTime;
    }

    public int getInterval() {
        return interval;
    }

    public void setInterval(int interval) {
        this.interval = interval;
    }

    public BigDecimal getRealTimeAverageLoad() {
        return realTimeAverageLoad;
    }

    public void setRealTimeAverageLoad(BigDecimal realTimeAverageLoad) {
        this.realTimeAverageLoad = realTimeAverageLoad;
    }

    public List<BigDecimal> getActualPower() {
        return actualPower;
    }

    public void setActualPower(List<BigDecimal> actualPower) {
        this.actualPower = actualPower;
    }

    @Override
    public String toString() {
        return "JsAsPowerQuery{" +
                "consno='" + consno + '\'' +
                ", adjustDate='" + adjustDate + '\'' +
                ", startTime=" + startTime +
                ", interval=" + interval +
                ", realTimeAverageLoad=" + realTimeAverageLoad +
                ", actualPower=" + actualPower +
                '}';
    }
}
