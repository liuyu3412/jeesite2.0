package com.thinkgem.jeesite.modules.dljyzx.service.ancillaryServicesPowerQuery;

import com.alibaba.fastjson.JSONObject;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryServicesPowerQuery.PowerQueryDao;
import com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryTrade.JsAsTradeBidDao;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryServicesPowerQuery.JsAsPowerQuery;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.JsAsTradeseq;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.settlememt.JsAsSeResultMonth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@Transactional
public class PowerQueryService extends CrudService<JsAsTradeBidDao, JsAsTradeseq> {

    @Autowired
    private PowerQueryDao dao;
    @Autowired
    private JsAsTradeBidDao jsAsTradeBidDao;

    public List<Map<String, Object>> findSeqsByMonth(String month, String pId) {
        List<String> tradeDate = dao.findSeqsByMonth(month,pId);
        //某年某月天数
        int dayNum=getDaysByYearMonth(month);

        List<Map<String,Object>> days=new ArrayList<Map<String,Object>>();
        for (int i = 1; i <= dayNum; i++) {
            Map<String,Object> map = new HashMap<String,Object>();
            map.put("day", i);
            for (String adjustDateStr : tradeDate) {
                if(i==Integer.parseInt(adjustDateStr.substring(8,10))){
                    map.put("adjustDateStr", adjustDateStr);
                    BigDecimal seqCount=jsAsTradeBidDao.getSeqCount(pId,adjustDateStr.substring(0,10));
                    BigDecimal seqHasCount=jsAsTradeBidDao.getSeqHasCount(pId,adjustDateStr.substring(0,10));
                    //判断需求是否申报过
                    if(seqHasCount.compareTo(BigDecimal.ZERO)==1){
                        map.put("has","01");
                    }
                    //判断需求是否全部申报
                    if(seqHasCount.compareTo(seqCount)==0){
                        map.put("all","01");
                    }
                }
            }
            days.add(map);
        }
        return days;
    }

//    public  JSONObject  powerQuery(String date, String participantId, HttpServletRequest request, HttpServletResponse response){
//        JSONObject jsonObject=new JSONObject();
//        Page<JsAsPowerQuery> page = new Page<>(request,response,5);
//        JsAsPowerQuery jsAsPowerQuery=new JsAsPowerQuery();
//        jsAsPowerQuery.setDate(date);
//        jsAsPowerQuery.setParticipantId(participantId);
////       List<String> consoList= dao.queryConso(date,participantId);
//        Page<JsAsSeResultMonth> page1 = jsAsSeResultMonthService.findPage(page, jsAsSeResultMonth);
//        for (String consoNo:consoList) {
//            List<Map<String, Object>> maps = dao.queryActualElec(consoNo, date);
//            List<String> actualPower = new ArrayList<>();
//            for (Map<String, Object> power : maps) {
//                for (int i = 1; i <= 96 ; i++) {
//                    String str = "POINT" + i;
//                   if(power.get(str)!=null){
//                       actualPower.add(((BigDecimal) power.get(str)).toString());
//                    }else{
//                       actualPower.add("0");
//                    }
//                }
//            }
//
//            BigDecimal totalPower=BigDecimal.ZERO;
//            BigDecimal realTimeAverageLoad=BigDecimal.ZERO;
//            List<Map<String, Object>> mapListOne = dao.querylastPower(consoNo, date);
//            String boforeday = beforeDay(date);
//            List<Map<String, Object>> mapListTwo = dao.querylastPower(consoNo, boforeday);
//            BigDecimal decimalAfter = (BigDecimal) mapListOne.get(0).get("POINT96");
//            BigDecimal decimalBefore = (BigDecimal) mapListTwo.get(0).get("POINT96");
//            totalPower = decimalAfter.subtract(decimalBefore);
//            BigDecimal   dayAveragePower = totalPower.divide(new BigDecimal("24"), 8,
//                    BigDecimal.ROUND_HALF_UP);
//            realTimeAverageLoad=dayAveragePower;
//
//
//
//
//        }
//
//
//        return jsonObject;
//    }

//    public JSONObject powereQuery(String date, String participantId) {
//        JSONObject jsonObject=new JSONObject();
//
//        List<Map<String, Object>> powereQuery = dao.powereQuery(date, participantId);
//        List<JsAsPowerQuery> res = new ArrayList<>();
//        System.out.println("date:"+date);
//        System.out.println("participantId:"+participantId);
//        for (Map<String, Object> map : powereQuery) {
//            String consno = (String) map.get("CONSNO");
//            String adjustdate = (String) map.get("ADJUSTDATE");
//            String tradeseqid = (String) map.get("TRADESEQID");
//
//            int startTime = Integer.parseInt(((String) map.get("START_TIME")).split(":")[0]);
//            Integer interval = ((BigDecimal) map.get("INTERVAL")).intValue();
//
//            BigDecimal totalPower =  BigDecimal.ZERO;
//            //查询该户号在这次交易中的实际的电力
//            List<Map<String, Object>> actulePower = dao.queryActulePower(consno,tradeseqid);
////            List<String> pointStr = new ArrayList<String>();
////            for (int i = 0; i < interval; i++) {
////                pointStr.add("POINT" + (startTime * 4 + 1));
////                pointStr.add("POINT" + (startTime * 4 + 2));
////                pointStr.add("POINT" + (startTime * 4 + 3));
////                pointStr.add("POINT" + (startTime * 4 + 4));
////                startTime++;
////            }
////            for (Map<String, Object> power : actulePower) {
////                for (String point : pointStr) {
////                    try {
////                        totalPower = totalPower.add((BigDecimal) power.get(point));
////                    } catch (Exception e) {
//////                        e.printStackTrace();
////                    }
////                }
////            }
//            BigDecimal realTimeAverageLoad=BigDecimal.ZERO;
////            BigDecimal realTimeAverageLoad = totalPower.divide(new BigDecimal(interval*4), 4, BigDecimal.ROUND_HALF_DOWN);
//
//            //96个点的电力
//            List<BigDecimal> eachPower = new ArrayList<>();
//            for (Map<String, Object> power : actulePower) {
//                for (int i = 1; i <= 96 ; i++) {
//                    String str = "POINT" + i;
//                    eachPower.add((BigDecimal) power.get(str));
//                }
//            }
//
//            List<Map<String, Object>> mapListOne = dao.querylastPower(consno, date);
//            String boforeday = beforeDay(date);
//            List<Map<String, Object>> mapListTwo = dao.querylastPower(consno, boforeday);
//            BigDecimal decimalAfter = (BigDecimal) mapListOne.get(0).get("POINT96");
//            BigDecimal decimalBefore = (BigDecimal) mapListTwo.get(0).get("POINT96");
//            totalPower = decimalAfter.subtract(decimalBefore);
//            BigDecimal   dayAveragePower = totalPower.divide(new BigDecimal("24"), 8,
//                    BigDecimal.ROUND_HALF_UP);
//            realTimeAverageLoad=dayAveragePower;
//            JsAsPowerQuery jsAsPowerQuery = new JsAsPowerQuery(consno, adjustdate, startTime, interval, realTimeAverageLoad, eachPower);
//            res.add(jsAsPowerQuery);
//        }
//        jsonObject.put("res",res);
//        jsonObject.put("code","200");
//
//        return jsonObject;
//    }

    //查找4条基线
    public JSONObject queryCurve(String consno, String adjustDate, String realTimeAverageLoad) {
        JSONObject jsonObject = new JSONObject();

//        //查找基线
//        Object baseline = dao.queryBaseline(consno, adjustDate);
        List<BigDecimal> baselineList = new ArrayList<BigDecimal>();

        List<Map<String, Object>> mapList = dao.queryBaseline(consno, adjustDate);
        System.out.println("mapList.size:"+mapList.size());
        for (Map<String, Object> map:mapList) {
            String starttimeStr = ((String) map.get("START_TIME")).split(":")[0];
            String endtimeStr = ((String) map.get("END_TIME")).split(":")[0];
            int starttime = Integer.parseInt(starttimeStr)*4+1;
            int endtime = Integer.parseInt(endtimeStr)*4;
            for(int a=starttime;a<=endtime;a++){
                if("null".equals(String.valueOf(map.get("BASE_POWER")))){
                    baselineList.add(null);
                }else{
                    baselineList.add((BigDecimal) map.get("BASE_POWER"));
                }
            }
        }
        System.out.println("baselineList.size:"+baselineList.size());
        jsonObject.put("baseline",baselineList);

        //查找申报电力
        List<String> tradeBidPower = new ArrayList<String>();
        List<Map<String, Object>> list = dao.queryTradeBid(consno, adjustDate);
        for (Map<String, Object> power : list) {
            for (int i = 1; i <= 96 ; i++) {
                String str = "POINT" + i;
                try {
                    tradeBidPower.add(((BigDecimal) power.get(str)).toString());
                }catch (Exception e){
                    tradeBidPower.add("0");
                }
            }
        }
        jsonObject.put("tradeBidPower",tradeBidPower);

        //查找实际电力 actualElectricity
        List<String> actualElectricity = new ArrayList<String>();
        List<Map<String, Object>> list1 = dao.queryActualElec(consno, adjustDate);
        for (Map<String, Object> power : list1) {
            for (int i = 1; i <= 96 ; i++) {
                String str = "POINT" + i;
                try {
                    actualElectricity.add(((BigDecimal) power.get(str)).toString());
                }catch (Exception e){
                    actualElectricity.add("0");
                }
            }
        }
        jsonObject.put("actualElectricity",actualElectricity);
        jsonObject.put("code","200");




        List<String> realTimeAverageLoadList = new ArrayList<String>();
        for (int i = 0; i < 96; i++) {
            realTimeAverageLoadList.add(realTimeAverageLoad);
        }
        jsonObject.put("realTimeAverageLoad",realTimeAverageLoadList);

        return jsonObject;
    }

    private List<String> addbaselinePower(Map<String, Object> map, List<String> baselineList) {
        String timeseg_id = String.valueOf(map.get("TIMESEG_ID"));
        String base_power = String.valueOf(map.get("BASE_POWER"));
        if("1".equals(timeseg_id)){
            baselineList.add(null);
            for(int j=1 ;j<=32 ;j++){
                baselineList.add(base_power);
            }for(int j=33 ;j<=96 ;j++ ){
                baselineList.add(null);
            }
        }
        if("2".equals(timeseg_id)){
            baselineList.add(null);
            for(int j=1 ;j<=32 ;j++){
                baselineList.add(null);
            }for(int j=33 ;j<=48 ;j++ ){
                baselineList.add(base_power);
            }for(int j=49 ;j<=96 ;j++ ){
                baselineList.add(null);
            }
        }
        if("3".equals(timeseg_id)){
            baselineList.add(null);
            for(int j=1 ;j<=48 ;j++){
                baselineList.add(null);
            }for(int j=49 ;j<=68 ;j++){
                baselineList.add(base_power);
            }for(int j=69 ;j<=96 ;j++ ){
                baselineList.add(null);
            }
        }
        if("4".equals(timeseg_id)){
            baselineList.add(null);
            for(int j=1 ;j<=68 ;j++ ){
                baselineList.add(null);
            }for(int j=69 ;j<=84 ;j++){
                baselineList.add(base_power);
            } for(int j=85 ;j<=96 ;j++ ){
                baselineList.add(null);
            }
        }
        if("5".equals(timeseg_id)){
            baselineList.add(null);
            for(int j=1 ;j<=84 ;j++ ){
                baselineList.add(null);
            }for(int j=85 ;j<=96 ;j++){
                baselineList.add(base_power);
            }
        }

        return baselineList;
    }


    //根据年月算出该月有多少天
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

    //计算96个时间点
    public ArrayList<String> getPointOfTime(){
        ArrayList<String> list = new ArrayList<String>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date date = null;
        String str = "2020-07-16 00:00";
        try {
            for (int i = 1; i <= 96; i++) {
                date = sdf.parse(str);
                Date afterDate = new Date(date.getTime() + 900000);
                str = sdf.format(afterDate);
                String dateStr = str.substring(11, 16);
                if ("00:00".equals(dateStr)) {
                    dateStr = "24:00";
                }
                list.add(dateStr);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return list;
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
