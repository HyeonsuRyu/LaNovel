import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import LoadingState from '../components/common/LoadingState';
import NovelCard from '../components/novel/NovelCard';
import { fetchNovels, getNovelPreviewComments } from '../services/novelService';
import type { Novel } from '../types/post';

const HomePage = () => {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadNovels = async () => {
    setIsLoading(true);
    setError('');

    try {
      const data = await fetchNovels();
      setNovels(data);
    } catch {
      setError('소설 목록을 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadNovels();
  }, []);

  return (
    <div className="space-y-8">
      {/* 상단 섹션 */}
      <section className="text-center py-10">
        <Link to="/hot" className="inline-block">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 hover:text-indigo-600 transition-colors">
            HOT 게시판
          </h1>
        </Link>
        <p className="text-gray-600">
          AI가 분석한 분위기에 맞는 BGM과 함께 감상해보세요.
        </p>
      </section>

      {isLoading && <LoadingState message="인기 소설을 불러오는 중입니다..." />}

      {!isLoading && error && (
        <ErrorState message={error} onRetry={() => void loadNovels()} />
      )}

      {!isLoading && !error && novels.length === 0 && (
        <EmptyState title="등록된 소설이 없습니다." description="첫 번째 소설을 작성해보세요." />
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
    </div>
  );
};

export default HomePage;
