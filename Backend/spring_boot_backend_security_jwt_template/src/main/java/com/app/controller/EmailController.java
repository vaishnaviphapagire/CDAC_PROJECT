package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.EmailService;

@RestController
@RequestMapping("/email")
public class EmailController {


    @Autowired
    private EmailService emailService;

    @GetMapping("/send")
    public String sendEmail() {
    	String name = "Aniket";
    	String pass = "12345678";
//    	String text = "<!DOCTYPE html>\r\n"
//    			+ "<html>\r\n"
//    			+ "<head>\r\n"
//    			+ "    <meta charset=\"UTF-8\">\r\n"
//    			+ "    <title>Email</title>\r\n"
//    			+ "</head>\r\n"
//    			+ "<body>\r\n"
//    			+ "    <h1>Hello, "+name+"</h1>\r\n"
//    			+ "    <p>Your credentials are as follows:</p>\r\n"
//    			+ "    <p><strong>Username:</strong> "+name+"</p>\r\n"
//    			+ "    <p><strong>Password:</strong> "+pass+"</p>\r\n"
//    			+ "    <p>You can access your account at <a href=\"https://testmatrix.com\">TestMatrix</a>.</p>\r\n"
//    			+ "    <p>Best regards,<br>TestMatrix Team</p>\r\n"
//    			+ "</body>\r\n"
//    			+ "</html>";
    	
    	String text = "<!DOCTYPE html>\r\n"
    			+ "<html>\r\n"
    			+ "<head>\r\n"
    			+ "    <meta charset=\"UTF-8\">\r\n"
    			+ "    <title>Email</title>\r\n"
    			+ "    <style>\r\n"
    			+ "        .footer {\r\n"
    			+ "            margin-top: 20px;\r\n"
    			+ "            padding-top: 10px;\r\n"
    			+ "            border-top: 1px solid #ddd;\r\n"
    			+ "            text-align: center;\r\n"
    			+ "            font-size: 12px;\r\n"
    			+ "            color: #888;\r\n"
    			+ "        }\r\n"
    			+ "        .footer img {\r\n"
    			+ "            max-width: 150px;\r\n"
    			+ "            height: auto;\r\n"
    			+ "        }\r\n"
    			+ "    </style>\r\n"
    			+ "</head>\r\n"
    			+ "<body>\r\n"
    			+ "    <h2>Hello, "+name+"!</h2>\r\n"
    			+ "    <p>Your credentials are as follows:</p>\r\n"
    			+ "    <p><strong>Username:</strong>"+name+"</p>\r\n"
    			+ "    <p><strong>Password:</strong>"+pass+"</p>\r\n"
    			+ "    <p>You can access your account at <a href=\"https://testmatrix.com\">TestMatrix</a>.</p>\r\n"
    			+ "    <p>Best regards,<br>TestMatrix Team</p>\r\n"
    			+ "    \r\n"
    			+ "    <!-- Footer Section -->\r\n"
    			+ "    <div class=\"footer\">\r\n"
    			+ "        <p>© {{currentYear}} TestMatrix. All rights reserved.</p>\r\n"
    			+ "        <img src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEUHYzHOmJl0nPCgCa0HsrFFhyBkonPcKpNg&s\" alt=\"TestMatrix Logo\"/>\r\n"
    			+ "    </div>\r\n"
    			+ "</body>\r\n"
    			+ "</html>\r\n";
        emailService.sendSimpleMessage("nikita789teke@gmail.com", "Test Subject",text);
        return "Email sent successfully";
    }
}
