package com.kreamcaker.backend.music.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MusicRequest {
    private String story; // 사용자가 입력한 이야기 본문
}