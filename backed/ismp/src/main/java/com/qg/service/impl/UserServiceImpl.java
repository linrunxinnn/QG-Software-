package com.qg.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.qg.domain.Result;
import com.qg.domain.User;
import com.qg.mapper.UserMapper;
import com.qg.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.qg.domain.Code.CONFLICT;
import static com.qg.domain.Code.SUCCESS;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public Result loginByPassword(String email, String password) {

        LambdaQueryWrapper<User> lqw = new LambdaQueryWrapper<>();
        lqw.eq(User::getEmail, email).eq(User::getPassword,password);
        User loginUser = userMapper.selectOne(lqw);
        if(loginUser == null){
            return new Result(CONFLICT,"该邮箱未被注册");
        }
        return new Result(SUCCESS,"登录成功");
    }

    @Override
    public Result loginByCode(String email, String code) {

        return null;
    }

    @Override
    public Result register(User user) {
        LambdaQueryWrapper<User> lqw = new LambdaQueryWrapper<>();
        lqw.eq(User::getEmail, user.getEmail());
        User one = userMapper.selectOne(lqw);

        if (one != null) {
            return new Result(409,"该邮箱已被注册！");
        }

        userMapper.insert(user);

        return new Result(200,"恭喜你，注册成功！");
    }
}
