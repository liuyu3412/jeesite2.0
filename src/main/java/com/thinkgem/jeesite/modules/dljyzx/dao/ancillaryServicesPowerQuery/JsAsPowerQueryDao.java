package com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryServicesPowerQuery;

import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryServicesPowerQuery.JsAsPowerQuery;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.JsAsTradeseq;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@MyBatisDao
public interface JsAsPowerQueryDao extends CrudDao<JsAsPowerQuery> {

    List<String> findSeqsByMonth(@Param("month") String month, @Param("pId") String pId);

    List<Map<String,Object>> powereQuery(@Param("date") String date, @Param("participantId") String participantId);

    List<Map<String, Object>> queryActulePower(@Param("consno") String consno, @Param("tradeseqid") String tradeseqid);

    List<Map<String, Object>> queryBaseline(@Param("consno") String consno, @Param("adjustDate") String adjustDate);

    List<Map<String, Object>> queryTradeBid(@Param("consno") String consno, @Param("adjustDate") String adjustDate);

    List<Map<String, Object>> queryActualElec(@Param("consno") String consno, @Param("adjustDate") String adjustDate);

    List<Map<String, Object>> querylastPower(@Param("consno") String consno, @Param("dayTime") String dayTime);

    List<String> queryConso(@Param("date") String date, @Param("participantId") String participantId);
}
