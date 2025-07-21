package com.qg.domain;

import cn.hutool.core.date.DateTime;
import com.baomidou.mybatisplus.annotation.TableLogic;


public class Order {
    private long id;
    private long softwareId;
    private double price;
    private DateTime time;
    private long userId;
    private long developerId;
    @TableLogic
    private int isDeleted;

    public Order() {
    }

    public Order(long id, long softwareId, double price, DateTime time, long userId, long developerId, int isDeleted) {
        this.id = id;
        this.softwareId = softwareId;
        this.price = price;
        this.time = time;
        this.userId = userId;
        this.developerId = developerId;
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
     * @return price
     */
    public double getPrice() {
        return price;
    }

    /**
     * 设置
     * @param price
     */
    public void setPrice(double price) {
        this.price = price;
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
     * @return developerId
     */
    public long getDeveloperId() {
        return developerId;
    }

    /**
     * 设置
     * @param developerId
     */
    public void setDeveloperId(long developerId) {
        this.developerId = developerId;
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
        return "Order{id = " + id + ", softwareId = " + softwareId + ", price = " + price + ", time = " + time + ", userId = " + userId + ", developerId = " + developerId + ", isDeleted = " + isDeleted + "}";
    }
}
