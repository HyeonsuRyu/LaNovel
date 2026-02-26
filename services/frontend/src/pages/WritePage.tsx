import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const DRAFT_KEY = 'lanovel:draft:write';

interface DraftData {
  title: string;
  content: string;
}

const readInitialDraft = (): { draft: DraftData; loaded: boolean } => {
  const fallback: DraftData = { title: '', content: '' };
  const saved = localStorage.getItem(DRAFT_KEY);

  if (!saved) {
    return { draft: fallback, loaded: false };
  }

  try {
    const parsed = JSON.parse(saved) as DraftData;
    return {
      draft: {
        title: parsed.title ?? '',
        content: parsed.content ?? '',
      },
      loaded: true,
    };
  } catch {
    localStorage.removeItem(DRAFT_KEY);
    return { draft: fallback, loaded: false };
  }
};

const WritePage = () => {
  const initial = useMemo(() => readInitialDraft(), []);
  const [title, setTitle] = useState(initial.draft.title);
  const [content, setContent] = useState(initial.draft.content);
  const [notice, setNotice] = useState(initial.loaded ? '저장된 임시글을 불러왔습니다.' : '');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const draft: DraftData = { title, content };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    }, 400);

    return () => window.clearTimeout(timer);
  }, [title, content]);

  const plainTextLength = useMemo(() => {
    return content
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .trim().length;
  }, [content]);

  const handleResetDraft = () => {
    setTitle('');
    setContent('');
    localStorage.removeItem(DRAFT_KEY);
    setNotice('임시글을 삭제했습니다.');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotice('백엔드 준비 전이라 저장은 비활성화 상태입니다. 임시 저장만 동작합니다.');
  };

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">소설 쓰기</h1>
        <p className="text-sm text-gray-600 mt-1">작성 내용은 브라우저에 자동 임시 저장됩니다.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="소설 제목을 입력하세요"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="이곳에 소설 내용을 입력하세요..."
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['blockquote', 'code-block'],
                ['clean'],
              ],
            }}
          />
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>본문 글자 수: {plainTextLength}자</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetDraft}
              className="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50"
            >
              임시글 비우기
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              저장(준비중)
            </button>
          </div>
        </div>
      </form>

      {notice && <p className="text-sm text-indigo-700">{notice}</p>}
    </section>
  );
};

export default WritePage;
