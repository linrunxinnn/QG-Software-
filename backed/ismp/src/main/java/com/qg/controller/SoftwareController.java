package com.qg.controller;

import com.qg.domain.Code;
import com.qg.domain.Result;
import com.qg.domain.Software;
import com.qg.service.SoftwareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/softwares")
public class SoftwareController {

    @Autowired
    private SoftwareService softwareService;

    @PostMapping
    public Result addSoftware(@RequestBody Software software) {
        int sum = softwareService.addSoftware(software);
        if(sum>0){
            Result result = new Result(Code.SUCCESS,"软件上传成功！");
            return result;
        }
        else {
            Result result = new Result(Code.BAD_REQUEST,"软件上传失败！");
            return result;
        }
    }



}
