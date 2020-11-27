package com.thinkgem.jeesite.modules.dljyzx.utils;


import java.io.*;
import java.util.List;


public class CsvUtils {
    /**
     * CSV文件生成方法
     *
     * @param head
     * @param dataList
     * @param outPutPath
     * @param filename
     * @return
     */
    public static File createCSVFile(List<Object> head, List<List<Object>> dataList, String outPutPath, String filename) {
        File csvFile = null;
        BufferedWriter csvWtriter = null;
        try {
            csvFile = new File(outPutPath + File.separator + filename + ".csv");
            File parent = csvFile.getParentFile();
            if (parent != null && !parent.exists()) {
                parent.mkdirs();
            }
            csvFile.createNewFile();

            // GB2312使正确读取分隔符","
            csvWtriter = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(csvFile), "GBK"), 1024);
            // 写入文件头部
            writeRow(head, csvWtriter);

            // 写入文件内容
            for (List<Object> row : dataList) {
                writeRow(row, csvWtriter);
            }
            csvWtriter.flush();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                csvWtriter.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return csvFile;
    }

    /**
     * 写一行数据方法
     *
     * @param row
     * @param csvWriter
     * @throws IOException
     */
    private static void writeRow(List<Object> row, BufferedWriter csvWriter) throws IOException {
        // 写入文件头部
        for (Object data : row) {
            StringBuffer buf = new StringBuffer();
            String rowStr = buf.append("\"").append(data).append("\t\",").toString();
            csvWriter.write(rowStr);
        }
        csvWriter.newLine();
    }


}