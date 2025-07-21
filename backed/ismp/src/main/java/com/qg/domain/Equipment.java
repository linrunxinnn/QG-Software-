package com.qg.domain;




public class Equipment {
    private long id;
    private long userId;
    private long softwareId;
    private Integer status;
    private String code1;
    private String code2;
    private String code3;

    public Equipment() {
    }

    public Equipment(long id, long userId, long softwareId, Integer status, String code1, String code2, String code3) {
        this.id = id;
        this.userId = userId;
        this.softwareId = softwareId;
        this.status = status;
        this.code1 = code1;
        this.code2 = code2;
        this.code3 = code3;
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
     * @return code1
     */
    public String getCode1() {
        return code1;
    }

    /**
     * 设置
     * @param code1
     */
    public void setCode1(String code1) {
        this.code1 = code1;
    }

    /**
     * 获取
     * @return code2
     */
    public String getCode2() {
        return code2;
    }

    /**
     * 设置
     * @param code2
     */
    public void setCode2(String code2) {
        this.code2 = code2;
    }

    /**
     * 获取
     * @return code3
     */
    public String getCode3() {
        return code3;
    }

    /**
     * 设置
     * @param code3
     */
    public void setCode3(String code3) {
        this.code3 = code3;
    }

    public String toString() {
        return "Equipment{id = " + id + ", userId = " + userId + ", softwareId = " + softwareId + ", status = " + status + ", code1 = " + code1 + ", code2 = " + code2 + ", code3 = " + code3 + "}";
    }
}
