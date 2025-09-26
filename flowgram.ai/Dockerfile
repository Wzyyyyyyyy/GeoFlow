FROM node:22-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm @microsoft/rush

COPY . .

RUN rush update --purge

RUN rush build

FROM nginx:alpine

COPY --from=builder /app/apps/demo-free-layout-fromAliServer/dist /usr/share/nginx/html

EXPOSE 80