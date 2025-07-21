package com.qg.domain;

import cn.hutool.core.date.DateTime;
import com.baomidou.mybatisplus.annotation.TableLogic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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

}
