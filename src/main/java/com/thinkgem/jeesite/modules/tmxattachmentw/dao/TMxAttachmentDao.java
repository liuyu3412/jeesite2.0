/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.tmxattachmentw.dao;

import org.apache.ibatis.annotations.Param;

import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;
import com.thinkgem.jeesite.modules.tmxattachmentw.entity.TMxAttachment;

/**
 * 附件表DAO接口
 * @author zzw
 * @version 2017-08-07
 */
@MyBatisDao
public interface TMxAttachmentDao extends CrudDao<TMxAttachment> {
	
	TMxAttachment getSingle(TMxAttachment entity);
	
	TMxAttachment getAtt(@Param("attachmentId")String attachmentId);

	TMxAttachment getContract(@Param("tablePk")String tablePk);

    TMxAttachment downloadAfterPublicity(@Param("attachmentId")String attachmentId);


	void deleteByAttachmentId(String attachmentId);

	int updataTmx(TMxAttachment tMxAttachment);
}