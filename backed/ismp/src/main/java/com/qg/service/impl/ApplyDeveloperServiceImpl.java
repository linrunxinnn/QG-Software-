package com.qg.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.qg.domain.ApplyDeveloper;
import com.qg.mapper.ApplyDeveloperMapper;
import com.qg.service.ApplyDeveloperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

@Service
public class ApplyDeveloperServiceImpl implements ApplyDeveloperService {
    @Autowired
    private ApplyDeveloperMapper applyDeveloperMapper;

    @Override
    public List<ApplyDeveloper> selectAllOrderByTime() {
        // 创建 Lambda 查询包装器
        LambdaQueryWrapper<ApplyDeveloper> wrapper = new LambdaQueryWrapper<>();
        // 按创建时间降序排序（DESC）
        wrapper.orderByDesc(ApplyDeveloper::getApplyTime);
        // 执行查询
        return applyDeveloperMapper.selectList(wrapper);
    }

    @Override
    public boolean add(ApplyDeveloper applyDeveloper) {
        return applyDeveloperMapper.insert(applyDeveloper) > 0;
    }



    @Override
    public boolean saveBatch(Collection<ApplyDeveloper> entityList, int batchSize) {
        return false;
    }

    @Override
    public boolean saveOrUpdateBatch(Collection<ApplyDeveloper> entityList, int batchSize) {
        return false;
    }

    @Override
    public boolean updateBatchById(Collection<ApplyDeveloper> entityList, int batchSize) {
        return false;
    }

    @Override
    public boolean saveOrUpdate(ApplyDeveloper entity) {
        return false;
    }

    @Override
    public ApplyDeveloper getOne(Wrapper<ApplyDeveloper> queryWrapper, boolean throwEx) {
        return null;
    }

    @Override
    public Optional<ApplyDeveloper> getOneOpt(Wrapper<ApplyDeveloper> queryWrapper, boolean throwEx) {
        return Optional.empty();
    }

    @Override
    public Map<String, Object> getMap(Wrapper<ApplyDeveloper> queryWrapper) {
        return Map.of();
    }

    @Override
    public <V> V getObj(Wrapper<ApplyDeveloper> queryWrapper, Function<? super Object, V> mapper) {
        return null;
    }

    @Override
    public BaseMapper<ApplyDeveloper> getBaseMapper() {
        return null;
    }

    @Override
    public Class<ApplyDeveloper> getEntityClass() {
        return null;
    }
}
