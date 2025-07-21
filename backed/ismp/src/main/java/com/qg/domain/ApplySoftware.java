package com.qg.domain;


import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@TableName("apply_software")
public class ApplySoftware {
    private Long id;
    private long userId;
    private String reason;
    private String material;
    private int status;
    private Long softwareId;
}
