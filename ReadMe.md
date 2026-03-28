# movie streaming project

비디오 플레이어 스트리밍을 위한 개인 프로젝트

## Getting Started

### 개발환경에서 실행시

**hot loading**

```bash
 // front-end, back-end 동일한 명령어로 구성
 $ cd ./front-end; yarn watch
```

**back-end server**

```bash
$ cd ./back-end
$ npm install
$ npm run start
```

**back-end watch mode (auto-restart)**

```bash
$ cd ./back-end
$ npm run watch
```

### 빌드 배포

```bash
 $ yarn build

 $ yarn start
```

### docker
```bash
$ docker compose up --build -d

$ docker compose logs -f app

$ docker compose down
```

### Prerequisites

프로젝트 실행전 하기 software 필요

- node 22.x (`.nvmrc` / `volta`로 고정)
- npm 10.x+
- mongodb 

`back-end/profile/.env` 에 최소 아래 값 필요

- `MONGO_URL`
- `JWT_SECRET`
- `PORT` (optional)

### Node Version Isolation (venv 대체)

```bash
# nvm 사용 시
nvm install
nvm use
```

```bash
# volta 사용 시 (권장)
volta install node@22.12.0
```

## API

Base URL: `http://localhost:4000`

### Auth API

`POST /api/auth/register`

- body: `{ "userId": "user", "password": "1234" }`
- success: `200 OK`
- fail: `400` (필수값 누락), `409` (id conflict), `500`

`POST /api/auth/login`

- body: `{ "userId": "user", "password": "1234" }`
- success: `200 OK` + `login_token`(httpOnly cookie, 7 days)
- fail: `400` (필수값 누락), `401` (로그인 실패), `429` (1분 내 5회 초과), `500`

`POST /api/auth/logout`

- success: `204 NO_CONTENT` + `login_token` 쿠키 삭제

### Video API

`GET /api/video/:type`

- 설명: video directory 목록 조회
- success: `200 OK` + `string[]` 파일명 배열
- fail: `400 BAD_REQUEST`

`GET /api/video/watch/:type/:fileName`

- 설명: mp4 스트리밍
- 헤더: `Range: bytes=0-` (선택)
- success: `200 OK`(전체), `206 PARTIAL_CONTENT`(range)
- fail: `404 NOT_FOUND`, `416 REQUESTED_RANGE_NOT_SATISFIABLE`

### Quick Test

```bash
curl -i -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"userId":"user","password":"1234"}'
```

```bash
curl -i -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"userId":"user","password":"1234"}'
```

```bash
curl -i http://localhost:4000/api/video/movie
```
