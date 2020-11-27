package com.thinkgem.jeesite.modules.dljyzx.web.ancillaryTrade;

import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.JsAsMarketapply;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.JsAsMarketapplyConsno;
import com.thinkgem.jeesite.modules.dljyzx.service.ancillaryTrade.JsAsMarketapplyService;
import com.thinkgem.jeesite.modules.dljyzx.utils.DateUtil;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;
import com.thinkgem.jeesite.modules.tmxattachmentw.entity.TMxAttachment;
import com.thinkgem.jeesite.modules.tmxattachmentw.service.TMxAttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.util.*;

/**
 * @author GuoYF
 * @version 2020/4/8
 */
@Controller
@RequestMapping(value = "${adminPath}/dljyzx/jsAsMarketapply")
public class JsAsMarketapplyController extends BaseController {

    @Autowired
    private JsAsMarketapplyService jsAsMarketapplyService;
    @Autowired
    private TMxAttachmentService tmxService;

//    登录用户ID
    public static String pidL="9AB3D4CB121AC2F13F0605507D19DD89";

    @RequestMapping(value = {"list", ""})
    public String list(JsAsMarketapply jsAsMarketapply,HttpServletRequest request, HttpServletResponse response, Model model) {
        User user = UserUtils.getUser();
//        jsAsMarketapply.setParticipantId(user.getParticipantId());
        jsAsMarketapply.setParticipantId(pidL);
        if(StringUtils.isEmpty(jsAsMarketapply.getYear())){
            jsAsMarketapply.setYear(String.valueOf(DateUtil.getDateTime()).substring(0,4));
        }
        Map<String,Object> userInfo=jsAsMarketapplyService.getUserInfo(pidL);
//        Map<String,Object> userInfo=jsAsMarketapplyService.getUserInfo(user.getParticipantId());
        //获取市场成员类型（0：大用户）
//        List<Map<String,Object>> consNos=new ArrayList<>();
        if("0".equals(String.valueOf(userInfo.get("PARTICIPANTTYPE")))){
//            consNos=jsAsMarketapplyService.getConsNos(user.getParticipantId());
            Page<JsAsMarketapply> page = jsAsMarketapplyService.findPage1(new Page<JsAsMarketapply>(request, response), jsAsMarketapply);
            List<JsAsMarketapply> jsAsMarketapplies=page.getList();
            for(JsAsMarketapply jsAsMarketapply1:jsAsMarketapplies){
                if (StringUtils.isEmpty(jsAsMarketapply1.getStatus())){
                    jsAsMarketapply1.setStatus("未申请");
                }
            }
            page.setList(jsAsMarketapplies);model.addAttribute("page", page);
            model.addAttribute("isLargeUser", true);
        }else{
//            consNos=jsAsMarketapplyService.getConsNosSeller(user.getParticipantId());
            Page<JsAsMarketapply> page = jsAsMarketapplyService.findPage(new Page<JsAsMarketapply>(request, response), jsAsMarketapply);
            List<JsAsMarketapply> jsAsMarketapplies=page.getList();
            for(JsAsMarketapply jsAsMarketapply1:jsAsMarketapplies){
                if (StringUtils.isEmpty(jsAsMarketapply1.getStatus())){
                    jsAsMarketapply1.setStatus("未申请");
                }
            }
            page.setList(jsAsMarketapplies);
            model.addAttribute("page", page);
            model.addAttribute("isLargeUser", false);

        }
//        Map<String,Object> a=new HashMap<>();
//        a.put("consNo","123123");
//        consNos.add(a);
//        model.addAttribute("consNos", consNos);
        model.addAttribute("jsAsMarketapply", jsAsMarketapply);
        return "modules/dljyzx/ancillaryTrade/jsAsMarketapply";
    }

    @RequestMapping(value = {"download", ""})
    public void download(HttpServletRequest request,HttpServletResponse response) {

        String attachmentId=request.getParameter("attachmentId");

        TMxAttachment att = tmxService.getAtt(attachmentId);
        byte[] attFile = att.getAttFile();
        try {
            if (attFile==null){
                response.setHeader("data","null");
                response.getOutputStream().write(new String("null").getBytes());
            }else{
                response.setContentType("application/x-msdownload");
                response.setHeader("content-disposition",
                        "attachment;filename=" + URLEncoder.encode(att.getAttName(), "UTF-8"));
                response.getOutputStream().write(att.getAttFile());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = {"toDetail", ""})
    public String toDetail(HttpServletRequest request, Model model) {
        User user = UserUtils.getUser();
        String guid=request.getParameter("guid");
        String userId=request.getParameter("userId");
        JsAsMarketapply jsAsMarketapply=new JsAsMarketapply();
        if(!StringUtils.isEmpty(guid)){
            jsAsMarketapply=jsAsMarketapplyService.findById(guid);
        }else{
            jsAsMarketapply.setUserId(userId);
            //查询授权联系人
            Map<String,String> authMan=jsAsMarketapplyService.getAuthMan(userId);
            if (authMan!=null){
                jsAsMarketapply.setComPerson(authMan.get("LINKMAN"));
                jsAsMarketapply.setTel(authMan.get("TELEPHONE"));
            }
            jsAsMarketapply.setYear(request.getParameter("year"));
        }
        //查询户号
        List<JsAsMarketapplyConsno> jsAsMarketapplyConsnos=jsAsMarketapplyService.getConsNoByUser(userId,jsAsMarketapply.getYear());
        model.addAttribute("jsAsMarketapply",jsAsMarketapply);
        model.addAttribute("jsAsMarketapplyConsnos",jsAsMarketapplyConsnos);
        //获取市场成员类型（0：大用户）
        Map<String,Object> userInfo=jsAsMarketapplyService.getUserInfo(pidL);
//        Map<String,Object> userInfo=jsAsMarketapplyService.getUserInfo(user.getParticipantId());
        if("0".equals(String.valueOf(userInfo.get("PARTICIPANTTYPE")))){
            model.addAttribute("isLargeUser", true);
        }else{
            model.addAttribute("isLargeUser", false);
        }
        String status=request.getParameter("status");
        if("00".equals(status)){
            model.addAttribute("msg", "保存成功");
        }else if ("01".equals(status)){
            model.addAttribute("msg", "提交成功");
        }
        return "modules/dljyzx/ancillaryTrade/addMarketapply";

    }

    @RequestMapping(value = {"save", ""})
    @ResponseBody
    public JSONObject save(JsAsMarketapply jsAsMarketapply, HttpServletRequest request) {
        User user = UserUtils.getUser();
        jsAsMarketapply.setParticipantId(pidL);
//        jsAsMarketapply.setParticipantId(user.getParticipantId());
        if("01".equals(jsAsMarketapply.getStatus())){
            jsAsMarketapply.setApplyDate(new Date());
        }
        Map<String,Object> userInfo=jsAsMarketapplyService.getUserInfo(pidL);
//        Map<String,Object> userInfo=jsAsMarketapplyService.getUserInfo(user.getParticipantId());
        if("6".equals(String.valueOf(userInfo.get("PARTICIPANTTYPE")))){
            jsAsMarketapply.setIsSeller("1");
        }else{
            jsAsMarketapply.setIsSeller("0");
        }
        return jsAsMarketapplyService.saveinfo(jsAsMarketapply);
    }

    @RequestMapping(value = {"submitApplys", ""})
    @ResponseBody
    public JSONObject submitApplys(HttpServletRequest request, HttpServletResponse response, Model model) {
        String guids=request.getParameter("guids");
        return jsAsMarketapplyService.submitApplys(guids);
    }

    @RequestMapping(value = "uploadFile")
    @ResponseBody
    public Map<String,Object> uploadFile(@RequestParam(value = "attfile") MultipartFile file, HttpServletRequest request, HttpServletResponse response) {
        String attachId = request.getParameter("attachId");
        String guid = request.getParameter("guid");
        Map<String,Object> result=jsAsMarketapplyService.uploadFile(file,attachId,guid);
        return result;
    }

    @ResponseBody
    @RequestMapping(value = "areaTreeData")
    public List<Map<String, Object>> selectAreaList(@RequestParam(required=false) String extId, HttpServletResponse response) {
        List<Map<String, Object>> mapList = jsAsMarketapplyService.areaTreeData();
        return mapList;
    }

}
