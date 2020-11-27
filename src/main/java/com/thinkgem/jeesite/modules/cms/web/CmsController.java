/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.cms.web;

import com.thinkgem.jeesite.modules.cms.entity.DianUser;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.cms.service.CategoryService;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;

/**
 * 内容管理Controller
 *
 * @author ThinkGem
 * @version 2013-4-21
 */
@Controller
@RequestMapping(value = "${adminPath}/cms")
public class CmsController extends BaseController {

    @Autowired
    private CategoryService categoryService;

    @RequiresPermissions("cms:view")
    @RequestMapping(value = "")
    public String index() {
        return "modules/cms/cmsIndex";
    }

    @RequiresPermissions("cms:view")
    @RequestMapping(value = "tree")
    public String tree(Model model) {
        model.addAttribute("categoryList", categoryService.findByUser(true, null));
        return "modules/cms/cmsTree";
    }

    @RequiresPermissions("cms:view")
    @RequestMapping(value = "none")
    public String none() {
        return "modules/cms/cmsNone";
    }

}
