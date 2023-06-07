package com.example.springchatroombackend.controller;


import com.example.springchatroombackend.model.InboundMessage;
import com.example.springchatroombackend.repository.MessageRepository;
import com.example.springchatroombackend.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
public class MainController {

    private final MessageRepository messageRepository;

    @Autowired
    public MainController(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @MessageMapping("/sendMessage")
    @SendTo("/topic/chat")
    public Message greeting(InboundMessage inboundMessage) {
        Message message = new Message(inboundMessage.getName(), inboundMessage.getText(), LocalDateTime.now());
        messageRepository.save(message);
        return message;
    }

}
