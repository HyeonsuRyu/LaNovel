import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BgmPlayer from '../components/common/BgmPlayer';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import LoadingState from '../components/common/LoadingState';
import { fetchComments } from '../services/commentService';
import { fetchNovelDetail } from '../services/novelService';
import type { Comment, Novel } from '../types/post';

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [novel, setNovel] = useState<Novel | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [displayLikeCount, setDisplayLikeCount] = useState(0);
  const [hasRecommended, setHasRecommended] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDetail = useCallback(async () => {
    if (!id) {
      setError('잘못된 접근입니다.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const [novelData, commentData] = await Promise.all([
        fetchNovelDetail(id),
        fetchComments(id),
      ]);
      setNovel(novelData);
      setComments(commentData);
    } catch {
      setError('상세 정보를 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void loadDetail();
  }, [loadDetail]);

  useEffect(() => {
    if (!novel) return;
    setDisplayLikeCount(novel.likeCount);
    setHasRecommended(false);
  }, [novel]);

  if (isLoading) {
    return <LoadingState message="소설을 불러오는 중입니다..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => void loadDetail()} />;
  }

  if (!novel) {
    return (
      <EmptyState
        title="게시글을 찾을 수 없습니다."
        description="다른 소설을 선택해서 다시 확인해주세요."
      />
    );
  }

  return (
    <article className="space-y-6">
      <div>
        <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-700">
          ← 목록으로 돌아가기
        </Link>
      </div>

      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">{novel.title}</h1>
        <p className="text-sm text-gray-600">
          작성자 {novel.author.nickname} · 조회 {novel.viewCount} · 추천 {displayLikeCount} · 댓글 {comments.length}
        </p>
      </header>

      <section className="bg-white border border-gray-200 rounded-xl p-6 leading-relaxed text-gray-800 whitespace-pre-line">
        {novel.content}
      </section>

      <BgmPlayer trackId={novel.bgmUrl || `novel-${novel.id}-track`} title="분위기 추천 BGM" />

      <section>
        <button
          type="button"
          onClick={() => {
            setHasRecommended((prev) => !prev);
            setDisplayLikeCount((prev) => (hasRecommended ? Math.max(0, prev - 1) : prev + 1));
          }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            hasRecommended
              ? 'bg-pink-100 text-pink-700 border border-pink-200'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {hasRecommended ? '추천 취소' : '추천하기'}
        </button>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-900">댓글</h2>

        {comments.length === 0 ? (
          <EmptyState title="아직 댓글이 없습니다." description="첫 댓글을 남겨보세요." />
        ) : (
          <ul className="space-y-2">
            {comments.map((comment) => (
              <li key={comment.id} className="bg-white border border-gray-200 rounded-lg p-3">
                <p className="text-sm text-gray-800">{comment.content}</p>
                <p className="mt-1 text-xs text-gray-500">{comment.author.nickname}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
};

export default PostDetailPage;
