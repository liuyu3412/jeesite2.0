package com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryTrade.clear;

import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.clear.DeclarationCurve;

import java.util.List;
import java.util.Map;

@MyBatisDao
public interface DeclarationCurveDao extends  CrudDao<DeclarationCurve> {

    List<Map<String,Object>> getPoint(DeclarationCurve declarationCurve);

    List<DeclarationCurve> getTimePoint();

    List<Map<String,Object>>    getFiveTimePoint();
}
