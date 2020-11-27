package com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryTrade.settlement;


import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt.Attachment;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt.UbSource;
import com.thinkgem.jeesite.modules.tmxattachmentw.entity.TMxAttachment;


@MyBatisDao
public interface UbSourceDao extends CrudDao<UbSource> {
        int insertUbSources(UbSource UbSource);
}
