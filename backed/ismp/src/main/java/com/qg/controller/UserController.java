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

    @GetMapping("/{email}/{password}")
    public Result loginByPassword(@PathVariable String email, @PathVariable String password) {
        return userService.loginByPassword(email,password);
    }

    @GetMapping("/{email}/{code}")
    public Result loginByCode(@PathVariable String email, @PathVariable String code) {
        return userService.loginByCode(email,code);
    }

    @PostMapping
    public Result register(@RequestBody User user) {
        return userService.register(user);
    }

}
