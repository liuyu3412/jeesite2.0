package com.thinkgem.jeesite.modules.dljyzx.service.ancillaryTrade.settlement;

import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryTrade.settlement.AttachmentDao;

import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt.Attachment;

import com.thinkgem.jeesite.modules.tmxattachmentw.entity.TMxAttachment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AttachmentService  extends CrudService<AttachmentDao, Attachment> {

    @Autowired
         private    AttachmentDao attachmentDao;
  public   int insertFile(Attachment attachment){
        return attachmentDao.insertFile(attachment);
    }

  public   Attachment queryPkVal(Attachment attachment){
      return attachmentDao.queryPkVal(attachment);
  }

   public int  updateFile(Attachment attachment){
       return  attachmentDao.updateFile(attachment);
   }

   public Attachment getSingle(String pkval) {
        return attachmentDao.getSingle(pkval);
    }


    public Attachment getReportPdf(String guId) {
        return attachmentDao.getReportPdf(guId);
    }

    public Integer updateMx(TMxAttachment tMxAttachment) {
    return    attachmentDao.updateMx(tMxAttachment);
    }

    public Integer updateMxDaily(TMxAttachment tMxAttachment) {
        return    attachmentDao.updateMxDaily(tMxAttachment);
    }

    public Attachment getReportPdfDaily(String guId) {
        return attachmentDao.getReportPdfDaily(guId);
    }
}
