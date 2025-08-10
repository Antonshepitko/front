# ---------- Next.js SSR runtime ----------
FROM node:20
WORKDIR /app

# pnpm через corepack
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
# пока lock не синхронизирован — без frozen; зафиксируем позже
RUN pnpm install --no-frozen-lockfile

# код и сборка
COPY . .
RUN pnpm build

EXPOSE 3000
# стандартный старт Next SSR
CMD ["pnpm", "start", "-p", "3000"]
