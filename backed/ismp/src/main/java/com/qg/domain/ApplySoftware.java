package com.qg.domain;


import com.baomidou.mybatisplus.annotation.TableName;

@TableName("apply_software")
public class ApplySoftware {
    private Long id;
    private long userId;
    private String reason;
    private String material;
    private Integer status;
    private Long softwareId;

<<<<<<< HEAD
=======
    public ApplySoftware() {
    }

    public ApplySoftware(Long id, long userId, String reason, String material, Integer status, Long softwareId) {
        this.id = id;
        this.userId = userId;
        this.reason = reason;
        this.material = material;
        this.status = status;
        this.softwareId = softwareId;
    }

    /**
     * 获取
     * @return id
     */
>>>>>>> upstream/main
    public Long getId() {
        return id;
    }

<<<<<<< HEAD
=======
    /**
     * 设置
     * @param id
     */
>>>>>>> upstream/main
    public void setId(Long id) {
        this.id = id;
    }

<<<<<<< HEAD
=======
    /**
     * 获取
     * @return userId
     */
>>>>>>> upstream/main
    public long getUserId() {
        return userId;
    }

<<<<<<< HEAD
=======
    /**
     * 设置
     * @param userId
     */
>>>>>>> upstream/main
    public void setUserId(long userId) {
        this.userId = userId;
    }

<<<<<<< HEAD
=======
    /**
     * 获取
     * @return reason
     */
>>>>>>> upstream/main
    public String getReason() {
        return reason;
    }

<<<<<<< HEAD
=======
    /**
     * 设置
     * @param reason
     */
>>>>>>> upstream/main
    public void setReason(String reason) {
        this.reason = reason;
    }

<<<<<<< HEAD
=======
    /**
     * 获取
     * @return material
     */
>>>>>>> upstream/main
    public String getMaterial() {
        return material;
    }

<<<<<<< HEAD
=======
    /**
     * 设置
     * @param material
     */
>>>>>>> upstream/main
    public void setMaterial(String material) {
        this.material = material;
    }

<<<<<<< HEAD
=======
    /**
     * 获取
     * @return status
     */
>>>>>>> upstream/main
    public Integer getStatus() {
        return status;
    }

<<<<<<< HEAD
=======
    /**
     * 设置
     * @param status
     */
>>>>>>> upstream/main
    public void setStatus(Integer status) {
        this.status = status;
    }

<<<<<<< HEAD
=======
    /**
     * 获取
     * @return softwareId
     */
>>>>>>> upstream/main
    public Long getSoftwareId() {
        return softwareId;
    }

<<<<<<< HEAD
    public void setSoftwareId(Long softwareId) {
        this.softwareId = softwareId;
    }
=======
    /**
     * 设置
     * @param softwareId
     */
    public void setSoftwareId(Long softwareId) {
        this.softwareId = softwareId;
    }

    public String toString() {
        return "ApplySoftware{id = " + id + ", userId = " + userId + ", reason = " + reason + ", material = " + material + ", status = " + status + ", softwareId = " + softwareId + "}";
    }
>>>>>>> upstream/main
}
