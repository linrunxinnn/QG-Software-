package com.qg.domain;

import cn.hutool.core.date.DateTime;
import com.baomidou.mybatisplus.annotation.TableLogic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    private long id;
    private long softwareId;
    private double price;
    private DateTime time;
    private long userId;
    private long developerId;
    @TableLogic
    private int isDeleted;
}
