import axiosInstance from './axiosInstance';
import type { User } from '../types/post';

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}

// API Functions
export const authApi = {
  // 회원가입
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/auth/signup', data);
    return response.data;
  },

  // 로그인
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  // 로그아웃
  logout: async (): Promise<void> => {
    await axiosInstance.post('/auth/logout');
  },

  // 내 정보 조회 (새로고침 시 세션 유지용)
  getMe: async (): Promise<{ user: User }> => {
    const response = await axiosInstance.get<{ user: User }>('/auth/me');
    return response.data;
  },
};
