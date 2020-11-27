package com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryTrade.cureLine;

import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.cureLine.JsAsCurvePowerPriceInfo;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.cureLine.JsAsCurveTemplateInfo;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.cureLine.JsAsTimeDefinitionDetail;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 陶然
 * 2020/6/15
 */
@MyBatisDao
public interface JsAsCureLineDao {

    /**
     * 添加主表
     * @param curveInfoObj
     */
    void insertInfo(JsAsCurveTemplateInfo curveInfoObj);

    /**
     * 添加96时段信息
     * @param jsAsCurvePowerPriceInfo
     */
    void insertCureveDetils(JsAsCurvePowerPriceInfo jsAsCurvePowerPriceInfo);

    /**
     * 查询曲线主表信息
     * @param pid
     * @return
     */
    List<JsAsCurveTemplateInfo> getCurveInfoListByPid(@Param("pid") String pid);

    /**
     * 查询曲线96个时段信息
     * @param infoId
     * @return
     */
    List<JsAsCurvePowerPriceInfo> getCurveDetils(@Param("infoId") String infoId);

    /**
     * 查询时断信息
     * @param timeId
     * @return
     */
    List<JsAsTimeDefinitionDetail> findTimeDefinitionDetailByTimeId(@Param("timeId") String timeId);

    /**
     * 根据曲线id获取曲线内容
     * @param curveId
     * @return
     */
    JsAsCurveTemplateInfo findInfoById(@Param("id") String curveId);


    /**
     * 修改主表信息
     * @param jsAsCurveTemplateInfo
     * @return
     */
    void updateInfo(JsAsCurveTemplateInfo jsAsCurveTemplateInfo);

    /**
     * 修改时段详情表信息
     * @param js
     * @return
     */
    void updateDetail(JsAsCurvePowerPriceInfo js);

    void delInfo(String id);

    void delDetails(String curveTemplateId);
}
