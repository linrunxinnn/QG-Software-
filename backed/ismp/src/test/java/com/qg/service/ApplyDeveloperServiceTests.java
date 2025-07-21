package com.qg.service;

import com.qg.domain.ApplyDeveloper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@SpringBootTest
public class ApplyDeveloperServiceTests {
    @Autowired
    private ApplyDeveloperService applyDeveloperService;

    @Test
    public void getOrderByTime(){
        List<ApplyDeveloper> applyDevelopers = applyDeveloperService.selectAllOrderByTime();
        System.out.println(applyDevelopers);
    }

    @Test
    public void addApplyDeveloper(){
        ApplyDeveloper applyDeveloper = new ApplyDeveloper();
        //3.获取当前时间
        LocalDateTime now = LocalDateTime.now();
        //定义时间格式
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        //格式化时间
        String formattedDateTime = now.format(formatter);
        //applyDeveloper.setApplyTime(formattedDateTime);
        applyDeveloperService.add(applyDeveloper);

    }

    @Test
    public void deleteApplyDeveloper(){

    }
}
