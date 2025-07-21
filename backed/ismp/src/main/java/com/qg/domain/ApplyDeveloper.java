package com.qg.domain;

import cn.hutool.core.date.DateTime;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@TableName("apply_developer")
@NoArgsConstructor
@AllArgsConstructor
public class ApplyDeveloper {
    private long id;
    private long userId;
    private DateTime applyTime;
    private String reason;
    private String material;
    private Integer status;
}
