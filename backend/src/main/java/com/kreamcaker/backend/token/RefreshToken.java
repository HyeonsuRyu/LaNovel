package com.kreamcaker.backend.token; // 패키지 위치 확인

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@AllArgsConstructor
@Getter
@RedisHash(value = "refreshToken", timeToLive = 1209600) // TTL 설정 (14일 = 1209600초)
public class RefreshToken {

    @Id // 레디스에서는 이 필드가 키(Key)가 됩니다.
    private Long userId;

    @Indexed // 이 필드로 조회(findByRefreshToken)를 하려면 인덱싱이 필요합니다.
    private String refreshToken;

    public void update(String newRefreshToken) {
        this.refreshToken = newRefreshToken;
    }
}