package com.thinkgem.jeesite.modules.dljyzx.web.ancillaryTrade;

import com.alibaba.fastjson.JSONObject;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.utils.DateUtils;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.utils.excel.ImportExcel;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.*;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.cureLine.JsAsCurveTemplateInfo;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.cureLine.JsAsTimeDefinitionDetail;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt.PageResult;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt.UbSource;
import com.thinkgem.jeesite.modules.dljyzx.service.ancillaryTrade.JsAsTradeBidService;
import com.thinkgem.jeesite.modules.dljyzx.service.ancillaryTrade.cureLine.JsAsCureLineService;
import com.thinkgem.jeesite.modules.dljyzx.service.ancillaryTrade.settlement.UbSourceService;
import com.thinkgem.jeesite.modules.dljyzx.utils.DateUtil;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author GuoYF
 * @version 2020/6/22
 */
@Controller
@RequestMapping(value = "${adminPath}/dljyzx/jsAsTradeBid")
public class JsAsTradeBidController extends BaseController {

    @Autowired
    private JsAsTradeBidService jsAsTradeBidService;
    @Autowired
    private JsAsCureLineService jsAsCureLineService;
    @Autowired
    private UbSourceService ubSourceService;

    @RequestMapping(value = {"list", ""})
    public String list(JsAsTradeseq jsAsTradeseq, HttpServletRequest request, HttpServletResponse response, Model model) {
        User user = UserUtils.getUser();
        jsAsTradeseq.setPid(user.getParticipantId());
        String monthParam = jsAsTradeseq.getMonth();
        if(StringUtils.isEmpty(monthParam)){
            monthParam= getNextMonth();
            jsAsTradeseq.setMonth(monthParam);
        }
        //获取当月所有需求
        List<Map<String,Object>> days=jsAsTradeBidService.findSeqsByMonth(monthParam,user.getParticipantId());
        model.addAttribute("days", days);
        if(checkSeq(days)){
            String day=jsAsTradeseq.getDay();
            if(StringUtils.isEmpty(day)){
                day=getDay(days);
                jsAsTradeseq.setDay(day);
            }
            if(Integer.parseInt(day)<10){
                jsAsTradeseq.setDate(monthParam+"-0"+day);
            }else{
                jsAsTradeseq.setDate(monthParam+"-"+day);
            }
            Page<JsAsTradeseq> page = jsAsTradeBidService.findPage(new Page<JsAsTradeseq>(request, response), jsAsTradeseq);
            List<JsAsTradeseq> jsAsTradeseqs=page.getList();
            for(JsAsTradeseq jsAsTradeseq1:jsAsTradeseqs){
                if(StringUtils.isEmpty(jsAsTradeseq1.getBidStatus())){
                    jsAsTradeseq1.setBidStatus("未申报");
                }
            }
            page.setList(jsAsTradeseqs);
            model.addAttribute("page",page);
        }
        return "modules/dljyzx/ancillaryTrade/jsAsTradeBid";
    }

    protected boolean checkSeq(List<Map<String,Object>> days){
        for (Map<String,Object> day:days) {
            if(day.get("info")!=null){
                return true;
            }
        }
        return false;
    }

    protected String getDay(List<Map<String,Object>> days){
        for (Map<String,Object> day:days) {
            if(day.get("info")!=null){
                Integer i=(Integer) day.get("day");
                return ""+i;
            }
        }
        return "";
    }

    protected static String getNextMonth(){
        Calendar c = Calendar.getInstance();
        c.add(Calendar.MONTH, 1);
        SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM");
        String time = format.format(c.getTime());
        return time;
    }

    @RequestMapping(value = {"getSeqByDate", ""})
    @ResponseBody
    public JSONObject getSeqByDate(HttpServletRequest request, HttpServletResponse response, Model model) {
        User user = UserUtils.getUser();
        String date = request.getParameter("date");
        return jsAsTradeBidService.getSeqByDate(date,user.getParticipantId());
    }

    @RequestMapping(value = {"getPowersByConsNo", ""})
    @ResponseBody
    public JSONObject getPowersByConsNo(HttpServletRequest request, HttpServletResponse response, Model model) {
        User user = UserUtils.getUser();
        String date = request.getParameter("date");
        String consNo = request.getParameter("consNo");
        return jsAsTradeBidService.getPowersByConsNo(date,user.getParticipantId(),consNo);
    }

    //保存提交当日96曲线
    @RequestMapping(value = {"addDayPowers", ""})
    @ResponseBody
    public JSONObject addDayPowers(JsAsDayPower jsAsDayPower, HttpServletRequest request, HttpServletResponse response, Model model) {
        User user = UserUtils.getUser();
//        jsAsDayPower.setpId(user.getParticipantId());
        return jsAsTradeBidService.addDayPowers(jsAsDayPower);
    }

    //判断是否提交当日96曲线
    @RequestMapping(value = {"hasDayPowers", ""})
    @ResponseBody
    public JSONObject hasDayPowers(HttpServletRequest request) {
        String tradeSeqConsId = request.getParameter("tradeSeqConsId");
        return jsAsTradeBidService.hasDayPowers(tradeSeqConsId);

    }

    //跳转申报详情页
    @RequestMapping(value = {"toTradeDetail", ""})
    public String tradeDetail(HttpServletRequest request, Model model) {
        User user = UserUtils.getUser();
        String tradeSeqConsId = request.getParameter("tradeSeqConsId");
        //获取当日需求及已填报值
        Map<String,Object> baseInfo=jsAsTradeBidService.getAdjustDate(tradeSeqConsId);
        List<JsAsTradeBidCons> jsAsTradeBidConsList=jsAsTradeBidService.getTradeBidCons(baseInfo);
        baseInfo.put("status",jsAsTradeBidConsList.get(0).getStatus());
        model.addAttribute("jsAsTradeBidCons",baseInfo);
        model.addAttribute("jsAsTradeBidConsList",jsAsTradeBidConsList);

        //初始化96时段表格
        List<JsAsTimeDefinitionDetail> detailList = jsAsCureLineService.findTimeDefinitionDetailByTimeId("2");
        List<String> timeDetail=new ArrayList<String>();
        timeDetail.add("00:00");
        for(JsAsTimeDefinitionDetail timeDefinitionDetail:detailList){
            timeDetail.add(timeDefinitionDetail.getEndTime());
        }
        //时间段
        List<Map<String,Object>> timeSeg = jsAsTradeBidService.timeSeg();
        model.addAttribute("timeSeg",timeSeg);
        model.addAttribute("timeDetail",timeDetail);
        model.addAttribute("detailList",detailList);

        //所有曲线
        List<JsAsCurveTemplateInfo> lines=jsAsCureLineService.findListByPid(user.getParticipantId());
        model.addAttribute("lines",lines);
        return "modules/dljyzx/ancillaryTrade/addTradeBid";

    }

    //申报需求
    @RequestMapping(value = {"saveTradeBid", ""})
    @ResponseBody
    public PageResult saveTradeBid( HttpServletRequest request) {
        //return jsAsTradeBidService.saveTradeBid(jsAsTradeBid);
        try {
            UbSource ubSource = new UbSource();
            PageResult result=new PageResult();
            String powersStr = request.getParameter("powersStr");//96点
            String[] strs = powersStr.split(",");
            User user = UserUtils.getUser();
            String areaId = user.getParticipantId();//
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            String updateTime = format.format(new Date());
            String dataTime = format.format(new Date());
            int dataType = 10;
            String phyunitId = "";
            ubSource.setUpdateTime(updateTime);
            ubSource.setDataTime(dataTime);
            ubSource.setFlag(0);
            ubSource.setPhyunitId(phyunitId);
            ubSource.setDataType(dataType);
            ubSource.setAreaId(areaId);
            ubSource.setP1((strs[0]));
            ubSource.setP2((strs[1]));
            ubSource.setP3((strs[2]));
            ubSource.setP4((strs[3]));
            ubSource.setP5((strs[4]));
            ubSource.setP6((strs[5]));
            ubSource.setP7((strs[6]));
            ubSource.setP8((strs[7]));
            ubSource.setP9((strs[8]));
            ubSource.setP10((strs[9]));
            ubSource.setP11((strs[10]));
            ubSource.setP12((strs[11]));
            ubSource.setP13((strs[12]));
            ubSource.setP14((strs[13]));
            ubSource.setP15((strs[14]));
            ubSource.setP16((strs[15]));
            ubSource.setP17((strs[16]));
            ubSource.setP18((strs[17]));
            ubSource.setP19((strs[18]));
            ubSource.setP20((strs[19]));
            ubSource.setP21((strs[20]));
            ubSource.setP22((strs[21]));
            ubSource.setP23((strs[22]));
            ubSource.setP24((strs[23]));
            ubSource.setP25((strs[24]));
            ubSource.setP26((strs[25]));
            ubSource.setP27((strs[26]));
            ubSource.setP28((strs[27]));
            ubSource.setP29((strs[28]));
            ubSource.setP30((strs[29]));
            ubSource.setP31((strs[30]));
            ubSource.setP2((strs[31]));
            ubSource.setP33((strs[32]));
            ubSource.setP34((strs[33]));
            ubSource.setP35((strs[34]));
            ubSource.setP36((strs[35]));
            ubSource.setP37((strs[36]));
            ubSource.setP38((strs[37]));
            ubSource.setP39((strs[38]));
            ubSource.setP40((strs[39]));
            ubSource.setP41((strs[40]));
            ubSource.setP42((strs[41]));
            ubSource.setP43((strs[42]));
            ubSource.setP44((strs[43]));
            ubSource.setP45((strs[44]));
            ubSource.setP46((strs[45]));
            ubSource.setP47((strs[46]));
            ubSource.setP48((strs[47]));
            ubSource.setP49((strs[48]));
            ubSource.setP50((strs[49]));
            ubSource.setP51((strs[50]));
            ubSource.setP52((strs[51]));
            ubSource.setP53((strs[52]));
            ubSource.setP54((strs[53]));
            ubSource.setP55((strs[54]));
            ubSource.setP56((strs[55]));
            ubSource.setP57((strs[56]));
            ubSource.setP58((strs[57]));
            ubSource.setP59((strs[58]));
            ubSource.setP60((strs[59]));
            ubSource.setP61((strs[60]));
            ubSource.setP62((strs[61]));
            ubSource.setP63((strs[62]));
            ubSource.setP64((strs[63]));
            ubSource.setP66((strs[64]));
            ubSource.setP66((strs[65]));
            ubSource.setP67((strs[66]));
            ubSource.setP68((strs[67]));
            ubSource.setP69((strs[68]));
            ubSource.setP70((strs[69]));
            ubSource.setP71((strs[70]));
            ubSource.setP72((strs[71]));
            ubSource.setP73((strs[72]));
            ubSource.setP74((strs[73]));
            ubSource.setP75((strs[74]));
            ubSource.setP76((strs[75]));
            ubSource.setP77((strs[76]));
            ubSource.setP78((strs[77]));
            ubSource.setP79((strs[78]));
            ubSource.setP80((strs[79]));
            ubSource.setP81((strs[80]));
            ubSource.setP82((strs[81]));
            ubSource.setP83((strs[82]));
            ubSource.setP84((strs[83]));
            ubSource.setP85((strs[84]));
            ubSource.setP86((strs[85]));
            ubSource.setP87((strs[86]));
            ubSource.setP88((strs[87]));
            ubSource.setP89((strs[88]));
            ubSource.setP90((strs[89]));
            ubSource.setP91((strs[90]));
            ubSource.setP92((strs[91]));
            ubSource.setP93((strs[92]));
            ubSource.setP94((strs[93]));
            ubSource.setP95((strs[94]));
            ubSource.setP96((strs[95]));
           int res= ubSourceService.insertUbSources(ubSource);
           if(res==0){
               result.setMsg("失败");
               result.setStatus(0);
           }
           if(res==1){
               result.setMsg("成功");
               result.setStatus(1);
            }
            return result;
        }catch (Exception e){
            e.printStackTrace();
            return new PageResult(0,"失败");
        }
    }

    //导出
    @RequestMapping("/exportExcle")
    public void exportExcle(HttpServletRequest req,HttpServletResponse resp) {
        String power=req.getParameter("power");
        XSSFWorkbook book = jsAsTradeBidService.exportExcel(power);
        try {
            resp.setHeader("Content-Disposition","attachment;filename="+new String(String.format(
                    "电力申报填写查看%1$tY%1$tm%1$td%1$tH%1$tM%1$tS.xlsx",
                    new Date()).getBytes(), "ISO8859-1"));
            book.write(resp.getOutputStream());
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "importExcle", method= RequestMethod.POST)
    @ResponseBody
    public JSONObject importFile(MultipartFile file){
        JSONObject jsonObject=new JSONObject();
        try {
            CommonsMultipartFile cFile = (CommonsMultipartFile) file;
            DiskFileItem fileItem = (DiskFileItem) cFile.getFileItem();
            InputStream inputStream = fileItem.getInputStream();
            XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
            XSSFSheet sheet = workbook.getSheetAt(0);
            int rowNum = sheet.getLastRowNum();
            XSSFRow row = null;
            List<Map<String,Object>> powers=new ArrayList<Map<String, Object>>();
            for (int i = 1; i <= rowNum; i++) {
                row = sheet.getRow(i);
                // getCellValue获取内容
                XSSFCell cell = row.getCell(1);
                cell.setCellType(Cell.CELL_TYPE_STRING);
                Map<String,Object> power=new HashMap<String,Object>();
                power.put("tradePower",cell.getStringCellValue().trim());
                powers.add(power);
            }
            jsonObject.put("code","200");
            jsonObject.put("data",powers);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return jsonObject;

    }

    //历史申报曲线
    @RequestMapping(value = {"getTraPowerBefore", ""})
    @ResponseBody
    public JSONObject getTraPowerBefore( HttpServletRequest request) {
        String consNo=request.getParameter("consNo");
        String date=request.getParameter("date");
        return jsAsTradeBidService.getTraPowerBefore(consNo,date);

    }

    //历史实际曲线
    @RequestMapping(value = {"getActualBefore", ""})
    @ResponseBody
    public JSONObject getActualBefore( HttpServletRequest request) {
        String consNo=request.getParameter("consNo");
        String date=request.getParameter("date");
        return jsAsTradeBidService.getActualBefore(consNo,date);

    }
}
