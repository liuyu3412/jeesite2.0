package com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade;

import com.thinkgem.jeesite.common.persistence.DataEntity;

import java.math.BigDecimal;
import java.sql.Timestamp;

/**
 * @author GuoYF
 * @version 2020/6/28
 */
public class JsAsTradeseq extends DataEntity<JsAsTradeseq> {

    private String guid;

    private String seqName;

    private String adjustType;

    private String areaIds;

    private BigDecimal moneyLimit;

    private BigDecimal adjustPower;

    private BigDecimal eKcof;

    private BigDecimal epriceUplimit;

    private BigDecimal epriceDownlimit;

    private String timeseqId;

    private String status;

    private String createUser;

    private String operationIp;

    private String adjustDateStr;
    private String adjustStartStr;

    private String adjustEndStr;

    private String bidStartStr;

    private String bidEndStr;

    private String areaName;

    private String consNo;
    private String consName;

    private String bidStatus;
    private String bidDate;
    private String tradeSeqConsId;

    private String pid;
    private String date;
    private String month;
    private String day;

    public String getConsName() {
        return consName;
    }

    public void setConsName(String consName) {
        this.consName = consName;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getTradeSeqConsId() {
        return tradeSeqConsId;
    }

    public void setTradeSeqConsId(String tradeSeqConsId) {
        this.tradeSeqConsId = tradeSeqConsId;
    }

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    public String getSeqName() {
        return seqName;
    }

    public void setSeqName(String seqName) {
        this.seqName = seqName;
    }

    public String getAdjustType() {
        return adjustType;
    }

    public void setAdjustType(String adjustType) {
        this.adjustType = adjustType;
    }

    public String getAreaIds() {
        return areaIds;
    }

    public void setAreaIds(String areaIds) {
        this.areaIds = areaIds;
    }

    public BigDecimal getMoneyLimit() {
        return moneyLimit;
    }

    public void setMoneyLimit(BigDecimal moneyLimit) {
        this.moneyLimit = moneyLimit;
    }

    public BigDecimal getAdjustPower() {
        return adjustPower;
    }

    public void setAdjustPower(BigDecimal adjustPower) {
        this.adjustPower = adjustPower;
    }

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

    public String getTimeseqId() {
        return timeseqId;
    }

    public void setTimeseqId(String timeseqId) {
        this.timeseqId = timeseqId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public String getOperationIp() {
        return operationIp;
    }

    public void setOperationIp(String operationIp) {
        this.operationIp = operationIp;
    }

    public String getAdjustDateStr() {
        return adjustDateStr;
    }

    public void setAdjustDateStr(String adjustDateStr) {
        this.adjustDateStr = adjustDateStr;
    }

    public String getAdjustStartStr() {
        return adjustStartStr;
    }

    public void setAdjustStartStr(String adjustStartStr) {
        this.adjustStartStr = adjustStartStr;
    }

    public String getAdjustEndStr() {
        return adjustEndStr;
    }

    public void setAdjustEndStr(String adjustEndStr) {
        this.adjustEndStr = adjustEndStr;
    }

    public String getBidStartStr() {
        return bidStartStr;
    }

    public void setBidStartStr(String bidStartStr) {
        this.bidStartStr = bidStartStr;
    }

    public String getBidEndStr() {
        return bidEndStr;
    }

    public void setBidEndStr(String bidEndStr) {
        this.bidEndStr = bidEndStr;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public String getConsNo() {
        return consNo;
    }

    public void setConsNo(String consNo) {
        this.consNo = consNo;
    }

    public String getBidStatus() {
        return bidStatus;
    }

    public void setBidStatus(String bidStatus) {
        this.bidStatus = bidStatus;
    }

    public String getBidDate() {
        return bidDate;
    }

    public void setBidDate(String bidDate) {
        this.bidDate = bidDate;
    }
}
