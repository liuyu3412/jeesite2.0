package com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryTrade.settlement;

import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt.SeResultDaily;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


@MyBatisDao
public interface SeResultDailyDao extends CrudDao<SeResultDaily> {
    SeResultDaily  getSingleInfo(SeResultDaily seResultDaily);
    Integer updateStatus(SeResultDaily seResultDaily);
    Integer confirmStatus(SeResultDaily seResultDaily);

    Map<String, Object> getNumber(String guId);

    List<SeResultDaily> havefindList(SeResultDaily seResultDaily);

    Integer recallStatus(SeResultDaily seResultDaily);

    String getSeqName(SeResultDaily seResultDaily) ;

    List<SeResultDaily> getTradeseqId(SeResultDaily seResultDaily);
}
