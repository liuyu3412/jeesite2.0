package com.thinkgem.jeesite.modules.dljyzx.web.ancillaryTrade.clear;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.clear.ClearInquiry;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.clear.ClearResult;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.clear.DeclarationCurve;
import com.thinkgem.jeesite.modules.dljyzx.service.ancillaryTrade.clear.ClearInquiryService;
import com.thinkgem.jeesite.modules.dljyzx.service.ancillaryTrade.clear.DeclarationCurveService;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "${adminPath}/dljyzx/clear")
public class ClearInquiryController {


  @Autowired
  private ClearInquiryService clearInquiryService;
    @Autowired
    private DeclarationCurveService declarationCurveService;

    @RequestMapping("/list")
    public ModelAndView toClearingInquiry(/*ClearInquiry clearInquiry, */HttpServletRequest request, HttpServletResponse response) throws ParseException {
        String   participantId = UserUtils.getUser().getParticipantId();
        String callTime = request.getParameter("callTime");

        ClearResult cr = new ClearResult();
        if(StringUtils.isEmpty(callTime)){
            Date date=new Date();
            SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
            String format = sdf.format(date);
            cr.setDataTime(format);
            //clearInquiry.setCallTime(format);
        };
        
        String consNo = request.getParameter("consumerNumber");
        cr.setConsNo(consNo);
        //clearInquiry.setParticipantId(participantId);


        ModelAndView modelAndView =new ModelAndView();
        modelAndView.setViewName("modules/dljyzx/ancillaryTrade/clear/clearingInquiry");
        Page<ClearResult> page = new Page<ClearResult>(request,response,5);
        Page<ClearResult> page1 = clearInquiryService.findPage(page, cr);
        List<ClearResult> list = page1.getList();
        System.out.println("-------------------------------------");
        System.out.println(list.size());
        /*for (ClearResult c :list){
//            System.out.println(c);
            Map<String, Object> time = clearInquiryService.getTimeSeqId(c.getTradeSeqId());
            String timeseqId = String.valueOf(time.get("timeseqId"));
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日");
            String calltime = sdf.format(new SimpleDateFormat("yyyy-MM-dd").parse(c.getCallTime()));
            System.out.println("calltime:"+calltime);
            c.setCallTimeZ(calltime+timeseqId);
        }
        BigDecimal decimal=new BigDecimal(0);
        for (int i =0;i<list.size();i++){
            BigDecimal bidPower = page1.getList().get(i).getBidPower();
            System.out.println("bidPower:"+bidPower);
            decimal = decimal.add(bidPower);
        }*/
        //modelAndView.addObject("decimal",decimal);
        modelAndView.addObject("clearResult", list);
        modelAndView.addObject("page",page1);
        modelAndView.addObject("callTime",cr.getDataTime());
        modelAndView.addObject("consumerNumber",request.getParameter("consumerNumber"));
        modelAndView.addObject("clearStatus",request.getParameter("clearStatus"));
        System.out.println(request.getParameter("clearStatus"));
        return modelAndView;
    }

    @RequestMapping("/queryClear")
    public ModelAndView queryClear(String clearResult, ModelAndView model) throws JsonProcessingException {
    	
    	model.setViewName("modules/dljyzx/ancillaryTrade/clear/clearResultChart");
    	
    	ObjectMapper mapper = new ObjectMapper();
    	model.addObject("clearResult", mapper.writeValueAsString(clearResult));
    	return model;
    }

    @RequestMapping("/queryTime")
    public  ModelAndView queryTimePeriod(ClearInquiry clearInquiry ,HttpServletRequest request,HttpServletResponse response) throws ParseException {
        ModelAndView modelAndView =new ModelAndView();
        modelAndView.setViewName("modules/dljyzx/ancillaryTrade/clear/clearingTimeInquiry");
        DeclarationCurve declarationCurve=new DeclarationCurve();
        SimpleDateFormat sdf =new SimpleDateFormat("yyyy-MM-dd");
        String callTime =clearInquiry.getCallTime();
        String clearStatus = clearInquiry.getClearStatus();
        System.out.println("clearStatus:"+clearStatus);
        String tradeSeqId = clearInquiry.getTradeSeqId();
        /**获取时段传入细节页面*/
        Map<String, Object> time = clearInquiryService.getTimeSeqId(tradeSeqId);
        String interval =clearInquiryService.getInterval(tradeSeqId);
        String timeseqId = String.valueOf(time.get("timeseqId"));
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy年MM月dd日");
        String calltime = sdf1.format(new SimpleDateFormat("yyyy-MM-dd").parse(callTime));
        System.out.println("calltime:"+calltime);
//        clearInquiry.setCallTimeZ(calltime+timeseqId);
        String callTimez=calltime+timeseqId;

        //
        declarationCurve.setBidDate(callTime);
        declarationCurve.setConsumerNumber(clearInquiry.getConsumerNumber());
        String consumerNumber =clearInquiry.getConsumerNumber();
        List<Map<String, Object>> list = declarationCurveService.getPoint(declarationCurve);
        List<String> arrayList =new ArrayList<String>();
        for(int i =0;i<list.size();i++){
            Map<String, Object> map = list.get(i);
            int size = map.size();
            for (int  j=0;j<size;j++){
                if(null!= list.get(i).get("POINT" + j)){
                    String str = list.get(i).get("POINT" + j).toString();
                    arrayList.add(str);
                }
            }
        }
        System.out.println("arrayList:"+arrayList);
        List<DeclarationCurve> timePoint = declarationCurveService.getTimePoint();
        List<Map<String, Object>> timeSeg = declarationCurveService.getFiveTimePoint();

        System.out.println("arrayList.size()："+arrayList.size());
        System.out.println("timePoint.size()："+timePoint.size());
        for(int i =0;i<timePoint.size();i++){
            timePoint.get(i).setePower(arrayList.get(i));
        }
        modelAndView.addObject("interval",interval);
        modelAndView.addObject("clearStatus",clearStatus);
        modelAndView.addObject("callTimez",callTimez);
        modelAndView.addObject("callTimez",callTimez);
        modelAndView.addObject("callTime",callTime);
        modelAndView.addObject("consumerNumber",consumerNumber);
        modelAndView.addObject("arrayList",arrayList);
        modelAndView.addObject("timeSeg",timeSeg);
        modelAndView.addObject("timePoint",timePoint);
        return  modelAndView;
    }

    @RequestMapping("/getecharts")
    @ResponseBody
    public  ModelMap getecharts(ClearInquiry clearInquiry ,HttpServletRequest request,HttpServletResponse response){
        ModelMap modelMap =new ModelMap();
        DeclarationCurve declarationCurve=new DeclarationCurve();
//        declarationCurve.setTradeSeqId(clearInquiry.getTradeSeqId());
        String bidDate =request.getParameter("callTime");
        String callTimez=request.getParameter("callTimez");
        String clearStatus=request.getParameter("clearStatus");
        System.out.println("clearStatus:"+clearStatus);
        System.out.println("getecharts:callTimez:"+callTimez);
        declarationCurve.setBidDate(bidDate);
        declarationCurve.setConsumerNumber(clearInquiry.getConsumerNumber());
        List<Map<String, Object>> list = declarationCurveService.getPoint(declarationCurve);
        List<String> arrayList =new ArrayList<String>();
        List<String> arrayListCall =new ArrayList<String>();
        for (Map<String, Object> l:list )
        {
            System.out.println("L:"+l);
        }
        for(int i =0;i<list.size();i++){
            Map<String, Object> map = list.get(i);
            int size = map.size();
            for (int  j=0;j<size;j++){
               if(null!= list.get(i).get("POINT" + j)){
                   String str = list.get(i).get("POINT" + j).toString();
                   arrayList.add(str);
               }
            }
            if(callTimez.endsWith("0-8时") && "已中标".equals(clearStatus)){
                for(int j=1 ;j<=32 ;j++ ){
                    if(null!= list.get(i).get("POINT" + j)){
                        String str = list.get(i).get("POINT" + j).toString();
                        arrayListCall.add(str);
                    }
                }for(int j=33 ;j<=96 ;j++ ){
                        arrayListCall.add(null);
                }
            }
            if(callTimez.endsWith("8-12时") && "已中标".equals(clearStatus)){
                for(int j=1 ;j<=32 ;j++ ){
                    arrayListCall.add(null);
                }
                for(int j=33 ;j<=48 ;j++ ){
                    if(null!= list.get(i).get("POINT" + j)){
                        String str = list.get(i).get("POINT" + j).toString();
                        arrayListCall.add(str);
                    }
                }
                for(int j=49 ;j<=96 ;j++ ){
                    arrayListCall.add(null);
                }
            }
            if(callTimez.endsWith("12-17时") && "已中标".equals(clearStatus)){
                for(int j=1 ;j<=48 ;j++ ){
                    arrayListCall.add(null);
                }
                for(int j=49 ;j<=68 ;j++ ){
                    if(null!= list.get(i).get("POINT" + j)){
                        String str = list.get(i).get("POINT" + j).toString();
                        arrayListCall.add(str);
                    }
                }
                for(int j=69 ;j<=96 ;j++ ){
                    arrayListCall.add(null);
                }
            }
            if(callTimez.endsWith("17-21时") && "已中标".equals(clearStatus)){
                for(int j=1 ;j<=68 ;j++ ){
                    arrayListCall.add(null);
                }
                for(int j=69 ;j<=84 ;j++ ){
                    if(null!= list.get(i).get("POINT" + j)){
                        String str = list.get(i).get("POINT" + j).toString();
                        arrayListCall.add(str);
                    }
                }
                for(int j=85 ;j<=96 ;j++ ){
                    arrayListCall.add(null);
                }
            }
            if(callTimez.endsWith("21-24时") && "已中标".equals(clearStatus)){
                for(int j=1 ;j<=84 ;j++ ){
                    arrayListCall.add(null);
                }
                for(int j=85 ;j<=96 ;j++ ){
                    if(null!= list.get(i).get("POINT" + j)){
                        String str = list.get(i).get("POINT" + j).toString();
                        arrayListCall.add(str);
                    }
                }
            }
        }

        System.out.println("arrayList:"+arrayList);
        List<DeclarationCurve> timePoint = declarationCurveService.getTimePoint();
        System.out.println("arrayListCall:"+arrayListCall.size());
        for (String call:arrayListCall
             ) {
            System.out.println("call:"+call);
        }
        modelMap.put("arrayList",arrayList);
        modelMap.put("arrayListCall",arrayListCall);
        modelMap.put("timePoint",timePoint);
        return  modelMap;
    }

}
