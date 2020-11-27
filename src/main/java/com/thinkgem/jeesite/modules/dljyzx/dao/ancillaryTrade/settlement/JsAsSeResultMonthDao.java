package com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryTrade.settlement;

import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt.JsAsSeResultMonth;

import java.util.Map;

@MyBatisDao
public interface JsAsSeResultMonthDao extends CrudDao<JsAsSeResultMonth> {
    JsAsSeResultMonth   getGUID(JsAsSeResultMonth jsAsSeResultMonth);
    Integer  confirm(JsAsSeResultMonth jsAsSeResultMonth);
    JsAsSeResultMonth getInfoByguId(JsAsSeResultMonth jsAsSeResultMonth);
   Integer updateStatus(JsAsSeResultMonth jsAsSeResultMonth);

    Map<String,Object> getNumber(String guId);
}
