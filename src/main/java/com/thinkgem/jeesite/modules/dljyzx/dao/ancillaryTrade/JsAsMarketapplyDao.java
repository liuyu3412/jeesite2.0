package com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryTrade;

import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.JsAsMarketapply;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.JsAsMarketapplyConsno;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * @author GuoYF
 * @version 2020/6/12
 */
@MyBatisDao
public interface JsAsMarketapplyDao extends CrudDao<JsAsMarketapply> {

        int insertConsNo(JsAsMarketapplyConsno jsAsMarketapplyConsno);

        int deleteConsNo(@Param("guid") String guid);

        int updatePVK(@Param("attid") String attid, @Param("guid") String guid);

        List<Map<String,Object>> getConsNos(@Param("pid") String pid);

        List<JsAsMarketapply> findList1(JsAsMarketapply jsAsMarketapply);

        List<Map<String,Object>> getConsNosSeller(@Param("pid") String pid);

        Map<String,Object> getUserInfo(@Param("pid") String pid);

        JsAsMarketapply findById(@Param("guid") String guid);

        int updateStatus(@Param("guid") String guid);

        BigDecimal hasApply(@Param("userId") String userId, @Param("year") String year, @Param("guid") String guid);

        List<String> getName(@Param("pid") String pid);

        List<Map<String,Object>> areaTreeData();

        Map<String,String> getAuthMan(@Param("userId") String userId);

        List<JsAsMarketapplyConsno> getConsNoByUser(@Param("userId") String userId, @Param("year") String year);

        String getAreaName(@Param("areaId") String areaId);
}
