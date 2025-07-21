package com.qg.domain;

import cn.hutool.core.date.DateTime;
import com.baomidou.mybatisplus.annotation.TableLogic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    private long id;
    private long receiverId;
    private long posterId;
    private String content;
    private DateTime time;
    private int isRead;
    @TableLogic
    private int isDeleted;
}
