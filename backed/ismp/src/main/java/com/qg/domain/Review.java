package com.qg.domain;

import cn.hutool.core.date.DateTime;
import com.baomidou.mybatisplus.annotation.TableLogic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    private long id;
    private long userId;
    private long softwareId;
    private String content;
    private DateTime time;
    @TableLogic
    private int isDeleted;


}
