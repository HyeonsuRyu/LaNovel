package com.kreamcaker.backend.music.dto;

import com.kreamcaker.backend.music.MusicEntity;
import lombok.Getter;

@Getter
public class MusicResponse {
    private Long id;
    private String storyContent;
    private String musicUrl; // 파일 자체가 아니라, 파일을 부를 주소

    public MusicResponse(MusicEntity music) {
        this.id = music.getId();
        this.storyContent = music.getStoryContent();
        // 프론트가 바로 접근할 수 있는 경로를 만들어줍니다.
        this.musicUrl = "/api/music/play/" + music.getId();
    }
}