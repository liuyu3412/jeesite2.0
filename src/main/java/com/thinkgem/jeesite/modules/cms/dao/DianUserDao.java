/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.cms.dao;

import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;
import com.thinkgem.jeesite.modules.cms.entity.DianUser;

import java.util.List;

/**
 * 单表生成DAO接口
 * @author ThinkGem
 * @version 2019-05-15
 */
@MyBatisDao
public interface DianUserDao extends CrudDao<DianUser> {
	List<DianUser> findAllList(DianUser dianUser);

	long getRepeat(String name);

	int upDelFlag(DianUser dianUser);
}