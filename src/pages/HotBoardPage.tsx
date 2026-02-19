import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import LoadingState from '../components/common/LoadingState';
import NovelCard from '../components/novel/NovelCard';
import { getNovelPreviewComments, fetchHotNovels } from '../services/novelService';
import type { Novel } from '../types/post';

const HotBoardPage = () => {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadHotNovels = async () => {
    setIsLoading(true);
    setError('');

    try {
      const data = await fetchHotNovels();
      setNovels(data);
    } catch {
      setError('HOT 게시글을 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadHotNovels();
  }, []);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-700">
          ← 홈으로 돌아가기
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">HOT 게시판</h1>
        <p className="text-sm text-gray-600">조회수·추천수·댓글수 기반 상위 20% 소설</p>
      </div>

      {isLoading && <LoadingState message="HOT 게시글을 불러오는 중입니다..." />}
      {!isLoading && error && <ErrorState message={error} onRetry={() => void loadHotNovels()} />}
      {!isLoading && !error && novels.length === 0 && (
        <EmptyState title="HOT 게시글이 없습니다." description="아직 집계할 소설이 없습니다." />
      )}

      {!isLoading && !error && novels.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-8">
          {novels.map((novel) => (
            <NovelCard
              key={novel.id}
              id={novel.id}
              title={novel.title}
              previewContent={novel.content}
              comments={getNovelPreviewComments(novel.id)}
              viewCount={novel.viewCount}
              likeCount={novel.likeCount}
              commentCount={novel.commentCount}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HotBoardPage;
