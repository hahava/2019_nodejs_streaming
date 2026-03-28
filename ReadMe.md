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
