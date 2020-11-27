package com.thinkgem.jeesite.modules.dljyzx.service.ancillaryTrade.settlement;

import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryTrade.settlement.AttachmentDao;
import com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryTrade.settlement.UbSourceDao;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt.Attachment;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt.UbSource;
import com.thinkgem.jeesite.modules.tmxattachmentw.entity.TMxAttachment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = false)
public class UbSourceService extends CrudService<UbSourceDao,UbSource>  {

    @Autowired
    private UbSourceDao ubSourceDao ;

    public int insertUbSources(UbSource ubSource){
        int res = ubSourceDao.insertUbSources(ubSource);
        return res;
    }
}
