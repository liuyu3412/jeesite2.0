/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.cureLine;

import com.thinkgem.jeesite.common.persistence.DataEntity;

/**
 * 陶然
 * 2020/6/15
 */
public class JsAsCurvePowerPriceInfo extends DataEntity<JsAsCurvePowerPriceInfo> {
	
	private static final long serialVersionUID = 1L;
	private String curveTemplateId;	// 曲线模板ID
	private String timeDetailId;    // 曲线定义详情表ID
	private Double tradePower;		// 交易电力
	private Double tradePrice;		// 交易电价

	/**
	 * 主键
	 */
	private String guid;

	/**
	 * 时段定义表ID
	 */
	private String timeId;

	/**
	 * 时段
	 */
	private int time;

	/**
	 * 开始时间
	 */
	private String startTime;

	/**
	 * 结束时间
	 */
	private String endTime;
	/**
	 * 是否可修改
	 */
	private Integer isModifiable;

	public String getGuid() {
		return guid;
	}

	public void setGuid(String guid) {
		this.guid = guid;
	}

	public String getTimeId() {
		return timeId;
	}

	public void setTimeId(String timeId) {
		this.timeId = timeId;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public Integer getIsModifiable() {
		return isModifiable;
	}

	public void setIsModifiable(Integer isModifiable) {
		this.isModifiable = isModifiable;
	}

	private JsAsTimeDefinitionDetail jsAsTimeDefinitionDetail = new JsAsTimeDefinitionDetail();//曲线定义时段详情

	public JsAsTimeDefinitionDetail getJsAsTimeDefinitionDetail() {
		return jsAsTimeDefinitionDetail;
	}

	public void setJsAsTimeDefinitionDetail(JsAsTimeDefinitionDetail jsAsTimeDefinitionDetail) {
		this.jsAsTimeDefinitionDetail = jsAsTimeDefinitionDetail;
	}

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public String getCurveTemplateId() {
		return curveTemplateId;
	}

	public void setCurveTemplateId(String curveTemplateId) {
		this.curveTemplateId = curveTemplateId;
	}

	public String getTimeDetailId() {
		return timeDetailId;
	}

	public void setTimeDetailId(String timeDetailId) {
		this.timeDetailId = timeDetailId;
	}

	public Double getTradePower() {
		return tradePower;
	}

	public void setTradePower(Double tradePower) {
		this.tradePower = tradePower;
	}

	public Double getTradePrice() {
		return tradePrice;
	}

	public void setTradePrice(Double tradePrice) {
		this.tradePrice = tradePrice;
	}

	@Override
	public String toString() {
		return "JsAsCurvePowerPriceInfo{" +
				"curveTemplateId='" + curveTemplateId + '\'' +
				", timeDetailId='" + timeDetailId + '\'' +
				", tradePower=" + tradePower +
				", tradePrice=" + tradePrice +
				", guid='" + guid + '\'' +
				", timeId='" + timeId + '\'' +
				", time=" + time +
				", startTime='" + startTime + '\'' +
				", endTime='" + endTime + '\'' +
				", isModifiable=" + isModifiable +
				", jsAsTimeDefinitionDetail=" + jsAsTimeDefinitionDetail +
				'}';
	}
}