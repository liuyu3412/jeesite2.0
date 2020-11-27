package com.thinkgem.jeesite.modules.dljyzx.service.ancillaryServicesPowerQuery;

import com.alibaba.fastjson.JSONObject;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryServicesPowerQuery.JsAsPowerQueryDao;
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
public class JsAsPowerQueryService extends CrudService<JsAsPowerQueryDao, JsAsPowerQuery> {





    }

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
