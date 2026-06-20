package com.taskmanager.controller;

import com.taskmanager.model.LoginRequest;
import com.taskmanager.model.User;
import com.taskmanager.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    // Register
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {

        if(user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        return userService.registerUser(user);
    }

    // Login
    @PostMapping("/login")
    public String loginUser(@RequestBody LoginRequest request) {

        User user = userService.loginUser(
                request.getEmail(),
                request.getPassword()
        );

        if(user != null) {
            return "Login Success - Role: " + user.getRole();
        }

        return "Invalid Email or Password";
    }

    @GetMapping("/test")
    public String test() {
        return "Authentication Controller Working";
    }
}