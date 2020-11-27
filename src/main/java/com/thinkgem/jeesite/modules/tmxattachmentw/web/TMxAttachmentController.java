/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.tmxattachmentw.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.thinkgem.jeesite.common.config.Global;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.modules.tmxattachmentw.entity.TMxAttachment;
import com.thinkgem.jeesite.modules.tmxattachmentw.service.TMxAttachmentService;

/**
 * 附件表Controller
 * @author zzw
 * @version 2017-08-07
 */
@Controller
@RequestMapping(value = "${adminPath}/tmxattachmentw/tMxAttachment")
public class TMxAttachmentController extends BaseController {

	@Autowired
	private TMxAttachmentService tMxAttachmentService;
	
	@ModelAttribute
	public TMxAttachment get(@RequestParam(required=false) String id) {
		TMxAttachment entity = null;
		if (StringUtils.isNotBlank(id)){
			TMxAttachment tMxAttachment=new TMxAttachment();
			tMxAttachment.setPkVal(id);
			entity= tMxAttachmentService.getSingle(tMxAttachment); 
		}
		if (entity == null){
			entity = new TMxAttachment();
		}
		return entity;
	}
	
	@RequiresPermissions("tmxattachmentw:tMxAttachment:view")
	@RequestMapping(value = {"list", ""})
	public String list(TMxAttachment tMxAttachment, HttpServletRequest request, HttpServletResponse response, Model model) {
		Page<TMxAttachment> page = tMxAttachmentService.findPage(new Page<TMxAttachment>(request, response), tMxAttachment); 
		model.addAttribute("page", page);
		return "modules/tmxattachmentw/tMxAttachmentList";
	}

	@RequiresPermissions("tmxattachmentw:tMxAttachment:view")
	@RequestMapping(value = "form")
	public String form(TMxAttachment tMxAttachment, Model model) {
		model.addAttribute("tMxAttachment", tMxAttachment);
		return "modules/tmxattachmentw/tMxAttachmentForm";
	}

	@RequiresPermissions("tmxattachmentw:tMxAttachment:edit")
	@RequestMapping(value = "save")
	public String save(TMxAttachment tMxAttachment, Model model, RedirectAttributes redirectAttributes) {
		if (!beanValidator(model, tMxAttachment)){
			return form(tMxAttachment, model);
		}
		tMxAttachmentService.save(tMxAttachment);
		addMessage(redirectAttributes, "保存附件表成功");
		return "redirect:"+Global.getAdminPath()+"/tmxattachmentw/tMxAttachment/?repage";
	}
	
	@RequiresPermissions("tmxattachmentw:tMxAttachment:edit")
	@RequestMapping(value = "delete")
	public String delete(TMxAttachment tMxAttachment, RedirectAttributes redirectAttributes) {
		tMxAttachmentService.delete(tMxAttachment);
		addMessage(redirectAttributes, "删除附件表成功");
		return "redirect:"+Global.getAdminPath()+"/tmxattachmentw/tMxAttachment/?repage";
	}

}