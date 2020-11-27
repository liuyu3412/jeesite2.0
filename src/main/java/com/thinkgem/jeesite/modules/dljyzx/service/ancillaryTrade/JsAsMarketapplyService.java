package com.thinkgem.jeesite.modules.dljyzx.service.ancillaryTrade;

import com.alibaba.fastjson.JSONObject;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryTrade.JsAsMarketapplyDao;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.JsAsMarketapply;
import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.JsAsMarketapplyConsno;
import com.thinkgem.jeesite.modules.tmxattachmentw.entity.TMxAttachment;
import com.thinkgem.jeesite.modules.tmxattachmentw.service.TMxAttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.*;

/**
 * @author GuoYF
 * @version 2020/6/12
 */
@Service
@Transactional
public class JsAsMarketapplyService extends CrudService<JsAsMarketapplyDao, JsAsMarketapply> {

    @Autowired
    private JsAsMarketapplyDao jsAsMarketapplyDao;
    @Autowired
    private TMxAttachmentService tmxService;

    public Page<JsAsMarketapply> findPage1(Page<JsAsMarketapply> page, JsAsMarketapply entity) {
        entity.setPage(page);
        page.setList(jsAsMarketapplyDao.findList1(entity));
        return page;
    }

    public Map<String,Object> getUserInfo(String pid){
        return jsAsMarketapplyDao.getUserInfo(pid);
    }

    public JsAsMarketapply findById(String guid){
        return jsAsMarketapplyDao.findById(guid);
    }

    public JSONObject saveinfo(JsAsMarketapply jsAsMarketapply){
        JSONObject jsonObject=new JSONObject();
        //判断户号今年是否已申请
        BigDecimal b=jsAsMarketapplyDao.hasApply(jsAsMarketapply.getUserId(),jsAsMarketapply.getYear(),jsAsMarketapply.getGuid());
        if(b.compareTo(BigDecimal.ZERO)>0){
            jsonObject.put("code","500");
            jsonObject.put("msg","该用户已有入市申请");
            return jsonObject;
        }
        //根据查名称
        List<String> consName=jsAsMarketapplyDao.getName(jsAsMarketapply.getUserId());
        jsAsMarketapply.setConsName(consName.get(0));

        if(StringUtils.isEmpty(jsAsMarketapply.getGuid())){
            String _guid2 = IdGen.uuid();
            jsAsMarketapply.setGuid(_guid2);
            jsAsMarketapplyDao.insert(jsAsMarketapply);
            //插入明细表
            List<JsAsMarketapplyConsno> jsAsMarketapplyConsnos=jsAsMarketapply.getJsAsMarketapplyConsnos();
            for(JsAsMarketapplyConsno jsAsMarketapplyConsno:jsAsMarketapplyConsnos){
                jsAsMarketapplyConsno.setMarketapplyId(_guid2);
                jsAsMarketapplyConsno.setConsName(consName.get(0));
                jsAsMarketapplyConsno.setUserId(jsAsMarketapply.getUserId());
                jsAsMarketapplyConsno.setParticipantId(jsAsMarketapply.getParticipantId());
                jsAsMarketapplyDao.insertConsNo(jsAsMarketapplyConsno);
            }
            //更新附件表关联主键
            jsAsMarketapplyDao.updatePVK(jsAsMarketapply.getAgreementAttachid(),_guid2);
            jsAsMarketapplyDao.updatePVK(jsAsMarketapply.getPromiseAttachid(),_guid2);
        }else{
            jsAsMarketapplyDao.update(jsAsMarketapply);
            //插入明细表
            jsAsMarketapplyDao.deleteConsNo(jsAsMarketapply.getGuid());
            List<JsAsMarketapplyConsno> jsAsMarketapplyConsnos=jsAsMarketapply.getJsAsMarketapplyConsnos();
            for(JsAsMarketapplyConsno jsAsMarketapplyConsno:jsAsMarketapplyConsnos){
                jsAsMarketapplyConsno.setMarketapplyId(jsAsMarketapply.getGuid());
                jsAsMarketapplyConsno.setConsName(consName.get(0));
                jsAsMarketapplyConsno.setUserId(jsAsMarketapply.getUserId());
                jsAsMarketapplyConsno.setParticipantId(jsAsMarketapply.getParticipantId());
                jsAsMarketapplyDao.insertConsNo(jsAsMarketapplyConsno);
            }
        }
        jsonObject.put("data",jsAsMarketapply.getGuid());
        jsonObject.put("code","200");
        return jsonObject;
    }

    public JSONObject submitApplys(String guids){
        JSONObject jsonObject = new JSONObject();
        List<String> guidList = new ArrayList(Arrays.asList(guids.split(",")));
        for(String guid:guidList){
            jsAsMarketapplyDao.updateStatus(guid);
        }
        jsonObject.put("code","200");
        return jsonObject;
    }

    public Map<String,Object> uploadFile(MultipartFile file,String attachId,String guid){
        Map<String,Object> result=new HashMap<String,Object>();
        InputStream is = null;
        TMxAttachment entity = new TMxAttachment();
        try {
            is = file.getInputStream();
            byte b[] = new byte[(int) file.getSize()];
            is.read(b);
            String filename = file.getOriginalFilename();
            //查询是否该报表是否存在 如果存在则更新操作
            entity=tmxService.getAtt(attachId);
            if (null!=entity){
                entity.setTableName("JS_AS_MARKETAPPLY");
                entity.setAttName(filename);
                entity.setPkVal(guid);
                int len = b.length;
                entity.setAttSize((long)len);
                entity.setAttFile(b);
                tmxService.updataTmx(entity);
            }else{
                //新增报表
                entity=new TMxAttachment();
                String _guid2 = IdGen.uuid();
                entity.setAttachmentId(_guid2);
                entity.setTableName("JS_AS_MARKETAPPLY");
                entity.setAttName(filename);
                entity.setPkVal(guid);
                int len = b.length;
                entity.setAttSize((long)len);
                entity.setAttFile(b);
                tmxService.insert(entity);
            }
            result.put("attachId",entity.getAttachmentId());
            result.put("attName",entity.getAttName());
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (null != is) {
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }

    public List<Map<String, Object>> areaTreeData(){
        List<Map<String, Object>> mapList = jsAsMarketapplyDao.areaTreeData();
        return mapList;
    }

    public Map<String,String> getAuthMan(String userId){
        return jsAsMarketapplyDao.getAuthMan(userId);
    }

    public List<JsAsMarketapplyConsno> getConsNoByUser(String userId,String year){
        List<JsAsMarketapplyConsno> jsAsMarketapplyConsnos =jsAsMarketapplyDao.getConsNoByUser(userId,year);
        for(JsAsMarketapplyConsno jsAsMarketapplyConsno:jsAsMarketapplyConsnos){
            if(StringUtils.isEmpty(jsAsMarketapplyConsno.getAreaId())){
                jsAsMarketapplyConsno.setAreaId(jsAsMarketapplyConsno.getGeogrregionid());
            }
            jsAsMarketapplyConsno.setAreaName(jsAsMarketapplyDao.getAreaName(jsAsMarketapplyConsno.getAreaId()));
        }
        return jsAsMarketapplyConsnos;
    }
}
