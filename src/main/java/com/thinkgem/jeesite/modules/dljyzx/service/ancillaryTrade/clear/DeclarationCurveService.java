package com.thinkgem.jeesite.modules.dljyzx.service.ancillaryTrade.clear;

import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.modules.dljyzx.dao.ancillaryTrade.clear.DeclarationCurveDao;

import com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.clear.DeclarationCurve;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DeclarationCurveService  extends CrudService<DeclarationCurveDao, DeclarationCurve> {

    @Autowired
     private  DeclarationCurveDao declarationCurveDao;

    public List<Map<String,Object>> getPoint(DeclarationCurve declarationCurve){

        return declarationCurveDao.getPoint(declarationCurve);
    }


    public  List<DeclarationCurve>  getTimePoint(){
        return declarationCurveDao.getTimePoint();
    }

    public  List<Map<String,Object>>  getFiveTimePoint(){
        return declarationCurveDao.getFiveTimePoint();

    }


}
