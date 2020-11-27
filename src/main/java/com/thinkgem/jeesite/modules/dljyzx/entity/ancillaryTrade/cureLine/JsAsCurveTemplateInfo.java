/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.cureLine;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.thinkgem.jeesite.common.persistence.DataEntity;
import org.hibernate.validator.constraints.Length;

import java.util.Date;
import java.util.List;

/**
 * 陶然
 * 2020/6/15
 */
public class JsAsCurveTemplateInfo extends DataEntity<JsAsCurveTemplateInfo> {
	
	private static final long serialVersionUID = 1L;
	private String id; //主键id
	private String participanId;		// 市场成员ID
	private String curveName;		// 曲线名称
	private Double energy;		// 总电量
	private Double middleRate;		// 平均价
	private Double allInCost;		// 总费用
	private String applyJydyParticipanType;		// 适用市场成员类型
	private Integer commonalityCurveFlag;		// 是否是公共曲线  1：是 , 0：否
	private Date createTime;		// 创建时间
	private String desc;		// desc
	private String pageNo;
	private Integer timeNums;
	private String description;
	private List<JsAsCurvePowerPriceInfo> curveData;//时段信息

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String getId() {
		return id;
	}

	@Override
	public void setId(String id) {
		this.id = id;
	}

	public Integer getTimeNums() {
		return timeNums;
	}

	public void setTimeNums(Integer timeNums) {
		this.timeNums = timeNums;
	}

	public String getPageNo() {
		return pageNo;
	}

	public void setPageNo(String pageNo) {
		this.pageNo = pageNo;
	}


	public JsAsCurveTemplateInfo() {
		super();
	}

	public JsAsCurveTemplateInfo(String id){
		super(id);
	}

	public String getParticipanId() {
		return participanId;
	}

	public void setParticipanId(String participanId) {
		this.participanId = participanId;
	}

	@Length(min=0, max=100, message="曲线名称长度必须介于 0 和 100 之间")
	public String getCurveName() {
		return curveName;
	}

	public void setCurveName(String curveName) {
		this.curveName = curveName;
	}
	
	public Double getEnergy() {
		return energy;
	}

	public void setEnergy(Double energy) {
		this.energy = energy;
	}
	
	public Double getMiddleRate() {
		return middleRate;
	}

	public void setMiddleRate(Double middleRate) {
		this.middleRate = middleRate;
	}
	
	public Double getAllInCost() {
		return allInCost;
	}

	public void setAllInCost(Double allInCost) {
		this.allInCost = allInCost;
	}
	
	@Length(min=0, max=50, message="适用市场成员类型长度必须介于 0 和 50 之间")
	public String getApplyJydyParticipanType() {
		return applyJydyParticipanType;
	}

	public void setApplyJydyParticipanType(String applyJydyParticipanType) {
		this.applyJydyParticipanType = applyJydyParticipanType;
	}
	
	public Integer getCommonalityCurveFlag() {
		return commonalityCurveFlag;
	}

	public void setCommonalityCurveFlag(Integer commonalityCurveFlag) {
		this.commonalityCurveFlag = commonalityCurveFlag;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	@Length(min=0, max=2000, message="desc长度必须介于 0 和 2000 之间")
	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public List<JsAsCurvePowerPriceInfo> getCurveData() {
		return curveData;
	}

	public void setCurveData(List<JsAsCurvePowerPriceInfo> curveData) {
		this.curveData = curveData;
	}
}