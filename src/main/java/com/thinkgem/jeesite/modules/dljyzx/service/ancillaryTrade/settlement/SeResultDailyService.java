package com.thinkgem.jeesite.modules.dljyzx.service.ancillaryTrade.settlement;

import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryTrade.settlement.SeResultDailyDao;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt.SeResultDaily;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class SeResultDailyService extends CrudService<SeResultDailyDao, SeResultDaily> {

    @Autowired
    private  SeResultDailyDao seResultDailyDao;

   public  SeResultDaily  getSingleInfo(SeResultDaily seResultDaily){
         return seResultDailyDao.getSingleInfo(seResultDaily);
    }
    public  Integer  updateStatus(SeResultDaily seResultDaily){
        return seResultDailyDao.updateStatus(seResultDaily);
    }
    public  Integer  confirmStatus(SeResultDaily seResultDaily){
        return seResultDailyDao.confirmStatus(seResultDaily);
    }

    public Map<String,Object> getNumber(String guId) {
        return seResultDailyDao.getNumber(guId);
    }

    public Page<SeResultDaily> havefindList(Page<SeResultDaily> page, SeResultDaily seResultDaily) {
        seResultDaily.setPage(page);
        page.setList(seResultDailyDao.havefindList(seResultDaily));
        return page;
    }

    public Integer recallStatus(SeResultDaily seResultDaily) {
       return seResultDailyDao.recallStatus(seResultDaily);
    }

    public String getSeqName(SeResultDaily seResultDaily) {
       return seResultDailyDao.getSeqName(seResultDaily);
    }

    public List<SeResultDaily> getTradeseqId(SeResultDaily seResultDaily) {
       return seResultDailyDao.getTradeseqId(seResultDaily);
    }
}
