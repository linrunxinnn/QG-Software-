package com.qg.domain;

import cn.hutool.core.date.DateTime;
import com.baomidou.mybatisplus.annotation.TableLogic;



public class Ban {
    private long id;
    private long userId;
    private DateTime startTime;
    private DateTime endTime;
    private String reason;
    @TableLogic
    private int isDeleted;

    public Ban() {
    }

    public Ban(long id, long userId, DateTime startTime, DateTime endTime, String reason, int isDeleted) {
        this.id = id;
        this.userId = userId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.reason = reason;
        this.isDeleted = isDeleted;
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
     * @return startTime
     */
    public DateTime getStartTime() {
        return startTime;
    }

    /**
     * 设置
     * @param startTime
     */
    public void setStartTime(DateTime startTime) {
        this.startTime = startTime;
    }

    /**
     * 获取
     * @return endTime
     */
    public DateTime getEndTime() {
        return endTime;
    }

    /**
     * 设置
     * @param endTime
     */
    public void setEndTime(DateTime endTime) {
        this.endTime = endTime;
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
     * @return isDeleted
     */
    public int getIsDeleted() {
        return isDeleted;
    }

    /**
     * 设置
     * @param isDeleted
     */
    public void setIsDeleted(int isDeleted) {
        this.isDeleted = isDeleted;
    }

    public String toString() {
        return "Ban{id = " + id + ", userId = " + userId + ", startTime = " + startTime + ", endTime = " + endTime + ", reason = " + reason + ", isDeleted = " + isDeleted + "}";
    }
}
