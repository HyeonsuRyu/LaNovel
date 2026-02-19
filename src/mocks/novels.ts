import type { Comment, Novel, User } from '../types/post';
import { compareByHotScore, getHotCount } from '../config/hotRanking';

const MOCK_AUTHORS: User[] = [
  { id: 'u-1', email: 'ariel@lanovel.dev', nickname: '아리엘' },
  { id: 'u-2', email: 'dawn@lanovel.dev', nickname: '새벽작가' },
  { id: 'u-3', email: 'luna@lanovel.dev', nickname: '루나' },
];

const pickAuthor = (index: number): User => MOCK_AUTHORS[index % MOCK_AUTHORS.length];

const buildComments = (novelId: string, index: number): Comment[] => [
  {
    id: `c-${novelId}-1`,
    content: '분위기 미쳤다... 바로 몰입됨',
    author: pickAuthor(index + 1),
    createdAt: `2026-02-${String(10 + index).padStart(2, '0')}T10:15:00Z`,
  },
  {
    id: `c-${novelId}-2`,
    content: '다음 화 언제 올라오나요?',
    author: pickAuthor(index + 2),
    createdAt: `2026-02-${String(10 + index).padStart(2, '0')}T11:30:00Z`,
  },
  {
    id: `c-${novelId}-3`,
    content: 'BGM이 장면이랑 잘 맞아서 좋았어요.',
    author: pickAuthor(index),
    createdAt: `2026-02-${String(10 + index).padStart(2, '0')}T12:45:00Z`,
  },
];

const baseNovels = Array.from({ length: 9 }).map((_, i) => {
  const id = String(i + 1);
  const comments = buildComments(id, i);

  return {
    id,
    title: `새벽의 도서관에서 발견한 비밀 ${id}`,
    content:
      '오래된 책장 사이로 스며드는 달빛이 그녀의 얼굴을 비췄다. "여기 있었구나." 낮게 깔린 목소리에 그녀는 책을 떨어뜨릴 뻔했다. 뒤를 돌아보자, 칠흑 같은 어둠 속에 서 있는 한 남자의 실루엣이 보였다. 그는 천천히 다가오며 낡은 가죽 장갑을 낀 손을 내밀었다. "이 책은 네가 감당할 수 있는 물건이 아니야." 차갑게 가라앉은 그의 눈동자가 달빛을 받아 서늘하게 빛났다. 도망쳐야 한다는 본능과 정체를 알 수 없는 이끌림이 충돌하는 순간, 도서관의 괘종시계가 자정을 알리며 무겁게 울려 퍼지기 시작했다.',
    bgmUrl: `mock-track-${id}`,
    author: pickAuthor(i),
    createdAt: `2026-02-${String(1 + i).padStart(2, '0')}T09:00:00Z`,
    viewCount: 120 + i * 85,
    likeCount: 10 + i * 7,
    commentCount: comments.length,
    comments,
  };
});

type MockNovelDetail = Novel & { comments: Comment[] };

export const MOCK_NOVELS: Novel[] = baseNovels.map((novel) => ({
  id: novel.id,
  title: novel.title,
  content: novel.content,
  bgmUrl: novel.bgmUrl,
  author: novel.author,
  createdAt: novel.createdAt,
  viewCount: novel.viewCount,
  likeCount: novel.likeCount,
  commentCount: novel.commentCount,
}));

const MOCK_NOVEL_DETAILS: MockNovelDetail[] = baseNovels;

export const getMockNovelPreviewComments = (novelId: string): string[] => {
  return MOCK_NOVEL_DETAILS.find((novel) => novel.id === novelId)?.comments.map((comment) => comment.content) ?? [];
};

export const getMockNovelById = (id: string): MockNovelDetail | null => {
  return MOCK_NOVEL_DETAILS.find((novel) => novel.id === id) ?? null;
};

export const getMockCommentsByNovelId = (novelId: string): Comment[] => {
  return getMockNovelById(novelId)?.comments ?? [];
};

export const getMockHotNovels = (): Novel[] => {
  const hotCount = getHotCount(MOCK_NOVELS.length);

  return [...MOCK_NOVELS]
    .sort(compareByHotScore)
    .slice(0, hotCount);
};
