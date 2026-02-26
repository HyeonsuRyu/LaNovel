package com.kreamcaker.backend.music;

import com.kreamcaker.backend.user.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import java.time.Duration;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class MusicService {

    private final MusicRepository musicRepository;

    // AI 서버 주소 (추후 환경변수로 빼는 것이 좋습니다)
    private final String AI_SERVER_URL = "http://localhost:5000/generate";

    @Transactional
    public MusicEntity generateAndSave(UserEntity user, String story) {
        // 1. WebClient 설정 (음악 생성은 시간이 걸리므로 타임아웃을 넉넉히 잡습니다)
        WebClient webClient = WebClient.builder()
                .baseUrl(AI_SERVER_URL)
                .build();

        // 2. AI 서버로 POST 요청 발송 및 .wav 바이너리(byte[]) 수신
        byte[] musicBytes = webClient.post()
                .bodyValue(Map.of("prompt", story)) // AI 서버가 받을 필드명 (예: prompt)
                .retrieve()
                .bodyToMono(byte[].class)
                .timeout(Duration.ofMinutes(2)) // 최대 2분 대기
                .block(); // 결과를 받을 때까지 대기 (동기 방식)

        // 3. 수신한 데이터를 DB에 저장
        MusicEntity music = MusicEntity.builder()
                .user(user)
                .storyContent(story)
                .musicData(musicBytes)
                .build();

        return musicRepository.save(music);
    }
}