# ---------- 1) BUILD (pnpm) ----------
FROM node:20 AS build
WORKDIR /app

# Включаем pnpm через corepack и ставим зависимости по pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
RUN pnpm install --no-frozen-lockfile

# Копируем исходники и собираем
COPY . .
RUN pnpm build

# Стандартизируем артефакт в /app/build
# Поддерживаем разные фреймворки: Vite -> dist, Next export -> out, CRA -> build
RUN mkdir -p /app/build && \
    if [ -d dist ]; then cp -r dist/* build/; \
    elif [ -d out ]; then cp -r out/* build/; \
    elif [ -d build ]; then true; \
    else echo "❌ Не найден артефакт сборки (dist/out/build). Проверь скрипт build" && exit 1; fi

# ---------- 2) RUNTIME (nginx) ----------
FROM nginx:1.27
COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
