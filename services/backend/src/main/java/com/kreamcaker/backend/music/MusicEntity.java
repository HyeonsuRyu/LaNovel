package com.kreamcaker.backend.music;

import com.kreamcaker.backend.user.UserEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MusicEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String storyContent;

    @Lob // 대용량 데이터를 저장하기 위한 어노테이션
    @Column(name = "music_data", columnDefinition = "LONGBLOB") // MySQL의 LONGBLOB 타입 매핑
    private byte[] musicData; // .wav 파일의 바이너리 데이터 그 자체

    @Builder
    public MusicEntity(UserEntity user, String storyContent, byte[] musicData) {
        this.user = user;
        this.storyContent = storyContent;
        this.musicData = musicData;
    }
}