# 관리자 게시판 시스템

Wald Lab 홈페이지의 공지·소식 게시판 관리 시스템입니다.

## 주요 기능

### 1. 카테고리 시스템
- **업데이트** (update): 서비스 업데이트 소식
- **기술소식** (tech-news): 기술 관련 뉴스
- **인사이트** (insight): 인사이트 및 분석
- **공지** (notice): 중요 공지사항
- **지적재산권** (ip): 상표, 저작권 등

### 2. 관리자 기능
- 게시글 작성 (한/영 동시 작성)
- 게시글 수정
- 게시글 삭제
- 카테고리별 분류
- 날짜 관리

### 3. 공개 페이지
- `/news`: 모든 공지·소식 조회
- 카테고리별 필터링
- 한/영 다국어 지원
- 최신순 정렬

## 관리자 접속

### 로그인
- URL: `http://localhost:3000/admin/login`
- 초기 계정:
  - 이메일: `yhhyun@waldlab.kr`
  - 비밀번호: `walrustican0*`

### 대시보드
- URL: `http://localhost:3000/admin/dashboard`
- 로그인 후 자동 리디렉션

## 게시글 작성 방법

1. 대시보드에서 **"+ 새 게시글"** 클릭
2. 카테고리 선택 (자동으로 태그 설정됨)
3. 날짜 입력 (YYYY-MM-DD)
4. 제목 입력 (한국어 + English)
5. 요약 입력 (한국어 + English)
6. 본문 입력 (한국어 + English)
7. ID 입력 (선택사항, 비워두면 자동 생성)
8. **저장** 클릭

## 데이터 저장

- **게시글**: `src/data/announcements.json`
- **관리자 계정**: `src/data/admin-accounts.json`
- 모든 데이터는 JSON 파일로 저장되며 Git 커밋 가능

## 보안

- JWT 기반 인증 (7일간 유효)
- HTTP-only 쿠키 사용
- 비밀번호 bcrypt 해싱 (10 rounds)
- 환경 변수로 JWT Secret 관리

### 프로덕션 배포 시 필수 작업

**반드시** `.env.local` 또는 배포 환경의 환경 변수에서 `JWT_SECRET`을 강력한 랜덤 값으로 변경하세요:

```bash
# .env.local
JWT_SECRET=your-super-secret-random-string-here-min-32-chars
```

## API 엔드포인트

### 인증
- `POST /api/admin/login` - 로그인
- `POST /api/admin/logout` - 로그아웃
- `GET /api/admin/verify` - 인증 확인

### 게시글 관리 (관리자 전용)
- `GET /api/admin/posts` - 전체 게시글 조회
- `POST /api/admin/posts` - 게시글 생성
- `PUT /api/admin/posts` - 게시글 수정
- `DELETE /api/admin/posts?id={id}` - 게시글 삭제

### 공개 API
- `GET /api/announcements` - 공개 게시글 조회 (페이지네이션 지원)

## 파일 구조

```
src/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx          # 로그인 페이지
│   │   └── dashboard/page.tsx      # 관리자 대시보드
│   ├── api/
│   │   └── admin/
│   │       ├── login/route.ts      # 로그인 API
│   │       ├── logout/route.ts     # 로그아웃 API
│   │       ├── verify/route.ts     # 인증 확인 API
│   │       └── posts/route.ts      # 게시글 CRUD API
│   └── news/page.tsx               # 공개 게시판 페이지
├── data/
│   ├── announcements.json          # 게시글 데이터
│   └── admin-accounts.json         # 관리자 계정 (초기화 시 자동 생성)
├── lib/
│   └── auth.ts                     # 인증 로직
└── types/
    └── announcement.ts             # 타입 정의
```

## 주의사항

1. 파일 첨부 기능은 제외되어 있습니다.
2. 이미지는 본문에 URL로만 포함 가능합니다.
3. 관리자 계정이 없을 경우, 첫 로그인 시도 시 자동으로 초기 계정이 생성됩니다.
4. JSON 파일을 직접 수정할 경우, 반드시 유효한 JSON 형식을 유지해야 합니다.

## 트러블슈팅

### 로그인이 안 되는 경우
1. `src/data/admin-accounts.json` 파일 삭제
2. 다시 로그인 시도 (초기 계정 자동 생성)

### 빌드 오류
```bash
npm run build
```
빌드 전 TypeScript 타입 체크가 자동으로 실행됩니다.

### 개발 서버
```bash
npm run dev
```
