package com.kreamcaker.backend.token;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    // 1. 토큰 값으로 조회 (토큰 재발급 시 사용)
    public RefreshToken findByRefreshToken(String refreshToken) {
        return refreshTokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected token"));
    }

    // 2. 토큰 저장 또는 업데이트 (로그인 시 사용)
    @Transactional
    public void saveOrUpdate(Long userId, String newRefreshToken) {
        // 레디스는 @Id(userId)가 같으면 save() 호출 시 기존 데이터를 덮어씁니다.
        RefreshToken refreshToken = new RefreshToken(userId, newRefreshToken);
        refreshTokenRepository.save(refreshToken);
    }
}