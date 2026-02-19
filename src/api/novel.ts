import axiosInstance from './axiosInstance';
import type { Novel } from '../types/post';

export interface NovelListResponse {
  novels: Novel[];
  totalCount: number;
  nextPage?: number;
}

export interface CreateNovelRequest {
  title: string;
  content: string;
}

export interface UpdateNovelRequest {
  title: string;
  content: string;
}

// API Functions
export const novelApi = {
  // 소설 목록 조회
  getNovels: async (page = 1, size = 10, sort = 'latest'): Promise<NovelListResponse> => {
    const response = await axiosInstance.get<NovelListResponse>('/novels', {
      params: { page, size, sort },
    });
    return response.data;
  },

  // 소설 상세 조회
  getNovelDetail: async (id: string): Promise<Novel> => {
    const response = await axiosInstance.get<Novel>(`/novels/${id}`);
    return response.data;
  },

  // 소설 생성 (AI BGM 생성 요청 포함)
  createNovel: async (data: CreateNovelRequest): Promise<Novel> => {
    const response = await axiosInstance.post<Novel>('/novels', data);
    return response.data;
  },

  // 소설 수정
  updateNovel: async (id: string, data: UpdateNovelRequest): Promise<Novel> => {
    const response = await axiosInstance.put<Novel>(`/novels/${id}`, data);
    return response.data;
  },

  // 소설 삭제
  deleteNovel: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/novels/${id}`);
  },
};
