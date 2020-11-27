package com.thinkgem.jeesite.modules.dljyzx.service.ancillaryTrade;

import com.alibaba.fastjson.JSONObject;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryTrade.JsAsTradeBidDao;
import com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryTrade.cureLine.JsAsCureLineDao;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.JsAsDayPower;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.JsAsTradeBid;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.JsAsTradeBidCons;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.JsAsTradeseq;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.cureLine.JsAsTimeDefinitionDetail;
import com.thinkgem.jeesite.modules.dljyzx.utils.DateUtil;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;

/**
 * @author GuoYF
 * @version 2020/6/12
 */
@Service
@Transactional
public class JsAsTradeBidService extends CrudService<JsAsTradeBidDao, JsAsTradeseq> {

    @Autowired
    private JsAsTradeBidDao jsAsTradeBidDao;
    @Autowired
    private JsAsCureLineDao jsAsCureLineDao;

    public List<Map<String,Object>> findSeqsByMonth(String month,String pId){
        List<JsAsTradeseq> jsAsTradeseqs=jsAsTradeBidDao.findSeqsByMonth(month,pId);
        List<Map<String,Object>> days=new ArrayList<Map<String,Object>>();
        int dayNum=getDaysByYearMonth(month);
        for(int i=1;i<=dayNum;i++){
            Map<String,Object> item=new HashMap<String,Object>();
            item.put("day",i);
            StringBuffer info=new StringBuffer();
            for(JsAsTradeseq jsAsTradeseq:jsAsTradeseqs){
                String adjustDateStr=jsAsTradeseq.getAdjustDateStr();
                if(i==Integer.parseInt(adjustDateStr.substring(8,10))){
                    String adjustStartStr=jsAsTradeseq.getAdjustStartStr();
                    String adjustEndStr=jsAsTradeseq.getAdjustEndStr();
                    int start=Integer.parseInt(adjustStartStr.substring(0,adjustStartStr.length()-3));
                    int end=Integer.parseInt(adjustEndStr.substring(0,adjustEndStr.length()-3));
                    info.append(start+"-"+end+"时<br>"+jsAsTradeseq.getAreaName()+"<br>");
                    String adjustType=jsAsTradeseq.getAdjustType();
                    if("01".equals(adjustType)){
                        info.append("下调"+jsAsTradeseq.getAdjustPower()+"MW<br>");
                    }else{
                        info.append("上调"+jsAsTradeseq.getAdjustPower()+"MW<br>");
                    }
                    BigDecimal seqCount=jsAsTradeBidDao.getSeqCount(pId,adjustDateStr.substring(0,10));
                    BigDecimal seqHasCount=jsAsTradeBidDao.getSeqHasCount(pId,adjustDateStr.substring(0,10));
                    //判断需求是否申报过
                    if(seqHasCount.compareTo(BigDecimal.ZERO)==1){
                        item.put("has","01");
                    }
                    //判断需求是否全部申报
                    if(seqHasCount.compareTo(seqCount)==0){
                        item.put("all","01");
                    }
                }
            }
            String infoStr=info.toString();
            if(!StringUtils.isEmpty(infoStr)){
                infoStr=infoStr.substring(0,infoStr.length()-4);
                item.put("info",infoStr);
            }
            days.add(item);
        }
        return days;
    }

    public List<Map<String, Object>> timeSeg(){
        return jsAsTradeBidDao.timeSeg();
    }

    /**
     * 根据年 月 获取对应的月份 天数
     * */
    public static int getDaysByYearMonth(String monthParam) {

        int year = Integer.parseInt(monthParam.substring(0,4));
        int month = Integer.parseInt(monthParam.substring(5,7));
        Calendar a = Calendar.getInstance();
        a.set(Calendar.YEAR, year);
        a.set(Calendar.MONTH, month - 1);
        a.set(Calendar.DATE, 1);
        a.roll(Calendar.DATE, -1);
        int maxDate = a.get(Calendar.DATE);
        return maxDate;
    }

    public JSONObject getSeqByDate(String date,String pId){
        JSONObject jsonObject=new JSONObject();
        //查询当日所有需求
        List<JsAsTradeseq> jsAsTradeseqs=jsAsTradeBidDao.getSeqByDate(date,pId);
        for(JsAsTradeseq jsAsTradeseq:jsAsTradeseqs){
            if(StringUtils.isEmpty(jsAsTradeseq.getBidStatus())){
                jsAsTradeseq.setBidStatus("未申报");
            }
        }
        jsonObject.put("jsAsTradeseqs",jsAsTradeseqs);
        //查询当日可参加需求的户号
        List<String> consNos = new ArrayList<String>();
        for (JsAsTradeseq jsAsTradeseq:jsAsTradeseqs){
            if (!consNos.contains(jsAsTradeseq.getConsNo())){
                consNos.add(jsAsTradeseq.getConsNo());
            }
        }
        jsonObject.put("consNos",consNos);
        jsonObject.put("code","200");
        return jsonObject;
    }

    public JSONObject getPowersByConsNo(String date,String pId,String consNo){
        JSONObject jsonObject=new JSONObject();
        List<Map<String,Object>> power96=jsAsTradeBidDao.getPower96(date,pId,consNo);
        List<Map<String,Object>> seqTime=jsAsTradeBidDao.getSeqTime(date,consNo);
        List<Map<String,Object>> powers=new ArrayList<Map<String,Object>>();
        //获取基线点
        List<Map<String,Object>> basePowerDeail=jsAsTradeBidDao.getBasePowerDetail(date,consNo);
        List<BigDecimal> basePowerDeails=new ArrayList<BigDecimal>();
        basePowerDeails.add(null);
        for (int i=1;i<97;i++){
            Map<String,Object> power=new HashMap<String,Object>();
            if(power96.size()>0){
                if(power96.get(0).get("POINT"+i)==null){
                    power.put("power",new BigDecimal(0));
                }else{
                    power.put("power",(BigDecimal)power96.get(0).get("POINT"+i));
                }
            }else{
                power.put("power",new BigDecimal(0));
            }
            if(checkSeqTime(i,seqTime)){
                power.put("hasTra","00");
            }
            power.put("timeId",getTimeId(i,seqTime));
            powers.add(power);

            //处理基线点
            if(basePowerDeail.size()>0){
                if(basePowerDeail.get(0).get("POINT"+i)==null){
                    basePowerDeails.add(BigDecimal.ZERO);
                }else{
                    basePowerDeails.add((BigDecimal)basePowerDeail.get(0).get("POINT"+i));
                }
            }
        }
        jsonObject.put("powers",powers);
        jsonObject.put("basePowerDeails",basePowerDeails);
        if(power96.size()>0){
            jsonObject.put("status",power96.get(0).get("STATUS"));
        }
        //获取基线
        List<BigDecimal> newBasePowers=new ArrayList<BigDecimal>();
        newBasePowers.add(null);
        List<Map<String,Object>> basePowers=jsAsTradeBidDao.getBasePower(date,consNo);
        for(Map<String,Object> basePower:basePowers){
            String starttimeStr = ((String) basePower.get("START_TIME")).split(":")[0];
            String endtimeStr = ((String) basePower.get("END_TIME")).split(":")[0];
            int starttime = Integer.parseInt(starttimeStr)*4+1;
            int endtime = Integer.parseInt(endtimeStr)*4;
            for(int a=starttime;a<=endtime;a++){
                if("null".equals(String.valueOf(basePower.get("BASE_POWER")))){
                    newBasePowers.add(null);
                }else{
                    newBasePowers.add((BigDecimal) basePower.get("BASE_POWER"));
                }
            }

        }
        jsonObject.put("basePowers",newBasePowers);

        //获取前30天每个点最大值
        List<BigDecimal> maxPowers=new ArrayList<BigDecimal>();
        Map<String,Object> maxPowerMap=jsAsTradeBidDao.getMaxPower(date,consNo);
        for (int i=1;i<97;i++){
            maxPowers.add(((BigDecimal)maxPowerMap.get("P"+i)).multiply(new BigDecimal(1.2)));
        }
        jsonObject.put("maxPowers",maxPowers);
        jsonObject.put("code","200");
        return jsonObject;
    }

    protected String getTimeId(int time,List<Map<String,Object>> seqTime) {
        int timeNum=0;
        for(Map<String,Object> item:seqTime){
            String interval=String.valueOf(item.get("INTERVAL"));
            String id=String.valueOf(item.get("ID"));
            timeNum+=Integer.parseInt(interval)*4;
            if(time<=timeNum){
                return id;
            }
        }
        return "";
    }

    protected boolean checkSeqTime(int time,List<Map<String,Object>> seqTime) {
        for(Map<String,Object> item:seqTime){
            String start=String.valueOf(item.get("START_TIME"));
            String end=String.valueOf(item.get("END_TIME"));
            Integer startId=Integer.parseInt(start.replace(":00",""))*4;
            Integer endId=Integer.parseInt(end.replace(":00",""))*4;
            if(startId<time&&endId>=time&&item.get("TIMESEG_ID")!=null){
                return true;
            }
        }
        return false;
    }

    @Transactional
    public JSONObject addDayPowers(JsAsDayPower jsAsDayPower){
        JSONObject jsonObject=new JSONObject();
        List<BigDecimal> powers = new ArrayList(Arrays.asList(jsAsDayPower.getPowersStr().split(",")));
         //删除当日该户号申报96电力
        jsAsTradeBidDao.deleteDayPowers(jsAsDayPower);
        jsAsTradeBidDao.addDayPowers(jsAsDayPower,powers);
        jsonObject.put("code","200");
        return jsonObject;
    }

    @Transactional(readOnly = true)
    public JSONObject hasDayPowers(String tradeSeqConsId){
        JSONObject jsonObject=new JSONObject();
        String status=jsAsTradeBidDao.hasDayPowers(tradeSeqConsId);
        if(!"01".equals(status)){
            jsonObject.put("code","500");
            jsonObject.put("msg","请先申报当日该户号电力曲线。");
            return jsonObject;
        }
        //验证申报时间
        boolean checkTime=jsAsTradeBidDao.checkTime(tradeSeqConsId);
        if(!checkTime){
            jsonObject.put("code","500");
            jsonObject.put("msg","当前时间不可申报。");
            return jsonObject;
        }
        jsonObject.put("code","200");
        return jsonObject;
    }

    @Transactional(readOnly = true)
    public Map<String,Object> getAdjustDate(String tradeSeqConsId){

        //获取户号，交易日期
        return jsAsTradeBidDao.getAdjustDate(tradeSeqConsId);
    }

    @Transactional(readOnly = true)
    public List<JsAsTradeBidCons> getTradeBidCons(Map<String,Object> baseInfo){
        List<JsAsTradeBidCons> jsAsTradeBidConsList=jsAsTradeBidDao.getTradeBidCons(baseInfo);
        //基线负荷
        for (JsAsTradeBidCons jsAsTradeBidCons:jsAsTradeBidConsList){
            List<BigDecimal> basePowers=jsAsTradeBidDao.getBasePowerByTraid(jsAsTradeBidCons.getTradeseqConsId());
            if(basePowers.size()>0){
                jsAsTradeBidCons.setBasePower(basePowers.get(0));
            }
            //已保存数据
            if(!StringUtils.isEmpty(jsAsTradeBidCons.getStatus())){
                //申报平均负荷
                List<Map<String,Object>> power96=jsAsTradeBidDao.getPower96(jsAsTradeBidCons.getAdjustDate(),jsAsTradeBidCons.getPid(),jsAsTradeBidCons.getConsNo());
                String starttimeStr = jsAsTradeBidCons.getStartTime().split(":")[0];
                String endtimeStr = jsAsTradeBidCons.getEndTime().split(":")[0];
                String adjustType=jsAsTradeBidCons.getAdjustType();
                int starttime = Integer.parseInt(starttimeStr)*4+1;
                int endtime = Integer.parseInt(endtimeStr)*4;
                BigDecimal traPowerAll=new BigDecimal(0);
                BigDecimal num=new BigDecimal(0);
                for(int a=starttime;a<=endtime;a++){
                    if(power96.size()>0){
                        if(power96.get(0).get("POINT"+a)==null){
                            traPowerAll=traPowerAll.add(new BigDecimal(0));
                        }else{
                            traPowerAll=traPowerAll.add((BigDecimal)power96.get(0).get("POINT"+a));
                        }
                    }else{
                        traPowerAll=traPowerAll.add(new BigDecimal(0));
                    }
                    num=num.add(new BigDecimal(1));
                }
                BigDecimal traPower=traPowerAll.divide(num,4, BigDecimal.ROUND_HALF_UP);
                traPower=new BigDecimal(traPower.stripTrailingZeros().toPlainString());
                jsAsTradeBidCons.setTradePower(traPower);
                BigDecimal bidPower=jsAsTradeBidCons.getBidPower();
                BigDecimal bidPrice=jsAsTradeBidCons.getBidPrice();
                if(bidPower!=null&&bidPrice!=null){
                    BigDecimal profit=bidPower.multiply(bidPrice);
                    profit=new BigDecimal(profit.stripTrailingZeros().toPlainString());
                    if("01".equals(adjustType)){
                        profit=BigDecimal.ZERO.subtract(profit);
                    }
                    if(profit.compareTo(BigDecimal.ZERO)<0){
                        profit=profit.multiply(jsAsTradeBidCons.geteKcof());
                    }
                    jsAsTradeBidCons.setProfit(profit);
                }
            }
        }
        return jsAsTradeBidConsList;
    }

    @Transactional
    public JSONObject saveTradeBid(JsAsTradeBid jsAsTradeBid){
        JSONObject jsonObject=new JSONObject();
        User user = UserUtils.getUser();
        List<JsAsTradeBidCons> jsAsTradeBidConsList=jsAsTradeBid.getJsAsTradeBidConsList();
        for(JsAsTradeBidCons jsAsTradeBidCons:jsAsTradeBidConsList) {
            boolean checkTime = jsAsTradeBidDao.checkTime(jsAsTradeBidCons.getTradeseqConsId());
            if(!checkTime){
                jsonObject.put("code","500");
                jsonObject.put("msg","不在申报时间内");
                return jsonObject;
            }
        }
        List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
        for(JsAsTradeBidCons jsAsTradeBidCons:jsAsTradeBidConsList){
            //验证申报时间
//            if(checkTime){
                jsAsTradeBidCons.setPid(user.getParticipantId());
                if("01".equals(jsAsTradeBidCons.getStatus())){
                    jsAsTradeBidCons.setBidDate(DateUtil.getDateTime());
                }
                if(!StringUtils.isEmpty(jsAsTradeBidCons.getGbsId())){
                    //更新申报记录
                    jsAsTradeBidDao.updateTradeBidCons(jsAsTradeBidCons);
                }else{
                    //插入更新记录
                    String guid= IdGen.uuid();
                    jsAsTradeBidCons.setGbsId(guid);
                    jsAsTradeBidDao.insertTradeBidCons(jsAsTradeBidCons);
                }
                Map<String,Object> item=new HashMap<String,Object>();
                item.put("tradeseqConsId",jsAsTradeBidCons.getTradeseqConsId());
                item.put("gbsId",jsAsTradeBidCons.getGbsId());
                data.add(item);
//            }
        }
        //插入96时段
        JsAsDayPower jsAsDayPower=new JsAsDayPower();
        jsAsDayPower.setConsNo(jsAsTradeBid.getConsNo());
        jsAsDayPower.setpId(user.getParticipantId());
        jsAsDayPower.setDate(jsAsTradeBid.getAdjustDate());
        jsAsDayPower.setStatus(jsAsTradeBid.getStatus());
        List<BigDecimal> powers = new ArrayList(Arrays.asList(jsAsTradeBid.getPowersStr().split(",")));
        //删除当日该户号申报96电力
        jsAsTradeBidDao.deleteDayPowers(jsAsDayPower);
        jsAsTradeBidDao.addDayPowers(jsAsDayPower,powers);

        jsonObject.put("code","200");
        jsonObject.put("data",data);
        return jsonObject;
    }

    public XSSFWorkbook exportExcel(String powerStr){
        XSSFWorkbook book = new XSSFWorkbook();
        // 生成工作表
        XSSFSheet sheet = book.createSheet("电力申报填写");

        // 生成标题样式
        XSSFCellStyle headStyle = book.createCellStyle();
        XSSFFont font=book.createFont();
        font.setBold(true);//设置字体是否加粗
        headStyle.setFont(font);
        // 生成数据格样式
        XSSFCellStyle dataStyle = book.createCellStyle();

        // 生成标题列
        XSSFRow headRow = sheet.createRow(0);
        XSSFCell cellF1 = headRow.createCell(0);
        cellF1.setCellStyle(headStyle);
        cellF1.setCellValue("时间段");
        XSSFCell cellF2 = headRow.createCell(1);
        cellF2.setCellStyle(headStyle);
        cellF2.setCellValue("电力(MW)");

        // 填充数据
        List<BigDecimal> powers = new ArrayList(Arrays.asList(powerStr.split(",")));
        List<JsAsTimeDefinitionDetail> list = jsAsCureLineDao.findTimeDefinitionDetailByTimeId("2");
        for (int i = 0; i < list.size(); i++) {
            JsAsTimeDefinitionDetail item=list.get(i);
            XSSFRow row = sheet.createRow(i + 1);
            XSSFCell cell1 = row.createCell(0);
            cell1.setCellStyle(dataStyle);
            cell1.setCellValue(item.getStartTime()+"-"+item.getEndTime());
            XSSFCell cell2 = row.createCell(1);
            cell2.setCellStyle(dataStyle);
            cell2.setCellValue(String.valueOf(powers.get(i)));
        }
        return book;
    }

    public JSONObject getTraPowerBefore(String consNo,String date){
        JSONObject jsonObject=new JSONObject();
        List<Map<String,Object>> power96=jsAsTradeBidDao.getPower96(date,UserUtils.getUser().getParticipantId(),consNo);
        List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
        for(int a=1;a<=96;a++){
            Map<String,Object> power=new HashMap<String,Object>();
            if(power96.size()>0){
                if(power96.get(0).get("POINT"+a)==null){
                    power.put("tradePower",0);
                }else{
                    power.put("tradePower",power96.get(0).get("POINT"+a));
                }
            }else{
                power.put("tradePower",null);
            }
            data.add(power);
        }
        jsonObject.put("code","200");
        jsonObject.put("data",data);
        return jsonObject;
    }

    public JSONObject getActualBefore(String consNo,String date){
        JSONObject jsonObject=new JSONObject();
        List<Map<String,Object>> power96s=jsAsTradeBidDao.getActualBefore(date,UserUtils.getUser().getParticipantId(),consNo);
        List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
        if(power96s.size()>0){
            for(int a=1;a<=96;a++){
                BigDecimal power=BigDecimal.ZERO;
                for(Map<String,Object> item:power96s){
                    if(item.get("POINT"+a)!=null){
                        power=power.add((BigDecimal)item.get("POINT"+a));
                    }else{
                        power=power.add(BigDecimal.ZERO);
                    }
                }
                Map<String,Object> powerMap=new HashMap<String,Object>();
                powerMap.put("tradePower",power);
                data.add(powerMap);
            }

        }
        jsonObject.put("code","200");
        jsonObject.put("data",data);
        return jsonObject;
    }

}
