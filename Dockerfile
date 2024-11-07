FROM node:18 AS builder
RUN apk add --no-cache openssl1.1-compat
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm prisma generate
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]

