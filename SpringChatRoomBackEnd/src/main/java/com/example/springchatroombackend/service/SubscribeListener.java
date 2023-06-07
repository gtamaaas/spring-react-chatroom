package com.example.springchatroombackend.service;


import com.example.springchatroombackend.model.Message;
import com.example.springchatroombackend.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import java.util.Collection;
import java.util.List;

@Controller
public class SubscribeListener {

//    @Autowired
//    private SimpMessagingTemplate template;

    @Autowired
    private MessageRepository messageRepository;
//    @EventListener
//    public void handleSubscribeEvent(SessionSubscribeEvent event) {
//        List<Message> messages = messageRepository.findAll();
//        template.convertAndSend("/topic/chat", messages);
//    }

    @SubscribeMapping("/chat")
    public Collection<Message> chatInit() {
        List<Message> messages = messageRepository.findAll();
        return messages;
    }


}
