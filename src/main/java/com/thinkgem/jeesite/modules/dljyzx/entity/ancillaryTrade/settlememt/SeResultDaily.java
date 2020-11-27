package com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt;

import com.thinkgem.jeesite.common.persistence.DataEntity;

import java.math.BigDecimal;
import java.util.List;


/*
* 日结算表*/
public class SeResultDaily extends DataEntity<SeResultDaily> {


    private String  moneyType;

    public String getMoneyType() {
        return moneyType;
    }

    public void setMoneyType(String moneyType) {
        this.moneyType = moneyType;
    }

    public List<String> getTradeseqIdList() {
        return tradeseqIdList;
    }

    public void setTradeseqIdList(List<String> tradeseqIdList) {
        this.tradeseqIdList = tradeseqIdList;
    }

    private String realTimeAverageLoad;

    public String getRealTimeAverageLoad() {
        return realTimeAverageLoad;
    }

    public void setRealTimeAverageLoad(String realTimeAverageLoad) {
        this.realTimeAverageLoad = realTimeAverageLoad;
    }

    private String orderNumber;

    private String basePower;
    private  String interval;

    public String getInterval() {
        return interval;
    }

    public void setInterval(String interval) {
        this.interval = interval;
    }

    public String getBasePower() {
        return basePower;
    }

    public void setBasePower(String basePower) {
        this.basePower = basePower;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    private List<String> tradeseqIdList;

    private String adjustDateC;

    public String getAdjustDateC() {
        return adjustDateC;
    }

    public void setAdjustDateC(String adjustDateC) {
        this.adjustDateC = adjustDateC;
    }

    private String adjustDate;

    public String getAdjustDate() {
        return adjustDate;
    }

    public void setAdjustDate(String adjustDate) {
        this.adjustDate = adjustDate;
    }

    private String explainText;

    public String getExplainText() {
        return explainText;
    }

    public void setExplainText(String explainText) {
        this.explainText = explainText;
    }

    private  String guId;


    private  String participantId;
    private  String   seqName;

    public String getSeqName() {
        return seqName;
    }

    public void setSeqName(String seqName) {
        this.seqName = seqName;
    }

    private BigDecimal realReguPower;//实际调整电力

    private  String tradeseqId;//交易需求id

    private  String tradeseqName;//交易需求名称

    private  String  seDate; //结算日期

    public String getSeDate() {
        return seDate;
    }

    public void setSeDate(String seDate) {
        this.seDate = seDate;
    }

    private String consumerNumber;//户号

    private  String yearMonth;//2019-08

    private String  feeType;//费用类型

    private  String   baseLinePower;//基线负荷

    private String  bidPower;//申报平均负荷（申报电力）

    private  String realPower;//实际平均负荷(实际电力)

    private  String accuRacy;//准确率；

    private String  seFee;//结算费用

    private  String  participantName;//市场成员名称

    private String  seller;//所属售电公司

    private  String addPrice;//补偿价格

    private  String  addMoney;//补偿金额

    private  String assPrice;// 考核价格

    private  String assMoney;//考核金额

    private  String  consumberPenalty;//电力用户分摊

    private  String sellerPenalty;//售电公司分摊

    private  String consumberShare;//电力用户分成

    private  String sellerShare;//售电公司分成

    private  String status;//状态

    public SeResultDaily() {
    }


    public String getParticipantId() {
        return participantId;
    }

    public void setParticipantId(String participantId) {
        this.participantId = participantId;
    }

    public BigDecimal getRealReguPower() {
        return realReguPower;
    }

    public void setRealReguPower(BigDecimal realReguPower) {
        this.realReguPower = realReguPower;
    }

    public SeResultDaily(String explainText, String guId, String participantId, String seqName, BigDecimal realReguPower, String tradeseqId, String tradeseqName, String seDate, String consumerNumber, String yearMonth, String feeType, String baseLinePower, String bidPower, String realPower, String accuRacy, String seFee, String participantName, String seller, String addPrice, String addMoney, String assPrice, String assMoney, String consumberPenalty, String sellerPenalty, String consumberShare, String sellerShare, String status) {
        this.explainText = explainText;
        this.guId = guId;
        this.participantId = participantId;
        this.seqName = seqName;
        this.realReguPower = realReguPower;
        this.tradeseqId = tradeseqId;
        this.tradeseqName = tradeseqName;
        this.seDate = seDate;
        this.consumerNumber = consumerNumber;
        this.yearMonth = yearMonth;
        this.feeType = feeType;
        this.baseLinePower = baseLinePower;
        this.bidPower = bidPower;
        this.realPower = realPower;
        this.accuRacy = accuRacy;
        this.seFee = seFee;
        this.participantName = participantName;
        this.seller = seller;
        this.addPrice = addPrice;
        this.addMoney = addMoney;
        this.assPrice = assPrice;
        this.assMoney = assMoney;
        this.consumberPenalty = consumberPenalty;
        this.sellerPenalty = sellerPenalty;
        this.consumberShare = consumberShare;
        this.sellerShare = sellerShare;
        this.status = status;
    }

    @Override
    public String toString() {
        return "SeResultDaily{" +
                "explainText='" + explainText + '\'' +
                ", guId='" + guId + '\'' +
                ", participantId='" + participantId + '\'' +
                ", seqName='" + seqName + '\'' +
                ", realReguPower='" + realReguPower + '\'' +
                ", tradeseqId='" + tradeseqId + '\'' +
                ", tradeseqName='" + tradeseqName + '\'' +
                ", seDate='" + seDate + '\'' +
                ", consumerNumber='" + consumerNumber + '\'' +
                ", yearMonth='" + yearMonth + '\'' +
                ", feeType='" + feeType + '\'' +
                ", baseLinePower='" + baseLinePower + '\'' +
                ", bidPower='" + bidPower + '\'' +
                ", realPower='" + realPower + '\'' +
                ", accuRacy='" + accuRacy + '\'' +
                ", seFee='" + seFee + '\'' +
                ", participantName='" + participantName + '\'' +
                ", seller='" + seller + '\'' +
                ", addPrice='" + addPrice + '\'' +
                ", addMoney='" + addMoney + '\'' +
                ", assPrice='" + assPrice + '\'' +
                ", assMoney='" + assMoney + '\'' +
                ", consumberPenalty='" + consumberPenalty + '\'' +
                ", sellerPenalty='" + sellerPenalty + '\'' +
                ", consumberShare='" + consumberShare + '\'' +
                ", sellerShare='" + sellerShare + '\'' +
                ", status='" + status + '\'' +
                '}';
    }

    public String getTradeseqName() {
        return tradeseqName;
    }

    public void setTradeseqName(String tradeseqName) {
        this.tradeseqName = tradeseqName;
    }

    public String getTradeseqId() {
        return tradeseqId;
    }

    public void setTradeseqId(String tradeseqId) {
        this.tradeseqId = tradeseqId;
    }



    public String getConsumerNumber() {
        return consumerNumber;
    }

    public void setConsumerNumber(String consumerNumber) {
        this.consumerNumber = consumerNumber;
    }

    public String getYearMonth() {
        return yearMonth;
    }

    public void setYearMonth(String yearMonth) {
        this.yearMonth = yearMonth;
    }

    public String getFeeType() {
        return feeType;
    }

    public void setFeeType(String feeType) {
        this.feeType = feeType;
    }

    public String getBaseLinePower() {
        return baseLinePower;
    }

    public void setBaseLinePower(String baseLinePower) {
        this.baseLinePower = baseLinePower;
    }

    public String getBidPower() {
        return bidPower;
    }

    public void setBidPower(String bidPower) {
        this.bidPower = bidPower;
    }

    public String getRealPower() {
        return realPower;
    }

    public void setRealPower(String realPower) {
        this.realPower = realPower;
    }

    public String getAccuRacy() {
        return accuRacy;
    }

    public void setAccuRacy(String accuRacy) {
        this.accuRacy = accuRacy;
    }

    public String getSeFee() {
        return seFee;
    }

    public void setSeFee(String seFee) {
        this.seFee = seFee;
    }

    public String getParticipantName() {
        return participantName;
    }

    public void setParticipantName(String participantName) {
        this.participantName = participantName;
    }

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }

    public String getAddPrice() {
        return addPrice;
    }

    public void setAddPrice(String addPrice) {
        this.addPrice = addPrice;
    }

    public String getAddMoney() {
        return addMoney;
    }

    public void setAddMoney(String addMoney) {
        this.addMoney = addMoney;
    }

    public String getAssPrice() {
        return assPrice;
    }

    public void setAssPrice(String assPrice) {
        this.assPrice = assPrice;
    }

    public String getAssMoney() {
        return assMoney;
    }

    public void setAssMoney(String assMoney) {
        this.assMoney = assMoney;
    }

    public String getConsumberPenalty() {
        return consumberPenalty;
    }

    public void setConsumberPenalty(String consumberPenalty) {
        this.consumberPenalty = consumberPenalty;
    }

    public String getSellerPenalty() {
        return sellerPenalty;
    }

    public void setSellerPenalty(String sellerPenalty) {
        this.sellerPenalty = sellerPenalty;
    }

    public String getConsumberShare() {
        return consumberShare;
    }

    public void setConsumberShare(String consumberShare) {
        this.consumberShare = consumberShare;
    }

    public String getSellerShare() {
        return sellerShare;
    }

    public void setSellerShare(String sellerShare) {
        this.sellerShare = sellerShare;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getGuId() {
        return guId;
    }

    public void setGuId(String guId) {
        this.guId = guId;
    }

}