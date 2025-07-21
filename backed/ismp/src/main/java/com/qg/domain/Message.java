package com.qg.domain;

import cn.hutool.core.date.DateTime;
import com.baomidou.mybatisplus.annotation.TableLogic;



public class Message {
    private long id;
    private long receiverId;
    private long posterId;
    private String content;
    private DateTime time;
    private Integer isRead;
    @TableLogic
    private int isDeleted;

    public Message() {
    }

    public Message(long id, long receiverId, long posterId, String content, DateTime time, Integer isRead, int isDeleted) {
        this.id = id;
        this.receiverId = receiverId;
        this.posterId = posterId;
        this.content = content;
        this.time = time;
        this.isRead = isRead;
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
     * @return receiverId
     */
    public long getReceiverId() {
        return receiverId;
    }

    /**
     * 设置
     * @param receiverId
     */
    public void setReceiverId(long receiverId) {
        this.receiverId = receiverId;
    }

    /**
     * 获取
     * @return posterId
     */
    public long getPosterId() {
        return posterId;
    }

    /**
     * 设置
     * @param posterId
     */
    public void setPosterId(long posterId) {
        this.posterId = posterId;
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
     * @return isRead
     */
    public Integer getIsRead() {
        return isRead;
    }

    /**
     * 设置
     * @param isRead
     */
    public void setIsRead(Integer isRead) {
        this.isRead = isRead;
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
        return "Message{id = " + id + ", receiverId = " + receiverId + ", posterId = " + posterId + ", content = " + content + ", time = " + time + ", isRead = " + isRead + ", isDeleted = " + isDeleted + "}";
    }
}
