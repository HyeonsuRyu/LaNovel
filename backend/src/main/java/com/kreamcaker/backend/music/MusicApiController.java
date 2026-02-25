package com.kreamcaker.backend.music;

import com.kreamcaker.backend.music.dto.MusicRequest;
import com.kreamcaker.backend.music.dto.MusicResponse;
import com.kreamcaker.backend.user.UserEntity;
import com.kreamcaker.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/music")
public class MusicApiController {

    private final MusicService musicService;
    private final MusicRepository musicRepository;
    private final UserService userService;

    /**
     * 1. AI 음악 생성 요청
     * 사용자의 이야기를 받아 AI 서버에 전달하고, 생성된 정보를 DB에 저장한 뒤
     * 재생 가능한 URL을 포함한 메타데이터를 응답합니다.
     */
    @PostMapping("/generate")
    public ResponseEntity<MusicResponse> generate(@AuthenticationPrincipal User user,
                                                  @RequestBody MusicRequest request) {
        // 현재 인증된 유저 정보 조회
        UserEntity userEntity = userService.findByUserId(user.getUsername());

        // MusicService를 통해 AI 서버 통신 및 DB 저장 수행
        MusicEntity music = musicService.generateAndSave(userEntity, request.getStory());

        // 생성된 음악의 ID와 재생 URL이 담긴 DTO 반환
        return ResponseEntity.ok(new MusicResponse(music));
    }

    /**
     * 2. 음악 바이너리 스트리밍
     * 오디오 태그(<audio>)가 호출할 엔드포인트입니다.
     * DB에서 꺼낸 .wav 바이너리 데이터를 직접 브라우저에 쏩니다.
     */
    @GetMapping("/play/{id}")
    public ResponseEntity<byte[]> playMusic(@PathVariable Long id) {
        // ID로 음악 조회, 없으면 404 에러
        MusicEntity music = musicRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Music not found with id: " + id));

        // HTTP 헤더에 오디오 타입 명시하여 브라우저가 바로 재생 가능하게 함
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("audio/wav"))
                .body(music.getMusicData());
    }
}