# LaNovel Frontend 문서 (AI 작업 컨텍스트)

## 1) 기술 스택
- Core: React 18, TypeScript 5, Vite 7
- Routing: React Router DOM 6
- Styling: Tailwind CSS 3, PostCSS, Autoprefixer
- 상태 관리:
  - 서버 상태: TanStack Query v5
  - 클라이언트 상태: Zustand v5
- 네트워크: Axios
- 에디터/UI: React-Quill 2, React Icons

## 2) 개발 목표
- AI BGM 소설 게시판 프론트엔드 구축
- 핵심 기능:
  - 소설 목록/상세/작성(CRUD) UI
  - 댓글 UI
  - 로그인/회원가입 UI 및 인증 상태 관리
  - 소설 분위기 기반 BGM 재생 UI
- 현재 정책:
  - 백엔드 서버 준비 전까지는 API 실연동 없이 로컬/Mock 중심으로 개발
  - UI 완성도와 상태 흐름(스토어/라우팅) 먼저 고도화

## 3) 현재까지 진행사항
- 프로젝트 기본 세팅 완료
  - Vite + React + TypeScript + Tailwind 환경 구성
  - 라우팅 구조 구성: `/`, `/login`, `/write`, `/post/:id`
- 공통 레이아웃/헤더 구현
  - 고정 헤더, 로그인 상태별 UI 분기
- 홈 화면 구현
  - 카드형 소설 목록 UI 구현
  - Mock 데이터 분리 완료: `src/mocks/novels.ts`
- 로그인 화면 구현 (로컬 모드)
  - 이메일/비밀번호 폼
  - 입력 검증
  - `useAuthStore` 연동 후 홈 이동
- 글쓰기 화면 구현
  - React-Quill 에디터 적용
  - 제목/본문 입력
  - 브라우저 `localStorage` 임시저장/복원/초기화
  - 본문 글자 수 표시
- 상태/모듈 기반 설계 반영
  - 인증 스토어: `src/store/useAuthStore.ts`
  - BGM 스토어: `src/store/useBgmStore.ts`
  - API 모듈 뼈대: `src/api/*`
- 품질 상태
  - ESLint 에러 해결 (`react-quill.d.ts`의 `any` 제거)
  - `npm run lint` 통과
  - `npm run build` 통과

## 4) 다음 구현 우선순위
1. 상세 페이지 Mock 연동 (`/post/:id`) 및 댓글 UI 연결
2. BGM 플레이어 UI와 `useBgmStore` 연동
3. 공통 타입 정리(`src/types`) 및 Mock/API 타입 일관성 맞추기
4. 빈 상태/에러 상태/로딩 상태 컴포넌트 추가
5. 백엔드 준비 시 API 연결 모드로 전환

## 5) API 전환 가이드
- 환경 변수:
  - `/Users/hyhchan/Desktop/LaNovel-frontend/.env`
  - `VITE_USE_MOCK_DATA=true|false`
  - `VITE_API_URL=<backend-url>`
  - `VITE_HOT_WEIGHT_LIKE=<number>`
  - `VITE_HOT_WEIGHT_COMMENT=<number>`
  - `VITE_HOT_WEIGHT_VIEW=<number>`
  - `VITE_HOT_TOP_PERCENT=<0~1>`
- 체크리스트 문서:
  - `/Users/hyhchan/Desktop/LaNovel-frontend/API_SWITCH_CHECKLIST.md`
