package com.kreamcaker.backend.user;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class UserEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id", updatable = false)
    private Long id;

    @Column(name = "userId", nullable = false,unique = true)
    private String userId;

    @Column(name ="password")
    private String password;

    @Builder
    public UserEntity(String userId, String password, String auth){
        this.userId =userId;
        this.password = password;

    }

    @Override   //권한 반환
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("user"));
    }

    @Override // 사용자 패스워드 반환
    public String getPassword() {
        return password;
    }

    @Override // 사용자 id 반환
    public String getUsername() {
        return userId;
    }

    @Override   //계정 만료 여부
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override   //계정 잠금 여부
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override   //패스워드 만료 여부
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override   //계정 사용 가능 여부
    public boolean isEnabled() {
        return true;
    }
}
