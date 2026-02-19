import { commentApi } from '../api/comment';
import { USE_MOCK_DATA } from '../config/env';
import { getMockCommentsByNovelId } from '../mocks/novels';
import type { Comment } from '../types/post';

const MOCK_DELAY_MS = 200;

const wait = (ms: number) => new Promise<void>((resolve) => {
  window.setTimeout(resolve, ms);
});

export const fetchComments = async (novelId: string): Promise<Comment[]> => {
  if (USE_MOCK_DATA) {
    await wait(MOCK_DELAY_MS);
    return getMockCommentsByNovelId(novelId);
  }

  const response = await commentApi.getComments(novelId);
  return response.comments;
};
