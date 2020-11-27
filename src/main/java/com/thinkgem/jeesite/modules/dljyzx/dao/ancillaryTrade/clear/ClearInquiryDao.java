package com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryTrade.clear;

import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.clear.ClearInquiry;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.clear.ClearResult;

import java.util.Map;


@MyBatisDao
public interface ClearInquiryDao extends CrudDao<ClearResult> {

     Map<String, Object> getTimeSeqId(String tradeSeqId) ;
     String  getInterval(String tradeSeqId);

}
