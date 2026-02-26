# API 전환 체크리스트 (Mock -> Backend)

## 0) 전환 기준
- 백엔드 서버가 로컬/개발 환경에서 정상 구동 중이어야 함
- 인증/소설/댓글 엔드포인트 스펙이 프론트 타입과 맞아야 함

## 1) 환경 변수 전환
1. `/Users/hyhchan/Desktop/LaNovel-frontend/.env`에서 아래 값 변경
   - `VITE_USE_MOCK_DATA=false`
   - `VITE_API_URL=<백엔드 API 주소>`
2. 개발 서버 재시작
   - `npm run dev`

## 2) 엔드포인트 연결 확인
1. 인증
   - `POST /auth/login`
   - `POST /auth/signup`
   - `GET /auth/me`
2. 소설
   - `GET /novels`
   - `GET /novels/:id`
   - `POST /novels`
   - `PUT /novels/:id`
   - `DELETE /novels/:id`
3. 댓글
   - `GET /novels/:id/comments`
   - `POST /novels/:id/comments`
   - `DELETE /comments/:id`

## 3) 화면 단위 점검
1. 홈(`/`) 목록 로드/빈 상태/에러 상태
2. 상세(`/post/:id`) 상세+댓글 로드/없는 게시물 처리
3. 로그인(`/login`) 실제 API 로그인 연결
4. 글쓰기(`/write`) 실제 생성 API 연결

## 4) 타입/데이터 매핑 점검
1. `src/types/post.ts` 기준으로 응답 필드 일치 확인
2. 날짜 필드(`createdAt`) 포맷 일치 확인
3. `bgmUrl` nullable 처리 확인

## 5) 실패 시 대응 규칙
1. API 에러 발생 시 `ErrorState` 노출
2. 재시도 버튼 동작 확인
3. 응답 없음/타임아웃 시 사용자 메시지 확인

## 6) 최종 검증
1. `npm run lint`
2. `npm run build`
3. 주요 경로 수동 점검(`/`, `/post/:id`, `/login`, `/write`)
