package com.example.springchatroombackend.repository;

import com.example.springchatroombackend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Integer> {
}
