package com.qg.service.impl;

import com.qg.domain.Code;
import com.qg.domain.Result;
import com.qg.domain.Software;
import com.qg.mapper.SoftwareMapper;
import com.qg.service.SoftwareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SoftwareServceImpl implements SoftwareService {
    @Autowired
    private SoftwareMapper softwareMapper;

    //审核前需要先上传app信息
    public int addSoftware(Software software) {
        int sum = 0;
        sum=softwareMapper.insert(software);
        return sum;
    }

    //
}
