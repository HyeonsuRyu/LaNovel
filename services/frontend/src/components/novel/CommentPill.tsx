import React from 'react';

interface CommentPillProps {
  content: string;
  onClick?: () => void;
}

const CommentPill: React.FC<CommentPillProps> = ({ content, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        /* Layout & Size */
        w-full max-w-[120px] h-8
        flex items-center justify-center
        px-3
        
        /* Shape & Border */
        rounded-2xl
        border border-gray-400
        
        /* Background & Cursor */
        bg-transparent
        hover:bg-gray-50 cursor-pointer
        transition-colors
        
        /* Text Style */
        text-xs text-gray-600 truncate
      `}
      title={content} // Hover to see full text
    >
      {content}
    </div>
  );
};

export default CommentPill;
