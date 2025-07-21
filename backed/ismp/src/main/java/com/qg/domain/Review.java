package com.qg.domain;

import cn.hutool.core.date.DateTime;
import com.baomidou.mybatisplus.annotation.TableLogic;



public class Review {
    private long id;
    private long userId;
    private long softwareId;
    private String content;
    private DateTime time;
    @TableLogic
    private int isDeleted;


    public Review() {
    }

    public Review(long id, long userId, long softwareId, String content, DateTime time, int isDeleted) {
        this.id = id;
        this.userId = userId;
        this.softwareId = softwareId;
        this.content = content;
        this.time = time;
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
     * @return softwareId
     */
    public long getSoftwareId() {
        return softwareId;
    }

    /**
     * 设置
     * @param softwareId
     */
    public void setSoftwareId(long softwareId) {
        this.softwareId = softwareId;
    }

    /**
     * 获取
     * @return content
     */
    public String getContent() {
        return content;
    }

    /**
     * 设置
     * @param content
     */
    public void setContent(String content) {
        this.content = content;
    }

    /**
     * 获取
     * @return time
     */
    public DateTime getTime() {
        return time;
    }

    /**
     * 设置
     * @param time
     */
    public void setTime(DateTime time) {
        this.time = time;
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
        return "Review{id = " + id + ", userId = " + userId + ", softwareId = " + softwareId + ", content = " + content + ", time = " + time + ", isDeleted = " + isDeleted + "}";
    }
}
