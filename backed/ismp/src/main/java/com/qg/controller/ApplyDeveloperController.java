package com.qg.controller;

import com.qg.domain.ApplyDeveloper;
import com.qg.domain.Code;
import com.qg.domain.Result;
import com.qg.service.ApplyDeveloperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applyDeveloper")
public class ApplyDeveloperController {

    @Autowired
    private ApplyDeveloperService applyDeveloperService;

    @GetMapping
    public Result selectAllOrderByTime() {
        List<ApplyDeveloper> applyDevelopers = applyDeveloperService.selectAllOrderByTime();
        Integer code = applyDevelopers != null && !applyDevelopers.isEmpty() ? Code.SUCCESS : Code.NOT_FOUND;
        String msg = applyDevelopers != null && !applyDevelopers.isEmpty() ? "" : "暂时未有相关数据";
        return new Result(code, applyDevelopers, msg);
    }

    @PostMapping
    public Result addApplyDeveloper(@RequestBody ApplyDeveloper applyDeveloper) {
        boolean flag = applyDeveloperService.add(applyDeveloper);
        Integer code = flag ? Code.SUCCESS : Code.INTERNAL_ERROR;
        String msg = flag ? "" : "添加失败，请稍后重试！";
        return new Result(code, msg);
    }

    @DeleteMapping
    public Result deleteApplyDeveloper(@RequestBody ApplyDeveloper applyDeveloper) {
        boolean flag = applyDeveloperService.removeById(applyDeveloper.getId());
        Integer code = flag ? Code.SUCCESS : Code.INTERNAL_ERROR;
        String msg = flag ? "" : "删除失败，请稍后重试！";
        return new Result(code, msg);
    }

}
