import React from 'react';
import { Link } from 'react-router-dom';
import CommentPill from './CommentPill';

interface NovelCardProps {
  id: string;
  title: string;
  previewContent: string;
  comments?: string[];
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
}

const NovelCard: React.FC<NovelCardProps> = ({
  id,
  title,
  previewContent,
  comments = [],
  viewCount,
  likeCount,
  commentCount,
}) => {
  return (
    <div 
      className={`
        /* --- Card Container Style --- */
        relative
        w-full aspect-[3/4] /* 종횡비 3:4 유지 (Figma 유사) */
        min-h-[400px]
        p-6
        flex flex-col 
        
        /* Background & Border */
        bg-pink-50 /* 연한 분홍 배경 (Figma: #FDF2F2 느낌) */
        rounded-[32px] /* 둥근 모서리 (Figma: 30~40px) */
        border border-pink-100
        shadow-sm hover:shadow-md transition-shadow
      `}
    >
      {/* 1. Title Area */}
      <Link to={`/post/${id}`} className="block">
        <h2
          className={`
            text-2xl font-bold
            text-indigo-600 /* Title Color */
            mb-4
            line-clamp-2 /* 최대 2줄까지만 표시 */
            hover:underline
          `}
        >
          {title}
        </h2>
      </Link>

      {/* 2. Content Preview Area */}
      <div 
        className={`
          flex-grow 
          text-gray-600 
          text-sm leading-relaxed
          overflow-hidden
          mb-6
        `}
      >
        <p className="line-clamp-[10] whitespace-pre-line">
          {previewContent}
        </p>
      </div>

      {/* 3. Comments Area (Footer) */}
      <div className="mt-auto">
        {(viewCount !== undefined || likeCount !== undefined || commentCount !== undefined) && (
          <div className="mb-2 flex items-center gap-3 text-xs text-gray-500">
            {viewCount !== undefined && <span>조회 {viewCount}</span>}
            {likeCount !== undefined && <span>추천 {likeCount}</span>}
            {commentCount !== undefined && <span>댓글 {commentCount}</span>}
          </div>
        )}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {comments.slice(0, 3).map((comment, index) => (
            <CommentPill 
              key={index} 
              content={comment} 
            />
          ))}
          {comments.length > 3 && (
             <div className="text-xs text-gray-400 self-center">+{comments.length - 3}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NovelCard;
