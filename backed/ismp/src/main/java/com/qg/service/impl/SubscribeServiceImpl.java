package com.qg.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.qg.domain.Subscribe;
import com.qg.mapper.SubscribeMapper;
import com.qg.service.SubscribeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubscribeServiceImpl implements SubscribeService {

    @Autowired
    private SubscribeMapper subscribeMapper;

    /**
     * 用户关注某个开发商
     */
    @Override
    public boolean subscribe(Subscribe subscribe) {
        return subscribeMapper.insert(subscribe) > 0;
    }

    /**
     * 用户取消关注某个开发商
     */
    @Override
    public boolean unsubscribe(Subscribe subscribe) {
        return subscribeMapper.delete(
                new QueryWrapper<Subscribe>()
                        // 查找用户id
                        .eq("user_id", subscribe.getUserId())
                        // 查找开发商的id
                        .eq("developer_id", subscribe.getDeveloperId())
        ) > 0;
    }

    /**
     * 用户查看所有关注的开发商
     */
    @Override
    public List<Subscribe> findAllSubscribe(Long userId) {
        return subscribeMapper.selectList(
                // 查找用户id
                new QueryWrapper<Subscribe>().eq("user_id", userId)
        );
    }

}
