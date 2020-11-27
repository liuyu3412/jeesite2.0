package com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.clear;

import com.thinkgem.jeesite.common.persistence.DataEntity;

import java.math.BigDecimal;


public class ClearInquiry  extends DataEntity<ClearInquiry> {


  private  String   participantName;


    private  String bidDate;

    private  String participantId;

    private String seqName;

    private  String guId;

    private String consumerNumber;//户号

    private  String consumerName;//户名

    private  String reportTime;//申报时间

    private String callTime;//调用时间callTime

    private String clearStatus;//出清状态

    private String tradeSeqId; //交易序列id

    private String clearDate; //出清时间

    private BigDecimal bidPower;//可调负荷

    private String bidPrice;//申报电价

    private  String callTimeZ;

    public String getSeqName() {
        return seqName;
    }

    public void setSeqName(String seqName) {
        this.seqName = seqName;
    }

    public String getParticipantName() {
        return participantName;
    }

    public void setParticipantName(String participantName) {
        this.participantName = participantName;
    }


    public String getBidDate() {
        return bidDate;
    }

    public void setBidDate(String bidDate) {
        this.bidDate = bidDate;
    }

    public String getClearDate() {
        return clearDate;
    }

    public void setClearDate(String clearDate) {
        this.clearDate = clearDate;
    }


    public String getGuId() {
        return guId;
    }

    public void setGuId(String guId) {
        this.guId = guId;
    }

    public String getParticipantId() {
        return participantId;
    }

    public void setParticipantId(String participantId) {
        this.participantId = participantId;
    }

    public BigDecimal getBidPower() {
        return bidPower;
    }

    public void setBidPower(BigDecimal bidPower) {
        this.bidPower = bidPower;
    }

    public String getBidPrice() {
        return bidPrice;
    }

    public void setBidPrice(String bidPrice) {
        this.bidPrice = bidPrice;
    }

    public String getTradeSeqId() {
        return tradeSeqId;
    }

    public void setTradeSeqId(String tradeSeqId) {
        this.tradeSeqId = tradeSeqId;
    }

    public String getConsumerNumber() {
        return consumerNumber;
    }

    public void setConsumerNumber(String consumerNumber) {
        this.consumerNumber = consumerNumber;
    }

    public String getConsumerName() {
        return consumerName;
    }

    public void setConsumerName(String consumerName) {
        this.consumerName = consumerName;
    }

    public String getReportTime() {
        return reportTime;
    }

    public void setReportTime(String reportTime) {
        this.reportTime = reportTime;
    }

    public String getCallTime() {
        return callTime;
    }

    public void setCallTime(String callTime) {
        this.callTime = callTime;
    }

    public String getClearStatus() {
        return clearStatus;
    }

    public void setClearStatus(String clearStatus) {
        this.clearStatus = clearStatus;
    }


    public String getCallTimeZ() {
        return callTimeZ;
    }

    public void setCallTimeZ(String callTimeZ) {
        this.callTimeZ = callTimeZ;
    }

    public ClearInquiry() {
    }

    public ClearInquiry(String participantName, String bidDate, String participantId, String guId, String consumerNumber, String consumerName, String reportTime, String callTime, String clearStatus, String tradeSeqId, String clearDate, BigDecimal bidPower, String bidPrice, String callTimeZ) {
        this.participantName = participantName;
        this.bidDate = bidDate;
        this.participantId = participantId;
        this.guId = guId;
        this.consumerNumber = consumerNumber;
        this.consumerName = consumerName;
        this.reportTime = reportTime;
        this.callTime = callTime;
        this.clearStatus = clearStatus;
        this.tradeSeqId = tradeSeqId;
        this.clearDate = clearDate;
        this.bidPower = bidPower;
        this.bidPrice = bidPrice;
        this.callTimeZ = callTimeZ;
    }

    @Override
    public String toString() {
        return "ClearInquiry{" +
                "participantName='" + participantName + '\'' +
                ", bidDate='" + bidDate + '\'' +
                ", participantId='" + participantId + '\'' +
                ", guId='" + guId + '\'' +
                ", consumerNumber='" + consumerNumber + '\'' +
                ", consumerName='" + consumerName + '\'' +
                ", reportTime='" + reportTime + '\'' +
                ", callTime='" + callTime + '\'' +
                ", clearStatus='" + clearStatus + '\'' +
                ", tradeSeqId='" + tradeSeqId + '\'' +
                ", clearDate='" + clearDate + '\'' +
                ", bidPower='" + bidPower + '\'' +
                ", bidPrice='" + bidPrice + '\'' +
                ", callTimeZ='" + callTimeZ + '\'' +
                '}';
    }
}
