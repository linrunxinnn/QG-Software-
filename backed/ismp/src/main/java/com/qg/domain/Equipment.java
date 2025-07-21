package com.qg.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Equipment {
    private long id;
    private long userId;
    private long softwareId;
    private Integer status;
    private String code1;
    private String code2;
    private String code3;
}
