package com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryTrade;

import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.JsAsDayPower;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.JsAsTradeBidCons;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.JsAsTradeseq;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * @author GuoYF
 * @version 2020/6/12
 */
@MyBatisDao
public interface JsAsTradeBidDao extends CrudDao<JsAsTradeseq> {

        List<JsAsTradeseq> findSeqsByMonth(@Param("month") String month, @Param("pId") String pId);

        BigDecimal getSeqCount(@Param("pId") String pId, @Param("date") String date);

        BigDecimal getSeqHasCount(@Param("pId") String pId, @Param("date") String date);

        List<Map<String, Object>> timeSeg();

        List<JsAsTradeseq> getSeqByDate(@Param("date") String date, @Param("pId") String pId);

        List<Map<String,Object>> getPower96(@Param("date") String date, @Param("pId") String pId,
                                            @Param("consNo") String consNo);

        List<Map<String,Object>> getActualBefore(@Param("date") String date, @Param("pId") String pId,
                                                 @Param("consNo") String consNo);

        List<Map<String,Object>> getSeqTime(@Param("date") String date, @Param("consNo") String consNo);


        List<Map<String,Object>> getBasePower(@Param("date") String date, @Param("consNo") String consNo);

        Map<String,Object> getMaxPower(@Param("date") String date, @Param("consNo") String consNo);

        List<Map<String,Object>> getBasePowerDetail(@Param("date") String date, @Param("consNo") String consNo);

        int deleteDayPowers(JsAsDayPower jsAsDayPower);
        int addDayPowers(@Param("jsAsDayPower") JsAsDayPower jsAsDayPower, @Param("powers") List<BigDecimal> powers);

        boolean checkTime(@Param("tradeSeqConsId") String tradeSeqConsId);

        String hasDayPowers(@Param("tradeSeqConsId") String tradeSeqConsId);

        Map<String, Object> getAdjustDate(@Param("tradeSeqConsId") String tradeSeqConsId);

        List<JsAsTradeBidCons> getTradeBidCons(Map<String, Object> param);

        List<BigDecimal> getBasePowerByTraid(@Param("tradeSeqConsId") String tradeSeqConsId);

        int updateTradeBidCons(JsAsTradeBidCons jsAsTradeBidCons);

        int insertTradeBidCons(JsAsTradeBidCons jsAsTradeBidCons);

}
