import type { Novel } from '../types/post';

type HotScoreTarget = Pick<Novel, 'likeCount' | 'commentCount' | 'viewCount'>;
type HotSortTarget = Pick<Novel, 'likeCount' | 'commentCount' | 'viewCount' | 'createdAt'>;

const toPositiveNumber = (value: string | undefined, fallback: number): number => {
  if (value === undefined) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const toPercent = (value: string | undefined, fallback: number): number => {
  if (value === undefined) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 1 ? parsed : fallback;
};

export const HOT_WEIGHT_LIKE = toPositiveNumber(import.meta.env.VITE_HOT_WEIGHT_LIKE, 3);
export const HOT_WEIGHT_COMMENT = toPositiveNumber(import.meta.env.VITE_HOT_WEIGHT_COMMENT, 2);
export const HOT_WEIGHT_VIEW = toPositiveNumber(import.meta.env.VITE_HOT_WEIGHT_VIEW, 0.1);
export const HOT_TOP_PERCENT = toPercent(import.meta.env.VITE_HOT_TOP_PERCENT, 0.2);

export const getHotScore = (novel: HotScoreTarget): number => {
  return (
    novel.likeCount * HOT_WEIGHT_LIKE
    + novel.commentCount * HOT_WEIGHT_COMMENT
    + novel.viewCount * HOT_WEIGHT_VIEW
  );
};

export const compareByHotScore = (a: HotSortTarget, b: HotSortTarget): number => {
  const diff = getHotScore(b) - getHotScore(a);
  if (diff !== 0) return diff;
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
};

export const getHotCount = (total: number): number => {
  return Math.max(1, Math.ceil(total * HOT_TOP_PERCENT));
};
