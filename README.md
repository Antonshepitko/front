# Frontend (SPA → Nginx)

Этот набор файлов добавь в корень репозитория фронта. Он обеспечивает сборку SPA (Vite/Next export/CRA) и раздачу статики через Nginx с проксированием API и WebSocket на backend.

## Что нужно в проекте
1. Скрипт `build` в `package.json`:
   - **Vite:** создаёт папку `dist`
   - **Next (без SSR):** добавь в `next.config.mjs` `output: 'export'`, а в скрипте `build` сделай `next build && next export -o out`
   - **CRA:** создаёт папку `build`

2. Рекомендуем pnpm. Если используешь npm — см. ниже.

## Файлы
- `Dockerfile` — сборка через pnpm (corepack) → Nginx. Сейчас стоит `--no-frozen-lockfile` для простоты; когда закоммитишь `pnpm-lock.yaml`, замени на `--frozen-lockfile`.
- `.nginx/nginx.conf` — прокси `/api` и `/ws` на контейнер бэка `donation-backend:5000`, SPA fallback на `index.html`.
- `.dockerignore` — чтобы не тащить мусор в образ.
- `Jenkinsfile` — pipeline: clone → build → replace container → run в сети `donation-net`.

## Быстрый старт локально (Docker)
```bash
docker build -t donation-frontend .
docker run -d --name donation-frontend --network donation-net -p 80:80 donation-frontend
# Проверь API прокси:
curl -i http://<SERVER_IP>/api/health
```

## Если у тебя npm, а не pnpm
1) Удали строки с corepack/pnpm из Dockerfile и замени блок на:
```dockerfile
COPY package*.json ./
RUN npm ci || npm install
COPY . .
RUN npm run build
```
2) Остальное без изменений.

## Частые проблемы
- **В браузере "Welcome to nginx!"** — в образ не попал билд. Проверь, что `pnpm build` создаёт `dist`/`out`/`build`. В `next.config.mjs` должен быть `output: 'export'`.
- **/api/health 502** — контейнер фронта не в сети `donation-net` или бэк не в сети / не запущен.
- **pnpm падает с frozen-lockfile** — либо коммить `pnpm-lock.yaml`, либо временно ставь `--no-frozen-lockfile`.
