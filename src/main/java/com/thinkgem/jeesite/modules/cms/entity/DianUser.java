/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.cms.entity;

import org.hibernate.validator.constraints.Length;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import javax.validation.constraints.NotNull;

import com.thinkgem.jeesite.common.persistence.DataEntity;

/**
 * 单表生成Entity
 * @author ThinkGem
 * @version 2019-05-15
 */
public class DianUser extends DataEntity<DianUser> {
	
	private static final long serialVersionUID = 1L;
	private String name;		// 客户名称
	private Date created;		// 注册日日期
	private String delflag = "0";		// 删除标识
	private String linkedName;		// 联系人
	private String linkedPhone;		// 联系电话
	private String organizationCode;		// 组织机构代码
	private String businessCode;		// 营业执照大门
	private String seqNo;		// 企业编号
	private Integer statuz;		// 状态
	private Integer checked;

	public DianUser() {
		super();
	}

	public DianUser(String id){
		super(id);
	}

	@Length(min=1, max=50, message="客户名称长度必须介于 1 和 50 之间")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@NotNull(message="注册日日期不能为空")
	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}
	
	@Length(min=1, max=1, message="删除标识长度必须介于 1 和 1 之间")
	public String getDelflag() {
		return delflag;
	}

	public void setDelflag(String delflag) {
		this.delflag = delflag;
	}
	
	@Length(min=0, max=50, message="联系人长度必须介于 0 和 50 之间")
	public String getLinkedName() {
		return linkedName;
	}

	public void setLinkedName(String linkedName) {
		this.linkedName = linkedName;
	}
	
	@Length(min=0, max=13, message="联系电话长度必须介于 0 和 13 之间")
	public String getLinkedPhone() {
		return linkedPhone;
	}

	public void setLinkedPhone(String linkedPhone) {
		this.linkedPhone = linkedPhone;
	}
	
	@Length(min=0, max=32, message="组织机构代码长度必须介于 0 和 32 之间")
	public String getOrganizationCode() {
		return organizationCode;
	}

	public void setOrganizationCode(String organizationCode) {
		this.organizationCode = organizationCode;
	}
	
	@Length(min=0, max=50, message="营业执照大门长度必须介于 0 和 50 之间")
	public String getBusinessCode() {
		return businessCode;
	}

	public void setBusinessCode(String businessCode) {
		this.businessCode = businessCode;
	}
	
	@Length(min=0, max=20, message="企业编号长度必须介于 0 和 20 之间")
	public String getSeqNo() {
		return seqNo;
	}

	public void setSeqNo(String seqNo) {
		this.seqNo = seqNo;
	}

	public Integer getStatuz() {
		return statuz;
	}

	public void setStatuz(Integer statuz) {
		this.statuz = statuz;
	}

	public Integer getChecked() {
		return checked;
	}

	public void setChecked(Integer checked) {
		this.checked = checked;
	}
}