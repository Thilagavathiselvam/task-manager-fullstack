package com.taskmanager.service;

import com.taskmanager.model.User;
import com.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register User
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    // Login User
    public User loginUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    // Get User By Username
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Get User By Email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}