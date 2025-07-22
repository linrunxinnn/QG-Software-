package com.qg.domain;

import cn.hutool.core.date.DateTime;
import com.baomidou.mybatisplus.annotation.TableLogic;


public class Software {
    private long id;
    private DateTime publishedTime;
    private long authorId;
    private String info;
    private double price;
    private String link;
    private String introduction;
    private String version;
    private String installDetail;
    private Integer status;
    private String picture;
    private String type;
    private String name;
    @TableLogic
    private int isDeleted;

    public Software() {
    }

    public Software(long id, DateTime publishedTime, long authorId, String info, double price, String link, String introduction, String version, String installDetail, Integer status, String picture, String type, int isDeleted) {
        this.id = id;
        this.publishedTime = publishedTime;
        this.authorId = authorId;
        this.info = info;
        this.price = price;
        this.link = link;
        this.introduction = introduction;
        this.version = version;
        this.installDetail = installDetail;
        this.status = status;
        this.picture = picture;
        this.type = type;
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
     * @return publishedTime
     */
    public DateTime getPublishedTime() {
        return publishedTime;
    }

    /**
     * 设置
     * @param publishedTime
     */
    public void setPublishedTime(DateTime publishedTime) {
        this.publishedTime = publishedTime;
    }

    /**
     * 获取
     * @return authorId
     */
    public long getAuthorId() {
        return authorId;
    }

    /**
     * 设置
     * @param authorId
     */
    public void setAuthorId(long authorId) {
        this.authorId = authorId;
    }

    /**
     * 获取
     * @return info
     */
    public String getInfo() {
        return info;
    }

    /**
     * 设置
     * @param info
     */
    public void setInfo(String info) {
        this.info = info;
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
     * @return link
     */
    public String getLink() {
        return link;
    }

    /**
     * 设置
     * @param link
     */
    public void setLink(String link) {
        this.link = link;
    }

    /**
     * 获取
     * @return introduction
     */
    public String getIntroduction() {
        return introduction;
    }

    /**
     * 设置
     * @param introduction
     */
    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    /**
     * 获取
     * @return version
     */
    public String getVersion() {
        return version;
    }

    /**
     * 设置
     * @param version
     */
    public void setVersion(String version) {
        this.version = version;
    }

    /**
     * 获取
     * @return installDetail
     */
    public String getInstallDetail() {
        return installDetail;
    }

    /**
     * 设置
     * @param installDetail
     */
    public void setInstallDetail(String installDetail) {
        this.installDetail = installDetail;
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

    /**
     * 获取
     * @return picture
     */
    public String getPicture() {
        return picture;
    }

    /**
     * 设置
     * @param picture
     */
    public void setPicture(String picture) {
        this.picture = picture;
    }

    /**
     * 获取
     * @return type
     */
    public String getType() {
        return type;
    }

    /**
     * 设置
     * @param type
     */
    public void setType(String type) {
        this.type = type;
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
        return "Software{id = " + id + ", publishedTime = " + publishedTime + ", authorId = " + authorId + ", info = " + info + ", price = " + price + ", link = " + link + ", introduction = " + introduction + ", version = " + version + ", installDetail = " + installDetail + ", status = " + status + ", picture = " + picture + ", type = " + type + ", isDeleted = " + isDeleted + "}";
    }
}
