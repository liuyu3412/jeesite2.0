package com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt;


import com.thinkgem.jeesite.common.persistence.DataEntity;

/**
 * 月结算单类*/
public class JsAsSeResultMonth  extends DataEntity<JsAsSeResultMonth> {
    private  String guId;
    private  String  month;
    private  String  resultName;
    private  String  resultProductDate;
    private  String  issueStatus;
    private  String  confirmStatus;
    private  String  consumerNumber;
    private  String  participantId;
    private  String feedBack;
    private  String dealStatus;

    public String getDealStatus() {
        return dealStatus;
    }

    public void setDealStatus(String dealStatus) {
        this.dealStatus = dealStatus;
    }

    public String getFeedBack() {
        return feedBack;
    }

    public void setFeedBack(String feedBack) {
        this.feedBack = feedBack;
    }

    public JsAsSeResultMonth(String guId, String month, String resultName, String resultProductDate, String issueStatus, String confirmStatus, String consumerNumber, String participantId, String feedBack) {
        this.guId = guId;
        this.month = month;
        this.resultName = resultName;
        this.resultProductDate = resultProductDate;
        this.issueStatus = issueStatus;
        this.confirmStatus = confirmStatus;
        this.consumerNumber = consumerNumber;
        this.participantId = participantId;
        this.feedBack = feedBack;
    }

    public JsAsSeResultMonth(){

    }

    public String getGuId() {
        return guId;
    }

    public void setGuId(String guId) {
        this.guId = guId;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getResultName() {
        return resultName;
    }

    public void setResultName(String resultName) {
        this.resultName = resultName;
    }

    public String getResultProductDate() {
        return resultProductDate;
    }

    public void setResultProductDate(String resultProductDate) {
        this.resultProductDate = resultProductDate;
    }

    public String getIssueStatus() {
        return issueStatus;
    }

    public void setIssueStatus(String issueStatus) {
        this.issueStatus = issueStatus;
    }

    public String getConfirmStatus() {
        return confirmStatus;
    }

    public void setConfirmStatus(String confirmStatus) {
        this.confirmStatus = confirmStatus;
    }

    public String getConsumerNumber() {
        return consumerNumber;
    }

    public void setConsumerNumber(String consumerNumber) {
        this.consumerNumber = consumerNumber;
    }

    public String getParticipantId() {
        return participantId;
    }

    public void setParticipantId(String participantId) {
        this.participantId = participantId;
    }

    @Override
    public String toString() {
        return "JsAsSeResultMonth{" +
                "guId='" + guId + '\'' +
                ", month='" + month + '\'' +
                ", resultName='" + resultName + '\'' +
                ", resultProductDate='" + resultProductDate + '\'' +
                ", issueStatus='" + issueStatus + '\'' +
                ", confirmStatus='" + confirmStatus + '\'' +
                ", consumerNumber='" + consumerNumber + '\'' +
                ", participantId='" + participantId + '\'' +
                ", feedBack='" + feedBack + '\'' +
                '}';
    }
}
