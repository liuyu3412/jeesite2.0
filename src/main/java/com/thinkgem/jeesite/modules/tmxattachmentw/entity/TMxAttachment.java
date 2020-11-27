/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.tmxattachmentw.entity;

import org.hibernate.validator.constraints.Length;

import com.thinkgem.jeesite.common.persistence.DataEntity;

import java.util.Arrays;

/**
 * 附件表Entity
 * @author zzw
 * @version 2017-08-07
 */
public class TMxAttachment extends DataEntity<TMxAttachment> {
	
	private static final long serialVersionUID = 1L;
	private String attachmentId;		// 附件标识，附件的唯一标识。
	private String tableName;		// 附件所隶属的物理表名。
	private String pkVal;		// 附件所隶属的物理表记录的主键值。
	private String attName;		// 不带路径的附件名称。
	private String attPath;		// 附件物理磁盘路径。
	private String colName;		// 附件所隶属的物理表字段名。
	private Long attSize;		// 文件大小。
	private byte[] attFile;		// 文件上传数据库存储功能的上传数据存储字段。
	private String typeId;		//附件类型ID
	private String fileType;	//附件名称	
	private String date;		//附件上传时间
	private String sign;
	
	
	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public TMxAttachment() {
		super();
	}

	public TMxAttachment(String id){
		super(id);
	}

	@Length(min=1, max=36, message="附件标识，附件的唯一标识。长度必须介于 1 和 36 之间")
	public String getAttachmentId() {
		return attachmentId;
	}

	public void setAttachmentId(String attachmentId) {
		this.attachmentId = attachmentId;
	}
	
	@Length(min=0, max=36, message="附件所隶属的物理表名。长度必须介于 0 和 36 之间")
	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	
	@Length(min=0, max=36, message="附件所隶属的物理表记录的主键值。长度必须介于 0 和 36 之间")
	public String getPkVal() {
		return pkVal;
	}

	public void setPkVal(String pkVal) {
		this.pkVal = pkVal;
	}
	
	@Length(min=0, max=256, message="不带路径的附件名称。长度必须介于 0 和 256 之间")
	public String getAttName() {
		return attName;
	}

	public void setAttName(String attName) {
		this.attName = attName;
	}
	
	@Length(min=0, max=256, message="附件物理磁盘路径。长度必须介于 0 和 256 之间")
	public String getAttPath() {
		return attPath;
	}

	public void setAttPath(String attPath) {
		this.attPath = attPath;
	}
	
	@Length(min=0, max=128, message="附件所隶属的物理表字段名。长度必须介于 0 和 128 之间")
	public String getColName() {
		return colName;
	}

	public void setColName(String colName) {
		this.colName = colName;
	}
	
	public Long getAttSize() {
		return attSize;
	}

	public void setAttSize(Long attSize) {
		this.attSize = attSize;
	}

	public byte[] getAttFile() {
		return attFile;
	}

	public void setAttFile(byte[] attFile) {
		this.attFile = attFile;
	}

	public String getTypeId() {
		return typeId;
	}

	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}


	@Override
	public String toString() {
		return "TMxAttachment{" +
				"attachmentId='" + attachmentId + '\'' +
				", tableName='" + tableName + '\'' +
				", pkVal='" + pkVal + '\'' +
				", attName='" + attName + '\'' +
				", attPath='" + attPath + '\'' +
				", colName='" + colName + '\'' +
				", attSize=" + attSize +
				", attFile=" + Arrays.toString(attFile) +
				", typeId='" + typeId + '\'' +
				", fileType='" + fileType + '\'' +
				", date='" + date + '\'' +
				", sign='" + sign + '\'' +
				'}';
	}
}