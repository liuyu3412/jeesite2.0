/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.cms.service;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.thinkgem.jeesite.common.utils.DateUtils;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.modules.cms.entity.DianUser;
import com.thinkgem.jeesite.modules.cms.dao.DianUserDao;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 单表生成Service
 *
 * @author ThinkGem
 * @version 2019-05-15
 */
@Service
@Transactional(readOnly = true)
public class DianUserService extends CrudService<DianUserDao, DianUser> {

    @Autowired
    private DianUserDao dianUserDao;

    public DianUser get(String id) {
        return super.get(id);
    }

    public List<DianUser> findList(DianUser dianUser) {
        return super.findList(dianUser);
    }

    public Page<DianUser> findPage(Page<DianUser> page, DianUser dianUser) {
        return super.findPage(page, dianUser);
    }

    @Transactional(readOnly = false)
    public void save(DianUser dianUser) {
        super.save(dianUser);
    }

    @Transactional(readOnly = false)
    public void delete(DianUser dianUser) {
        dianUserDao.upDelFlag(dianUser);
    }


    public void downExcle(DianUser dianUser, HttpServletResponse response) {
        try {
            HSSFWorkbook wb = new HSSFWorkbook();
            HSSFSheet sheet = wb.createSheet("人员统计");
            HSSFRow row1 = sheet.createRow(0);
            String[] first = new String[]
                    {"客户名称", "组织机构代码", "营业执照号码", "客户编号", "联系人", "联系方式", "状态", "注册时间"};
            // 创建单元格并设置单元格内容
            for (int i = 0; i < first.length; i++) {
                row1.createCell(i).setCellValue(first[i]);
            }
            List<DianUser> dianUsers = dianUserDao.findAllList(dianUser);
            for (int i = 0; i < dianUsers.size(); i++) {
                HSSFRow row = sheet.createRow(i + 1);
                DianUser item = dianUsers.get(i);
                row.createCell(0)
                        .setCellValue(item.getName() == null ? "" : item.getName());
                row.createCell(1)
                        .setCellValue(item.getOrganizationCode() == null ? "" : item.getOrganizationCode());
                row.createCell(2)
                        .setCellValue(item.getBusinessCode() == null ? "" : item.getBusinessCode());
                row.createCell(3)
                        .setCellValue(item.getSeqNo() == null ? "" : item.getSeqNo());
                row.createCell(4)
                        .setCellValue(item.getLinkedName() == null ? "" : item.getLinkedName());
                row.createCell(5)
                        .setCellValue(item.getLinkedPhone() == null ? "" : item.getLinkedPhone());
                switch (item.getStatuz()) {
                    case 1:
                        row.createCell(6).setCellValue("待审核");
                        break;
                    case 2:
                        row.createCell(6).setCellValue("审核成功");
                        break;
                    case 3:
                        row.createCell(6).setCellValue("审核失败");
                        break;
                }
                row.createCell(7)
                        .setCellValue(item.getCreated() == null ? "" : DateUtils.formatDate(item.getCreated(), "yyyy-MM-dd"));
            }
            // 输出Excel文件
            OutputStream output = response.getOutputStream();
            response.reset();
            response.setCharacterEncoding("UTF-8");// 设置相应内容的编码格式
            String timeStr = java.net.URLEncoder.encode("人员统计", "UTF-8");
            response.setHeader("Content-Disposition",
                    "attachment;filename=" + new String(timeStr.getBytes("UTF-8"), "GBK") + ".xls");
            response.setContentType("application/msexcel");// 定义输出类型
            wb.write(output);
            output.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String getSuffix(String originalName) {
        final int index = originalName.lastIndexOf(".");
        if (StringUtils.isNotBlank(originalName) && index > -1) {
            return originalName.substring(index).toLowerCase();
        }
        return "";
    }

    public static boolean isMobile(String mobile) {
        String regExp = "^((13[0-9])|(15[^4])|(18[0,2,3,5-9])|(17[0-8])|(147))\\d{8}$";
        Pattern p = Pattern.compile(regExp);
        Matcher m = p.matcher(mobile);
        return m.matches();
    }

    @Transactional(readOnly = false)
    public Map uploadExcle(MultipartFile[] files, HttpServletRequest res) {
        Map result = new HashMap();
        try {
            for (MultipartFile mf : files) {
                if (!mf.isEmpty()) {
                    CommonsMultipartFile cFile = (CommonsMultipartFile) mf;
                    DiskFileItem fileItem = (DiskFileItem) cFile.getFileItem();
                    InputStream inputStream = fileItem.getInputStream();
                    final String suffix = getSuffix(cFile.getOriginalFilename());

                    int total = 0;
                    int successCount = 0;
                    int index = 1;
                    List<String> failDetail = new ArrayList<String>();
                    if (".xls".equals(suffix)) {
                        try {
                            HSSFWorkbook workbook = new HSSFWorkbook(inputStream);
                            HSSFSheet sheet = workbook.getSheetAt(0);
                            int rowNum = sheet.getLastRowNum();
                            total = rowNum;
                            for (int i = 1; i <= rowNum; i++) {
                                HSSFRow row = sheet.getRow(i);
                                // getCellValue获取内容
                                String name = row.getCell(0).getStringCellValue().trim();
                                String organizationCode = row.getCell(1).getStringCellValue().trim();
                                String businessCode = row.getCell(2).getStringCellValue().trim();
                                String seqNo = row.getCell(3).getStringCellValue().trim();
                                String linkedName = row.getCell(4).getStringCellValue().trim();
                                String linkedPhone = row.getCell(5).getStringCellValue().trim();
                                String statuz = row.getCell(6).getStringCellValue().trim();
                                String created = row.getCell(7).getStringCellValue().trim();
                                DianUser dianUser = new DianUser();
                                dianUser.setName(name);
                                dianUser.setOrganizationCode(organizationCode);
                                dianUser.setBusinessCode(businessCode);
                                dianUser.setSeqNo(seqNo);
                                dianUser.setLinkedName(linkedName);
                                if(!isMobile(linkedPhone)){
                                    failDetail.add("第" + index + "条：插入手机格式有误");
                                    index++;
                                    continue;
                                }
                                dianUser.setLinkedPhone(linkedPhone);
                                if ("待审核".equals(statuz) || StringUtils.isBlank(statuz)) {
                                    dianUser.setStatuz(1);
                                } else if ("审核成功".equals(statuz)) {
                                    dianUser.setStatuz(2);
                                } else if ("审核失败".equals(statuz)) {
                                    dianUser.setStatuz(3);
                                }
                                Date createdTime = DateUtils.parseDate(created);
                                if(null == createdTime){
                                    failDetail.add("第" + index + "条：插入时间格式有误");
                                    index++;
                                    continue;
                                }
                                dianUser.setCreated(createdTime);
                                long count = dianUserDao.getRepeat(dianUser.getName());
                                if (count == 0) {
                                    super.save(dianUser);
                                    successCount++;
                                } else {
                                    failDetail.add("第" + index + "条：插入重复");
                                }
                                index++;
                            }
                        } catch (IOException ioe) {
                        }

                    } else if (".xlsx".equals(suffix)) {
                        try {
                            XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
                            XSSFSheet sheet = workbook.getSheetAt(0);
                            int rowNum = sheet.getLastRowNum();
                            total = rowNum;
                            for (int i = 1; i <= rowNum; i++) {
                                XSSFRow row = sheet.getRow(i);
                                // getCellValue获取内容
                                String name = row.getCell(0).getStringCellValue().trim();
                                String organizationCode = row.getCell(1).getStringCellValue().trim();
                                String businessCode = row.getCell(2).getStringCellValue().trim();
                                String seqNo = row.getCell(3).getStringCellValue().trim();
                                String linkedName = row.getCell(4).getStringCellValue().trim();
                                String linkedPhone = row.getCell(5).getStringCellValue().trim();
                                String statuz = row.getCell(6).getStringCellValue().trim();
                                String created = row.getCell(7).getStringCellValue().trim();
                                DianUser dianUser = new DianUser();
                                dianUser.setName(name);
                                dianUser.setOrganizationCode(organizationCode);
                                dianUser.setBusinessCode(businessCode);
                                dianUser.setSeqNo(seqNo);
                                dianUser.setLinkedName(linkedName);
                                if(!isMobile(linkedPhone)){
                                    failDetail.add("第" + index + "条：插入手机格式有误");
                                    index++;
                                    continue;
                                }
                                dianUser.setLinkedPhone(linkedPhone);
                                if ("待审核".equals(statuz) || StringUtils.isBlank(statuz)) {
                                    dianUser.setStatuz(1);
                                } else if ("审核成功".equals(statuz)) {
                                    dianUser.setStatuz(2);
                                } else if ("审核失败".equals(statuz)) {
                                    dianUser.setStatuz(3);
                                }
                                Date createdTime = DateUtils.parseDate(created);
                                if(null == createdTime){
                                    failDetail.add("第" + index + "条：插入时间格式有误");
                                    index++;
                                    break;
                                }
                                dianUser.setCreated(createdTime);
                                long count = dianUserDao.getRepeat(dianUser.getName());
                                if (count == 0) {
                                    super.save(dianUser);
                                    successCount++;
                                } else {
                                    failDetail.add("第" + index + "条：插入重复");
                                }
                                index++;
                            }
                        } catch (IOException ioe) {
                        }

                    }
                    result.put("code", 200);
                    result.put("failDetail", failDetail);
                    result.put("msg", "导入成功" + successCount + "条，失败" + (total-successCount) + "条<br>");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            result.put("code", 500);
            result.put("msg", "文件解析失败");
        }
        return result;
    }

}