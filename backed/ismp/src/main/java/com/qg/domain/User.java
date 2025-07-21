package com.qg.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private long id;
    private String name;
    private String password;
    private String avatar;
    private String email;
    private String phone;
    private String role;
    private double money;
}
