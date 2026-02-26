package com.kreamcaker.backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController // JSON 데이터를 반환하기 위해 변경
public class UserApiController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/api/signup") // API 관례상 /api를 붙여주는 것이 좋습니다.
    public ResponseEntity<String> signup(@RequestBody AddUserDto addUserDto) {
        // @RequestBody: 리액트가 보낸 JSON 데이터를 객체로 변환합니다.
        userService.save(addUserDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("회원가입 성공!");
    }

    @PostMapping("/api/login")
    public ResponseEntity<LoginResponse> login(@RequestBody AddUserDto request) {
        LoginResponse response = userService.login(request.getUserId(), request.getPassword());

        return ResponseEntity.ok()
                .body(response);
    }
}