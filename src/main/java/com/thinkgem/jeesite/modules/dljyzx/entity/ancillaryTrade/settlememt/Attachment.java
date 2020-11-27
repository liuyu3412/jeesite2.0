package com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt;

import com.thinkgem.jeesite.common.persistence.DataEntity;

import java.util.Arrays;

public class Attachment extends DataEntity<Attachment> {
    private  String    attachmentId;
    private  String    tableName;
    private  String    pkVal;
    private  String    attName;
    private  String    attPath;
    private  String    colName;
    private  String    attSize;
    private  byte []   attFile;

    public Attachment() {
    }

    public Attachment(String attachmentId, String tableName, String pkVal, String attName, String attPath, String colName, String attSize, byte[] attFile) {
        this.attachmentId = attachmentId;
        this.tableName = tableName;
        this.pkVal = pkVal;
        this.attName = attName;
        this.attPath = attPath;
        this.colName = colName;
        this.attSize = attSize;
        this.attFile = attFile;
    }

    public String getAttachmentId() {
        return attachmentId;
    }

    public void setAttachmentId(String attachmentId) {
        this.attachmentId = attachmentId;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getPkVal() {
        return pkVal;
    }

    public void setPkVal(String pkVal) {
        this.pkVal = pkVal;
    }

    public String getAttName() {
        return attName;
    }

    public void setAttName(String attName) {
        this.attName = attName;
    }

    public String getAttPath() {
        return attPath;
    }

    public void setAttPath(String attPath) {
        this.attPath = attPath;
    }

    public String getColName() {
        return colName;
    }

    public void setColName(String colName) {
        this.colName = colName;
    }

    public String getAttSize() {
        return attSize;
    }

    public void setAttSize(String attSize) {
        this.attSize = attSize;
    }

    public byte[] getAttFile() {
        return attFile;
    }

    public void setAttFile(byte[] attFile) {
        this.attFile = attFile;
    }

    @Override
    public String toString() {
        return "Attachment{" +
                "attachmentId='" + attachmentId + '\'' +
                ", tableName='" + tableName + '\'' +
                ", pkVal='" + pkVal + '\'' +
                ", attName='" + attName + '\'' +
                ", attPath='" + attPath + '\'' +
                ", colName='" + colName + '\'' +
                ", attSize='" + attSize + '\'' +
                ", attFile=" + Arrays.toString(attFile) +
                '}';
    }
}
