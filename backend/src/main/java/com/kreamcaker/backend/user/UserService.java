package com.kreamcaker.backend.user;

import com.kreamcaker.backend.config.jwt.TokenProvider;
import com.kreamcaker.backend.token.RefreshToken;
import com.kreamcaker.backend.token.RefreshTokenRepository;
import com.kreamcaker.backend.token.RefreshTokenService;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;


@RequiredArgsConstructor
@Service
public class UserService {

    private final  UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public Long save(AddUserDto addUserDto){
        return userRepository.save(UserEntity.builder()
                .userId(addUserDto.getUserId())
                .password(bCryptPasswordEncoder.encode(addUserDto.getPassword()))
                .build()).getId();
    }

    private final TokenProvider tokenProvider;
    private final RefreshTokenService refreshTokenService;

    public LoginResponse login(String userId, String password) {
        // 1. 유저 존재 확인
        UserEntity user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 아이디입니다."));

        // 2. 비밀번호 일치 확인
        if (!bCryptPasswordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 3. 토큰 생성
        String accessToken = tokenProvider.generateToken(user, Duration.ofHours(2));
        String refreshToken = tokenProvider.generateToken(user, Duration.ofDays(14));

        // 4. 리프레시 토큰 레디스 저장 (기존 데이터가 있으면 자동으로 덮어씁니다)
        refreshTokenService.saveOrUpdate(user.getId(), refreshToken);

        return new LoginResponse(accessToken, refreshToken, user.getUserId());
    }

    // findById 추가 (TokenService에서 사용하기 위해 필요합니다)
    public UserEntity findById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected user"));
    }
    public UserEntity findByUserId(String userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected user"));
    }
}
