package com.qg.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.qg.domain.ApplyDeveloper;

import java.util.List;

public interface ApplyDeveloperService extends IService<ApplyDeveloper> {
    /**
     * 按照申请时间查询所有申请
     */
    List<ApplyDeveloper> selectAllOrderByTime();

    boolean add(ApplyDeveloper applyDeveloper);

}
