package com.thinkgem.jeesite.modules.dljyzx.web.ancillaryTrade.settlement;

import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.common.web.BaseController;

import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt.Attachment;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt.JsAsSeResultMonth;

import com.thinkgem.jeesite.modules.dljyzx.service.ancillaryTrade.settlement.AttachmentService;
import com.thinkgem.jeesite.modules.dljyzx.service.ancillaryTrade.settlement.JsAsSeResultMonthService;

import com.thinkgem.jeesite.modules.sys.utils.UserUtils;
import com.thinkgem.jeesite.modules.tmxattachmentw.entity.TMxAttachment;
import com.thinkgem.jeesite.modules.tmxattachmentw.service.TMxAttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.UUID;


/**
 * 月结算单
 */
@Controller
@RequestMapping("${adminPath}/dljyzx/resultmonth")
public class JaAsSeResultMonthController  extends BaseController {


    @Autowired
    private JsAsSeResultMonthService jsAsSeResultMonthService;

    @Autowired
    private AttachmentService attachmentService;
    @Autowired
    private TMxAttachmentService tMxAttachmentService;


    @RequestMapping("/list")
    public ModelAndView  getMonthResult(JsAsSeResultMonth jsAsSeResultMonth, HttpServletRequest request, HttpServletResponse response){
        ModelAndView modelAndView =new ModelAndView();
        String   participantId = UserUtils.getUser().getParticipantId();
        jsAsSeResultMonth.setParticipantId(participantId);
        Page<JsAsSeResultMonth> page = new Page<JsAsSeResultMonth>(request,response,5);
        Page<JsAsSeResultMonth> page1 = jsAsSeResultMonthService.findPage(page, jsAsSeResultMonth);
        List<JsAsSeResultMonth> list = page1.getList();



        modelAndView.setViewName("modules/dljyzx/ancillaryTrade/settlement/JsAsSeResultMonth");
        modelAndView.addObject("page",page1);
        return  modelAndView;
    }


    @RequestMapping("/download")
    public void insertDataToBlob(JsAsSeResultMonth jsAsSeResultMonth ,

                                    Attachment attachment,
                                     HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        String   participantId = UserUtils.getUser().getParticipantId();
        jsAsSeResultMonth.setParticipantId(participantId);
        JsAsSeResultMonth guidMonth = jsAsSeResultMonthService.getGUID(jsAsSeResultMonth);
        Attachment   single = attachmentService.getSingle(guidMonth.getGuId());
        try {
            response.setContentType("application/x-msdownload");
            response.setHeader("content-disposition",
                    "attachment;filename=" + URLEncoder.encode(single.getAttName(), "UTF-8"));
            response.getOutputStream().write(single.getAttFile());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @RequestMapping("/reportpdfdown")
    public void reportpdfdown(JsAsSeResultMonth jsAsSeResultMonth ,
                              Attachment attachment,
                              HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        String   participantId = UserUtils.getUser().getParticipantId();
        jsAsSeResultMonth.setParticipantId(participantId);
//        JsAsSeResultMonth guidMonth = jsAsSeResultMonthService.getGUID(jsAsSeResultMonth);
        Attachment   single = attachmentService.getReportPdf(jsAsSeResultMonth.getGuId());
        System.out.println(single.toString());
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
    public void reportpdfview(JsAsSeResultMonth jsAsSeResultMonth ,
                              Attachment attachment,
                              HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        String   participantId = UserUtils.getUser().getParticipantId();
        jsAsSeResultMonth.setParticipantId(participantId);
//        JsAsSeResultMonth guidMonth = jsAsSeResultMonthService.getGUID(jsAsSeResultMonth);
        Attachment   single = attachmentService.getReportPdf(jsAsSeResultMonth.getGuId());
        try {
//            response.setContentType("application/x-msdownload");
            response.setContentType("application/pdf");
//            response.setHeader("content-disposition",dh
//                    "attachment;filename=" + URLEncoder.encode(single.getAttName(), "UTF-8"));
            response.getOutputStream().write(single.getAttFile());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static final byte[] input2byte(InputStream inStream) throws IOException {
        ByteArrayOutputStream swapStream = new ByteArrayOutputStream();
        byte[] buff = new byte[100];
        int rc = 0;
        while ((rc = inStream.read(buff, 0, 100)) > 0) {
            swapStream.write(buff, 0, rc);
        }
        byte[] in2b = swapStream.toByteArray();
        return in2b;
    }

    @RequestMapping("/confirm")
    @ResponseBody
    public  ModelMap  confirmInfo(HttpServletRequest request,HttpServletResponse response,JsAsSeResultMonth resultMonth){
        System.out.println(resultMonth.getGuId());
        ModelMap modelMap =new ModelMap();
        resultMonth.setConfirmStatus("1");
        String   participantId = UserUtils.getUser().getParticipantId();
        resultMonth.setParticipantId(participantId);
        resultMonth.setFeedBack("");
        try {
            Integer integer = jsAsSeResultMonthService.confirm(resultMonth);
            if (integer > 0) {
                modelMap.put("msg", "确认成功");
            }
        }catch (Exception e){
            modelMap.put("msg","确认失败");
        }
        return modelMap;
    }

    @RequestMapping("/getConfirmInfo")
    public ModelAndView  getConfirmInfo(JsAsSeResultMonth jsAsSeResultMonth,HttpServletRequest request,HttpServletResponse  response){
        ModelAndView modelAndView =new ModelAndView();
        String   participantId = UserUtils.getUser().getParticipantId();
        jsAsSeResultMonth.setParticipantId(participantId);
        JsAsSeResultMonth infoByguId = jsAsSeResultMonthService.getInfoByguId(jsAsSeResultMonth);

        Map<String,Object> number= jsAsSeResultMonthService.getNumber(jsAsSeResultMonth.getGuId());
        modelAndView.addObject("number",number.get("count"));
        modelAndView.addObject("infoByguId",infoByguId);
        modelAndView.setViewName("modules/dljyzx/ancillaryTrade/settlement/JsAsSeResultMonthConfirm");
        return  modelAndView;
    }


@RequestMapping("/saveStatus")
    public   ModelAndView  saveStatus(
        TMxAttachment tMxAttachment, MultipartFile file,
        JsAsSeResultMonth jsAsSeResultMonth, HttpServletRequest request, HttpServletResponse response){

        ModelAndView modelAndView =new ModelAndView();

        String attachmentId = UUID.randomUUID().toString().replaceAll("-", "");
        InputStream is = null;
        byte b[] = new byte[(int) file.getSize()];
        byte[] bytes = null;
        try {
            is = file.getInputStream();
            int read = is.read(b);
            is.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        String guid = IdGen.uuid();
        String filename = file.getOriginalFilename();
        tMxAttachment.setAttFile(b);
        tMxAttachment.setAttName(filename);
        tMxAttachment.setAttSize(file.getSize());
        tMxAttachment.setPkVal(guid);
        tMxAttachment.setTableName("JS_AS_SE_RESULT_MONTH");
        tMxAttachment.setAttachmentId(request.getParameter("guId"));

        try {
            is.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    Map<String,Object> number= jsAsSeResultMonthService.getNumber(jsAsSeResultMonth.getGuId());
    System.out.println("number:"+number.get("count"));
        if( number.get("count").toString().equals("1")){
            attachmentService.updateMx(tMxAttachment);
        }else{
            tMxAttachmentService.save(tMxAttachment);
        }
        jsAsSeResultMonth.setFeedBack(request.getParameter("feedBack"));
        String   participantId = UserUtils.getUser().getParticipantId();
        jsAsSeResultMonth.setParticipantId(participantId);
        jsAsSeResultMonth.setGuId(request.getParameter("guId"));
        jsAsSeResultMonth.setConfirmStatus(request.getParameter("status"));

        Integer integer = jsAsSeResultMonthService.updateStatus(jsAsSeResultMonth);
        modelAndView.addObject("msg","操作成功");
        JsAsSeResultMonth infoByguId = jsAsSeResultMonthService.getInfoByguId(jsAsSeResultMonth);
        modelAndView.addObject("infoByguId",infoByguId);

        modelAndView.setViewName("modules/dljyzx/ancillaryTrade/settlement/JsAsSeResultMonthConfirm");
        return modelAndView;
    }

}
