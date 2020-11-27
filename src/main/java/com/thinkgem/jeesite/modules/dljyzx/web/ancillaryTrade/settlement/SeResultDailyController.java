package com.thinkgem.jeesite.modules.dljyzx.web.ancillaryTrade.settlement;

import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryServicesPowerQuery.PowerQueryDao;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt.Attachment;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt.JsAsSeResultMonth;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt.SeResultDaily;
import com.thinkgem.jeesite.modules.dljyzx.service.ancillaryTrade.settlement.AttachmentService;
import com.thinkgem.jeesite.modules.dljyzx.service.ancillaryTrade.settlement.SeResultDailyService;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;
import com.thinkgem.jeesite.modules.tmxattachmentw.entity.TMxAttachment;
import com.thinkgem.jeesite.modules.tmxattachmentw.service.TMxAttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
@RequestMapping("${adminPath}/dljyzx/settlement")
public class SeResultDailyController   extends BaseController {

//
    @Autowired
    private SeResultDailyService seResultDailyService;
    @Autowired
    private TMxAttachmentService tMxAttachmentService;
    @Autowired
    private AttachmentService attachmentService;
    @Autowired
    private PowerQueryDao dao;


    @RequestMapping("/list")
    public ModelAndView testData(SeResultDaily seResultDaily, HttpServletRequest request , HttpServletResponse response){
        ModelAndView  modelAndView =new ModelAndView();
        String   participantId = UserUtils.getUser().getParticipantId();
        modelAndView.setViewName("modules/dljyzx/ancillaryTrade/settlement/seResultDaily");
//        String consumerNumber = request.getParameter("consumerNumber");

        String yearMonth = request.getParameter("yearMonth");

        if(StringUtils.isEmpty(yearMonth)){
            Date date=new Date();
            SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM");
            String format = sdf.format(date);
            seResultDaily.setYearMonth(format);
        };

        seResultDaily.setParticipantId(participantId);
        Page<SeResultDaily> page = new Page<SeResultDaily>(request,response,5);
        Page<SeResultDaily> page1 = seResultDailyService.findPage(page, seResultDaily);
        List<SeResultDaily> list = page1.getList();
        System.out.println("list:"+list.size());

        for (SeResultDaily se:list
             ) {
            System.out.println("se.getAdjustDate():"+se.getAdjustDate());
            String year =se.getAdjustDate().split("-")[0];
            String month =se.getAdjustDate().split("-")[1];
            String day =se.getAdjustDate().split("-")[2];
            se.setAdjustDateC(year+"年"+month+"月"+day+"日结算单");
        }
        modelAndView.addObject("yearMonth",yearMonth);
        modelAndView.addObject("page",page1);
        return modelAndView;
    }
    @RequestMapping("/toDetail")
    public ModelAndView getDetailInformation(HttpServletRequest request,HttpServletResponse response,SeResultDaily seResultDaily){
        ModelAndView modelAndView =new ModelAndView();
        String participantId = UserUtils.getUser().getParticipantId();
        String adjustDate = request.getParameter("adjustDate");
        String consumerNumber = request.getParameter("consumerNumber");
        String status = request.getParameter("status");
        if(!"null".equals(adjustDate)){
            seResultDaily.setAdjustDate(adjustDate);
        }
        System.out.println("adjustDate:"+seResultDaily.getAdjustDate());
        seResultDaily.setParticipantId(participantId);
        Page<SeResultDaily> page = new Page<SeResultDaily>(request,response,5);
        Page<SeResultDaily> page1 = seResultDailyService.havefindList(page, seResultDaily);


        List<SeResultDaily> list = page1.getList();
        for (SeResultDaily se :list){

//            String consno = se.getConsumerNumber();
//            String date = se.getAdjustDate();
//            BigDecimal totalPower=BigDecimal.ZERO;
//            BigDecimal realTimeAverageLoad=BigDecimal.ZERO;
//            List<Map<String, Object>> mapListOne = dao.querylastPower(consno, date);
//            String boforeday = beforeDay(date);
//            List<Map<String, Object>> mapListTwo = dao.querylastPower(consno, boforeday);
//
//            BigDecimal decimalAfter = (BigDecimal) mapListOne.get(0).get("POINT96");
//            BigDecimal decimalBefore = (BigDecimal) mapListTwo.get(0).get("POINT96");
//            if(mapListOne.size()==0||mapListTwo.size()==0){
//                se.setRealTimeAverageLoad("");
//            }else{
//                totalPower = decimalAfter.subtract(decimalBefore);
//                BigDecimal   dayAveragePower = totalPower.divide(new BigDecimal("24"), 8,
//                        BigDecimal.ROUND_HALF_UP);
//                realTimeAverageLoad=dayAveragePower;
//                String actualAvage = realTimeAverageLoad.toString();
//                se.setRealTimeAverageLoad(actualAvage);
//            }

            if(se.getRealReguPower().compareTo(new BigDecimal(0)) == -1){
                    se.setMoneyType("考核");
            }else{
                se.setMoneyType("补偿");
            }
            String accuRacy = se.getAccuRacy();
            BigDecimal bigDecimal=   BigDecimal.valueOf(Double.valueOf(accuRacy));
            bigDecimal =   bigDecimal.setScale(2,BigDecimal.ROUND_HALF_UP);
            String s = String.valueOf(bigDecimal);
            s=s+"%";
            se.setAccuRacy(s);
        }
        BigDecimal decimalAddMoney=new BigDecimal(0);
        BigDecimal decimalAssMoney=new BigDecimal(0);
        for (int i =0;i<list.size();i++){
            String addMoney = page1.getList().get(i).getAddMoney();
            decimalAddMoney = decimalAddMoney.add(BigDecimal.valueOf(Double.valueOf(addMoney)));
            String assMoney =page1.getList().get(i).getAssMoney();
            decimalAssMoney= decimalAssMoney.add(BigDecimal.valueOf(Double.valueOf(assMoney)));
        }
        modelAndView.addObject("decimalAssMoney",decimalAssMoney);
        modelAndView.addObject("decimalAddMoney",decimalAddMoney);
        modelAndView.addObject("page",page1);
        modelAndView.addObject("adjustDate",adjustDate);
//        modelAndView.addObject("tradeseqId",tradeseqId);
        modelAndView.addObject("consumerNumber",consumerNumber);
        modelAndView.addObject("status",status);
        modelAndView.setViewName("modules/dljyzx/ancillaryTrade/settlement/seResultDailyDetail");

        return modelAndView;
    }

    @RequestMapping("/report")
    public  ModelAndView reportdailystatus(HttpServletRequest request,HttpServletResponse response,SeResultDaily seResultDaily){
        ModelAndView modelAndView =new ModelAndView();
        String   participantId = UserUtils.getUser().getParticipantId();

        modelAndView.setViewName("modules/dljyzx/ancillaryTrade/settlement/seResultDailyConfirm");
        String  guIds = request.getParameter("guIds");
        String  tradeseqId = request.getParameter("tradeseqId");
        System.out.println("guIds:"+guIds);
        String[] split = guIds.split("-");
        System.out.println(split.length);
        String guId=  split[0];
        SeResultDaily singleInfo=new SeResultDaily();
        singleInfo.setTradeseqId(tradeseqId);
        String seqName = seResultDailyService.getSeqName(singleInfo);
        singleInfo.setSeqName(seqName);
        modelAndView.addObject("guIds",guIds);
        modelAndView.addObject("seqName",seqName);
        System.out.println("seqName:"+seqName);
        return modelAndView;
    }
    @RequestMapping("/confirm")
    @ResponseBody
    public ModelMap confirm(SeResultDaily seResultDaily,HttpServletRequest request,HttpServletResponse response){
        ModelMap modelMap =new ModelMap();
//        String tradeseqId =request.getParameter("tradeseqId");
        String adjustDate =request.getParameter("adjustDate");
        String status =request.getParameter("status");

        String   participantId = UserUtils.getUser().getParticipantId();
        seResultDaily.setStatus(status);
        seResultDaily.setAdjustDate(adjustDate);
        seResultDaily.setParticipantId(participantId);
        seResultDaily.setExplainText("");
        String  guIds = request.getParameter("guIds");
        System.out.println("guIds:"+guIds);
        int guIdNumber=0;
        int number=0;
        if("null".equals(guIds)||guIds==null){
            number = seResultDailyService.confirmStatus(seResultDaily);
        }else{

            String[] split = guIds.split("-");
            System.out.println(split.length);
            for (String guId :split){
                seResultDaily.setGuId(guId);
                seResultDailyService.confirmStatus(seResultDaily);
                guIdNumber++;
            }
        }

        if(number>0||(guIds!=null&&guIdNumber>0&&guIds.split("-").length==guIdNumber)){
            modelMap.put("msg","确认成功");
        }else{
            modelMap.put("msg","无记录再次确认");
        }
        return modelMap;
    }
    //recall
    @RequestMapping("/recall")
    @ResponseBody
    public ModelMap recall(HttpServletRequest request,HttpServletResponse response,SeResultDaily seResultDaily){
        ModelMap modelMap =new ModelMap();
        String participantId = UserUtils.getUser().getParticipantId();
        String tradeseqId=request.getParameter("tradeseqId");
        String guId=request.getParameter("guId");
        System.out.println("guId:"+guId);
        System.out.println("tradeseqId:"+tradeseqId);
        seResultDaily.setGuId(guId);
        seResultDaily.setExplainText("");
        seResultDaily.setTradeseqId(tradeseqId);
        seResultDaily.setParticipantId(participantId);
        Integer integer = seResultDailyService.recallStatus(seResultDaily);
        System.out.println("integer:"+integer);
        if(integer ==1){
            modelMap.put("msg", "撤回成功");
        }else{
            modelMap.put("msg", "撤回失败");
        }
        return modelMap;
    }


    @RequestMapping("/save")
    public   ModelAndView  submitConfirmResult(
            TMxAttachment tMxAttachment, MultipartFile file,
            SeResultDaily seResultDaily, HttpServletRequest request, HttpServletResponse response ) throws  Exception{
        ModelAndView modelAndView =new ModelAndView();
        String guIds = request.getParameter("guIds");
        String[] guIdArray = guIds.split("-");
        for(String guId:guIdArray){
            System.out.println("guId:"+guId);
        }
        String attachmentId = UUID.randomUUID().toString().replaceAll("-", "");
        InputStream is = null;
        byte b[] = new byte[(int) file.getSize()];
        try {
            System.out.println("123456");

            is = file.getInputStream();
            int read = is.read(b);
            is.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        String filename = file.getOriginalFilename();
        tMxAttachment.setAttFile(b);
        tMxAttachment.setAttName(filename);
        tMxAttachment.setAttSize(file.getSize());

        tMxAttachment.setTableName("JS_AS_SE_RESULT");
        int updateNumber =0;
        int saveNumber =0;
        for(String guId:guIdArray){
            String uuid = IdGen.uuid();
            tMxAttachment.setAttachmentId(uuid);
            tMxAttachment.setPkVal(guId);
            Map<String,Object> number= seResultDailyService.getNumber(guId);
            System.out.println("number:"+number.get("count"));
            if( number.get("count").toString().equals("1")){
                System.out.println("updateMxDaily");
                attachmentService.updateMxDaily(tMxAttachment);
                updateNumber++;
            }else{
                saveNumber++;
                System.out.println("save");
                tMxAttachmentService.save(tMxAttachment);
            }
        }
        String explainText = request.getParameter("explainText");
        seResultDaily.setExplainText(explainText);
        String status=request.getParameter("status");
        seResultDaily.setStatus(status);
        int updateStatusNumber=0;
        for(String guId:guIdArray){
            seResultDaily.setGuId(guId);
            int integer = seResultDailyService.updateStatus(seResultDaily);
            updateStatusNumber=updateStatusNumber+integer;
        }

        if(saveNumber+updateNumber==guIdArray.length &&updateStatusNumber==guIdArray.length){
            modelAndView.addObject("msg","操作成功");
        }else{
            modelAndView.addObject("msg","操作失败");
        }
        try {
            is.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        modelAndView.addObject("explainText", explainText);
        modelAndView.setViewName("modules/dljyzx/ancillaryTrade/settlement/seResultDailyConfirm");
        return    modelAndView;
    }

    @RequestMapping("/getArr")
    public void getArr() throws IOException {
        System.out.println("/getArr");
        String url = "http://localhost:8075/WebReport/ReportServer?reportlet=WorkBook3.cpt&participantId=100003000003871&yearMonth=2020-06&DOWNLOAD_TYPE=pdf";
        URL urlConet =new URL(url);
        System.out.println("urlConet");
        HttpURLConnection con =(HttpURLConnection)urlConet.openConnection();
        System.out.println("con");
        con.setRequestMethod("GET");
        System.out.println("GET");
        con.setConnectTimeout(5*1000);
        InputStream inputStream=con.getInputStream();
        ByteArrayOutputStream  outStream =new ByteArrayOutputStream();
        byte [] buffer =new byte[2048];
        int  len =0;
        while((len=inputStream.read(buffer))!=-1){
            outStream.write(buffer,0,len);
        }
        inputStream.close();
        byte [] array =outStream.toByteArray();
        System.out.println("array.length:"+array.length);
        OutputStream out =new FileOutputStream("C:\\Users\\hp\\Desktop\\生成.pdf");
        System.out.println("OutputStream");
        InputStream is =new ByteArrayInputStream(array);
        byte [] buff =new byte[1024];
        int  length =0;
        while((length=is.read(buff))!=-1){
            out.write(buffer,0,length);
        }
        System.out.println("循环结束");
        is.close();
        out.flush();
        out.close();
    }

    @RequestMapping("/reportpdfdown")
    public void reportpdfdown(SeResultDaily seResultDaily ,
                              Attachment attachment,
                              HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        String   participantId = UserUtils.getUser().getParticipantId();
        seResultDaily.setParticipantId(participantId);
        System.out.println("seResultDaily.getGuId():"+seResultDaily.getGuId());
//        JsAsSeResultMonth guidMonth = jsAsSeResultMonthService.getGUID(jsAsSeResultMonth);
        Attachment   single = attachmentService.getReportPdfDaily(seResultDaily.getGuId());
        try {
            response.setContentType("application/x-msdownload");
            response.setHeader("content-disposition",
                    "attachment;filename=" + URLEncoder.encode(single.getAttName(), "UTF-8"));
            response.getOutputStream().write(single.getAttFile());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @RequestMapping("/reportpdfview")
    public void reportpdfview(SeResultDaily seResultDaily ,
                              Attachment attachment,
                              HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        String   participantId = UserUtils.getUser().getParticipantId();
        seResultDaily.setParticipantId(participantId);
//        JsAsSeResultMonth guidMonth = jsAsSeResultMonthService.getGUID(jsAsSeResultMonth);
        Attachment   single = attachmentService.getReportPdfDaily(seResultDaily.getGuId());
        try {
//            response.setContentType("application/x-msdownload");
            response.setContentType("application/pdf");
//            response.setHeader("content-disposition",
//                    "attachment;filename=" + URLEncoder.encode(single.getAttName(), "UTF-8"));
            response.getOutputStream().write(single.getAttFile());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @RequestMapping("/look")
    public  ModelAndView  look (SeResultDaily seResultDaily, HttpServletRequest request, HttpServletResponse response ){
        String adjustDate = request.getParameter("adjustDate");
        seResultDaily.setAdjustDate(adjustDate);
        String   participantId = UserUtils.getUser().getParticipantId();
        seResultDaily.setParticipantId(participantId);
        List<SeResultDaily> list = seResultDailyService.getTradeseqId(seResultDaily);
        for (SeResultDaily se :list
             ) {
            System.out.println(se.getOrderNumber()+"-"+se.getSeqName());
        }
        ModelAndView modelAndView=new ModelAndView();
        modelAndView.addObject("list", list);
        modelAndView.setViewName("modules/dljyzx/ancillaryTrade/settlement/seResultDailyLook");
        return modelAndView;
    }

    // 返回当前日期的前一天
    public String beforeDay(String str) {
        SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
        try {
            long dif = sd.parse(str).getTime() - 86400 * 1000;// 减一天
            Date date = new Date();
            date.setTime(dif);
            str = sd.format(date);
            System.out.println("减少一天之后：" + str);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return str;
    }


}
