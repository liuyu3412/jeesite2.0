package com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade;

import com.thinkgem.jeesite.common.persistence.DataEntity;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * @author GuoYF
 * @version 2020/6/12
 */
public class JsAsMarketapply extends DataEntity<JsAsMarketapply> {

    private String guid;

    private String areaId;//所属区域

    private String areaName;//所属区域

    private String participantId;//市场成员Id

    private String consName;//户名

    private String consNo;//户号

    private String isSeller;//是否售电公司

    private BigDecimal shareRate;//分成比例

    private BigDecimal penaltyRate;//分摊比例

    private BigDecimal shareSellerRate;//分成比例售电公司

    private BigDecimal penaltySellerRate;//分摊比例售电公司

    private String comPerson;//联系人

    private String tel;//联系电话

    private String address;//联系电话

    private Date applyDate;//提交日期

    private String applyUser;//提交人

    private Date auditDate;//审核日期

    private String auditUser;//审核人

    private String status;//状态

    private String promiseAttachid;//承诺书

    private String agreementAttachid;//负荷协议

    private String promiseAttachname;//承诺书

    private String agreementAttachname;//负荷协议

    private String participantname;

    private String year;

    private String userId;

    private String applyDateStr;

    private List<JsAsMarketapplyConsno> jsAsMarketapplyConsnos;

    private String auditContent;

    public String getAuditContent() {
        return auditContent;
    }

    public void setAuditContent(String auditContent) {
        this.auditContent = auditContent;
    }

    public String getApplyDateStr() {
        return applyDateStr;
    }

    public void setApplyDateStr(String applyDateStr) {
        this.applyDateStr = applyDateStr;
    }

    public List<JsAsMarketapplyConsno> getJsAsMarketapplyConsnos() {
        return jsAsMarketapplyConsnos;
    }

    public void setJsAsMarketapplyConsnos(List<JsAsMarketapplyConsno> jsAsMarketapplyConsnos) {
        this.jsAsMarketapplyConsnos = jsAsMarketapplyConsnos;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public BigDecimal getShareSellerRate() {
        return shareSellerRate;
    }

    public void setShareSellerRate(BigDecimal shareSellerRate) {
        this.shareSellerRate = shareSellerRate;
    }

    public BigDecimal getPenaltySellerRate() {
        return penaltySellerRate;
    }

    public void setPenaltySellerRate(BigDecimal penaltySellerRate) {
        this.penaltySellerRate = penaltySellerRate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPromiseAttachname() {
        return promiseAttachname;
    }

    public void setPromiseAttachname(String promiseAttachname) {
        this.promiseAttachname = promiseAttachname;
    }

    public String getAgreementAttachname() {
        return agreementAttachname;
    }

    public void setAgreementAttachname(String agreementAttachname) {
        this.agreementAttachname = agreementAttachname;
    }

    public String getParticipantname() {
        return participantname;
    }

    public void setParticipantname(String participantname) {
        this.participantname = participantname;
    }

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }
    public String getAreaId() {
        return areaId;
    }

    public void setAreaId(String areaId) {
        this.areaId = areaId;
    }

    public String getParticipantId() {
        return participantId;
    }

    public void setParticipantId(String participantId) {
        this.participantId = participantId;
    }

    public String getConsName() {
        return consName;
    }

    public void setConsName(String consName) {
        this.consName = consName;
    }

    public String getConsNo() {
        return consNo;
    }

    public void setConsNo(String consNo) {
        this.consNo = consNo;
    }

    public String getIsSeller() {
        return isSeller;
    }

    public void setIsSeller(String isSeller) {
        this.isSeller = isSeller;
    }

    public BigDecimal getShareRate() {
        return shareRate;
    }

    public void setShareRate(BigDecimal shareRate) {
        this.shareRate = shareRate;
    }

    public BigDecimal getPenaltyRate() {
        return penaltyRate;
    }

    public void setPenaltyRate(BigDecimal penaltyRate) {
        this.penaltyRate = penaltyRate;
    }

    public String getComPerson() {
        return comPerson;
    }

    public void setComPerson(String comPerson) {
        this.comPerson = comPerson;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public Date getApplyDate() {
        return applyDate;
    }

    public void setApplyDate(Date applyDate) {
        this.applyDate = applyDate;
    }

    public String getApplyUser() {
        return applyUser;
    }

    public void setApplyUser(String applyUser) {
        this.applyUser = applyUser;
    }

    public Date getAuditDate() {
        return auditDate;
    }

    public void setAuditDate(Date auditDate) {
        this.auditDate = auditDate;
    }

    public String getAuditUser() {
        return auditUser;
    }

    public void setAuditUser(String auditUser) {
        this.auditUser = auditUser;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPromiseAttachid() {
        return promiseAttachid;
    }

    public void setPromiseAttachid(String promiseAttachid) {
        this.promiseAttachid = promiseAttachid;
    }

    public String getAgreementAttachid() {
        return agreementAttachid;
    }

    public void setAgreementAttachid(String agreementAttachid) {
        this.agreementAttachid = agreementAttachid;
    }
}
