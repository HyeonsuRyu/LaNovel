import { novelApi } from '../api/novel';
import { USE_MOCK_DATA } from '../config/env';
import { compareByHotScore, getHotCount } from '../config/hotRanking';
import { getMockHotNovels, getMockNovelById, getMockNovelPreviewComments, MOCK_NOVELS } from '../mocks/novels';
import type { Novel } from '../types/post';

const MOCK_DELAY_MS = 250;

const wait = (ms: number) => new Promise<void>((resolve) => {
  window.setTimeout(resolve, ms);
});

export const fetchNovels = async (): Promise<Novel[]> => {
  if (USE_MOCK_DATA) {
    await wait(MOCK_DELAY_MS);
    return MOCK_NOVELS;
  }

  const response = await novelApi.getNovels();
  return response.novels;
};

export const fetchNovelDetail = async (id: string): Promise<Novel | null> => {
  if (USE_MOCK_DATA) {
    await wait(MOCK_DELAY_MS);
    return getMockNovelById(id);
  }

  return novelApi.getNovelDetail(id);
};

export const getNovelPreviewComments = (novelId: string): string[] => {
  if (!USE_MOCK_DATA) return [];
  return getMockNovelPreviewComments(novelId);
};

export const fetchHotNovels = async (): Promise<Novel[]> => {
  if (USE_MOCK_DATA) {
    await wait(MOCK_DELAY_MS);
    return getMockHotNovels();
  }

  const novels = await fetchNovels();
  const hotCount = getHotCount(novels.length);
  return [...novels]
    .sort(compareByHotScore)
    .slice(0, hotCount);
};
