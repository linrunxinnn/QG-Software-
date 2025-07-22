package com.qg.controller;

import com.qg.service.BanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ban")
public class BanController {

    @Autowired
    private BanService banService;
}
