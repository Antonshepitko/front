# 1) Сборка SPA
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# стандартизируем результат в /app/build:
# - если Vite -> dist, если Next export -> out
RUN npm run build || true
RUN [ -d dist ] && cp -r dist build || true
RUN [ -d out ]  && cp -r out  build || true

# 2) Раздача статики Nginx'ом + прокси на бэк
FROM nginx:1.27
COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
