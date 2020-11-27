/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.cms.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.thinkgem.jeesite.common.utils.CookieUtils;
import org.activiti.engine.impl.util.json.Cookie;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.thinkgem.jeesite.common.config.Global;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.modules.cms.entity.DianUser;
import com.thinkgem.jeesite.modules.cms.service.DianUserService;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 单表生成Controller
 * @author ThinkGem
 * @version 2019-05-15
 */
@Controller
@RequestMapping(value = "${adminPath}/cms/dianUser")
public class DianUserController extends BaseController {

	@Autowired
	private DianUserService dianUserService;
	
	@ModelAttribute
	public DianUser get(@RequestParam(required=false) String id) {
		DianUser entity = null;
		if (StringUtils.isNotBlank(id)){
			entity = dianUserService.get(id);
		}
		if (entity == null){
			entity = new DianUser();
		}
		return entity;
	}
	
	@RequiresPermissions("cms:dianUser:view")
	@RequestMapping(value = {"list", ""})
	public String list(DianUser dianUser, HttpServletRequest request, HttpServletResponse response, Model model) {
		String str1 = request.getParameter("checkedIds");
		System.out.println(str1);
		String[] str = new String[]{};
		if (StringUtils.isNotBlank(str1)){
			str = str1.split(",");
		}
		List<String> checkeds = Arrays.asList(str);
		Page<DianUser> page = dianUserService.findPage(new Page<DianUser>(request, response), dianUser);
		List<DianUser> dianUsers = page.getList();
		for (DianUser dianUser1 : dianUsers){
			if (checkeds.contains(dianUser1.getId())){
				dianUser1.setChecked(1);
			}
		}
		page.setList(dianUsers);
		model.addAttribute("checkedIds", str1);
		model.addAttribute("page", page);
		return "modules/cms/dianUserList";
	}

	@RequiresPermissions("cms:dianUser:view")
	@RequestMapping(value = "form")
	public String form(DianUser dianUser, Model model) {
		model.addAttribute("dianUser", dianUser);
		return "modules/cms/dianUserForm";
	}

	@RequiresPermissions("cms:dianUser:edit")
	@RequestMapping(value = "save")
	public String save(DianUser dianUser, Model model, RedirectAttributes redirectAttributes) {
		if (!beanValidator(model, dianUser)){
			return form(dianUser, model);
		}
		dianUserService.save(dianUser);
		addMessage(redirectAttributes, "保存单表成功");
		return "redirect:"+Global.getAdminPath()+"/cms/dianUser/?repage";
	}
	
	@RequiresPermissions("cms:dianUser:edit")
	@RequestMapping(value = "delete")
	public String delete(DianUser dianUser, RedirectAttributes redirectAttributes) {
		dianUserService.delete(dianUser);
		addMessage(redirectAttributes, "删除单表成功");
		return "redirect:"+Global.getAdminPath()+"/cms/dianUser/?repage";
	}


	//导出excle
	@RequiresPermissions("cms:view")
	@RequestMapping(value = "downExcle")
	public void downExcle(DianUser dianUser, HttpServletResponse response) throws Exception {

		dianUserService.downExcle(dianUser, response);
	}


	//    文件导入
	//接收页面传来的文件
	//excle导入
	@RequiresPermissions("cms:view")
	@RequestMapping(value = "uploadExcle")
	@ResponseBody
	public Map uploadExcle(HttpServletRequest res,
						   @RequestParam(value = "file", required = false) MultipartFile[] files)
	{
		Map result = new HashMap();
		if (files == null || files.length == 0) {
			result.put("code",500);
			result.put("msg","文件不能空");
			return result;
		}
		return dianUserService.uploadExcle(files,res);
	}

}