/*     */ package com.thinkgem.jeesite.modules.dljyzx.utils;
/*     */ 
/*     */ import java.io.PrintStream;
/*     */ import java.sql.Time;
/*     */ import java.sql.Timestamp;
/*     */ import java.text.ParseException;
/*     */ import java.text.SimpleDateFormat;
/*     */ import java.util.Calendar;
/*     */ 
/*     */ public class DateUtil
/*     */ {
/*     */   public static String getDateTime()
/*     */   {
/*  29 */     SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
/*  30 */     return sdf.format(new java.util.Date());
/*     */   }
/*     */ 
/*     */   public static String getNowDate(String format)
/*     */   {
/*  41 */     java.util.Date nowDate = new java.util.Date();
/*  42 */     SimpleDateFormat dateFormat = new SimpleDateFormat(format);
/*  43 */     return dateFormat.format(nowDate);
/*     */   }
/*     */ 
/*     */   public static Time getSqlTime()
/*     */   {
/*  53 */     return new Time(getTime());
/*     */   }
/*     */ 
/*     */   public static long getTime()
/*     */   {
/*  63 */     java.util.Date dt = new java.util.Date();
/*  64 */     return dt.getTime();
/*     */   }
/*     */ 
/*     */   public static java.util.Date getJavaDate()
/*     */   {
/*  74 */     return new java.util.Date();
/*     */   }
/*     */ 
/*     */   public static java.sql.Date getSqlDate()
/*     */   {
/*  84 */     return new java.sql.Date(getTime());
/*     */   }
/*     */ 
/*     */   public static Timestamp getTimestamp()
/*     */   {
/*  94 */     return new Timestamp(getTime());
/*     */   }
/*     */ 
/*     */   public static Calendar getCD()
/*     */   {
/* 104 */     Calendar mycd = Calendar.getInstance();
/* 105 */     return mycd;
/*     */   }
/*     */ 
/*     */   public static String getAll(String sStr)
/*     */   {
/* 116 */     Calendar mycd = Calendar.getInstance();
/* 117 */     return mycd.get(1) + sStr + (mycd.get(2) + 1) + 
/* 118 */       sStr + mycd.get(5);
/*     */   }
/*     */ 
/*     */   public static String getAll()
/*     */   {
/* 128 */     return getAll("-");
/*     */   }
/*     */ 
/*     */   public static int getYear()
/*     */   {
/* 138 */     Calendar mycd = Calendar.getInstance();
/* 139 */     return mycd.get(1);
/*     */   }
/*     */ 
/*     */   public static int getMonth()
/*     */   {
/* 149 */     Calendar mycd = Calendar.getInstance();
/* 150 */     return mycd.get(2) + 1;
/*     */   }
/*     */ 
/*     */   public static String getMonthBegin()
/*     */   {
/* 160 */     int month = getMonth();
/* 161 */     return getYear() + "-" + (month > 9 ? Integer.valueOf(month) : new StringBuilder("0").append(month).toString()) + "-01";
/*     */   }
/*     */ 
/*     */   public static String getMonthEnd()
/*     */   {
/* 171 */     int year = getYear();
/* 172 */     int month = getMonth();
/* 173 */     int days = 0;
/* 174 */     if ((month == 1) || (month == 3) || (month == 5) || (month == 7) || (month == 8) || (month == 10) || (month == 12))
/* 175 */       days = 31;
/* 176 */     else if ((month == 4) || (month == 6) || (month == 9) || (month == 11))
/* 177 */       days = 30;
/* 178 */     else if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
/* 179 */       days = 29;
/*     */     else {
/* 181 */       days = 28;
/*     */     }
/* 183 */     return getYear() + "-" + (month > 9 ? Integer.valueOf(month) : new StringBuilder("0").append(month).toString()) + "-" + days;
/*     */   }
/*     */ 
/*     */   public static String getMonthEnd(String theyear, String themonth)
/*     */   {
/* 193 */     int year = Integer.valueOf(theyear).intValue();
/* 194 */     int month = Integer.valueOf(themonth).intValue();
/* 195 */     int days = 0;
/* 196 */     if ((month == 1) || (month == 3) || (month == 5) || (month == 7) || (month == 8) || (month == 10) || (month == 12))
/* 197 */       days = 31;
/* 198 */     else if ((month == 4) || (month == 6) || (month == 9) || (month == 11))
/* 199 */       days = 30;
/* 200 */     else if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
/* 201 */       days = 29;
/*     */     else {
/* 203 */       days = 28;
/*     */     }
/* 205 */     return getYear() + "-" + (month > 9 ? Integer.valueOf(month) : new StringBuilder("0").append(month).toString()) + "-" + days;
/*     */   }
/*     */ 
/*     */   public static int getDate()
/*     */   {
/* 215 */     Calendar mycd = Calendar.getInstance();
/* 216 */     return mycd.get(5);
/*     */   }
/*     */ 
/*     */   public static int getAddYear()
/*     */   {
/* 226 */     return Calendar.getInstance().get(1);
/*     */   }
/*     */ 
/*     */   public static int getAddMonth()
/*     */   {
/* 236 */     return Calendar.getInstance().get(2) + 1;
/*     */   }
/*     */ 
/*     */   public static int getAddDate()
/*     */   {
/* 246 */     return Calendar.getInstance().get(5);
/*     */   }
/*     */ 
/*     */   public static String getMiddle()
/*     */   {
/* 256 */     return getMiddle("-");
/*     */   }
/*     */ 
/*     */   public static String getMiddleYM(String sStr)
/*     */   {
/* 266 */     Calendar mycd = Calendar.getInstance();
/* 267 */     int year = mycd.get(1);
/* 268 */     int month = mycd.get(2) + 1;
/* 269 */     String re = String.valueOf(year);
/* 270 */     if (month < 10)
/* 271 */       re = re + sStr + "0" + String.valueOf(month);
/*     */     else
/* 273 */       re = re + sStr + String.valueOf(month);
/* 274 */     return re;
/*     */   }
/*     */ 
/*     */   public static String getMiddle(String sStr)
/*     */   {
/* 284 */     Calendar mycd = Calendar.getInstance();
/* 285 */     int year = mycd.get(1);
/* 286 */     int month = mycd.get(2) + 1;
/* 287 */     int date = mycd.get(5);
/* 288 */     String re = String.valueOf(year);
/* 289 */     if (month < 10)
/* 290 */       re = re + sStr + "0" + String.valueOf(month);
/*     */     else
/* 292 */       re = re + sStr + String.valueOf(month);
/* 293 */     if (date < 10)
/* 294 */       re = re + sStr + "0" + String.valueOf(date);
/*     */     else
/* 296 */       re = re + sStr + String.valueOf(date);
/* 297 */     return re;
/*     */   }
/*     */ 
  /* public static String getTimeStr(String sStr)
   {
    Calendar mycd = Calendar.getInstance();
    String re = mycd.get(1);
    if (mycd.get(2) + 1 < 10)
    re = re + sStr + "0" + String.valueOf(mycd.get(2) + 1);
   else
      re = re + sStr + String.valueOf(mycd.get(2) + 1);
    if (mycd.get(5) < 10)
      re = re + sStr + "0" + String.valueOf(mycd.get(5));
    else {
       re = re + sStr + String.valueOf(mycd.get(5));
    }
     if (mycd.get(10) < 10)
      re = re + " 0" + String.valueOf(mycd.get(10));
    else
       re = re + " " + String.valueOf(mycd.get(10));
    if (mycd.get(12) < 10)
       re = re + ":0" + String.valueOf(mycd.get(12));
     else
       re = re + ":" + String.valueOf(mycd.get(12));
     if (mycd.get(13) < 10)
       re = re + ":0" + String.valueOf(mycd.get(13));
     else
       re = re + ":" + String.valueOf(mycd.get(13));
     return re;
   }*/
 
/*     */   public static int getDays(java.util.Date sd, java.util.Date ed)
/*     */   {
/* 343 */     return (int)((ed.getTime() - sd.getTime()) / 86400000L);
/*     */   }
/*     */ 
/*     */   public static String getTime(String s)
/*     */   {
/* 353 */     if ((s == null) || (s.equals("")))
/* 354 */       return "";
/* 355 */     String s1 = "";
/*     */     try {
/* 357 */       SimpleDateFormat simpledateformat = new SimpleDateFormat(s);
/* 358 */       s1 = simpledateformat.format(Calendar.getInstance().getTime());
/*     */     } catch (Exception exception) {
/* 360 */       System.out.println(Calendar.getInstance().toString() + 
/* 361 */         "cannot format time [function:getTime(String)]");
/* 362 */       exception.printStackTrace();
/*     */     }
/* 364 */     return s1;
/*     */   }
/*     */ 
/*     */   public static Timestamp getDateTime(String sDt)
/*     */   {
/*     */     try
/*     */     {
/* 375 */       return Timestamp.valueOf(sDt);
/*     */     } catch (IllegalArgumentException localIllegalArgumentException) {
/* 377 */       sDt = sDt + " 00:00:00";
/*     */       try {
/* 379 */         return Timestamp.valueOf(sDt); } catch (Exception localException) {  }
/*     */     }
/* 381 */     return null;
/*     */   }
/*     */ 
/*     */   public static java.sql.Date to_Date(Object obj)
/*     */   {
/* 394 */     if (obj != null) {
/* 395 */       return java.sql.Date.valueOf(toStr(obj));
/*     */     }
/* 397 */     return null;
/*     */   }
/*     */ 
  /* public static java.util.Date toDate(Object obj)
   {
    if (obj != null) {
       String s = ToolsSys.ObjIsNullToStr(obj);
      if (s.trim().length() == 10) {
        s = s.substring(0, 10) + " 00:00:00";
      }
      return getUtilDate(s, "yyyy-MM-dd HH:mm:ss");
     }
     return null;
   }*/
/*     */ 
/*     */   public static String toStr(Object obj)
/*     */   {
/* 426 */     String str = null;
/* 427 */     if (obj != null) {
/* 428 */       str = obj.toString().substring(0, 10);
/*     */     }
/* 430 */     return str;
/*     */   }
/*     */ 
/*     */   public static String getUtilDateString(java.util.Date date, String format)
/*     */   {
/* 441 */     SimpleDateFormat dateFormat = new SimpleDateFormat(format);
/* 442 */     String temp = "";
/* 443 */     temp = dateFormat.format(date);
/* 444 */     return temp;
/*     */   }
/*     */ 
/*     */   public static java.util.Date getUtilDate(String datestr, String format)
/*     */   {
/* 456 */     SimpleDateFormat dateFormat = new SimpleDateFormat(format);
/* 457 */     java.util.Date date = new java.util.Date();
/*     */     try {
/* 459 */       date = dateFormat.parse(datestr);
/*     */     } catch (ParseException e) {
/* 461 */       e.printStackTrace();
/*     */     }
/* 463 */     return date;
/*     */   }
/*     */ 
/*     */   public static java.util.Date addDays(java.util.Date date, int days)
/*     */   {
/* 475 */     Calendar cal = Calendar.getInstance();
/* 476 */     cal.setTime(date);
/* 477 */     cal.add(5, days);
/* 478 */     return cal.getTime();
/*     */   }
/*     */ 
/*     */   public static java.util.Date addMonths(java.util.Date date, int months)
/*     */   {
/* 490 */     Calendar cal = Calendar.getInstance();
/* 491 */     cal.setTime(date);
/* 492 */     cal.add(2, months);
/* 493 */     return cal.getTime();
/*     */   }
/*     */ 
/*     */   public static int getHsJiange(java.util.Date sd)
/*     */   {
/* 504 */     java.util.Date ed = new java.util.Date();
/* 505 */     return (int)(ed.getTime() - sd.getTime());
/*     */   }
/*     */ 
/*     */   public static int getHsJiange(java.util.Date sd, java.util.Date ed)
/*     */   {
/* 516 */     return (int)(ed.getTime() - sd.getTime());
/*     */   }
/*     */ }

/* Location:           C:\Users\lostpainting\Desktop\南瑞项目\SGUETrade\WEB-INF\repository\application\plugins\SGUETrade\ETradePublicUtils_1.0.0.jar
 * Qualified Name:     com.sgcc.dlsc.commons.util.DateUtil
 * JD-Core Version:    0.6.2
 */