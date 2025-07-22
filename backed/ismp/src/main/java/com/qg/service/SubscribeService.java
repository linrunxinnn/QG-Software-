package com.qg.service;

import com.qg.domain.Subscribe;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface SubscribeService {
    boolean subscribe(Subscribe subscribe);

    boolean unsubscribe(Subscribe subscribe);

    List<Subscribe> findAllSubscribe(Long userId);
}
