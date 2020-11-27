package com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade;

import com.thinkgem.jeesite.common.persistence.DataEntity;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @author GuoYF
 * @version 2020/6/12
 */
public class JsAsMarketapplyConsno extends DataEntity<JsAsMarketapplyConsno> {

    private String guid;

    private String areaId;//所属区域

    private String areaName;//所属区域

    private String participantId;//市场成员Id

    private String consName;//户名

    private String consNo;//户号

    private BigDecimal shareRate;//分成比例

    private BigDecimal penaltyRate;//分摊比例

    private BigDecimal shareSellerRate;//分成比例售电公司

    private BigDecimal penaltySellerRate;//分摊比例售电公司

    private String userId;

    private String address;

    private String marketapplyId;

    private String geogrregionid;

    private String year;

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getGeogrregionid() {
        return geogrregionid;
    }

    public void setGeogrregionid(String geogrregionid) {
        this.geogrregionid = geogrregionid;
    }

    public String getMarketapplyId() {
        return marketapplyId;
    }

    public void setMarketapplyId(String marketapplyId) {
        this.marketapplyId = marketapplyId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
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
}
