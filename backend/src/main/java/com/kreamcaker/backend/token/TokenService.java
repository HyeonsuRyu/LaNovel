package com.kreamcaker.backend.token;

import com.kreamcaker.backend.config.jwt.TokenProvider;
import com.kreamcaker.backend.user.UserEntity;
import com.kreamcaker.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;

@RequiredArgsConstructor
@Service
public class TokenService {

    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserService userService;

    public String createNewAccessToken(String refreshToken) {
        // 1. 토큰 자체의 유효성(서명, 만료여부) 검사
        if(!tokenProvider.validToken(refreshToken)) {
            throw new IllegalArgumentException("Unexpected token");
        }

        // 2. 레디스에서 해당 리프레시 토큰이 있는지 조회
        // @Indexed 설정 덕분에 findByRefreshToken을 그대로 사용할 수 있습니다.
        Long userId = refreshTokenRepository.findByRefreshToken(refreshToken)
                .map(RefreshToken::getUserId)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected token"));

        // 3. 토큰에 담긴 유저 ID로 실제 유저 정보 조회
        UserEntity user = userService.findById(userId);

        // 4. 새로운 액세스 토큰 생성 (보통 2시간 정도가 적당합니다)
        return tokenProvider.generateToken(user, Duration.ofHours(2));
    }
}