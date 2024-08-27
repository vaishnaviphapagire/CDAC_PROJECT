package com.app.serviceImpl;



import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.service.EmailService;

@Service
@Transactional
public class EmailServiceImpl implements EmailService {

	@Autowired
	JavaMailSender javaMailSender;
	
	@Override
	public void sendSimpleMessage(String to, String subject, String text) {
//		  SimpleMailMessage message = new SimpleMailMessage();
//	        message.setTo(to);
//	        message.setSubject(subject);
//	        message.setText(text);
//	        javaMailSender.send(message);

		
		 MimeMessage message = javaMailSender.createMimeMessage();
	        try {
	            MimeMessageHelper helper = new MimeMessageHelper(message, true);
	            helper.setTo(to);
	            helper.setSubject(subject);
	            helper.setText(text, true); // true indicates that the text is HTML
	            javaMailSender.send(message);
	        } catch (MessagingException e) {
	            e.printStackTrace(); // Handle the exception appropriately
	        }
	    }
	}


