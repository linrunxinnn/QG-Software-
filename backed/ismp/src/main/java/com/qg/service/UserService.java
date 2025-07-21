package com.qg.service;

import com.qg.domain.Result;
import com.qg.domain.User;


public interface UserService {
    Result loginByPassword(String email, String password);

    Result loginByCode(String email, String code);

    Result register(User user);
}
