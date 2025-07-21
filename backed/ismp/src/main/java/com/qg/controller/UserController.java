package com.qg.controller;


import com.qg.domain.Result;
import com.qg.domain.User;
import com.qg.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/password")
    public Result loginByPassword(@RequestParam String email, @RequestParam String password) {
        return userService.loginByPassword(email,password);
    }

    @GetMapping("/code")
    public Result loginByCode(@RequestParam String email, @RequestParam String code) {
        return userService.loginByCode(email,code);
    }

    @PostMapping
    public Result register(@RequestBody User user) {
        return userService.register(user);
    }

}
