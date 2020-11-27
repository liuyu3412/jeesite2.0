package com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade;

import java.math.BigDecimal;

/**
 * @author GuoYF
 * @version 2020/6/30
 */
public class JsAsTradeBidCons {

    private String guid;

    private String tradeseqConsId;

    private String consNo;

    private String pid;

    private String bidDate;

    private BigDecimal bidPower;

    private BigDecimal bidPrice;

    private BigDecimal profit;

    private String status;

    private String tradeseqId;

    private String adjustDate;

    private String adjustTime;

    private String bidEnd;

    private String startTime;

    private String endTime;

    private String gbsId;

    private BigDecimal tradePower;

    private BigDecimal basePower;

    private String areaName;

    private BigDecimal adjustPower;

    private String adjustType;

    private String tradeContent;

    private BigDecimal interval;

    private String timesegId;

    private BigDecimal epriceUplimit;

    private BigDecimal epriceDownlimit;

    private BigDecimal eKcof;

    public BigDecimal geteKcof() {
        return eKcof;
    }

    public void seteKcof(BigDecimal eKcof) {
        this.eKcof = eKcof;
    }

    public BigDecimal getEpriceUplimit() {
        return epriceUplimit;
    }

    public void setEpriceUplimit(BigDecimal epriceUplimit) {
        this.epriceUplimit = epriceUplimit;
    }

    public BigDecimal getEpriceDownlimit() {
        return epriceDownlimit;
    }

    public void setEpriceDownlimit(BigDecimal epriceDownlimit) {
        this.epriceDownlimit = epriceDownlimit;
    }

    public BigDecimal getProfit() {
        return profit;
    }

    public void setProfit(BigDecimal profit) {
        this.profit = profit;
    }

    public String getTimesegId() {
        return timesegId;
    }

    public void setTimesegId(String timesegId) {
        this.timesegId = timesegId;
    }

    public BigDecimal getInterval() {
        return interval;
    }

    public void setInterval(BigDecimal interval) {
        this.interval = interval;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public BigDecimal getAdjustPower() {
        return adjustPower;
    }

    public void setAdjustPower(BigDecimal adjustPower) {
        this.adjustPower = adjustPower;
    }

    public String getAdjustType() {
        return adjustType;
    }

    public void setAdjustType(String adjustType) {
        this.adjustType = adjustType;
    }

    public String getTradeContent() {
        return tradeContent;
    }

    public void setTradeContent(String tradeContent) {
        this.tradeContent = tradeContent;
    }

    public String getAdjustTime() {
        return adjustTime;
    }

    public void setAdjustTime(String adjustTime) {
        this.adjustTime = adjustTime;
    }

    public BigDecimal getTradePower() {
        return tradePower;
    }

    public void setTradePower(BigDecimal tradePower) {
        this.tradePower = tradePower;
    }

    public BigDecimal getBasePower() {
        return basePower;
    }

    public void setBasePower(BigDecimal basePower) {
        this.basePower = basePower;
    }

    public String getAdjustDate() {
        return adjustDate;
    }

    public void setAdjustDate(String adjustDate) {
        this.adjustDate = adjustDate;
    }

    public String getBidEnd() {
        return bidEnd;
    }

    public void setBidEnd(String bidEnd) {
        this.bidEnd = bidEnd;
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

    public String getGbsId() {
        return gbsId;
    }

    public void setGbsId(String gbsId) {
        this.gbsId = gbsId;
    }

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    public String getTradeseqConsId() {
        return tradeseqConsId;
    }

    public void setTradeseqConsId(String tradeseqConsId) {
        this.tradeseqConsId = tradeseqConsId;
    }

    public String getConsNo() {
        return consNo;
    }

    public void setConsNo(String consNo) {
        this.consNo = consNo;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getBidDate() {
        return bidDate;
    }

    public void setBidDate(String bidDate) {
        this.bidDate = bidDate;
    }

    public BigDecimal getBidPower() {
        return bidPower;
    }

    public void setBidPower(BigDecimal bidPower) {
        this.bidPower = bidPower;
    }

    public BigDecimal getBidPrice() {
        return bidPrice;
    }

    public void setBidPrice(BigDecimal bidPrice) {
        this.bidPrice = bidPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTradeseqId() {
        return tradeseqId;
    }

    public void setTradeseqId(String tradeseqId) {
        this.tradeseqId = tradeseqId;
    }
}
