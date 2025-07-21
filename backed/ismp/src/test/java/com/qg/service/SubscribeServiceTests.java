package com.qg.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SubscribeServiceTests {

    @Autowired
    private SubscribeService subscribeService;

    @Test
    public void subscribeTest() {
        subscribeService.findAllSubscribe(2L).forEach(System.out::println);
    }
}
