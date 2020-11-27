package com.thinkgem.jeesite.modules.dljyzx.service.ancillaryTrade.cureLine;

import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryTrade.cureLine.JsAsCureLineDao;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.cureLine.JsAsCurvePowerPriceInfo;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.cureLine.JsAsCurveTemplateInfo;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.cureLine.JsAsTimeDefinitionDetail;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 陶然
 * 2020/6/15
 */
@Service
public class JsAsCureLineService{

    protected Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private JsAsCureLineDao jsAsCureLineDao;

    /**
     * 根据用户id查询全部曲线
     * @param participantId
     * @return
     */
    @Transactional
    public List<JsAsCurveTemplateInfo> findListByPid(String participantId) {

        JsAsCurveTemplateInfo jsAsCurveTemplateInfo = new JsAsCurveTemplateInfo();

        //获取主表信息
        List<JsAsCurveTemplateInfo> listByPid = jsAsCureLineDao.getCurveInfoListByPid(participantId);

        //获取分时段信息
//        for (JsAsCurveTemplateInfo curveInfo:listByPid) {
//            String id = curveInfo.getId();
//            List<JsAsCurvePowerPriceInfo> detilsList = jsAsCureLineDao.getCurveDetils(id);
//            curveInfo.setCurveData(detilsList);
//        }

        return listByPid;
    }

    @Transactional
    public JsAsCurveTemplateInfo getCurveInfoById(String id){

        if (StringUtils.isEmpty(id)){
            throw new RuntimeException("曲线模板id为空");
        }

        JsAsCurveTemplateInfo curve = null;

        return null;

    }

    /**
     * 存入曲线模板
     * @param curveInfoObj
     * @param curveDetils
     * @return
     */
    @Transactional
    public JsAsCurveTemplateInfo insertCurveTemplateInfo(JsAsCurveTemplateInfo curveInfoObj, List<JsAsCurvePowerPriceInfo> curveDetils) {

        try{
            log.info(String.format("存入[%s]曲线模板主表======开始", curveInfoObj.getCurveName()));
            //插入主表数据内容
            String id = IdGen.uuid();
            curveInfoObj.setId(id);
            curveInfoObj.setParticipanId(UserUtils.getUser().getParticipantId());
            jsAsCureLineDao.insertInfo(curveInfoObj);
            log.info(String.format("存入[%s]曲线模板主表======结束",curveInfoObj.getCurveName()));

            //插入分时表数据内容
            log.info("存入[%s]曲线模板分时段信息======开始",curveInfoObj.getCurveName());
            for (JsAsCurvePowerPriceInfo detil:curveDetils) {
                detil.setId(IdGen.uuid());
                detil.setCurveTemplateId(id);
                jsAsCureLineDao.insertCureveDetils(detil);
            }
            log.info("存入[%s]曲线模板分时段信息======结束",curveInfoObj.getCurveName());
        }catch (Exception e){
            e.printStackTrace();
            log.error("市场成员id[%s]用户保存[%s]曲线模板异常:%s",curveInfoObj.getParticipanId(),curveInfoObj.getCurveName(),e.getMessage());
            return null;
        }

        curveInfoObj.setCurveData(curveDetils);
        return curveInfoObj;
    }

    /**
     * 获取曲线时段信息
     * @param i 1，48个时段，2，96个时断
     * @return
     */
    public List<JsAsTimeDefinitionDetail> findTimeDefinitionDetailByTimeId(String i) {

        List<JsAsTimeDefinitionDetail> list = jsAsCureLineDao.findTimeDefinitionDetailByTimeId(i);

        return list;
    }

    public JsAsCurveTemplateInfo getCurveByInfoId(String curveId) {

        JsAsCurveTemplateInfo jsAsCurveTemplateInfo = jsAsCureLineDao.findInfoById(curveId);

        List<JsAsCurvePowerPriceInfo> curveDetils = jsAsCureLineDao.getCurveDetils(curveId);
        for (JsAsCurvePowerPriceInfo js: curveDetils) {
            System.out.println(js);
        }
        if (jsAsCurveTemplateInfo==null || curveDetils==null){
            throw new RuntimeException("获取失败");
        }

        jsAsCurveTemplateInfo.setCurveData(curveDetils);

        return jsAsCurveTemplateInfo;
    }

    @Transactional
    public JsAsCurveTemplateInfo updateCurve(JsAsCurveTemplateInfo jsAsCurveTemplateInfo, List<JsAsCurvePowerPriceInfo> JsAsCurvePowerPriceInfos) {
        try {
            //修改主表
            jsAsCureLineDao.updateInfo(jsAsCurveTemplateInfo);

            //修改分时表
            for (JsAsCurvePowerPriceInfo js:JsAsCurvePowerPriceInfos) {
                js.setCurveTemplateId(jsAsCurveTemplateInfo.getId());
               jsAsCureLineDao.updateDetail(js);
            }

            jsAsCurveTemplateInfo.setCurveData(JsAsCurvePowerPriceInfos);
        }catch (Exception e){
            e.printStackTrace();
            return new JsAsCurveTemplateInfo();
        }

        return jsAsCurveTemplateInfo;
    }

    @Transactional
    public JsAsCurveTemplateInfo delCurve(String id) {

        jsAsCureLineDao.delInfo(id);
        jsAsCureLineDao.delDetails(id);

        JsAsCurveTemplateInfo js = new JsAsCurveTemplateInfo();
        js.setId(id);

        return js;
    }
}
