/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.tmxattachmentw.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.modules.tmxattachmentw.entity.TMxAttachment;
import com.thinkgem.jeesite.modules.tmxattachmentw.dao.TMxAttachmentDao;

/**
 * 附件表Service
 * @author zzw
 * @version 2017-08-07
 */
@Service
@Transactional
public class TMxAttachmentService extends CrudService<TMxAttachmentDao, TMxAttachment> {

	public TMxAttachment get(String id) {
		return super.get(id);
	}
	
	public TMxAttachment getSingle(TMxAttachment entity){
		return super.getDao().getSingle(entity);
	}
	
	public List<TMxAttachment> findList(TMxAttachment tMxAttachment) {
		return super.findList(tMxAttachment);
	}
	
	public Page<TMxAttachment> findPage(Page<TMxAttachment> page, TMxAttachment tMxAttachment) {
		return super.findPage(page, tMxAttachment);
	}
	
	@Transactional(readOnly = false)
	public void save(TMxAttachment tMxAttachment) {
		super.save(tMxAttachment);
	}
	
	@Transactional(readOnly = false)
	public void delete(TMxAttachment tMxAttachment) {
		super.delete(tMxAttachment);
	}
	
	@Transactional(readOnly = false)
	public int insert(TMxAttachment entity) {
		return super.getDao().insert(entity);
	}
	
	@Transactional(readOnly = false)
	public int updata(TMxAttachment entity) {
		return super.getDao().update(entity);
	}
	
	public TMxAttachment getAtt(String attachmentId){
		return dao.getAtt(attachmentId);
	}



	public TMxAttachment getContract(String guid){
		TMxAttachment tmxAttachment = dao.getContract(guid);
		return tmxAttachment;
	}

	public TMxAttachment downloadAfterPublicity(String attachmentId) {
		TMxAttachment tmxAttachment = dao.downloadAfterPublicity(attachmentId);
		return tmxAttachment;
	}

	public void deleteByAttachmentId(String attachmentId) {
		dao.deleteByAttachmentId(attachmentId);	}


	public int updataTmx(TMxAttachment tMxAttachment){
		return dao.updataTmx(tMxAttachment);
	}

}