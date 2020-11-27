package com.thinkgem.jeesite.modules.dljyzx.web.ancillaryServicesPowerQuery;

import com.alibaba.fastjson.JSONObject;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryServicesPowerQuery.PowerQueryDao;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryServicesPowerQuery.JsAsPowerQuery;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryServicesPowerQuery.PowerQueryUtil;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.JsAsMarketapply;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt.JsAsSeResultMonth;
import com.thinkgem.jeesite.modules.dljyzx.service.ancillaryServicesPowerQuery.JsAsPowerQueryService;
import com.thinkgem.jeesite.modules.dljyzx.service.ancillaryServicesPowerQuery.PowerQueryService;
import com.thinkgem.jeesite.modules.dljyzx.utils.DateUtil;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping(value = "${adminPath}/dljyzx/jsAsPowerQuery")
public class powerQueryController extends BaseController {

    @Autowired
    private PowerQueryService powerQueryService;
    @Autowired
    private JsAsPowerQueryService jsAsPowerQueryService;
    @Autowired
    private PowerQueryDao dao;

    @RequestMapping("/findDate")
    public String findDate(HttpServletRequest request, HttpServletResponse response, Model model){
        User user = UserUtils.getUser();
        String monthParam = request.getParameter("month");
        if(StringUtils.isEmpty(monthParam)){

            monthParam= String.valueOf(DateUtil.getDateTime()).substring(0,7);
        }
        model.addAttribute("month",monthParam);

        List<Map<String,Object>> days=powerQueryService.findSeqsByMonth(monthParam, user.getParticipantId());
        System.out.println("list:" + days);
        model.addAttribute("days", days);

        return "modules/dljyzx/ancillaryServicesPowerQuery/powerQuery";
    }

    @RequestMapping("/powerQueryByDate")
    @ResponseBody
    public JSONObject powereQuery(HttpServletRequest request, HttpServletResponse response,Model model) {
        User user = UserUtils.getUser();
        String participantId = user.getParticipantId();
        String date = request.getParameter("date"); //date:2020-07-04
        String conso = request.getParameter("conso");
            JSONObject jsonObject=new JSONObject();

        int  pageSize=5;
        Integer intPageValue=null;
        String pageNo = request.getParameter("pageNo");
        if("".equals(pageNo)||null ==pageNo || "null".equals(pageNo)){
          intPageValue=1;
        }else{
            intPageValue =Integer.valueOf(pageNo) ;
        }

        Integer   preIntPageValue= intPageValue - 1;
        Integer preNum = preIntPageValue * pageSize;
        Integer nowNum = intPageValue * pageSize;

        JsAsPowerQuery jsAsPowerQuery=new JsAsPowerQuery();
        jsAsPowerQuery.setConsno(conso);
        jsAsPowerQuery.setPreNum(pageSize);
        jsAsPowerQuery.setNowNum(nowNum);
        jsAsPowerQuery.setDate(date);
        jsAsPowerQuery.setParticipantId(participantId);
        List<JsAsPowerQuery> list = dao.queryData(jsAsPowerQuery);
        List<JsAsPowerQuery> queryList = dao.queryDataNumber(jsAsPowerQuery);

        for (JsAsPowerQuery js:list){
                String consno =js.getConsno();
                List<Map<String, Object>> maps = dao.queryActualElec(consno, date);
                List<BigDecimal> actualPower = new ArrayList<BigDecimal>();
                for (Map<String, Object> power : maps) {
                    for (int j = 1; j <= 96 ; j++) {
                        String str = "POINT" + j ;
                        if(power.get(str)!=null){
                            actualPower.add(((BigDecimal) power.get(str)));
                        }else{
                            actualPower.add(BigDecimal.ZERO);
                        }
                    }
                }
                BigDecimal totalPower=BigDecimal.ZERO;
                BigDecimal realTimeAverageLoad=BigDecimal.ZERO;
                List<Map<String, Object>> mapListOne = dao.querylastPower(consno, date);
                String boforeday = powerQueryService.beforeDay(date);
                List<Map<String, Object>> mapListTwo = dao.querylastPower(consno, boforeday);
                BigDecimal decimalAfter = (BigDecimal) mapListOne.get(0).get("POINT96");
                BigDecimal decimalBefore = (BigDecimal) mapListTwo.get(0).get("POINT96");
                totalPower = decimalAfter.subtract(decimalBefore);
                BigDecimal   dayAveragePower = totalPower.divide(new BigDecimal("24"), 8,
                        BigDecimal.ROUND_HALF_UP);
                realTimeAverageLoad=dayAveragePower;
                js.setDate(date);
                js.setParticipantId(participantId);
                js.setRealTimeAverageLoad(realTimeAverageLoad);
                js.setActualPower(actualPower);
            }
        PowerQueryUtil queryUtil=new PowerQueryUtil();
        queryUtil.setList(list);
        queryUtil.setPageSize(pageSize);
        queryUtil.setTotalNum(queryList.size());
        jsonObject.put("res", queryUtil);
        jsonObject.put("code", 200);
            return jsonObject;
    }

    @RequestMapping("/queryCurve")
    @ResponseBody
    public JSONObject queryCurve(HttpServletRequest request, HttpServletResponse response,Model model) {
        String consno = request.getParameter("consno"); //date:2020-07-04
        String adjustDate = request.getParameter("adjustDate"); //date:2020-07-04
        String realTimeAverageLoad = request.getParameter("realTimeAverageLoad"); //date:2020-07-04
        return powerQueryService.queryCurve(consno, adjustDate, realTimeAverageLoad);
    }

}
