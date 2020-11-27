package com.thinkgem.jeesite.modules.dljyzx.web.ancillaryTrade.cureLine;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.cureLine.JsAsCurvePowerPriceInfo;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.cureLine.JsAsCurveTemplateInfo;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.cureLine.JsAsTimeDefinitionDetail;
import com.thinkgem.jeesite.modules.dljyzx.service.ancillaryTrade.cureLine.JsAsCureLineService;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 陶然
 * 2020/6/15
 */
@Controller
@RequestMapping("${adminPath}/dljyzx/cureLine/")
public class JsAsCureLineController {

    @Autowired
    private JsAsCureLineService jsAsCureLineService;

    /**
     * 获取界面list
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("list")
    public ModelAndView getList(HttpServletRequest request, HttpServletResponse response){

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("modules/dljyzx/ancillaryTrade/cureLine/cureLine");

        User user = UserUtils.getUser();
        if (user==null){
            modelAndView.addObject("result","error");
            modelAndView.addObject("msg","未获取用户");
            return modelAndView;
        }

        //获取所有曲线模板信息
        String participantId = user.getParticipantId();
        List<JsAsCurveTemplateInfo> listByPid = jsAsCureLineService.findListByPid(participantId);
        JSONArray array = JSONArray.parseArray(JSONArray.toJSONString(listByPid));
        modelAndView.addObject("curveInfos",array);

        //获取96时段信息
        //JS_AS_TIME_DEFINITION
        // id=1，48个时段
        // id=2，96个时段
        List<JsAsTimeDefinitionDetail> detailList = jsAsCureLineService.findTimeDefinitionDetailByTimeId("2");
        modelAndView.addObject("detailList",detailList);

        return modelAndView;
    }

    /**
     * 添加曲线
     * @param request
     * @return
     */
    @RequestMapping(value = "addCurve",method = RequestMethod.POST)
    @ResponseBody
    public JsAsCurveTemplateInfo addCurve(JsAsCurveTemplateInfo curveInfoObj,HttpServletRequest request){

        String curveDetil = request.getParameter("detailListStr");

        if (curveInfoObj==null || curveDetil == null){
            return new JsAsCurveTemplateInfo();
        }

        List<JsAsCurvePowerPriceInfo> curveDetils = JSONArray.parseArray(curveDetil, JsAsCurvePowerPriceInfo.class);
        JsAsCurveTemplateInfo js = jsAsCureLineService.insertCurveTemplateInfo(curveInfoObj, curveDetils);
        return js;
    }

    /**
     * 获取曲线所有时段详情
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "getInfoDetail",method = RequestMethod.POST)
    @ResponseBody
    public JsAsCurveTemplateInfo getInfoDetail(HttpServletRequest request,HttpServletResponse response){

        String curveId = request.getParameter("curveId");
        System.out.println("curveId:"+curveId);
        if (StringUtils.isEmpty(curveId)){
            JsAsCurveTemplateInfo js = new JsAsCurveTemplateInfo();
            return js;
        }

        JsAsCurveTemplateInfo js = jsAsCureLineService.getCurveByInfoId(curveId);

        return js;
    }

    /**
     * 保存曲线
     * @param jsAsCurveTemplateInfo
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "save",method = RequestMethod.POST)
    @ResponseBody
    public JsAsCurveTemplateInfo updateCurve(JsAsCurveTemplateInfo jsAsCurveTemplateInfo,HttpServletRequest request,HttpServletResponse response){

        String detailListStr = request.getParameter("detailListStr");

        if (jsAsCurveTemplateInfo==null || detailListStr==null){
            return  new JsAsCurveTemplateInfo();
        }

        List<JsAsCurvePowerPriceInfo> JsAsCurvePowerPriceInfos = JSONArray.parseArray(detailListStr, JsAsCurvePowerPriceInfo.class);

        JsAsCurveTemplateInfo js = jsAsCureLineService.updateCurve(jsAsCurveTemplateInfo,JsAsCurvePowerPriceInfos);

        return js;
    }

    /**
     * 删除曲线
     * @param jsAsCurveTemplateInfo
     * @return
     */
    @RequestMapping(value = "del",method = RequestMethod.POST)
    @ResponseBody
    public JsAsCurveTemplateInfo delCurve(JsAsCurveTemplateInfo jsAsCurveTemplateInfo){

        String id = jsAsCurveTemplateInfo.getId();

        if (StringUtils.isEmpty(id)){
            return new JsAsCurveTemplateInfo();
        }

        JsAsCurveTemplateInfo js = jsAsCureLineService.delCurve(id);

        return js;
    }


}
