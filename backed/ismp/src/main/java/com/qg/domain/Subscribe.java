package com.qg.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subscribe {
    private Long id;
    private Long userId;
    private Long developerId;
}
