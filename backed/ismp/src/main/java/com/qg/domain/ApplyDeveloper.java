package com.qg.domain;

import cn.hutool.core.date.DateTime;
import com.baomidou.mybatisplus.annotation.TableName;



@TableName("apply_developer")
public class ApplyDeveloper {
    private long id;
    private long userId;
    private DateTime applyTime;
    private String reason;
    private String material;
    private Integer status;

    public ApplyDeveloper() {
    }

    public ApplyDeveloper(long id, long userId, DateTime applyTime, String reason, String material, Integer status) {
        this.id = id;
        this.userId = userId;
        this.applyTime = applyTime;
        this.reason = reason;
        this.material = material;
        this.status = status;
    }

    /**
     * 获取
     * @return id
     */
    public long getId() {
        return id;
    }

    /**
     * 设置
     * @param id
     */
    public void setId(long id) {
        this.id = id;
    }

    /**
     * 获取
     * @return userId
     */
    public long getUserId() {
        return userId;
    }

    /**
     * 设置
     * @param userId
     */
    public void setUserId(long userId) {
        this.userId = userId;
    }

    /**
     * 获取
     * @return applyTime
     */
    public DateTime getApplyTime() {
        return applyTime;
    }

    /**
     * 设置
     * @param applyTime
     */
    public void setApplyTime(DateTime applyTime) {
        this.applyTime = applyTime;
    }

    /**
     * 获取
     * @return reason
     */
    public String getReason() {
        return reason;
    }

    /**
     * 设置
     * @param reason
     */
    public void setReason(String reason) {
        this.reason = reason;
    }

    /**
     * 获取
     * @return material
     */
    public String getMaterial() {
        return material;
    }

    /**
     * 设置
     * @param material
     */
    public void setMaterial(String material) {
        this.material = material;
    }

    /**
     * 获取
     * @return status
     */
    public Integer getStatus() {
        return status;
    }

    /**
     * 设置
     * @param status
     */
    public void setStatus(Integer status) {
        this.status = status;
    }

    public String toString() {
        return "ApplyDeveloper{id = " + id + ", userId = " + userId + ", applyTime = " + applyTime + ", reason = " + reason + ", material = " + material + ", status = " + status + "}";
    }
}
