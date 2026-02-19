import axiosInstance from './axiosInstance';
import type { Comment } from '../types/post';

export interface CommentListResponse {
  comments: Comment[];
  totalCount: number;
}

export interface CreateCommentRequest {
  content: string;
}

// API Functions
export const commentApi = {
  // 댓글 목록 조회
  getComments: async (novelId: string): Promise<CommentListResponse> => {
    const response = await axiosInstance.get<CommentListResponse>(`/novels/${novelId}/comments`);
    return response.data;
  },

  // 댓글 작성
  createComment: async (novelId: string, data: CreateCommentRequest): Promise<Comment> => {
    const response = await axiosInstance.post<Comment>(`/novels/${novelId}/comments`, data);
    return response.data;
  },

  // 댓글 삭제
  deleteComment: async (commentId: string): Promise<void> => {
    await axiosInstance.delete(`/comments/${commentId}`);
  },
};
