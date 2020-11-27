package com.thinkgem.jeesite.modules.dljyzx.service.ancillaryTrade.settlement;

import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryTrade.settlement.JsAsSeResultMonthDao;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt.JsAsSeResultMonth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class JsAsSeResultMonthService extends CrudService<JsAsSeResultMonthDao, JsAsSeResultMonth> {

    @Autowired
   private JsAsSeResultMonthDao jsAsSeResultMonthDao ;

    public JsAsSeResultMonth getGUID(JsAsSeResultMonth jsAsSeResultMonth ){
        return jsAsSeResultMonthDao.getGUID(jsAsSeResultMonth);
    }

  public   Integer  confirm(JsAsSeResultMonth jsAsSeResultMonth){
       return  jsAsSeResultMonthDao.confirm(jsAsSeResultMonth);
    }

    public JsAsSeResultMonth getInfoByguId(JsAsSeResultMonth jsAsSeResultMonth){
        return jsAsSeResultMonthDao.getInfoByguId(jsAsSeResultMonth);
    }
    public Integer updateStatus(JsAsSeResultMonth jsAsSeResultMonth){
        return jsAsSeResultMonthDao.updateStatus(jsAsSeResultMonth);
    }

    public Map<String,Object> getNumber(String guId) {
        return jsAsSeResultMonthDao.getNumber(guId);
    }
}
