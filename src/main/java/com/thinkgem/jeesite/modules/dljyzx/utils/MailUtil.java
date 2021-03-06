package com.thinkgem.jeesite.modules.dljyzx.utils;

import com.thinkgem.jeesite.common.config.Global;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;

/**
 *  邮件发送工具类
 *
 * @author XuanMing
 * @create 2019/5/22 15:33
 **/
public class MailUtil {

    public static final Logger logger = LoggerFactory.getLogger(MailUtil.class);

    /**
     * 发送邮件
     * @param toEmail  收件人邮箱地址
     * @param subject 邮件标题
     * @param content  邮件内容 可以是html内容
     */
    public static void send(String toEmail, String subject, String content) throws MessagingException {
        logger.info("发送邮件,目标邮箱为：" + toEmail);
        logger.info("内容为：" + content);
        Session session = loadMailSession();
        // session.setDebug(true);
        // 创建邮件消息
        MimeMessage message = new MimeMessage(session);
        try {
            // 设置发件人
            message.setFrom(new InternetAddress(Global.getConfig("email.account")));
            Address[] a = new Address[1];
            a[0] = new InternetAddress(Global.getConfig("email.account"));
            message.setReplyTo(a);
            // 设置收件人
            InternetAddress to = new InternetAddress(toEmail);
            message.setRecipient(MimeMessage.RecipientType.TO, to);
            // 设置邮件标题
            message.setSubject(subject);
            // 设置邮件的内容体
            message.setContent(content, "text/html;charset=UTF-8");
            // 发送邮件
            Transport.send(message);
        } catch (MessagingException e) {
            logger.error(e.toString());
            throw e;
        }
    }


    /**
     * 发送邮件 带附件
     * @param toEmail  收件人邮箱地址
     * @param subject  邮件标题
     * @param content  邮件内容 可以是html内容
     * @param attachPath 附件路径
     */
    public void send(String toEmail, String subject, String content, String attachPath) {
        Session session = loadMailSession();

        MimeMessage mm = new MimeMessage(session);
        try {
            //发件人
            mm.setFrom(new InternetAddress(Global.getConfig("email.account")));
            //收件人
            mm.setRecipient(Message.RecipientType.TO, new InternetAddress(toEmail)); // 设置收件人
            // mm.setRecipient(Message.RecipientType.CC, new
            // InternetAddress("XXXX@qq.com")); //设置抄送人
            //标题
            mm.setSubject(subject);
            //内容
            Multipart multipart = new MimeMultipart();
            //body部分
            BodyPart contentPart = new MimeBodyPart();
            contentPart.setContent(content, "text/html;charset=utf-8");
            multipart.addBodyPart(contentPart);

            //附件部分
            BodyPart attachPart = new MimeBodyPart();
            FileDataSource fileDataSource = new FileDataSource(attachPath);
            attachPart.setDataHandler(new DataHandler(fileDataSource));
            attachPart.setFileName(MimeUtility.encodeText(fileDataSource.getName()));
            multipart.addBodyPart(attachPart);

            mm.setContent(multipart);
            Transport.send(mm);
        } catch (Exception e) {
            String err = e.getMessage();
            // 在这里处理message内容， 格式是固定的
            System.out.println(err);
        }

    }

    private static Session loadMailSession() {
        try {
            // 配置发送邮件的环境属性
            final Properties props = new Properties();
            // 表示SMTP发送邮件，需要进行身份验证
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.host", Global.getConfig("email.host"));
            props.put("mail.smtp.port",Global.getConfig("email.port"));
            // 如果使用ssl，则去掉使用25端口的配置，进行如下配置,
//            props.put("mail.smtp.socketFactory.class","javax.net.ssl.SSLSocketFactory");
//            props.put("mail.smtp.socketFactory.port", "465");
//            props.put("mail.smtp.port", "465");
            // 发件人的账号
            props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
            props.setProperty("mail.smtp.socketFactory.fallback", "false");
            //邮箱发送服务器端口,这里设置为465端口
            props.setProperty("mail.smtp.socketFactory.port", Global.getConfig("email.port"));
            props.put("mail.user",Global.getConfig("email.account"));
            // 访问SMTP服务时需要提供的密码
            props.put("mail.password",Global.getConfig("email.password"));
            // 构建授权信息，用于进行SMTP进行身份验证
            Authenticator authenticator = new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    // 用户名、密码
                    String userName = props.getProperty("mail.user");
                    String password = props.getProperty("mail.password");
                    return new PasswordAuthentication(userName, password);
                }
            };
            // 使用环境属性和授权信息，创建邮件会话
            return Session.getInstance(props, authenticator);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("mail session is null");
        }
        return null;
    }

}
