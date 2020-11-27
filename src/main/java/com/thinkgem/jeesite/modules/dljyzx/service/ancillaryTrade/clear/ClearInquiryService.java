package com.thinkgem.jeesite.modules.dljyzx.service.ancillaryTrade.clear;

import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryTrade.clear.ClearInquiryDao;

import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.clear.ClearInquiry;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.clear.ClearResult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ClearInquiryService  extends CrudService<ClearInquiryDao, ClearResult> {

    @Autowired
    private ClearInquiryDao clearInquiryDao;
    public Map<String,Object> getTimeSeqId(String tradeSeqId) {
        return  clearInquiryDao.getTimeSeqId(tradeSeqId);
    }
    public  String getInterval(String tradeSeqId){
        return clearInquiryDao.getInterval(tradeSeqId);
    }
}
