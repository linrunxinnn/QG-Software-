package com.qg.domain;

import cn.hutool.core.date.DateTime;
import com.baomidou.mybatisplus.annotation.TableLogic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ban {
    private long id;
    private long userId;
    private DateTime startTime;
    private DateTime endTime;
    private String reason;
    @TableLogic
    private int isDeleted;
}
