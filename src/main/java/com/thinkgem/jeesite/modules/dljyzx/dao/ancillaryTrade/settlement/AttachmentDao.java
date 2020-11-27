package com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryTrade.settlement;


import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt.Attachment;
import com.thinkgem.jeesite.modules.tmxattachmentw.entity.TMxAttachment;


@MyBatisDao
public interface AttachmentDao extends CrudDao<Attachment> {

    int insertFile(Attachment attachment);

    Attachment queryPkVal(Attachment attachment);

    int updateFile(Attachment attachment);

    Attachment getSingle(String pkval);

    Attachment getReportPdf(String guId);

    Integer updateMx(TMxAttachment tMxAttachment);

    Integer updateMxDaily(TMxAttachment tMxAttachment);

    Attachment getReportPdfDaily(String guId);
}
