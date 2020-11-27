package com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade;

import java.util.List;

/**
 * @author GuoYF
 * @version 2020/7/22
 */
public class JsAsTradeBid {

    private String powersStr;

    @Override
    public String toString() {
        return "JsAsTradeBid{" +
                "powersStr='" + powersStr + '\'' +
                ", jsAsTradeBidConsList=" + jsAsTradeBidConsList +
                ", consNo='" + consNo + '\'' +
                ", adjustDate='" + adjustDate + '\'' +
                ", status='" + status + '\'' +
                '}';
    }

    private List<JsAsTradeBidCons> jsAsTradeBidConsList;

    private String consNo;

    private String adjustDate;

    private String status;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getConsNo() {
        return consNo;
    }

    public void setConsNo(String consNo) {
        this.consNo = consNo;
    }

    public String getAdjustDate() {
        return adjustDate;
    }

    public void setAdjustDate(String adjustDate) {
        this.adjustDate = adjustDate;
    }

    public String getPowersStr() {
        return powersStr;
    }

    public void setPowersStr(String powersStr) {
        this.powersStr = powersStr;
    }

    public List<JsAsTradeBidCons> getJsAsTradeBidConsList() {
        return jsAsTradeBidConsList;
    }

    public void setJsAsTradeBidConsList(List<JsAsTradeBidCons> jsAsTradeBidConsList) {
        this.jsAsTradeBidConsList = jsAsTradeBidConsList;
    }
}
