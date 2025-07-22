package com.qg.controller;

import com.qg.service.ApplySoftwareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/applySoftware")
public class ApplySoftwareController {

    @Autowired
    private ApplySoftwareService applySoftwareService;
}
